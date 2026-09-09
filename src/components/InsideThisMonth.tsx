import React from 'react'
import { HOUSE_THIS_MONTH, HOUSE_MONTH } from '../data'

/**
 * Inside the House this month — proof of life.
 *
 * A small, living record that the House is occupied right now: a room in
 * session, a workshop upcoming, someone in residence, blueprint reveals. Set in
 * the Library's own grammar (brass eyebrow, serif title, editorial rows — no
 * cards, no icons, no dashboard), so it reads as a page in the House rather than
 * a status widget. The one flicker of motion is a gently breathing dot beside
 * anything in session now. Entirely data-driven (HOUSE_THIS_MONTH), so it is
 * updated by editing that array, and it can be relocated without changes.
 */

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"

export function InsideThisMonth() {
  const month = HOUSE_MONTH
  return (
    <section aria-label="Inside the House this month">
      <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Inside the House</div>
      <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>This month</h3>
      <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '34ch', margin: '0 auto clamp(56px,10vh,110px)' }}>
        What&rsquo;s alive in the House right now{month ? ` — ${month}` : ''}.
      </p>

      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
        {HOUSE_THIS_MONTH.map((it, i) => (
          <div key={i} style={{ borderTop: i > 0 ? '1px solid rgba(122,94,52,0.18)' : 'none', marginTop: i > 0 ? 'clamp(26px,4.4vh,44px)' : 0, paddingTop: i > 0 ? 'clamp(26px,4.4vh,44px)' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', marginBottom: '0.7em' }}>
              {it.live && <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(122,94,52,0.9)', flex: '0 0 auto', animation: 'glowPulse 2.8s ease-in-out infinite' }} />}
              <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)' }}>{it.status}</span>
            </div>
            <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(21px,2.5vw,31px)', lineHeight: 1.14, color: '#2b2723' }}>{it.name}</div>
            {it.detail && <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.62)', margin: '0.6em 0 0' }}>{it.detail}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
