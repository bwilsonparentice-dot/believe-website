import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
const base = process.argv[2] || 'http://localhost:4173'
const out = 'scratch-shots'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

await page.goto(base, { waitUntil: 'networkidle' })
await wait(600)
const skip = await page.$('text=Skip'); if (skip) await skip.click()
await wait(2200)
await page.mouse.click(720, 800) // reveal rooms
await wait(1500)

const chapters = [
  ['The Founder’s Room', 'ch-founder'],
  ['The Believe Blueprint', 'ch-blueprint'],
  ['The Table', 'ch-table'],
  ['The Library', 'ch-library'],
  ['The Studio', 'ch-studio'],
  ['Private Advisory', 'ch-advisory'],
  ['The Stage', 'ch-stage'],
  ['The People', 'ch-people'],
  ['The Stories', 'ch-stories'],
  ['Work With Believe Studio', 'ch-work'],
  ['Field Notes', 'ch-fieldnotes'],
  ['The Houses to Come', 'ch-houses'],
]

for (const [label, file] of chapters) {
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
  await wait(500)
  const link = page.locator('footer').getByText(label, { exact: true }).first()
  if (!(await link.count())) { console.log('MISSING LINK:', label); continue }
  await link.click({ timeout: 5000 }).catch((e) => console.log('click fail', label, e.message.split('\n')[0]))
  await wait(1400)
  await page.screenshot({ path: `${out}/${file}.png` })
  await page.keyboard.press('Escape')
  await wait(600)
}
await browser.close()
console.log('chapters done')
