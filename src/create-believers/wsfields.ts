/** The fields shown in each workspace editor, grouped the way Believe works through a record. */
import { ALLERGEN_STATUS, BRAND_STATES, CATEGORIES, COLD_STORAGE, DISCOVERY, EXTRAS, FULFILMENT, GATHERING_STATUSES, GATHERING_TYPES, HOST_ROLES, INQUIRY_STATUSES, PARTNERSHIP_STATUSES, type Opt } from './options'
import type { FieldDef, Group } from './wsui'

export const BRAND_GROUPS: Group[] = [
  { title: 'Status', fields: [
    { key: 'state', label: 'Profile state', type: 'select', req: true, options: BRAND_STATES },
    { key: 'founder_approved_on', label: 'Founder approved taking part on', type: 'date', help: 'The date the founder agreed to take part and to this public profile. Until this is set, the profile stays private and is never suggested as a match.' },
    { key: 'founder_approval_note', label: 'How the founder approved', type: 'text', help: 'For example: by email, 12 January.' },
    { key: 'is_public', label: 'Show this profile on the public brands page', type: 'bool', help: 'Visitors see it only when the state is Approved, the founder’s approval date is set, and this box is ticked.' },
  ] },
  { title: 'Public profile', note: 'Visitors can see everything in this section once the profile is published. Use only details the founder has confirmed.', fields: [
    { key: 'name', label: 'Brand name', type: 'text' },
    { key: 'slug', label: 'Web address name', type: 'text', help: 'Lowercase letters, numbers, and dashes, e.g. garden-tonic.' },
    { key: 'category', label: 'Product category', type: 'select', options: CATEGORIES },
    { key: 'image_url', label: 'Approved image (link)', type: 'text', help: 'A full https:// address, or a site path such as /photos/name.webp.' },
    { key: 'public_description', label: 'Short public description', type: 'area' },
    { key: 'occasions', label: 'Gatherings where it could belong', type: 'multi', options: GATHERING_TYPES },
    { key: 'geography_served', label: 'Where it is available', type: 'tags', help: 'States or regions in full, separated by commas, e.g. Virginia, Maryland.' },
    { key: 'dietary_verified', label: 'Verified dietary attributes', type: 'tags', help: 'Only what the brand has verified. Leave empty when unknown; an empty box claims nothing.' },
    { key: 'founder_story', label: 'Founder story (shown on guest pages)', type: 'area' },
    { key: 'serving_idea', label: 'Serving idea (shown on guest pages)', type: 'area' },
    { key: 'purchase_links', label: 'Confirmed places to buy', type: 'links', help: 'A link appears on guest pages only once it has a “verified on” date.' },
  ] },
  { title: 'Founder and contact', note: 'Private.', fields: [
    { key: 'founder_name', label: 'Founder or contact', type: 'text' },
    { key: 'contact_email', label: 'Email', type: 'text' },
    { key: 'website', label: 'Website', type: 'text' },
    { key: 'logo_url', label: 'Approved logo (link)', type: 'text' },
  ] },
  { title: 'Where it belongs', note: 'Private. Used for search and for the fit score.', fields: [
    { key: 'audiences', label: 'Best-fit audiences and interests', type: 'tags', help: 'Separated by commas, e.g. reading, gardening.' },
    { key: 'priority_markets', label: 'Priority markets', type: 'tags', help: 'Cities or states the brand most wants to build, separated by commas.' },
    { key: 'rituals', label: 'Occasions and rituals', type: 'text' },
    { key: 'why_belongs', label: 'Why the product belongs there', type: 'area' },
  ] },
  { title: 'Availability and logistics', note: 'Private. Stock is managed by hand: these numbers are only what was last entered. Verify with the founder before approving a partnership. A blank means “not yet known”, which is different from zero.', fields: [
    { key: 'inventory_available', label: 'Units available', type: 'int' },
    { key: 'inventory_reserved', label: 'Units reserved elsewhere', type: 'int' },
    { key: 'sampling_allowance', label: 'Sampling allowance per gathering', type: 'int' },
    { key: 'min_lead_days', label: 'Minimum lead time (days)', type: 'int' },
    { key: 'min_quantity', label: 'Minimum quantity', type: 'int' },
    { key: 'max_quantity', label: 'Maximum quantity', type: 'int' },
    { key: 'available_from', label: 'Available from', type: 'date' },
    { key: 'available_to', label: 'Available until', type: 'date' },
    { key: 'ship_origin', label: 'Ships from', type: 'text' },
    { key: 'cold_storage', label: 'Cold storage', type: 'select', req: true, options: COLD_STORAGE },
    { key: 'storage_notes', label: 'Storage and shipping notes', type: 'area' },
  ] },
  { title: 'Costs', note: 'Private. In US dollars. Leave blank when not yet known.', fields: [
    { key: 'product_cost', label: 'Product cost per unit', type: 'money' },
    { key: 'shipping_estimate', label: 'Shipping estimate per gathering', type: 'money' },
    { key: 'host_allowance', label: 'Host or production allowance', type: 'money' },
    { key: 'believe_fee', label: 'Believe fee per gathering', type: 'money' },
    { key: 'campaign_budget', label: 'Campaign budget (total)', type: 'money' },
  ] },
  { title: 'Requirements', note: 'Private.', fields: [
    { key: 'required_visibility', label: 'Visibility the brand requires', type: 'multi', options: DISCOVERY },
    { key: 'extras', label: 'Extras the brand can offer', type: 'multi', options: EXTRAS },
    { key: 'category_conflicts', label: 'Should not share a gathering with', type: 'multi', options: CATEGORIES },
    { key: 'restrictions', label: 'Restrictions and exclusions', type: 'area' },
  ] },
  { title: 'Internal notes', fields: [{ key: 'internal_notes', label: 'Notes', type: 'area' }] },
]

export const PRODUCT_FIELDS: FieldDef[] = [
  { key: 'name', label: 'Product name', type: 'text' }, { key: 'sku', label: 'SKU', type: 'text' },
  { key: 'category', label: 'Category', type: 'select', options: CATEGORIES }, { key: 'format', label: 'Format', type: 'text' },
  { key: 'serving_size', label: 'Serving size', type: 'text' }, { key: 'case_pack', label: 'Units per case', type: 'int' },
  { key: 'allergens_status', label: 'Allergens', type: 'select', req: true, options: ALLERGEN_STATUS }, { key: 'allergens', label: 'Allergens listed', type: 'text' },
  { key: 'dietary', label: 'Dietary attributes', type: 'tags' }, { key: 'storage', label: 'Storage', type: 'text' },
  { key: 'shipping', label: 'Shipping', type: 'text' }, { key: 'ingredients', label: 'Ingredients', type: 'area' },
  { key: 'notes', label: 'Notes', type: 'area' },
]

export const GATHERING_GROUPS: Group[] = [
  { title: 'Review', fields: [
    { key: 'status', label: 'Application status', type: 'select', req: true, options: GATHERING_STATUSES },
    { key: 'owner', label: 'Owner at Believe', type: 'text' },
    { key: 'next_action', label: 'Next action', type: 'text' },
    { key: 'next_action_date', label: 'Next action date', type: 'date' },
    { key: 'audience_interests', label: 'Audience interests', type: 'tags', help: 'Your own tags, separated by commas. Used in search and for the audience part of the fit score.' },
    { key: 'tags', label: 'Tags', type: 'tags' },
    { key: 'internal_notes', label: 'Internal notes', type: 'area' },
  ] },
  { title: 'Dates and numbers', note: 'Correct these when the host confirms or changes a detail.', fields: [
    { key: 'date_status', label: 'Date', type: 'select', req: true, options: [['confirmed', 'Confirmed'], ['not_confirmed', 'Not confirmed']] },
    { key: 'event_date', label: 'Gathering date', type: 'date' },
    { key: 'event_time', label: 'Time', type: 'text' },
    { key: 'delivery_by', label: 'Product needed by', type: 'date' },
    { key: 'guest_count', label: 'Expected guests', type: 'int' },
    { key: 'requested_quantity', label: 'Requested quantity', type: 'int' },
  ] },
  { title: 'Guest page', note: 'One page per gathering, showing only the approved brands taking part. It never shows the host, the place, or the date, and it is not listed in search engines.', fields: [
    { key: 'campaign_slug', label: 'Web address name', type: 'text', help: 'Lowercase letters, numbers, and dashes. Choose something that does not identify a private home, e.g. winter-book-club.' },
    { key: 'campaign_published', label: 'Guest page is open', type: 'bool' },
  ] },
]

export const partnershipGroups = (products: Opt[]): Group[] => [
  { title: 'Status and next step', note: 'Statuses are changed by hand. Local pickup or delivery can skip “Shipped”.', fields: [
    { key: 'status', label: 'Status', type: 'select', req: true, options: PARTNERSHIP_STATUSES },
    { key: 'owner', label: 'Owner at Believe', type: 'text' },
    { key: 'next_action', label: 'Next action', type: 'text' },
    { key: 'next_action_date', label: 'Next action date', type: 'date' },
  ] },
  { title: 'Founder approval', note: 'Share the host’s offer above with the founder. Record their decision here before setting the status to Approved.', fields: [
    { key: 'founder_approved_on', label: 'Founder approved this gathering on', type: 'date' },
    { key: 'founder_approval_note', label: 'How the founder approved, and any conditions', type: 'area' },
  ] },
  { title: 'Product and delivery', fields: [
    { key: 'product_id', label: 'Product', type: 'select', options: products },
    { key: 'approved_quantity', label: 'Approved quantity (units)', type: 'int' },
    { key: 'fulfilment', label: 'How it gets there', type: 'select', req: true, options: FULFILMENT },
    { key: 'shipment_info', label: 'Shipment or pickup details', type: 'area' },
  ] },
  { title: 'What was agreed', fields: [
    { key: 'commitments', label: 'Visibility and content commitments', type: 'area' },
    { key: 'permissions', label: 'Content permissions', type: 'area' },
  ] },
  { title: 'Costs', note: 'Estimate and actual are kept apart so they can be compared.', fields: [
    { key: 'cost_estimate', label: 'Estimated cost', type: 'money' },
    { key: 'cost_actual', label: 'Actual cost', type: 'money' },
  ] },
  { title: 'Fit score', note: 'Your own judgement, out of 10. These weights are an initial working choice for comparing options; they are not a prediction of sales.', fields: [
    { key: 'fit_audience', label: 'Audience (0 to 3)', type: 'int', max: 3 },
    { key: 'fit_occasion', label: 'Occasion or ritual (0 to 3)', type: 'int', max: 3 },
    { key: 'fit_market', label: 'Priority market (0 to 2)', type: 'int', max: 2 },
    { key: 'fit_extras', label: 'Extras and contribution (0 to 2)', type: 'int', max: 2 },
  ] },
  { title: 'Internal notes', fields: [{ key: 'internal_notes', label: 'Notes', type: 'area' }] },
]

export const HOST_GROUPS: Group[] = [
  { title: 'Host', fields: [
    { key: 'full_name', label: 'Name', type: 'text' }, { key: 'email', label: 'Email', type: 'text' },
    { key: 'organization', label: 'Organization', type: 'text' }, { key: 'host_role', label: 'Role', type: 'select', options: HOST_ROLES },
    { key: 'website', label: 'Website or social profile', type: 'text' },
    { key: 'marketing_opt_in', label: 'Asked to receive news from Believe', type: 'bool', help: 'Only tick this when the host has asked.' },
    { key: 'internal_notes', label: 'Internal notes', type: 'area' },
  ] },
]
export const INQUIRY_GROUPS: Group[] = [
  { title: 'Follow-up', fields: [
    { key: 'status', label: 'Status', type: 'select', req: true, options: INQUIRY_STATUSES },
    { key: 'internal_notes', label: 'Internal notes', type: 'area' },
  ] },
]
export const RECAP_GROUPS: Group[] = [{ title: 'Your notes on this recap', fields: [{ key: 'internal_notes', label: 'Internal notes', type: 'area' }] }]
