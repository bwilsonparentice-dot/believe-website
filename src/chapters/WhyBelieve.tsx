import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'

const serif = "'Cormorant Garamond',serif"
const balance = { textWrap: 'balance' as React.CSSProperties['textWrap'] }

/**
 * Why I Built Believe — the origin story, in the founder's own voice. Not an
 * about page, not a résumé, not a timeline: four hundred quiet words that give
 * the institution a founder, and the founder a reason. Restraint is the whole
 * point; nothing competes with the words.
 */
export function WhyBelieveChapter({ ctx }: { ctx: Ctx }) {
  const lineBig: React.CSSProperties = { fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,46px)', lineHeight: 1.32, color: '#2b2723', margin: 0, ...balance }
  const lineMid: React.CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.8vw,36px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, ...balance }

  return (
    <ChapterShell onClose={ctx.closeWhyBelieve} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 660, margin: '0 auto', padding: 'clamp(110px,20vh,260px) 7vw clamp(90px,15vh,180px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 1100ms cubic-bezier(.2,.7,.2,1) both' }}>

        <ArchMark width={2.2} margin="0 auto 1.8em" />
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: 'clamp(52px,10vh,110px)' }}>Why I built Believe</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px,6vh,60px)' }}>
          <p style={lineBig}>I built Believe because I know what it feels like to carry the weight of building something that matters.</p>
          <p style={lineMid}>I know what it’s like to celebrate quietly.</p>
          <p style={lineMid}>I know what it’s like to lose something you poured yourself into.</p>
          <p style={lineMid}>I know what it’s like to wonder what comes next.</p>
          <p style={lineMid}>I also know what happens when one founder shares hard-earned wisdom with another.</p>
          <p style={{ ...lineBig, color: 'rgba(122,94,52,0.92)', fontStyle: 'italic' }}>Believe is the place I wish had existed during every chapter of my own journey.</p>
          <p style={lineBig}>I hope it becomes that place for you.</p>
        </div>

        {/* the signature — the institution now has a founder */}
        <div style={{ marginTop: 'clamp(70px,12vh,140px)' }}>
          <div style={{ fontFamily: "'Caveat',cursive", fontWeight: 500, fontSize: 'clamp(40px,6vw,72px)', lineHeight: 1, color: '#2b2723' }}>Beth</div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginTop: '1.4em' }}>Beth Wilson-Parentice · Founder</div>
        </div>

        <div style={{ width: 1, height: 'clamp(48px,8vh,88px)', margin: 'clamp(64px,11vh,120px) auto clamp(40px,6vh,70px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <BackPill onClose={ctx.closeWhyBelieve} label="← Back into the house" />
      </div>
    </ChapterShell>
  )
}
