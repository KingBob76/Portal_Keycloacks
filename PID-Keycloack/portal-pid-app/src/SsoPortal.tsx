import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type Keycloak from "keycloak-js";
import "./sso-profile.css";

export type SsoIdentity = {
    subject: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type SsoProfile = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
};

type Props = {
    keycloak: Keycloak;
    identity: SsoIdentity;
    onOpenPortal: () => void;
    onSaveProfile: (profile: SsoProfile) => Promise<void>;
    onLogout: () => void;
    initialProfile: SsoProfile;
    initialView?: View;
};

type View = "home" | "applications" | "information" | "profile" | "account";
type AccountSection = "signin" | "sessions" | "history";
type IconName = "grid" | "list" | "user" | "globe" | "out" | "external" | "book" | "ticket" | "info" | "shield" | "sun" | "moon" | "monitor" | "home" | "search" | "clock" | "mail" | "cart" | "file" | "headset" | "card" | "compass" | "users" | "calendar" | "cap" | "heart" | "mega" | "menu" | "close" | "bell";

function Icon({ name }: { name: IconName }) {
    const paths: Record<IconName, ReactNode> = {
        grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
        list: <><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>,
        user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
        globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0-20" /></>,
        out: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></>,
        external: <><path d="M15 3h6v6M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
        book: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />,
        ticket: <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM13 5v2M13 17v2M13 11v2" />,
        info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>,
        shield: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />,
        sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
        moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />,
        monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
        home: <><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
        search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
        clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
        mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
        cart: <><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2 2h2l2.5 12.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 7H5" /></>,
        file: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h6M8 13h8M8 17h8" /></>,
        headset: <><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><path d="M3 14h3v7H5a2 2 0 0 1-2-2zM21 14h-3v7h1a2 2 0 0 0 2-2z" /></>,
        card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>,
        compass: <><circle cx="12" cy="12" r="10" /><path d="m16 8-2.5 6.5L7 17l2.5-6.5z" /></>,
        users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
        calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
        cap: <><path d="m2 10 10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5M22 10v6" /></>,
        heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" />,
        mega: <><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
        menu: <path d="M3 6h18M3 12h18M3 18h18" />,
        close: <path d="m18 6-12 12M6 6l12 12" />,
        bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
    };

    return <svg className="i" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

const applications = [
    { name: "eOffice", group: "Administration", icon: "mail" as const, description: "Surat menyurat & agenda dinas.", url: "https://eoffice.example.com" },
    { name: "e-Procurement", group: "Procurement", icon: "cart" as const, description: "Pengadaan barang & jasa online.", url: "https://eprocurement.example.com" },
    { name: "e-Document", group: "Administration", icon: "file" as const, description: "Pengelolaan dokumen digital.", url: "https://edocument.example.com" },
    { name: "IT Service Mgmt", group: "IT", icon: "headset" as const, description: "Tiket & layanan helpdesk IT.", url: "https://itsm.example.com" },
    { name: "E-Billing System", group: "Finance", icon: "card" as const, description: "Tagihan & manajemen keuangan.", url: "https://ebilling.example.com" },
    { name: "Content Portal", group: "Communication", icon: "compass" as const, description: "Manajemen konten & publikasi web.", url: "https://content.example.com" },
    { name: "HR Management", group: "HR", icon: "users" as const, description: "Data & administrasi kepegawaian.", url: "https://hr.example.com" },
    { name: "Events Manager", group: "Operations", icon: "calendar" as const, description: "Pengelolaan & jadwal acara organisasi.", url: "https://events.example.com" },
    { name: "Learning Center", group: "Learning", icon: "book" as const, description: "Knowledge sharing & pustaka digital.", url: "https://learning.example.com" },
    { name: "LMS", group: "Learning", icon: "cap" as const, description: "E-learning & program pelatihan karyawan.", url: null },
    { name: "QHSSE", group: "Operations", icon: "shield" as const, description: "K3, kualitas & manajemen lingkungan hidup.", url: "https://qhsse.example.com" },
    { name: "Laporan Kesehatan", group: "HR", icon: "heart" as const, description: "Pelaporan kesehatan & medis karyawan.", url: "https://kesehatan.example.com" },
    { name: "ESS", group: "HR", icon: "user" as const, description: "Employee Self Service, layanan mandiri.", url: "https://ess.example.com" },
    { name: "PELNI Doc", group: "IT", icon: "file" as const, description: "Dokumentasi teknis & arsip internal.", url: "https://doc.example.com" },
];

const announcements = [
    { tag: "Maintenance", tone: "warn", date: "20 Okt 2026", title: "Maintenance jaringan kantor pusat, Sabtu 24 Okt 22:00 sampai 02:00 WIB", body: "Akses internet, VPN, dan aplikasi internal dapat terputus sementara. Simpan pekerjaan Anda sebelum jadwal dimulai." },
    { tag: "Security", tone: "", date: "19 Okt 2026", title: "Kebijakan password baru berlaku mulai 1 November 2026", body: "Password minimal 12 karakter. Ubah password Anda lewat Account settings, bagian Sign in." },
    { tag: "Info", tone: "", date: "15 Okt 2026", title: "Aplikasi Manual Book sudah memuat panduan VPN terbaru", body: "Buka Applications, lalu Manual Book, untuk melihat langkah koneksi dari rumah." },
];

const navigation = [
    ["profile", "user", "Public profile"],
    ["account", "shield", "Account settings"],
] as const;

type KeycloakSession = { id: string; ipAddress?: string; start?: number; lastAccess?: number; clients?: string[] };
type LoginEvent = { id?: string; time?: number; type?: string; ipAddress?: string; error?: string; details?: Record<string, string> };

function formatActivityTime(value?: number) {
    if (!value) return "Waktu tidak tersedia";
    // Keycloak event timestamps are milliseconds; session timestamps are seconds.
    const milliseconds = value < 10_000_000_000 ? value * 1000 : value;
    return new Date(milliseconds).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "medium" });
}

export default function SsoPortal({ keycloak, identity, onOpenPortal, onSaveProfile, onLogout, initialProfile, initialView = "home" }: Props) {
    const [view, setView] = useState<View>(initialView);
    const [accountSection, setAccountSection] = useState<AccountSection>("signin");
    const [menuOpen, setMenuOpen] = useState(false);
    const [profile, setProfile] = useState(initialProfile);
    const [mode, setMode] = useState<"grid" | "list">("grid");
    const [query, setQuery] = useState("");
    const [group, setGroup] = useState("All");
    const [recent, setRecent] = useState<string[]>(() => {
        try {
            const stored: unknown = JSON.parse(localStorage.getItem("portal-recent") || "[]");
            return Array.isArray(stored) ? stored.filter((name): name is string => typeof name === "string" && applications.some((app) => app.name === name && app.url)) : [];
        } catch { return []; }
    });
    const [theme, setTheme] = useState<"light" | "dark" | "auto">(() => {
        try {
            const saved = localStorage.getItem("portal-theme");
            return saved === "light" || saved === "dark" ? saved : "auto";
        } catch { return "auto"; }
    });
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [saveSuccess, setSaveSuccess] = useState("");
    const [sessions, setSessions] = useState<KeycloakSession[]>([]);
    const [loginEvents, setLoginEvents] = useState<LoginEvent[]>([]);
    const [activityLoading, setActivityLoading] = useState(false);
    const [activityError, setActivityError] = useState("");
    const [loginEventError, setLoginEventError] = useState("");
    const [revokingSession, setRevokingSession] = useState("");
    const [activityUpdatedAt, setActivityUpdatedAt] = useState<Date | null>(null);
    const activityRequestPending = useRef(false);

    const loadAccountActivity = useCallback(async () => {
        if (activityRequestPending.current) return;
        activityRequestPending.current = true;
        await Promise.resolve();
        setActivityLoading(true);
        const authServerUrl = keycloak.authServerUrl?.replace(/\/+$/, "");
        if (!authServerUrl || !keycloak.realm) { setActivityLoading(false); activityRequestPending.current = false; return; }
        setActivityError("");
        setLoginEventError("");
        try {
            await keycloak.updateToken(30);
            if (!keycloak.token) throw new Error("Sesi login tidak tersedia.");
            const headers = { Authorization: `Bearer ${keycloak.token}`, Accept: "application/json" };

            // Load these independently so a browser CORS failure on the
            // Keycloak account endpoint does not hide the Vercel API result.
            const sessionRequest = fetch("/api/keycloak-account-sessions", { headers });
            const eventRequest = fetch("/api/keycloak-login-events", { headers });

            try {
                const response = await sessionRequest;
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const sessionData: unknown = await response.json();
                setSessions(Array.isArray(sessionData) ? sessionData as KeycloakSession[] : []);
            } catch (error) {
                setActivityError(error instanceof Error && error.message !== "Failed to fetch"
                    ? `Daftar sesi gagal dimuat: ${error.message}`
                    : "Tidak dapat menghubungi Keycloak Account API. Periksa CORS/Web origins dan apakah tunnel Keycloak aktif.");
            }

            try {
                const response = await eventRequest;
                const body: unknown = await response.json().catch(() => null);
                if (!response.ok) {
                    const message = body && typeof body === "object" && "error" in body && typeof body.error === "string"
                        ? body.error : `HTTP ${response.status}`;
                    throw new Error(`${response.status}: ${message}`);
                }
                setLoginEvents(Array.isArray(body) ? body as LoginEvent[] : []);
            } catch (error) {
                setLoginEvents([]);
                setLoginEventError(error instanceof Error && error.message !== "Failed to fetch"
                    ? `API riwayat login: ${error.message}`
                    : "Tidak dapat menghubungi /api/keycloak-login-events pada deployment ini.");
            }
            setActivityUpdatedAt(new Date());
        } catch (error) {
            const message = error instanceof Error ? error.message : "Token Keycloak tidak tersedia.";
            setActivityError(message);
            setLoginEventError(message);
        } finally {
            setActivityLoading(false);
            activityRequestPending.current = false;
        }
    }, [keycloak]);

    useEffect(() => {
        if (view !== "account") return;
        const initialLoad = window.setTimeout(() => void loadAccountActivity(), 0);
        const timer = window.setInterval(() => { if (document.visibilityState === "visible") void loadAccountActivity(); }, 60_000);
        return () => { window.clearTimeout(initialLoad); window.clearInterval(timer); };
    }, [view, loadAccountActivity]);

    async function revokeSession(sessionId: string) {
        const authServerUrl = keycloak.authServerUrl?.replace(/\/+$/, "");
        if (!authServerUrl || !keycloak.realm) return;
        setRevokingSession(sessionId);
        try {
            await keycloak.updateToken(30);
            const response = await fetch(`${authServerUrl}/realms/${encodeURIComponent(keycloak.realm)}/account/sessions/${encodeURIComponent(sessionId)}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${keycloak.token ?? ""}` },
            });
            if (!response.ok) throw new Error(`Keycloak menolak logout sesi (${response.status}).`);
            await loadAccountActivity();
        } catch (error) {
            setActivityError(error instanceof Error ? error.message : "Sesi tidak dapat dihentikan.");
        } finally { setRevokingSession(""); }
    }

    useEffect(() => {
        if (theme === "auto") document.documentElement.removeAttribute("data-theme");
        else document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    useEffect(() => {
        document.body.classList.toggle("menu-open", menuOpen);
        return () => document.body.classList.remove("menu-open");
    }, [menuOpen]);
    useEffect(() => {
        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setMenuOpen(false);
        }
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, []);

    const fullName = `${profile.firstName} ${profile.lastName}`.trim() || profile.username || identity.subject || "Pengguna";
    const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase() || profile.username.charAt(0).toUpperCase() || "U";
    const currentTitle = navigation.find(([page]) => page === view)?.[2] ?? "SSO Profile";
    const appGroups = ["All", ...new Set(applications.filter((app) => app.url).map((app) => app.group))];
    const visibleApplications = applications.filter((app) =>
        (group === "All" || app.group === group) &&
        `${app.name} ${app.group} ${app.description}`.toLowerCase().includes(query.toLowerCase()),
    );

    function recordRecent(name: string) {
        const next = [name, ...recent.filter((item) => item !== name)].slice(0, 4);
        setRecent(next);
        try { localStorage.setItem("portal-recent", JSON.stringify(next)); } catch { /* Optional convenience only. */ }
    }

    function changeTheme(nextTheme: "light" | "dark" | "auto") {
        setTheme(nextTheme);
        try {
            if (nextTheme === "auto") localStorage.removeItem("portal-theme");
            else localStorage.setItem("portal-theme", nextTheme);
        } catch { /* Theme remains active for this visit. */ }
    }

    function update<K extends keyof SsoProfile>(field: K, value: SsoProfile[K]) {
        setProfile((current) => ({ ...current, [field]: value }));
        setSaveError("");
        setSaveSuccess("");
    }

    async function submitProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setSaveError("");
        setSaveSuccess("");
        try {
            await onSaveProfile(profile);
            setSaveSuccess("Profil tersimpan di Keycloak. Sinkronisasi nama ke GLPI berjalan otomatis di latar belakang.");
        } catch (error) {
            setSaveError(error instanceof Error ? error.message : "Profil belum dapat disimpan. Silakan coba lagi atau hubungi administrator.");
        } finally { setSaving(false); }
    }

    function pageHeading(title: string, description: string, right?: ReactNode) {
        return <div className="top"><div><h1>{title}</h1><p className="sub">{description}</p></div>{right}</div>;
    }


    function applicationCards() {
        return <div className={`grid ${mode === "list" ? "list" : ""}`}>
            {visibleApplications.map((app) => {
                const content = <><span className="ah"><span className="tile"><Icon name={app.icon} /></span><span><h3>{app.name}</h3><span className="badge">{app.url ? app.group : "Active"}</span></span></span><span className="sso-app-description">{app.description}</span><span className="ft"><span>{app.group}</span><span className="cta">Open App <Icon name="external" /></span></span></>;
                return app.url
                    ? <a key={app.name} className="card app sso-app-card" href={app.url} target="_blank" rel="noopener noreferrer" onClick={() => recordRecent(app.name)}>{content}</a>
                    : <button key={app.name} type="button" className="card app sso-app-card" onClick={() => { setMenuOpen(false); onOpenPortal(); }}>{content}</button>;
            })}
            {visibleApplications.length === 0 && <div className="empty-box"><p className="empty">Tidak ada aplikasi yang cocok dengan pencarian.</p></div>}
        </div>;
    }

    return (
        <>
        <header className="mbar">
            <button className="mb" type="button" aria-label="Buka menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
            <span className="mt">{currentTitle}</span>
            <button className="mb" type="button" aria-label="Buka profil" onClick={() => { setView("profile"); setMenuOpen(false); }}><span className="av" aria-hidden="true">{initials}</span></button>
        </header>
        <div className="shell">
            <aside className="side">
                <div className="hb"><span className="logo"><Icon name="grid" /></span><b>SSO Profile</b><button className="mb close" type="button" aria-label="Tutup menu" onClick={() => setMenuOpen(false)}><Icon name="close" /></button></div>
                <div className="me"><div className="av" aria-hidden="true">{initials}</div><div><b>{fullName}</b><small>@{profile.username || "user"}</small></div></div>
                <nav className="nav" aria-label="Menu SSO">
                    {navigation.map(([page, icon, label]) => (
                        <a key={page} href={`#${page}`} className={view === page ? "on" : ""} aria-current={view === page ? "page" : undefined}
                            onClick={(event) => { event.preventDefault(); setView(page); setMenuOpen(false); }}><Icon name={icon} />{label}</a>
                    ))}
                </nav>
                <div className="out">
                    <div className="seg theme" role="group" aria-label="Theme">
                        {(["light", "dark", "auto"] as const).map((value) => (
                            <button key={value} type="button" className={theme === value ? "on" : ""} aria-pressed={theme === value} onClick={() => changeTheme(value)}>
                                <Icon name={value === "light" ? "sun" : value === "dark" ? "moon" : "monitor"} /><span className="tl">{value === "auto" ? "Auto" : value === "light" ? "Light" : "Dark"}</span>
                            </button>
                        ))}
                    </div>
                    <button className="lo" type="button" onClick={() => { setMenuOpen(false); onLogout(); }}><Icon name="out" /><span>Log out</span></button>
                </div>
            </aside>

            <button className="scrim" type="button" aria-label="Tutup menu" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} />

            <main className="main pidc-sso-view">
                {view === "home" && (() => {
                    const hour = new Date().getHours();
                    const greeting = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
                    const recentApps = recent.map((name) => applications.find((app) => app.name === name)).filter((app) => app && app.url);
                    const lastLogin = loginEvents.find((item) => item.type === "LOGIN");
                    return <>
                        <section className="hero"><div><div className="eyebrow">Integrated portal</div><h1>Good {greeting}, {profile.firstName || profile.username}</h1><p className="sub">Ringkasan akun dan aktivitas Anda.</p></div><button className="btn p" type="button" onClick={() => setView("applications")}><Icon name="grid" /> View all applications</button></section>
                        <div className="cols">
                            <section className="panel"><h2><Icon name="clock" /> Recently used apps</h2><p className="hint">Lanjutkan dari aplikasi terakhir Anda.</p>
                                {recentApps.length ? <div className="recent">{recentApps.map((app) => app && app.url && <a key={app.name} className="mini" href={app.url} target="_blank" rel="noopener noreferrer" onClick={() => recordRecent(app.name)}><span className="tile sm"><Icon name={app.icon} /></span><span><b>{app.name}</b><small>{app.group}</small></span></a>)}</div> : <p className="empty">Belum ada aplikasi yang dibuka.</p>}
                            </section>
                            <section className="panel"><h2><Icon name="mega" /> Announcements <button className="cta" style={{ marginLeft: "auto" }} type="button" onClick={() => setView("information")}>View all</button></h2>
                                {announcements.slice(0, 2).map((item) => <div className="row" key={item.tag}><div><div className="meta"><span className={`badge ${item.tone}`}>{item.tag}</span><span>{item.date}</span></div><h4>{item.title}</h4></div></div>)}
                            </section>
                        </div>
                        <h2 className="sec">Portal summary</h2>
                        <div className="stats">
                            <button className="stat" type="button" onClick={() => setView("applications")}><span className="tile"><Icon name="grid" /></span><span><small>Accessible apps</small><b>{applications.filter((app) => app.url).length}</b></span></button>
                            <button className="stat" type="button" onClick={() => setView("account")}><span className="tile"><Icon name="clock" /></span><span><small>Last login</small><b>{lastLogin ? formatActivityTime(lastLogin.time) : "—"}</b></span></button>
                            <button className="stat" type="button" onClick={() => setView("account")}><span className="tile"><Icon name="monitor" /></span><span><small>Active sessions</small><b>{sessions.length || "—"}</b></span></button>
                            <button className="stat" type="button" onClick={() => setView("account")}><span className="tile"><Icon name="shield" /></span><span><small>Login records</small><b>{loginEvents.length || "—"}</b></span></button>
                        </div>
                    </>;
                })()}

                {view === "applications" && <>
                    {pageHeading("Applications", "Aplikasi yang tersedia untuk akun Anda berdasarkan konfigurasi Portal PID.", <div className="seg" role="group" aria-label="Tampilan aplikasi"><button type="button" className={mode === "list" ? "on" : ""} onClick={() => setMode("list")}><Icon name="list" />List</button><button type="button" className={mode === "grid" ? "on" : ""} onClick={() => setMode("grid")}><Icon name="grid" />Grid</button></div>)}
                    <div className="tools">
                        <label className="search"><Icon name="search" /><input type="search" placeholder="Cari aplikasi..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Cari aplikasi" /></label>
                        <div className="chips" role="group" aria-label="Grup aplikasi">
                            {appGroups.map((appGroup) => {
                                const count = appGroup === "All" ? applications.length : applications.filter((app) => app.group === appGroup).length;
                                return <button key={appGroup} className={`chip ${group === appGroup ? "on" : ""}`} type="button" aria-pressed={group === appGroup} onClick={() => setGroup(appGroup)}>{appGroup === "All" ? "Semua aplikasi" : appGroup}<b>{count}</b></button>;
                            })}
                        </div>
                    </div>
                    <p className="count" aria-live="polite">Menampilkan {visibleApplications.length} dari {applications.length} aplikasi</p>
                    {applicationCards()}
                </>}

                {view === "information" && <>
                    {pageHeading("Information", "Pengumuman dan informasi untuk pengguna Portal PID.")}
                    <section className="panel"><h2><Icon name="mega" /> Announcements</h2>{announcements.map((item) => <div className="row" key={item.tag}><div><div className="meta"><span className={`badge ${item.tone}`}>{item.tag}</span><span>{item.date} · Divisi IT</span></div><h4>{item.title}</h4><p>{item.body}</p></div></div>)}</section>
                    <section className="panel"><h2><Icon name="info" /> Informasi akun</h2><div className="row"><div><b>Login terpusat</b><p>Autentikasi akun Portal PID ditangani Keycloak.</p></div><span className="badge">SSO aktif</span></div><div className="row"><div><b>Perlu bantuan?</b><p>Hubungi administrator Portal PID untuk bantuan aplikasi atau akses akun.</p></div></div></section>
                </>}

                {view === "profile" && <>
                    {pageHeading("Public profile", "Kelola informasi profil yang digunakan pada SSO Profile dan akun Keycloak Anda.")}
                    <form className="profile-layout" onSubmit={submitProfile}>
                        <section className="panel profile-summary">
                            <div className="profile-person">
                                <div className="av big profile-avatar" aria-hidden="true">{initials}</div>
                                <div className="profile-person-copy"><span className="eyebrow">SSO profile</span><h2>{fullName}</h2><p>{profile.email || "Email belum ditambahkan"}</p></div>
                                <span className="profile-source"><Icon name="shield" /> Keycloak</span>
                            </div>
                            <div className="profile-summary-foot"><span><b>Username</b><code>{profile.username || "—"}</code></span><span><b>User ID</b><code title={identity.subject}>{identity.subject.length > 18 ? `${identity.subject.slice(0, 8)}…${identity.subject.slice(-8)}` : identity.subject}</code></span></div>
                        </section>
                        <section className="panel profile-form-panel">
                            <div className="section-heading"><div><h2>Informasi pribadi</h2><p>Data ini tersimpan pada profil pengguna Keycloak Anda.</p></div><span className="required-note"><i /> Wajib diisi</span></div>
                            <div className="fg profile-fields">
                                <label><span className="field-label">Username <small>Dikelola SSO</small></span><input value={profile.username} readOnly autoComplete="username" /></label>
                                <label><span className="field-label">Email <small>Dikelola Keycloak</small></span><input type="email" value={profile.email} readOnly autoComplete="email" disabled={saving} /></label>
                                <label><span className="field-label">First name <i className="required-mark">*</i></span><input value={profile.firstName} onChange={(event) => update("firstName", event.target.value)} autoComplete="given-name" required disabled={saving} /></label>
                                <label><span className="field-label">Last name</span><input value={profile.lastName} onChange={(event) => update("lastName", event.target.value)} autoComplete="family-name" disabled={saving} /></label>
                                <label className="w bio-field"><span className="field-label">Bio</span><textarea value={profile.bio} onChange={(event) => update("bio", event.target.value)} maxLength={160} rows={4} disabled={saving} /><span className="bio-meta"><span>Bio akan disimpan ke profil Keycloak Anda.</span><span>{profile.bio.length}<span aria-hidden="true">/</span>160 karakter</span></span></label>
                            </div>
                            {saving && <p className="form-feedback profile-saving" role="status" aria-live="polite"><span className="profile-save-spinner" aria-hidden="true" /> Menyimpan profil ke Keycloak. Mohon tunggu, jangan tutup halaman ini.</p>}{saveError && <p className="form-feedback error-feedback" role="alert"><Icon name="info" />{saveError}</p>}{saveSuccess && <p className="form-feedback success-feedback" role="status"><Icon name="shield" />{saveSuccess}</p>}
                            <div className="profile-actions"><span>Nama dan bio dapat diubah. Username dan email dikelola Keycloak.</span><div><button className="btn" type="button" onClick={() => { setProfile(initialProfile); setSaveError(""); setSaveSuccess(""); }} disabled={saving}>Reset</button><button className="btn p" type="submit" disabled={saving}>{saving && <span className="profile-save-spinner" aria-hidden="true" />}{saving ? "Menyimpan…" : "Simpan perubahan"}</button></div></div>
                        </section>
                    </form>
                </>}

                {view === "account" && <>
                    {pageHeading("Account settings", "Kelola cara masuk, perangkat aktif, dan riwayat aktivitas akun Anda.", <span className="profile-source account-managed"><Icon name="shield" /> Dikelola Keycloak</span>)}
                    <nav className="account-tabs" aria-label="Pengaturan akun">
                        {([ ["signin", "shield", "Sign in"], ["sessions", "monitor", "Active sessions"], ["history", "clock", "Login history"] ] as const).map(([section, icon, label]) => <button key={section} className={accountSection === section ? "on" : ""} type="button" aria-current={accountSection === section ? "page" : undefined} onClick={() => setAccountSection(section)}><Icon name={icon} /><span>{label}</span>{section === "sessions" && sessions.length > 0 && <b>{sessions.length}</b>}{section === "history" && loginEvents.length > 0 && <b>{loginEvents.length}</b>}</button>)}
                    </nav>

                    {accountSection === "signin" && <section className="panel account-panel">
                        <div className="section-heading"><div><h2>Keamanan akun</h2><p>Password dan metode autentikasi disimpan serta diproses oleh Keycloak.</p></div><span className="profile-source"><Icon name="shield" /> Terhubung</span></div>
                        <div className="account-setting-row"><span className="tile"><Icon name="shield" /></span><div className="account-setting-copy"><b>Password dan autentikasi</b><p>Ubah password, kelola autentikasi dua langkah, dan metode pemulihan akun.</p></div><a className="btn" href={`${keycloak.authServerUrl?.replace(/\/+$/, "")}/realms/${encodeURIComponent(keycloak.realm ?? "")}/account/#/security/signingin`} target="_blank" rel="noreferrer">Kelola di Keycloak <Icon name="external" /></a></div>
                        <div className="account-setting-row"><span className="tile"><Icon name="monitor" /></span><div className="account-setting-copy"><b>Perangkat yang tersambung</b><p>{activityLoading ? "Memuat status sesi…" : `${sessions.length} sesi Keycloak tercatat untuk akun Anda.`}</p></div><button className="btn" type="button" onClick={() => setAccountSection("sessions")}>Lihat sesi</button></div>
                        <div className="account-setting-row"><span className="tile"><Icon name="clock" /></span><div className="account-setting-copy"><b>Aktivitas login</b><p>{loginEvents.length ? `${loginEvents.length} aktivitas dari periode penyimpanan Keycloak.` : "Lihat aktivitas masuk yang dicatat Keycloak."}</p></div><button className="btn" type="button" onClick={() => setAccountSection("history")}>Lihat riwayat</button></div>
                        <div className="account-danger-zone"><div><b>Keluar dari Portal PID</b><p>Sesi aktif ini akan diakhiri melalui Keycloak.</p></div><button className="btn d" type="button" onClick={onLogout}><Icon name="out" /> Log out</button></div>
                    </section>}

                    {accountSection === "sessions" && <section className="panel account-panel">
                        <div className="section-heading"><div><h2>Active sessions</h2><p>Perangkat yang sedang menggunakan akun Keycloak Anda.</p></div><button className="btn" type="button" disabled={activityLoading} onClick={() => { setActivityLoading(true); void loadAccountActivity(); }}><Icon name="monitor" />{activityLoading ? "Memuat…" : "Refresh"}</button></div>
                        {activityError && <p className="form-feedback error-feedback" role="alert"><Icon name="info" />{activityError}</p>}
                        {activityLoading && sessions.length === 0 ? <div className="account-empty"><span className="tile"><Icon name="monitor" /></span><b>Memuat sesi Anda</b><p>Mengambil daftar perangkat langsung dari Keycloak.</p></div> : sessions.length === 0 ? <div className="account-empty"><span className="tile"><Icon name="monitor" /></span><b>Belum ada sesi lain</b><p>{activityError ? "Daftar sesi belum dapat diambil. Coba refresh setelah koneksi Keycloak tersedia." : "Saat ini tidak ada sesi aktif lain yang tercatat."}</p></div> : <div className="account-list">{sessions.map((session) => {
                            const currentSessionId = typeof keycloak.tokenParsed?.sid === "string" ? keycloak.tokenParsed.sid : "";
                            const isCurrent = session.id === currentSessionId;
                            return <div className="account-list-row" key={session.id}><span className="tile"><Icon name="monitor" /></span><div className="account-list-copy"><div className="account-row-title"><b>{isCurrent ? "Perangkat ini" : "Sesi perangkat"}</b>{isCurrent && <span className="badge">Sesi saat ini</span>}</div><p>{session.ipAddress ? `IP ${session.ipAddress}` : "Alamat IP tidak tersedia"}</p><small>Login {formatActivityTime(session.start)} · Terakhir aktif {formatActivityTime(session.lastAccess)}</small>{session.clients?.length ? <small>Aplikasi: {session.clients.join(", ")}</small> : null}</div><button className="btn d" type="button" disabled={isCurrent || revokingSession === session.id} onClick={() => void revokeSession(session.id)}>{revokingSession === session.id ? "Mengakhiri…" : isCurrent ? "Sesi ini" : "Akhiri sesi"}</button></div>;
                        })}</div>}
                        <p className="account-refresh-note"><span className="live-dot" /> Diperbarui otomatis setiap 15 detik{activityUpdatedAt ? ` · terakhir ${activityUpdatedAt.toLocaleTimeString("id-ID")}` : ""}</p>
                    </section>}

                    {accountSection === "history" && <section className="panel account-panel">
                        <div className="section-heading"><div><h2>Login history</h2><p>Riwayat login terbaru yang dicatat oleh Keycloak.</p></div><button className="btn" type="button" disabled={activityLoading} onClick={() => { setActivityLoading(true); void loadAccountActivity(); }}><Icon name="clock" />{activityLoading ? "Memuat…" : "Refresh"}</button></div>
                        {loginEventError && <p className="form-feedback error-feedback" role="alert"><Icon name="info" />{loginEventError}</p>}
                        {activityLoading && loginEvents.length === 0 ? <div className="account-empty"><span className="tile"><Icon name="clock" /></span><b>Memuat riwayat login</b><p>Mengambil aktivitas akun dari layanan Keycloak.</p></div> : loginEvents.length === 0 ? <div className="account-empty"><span className="tile"><Icon name="clock" /></span><b>Belum ada aktivitas</b><p>{loginEventError ? "Riwayat belum tersedia. Periksa koneksi server dan konfigurasi event Keycloak." : "Belum ada aktivitas login dalam periode penyimpanan Keycloak."}</p></div> : <div className="account-list">{loginEvents.map((item, index) => {
                            const failed = item.type === "LOGIN_ERROR" || Boolean(item.error);
                            const label = item.type === "LOGIN_ERROR" ? "Login gagal" : item.type === "LOGOUT" ? "Logout" : item.type === "LOGIN" ? "Login berhasil" : item.type?.replaceAll("_", " ") ?? "Aktivitas akun";
                            return <div className="account-list-row history-row" key={item.id ?? `${item.time}-${item.type}-${index}`}><span className={`activity-icon ${failed ? "failed" : item.type === "LOGOUT" ? "neutral" : ""}`}><Icon name={item.type === "LOGOUT" ? "out" : failed ? "info" : "shield"} /></span><div className="account-list-copy"><div className="account-row-title"><b>{label}</b><span className={`badge ${failed ? "warn" : item.type === "LOGOUT" ? "" : "ok"}`}>{failed ? "Gagal" : item.type === "LOGOUT" ? "Selesai" : "Berhasil"}</span></div><p>{formatActivityTime(item.time)}{item.ipAddress ? ` · IP ${item.ipAddress}` : ""}</p>{item.error && <small>{item.error}</small>}</div><span className="activity-provider">Keycloak</span></div>;
                        })}</div>}
                        <p className="account-refresh-note"><span className="live-dot" /> {identity.username} · diperbarui otomatis setiap 15 detik</p>
                    </section>}
                </>}
            </main>
        </div>
        </>
    );
}

