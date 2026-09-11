import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import { ArchMark } from './ChapterShell'
import { ImageSlot } from './ImageSlot'
import { CORE_TEAM, type TeamMember } from '../data'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

// a door, not a button — the same quiet underlined way out used elsewhere in
// the House (Request a Place, Step further into the House).
const door: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 13, letterSpacing: '0.32em', textTransform: 'uppercase',
  color: 'rgba(43,39,35,0.9)', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(122,94,52,0.6)', padding: '0 0 7px', cursor: 'pointer',
  textDecoration: 'none', transition: 'color 500ms ease, border-color 500ms ease',
}

// the arched niche geometry, shared by portraits and seats
const archRadius = '46% 46% 7px 7px / 56% 56% 6px 6px'

/**
 * A single face in the House — a portrait for a photographed member, or an
 * architectural "seat" for a real role whose portrait isn't placed yet. The
 * seat is ~10% quieter (a touch smaller, softer fill) so it reads as a real
 * role without competing with the people whose faces are present. The crop is
 * biased toward the face so each person feels close, not distant.
 */
/** the stable People-page anchor for a member (Beth -> 'beth', etc.) */
function personAnchor(m: TeamMember): string | undefined {
  return m.name ? m.name.split(' ')[0].toLowerCase() : undefined
}

function FoyerNiche({ m, drop, onPerson }: { m: TeamMember; drop: boolean; onPerson?: (id: string) => (e?: React.MouseEvent) => void }) {
  const seat = !m.photo
  // larger on desktop so the people read as the proof; Beth only slightly
  // larger; scales down responsively so the 2-up phone layout still fits.
  // A seat reserves the SAME footprint as a real (non-lead) portrait, so a photo
  // can drop in later with zero layout shift — the quiet fill/shadow, not a
  // smaller size, is what keeps a seat subordinate.
  const w = m.lead ? 'clamp(138px,15.7vw,172px)' : 'clamp(128px,14.5vw,158px)'
  const id = personAnchor(m)

  // portrait + name + role — the whole block is the clickable target
  const inner = (
    <>
      <div className="foyer-portrait" style={{
        width: w, aspectRatio: '0.758', borderRadius: archRadius, overflow: 'hidden', position: 'relative',
        ...(seat
          ? { background: 'linear-gradient(160deg,#e7dcc4,#ded1b6)', border: '1px solid rgba(156,122,63,0.42)', boxShadow: 'inset 0 8px 20px rgba(80,60,28,0.12)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }
          : { boxShadow: '0 20px 34px -20px rgba(60,44,20,0.5)' }),
      }}>
        {seat
          ? <div aria-hidden="true" style={{ width: 24, height: 28, border: '1.4px solid rgba(156,122,63,0.6)', borderBottom: 'none', borderRadius: '50% 50% 4px 4px / 60% 60% 3px 3px', marginTop: '28%' }} />
          : <ImageSlot src={m.photo} alt={`Portrait of ${m.name || m.role}`} placeholder={`Editorial portrait of ${m.name || m.role}`} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: m.pos || 'center 28%', filter: 'brightness(1.03)' }} />}
      </div>
      <div className="foyer-name" style={{ fontFamily: serif, fontWeight: 500, fontSize: 19, lineHeight: 1.08, marginTop: 14, color: seat ? 'rgba(43,39,35,0.7)' : '#2b2723' }}>{m.name ? m.name.split(' ')[0] : m.role}</div>
      {m.name && <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: palette.olive, marginTop: 6, lineHeight: 1.35, opacity: seat ? 0.82 : 1 }}>{m.roleShort || m.role}</div>}
    </>
  )

  return (
    <div style={{ width: 'clamp(140px,16vw,176px)', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: drop ? 'translateY(clamp(16px,2vw,26px))' : 'none' }}>
      {onPerson && id
        ? <button type="button" className="foyer-person" onClick={onPerson(id)} aria-label={`Meet ${m.name} on the People page`}>{inner}</button>
        : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{inner}</div>}
    </div>
  )
}

/**
 * The Foyer — the first room of the House, and now the place the differentiator
 * is proved before the visitor chooses a path. Positioning first (a promise, the
 * capabilities, one operating line), then the reveal — "Who you'll find inside":
 * a restrained navy statement and the staggered team, so a founder understands
 * they are not hiring one advisor but entering a coordinated House. The bridge
 * line and the two doors close it. Quiet House; strong people. It reuses the
 * House's own grammar (Cormorant, cream, the arch, the palette) and adds one
 * controlled navy moment; the room is what whispers, the people are the proof.
 */
export function Foyer({ onWork, onStepInside, onPerson }: { onWork?: () => void; onStepInside?: () => void; onPerson?: (id: string) => (e?: React.MouseEvent) => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, overflowY: 'auto', background: 'linear-gradient(158deg, #f1e9d8 0%, #efe6d3 46%, #e7dcc4 100%)' }}>
      {/* the room's atmosphere — a whisper of off-frame late-afternoon light and a
          faint architectural edge, so the cream reads as lit plaster. */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(52% 46% at 30% 8%, rgba(255,240,205,0.9), transparent 60%)', opacity: 0.75, animation: 'lightWander 72s ease-in-out infinite alternate' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(270deg, rgba(80,60,28,0.05) 0%, transparent 10%), radial-gradient(60% 55% at 92% 100%, rgba(80,60,28,0.06), transparent 60%)' }} />

      <div style={{ position: 'relative', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', textAlign: 'center', padding: 'clamp(46px,7vh,80px) 8vw clamp(56px,9vh,90px)', color: '#2b2723', animation: 'contentFocus 1100ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* the mark + wordmark — you know the House the moment you arrive */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(27px,3.4vw,44px)', letterSpacing: '0.14em', lineHeight: 1 }}>Believe Studio</div>
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 'clamp(10px,1.1vw,12px)', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginTop: '1.2em' }}>A House for Founders</div>

        {/* the promise — the most confident line in the room */}
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,3.7vw,50px)', lineHeight: 1.12, color: '#2b2723', margin: 'clamp(34px,5.2vh,64px) auto 0', maxWidth: '20ch', ...balance }}>
          Build brands worth keeping.
        </p>

        {/* the capabilities — engraved into the wall, not displayed as services */}
        <div style={{ margin: 'clamp(28px,4.4vh,48px) auto 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: 'clamp(0.55em,1.8vw,1.5em)' }}>
          {['Strategy', 'Brand', 'Retail', 'Growth', 'Operations'].map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && <span aria-hidden="true" style={{ color: 'rgba(122,94,52,0.4)', fontSize: 11 }}>&middot;</span>}
              <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 'clamp(10px,1.1vw,12px)', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', whiteSpace: 'nowrap' }}>{t}</span>
            </React.Fragment>
          ))}
        </div>

        {/* one operating line — the House model, plainly */}
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.05vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.72)', margin: 'clamp(28px,4.4vh,50px) auto 0', maxWidth: '40ch', ...balance }}>
          Believe Studio brings a multidisciplinary team around CPG founders to help them see what is really happening, make stronger decisions, and build what comes next.
        </p>

        {/* ── the reveal: who you'll find inside ─────────────────────────── */}
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: palette.olive, margin: 'clamp(46px,7.2vh,78px) auto 0' }}>Who you&rsquo;ll find inside</div>

        {/* a restrained navy lintel — a strong architectural pause, two lines on
            desktop, wrapping naturally on smaller screens */}
        <div style={{ background: palette.navy, color: palette.linen, borderRadius: 2, padding: 'clamp(20px,2.6vh,24px) clamp(30px,4.4vw,50px)', margin: 'clamp(22px,3.4vh,28px) auto 0', width: 'min(500px, 92%)' }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.4vw,26px)', lineHeight: 1.34, ...balance }}>No founder should have to carry the whole company alone.</p>
        </div>

        {/* the team — larger, staggered, loose and architectural (never a grid);
            portraits present, seats for roles whose faces are not yet placed */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(12px,1.8vh,18px) clamp(24px,3.4vw,44px)', maxWidth: 640, margin: 'clamp(18px,3vh,26px) auto 0' }}>
          {CORE_TEAM.map((m, i) => <FoyerNiche key={i} m={m} drop={i % 2 === 1} onPerson={onPerson} />)}
        </div>

        {/* the founder-first bridge into the two paths */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.15vw,28px)', lineHeight: 1.42, color: 'rgba(90,68,34,0.9)', margin: 'clamp(50px,7.6vh,82px) auto 0', maxWidth: '26ch', ...balance }}>
          Because you can&rsquo;t separate the company from the person building it.
        </p>

        {/* the two choices */}
        <div style={{ margin: 'clamp(28px,4.2vh,48px) auto 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: 'clamp(28px,6vw,74px)' }}>
          <El as="button" onClick={onWork} style={door} hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}>Work with Believe &rarr;</El>
          <El as="button" onClick={onStepInside} style={door} hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}>Explore the House &rarr;</El>
        </div>
      </div>
    </div>
  )
}
