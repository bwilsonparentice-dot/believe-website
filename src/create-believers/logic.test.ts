// Run with: npm run test:create-believers
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateHost, validateHostStep, validateFounder, validateRecap, serverErrors } from './validate'
import { evaluate, suggest } from './matching'
import { matches, filterPublicBrands, EMPTY_BRAND_FILTERS, csvCell, toCsv, attendanceBand, inRange } from './search'
import type { Brand, Gathering, Partnership, Product, PublicBrand } from './types'

const TODAY = '2026-11-18'
const goodHost = {
  full_name: 'Ada Example', email: 'ada@example.test', name: 'Autumn book club', type: 'book_club', description: 'Reading',
  date_status: 'confirmed', event_date: '2026-12-18', event_time: '6pm', timezone: 'America/New_York', delivery_by: '2026-12-14',
  city: 'Richmond', region: 'Virginia', country: 'United States', postal_code: '23220', guest_count: '12', audience: 'Neighbours',
  shipping_preference: 'needs_quote', recap_ack: true, contact_consent: true,
}

test('host form: a complete application passes', () => {
  assert.deepEqual(validateHost(goodHost, TODAY), { errors: {}, firstStep: 0 })
})
test('host form: an empty application is stopped at step one, with every problem listed', () => {
  const r = validateHost({}, TODAY)
  assert.equal(r.firstStep, 1)
  for (const k of ['full_name', 'email', 'name', 'type', 'description', 'event_date', 'delivery_by', 'city', 'guest_count', 'audience', 'shipping_preference', 'recap_ack', 'contact_consent']) assert.ok(r.errors[k], k)
})
test('host form: date logic', () => {
  assert.ok(validateHostStep(2, { ...goodHost, delivery_by: '2026-12-18' }, TODAY).delivery_by, 'delivery on the day is too late')
  assert.ok(validateHostStep(2, { ...goodHost, delivery_by: '2026-12-20' }, TODAY).delivery_by, 'delivery after the event')
  assert.ok(validateHostStep(2, { ...goodHost, event_date: '2026-11-01' }, TODAY).event_date, 'event in the past')
  assert.ok(validateHostStep(2, { ...goodHost, delivery_by: '2026-11-01' }, TODAY).delivery_by, 'delivery in the past')
  assert.deepEqual(validateHostStep(2, { ...goodHost, date_status: 'not_confirmed', event_date: '', delivery_by: '', event_time: '', timezone: '' }, TODAY), {}, 'no dates needed when not confirmed')
})
test('host form: quantity and guest count logic', () => {
  for (const bad of ['0', '-3', '2.5', 'ten', '']) assert.ok(validateHostStep(2, { ...goodHost, guest_count: bad }, TODAY).guest_count, `guest count "${bad}"`)
  assert.deepEqual(validateHostStep(3, { requested_quantity: '', shipping_preference: 'host_covers' }, TODAY), {}, 'quantity is optional')
  assert.ok(validateHostStep(3, { requested_quantity: '' }, TODAY).shipping_preference, 'a shipping preference is required')
  for (const bad of ['0', '-1', 'lots']) assert.ok(validateHostStep(3, { requested_quantity: bad }, TODAY).requested_quantity, `quantity "${bad}"`)
})
test('founder and recap forms', () => {
  assert.equal(Object.keys(validateFounder({})).length, 6)
  assert.deepEqual(validateFounder({ founder_name: 'Bo', email: 'bo@example.test', brand_name: 'Bo Tea', description: 'Tea', explore: 'Dinners', contact_consent: true }), {})
  assert.ok(validateRecap({ actual_attendance: '', served_how: '' }).actual_attendance)
  assert.deepEqual(validateRecap({ actual_attendance: '10', served_how: 'Poured', photo_links: 'https://x.test' }), {}, 'photos may be shared with no permission ticked; that grants nothing')
  assert.match(serverErrors({ delivery_by: 'after_event' }).delivery_by, /before the day/)
  assert.ok(serverErrors({ x: 'something-new' }).x)
})

// ── matching ──
const brand = (o: Partial<Brand> = {}): Brand => ({
  id: 'b1', created_at: '', name: 'Sample Brand', slug: 'sample', state: 'approved', is_public: true, founder_approved_on: '2026-11-01', founder_approval_note: null, category: 'beverages',
  public_description: '', occasions: ['book_club'], geography_served: ['Virginia'], dietary_verified: [], image_url: null, logo_url: null,
  founder_story: null, serving_idea: null, purchase_links: [], founder_name: null, contact_email: null, website: null, internal_notes: null, brief_label: null, brief_url: null,
  audiences: ['reading', 'gardening'], rituals: null, why_belongs: null, priority_markets: ['Richmond'],
  inventory_available: 200, inventory_reserved: 0, sampling_allowance: null, available_from: null, available_to: null, ship_origin: null,
  min_lead_days: 7, min_quantity: null, max_quantity: null, cold_storage: 'not_required', storage_notes: null,
  product_cost: 2, shipping_estimate: 30, host_allowance: 0, campaign_budget: 500, believe_fee: 100,
  required_visibility: [], extras: ['recipe_card', 'founder_story'], restrictions: null, category_conflicts: [], ...o,
})
const product = (o: Partial<Product> = {}): Product => ({
  id: 'p1', brand_id: 'b1', created_at: '', name: 'Can', sku: null, category: null, format: null, serving_size: null, case_pack: 12,
  ingredients: 'Tea', allergens_status: 'none_declared', allergens: null, dietary: [], storage: null, shipping: null, notes: null, ...o,
})
const gathering = (o: Partial<Gathering> = {}): Gathering => ({
  id: 'g1', host_id: 'h1', created_at: '', source: 'application', status: 'reviewing', name: 'Autumn book club', type: 'book_club', description: '',
  date_status: 'confirmed', event_date: '2026-12-18', event_time: '6pm', timezone: 'America/New_York',
  city: 'Richmond', region: 'VA', country: 'United States', postal_code: '23220', venue_type: 'home', guest_count: 12, audience: '',
  repeats: false, frequency: null, delivery_by: '2026-12-14', categories: ['beverages'], preferred_brand_id: null, open_to_suggestions: true,
  roles: [], requested_quantity: 20, dietary: null, dietary_unknown: false, serving_plan: [], capabilities: [], delivery_notes: null, shipping_preference: null, photo_public_offered: false, photo_reuse_offered: false,
  discovery: ['host_introduction'], recap_ack: true, photos_willing: null, extra: null, contact_consent: true,
  audience_interests: ['Reading', 'wine'], tags: [], owner: null, next_action: null, next_action_date: null, internal_notes: null,
  campaign_slug: null, campaign_published: false, ...o,
})
const check = (e: ReturnType<typeof evaluate>, key: string) => e.checks.find((c) => c.key === key)!.result

test('matching: a fully informed, suitable brand is eligible and scored', () => {
  const e = evaluate(gathering(), brand(), [product()], TODAY)
  assert.equal(e.verdict, 'eligible')
  assert.deepEqual(e.score, { audience: 2, occasion: 3, market: 2, extras: 2, total: 9 })
  assert.equal(e.quantity!.units, 24, 'rounded up to whole cases of 12')
  assert.equal(e.investment.knownTotal, 178)
  assert.ok(e.investment.complete)
})
test('matching: missing critical information gives "needs information", never a pass', () => {
  for (const [label, b] of [
    ['geography', brand({ geography_served: [] })], ['lead time', brand({ min_lead_days: null })],
    ['stock', brand({ inventory_available: null })], ['storage', brand({ cold_storage: 'unknown' })], ['budget', brand({ campaign_budget: null })],
    ['cost', brand({ product_cost: null })],
  ] as const) {
    const e = evaluate(gathering(), b, [product()], TODAY)
    assert.equal(e.verdict, 'needs_information', label)
    assert.equal(e.score, null, `${label}: no score without eligibility`)
  }
  assert.equal(evaluate(gathering({ requested_quantity: null }), brand(), [product()], TODAY).verdict, 'needs_information', 'no quantity estimate: guest count is not used')
  assert.equal(evaluate(gathering({ date_status: 'not_confirmed', event_date: null, delivery_by: null }), brand(), [product()], TODAY).verdict, 'needs_information')
  assert.equal(evaluate(gathering({ dietary: 'nut allergy' }), brand(), [product({ allergens_status: 'unknown' })], TODAY).verdict, 'needs_information')
  assert.equal(evaluate(gathering({ dietary: 'nut allergy' }), brand(), [], TODAY).verdict, 'needs_information', 'no products on file')
})
test('matching: a failed requirement cannot be outweighed by fit', () => {
  const g = gathering()
  assert.equal(evaluate(g, brand({ geography_served: ['Oregon'] }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(g, brand({ min_lead_days: 40 }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(g, brand({ inventory_available: 10 }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(g, brand({ cold_storage: 'required' }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(gathering({ capabilities: ['cold_storage'] }), brand({ cold_storage: 'required' }), [product()], TODAY).verdict, 'eligible')
  assert.equal(evaluate(g, brand({ campaign_budget: 100 }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(g, brand({ required_visibility: ['qr_link'] }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(g, brand({ category: 'sweet_snacks' }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(g, brand({ state: 'draft' }), [product()], TODAY).verdict, 'not_eligible')
  assert.equal(evaluate(g, brand({ founder_approved_on: null }), [product()], TODAY).verdict, 'not_eligible', 'no match is suggested before the founder agrees to take part')
  assert.equal(evaluate(g, brand({ available_to: '2026-12-01' }), [product()], TODAY).verdict, 'not_eligible')
})
test('matching: stock and budget already promised elsewhere are counted; conflicts are checked per brand', () => {
  const other: Partnership = { id: 'pt', gathering_id: 'g2', brand_id: 'b1', product_id: null, created_at: '', status: 'approved', approved_quantity: 190,
    fulfilment: 'ship', shipment_info: null, owner: null, next_action: null, next_action_date: null, commitments: null, permissions: null,
    cost_estimate: 400, cost_actual: null, fit_audience: null, fit_occasion: null, fit_market: null, fit_extras: null, internal_notes: null, recap_token: 't', founder_approved_on: '2026-11-01', founder_approval_note: null, host_sharing_permission_on: null, host_sharing_details: null }
  const e = evaluate(gathering(), brand(), [product()], TODAY, [other], [])
  assert.equal(check(e, 'quantity'), 'fail')
  assert.equal(check(e, 'budget'), 'fail')
  const rival = brand({ id: 'b2', name: 'Rival', category: 'beverages', category_conflicts: ['beverages'] })
  const linked: Partnership = { ...other, id: 'pt2', gathering_id: 'g1', brand_id: 'b2', approved_quantity: 0, cost_estimate: 0, status: 'reviewing' }
  assert.equal(check(evaluate(gathering(), brand(), [product()], TODAY, [linked], [rival, brand()]), 'conflict'), 'fail')
  const snack = brand({ id: 'b3', name: 'Snack', category: 'sweet_snacks' })
  assert.equal(check(evaluate(gathering({ categories: [] }), brand(), [product()], TODAY, [{ ...linked, brand_id: 'b3' }], [snack, brand()]), 'conflict'), 'pass', 'complementary brands may share a gathering')
})
test('matching: at most three suggestions, best first; none when nothing qualifies', () => {
  const bs = ['a', 'b', 'c', 'd'].map((id, i) => brand({ id, name: 'Brand ' + id, extras: i === 2 ? ['recipe_card', 'offer'] : [] }))
  const ps = bs.map((b) => product({ id: 'p' + b.id, brand_id: b.id }))
  const s = suggest(gathering(), bs, ps, [], TODAY)
  assert.equal(s.suggestions.length, 3)
  assert.equal(s.suggestions[0].brand.id, 'c')
  const none = suggest(gathering(), [brand({ geography_served: [] }), brand({ id: 'x', geography_served: ['Oregon'] })], [product()], [], TODAY)
  assert.equal(none.suggestions.length, 0)
  assert.equal(none.needsInformation.length, 1)
  assert.equal(none.notEligible.length, 1)
})

// ── search and export ──
const pb = (o: Partial<PublicBrand>): PublicBrand => ({ id: '1', slug: 's', name: 'N', category: 'beverages', description: '', occasions: [], geography: [], dietary_verified: [], image_url: null, ...o })
test('search: case-insensitive, every word must match, across fields and tags', () => {
  assert.ok(matches('RICHMOND book', 'Autumn Book Club', ['Richmond', 'VA']))
  assert.ok(!matches('richmond tea', 'Autumn Book Club', ['Richmond']))
  assert.ok(matches('', 'anything'))
  assert.ok(matches('cafe', 'Café table'))
  assert.ok(!matches('ab', ['a'], ['b']), 'words do not match across separate fields')
})
test('public brand search: filters combine, and can return nothing', () => {
  const brands = [
    pb({ id: '1', name: 'Garden Tonic', category: 'beverages', occasions: ['flower_garden', 'book_club'], geography: ['Virginia'], description: 'Sparkling botanical' }),
    pb({ id: '2', name: 'Hearth Bites', category: 'savory_snacks', occasions: ['supper_club'], geography: ['Virginia', 'Maryland'] }),
    pb({ id: '3', name: 'Night Cap', category: 'beverages', occasions: ['supper_club'], geography: ['Maryland'], dietary_verified: ['vegan'] }),
  ]
  const run = (f: object) => filterPublicBrands(brands, { ...EMPTY_BRAND_FILTERS, ...f }).map((b) => b.id)
  assert.deepEqual(run({}), ['1', '2', '3'])
  assert.deepEqual(run({ q: 'book club' }), ['1'], 'matches occasion labels')
  assert.deepEqual(run({ category: 'beverages', geography: 'Maryland' }), ['3'])
  assert.deepEqual(run({ category: 'beverages', occasion: 'supper_club', geography: 'Virginia' }), [], 'combined filters, no result')
  assert.deepEqual(run({ dietary: 'vegan' }), ['3'])
})
test('workspace filters: attendance bands and date ranges', () => {
  assert.deepEqual([1, 10, 11, 25, 26, 50, 51, 100, 101].map(attendanceBand), ['1-10', '1-10', '11-25', '11-25', '26-50', '26-50', '51-100', '51-100', '100+'])
  assert.ok(inRange('2026-12-18', '2026-12-01', '2026-12-31'))
  assert.ok(!inRange('2027-01-01', '2026-12-01', '2026-12-31'))
  assert.ok(inRange(null, '', ''))
  assert.ok(!inRange(null, '2026-12-01', ''), 'an unconfirmed date is outside any chosen range')
})
test('CSV export: formulas are neutralised and cells are quoted', () => {
  for (const danger of ['=HYPERLINK("http://x")', '+1+1', '-2+3', '@SUM(A1)', '\tx']) assert.ok(csvCell(danger).replace(/^"/, '').startsWith("'"), danger)
  assert.equal(csvCell('plain'), 'plain')
  assert.equal(csvCell('a, "b"'), '"a, ""b"""')
  assert.equal(csvCell(['x', 'y']), 'x; y')
  assert.equal(csvCell(null), '')
  assert.equal(toCsv([{ n: '=1', c: 3 }], [['Name', (r) => r.n], ['Count', (r) => r.c]]), "Name,Count\r\n'=1,3\r\n")
})
