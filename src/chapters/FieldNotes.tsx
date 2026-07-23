import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { FIELD_NOTES, type FieldNote } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const hand = "'Caveat',cursive"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.42em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)',
}

const surface = (range = 'entry 2% cover 22%'): CSSProperties => ({
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

/**
 * A single page from the notebook — never uniform. Its width follows the length
 * of the thought, it sits a little off the center line, and it carries only what
 * a real page would: sometimes tape, sometimes a pencil rule, sometimes a faint
 * archival stamp. Gently imperfect. Nothing decorative — everything useful.
 */
function Note({ fn, i }: { fn: FieldNote; i: number }) {
  const long = fn.obs.length > 90
  const width = long ? 'min(96%,600px)' : fn.obs.length > 46 ? 'min(90%,500px)' : 'min(82%,420px)'
  const side = i % 2 === 0 ? { marginLeft: 0, marginRight: 'auto' } : { marginLeft: 'auto', marginRight: 0 }
  const deco = i % 3 // 0 tape · 1 pencil rule · 2 archival stamp

  return (
    <div style={{ ...surface(), width, ...side, position: 'relative', transform: `rotate(${fn.tilt})` }}>
      <div style={{ position: 'relative', background: 'linear-gradient(157deg,#f7f1e3,#efe7d4 48%,#e6dcc5)', boxShadow: '0 30px 56px -42px rgba(60,44,20,0.7), inset 0 1px 0 rgba(255,252,244,0.6)', padding: 'clamp(30px,4vw,54px) clamp(28px,4vw,56px) clamp(30px,4vw,50px)', borderRadius: '3px 6px 4px 7px', textAlign: 'left', overflow: 'hidden' }}>
        {/* the architect's grid, faint */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: deco === 1 ? 0.6 : 0.34, mixBlendMode: 'multiply', backgroundImage: 'repeating-linear-gradient(90deg, rgba(150,126,80,0.06) 0 1px, transparent 1px 22px), repeating-linear-gradient(0deg, rgba(150,126,80,0.06) 0 1px, transparent 1px 22px)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.12), inset 0 0 26px -8px rgba(110,86,46,0.26)' }} />

        {/* a strip of tape */}
        {deco === 0 && (
          <div aria-hidden="true" style={{ position: 'absolute', top: -9, left: i % 4 === 0 ? '16%' : '62%', width: 'clamp(64px,9vw,104px)', height: 22, transform: 'rotate(-2.4deg)', background: 'linear-gradient(180deg, rgba(220,204,162,0.55), rgba(198,180,132,0.34))', boxShadow: '0 2px 6px -2px rgba(60,44,20,0.4)', borderRadius: 1 }} />
        )}
        {/* a faint archival stamp in the corner */}
        {deco === 2 && (
          <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(14px,2vw,22px)', right: 'clamp(14px,2vw,22px)', width: 54, height: 54, borderRadius: '50%', border: '1px solid rgba(122,94,52,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-8deg)', opacity: 0.6 }}>
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 6.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', textAlign: 'center', lineHeight: 1.3 }}>Field<br />Notes</span>
          </div>
        )}

        <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 'clamp(16px,2.4vw,26px)' }}>
          <span style={{ ...label, fontSize: 9.5, color: 'rgba(122,94,52,0.66)' }}>No. {fn.n}</span>
          {fn.title && <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(43,39,35,0.44)' }}>{fn.title}</span>}
        </div>

        <p style={{ position: 'relative', fontFamily: serif, fontWeight: 300, fontSize: long ? 'clamp(20px,2.3vw,30px)' : 'clamp(23px,2.8vw,36px)', lineHeight: 1.36, color: 'rgba(43,39,35,0.9)', margin: 0, ...pretty }}>{fn.obs}</p>

        {/* a pencil rule under the thought */}
        {deco === 1 && (
          <svg width="100%" height="8" viewBox="0 0 300 8" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block', margin: 'clamp(14px,2vh,20px) 0 0', opacity: 0.5 }}>
            <path d="M2 5 C 60 2, 120 7, 180 4 S 280 3, 298 5" stroke="rgba(43,39,35,0.4)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        )}

        {fn.hand && <p style={{ position: 'relative', fontFamily: hand, fontWeight: 500, fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.78)', margin: 'clamp(12px,1.6vh,18px) 0 0' }}>{fn.hand}</p>}

        {fn.to && <div style={{ position: 'relative', ...label, fontSize: 9, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.55)', marginTop: 'clamp(22px,3vh,32px)' }}>This one became — {fn.to}</div>}
      </div>
    </div>
  )
}

/**
 * Field Notes — the living notebook of Believe Studio. Not a blog, not content;
 * the place observations are kept before they become frameworks. It should feel
 * discovered rather than published: a notebook that was never meant to impress
 * anyone, only to remember what mattered. (ctx.openFieldNotes.)
 */
export function FieldNotesChapter({ ctx }: { ctx: Ctx }) {
  const toNotes = () => { const el = document.getElementById('field-notes-start'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return (
    <ChapterShell onClose={ctx.closeFieldNotes} background="#ece2cd">
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(100px,18vh,240px) 7vw clamp(90px,16vh,200px)', color: '#2b2723' }}>

        {/* ── the opening — silence, then the notebook names itself ─────── */}
        <div style={{ textAlign: 'center' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, fontSize: 11, letterSpacing: '0.5em', marginBottom: '1.4em' }}>The living notebook</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(42px,6.6vw,96px)', lineHeight: 1, margin: '0 0 0.4em' }}>Field Notes</h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>Observations gathered from the work.</p>
        </div>

        {/* ── the passage ───────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(100px,18vh,220px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.42, color: 'rgba(43,39,35,0.88)', maxWidth: '22ch', margin: '0 auto', ...balance }}>Not every lesson becomes a framework. Some arrive quietly.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.66)', maxWidth: '30ch', margin: 'clamp(40px,7vh,80px) auto 0' }}>During a founder conversation.<br />Across a conference table.<br />Late at night, after everyone else has gone home.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '26ch', margin: 'clamp(36px,6vh,64px) auto 0', ...balance }}>Or years later — when someone finally understands what really happened.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.6)', maxWidth: '26ch', margin: 'clamp(44px,8vh,88px) auto 0', ...balance }}>These are those moments. Collected one conversation at a time. <span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.78)' }}>Still growing.</span></p>
        </div>

        {/* ── the notes — discovered, alternating, never a feed ─────────── */}
        <div id="field-notes-start" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(70px,13vh,170px)', margin: 'clamp(120px,22vh,280px) auto 0' }}>
          {FIELD_NOTES.map((fn, i) => (
            <Note key={fn.n} fn={fn} i={i} />
          ))}
        </div>

        {/* ── the invitation — no urgency ───────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(120px,22vh,280px)' }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.24, color: '#2b2723', maxWidth: '18ch', margin: '0 auto', ...balance, ...surface() }}>The work continues.<br />So do the notes.</p>
          <El
            onClick={toNotes}
            style={{ display: 'inline-block', margin: 'clamp(48px,9vh,96px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.6)', borderBottom: '1px solid rgba(122,94,52,0.42)', paddingBottom: 6, cursor: 'pointer', transition: 'color 500ms ease, border-color 500ms ease' }}
            hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.7)' }}
          >
            Continue Reading
          </El>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(96px,16vh,190px)' }}><BackPill onClose={ctx.closeFieldNotes} label="← Back" /></div>
      </div>
    </ChapterShell>
  )
}
