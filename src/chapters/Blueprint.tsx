import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { Keynote } from '../components/Living'

/** Every founder begins with a Blueprint — the foundational room. */
export function BlueprintChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeBlueprint} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 940, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 6vw clamp(70px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        <Keynote mark={false}>It begins when you see it clearly.</Keynote>

        <ArchMark />
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>A foundational room</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.2vw,88px)', lineHeight: 1.01, margin: '0 0 0.5em' }}>Every founder begins<br />with a Blueprint.</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.82)', margin: '0 auto 1.6em' }}>Not a business plan.<br />A foundation.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.7)', maxWidth: '30ch', margin: '0 auto clamp(48px,8vh,88px)' }}>Architecture gives buildings their structure.<br />Clarity gives founders the confidence to build theirs.</p>

        <ImageSlot placeholder="The Believe Blueprint — an architect's original set of plans (drop the artifact image here)" style={{ display: 'block', width: 'min(90%,880px)', height: 'clamp(320px,54vh,640px)', margin: '0 auto', background: '#f3ecdd' }} />

        <Divider h="clamp(52px,9vh,96px)" m="clamp(56px,9vh,100px) auto clamp(40px,7vh,72px)" />

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.4em' }}>A Believe Blueprint<span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span></div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.8)', maxWidth: '56ch', margin: '0 auto 1.1em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Before strategy. Before growth. Before execution. We begin by understanding the architecture of what you’re building.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.68)', maxWidth: '58ch', margin: '0 auto 1.1em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every Believe Blueprint is a living strategic document that captures the foundation of your company — your vision, priorities, opportunities, blind spots, decisions, and next chapter.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '48ch', margin: '0 auto 1.2em' }}>Just as an architect begins with a blueprint before laying the first stone, every founder begins with clarity before building what comes next.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.6)', maxWidth: '52ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every Believe Blueprint is created from the ground up. Never templated. Never generated. Always built around the founder, the company, and the decisions that matter most.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '30ch', margin: '1.2em auto 0' }}>No two Blueprints are alike because no two founders are alike.</p>

        <Divider />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 'clamp(36px,5vw,64px)', textAlign: 'left', maxWidth: 760, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(23px,2.6vw,31px)', marginBottom: '0.7em' }}>Vision</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)' }}>Where are you today?<br />What are you truly building?<br />What matters most?</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.55vw,19px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.7)', marginTop: '0.9em' }}>Understanding the founder before designing the company.</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(23px,2.6vw,31px)', marginBottom: '0.7em' }}>Structure</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)' }}>Positioning<br />Revenue<br />Products<br />Partnerships<br />Leadership<br />Operations<br />Future readiness</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.55vw,19px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.7)', marginTop: '0.9em' }}>Everything viewed as one connected architecture.</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(23px,2.6vw,31px)', marginBottom: '0.7em' }}>Direction</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)' }}>Clear priorities.<br />Better decisions.<br />Thoughtful momentum.</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.55vw,19px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.7)', marginTop: '0.9em' }}>A living document that evolves alongside the company it serves.</div>
          </div>
        </div>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,140px) auto" />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.3, color: '#2b2723', maxWidth: '22ch', margin: '0 auto 0.9em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every Blueprint begins with a conversation.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.66)', maxWidth: '50ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Not because we already know the answers. Because asking better questions is where meaningful companies begin.</p>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,140px) auto" />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(22px,2.6vw,34px)', lineHeight: 1.35, color: '#2b2723', maxWidth: '26ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>The Believe Blueprint becomes the foundation for everything that follows.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.6)', maxWidth: '30ch', margin: '1em auto 0' }}>For many founders, that next step is The Founder’s Room.</p>

        <Divider h="clamp(48px,7vh,80px)" m="clamp(46px,7vh,80px) auto clamp(36px,5vh,60px)" />
        <div onClick={ctx.openFounderRoom} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#1b140c', background: 'linear-gradient(160deg,#d9bd7e,#b8934e)', padding: '15px 38px', cursor: 'pointer', boxShadow: '0 20px 40px -22px rgba(120,90,40,0.7)' }}>Begin Your Blueprint →</div>
      </div>
    </ChapterShell>
  )
}
