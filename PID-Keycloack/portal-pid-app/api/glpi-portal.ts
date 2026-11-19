type PortalUser = { sub?: string; email?: string; name?: string; preferred_username?: string };
type SearchOption = { table?: string; field?: string; name?: string; uid?: string };
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

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
});

function stripHtml(value: unknown): string {
    return String(value ?? "")
        .replace(/<\s*br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div|li|h[1-6])\s*>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
        .replace(/&#(\d+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
        .replace(/\n{3,}/g, "\n\n").trim();
}

function escapeHtml(value: string): string {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function apiHeaders(sessionToken: string, appToken?: string, extra?: Headers | Record<string, string>): Headers {
    const headers = new Headers({ "Session-Token": sessionToken, Accept: "application/json" });
    if (appToken) headers.set("App-Token", appToken);
    new Headers(extra).forEach((value, name) => headers.set(name, value));
    return headers;
}

async function glpiJson(base: string, path: string, headers: Headers, init?: RequestInit): Promise<{ response: Response; data: unknown }> {
    const response = await fetch(`${base}/${path.replace(/^\/+/, "")}`, { ...init, headers: new Headers(init?.headers ?? headers), cache: "no-store", signal: init?.signal ?? AbortSignal.timeout(12_000) });
    const data = await response.json().catch(() => null);
    return { response, data };
}

function records(data: unknown): JsonRecord[] {
    if (Array.isArray(data)) return data.map(asRecord).filter((item) => Object.keys(item).length > 0);
    if (data && typeof data === "object") return Object.values(data as JsonRecord).map(asRecord).filter((item) => Object.keys(item).length > 0);
    return [];
}

function resultIds(data: unknown): string[] {
    if (Array.isArray(data)) return data.map((row) => asRecord(row).id).filter((id) => id !== undefined && id !== null).map(String);
    if (data && typeof data === "object") return Object.keys(data as Record<string, unknown>);
    return [];
}

function isPortalTicket(content: string, user: PortalUser): boolean {
    const marker = user.sub ? `PortalPID-SSO:${user.sub}:PortalPID-END` : "";
    if (marker && content.includes(marker)) return true;
    const email = user.email || user.preferred_username || "";
    if (!email) return false;
    const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`<strong>\\s*Akun SSO:\\s*<\\/strong>\\s*${escapedEmail}\\s*(?:<\\/p>|<br\\s*\\/?>)`, "i").test(content);
}

async function getOwnedTicket(base: string, headers: Headers, id: string, user: PortalUser): Promise<JsonRecord | null> {
    if (!/^\d+$/.test(id)) return null;
    const { response, data } = await glpiJson(base, `Ticket/${encodeURIComponent(id)}?expand_dropdowns=true&get_hateoas=false`, headers);
    const ticket = asRecord(data);
    if (!response.ok || !Object.keys(ticket).length || !isPortalTicket(String(ticket.content ?? ""), user)) return null;
    return ticket;
}

type AssignedAssetsResult = {
    glpiUserId: number | null;
    assets: Array<{ id: number; itemtype: string; name: string; serial?: string; inventory?: string }>;
    permissionError?: "users" | "assets";
};

export async function getAssignedAssets(base: string, headers: Headers, email: string): Promise<AssignedAssetsResult> {
    if (!email) return { glpiUserId: null, assets: [] };
    const userOptionsResult = await glpiJson(base, "listSearchOptions/User", headers);
    if (!userOptionsResult.response.ok) return { glpiUserId: null, assets: [] };
    const userOptions = Object.entries(userOptionsResult.data ?? {}) as Array<[string, SearchOption]>;
    const emailOption = userOptions.find(([, option]) => option?.field?.toLowerCase() === "email" || (option?.table?.toLowerCase().includes("useremail") && option?.field?.toLowerCase() === "name"));
    if (!emailOption) return { glpiUserId: null, assets: [] };
    const userSearch = new URLSearchParams({ "criteria[0][field]": emailOption[0], "criteria[0][searchtype]": "contains", "criteria[0][value]": email, withindexes: "true", range: "0-19" });
    const userMatches = await glpiJson(base, `search/User?${userSearch}`, headers);
    if (!userMatches.response.ok) return { glpiUserId: null, assets: [], permissionError: userMatches.response.status === 403 ? "users" : undefined };
    const userIds = resultIds(asRecord(userMatches.data).data);
    let glpiUserId: number | null = null;
    for (const candidateId of userIds) {
        const detail = await glpiJson(base, `User/${encodeURIComponent(candidateId)}?get_hateoas=false`, headers);
        const userDetail = asRecord(detail.data);
        if (detail.response.ok && String(userDetail.email ?? "").trim().toLowerCase() === email.trim().toLowerCase()) {
            glpiUserId = Number(userDetail.id ?? candidateId);
            break;
        }
        const emails = await glpiJson(base, `User/${encodeURIComponent(candidateId)}/UserEmail?range=0-20&get_hateoas=false`, headers);
        if (emails.response.ok && records(emails.data).some((entry) => String(entry.email ?? entry.name ?? "").trim().toLowerCase() === email.trim().toLowerCase())) {
            glpiUserId = Number(candidateId);
            break;
        }
    }
    if (!glpiUserId) return { glpiUserId: null, assets: [] };

    const assetTypes = ["Computer", "Monitor", "Phone", "Printer", "NetworkEquipment", "Peripheral"];
    const assets: Array<{ id: number; itemtype: string; name: string; serial?: string; inventory?: string }> = [];
    let assetPermissionError = false;
    await mapLimit(assetTypes, 3, async (itemtype) => {
        const optionsResult = await glpiJson(base, `listSearchOptions/${itemtype}`, headers);
        if (optionsResult.response.status === 403) assetPermissionError = true;
        if (!optionsResult.response.ok) return;
        const options = Object.entries(optionsResult.data ?? {}) as Array<[string, SearchOption]>;
        const ownerOption = options.find(([, option]) => option?.field === "users_id");
        if (!ownerOption) return;
        const query = new URLSearchParams({ "criteria[0][field]": ownerOption[0], "criteria[0][searchtype]": "equals", "criteria[0][value]": String(glpiUserId), withindexes: "true", range: "0-99" });
        const search = await glpiJson(base, `search/${itemtype}?${query}`, headers);
        if (search.response.status === 403) assetPermissionError = true;
        if (!search.response.ok) return;
        const ids = resultIds(asRecord(search.data).data);
        const details = await mapLimit(ids.slice(0, 99), 6, async (assetId) => {
            const item = await glpiJson(base, `${itemtype}/${encodeURIComponent(assetId)}?get_hateoas=false`, headers);
            if (item.response.status === 403) assetPermissionError = true;
            const asset = asRecord(item.data);
            if (!item.response.ok || Number(asset.users_id) !== glpiUserId) return null;
            return { id: Number(asset.id ?? assetId), itemtype, name: String(asset.name || `${itemtype} #${assetId}`), serial: asset.serial ? String(asset.serial) : undefined, inventory: asset.otherserial ? String(asset.otherserial) : undefined };
        });
        assets.push(...details.filter((asset): asset is NonNullable<typeof asset> => asset !== null));
    });
    return { glpiUserId, assets: assets.sort((a, b) => a.name.localeCompare(b.name)), permissionError: assetPermissionError ? "assets" : undefined };
}

export async function handlePortalRequest(request: Request): Promise<Response> {
    if (request.method !== "GET" && request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    const bearer = request.headers.get("authorization");
    if (!bearer?.match(/^Bearer\s+\S+$/i)) return json({ error: "Sesi SSO tidak ditemukan. Silakan masuk kembali." }, 401);

    const keycloakUrl = process.env.KEYCLOAK_URL?.replace(/\/+$/, "");
    const realm = process.env.KEYCLOAK_REALM;
    const base = process.env.GLPI_API_URL?.replace(/\/+$/, "");
    const userToken = process.env.GLPI_USER_TOKEN;
    const appToken = process.env.GLPI_APP_TOKEN;
    const tunnelKey = process.env.GLPI_TUNNEL_KEY;
    const accessId = process.env.GLPI_CF_ACCESS_CLIENT_ID;
    const accessSecret = process.env.GLPI_CF_ACCESS_CLIENT_SECRET;
    if (!keycloakUrl || !realm || !base || !userToken || Boolean(accessId) !== Boolean(accessSecret)) return json({ error: "Integrasi GLPI belum dikonfigurasi." }, 503);

    let input: JsonRecord = {};
    if (request.method === "POST") {
        try {
            const raw = await request.text();
            if (raw.length > 3_700_000) return json({ error: "Ukuran lampiran melebihi batas 2,5 MB." }, 413);
            input = asRecord(JSON.parse(raw));
        } catch { return json({ error: "Format permintaan tidak valid." }, 400); }
    }

    try {
        const identity = await fetch(`${keycloakUrl}/realms/${encodeURIComponent(realm)}/protocol/openid-connect/userinfo`, {
            headers: { Authorization: bearer, Accept: "application/json", "ngrok-skip-browser-warning": "true", ...(tunnelKey ? { "X-GLPI-Tunnel-Key": tunnelKey } : {}) },
            cache: "no-store", signal: AbortSignal.timeout(10_000),
        });
        if (!identity.ok) return json({ error: "Sesi SSO tidak valid atau sudah kedaluwarsa." }, 401);
        const user = await identity.json() as PortalUser;
        if (!user.sub) return json({ error: "Identitas SSO tidak dapat diverifikasi." }, 401);

        const loginHeaders = new Headers({ Authorization: `user_token ${userToken}`, Accept: "application/json" });
        if (appToken) loginHeaders.set("App-Token", appToken);
        if (tunnelKey) loginHeaders.set("X-GLPI-Tunnel-Key", tunnelKey);
        if (accessId && accessSecret) { loginHeaders.set("CF-Access-Client-Id", accessId); loginHeaders.set("CF-Access-Client-Secret", accessSecret); }
        const sessionResponse = await fetch(`${base}/initSession?get_full_session=true`, { headers: loginHeaders, cache: "no-store", signal: AbortSignal.timeout(10_000) });
        if (!sessionResponse.ok) return json({ error: "GLPI menolak koneksi API." }, 502);
        const sessionData = await sessionResponse.json() as { session_token?: string; session?: { glpiID?: number; glpiid?: number } };
        if (!sessionData.session_token) return json({ error: "GLPI tidak memberikan sesi API." }, 502);

        const common = new Headers({ ...(tunnelKey ? { "X-GLPI-Tunnel-Key": tunnelKey } : {}), ...(accessId && accessSecret ? { "CF-Access-Client-Id": accessId, "CF-Access-Client-Secret": accessSecret } : {}) });
        const headers = apiHeaders(sessionData.session_token, appToken, common);
        const url = new URL(request.url);
        const resource = url.searchParams.get("resource") || "tickets";
        try {
            if (request.method === "GET" && resource === "devices") {
                const email = user.email || user.preferred_username || "";
                const result = await getAssignedAssets(base, headers, email);
                if (result.permissionError === "users") return json({ error: "Akun integrasi GLPI belum memiliki hak baca/pencarian pengguna. Minta admin memberi hak baca Users pada profil akun integrasi; token Super-Admin tidak diperlukan." }, 403);
                if (result.permissionError === "assets") return json({ error: "Akun integrasi GLPI belum memiliki hak baca untuk satu atau lebih jenis aset. Minta admin memberi hak baca pada aset yang perlu ditampilkan." }, 403);
                return json({ assets: result.assets, linkedUser: result.glpiUserId !== null, glpiUserId: result.glpiUserId, email });
            }

            if (request.method === "GET" && resource === "knowledge") {
                const optionsResult = await glpiJson(base, "listSearchOptions/KnowbaseItem", headers);
                if (!optionsResult.response.ok) return json({ error: "Knowledge Base GLPI tidak dapat dimuat." }, 502);
                const options = Object.entries(optionsResult.data ?? {}) as Array<[string, SearchOption]>;
                const nameOption = options.find(([, option]) => option?.field === "name");
                const answerOption = options.find(([, option]) => option?.field === "answer");
                if (!nameOption) return json({ error: "Kolom artikel GLPI tidak tersedia." }, 502);
                const query = new URLSearchParams({ range: "0-49", withindexes: "true", order: "DESC" });
                const searchTerm = (url.searchParams.get("q") || "").trim().slice(0, 100);
                if (searchTerm) {
                    query.set("criteria[0][field]", nameOption[0]);
                    query.set("criteria[0][searchtype]", "contains");
                    query.set("criteria[0][value]", searchTerm);
                    if (answerOption) {
                        query.set("criteria[1][link]", "OR");
                        query.set("criteria[1][field]", answerOption[0]);
                        query.set("criteria[1][searchtype]", "contains");
                        query.set("criteria[1][value]", searchTerm);
                    }
                }
                const searchResult = await glpiJson(base, `search/KnowbaseItem?${query}`, headers);
                if (!searchResult.response.ok) return json({ error: "GLPI tidak dapat mencari artikel." }, 502);
                const ids = resultIds(asRecord(searchResult.data).data).slice(0, 50);
                const articles = await mapLimit(ids, 6, async (id) => {
                    const article = await glpiJson(base, `KnowbaseItem/${encodeURIComponent(id)}?get_hateoas=false`, headers);
                    const articleData = asRecord(article.data);
                    if (!article.response.ok || Number(articleData.is_deleted) === 1) return null;
                    return { id: Number(articleData.id ?? id), title: String(articleData.name ?? "Artikel GLPI"), answer: stripHtml(articleData.answer), category: articleData.knowbaseitemcategories_id ?? null, updatedAt: articleData.date_mod ?? null };
                });
                return json({ articles: articles.filter(Boolean) });
            }

            if (request.method === "GET" && resource === "ticket") {
                const id = url.searchParams.get("id") || "";
                const ticket = await getOwnedTicket(base, headers, id, user);
                if (!ticket) return json({ error: "Tiket tidak ditemukan atau bukan milik akun Anda." }, 404);
                const followupsResult = await glpiJson(base, `Ticket/${encodeURIComponent(id)}/ITILFollowup?range=0-99&expand_dropdowns=true&get_hateoas=false`, headers);
                const solutionsResult = await glpiJson(base, `Ticket/${encodeURIComponent(id)}/ITILSolution?range=0-99&expand_dropdowns=true&get_hateoas=false`, headers);
                const ticketDocumentLinks = await glpiJson(base, `Ticket/${encodeURIComponent(id)}/Document_Item?range=0-20&get_hateoas=false`, headers);
                const ticketAttachments = ticketDocumentLinks.response.ok
                    ? await mapLimit(records(ticketDocumentLinks.data).slice(0, 20), 6, async (link) => {
                        const document = await glpiJson(base, `Document/${encodeURIComponent(String(link.documents_id))}?get_hateoas=false`, headers);
                        const documentData = asRecord(document.data);
                        return document.response.ok ? { id: String(link.documents_id), name: String(documentData.name ?? documentData.filename ?? "Lampiran"), type: String(documentData.mime ?? "image/jpeg") } : null;
                    }) : [];
                const requesterName = String(ticket.content ?? "").match(/<strong>Pengaju Portal PID:<\/strong>\s*([^<]+)/i)?.[1]?.trim() || user.name || user.preferred_username || user.email || "Pengaju";
                const serviceUserId = Number(sessionData.session?.glpiID ?? sessionData.session?.glpiid ?? 0);
                const ticketAttachmentById = new Map<string, { id: string; name: string; type: string }>(ticketAttachments.filter((file): file is { id: string; name: string; type: string } => file !== null).map((file) => [String(file.id), file]));
                const followups = followupsResult.response.ok
                    ? await mapLimit(records(followupsResult.data).filter((followup) => Number(followup.is_private) === 0).slice(-100), 6, async (followup) => {
                        const rawContent = String(followup.content ?? "");
                        const portalMarker = user.sub ? `PortalPID-MSG:${user.sub}:PortalPID-END` : "";
                        const senderMatch = rawContent.match(/<strong>Pengaju Portal PID:<\/strong>\s*([^<]+)/i);
                        const fromRequester = Boolean(portalMarker && rawContent.includes(portalMarker)) || Boolean(senderMatch) || Boolean(serviceUserId && Number(followup.users_id) === serviceUserId);
                        const documentMarker = rawContent.match(/<!--PortalPID-DOCUMENT:(\d+)-->/i);
                        let attachments: Array<{ id: string; name: string; type: string }> = documentMarker ? [ticketAttachmentById.get(documentMarker[1])].filter(Boolean) as Array<{ id: string; name: string; type: string }> : [];
                        if (documentMarker && !attachments.length) {
                            const document = await glpiJson(base, `Document/${encodeURIComponent(documentMarker[1])}?get_hateoas=false`, headers);
                            const documentData = asRecord(document.data);
                            if (document.response.ok) attachments = [{ id: documentMarker[1], name: String(documentData.name ?? documentData.filename ?? "Lampiran"), type: String(documentData.mime ?? "image/jpeg") }];
                        }
                        if (!attachments.length) {
                            const links = await glpiJson(base, `ITILFollowup/${encodeURIComponent(String(followup.id))}/Document_Item?range=0-20&get_hateoas=false`, headers);
                            if (links.response.ok) {
                                attachments = (await mapLimit(records(links.data).slice(0, 20), 6, async (link) => {
                                    const documentId = link.documents_id;
                                    if (!documentId) return null;
                                    const document = await glpiJson(base, `Document/${encodeURIComponent(String(documentId))}?get_hateoas=false`, headers);
                                    const documentData = asRecord(document.data);
                                    return document.response.ok ? { id: String(documentId), name: String(documentData.name ?? documentData.filename ?? "Lampiran"), type: String(documentData.mime ?? "image/jpeg") } : null;
                                })).filter((file): file is { id: string; name: string; type: string } => file !== null);
                            }
                        }
                        const messageContent = rawContent.replace(/<!--PortalPID-MSG:[\s\S]*?-->/i, "").replace(/<!--PortalPID-DOCUMENT:\d+-->/i, "").replace(/<p>\s*<strong>PortalPID-MSG:[\s\S]*?<\/p>/i, "").replace(/<p>\s*<strong>Pengaju Portal PID:<\/strong>[\s\S]*?<\/p>/i, "").replace(/<hr\s*\/?>/i, "");
                        return { id: followup.id, message: stripHtml(messageContent), date: followup.date ?? followup.date_creation ?? null, author: fromRequester ? (senderMatch?.[1]?.trim() || requesterName) : String(followup.users_id ?? followup.users_id_recipient ?? "Technician"), speaker: fromRequester ? "requester" : "technician", attachments };
                    })
                    : [];
                const solutions = solutionsResult.response.ok
                    ? records(solutionsResult.data).map((solution) => ({
                        id: `solution-${solution.id}`,
                        message: stripHtml(solution.content),
                        date: solution.date_creation ?? solution.date ?? null,
                        author: typeof solution.users_id === "string" && !/^\d+$/.test(solution.users_id) ? solution.users_id : "Technician",
                        speaker: "technician",
                        kind: "solution",
                        attachments: [],
                    }))
                    : [];
                const conversation = [...followups, ...solutions].sort((left, right) => String(left.date ?? "").localeCompare(String(right.date ?? "")));
                const original = String(ticket.content ?? "")
                    .replace(/<p>\s*<strong>PortalPID-SSO:[\s\S]*?<\/p>/i, "")
                    .replace(/<p>\s*<strong>Pengaju Portal PID:<\/strong>[\s\S]*?<\/p>/i, "")
                    .replace(/<p>\s*<strong>Akun SSO:<\/strong>[\s\S]*?<\/p>/i, "")
                    .replace(/<hr\s*\/?>/i, "");
                return json({ ticket: { id: ticket.id, title: ticket.name, description: stripHtml(original), requester: requesterName, status: Number(ticket.status), date: ticket.date ?? null, date_mod: ticket.date_mod ?? ticket.date ?? null, type: Number(ticket.type), urgency: Number(ticket.urgency), attachments: ticketAttachments.filter(Boolean) }, followups: conversation });
            }

            if (request.method === "GET" && resource === "document") {
                const ticketId = url.searchParams.get("ticketId") || "";
                const documentId = url.searchParams.get("id") || "";
                const ticket = await getOwnedTicket(base, headers, ticketId, user);
                if (!ticket || !/^\d+$/.test(documentId)) return json({ error: "Lampiran tidak ditemukan atau bukan milik tiket Anda." }, 404);
                const ticketLinks = await glpiJson(base, `Ticket/${encodeURIComponent(ticketId)}/Document_Item?range=0-50&get_hateoas=false`, headers);
                const allowed = new Set<string>(ticketLinks.response.ok ? records(ticketLinks.data).map((link) => String(link.documents_id)) : []);
                const followups = await glpiJson(base, `Ticket/${encodeURIComponent(ticketId)}/ITILFollowup?range=0-99&get_hateoas=false`, headers);
                if (followups.response.ok) {
                    for (const followup of records(followups.data).filter((entry) => Number(entry.is_private) === 0)) {
                        const marker = String(followup.content ?? "").match(/<!--PortalPID-DOCUMENT:(\d+)-->/i);
                        if (marker) allowed.add(marker[1]);
                        const links = await glpiJson(base, `ITILFollowup/${encodeURIComponent(String(followup.id))}/Document_Item?range=0-50&get_hateoas=false`, headers);
                        if (links.response.ok) records(links.data).forEach((link) => allowed.add(String(link.documents_id)));
                    }
                }
                if (!allowed.has(documentId)) return json({ error: "Lampiran tidak terhubung ke tiket ini." }, 404);
                const mediaHeaders = new Headers(headers); mediaHeaders.set("Accept", "application/octet-stream");
                const media = await fetch(`${base}/Document/${encodeURIComponent(documentId)}?alt=media`, { headers: mediaHeaders, cache: "no-store", signal: AbortSignal.timeout(15_000) });
                if (!media.ok) return json({ error: "File lampiran belum dapat dibaca dari GLPI." }, 502);
                const bytes = new Uint8Array(await media.arrayBuffer());
                if (bytes.length > 3_000_000) return json({ error: "File terlalu besar untuk pratinjau portal." }, 413);
                let binary = ""; for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
                const type = media.headers.get("content-type")?.split(";")[0] || "application/octet-stream";
                if (!type.startsWith("image/")) return json({ error: "Lampiran ini bukan gambar." }, 415);
                return json({ type, base64: btoa(binary) });
            }

            if (request.method === "POST" && input.action === "close-ticket") {
                const ticketId = String(input.ticketId ?? "");
                const ticket = await getOwnedTicket(base, headers, ticketId, user);
                if (!ticket) return json({ error: "Tiket tidak ditemukan atau bukan milik akun Anda." }, 404);
                if (Number(ticket.status) === 6) return json({ ok: true, status: 6, alreadyClosed: true });
                if (Number(ticket.status) === 5) return json({ ok: true, status: 5, alreadySolved: true });
                const closed = await fetch(`${base}/Ticket/${encodeURIComponent(ticketId)}?session_write=true`, {
                    method: "PUT",
                    headers: apiHeaders(sessionData.session_token, appToken, new Headers({ ...Object.fromEntries(common), "Content-Type": "application/json" })),
                    body: JSON.stringify({ input: { id: Number(ticketId), status: 6 } }),
                    cache: "no-store", signal: AbortSignal.timeout(15_000),
                });
                const closeData: unknown = await closed.json().catch(() => null);
                const closeRecord = asRecord(closeData);
                const updateSucceeded = closed.ok && (Array.isArray(closeData) ? closeData.some((entry) => asRecord(entry)[String(ticketId)] === true) : closeRecord[String(ticketId)] === true || closeRecord.id === Number(ticketId));
                if (!updateSucceeded) return json({ error: `GLPI belum dapat menutup tiket. Pastikan akun API memiliki hak mengubah status tiket.${closeRecord.message ? ` (${String(closeRecord.message).slice(0, 220)})` : ""}` }, 502);
                return json({ ok: true, status: 6 });
            }

            if (request.method === "POST" && input.action === "followup") {
                const ticketId = String(input.ticketId ?? "");
                const ticket = await getOwnedTicket(base, headers, ticketId, user);
                if (!ticket) return json({ error: "Tiket tidak ditemukan atau bukan milik akun Anda." }, 404);
                const message = typeof input.message === "string" ? input.message.trim() : "";
                if (!message || message.length > 5_000) return json({ error: "Pesan wajib diisi (maksimal 5.000 karakter)." }, 400);
                const fileRecord = input.file && typeof input.file === "object" ? asRecord(input.file) : {};
                const file: { name?: string; type?: string; base64?: string } | null = typeof fileRecord.base64 === "string" ? { name: String(fileRecord.name ?? ""), type: String(fileRecord.type ?? ""), base64: fileRecord.base64 } : null;
                let fileBytes: Uint8Array | null = null;
                if (file?.base64) {
                    const mime = String(file.type ?? "").toLowerCase();
                    const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
                    if (!allowed.has(mime)) return json({ error: "Lampiran hanya boleh berupa JPG, PNG, WEBP, atau GIF." }, 400);
                    const decoded = atob(String(file.base64));
                    if (decoded.length > 2_500_000) return json({ error: "Ukuran gambar maksimal 2,5 MB." }, 413);
                    fileBytes = Uint8Array.from(decoded, (char) => char.charCodeAt(0));
                    const signature = Array.from(fileBytes.slice(0, 12));
                    const validImage = mime === "image/jpeg" ? signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff
                        : mime === "image/png" ? signature.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10"
                        : mime === "image/gif" ? String.fromCharCode(...signature.slice(0, 6)).startsWith("GIF8")
                        : mime === "image/webp" ? String.fromCharCode(...signature.slice(0, 4)) === "RIFF" && String.fromCharCode(...signature.slice(8, 12)) === "WEBP"
                        : false;
                    if (!validImage) return json({ error: "Isi lampiran tidak sesuai dengan format gambar yang dipilih." }, 400);
                }
                const requesterName = user.name || user.preferred_username || user.email || "Pengaju Portal PID";
                const portalMarker = `PortalPID-MSG:${user.sub}:PortalPID-END`;
                const requesterEmail = user.email || user.preferred_username || "";
                const messageContent = `<!--${portalMarker}--><p><strong>Pengaju Portal PID:</strong> ${escapeHtml(requesterName)}${requesterEmail ? ` (${escapeHtml(requesterEmail)})` : ""}</p><hr><p>${escapeHtml(message).replaceAll("\r\n", "\n").replaceAll("\n", "<br>")}</p>`;
                const followup = await fetch(`${base}/Ticket/${encodeURIComponent(ticketId)}/ITILFollowup?session_write=true`, {
                    method: "POST", headers: apiHeaders(sessionData.session_token, appToken, new Headers({ ...Object.fromEntries(common) , "Content-Type": "application/json" })),
                    body: JSON.stringify({ input: { tickets_id: ticketId, itemtype: "Ticket", items_id: ticketId, is_private: 0, requesttypes_id: 1, content: messageContent } }),
                    cache: "no-store", signal: AbortSignal.timeout(15_000),
                });
                const followupData: unknown = await followup.json().catch(() => null);
                const followupRecord = asRecord(followupData);
                if (!followup.ok) return json({ error: "Pesan belum dapat dikirim ke GLPI. Periksa hak akses Followup pada akun integrasi." }, 502);
                const followupId = Number(followupRecord.id ?? (Array.isArray(followupData) ? asRecord(followupData[0]).id : 0));
                let attachmentAdded = !file;
                let warning: string | undefined;
                if (file && fileBytes && followupId) {
                    const filename = String(file.name ?? "lampiran").replace(/[\\/:*?"<>|\r\n]/g, "_").slice(-100) || "lampiran";
                    const form = new FormData();
                    form.append("uploadManifest", JSON.stringify({ input: { name: filename, _filename: [filename], itemtype: "ITILFollowup", items_id: followupId } }));
                    form.append("filename[0]", new Blob([fileBytes], { type: String(file.type) }), filename);
                    const uploaded = await fetch(`${base}/Document/?session_write=true`, { method: "POST", headers: apiHeaders(sessionData.session_token, appToken, common), body: form, cache: "no-store", signal: AbortSignal.timeout(20_000) });
                    const documentData = asRecord(await uploaded.json().catch(() => null));
                    if (uploaded.ok && documentData.id) {
                        const markedContent = `${messageContent}<!--PortalPID-DOCUMENT:${Number(documentData.id)}-->`;
                        const marked = await fetch(`${base}/ITILFollowup/${encodeURIComponent(String(followupId))}?session_write=true`, { method: "PUT", headers: apiHeaders(sessionData.session_token, appToken, new Headers({ ...Object.fromEntries(common), "Content-Type": "application/json" })), body: JSON.stringify({ input: { id: followupId, content: markedContent } }), cache: "no-store", signal: AbortSignal.timeout(15_000) });
                        attachmentAdded = marked.ok;
                        if (!attachmentAdded) warning = "Gambar tersimpan di GLPI, tetapi pesan belum dapat menyimpan rujukan lampiran.";
                    } else warning = `Pesan terkirim, tetapi gambar belum dapat dilampirkan ke pesan GLPI (HTTP ${uploaded.status}).`;
                } else if (file) {
                    warning = "Pesan terkirim, tetapi GLPI tidak memberikan ID pesan untuk mengaitkan gambar.";
                }
                return json({ ok: true, attachmentAdded, warning });
            }

            return json({ error: "Permintaan GLPI tidak dikenal." }, 400);
        } finally {
            await fetch(`${base}/killSession`, { headers: apiHeaders(sessionData.session_token, appToken, common), cache: "no-store" }).catch(() => undefined);
        }
    } catch {
        return json({ error: "Tidak dapat menghubungi layanan GLPI. Coba lagi beberapa saat." }, 502);
    }
}

type NodeRequest = { method?: string; url?: string; headers?: Record<string, string | string[] | undefined>; body?: unknown };
type NodeResponse = { statusCode?: number; setHeader(name: string, value: string): void; end(body?: string | Uint8Array): void };

export default async function handler(request: Request | NodeRequest, response?: NodeResponse): Promise<Response | void> {
    if (typeof (request as Request).headers?.get === "function") return handlePortalRequest(request as Request);
    if (!response) throw new Error("Node response is required by the Vercel runtime.");
    const node = request as NodeRequest;
    const headers = new Headers();
    for (const [name, value] of Object.entries(node.headers ?? {})) {
        if (["host", "content-length", "transfer-encoding"].includes(name.toLowerCase())) continue;
        if (typeof value === "string") headers.set(name, value);
        else if (Array.isArray(value)) headers.set(name, value.join(", "));
    }
    let body: string | undefined;
    if (node.method !== "GET" && node.method !== "HEAD") body = typeof node.body === "string" ? node.body : JSON.stringify(node.body ?? {});
    const webRequest = new Request(new URL(node.url || "/api/glpi-portal", "http://localhost"), { method: node.method || "GET", headers, ...(body === undefined ? {} : { body }) });
    const result = await handlePortalRequest(webRequest);
    response.statusCode = result.status;
    result.headers.forEach((value, name) => response.setHeader(name, value));
    response.end(await result.text());
}
