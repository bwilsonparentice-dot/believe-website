import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.66)',
}

const surface = (range = 'entry 2% cover 24%'): CSSProperties => ({
  animation: 'fadeUpSoft 1300ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

// The evening light of a room after the applause — the wisdom, not the spotlight.

// What changes — not features. The slow accumulation of an institution's memory.
const CHANGES = [
  'One founder becomes many.',
  'Experience becomes wisdom.',
  'Stories become guidance.',
  'Leadership becomes legacy.',
  'The work continues long after the founder leaves the room.',
]

/**
 * The Stage — where experience becomes legacy. Not public speaking; stewardship.
 * The final movement of the house: a founder who once needed belief returns
 * carrying it for the next. The quietest page — it honors what continues after
 * the spotlight fades, and it names no one. (ctx.openStage.)
 */
export function StageChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStage} background="#ebe1cb">
      {/* a soft evening light, wandering — the room after the lights go down */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(58% 44% at 50% 16%, rgba(255,228,196,0.42), transparent 68%)', animation: 'lightWander 26s ease-in-out infinite alternate' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto', padding: 'clamp(104px,20vh,260px) 7vw clamp(90px,16vh,200px)', color: '#2b2723' }}>

        {/* ── the opening — after the lights go out ─────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, fontSize: 11, marginBottom: '1.5em' }}>After the lights go out</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(46px,7vw,104px)', lineHeight: 0.98, margin: '0 0 0.32em' }}>The Stage</h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>Where experience becomes legacy.</p>
        </div>

        {/* ── the passage — spare fragments, generous air between them ──── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(110px,20vh,240px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.9)', maxWidth: '22ch', margin: '0 auto', ...balance }}>There comes a moment when what you’ve learned no longer belongs only to you.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.78)', maxWidth: '24ch', margin: 'clamp(56px,10vh,120px) auto 0', ...balance }}>Another founder is standing where you once stood.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 2, color: 'rgba(43,39,35,0.62)', maxWidth: '26ch', margin: 'clamp(36px,6vh,64px) auto 0' }}>Carrying the same questions.<br />The same uncertainty.<br />The same hope.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.62)', maxWidth: '28ch', margin: 'clamp(36px,6vh,64px) auto 0', ...balance }}>Wondering whether someone else has walked this road before.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.44, color: 'rgba(122,94,52,0.84)', margin: 'clamp(56px,10vh,120px) auto 0', maxWidth: '24ch', ...balance }}>The Stage exists for that moment.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', maxWidth: '30ch', margin: 'clamp(48px,8vh,96px) auto 0', ...balance }}>Not because every founder should stand before a crowd. Because every founder eventually carries something another founder needs.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.6)', maxWidth: '30ch', margin: 'clamp(48px,8vh,96px) auto 0' }}>Some founders speak. Some write. Some mentor.<br />Some simply share the truth they wish someone had heard earlier.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', margin: 'clamp(40px,7vh,76px) auto 0', maxWidth: '20ch', ...balance }}>The form matters less than the gift.</p>

          {/* the couplet the whole passage has been reaching toward */}
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.6vw,48px)', lineHeight: 1.2, color: '#2b2723', maxWidth: '20ch', margin: 'clamp(90px,16vh,200px) auto 0', ...balance }}>Because leadership isn’t measured only by what we build.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.44, color: 'rgba(122,94,52,0.82)', margin: 'clamp(30px,5vh,56px) auto 0', maxWidth: '22ch', ...balance }}>It’s measured by what continues because we built it.</p>
        </div>

        {/* ── what the Stage honors — lived experience, not recognition ─── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '2em' }}>What the Stage honors</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.7)', maxWidth: '30ch', margin: '0 auto', ...balance }}>Founder wisdom is often worth the most after the fact: after the success, the failure, the reinvention, sometimes even after the company has closed its doors.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.6)', maxWidth: '26ch', margin: 'clamp(40px,7vh,78px) auto 0' }}>The Stage honors lived experience.<br />Not public recognition. Not titles. Not achievements.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', margin: 'clamp(36px,6vh,68px) auto 0', maxWidth: '26ch', ...balance }}>A founder’s greatest contribution often begins after the spotlight fades.</p>
        </div>

        {/* ── what changes — each statement falls to the next, generous air ── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(40px,7vh,90px)' }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '3em' }}>What changes</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {CHANGES.map((c, i) => {
              const last = i === CHANGES.length - 1
              return (
                <React.Fragment key={i}>
                  <p style={{ fontFamily: serif, fontWeight: last ? 400 : 300, fontSize: last ? 'clamp(22px,2.8vw,36px)' : 'clamp(21px,2.5vw,32px)', lineHeight: 1.3, color: last ? '#2b2723' : 'rgba(43,39,35,0.72)', margin: '0 auto', maxWidth: last ? '20ch' : '26ch', ...balance, ...surface('entry 0% cover 20%') }}>{c}</p>
                  {!last && <div aria-hidden="true" style={{ width: 1, height: 'clamp(40px,7vh,72px)', margin: 'clamp(30px,5vh,52px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.34), rgba(122,94,52,0.06))' }} />}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* ── the invitation — no urgency, the door left open ───────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.66)', maxWidth: '26ch', margin: '0 auto' }}>Some founders come to Believe looking for clarity.<br />Some stay because they find community.<br />Some eventually return carrying wisdom.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.32, color: '#2b2723', margin: 'clamp(48px,9vh,100px) auto 0', maxWidth: '20ch', ...balance }}>When that chapter arrives, the Stage will be here.</p>

          <El
            onClick={ctx.openStories}
            style={{ display: 'inline-block', margin: 'clamp(56px,10vh,110px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.5)', borderBottom: '1px solid rgba(122,94,52,0.34)', paddingBottom: 6, cursor: 'pointer', transition: 'color 500ms ease, border-color 500ms ease' }}
            hover={{ color: 'rgba(43,39,35,0.9)', borderColor: 'rgba(43,39,35,0.6)' }}
          >
            Read Founder Stories
          </El>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(96px,16vh,190px)' }}><BackPill onClose={ctx.closeStage} label="← Back" /></div>
      </div>
    </ChapterShell>
  )
}
