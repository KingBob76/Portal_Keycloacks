import { Suspense } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
import SsoAccountPage from "./SsoAccountPage";
import { AuthenticatorPage, LoginHistoryPage, SessionsPage } from "./SecurityPages";
import AccountTemplate from "./AccountTemplate";
import "./sso-profile.css";

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });
    const query = new URLSearchParams(window.location.search);
    const accountView = query.get("pidcView") || "profile";

    return <Suspense>{(() => {
        if (kcContext.pageId === "account.ftl") {
            const view = accountView === "home" || accountView === "information" || accountView === "account" || accountView === "settings" || accountView === "profile"
                ? accountView === "settings" ? "account" : accountView
                : "profile";
            return <SsoAccountPage kcContext={kcContext} view={view} />;
        }
        if (kcContext.pageId === "sessions.ftl") return <SessionsPage kcContext={kcContext} i18n={i18n} />;
        if (kcContext.pageId === "log.ftl") return <LoginHistoryPage kcContext={kcContext} i18n={i18n} />;
        if (kcContext.pageId === "totp.ftl") return <AuthenticatorPage kcContext={kcContext} i18n={i18n} />;
        return <DefaultPage kcContext={kcContext} i18n={i18n} classes={classes} Template={AccountTemplate} doUseDefaultCss={false} />;
    })()}</Suspense>;
}

const classes = {} satisfies { [key in ClassKey]?: string };
