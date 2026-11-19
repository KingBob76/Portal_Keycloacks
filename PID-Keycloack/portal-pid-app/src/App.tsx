import { useCallback, useEffect, useState } from "react";
import type Keycloak from "keycloak-js";
import SsoPortal, { type SsoProfile } from "./SsoPortal";

type Props = {
    keycloak: Keycloak;
};

type Page = "loading" | "sso" | "dashboard";

function attributeText(value: unknown): string {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
        const firstText = value.find((item) => typeof item === "string");
        return typeof firstText === "string" ? firstText : "";
    }
    return "";
}

export default function App({ keycloak }: Props) {
    const claims = keycloak.tokenParsed ?? {};
    const identity = {
        subject: claims.sub ?? "",
        username: claims.preferred_username ?? claims.email ?? "",
        email: claims.email ?? "",
        firstName: claims.given_name ?? "",
        lastName: claims.family_name ?? "",
    };
    const bioClaim = claims.bio;

    const [page, setPage] = useState<Page>("loading");
    const [ssoStartView, setSsoStartView] = useState<"home" | "profile">("home");
    const [profile, setProfile] = useState<SsoProfile>({
        username: identity.username,
        email: identity.email,
        firstName: identity.firstName,
        lastName: identity.lastName,
        bio: "",
    });

    useEffect(() => {
        let cancelled = false;

        async function loadProfile() {
            try {
                const account = await keycloak.loadUserProfile();
                const bio = attributeText(account.attributes?.bio);
                const loadedProfile: SsoProfile = {
                    username: account.username ?? identity.username,
                    email: account.email ?? identity.email,
                    firstName: account.firstName ?? identity.firstName,
                    lastName: account.lastName ?? identity.lastName,
                    bio,
                };

                if (cancelled) return;

                setProfile(loadedProfile);
                // An explicit LMS launch resumes the workspace; a normal
                // authenticated visit starts at the SSO Profile app launcher.
                const openDashboard = sessionStorage.getItem("pidc_open_dashboard_after_account") === "1";
                if (openDashboard) sessionStorage.removeItem("pidc_open_dashboard_after_account");
                setPage(openDashboard ? "dashboard" : "sso");
            } catch (error) {
                console.error("Failed to load Keycloak account profile:", error);
                if (cancelled) return;

                // The Account REST API can reject profile reads when the user
                // lacks account.view-profile. Authentication has already
                // succeeded, so keep the SSO flow available using token claims.
                setProfile({
                    username: identity.username,
                    email: identity.email,
                    firstName: identity.firstName,
                    lastName: identity.lastName,
                    bio: attributeText(bioClaim),
                });
                setPage("sso");
            }
        }

        void loadProfile();

        return () => {
            cancelled = true;
        };
    }, [keycloak, identity.username, identity.email, identity.firstName, identity.lastName, bioClaim]);

    const logout = useCallback(() => {
        try {
            sessionStorage.removeItem("pidc_lms_auth");
            localStorage.removeItem("pidc_lms_auth");
        } catch { /* Continue with Keycloak logout when browser storage is unavailable. */ }
        void keycloak.logout({ redirectUri: window.location.origin });
    }, [keycloak]);

    useEffect(() => {
        function handlePortalMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin) return;
            if (event.data === "PID_PORTAL_LOGOUT") logout();
            if (event.data === "PID_OPEN_SSO_PROFILE") {
                setSsoStartView("profile");
                setPage("sso");
            }
        }

        window.addEventListener("message", handlePortalMessage);
        return () => window.removeEventListener("message", handlePortalMessage);
    }, [keycloak, logout]);

    async function saveProfile(nextProfile: SsoProfile): Promise<void> {
        await keycloak.updateToken(30);

        if (!keycloak.token) {
            throw new Error("Token Keycloak tidak tersedia.");
        }
        const response = await fetch("/api/keycloak-account-profile", {
            method: "POST",
            headers: { Authorization: `Bearer ${keycloak.token}`, "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ firstName: nextProfile.firstName, lastName: nextProfile.lastName, bio: nextProfile.bio }),
        });
        const result = await response.json().catch(() => null) as (SsoProfile & { error?: unknown }) | null;
        if (!response.ok || !result) {
            const error = result?.error;
            const message = typeof error === "string" ? error : error && typeof error === "object" && "message" in error ? String(error.message) : `Profil gagal disimpan (HTTP ${response.status}).`;
            throw new Error(message);
        }
        const savedProfile: SsoProfile = { ...nextProfile, username: result.username, email: result.email, firstName: result.firstName, lastName: result.lastName, bio: result.bio };
        setProfile(savedProfile);
    }

    if (page === "loading") {
        return <p style={{ padding: 24 }}>Memeriksa profil Portal PID…</p>;
    }

    if (page === "sso") {
        return (
            <SsoPortal
                keycloak={keycloak}
                identity={identity}
                initialProfile={profile}
                initialView={ssoStartView}
                onOpenPortal={() => {
                    setSsoStartView("home");
                    sessionStorage.setItem("pidc_lms_auth", "1");
                    setPage("dashboard");
                }}
                onSaveProfile={saveProfile}
                onLogout={logout}
            />
        );
    }

    const displayName = `${profile.firstName} ${profile.lastName}`.trim() || identity.username;
    return (
        <iframe
            title="Portal PID Dashboard"
            src="/portal/index.html"
            onLoad={(event) => {
                const doc = event.currentTarget.contentDocument;
                if (!doc) return;
                const name = doc.querySelector<HTMLElement>("#userBtn .u1");
                const role = doc.querySelector<HTMLElement>("#userBtn .u2");
                const avatar = doc.querySelector<HTMLElement>("#userBtn .avatar");
                const menuName = doc.querySelector<HTMLElement>("#umPanel .who b");
                if (name) name.textContent = displayName;
                if (role) role.textContent = identity.email || identity.username;
                if (avatar) avatar.textContent = displayName.split(/\s+/).map((part: string) => part[0]).join("").slice(0, 2).toUpperCase();
                if (menuName) menuName.textContent = displayName;
            }}
            style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
    );
}
