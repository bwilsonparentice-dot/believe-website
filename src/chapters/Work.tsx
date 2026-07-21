import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill } from '../components/ChapterShell'

/** Work with Believe Studio — the four paths, and the collective between visits. */
export function WorkChapter({ ctx }: { ctx: Ctx }) {
  const workPaths = [
    { no: '01', title: 'Believe Blueprint™', forWhom: 'For founders seeking clarity before action.', body: 'A one-time engagement. A custom strategic architecture for what you’re building.', cta: 'Begin Your Blueprint', go: ctx.openBlueprint },
    { no: '02', title: 'The Founder’s Room', forWhom: 'For founders building over time.', body: 'An ongoing partnership with a weekly rhythm. Your Blueprint evolves, private conversations continue, and Resident Experts join along the way.', cta: 'Request an Invitation', go: ctx.openFounderRoom },
    { no: '03', title: 'Private Advisory', forWhom: 'For founders navigating pivotal moments.', body: 'High-touch and deliberately limited. Direct access when the decisions matter most.', cta: 'Inquire', go: ctx.openAdvisory },
    { no: '04', title: 'Inside the Studio', forWhom: 'For founders who want to learn alongside others.', body: 'Resident Experts, honest conversations, seasonal gatherings, and Chef Mona dinners.', cta: 'View Upcoming Evenings', go: ctx.openStudio },
  ]
  return (
    <ChapterShell onClose={ctx.closeWork} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 6vw clamp(70px,12vh,150px)', textAlign: 'center', color: '#2b2723' }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.6em' }}>Work with Believe Studio</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.4vw,92px)', lineHeight: 1.02, margin: '0 0 0.6em' }}>Begin your journey</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '40ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>There is no single way to work with Believe Studio. Every founder arrives carrying different questions. Some begin with a Blueprint. Others join The Founder’s Room. Some seek Private Advisory. Others simply pull up a chair Inside the Studio.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '1.4em auto 0' }}>The path is yours. The destination is greater clarity.</p>

        <div style={{ width: 1, height: 'clamp(56px,10vh,110px)', margin: 'clamp(52px,9vh,100px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {workPaths.map((w, i) => (
          <div key={i} style={{ maxWidth: '38ch', margin: '0 auto clamp(56px,9vh,100px)' }}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '1em' }}>{w.no}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.35em' }}>{w.title}</h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', color: 'rgba(43,39,35,0.7)', margin: '0 0 0.9em' }}>{w.forWhom}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', margin: '0 0 1.4em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{w.body}</p>
            <El onClick={w.go} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', border: '1px solid rgba(43,39,35,0.3)', borderRadius: 2, padding: '13px 28px', cursor: 'pointer' }} hover={{ borderColor: 'rgba(43,39,35,0.8)', color: '#2b2723' }}>{w.cta}</El>
          </div>
        ))}

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: '0 auto clamp(44px,8vh,90px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '1em' }}>Stay connected</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.04, margin: '0 0 0.35em' }}>Visionary Collective</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.78)', margin: '0 0 0.9em' }}>The house between visits.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', maxWidth: '34ch', margin: '0 auto clamp(48px,8vh,90px)', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>For founders who want to stay connected to the conversations, stories, and people of Believe Studio between visits.</p>

        <BackPill onClose={ctx.closeWork} />
      </div>
    </ChapterShell>
  )
}
