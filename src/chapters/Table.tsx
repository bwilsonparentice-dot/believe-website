import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { LightShift, Dust, Steam, Keynote } from '../components/Living'
import { PHOTOS } from '../data'

const eyebrow: React.CSSProperties = {
  fontFamily: "'Jost',sans-serif",
  fontWeight: 400,
  fontSize: 10,
  letterSpacing: '0.5em',
  textTransform: 'uppercase',
  color: 'rgba(122,94,52,0.62)',
}

const cta: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: "'Jost',sans-serif",
  fontWeight: 400,
  fontSize: 12,
  letterSpacing: '0.34em',
  textTransform: 'uppercase',
  color: '#1b140c',
  background: 'linear-gradient(160deg,#d9bd7e,#b8934e)',
  padding: '15px 38px',
  cursor: 'pointer',
  boxShadow: '0 20px 40px -22px rgba(120,90,40,0.7)',
}

/** The Table — where consumer brands meet culture: dinners, chef collaborations,
 *  pop-ups and cultural partnerships, imagined and produced around a table. */
export function TableChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeTable} background="#efe6d3">
      {/* a candlelit dinner in an elegant London townhouse dining room */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(340px,52vh,600px)', overflow: 'hidden', borderRadius: 'clamp(120px,26vw,420px) clamp(120px,26vw,420px) clamp(40px,6vw,120px) clamp(40px,6vw,120px)' }}>
        <ImageSlot
          src={PHOTOS.table}
          alt="A candlelit dinner laid along a long reclaimed-wood table in a dark-panelled London townhouse dining room, with boucle chairs, a marble fireplace, floral centrepieces, and tall windows"
          placeholder="a long candlelit dinner table set in an elegant dark-panelled dining room"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: 'center 42%', filter: 'brightness(1.02)', borderRadius: 'clamp(120px,26vw,420px) clamp(120px,26vw,420px) clamp(40px,6vw,120px) clamp(40px,6vw,120px)', animation: 'slowZoom 20s ease-out both' }}
        />
        <LightShift at="52% 24%" />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(58% 52% at 52% 24%, rgba(255,214,150,0.5), transparent 68%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.28) 0%, transparent 34%, transparent 44%, rgba(239,230,211,0.94) 100%)' }} />
        <Dust n={14} seed={50} box={[16, 62, 10, 46]} />
        <Steam x="50%" y="40%" />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: 'min(820px,96%)', height: '70%', pointerEvents: 'none', background: 'radial-gradient(78% 86% at 50% 86%, rgba(22,16,9,0.6), rgba(22,16,9,0.28) 52%, transparent 80%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(34px,6vh,70px)', textAlign: 'center', color: '#f6efe4', padding: '0 6vw' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(249,243,231,0.92)', marginBottom: '0.8em', textShadow: '0 1px 12px rgba(20,14,7,0.85), 0 2px 30px rgba(20,14,7,0.7)' }}>Experiences &amp; cultural partnerships</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.6vw,96px)', lineHeight: 1, margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}>The Table</h2>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', color: 'rgba(248,242,232,0.96)', marginTop: '0.5em', textShadow: '0 1px 10px rgba(20,14,7,0.8), 0 2px 26px rgba(20,14,7,0.6)' }}>Where brands meet culture.</div>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(40px,6vh,72px) 6vw clamp(52px,8vh,96px)', textAlign: 'center', color: '#2b2723' }}>

        <Keynote>Some of the most interesting brand stories don’t begin on a shelf.</Keynote>

        {/* opening */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.9)', maxWidth: '24ch', margin: '0 auto 1.1em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>They begin around a table. In a conversation. Through an experience that makes people feel something.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.68)', maxWidth: '36ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>We imagine and produce extraordinary moments that bring consumer brands together with chefs, creators, tastemakers, and the cultural voices who shape what people discover, love, and remember.</p>

        <Divider h="clamp(30px,4vh,52px)" m="clamp(26px,4vh,46px) auto" />

        {/* no two are the same */}
        <div style={{ ...eyebrow, marginBottom: '1.4em' }}>No two are the same</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(22px,2.8vw,36px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.82)', maxWidth: '30ch', margin: '0 auto' }}>
          A dinner.<br />
          A chef collaboration.<br />
          A pop-up or hospitality experience.<br />
          A cultural partnership.<br />
          Something no one has imagined yet.
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.8)', margin: 'clamp(20px,3.2vh,38px) auto 0' }}>The table is a metaphor, not a limit.</p>

        <Divider h="clamp(30px,4vh,52px)" m="clamp(26px,4vh,46px) auto" />

        {/* beyond the experience */}
        <div style={{ ...eyebrow, marginBottom: '1.4em' }}>Beyond the experience</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.45, color: 'rgba(43,39,35,0.9)', maxWidth: '26ch', margin: '0 auto 1.1em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>The right gathering can introduce a brand to new audiences, spark conversations, and create stories worth retelling.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(43,39,35,0.6)', margin: '0 auto 0.7em' }}>Not simply more visibility.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.1, color: 'rgba(43,39,35,0.94)', margin: 0 }}>A reason to care.</p>

        <Divider h="clamp(30px,4vh,52px)" m="clamp(26px,4vh,46px) auto" />

        {/* by invitation */}
        <div style={{ ...eyebrow, marginBottom: '1.4em' }}>By invitation</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.84)', maxWidth: '28ch', margin: '0 auto 0.9em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every Table is conceived around the brand, the people, and the moment.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.8)', margin: '0 auto clamp(28px,5vh,52px)' }}>If there’s a fit, it begins with a conversation.</p>

        <div onClick={ctx.openConversation} style={cta}>Begin the Conversation &rarr;</div>

        <div style={{ height: 'clamp(20px,3.5vh,40px)' }} />
        <BackPill onClose={ctx.closeTable} />
      </div>
    </ChapterShell>
  )
}
