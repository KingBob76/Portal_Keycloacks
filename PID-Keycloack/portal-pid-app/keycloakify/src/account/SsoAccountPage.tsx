import { useEffect, useState } from "react";
import type { KcContext } from "./KcContext";
import { Icon, type IconName } from "./Icon";

type View = "home" | "applications" | "information" | "profile" | "account";
type AccountSection = "signin" | "sessions" | "history";
type AccountContext = Extract<KcContext, { pageId: "account.ftl" }>;
type Props = { kcContext: AccountContext; view: View };
type AppItem = { name: string; group: string; icon: IconName; desc: string; url: string };

const applications: AppItem[] = [
    { name: "eOffice", group: "Administration", icon: "mail", desc: "Surat menyurat & agenda dinas", url: "https://eoffice.example.com" },
    { name: "e-Procurement", group: "Procurement", icon: "cart", desc: "Pengadaan barang & jasa online", url: "https://eprocurement.example.com" },
    { name: "e-Document", group: "Administration", icon: "file", desc: "Pengelolaan dokumen digital", url: "https://edocument.example.com" },
    { name: "IT Service Mgmt", group: "IT", icon: "headset", desc: "Tiket & layanan helpdesk IT", url: "https://itsm.example.com" },
    { name: "E-Billing System", group: "Finance", icon: "card", desc: "Tagihan & manajemen keuangan", url: "https://ebilling.example.com" },
    { name: "Content Portal", group: "Communication", icon: "compass", desc: "Manajemen konten & publikasi web", url: "https://content.example.com" },
    { name: "HR Management", group: "HR", icon: "users", desc: "Data & administrasi kepegawaian", url: "https://hr.example.com" },
    { name: "Events Manager", group: "Operations", icon: "calendar", desc: "Pengelolaan & jadwal acara organisasi", url: "https://events.example.com" },
    { name: "Learning Center", group: "Learning", icon: "book", desc: "Knowledge sharing & pustaka digital", url: "https://learning.example.com" },
    { name: "LMS", group: "Learning", icon: "cap", desc: "E-learning & program pelatihan karyawan", url: "https://lms.example.com" },
    { name: "QHSSE", group: "Operations", icon: "shield", desc: "K3, kualitas & manajemen lingkungan hidup", url: "https://qhsse.example.com" },
    { name: "Laporan Kesehatan", group: "HR", icon: "heart", desc: "Pelaporan kesehatan & medis karyawan", url: "https://kesehatan.example.com" },
    { name: "ESS", group: "HR", icon: "user", desc: "Employee Self Service, layanan mandiri", url: "https://ess.example.com" },
    { name: "PELNI Doc", group: "IT", icon: "file", desc: "Dokumentasi teknis & arsip internal", url: "https://doc.example.com" },
];
const announcements = [
    { tag: "Maintenance", tone: "warn", date: "20 Okt 2026", title: "Maintenance jaringan kantor pusat, Sabtu 24 Okt 22:00 sampai 02:00 WIB", body: "Akses internet, VPN, dan aplikasi internal dapat terputus sementara. Simpan pekerjaan Anda sebelum jadwal dimulai." },
    { tag: "Security", tone: "", date: "19 Okt 2026", title: "Kebijakan password baru berlaku mulai 1 November 2026", body: "Password minimal 12 karakter. Ubah password Anda lewat Account settings, bagian Sign in." },
    { tag: "Info", tone: "", date: "15 Okt 2026", title: "Aplikasi Manual Book sudah memuat panduan VPN terbaru", body: "Buka Applications, lalu Manual Book, untuk melihat langkah koneksi dari rumah." },
];
const birthdayList = ["Dewi Anggraini", "Rizky Pratama", "Maya Lestari"];
const menu: { key: View | "profile"; icon: IconName; label: string }[] = [
    { key: "profile", icon: "user", label: "Public profile" },
    { key: "account", icon: "shield", label: "Account settings" },
];

export default function SsoAccountPage({ kcContext, view: initialView }: Props) {
    const { url, account } = kcContext;
    const [view, setView] = useState<View>(initialView === "account" ? "account" : "profile");
    const [query, setQuery] = useState("");
    const [group, setGroup] = useState("All");
    const [mode, setMode] = useState<"grid" | "list">("grid");
    const [accountSection, setAccountSection] = useState<AccountSection>("signin");
    const [securityVisited, setSecurityVisited] = useState({ sessions: false, history: false });
    const [theme, setTheme] = useState<"auto" | "light" | "dark">("auto");
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const fullName = [account.firstName, account.lastName].filter(Boolean).join(" ") || account.username || "Pengguna";
    const firstName = account.firstName || account.username || "Pengguna";
    const initial = (account.firstName || account.username || "U").charAt(0).toUpperCase();
    const accountAttributes = (account as AccountContext["account"] & { attributes?: Record<string, unknown> }).attributes ?? {};
    const initialBioValue = accountAttributes.bio;
    const initialBio = typeof initialBioValue === "string" ? initialBioValue : Array.isArray(initialBioValue) && typeof initialBioValue[0] === "string" ? initialBioValue[0] : "";
    const [bio, setBio] = useState(initialBio);
    // Keep the Vercel app's Keycloak authentication, but tell its callback to
    // open the HR/LMS workspace instead of sending the user back to Account.
    const targetPortal = "https://portal-pid-app.vercel.app/?pidcPortal=1";

    useEffect(() => {
        document.title = "SSO Profile | Portal PID";
        const onPopState = () => {
            const hash = window.location.hash.slice(1);
            if (hash === "publicprofile") setView("profile");
            else if (["home", "applications", "information", "profile", "account"].includes(hash)) setView(hash as View);
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);
    useEffect(() => { document.body.classList.toggle("menu-open", menuOpen); return () => document.body.classList.remove("menu-open"); }, [menuOpen]);
    useEffect(() => { const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); }; window.addEventListener("keydown", esc); return () => window.removeEventListener("keydown", esc); }, []);
    useEffect(() => {
        const saved = localStorage.getItem("portal-theme");
        if (saved === "light" || saved === "dark") setTheme(saved);
    }, []);
    useEffect(() => {
        setSidebarCollapsed(localStorage.getItem("portal-sidebar-collapsed") === "true");
    }, []);
    useEffect(() => {
        if (theme === "auto") document.documentElement.removeAttribute("data-theme");
        else document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const navigate = (next: View) => {
        setView(next);
        const hash = next === "profile" ? "publicprofile" : next;
        window.history.pushState({ view: next }, "", `${window.location.pathname}${window.location.search}#${hash}`);
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const toProfile = () => navigate("profile");
    const styleSecurityFrame = (frame: HTMLIFrameElement) => {
        try {
            const doc = frame.contentDocument;
            if (!doc || doc.getElementById("pidc-embedded-security-style")) return;
            const style = doc.createElement("style");
            style.id = "pidc-embedded-security-style";
            style.textContent = `html, body { min-width: 0 !important; overflow-x: hidden !important; background: transparent !important; } body { line-height: 1.6 !important; } .main { width: 100% !important; max-width: 100% !important; margin: 0 !important; min-height: 0 !important; padding: 0 !important; background: transparent !important; } .security-page { width: 100% !important; max-width: 1180px !important; margin: 0 auto !important; padding: 4px 0 8px !important; line-height: 1.6 !important; overflow: visible !important; } .security-page h1 { line-height: 1.3 !important; padding: 1px 0 2px !important; overflow: visible !important; } .security-page p, .security-facts span, .history-item, .history-meta span { line-height: 1.6 !important; overflow: visible !important; } .security-back-button { display: none !important; }`;
            doc.head.append(style);
        } catch (error) {
            console.error("Tidak dapat menyesuaikan tampilan account page yang disematkan.", error);
        }
    };
    const embeddedAccountUrl = (value: string) => {
        const target = new URL(value, window.location.href);
        target.searchParams.set("pidcEmbed", "1");
        return target.toString();
    };
    const appItems = applications.map((app) => ({
        ...app,
        url: app.name === "LMS" ? targetPortal : app.url,
        active: app.name === "LMS",
    }));
    const appGroups = ["All", ...new Set(appItems.map((app) => app.group))];
    const visibleApps = appItems.filter((app) => (group === "All" || group === app.group) && `${app.name} ${app.group} ${app.desc}`.toLowerCase().includes(query.trim().toLowerCase()));
    const greeting = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening";
    const announcementsMarkup = announcements.slice(0, view === "information" ? 3 : 2).map((item) => <div className="row" key={item.tag}><div><div className="meta"><span className={`badge ${item.tone}`}>{item.tag}</span><span>{item.date} · Divisi IT</span></div><h4>{item.title}</h4><p>{item.body}</p></div></div>);

    const renderApplications = () => <>
        <div className="top"><div><h1>Applications</h1><p className="sub">Aplikasi yang dapat diakses oleh akun ini berdasarkan permission dan client yang tersedia di Keycloak.</p></div><div className="seg" role="group" aria-label="Tampilan aplikasi"><button className={mode === "list" ? "on" : ""} onClick={() => setMode("list")}><Icon name="list"/> List</button><button className={mode === "grid" ? "on" : ""} onClick={() => setMode("grid")}><Icon name="grid"/> Grid</button></div></div>
        <div className="tools"><label className="search"><Icon name="search"/><input type="search" placeholder="Cari aplikasi..." value={query} onChange={(e) => setQuery(e.target.value)} /></label><div className="chips">{appGroups.map((item) => <button className={`chip ${group === item ? "on" : ""}`} key={item} onClick={() => setGroup(item)}>{item === "All" ? "Semua aplikasi" : item}<b>{item === "All" ? appItems.length : appItems.filter((a) => a.group === item).length}</b></button>)}</div></div>
        <p className="count">Menampilkan {visibleApps.length} dari {appItems.length} aplikasi</p><div className={`grid ${mode === "list" ? "list" : ""}`}>
            {visibleApps.map((app) => <a key={app.name} className="card app" href={app.url} target={app.active ? "_self" : "_blank"} rel="noopener noreferrer"><div className="bd"><div className="ah"><span className="tile"><Icon name={app.icon}/></span><div><h3>{app.name}</h3><span className="badge">{app.active ? "Active" : app.group}</span></div></div><p>{app.desc}</p><div className="ft"><span className="cta">{app.active ? "Buka LMS" : "Open App"} <Icon name="external"/></span></div></div></a>)}
            {!visibleApps.length && <div className="empty-box"><p className="empty">Tidak ada aplikasi yang cocok dengan pencarian Anda.</p><button className="btn" onClick={() => { setQuery(""); setGroup("All"); }}>Reset filter</button></div>}
        </div>
    </>;
    const renderHome = () => <>
        <section className="hero"><div><div className="eyebrow">Integrated portal</div><h1>Good {greeting}, {firstName}</h1><p className="sub">Ringkasan akun dan aktivitas Anda.</p></div><button className="btn p" onClick={() => navigate("applications")}><Icon name="grid"/> View all applications</button></section>
        <div className="cols"><section className="panel"><h2><Icon name="clock"/> Recently used apps</h2><p className="hint">Akses aplikasi perusahaan Anda dari satu tempat.</p><div className="recent"><button className="mini" onClick={() => { window.location.href = targetPortal; }}><span className="tile sm"><Icon name="cap"/></span><span><b>LMS</b><small>Learning</small></span></button><button className="mini" onClick={() => navigate("applications")}><span className="tile sm"><Icon name="grid"/></span><span><b>Applications</b><small>Semua aplikasi</small></span></button></div></section><section className="panel"><h2><Icon name="mega"/> Announcements <button className="cta" style={{ marginLeft: "auto" }} onClick={() => navigate("information")}>View all</button></h2>{announcementsMarkup}</section></div>
        <h2 className="sec">Account overview</h2><div className="stats"><button className="stat" onClick={() => navigate("applications")}><span className="tile"><Icon name="grid"/></span><span><small>Available applications</small><b>{appItems.length} apps</b></span></button><button className="stat" onClick={() => navigate("account")}><span className="tile"><Icon name="shield"/></span><span><small>Account security</small><b>Manage account</b></span></button><button className="stat" onClick={toProfile}><span className="tile"><Icon name="user"/></span><span><small>Signed in as</small><b>{fullName}</b></span></button></div>
    </>;
    const renderInformation = () => <><div className="top"><div><h1>Information</h1><p className="sub">Informasi dan pengumuman untuk pengguna Portal PID.</p></div></div><section className="panel"><h2><Icon name="mega"/> Announcement</h2>{announcementsMarkup}</section><section className="panel"><h2><Icon name="cake"/> Birthday Today <span className="muted">{new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date())}</span></h2>{birthdayList.map((name) => <div className="row" key={name}><div className="dev"><span className="tile sm"><Icon name="user"/></span><b>{name}</b></div><span className="badge">Selamat ulang tahun</span></div>)}</section></>;
    const renderProfile = () => {
        const { account: user, realm, stateChecker, messagesPerField } = kcContext;
        const fieldError = (field: string) => messagesPerField.exists(field) ? <small className="profile-field-error" role="alert">{messagesPerField.get(field)}</small> : null;
        const action = new URL(url.accountUrl, window.location.href);
        action.searchParams.set("pidcView", "profile");
        action.hash = "publicprofile";
        return <>
            <div className="top"><div><h1>Public profile</h1><p className="sub">Kelola informasi profil yang digunakan pada SSO Profile dan akun Keycloak Anda.</p></div></div>
            <form className="panel public-profile-panel" action={action.toString()} method="post">
                <input type="hidden" name="stateChecker" value={stateChecker} />
                <div className="public-profile-identity"><div className="av profile-avatar">{initial}</div><div><span className="eyebrow">SSO PROFILE</span><h2>{fullName}</h2><p>{user.email || "Email belum ditambahkan"}</p></div><span className="profile-source"><Icon name="shield"/> Dikelola Keycloak</span></div>
                <div className="public-profile-form-head"><div><h2>Informasi pribadi</h2><p>Perubahan disimpan ke profil Keycloak Anda.</p></div><span className="required-fields"><i>*</i> Wajib diisi</span></div>
                <div className="public-profile-fields">
                    {!realm.registrationEmailAsUsername && <label className="profile-field">Username <span className="field-managed">Dikelola SSO</span><input className="form-control" type="text" id="username" name="username" autoComplete="username" disabled={!realm.editUsernameAllowed} defaultValue={user.username ?? ""} />{fieldError("username")}</label>}
                    <label className="profile-field">Email <i className="required-fields">*</i><input className="form-control" type="email" id="email" name="email" autoComplete="email" required defaultValue={user.email ?? ""} aria-invalid={messagesPerField.exists("email")} />{fieldError("email")}</label>
                    <label className="profile-field">First name <i className="required-fields">*</i><input className="form-control" type="text" id="firstName" name="firstName" autoComplete="given-name" required defaultValue={user.firstName ?? ""} aria-invalid={messagesPerField.exists("firstName")} />{fieldError("firstName")}</label>
                    <label className="profile-field">Last name <i className="required-fields">*</i><input className="form-control" type="text" id="lastName" name="lastName" autoComplete="family-name" required defaultValue={user.lastName ?? ""} aria-invalid={messagesPerField.exists("lastName")} />{fieldError("lastName")}</label>
                    <label className="profile-field profile-bio-field">Bio <span className="field-managed">Opsional</span><textarea className="form-control" id="user.attributes.bio" name="user.attributes.bio" rows={4} maxLength={160} value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Ceritakan singkat peran dan keahlian Anda"/><span className="bio-meta"><span>Ringkasan singkat tentang Anda</span><span>{bio.length}/160 karakter</span></span></label>
                </div>
                <div className="public-profile-actions"><span>Username dan identitas akun diverifikasi oleh Keycloak.</span><div><button className="btn profile-cancel" type="submit" name="submitAction" value="Cancel">Cancel</button><button className="btn p" type="submit" name="submitAction" value="Save">Simpan perubahan</button></div></div>
            </form>
        </>;
    };
    const renderAccount = () => <>
        <div className="top account-top"><div><h1>Account settings</h1><p className="sub">Kelola cara masuk, perangkat aktif, dan riwayat aktivitas akun Anda.</p></div>
            <div className="seg account-tabs" role="tablist" aria-label="Pengaturan akun">
                <button className={accountSection === "signin" ? "on" : ""} role="tab" aria-selected={accountSection === "signin"} onClick={() => setAccountSection("signin")}><Icon name="lock"/> Sign in</button>
                <button className={accountSection === "sessions" ? "on" : ""} role="tab" aria-selected={accountSection === "sessions"} onClick={() => { setAccountSection("sessions"); setSecurityVisited((current) => ({ ...current, sessions: true })); }}><Icon name="monitor"/> Active sessions</button>
                {kcContext.features.log && <button className={accountSection === "history" ? "on" : ""} role="tab" aria-selected={accountSection === "history"} onClick={() => { setAccountSection("history"); setSecurityVisited((current) => ({ ...current, history: true })); }}><Icon name="clock"/> Login history</button>}
                {kcContext.features.identityFederation && <button role="tab" onClick={() => { window.location.href = url.socialUrl; }}><Icon name="link"/> Linked accounts</button>}
            </div>
        </div>
        {accountSection === "signin" && <section className="panel account-settings-panel">
            <div className="account-panel-heading"><div><h2><Icon name="shield"/> Keamanan akun</h2><p>Pengaturan keamanan diproses langsung oleh Keycloak.</p></div><span className="profile-source"><Icon name="shield"/> Akun terlindungi</span></div>
            <div className="account-setting-row"><span className="tile"><Icon name="lock"/></span><div><b>Password</b><p>Ubah kata sandi dan periksa masa berlaku kredensial akun Anda.</p></div><a className="btn" href={url.passwordUrl}>Kelola password <Icon name="external"/></a></div>
            <div className="account-setting-row"><span className="tile"><Icon name="phone"/></span><div><b>Authenticator</b><p>Kelola aplikasi autentikasi dan verifikasi dua langkah.</p></div><a className="btn" href={url.totpUrl}>Kelola authenticator <Icon name="external"/></a></div>
        </section>}
        {securityVisited.sessions && <iframe className="account-embedded-page" title="Active sessions" src={embeddedAccountUrl(url.sessionsUrl)} style={{ display: accountSection === "sessions" ? "block" : "none" }} onLoad={(event) => styleSecurityFrame(event.currentTarget)} />}
        {securityVisited.history && <iframe className="account-embedded-page" title="Login history" src={embeddedAccountUrl(url.logUrl)} style={{ display: accountSection === "history" ? "block" : "none" }} onLoad={(event) => styleSecurityFrame(event.currentTarget)} />}
    </>;
    const currentView = view === "home" ? renderHome() : view === "applications" ? renderApplications() : view === "information" ? renderInformation() : view === "profile" ? renderProfile() : renderAccount();

    return <div className={`shell pidc-app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}><header className="mbar"><button className="mb" aria-label="Buka menu" onClick={() => setMenuOpen(true)}><Icon name="menu"/></button><span className="mt">SSO Profile</span><button className="mb" aria-label="Public profile" onClick={toProfile}><span className="av">{initial}</span></button></header>
        <aside className={`side ${menuOpen ? "open" : ""}`}><div className="hb"><span className="logo"><Icon name="grid"/></span><b>SSO Profile</b><button className="mb close" aria-label="Tutup menu" onClick={() => setMenuOpen(false)}><Icon name="close"/></button></div><div className="me"><div className="av">{initial}</div><div><b>{fullName}</b><small>@{account.username || "user"}</small></div></div><div className="rail-wrap"><button type="button" className="side-toggle" title={sidebarCollapsed ? "Expand menu" : "Collapse menu"} aria-label={sidebarCollapsed ? "Expand menu" : "Collapse menu"} aria-expanded={!sidebarCollapsed} onClick={() => { const next = !sidebarCollapsed; setSidebarCollapsed(next); localStorage.setItem("portal-sidebar-collapsed", String(next)); }}><Icon name="menu"/><span className="nav-label">{sidebarCollapsed ? "Expand menu" : "Collapse menu"}</span></button></div><nav className="nav" aria-label="Main menu">{menu.map((item) => <button key={item.key} title={sidebarCollapsed ? item.label : undefined} className={view === item.key || (item.key === "profile" && false) ? "on" : ""} onClick={() => item.key === "profile" ? toProfile() : navigate(item.key)}><span className="ni"><Icon name={item.icon}/></span><span className="nav-label">{item.label}</span></button>)}</nav><div className="out"><div className="seg theme" role="group" aria-label="Theme">{([ ["light", "sun", "Light"], ["dark", "moon", "Dark"], ["auto", "monitor", "Auto"] ] as const).map(([value, icon, label]) => <button key={value} title={sidebarCollapsed ? label : undefined} className={theme === value ? "on" : ""} aria-pressed={theme === value} onClick={() => { setTheme(value); if (value === "auto") localStorage.removeItem("portal-theme"); else localStorage.setItem("portal-theme", value); }}><Icon name={icon}/><span className="tl">{label}</span></button>)}</div><a className="lo" href={url.getLogoutUrl()} title={sidebarCollapsed ? "Log out" : undefined}><Icon name="out"/><span className="tl">Log out</span></a></div></aside><button className={`scrim ${menuOpen ? "show" : ""}`} aria-label="Tutup menu" onClick={() => setMenuOpen(false)}/><main className="main" key={view}>{kcContext.message && <p className={`pidc-account-message ${kcContext.message.type}`} role="status">{kcContext.message.summary}</p>}{currentView}</main></div>;
}

