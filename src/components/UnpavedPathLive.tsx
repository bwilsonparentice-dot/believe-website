import { useEffect } from 'react'
import type { Ctx } from '../lib/ctx'

/**
 * The public Zoom REGISTRATION link for the event (not a meeting joining link).
 * Every "Save My Seat" button on the page points here; Zoom collects the
 * registration (and the optional brand details and growth question) and sends
 * the confirmation email with the attendee's own joining link. Swap this one
 * line to point the page at a different registration.
 */
export const ZOOM_REGISTRATION_URL = 'https://us06web.zoom.us/meeting/register/6yd3L2ecReSWgODDz50FYA#/registration'

// The one source of truth for the event's date. The start and end are fixed
// instants (Eastern Standard Time, UTC-5, on the day); the visible date is
// formatted from the start instant in America/New_York, so it reads the same
// for every visitor whatever their own time zone.
const EVENT_TIME_ZONE = 'America/New_York'
const EVENT_START_ISO = '2026-11-20T14:00:00-05:00'
const EVENT_END_ISO = '2026-11-20T15:00:00-05:00'
const EVENT_DATE_LABEL = new Intl.DateTimeFormat('en-US', {
  timeZone: EVENT_TIME_ZONE, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
}).format(new Date(EVENT_START_ISO))
const EVENT_TIME_LABEL = '2–3 p.m. Eastern'

const PAGE_TITLE = 'The Unpaved Path with Beth & Kendra | Believe Studio'
const PAGE_DESC = `A free, live Zoom conversation for food and beverage founders about growing your brand beyond traditional retail. ${EVENT_DATE_LABEL}, ${EVENT_TIME_LABEL}.`
const PAGE_URL = 'https://believestudio.co/the-unpaved-path/live'
// the 1200×630 link-preview card (rendered by scripts/make-unpaved-path-og.mjs)
const PAGE_IMAGE = 'https://believestudio.co/og-unpaved-path-live.jpg'
const PAGE_IMAGE_ALT = 'The Unpaved Path with Beth & Kendra. Friday, November 20, 2–3 p.m. ET, free on Zoom. Believe Studio.'

const REGISTER_NOTE = 'Register through Zoom to receive your joining link by email.'

/** Date · time · place · price, as live text (also carried by the artwork). */
function EventDetails({ tone }: { tone: 'dark' | 'light' }) {
  return (
    <p className={`up-details up-details--${tone}`}>
      <time className="up-date" dateTime={EVENT_START_ISO}>{EVENT_DATE_LABEL}</time>
      <span className="up-meta">
        <time dateTime={`${EVENT_START_ISO}/${EVENT_END_ISO}`}>{EVENT_TIME_LABEL}</time>
        {' '}&middot; Live on Zoom &middot; Free to attend
      </span>
    </p>
  )
}

/** The one action on the page: continue to Zoom's registration form. */
function SaveMySeat({ tone }: { tone: 'dark' | 'light' }) {
  return (
    <div className="up-action">
      <a className={`up-btn up-btn--${tone}`} href={ZOOM_REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
        Save My Seat<span className="up-sr"> (opens Zoom registration in a new tab)</span>
      </a>
      <p className={`up-note up-note--${tone}`}>{REGISTER_NOTE}</p>
    </div>
  )
}

/**
 * The Unpaved Path with Beth & Kendra: the registration landing page for the
 * live Zoom conversation, reached at /the-unpaved-path/live. A straightforward
 * event page in the House's own type: the headline, date, time and Save My Seat
 * sit at the top beside the approved event artwork, and registration itself
 * happens on Zoom (no form, storage or tracking here). Rendered with the House
 * header and Footer in App.
 */
export function UnpavedPathLive({ ctx: _ctx }: { ctx: Ctx }) {
  // Per-route metadata for browsers and JS-aware crawlers; non-JS crawlers read
  // the prerendered copy written by scripts/build-unpaved-path-live-og.mjs.
  useEffect(() => {
    const prevTitle = document.title
    const setAttr = (sel: string, attr: string, val: string) => {
      const el = document.head.querySelector(sel)
      if (!el) return undefined
      const prev = el.getAttribute(attr)
      el.setAttribute(attr, val)
      return () => { if (prev != null) el.setAttribute(attr, prev) }
    }
    document.title = PAGE_TITLE
    const restores = [
      setAttr('meta[name="description"]', 'content', PAGE_DESC),
      setAttr('link[rel="canonical"]', 'href', PAGE_URL),
      setAttr('meta[property="og:title"]', 'content', PAGE_TITLE),
      setAttr('meta[property="og:description"]', 'content', PAGE_DESC),
      setAttr('meta[property="og:url"]', 'content', PAGE_URL),
      setAttr('meta[property="og:image"]', 'content', PAGE_IMAGE),
      setAttr('meta[property="og:image:alt"]', 'content', PAGE_IMAGE_ALT),
      setAttr('meta[name="twitter:image"]', 'content', PAGE_IMAGE),
      setAttr('meta[name="twitter:title"]', 'content', PAGE_TITLE),
      setAttr('meta[name="twitter:description"]', 'content', PAGE_DESC),
    ]
    return () => { document.title = prevTitle; restores.forEach((r) => r && r()) }
  }, [])

  return (
    <main className="up-main">

      {/* ── 1 · Hero: headline, event, details and the action; the artwork beside ── */}
      <section className="up-hero" aria-labelledby="up-headline">
        <div className="up-hero-grid">
          <div className="up-hero-copy">
            <p className="up-for">For food and beverage founders with products already in market.</p>
            <h1 id="up-headline" className="up-h1">
              <span>You built something different.</span>{' '}
              <span className="up-h1-gold">Why chase the same shelves?</span>
            </h1>
            <div className="up-rule" aria-hidden="true" />
            <p className="up-event">The Unpaved Path <em>with Beth &amp; Kendra</em></p>
            <p className="up-intro">A live, interactive conversation about growing your food or beverage brand beyond traditional retail.</p>
            <EventDetails tone="dark" />
            <SaveMySeat tone="dark" />
          </div>
          {/* the event artwork cropped just below the host credentials: its date
              strip is carried by the live text beside it, not the image */}
          <figure className="up-art">
            <img
              src="/photos/unpaved-path-live-hosts.webp"
              srcSet="/photos/unpaved-path-live-hosts-720.webp 720w, /photos/unpaved-path-live-hosts.webp 1122w"
              sizes="(max-width: 899px) min(88vw, 440px), min(40vw, 480px)"
              width={1122}
              height={1110}
              alt="The Unpaved Path event graphic featuring hosts Beth Wilson-Parentice and Kendra Bennett."
              decoding="async"
              // @ts-expect-error React 18 expects the lowercase attribute name
              fetchpriority="high"
            />
          </figure>
        </div>
      </section>

      {/* ── 2 · The Sipp story and the invitation ───────────────────────── */}
      <section className="up-sec" aria-labelledby="up-invite">
        <p className="up-body">When Sipp Sparkling Organics plateaued in specialty stores, Beth started looking beyond retail buyers and calling hotel food and beverage executives. One was looking for a welcome amenity. That call changed the company&rsquo;s trajectory.</p>
        <h2 id="up-invite" className="up-h2">This hour is about finding your version of that call.</h2>
        <p className="up-body">Join founders Beth Wilson-Parentice and Kendra Bennett for a free, guided conversation for food and beverage founders with products already in market.</p>
        <p className="up-body">We&rsquo;ll each share one short story about an unexpected route to growth. Then we&rsquo;ll open the conversation to real founder questions, drawing on our experience and what others in the room have learned.</p>
      </section>

      {/* ── 3 · The shared question ─────────────────────────────────────── */}
      <section className="up-sec" aria-labelledby="up-belong">
        <div className="up-hair" aria-hidden="true" />
        <p className="up-body">Building a brand can feel lonely when the familiar routes stop working. Come sit with founders asking the same question:</p>
        <h2 id="up-belong" className="up-h2 up-h2--after">Where else could this belong?</h2>
        <p className="up-body">Bring a challenge, share something you&rsquo;ve learned, or simply listen. Expect honest conversation, practical experience, and founders helping founders find a next step.</p>
        <SaveMySeat tone="light" />
      </section>

      {/* ── 4 · The hosts ───────────────────────────────────────────────── */}
      <section className="up-sec up-sec--wide" aria-labelledby="up-hosts">
        <div className="up-hair" aria-hidden="true" />
        <h2 id="up-hosts" className="up-eyebrow">Your hosts</h2>
        <div className="up-hosts">
          <div className="up-host">
            <h3>Beth Wilson-Parentice</h3>
            <ul>
              <li>Founder, Sipp Sparkling Organics &amp; Believe Studio</li>
              <li>Beverage World Award Winner</li>
            </ul>
          </div>
          <div className="up-host">
            <h3>Kendra Bennett</h3>
            <ul>
              <li>Founder, Bon Bee Honey</li>
              <li>Shark Tank Alum</li>
              <li>CPG Growth Strategist</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5 · Register ────────────────────────────────────────────────── */}
      <section className="up-sec up-final" aria-labelledby="up-register">
        <div className="up-card">
          <h2 id="up-register" className="up-h2">Bring your brand. Bring your biggest growth question.</h2>
          <p className="up-body">When you register, tell us a little about your brand and the question you&rsquo;d love us to explore.</p>
          <EventDetails tone="light" />
          <SaveMySeat tone="light" />
        </div>
      </section>
    </main>
  )
}
