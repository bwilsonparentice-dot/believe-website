import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { LightShift, Keynote } from '../components/Living'
import { STORIES, STORIES_HERO, STORY_PHOTOS } from '../data'

/** The Stories — voices from the house, founders in their own words. */
export function StoriesChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStories} background="#efe6d3">
      {/* the header — the table in morning light, set for the conversation */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(360px,60vh,720px)', overflow: 'hidden', borderRadius: 'clamp(120px,26vw,420px) clamp(120px,26vw,420px) clamp(40px,6vw,120px) clamp(40px,6vw,120px)' }}>
        <ImageSlot src={STORIES_HERO} alt="A long oak table in morning light, journals and coffee, set for conversation" placeholder="an oak table in warm morning light, journals and coffee, set for conversation" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'brightness(1.04)', animation: 'slowZoom 20s ease-out both' }} />
        <LightShift at="34% 24%" />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 32% 24%, rgba(255,214,150,0.5), transparent 68%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.22) 0%, transparent 34%, transparent 46%, rgba(239,230,211,0.94) 100%)' }} />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: 'min(820px,96%)', height: '58%', pointerEvents: 'none', background: 'radial-gradient(80% 88% at 50% 90%, rgba(22,16,9,0.58), rgba(22,16,9,0.26) 50%, transparent 78%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(34px,6vh,70px)', textAlign: 'center', color: '#f6efe4', padding: '0 6vw' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(249,243,231,0.92)', marginBottom: '0.8em', textShadow: '0 1px 12px rgba(20,14,7,0.85), 0 2px 30px rgba(20,14,7,0.7)' }}>Voices from the house</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.6vw,96px)', lineHeight: 1, margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}>The Stories</h2>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', color: 'rgba(248,242,232,0.96)', marginTop: '0.5em', textShadow: '0 1px 10px rgba(20,14,7,0.8), 0 2px 26px rgba(20,14,7,0.6)' }}>Founders who came to think more clearly — in their own words.</div>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: 'clamp(48px,8vh,96px) 6vw clamp(70px,14vh,180px)', textAlign: 'center', color: '#2b2723' }}>

        <Keynote>Wisdom, gathered one story at a time.</Keynote>

        <Divider h="clamp(48px,8vh,88px)" m="clamp(40px,7vh,80px) auto clamp(56px,9vh,100px)" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(70px,13vh,140px)' }}>
          {STORIES.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(30px,5vw,72px)', flexDirection: s.dir as React.CSSProperties['flexDirection'], textAlign: 'left' }}>
              <div style={{ flex: '0 1 380px', minWidth: 240, maxWidth: 400 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: '#e6dcc6', boxShadow: '0 40px 80px -46px rgba(60,44,20,0.6)', borderRadius: 'clamp(90px,11vw,150px) clamp(90px,11vw,150px) 12px 12px' }}>
                  <ImageSlot src={STORY_PHOTOS[s.pid]} alt={`Portrait of ${s.name}`} placeholder={`A quiet, editorial portrait of ${s.name}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'brightness(1.1) saturate(1.03)' }} />
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 40% 26%, rgba(255,238,196,0.42), transparent 68%)' }} />
                </div>
              </div>
              <div style={{ flex: '1 1 360px', minWidth: 300 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(24px,3.1vw,42px)', lineHeight: 1.28, color: '#2b2723', margin: '0 0 0.7em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>“{s.quote}”</p>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.4vw,30px)', lineHeight: 1 }}>{s.name}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.72)', marginTop: '0.3em' }}>{s.of}</div>
              </div>
            </div>
          ))}
        </div>

        <Divider h="clamp(56px,9vh,100px)" m="clamp(56px,9vh,100px) auto clamp(36px,5vh,60px)" />
        <BackPill onClose={ctx.closeStories} />
      </div>
    </ChapterShell>
  )
}
