type KeycloakUser = {
    sub?: string;
    email?: string;
    name?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
};

type TicketInput = {
    title?: unknown;
    description?: unknown;
    type?: unknown;
    urgency?: unknown;
    itemtype?: unknown;
    items_id?: unknown;
    category?: unknown;
    service?: unknown;
    glpiCategoryId?: unknown;
    details?: unknown;
    issueArea?: unknown;
    location?: unknown;
    file?: { name?: unknown; type?: unknown; base64?: unknown } | null;
};

function decodeImage(file: TicketInput["file"]): { name: string; type: string; bytes: Uint8Array } | null {
    if (!file?.base64) return null;
    const type = String(file.type ?? "").toLowerCase();
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(type)) throw new Error("Lampiran hanya boleh berupa JPG, PNG, WEBP, atau GIF.");
    const encoded = String(file.base64);
    if (encoded.length > 3_400_000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) throw new Error("Ukuran gambar maksimal 2,5 MB atau formatnya tidak valid.");
    const binary = atob(encoded);
    if (binary.length > 2_500_000) throw new Error("Ukuran gambar maksimal 2,5 MB.");
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const signature = Array.from(bytes.slice(0, 12));
    const valid = type === "image/jpeg" ? signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff
        : type === "image/png" ? signature.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10"
        : type === "image/gif" ? String.fromCharCode(...signature.slice(0, 6)).startsWith("GIF8")
        : String.fromCharCode(...signature.slice(0, 4)) === "RIFF" && String.fromCharCode(...signature.slice(8, 12)) === "WEBP";
    if (!valid) throw new Error("Isi lampiran tidak sesuai dengan format gambar yang dipilih.");
    const name = String(file.name ?? "lampiran").replace(/[\\/:*?"<>|\r\n]/g, "_").slice(-100) || "lampiran";
    return { name, type, bytes };
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
    },
});

function escapeHtml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

async function glpiFailure(response: Response): Promise<string> {
    const body = asRecord(await response.clone().json().catch(async () => ({ message: (await response.text().catch(() => "")).slice(0, 300) })));
    const uploadResult = asRecord(body.upload_result);
    const detail = typeof body.message === "string" ? body.message : typeof body.error === "string" ? body.error : typeof uploadResult.message === "string" ? uploadResult.message : Object.values(body).filter((value) => typeof value === "string").join("; ") || JSON.stringify(body);
    return `HTTP ${response.status}: ${detail.slice(0, 300)}`;
}

type TicketSearchOption = { table?: string; field?: string; name?: string; uid?: string };
type JsonRecord = Record<string, unknown>;

async function mapLimit<T, R>(items: T[], limit: number, work: (item: T) => Promise<R>): Promise<R[]> {
    const results = new Array<R>(items.length);
    let next = 0;
    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (next < items.length) {
            const index = next++;
            results[index] = await work(items[index]);
        }
    });
    await Promise.all(workers);
    return results;
}

function asRecord(value: unknown): JsonRecord {
    return value && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : {};
}

async function readGlpiJson(base: string, path: string, headers: Headers): Promise<{ response: Response; data: unknown }> {
    const response = await fetch(`${base}/${path.replace(/^\/+/, "")}`, { headers, cache: "no-store", signal: AbortSignal.timeout(12_000) });
    return { response, data: await response.json().catch(() => null) };
}

function glpiResultIds(data: unknown): string[] {
    if (Array.isArray(data)) return data.map((row) => asRecord(row).id).filter((id) => id !== undefined && id !== null).map(String);
    if (data && typeof data === "object") return Object.keys(data as Record<string, unknown>);
    return [];
}

async function getAssignedAssets(base: string, headers: Headers, email: string): Promise<{ glpiUserId: number | null; assets: Array<{ id: number; itemtype: string; name: string }> }> {
    if (!email) return { glpiUserId: null, assets: [] };
    const userOptionsResult = await readGlpiJson(base, "listSearchOptions/User", headers);
    if (!userOptionsResult.response.ok) return { glpiUserId: null, assets: [] };
    const userOptions = Object.entries(userOptionsResult.data ?? {}) as Array<[string, TicketSearchOption]>;
    const emailOption = userOptions.find(([, option]) => option?.field?.toLowerCase() === "email" || (option?.table?.toLowerCase().includes("useremail") && option?.field?.toLowerCase() === "name"));
    if (!emailOption) return { glpiUserId: null, assets: [] };
    const userQuery = new URLSearchParams({ "criteria[0][field]": emailOption[0], "criteria[0][searchtype]": "contains", "criteria[0][value]": email, withindexes: "true", range: "0-20" });
    const userMatches = await readGlpiJson(base, `search/User?${userQuery}`, headers);
    if (!userMatches.response.ok) return { glpiUserId: null, assets: [] };
    let glpiUserId: number | null = null;
    for (const id of glpiResultIds(asRecord(userMatches.data).data)) {
        const detail = await readGlpiJson(base, `User/${encodeURIComponent(id)}?get_hateoas=false`, headers);
        const userDetail = asRecord(detail.data);
        if (detail.response.ok && String(userDetail.email ?? "").trim().toLowerCase() === email.trim().toLowerCase()) {
            glpiUserId = Number(userDetail.id ?? id);
            break;
        }
        const emails = await readGlpiJson(base, `User/${encodeURIComponent(id)}/UserEmail?range=0-20&get_hateoas=false`, headers);
        const emailRows = Array.isArray(emails.data) ? emails.data : emails.data && typeof emails.data === "object" ? Object.values(emails.data) : [];
        if (emails.response.ok && emailRows.some((entry) => { const row = asRecord(entry); return String(row.email ?? row.name ?? "").trim().toLowerCase() === email.trim().toLowerCase(); })) {
            glpiUserId = Number(id);
            break;
        }
    }
    if (!glpiUserId) return { glpiUserId: null, assets: [] };

    const assets: Array<{ id: number; itemtype: string; name: string }> = [];
    await mapLimit(["Computer", "Monitor", "Phone", "Printer", "NetworkEquipment", "Peripheral"], 3, async (itemtype) => {
        const optionsResult = await readGlpiJson(base, `listSearchOptions/${itemtype}`, headers);
        if (!optionsResult.response.ok) return;
        const options = Object.entries(optionsResult.data ?? {}) as Array<[string, TicketSearchOption]>;
        const ownerOption = options.find(([, option]) => option?.field === "users_id");
        if (!ownerOption) return;
        const query = new URLSearchParams({ "criteria[0][field]": ownerOption[0], "criteria[0][searchtype]": "equals", "criteria[0][value]": String(glpiUserId), withindexes: "true", range: "0-99" });
        const matches = await readGlpiJson(base, `search/${itemtype}?${query}`, headers);
        if (!matches.response.ok) return;
        const items = await mapLimit(glpiResultIds(asRecord(matches.data).data).slice(0, 99), 6, async (id) => {
            const item = await readGlpiJson(base, `${itemtype}/${encodeURIComponent(id)}?get_hateoas=false`, headers);
            const asset = asRecord(item.data);
            if (!item.response.ok || Number(asset.users_id) !== glpiUserId) return null;
            return { id: Number(asset.id ?? id), itemtype, name: String(asset.name || `${itemtype} #${id}`) };
        });
        assets.push(...items.filter((item): item is NonNullable<typeof item> => item !== null));
    });
    return { glpiUserId, assets };
}

export async function handleTicketRequest(request: Request): Promise<Response> {
    if (request.method !== "POST" && request.method !== "GET") return json({ error: "Method not allowed" }, 405);

    const bearer = request.headers.get("authorization");
    if (!bearer?.match(/^Bearer\s+\S+$/i)) return json({ error: "Sesi SSO tidak ditemukan. Silakan masuk kembali." }, 401);

    const keycloakUrl = process.env.KEYCLOAK_URL?.replace(/\/+$/, "");
    const realm = process.env.KEYCLOAK_REALM;
    const glpiApiUrl = process.env.GLPI_API_URL?.replace(/\/+$/, "");
    const glpiUserToken = process.env.GLPI_USER_TOKEN;
    const glpiAppToken = process.env.GLPI_APP_TOKEN;
    const cloudflareAccessClientId = process.env.GLPI_CF_ACCESS_CLIENT_ID;
    const cloudflareAccessClientSecret = process.env.GLPI_CF_ACCESS_CLIENT_SECRET;
    const glpiTunnelKey = process.env.GLPI_TUNNEL_KEY;
    if (!keycloakUrl || !realm || !glpiApiUrl || !glpiUserToken || Boolean(cloudflareAccessClientId) !== Boolean(cloudflareAccessClientSecret)) {
        return json({ error: "Integrasi helpdesk belum dikonfigurasi. Hubungi administrator Portal PID." }, 503);
    }

    let input: TicketInput = {};
    let title = "";
    let description = "";
    let type = 0;
    let urgency = 0;
    if (request.method === "POST") {
        try {
            const raw = await request.text();
            if (raw.length > 3_600_000) return json({ error: "Formulir terlalu besar. Ukuran gambar maksimal 2,5 MB." }, 413);
            input = JSON.parse(raw) as TicketInput;
        } catch {
            return json({ error: "Format formulir tidak valid." }, 400);
        }

        title = typeof input.title === "string" ? input.title.trim() : "";
        description = typeof input.description === "string" ? input.description.trim() : "";
        type = Number(input.type);
        urgency = Number(input.urgency);
        if (!title || title.length > 120) return json({ error: "Judul tiket wajib diisi (maksimal 120 karakter)." }, 400);
        if (!description || description.length > 8_000) return json({ error: "Keterangan wajib diisi (maksimal 8.000 karakter)." }, 400);
        if (typeof input.issueArea !== "string" || !input.issueArea.trim()) return json({ error: "Bagian yang bermasalah atau dibutuhkan wajib diisi." }, 400);
        const service = typeof input.service === "string" ? input.service.trim() : "";
        const category = typeof input.category === "string" ? input.category.trim() : "";
        const allowedCategories: Record<string, number[]> = {
            "Perangkat dan Jaringan": [4, 5, 7],
            "Akses & Akun": [6],
            "Aplikasi": [3, 8, 9, 10, 11],
            "Layanan IT Lainnya": [12],
        };
        const categoryId = Number(input.glpiCategoryId);
        if (!allowedCategories[category]?.includes(categoryId)) return json({ error: "Kategori GLPI tidak sesuai dengan kelompok layanan." }, 400);
        if (category === "Aplikasi" && !["Gangguan aplikasi", "Perubahan aplikasi", "Bantuan penggunaan aplikasi", "Permintaan Data / Laporan"].includes(service)) return json({ error: "Jenis layanan aplikasi tidak valid." }, 400);
        const requiredDetails: Record<string, string[]> = {
            "Penonaktifan akun": ["nrp_username", "nama_pengguna", "email_pengguna", "unit_divisi", "tanggal_efektif", "akun_aplikasi", "alasan"],
            "Gangguan Perangkat / Jaringan": ["bagian_bermasalah"],
            "Instalasi Software": ["nama_software", "tujuan_instalasi"],
            "Permintaan Perangkat": ["jenis_perangkat", "alasan_permintaan"],
            "Permintaan akses aplikasi": ["aplikasi", "hak_akses", "alasan_akses"],
            "Gangguan aplikasi": ["aplikasi", "modul_halaman"],
            "Perubahan aplikasi": ["aplikasi", "kebutuhan_aplikasi"],
            "Bantuan penggunaan aplikasi": ["aplikasi", "kebutuhan_aplikasi"],
            "Permintaan Data / Laporan": ["aplikasi", "nama_laporan", "periode", "tujuan"],
            "Perubahan hak akses pengguna": ["nrp_username", "nama_pengguna", "unit_divisi", "hak_akses", "alasan_akses"],
            "Reset password akun": ["nrp_username", "akun_aplikasi"],
            "Permintaan akses VPN": ["nrp_username", "alasan_akses"],
        };
        const details = input.details && typeof input.details === "object" && !Array.isArray(input.details) ? input.details as Record<string, unknown> : {};
        const missingDetails = (requiredDetails[service] ?? []).filter((key) => typeof details[key] !== "string" || !(details[key] as string).trim());
        if (missingDetails.length) return json({ error: "Lengkapi semua kolom wajib pada formulir layanan." }, 400);
        if (category === "Aplikasi" && Number(details.aplikasi) !== categoryId) return json({ error: "Kategori aplikasi tiket tidak sesuai dengan aplikasi yang dipilih." }, 400);
        if (type !== 1 && type !== 2) return json({ error: "Jenis tiket tidak valid." }, 400);
        if (!Number.isInteger(urgency) || urgency < 1 || urgency > 5) return json({ error: "Tingkat urgensi tidak valid." }, 400);
        try { decodeImage(input.file); } catch (error) { return json({ error: error instanceof Error ? error.message : "Lampiran tidak valid." }, 400); }
    }

    const userInfoUrl = `${keycloakUrl}/realms/${encodeURIComponent(realm)}/protocol/openid-connect/userinfo`;
    const apiBase = glpiApiUrl;

    try {
        const userResponse = await fetch(userInfoUrl, {
            headers: {
                Authorization: bearer,
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
                ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}),
            },
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
        });
        if (!userResponse.ok) return json({ error: "Sesi SSO tidak valid atau sudah kedaluwarsa. Silakan masuk kembali." }, 401);
        const user = await userResponse.json() as KeycloakUser;
        if (!user.sub) return json({ error: "Identitas SSO tidak dapat diverifikasi." }, 401);

        const glpiHeaders = new Headers({
            Authorization: `user_token ${glpiUserToken}`,
            Accept: "application/json",
        });
        if (glpiAppToken) glpiHeaders.set("App-Token", glpiAppToken);
        if (glpiTunnelKey) glpiHeaders.set("X-GLPI-Tunnel-Key", glpiTunnelKey);
        if (cloudflareAccessClientId && cloudflareAccessClientSecret) {
            glpiHeaders.set("CF-Access-Client-Id", cloudflareAccessClientId);
            glpiHeaders.set("CF-Access-Client-Secret", cloudflareAccessClientSecret);
        }

        const sessionResponse = await fetch(`${apiBase}/initSession`, {
            headers: glpiHeaders,
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
        });
        if (!sessionResponse.ok) return json({ error: "GLPI menolak koneksi API. Periksa konfigurasi API helpdesk." }, 502);
        const sessionData = await sessionResponse.json() as { session_token?: string };
        if (!sessionData.session_token) return json({ error: "GLPI tidak memberikan sesi API." }, 502);

        let selectedAsset: { id: number; itemtype: string; name: string } | null = null;
        if (request.method === "POST" && input.itemtype && input.items_id) {
            const requesterEmail = user.email || user.preferred_username || "";
            const assetHeaders = new Headers({ "Session-Token": sessionData.session_token, ...(glpiAppToken ? { "App-Token": glpiAppToken } : {}), ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}), ...(cloudflareAccessClientId && cloudflareAccessClientSecret ? { "CF-Access-Client-Id": cloudflareAccessClientId, "CF-Access-Client-Secret": cloudflareAccessClientSecret } : {}) });
            const assigned = await getAssignedAssets(apiBase, assetHeaders, requesterEmail);
            selectedAsset = assigned.assets.find((asset) => asset.itemtype === String(input.itemtype) && asset.id === Number(input.items_id)) ?? null;
            if (!selectedAsset) return json({ error: "Perangkat yang dipilih tidak terdaftar sebagai perangkat yang ditugaskan ke akun Anda." }, 403);
        }

        if (request.method === "GET") {
            try {
                const optionsResponse = await fetch(`${apiBase}/listSearchOptions/Ticket`, {
                    headers: new Headers({ "Session-Token": sessionData.session_token, ...(glpiAppToken ? { "App-Token": glpiAppToken } : {}), ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}), ...(cloudflareAccessClientId && cloudflareAccessClientSecret ? { "CF-Access-Client-Id": cloudflareAccessClientId, "CF-Access-Client-Secret": cloudflareAccessClientSecret } : {}) }),
                    cache: "no-store", signal: AbortSignal.timeout(10_000),
                });
                if (!optionsResponse.ok) return json({ error: "GLPI tidak dapat mencari tiket saat ini." }, 502);
                const options = await optionsResponse.json() as Record<string, { table?: string; field?: string }>;
                const contentOption = Object.entries(options).find(([, option]) => option?.table === "glpi_tickets" && option?.field === "content");
                if (!contentOption) return json({ error: "Kolom pencarian tiket GLPI tidak tersedia." }, 502);
                const marker = `PortalPID-SSO:${user.sub}:PortalPID-END`;
                const email = user.email || user.preferred_username || "";
                const query = new URLSearchParams({
                    "criteria[0][field]": contentOption[0],
                    "criteria[0][searchtype]": "contains",
                    "criteria[0][value]": marker,
                    "range": "0-49",
                    "withindexes": "true",
                });
                if (email) {
                    // Older portal tickets predate the SSO subject marker, but stored
                    // the verified account in a structured "Akun SSO" line.
                    query.set("criteria[1][link]", "OR");
                    query.set("criteria[1][field]", contentOption[0]);
                    query.set("criteria[1][searchtype]", "contains");
                    query.set("criteria[1][value]", email);
                }
                const searchResponse = await fetch(`${apiBase}/search/Ticket?${query}`, {
                    headers: new Headers({ "Session-Token": sessionData.session_token, Accept: "application/json", ...(glpiAppToken ? { "App-Token": glpiAppToken } : {}), ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}), ...(cloudflareAccessClientId && cloudflareAccessClientSecret ? { "CF-Access-Client-Id": cloudflareAccessClientId, "CF-Access-Client-Secret": cloudflareAccessClientSecret } : {}) }),
                    cache: "no-store", signal: AbortSignal.timeout(10_000),
                });
                if (!searchResponse.ok) return json({ error: "GLPI tidak dapat memuat daftar tiket." }, 502);
                const searchData = await searchResponse.json() as { data?: Record<string, unknown> | Array<Record<string, unknown>> };
                const ids = Array.isArray(searchData.data)
                    ? searchData.data.map((row) => row.id ?? row["id"]).filter((id): id is string | number => typeof id === "string" || typeof id === "number")
                    : Object.keys(searchData.data ?? {});
                const tickets = await mapLimit(ids.slice(0, 25), 5, async (id) => {
                    if (!id) return null;
                    const detailResponse = await fetch(`${apiBase}/Ticket/${encodeURIComponent(String(id))}`, {
                        headers: new Headers({ "Session-Token": sessionData.session_token, Accept: "application/json", ...(glpiAppToken ? { "App-Token": glpiAppToken } : {}), ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}), ...(cloudflareAccessClientId && cloudflareAccessClientSecret ? { "CF-Access-Client-Id": cloudflareAccessClientId, "CF-Access-Client-Secret": cloudflareAccessClientSecret } : {}) }),
                        cache: "no-store", signal: AbortSignal.timeout(10_000),
                    });
                    if (!detailResponse.ok) return null;
                    const ticket = await detailResponse.json() as { id?: number; name?: string; content?: string; status?: number; date?: string; date_mod?: string; type?: number; urgency?: number };
                    const content = String(ticket.content ?? "");
                    const escapedEmail = escapeHtml(email).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    const legacyIdentity = Boolean(email && new RegExp(`<strong>\\s*Akun SSO:\\s*<\\/strong>\\s*${escapedEmail}\\s*(?:<\\/p>|<br\\s*\\/?>)`, "i").test(content));
                    if (!content.includes(marker) && !legacyIdentity) return null;
                    return { id: ticket.id ?? id, title: ticket.name ?? "Tiket GLPI", status: Number(ticket.status), date: ticket.date ?? null, date_mod: ticket.date_mod ?? ticket.date ?? null, type: Number(ticket.type), urgency: Number(ticket.urgency) };
                });
                return json({ tickets: tickets.filter(Boolean).sort((a, b) => String(b?.date ?? "").localeCompare(String(a?.date ?? ""))) });
            } finally {
                const closeHeaders = new Headers({ Accept: "application/json", "Session-Token": sessionData.session_token });
                if (glpiAppToken) closeHeaders.set("App-Token", glpiAppToken);
                if (glpiTunnelKey) closeHeaders.set("X-GLPI-Tunnel-Key", glpiTunnelKey);
                if (cloudflareAccessClientId && cloudflareAccessClientSecret) { closeHeaders.set("CF-Access-Client-Id", cloudflareAccessClientId); closeHeaders.set("CF-Access-Client-Secret", cloudflareAccessClientSecret); }
                await fetch(`${apiBase}/killSession`, { headers: closeHeaders, cache: "no-store" }).catch(() => undefined);
            }
        }

        let ticketId: string | number | undefined;
        try {
            const displayName = user.name || [user.given_name, user.family_name].filter(Boolean).join(" ") || user.preferred_username || "Pengguna Portal PID";
            const email = user.email || user.preferred_username || "";
            const marker = `PortalPID-SSO:${user.sub}:PortalPID-END`;
            const category = typeof input.category === "string" ? input.category.trim().slice(0, 100) : "";
            const service = typeof input.service === "string" ? input.service.trim().slice(0, 150) : "";
            const issueArea = typeof input.issueArea === "string" ? input.issueArea.trim().slice(0, 150) : "";
            const location = typeof input.location === "string" ? input.location.trim().slice(0, 200) : "";
            const categoryId = Number(input.glpiCategoryId);
            const details = input.details && typeof input.details === "object" && !Array.isArray(input.details) ? input.details as Record<string, unknown> : {};
            const detailsHtml = (value: string) => escapeHtml(value).replaceAll("\r\n", "\n").replaceAll("\n", "<br>");
            const applicationNames: Record<string, string> = { "3": "E-Procurement", "8": "E-Food", "9": "E-Office", "10": "E-Task", "11": "SAP Business One" };
            const detailRows = Object.entries(details).filter(([, value]) => typeof value === "string" && value.trim()).map(([key, value]) => {
                const displayValue = key === "aplikasi" ? applicationNames[String(value)] ?? String(value) : String(value);
                return `<p><strong>${escapeHtml(key.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()))}:</strong> ${detailsHtml(displayValue.slice(0, 1000))}</p>`;
            }).join("");
            const requestContent = [
                `<p><strong>${escapeHtml(marker)}</strong></p>`,
                `<p><strong>Pengaju Portal PID:</strong> ${escapeHtml(displayName)}</p>`,
                email ? `<p><strong>Akun SSO:</strong> ${escapeHtml(email)}</p>` : "",
                category ? `<p><strong>Kategori layanan:</strong> ${escapeHtml(category)}</p>` : "",
                service ? `<p><strong>Layanan:</strong> ${escapeHtml(service)}</p>` : "",
                issueArea ? `<p><strong>Bagian yang bermasalah:</strong> ${escapeHtml(issueArea)}</p>` : "",
                location ? `<p><strong>Lokasi:</strong> ${escapeHtml(location)}</p>` : "",
                selectedAsset ? `<p><strong>Perangkat terkait:</strong> ${escapeHtml(selectedAsset.itemtype)} · ${escapeHtml(selectedAsset.name)} (#${selectedAsset.id})</p>` : "",
                detailRows ? `<p><strong>Detail formulir layanan:</strong></p>${detailRows}` : "",
                "<hr>",
                `<p><strong>Uraian:</strong><br>${detailsHtml(description)}</p>`,
            ].filter(Boolean).join("");
            const ticketResponse = await fetch(`${apiBase}/Ticket?session_write=true`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Session-Token": sessionData.session_token,
                    ...(glpiAppToken ? { "App-Token": glpiAppToken } : {}),
                    ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}),
                    ...(cloudflareAccessClientId && cloudflareAccessClientSecret ? {
                        "CF-Access-Client-Id": cloudflareAccessClientId,
                        "CF-Access-Client-Secret": cloudflareAccessClientSecret,
                    } : {}),
                }),
                body: JSON.stringify({
                    input: {
                        name: title,
                        content: requestContent,
                        type,
                        urgency,
                        itilcategories_id: categoryId,
                    },
                }),
                cache: "no-store",
                signal: AbortSignal.timeout(15_000),
            });
            if (!ticketResponse.ok) return json({ error: "GLPI belum dapat membuat tiket. Periksa hak akses akun integrasi." }, 502);
            const ticketData = await ticketResponse.json() as { id?: string | number };
            ticketId = ticketData.id;
            let attachmentAdded = false;
            let attachmentWarning = "";
            const image = decodeImage(input.file);
            if (ticketId && image) {
                const commonHeaders = new Headers({ "Session-Token": sessionData.session_token, ...(glpiAppToken ? { "App-Token": glpiAppToken } : {}), ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}), ...(cloudflareAccessClientId && cloudflareAccessClientSecret ? { "CF-Access-Client-Id": cloudflareAccessClientId, "CF-Access-Client-Secret": cloudflareAccessClientSecret } : {}) });
                const requesterName = user.name || user.preferred_username || "Pengaju Portal PID";
                const requesterEmail = user.email || user.preferred_username || "";
                const marker = `PortalPID-MSG:${user.sub}:PortalPID-END`;
                const content = `<!--${marker}--><p><strong>Pengaju Portal PID:</strong> ${escapeHtml(requesterName)}${requesterEmail ? ` (${escapeHtml(requesterEmail)})` : ""}</p><hr><p>Lampiran gambar dari pengajuan awal.</p>`;
                const followup = await fetch(`${apiBase}/Ticket/${encodeURIComponent(String(ticketId))}/ITILFollowup?session_write=true`, { method: "POST", headers: new Headers({ ...Object.fromEntries(commonHeaders), "Content-Type": "application/json", Accept: "application/json" }), body: JSON.stringify({ input: { tickets_id: ticketId, itemtype: "Ticket", items_id: ticketId, is_private: 0, requesttypes_id: 1, content } }), cache: "no-store", signal: AbortSignal.timeout(15_000) });
                const followupData = asRecord(await followup.json().catch(() => null));
                const followupId = Number(followupData.id ?? 0);
                if (!followup.ok || !followupId) {
                    attachmentWarning = `Tiket berhasil dibuat, tetapi GLPI menolak menyiapkan pesan untuk lampiran (HTTP ${followup.status}).`;
                } else {
                const form = new FormData();
                // Keep this as a normal multipart text field. A Blob gets a filename
                // and PHP moves it into $_FILES, while GLPI reads $_POST[uploadManifest].
                // Attach to the followup in the Document upload request itself. This avoids
                // a separate Document_Item call and keeps the image in the technician chat.
                form.append("uploadManifest", JSON.stringify({ input: { name: image.name, _filename: [image.name], itemtype: "ITILFollowup", items_id: followupId } }));
                form.append("filename[0]", new Blob([image.bytes], { type: image.type }), image.name);
                const uploaded = await fetch(`${apiBase}/Document/?session_write=true`, { method: "POST", headers: commonHeaders, body: form, cache: "no-store", signal: AbortSignal.timeout(20_000) });
                const document = asRecord(await uploaded.json().catch(() => null));
                if (!uploaded.ok || !document.id) {
                    attachmentWarning = `GLPI menolak unggah gambar (${await glpiFailure(uploaded)}). Pastikan profil akun API boleh menambah dokumen.`;
                } else {
                    const marked = await fetch(`${apiBase}/ITILFollowup/${encodeURIComponent(String(followupId))}?session_write=true`, { method: "PUT", headers: new Headers({ ...Object.fromEntries(commonHeaders), "Content-Type": "application/json", Accept: "application/json" }), body: JSON.stringify({ input: { id: followupId, content: `${content}<!--PortalPID-DOCUMENT:${Number(document.id)}-->` } }), cache: "no-store", signal: AbortSignal.timeout(15_000) });
                    attachmentAdded = marked.ok;
                    if (!attachmentAdded) attachmentWarning = "Gambar tersimpan di GLPI, tetapi rujukan gambar pada pesan tiket belum berhasil disimpan.";
                }
                }
            }
            if (ticketId && selectedAsset) {
                const assetLink = await fetch(`${apiBase}/Ticket/${encodeURIComponent(String(ticketId))}/Item_Ticket?session_write=true`, {
                    method: "POST",
                    headers: new Headers({ "Content-Type": "application/json", Accept: "application/json", "Session-Token": sessionData.session_token, ...(glpiAppToken ? { "App-Token": glpiAppToken } : {}), ...(glpiTunnelKey ? { "X-GLPI-Tunnel-Key": glpiTunnelKey } : {}), ...(cloudflareAccessClientId && cloudflareAccessClientSecret ? { "CF-Access-Client-Id": cloudflareAccessClientId, "CF-Access-Client-Secret": cloudflareAccessClientSecret } : {}) }),
                    body: JSON.stringify({ input: { tickets_id: ticketId, itemtype: selectedAsset.itemtype, items_id: selectedAsset.id } }),
                    cache: "no-store", signal: AbortSignal.timeout(15_000),
                });
                if (!assetLink.ok) return json({ ok: true, ticketId, warning: `${attachmentWarning ? attachmentWarning + " " : ""}Tiket berhasil dibuat, tetapi perangkat belum dapat ditautkan; namanya tetap tercantum pada tiket.` });
            }
            if (image && !attachmentAdded) return json({ ok: true, ticketId, warning: `Tiket berhasil dibuat. ${attachmentWarning || "Gambar belum dapat dilampirkan ke GLPI."}` });
        } finally {
            const closeHeaders = new Headers({ Accept: "application/json", "Session-Token": sessionData.session_token });
            if (glpiAppToken) closeHeaders.set("App-Token", glpiAppToken);
            if (glpiTunnelKey) closeHeaders.set("X-GLPI-Tunnel-Key", glpiTunnelKey);
            if (cloudflareAccessClientId && cloudflareAccessClientSecret) {
                closeHeaders.set("CF-Access-Client-Id", cloudflareAccessClientId);
                closeHeaders.set("CF-Access-Client-Secret", cloudflareAccessClientSecret);
            }
            await fetch(`${apiBase}/killSession`, { headers: closeHeaders, cache: "no-store" }).catch(() => undefined);
        }

        return json({ ok: true, ticketId: ticketId ?? null, assetLinked: Boolean(selectedAsset) });
    } catch {
        return json({ error: "Tidak dapat menghubungi layanan helpdesk. Coba lagi beberapa saat." }, 502);
    }
}

type NodeRequest = {
    method?: string;
    headers?: Record<string, string | string[] | undefined>;
    body?: unknown;
};

type NodeResponse = {
    statusCode?: number;
    setHeader(name: string, value: string): void;
    end(body?: string): void;
};

export default async function handler(
    request: Request | NodeRequest,
    response?: NodeResponse,
): Promise<Response | void> {
    // Vite's local middleware can pass a Fetch Request directly. Vercel's
    // Node.js runtime invokes default handlers with IncomingMessage/ServerResponse.
    if (typeof (request as Request).headers?.get === "function") {
        return handleTicketRequest(request as Request);
    }
    if (!response) throw new Error("Node response is required by the Vercel runtime.");

    const nodeRequest = request as NodeRequest;
    const method = nodeRequest.method || "GET";
    const headers = new Headers();
    for (const [name, value] of Object.entries(nodeRequest.headers ?? {})) {
        const normalizedName = name.toLowerCase();
        if (normalizedName === "host" || normalizedName === "content-length" || normalizedName === "transfer-encoding") continue;
        if (typeof value === "string") headers.set(name, value);
        else if (Array.isArray(value)) headers.set(name, value.join(", "));
    }

    let body: string | undefined;
    if (method !== "GET" && method !== "HEAD") {
        if (typeof nodeRequest.body === "string") body = nodeRequest.body;
        else if (nodeRequest.body !== undefined && nodeRequest.body !== null) body = JSON.stringify(nodeRequest.body);
        else body = "";
    }

    const webRequest = new Request("http://localhost/api/glpi-tickets", {
        method,
        headers,
        ...(body === undefined ? {} : { body }),
    });
    const webResponse = await handleTicketRequest(webRequest);
    response.statusCode = webResponse.status;
    webResponse.headers.forEach((value, name) => response.setHeader(name, value));
    response.end(await webResponse.text());
}
