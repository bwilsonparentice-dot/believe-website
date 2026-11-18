import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MODE, currentAccess, getStore, signIn, signOut, type Access, type Store } from './backend'
import { ACTIVE_PARTNERSHIP, GATHERING_STATUSES, PARTNERSHIP_STATUSES, labelOf } from './options'
import type { Data, Gathering, Partnership, TableName } from './types'
import { isoToday } from './validate'
import { Link, useMeta } from './ui'
import { StatusTag, daysUntil, fmtDate } from './wsui'
import { BrandsTab, GatheringsTab, HostsTab, InquiriesTab, PartnershipsTab } from './WorkspaceTabs'

export type Tab = 'overview' | 'gatherings' | 'hosts' | 'brands' | 'partnerships' | 'inquiries'
/** What every tab is given: the records, today's date, and the ways to change or move between them. */
export interface WS {
  data: Data; today: string; preview: boolean
  save: (table: TableName, id: string, patch: Record<string, unknown>) => Promise<void>
  add: <T extends { id: string }>(table: TableName, row: Record<string, unknown>) => Promise<T>
  remove: (table: TableName, id: string) => Promise<void>
  open: (tab: Tab, id?: string) => void
  selected: string | null
  select: (id: string | null) => void
}

/** The private workspace. Access is decided by the database, not by this page. */
export function Workspace() {
  useMeta('Workspace | Create Believers', 'Private workspace.', { noindex: true })
  const [access, setAccess] = useState<'checking' | 'error' | Access>('checking')
  useEffect(() => { currentAccess().then(setAccess).catch(() => setAccess('error')) }, [])

  if (MODE === 'unavailable') {
    return (
      <Shell>
        <h1>The workspace is not connected yet.</h1>
        <p className="ws-lede">It opens once the private tracker has been set up and its two connection settings have been added to the site. The steps are in <code>docs/CREATE_BELIEVERS.md</code>.</p>
      </Shell>
    )
  }
  if (access === 'checking') return <Shell><p role="status">Checking your access…</p></Shell>
  if (access === 'error') return <Shell><h1>We could not reach the workspace.</h1><p className="ws-lede">Please check your connection and refresh the page.</p></Shell>
  if (access === 'signed_out') return <Shell><SignIn onAccess={setAccess} /></Shell>
  if (access === 'not_authorized') {
    return (
      <Shell onSignOut={() => signOut().then(() => setAccess('signed_out'))}>
        <h1>This account does not have access.</h1>
        <p className="ws-lede">You are signed in, but this account is not on the Create Believers team list. Ask the person who manages the workspace to add you.</p>
      </Shell>
    )
  }
  return <App onSignOut={() => signOut().then(() => setAccess('signed_out'))} />
}

function Shell({ children, onSignOut, wide }: { children: React.ReactNode; onSignOut?: () => void; wide?: boolean }) {
  return (
    <div className="ws">
      <header className="ws-top">
        <Link to="" className="ws-brand">Create Believers <span>Workspace</span></Link>
        <div className="ws-top-right">
          {MODE === 'preview' && <StatusTag label="Illustrative examples" />}
          {onSignOut && MODE === 'live' && <button type="button" className="cb-textlink" onClick={onSignOut}>Sign out</button>}
        </div>
      </header>
      <main className={wide ? 'ws-main' : 'ws-main ws-narrow'}>{children}</main>
    </div>
  )
}

function SignIn({ onAccess }: { onAccess: (a: Access) => void }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false); const [error, setError] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    setBusy(true); setError('')
    try { onAccess(await signIn(email.trim(), password)) }
    catch { setError('That email and password were not recognised. Please try again.') }
    finally { setBusy(false) }
  }
  return (
    <form onSubmit={submit} className="ws-signin">
      <h1>Sign in</h1>
      <p className="ws-lede">For the Believe Studio team.</p>
      <div className="cb-field"><label htmlFor="ws-email">Email</label><input id="ws-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div className="cb-field"><label htmlFor="ws-password">Password</label><input id="ws-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      {error && <p className="cb-err" role="alert">{error}</p>}
      <div style={{ marginTop: 24 }}><button className="cb-btn" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></div>
    </form>
  )
}

const TABS: [Tab, string][] = [['overview', 'Overview'], ['gatherings', 'Gatherings'], ['hosts', 'Hosts'], ['brands', 'Brands'], ['partnerships', 'Partnerships'], ['inquiries', 'Founder inquiries']]

function App({ onSignOut }: { onSignOut: () => void }) {
  const [store, setStore] = useState<Store | null>(null)
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('overview')
  const [selected, setSelected] = useState<Partial<Record<Tab, string | null>>>({})
  const today = isoToday()

  const load = useCallback(async (s: Store) => {
    setError('')
    try { setData(await s.load()) } catch { setError('The records could not be loaded. Please refresh the page.') }
  }, [])
  useEffect(() => { getStore().then((s) => { setStore(s); return load(s) }).catch(() => setError('The workspace could not be opened.')) }, [load])

  const patchLocal = (table: TableName, fn: (rows: { id: string }[]) => { id: string }[]) =>
    setData((d) => (d ? { ...d, [table]: fn(d[table] as { id: string }[]) } as Data : d))

  const ws: WS | null = useMemo(() => {
    if (!store || !data) return null
    return {
      data, today, preview: store.preview,
      async save(table, id, patch) {
        const row = await store.update(table, id, patch)
        patchLocal(table, (rows) => rows.map((r) => (r.id === id ? row : r)))
      },
      async add(table, row) {
        const created = await store.insert<{ id: string }>(table, row)
        patchLocal(table, (rows) => [created, ...rows])
        return created as never
      },
      async remove(table, id) {
        await store.remove(table, id)
        patchLocal(table, (rows) => rows.filter((r) => r.id !== id))
      },
      open(next, id) { setTab(next); if (id !== undefined) setSelected((s) => ({ ...s, [next]: id })); window.scrollTo(0, 0) },
      selected: selected[tab] ?? null,
      select(id) { setSelected((s) => ({ ...s, [tab]: id })) },
    }
  }, [store, data, today, tab, selected])

  return (
    <Shell onSignOut={onSignOut} wide>
      {store?.preview && (
        <div className="cb-notice" role="status" style={{ marginTop: 0 }}>
          <strong>Preview with illustrative examples.</strong> None of these hosts, gatherings, brands, or results are real. You can try everything; changes last until the page is reloaded and are not saved anywhere.
        </div>
      )}
      <nav className="ws-tabs" aria-label="Workspace sections">
        {TABS.map(([t, label]) => (
          <button key={t} type="button" aria-current={tab === t ? 'page' : undefined} onClick={() => { setTab(t); window.scrollTo(0, 0) }}>
            {label}{data && t !== 'overview' && <span className="n">{count(data, t)}</span>}
          </button>
        ))}
      </nav>
      {error && <div className="cb-notice error" role="alert"><h2>{error}</h2></div>}
      {!ws && !error && <p role="status" style={{ marginTop: 24 }}>Loading records…</p>}
      {ws && tab === 'overview' && <Overview ws={ws} />}
      {ws && tab === 'gatherings' && <GatheringsTab ws={ws} />}
      {ws && tab === 'hosts' && <HostsTab ws={ws} />}
      {ws && tab === 'brands' && <BrandsTab ws={ws} />}
      {ws && tab === 'partnerships' && <PartnershipsTab ws={ws} />}
      {ws && tab === 'inquiries' && <InquiriesTab ws={ws} />}
    </Shell>
  )
}
const count = (d: Data, t: Tab) => (t === 'overview' ? 0 : d[t].length)

// ── overview ────────────────────────────────────────────────────────────────
function Overview({ ws }: { ws: WS }) {
  const { data, today } = ws
  const gathering = (id: string) => data.gatherings.find((g) => g.id === id)
  const brand = (id: string) => data.brands.find((b) => b.id === id)
  const hasRecap = (p: Partnership) => data.recaps.some((r) => r.partnership_id === p.id)

  const toReview = data.gatherings.filter((g) => g.status === 'applied' || g.status === 'needs_information')
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
  const newInquiries = data.inquiries.filter((i) => i.status === 'new')
  const upcoming = data.gatherings.filter((g) => g.event_date && g.event_date >= today && !['declined', 'cancelled', 'closed'].includes(g.status))
    .sort((a, b) => a.event_date!.localeCompare(b.event_date!)).slice(0, 8)
  const deliveries = data.partnerships
    .filter((p) => ['approved', 'preparing', 'shipped'].includes(p.status))
    .map((p) => ({ p, g: gathering(p.gathering_id) }))
    .filter((x): x is { p: Partnership; g: Gathering } => !!x.g?.delivery_by && daysUntil(x.g.delivery_by, today) <= 21)
    .sort((a, b) => a.g.delivery_by!.localeCompare(b.g.delivery_by!))
  const recapsDue = data.partnerships
    .filter((p) => ['approved', 'preparing', 'shipped', 'delivered', 'gathered'].includes(p.status) && !hasRecap(p))
    .map((p) => ({ p, g: gathering(p.gathering_id) }))
    .filter((x): x is { p: Partnership; g: Gathering } => !!x.g && (x.p.status === 'gathered' || (!!x.g.event_date && x.g.event_date < today)))
  const recapsToRead = data.partnerships.filter((p) => hasRecap(p) && !['recap_received', 'closed'].includes(p.status))

  const sum = (pick: (r: Data['recaps'][number]) => number | null) => data.recaps.reduce((n, r) => n + (pick(r) ?? 0), 0)
  const views = data.campaignCounts.reduce((n, c) => n + Number(c.page_views), 0)
  const clicks = data.campaignCounts.reduce((n, c) => n + Number(c.purchase_clicks), 0)
  const active = data.partnerships.filter((p) => ACTIVE_PARTNERSHIP.includes(p.status)).length

  const pLine = (p: Partnership, g: Gathering, right: React.ReactNode) => (
    <li key={p.id}><button type="button" onClick={() => ws.open('partnerships', p.id)}><span><b>{g.name}</b> · {brand(p.brand_id)?.name}</span><span>{right}</span></button></li>
  )
  return (
    <div className="ws-overview">
      <section aria-labelledby="ov-review">
        <h2 id="ov-review">Needs review <span className="n">{toReview.length + newInquiries.length}</span></h2>
        {toReview.length + newInquiries.length === 0 ? <p className="ws-none">Nothing is waiting for review.</p> : (
          <ul className="ws-lines">
            {toReview.map((g) => (
              <li key={g.id}><button type="button" onClick={() => ws.open('gatherings', g.id)}>
                <span><b>{g.name}</b> · {g.city}, {g.region}</span><span><StatusTag label={labelOf(GATHERING_STATUSES, g.status)} tone={g.status === 'applied' ? 'teal' : undefined} /> received {fmtDate(g.created_at)}</span>
              </button></li>
            ))}
            {newInquiries.map((i) => (
              <li key={i.id}><button type="button" onClick={() => ws.open('inquiries', i.id)}><span><b>{i.brand_name}</b> · founder inquiry</span><span>received {fmtDate(i.created_at)}</span></button></li>
            ))}
          </ul>
        )}
      </section>
      <section aria-labelledby="ov-upcoming">
        <h2 id="ov-upcoming">Upcoming gatherings</h2>
        {upcoming.length === 0 ? <p className="ws-none">No gatherings with a confirmed date ahead.</p> : (
          <ul className="ws-lines">{upcoming.map((g) => (
            <li key={g.id}><button type="button" onClick={() => ws.open('gatherings', g.id)}>
              <span><b>{g.name}</b> · {g.city}, {g.region}</span><span>{fmtDate(g.event_date)} · <StatusTag label={labelOf(GATHERING_STATUSES, g.status)} tone="quiet" /></span>
            </button></li>
          ))}</ul>
        )}
      </section>
      <section aria-labelledby="ov-delivery">
        <h2 id="ov-delivery">Delivery deadlines <span className="n">{deliveries.length}</span></h2>
        {deliveries.length === 0 ? <p className="ws-none">No approved product is due in the next three weeks.</p> : (
          <ul className="ws-lines">{deliveries.map(({ p, g }) => {
            const d = daysUntil(g.delivery_by!, today)
            return pLine(p, g, <>{d < 0 ? <StatusTag label={`${-d} days overdue`} tone="alert" /> : d === 0 ? <StatusTag label="Due today" tone="alert" /> : `due ${fmtDate(g.delivery_by)} (${d} days)`} · {labelOf(PARTNERSHIP_STATUSES, p.status)}</>)
          })}</ul>
        )}
      </section>
      <section aria-labelledby="ov-recaps">
        <h2 id="ov-recaps">Recaps <span className="n">{recapsDue.length + recapsToRead.length}</span></h2>
        {recapsDue.length + recapsToRead.length === 0 ? <p className="ws-none">No recaps are due or waiting to be read.</p> : (
          <ul className="ws-lines">
            {recapsToRead.map((p) => { const g = gathering(p.gathering_id); return g ? pLine(p, g, <StatusTag label="Recap received, to read" tone="teal" />) : null })}
            {recapsDue.map(({ p, g }) => pLine(p, g, <>recap due · gathered {fmtDate(g.event_date) || 'date not set'}</>))}
          </ul>
        )}
      </section>
      <section aria-labelledby="ov-results" className="ws-results">
        <h2 id="ov-results">What has actually happened</h2>
        <p className="ws-note">Only what has been recorded. Attendance, tastings, and units come from hosts’ recaps and are their own accounts. Page views and link clicks are counts of activity on guest pages; a click is not a purchase, and no sales figures are inferred.</p>
        <dl>
          <div><dt>Partnerships approved or further</dt><dd>{active}</dd></div>
          <div><dt>Recaps received</dt><dd>{data.recaps.length}</dd></div>
          <div><dt>Guests attended (host-reported)</dt><dd>{data.recaps.length ? sum((r) => r.actual_attendance) : '—'}</dd></div>
          <div><dt>People who tried a product (host estimate)</dt><dd>{data.recaps.length ? sum((r) => r.tried_count) : '—'}</dd></div>
          <div><dt>Units served (host-reported)</dt><dd>{data.recaps.length ? sum((r) => r.units_served) : '—'}</dd></div>
          <div><dt>Guest page views</dt><dd>{views}</dd></div>
          <div><dt>Clicks on purchase links</dt><dd>{clicks}</dd></div>
        </dl>
      </section>
    </div>
  )
}
