// Verification screenshots of the phases and a few chapters.
// Usage: node scripts/shoot.mjs [baseURL]
import { chromium } from 'playwright'

const base = process.argv[2] || 'http://localhost:4173'
const out = 'scratch-shots'
import { mkdirSync } from 'node:fs'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

await page.goto(base, { waitUntil: 'networkidle' })
await wait(3500)
await page.screenshot({ path: `${out}/01-overture.png` })

// enter via Skip → building (clipped to threshold)
await page.evaluate(() => document.querySelector('body')?.click())
await wait(300)
// click Skip if present
const skip = await page.$('text=Skip')
if (skip) await skip.click()
await wait(2500)
await page.screenshot({ path: `${out}/02-building-clipped.png` })

// reveal rooms
await page.mouse.click(720, 800)
await wait(2000)
await page.screenshot({ path: `${out}/03-rooms.png` })

// scroll through the building
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
await wait(1500)
await page.screenshot({ path: `${out}/04-footer.png`, fullPage: false })

await browser.close()
console.log('done')
