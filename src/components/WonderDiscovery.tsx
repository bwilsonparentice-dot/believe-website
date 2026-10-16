import React from 'react'
import { createPortal } from 'react-dom'
import '../wonder.css'

/**
 * WONDER — the publication of the House, discovered within The Library.
 *
 * The feature renders inline as a Library collection: a printed copy of WONDER
 * resting on the studio table. Picking it up lifts the copy and opens the
 * full-screen reader (cover → contents → founding essay), which is portalled
 * above everything so The Library keeps its exact scroll position behind it —
 * closing the reader returns the visitor precisely where they were.
 *
 * Accessibility: the copy is a real button; the reader traps Escape (so it
 * never closes The Library underneath), arrows turn pages outside the essay,
 * inert is applied to the pages not in front, and a reduced-motion visitor gets
 * the same reading with the page-turn and lift animations removed. Forthcoming
 * articles are clearly marked and non-interactive until they are published.
 */

const WORD = '/photos/wonder-word.png'
const WORD_NAVY = '/photos/wonder-word-navy.png'
const DOORIMG = '/photos/wonder-door.webp'
const FLORENCE = '/photos/wonder-florence.webp'
const TERRACE = '/photos/wonder-terrace.webp'

const prefersReducedMotion = () => {
  try { return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}

function Cover() {
  return (
    <div className="wndr-cover">
      <div className="veil" />
      <div className="c-in">
        <img className="c-mark-img" src={WORD} alt="WONDER" />
        <div className="c-issue">Issue 001 &middot; The Art of Possibility</div>
        <div className="c-feature">
          <div className="c-ft-k">The Founding Essay</div>
          <div className="c-ft-t">The Doors We Dare to Open</div>
          <div className="c-ft-b">by Beth Wonder</div>
          <div className="c-open">Open the issue<span>&rarr;</span></div>
        </div>
      </div>
      <div className="shade" />
    </div>
  )
}

function Contents({ onReadEssay }: { onReadEssay: () => void }) {
  const key = (e: React.KeyboardEvent, fn: () => void) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn() } }
  return (
    <div className="wndr-vscroll">
      <div className="wndr-sheet">
        <div className="wndr-toc-wordmark"><img src={WORD_NAVY} alt="WONDER" /></div>
        <div className="wndr-runhead"><span>An editorial publication by Beth Wonder</span><span>The Art of Possibility</span></div>
        <h2 className="wndr-toc-h">Contents</h2>
        <div className="wndr-toc-sub">Issue 001</div>
        <ul className="wndr-toc">
          <li className="wndr-tocfeat" tabIndex={0} role="button" aria-label="Read the founding essay, The Doors We Dare to Open" onClick={onReadEssay} onKeyDown={(e) => key(e, onReadEssay)}>
            <div className="wndr-entry">
              <div>
                <div className="wndr-dept">The Founding Essay</div>
                <div className="wndr-ttl">The Doors We Dare to Open</div>
                <div className="wndr-byl">Beth Wonder &mdash; on curiosity, possibility, and what lies beyond &nbsp;&middot;&nbsp; <span className="wndr-go">Read &rarr;</span></div>
              </div>
            </div>
          </li>
        </ul>
        <div className="wndr-toc-section">In development &middot; planned for WONDER</div>
        <ul className="wndr-toc" aria-label="Forthcoming in WONDER">
          {[
            { dept: 'Believe Beyond Borders', ttl: 'A Table in Florence', byl: 'People, places, and possibilities — the travel & discovery department' },
            { dept: 'In Residence', ttl: 'The Observatory: Notes on Looking Up', byl: 'What’s next, and the discipline of noticing it early' },
            { dept: 'In Conversation', ttl: 'Founders Who Opened Doors', byl: 'Three builders on the thresholds they crossed before anyone agreed' },
          ].map((a) => (
            <li className="wndr-fc" key={a.ttl} aria-disabled="true">
              <div className="wndr-entry">
                <div>
                  <div className="wndr-dept">{a.dept}</div>
                  <div className="wndr-ttl">{a.ttl}</div>
                  <div className="wndr-byl">{a.byl}</div>
                </div>
                <div className="wndr-status">Forthcoming</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="wndr-colophon">
          <b>WONDER</b> is published by Believe Studio.<br />Editor, Beth Wonder &middot; Issue 001 &mdash; The Art of Possibility
        </div>
      </div>
      <div className="shade" />
    </div>
  )
}

function Essay({ scrollRef, onBack }: { scrollRef: React.RefObject<HTMLDivElement>; onBack: () => void }) {
  return (
    <div className="wndr-vscroll" ref={scrollRef}>
      <div className="wndr-essay">
        <div className="ehero"><img src={DOORIMG} alt="A dusty-rose Georgian front door in London, flanked by topiaries under a glowing fanlight" /><div className="eh-v" /></div>
        <div className="wndr-ewrap">
          <div className="ehead">
            <div className="ek">The Founding Essay</div>
            <h1 className="et">The Doors We Dare to Open</h1>
            <p className="ed">On curiosity, possibility, and the beautiful mystery of what lies beyond.</p>
            <div className="eby">By Beth Wonder &middot; Editor</div>
          </div>
        </div>
        <div className="wndr-ebody">
          <p className="drop">I have always been a little in love with beautiful doors &mdash; with the pause they ask of you. Travelling through London, Paris, and Ireland, I would stop to photograph them: the colours someone had been brave enough to choose, the small architectural flourishes, the quiet confidence of an entrance. I was never really photographing the door. I was wondering who lived behind it &mdash; what their life was like, and what extraordinary thing might be waiting on the other side.</p>
          <p>A beautiful door is an invitation to imagine. Someone decided that an ordinary street deserved a colour worth remembering, that a threshold should promise something before a single word is spoken. I have lingered a little too long in front of more of them than was polite, imagining the rooms beyond &mdash; and loving that I would never quite know.</p>
          <blockquote className="wndr-pull">A door is the only promise a building makes before you step inside.</blockquote>
          <p>This is what I love about them, and what WONDER is built upon. A door tells you nothing certain and everything hopeful. It is possibility with a handle. Belief, to me, is simply the willingness to reach for it &mdash; the half-second between the hand on the brass and the room beyond. It is the spirit behind everything we make.</p>
          <figure className="wndr-efig"><img src={FLORENCE} alt="A caf&eacute; table above the rooftops of Florence, a journal and sunglasses beside a coffee" /><figcaption>Believe Beyond Borders &middot; the appetite for what&rsquo;s next</figcaption></figure>
          <p>Founders live their whole working lives in that half-second. You have built something real &mdash; and still the question waits politely at the end of the hall: what could it become? WONDER is our answer, published for anyone who has ever slowed down in front of a beautiful, closed thing.</p>
          <p>In the issues to come, WONDER will wander &mdash; through cities and down quiet streets, after the colours and doorways that make us wonder what lies beyond. We hope to sit with founders who opened doors no one told them were there, and to keep asking the only question worth asking of a threshold. Our own door is a dusty rose &mdash; chosen, not inherited &mdash; and it is simply where we begin.</p>
          <p>There is always another door. I hope we never stop wondering what&rsquo;s behind it.</p>
          <div className="wndr-esig">&mdash; Beth Wonder</div>

          <div className="wndr-ebbb">
            <img src={TERRACE} alt="A candlelit table on a Mediterranean terrace at dusk" />
            <div>
              <div className="k">Also in this issue &middot; Believe Beyond Borders</div>
              <div className="t">A Table in Florence</div>
              <div className="d">On wandering, long lunches, and the places that remind a founder why they started. A recurring department of people, places, and possibilities.</div>
            </div>
          </div>
        </div>
        <div className="wndr-eend">
          <div className="wndr-esub">New issues of WONDER arrive first on Substack. <span aria-label="Subscribe — available once WONDER launches on Substack" title="Available once WONDER launches on Substack">Subscribe</span></div>
          <button className="wndr-eend-back" onClick={onBack}>Return to Contents</button>
        </div>
      </div>
      <div className="shade" />
    </div>
  )
}

export function WonderDiscovery() {
  const [open, setOpen] = React.useState(false)
  const [lifting, setLifting] = React.useState(false)
  const [view, setView] = React.useState(0) // 0 cover · 1 contents · 2 essay
  const magRef = React.useRef<HTMLButtonElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const essayScrollRef = React.useRef<HTMLDivElement>(null)
  const viewRefs = [React.useRef<HTMLElement>(null), React.useRef<HTMLElement>(null), React.useRef<HTMLElement>(null)]
  const liftTimer = React.useRef<number | undefined>(undefined)

  const doOpen = () => {
    if (prefersReducedMotion()) { setView(0); setOpen(true); return }
    setLifting(true)
    liftTimer.current = window.setTimeout(() => { setView(0); setOpen(true); setLifting(false) }, 260)
  }
  const doClose = React.useCallback(() => {
    setOpen(false)
    window.setTimeout(() => magRef.current?.focus({ preventScroll: true }), 0)
  }, [])

  // focus the close control on open; reset essay scroll when it comes to front
  React.useEffect(() => { if (open) closeRef.current?.focus({ preventScroll: true }) }, [open])
  React.useEffect(() => { if (view === 2 && essayScrollRef.current) essayScrollRef.current.scrollTop = 0 }, [view])

  // keep the pages not in front out of the tab order / interaction
  React.useEffect(() => {
    viewRefs.forEach((r, i) => { if (r.current) (r.current as unknown as { inert: boolean }).inert = !open || i !== view })
  })

  // keyboard: Escape closes the reader (captured so it never bubbles to the
  // App's chapter-close for The Library); arrows turn pages outside the essay
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopImmediatePropagation(); e.preventDefault(); doClose(); return }
      if (view === 2) return
      if (e.key === 'ArrowRight') { e.stopImmediatePropagation(); setView((v) => Math.min(2, v + 1)) }
      else if (e.key === 'ArrowLeft') { e.stopImmediatePropagation(); setView((v) => Math.max(0, v - 1)) }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, view, doClose])

  React.useEffect(() => () => { if (liftTimer.current) window.clearTimeout(liftTimer.current) }, [])

  const coverKey = (e: React.KeyboardEvent) => { if ((e.key === 'Enter' || e.key === ' ') && view === 0) { e.preventDefault(); setView(1) } }

  const reader = (
    <div className={`wndr-reader${open ? ' open' : ''}`} aria-hidden={open ? undefined : true}>
      <header className={`wndr-rheader${view === 0 ? ' on-cover' : ''}`}>
        <div className="wndr-rh-left">
          <button className="wndr-rh-back" hidden={view !== 2} onClick={() => setView(1)}>&lsaquo;&nbsp;Contents</button>
          <img className="wndr-rh-mark-img navy" src={WORD_NAVY} alt="WONDER" />
          <img className="wndr-rh-mark-img ivory" src={WORD} alt="" aria-hidden="true" />
          <span className="wndr-rh-iss">Issue 001</span>
        </div>
        <button className="wndr-rh-close" ref={closeRef} onClick={doClose} aria-label="Close WONDER">Close</button>
      </header>

      <div className="wndr-book">
        {/* essay (bottom of the stack) */}
        <article className={`wndr-view${view > 2 ? ' turned' : ''}`} ref={viewRefs[2] as React.RefObject<HTMLElement>} style={{ zIndex: 1 }}>
          <Essay scrollRef={essayScrollRef} onBack={() => setView(1)} />
        </article>
        {/* contents (middle) */}
        <article className={`wndr-view${view > 1 ? ' turned' : ''}`} ref={viewRefs[1] as React.RefObject<HTMLElement>} style={{ zIndex: 2 }}>
          <Contents onReadEssay={() => setView(2)} />
        </article>
        {/* cover (top) */}
        <article
          className={`wndr-view${view > 0 ? ' turned' : ''}`}
          ref={viewRefs[0] as React.RefObject<HTMLElement>}
          style={{ zIndex: 3, cursor: 'pointer' }}
          role="button"
          tabIndex={view === 0 ? 0 : -1}
          aria-label="Open the issue"
          onClick={() => { if (view === 0) setView(1) }}
          onKeyDown={coverKey}
        >
          <Cover />
        </article>
      </div>
    </div>
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)' }}>The publication of the House</div>
      <img src={WORD_NAVY} alt="WONDER" style={{ display: 'block', width: 'min(65%,335px)', height: 'auto', margin: 'clamp(16px,2.4vw,26px) auto clamp(6px,1vw,12px)' }} />
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.82)' }}>An editorial publication by Beth Wonder.</div>

      <button className="wndr-feature" ref={magRef} onClick={doOpen} aria-label="Open WONDER, Issue 001 — the founding essay">
        <div className={`wndr-tbl${lifting ? ' opening' : ''}`}>
          <span className="wndr-pick">Pick it up &rarr;</span>
        </div>
        <span className="wndr-cue">Open WONDER &middot; Issue 001 &rarr;</span>
      </button>

      {typeof document !== 'undefined' && createPortal(reader, document.body)}
    </div>
  )
}
