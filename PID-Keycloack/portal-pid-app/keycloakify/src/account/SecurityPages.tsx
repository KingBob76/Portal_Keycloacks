import type { FormEvent } from "react";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import AccountTemplate from "./AccountTemplate";
import { Icon } from "./Icon";

type SessionsContext = Extract<KcContext, { pageId: "sessions.ftl" }>;
type TotpContext = Extract<KcContext, { pageId: "totp.ftl" }>;
type LogContext = Extract<KcContext, { pageId: "log.ftl" }>;

function formatSessionDate(value: unknown): string {
    if (value === undefined || value === null || value === "") return "Tidak tersedia";
    const date = value instanceof Date ? value : new Date(typeof value === "number" ? value : String(value));
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
}

export function SessionsPage({ kcContext, i18n }: { kcContext: SessionsContext; i18n: I18n }) {
    const { sessions, stateChecker, url } = kcContext;
    const items = sessions.sessions;
    const backUrl = new URL(url.accountUrl, window.location.href);
    backUrl.searchParams.set("pidcView", "account");
    backUrl.hash = "account";
    if (kcContext.referrer) { backUrl.searchParams.set("referrer", kcContext.referrer.name); backUrl.searchParams.set("referrer_uri", kcContext.referrer.url); }

    return <AccountTemplate kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} active="sessions">
        <div className="security-page">
            <header className="security-page-head">
                <div className="security-title-icon"><Icon name="monitor" /></div>
                <div><span className="security-eyebrow">PERANGKAT & KEAMANAN</span><h1>Active sessions</h1><p>Periksa perangkat yang masih menggunakan akun SSO Anda.</p></div>
                <a className="security-back-button" href={backUrl.toString()}><span aria-hidden="true">←</span> Kembali ke Account settings</a>
            </header>
            <section className="security-summary">
                <div className="security-summary-mark"><Icon name="shield" /></div>
                <div><span>Sesi terdaftar</span><strong>{items.length}</strong></div>
                <p>Daftar sesi berasal langsung dari Keycloak. Anda dapat mengakhiri semua sesi lain sekaligus.</p>
            </section>
            {items.length ? <section className="security-list" aria-label="Daftar sesi aktif">
                {items.map((session) => <article className="security-item" key={session.id}>
                    <div className="security-item-icon"><Icon name="monitor" /></div>
                    <div className="security-item-main">
                        <div className="security-item-heading"><h2>Perangkat masuk</h2><span className="security-status"><i /> Aktif</span></div>
                        <div className="security-facts">
                            <span><b>Alamat IP</b>{session.ipAddress || "Tidak tersedia"}</span>
                            <span><b>Mulai</b>{formatSessionDate(session.started)}</span>
                            <span><b>Terakhir aktif</b>{formatSessionDate(session.lastAccess)}</span>
                            <span><b>Kedaluwarsa</b>{formatSessionDate(session.expires)}</span>
                        </div>
                        {!!session.clients.length && <div className="security-clients"><b>Aplikasi</b><div>{session.clients.map((client) => <span className="security-client" key={client}>{client}</span>)}</div></div>}
                    </div>
                </article>)}
            </section> : <div className="security-empty"><span className="security-empty-icon"><Icon name="monitor" /></span><h2>Belum ada sesi aktif</h2><p>Keycloak belum mencatat sesi untuk ditampilkan.</p></div>}
            <form className="security-footer" action={url.sessionsUrl} method="post" onSubmit={(event: FormEvent<HTMLFormElement>) => { if (!window.confirm("Keluar dari semua sesi Keycloak lainnya?")) event.preventDefault(); }}>
                <input type="hidden" name="stateChecker" value={stateChecker} />
                <div><b>Akhiri sesi lain</b><p>Perangkat lain akan diminta untuk login kembali.</p></div>
                <button className="security-danger-button" type="submit" id="logout-all-sessions" disabled={items.length === 0}><Icon name="out" /> Keluar dari semua sesi</button>
            </form>
        </div>
    </AccountTemplate>;
}

export function LoginHistoryPage({ kcContext, i18n }: { kcContext: LogContext; i18n: I18n }) {
    const events = kcContext.log.events;
    const backUrl = new URL(kcContext.url.accountUrl, window.location.href);
    backUrl.searchParams.set("pidcView", "account");
    backUrl.hash = "account";
    if (kcContext.referrer) { backUrl.searchParams.set("referrer", kcContext.referrer.name); backUrl.searchParams.set("referrer_uri", kcContext.referrer.url); }
    const eventLabels: Record<string, string> = {
        LOGIN: "Login berhasil", LOGIN_ERROR: "Login gagal", LOGOUT: "Logout",
        UPDATE_PASSWORD: "Password diperbarui", UPDATE_PROFILE: "Profil diperbarui",
        UPDATE_TOTP: "Authenticator diperbarui", REMOVE_TOTP: "Authenticator dihapus",
        CODE_TO_TOKEN: "Akses aplikasi", REFRESH_TOKEN: "Sesi diperbarui",
    };

    return <AccountTemplate kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} active="log">
        <div className="security-page">
            <header className="security-page-head">
                <div className="security-title-icon"><Icon name="clock" /></div>
                <div><span className="security-eyebrow">AKTIVITAS AKUN</span><h1>Login history</h1><p>Riwayat aktivitas yang direkam oleh Keycloak untuk akun Anda.</p></div>
                <a className="security-back-button" href={backUrl.toString()}><span aria-hidden="true">←</span> Kembali ke Account settings</a>
            </header>
            <section className="security-summary history-summary">
                <div className="security-summary-mark"><Icon name="clock" /></div>
                <div><span>Aktivitas tersimpan</span><strong>{events.length}</strong></div>
                <p>Periode penyimpanan mengikuti konfigurasi event pada realm Keycloak.</p>
            </section>
            {events.length ? <section className="history-list" aria-label="Riwayat aktivitas">
                {events.map((event, index) => {
                    const label = eventLabels[event.event] || event.event.replace(/_/g, " ").toLowerCase().replace(/^./, (letter: string) => letter.toUpperCase());
                    const failed = event.event.endsWith("_ERROR");
                    const dateValue = event.date instanceof Date ? event.date : event.date;
                    const date = event.date ? new Date(dateValue as string | number).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "Waktu tidak tersedia";
                    return <article className="history-item" key={`${event.date}-${event.event}-${index}`}>
                        <span className={`history-marker ${failed ? "is-error" : ""}`}><Icon name={failed ? "info" : "user"} /></span>
                        <div className="history-content">
                            <div className="history-heading"><h2>{label}</h2><time>{date}</time></div>
                            <div className="history-meta"><span><b>IP</b>{event.ipAddress || "Tidak tersedia"}</span><span><b>Aplikasi</b>{event.client || "Portal PID"}</span></div>
                            {!!event.details.length && <details className="history-details"><summary>Rincian aktivitas</summary><dl>{event.details.map((detail, detailIndex) => <div key={`${detail.key}-${detailIndex}`}><dt>{detail.key}</dt><dd>{detail.value}</dd></div>)}</dl></details>}
                        </div>
                    </article>;
                })}
            </section> : <div className="security-empty"><span className="security-empty-icon"><Icon name="clock" /></span><h2>Belum ada riwayat login</h2><p>Keycloak belum memiliki event untuk ditampilkan. Event yang disimpan ditentukan oleh konfigurasi realm.</p></div>}
        </div>
    </AccountTemplate>;
}

export function AuthenticatorPage({ kcContext, i18n }: { kcContext: TotpContext; i18n: I18n }) {
    const { totp, mode, stateChecker, url, messagesPerField } = kcContext;
    const { getAlgorithmKey } = totp.policy;
    const backUrl = new URL(url.accountUrl, window.location.href);
    backUrl.searchParams.set("pidcView", "account");
    backUrl.hash = "account";
    if (kcContext.referrer) { backUrl.searchParams.set("referrer", kcContext.referrer.name); backUrl.searchParams.set("referrer_uri", kcContext.referrer.url); }

    return <AccountTemplate kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} active="totp">
        <div className="security-page authenticator-page">
            <header className="security-page-head">
                <div className="security-title-icon"><Icon name="phone" /></div>
                <div><span className="security-eyebrow">VERIFIKASI TAMBAHAN</span><h1>Authenticator</h1><p>Kelola verifikasi dua langkah untuk menjaga keamanan akun Anda.</p></div>
                <a className="security-back-button" href={backUrl.toString()}><span aria-hidden="true">←</span> Kembali ke Account settings</a>
            </header>
            {totp.enabled ? <>
                <section className="security-summary authenticator-summary">
                    <div className="security-summary-mark success-mark"><Icon name="shield" /></div>
                    <div><span>Status keamanan</span><strong>Authenticator aktif</strong></div>
                    <p>Akun Anda memiliki verifikasi tambahan saat proses login.</p>
                </section>
                <section className="authenticator-card">
                    <div className="authenticator-card-head"><div><h2>Perangkat authenticator</h2><p>Hapus perangkat yang sudah tidak Anda gunakan.</p></div><span className="security-count">{totp.otpCredentials.length} perangkat</span></div>
                    {totp.otpCredentials.map((credential) => <div className="authenticator-device" key={credential.id}>
                        <span className="auth-device-icon"><Icon name="phone" /></span>
                        <div><b>{credential.userLabel || "Authenticator"}</b><small>Aplikasi one-time password</small></div>
                        <form action={url.totpUrl} method="post" onSubmit={(event) => { if (!window.confirm("Hapus perangkat authenticator ini?")) event.preventDefault(); }}>
                            <input type="hidden" name="stateChecker" value={stateChecker} />
                            <input type="hidden" name="submitAction" value="Delete" />
                            <input type="hidden" name="credentialId" value={credential.id} />
                            <button className="auth-remove-button" type="submit" aria-label={`Hapus ${credential.userLabel || "authenticator"}`}><Icon name="trash" /> Hapus</button>
                        </form>
                    </div>)}
                </section>
            </> : <>
                <section className="authenticator-intro"><span className="authenticator-intro-icon"><Icon name="lock" /></span><div><h2>Aktifkan verifikasi dua langkah</h2><p>Ikuti panduan di bawah menggunakan aplikasi authenticator pilihan Anda. Kode verifikasi akan diminta saat login.</p></div></section>
                <section className="authenticator-card setup-card">
                    <div className="authenticator-card-head"><div><h2>Hubungkan aplikasi</h2><p>Aplikasi yang didukung: {totp.supportedApplications?.join(", ") || "Authenticator kompatibel dengan TOTP"}.</p></div></div>
                    <div className="auth-setup-grid">
                        <div className="auth-steps">
                            <div className="auth-step"><span>1</span><div><b>Pindai kode QR</b><p>Buka aplikasi authenticator dan pindai kode di samping.</p></div></div>
                            {mode === "manual" && <div className="auth-manual-secret"><span>Kunci setup</span><code>{totp.totpSecretEncoded}</code><a href={totp.qrUrl}>Kembali ke kode QR</a></div>}
                            {mode !== "manual" && <a className="auth-manual-link" href={totp.manualUrl}>Tidak bisa memindai? Masukkan kunci secara manual</a>}
                            <div className="auth-step"><span>2</span><div><b>Konfirmasi kode</b><p>Masukkan kode enam digit yang ditampilkan di aplikasi.</p></div></div>
                            <div className="auth-policy"><b>Pengaturan kode</b><span>{getAlgorithmKey()} · {totp.policy.digits} digit · {totp.policy.type === "totp" ? `${totp.policy.period} detik` : `counter ${totp.policy.initialCounter}`}</span></div>
                        </div>
                        {mode !== "manual" && <div className="auth-qr-card"><img src={`data:image/png;base64,${totp.totpSecretQrCode}`} alt="Kode QR authenticator" /><span>Pindai dengan aplikasi authenticator</span></div>}
                    </div>
                </section>
                <form action={url.totpUrl} className="authenticator-card auth-confirm-form" id="kc-totp-settings-form" method="post">
                    <input type="hidden" name="stateChecker" value={stateChecker} />
                    <input type="hidden" name="totpSecret" value={totp.totpSecret} />
                    {mode && <input type="hidden" name="mode" value={mode} />}
                    <div className="auth-confirm-fields">
                        <label htmlFor="totp">Kode authenticator <i>*</i><input type="text" id="totp" name="totp" inputMode="numeric" autoComplete="one-time-code" required aria-invalid={messagesPerField.existsError("totp")} placeholder="Masukkan kode verifikasi" />{messagesPerField.existsError("totp") && <small className="auth-field-error" role="alert">{messagesPerField.get("totp")}</small>}</label>
                        <label htmlFor="userLabel">Nama perangkat{totp.otpCredentials.length > 0 && <i>*</i>}<input type="text" id="userLabel" name="userLabel" autoComplete="off" required={totp.otpCredentials.length > 0} placeholder="Contoh: Ponsel kerja" aria-invalid={messagesPerField.existsError("userLabel")} />{messagesPerField.existsError("userLabel") && <small className="auth-field-error" role="alert">{messagesPerField.get("userLabel")}</small>}</label>
                    </div>
                    <div className="auth-form-actions"><span><i>*</i> Wajib diisi</span><div><button type="submit" name="submitAction" value="Cancel" className="auth-secondary-button">Batal</button><button type="submit" id="saveTOTPBtn" className="auth-primary-button">Aktifkan authenticator <Icon name="shield" /></button></div></div>
                </form>
            </>}
        </div>
    </AccountTemplate>;
}
