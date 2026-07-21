import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { Keynote } from '../components/Living'
import { STAGE_MOMENTS, STAGE_GALLERY } from '../data'

/** The Stage — where the quiet work of the house meets the world. */
export function StageChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStage} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(100px,18vh,220px) 6vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723' }}>
        <Keynote>Your quiet work becomes visible, in time.</Keynote>

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '2em' }}>The Stage</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(34px,5.2vw,74px)', lineHeight: 1.08, margin: '0 auto', maxWidth: '22ch' }}>Every meaningful company eventually steps into the light.</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', margin: '1.4em auto 0', maxWidth: '28ch' }}>Not because it seeks attention. Because the work is ready to be seen.</p>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(52px,9vh,100px) auto" />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.68)', maxWidth: '32ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Some founders step onto a stage. Some onto a trade show floor. Some into a buyer’s office. Some behind a microphone. Some onto a retail shelf.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '1.4em auto 0', maxWidth: '30ch' }}>Every milestone looks different. But each one begins long before anyone is watching.</p>

        <Divider h="clamp(50px,9vh,100px)" m="clamp(52px,9vh,100px) auto" />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.66)', maxWidth: '34ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>The Stage is where the quiet work inside Believe Studio meets the world. Where conversations become launches. Ideas become products. Introductions become partnerships. Belief becomes momentum. Some moments are celebrated publicly. Others are remembered quietly. Both belong here.</p>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(52px,9vh,100px) auto" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(52px,9vh,100px)' }}>
          {STAGE_MOMENTS.map((m, i) => (
            <div key={i} style={{ maxWidth: '34ch', margin: '0 auto' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.06, margin: '0 0 0.4em' }}>{m.k}</h3>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{m.b}</p>
            </div>
          ))}
        </div>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(52px,9vh,100px) auto" />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.6vw,60px)', lineHeight: 1.16, color: 'rgba(43,39,35,0.94)', maxWidth: '18ch', margin: '0 auto' }}>Every founder deserves a stage. Not to perform. To be remembered.</p>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(52px,9vh,100px) auto" />

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '1.2em' }}>The artifact</div>
        <svg width="34" height="34" viewBox="0 0 60 60" fill="none" style={{ display: 'block', margin: '0 auto 1em', opacity: 0.7 }}>
          <circle cx="30" cy="30" r="12" stroke="#9c7a3f" strokeWidth="2" />
          <circle cx="30" cy="30" r="4" fill="#c8a24e" />
        </svg>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.04, margin: '0 0 0.4em' }}>The Spotlight</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.8)', margin: '0 auto 1.2em', maxWidth: '26ch' }}>Not bright. Not theatrical. Just enough light to reveal what has quietly been built.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.62)', maxWidth: '32ch', margin: '0 auto' }}>Recognition is never the goal. It is simply what happens when meaningful work becomes impossible to overlook.</p>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(52px,9vh,100px) auto" />

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '2em' }}>A gallery, still being filled</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 'clamp(18px,2.4vw,30px)', textAlign: 'left' }}>
          {STAGE_GALLERY.map((g, i) => (
            <ImageSlot key={i} placeholder={g} style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', background: '#f5efe1', borderRadius: '120px 120px 4px 4px' }} />
          ))}
        </div>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(52px,9vh,100px) auto" />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.3, color: '#2b2723', maxWidth: '22ch', margin: '0 auto 0.5em' }}>Long before anyone applauds, someone first has to believe.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.78)', margin: '0 auto clamp(44px,8vh,90px)', maxWidth: '28ch' }}>Everything inside this house exists to help founders reach that moment.</p>
        <BackPill onClose={ctx.closeStage} label="See What’s Unfolding →" />
      </div>
    </ChapterShell>
  )
}
