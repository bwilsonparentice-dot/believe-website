/**
 * Create Believers — where the page talks to its private database.
 *
 * Three states, decided when the site is built:
 *   live         the connection is configured; forms save, the workspace works.
 *   preview      no connection, and this is local development or a preview
 *                build: illustrative examples are shown and nothing is saved.
 *   unavailable  no connection on a normal build: forms explain that they are
 *                not open yet. Nothing pretends to save.
 *
 * The two values below are safe to publish: the project address and its
 * publishable key. All protection is enforced in the database itself (see
 * supabase/migrations). No secret ever belongs in this file or in the site.
 */
import type { Campaign, Data, PublicBrand, RecapContext, SubmitResult, TableName, Values } from './types'
import { serverErrors } from './validate'

const env = import.meta.env as Record<string, string | boolean | undefined>
const URL_ = String(env.VITE_CB_SUPABASE_URL ?? '').replace(/\/+$/, '')
const KEY = String(env.VITE_CB_SUPABASE_KEY ?? '')
const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(URL_) && KEY.length > 20

export type Mode = 'live' | 'preview' | 'unavailable'
export const MODE: Mode = configured ? 'live' : (env.DEV || env.VITE_CB_PREVIEW === '1') ? 'preview' : 'unavailable'
export const CONTACT_EMAIL = 'hello@believestudio.co'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function rpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), 20000)
  try {
    const res = await fetch(`${URL_}/rest/v1/rpc/${name}`, {
      method: 'POST', signal: ctl.signal,
      headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: `Bearer ${KEY}` },
      body: JSON.stringify(args),
    })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    const text = await res.text()
    return (text ? JSON.parse(text) : null) as T
  } finally { clearTimeout(timer) }
}

type ServerReply = { ok: boolean; errors?: Record<string, string> } | null
const toResult = (r: ServerReply): SubmitResult => {
  if (r && r.ok === true) return { ok: true }
  if (r && r.errors) return { ok: false, errors: serverErrors(r.errors) }
  throw new Error('Unexpected reply')
}

/** Sends a form. Resolves with the outcome; rejects if it could not be delivered. */
async function submit(fn: string, args: Record<string, unknown>): Promise<SubmitResult> {
  if (MODE === 'live') return toResult(await rpc<ServerReply>(fn, args))
  if (MODE === 'preview') { await wait(500); return { ok: true, preview: true } }
  throw new Error('Not connected')
}
export const submitHostApplication = (v: Values) => submit('cb_submit_host_application', { p: v })
export const submitFounderInquiry = (v: Values) => submit('cb_submit_founder_inquiry', { p: v })
export const submitRecap = (token: string, v: Values) => submit('cb_submit_recap', { p_token: token, p: v })

export async function listPublicBrands(): Promise<PublicBrand[]> {
  if (MODE === 'live') return (await rpc<PublicBrand[]>('cb_public_brands', {})) ?? []
  if (MODE === 'preview') return (await import('./demoData')).demoPublicBrands()
  return []
}
export async function getCampaign(slug: string): Promise<Campaign | null> {
  if (MODE === 'live') return rpc<Campaign | null>('cb_get_campaign', { p_slug: slug })
  if (MODE === 'preview') { const d = await import('./demoData'); return slug === d.DEMO_CAMPAIGN_SLUG ? d.demoCampaign() : null }
  return null
}
/** Counts a page view or a click on a purchase link. Never blocks the page and never identifies a person. */
export function track(slug: string, kind: 'page_view' | 'purchase_click', target?: string): void {
  if (MODE !== 'live') return
  rpc('cb_track', { p_slug: slug, p_kind: kind, p_target: target ?? null }).catch(() => { /* measurement is best-effort */ })
}
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export async function getRecapContext(token: string): Promise<RecapContext | null> {
  if (MODE === 'live') return UUID.test(token) ? rpc<RecapContext | null>('cb_get_recap_context', { p_token: token }) : null
  if (MODE === 'preview') return { gathering_name: 'Example winter book club', brand_name: 'Example Sparkling Tea', event_date: null, open: true, submitted: false }
  return null
}

// ── the private workspace ───────────────────────────────────────────────────
export interface Store {
  preview: boolean
  load(): Promise<Data>
  insert<T extends { id: string }>(table: TableName, row: Partial<T>): Promise<T>
  update<T extends { id: string }>(table: TableName, id: string, patch: Partial<T>): Promise<T>
  remove(table: TableName, id: string): Promise<void>
}
export type Access = 'signed_out' | 'not_authorized' | 'ok'

const TABLE: Record<TableName, string> = {
  hosts: 'cb_hosts', gatherings: 'cb_gatherings', brands: 'cb_brands', products: 'cb_products',
  partnerships: 'cb_partnerships', recaps: 'cb_recaps', inquiries: 'cb_founder_inquiries',
}

type Client = import('@supabase/supabase-js').SupabaseClient
let clientPromise: Promise<Client> | null = null
function client(): Promise<Client> {
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) => createClient(URL_, KEY, {
      // the sign-in lasts for this browser tab only; closing the tab signs out
      auth: { persistSession: true, autoRefreshToken: true, storage: window.sessionStorage, storageKey: 'cb-workspace' },
    }))
  }
  return clientPromise
}

export async function currentAccess(): Promise<Access> {
  if (MODE !== 'live') return MODE === 'preview' ? 'ok' : 'signed_out'
  const c = await client()
  const { data } = await c.auth.getSession()
  if (!data.session) return 'signed_out'
  const { data: isAdmin, error } = await c.rpc('cb_is_admin')
  if (error) throw new Error(error.message)
  return isAdmin === true ? 'ok' : 'not_authorized'
}
export async function signIn(email: string, password: string): Promise<Access> {
  const c = await client()
  const { error } = await c.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return currentAccess()
}
export async function signOut(): Promise<void> {
  if (MODE !== 'live') return
  await (await client()).auth.signOut()
}

function liveStore(): Store {
  const all = async <T,>(table: TableName, order = 'created_at'): Promise<T[]> => {
    const { data, error } = await (await client()).from(TABLE[table]).select('*').order(order, { ascending: false }).limit(2000)
    if (error) throw new Error(error.message)
    return (data ?? []) as T[]
  }
  return {
    preview: false,
    async load() {
      const c = await client()
      const [hosts, gatherings, brands, products, partnerships, recaps, inquiries, counts] = await Promise.all([
        all('hosts'), all('gatherings'), all('brands'), all('products'), all('partnerships'), all('recaps'), all('inquiries'),
        c.rpc('cb_campaign_counts'),
      ])
      if (counts.error) throw new Error(counts.error.message)
      return { hosts, gatherings, brands, products, partnerships, recaps, inquiries, campaignCounts: counts.data ?? [] } as Data
    },
    async insert(table, row) {
      const { data, error } = await (await client()).from(TABLE[table]).insert(row as never).select().single()
      if (error) throw new Error(friendly(error.message))
      return data
    },
    async update(table, id, patch) {
      const { data, error } = await (await client()).from(TABLE[table]).update(patch as never).eq('id', id).select().single()
      if (error) throw new Error(friendly(error.message))
      return data
    },
    async remove(table, id) {
      const { error } = await (await client()).from(TABLE[table]).delete().eq('id', id)
      if (error) throw new Error(friendly(error.message))
    },
  }
}
function friendly(message: string): string {
  if (/cb_brands_slug_key|campaign_slug_key/.test(message)) return 'That web address name is already in use. Please choose another.'
  if (/slug.*check|campaign_slug_check/.test(message)) return 'Web address names use lowercase letters, numbers, and dashes only.'
  if (/gathering_id_brand_id_key/.test(message)) return 'That brand is already linked to this gathering.'
  if (/delivery_before_event/.test(message)) return 'The delivery date needs to be before the day of the gathering.'
  if (/foreign key|violates/.test(message) && /restrict|still referenced/.test(message)) return 'This record is linked to others and cannot be removed. Archive or close it instead.'
  return message
}

async function previewStore(): Promise<Store> {
  const demo = await import('./demoData')
  const data = demo.demoData()
  let n = 0
  return {
    preview: true,
    // hand back copies, so the workspace's own list and this stand-in store never share an array
    async load() { return Object.fromEntries(Object.entries(data).map(([k, rows]) => [k, [...rows]])) as unknown as Data },
    async insert(table, row) {
      const created = { ...demo.DEMO_DEFAULTS[table], ...row, id: `demo-new-${++n}`, created_at: new Date().toISOString(), ...(table === 'partnerships' ? { recap_token: `preview-new-${n}` } : {}) } as never
      ;(data[table] as unknown[]).unshift(created)
      return created
    },
    async update(table, id, patch) {
      const list = data[table] as unknown as { id: string }[]
      const i = list.findIndex((r) => r.id === id)
      list[i] = { ...list[i], ...patch }
      return list[i] as never
    },
    async remove(table, id) {
      const list = data[table] as unknown as { id: string }[]
      list.splice(list.findIndex((r) => r.id === id), 1)
    },
  }
}
export async function getStore(): Promise<Store> {
  return MODE === 'live' ? liveStore() : previewStore()
}
