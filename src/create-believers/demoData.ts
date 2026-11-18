/**
 * Illustrative examples for previews only.
 *
 * Nothing here is a real brand, host, gathering, or result. These records are
 * used when the page runs without its live connection (local development, or a
 * preview build), so the search, filters, and workspace can be reviewed. Every
 * place they appear is labelled "Illustrative example". They are never mixed
 * with live records: once the live connection is configured this file is not used.
 */
import type { Brand, Campaign, Data, Gathering, Host, Partnership, Product, PublicBrand, Recap } from './types'

const day = (offset: number) => {
  const d = new Date(); d.setDate(d.getDate() + offset)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const stamp = (offset: number) => day(offset) + 'T15:00:00Z'

const brand = (o: Partial<Brand> & Pick<Brand, 'id' | 'name' | 'slug'>): Brand => ({
  created_at: stamp(-40), state: 'approved', is_public: true, founder_approved_on: day(-35), founder_approval_note: null, category: null, public_description: null,
  occasions: [], geography_served: [], dietary_verified: [], image_url: null, logo_url: null, founder_story: null, serving_idea: null,
  purchase_links: [], founder_name: null, contact_email: null, website: null, internal_notes: null, audiences: [], rituals: null,
  why_belongs: null, priority_markets: [], inventory_available: null, inventory_reserved: null, sampling_allowance: null,
  available_from: null, available_to: null, ship_origin: null, min_lead_days: null, min_quantity: null, max_quantity: null,
  cold_storage: 'unknown', storage_notes: null, product_cost: null, shipping_estimate: null, host_allowance: null,
  campaign_budget: null, believe_fee: null, required_visibility: [], extras: [], restrictions: null, category_conflicts: [], ...o,
})

const BRANDS: Brand[] = [
  brand({
    id: 'demo-brand-1', name: 'Example Sparkling Tea', slug: 'example-sparkling-tea', category: 'beverages',
    public_description: 'A lightly sparkling brewed tea, made to be poured and shared at the start of an evening.',
    occasions: ['book_club', 'creative_workshop', 'flower_garden', 'supper_club'], geography_served: ['Virginia'],
    audiences: ['reading', 'gardening', 'craft'], priority_markets: ['Richmond', 'Charlottesville'],
    founder_story: 'An example founder story would sit here: two or three sentences in the founder’s own voice about why the product exists.',
    serving_idea: 'An example serving idea: pour over ice with a sprig of mint as guests arrive.',
    purchase_links: [{ label: 'Example shop link', url: 'https://example.com/', kind: 'online', verified_on: day(-5) }],
    inventory_available: 480, inventory_reserved: 48, min_lead_days: 10, cold_storage: 'not_required',
    product_cost: 1.5, shipping_estimate: 35, host_allowance: 0, believe_fee: 0, campaign_budget: 1200,
    extras: ['recipe_card', 'founder_story'], rituals: 'A welcome pour', why_belongs: 'Gives the host something to hand a guest at the door.',
    founder_name: 'Example Founder', contact_email: 'founder@example.com',
  }),
  brand({
    id: 'demo-brand-2', name: 'Example Date Bites', slug: 'example-date-bites', category: 'sweet_snacks',
    public_description: 'Small chocolate-covered date bites for a shared table, or tucked into a take-home bag.',
    occasions: ['supper_club', 'book_club', 'retreat', 'wellness_fitness'], geography_served: ['Virginia', 'Maryland'],
    audiences: ['wellness', 'reading'], priority_markets: ['Richmond'],
    founder_story: 'An example founder story would sit here.', serving_idea: 'An example serving idea: set out on a board with coffee after dinner.',
    inventory_available: 300, min_lead_days: 7, cold_storage: 'required', storage_notes: 'Keep cool; melts above room temperature.',
    product_cost: 2.25, shipping_estimate: 28, campaign_budget: 900, extras: ['offer'],
  }),
  brand({
    id: 'demo-brand-3', name: 'Example Garden Crisps', slug: 'example-garden-crisps', category: 'savory_snacks',
    public_description: 'Savory herb crisps that sit well beside a drink while hands are busy.',
    occasions: ['creative_workshop', 'flower_garden', 'community_social', 'hospitality'], geography_served: ['Virginia', 'North Carolina'],
    dietary_verified: ['Vegan (verified with the brand)'],
    audiences: ['gardening', 'craft'], founder_story: 'An example founder story would sit here.',
    serving_idea: 'An example serving idea: small bowls along the work table.',
  }),
  brand({
    id: 'demo-brand-4', name: 'Example Draft Brand', slug: 'example-draft-brand', category: 'beverages', state: 'draft', is_public: false, founder_approved_on: null,
    internal_notes: 'Example of a profile still being set up. It does not appear to visitors and cannot be matched.',
  }),
]
const PRODUCTS: Product[] = [
  { id: 'demo-product-1', brand_id: 'demo-brand-1', created_at: stamp(-40), name: 'Example 12 oz can', sku: 'EX-TEA-12', category: 'beverages', format: 'Can', serving_size: '12 fl oz', case_pack: 12, ingredients: 'Example ingredients', allergens_status: 'none_declared', allergens: null, dietary: [], storage: 'Shelf stable', shipping: 'Ground', notes: null },
  { id: 'demo-product-2', brand_id: 'demo-brand-2', created_at: stamp(-40), name: 'Example 6-piece box', sku: 'EX-DATE-6', category: 'sweet_snacks', format: 'Box', serving_size: '2 pieces', case_pack: 8, ingredients: 'Example ingredients', allergens_status: 'contains', allergens: 'Tree nuts', dietary: [], storage: 'Keep cool', shipping: 'Insulated in warm months', notes: null },
]
const HOSTS: Host[] = [
  { id: 'demo-host-1', created_at: stamp(-12), full_name: 'Example Host One', email: 'host.one@example.com', organization: 'Example Book Circle', host_role: 'host', website: null, marketing_opt_in: false, internal_notes: null },
  { id: 'demo-host-2', created_at: stamp(-6), full_name: 'Example Host Two', email: 'host.two@example.com', organization: 'Example Flower Studio', host_role: 'instructor', website: 'https://example.com', marketing_opt_in: true, internal_notes: 'Example note: teaches a monthly class.' },
  { id: 'demo-host-3', created_at: stamp(-2), full_name: 'Example Host Three', email: 'host.three@example.com', organization: null, host_role: 'community_organizer', website: null, marketing_opt_in: false, internal_notes: null },
]
const gathering = (o: Partial<Gathering> & Pick<Gathering, 'id' | 'host_id' | 'name' | 'type'>): Gathering => ({
  created_at: stamp(-3), source: 'application', status: 'applied', description: 'An example description of the gathering.',
  date_status: 'confirmed', event_date: day(30), event_time: '6:30 pm', timezone: 'America/New_York',
  city: 'Richmond', region: 'Virginia', country: 'United States', postal_code: '00000', venue_type: 'home', guest_count: 12,
  audience: 'An example description of who is coming and why.', repeats: false, frequency: null, delivery_by: day(25),
  categories: ['beverages'], preferred_brand_id: null, open_to_suggestions: true, roles: ['welcome_drink'], requested_quantity: 24,
  dietary: null, dietary_unknown: false, serving_plan: ['poured_servings'], capabilities: ['ice', 'glassware'], delivery_notes: null, shipping_preference: 'needs_quote', photo_public_offered: true, photo_reuse_offered: false,
  discovery: ['host_introduction', 'menu_place_card'], recap_ack: true, photos_willing: 'yes', extra: null,
  contact_consent: true, audience_interests: [], tags: [], owner: null, next_action: null, next_action_date: null, internal_notes: null,
  campaign_slug: null, campaign_published: false, ...o,
})
const GATHERINGS: Gathering[] = [
  gathering({ id: 'demo-gathering-1', host_id: 'demo-host-1', name: 'Example winter book club', type: 'book_club', status: 'approved', created_at: stamp(-12),
    event_date: day(9), delivery_by: day(5), repeats: true, frequency: 'Monthly', audience_interests: ['reading'], tags: ['recurring'],
    owner: 'Beth', next_action: 'Confirm delivery window with host', next_action_date: day(2), campaign_slug: 'illustrative-example', campaign_published: true }),
  gathering({ id: 'demo-gathering-2', host_id: 'demo-host-2', name: 'Example wreath workshop', type: 'flower_garden', status: 'reviewing', created_at: stamp(-6),
    city: 'Charlottesville', venue_type: 'studio', guest_count: 18, event_date: day(21), delivery_by: day(16), requested_quantity: 36,
    categories: ['beverages', 'savory_snacks'], roles: ['activity_pairing'], audience_interests: ['gardening', 'craft'], dietary: 'One guest avoids tree nuts' }),
  gathering({ id: 'demo-gathering-3', host_id: 'demo-host-3', name: 'Example neighborhood supper', type: 'supper_club', status: 'applied', created_at: stamp(-2),
    city: 'Norfolk', venue_type: 'restaurant', guest_count: 40, date_status: 'not_confirmed', event_date: null, event_time: 'Early spring', delivery_by: null,
    requested_quantity: null, categories: [], roles: ['served_with_food', 'take_home'], dietary_unknown: true }),
  gathering({ id: 'demo-gathering-4', host_id: 'demo-host-1', name: 'Example autumn book club', type: 'book_club', status: 'closed', created_at: stamp(-50),
    event_date: day(-20), delivery_by: day(-24), repeats: true, frequency: 'Monthly', audience_interests: ['reading'], tags: ['recurring'] }),
]
const partnership = (o: Partial<Partnership> & Pick<Partnership, 'id' | 'gathering_id' | 'brand_id' | 'status'>): Partnership => ({
  product_id: null, created_at: stamp(-10), approved_quantity: null, fulfilment: 'ship', shipment_info: null, owner: null, next_action: null,
  next_action_date: null, commitments: null, permissions: null, cost_estimate: null, cost_actual: null, fit_audience: null, fit_occasion: null,
  fit_market: null, fit_extras: null, internal_notes: null, founder_approved_on: null, founder_approval_note: null, host_sharing_permission_on: null, host_sharing_details: null, recap_token: 'preview-' + o.id, ...o,
})
const PARTNERSHIPS: Partnership[] = [
  partnership({ id: 'demo-partnership-1', gathering_id: 'demo-gathering-1', brand_id: 'demo-brand-1', product_id: 'demo-product-1', status: 'preparing', founder_approved_on: day(-4), founder_approval_note: 'Example: approved by email.',
    approved_quantity: 24, owner: 'Beth', next_action: 'Send host brief', next_action_date: day(1), commitments: 'Host introduction and a place card.',
    cost_estimate: 71, fit_audience: 2, fit_occasion: 3, fit_market: 2, fit_extras: 2 }),
  partnership({ id: 'demo-partnership-2', gathering_id: 'demo-gathering-4', brand_id: 'demo-brand-1', product_id: 'demo-product-1', status: 'recap_received', founder_approved_on: day(-30),
    approved_quantity: 24, cost_estimate: 71, cost_actual: 68.4, fit_audience: 2, fit_occasion: 3, fit_market: 2, fit_extras: 1 }),
]
const RECAPS: Recap[] = [
  { id: 'demo-recap-1', partnership_id: 'demo-partnership-2', created_at: stamp(-17), actual_attendance: 11, tried_count: 9, units_served: 18, units_taken_home: 4, units_remaining: 2,
    served_how: 'Example: poured over ice as people arrived.', introduced_how: 'Example: the host said a few words and set out a place card.',
    reactions: 'Example reactions would be written here.', worked: 'Example: the welcome pour.', improve: 'Example: more ice.',
    photo_links: null, photo_public_ok: false, photo_reuse_ok: false, photo_permission_notes: null, host_interest: 'yes',
    purchases_self_reported: 'Example: two guests said they would look for it.', internal_notes: null },
]

export function demoData(): Data {
  return JSON.parse(JSON.stringify({
    hosts: HOSTS, gatherings: GATHERINGS, brands: BRANDS, products: PRODUCTS, partnerships: PARTNERSHIPS, recaps: RECAPS,
    inquiries: [{ id: 'demo-inquiry-1', created_at: stamp(-1), status: 'new', founder_name: 'Example Founder Two', email: 'founder.two@example.com',
      brand_name: 'Example Snack Co.', website: 'https://example.com', category: 'savory_snacks', description: 'An example product description.',
      markets: 'Example: online, and a few independent shops.', explore: 'Example: supper clubs and workshops.', timing_budget: null, contact_consent: true, internal_notes: null }],
    campaignCounts: [{ campaign_slug: 'illustrative-example', page_views: 14, purchase_clicks: 3 }],
  }))
}
export const demoPublicBrands = (): PublicBrand[] =>
  BRANDS.filter((b) => b.state === 'approved' && b.is_public && b.founder_approved_on).map((b) => ({
    id: b.id, slug: b.slug, name: b.name, category: b.category, description: b.public_description, occasions: b.occasions,
    geography: b.geography_served, dietary_verified: b.dietary_verified, image_url: b.image_url, illustrative: true,
  }))
export const DEMO_CAMPAIGN_SLUG = 'illustrative-example'
export const demoCampaign = (): Campaign => ({
  slug: DEMO_CAMPAIGN_SLUG, illustrative: true,
  brands: [BRANDS[0]].map((b) => ({ name: b.name, category: b.category, description: b.public_description, founder_story: b.founder_story,
    serving_idea: b.serving_idea, image_url: b.image_url, links: b.purchase_links.map((l) => ({ label: l.label, url: l.url, kind: l.kind })) })),
})

/** What the database fills in for a new record; the preview store has to do the same by hand. */
export const DEMO_DEFAULTS: Record<string, object> = {
  brands: brand({ id: '', name: '', slug: '', state: 'draft', is_public: false, founder_approved_on: null }),
  products: { sku: null, category: null, format: null, serving_size: null, case_pack: null, ingredients: null, allergens_status: 'unknown', allergens: null, dietary: [], storage: null, shipping: null, notes: null },
  partnerships: partnership({ id: '', gathering_id: '', brand_id: '', status: 'reviewing' }),
}
