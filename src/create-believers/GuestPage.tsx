import React, { useEffect, useState } from 'react'
import { getCampaign, track } from './backend'
import type { Campaign } from './types'
import { useMeta } from './ui'

/** Adds the campaign name to a purchase link so visits from this page can be told apart. */
export function tagged(url: string, slug: string): string {
  try {
    const u = new URL(url)
    if (u.protocol !== 'https:') return '#'
    if (!u.searchParams.has('utm_source')) {
      u.searchParams.set('utm_source', 'believe-studio'); u.searchParams.set('utm_medium', 'gathering'); u.searchParams.set('utm_campaign', slug)
    }
    return u.toString()
  } catch { return '#' }
}

/**
 * The page a guest reaches from a card or QR code at a gathering. It shows the
 * brands that took part, their stories, a serving idea, and confirmed places to
 * buy. It says nothing about the gathering itself, and it is not listed in search engines.
 */
export function GuestPage({ slug }: { slug: string }) {
  useMeta('From the table | Believe Studio', 'The brands you met, and where to find them.', { noindex: true })
  const [state, setState] = useState<'loading' | 'missing' | Campaign>('loading')
  useEffect(() => {
    let alive = true
    getCampaign(slug).then((c) => { if (!alive) return; setState(c && c.brands.length ? c : 'missing'); if (c && c.brands.length) track(slug, 'page_view') })
      .catch(() => alive && setState('missing'))
    return () => { alive = false }
  }, [slug])

  return (
    <>
      <header className="cb-mast"><a href="/" aria-label="Believe Studio home"><img src="/logo/believe-horizontal.svg" alt="Believe Studio" /></a></header>
      <main className="cb-page plain">
        <div className="cb-narrow">
          {state === 'loading' && <p role="status">Loading…</p>}
          {state === 'missing' && (
            <>
              <h1>This page isn’t available.</h1>
              <p className="cb-lead">The link may have changed, or the page may not be open yet. If you were given it at a gathering, your host can point you to the right place.</p>
            </>
          )}
          {typeof state === 'object' && (
            <>
              <p className="cb-eyebrow">From the table</p>
              <h1>A little more about what you tried.</h1>
              <p className="cb-lead">Thank you for being there. Here is the story behind {state.brands.length === 1 ? 'the brand' : 'the brands'} you met, and where to find {state.brands.length === 1 ? 'it' : 'them'} again.</p>
              {state.illustrative && <div className="cb-notice" role="status"><strong>Preview.</strong> This is an illustrative example of a guest page. The brand, story, and link are placeholders.</div>}
              {state.brands.map((b) => (
                <section key={b.name} className="cb-guest-brand" aria-label={b.name}>
                  <h2>{b.name}</h2>
                  {b.description && <p>{b.description}</p>}
                  {b.founder_story && (<><h3>From the founder</h3><p className="story">{b.founder_story}</p></>)}
                  {b.serving_idea && (<><h3>A way to serve it</h3><p>{b.serving_idea}</p></>)}
                  {b.links.length > 0 && (
                    <>
                      <h3>Where to find it</h3>
                      <div className="cb-actions" style={{ marginTop: 14 }}>
                        {b.links.map((l) => (
                          <a key={l.url} className="cb-btn small" href={tagged(l.url, state.slug)} target="_blank" rel="noopener noreferrer"
                            onClick={() => track(state.slug, 'purchase_click', l.url)}>{l.label}<span className="sr"> (opens in a new tab)</span></a>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              ))}
            </>
          )}
        </div>
      </main>
      <footer className="cb-foot">Create Believers, by <a href="/">Believe Studio</a></footer>
    </>
  )
}
