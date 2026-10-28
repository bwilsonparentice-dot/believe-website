import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

const eyebrow: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.36em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)',
}
const body: CSSProperties = {
  fontFamily: serif, fontWeight: 400, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.6,
  color: 'rgba(43,39,35,0.82)', ...pretty,
}
// the quiet underlined door, reused from the House grammar (see Home.tsx)
const ghost: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase',
  color: 'rgba(43,39,35,0.82)', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.55)',
  padding: '0 0 7px', cursor: 'pointer',
}

// The three-step practice. Each step is a short imperative title answered by the
// one question it asks — set as a calm editorial list with hairline rules, in
// the same grammar as "How we help" on the homepage.
const STEPS: { t: string; q: string }[] = [
  { t: 'Name the yes.', q: 'What do you want to make possible?' },
  // house style keeps customer-facing copy free of em dashes: the original
  // "settled—and" becomes a comma here.
  { t: 'Check the no.', q: 'What are you treating as settled? What do you actually know?' },
  { t: 'Make your move.', q: 'What meaningful step would help you find out?' },
]

/**
 * Believe in the Yes (BITY) — the thinking behind Believe Studio, placed after
 * the services ("How we help") and the client work (Good Company) and before
 * the closing archway. The approved bity-tote photograph sits beside the copy;
 * it already carries the gold "bity" wordmark, so no second logo is added. The
 * image is shown as a full, uncropped frame (plate treatment) so the woman and
 * the whole tote logo stay visible on every screen, stacking above the copy on
 * mobile. Type, colour and spacing follow the homepage exactly.
 */
export function BelieveInTheYes({ ctx }: { ctx: Ctx }) {
  return (
    <section className="bity" aria-label="Believe in the Yes">
      <div className="bity__grid">
        <figure className="bity__photo bity-photo-reveal">
          <img
            src="/photos/bity-tote.webp"
            alt="A woman walking a sunlit city street carries a navy Believe Studio tote with the gold bity wordmark, in a cream linen shirt and trousers"
            loading="lazy"
          />
        </figure>

        <div className="bity__copy bity-copy-reveal">
          <div style={eyebrow}>The thinking behind Believe Studio</div>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(34px,4.8vw,60px)', lineHeight: 1.04, letterSpacing: '-0.01em', color: palette.navy, margin: 'clamp(18px,2.6vh,26px) 0 0', ...balance }}>Believe in the Yes.</h2>

          <p style={{ ...body, margin: 'clamp(24px,3.6vh,34px) 0 0', maxWidth: '44ch' }}>Sometimes an opportunity gets ruled out before it&rsquo;s explored.</p>
          <p style={{ ...body, margin: 'clamp(14px,2vh,18px) 0 0', maxWidth: '46ch' }}>A partnership feels out of reach. A customer seems unlikely. An idea gets put aside before anyone finds out whether it could work.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.7)', margin: 'clamp(20px,3vh,28px) 0 0', maxWidth: '36ch' }}>BITY is a simple practice for that moment.</p>

          <div className="bity__steps">
            {STEPS.map((s) => (
              <div className="bity__step" key={s.t}>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(22px,2.5vw,32px)', lineHeight: 1.05, color: palette.ink, margin: 0 }}>{s.t}</h3>
                <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,21px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.85)', margin: '0.5em 0 0', maxWidth: '40ch', ...pretty }}>{s.q}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.7)', margin: 'clamp(22px,3.4vh,32px) 0 0', maxWidth: '42ch', ...pretty }}>Then learn from what happens and choose what comes next.</p>

          <p style={{ ...body, margin: 'clamp(26px,4vh,40px) 0 0', maxWidth: '46ch' }}>This is part of how we work with founders: bringing imagination, experience, and commercial judgment to the possibilities worth pursuing.</p>

          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(23px,2.9vw,38px)', lineHeight: 1.14, color: palette.navy, margin: 'clamp(30px,4.6vh,52px) 0 0', maxWidth: '20ch', ...balance }}>What would you do next if a yes were possible?</p>

          <El as="button" onClick={ctx.openConversation} style={{ ...ghost, display: 'inline-block', marginTop: 'clamp(26px,4vh,40px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Explore your next move with Beth &rarr;</El>
        </div>
      </div>
    </section>
  )
}
