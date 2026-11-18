import React, { useEffect, useMemo, useState } from 'react'
import { MODE, listPublicBrands } from './backend'
import { CATEGORIES, GATHERING_TYPES, labelOf, type Opt } from './options'
import { EMPTY_BRAND_FILTERS, distinct, filterPublicBrands, type BrandFilters } from './search'
import type { PublicBrand } from './types'
import { Link, useHeadingFocus, useMeta } from './ui'

export function BrandDiscovery() {
  const [brands, setBrands] = useState<PublicBrand[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [f, setF] = useState<BrandFilters>(EMPTY_BRAND_FILTERS)
  // Only a list of real, published profiles should be found by search engines.
  useMeta('Explore the brands | Create Believers', 'Food and beverage brands working with Believe Studio to take part in thoughtful gatherings.',
    { path: '/brands', noindex: MODE !== 'live' || !brands || brands.length === 0 })
  const heading = useHeadingFocus()

  useEffect(() => {
    let alive = true
    listPublicBrands().then((b) => alive && setBrands(b)).catch(() => alive && setFailed(true))
    return () => { alive = false }
  }, [])

  const all = brands ?? []
  const shown = useMemo(() => filterPublicBrands(all, f), [all, f])
  const occasions: Opt[] = GATHERING_TYPES.filter(([v]) => all.some((b) => b.occasions.includes(v)))
  const categories: Opt[] = CATEGORIES.filter(([v]) => all.some((b) => b.category === v))
  const places = distinct(all.map((b) => b.geography))
  const dietary = distinct(all.map((b) => b.dietary_verified))   // shown only when a brand has verified information
  const active = Object.values(f).some(Boolean)
  const set = (k: keyof BrandFilters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value })

  return (
    <main className="cb-page">
      <div className="cb-wrap">
        <Link to="" className="cb-back">← Create Believers</Link>
        <p className="cb-eyebrow">Explore the brands</p>
        <h1 ref={heading} tabIndex={-1}>Brands looking for the right table.</h1>
        <p className="cb-lead" style={{ maxWidth: '36em' }}>Each brand here is working with Believe to take part in gatherings where it naturally belongs. If one feels right for yours, tell us about your plans and we’ll explore the fit together.</p>
        <p className="intro" style={{ maxWidth: '44em' }}>Every introduction is reviewed by Believe, and approval is required on both sides before anything is arranged.</p>

        {all.some((b) => b.illustrative) && (
          <div className="cb-notice" role="status"><strong>Preview.</strong> These are illustrative examples so the search can be reviewed. They are not real brands or available partners. Live profiles appear here only after Believe publishes them.</div>
        )}
        {failed && <div className="cb-notice error" role="alert"><h2>We could not load the brands just now</h2><p style={{ marginTop: 6 }}>Please refresh the page to try again.</p></div>}
        {!brands && !failed && <p className="intro" role="status" style={{ marginTop: 30 }}>Loading…</p>}

        {brands && all.length === 0 && (
          <div className="cb-empty">
            <h2>The first brands are on their way.</h2>
            <p>We introduce each brand here once the details are confirmed with its founder. In the meantime, you don’t need to choose one. Tell us about your gathering and we’ll think about who belongs there.</p>
            <div className="cb-actions">
              <Link to="host" className="cb-btn">Tell us about your gathering</Link>
              <Link to="founders" className="cb-btn ghost">I’m a brand founder</Link>
            </div>
          </div>
        )}

        {all.length > 0 && (
          <>
            <form className={'cb-filters' + (dietary.length ? ' five' : '')} role="search" aria-label="Search and filter brands" onSubmit={(e) => e.preventDefault()}>
              <div className="cb-field"><label htmlFor="cb-q">Search</label><input id="cb-q" type="search" value={f.q} onChange={set('q')} placeholder="Name, product, or occasion" /></div>
              <div className="cb-field"><label htmlFor="cb-fc">Product</label><select id="cb-fc" value={f.category} onChange={set('category')}><option value="">All products</option>{categories.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
              <div className="cb-field"><label htmlFor="cb-fo">Kind of gathering</label><select id="cb-fo" value={f.occasion} onChange={set('occasion')}><option value="">All gatherings</option>{occasions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
              <div className="cb-field"><label htmlFor="cb-fg">Available in</label><select id="cb-fg" value={f.geography} onChange={set('geography')}><option value="">Anywhere listed</option>{places.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
              {dietary.length > 0 && (
                <div className="cb-field"><label htmlFor="cb-fd">Dietary</label><select id="cb-fd" value={f.dietary} onChange={set('dietary')}><option value="">Any</option>{dietary.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
              )}
            </form>
            {dietary.length > 0 && <p className="cb-help" style={{ marginTop: 12 }}>Dietary details come from each brand and are a starting point only. They are not a guarantee that a product is safe for an allergy. Always check the label, and tell us about any allergies when you apply.</p>}

            <div className="cb-count">
              <p role="status" aria-live="polite">{shown.length === all.length ? `${all.length} ${all.length === 1 ? 'brand' : 'brands'}` : `${shown.length} of ${all.length} brands`}</p>
              {active && <button type="button" className="cb-textlink" onClick={() => setF(EMPTY_BRAND_FILTERS)}>Clear all</button>}
            </div>

            {shown.length === 0 ? (
              <div className="cb-empty" style={{ marginTop: 18 }}>
                <h2>Nothing matches that combination yet.</h2>
                <p>Try removing a filter. Or skip the search: tell us about your gathering and we’ll suggest who might belong.</p>
                <div className="cb-actions">
                  <button type="button" className="cb-btn ghost" onClick={() => setF(EMPTY_BRAND_FILTERS)}>Clear all filters</button>
                  <Link to="host" className="cb-btn">Tell us about your gathering</Link>
                </div>
              </div>
            ) : (
              <ul className="cb-brands">
                {shown.map((b) => (
                  <li key={b.id} className="cb-brand">
                    <div className="pic">{b.image_url ? <img src={b.image_url} alt="" loading="lazy" /> : <span aria-hidden="true">{b.name.slice(0, 1)}</span>}</div>
                    <h2>{b.name}</h2>
                    <div className="meta">
                      {b.illustrative && <span className="cb-tag">Illustrative example</span>}
                      {b.category && <span className="cb-tag quiet">{labelOf(CATEGORIES, b.category)}</span>}
                    </div>
                    {b.description && <p>{b.description}</p>}
                    {b.occasions.length > 0 && <p className="occ"><b>Could belong at:</b> {b.occasions.map((o) => labelOf(GATHERING_TYPES, o).toLowerCase()).join(', ')}.</p>}
                    {b.geography.length > 0 && <p className="occ"><b>Available in:</b> {b.geography.join(', ')}.</p>}
                    <div className="push" />
                    <Link to={`host?brand=${encodeURIComponent(b.slug)}`} className="cb-btn small ghost" aria-label={`Explore a possible fit with ${b.name}`}>Explore a possible fit</Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  )
}
