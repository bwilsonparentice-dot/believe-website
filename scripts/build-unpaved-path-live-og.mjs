// Prerender a static entry for /the-unpaved-path/live so link-share crawlers that
// do not run JavaScript (e.g. LinkedIn) read the correct title, description,
// canonical URL, and Open Graph tags. It copies the built dist/index.html (which
// already references the hashed SPA assets) and swaps in the event metadata,
// writing both dist/the-unpaved-path/live.html and
// dist/the-unpaved-path/live/index.html so GitHub Pages serves the right file
// with or without a trailing slash. The link-preview image is the event's own
// 1200×630 card, public/og-unpaved-path-live.jpg (the portrait event artwork
// would be cropped in a preview); see scripts/make-unpaved-path-og.mjs.
// Mirrors scripts/build-lets-talk-og.mjs. Keep the copy in step with
// src/components/UnpavedPathLive.tsx.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const TITLE = 'The Unpaved Path with Beth &amp; Kendra | Believe Studio'
const DESC = 'A free, live Zoom conversation for food and beverage founders about growing your brand beyond traditional retail. Friday, November 20, 2026, 2–3 p.m. Eastern.'
const URL = 'https://believestudio.co/the-unpaved-path/live'
const IMAGE = 'https://believestudio.co/og-unpaved-path-live.jpg'
const IMAGE_ALT = 'The Unpaved Path with Beth &amp; Kendra. Friday, November 20, 2–3 p.m. ET, free on Zoom. Believe Studio.'

let html
try {
  html = readFileSync(resolve(dist, 'index.html'), 'utf8')
} catch (e) {
  console.error('[unpaved-path-live og] dist/index.html not found; run vite build first.', e.message)
  process.exit(1)
}

const swap = (re, value, label) => {
  if (!re.test(html)) { console.warn(`[unpaved-path-live og] pattern not found: ${label}`); return }
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
swap(/(property="og:image"\s+content=")([\s\S]*?)(")/, IMAGE, 'og:image')
swap(/(property="og:image:alt"\s+content=")([\s\S]*?)(")/, IMAGE_ALT, 'og:image:alt')
// Twitter
swap(/(name="twitter:image"\s+content=")([\s\S]*?)(")/, IMAGE, 'twitter:image')
swap(/(name="twitter:title"\s+content=")([\s\S]*?)(")/, TITLE, 'twitter:title')
swap(/(name="twitter:description"\s+content=")([\s\S]*?)(")/, DESC, 'twitter:description')

mkdirSync(resolve(dist, 'the-unpaved-path', 'live'), { recursive: true })
writeFileSync(resolve(dist, 'the-unpaved-path', 'live.html'), html)
writeFileSync(resolve(dist, 'the-unpaved-path', 'live', 'index.html'), html)
console.log('[unpaved-path-live og] wrote dist/the-unpaved-path/live.html and dist/the-unpaved-path/live/index.html')
