import { mkdir, readFile, rename, writeFile } from "node:fs/promises";

const env = process.env;
const required = ["KEYCLOAK_SYNC_CLIENT_ID", "KEYCLOAK_SYNC_CLIENT_SECRET", "GLPI_SYNC_USER_TOKEN", "GLPI_TUNNEL_KEY"];
const missing = required.filter((key) => !env[key]?.trim());
if (missing.length) {
  console.error(`Sinkronisasi user belum dikonfigurasi. Variabel belum diisi: ${missing.join(", ")}`);
  process.exit(1);
}

const keycloakBase = (env.KEYCLOAK_BASE_URL || "http://host.docker.internal:8080").replace(/\/+$/, "");
const realm = env.KEYCLOAK_REALM || "portal-pid";
const glpiBase = (env.GLPI_API_URL || "http://172.30.77.2/apirest.php").replace(/\/+$/, "");
const intervalSeconds = Math.max(30, Number.parseInt(env.SYNC_INTERVAL_SECONDS || "60", 10) || 60);
const importExisting = String(env.SYNC_IMPORT_EXISTING || "false").toLowerCase() === "true";
const timeout = 20000;
const statePath = "/data/keycloak-users.json";
const tunnelKey = env.GLPI_TUNNEL_KEY?.trim();

async function loadState() {
  try {
    return JSON.parse(await readFile(statePath, "utf8"));
  } catch {
    return { initialized: false, processed: [] };
  }
}

async function saveState(state) {
  await mkdir("/data", { recursive: true });
  const temporaryPath = `${statePath}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(state), { mode: 0o600 });
  await rename(temporaryPath, statePath);
}

async function jsonResponse(response, service) {
  const raw = await response.text();
  let data = null;
  try { data = raw ? JSON.parse(raw) : null; } catch { /* Keep logs free of response bodies and account data. */ }
  if (!response.ok) {
    const details = [];
    if (data && typeof data === "object") {
      for (const value of Object.values(data)) {
        if (typeof value === "string") details.push(value);
        else if (Array.isArray(value)) for (const item of value) if (typeof item?.message === "string") details.push(item.message);
      }
    }
    const safeDetails = details.join("; ").replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]").slice(0, 180);
    throw new Error(`${service} HTTP ${response.status}${safeDetails ? ` (${safeDetails})` : ""}`);
  }
  return data;
}

async function getKeycloakToken() {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: env.KEYCLOAK_SYNC_CLIENT_ID,
    client_secret: env.KEYCLOAK_SYNC_CLIENT_SECRET,
  });
  const response = await fetch(`${keycloakBase}/realms/${encodeURIComponent(realm)}/protocol/openid-connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
    signal: AbortSignal.timeout(timeout),
    cache: "no-store",
  });
  const data = await jsonResponse(response, "Keycloak token");
  if (!data?.access_token) throw new Error("Keycloak tidak memberikan access token");
  return data.access_token;
}

async function getKeycloakUsers(token) {
  const users = [];
  const pageSize = 100;
  for (let first = 0; ; first += pageSize) {
    const url = new URL(`${keycloakBase}/admin/realms/${encodeURIComponent(realm)}/users`);
    url.searchParams.set("first", String(first));
    url.searchParams.set("max", String(pageSize));
    url.searchParams.set("briefRepresentation", "false");
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(timeout),
      cache: "no-store",
    });
    const page = await jsonResponse(response, "Keycloak users");
    if (!Array.isArray(page)) throw new Error("Format daftar user Keycloak tidak sesuai");
    users.push(...page);
    if (page.length < pageSize) return users;
  }
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function glpiIds(data) {
  if (Array.isArray(data)) return data.map((row) => row?.id).filter((id) => id !== undefined && id !== null).map(String);
  if (data && typeof data === "object" && data.id !== undefined) return [String(data.id)];
  if (data && typeof data === "object") return Object.entries(data).filter(([key, value]) => /^\d+$/.test(key) && value && typeof value === "object").map(([key]) => key);
  return [];
}

async function readGlpiUser(glpiBase, glpiHeaders, id) {
  const response = await fetch(`${glpiBase}/User/${encodeURIComponent(id)}?get_hateoas=false`, {
    headers: glpiHeaders, signal: AbortSignal.timeout(timeout), cache: "no-store",
  });
  if (response.status === 404) return null;
  return jsonResponse(response, "GLPI user detail");
}

async function syncOnce() {
  const counts = { keycloakUsers: 0, created: 0, updated: 0, alreadyPresent: 0, skipped: 0, failed: 0 };
  let sessionToken = "";
  const appToken = env.GLPI_SYNC_APP_TOKEN?.trim();
  const headers = new Headers({
    Authorization: `user_token ${env.GLPI_SYNC_USER_TOKEN}`,
    Accept: "application/json",
    "X-GLPI-Tunnel-Key": tunnelKey,
    ...(appToken ? { "App-Token": appToken } : {}),
  });

  try {
    const keycloakToken = await getKeycloakToken();
    const keycloakUsers = await getKeycloakUsers(keycloakToken);
    counts.keycloakUsers = keycloakUsers.length;
    const state = await loadState();
    state.processed = Array.isArray(state.processed) ? state.processed.map(String) : [];
    state.linkedUsers = state.linkedUsers && typeof state.linkedUsers === "object" ? state.linkedUsers : {};
    if (!state.initialized) {
      state.initialized = true;
      state.processed = importExisting ? [] : keycloakUsers.map((user) => String(user.id)).filter(Boolean);
      await saveState(state);
      if (!importExisting) {
        console.info(`Baseline awal tersimpan untuk ${state.processed.length} akun; user baru selanjutnya akan dibuat di GLPI.`);
        return;
      }
    }

    const sessionResponse = await fetch(`${glpiBase}/initSession`, {
      headers,
      signal: AbortSignal.timeout(timeout),
      cache: "no-store",
    });
    const session = await jsonResponse(sessionResponse, "GLPI session");
    if (!session?.session_token) throw new Error("GLPI tidak memberikan session token");
    sessionToken = session.session_token;
    const glpiHeaders = new Headers({
      "Session-Token": sessionToken,
      Accept: "application/json",
      "X-GLPI-Tunnel-Key": tunnelKey,
      ...(appToken ? { "App-Token": appToken } : {}),
    });

    const optionsResponse = await fetch(`${glpiBase}/listSearchOptions/User`, {
      headers: glpiHeaders,
      signal: AbortSignal.timeout(timeout),
      cache: "no-store",
    });
    const options = await jsonResponse(optionsResponse, "GLPI user search options");
    const emailOption = Object.entries(options ?? {}).find(([, option]) =>
      String(option?.field ?? "").toLowerCase() === "email"
      || (String(option?.table ?? "").toLowerCase().includes("useremail") && String(option?.field ?? "").toLowerCase() === "name"));
    const usernameOption = Object.entries(options ?? {}).find(([, option]) => String(option?.field ?? "").toLowerCase() === "name");
    if (!emailOption) throw new Error("GLPI API tidak menyediakan pencarian email user");

    for (const user of keycloakUsers) {
      const keycloakId = String(user?.id ?? "");
      if (!keycloakId) continue;
      const email = normalize(user?.email);
      if (user?.serviceAccountClientId || String(user?.username ?? "").startsWith("service-account-")) {
        if (!(state.processed ?? []).map(String).includes(keycloakId)) state.processed.push(keycloakId);
        counts.skipped++;
        continue;
      }
      if (!user?.enabled || !email) {
        counts.skipped++;
        continue;
      }

      try {
        const username = String(user.username || email.split("@")[0]).trim();
        const firstName = String(user.firstName || "").trim();
        const lastName = String(user.lastName || "").trim();
        let linkedId = String(state.linkedUsers[keycloakId] ?? "");
        let linkedUser = linkedId ? await readGlpiUser(glpiBase, glpiHeaders, linkedId) : null;
        if (!linkedUser) linkedId = "";

        if (!linkedId) {
          const searchOptions = [{ option: emailOption, value: email, exact: true }];
          if (usernameOption) searchOptions.push({ option: usernameOption, value: username, exact: false });
          for (const searchOption of searchOptions) {
            if (!searchOption.option) continue;
            const query = new URLSearchParams({
              "criteria[0][field]": searchOption.option[0],
              "criteria[0][searchtype]": "contains",
              "criteria[0][value]": searchOption.value,
              withindexes: "true",
              range: "0-50",
            });
            const searchResponse = await fetch(`${glpiBase}/search/User?${query}`, {
              headers: glpiHeaders, signal: AbortSignal.timeout(timeout), cache: "no-store",
            });
            const matches = await jsonResponse(searchResponse, "GLPI user search");
            for (const id of glpiIds(matches?.data)) {
              const detail = await readGlpiUser(glpiBase, glpiHeaders, id);
              if (!detail) continue;
              let match = searchOption.exact ? normalize(detail.email) === email : normalize(detail.name) === normalize(username);
              if (!match && searchOption.exact) {
                const emailsResponse = await fetch(`${glpiBase}/User/${encodeURIComponent(id)}/UserEmail?range=0-50&get_hateoas=false`, {
                  headers: glpiHeaders, signal: AbortSignal.timeout(timeout), cache: "no-store",
                });
                if (emailsResponse.ok) match = glpiRows(await emailsResponse.json().catch(() => [])).some((row) => normalize(row.email ?? row.name) === email);
              }
              if (match) { linkedId = String(detail.id ?? id); linkedUser = detail; break; }
            }
            if (linkedId) break;
          }
        }

        if (linkedId && linkedUser) {
          state.linkedUsers[keycloakId] = linkedId;
          await saveState(state);
          let changed = false;
          const input = { id: Number(linkedId) };
          if (normalize(linkedUser.firstname) !== normalize(firstName)) { input.firstname = firstName; changed = true; }
          if (normalize(linkedUser.realname) !== normalize(lastName)) { input.realname = lastName; changed = true; }
          if (changed) {
            const updateResponse = await fetch(`${glpiBase}/User/${encodeURIComponent(linkedId)}`, {
              method: "PUT",
              headers: new Headers({ ...Object.fromEntries(glpiHeaders), "Content-Type": "application/json" }),
              body: JSON.stringify({ input }), signal: AbortSignal.timeout(timeout), cache: "no-store",
            });
            await jsonResponse(updateResponse, "GLPI user profile update");
          }
          if (!state.processed.includes(keycloakId)) state.processed.push(keycloakId);
          await saveState(state);
          if (changed) counts.updated++; else counts.alreadyPresent++;
          continue;
        }

        const createResponse = await fetch(`${glpiBase}/User?session_write=true`, {
          method: "POST",
          headers: new Headers({ ...Object.fromEntries(glpiHeaders), "Content-Type": "application/json" }),
          body: JSON.stringify({ input: {
            name: username,
            firstname: firstName,
            realname: lastName,
            email,
            is_active: 1,
          } }),
          signal: AbortSignal.timeout(timeout),
          cache: "no-store",
        });
        const created = await jsonResponse(createResponse, "GLPI user create");
        const createdId = created?.id ?? (Array.isArray(created) ? created[0]?.id ?? created[0] : null) ?? (typeof created === "number" ? created : null);
        if (!createdId) throw new Error("GLPI tidak memberikan ID user yang dibuat");
        state.linkedUsers[keycloakId] = String(createdId);
        await saveState(state);
        if (!state.processed.includes(keycloakId)) state.processed.push(keycloakId);
        await saveState(state);
        counts.created++;
      } catch (error) {
        counts.failed++;
        console.error(`Gagal menyinkronkan satu user (${error instanceof Error ? error.message : "error"}).`);
      }
    }
  } catch (error) {
    counts.failed++;
    console.error(`Siklus sinkronisasi gagal (${error instanceof Error ? error.message : "error"}).`);
  } finally {
    if (sessionToken) {
      const closeHeaders = new Headers({ "Session-Token": sessionToken, "X-GLPI-Tunnel-Key": tunnelKey, ...(appToken ? { "App-Token": appToken } : {}) });
      await fetch(`${glpiBase}/killSession`, { headers: closeHeaders, signal: AbortSignal.timeout(timeout), cache: "no-store" }).catch(() => undefined);
    }
  }

  console.info(JSON.stringify({ at: new Date().toISOString(), ...counts }));
}

let running = false;
async function run() {
  if (running) return;
  running = true;
  try { await syncOnce(); } finally { running = false; }
}

console.info(`Sinkronisasi Keycloak → GLPI berjalan setiap ${intervalSeconds} detik; user aktif yang sudah tertaut ikut diperbarui. Import existing=${importExisting}.`);
await run();
setInterval(run, intervalSeconds * 1000);
