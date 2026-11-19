import { createRoot } from "react-dom/client";
import Keycloak from "keycloak-js";
import AccountPortalApp from "./AccountPortalApp";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Elemen #root tidak ditemukan.");
}

const root = createRoot(rootElement);

const keycloakUrl =
    import.meta.env.VITE_KEYCLOAK_URL ||
    (import.meta.env.DEV ? "http://localhost:8080" : "");

if (!keycloakUrl) {
    root.render(
        <main style={{ maxWidth: 560, margin: "10vh auto", padding: 24 }}>
            <h1>Portal PID belum dikonfigurasi</h1>
            <p>
                Atur VITE_KEYCLOAK_URL ke URL Keycloak HTTPS sebelum deployment.
            </p>
        </main>,
    );
} else {
    const keycloak = new Keycloak({
        url: keycloakUrl,
        realm: import.meta.env.VITE_KEYCLOAK_REALM || "portal-pid",
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "portal-pid",
    });

    root.render(<p style={{ padding: 24 }}>Menghubungkan ke Portal PID…</p>);

    keycloak
        .init({
            onLoad: "login-required",
            pkceMethod: "S256",
            checkLoginIframe: false,
        })
        .then((authenticated) => {
            if (!authenticated) {
                throw new Error("Autentikasi Keycloak belum berhasil.");
            }

            root.render(<AccountPortalApp keycloak={keycloak} />);
        })
        .catch((error: unknown) => {
            console.error("Keycloak initialization failed:", error);
            root.render(
                <main style={{ maxWidth: 560, margin: "10vh auto", padding: 24 }}>
                    <h1>Portal PID tidak dapat dibuka</h1>
                    <p>
                        Koneksi atau autentikasi Keycloak gagal. Periksa URL
                        Keycloak, realm, client, dan koneksi server.
                    </p>
                </main>,
            );
        });
}
