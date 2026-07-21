import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill } from '../components/ChapterShell'
import { FIELD_NOTES } from '../data'

/** Field Notes — the notebook of the house, ideas caught before they disappear. */
export function FieldNotesChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeFieldNotes} background="#ece2cd">
      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 7vw clamp(80px,15vh,180px)', color: '#2b2723' }}>

        <div style={{ textAlign: 'center' }}>
          <svg width="26" height="30" viewBox="0 0 48 56" fill="none" style={{ display: 'block', margin: '0 auto 1.5em', opacity: 0.8 }}>
            <path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke="#9c7a3f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>The notebook of the house</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.4vw,92px)', lineHeight: 1, margin: '0 0 0.5em' }}>Field Notes</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.45, color: 'rgba(122,94,52,0.82)', maxWidth: '34ch', margin: '0 auto' }}>Ideas caught before they disappear. Gathered from hundreds of conversations, still accumulating.</p>
        </div>

        <div style={{ width: 1, height: 'clamp(34px,6vh,64px)', margin: 'clamp(38px,6vh,72px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,56px)' }}>
          {FIELD_NOTES.map((fn, i) => (
            <div key={i} style={{ position: 'relative', background: 'linear-gradient(157deg,#f6f0e2,#efe7d4 46%,#e7ddc6)', backgroundBlendMode: 'multiply', boxShadow: '0 26px 54px -40px rgba(60,44,20,0.7), inset 0 0 44px rgba(150,126,80,0.14), inset 0 1px 0 rgba(255,252,244,0.6)', padding: 'clamp(30px,4.2vw,52px) clamp(28px,4.2vw,54px)', borderRadius: '3px 5px 4px 6px', transform: `rotate(${fn.tilt})`, textAlign: 'left' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', opacity: 0.5, mixBlendMode: 'multiply', backgroundImage: 'repeating-linear-gradient(90deg, rgba(150,126,80,0.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(150,126,80,0.05) 0 1px, transparent 1px 3px)' }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.14), inset 0 0 22px -6px rgba(110,86,46,0.28)' }} />
              <div style={{ position: 'absolute', top: -8, left: '50%', width: 'clamp(60px,9vw,96px)', height: 20, transform: 'translateX(-50%) rotate(-1.4deg)', background: 'linear-gradient(180deg, rgba(214,196,150,0.5), rgba(196,176,128,0.32))', boxShadow: '0 2px 5px -2px rgba(60,44,20,0.4)', borderRadius: 1 }} />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, borderBottom: '1px solid rgba(122,94,52,0.18)', paddingBottom: '0.9em', marginBottom: '1.1em' }}>
                <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)' }}>Field Note {fn.n}</span>
                {fn.title && (
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(16px,1.7vw,21px)', color: 'rgba(43,39,35,0.5)' }}>{fn.title}</span>
                )}
              </div>
              <p style={{ position: 'relative', fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(21px,2.5vw,33px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.9)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{fn.obs}</p>
              {fn.hand && (
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.82)', margin: '0.7em 0 0' }}>{fn.hand}</p>
              )}
              {fn.to && (
                <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginTop: '1.6em' }}>This one became — {fn.to}</div>
              )}
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(20px,2.3vw,30px)', lineHeight: 1.5, color: '#2b2723', maxWidth: '34ch', margin: 'clamp(64px,10vh,120px) auto 0', textAlign: 'center', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every conversation leaves something behind. This is where it is kept.</p>

        <div style={{ width: 1, height: 'clamp(48px,7vh,80px)', margin: 'clamp(46px,7vh,80px) auto clamp(36px,5vh,60px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <div style={{ textAlign: 'center' }}><BackPill onClose={ctx.closeFieldNotes} /></div>
      </div>
    </ChapterShell>
  )
}
