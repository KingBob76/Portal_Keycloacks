type UserInfo = { sub?: string };
type KeycloakEvent = {
    id?: string;
    time?: number;
    type?: string;
    ipAddress?: string;
    error?: string;
    details?: Record<string, string>;
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
});

export default async function handler(request: Request): Promise<Response> {
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);

    const keycloakUrl = process.env.KEYCLOAK_URL?.replace(/\/+$/, "");
    const realm = process.env.KEYCLOAK_REALM;
    const adminClientId = process.env.KEYCLOAK_EVENTS_CLIENT_ID;
    const adminClientSecret = process.env.KEYCLOAK_EVENTS_CLIENT_SECRET;
    if (!keycloakUrl || !realm || !adminClientId || !adminClientSecret) {
        return json({ error: "Login event service is not configured" }, 503);
    }

    const bearer = request.headers.get("authorization");
    if (!bearer?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const base = `${keycloakUrl}/realms/${encodeURIComponent(realm)}/protocol/openid-connect`;

    try {
        // Authenticate the caller using their own Keycloak access token, then
        // always scope the privileged event query to the verified subject.
        const userInfoResponse = await fetch(`${base}/userinfo`, {
            headers: { Authorization: bearer, Accept: "application/json", "ngrok-skip-browser-warning": "true" },
            cache: "no-store",
        });
        if (!userInfoResponse.ok) return json({ error: "Unauthorized" }, 401);
        const userInfo = await userInfoResponse.json() as UserInfo;
        if (!userInfo.sub) return json({ error: "Unauthorized" }, 401);

        const tokenResponse = await fetch(`${base}/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json", "ngrok-skip-browser-warning": "true" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: adminClientId,
                client_secret: adminClientSecret,
            }),
            cache: "no-store",
        });
        if (!tokenResponse.ok) return json({ error: "Unable to read Keycloak events" }, 502);
        const tokenData = await tokenResponse.json() as { access_token?: string };
        if (!tokenData.access_token) return json({ error: "Unable to read Keycloak events" }, 502);

        const params = new URLSearchParams({ user: userInfo.sub, max: "30", direction: "desc" });
        params.append("type", "LOGIN");
        params.append("type", "LOGIN_ERROR");
        params.append("type", "LOGOUT");
        const eventsResponse = await fetch(
            `${keycloakUrl}/admin/realms/${encodeURIComponent(realm)}/events?${params}`,
            { headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: "application/json", "ngrok-skip-browser-warning": "true" }, cache: "no-store" },
        );
        if (!eventsResponse.ok) return json({ error: "Keycloak event access is not available" }, eventsResponse.status === 403 ? 403 : 502);
        const events = await eventsResponse.json() as KeycloakEvent[];
        return json(Array.isArray(events) ? events.map(({ id, time, type, ipAddress, error, details }) => ({ id, time, type, ipAddress, error, details })) : []);
    } catch {
        return json({ error: "Unable to connect to Keycloak" }, 502);
    }
}
