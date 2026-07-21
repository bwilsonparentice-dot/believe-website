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

/** The Table — where founders think together, and conversations become decisions. */
export function TableChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeTable} background="#efe6d3">
      {/* the dining room, warm with afternoon light */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(360px,60vh,720px)', overflow: 'hidden', borderRadius: 'clamp(120px,26vw,420px) clamp(120px,26vw,420px) clamp(40px,6vw,120px) clamp(40px,6vw,120px)' }}>
        <ImageSlot
          src={PHOTOS.table}
          alt="A long communal table in low morning light"
          placeholder="a long communal table, low morning light, empty chairs"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'brightness(1.04)', borderRadius: 'clamp(120px,26vw,420px) clamp(120px,26vw,420px) clamp(40px,6vw,120px) clamp(40px,6vw,120px)', animation: 'slowZoom 20s ease-out both' }}
        />
        <LightShift at="34% 26%" />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 34% 26%, rgba(255,214,150,0.5), transparent 68%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.24) 0%, transparent 34%, transparent 46%, rgba(239,230,211,0.94) 100%)' }} />
        <Dust n={14} seed={41} box={[16, 62, 10, 46]} />
        <Steam x="57%" y="30%" />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: 'min(780px,94%)', height: '48%', pointerEvents: 'none', background: 'radial-gradient(82% 92% at 50% 100%, rgba(22,16,9,0.58), rgba(22,16,9,0.26) 48%, transparent 76%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(34px,6vh,70px)', textAlign: 'center', color: '#f6efe4', padding: '0 6vw' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(249,243,231,0.92)', marginBottom: '0.8em', textShadow: '0 1px 12px rgba(20,14,7,0.85), 0 2px 30px rgba(20,14,7,0.7)' }}>Where founders think together</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.6vw,96px)', lineHeight: 1, margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}>The Table</h2>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', color: 'rgba(248,242,232,0.96)', marginTop: '0.5em', textShadow: '0 1px 10px rgba(20,14,7,0.8), 0 2px 26px rgba(20,14,7,0.6)' }}>Where conversations become decisions.</div>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(48px,8vh,96px) 6vw clamp(64px,11vh,140px)', textAlign: 'center', color: '#2b2723' }}>

        <Keynote>You’re not building alone.</Keynote>

        {/* opening */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.9)', maxWidth: '26ch', margin: '0 auto 1.4em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>There is a difference between talking about a company and sitting across from someone who helps you finally see it clearly.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 2, color: 'rgba(43,39,35,0.68)', maxWidth: '34ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>The Table exists for those conversations.<br />Some last twenty minutes.<br />Some last three hours.<br />Almost all of them change something —<br />not because advice was given,<br />because clarity arrived.</p>

        <Divider h="clamp(44px,7vh,88px)" m="clamp(40px,6.5vh,80px) auto" />

        {/* the reflection */}
        <div style={{ ...eyebrow, marginBottom: '1.4em' }}>Sit with this</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(28px,3.8vw,52px)', lineHeight: 1.2, color: 'rgba(43,39,35,0.94)', maxWidth: '20ch', margin: '0 auto 0.7em', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>What decision have you already made… but haven’t admitted to yourself yet?</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.78)', margin: 0 }}>Sit with it. The table isn’t in a hurry.</p>

        <Divider h="clamp(44px,7vh,88px)" m="clamp(40px,6.5vh,80px) auto" />

        {/* What Happens Here */}
        <div style={{ ...eyebrow, marginBottom: '0.9em' }}>What happens here</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,9vh,100px)', maxWidth: '30ch', margin: 'clamp(40px,7vh,80px) auto 0' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Sometimes someone realizes the company they wanted to build isn’t the one they actually want to lead.</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Sometimes one honest question changes an entire strategy.</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Sometimes nothing changes on paper. Everything changes in the founder.</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Sometimes the next chapter begins over coffee.</p>
        </div>

        <Divider h="clamp(44px,7vh,88px)" m="clamp(40px,6.5vh,80px) auto" />

        {/* Left here, after a conversation */}
        <div style={{ ...eyebrow, marginBottom: '1.6em' }}>Left here · after a conversation</div>
        <p style={{ fontFamily: "'Caveat',cursive", fontWeight: 500, fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.24, color: 'rgba(43,39,35,0.9)', maxWidth: '22ch', margin: '0 auto 0.8em' }}>“Nobody solved my problem. They simply helped me hear the answer I’d been avoiding.”</p>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.62)' }}>— left anonymously after dinner</div>

        <Divider h="clamp(44px,7vh,88px)" m="clamp(40px,6.5vh,80px) auto" />

        {/* Around this table */}
        <div style={{ ...eyebrow, marginBottom: '0.9em' }}>Around this table</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 clamp(40px,7vh,80px)' }}>No two gatherings are the same</h3>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.72)', maxWidth: '34ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Resident Experts pull up a chair.<br />Founders bring the questions they can’t answer alone.<br />Chef Mona prepares food that slows the conversation down.<br /><br />Some evenings become workshops. Others become dinners. Others become conversations no one planned to have.</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '26ch', margin: 'clamp(40px,7vh,80px) auto 0' }}>No two gatherings are ever exactly the same. Because no two founders are.</p>

        <Divider h="clamp(44px,7vh,88px)" m="clamp(40px,6.5vh,80px) auto" />

        {/* who keeps this room */}
        <div style={{ ...eyebrow, marginBottom: '0.9em' }}>Who keeps this room</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(26px,3vw,38px)', lineHeight: 1.05, marginBottom: '0.6em' }}>Jillian Waun</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.7)', maxWidth: '34ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Jillian quietly keeps conversations alive long after everyone leaves the table. She listens for the sentence a founder almost didn’t say — because those are often the ones worth building around. If you spend enough time here, you’ll probably find Jillian nearby.</p>

        <Divider h="clamp(44px,7vh,88px)" m="clamp(40px,6.5vh,80px) auto" />

        {/* the artifact: The Empty Chair */}
        <div style={{ ...eyebrow, marginBottom: '0.9em' }}>The artifact</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.02, margin: '0 0 0.7em' }}>The Empty Chair</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.76)', maxWidth: '34ch', margin: '0 auto 1.4em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every meaningful conversation begins the same way. Someone chooses to sit down. The chair isn’t reserved for experts. It’s reserved for honesty.</p>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)' }}>Listen · Question · Decide · Build</div>

        <Divider h="clamp(44px,7vh,88px)" m="clamp(40px,6.5vh,80px) auto clamp(30px,5vh,56px)" />

        {/* quiet ending */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.35, color: '#2b2723', maxWidth: '24ch', margin: '0 auto 0.6em' }}>Some conversations change companies. The best ones change founders.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', maxWidth: '26ch', margin: '0 auto clamp(40px,7vh,72px)', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Your chair is waiting. Come when you’re ready.</p>
        <BackPill onClose={ctx.closeTable} />
      </div>
    </ChapterShell>
  )
}
