<<<<<<< HEAD
# Helpdesk Portal PID → GLPI

IT Service Management now contains a Helpdesk page for creating GLPI tickets. Portal users continue to sign in with the existing Keycloak SSO; the page forwards the short-lived SSO access token to the server endpoint, which verifies it with Keycloak before creating the ticket in GLPI. GLPI credentials stay on the server and are never sent to the browser.

## Configure the GLPI connection

1. In GLPI, enable the legacy REST API under **Setup → General → API** and create an API client. Restrict that client to the Portal backend's network address.
2. Create a dedicated GLPI integration user with permission to create tickets. Enable its remote access key and copy its user token. Avoid using an administrator account for the integration.
3. Copy `.env.example` to `.env.local` for local development, then set `KEYCLOAK_URL`, `KEYCLOAK_REALM`, `GLPI_API_URL`, `GLPI_USER_TOKEN`, and (if the API client requires it) `GLPI_APP_TOKEN`. Keep these values server-side; do not prefix them with `VITE_`.
4. Run `npm run dev`. Open the portal, sign in through Keycloak, select **IT Service Mgmt → Create a ticket**, and submit a test ticket. The endpoint is also configured as a Vercel function at `/api/glpi-tickets`.

For the existing `GLPI-Test` container shown in Docker Desktop, use `GLPI_API_URL=http://localhost:32769/apirest.php` for local development. The user token belongs to the dedicated integration account. The verified SSO user's display name and email are included in the ticket description so the helpdesk can identify who submitted it; portal users do not need a GLPI login.

For a Vercel Production deployment, set `GLPI_API_URL`, `GLPI_USER_TOKEN`, and `GLPI_APP_TOKEN` in the Vercel project's **Production** environment variables, then deploy again with `npx vercel --prod`. A Vercel Function cannot reach the Docker container through your PC's `localhost`; the production API URL must be reachable from Vercel, for example through an HTTPS host or a secure private tunnel. Keep all GLPI tokens server-only.

The endpoint requires a valid Keycloak token and validates the title, description, ticket type, and urgency before it calls GLPI. GLPI API credentials are read only from server environment variables.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
=======
# Portal_Keycloack
>>>>>>> b0c0a3aaef1fe75f86e527fd8986317e14e09b5c
