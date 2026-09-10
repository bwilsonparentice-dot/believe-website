import React, { CSSProperties } from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { CORE_TEAM, RESIDENTS, type TeamMember } from '../data'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const archRadius = '46% 46% 8px 8px / 56% 56% 6px 6px'

/** A portrait, or an architectural seat for a role whose face is not yet placed. */
function Niche({ m, size }: { m: TeamMember; size: number }) {
  const seat = !m.photo
  const w = seat ? Math.round(size * 0.9) : size
  const h = Math.round(w * 1.33)
  return (
    <div style={{
      width: w, height: h, maxWidth: '82vw', borderRadius: archRadius, overflow: 'hidden', position: 'relative', flex: '0 0 auto',
      ...(seat
        ? { background: 'linear-gradient(160deg,#ede3cd,#e6dcc1)', border: '1px solid rgba(156,122,63,0.2)', boxShadow: 'inset 0 6px 14px rgba(80,60,28,0.055)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }
        : { boxShadow: '0 40px 70px -44px rgba(60,44,20,0.55)' }),
    }}>
      {seat
        ? <div aria-hidden="true" style={{ width: 30, height: 34, border: '1.3px solid rgba(156,122,63,0.38)', borderBottom: 'none', borderRadius: '50% 50% 4px 4px / 60% 60% 3px 3px', marginTop: '26%' }} />
        : <ImageSlot src={m.photo} alt={`Portrait of ${m.name || m.role}`} placeholder={`Editorial portrait of ${m.name || m.role}`} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: m.pos || 'center 28%', filter: 'brightness(1.03)' }} />}
    </div>
  )
}

/** One core-team member — staggered, alternating side, Beth a touch larger. */
function TeamRow({ m, i }: { m: TeamMember; i: number }) {
  const rev = i % 2 === 1
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(28px,5vw,64px)', flexWrap: 'wrap', flexDirection: rev ? 'row-reverse' : 'row', margin: 'clamp(56px,9vh,116px) auto 0' }}>
      <Niche m={m} size={m.lead ? 300 : 230} />
      <div style={{ flex: '1 1 320px', minWidth: 260, maxWidth: 460, textAlign: 'left' }}>
        <div style={{ fontFamily: serif, fontWeight: 500, fontSize: m.lead ? 'clamp(34px,4.2vw,48px)' : 'clamp(30px,3.6vw,40px)', lineHeight: 1.02, color: '#2b2723' }}>{m.name || m.role}</div>
        {m.name && <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: palette.olive, margin: '16px 0 0' }}>{m.role}</div>}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px,2.6vw,30px)', lineHeight: 1.3, color: '#2b2723', maxWidth: '22ch', margin: 'clamp(16px,2.4vh,22px) 0 0', ...pretty }}>{m.values}</p>
      </div>
    </div>
  )
}

/** The People of Believe Studio — the House around the founder, revealed. */
export function PeopleChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closePeople} background="#efe6d3" dark>
      {/* the one navy moment — an immersive, confident opening */}
      <div style={{ background: palette.navy, color: palette.linen, textAlign: 'center', padding: 'clamp(96px,15vh,150px) 8vw clamp(72px,12vh,110px)' }}>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.14, maxWidth: '20ch', margin: '0 auto', ...balance }}>No founder should have to carry the whole company alone.</h2>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.3vw,26px)', lineHeight: 1.5, color: 'rgba(250,244,234,0.8)', maxWidth: '40ch', margin: 'clamp(24px,4vh,32px) auto 0', ...pretty }}>Believe brings a coordinated team around the founder, combining strategy, brand, retail, growth, operations, and experienced perspective in one House.</p>
      </div>

      {/* then cream, for the people */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(64px,10vh,120px) 6vw clamp(72px,13vh,150px)', color: '#2b2723' }}>
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: palette.olive, textAlign: 'center' }}>Who you&rsquo;ll find inside</div>

        {CORE_TEAM.map((m, i) => <TeamRow key={i} m={m} i={i} />)}

        {/* the residents — a clearly labelled but still subordinate bench, so
            the message reads: core team around you, specialist expertise in
            residence when needed */}
        <div style={{ width: 1, height: 'clamp(56px,9vh,110px)', margin: 'clamp(80px,14vh,170px) auto clamp(40px,6.5vh,76px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.5em', textTransform: 'uppercase', color: palette.olive, textAlign: 'center', marginBottom: '0.9em' }}>In Residence</div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.8)', textAlign: 'center', maxWidth: '34ch', margin: '0 auto clamp(52px,8.5vh,90px)', ...balance }}>Rotating specialist expertise, available to the House.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(40px,7vh,80px) clamp(28px,5vw,56px)' }}>
          {RESIDENTS.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(24px,3.4vw,40px)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 500 }}>
              <Niche m={m} size={152} />
              <div style={{ flex: '1 1 210px', minWidth: 190, textAlign: 'left' }}>
                <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(25px,2.9vw,33px)', lineHeight: 1.05 }}>{m.name || m.role}</div>
                <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10.5, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', margin: '13px 0 0' }}>{m.role}</div>
                <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,22px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.64)', margin: '13px 0 0', maxWidth: '26ch', ...pretty }}>{m.values}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: 1, height: 'clamp(48px,8vh,90px)', margin: 'clamp(72px,12vh,150px) auto clamp(40px,6vh,64px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.7)', textAlign: 'center', maxWidth: '24ch', margin: '0 auto clamp(44px,7vh,72px)', ...balance }}>This is the House that gathers around you.</p>
        <div style={{ textAlign: 'center' }}><BackPill onClose={ctx.closePeople} /></div>
      </div>
    </ChapterShell>
  )
}
