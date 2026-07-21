import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'

/** The House — the philosophy of why a house, and not a website. */
export function HouseChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeHouse} background="#f4ede0">
      <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(90px,17vh,200px) 7vw clamp(80px,15vh,180px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        <ArchMark margin="0 auto 1.6em" />
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>The philosophy of the house</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.4vw,92px)', lineHeight: 1, margin: '0 0 0.5em' }}>Why a house,<br />and not a website.</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.45, color: 'rgba(122,94,52,0.8)', maxWidth: '30ch', margin: '0 auto' }}>Most companies sell you something. A house simply lets you in.</p>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(60px,10vh,120px) auto" />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.2vw,28px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.84)', maxWidth: '60ch', margin: '0 auto 1.5em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Believe Studio is built as a house because a founder’s journey is not a product to be purchased. It is a path to be walked.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.7)', maxWidth: '62ch', margin: '0 auto 1.5em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>So instead of packages and tiers, there are rooms. Each one exists because founders need something different depending on where they are — a place to think, a table to gather at, a library of borrowed wisdom, a quiet room to decide.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.7)', maxWidth: '62ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>No founder walks the same path through the house. And yet every room, in its own way, leads toward the same thing: greater clarity about what you are building and why.</p>

        <Divider h="clamp(56px,10vh,110px)" m="clamp(60px,10vh,120px) auto" />

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: 'clamp(40px,7vh,64px)' }}>Every room has a purpose</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, textAlign: 'left', maxWidth: 500, margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.28)', padding: 'clamp(22px,3.4vw,34px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(21px,2.4vw,29px)' }}>The Founder’s Room</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.75)', textAlign: 'right' }}>How we help you, personally.</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.28)', padding: 'clamp(22px,3.4vw,34px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(21px,2.4vw,29px)' }}>Inside the Studio</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.75)', textAlign: 'right' }}>The living culture of the house.</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.28)', padding: 'clamp(22px,3.4vw,34px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(21px,2.4vw,29px)' }}>The Library</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.75)', textAlign: 'right' }}>How the house thinks.</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.28)', padding: 'clamp(22px,3.4vw,34px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(21px,2.4vw,29px)' }}>The Table</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.75)', textAlign: 'right' }}>Where founders decide together.</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.28)', borderBottom: '1px solid rgba(122,94,52,0.28)', padding: 'clamp(22px,3.4vw,34px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(21px,2.4vw,29px)' }}>The Stage</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.75)', textAlign: 'right' }}>What founders go on to build.</span>
          </div>
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(21px,2.4vw,31px)', lineHeight: 1.5, color: '#2b2723', maxWidth: '30ch', margin: 'clamp(64px,11vh,130px) auto 0', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Fall in love with the house first. Choosing a room becomes the natural next step.</p>

        <Divider h="clamp(48px,8vh,88px)" m="clamp(56px,9vh,100px) auto clamp(40px,6vh,70px)" />
        <BackPill onClose={ctx.closeHouse} label="← Back into the house" />
      </div>
    </ChapterShell>
  )
}
