import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import { ArchMark } from './ChapterShell'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

// the three areas of work — set the way the six principles are set elsewhere in
// the House: small, wide-tracked, brass, engraved into the wall rather than
// displayed as offerings. No cards, no icons, no descriptions.
const engrave: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 'clamp(10px,1.15vw,12px)', letterSpacing: '0.42em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', whiteSpace: 'nowrap',
}

// a door, not a button — the same quiet underlined way out used elsewhere in
// the House (Request a Place, Step further into the House).
const door: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase',
  color: 'rgba(43,39,35,0.74)', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(122,94,52,0.45)', padding: '0 0 6px', cursor: 'pointer',
  textDecoration: 'none', transition: 'color 500ms ease, border-color 500ms ease',
}

/**
 * The Foyer — the first physical space of the House.
 *
 * Not a homepage, not a hero, not a services page, not a landing page: the
 * front room, where a founder arrives and, within a breath, understands where
 * they are and sees the two ways in. Clarity first; depth second. Deliberately
 * almost empty — a plain confident line, four disciplines engraved into the
 * architecture, one supporting sentence, two doors, and a quiet founder-first
 * inscription beneath the choices. It reuses the House's own grammar
 * (Cormorant, cream, the brass arch mark, the engraved principles) rather than
 * inventing a new visual language. The words are direct; the room is what
 * whispers.
 *
 * Rendered behind the ?foyer flag (or /foyer) for review; it never
 * auto-advances. The doors are inert here — wiring them into the live entrance
 * is a later pass.
 */
export function Foyer({ onWork, onStepInside }: { onWork?: () => void; onStepInside?: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#efe6d3', overflowY: 'auto' }}>
      {/* the room's light — a single soft shaft from above, so the cream reads
          as an architectural surface rather than a flat field */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(46% 40% at 50% 10%, rgba(255,238,205,0.55), transparent 62%)' }} />

      <div style={{ position: 'relative', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(48px,8vh,100px) 8vw', color: '#2b2723', animation: 'contentFocus 1100ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* the mark + wordmark — you know the House the moment you arrive */}
        <ArchMark width={2.2} margin="0 auto 1.7em" />
        <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(27px,3.4vw,44px)', letterSpacing: '0.14em', lineHeight: 1 }}>Believe Studio</div>
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 'clamp(10px,1.1vw,12px)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginTop: '1.3em' }}>A House for Founders</div>

        {/* the plain answer to "what is this?" — the most confident line in the
            room, and the fastest thing to read */}
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.5vw,48px)', lineHeight: 1.12, color: '#2b2723', margin: 'clamp(40px,6.5vh,86px) auto 0', maxWidth: '30ch', ...balance }}>
          We help founder-led brands grow.
        </p>

        {/* the disciplines — engraved into the wall, not displayed as offerings */}
        <div style={{ margin: 'clamp(34px,5.6vh,68px) auto 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: 'clamp(0.7em,2.4vw,2.2em)' }}>
          {['Brand', 'Sales', 'Retail', 'Marketing'].map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && <span aria-hidden="true" style={{ color: 'rgba(122,94,52,0.4)', fontSize: 11 }}>&middot;</span>}
              <span style={engrave}>{t}</span>
            </React.Fragment>
          ))}
        </div>

        {/* how we help — plain and confident, not poetic */}
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.05vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.72)', margin: 'clamp(30px,5vh,58px) auto 0', maxWidth: '34ch', ...balance }}>
          We work alongside founders to solve what&rsquo;s stuck, uncover opportunities others miss, and help make the next move happen.
        </p>

        {/* the two choices — the Foyer's only real decision */}
        <div style={{ margin: 'clamp(40px,6.5vh,86px) auto 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: 'clamp(28px,6vw,74px)' }}>
          <El as="button" onClick={onWork} style={door} hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}>Work with Believe &rarr;</El>
          <El as="button" onClick={onStepInside} style={door} hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}>Explore the House &rarr;</El>
        </div>

        {/* the founder-first distinction — a quiet inscription beneath the
            choices, so it never delays the clarity or the decision above it */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.6vw,20px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.66)', margin: 'clamp(34px,5.5vh,68px) auto 0', maxWidth: '30ch', ...balance }}>
          Because you can&rsquo;t separate the company from the person building it.
        </p>
      </div>
    </div>
  )
}
