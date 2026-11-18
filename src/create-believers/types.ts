/** Record shapes — these mirror the cb_ tables in supabase/migrations. */
export interface Host {
  id: string; created_at: string; updated_at?: string
  full_name: string; email: string; organization: string | null; host_role: string | null
  website: string | null; marketing_opt_in: boolean; internal_notes: string | null
}
export interface PurchaseLink { label: string; url: string; kind?: string; verified_on?: string }
export interface Brand {
  id: string; created_at: string; updated_at?: string
  name: string; slug: string; state: string; is_public: boolean
  founder_approved_on: string | null; founder_approval_note: string | null
  category: string | null; public_description: string | null
  occasions: string[]; geography_served: string[]; dietary_verified: string[]
  image_url: string | null; logo_url: string | null; founder_story: string | null; serving_idea: string | null
  purchase_links: PurchaseLink[]
  founder_name: string | null; contact_email: string | null; website: string | null; internal_notes: string | null
  audiences: string[]; rituals: string | null; why_belongs: string | null; priority_markets: string[]
  inventory_available: number | null; inventory_reserved: number | null; sampling_allowance: number | null
  available_from: string | null; available_to: string | null; ship_origin: string | null
  min_lead_days: number | null; min_quantity: number | null; max_quantity: number | null
  cold_storage: string; storage_notes: string | null
  product_cost: number | null; shipping_estimate: number | null; host_allowance: number | null
  campaign_budget: number | null; believe_fee: number | null
  required_visibility: string[]; extras: string[]; restrictions: string | null; category_conflicts: string[]
}
export interface Product {
  id: string; brand_id: string; created_at: string
  name: string; sku: string | null; category: string | null; format: string | null; serving_size: string | null
  case_pack: number | null; ingredients: string | null; allergens_status: string; allergens: string | null
  dietary: string[]; storage: string | null; shipping: string | null; notes: string | null
}
export interface Gathering {
  id: string; host_id: string; created_at: string; updated_at?: string
  source: string; status: string
  name: string; type: string; description: string
  date_status: string; event_date: string | null; event_time: string | null; timezone: string | null
  city: string; region: string; country: string; postal_code: string; venue_type: string | null
  guest_count: number; audience: string; repeats: boolean; frequency: string | null; delivery_by: string | null
  categories: string[]; preferred_brand_id: string | null; open_to_suggestions: boolean; roles: string[]
  requested_quantity: number | null; dietary: string | null; dietary_unknown: boolean
  serving_plan: string[]; capabilities: string[]; delivery_notes: string | null
  shipping_preference: string | null; photo_use_offered: string | null
  discovery: string[]; recap_ack: boolean; photos_willing: string | null; reuse_permission: boolean
  extra: string | null; contact_consent: boolean
  audience_interests: string[]; tags: string[]; owner: string | null
  next_action: string | null; next_action_date: string | null; internal_notes: string | null
  campaign_slug: string | null; campaign_published: boolean
}
export interface Partnership {
  id: string; gathering_id: string; brand_id: string; product_id: string | null
  created_at: string; updated_at?: string; status: string
  approved_quantity: number | null; fulfilment: string; shipment_info: string | null
  owner: string | null; next_action: string | null; next_action_date: string | null
  commitments: string | null; permissions: string | null
  cost_estimate: number | null; cost_actual: number | null
  fit_audience: number | null; fit_occasion: number | null; fit_market: number | null; fit_extras: number | null
  internal_notes: string | null; recap_token: string
  founder_approved_on: string | null; founder_approval_note: string | null
}
export interface Recap {
  id: string; partnership_id: string; created_at: string
  actual_attendance: number | null; tried_count: number | null
  units_served: number | null; units_taken_home: number | null; units_remaining: number | null
  served_how: string | null; introduced_how: string | null; reactions: string | null
  worked: string | null; improve: string | null; photo_links: string | null
  photo_permission: string; photo_permission_notes: string | null
  host_interest: string | null; purchases_self_reported: string | null; internal_notes: string | null
}
export interface Inquiry {
  id: string; created_at: string; status: string
  founder_name: string; email: string; brand_name: string; website: string | null; category: string | null
  description: string; markets: string | null; explore: string; timing_budget: string | null
  contact_consent: boolean; internal_notes: string | null
}
export interface CampaignCount { campaign_slug: string; page_views: number; purchase_clicks: number }

export interface Data {
  hosts: Host[]; gatherings: Gathering[]; brands: Brand[]; products: Product[]
  partnerships: Partnership[]; recaps: Recap[]; inquiries: Inquiry[]; campaignCounts: CampaignCount[]
}
export type TableName = 'hosts' | 'gatherings' | 'brands' | 'products' | 'partnerships' | 'recaps' | 'inquiries'

/** What a visitor may see of a brand — nothing private is ever in this shape. */
export interface PublicBrand {
  id: string; slug: string; name: string; category: string | null; description: string | null
  occasions: string[]; geography: string[]; dietary_verified: string[]; image_url: string | null
  /** true only for the illustrative examples used in previews */
  illustrative?: boolean
}
export interface CampaignBrand {
  name: string; category: string | null; description: string | null
  founder_story: string | null; serving_idea: string | null; image_url: string | null
  links: { label: string; url: string; kind?: string }[]
}
export interface Campaign { slug: string; brands: CampaignBrand[]; illustrative?: boolean }
export interface RecapContext { gathering_name: string; brand_name: string; event_date: string | null; open: boolean; submitted: boolean }

export type Values = Record<string, string | boolean | string[]>
export type Errors = Record<string, string>
export type SubmitResult = { ok: true; preview?: boolean } | { ok: false; errors: Errors }
