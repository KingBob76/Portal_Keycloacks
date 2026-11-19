import type { TemplateProps } from "keycloakify/account/TemplateProps";
import { useEffect, useState } from "react";
import { useInitialize } from "keycloakify/account/Template.useInitialize";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { Icon, type IconName } from "./Icon";

export default function AccountTemplate(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, active, children, doUseDefaultCss } = props;
    const { url, account, referrer } = kcContext;
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"auto" | "light" | "dark">("auto");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const fullName = [account.firstName, account.lastName].filter(Boolean).join(" ") || account.username || "Pengguna";
    const initial = (account.firstName || account.username || "U").charAt(0).toUpperCase();
    const query = new URLSearchParams(window.location.search);
    const view = query.get("pidcView") || "applications";
    const embedded = query.get("pidcEmbed") === "1";
    const isSettings = active === "sessions" || active === "log" || active === "totp" || active === "password" || view === "settings";
    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    function accountViewUrl(nextView: string) {
        const target = new URL(url.accountUrl, window.location.href);
        target.searchParams.set("pidcView", nextView);
        target.hash = nextView === "profile" ? "publicprofile" : nextView;
        if (referrer) {
            target.searchParams.set("referrer", referrer.name);
            target.searchParams.set("referrer_uri", referrer.url);
        }
        return target.toString();
    }

    useEffect(() => {
        document.title = "SSO Profile | Portal PID";
    }, []);
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
    useSetClassName({ qualifiedName: "html", className: "pidc-account-html" });
    useSetClassName({ qualifiedName: "body", className: "pidc-account-body" });

    useEffect(() => {
        document.body.classList.toggle("menu-open", menuOpen);
        return () => document.body.classList.remove("menu-open");
    }, [menuOpen]);
    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, []);

    if (!isReadyToRender) return null;
    if (embedded) return <main className="main embedded-security-main">{children}</main>;

    const nav: { key: "profile" | "account"; icon: IconName; label: string }[] = [
        { key: "profile", icon: "user", label: "Public profile" },
        { key: "account", icon: "shield", label: "Account settings" },
    ];
    const selectedView = isSettings ? "account" : view;

    return (
        <div className={`shell pidc-app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
            <header className="mbar">
                <button className="mb" type="button" aria-label="Buka menu" onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
                <span className="mt">SSO Profile</span>
                <button className="mb" type="button" aria-label="Public profile" onClick={() => { window.location.href = accountViewUrl("profile"); }}><span className="av">{initial}</span></button>
            </header>
            <aside className={`side ${menuOpen ? "open" : ""}`}>
                <div className="hb"><span className="logo"><Icon name="grid" /></span><b>SSO Profile</b><button className="mb close" type="button" aria-label="Tutup menu" onClick={() => setMenuOpen(false)}><Icon name="close" /></button></div>
                <div className="me"><div className="av" aria-hidden="true">{initial}</div><div><b>{fullName}</b><small>@{account.username || "user"}</small></div></div>
                <div className="rail-wrap"><button type="button" className="side-toggle" title={sidebarCollapsed ? "Expand menu" : "Collapse menu"} aria-label={sidebarCollapsed ? "Expand menu" : "Collapse menu"} aria-expanded={!sidebarCollapsed} onClick={() => { const next = !sidebarCollapsed; setSidebarCollapsed(next); localStorage.setItem("portal-sidebar-collapsed", String(next)); }}><Icon name="menu" /><span className="nav-label">{sidebarCollapsed ? "Expand menu" : "Collapse menu"}</span></button></div>
                <nav className="nav" aria-label="Main menu">
                    {nav.map((item) => <button key={item.key} type="button" title={sidebarCollapsed ? item.label : undefined} className={selectedView === item.key ? "on" : ""} aria-current={selectedView === item.key ? "page" : undefined} onClick={() => { window.location.href = accountViewUrl(item.key); }}><span className="ni"><Icon name={item.icon} /></span><span className="nav-label">{item.label}</span></button>)}
                </nav>
                <div className="out">
                    <div className="seg theme" role="group" aria-label="Theme">{([ ["light", "sun", "Light"], ["dark", "moon", "Dark"], ["auto", "monitor", "Auto"] ] as const).map(([value, icon, label]) => <button key={value} title={sidebarCollapsed ? label : undefined} className={theme === value ? "on" : ""} aria-pressed={theme === value} onClick={() => { setTheme(value); if (value === "auto") localStorage.removeItem("portal-theme"); else localStorage.setItem("portal-theme", value); }}><Icon name={icon} /><span className="tl">{label}</span></button>)}</div>
                    <a className="lo" href={url.getLogoutUrl()} title={sidebarCollapsed ? "Log out" : undefined}><Icon name="out" /><span className="tl">Log out</span></a>
                </div>
            </aside>
            <button className={`scrim ${menuOpen ? "show" : ""}`} type="button" aria-label="Tutup menu" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} />
            <main className="main">
                {kcContext.message && <p className={`pidc-account-message ${kcContext.message.type}`} role="status">{kcContext.message.summary}</p>}
                {children}
            </main>
        </div>
    );
}
