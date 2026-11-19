import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { handleTicketRequest as glpiTickets } from './api/glpi-tickets.ts'
import { handlePortalRequest as glpiPortal } from './api/glpi-portal.ts'

function localHelpdeskApi(): Plugin {
  return {
    name: 'portal-local-helpdesk-api',
    configureServer(server) {
      const route = (path: string, handler: (request: Request) => Promise<Response>) => {
        server.middlewares.use(path, async (req, res) => {
          if (req.method !== 'GET' && req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'Method not allowed' }))
            return
          }
          try {
            const chunks: string[] = []
            if (req.method === 'POST') {
              req.setEncoding('utf8')
              for await (const chunk of req) chunks.push(String(chunk))
            }
            const headers = new Headers()
            for (const [name, value] of Object.entries(req.headers)) {
              if (typeof value === 'string') headers.set(name, value)
              else if (Array.isArray(value)) headers.set(name, value.join(', '))
            }
            const query = new URL(req.url || '/', 'http://localhost').search
            const response = await handler(new Request(`http://localhost${path}${query}`, {
              method: req.method,
              headers,
              ...(req.method === 'POST' ? { body: chunks.join('') } : {}),
            }))
            res.statusCode = response.status
            response.headers.forEach((value, name) => res.setHeader(name, value))
            res.end(await response.text())
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'Tidak dapat memproses permintaan helpdesk.' }))
          }
        })
      }
      route('/api/glpi-tickets', glpiTickets)
      route('/api/glpi-portal', glpiPortal)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['KEYCLOAK_URL', 'KEYCLOAK_REALM', 'GLPI_API_URL', 'GLPI_USER_TOKEN', 'GLPI_APP_TOKEN', 'GLPI_CF_ACCESS_CLIENT_ID', 'GLPI_CF_ACCESS_CLIENT_SECRET', 'GLPI_TUNNEL_KEY']) {
    if (!process.env[key] && env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [react(), localHelpdeskApi()],
  }
})
