import { useEffect, useState } from "react";
import type { KcContext } from "./KcContext";
import "./portal-pid-login.css";

type Props = {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
};

const chips = ["HR", "Warehouse", "Asset", "Legal", "Learning"];

function BuildingIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="4" y="3" width="16" height="18" rx="1" />
            <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
    );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {hidden ? (
                <>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c7 0 11 7 11 7a17.6 17.6 0 0 1-3.4 4.2M6.3 6.5A17.9 17.9 0 0 0 1 12s4 7 11 7a10.6 10.6 0 0 0 4.2-.85" />
                    <path d="M9.5 9.8A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2" />
                </>
            ) : (
                <>
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                </>
            )}
        </svg>
    );
}

function getJakartaTime(date: Date) {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(date);

    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    const hour = Number(values.hour) % 24;

    return {
        hour,
        time: `${values.hour}:${values.minute}:${values.second}`,
        date: new Intl.DateTimeFormat("id-ID", {
            timeZone: "Asia/Jakarta",
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(date),
    };
}

export default function PortalPidLogin({ kcContext }: Props) {
    const { realm, url, login, message } = kcContext;
    const [showPassword, setShowPassword] = useState(false);
    const [now, setNow] = useState(() => new Date());
    const [use12Hour, setUse12Hour] = useState(false);

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 1000);
        return () => window.clearInterval(timer);
    }, []);

    const jakarta = getJakartaTime(now);
    const greeting =
        jakarta.hour < 4
            ? "malam"
            : jakarta.hour < 11
              ? "pagi"
              : jakarta.hour < 15
                ? "siang"
                : jakarta.hour < 18
                  ? "sore"
                  : "malam";

    const displayTime = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: use12Hour,
    }).format(now);

    const errorMessage =
        message?.type === "error" ? message.summary : undefined;

    return (
        <main className="login-page">
            <section className="lg-left" aria-label="Portal PID">
                <span className="lg-circle c1" />
                <span className="lg-circle c2" />
                <span className="lg-circle c3" />

                <div className="lg-top">
                    <div className="lg-brand">
                        <span className="mark">
                            <BuildingIcon />
                        </span>
                        <span>
                            <b>Portal PID</b>
                            <small>PT Pelita Indonesia Djaya</small>
                        </span>
                    </div>

                    <div className="lg-meta">
                        <span>Selamat {greeting} 👋</span>
                        <button
                            type="button"
                            className="lg-timepill tnum"
                            title="Klik untuk mengganti format waktu"
                            aria-label="Tanggal dan waktu saat ini, klik untuk mengganti format"
                            onClick={() => setUse12Hour((value) => !value)}
                        >
                            <span className="lg-tp-date">
                                <CalendarIcon />
                                {jakarta.date}
                            </span>
                            <span className="lg-tp-div" />
                            <span className="lg-tp-clock">
                                <span className="lg-livedot" aria-hidden="true" />
                                {displayTime}
                                <span>&nbsp;WIB</span>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="lg-hero">
                    <h1>
                        Satu portal,
                        <br />
                        semua akses.
                    </h1>
                    <p>
                        Masuk sekali untuk mengakses seluruh aplikasi internal
                        perusahaan — SDM, gudang, aset, legal, dan pelatihan —
                        dari satu akun yang sama.
                    </p>
                    <div className="lg-chips">
                        {chips.map((chip) => (
                            <span className="lg-chip" key={chip}>
                                {chip}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="lg-stats">
                    <div>
                        <b>5</b>
                        <span>Aplikasi terhubung</span>
                    </div>
                    <div>
                        <b>1,248</b>
                        <span>Pengguna aktif</span>
                    </div>
                    <div>
                        <b>SSO</b>
                        <span>Masuk sekali untuk semua</span>
                    </div>
                </div>
            </section>

            <section className="lg-right">
                <div className="lg-card">
                    <div className="lg-mbrand">
                        <span className="mark">
                            <BuildingIcon />
                        </span>
                        <span>
                            <b>Portal PID</b>
                            <small>PT Pelita Indonesia Djaya</small>
                        </span>
                    </div>

                    <span className="lg-badge">Employee</span>
                    <h2>Sign in</h2>
                    <p className="lg-sub">
                        Gunakan akun Portal PID Anda untuk melanjutkan.
                    </p>

                    {errorMessage && (
                        <div className="lg-alert" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form
                        action={url.loginAction}
                        method="post"
                        className="lg-form"
                    >
                        <div className="lg-field" id="fId">
                            <label htmlFor="username">
                                {realm.loginWithEmailAllowed
                                    ? "Employee ID or email"
                                    : "Employee ID"}
                            </label>
                            <div className="lg-inp">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    autoFocus
                                    required
                                    defaultValue={login.username ?? ""}
                                    placeholder="e.g. staff or raka.pratama@pid.co.id"
                                    aria-invalid={Boolean(errorMessage)}
                                />
                            </div>
                        </div>

                        <div className="lg-field" id="fPw">
                            <label htmlFor="password">Password</label>
                            <div className="lg-inp">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
                                    aria-invalid={Boolean(errorMessage)}
                                />
                                <button
                                    type="button"
                                    className="eye"
                                    onClick={() =>
                                        setShowPassword((value) => !value)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    <EyeIcon hidden={showPassword} />
                                </button>
                            </div>
                        </div>

                        <div className="lg-row">
                            {realm.rememberMe && (
                                <label className="lg-remember">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        value="on"
                                        defaultChecked={login.rememberMe === "on"}
                                    />
                                    <span>Keep me signed in</span>
                                </label>
                            )}

                            {realm.resetPasswordAllowed && (
                                <a
                                    className="lg-link"
                                    href={url.loginResetCredentialsUrl}
                                >
                                    Forgot password?
                                </a>
                            )}
                        </div>

                        <button
                            className="lg-btn lg-primary"
                            id="kc-login"
                            name="login"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="lg-foot">
                        Portal PID · Need help? Contact your HR administrator.
                    </p>
                </div>
            </section>
        </main>
    );
}