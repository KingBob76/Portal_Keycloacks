import type { KcContext } from "./KcContext";
import "./password-update.css";

type Props = {
    kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>;
};

export default function PasswordUpdate({ kcContext }: Props) {
    const { url, messagesPerField, message, isAppInitiatedAction } = kcContext;

    const passwordError = messagesPerField.get("password");
    const confirmError = messagesPerField.get("password-confirm");
    const hasFieldErrors = messagesPerField.existsError(
        "password",
        "password-confirm",
    );

    return (
        <main className="pid-password-page">
            <header className="pid-password-brand">
                <span className="pid-password-mark" aria-hidden="true">
                    P
                </span>
                <span>
                    <strong>Portal PID</strong>
                    <small>PT Pelita Indonesia Djaya</small>
                </span>
            </header>

            <section className="pid-password-card">
                <span className="pid-password-badge">ACCOUNT SECURITY</span>
                <h1>Set Up New Password</h1>
                <p className="pid-password-intro">
                    Buat password baru untuk melanjutkan ke Portal PID.
                </p>

                {message && !hasFieldErrors && (
                    <div
                        className={`pid-password-alert pid-password-alert-${message.type}`}
                        role={message.type === "error" ? "alert" : "status"}
                    >
                        {message.summary}
                    </div>
                )}

                <form
                    id="kc-passwd-update-form"
                    action={url.loginAction}
                    method="post"
                    className="pid-password-form"
                >
                    <div className="pid-password-field">
                        <label htmlFor="password-new">New Password</label>
                        <input
                            type="password"
                            id="password-new"
                            name="password-new"
                            autoFocus
                            autoComplete="new-password"
                            required
                            aria-invalid={Boolean(passwordError || confirmError)}
                            aria-describedby={
                                passwordError ? "password-new-error" : undefined
                            }
                        />
                        {passwordError && (
                            <span
                                id="password-new-error"
                                className="pid-password-error"
                                aria-live="polite"
                            >
                                {passwordError}
                            </span>
                        )}
                    </div>

                    <div className="pid-password-field">
                        <label htmlFor="password-confirm">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            required
                            aria-invalid={Boolean(passwordError || confirmError)}
                            aria-describedby={
                                confirmError
                                    ? "password-confirm-error"
                                    : undefined
                            }
                        />
                        {confirmError && (
                            <span
                                id="password-confirm-error"
                                className="pid-password-error"
                                aria-live="polite"
                            >
                                {confirmError}
                            </span>
                        )}
                    </div>

                    <label className="pid-password-logout">
                        <input
                            type="checkbox"
                            id="logout-sessions"
                            name="logout-sessions"
                            value="on"
                        />
                        <span>Sign out from other devices</span>
                    </label>

                    <div className="pid-password-actions">
                        <button
                            id="kc-passwd-update-submit"
                            type="submit"
                            className="pid-password-submit"
                        >
                            Update Password
                        </button>

                        {isAppInitiatedAction && (
                            <button
                                type="submit"
                                name="cancel-aia"
                                value="true"
                                className="pid-password-cancel"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <p className="pid-password-foot">
                    Portal PID · Password Anda dikelola dengan aman oleh
                    Keycloak.
                </p>
            </section>
        </main>
    );
}