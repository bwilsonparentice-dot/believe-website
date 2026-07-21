import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { LightShift, Dust, Keynote } from '../components/Living'
import { STUDIO_NIGHTS, roomKeyFor, PHOTOS } from '../data'

/** Inside the Studio — monthly evenings with Resident Experts, the house after dark. */
export function StudioChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStudio} background="#161613" dark>
      {/* The Studio at evening — the house after dark, one lamp lit */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(380px,66vh,780px)', overflow: 'hidden' }}>
        <ImageSlot
          src={PHOTOS.studio}
          alt="The Studio at evening, warm lamplight"
          placeholder={"The Studio at evening — warm lamplight, two chairs drawn close, a bottle of wine, the day's work still on the walls"}
          style={{ position: 'absolute', top: '-2.5%', left: '-2.5%', width: '105%', height: '105%', animation: 'slowZoom 20s ease-out both' }}
        />
        <LightShift at="42% 40%" strength={0.6} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(56% 52% at 42% 40%, rgba(255,214,150,0.55), transparent 66%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(10,8,5,0.5) 0%, transparent 34%, transparent 40%, rgba(22,22,19,0.96) 100%)' }} />
        <Dust n={16} seed={29} box={[26, 44, 22, 40]} />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: 'min(820px,96%)', height: '52%', pointerEvents: 'none', background: 'radial-gradient(82% 92% at 50% 100%, rgba(14,10,5,0.6), rgba(14,10,5,0.28) 48%, transparent 76%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(34px,6vh,70px)', textAlign: 'center', color: '#f6efe4', padding: '0 6vw' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(249,243,231,0.92)', marginBottom: '0.8em', textShadow: '0 1px 12px rgba(10,7,3,0.9), 0 2px 30px rgba(10,7,3,0.7)' }}>An evening in the house</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.4vw,92px)', lineHeight: 1, margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)' }}>Inside the Studio</h2>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', color: 'rgba(248,242,232,0.94)', marginTop: '0.5em', textShadow: '0 1px 10px rgba(10,7,3,0.85), 0 2px 26px rgba(10,7,3,0.65)' }}>Monthly conversations with Resident Experts.</div>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: 'clamp(50px,9vh,110px) 6vw clamp(70px,14vh,170px)', textAlign: 'center', color: 'rgba(246,239,228,0.92)' }}>
        <Keynote dark>Your ideas can become real.</Keynote>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.62, color: 'rgba(246,239,228,0.88)', maxWidth: '50ch', margin: 'clamp(24px,4vh,44px) auto 0', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Once a month, a Resident Expert is welcomed into Believe Studio for one evening. Not a guest speaker. Not a webinar. Someone trusted, invited into the house the way you’d invite a friend.</p>

        <div style={{ width: 1, height: 'clamp(44px,7vh,80px)', margin: 'clamp(44px,7vh,80px) auto', background: 'linear-gradient(180deg, rgba(236,209,147,0.5), transparent)' }} />

        {STUDIO_NIGHTS.map((s, i) => (
          <El
            key={i}
            style={{ borderTop: '1px solid rgba(236,209,147,0.34)', padding: 'clamp(40px,6vw,76px) clamp(4px,2vw,24px) 0', textAlign: 'left', opacity: 0, transform: 'translateY(24px)', animation: 'studioReveal 900ms ease forwards', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 4% cover 38%' as unknown as string, transition: 'background 700ms ease, transform 700ms ease' }}
            hover={{ background: 'rgba(255,226,158,0.04)', transform: 'translateY(-4px)' }}
          >
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.72)', marginBottom: '1.4em' }}>{s.label}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(32px,4.6vw,60px)', lineHeight: 1.04, margin: '0 0 0.6em' }}>{s.topic}</h3>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,27px)', color: 'rgba(246,239,228,0.88)', marginBottom: '0.5em' }}>with Resident {s.name}</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.62)' }}>
              {s.role} • Gathered at{' '}
              <El as="span" onClick={ctx.goForRoomKey(roomKeyFor(s.room))} style={{ cursor: 'pointer', transition: 'color 400ms ease' }} hover={{ color: 'rgba(236,209,147,0.95)' }}>{s.room}</El>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,1.9vw,24px)', lineHeight: 1.76, color: 'rgba(246,239,228,0.78)', maxWidth: '52ch', margin: '1.6em 0 0', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{s.note}</p>
          </El>
        ))}

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(236,209,147,0.72)', maxWidth: '30ch', margin: 'clamp(60px,9vh,110px) auto 0' }}>Every meaningful partnership begins with a conversation.</p>

        <div style={{ width: 1, height: 'clamp(44px,7vh,80px)', margin: 'clamp(46px,7vh,80px) auto clamp(36px,5vh,60px)', background: 'linear-gradient(180deg, rgba(236,209,147,0.5), transparent)' }} />
        <El onClick={ctx.closeStudio} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.72)', border: '1px solid rgba(246,239,228,0.3)', borderRadius: 2, padding: '13px 28px', cursor: 'pointer' }} hover={{ borderColor: 'rgba(246,239,228,0.8)', color: '#fff' }}>Back to the building</El>
      </div>
    </ChapterShell>
  )
}
