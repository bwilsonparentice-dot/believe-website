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

// The three-step practice, now a full-width editorial index: a muted-gold
// numeral, the imperative title, and the single question it asks. house style
// keeps customer-facing copy free of em dashes (the original "settled—and").
const STEPS: { n: string; t: string; q: string }[] = [
  { n: '01', t: 'Name the yes.', q: 'What do you want to make possible?' },
  { n: '02', t: 'Check the no.', q: 'What are you treating as settled? What do you actually know?' },
  { n: '03', t: 'Make your move.', q: 'What meaningful step would help you find out?' },
]

/**
 * Believe in the Yes (BITY) — the thinking behind Believe Studio, placed after
 * the services ("How we help") and the client work (Good Company) and before
 * the closing archway. Three editorial bands: an introduction with the tote
 * photograph beside it; the three steps as a full-width, three-column
 * framework; and a centred close that gives the final question its own moment.
 * The photograph (which already carries the gold "bity" wordmark, so no second
 * logo is added) accompanies only the introduction. Type, colour and spacing
 * follow the homepage tokens.
 */
export function BelieveInTheYes({ ctx }: { ctx: Ctx }) {
  return (
    <section className="bity" aria-label="Believe in the Yes">
      {/* 1 · Introduction — the photograph accompanies only the intro */}
      <div className="bity__intro">
        <figure className="bity__photo bity-photo-reveal">
          <img
            src="/photos/bity-tote.webp"
            alt="A woman walking a sunlit city street carries a navy Believe Studio tote with the gold bity wordmark, in a cream linen shirt and trousers"
            loading="lazy"
          />
        </figure>

        <div className="bity__introcopy bity-copy-reveal">
          <div style={eyebrow}>The thinking behind Believe Studio</div>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(34px,4.8vw,60px)', lineHeight: 1.04, letterSpacing: '-0.01em', color: palette.navy, margin: 'clamp(18px,2.6vh,26px) 0 0', ...balance }}>Believe in the Yes.</h2>
          <p style={{ ...body, margin: 'clamp(24px,3.4vh,32px) 0 0', maxWidth: '42ch' }}>Sometimes an opportunity gets ruled out before it&rsquo;s explored.</p>
          <p style={{ ...body, margin: 'clamp(14px,2vh,18px) 0 0', maxWidth: '44ch' }}>A partnership feels out of reach. A customer seems unlikely. An idea gets put aside before anyone finds out whether it could work.</p>
          {/* a delicate muted-gold line bridges the intro into the practice */}
          <div aria-hidden="true" style={{ width: 44, height: 1, background: 'rgba(122,94,52,0.5)', margin: 'clamp(22px,3.4vh,32px) 0 clamp(15px,2.2vh,20px)' }} />
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.9)', margin: 0, maxWidth: '34ch' }}>BITY is a simple practice for that moment.</p>
        </div>
      </div>

      {/* 2 · The three steps — a full-width editorial framework, hairline-ruled */}
      <ol className="bity__steps">
        {STEPS.map((s) => (
          <li className="bity__step" key={s.n}>
            <div className="bity__num" aria-hidden="true">{s.n}</div>
            <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(22px,2.3vw,30px)', lineHeight: 1.05, color: palette.ink, margin: 0 }}>{s.t}</h3>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.7vw,20px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.85)', margin: 'clamp(12px,1.8vh,18px) auto 0', maxWidth: '24ch', ...pretty }}>{s.q}</p>
          </li>
        ))}
      </ol>

      {/* 3 · Closing — the bridge lines, then the question as its own moment */}
      <div className="bity__close">
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.72)', maxWidth: '34ch', margin: '0 auto', ...balance }}>Then learn from what happens and choose what comes next.</p>
        <p style={{ ...body, maxWidth: '46ch', margin: 'clamp(22px,3.4vh,34px) auto 0', textAlign: 'center' }}>This is part of how we work with founders: bringing imagination, experience, and commercial judgment to the possibilities worth pursuing.</p>

        <div className="bity__question">
          <div aria-hidden="true" className="bity__tick" />
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: palette.navy, maxWidth: '24ch', margin: '0 auto', ...balance }}>What would you do next if a yes were possible?</p>
        </div>

        <El as="button" onClick={ctx.openConversation} style={{ ...ghost, display: 'inline-block', marginTop: 'clamp(32px,5vh,52px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Explore your next move with Beth &rarr;</El>
      </div>
    </section>
  )
}
