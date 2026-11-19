type UserInfo = { sub?: string };
type UserSession = { id?: string; ipAddress?: string; start?: number; lastAccess?: number; clients?: Record<string, string> };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

export default async function handler(request: Request): Promise<Response> {
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
    const keycloakUrl = process.env.KEYCLOAK_URL?.replace(/\/+$/, "");
    const realm = process.env.KEYCLOAK_REALM;
    const clientId = process.env.KEYCLOAK_EVENTS_CLIENT_ID;
    const clientSecret = process.env.KEYCLOAK_EVENTS_CLIENT_SECRET;
    if (!keycloakUrl || !realm || !clientId || !clientSecret) return json({ error: "Keycloak session service is not configured" }, 503);
    const bearer = request.headers.get("authorization");
    if (!bearer?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const base = keycloakUrl + "/realms/" + encodeURIComponent(realm) + "/protocol/openid-connect";
    try {
        const userResponse = await fetch(base + "/userinfo", { headers: { Authorization: bearer, Accept: "application/json", "ngrok-skip-browser-warning": "true" }, cache: "no-store" });
        if (!userResponse.ok) return json({ error: "Unauthorized" }, 401);
        const user = await userResponse.json() as UserInfo;
        if (!user.sub) return json({ error: "Unauthorized" }, 401);
        const tokenResponse = await fetch(base + "/token", {
            method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json", "ngrok-skip-browser-warning": "true" },
            body: new URLSearchParams({ grant_type: "client_credentials", client_id: clientId, client_secret: clientSecret }), cache: "no-store",
        });
        if (!tokenResponse.ok) return json({ error: "Unable to authenticate Keycloak session reader" }, 502);
        const tokenData = await tokenResponse.json() as { access_token?: string };
        if (!tokenData.access_token) return json({ error: "Keycloak did not return an access token" }, 502);
        const sessionsResponse = await fetch(keycloakUrl + "/admin/realms/" + encodeURIComponent(realm) + "/users/" + encodeURIComponent(user.sub) + "/sessions", {
            headers: { Authorization: "Bearer " + tokenData.access_token, Accept: "application/json", "ngrok-skip-browser-warning": "true" }, cache: "no-store",
        });
        if (!sessionsResponse.ok) return json({ error: sessionsResponse.status === 403 ? "Session reader needs the view-users role" : "Keycloak session lookup failed" }, sessionsResponse.status === 403 ? 403 : 502);
        const sessions = await sessionsResponse.json() as UserSession[];
        return json(Array.isArray(sessions) ? sessions.map((session) => ({ id: session.id, ipAddress: session.ipAddress, start: session.start, lastAccess: session.lastAccess, clients: session.clients ? Object.values(session.clients) : [] })) : []);
    } catch { return json({ error: "Unable to connect to Keycloak" }, 502); }
}
