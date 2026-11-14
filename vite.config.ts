import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Static pages that live in public/<path>/index.html (The Unpaved Path, the
// discovery questionnaires) are served at /<path>/ by GitHub Pages. Vite's dev
// and preview servers do not resolve a directory to its index.html, so they
// would fall through to the single-page app instead. This makes local preview
// match production. It changes nothing in the built site.
function staticPages(): Plugin {
  const rewrite = (root: string) => (req: { url?: string }, _res: unknown, next: () => void) => {
    const [path, query = ''] = (req.url || '').split('?')
    if (path && path !== '/' && !/\.[a-z0-9]+$/i.test(path)) {
      const dir = path.replace(/\/+$/, '')
      if (!dir.includes('..') && existsSync(resolve(root, '.' + dir, 'index.html'))) {
        req.url = dir + '/index.html' + (query ? '?' + query : '')
      }
    }
    next()
  }
  return {
    name: 'believe-static-pages',
    configureServer(server) { server.middlewares.use(rewrite(resolve(server.config.root, 'public'))) },
    configurePreviewServer(server) { server.middlewares.use(rewrite(resolve(server.config.root, server.config.build.outDir))) },
  }
}

// Believe Studio — The World Map
// A single-page, cinematic, editorial web experience.
export default defineConfig({
  plugins: [react(), staticPages()],
  server: { host: true },
})
