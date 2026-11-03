// Prerender a static entry for /possibilities so link-share crawlers that do not
// run JavaScript (e.g. LinkedIn) read the correct title, description, and Open
// Graph tags. It copies the built dist/index.html (which already references the
// hashed SPA assets) and swaps in the Find Your Next Possibility metadata,
// writing both dist/possibilities.html and dist/possibilities/index.html so
// GitHub Pages serves the right file for /possibilities and /possibilities/.
// The branded OG image is unchanged. Mirrors scripts/build-lets-talk-og.mjs.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const TITLE = 'Find Your Next Possibility | Believe Studio'
const DESC = 'A short, welcoming experience from Believe Studio. Answer four quick questions for a fresh angle on your brand and one small move you can try next. No email required.'
const URL = 'https://believestudio.co/possibilities'

let html
try {
  html = readFileSync(resolve(dist, 'index.html'), 'utf8')
} catch (e) {
  console.error('[possibilities og] dist/index.html not found; run vite build first.', e.message)
  process.exit(1)
}

const swap = (re, value, label) => {
  if (!re.test(html)) { console.warn(`[possibilities og] pattern not found: ${label}`); return }
  html = html.replace(re, (_m, p1, _p2, p3) => `${p1}${value}${p3}`)
}

// <title>…</title>
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${TITLE}</title>`)
// name="description" content="…"  (attributes may span newlines)
swap(/(name="description"\s+content=")([\s\S]*?)(")/, DESC, 'description')
// canonical
swap(/(<link rel="canonical" href=")([\s\S]*?)(")/, URL, 'canonical')
// Open Graph
swap(/(property="og:title"\s+content=")([\s\S]*?)(")/, TITLE, 'og:title')
swap(/(property="og:description"\s+content=")([\s\S]*?)(")/, DESC, 'og:description')
swap(/(property="og:url"\s+content=")([\s\S]*?)(")/, URL, 'og:url')
// Twitter
swap(/(name="twitter:title"\s+content=")([\s\S]*?)(")/, TITLE, 'twitter:title')
swap(/(name="twitter:description"\s+content=")([\s\S]*?)(")/, DESC, 'twitter:description')

writeFileSync(resolve(dist, 'possibilities.html'), html)
mkdirSync(resolve(dist, 'possibilities'), { recursive: true })
writeFileSync(resolve(dist, 'possibilities', 'index.html'), html)
console.log('[possibilities og] wrote dist/possibilities.html and dist/possibilities/index.html')
