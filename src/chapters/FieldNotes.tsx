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

// A faint, per-sheet cotton-fibre grain — seeded by the note number so no two
// sheets share a texture. Warm and almost invisible; multiplied over the ivory.
function fibre(seed: number): string {
  return "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='170' height='170'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.84' numOctaves='2' seed='" + seed + "' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='170' height='170' filter='url(%23f)' opacity='0.5'/></svg>\")"
}

// A wide strip of archival linen tape — warm translucent ivory, tiny fibres, ends
// softened as if hand-torn, never quite centred or square to the page. Used on
// only about a third of the notes; the rest simply rest on the wall.
function Tape({ left, rot, w }: { left: string; rot: number; w: string }) {
  const torn = 'linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)'
  return (
    <div aria-hidden="true" style={{ position: 'absolute', top: -16, left, width: w, height: 36, transform: `rotate(${rot}deg)`, background: 'linear-gradient(180deg, rgba(241,233,214,0.66), rgba(226,214,187,0.48))', boxShadow: '0 3px 7px -4px rgba(60,44,20,0.26)', WebkitMaskImage: torn, maskImage: torn }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: fibre(7), backgroundSize: '70px 70px', mixBlendMode: 'multiply', opacity: 0.14 }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 1px 0 rgba(255,251,242,0.5), inset 0 -1px 0 rgba(120,96,54,0.16)' }} />
    </div>
  )
}

/**
 * A single sheet from the archive — never uniform. Its width follows the length
 * of the thought; it sits a little off the centre line; its corners are cut a
 * touch irregularly and its cotton grain is its own. It carries only what a real
 * page would — sometimes a line in Beth's hand, sometimes what the conversation
 * became, sometimes where it was collected — and, printed almost too lightly to
 * notice, the Library's own archival mark. Evidence, not a quote card.
 */
function Note({ fn, i }: { fn: FieldNote; i: number }) {
  const len = fn.obs.length
  const long = len > 90
  // ~13% more physical presence than before
  const width = long ? 'min(96%,680px)' : len > 46 ? 'min(90%,570px)' : 'min(84%,480px)'
  const side = i % 2 === 0 ? { marginLeft: 0, marginRight: 'auto' } : { marginLeft: 'auto', marginRight: 0 }
  const seed = parseInt(fn.n, 10) || i + 1
  // corners cut a little unevenly — no two sheets the same
  const radius = ['5px 8px 6px 7px', '7px 5px 8px 6px', '6px 7px 5px 8px', '8px 6px 7px 5px'][seed % 4]
  const strips = fn.tape || 0
  const followed = !!(fn.hand || fn.to || fn.trace || fn.where)

  return (
    <div style={{ ...surface(), width, ...side, position: 'relative', transform: `rotate(${fn.tilt})` }}>
      {/* linen tape, only on some — one strip or two, a little crooked */}
      {strips >= 1 && <Tape left={seed % 2 ? '13%' : '57%'} rot={seed % 2 ? -3.4 : 2.6} w="clamp(120px,17vw,196px)" />}
      {strips >= 2 && <Tape left={seed % 2 ? '64%' : '19%'} rot={seed % 2 ? 2.8 : -2.4} w="clamp(108px,15vw,168px)" />}

      <div style={{ position: 'relative', background: 'linear-gradient(158deg,#f8f2e6,#f2ebda 52%,#ece3d0)', boxShadow: '0 1px 2px rgba(60,44,20,0.10), 0 10px 16px -12px rgba(60,44,20,0.18)', padding: 'clamp(40px,4.8vw,68px) clamp(36px,4.6vw,64px) clamp(54px,5.6vw,78px)', borderRadius: radius, textAlign: 'left', overflow: 'hidden' }}>
        {/* this sheet's own cotton-fibre grain */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: fibre(seed), backgroundSize: '200px 200px', mixBlendMode: 'multiply', opacity: 0.05 }} />
        {/* a whisper of handling: a soft inner edge and a faint pressure sheen */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.07), inset 0 1px 0 rgba(255,252,245,0.6), inset 0 0 44px -16px rgba(110,86,46,0.15)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: '-10%', [seed % 2 ? 'left' : 'right']: '-8%', width: '46%', height: '54%', pointerEvents: 'none', background: 'radial-gradient(closest-side, rgba(255,253,247,0.5), transparent 72%)', mixBlendMode: 'soft-light' } as CSSProperties} />

        {/* the label — FIELD NOTE / No. 014, tiny and widely tracked */}
        <div style={{ position: 'relative', marginBottom: 'clamp(24px,3.2vw,38px)' }}>
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 8.5, letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.5)' }}>Field Note</div>
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10.5, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', marginTop: '0.55em' }}>No. {fn.n}</div>
          {fn.title && <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(43,39,35,0.44)', marginTop: '0.7em' }}>{fn.title}</div>}
        </div>

        {/* the observation — the hero, given room to breathe */}
        <p style={{ position: 'relative', fontFamily: serif, fontWeight: 300, fontSize: long ? 'clamp(23px,2.6vw,34px)' : 'clamp(26px,3.1vw,41px)', lineHeight: 1.46, color: 'rgba(43,39,35,0.9)', margin: 0, ...pretty }}>{fn.obs}</p>

        {/* the reveal — the emotional truth beneath, in Beth's hand */}
        {fn.hand && <p style={{ position: 'relative', fontFamily: hand, fontWeight: 500, fontSize: 'clamp(24px,2.9vw,36px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.82)', margin: 'clamp(18px,2.2vh,26px) 0 0' }}>{fn.hand}</p>}

        {/* the trace — what the conversation became */}
        {(fn.trace || fn.to) && <div style={{ position: 'relative', ...label, fontSize: 9, letterSpacing: '0.32em', color: 'rgba(122,94,52,0.56)', marginTop: 'clamp(28px,3.6vh,40px)' }}>{fn.trace || `This one became ${fn.to}.`}</div>}

        {/* provenance — a tiny archival caption, never explained */}
        {fn.where && <div style={{ position: 'relative', fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(43,39,35,0.4)', marginTop: followed ? 'clamp(14px,1.8vh,22px)' : 'clamp(26px,3.2vh,36px)' }}>{fn.where}</div>}

        {/* cataloged by the Library — printed almost too lightly to notice */}
        <div aria-hidden="true" style={{ position: 'absolute', right: 'clamp(22px,3vw,36px)', bottom: 'clamp(18px,2.4vw,28px)', textAlign: 'right', opacity: 0.32, transform: 'rotate(-1.1deg)', pointerEvents: 'none' }}>
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 6, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.9)' }}>Believe Studio Archive</div>
          <div style={{ height: 1, background: 'rgba(122,94,52,0.42)', margin: '3px 0 3px auto', width: '100%' }} />
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 6, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)' }}>Founder Note · {fn.n}</div>
        </div>
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
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '26ch', margin: 'clamp(36px,6vh,64px) auto 0', ...balance }}>Or years later, when someone finally understands what really happened.</p>
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
