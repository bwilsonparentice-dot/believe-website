import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { PEOPLE, PEOPLE_PHOTOS } from '../data'

/** The People of Believe Studio — editorial portraits in arched niches, each an introduction. */
export function PeopleChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closePeople} background="#f4ede0">
      {/* one architectural photograph: the room ready for conversation */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(420px,74vh,880px)', overflow: 'hidden' }}>
        <ImageSlot placeholder="an empty oak table in warm morning light, fresh coffee, open notebooks, several chairs waiting" style={{ position: 'absolute', top: '-2.5%', left: '-2.5%', width: '105%', height: '105%', animation: 'slowZoom 20s ease-out both' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(58% 52% at 40% 22%, rgba(255,238,196,0.5), transparent 66%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.24) 0%, transparent 30%, transparent 52%, rgba(244,237,224,0.9) 100%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto', padding: '0 6vw clamp(70px,14vh,170px)', textAlign: 'center', color: '#2b2723' }}>

        <div style={{ marginTop: 'clamp(-60px,-7vh,-90px)', position: 'relative' }}>
          <ArchMark width={2.4} margin="0 auto 1.4em" />
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.1em' }}>The chapter</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(38px,6vw,80px)', lineHeight: 1.02, margin: '0 0 0.7em' }}>The People of Believe&nbsp;Studio</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.9)', maxWidth: '52ch', margin: '0 auto 1.1em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Believe Studio isn’t built by one person. It’s cared for by people who believe founders deserve extraordinary places to think, build, and belong.</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.55, color: 'rgba(122,94,52,0.78)', maxWidth: '48ch', margin: '0 auto' }}>Some you’ll meet immediately. Others quietly shape your experience behind the scenes. Together, they keep the light on.</p>
        </div>

        <Divider h="clamp(48px,8vh,88px)" m="clamp(46px,7vh,80px) auto" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px,12vh,128px)' }}>
          {PEOPLE.map((p, i) => (
            <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(28px,5vw,72px)', flexDirection: p.dir as React.CSSProperties['flexDirection'], textAlign: 'left', opacity: 0, animation: 'riseFade 900ms ease both', animationTimeline: 'view()', animationRange: 'entry 6% cover 32%' } as React.CSSProperties}>
              <div style={{ flex: '0 1 360px', minWidth: 220, maxWidth: 380 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#e6dcc6', boxShadow: '0 40px 80px -46px rgba(60,44,20,0.6)', borderRadius: 'clamp(90px,11vw,150px) clamp(90px,11vw,150px) 12px 12px' }}>
                  <ImageSlot src={PEOPLE_PHOTOS[p.pid]} alt={`Portrait of ${p.name}`} placeholder={p.portrait} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'brightness(1.1) saturate(1.03)' }} />
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 40% 26%, rgba(255,238,196,0.42), transparent 68%)' }} />
                </div>
              </div>
              <div style={{ flex: '1 1 340px', minWidth: 300 }}>
                <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.55)', marginBottom: '0.7em' }}>You’ll probably meet</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(30px,3.6vw,50px)', lineHeight: 1.02, marginBottom: '0.7em' }}>{p.name}</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(23px,2.9vw,38px)', lineHeight: 1.26, color: '#2b2723', margin: '0 0 0.9em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>…{p.when}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.68, color: 'rgba(43,39,35,0.68)', maxWidth: '58ch', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{p.belief}</p>
              </div>
            </div>
          ))}
        </div>

        <Divider h="clamp(48px,8vh,88px)" m="clamp(56px,9vh,100px) auto clamp(40px,6vh,70px)" />
        <BackPill onClose={ctx.closePeople} />
      </div>
    </ChapterShell>
  )
}
