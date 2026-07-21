import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { Keynote } from '../components/Living'
import { STORIES } from '../data'

/** The Stories — voices from the house, founders in their own words. */
export function StoriesChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStories} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: 'clamp(70px,14vh,180px) 6vw clamp(70px,14vh,180px)', textAlign: 'center', color: '#2b2723' }}>

        <Keynote mark={false}>Wisdom, gathered one story at a time.</Keynote>

        <ArchMark width={2.4} margin="0 auto 1.4em" />
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.1em' }}>Voices from the house</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.2vw,88px)', lineHeight: 1.02, margin: '0 0 0.6em' }}>The Stories</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.78)', maxWidth: '30ch', margin: '0 auto' }}>Founders who came to think more clearly — in their own words.</p>

        <Divider h="clamp(56px,9vh,100px)" m="clamp(56px,9vh,100px) auto" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(70px,13vh,140px)' }}>
          {STORIES.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(30px,5vw,72px)', flexDirection: s.dir as React.CSSProperties['flexDirection'], textAlign: 'left' }}>
              <div style={{ flex: '0 1 380px', minWidth: 240, maxWidth: 400 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: '#e6dcc6', boxShadow: '0 40px 80px -46px rgba(60,44,20,0.6)', borderRadius: 'clamp(90px,11vw,150px) clamp(90px,11vw,150px) 12px 12px' }}>
                  <ImageSlot placeholder={`A quiet, editorial portrait of ${s.name}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'brightness(1.1) saturate(1.03)' }} />
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
