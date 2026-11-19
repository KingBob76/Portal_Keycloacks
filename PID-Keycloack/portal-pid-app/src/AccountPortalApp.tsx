import { useCallback, useEffect, useRef, useState } from "react";
import type Keycloak from "keycloak-js";

type Props = { keycloak: Keycloak };
type Profile = { username: string; email: string; firstName: string; lastName: string; bio: string };

function errorMessage(value: unknown): string {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value instanceof Error && value.message) return value.message;
    if (value && typeof value === "object") {
        const record = value as Record<string, unknown>;
        for (const key of ["message", "error_description", "detail", "error", "title"]) {
            const nested = record[key];
            if (typeof nested === "string" && nested.trim()) return nested.trim();
            if (nested && typeof nested === "object") {
                const child = errorMessage(nested);
                if (child) return child;
            }
        }
        try { return JSON.stringify(value); } catch { return ""; }
    }
    return "";
}
function attributeText(value: unknown): string {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) { const text = value.find((item) => typeof item === "string"); return typeof text === "string" ? text : ""; }
    return "";
}

export default function AccountPortalApp({ keycloak }: Props) {
    const [ready, setReady] = useState(false);
    const portalFrameRef = useRef<HTMLIFrameElement>(null);
    const claims = keycloak.tokenParsed ?? {};
    const username = String(claims.preferred_username ?? claims.email ?? "");
    const identity = { username, email: String(claims.email ?? ""), firstName: String(claims.given_name ?? ""), lastName: String(claims.family_name ?? "") };
    const [profile, setProfile] = useState<Profile>({ ...identity, bio: "" });
    const displayName = (profile.firstName + " " + profile.lastName).trim() || username;

    const postPortalToken = useCallback(async () => {
        try {
            await keycloak.updateToken(30);
            const frame = portalFrameRef.current?.contentWindow;
            if (frame && keycloak.token) frame.postMessage({ type: "PID_PORTAL_AUTH", token: keycloak.token }, window.location.origin);
        } catch (error) { console.error("Could not refresh the Portal PID SSO session.", error); }
    }, [keycloak]);

    const sendProfile = useCallback(() => {
        const iframe = portalFrameRef.current;
        const frame = iframe?.contentWindow;
        if (!frame) return;
        frame.postMessage({ type: "PID_PROFILE_DATA", profile }, window.location.origin);
        const doc = iframe?.contentDocument;
        const display = (profile.firstName + " " + profile.lastName).trim() || profile.username;
        const name = doc?.querySelector<HTMLElement>("#userBtn .u1");
        const role = doc?.querySelector<HTMLElement>("#userBtn .u2");
        const avatar = doc?.querySelector<HTMLElement>("#userBtn .avatar");
        const menuName = doc?.querySelector<HTMLElement>("#umPanel .who b");
        if (name) name.textContent = display;
        if (role) role.textContent = profile.email || profile.username;
        if (avatar) avatar.textContent = display.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
        if (menuName) menuName.textContent = display;
    }, [profile]);

    useEffect(() => {
        let cancelled = false;
        void keycloak.loadUserProfile().then((account) => {
            if (cancelled) return;
            setProfile({ username: account.username ?? username, email: account.email ?? identity.email, firstName: account.firstName ?? identity.firstName, lastName: account.lastName ?? identity.lastName, bio: attributeText(account.attributes?.bio) });
        }).catch((error: unknown) => console.error("Could not load the Keycloak profile.", error));
        return () => { cancelled = true; };
    }, [keycloak, username, identity.email, identity.firstName, identity.lastName]);

    useEffect(() => {
        const knownDemoAccount = ["staff", "sales", "ops", "trainer", "vendor"].includes(username.toLowerCase()) ? username.toLowerCase() : "staff";
        try {
            localStorage.setItem("pidc_lms_auth", "1"); sessionStorage.setItem("pidc_lms_auth", "1");
            localStorage.setItem("pidc_lms_user", username); sessionStorage.setItem("pidc_lms_user", username);
            localStorage.setItem("pidc_lms_acct", knownDemoAccount); sessionStorage.setItem("pidc_lms_acct", knownDemoAccount);
        } catch (error) { console.error("Could not sync the authenticated Keycloak session to the dashboard.", error); }
        const readyTimer = window.setTimeout(() => setReady(true), 0);
        return () => window.clearTimeout(readyTimer);
    }, [username]);

    const saveProfile = useCallback(async (next: Profile): Promise<Profile> => {
        await keycloak.updateToken(30);
        if (!keycloak.token) throw new Error("Token Keycloak tidak tersedia.");
        const response = await fetch("/api/keycloak-account-profile", {
            method: "POST",
            headers: { Authorization: "Bearer " + keycloak.token, "Content-Type": "application/json", Accept: "application/json" },
            // Email is intentionally locked in My Profile; do not submit a stale
            // read-only value that could overwrite a newer address from Keycloak.
            body: JSON.stringify({ firstName: next.firstName, lastName: next.lastName, bio: next.bio }),
        });
        const result = await response.json().catch(() => null) as (Profile & { error?: unknown }) | null;
        if (!response.ok || !result) throw new Error(errorMessage(result?.error) || "Profil gagal disimpan. Coba lagi.");
        const saved: Profile = { ...next, username: result.username, email: result.email, firstName: result.firstName, lastName: result.lastName, bio: result.bio };
        setProfile(saved);
        return saved;
    }, [keycloak]);

    const ssoProfileUrl = useCallback(() => {
        const authServerUrl = keycloak.authServerUrl?.replace(/\/+$/, "");
        if (!authServerUrl || !keycloak.realm) return "";
        const returnUrl = new URL(window.location.origin);
        returnUrl.searchParams.set("pidcPortal", "1");
        const accountUrl = new URL(authServerUrl + "/realms/" + encodeURIComponent(keycloak.realm) + "/account/");
        accountUrl.searchParams.set("referrer", import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "portal-pid");
        accountUrl.searchParams.set("referrer_uri", returnUrl.toString());
        accountUrl.searchParams.set("pidcView", "profile");
        accountUrl.hash = "publicprofile";
        return accountUrl.toString();
    }, [keycloak]);
    const openSsoProfile = useCallback(() => {
        const target = ssoProfileUrl();
        if (target) window.open(target, "_blank", "noopener,noreferrer");
    }, [ssoProfileUrl]);

    const postToFrame = useCallback((data: unknown) => { portalFrameRef.current?.contentWindow?.postMessage(data, window.location.origin); }, []);
    const handlePortalMessage = useCallback(async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.data === "PID_PORTAL_LOGOUT") { void keycloak.logout({ redirectUri: window.location.origin }); return; }
        if (event.data === "PID_OPEN_SSO_PROFILE") { openSsoProfile(); return; }
        if (event.data === "PID_CHANGE_PROFILE_PASSWORD") {
            const returnUrl = new URL(window.location.origin); returnUrl.searchParams.set("pidcView", "profile");
            try { await keycloak.login({ action: "UPDATE_PASSWORD", redirectUri: returnUrl.toString() }); }
            catch (error) { console.error("Could not open the Keycloak password update action.", error); }
            return;
        }
        if (event.data?.type === "PID_PROFILE_SAVE" && event.data.profile) {
            try { const saved = await saveProfile(event.data.profile); postToFrame({ type: "PID_PROFILE_SAVE_RESULT", ok: true, profile: saved }); }
            catch (error) { postToFrame({ type: "PID_PROFILE_SAVE_RESULT", ok: false, error: error instanceof Error ? error.message : "Keycloak menolak perubahan profil." }); }
        }
    }, [keycloak, openSsoProfile, postToFrame, saveProfile]);

    useEffect(() => {
        window.addEventListener("message", handlePortalMessage);
        return () => window.removeEventListener("message", handlePortalMessage);
    }, [handlePortalMessage]);
    useEffect(() => { if (!ready) return; void postPortalToken(); const timer = window.setInterval(() => void postPortalToken(), 60_000); return () => window.clearInterval(timer); }, [ready, postPortalToken]);
    useEffect(sendProfile, [sendProfile]);

    if (!ready) return <p style={{ padding: 24 }}>Membuka Portal PID…</p>;
    return <iframe ref={portalFrameRef} title="Portal PID Dashboard" src="/portal/index.html" data-sso-profile-url={ssoProfileUrl()} onLoad={(event) => {
        const doc = event.currentTarget.contentDocument; if (!doc) return;
        const name = doc.querySelector<HTMLElement>("#userBtn .u1"); const role = doc.querySelector<HTMLElement>("#userBtn .u2");
        const avatar = doc.querySelector<HTMLElement>("#userBtn .avatar"); const menuName = doc.querySelector<HTMLElement>("#umPanel .who b");
        if (name) name.textContent = displayName; if (role) role.textContent = profile.email || username;
        if (avatar) avatar.textContent = displayName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
        if (menuName) menuName.textContent = displayName;
        void postPortalToken(); sendProfile();
        if (new URLSearchParams(window.location.search).get("pidcView") === "profile") {
            event.currentTarget.contentWindow?.postMessage({ type: "PID_SHOW_MY_PROFILE" }, window.location.origin);
            window.history.replaceState({}, "", window.location.pathname);
        }
    }} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }} />;
}

