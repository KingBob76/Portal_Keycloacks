type AccountProfile = { username?: string; email?: string; firstName?: string; lastName?: string; attributes?: Record<string, string | string[]> };

type VercelRequest = {
    method?: string;
    headers?: Headers | Record<string, string | string[] | undefined>;
    body?: unknown;
    json?: () => Promise<unknown>;
};

type VercelResponse = {
    statusCode: number;
    setHeader(name: string, value: string): void;
    end(body?: string): void;
};

function send(response: VercelResponse, body: unknown, status = 200): void {
    response.statusCode = status;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.end(JSON.stringify(body));
}

function header(request: VercelRequest, name: string): string | null {
    const requestHeaders = request.headers;
    if (requestHeaders && typeof (requestHeaders as Headers).get === "function") return (requestHeaders as Headers).get(name);
    const value = (requestHeaders as Record<string, string | string[] | undefined> | undefined)?.[name.toLowerCase()];
    return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

async function requestBody(request: VercelRequest): Promise<unknown> {
    if (typeof request.json === "function") return request.json();
    const body = request.body;
    if (typeof body === "string") return JSON.parse(body);
    if (body instanceof Uint8Array) return JSON.parse(new TextDecoder().decode(body));
    if (body && typeof body === "object") return body;
    throw new Error("Request body is empty.");
}

async function responseError(response: Response): Promise<string> {
    const raw = await response.text().catch(() => "");
    if (!raw) return `Keycloak menolak perubahan (HTTP ${response.status}).`;
    try {
        const value = JSON.parse(raw) as unknown;
        const describe = (item: unknown): string => {
            if (typeof item === "string") return item;
            if (!item || typeof item !== "object") return "";
            const record = item as Record<string, unknown>;
            const attribute = typeof record.attribute === "string" ? record.attribute : "";
            const message = [record.errorMessage, record.error_description, record.message, record.error, record.detail]
                .find((entry): entry is string => typeof entry === "string" && !!entry);
            if (message) {
                if (message === "error-user-attribute-read-only") return `Atribut ${attribute || "profil"} dikunci pada User Profile Keycloak. Atur Permissions > Who can edit menjadi User.`;
                if (message === "error-user-attribute-required") return `Atribut ${attribute || "profil"} wajib diisi.`;
                return `${attribute ? `${attribute}: ` : ""}${message}`;
            }
            return "";
        };
        const entries = Array.isArray(value) ? value : value && typeof value === "object"
            ? [ ...(Array.isArray((value as Record<string, unknown>).errors) ? (value as Record<string, unknown>).errors as unknown[] : []), value ]
            : [];
        const messages = entries.map(describe).filter(Boolean);
        if (messages.length) return messages.join("; ");
    } catch { /* Keycloak may return plain text or HTML. */ }
    return `Keycloak menolak perubahan (HTTP ${response.status}).`;
}

export default async function handler(request: VercelRequest, response: VercelResponse): Promise<void> {
    const reply = (body: unknown, status = 200) => send(response, body, status);
    if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);
    const keycloakUrl = process.env.KEYCLOAK_URL?.replace(/\/+$/, "");
    const realm = process.env.KEYCLOAK_REALM;
    if (!keycloakUrl || !realm) return reply({ error: "Layanan profil Keycloak belum dikonfigurasi." }, 503);
    const authorization = header(request, "authorization");
    if (!authorization?.match(/^Bearer\s+\S+$/i)) return reply({ error: "Sesi SSO tidak ditemukan. Silakan masuk kembali." }, 401);
    let input: unknown;
    try { input = await requestBody(request); } catch { return reply({ error: "Data profil tidak valid." }, 400); }
    if (!input || typeof input !== "object") return reply({ error: "Data profil tidak valid." }, 400);
    const body = input as Record<string, unknown>;
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    const bio = typeof body.bio === "string" ? body.bio.trim() : "";
    if (bio.length > 160) return reply({ error: "Bio maksimal 160 karakter." }, 400);
    if (!firstName) return reply({ error: "Nama depan wajib diisi." }, 400);

    const realmUrl = keycloakUrl + "/realms/" + encodeURIComponent(realm);
    const headers = { Authorization: authorization, Accept: "application/json", "ngrok-skip-browser-warning": "true" };
    try {
        const userInfoResponse = await fetch(realmUrl + "/protocol/openid-connect/userinfo", { headers, cache: "no-store" });
        if (!userInfoResponse.ok) return reply({ error: "Sesi SSO tidak valid atau sudah kedaluwarsa. Silakan masuk kembali." }, 401);
        const currentResponse = await fetch(realmUrl + "/account", { headers, cache: "no-store" });
        if (!currentResponse.ok) return reply({ error: "Keycloak tidak dapat membaca profil akun Anda." }, currentResponse.status === 403 ? 403 : 502);
        const current = await currentResponse.json() as AccountProfile;
        // Keep Keycloak's required account fields from the trusted GET response.
        // The browser is never allowed to provide username/email/other attributes;
        // firstName, lastName, and bio are the only editable fields accepted from the user request.
        const update: Record<string, unknown> = {
            username: current.username,
            email: current.email,
            firstName,
            lastName,
            attributes: { ...(current.attributes ?? {}), bio: bio ? [bio] : [] },
        };
        const updateResponse = await fetch(realmUrl + "/account", {
            method: "POST",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(update),
            cache: "no-store",
        });
        if (!updateResponse.ok) {
            const detail = await responseError(updateResponse);
            return reply({ error: detail }, updateResponse.status);
        }
        // Confirm the persisted values before reporting success to the portal UI.
        const verifyResponse = await fetch(realmUrl + "/account", { headers, cache: "no-store" });
        if (!verifyResponse.ok) return reply({ error: "Nama terkirim, tetapi Keycloak tidak dapat memverifikasi profil yang tersimpan." }, 502);
        const saved = await verifyResponse.json() as AccountProfile;
        if (saved.firstName !== firstName || saved.lastName !== lastName) {
            return reply({ error: "Keycloak belum menerapkan nama. Periksa izin edit atribut First name dan Last name di User Profile realm." }, 502);
        }
        const savedBio = saved.attributes?.bio;
        const savedBioText = Array.isArray(savedBio) ? (savedBio.find((value) => typeof value === "string") ?? "") : (typeof savedBio === "string" ? savedBio : "");
        if (savedBioText !== bio) return reply({ error: "Bio belum tersimpan. Periksa apakah atribut bio di User Profile Keycloak boleh diedit oleh pengguna." }, 502);
        return reply({ username: saved.username ?? current.username ?? "", email: saved.email ?? current.email ?? "", firstName: saved.firstName, lastName: saved.lastName, bio: savedBioText });
    } catch {
        return reply({ error: "Portal tidak dapat menjangkau Keycloak. Pastikan URL Keycloak yang tersimpan di konfigurasi server dapat diakses dari Vercel." }, 502);
    }
}
