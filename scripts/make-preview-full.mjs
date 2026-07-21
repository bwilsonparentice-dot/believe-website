// Assemble a self-contained, photographed preview:
//   fonts embedded (data URIs) + room/façade photos downscaled to data URIs +
//   a tiny shim that rewrites runtime /photos/* <img> sources to the inlined data.
// Output: scratchpad/preview.html (artifact-ready page content).
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

const scratch = '/tmp/claude-0/-home-user-believe-website/cd4fca51-4850-59b0-a483-475c5d862e43/scratchpad'
const fontCss = readFileSync(`${scratch}/fonts-inline.css`, 'utf8')
const html = readFileSync('dist-preview/index.html', 'utf8')

const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)[1]
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1]
const styles = (head.match(/<style[^>]*>[\s\S]*?<\/style>/g) || []).join('\n')
const scripts = (head.match(/<script[^>]*>[\s\S]*?<\/script>/g) || []).join('\n')

const exe = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage()

const files = readdirSync('public/photos').filter((f) => f.endsWith('.png'))
const map = {}
for (const f of files) {
  const b64 = readFileSync(`public/photos/${f}`).toString('base64')
  const dataUri = await page.evaluate(async (src) => {
    const img = new Image()
    img.src = src
    await img.decode()
    const maxW = 1280
    const scale = Math.min(1, maxW / img.naturalWidth)
    const c = document.createElement('canvas')
    c.width = Math.round(img.naturalWidth * scale)
    c.height = Math.round(img.naturalHeight * scale)
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
    return c.toDataURL('image/jpeg', 0.72)
  }, `data:image/png;base64,${b64}`)
  map['/photos/' + f] = dataUri
  console.log(f, '→', Math.round(dataUri.length / 1024) + 'KB')
}
await browser.close()

// shim: rewrite any <img src="/photos/..."> to the inlined data URI (initial + observed)
const shim = `<script>(function(){var M=${JSON.stringify(map)};function fix(img){var s=img.getAttribute('src');if(s&&M[s]){img.src=M[s];}}function sweep(){document.querySelectorAll('img[src^="/photos/"]').forEach(fix);}new MutationObserver(function(muts){muts.forEach(function(m){(m.addedNodes||[]).forEach(function(n){if(n.tagName==='IMG')fix(n);else if(n.querySelectorAll)n.querySelectorAll('img[src^="/photos/"]').forEach(fix);});if(m.type==='attributes'&&m.target.tagName==='IMG')fix(m.target);});}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});document.addEventListener('DOMContentLoaded',sweep);sweep();})();</script>`

const frag =
  '<title>Believe Studio — A House for Founders</title>\n' +
  '<style>\n' + fontCss + '\n</style>\n' +
  styles + '\n' +
  shim + '\n' +
  (body.includes('id="root"') ? body.trim() : '<div id="root"></div>\n' + body.trim()) + '\n' +
  scripts + '\n'

writeFileSync(`${scratch}/preview.html`, frag)
console.log('preview.html MB:', (frag.length / 1048576).toFixed(2))
