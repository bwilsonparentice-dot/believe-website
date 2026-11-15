// Render the 1200×630 link-preview image for /the-unpaved-path/live into
// public/og-unpaved-path-live.jpg. A text-led card in the event's navy, ivory
// and gold, set in the site's own self-hosted fonts and logo (no portraits).
// Run by hand when the event details change:  node scripts/make-unpaved-path-og.mjs
// (not part of `npm run build`; the rendered JPEG is committed).
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = resolve(root, 'public')
// the approved logo lockup, with its dark wordmark recoloured ivory for navy
const logo = readFileSync(resolve(pub, 'logo/believe-horizontal.svg'), 'utf8')
  .replace(/fill="#102638"/g, 'fill="#f6efe4"').replace(/#B98D3F/g, '#d9b45c')
  .replace(/<svg /, '<svg class="logo" ')

// the site's self-hosted font faces, pointed at the files on disk
const fonts = readFileSync(resolve(pub, 'fonts/fonts.css'), 'utf8')
  .replace(/url\((['"]?)\/fonts\//g, `url($1${pathToFileURL(resolve(pub, 'fonts')).href}/`)

const html = `<!doctype html><html><head><meta charset="utf-8">
<style>${fonts}
  html,body{margin:0}
  body{width:1200px;height:630px;background:#02122d;color:#f6efe4;position:relative;overflow:hidden;text-align:center}
  .frame{position:absolute;inset:34px;border:1.5px solid #d9b45c}
  .logo{position:absolute;top:6px;left:50%;transform:translateX(-50%);height:110px;width:auto;background:#02122d;padding:0 14px}
  .the{position:absolute;top:128px;left:0;right:0;font:500 34px/1 'Playfair Display',serif;letter-spacing:.3em;padding-left:.3em}
  .title{position:absolute;top:168px;left:0;right:0;font:500 112px/1.05 'Playfair Display',serif;letter-spacing:.01em;white-space:nowrap}
  .with{position:absolute;top:296px;left:0;right:0;font:italic 400 60px/1 'Cormorant Garamond',serif}
  .rule{position:absolute;top:392px;left:50%;width:150px;margin-left:-75px;height:2px;background:#d9b45c}
  .when{position:absolute;top:426px;left:0;right:0;font:500 35px/1 'Jost',sans-serif;letter-spacing:.05em}
  .when b{font-weight:500;color:#d9b45c;padding:0 .35em}
  .for{position:absolute;top:500px;left:0;right:0;font:italic 400 33px/1 'Cormorant Garamond',serif;color:#e9cb80}
</style></head><body>
  <div class="frame"></div>${logo}
  <div class="the">THE</div>
  <div class="title">UNPAVED PATH</div>
  <div class="with">with Beth &amp; Kendra</div>
  <div class="rule"></div>
  <div class="when">Friday, November 20<b>&middot;</b>2&ndash;3 p.m. ET<b>&middot;</b>Free on Zoom</div>
  <div class="for">For food and beverage founders</div>
</body></html>`

// PW_CHROMIUM may name a Chromium binary when Playwright's own is not installed
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
const tmp = resolve(root, '.og-unpaved-path.tmp.html')
const { writeFileSync, rmSync } = await import('node:fs')
writeFileSync(tmp, html)
await page.goto(pathToFileURL(tmp).href)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: resolve(pub, 'og-unpaved-path-live.jpg'), type: 'jpeg', quality: 92 })
await browser.close()
rmSync(tmp)
console.log('[unpaved-path og image] wrote public/og-unpaved-path-live.jpg')
