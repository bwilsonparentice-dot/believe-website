/**
 * Create Believers — the fixed choices used by the forms, the search filters,
 * and the private workspace. The values (left) are what is stored; the labels
 * (right) are what people read. The server accepts exactly these values, so a
 * new choice must be added here AND in supabase/migrations.
 */
export type Opt = readonly [value: string, label: string]

export const HOST_ROLES: Opt[] = [
  ['host', 'Host'], ['event_planner', 'Event planner'], ['instructor', 'Instructor'], ['venue', 'Venue'],
  ['community_organizer', 'Community organizer'], ['other', 'Other'],
]
export const GATHERING_TYPES: Opt[] = [
  ['creative_workshop', 'Creative or craft workshop'], ['supper_club', 'Supper club or dinner'],
  ['flower_garden', 'Flower or garden gathering'], ['book_club', 'Book club'],
  ['wellness_fitness', 'Wellness or fitness'], ['community_social', 'Community or social gathering'],
  ['corporate_team', 'Corporate or team gathering'], ['hospitality', 'Hospitality experience'],
  ['retreat', 'Retreat'], ['other', 'Other'],
]
export const VENUE_TYPES: Opt[] = [
  ['home', 'Home'], ['studio', 'Studio'], ['shop', 'Shop'], ['restaurant', 'Restaurant'],
  ['workplace', 'Workplace'], ['outdoor', 'Outdoor'], ['other', 'Other'],
]
export const CATEGORIES: Opt[] = [
  ['beverages', 'Beverages'], ['sweet_snacks', 'Sweet snacks and treats'], ['savory_snacks', 'Savory snacks'], ['other', 'Other'],
]
export const ROLES: Opt[] = [
  ['welcome_drink', 'Welcome drink'], ['served_with_food', 'Served with food'], ['shared_table', 'Shared table'],
  ['tasting', 'Tasting'], ['activity_pairing', 'Paired with the activity'], ['take_home', 'Take-home'], ['other', 'Other'],
]
export const SERVING_PLANS: Opt[] = [
  ['original_packaging', 'In its original packaging'], ['poured_servings', 'Poured servings'],
  ['recipe_mocktail', 'In a recipe or mocktail'], ['sampling', 'Small samples'], ['other', 'Other'],
]
export const CAPABILITIES: Opt[] = [
  ['cold_storage', 'Refrigeration or cold storage'], ['ice', 'Ice'], ['glassware', 'Glassware or cups'],
  ['serving_help', 'Someone to pour or serve'],
]
export const DISCOVERY: Opt[] = [
  ['host_introduction', 'A few words from the host'], ['menu_place_card', 'A menu or place card'],
  ['story_display', 'A small product and story display'], ['qr_link', 'A QR link'], ['welcome_bag', 'A welcome bag'],
  ['follow_up_email', 'A follow-up email or link from the host'], ['social_content', 'Social content'],
  ['sampling_only', 'Sampling only'], ['other', 'Other'],
]
export const SHIPPING_PREFS: Opt[] = [
  ['host_covers', 'I can cover shipping'], ['needs_quote', 'I need a shipping quote before deciding'], ['needs_sponsored', 'I need sponsored shipping'],
]
export const PHOTOS_WILLING: Opt[] = [['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure yet']]

export const GATHERING_STATUSES: Opt[] = [
  ['applied', 'Applied'], ['reviewing', 'Reviewing'], ['needs_information', 'Needs information'], ['approved', 'Approved'],
  ['declined', 'Declined'], ['cancelled', 'Cancelled'], ['paused', 'Paused'], ['closed', 'Closed'],
]
export const PARTNERSHIP_STATUSES: Opt[] = [
  ['applied', 'Applied'], ['reviewing', 'Reviewing'], ['needs_information', 'Needs information'], ['approved', 'Approved'],
  ['preparing', 'Preparing'], ['shipped', 'Shipped'], ['delivered', 'Delivered'], ['gathered', 'Gathered'],
  ['recap_received', 'Recap received'], ['closed', 'Closed'], ['declined', 'Declined'], ['cancelled', 'Cancelled'], ['paused', 'Paused'],
]
/** partnerships that hold product: approved through to closed */
export const ACTIVE_PARTNERSHIP = ['approved', 'preparing', 'shipped', 'delivered', 'gathered', 'recap_received', 'closed']
/** partnerships still in motion (not finished, declined, or cancelled) */
export const OPEN_PARTNERSHIP = ['applied', 'reviewing', 'needs_information', 'approved', 'preparing', 'shipped', 'delivered', 'gathered', 'paused']

export const BRAND_STATES: Opt[] = [
  ['draft', 'Draft'], ['needs_information', 'Needs information'], ['approved', 'Approved'], ['paused', 'Paused'], ['archived', 'Archived'],
]
export const COLD_STORAGE: Opt[] = [['unknown', 'Not yet known'], ['required', 'Needs to be kept cold'], ['not_required', 'No cold storage needed']]
export const ALLERGEN_STATUS: Opt[] = [['unknown', 'Not yet known'], ['none_declared', 'None declared by the brand'], ['contains', 'Contains allergens (list them)']]
export const FULFILMENT: Opt[] = [['ship', 'Shipped'], ['pickup', 'Host pickup'], ['local_delivery', 'Local delivery']]
export const EXTRAS: Opt[] = [
  ['recipe_card', 'Recipe card'], ['founder_story', 'Founder story'], ['mocktail_recipe', 'Mocktail recipe'],
  ['instructor_contribution', 'Instructor contribution'], ['offer', 'An offer for guests'], ['branded_material', 'Branded material'],
]
export const INQUIRY_STATUSES: Opt[] = [
  ['new', 'New'], ['in_conversation', 'In conversation'], ['became_brand', 'Became a brand profile'], ['not_now', 'Not now'], ['closed', 'Closed'],
]
export const HOST_INTEREST: Opt[] = [['yes', 'Yes'], ['maybe', 'Maybe'], ['no', 'Not right now']]

export const TIMEZONES: Opt[] = [
  ['America/New_York', 'Eastern Time'], ['America/Chicago', 'Central Time'], ['America/Denver', 'Mountain Time'],
  ['America/Phoenix', 'Arizona'], ['America/Los_Angeles', 'Pacific Time'], ['America/Anchorage', 'Alaska'],
  ['Pacific/Honolulu', 'Hawaii'], ['Europe/London', 'London'],
]

export const labelOf = (opts: Opt[], value: string | null | undefined): string =>
  value ? (opts.find((o) => o[0] === value)?.[1] ?? value) : ''
export const labelsOf = (opts: Opt[], values: string[] | null | undefined): string =>
  (values ?? []).map((v) => labelOf(opts, v)).join(', ')
