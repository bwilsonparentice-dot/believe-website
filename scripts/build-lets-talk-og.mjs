// Prerender a static entry for /lets-talk so link-share crawlers that do not run
// JavaScript (e.g. LinkedIn) read the correct title, description, and Open Graph
// tags. It copies the built dist/index.html (which already references the hashed
// SPA assets) and swaps in the Let's Talk metadata, writing both
// dist/lets-talk.html and dist/lets-talk/index.html so GitHub Pages serves the
// right file for /lets-talk and /lets-talk/. The branded OG image is unchanged.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const TITLE = 'Let’s Talk It Through | Believe Studio'
const DESC = 'A complimentary 30-minute conversation with Beth, founder of Believe Studio. Founder to founder: bring a retail challenge, a growth question, or a new idea, and let’s talk it through.'
const URL = 'https://believestudio.co/lets-talk'

let html
try {
  html = readFileSync(resolve(dist, 'index.html'), 'utf8')
} catch (e) {
  console.error('[lets-talk og] dist/index.html not found; run vite build first.', e.message)
  process.exit(1)
}

const swap = (re, value, label) => {
  if (!re.test(html)) { console.warn(`[lets-talk og] pattern not found: ${label}`); return }
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

writeFileSync(resolve(dist, 'lets-talk.html'), html)
mkdirSync(resolve(dist, 'lets-talk'), { recursive: true })
writeFileSync(resolve(dist, 'lets-talk', 'index.html'), html)
console.log('[lets-talk og] wrote dist/lets-talk.html and dist/lets-talk/index.html')
