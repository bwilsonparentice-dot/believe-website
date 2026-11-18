import React, { useEffect, useMemo, useState } from 'react'
import { BRAND_STATES, CAPABILITIES, CATEGORIES, DISCOVERY, EXTRAS, GATHERING_STATUSES, GATHERING_TYPES, HOST_INTEREST, HOST_ROLES, INQUIRY_STATUSES, OPEN_PARTNERSHIP, ACTIVE_PARTNERSHIP, PARTNERSHIP_STATUSES, PHOTOS_WILLING, ROLES, SERVING_PLANS, SHIPPING_PREFS, TIMEZONES, VENUE_TYPES, labelOf, labelsOf, type Opt } from './options'
import { evaluate, fitTotal, money, suggest, type Evaluation } from './matching'
import { ATTENDANCE_BANDS, attendanceBand, distinct, inRange, matches, toCsv } from './search'
import type { Brand, Gathering, Host, Inquiry, Partnership, Product, Recap } from './types'
import { href } from './ui'
import { Editor, Facts, StatusTag, download, fmtDate } from './wsui'
import { BRAND_GROUPS, GATHERING_GROUPS, HOST_GROUPS, INQUIRY_GROUPS, PRODUCT_FIELDS, RECAP_GROUPS, partnershipGroups } from './wsfields'
import type { WS } from './Workspace'

// ── shared layout ───────────────────────────────────────────────────────────
type FilterDef = { key: string; label: string; type: 'search' | 'select' | 'date'; options?: Opt[]; placeholder?: string }
function useFilters(initial: Record<string, string>) {
  const [f, setF] = useState(initial)
  const active = Object.keys(initial).some((k) => k !== 'sort' && f[k] !== initial[k])
  return { f, set: (k: string, v: string) => setF((old) => ({ ...old, [k]: v })), clear: () => setF((old) => ({ ...initial, sort: old.sort })), active }
}
function FilterBar({ name, defs, filters, sorts }: { name: string; defs: FilterDef[]; filters: ReturnType<typeof useFilters>; sorts?: Opt[] }) {
  const [open, setOpen] = useState(false)
  const field = (d: FilterDef) => (
    <label key={d.key} className={d.type === 'search' ? 'q' : ''}>
      <span>{d.label}</span>
      {d.type === 'select'
        ? <select value={filters.f[d.key]} onChange={(e) => filters.set(d.key, e.target.value)}><option value="">All</option>{d.options!.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        : <input type={d.type} value={filters.f[d.key]} placeholder={d.placeholder} onChange={(e) => filters.set(d.key, e.target.value)} />}
    </label>
  )
  return (
    <form className={'ws-filterbar' + (open ? ' open' : '')} role="search" aria-label={`Search and filter ${name}`} onSubmit={(e) => e.preventDefault()}>
      {defs.filter((d) => d.type === 'search').map(field)}
      <button type="button" className="ws-more" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Hide filters' : 'Filters'}{filters.active && !open ? ' (on)' : ''}</button>
      <div className="ws-filters">
        {defs.filter((d) => d.type !== 'search').map(field)}
        {sorts && <label><span>Sort by</span><select value={filters.f.sort} onChange={(e) => filters.set('sort', e.target.value)}>{sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>}
      </div>
    </form>
  )
}
function Split({ ws, name, total, shown, filters, onExport, toolbar, list, detail, emptyAll }: {
  ws: WS; name: string; total: number; shown: number; filters: ReturnType<typeof useFilters>; onExport?: () => void
  toolbar?: React.ReactNode; list: React.ReactNode; detail: React.ReactNode | null; emptyAll: string
}) {
  return (
    <div className={'ws-split' + (detail ? ' has-detail' : '')}>
      <div className="ws-list">
        <div className="ws-listhead">
          <p role="status" aria-live="polite">{shown === total ? `${total} ${name}` : `${shown} of ${total} ${name}`}</p>
          <div>
            {filters.active && <button type="button" className="cb-textlink" onClick={filters.clear}>Clear filters</button>}
            {onExport && shown > 0 && <button type="button" className="cb-textlink" onClick={onExport}>Export this view (CSV)</button>}
            {toolbar}
          </div>
        </div>
        {total === 0 ? <p className="ws-none">{emptyAll}</p>
          : shown === 0 ? <p className="ws-none">Nothing matches these filters. <button type="button" className="cb-textlink" onClick={filters.clear}>Clear filters</button></p>
          : <ul className="ws-rows">{list}</ul>}
      </div>
      <div className="ws-detail" aria-live="polite">
        {detail ? (<><button type="button" className="cb-textlink ws-backlist" onClick={() => ws.select(null)}>← Back to the list</button>{detail}</>)
          : <p className="ws-none ws-pick">Choose a record from the list to see it here.</p>}
      </div>
    </div>
  )
}
function Row({ ws, id, title, sub, right }: { ws: WS; id: string; title: string; sub: React.ReactNode; right?: React.ReactNode }) {
  return (
    <li><button type="button" aria-current={ws.selected === id ? 'true' : undefined} onClick={() => ws.select(id)}>
      <span className="t">{title}</span><span className="r">{right}</span><span className="s">{sub}</span>
    </button></li>
  )
}
const stamp = () => new Date().toISOString().slice(0, 10)
const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'brand'
const statusRank = (opts: Opt[], v: string) => opts.findIndex((o) => o[0] === v)
const tone = (status: string): 'teal' | 'quiet' | 'alert' | undefined =>
  status === 'applied' || status === 'new' ? 'teal' : ['declined', 'cancelled', 'closed', 'archived', 'paused', 'not_now'].includes(status) ? 'quiet' : status === 'needs_information' ? 'alert' : undefined
async function confirmThen(message: string, fn: () => Promise<void>) {
  if (!window.confirm(message)) return
  try { await fn() } catch (e) { window.alert(e instanceof Error ? e.message : 'That could not be done.') }
}

// ── gatherings ──────────────────────────────────────────────────────────────
export function GatheringsTab({ ws }: { ws: WS }) {
  const { data } = ws
  const host = (g: Gathering) => data.hosts.find((h) => h.id === g.host_id)
  const filters = useFilters({ q: '', status: '', type: '', region: '', band: '', interest: '', category: '', from: '', to: '', deliveryBy: '', sort: 'upcoming' })
  const { f } = filters
  const rows = useMemo(() => {
    const out = data.gatherings.filter((g) => {
      const h = host(g)
      return matches(f.q, g.name, h?.full_name, h?.organization, g.city, g.region, labelOf(GATHERING_TYPES, g.type), g.categories.map((c) => labelOf(CATEGORIES, c)), g.tags, g.audience_interests, g.internal_notes, g.description)
        && (!f.status || g.status === f.status) && (!f.type || g.type === f.type) && (!f.region || g.region === f.region)
        && (!f.band || attendanceBand(g.guest_count) === f.band) && (!f.interest || g.audience_interests.includes(f.interest))
        && (!f.category || g.categories.includes(f.category)) && inRange(g.event_date, f.from, f.to) && inRange(g.delivery_by, '', f.deliveryBy)
    })
    const upcoming = (g: Gathering) => (g.event_date && g.event_date >= ws.today ? '0' + g.event_date : g.event_date ? '2' + (99999999 - Number(g.event_date.replace(/-/g, ''))) : '1')
    if (f.sort === 'newest') out.sort((a, b) => b.created_at.localeCompare(a.created_at))
    else if (f.sort === 'status') out.sort((a, b) => statusRank(GATHERING_STATUSES, a.status) - statusRank(GATHERING_STATUSES, b.status) || b.created_at.localeCompare(a.created_at))
    else out.sort((a, b) => upcoming(a).localeCompare(upcoming(b)))
    return out
  }, [data.gatherings, data.hosts, f, ws.today])   // eslint-disable-line react-hooks/exhaustive-deps
  const selected = data.gatherings.find((g) => g.id === ws.selected) ?? null

  const exportCsv = () => download(`create-believers-gatherings-${stamp()}.csv`, toCsv(rows, [
    ['Gathering', (g) => g.name], ['Status', (g) => labelOf(GATHERING_STATUSES, g.status)], ['Type', (g) => labelOf(GATHERING_TYPES, g.type)],
    ['Host', (g) => host(g)?.full_name], ['Organization', (g) => host(g)?.organization], ['Host email', (g) => host(g)?.email],
    ['City', (g) => g.city], ['State or region', (g) => g.region], ['Country', (g) => g.country], ['Postal code', (g) => g.postal_code],
    ['Date', (g) => g.event_date ?? 'Not confirmed'], ['Product needed by', (g) => g.delivery_by], ['Expected guests', (g) => g.guest_count],
    ['Requested quantity', (g) => g.requested_quantity], ['Categories', (g) => g.categories.map((c) => labelOf(CATEGORIES, c))],
    ['Audience interests', (g) => g.audience_interests], ['Tags', (g) => g.tags], ['Owner', (g) => g.owner], ['Next action', (g) => g.next_action],
    ['Next action date', (g) => g.next_action_date], ['Received', (g) => g.created_at.slice(0, 10)], ['Internal notes', (g) => g.internal_notes],
  ]))

  return (
    <>
      <FilterBar name="gatherings" filters={filters} defs={[
        { key: 'q', label: 'Search gatherings', type: 'search', placeholder: 'Name, host, city, tag, note' },
        { key: 'status', label: 'Status', type: 'select', options: GATHERING_STATUSES },
        { key: 'type', label: 'Type', type: 'select', options: GATHERING_TYPES },
        { key: 'region', label: 'State or region', type: 'select', options: distinct([data.gatherings.map((g) => g.region)]).map((r) => [r, r]) },
        { key: 'band', label: 'Guests', type: 'select', options: ATTENDANCE_BANDS.map(([v, l]) => [v, l]) },
        { key: 'interest', label: 'Audience interest', type: 'select', options: distinct(data.gatherings.map((g) => g.audience_interests)).map((r) => [r, r]) },
        { key: 'category', label: 'Product wanted', type: 'select', options: CATEGORIES },
        { key: 'from', label: 'Gathering from', type: 'date' }, { key: 'to', label: 'Gathering until', type: 'date' },
        { key: 'deliveryBy', label: 'Delivery due by', type: 'date' },
      ]} sorts={[['upcoming', 'Upcoming gathering'], ['newest', 'Newest application'], ['status', 'Status']]} />
      <Split ws={ws} name="gatherings" total={data.gatherings.length} shown={rows.length} filters={filters} onExport={exportCsv}
        emptyAll="No gatherings yet. Applications from the public form appear here."
        list={rows.map((g) => (
          <Row key={g.id} ws={ws} id={g.id} title={g.name} right={<StatusTag label={labelOf(GATHERING_STATUSES, g.status)} tone={tone(g.status)} />}
            sub={<>{host(g)?.full_name} · {g.city}, {g.region} · {g.event_date ? fmtDate(g.event_date) : 'date not confirmed'} · {g.guest_count} guests</>} />
        ))}
        detail={selected && <GatheringDetail ws={ws} g={selected} />} />
    </>
  )
}

function GatheringDetail({ ws, g }: { ws: WS; g: Gathering }) {
  const { data, today } = ws
  const host = data.hosts.find((h) => h.id === g.host_id)
  const linked = data.partnerships.filter((p) => p.gathering_id === g.id)
  const brandOf = (id: string) => data.brands.find((b) => b.id === id)
  const sug = useMemo(() => suggest(g, data.brands, data.products, data.partnerships, today), [g, data.brands, data.products, data.partnerships, today])
  const linkable = data.brands.filter((b) => b.state !== 'archived' && !linked.some((p) => p.brand_id === b.id))
  const [pick, setPick] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const link = async (brandId: string, e?: Evaluation) => {
    setBusy(true); setError('')
    try {
      const created = await ws.add<Partnership>('partnerships', {
        gathering_id: g.id, brand_id: brandId, status: 'reviewing',
        product_id: data.products.find((p) => p.brand_id === brandId)?.id ?? null,
        ...(e?.score ? { fit_audience: e.score.audience, fit_occasion: e.score.occasion, fit_market: e.score.market, fit_extras: e.score.extras } : {}),
        ...(e?.investment.complete ? { cost_estimate: e.investment.knownTotal } : {}),
      })
      setPick(''); ws.open('partnerships', created.id)
    } catch (err) { setError(err instanceof Error ? err.message : 'The brand could not be linked.') } finally { setBusy(false) }
  }
  const anotherDate = async () => {
    setBusy(true); setError('')
    try {
      const { id: _id, created_at: _c, updated_at: _u, campaign_slug: _s, ...copy } = g
      void _id; void _c; void _u; void _s
      const created = await ws.add<Gathering>('gatherings', { ...copy, source: 'team', status: 'reviewing', date_status: 'not_confirmed', event_date: null, delivery_by: null,
        campaign_published: false, next_action: null, next_action_date: null, internal_notes: `Another date of “${g.name}”.` })
      ws.select(created.id)
    } catch (err) { setError(err instanceof Error ? err.message : 'The new date could not be added.') } finally { setBusy(false) }
  }

  return (
    <article>
      <header className="ws-dhead">
        <h2>{g.name}</h2>
        <p><StatusTag label={labelOf(GATHERING_STATUSES, g.status)} tone={tone(g.status)} /> {labelOf(GATHERING_TYPES, g.type)} · received {fmtDate(g.created_at)}{g.source === 'team' ? ' · added by the team' : ''}</p>
        {host && <p>Host: <button type="button" className="cb-textlink" onClick={() => ws.open('hosts', host.id)}>{host.full_name}</button>{host.organization ? `, ${host.organization}` : ''} · <a href={`mailto:${host.email}`}>{host.email}</a></p>}
      </header>

      <section>
        <h3>Brands for this gathering</h3>
        {linked.length === 0 ? <p className="ws-none">No brand is linked yet.</p> : (
          <ul className="ws-lines">{linked.map((p) => (
            <li key={p.id}><button type="button" onClick={() => ws.open('partnerships', p.id)}><span><b>{brandOf(p.brand_id)?.name}</b></span><span><StatusTag label={labelOf(PARTNERSHIP_STATUSES, p.status)} tone={tone(p.status)} /></span></button></li>
          ))}</ul>
        )}
        <h4>Suggestions</h4>
        <p className="ws-note">A checklist to support your judgement. A suggestion does not reserve stock, approve spending, or tell the host or founder anything. The fit score is an initial working aid, not a prediction of sales.</p>
        {sug.suggestions.length === 0 && <p className="ws-verdict"><StatusTag label="No eligible match yet" tone="quiet" /></p>}
        {sug.suggestions.map((e) => <Suggestion key={e.brand.id} e={e} onLink={() => link(e.brand.id, e)} busy={busy} />)}
        {sug.needsInformation.length > 0 && (
          <details className="ws-more-list"><summary>Needs information ({sug.needsInformation.length})</summary>
            {sug.needsInformation.map((e) => (
              <div key={e.brand.id} className="ws-sug quiet">
                <p className="h"><b>{e.brand.name}</b> <StatusTag label="Needs information" tone="alert" /></p>
                <ul>{e.questions.map((q) => <li key={q}>{q}</li>)}</ul>
                <button type="button" className="cb-textlink" disabled={busy} onClick={() => link(e.brand.id)}>Link for review anyway</button>
              </div>
            ))}
          </details>
        )}
        {sug.notEligible.length > 0 && (
          <details className="ws-more-list"><summary>Not eligible ({sug.notEligible.length})</summary>
            {sug.notEligible.map((e) => (
              <div key={e.brand.id} className="ws-sug quiet">
                <p className="h"><b>{e.brand.name}</b></p>
                <ul>{e.checks.filter((c) => c.result === 'fail').map((c) => <li key={c.key}>{c.label}: {c.detail}</li>)}</ul>
              </div>
            ))}
          </details>
        )}
        {linkable.length > 0 && (
          <div className="ws-inline">
            <label htmlFor="ws-pick">Link a brand yourself</label>
            <select id="ws-pick" value={pick} onChange={(e) => setPick(e.target.value)}>
              <option value="">Choose a brand</option>
              {linkable.map((b) => <option key={b.id} value={b.id}>{b.name}{b.state !== 'approved' ? ` (${labelOf(BRAND_STATES, b.state).toLowerCase()})` : ''}</option>)}
            </select>
            <button type="button" className="cb-btn small ghost" disabled={!pick || busy} onClick={() => link(pick)}>Link for review</button>
          </div>
        )}
        {error && <p className="cb-err" role="alert">{error}</p>}
      </section>

      <section>
        <h3>Your working notes</h3>
        <Editor id={`g-${g.id}`} record={g as never} groups={GATHERING_GROUPS} onSave={(patch) => ws.save('gatherings', g.id, patch)} />
        <GuestPageInfo ws={ws} g={g} activeBrands={linked.filter((p) => ACTIVE_PARTNERSHIP.includes(p.status)).length} />
      </section>

      <section>
        <h3>The application</h3>
        <Facts rows={[
          ['What they are gathering to do', g.description],
          ['Date', g.date_status === 'confirmed' ? `${fmtDate(g.event_date)}${g.event_time ? ', ' + g.event_time : ''}${g.timezone ? ' (' + labelOf(TIMEZONES, g.timezone) + ')' : ''}` : `Not confirmed${g.event_time ? ' · ' + g.event_time : ''}`],
          ['Product needed by', fmtDate(g.delivery_by)],
          ['Place', `${g.city}, ${g.region}, ${g.country} ${g.postal_code}`],
          ['Venue', labelOf(VENUE_TYPES, g.venue_type)], ['Expected guests', g.guest_count], ['Who is coming', g.audience],
          ['Repeats', g.repeats ? `Yes${g.frequency ? ', ' + g.frequency.toLowerCase() : ''}` : 'No'],
          ['Product wanted', labelsOf(CATEGORIES, g.categories)],
          ['Preferred brand', g.preferred_brand_id ? brandOf(g.preferred_brand_id)?.name : 'Open to suggestions'],
          ['Role in the gathering', labelsOf(ROLES, g.roles)],
          ['Requested quantity', g.requested_quantity ?? 'No estimate given (do not assume one per guest)'],
          ['Dietary and allergies', g.dietary_unknown ? `Host does not know yet${g.dietary ? ' · ' + g.dietary : ''}` : g.dietary],
          ['Serving plan', labelsOf(SERVING_PLANS, g.serving_plan)], ['On hand', labelsOf(CAPABILITIES, g.capabilities)],
          ['Receiving a delivery', g.delivery_notes], ['Shipping preference', labelOf(SHIPPING_PREFS, g.shipping_preference)],
          ['How guests could discover the brand', labelsOf(DISCOVERY, g.discovery)],
          ['Will share a recap and attendance', g.recap_ack ? 'Yes' : 'Not confirmed'],
          ['Willing to share photos', labelOf(PHOTOS_WILLING, g.photos_willing)],
          ['Photos may be shown publicly', g.photo_public_offered ? 'Offered' : 'Not offered'],
          ['Photos may be reused in marketing', g.photo_reuse_offered ? 'Offered, for Believe Studio and the brand' : 'Not offered'],
          ['Other needs or ideas', g.extra],
        ]} />
      </section>

      <section className="ws-actions">
        <button type="button" className="cb-textlink" disabled={busy} onClick={anotherDate}>Add another date of this gathering</button>
        <button type="button" className="cb-textlink danger" onClick={() => confirmThen(`Delete “${g.name}” and any brand links on it? This cannot be undone. To keep the record, set its status to Declined or Cancelled instead.`, async () => { await ws.remove('gatherings', g.id); ws.select(null) })}>Delete this gathering</button>
      </section>
    </article>
  )
}

function Suggestion({ e, onLink, busy }: { e: Evaluation; onLink: () => void; busy: boolean }) {
  const s = e.score!
  const commitments = [...e.brand.required_visibility.map((v) => labelOf(DISCOVERY, v)), ...e.brand.extras.map((v) => labelOf(EXTRAS, v))]
  return (
    <div className="ws-sug">
      <p className="h"><b>{e.brand.name}</b> <StatusTag label="Suggested—awaiting review" tone="teal" /></p>
      <p><b>Suggested fit: {s.total} out of 10.</b> Audience {s.audience ?? 'not yet scored'} of 3 · occasion {s.occasion} of 3 · priority market {s.market} of 2 · extras {s.extras} of 2.</p>
      {e.reasons.length > 0 && <><h5>Why</h5><ul>{e.reasons.map((r) => <li key={r}>{r}</li>)}</ul></>}
      {e.questions.length > 0 && <><h5>Still to confirm</h5><ul>{e.questions.map((q) => <li key={q}>{q}</li>)}</ul></>}
      <h5>Quantity</h5>
      <p>{e.quantity ? `${e.quantity.units} units. ${e.quantity.note}` : 'No estimate from the host.'} Verify stock by hand before approving.</p>
      <h5>Estimated investment</h5>
      <ul>{e.investment.lines.map((l) => <li key={l.label}>{l.label}: {l.amount == null ? <span className="ws-blank">not on file</span> : money(l.amount)}</li>)}
        <li><b>{e.investment.complete ? 'Estimated total' : 'Known so far'}: {money(e.investment.knownTotal)}</b></li></ul>
      <h5>Proposed commitments</h5>
      <p>{commitments.length ? commitments.join(', ') + '.' : 'None on file for this brand.'}</p>
      <button type="button" className="cb-btn small" disabled={busy} onClick={onLink}>Link for review</button>
    </div>
  )
}

function GuestPageInfo({ ws, g, activeBrands }: { ws: WS; g: Gathering; activeBrands: number }) {
  const [svg, setSvg] = useState('')
  const [copied, setCopied] = useState(false)
  const url = g.campaign_slug ? window.location.origin + href(`g/${g.campaign_slug}`) : ''
  const live = !!g.campaign_slug && g.campaign_published && activeBrands > 0
  const counts = ws.data.campaignCounts.find((c) => c.campaign_slug === g.campaign_slug)
  // a QR code is only drawn once the page it points to actually exists
  useEffect(() => {
    let alive = true
    if (!live) { setSvg(''); return }
    import('qrcode-generator').then((m) => {
      const qr = (m.default ?? m)(0, 'M'); qr.addData(url); qr.make()
      if (alive) setSvg(qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true }))
    }).catch(() => { /* the link still works without the code */ })
    return () => { alive = false }
  }, [live, url])
  if (!g.campaign_slug) return <p className="ws-note">To create a guest page, give it a web address name above and save.</p>
  return (
    <div className="ws-guest">
      <p><b>Guest page:</b> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>{' '}
        <button type="button" className="cb-textlink" onClick={() => navigator.clipboard?.writeText(url).then(() => setCopied(true)).catch(() => undefined)}>{copied ? 'Copied' : 'Copy link'}</button></p>
      {!g.campaign_published && <p className="ws-note">The page is closed. Visitors see “This page isn’t available” until you tick “Guest page is open”.</p>}
      {g.campaign_published && activeBrands === 0 && <p className="ws-note">The page is open but has nothing to show yet: it lists a brand once that partnership is Approved.</p>}
      {live && svg && (
        <div className="ws-qr">
          <div dangerouslySetInnerHTML={{ __html: svg }} role="img" aria-label="QR code for the guest page" />
          <p><a href={'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)} download={`${g.campaign_slug}-qr.svg`}>Download the QR code</a><br /><span className="ws-note">Test it with a phone before printing.</span></p>
        </div>
      )}
      <p className="ws-note">Activity so far: {Number(counts?.page_views ?? 0)} page views, {Number(counts?.purchase_clicks ?? 0)} clicks on purchase links. A page view is not a guest count, and a click is not a purchase.</p>
    </div>
  )
}

// ── partnerships ────────────────────────────────────────────────────────────
export function PartnershipsTab({ ws }: { ws: WS }) {
  const { data } = ws
  const g = (p: Partnership) => data.gatherings.find((x) => x.id === p.gathering_id)
  const b = (p: Partnership) => data.brands.find((x) => x.id === p.brand_id)
  const filters = useFilters({ q: '', status: '', brand: '', region: '', from: '', to: '', deliveryBy: '', sort: 'upcoming' })
  const { f } = filters
  const rows = useMemo(() => {
    const out = data.partnerships.filter((p) => {
      const gg = g(p); const bb = b(p)
      return matches(f.q, gg?.name, bb?.name, gg?.city, gg?.region, p.owner, p.next_action, p.internal_notes, p.commitments, labelOf(CATEGORIES, bb?.category))
        && (!f.status || p.status === f.status) && (!f.brand || p.brand_id === f.brand) && (!f.region || gg?.region === f.region)
        && inRange(gg?.event_date, f.from, f.to) && inRange(gg?.delivery_by, '', f.deliveryBy)
    })
    const date = (p: Partnership) => g(p)?.event_date ?? '9999'
    if (f.sort === 'newest') out.sort((x, y) => y.created_at.localeCompare(x.created_at))
    else if (f.sort === 'status') out.sort((x, y) => statusRank(PARTNERSHIP_STATUSES, x.status) - statusRank(PARTNERSHIP_STATUSES, y.status))
    else out.sort((x, y) => (date(x) >= ws.today ? 0 : 1) - (date(y) >= ws.today ? 0 : 1) || date(x).localeCompare(date(y)))
    return out
  }, [data, f, ws.today])   // eslint-disable-line react-hooks/exhaustive-deps
  const selected = data.partnerships.find((p) => p.id === ws.selected) ?? null
  const exportCsv = () => download(`create-believers-partnerships-${stamp()}.csv`, toCsv(rows, [
    ['Gathering', (p) => g(p)?.name], ['Brand', (p) => b(p)?.name], ['Status', (p) => labelOf(PARTNERSHIP_STATUSES, p.status)],
    ['Gathering date', (p) => g(p)?.event_date ?? 'Not confirmed'], ['Product needed by', (p) => g(p)?.delivery_by], ['City', (p) => g(p)?.city], ['State or region', (p) => g(p)?.region],
    ['Product', (p) => data.products.find((x) => x.id === p.product_id)?.name], ['Approved quantity', (p) => p.approved_quantity],
    ['Founder approved on', (p) => p.founder_approved_on], ['Estimated cost', (p) => p.cost_estimate], ['Actual cost', (p) => p.cost_actual], ['Fit score (of 10)', (p) => fitTotal(p)],
    ['Owner', (p) => p.owner], ['Next action', (p) => p.next_action], ['Next action date', (p) => p.next_action_date],
    ['Recap received', (p) => (data.recaps.some((r) => r.partnership_id === p.id) ? 'Yes' : 'No')], ['Internal notes', (p) => p.internal_notes],
  ]))
  return (
    <>
      <FilterBar name="partnerships" filters={filters} defs={[
        { key: 'q', label: 'Search partnerships', type: 'search', placeholder: 'Gathering, brand, city, owner, note' },
        { key: 'status', label: 'Status', type: 'select', options: PARTNERSHIP_STATUSES },
        { key: 'brand', label: 'Brand', type: 'select', options: data.brands.map((x) => [x.id, x.name]) },
        { key: 'region', label: 'State or region', type: 'select', options: distinct([data.gatherings.map((x) => x.region)]).map((r) => [r, r]) },
        { key: 'from', label: 'Gathering from', type: 'date' }, { key: 'to', label: 'Gathering until', type: 'date' }, { key: 'deliveryBy', label: 'Delivery due by', type: 'date' },
      ]} sorts={[['upcoming', 'Upcoming gathering'], ['newest', 'Newest'], ['status', 'Status']]} />
      <Split ws={ws} name="partnerships" total={data.partnerships.length} shown={rows.length} filters={filters} onExport={exportCsv}
        emptyAll="No partnerships yet. Open a gathering and link a brand to begin one."
        list={rows.map((p) => (
          <Row key={p.id} ws={ws} id={p.id} title={`${g(p)?.name ?? 'Gathering'} · ${b(p)?.name ?? 'Brand'}`} right={<StatusTag label={labelOf(PARTNERSHIP_STATUSES, p.status)} tone={tone(p.status)} />}
            sub={<>{g(p)?.event_date ? fmtDate(g(p)!.event_date) : 'date not confirmed'}{p.next_action ? ` · next: ${p.next_action}` : ''}{p.owner ? ` · ${p.owner}` : ''}</>} />
        ))}
        detail={selected && <PartnershipDetail ws={ws} p={selected} />} />
    </>
  )
}

function PartnershipDetail({ ws, p }: { ws: WS; p: Partnership }) {
  const { data, today } = ws
  const g = data.gatherings.find((x) => x.id === p.gathering_id)
  const brand = data.brands.find((x) => x.id === p.brand_id)
  const recap = data.recaps.find((r) => r.partnership_id === p.id)
  const [copied, setCopied] = useState(false)
  const [copiedOffer, setCopiedOffer] = useState(false)
  if (!g || !brand) return <p className="ws-none">This partnership’s gathering or brand is missing.</p>
  const e = evaluate(g, brand, data.products, today, data.partnerships, data.brands)
  const products: Opt[] = data.products.filter((x) => x.brand_id === brand.id).map((x) => [x.id, x.name])
  const recapUrl = window.location.origin + href(`recap/${p.recap_token}`)
  const recapOpen = ['approved', 'preparing', 'shipped', 'delivered', 'gathered'].includes(p.status)
  const total = fitTotal(p)
  const verdict = e.verdict === 'eligible' ? 'All requirements met on file' : e.verdict === 'needs_information' ? 'Needs information' : 'A requirement is not met'

  const save = async (patch: Record<string, unknown>) => {
    const status = String(patch.status ?? p.status)
    const founderDate = 'founder_approved_on' in patch ? patch.founder_approved_on : p.founder_approved_on
    if (['approved', 'preparing', 'shipped', 'delivered', 'gathered', 'recap_received'].includes(status) && !founderDate) {
      throw new Error('Not saved. Record the date the founder approved this gathering first (under “Founder approval”).')
    }
    // approving is always a person's decision; if the checklist is not clear, say so first
    if (patch.status === 'approved' && e.verdict !== 'eligible') {
      const issues = e.checks.filter((c) => c.result === 'fail' || c.result === 'unknown').map((c) => `• ${c.label}: ${c.detail}`).join('\n')
      if (!window.confirm(`Before you approve, the checklist shows:\n\n${issues}\n\nApprove anyway?`)) throw new Error('Not saved. The status was left as it was.')
    }
    await ws.save('partnerships', p.id, patch)
  }
  const offer: [string, string][] = [
    ['Gathering', `${labelOf(GATHERING_TYPES, g.type)} in ${g.city}, ${g.region}, about ${g.guest_count} guests`],
    ['When', g.event_date ? `${fmtDate(g.event_date)}; product needed by ${fmtDate(g.delivery_by) || 'a date to be agreed'}` : 'Date not confirmed'],
    ['Who is coming', g.audience],
    ['Role for the product', labelsOf(ROLES, g.roles) || 'Not specified'],
    ['Quantity requested', g.requested_quantity ? String(g.requested_quantity) : 'No estimate given'],
    ['Visibility offered', labelsOf(DISCOVERY, g.discovery) || 'None offered yet'],
    ['Recap offered', g.recap_ack ? 'A short recap afterwards, including actual attendance' : 'Not confirmed'],
    ['Photos', g.photos_willing === 'yes' ? 'Willing to share photos of the product in use' : g.photos_willing === 'no' ? 'Not sharing photos' : 'Not sure yet'],
    ['Showing photos publicly', g.photo_public_offered ? 'Offered' : 'Not offered'],
    ['Reuse of photos in marketing by Believe Studio or the brand', g.photo_reuse_offered ? 'Offered' : 'Not offered'],
    ['Shipping', labelOf(SHIPPING_PREFS, g.shipping_preference) || 'Not specified'],
    ['Dietary and allergies', g.dietary_unknown ? 'Host does not know yet' : g.dietary || 'None stated'],
  ]
  const offerText = `${brand.name} at a ${offer[0][1]}\n` + offer.slice(1).map(([k, v]) => `${k}: ${v}`).join('\n')
  return (
    <article>
      <header className="ws-dhead">
        <h2>{brand.name} at {g.name}</h2>
        <p><StatusTag label={labelOf(PARTNERSHIP_STATUSES, p.status)} tone={tone(p.status)} />{total != null && <> Fit score {total} of 10</>}</p>
        <p>Gathering: <button type="button" className="cb-textlink" onClick={() => ws.open('gatherings', g.id)}>{g.name}</button> · Brand: <button type="button" className="cb-textlink" onClick={() => ws.open('brands', brand.id)}>{brand.name}</button></p>
      </header>
      <section>
        <Facts rows={[
          ['Gathering date', g.event_date ? fmtDate(g.event_date) : 'Not confirmed'], ['Product needed by', fmtDate(g.delivery_by)],
          ['Place', `${g.city}, ${g.region}`], ['Expected guests', g.guest_count],
          ['Host’s requested quantity', g.requested_quantity ?? 'No estimate given'],
          ['Guest page', g.campaign_slug ? `${g.campaign_published ? 'Open' : 'Closed'} · /g/${g.campaign_slug}` : 'Not set up (see the gathering)'],
        ]} />
      </section>
      <section>
        <h3>What the host has offered {p.founder_approved_on ? <StatusTag label={`Founder approved ${fmtDate(p.founder_approved_on)}`} tone="teal" /> : <StatusTag label="Awaiting founder approval" tone="alert" />}</h3>
        <p className="ws-note">These are the commitments the host offered in their application. Share them with the founder when you ask for approval. The summary leaves out the host’s name, contact details, and postal code, so it can be sent to a founder who has no workspace access. Photo permissions are offers only; nothing is granted until confirmed in writing.</p>
        <Facts rows={offer.slice(1)} />
        <p style={{ marginTop: 10 }}><button type="button" className="cb-textlink" onClick={() => navigator.clipboard?.writeText(offerText).then(() => setCopiedOffer(true)).catch(() => undefined)}>{copiedOffer ? 'Copied' : 'Copy this summary for the founder'}</button></p>
      </section>
      <section>
        <h3>Requirements checklist <StatusTag label={verdict} tone={e.verdict === 'eligible' ? 'teal' : 'alert'} /></h3>
        <p className="ws-note">Read from what is on file today. It does not approve anything, and stock is not reserved by this system: confirm with the founder before approving.</p>
        <ul className="ws-checks">{e.checks.map((c) => (
          <li key={c.key} className={c.result}><b>{c.result === 'pass' ? 'Met' : c.result === 'fail' ? 'Not met' : c.result === 'review' ? 'Check by hand' : 'Unknown'}</b><span>{c.label}. {c.detail}</span></li>
        ))}</ul>
      </section>
      <section>
        <h3>Manage this partnership</h3>
        <Editor id={`p-${p.id}`} record={p as never} groups={partnershipGroups(products)} onSave={save} />
      </section>
      <section>
        <h3>Recap</h3>
        {recap ? <RecapView ws={ws} recap={recap} /> : (
          <>
            <p className="ws-note">{recapOpen ? 'Send this private link to the host after the gathering. It accepts one recap, for this brand at this gathering.' : 'The recap link opens once this partnership is Approved, and closes after a recap is received.'}</p>
            {recapOpen && <p><a href={recapUrl} target="_blank" rel="noopener noreferrer">{recapUrl}</a>{' '}
              <button type="button" className="cb-textlink" onClick={() => navigator.clipboard?.writeText(recapUrl).then(() => setCopied(true)).catch(() => undefined)}>{copied ? 'Copied' : 'Copy link'}</button></p>}
          </>
        )}
      </section>
      <section className="ws-actions">
        <button type="button" className="cb-textlink danger" onClick={() => confirmThen(`Remove ${brand.name} from “${g.name}”? Any recap on it is removed too. To keep the record, set the status to Declined or Cancelled instead.`, async () => { await ws.remove('partnerships', p.id); ws.select(null) })}>Remove this link</button>
      </section>
    </article>
  )
}

function RecapView({ ws, recap }: { ws: WS; recap: Recap }) {
  return (
    <>
      <p className="ws-note">Received {fmtDate(recap.created_at)}. These are the host’s own account. When you have read it, set the status to “Recap received”.</p>
      <Facts rows={[
        ['People who came', recap.actual_attendance], ['People who tried the product (estimate)', recap.tried_count],
        ['Units served', recap.units_served], ['Units taken home', recap.units_taken_home], ['Units left over', recap.units_remaining],
        ['How it was served', recap.served_how], ['How it was introduced', recap.introduced_how], ['Guest reactions', recap.reactions],
        ['What worked', recap.worked], ['What to improve', recap.improve],
        ['Purchases or interest (self-reported)', recap.purchases_self_reported],
        ['Photos', recap.photo_links ? <a href={/^https:\/\//.test(recap.photo_links.trim()) ? recap.photo_links.trim() : undefined} target="_blank" rel="noopener noreferrer">{recap.photo_links}</a> : ''],
        ['Photos may be shown publicly', !recap.photo_links ? 'No photos shared' : recap.photo_public_ok ? 'Yes, permission given' : 'No'],
        ['Photos may be reused in marketing by Believe Studio or the brand', !recap.photo_links ? 'No photos shared' : recap.photo_reuse_ok ? 'Yes, permission given' : 'No'],
        ['Photo notes', recap.photo_permission_notes], ['Would host again', labelOf(HOST_INTEREST, recap.host_interest)],
      ]} />
      <Editor id={`r-${recap.id}`} record={recap as never} groups={RECAP_GROUPS} onSave={(patch) => ws.save('recaps', recap.id, patch)} saveLabel="Save notes" />
    </>
  )
}

// ── brands ──────────────────────────────────────────────────────────────────
export function BrandsTab({ ws }: { ws: WS }) {
  const { data } = ws
  const filters = useFilters({ q: '', state: '', category: '', visible: '', place: '', sort: 'name' })
  const { f } = filters
  const visible = (b: Brand) => b.state === 'approved' && b.is_public && !!b.founder_approved_on
  const rows = useMemo(() => {
    const out = data.brands.filter((b) =>
      matches(f.q, b.name, b.founder_name, labelOf(CATEGORIES, b.category), b.public_description, b.occasions.map((o) => labelOf(GATHERING_TYPES, o)), b.audiences, b.priority_markets, b.geography_served, b.internal_notes)
      && (!f.state || b.state === f.state) && (!f.category || b.category === f.category)
      && (!f.visible || (f.visible === 'yes') === visible(b)) && (!f.place || b.geography_served.includes(f.place)))
    if (f.sort === 'newest') out.sort((a, b) => b.created_at.localeCompare(a.created_at)); else out.sort((a, b) => a.name.localeCompare(b.name))
    return out
  }, [data.brands, f])
  const selected = data.brands.find((b) => b.id === ws.selected) ?? null
  const [error, setError] = useState('')
  const create = async () => {
    setError('')
    try {
      const b = await ws.add<Brand>('brands', { name: 'New brand', slug: `new-brand-${Math.random().toString(36).slice(2, 6)}`, state: 'draft', is_public: false })
      filters.clear(); ws.select(b.id)
    } catch (e) { setError(e instanceof Error ? e.message : 'The brand could not be added.') }
  }
  const exportCsv = () => download(`create-believers-brands-${stamp()}.csv`, toCsv(rows, [
    ['Brand', (b) => b.name], ['State', (b) => labelOf(BRAND_STATES, b.state)], ['On the public page', (b) => (visible(b) ? 'Yes' : 'No')], ['Founder approved on', (b) => b.founder_approved_on],
    ['Category', (b) => labelOf(CATEGORIES, b.category)], ['Founder or contact', (b) => b.founder_name], ['Email', (b) => b.contact_email],
    ['Available in', (b) => b.geography_served], ['Priority markets', (b) => b.priority_markets], ['Gatherings', (b) => b.occasions.map((o) => labelOf(GATHERING_TYPES, o))],
    ['Units available', (b) => b.inventory_available], ['Units reserved', (b) => b.inventory_reserved], ['Minimum lead time (days)', (b) => b.min_lead_days],
    ['Campaign budget', (b) => b.campaign_budget], ['Internal notes', (b) => b.internal_notes],
  ]))
  return (
    <>
      <FilterBar name="brands" filters={filters} defs={[
        { key: 'q', label: 'Search brands', type: 'search', placeholder: 'Name, founder, tag, market, note' },
        { key: 'state', label: 'State', type: 'select', options: BRAND_STATES }, { key: 'category', label: 'Category', type: 'select', options: CATEGORIES },
        { key: 'visible', label: 'On the public page', type: 'select', options: [['yes', 'Yes'], ['no', 'No']] },
        { key: 'place', label: 'Available in', type: 'select', options: distinct(data.brands.map((b) => b.geography_served)).map((r) => [r, r]) },
      ]} sorts={[['name', 'Name'], ['newest', 'Newest']]} />
      {error && <p className="cb-err" role="alert">{error}</p>}
      <Split ws={ws} name="brands" total={data.brands.length} shown={rows.length} filters={filters} onExport={exportCsv}
        toolbar={<button type="button" className="cb-btn small" onClick={create}>Add a brand</button>}
        emptyAll="No brand profiles yet. Add one to begin; it stays a private draft until you publish it."
        list={rows.map((b) => (
          <Row key={b.id} ws={ws} id={b.id} title={b.name} right={<StatusTag label={visible(b) ? 'Public' : labelOf(BRAND_STATES, b.state)} tone={visible(b) ? 'teal' : tone(b.state)} />}
            sub={<>{labelOf(CATEGORIES, b.category) || 'No category'}{b.geography_served.length ? ' · ' + b.geography_served.join(', ') : ''}</>} />
        ))}
        detail={selected && <BrandDetail ws={ws} b={selected} />} />
    </>
  )
}

function BrandDetail({ ws, b }: { ws: WS; b: Brand }) {
  const { data } = ws
  const products = data.products.filter((p) => p.brand_id === b.id)
  const links = data.partnerships.filter((p) => p.brand_id === b.id)
  const promised = links.filter((p) => ACTIVE_PARTNERSHIP.includes(p.status) && p.status !== 'closed').reduce((n, p) => n + (p.approved_quantity ?? 0), 0)
  const visible = b.state === 'approved' && b.is_public && !!b.founder_approved_on
  const [error, setError] = useState('')
  const save = async (patch: Record<string, unknown>) => {
    if (typeof patch.name === 'string' && !patch.name) throw new Error('A brand needs a name.')
    if ('slug' in patch) patch.slug = slugify(String(patch.slug ?? b.name))
    const founderDate = 'founder_approved_on' in patch ? patch.founder_approved_on : b.founder_approved_on
    if (('is_public' in patch ? patch.is_public : b.is_public) === true && !founderDate) throw new Error('Not saved. A profile can only be shown publicly once the founder’s approval date is recorded.')
    await ws.save('brands', b.id, patch)
  }
  const addProduct = async () => {
    setError('')
    try { await ws.add<Product>('products', { brand_id: b.id, name: 'New product', category: b.category }) }
    catch (e) { setError(e instanceof Error ? e.message : 'The product could not be added.') }
  }
  return (
    <article>
      <header className="ws-dhead">
        <h2>{b.name}</h2>
        <p><StatusTag label={labelOf(BRAND_STATES, b.state)} tone={tone(b.state)} /> {b.founder_approved_on ? <StatusTag label={`Founder approved ${fmtDate(b.founder_approved_on)}`} tone="teal" /> : <StatusTag label="Awaiting founder approval" tone="alert" />} {visible ? <StatusTag label="On the public page" tone="teal" /> : <StatusTag label="Not visible to visitors" tone="quiet" />}</p>
        <p className="ws-note">{visible ? 'Visitors can see the public profile section below.' : 'To publish: complete the public profile, record the date the founder approved it, set the state to Approved, tick “Show this profile on the public brands page”, and save.'} A draft or incomplete profile is never suggested as a match.</p>
        <p className="ws-note">Stock is managed by hand. On file: {b.inventory_available ?? 'not known'} available, {b.inventory_reserved ?? 0} reserved elsewhere, {promised} promised to approved gatherings here.</p>
      </header>
      <section><Editor id={`b-${b.id}`} record={b as never} groups={BRAND_GROUPS} onSave={save} /></section>
      <section>
        <h3>Products</h3>
        {products.length === 0 && <p className="ws-none">No products on file. Without one, allergen questions cannot be answered and case packs are unknown.</p>}
        {products.map((p) => (
          <details key={p.id} className="ws-product">
            <summary>{p.name}{p.sku ? ` · ${p.sku}` : ''}{p.case_pack ? ` · case of ${p.case_pack}` : ''}</summary>
            <Editor id={`pr-${p.id}`} record={p as never} groups={[{ title: 'Product details', note: '“Not yet known” is different from “none”. Leave a field blank rather than guess.', fields: PRODUCT_FIELDS }]}
              onSave={(patch) => ws.save('products', p.id, patch)} />
            <button type="button" className="cb-textlink danger" onClick={() => confirmThen(`Delete the product “${p.name}”?`, () => ws.remove('products', p.id))}>Delete this product</button>
          </details>
        ))}
        <button type="button" className="cb-btn small ghost" onClick={addProduct}>Add a product</button>
        {error && <p className="cb-err" role="alert">{error}</p>}
      </section>
      <section>
        <h3>Gatherings</h3>
        {links.length === 0 ? <p className="ws-none">Not linked to any gathering yet.</p> : (
          <ul className="ws-lines">{links.map((p) => (
            <li key={p.id}><button type="button" onClick={() => ws.open('partnerships', p.id)}><span><b>{data.gatherings.find((g) => g.id === p.gathering_id)?.name}</b></span><span><StatusTag label={labelOf(PARTNERSHIP_STATUSES, p.status)} tone={tone(p.status)} /></span></button></li>
          ))}</ul>
        )}
      </section>
    </article>
  )
}

// ── hosts ───────────────────────────────────────────────────────────────────
export function HostsTab({ ws }: { ws: WS }) {
  const { data } = ws
  const of = (h: Host) => data.gatherings.filter((g) => g.host_id === h.id)
  const filters = useFilters({ q: '', role: '', region: '', sort: 'newest' })
  const { f } = filters
  const rows = useMemo(() => {
    const out = data.hosts.filter((h) => {
      const gs = of(h)
      return matches(f.q, h.full_name, h.organization, h.email, h.internal_notes, gs.map((g) => g.name), gs.map((g) => g.city), gs.map((g) => g.region), gs.flatMap((g) => g.tags))
        && (!f.role || h.host_role === f.role) && (!f.region || gs.some((g) => g.region === f.region))
    })
    if (f.sort === 'name') out.sort((a, b) => a.full_name.localeCompare(b.full_name)); else out.sort((a, b) => b.created_at.localeCompare(a.created_at))
    return out
  }, [data.hosts, data.gatherings, f])   // eslint-disable-line react-hooks/exhaustive-deps
  const selected = data.hosts.find((h) => h.id === ws.selected) ?? null
  const exportCsv = () => download(`create-believers-hosts-${stamp()}.csv`, toCsv(rows, [
    ['Host', (h) => h.full_name], ['Email', (h) => h.email], ['Organization', (h) => h.organization], ['Role', (h) => labelOf(HOST_ROLES, h.host_role)],
    ['Website', (h) => h.website], ['Gatherings', (h) => of(h).length], ['Places', (h) => distinct([of(h).map((g) => `${g.city}, ${g.region}`)])],
    ['Asked for news', (h) => (h.marketing_opt_in ? 'Yes' : 'No')], ['First heard from', (h) => h.created_at.slice(0, 10)], ['Internal notes', (h) => h.internal_notes],
  ]))
  return (
    <>
      <FilterBar name="hosts" filters={filters} defs={[
        { key: 'q', label: 'Search hosts', type: 'search', placeholder: 'Name, organization, city, gathering, note' },
        { key: 'role', label: 'Role', type: 'select', options: HOST_ROLES },
        { key: 'region', label: 'State or region', type: 'select', options: distinct([data.gatherings.map((g) => g.region)]).map((r) => [r, r]) },
      ]} sorts={[['newest', 'Newest'], ['name', 'Name']]} />
      <Split ws={ws} name="hosts" total={data.hosts.length} shown={rows.length} filters={filters} onExport={exportCsv}
        emptyAll="No hosts yet. A host is added automatically with their first application."
        list={rows.map((h) => {
          const gs = of(h)
          return <Row key={h.id} ws={ws} id={h.id} title={h.full_name} right={<span className="ws-count">{gs.length} {gs.length === 1 ? 'gathering' : 'gatherings'}</span>}
            sub={<>{h.organization || labelOf(HOST_ROLES, h.host_role) || 'Host'}{gs[0] ? ` · ${gs[0].city}, ${gs[0].region}` : ''}</>} />
        })}
        detail={selected && (
          <article>
            <header className="ws-dhead"><h2>{selected.full_name}</h2><p><a href={`mailto:${selected.email}`}>{selected.email}</a> · first heard from {fmtDate(selected.created_at)}</p></header>
            <section>
              <h3>Gatherings</h3>
              <p className="ws-note">Each date of a recurring gathering is its own record, linked to this host.</p>
              <ul className="ws-lines">{of(selected).map((g) => (
                <li key={g.id}><button type="button" onClick={() => ws.open('gatherings', g.id)}><span><b>{g.name}</b> · {g.event_date ? fmtDate(g.event_date) : 'date not confirmed'}</span><span><StatusTag label={labelOf(GATHERING_STATUSES, g.status)} tone={tone(g.status)} /></span></button></li>
              ))}</ul>
            </section>
            <section><Editor id={`h-${selected.id}`} record={selected as never} groups={HOST_GROUPS} onSave={(patch) => ws.save('hosts', selected.id, patch)} /></section>
          </article>
        )} />
    </>
  )
}

// ── founder inquiries ───────────────────────────────────────────────────────
export function InquiriesTab({ ws }: { ws: WS }) {
  const { data } = ws
  const filters = useFilters({ q: '', status: '', category: '', sort: 'newest' })
  const { f } = filters
  const rows = useMemo(() => data.inquiries.filter((i) =>
    matches(f.q, i.brand_name, i.founder_name, i.email, i.description, i.explore, i.markets, i.internal_notes)
    && (!f.status || i.status === f.status) && (!f.category || i.category === f.category))
    .sort((a, b) => b.created_at.localeCompare(a.created_at)), [data.inquiries, f])
  const selected = data.inquiries.find((i) => i.id === ws.selected) ?? null
  const [error, setError] = useState('')
  const toBrand = async (i: Inquiry) => {
    setError('')
    try {
      const b = await ws.add<Brand>('brands', {
        name: i.brand_name, slug: `${slugify(i.brand_name)}-${Math.random().toString(36).slice(2, 5)}`, state: 'draft', is_public: false,
        founder_name: i.founder_name, contact_email: i.email, website: i.website, category: i.category,
        internal_notes: `From a founder inquiry received ${fmtDate(i.created_at)}.\nIn their words: ${i.description}\nWants to explore: ${i.explore}${i.markets ? `\nSold today: ${i.markets}` : ''}`,
      })
      await ws.save('inquiries', i.id, { status: 'became_brand' })
      ws.open('brands', b.id)
    } catch (e) { setError(e instanceof Error ? e.message : 'The draft profile could not be created.') }
  }
  const exportCsv = () => download(`create-believers-founder-inquiries-${stamp()}.csv`, toCsv(rows, [
    ['Brand', (i) => i.brand_name], ['Founder', (i) => i.founder_name], ['Email', (i) => i.email], ['Status', (i) => labelOf(INQUIRY_STATUSES, i.status)],
    ['Category', (i) => labelOf(CATEGORIES, i.category)], ['Website', (i) => i.website], ['Product', (i) => i.description], ['Sold today', (i) => i.markets],
    ['Wants to explore', (i) => i.explore], ['Timing or budget', (i) => i.timing_budget], ['Received', (i) => i.created_at.slice(0, 10)], ['Internal notes', (i) => i.internal_notes],
  ]))
  return (
    <>
      <FilterBar name="founder inquiries" filters={filters} defs={[
        { key: 'q', label: 'Search founder inquiries', type: 'search', placeholder: 'Brand, founder, product, note' },
        { key: 'status', label: 'Status', type: 'select', options: INQUIRY_STATUSES }, { key: 'category', label: 'Category', type: 'select', options: CATEGORIES },
      ]} />
      <Split ws={ws} name="founder inquiries" total={data.inquiries.length} shown={rows.length} filters={filters} onExport={exportCsv}
        emptyAll="No founder inquiries yet. They arrive from the public founder form."
        list={rows.map((i) => <Row key={i.id} ws={ws} id={i.id} title={i.brand_name} right={<StatusTag label={labelOf(INQUIRY_STATUSES, i.status)} tone={tone(i.status)} />} sub={<>{i.founder_name} · received {fmtDate(i.created_at)}</>} />)}
        detail={selected && (
          <article>
            <header className="ws-dhead"><h2>{selected.brand_name}</h2><p>{selected.founder_name} · <a href={`mailto:${selected.email}`}>{selected.email}</a> · received {fmtDate(selected.created_at)}</p></header>
            <section><Facts rows={[
              ['Website', selected.website], ['Category', labelOf(CATEGORIES, selected.category)], ['Product', selected.description],
              ['Where it is sold today', selected.markets], ['Wants to explore', selected.explore], ['Timing or budget', selected.timing_budget],
            ]} /></section>
            <section><Editor id={`i-${selected.id}`} record={selected as never} groups={INQUIRY_GROUPS} onSave={(patch) => ws.save('inquiries', selected.id, patch)} /></section>
            <section className="ws-actions">
              {selected.status !== 'became_brand' && <button type="button" className="cb-btn small ghost" onClick={() => toBrand(selected)}>Start a draft brand profile from this</button>}
              <button type="button" className="cb-textlink danger" onClick={() => confirmThen(`Delete the inquiry from ${selected.brand_name}?`, async () => { await ws.remove('inquiries', selected.id); ws.select(null) })}>Delete this inquiry</button>
              {error && <p className="cb-err" role="alert">{error}</p>}
            </section>
          </article>
        )} />
    </>
  )
}
