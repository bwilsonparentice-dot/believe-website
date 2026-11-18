/**
 * Matching — a transparent aid for a human reviewer. It never approves a match,
 * reserves stock, or commits spending.
 *
 * Step one is eligibility: every practical requirement is checked on its own.
 * A requirement that fails cannot be outweighed by a good fit, and one that
 * cannot be checked because information is missing gives "Needs information",
 * never a pass. Only eligible brands receive a suggested fit score.
 *
 * The 0–10 fit score (audience 0–3, occasion 0–3, priority market 0–2, extras
 * 0–2) is an initial working choice for comparing options. It is not a
 * validated prediction of sales.
 */
import type { Brand, Gathering, Partnership, Product } from './types'
import { ACTIVE_PARTNERSHIP, OPEN_PARTNERSHIP } from './options'

export type CheckResult = 'pass' | 'fail' | 'unknown' | 'review'
export interface Check { key: string; label: string; result: CheckResult; detail: string }
export type Verdict = 'eligible' | 'needs_information' | 'not_eligible'
export interface FitScore { audience: number | null; occasion: number; market: number; extras: number; total: number }
export interface Investment { lines: { label: string; amount: number | null }[]; knownTotal: number; complete: boolean }
export interface Evaluation {
  brand: Brand
  verdict: Verdict
  checks: Check[]
  /** why this could be a good fit (eligible brands only) */
  reasons: string[]
  /** what still needs a human answer */
  questions: string[]
  score: FitScore | null
  /** units to plan for, rounded up to whole cases where the case pack is known; null when the host gave no estimate */
  quantity: { units: number; note: string } | null
  investment: Investment
}

const norm = (s: string) => s.trim().toLowerCase()
const includesCI = (list: string[], value: string) => list.some((x) => norm(x) === norm(value))
const daysBetween = (fromIso: string, toIso: string) =>
  Math.round((Date.parse(toIso + 'T00:00:00Z') - Date.parse(fromIso + 'T00:00:00Z')) / 86400000)

const US_STATES: Record<string, string> = { va: 'virginia', dc: 'district of columbia', md: 'maryland', nc: 'north carolina' }
const regionKey = (s: string) => { const n = norm(s); return US_STATES[n] ?? n }

function servesRegion(areas: string[], g: Gathering): boolean {
  const region = regionKey(g.region); const country = norm(g.country)
  return areas.some((a) => {
    const k = regionKey(a)
    return k === region || k === norm(g.city) || k === country || k === 'nationwide' || k === 'anywhere'
      || ((k === 'united states' || k === 'usa' || k === 'us') && ['united states', 'usa', 'us', 'united states of america'].includes(country))
  })
}

export function evaluate(
  g: Gathering, brand: Brand, products: Product[], today: string,
  /** every partnership on record, used for category conflicts and stock already promised */
  partnerships: Partnership[] = [], brands: Brand[] = [],
): Evaluation {
  const checks: Check[] = []
  const add = (key: string, label: string, result: CheckResult, detail: string) => checks.push({ key, label, result, detail })
  const own = products.filter((p) => p.brand_id === brand.id)

  // 1 — the profile itself
  if (brand.state !== 'approved') add('profile', 'Brand profile', 'fail', 'The profile is not approved yet.')
  else add('profile', 'Brand profile', 'pass', 'Approved.')

  // 2 — category the host asked for, and conflicts with brands already at this gathering
  if (g.categories.length && brand.category && !g.categories.includes(brand.category)) {
    add('category', 'Product category', 'fail', 'The host asked for a different kind of product.')
  } else if (!brand.category) add('category', 'Product category', 'unknown', 'The brand has no category on file.')
  else add('category', 'Product category', 'pass', g.categories.length ? 'Matches what the host asked for.' : 'The host did not narrow the category.')

  const alreadyHere = partnerships
    .filter((p) => p.gathering_id === g.id && p.brand_id !== brand.id && OPEN_PARTNERSHIP.concat('recap_received', 'closed').includes(p.status))
    .map((p) => brands.find((b) => b.id === p.brand_id)).filter((b): b is Brand => !!b)
  const clash = alreadyHere.find((o) =>
    (o.category && brand.category_conflicts.includes(o.category)) || (brand.category && o.category_conflicts.includes(brand.category)))
  if (clash) add('conflict', 'Category conflicts', 'fail', `Conflicts with ${clash.name}, already linked to this gathering.`)
  else add('conflict', 'Category conflicts', 'pass', alreadyHere.length ? 'No conflict with the brands already linked.' : 'No other brand is linked yet.')

  // 3 — geography
  if (!brand.geography_served.length) add('geography', 'Service geography', 'unknown', 'Where the brand can serve is not on file.')
  else if (servesRegion(brand.geography_served, g)) add('geography', 'Service geography', 'pass', `Serves ${g.region}.`)
  else add('geography', 'Service geography', 'fail', `${g.region} is outside the areas on file (${brand.geography_served.join(', ')}).`)

  // 4 — lead time and availability dates
  if (g.date_status !== 'confirmed' || !g.delivery_by) {
    add('lead_time', 'Delivery lead time', 'unknown', 'The gathering date is not confirmed, so there is no delivery date to check.')
  } else if (brand.min_lead_days == null) {
    add('lead_time', 'Delivery lead time', 'unknown', 'The brand’s minimum lead time is not on file.')
  } else {
    const days = daysBetween(today, g.delivery_by)
    if (days < brand.min_lead_days) add('lead_time', 'Delivery lead time', 'fail', `Needs ${brand.min_lead_days} days; delivery is due in ${Math.max(days, 0)}.`)
    else add('lead_time', 'Delivery lead time', 'pass', `${days} days until delivery is due; the brand needs ${brand.min_lead_days}.`)
  }
  if (g.delivery_by && ((brand.available_from && g.delivery_by < brand.available_from) || (brand.available_to && g.delivery_by > brand.available_to))) {
    add('availability', 'Availability dates', 'fail', 'The delivery date falls outside the dates the brand has product available.')
  }

  // 5 — quantity and stock (stock is managed by hand; this only reads what is on file)
  const casePack = own.find((p) => p.case_pack)?.case_pack ?? null
  let quantity: Evaluation['quantity'] = null
  if (g.requested_quantity == null) {
    add('quantity', 'Quantity and stock', 'unknown', 'The host gave no quantity estimate. Guest count is not treated as a unit count.')
  } else {
    const units = casePack ? Math.ceil(g.requested_quantity / casePack) * casePack : g.requested_quantity
    quantity = { units, note: casePack ? `Rounded up to whole cases of ${casePack}.` : 'Case pack not on file, so this is the host’s estimate as given.' }
    const promised = partnerships
      .filter((p) => p.brand_id === brand.id && p.gathering_id !== g.id && ACTIVE_PARTNERSHIP.includes(p.status) && p.status !== 'closed')
      .reduce((n, p) => n + (p.approved_quantity ?? 0), 0)
    if (brand.inventory_available == null) add('quantity', 'Quantity and stock', 'unknown', 'Available stock is not on file.')
    else {
      const free = brand.inventory_available - (brand.inventory_reserved ?? 0) - promised
      if (units > free) add('quantity', 'Quantity and stock', 'fail', `${units} units needed; ${Math.max(free, 0)} free on file after reservations and other approved gatherings.`)
      else if (brand.max_quantity != null && units > brand.max_quantity) add('quantity', 'Quantity and stock', 'fail', `${units} units is above the brand’s maximum of ${brand.max_quantity} per gathering.`)
      else if (brand.min_quantity != null && units < brand.min_quantity) add('quantity', 'Quantity and stock', 'fail', `${units} units is below the brand’s minimum of ${brand.min_quantity}.`)
      else if (brand.sampling_allowance != null && units > brand.sampling_allowance) add('quantity', 'Quantity and stock', 'fail', `${units} units is above the sampling allowance of ${brand.sampling_allowance}.`)
      else add('quantity', 'Quantity and stock', 'pass', `${units} units; ${free} free on file. Verify stock by hand before approving.`)
    }
  }

  // 6 — storage and serving
  if (brand.cold_storage === 'unknown') add('storage', 'Storage and serving', 'unknown', 'Whether the product needs cold storage is not on file.')
  else if (brand.cold_storage === 'required' && !g.capabilities.includes('cold_storage')) add('storage', 'Storage and serving', 'fail', 'The product must be kept cold and the host has not confirmed cold storage.')
  else add('storage', 'Storage and serving', 'pass', brand.cold_storage === 'required' ? 'Needs cold storage; the host has it.' : 'No cold storage needed.')

  // 7 — dietary and allergens: a person always confirms these
  const allergenUnknown = !own.length || own.some((p) => p.allergens_status === 'unknown')
  if (g.dietary_unknown) add('dietary', 'Dietary and allergens', 'unknown', 'The host does not yet know their guests’ dietary needs.')
  else if (g.dietary && allergenUnknown) add('dietary', 'Dietary and allergens', 'unknown', `The host noted: “${g.dietary}”. Ingredient and allergen details are not complete for this brand.`)
  else if (g.dietary) add('dietary', 'Dietary and allergens', 'review', `The host noted: “${g.dietary}”. Compare with the product’s ingredients and allergens before approving.`)
  else add('dietary', 'Dietary and allergens', 'pass', 'The host stated no dietary requirements.')

  // 8 — required visibility
  const missing = brand.required_visibility.filter((v) => !g.discovery.includes(v))
  if (missing.length) add('visibility', 'Required visibility', 'fail', `The brand requires something the host has not offered (${missing.join(', ').replace(/_/g, ' ')}).`)
  else add('visibility', 'Required visibility', 'pass', brand.required_visibility.length ? 'The host has offered everything the brand requires.' : 'The brand has no visibility requirements on file.')

  // 9 — budget
  const units = quantity?.units ?? null
  const lines: Investment['lines'] = [
    { label: 'Product', amount: brand.product_cost != null && units != null ? round2(brand.product_cost * units) : null },
    { label: 'Shipping', amount: brand.shipping_estimate },
    { label: 'Host or production allowance', amount: brand.host_allowance },
    { label: 'Believe fee', amount: brand.believe_fee },
  ]
  const investment: Investment = {
    lines, knownTotal: round2(lines.reduce((n, l) => n + (l.amount ?? 0), 0)), complete: lines.every((l) => l.amount != null),
  }
  if (brand.campaign_budget == null) add('budget', 'Budget', 'unknown', 'The campaign budget is not on file.')
  else {
    const taken = partnerships
      .filter((p) => p.brand_id === brand.id && p.gathering_id !== g.id && ACTIVE_PARTNERSHIP.includes(p.status))
      .reduce((n, p) => n + (p.cost_actual ?? p.cost_estimate ?? 0), 0)
    const left = round2(brand.campaign_budget - taken)
    if (investment.knownTotal > left) add('budget', 'Budget', 'fail', `The known costs (${money(investment.knownTotal)}) are above the ${money(left)} left in the budget.`)
    else if (!investment.complete) add('budget', 'Budget', 'unknown', `Some costs are not on file, so the estimate is incomplete (${money(investment.knownTotal)} known so far; ${money(left)} left in the budget).`)
    else add('budget', 'Budget', 'pass', `Estimated ${money(investment.knownTotal)}; ${money(left)} left in the budget.`)
  }

  const verdict: Verdict = checks.some((c) => c.result === 'fail') ? 'not_eligible'
    : checks.some((c) => c.result === 'unknown') ? 'needs_information' : 'eligible'
  const questions = checks.filter((c) => c.result === 'unknown' || c.result === 'review').map((c) => `${c.label}: ${c.detail}`)

  let score: FitScore | null = null
  const reasons: string[] = []
  if (verdict === 'eligible') {
    const occasion = brand.occasions.includes(g.type) ? 3 : 0
    if (occasion) reasons.push('This kind of gathering is one the brand is looking for.')
    const market = includesCI(brand.priority_markets, g.region) || includesCI(brand.priority_markets, g.city)
      || brand.priority_markets.some((m) => regionKey(m) === regionKey(g.region)) ? 2 : 0
    if (market) reasons.push(`${g.city}, ${g.region} is a priority market for the brand.`)
    let audience: number | null = null
    if (g.audience_interests.length) {
      const shared = g.audience_interests.filter((i) => includesCI(brand.audiences, i))
      audience = shared.length >= 2 ? 3 : shared.length === 1 ? 2 : 0
      if (shared.length) reasons.push(`Shared audience interests: ${shared.join(', ')}.`)
    }
    const extras = Math.min(2, brand.extras.length)
    if (extras) reasons.push(`The brand can add to the experience (${brand.extras.join(', ').replace(/_/g, ' ')}).`)
    score = { audience, occasion, market, extras, total: (audience ?? 0) + occasion + market + extras }
    if (audience == null) questions.push('Audience fit: tag this gathering’s audience interests to score it.')
  }
  return { brand, verdict, checks, reasons, questions, score, quantity, investment }
}

/** Up to three eligible brands, best fit first, plus those waiting on information. */
export function suggest(g: Gathering, brands: Brand[], products: Product[], partnerships: Partnership[], today: string) {
  const linked = new Set(partnerships.filter((p) => p.gathering_id === g.id).map((p) => p.brand_id))
  const all = brands
    .filter((b) => b.state === 'approved' && !linked.has(b.id))
    .map((b) => evaluate(g, b, products, today, partnerships, brands))
  const eligible = all.filter((e) => e.verdict === 'eligible')
    .sort((a, b) => (b.score?.total ?? 0) - (a.score?.total ?? 0) || a.brand.name.localeCompare(b.brand.name))
  return {
    suggestions: eligible.slice(0, 3),
    needsInformation: all.filter((e) => e.verdict === 'needs_information'),
    notEligible: all.filter((e) => e.verdict === 'not_eligible'),
  }
}

export const fitTotal = (p: Pick<Partnership, 'fit_audience' | 'fit_occasion' | 'fit_market' | 'fit_extras'>): number | null =>
  [p.fit_audience, p.fit_occasion, p.fit_market, p.fit_extras].every((n) => n == null) ? null
    : (p.fit_audience ?? 0) + (p.fit_occasion ?? 0) + (p.fit_market ?? 0) + (p.fit_extras ?? 0)

const round2 = (n: number) => Math.round(n * 100) / 100
export const money = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
