// Builds dist-cb-preview/create-believers-preview.html: one file holding the
// Create Believers pages, with its photographs and logo embedded, for review.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

execSync('npx vite build --config vite.cb-preview.config.ts', { stdio: 'inherit' })
let html = readFileSync('dist-cb-preview/cb-preview.html', 'utf8')
const embed = (path, type) => `data:${type};base64,${readFileSync('public' + path).toString('base64')}`
for (const [path, type] of [['/photos/unpaved-fireside-gathering.webp', 'image/webp'], ['/photos/photo-table.webp', 'image/webp'], ['/logo/believe-horizontal.svg', 'image/svg+xml']]) {
  html = html.split(path).join(embed(path, type))
}
// the hosting page supplies its own document frame, so keep only what sits inside head and body
const inner = (tag) => html.slice(html.indexOf('>', html.indexOf('<' + tag)) + 1, html.lastIndexOf('</' + tag + '>'))
const head = inner('head').replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>/g, '')
writeFileSync('dist-cb-preview/create-believers-preview.html', head.trim() + '\n' + inner('body').trim() + '\n')
console.log('wrote dist-cb-preview/create-believers-preview.html', Math.round(html.length / 1024) + ' KB')
