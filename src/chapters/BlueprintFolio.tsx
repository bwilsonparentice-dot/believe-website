import React, { useState, CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { ConversationNote } from '../components/ConversationNote'
import { ArchiveCard } from '../components/ArchiveCard'
import { Correspondence } from '../components/Correspondence'
import { EXPERIENCES, PHOTOS, BLUEPRINT_DRAWINGS, type Drawing } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const graphite = 'rgba(43,39,35,'

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)',
}

const surface = (range = 'entry 4% cover 30%'): CSSProperties => ({
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

/** A thin architectural rule — a dimension line drawn across the sheet. */
function ArchRule({ m = 'clamp(90px,16vh,200px) auto' }: { m?: string }) {
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: 'min(320px,58%)', height: 1, margin: m, background: `linear-gradient(90deg, transparent, ${graphite}0.34) 20%, ${graphite}0.34) 80%, transparent)` }}>
      <span style={{ position: 'absolute', left: '20%', top: -3, width: 1, height: 7, background: `${graphite}0.34)` }} />
      <span style={{ position: 'absolute', left: '80%', top: -3, width: 1, height: 7, background: `${graphite}0.34)` }} />
    </div>
  )
}

/** A small corner registration mark, as on a real drawing sheet. */
function Reg({ s }: { s: CSSProperties }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ position: 'absolute', opacity: 0.42, ...s }}>
      <path d="M6 0.5 V11.5 M0.5 6 H11.5" stroke={`${graphite}0.5)`} strokeWidth="0.7" />
    </svg>
  )
}

/**
 * One sheet from the folio. The furniture is consistent — a faint frame,
 * corner registration marks, a ghost plate numeral, and a title block with the
 * sheet number — so the seven read as one architectural set. The content
 * composition alternates, so the page never repeats.
 */
function DrawingSheet({ d, variant, sketch }: { d: Drawing; variant: 'center' | 'left' | 'split'; sketch?: boolean }) {
  const align = variant === 'left' || variant === 'split' ? 'left' : 'center'
  const numeral = (
    <div style={{ ...label, fontSize: 10, letterSpacing: '0.44em', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Drawing {d.numeral}</div>
  )
  const name = (
    <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,60px)', lineHeight: 1.04, margin: 0, color: '#2b2723' }}>{d.name}</h3>
  )
  const meaning = (
    <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,29px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.86)', margin: variant === 'split' ? 0 : 'clamp(18px,2.6vh,28px) auto 0', maxWidth: '30ch', ...balance }}>{d.meaning}</p>
  )
  const narrative = (
    <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.66)', margin: variant === 'split' ? 'clamp(18px,2.6vh,26px) 0 0' : 'clamp(22px,3.4vh,40px) auto 0', maxWidth: variant === 'center' ? '40ch' : '44ch', marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0, ...pretty }}>{d.narrative}</p>
  )

  return (
    <article style={{ position: 'relative', border: `1px solid ${graphite}0.13)`, padding: 'clamp(40px,6vw,86px) clamp(34px,5vw,74px) clamp(64px,9vw,110px)', margin: 'clamp(40px,7vh,96px) 0', textAlign: align, ...surface('entry 3% cover 24%') }}>
      {/* corner registration marks */}
      <Reg s={{ top: 6, left: 6 }} /><Reg s={{ top: 6, right: 6 }} />
      <Reg s={{ bottom: 6, left: 6 }} /><Reg s={{ bottom: 6, right: 6 }} />

      {/* a faint ghost plate numeral, like a watermark on the sheet */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(6px,1.5vw,20px)', left: align === 'center' ? '50%' : 'clamp(26px,4vw,60px)', transform: align === 'center' ? 'translateX(-50%)' : 'none', fontFamily: serif, fontWeight: 500, fontSize: 'clamp(120px,20vw,260px)', lineHeight: 0.8, color: `${graphite}0.035)`, pointerEvents: 'none', userSelect: 'none' }}>{d.numeral}</div>

      {/* the drawing content */}
      <div style={{ position: 'relative' }}>
        {variant === 'split' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.35fr)', gap: 'clamp(24px,5vw,72px)', alignItems: 'start' }}>
            <div>{numeral}{name}</div>
            <div style={{ paddingTop: 'clamp(6px,2vh,26px)' }}>{meaning}{narrative}</div>
          </div>
        ) : (
          <>
            {numeral}
            {name}
            {meaning}
            {/* a small architectural sketch, on the one sheet that pairs with one */}
            {sketch && (
              <svg width="200" height="72" viewBox="0 0 200 72" fill="none" aria-hidden="true" style={{ display: 'block', margin: 'clamp(28px,4vh,44px) 0 0', opacity: 0.5 }}>
                <path d="M4 68 L4 30 A34 34 0 0 1 72 30 L72 68" stroke={`${graphite}0.34)`} strokeWidth="1" />
                <path d="M92 68 L92 34 A26 26 0 0 1 144 34 L144 68" stroke={`${graphite}0.28)`} strokeWidth="1" />
                <path d="M160 68 L160 40 A18 18 0 0 1 196 40 L196 68" stroke={`${graphite}0.22)`} strokeWidth="1" />
                <path d="M0 68 H200" stroke={`${graphite}0.3)`} strokeWidth="0.8" strokeDasharray="2 4" />
              </svg>
            )}
            {narrative}
          </>
        )}
      </div>

      {/* the title block, in the corner of every sheet */}
      <div style={{ position: 'absolute', right: 0, bottom: 0, borderLeft: `1px solid ${graphite}0.16)`, borderTop: `1px solid ${graphite}0.16)`, padding: 'clamp(8px,1vw,11px) clamp(12px,1.6vw,18px)', display: 'flex', alignItems: 'baseline', gap: 'clamp(12px,1.6vw,20px)', textAlign: 'left' }}>
        <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 8.5, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.55)' }}>The Believe Blueprint</span>
        <span style={{ fontFamily: sans, fontWeight: 500, fontSize: 11, letterSpacing: '0.18em', color: 'rgba(43,39,35,0.6)' }}>{d.sheet}</span>
        <span aria-hidden="true" style={{ fontFamily: sans, fontWeight: 400, fontSize: 8.5, letterSpacing: '0.2em', color: 'rgba(122,94,52,0.42)' }}>REV △</span>
      </div>
    </article>
  )
}

const CHANGES = [
  'You stop guessing.',
  'You begin building with intention.',
  'I can finally see the whole picture.',
  'I know what matters most.',
  'I know my next move.',
  'I have a plan I believe in.',
]

/**
 * The Believe Blueprint — presented as the signature intellectual property of
 * Believe Studio, opened like the first pages of an architectural folio rather
 * than described like a consulting service. Architecture comes before execution.
 * (ctx.openDoorway('believe-blueprint').)
 */
export function BlueprintFolio({ ctx }: { ctx: Ctx }) {
  const x = EXPERIENCES['believe-blueprint']
  const [noteOpen, setNoteOpen] = useState(false)

  const specs: { label: string; value: string }[] = [
    ...x.particulars,
    { label: 'Your investment', value: x.investment },
  ]

  return (
    <ChapterShell onClose={ctx.closeDoorway} background="#ece5d1" z={130}>
      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: 'clamp(120px,22vh,280px) 7vw clamp(80px,14vh,170px)', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── opening — the folio, resting on the oak table, in an arch ──── */}
        <div style={{ width: 'min(90%,660px)', margin: '0 auto', ...surface('entry 0% cover 18%') }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden', borderRadius: '999px 999px 6px 6px', boxShadow: '0 60px 110px -60px rgba(60,44,20,0.66)' }}>
            <ImageSlot src={PHOTOS.blueprint} alt="The Believe Blueprint — an open journal and architectural plans resting on the oak table in morning light" fit="cover" placeholder="The Believe Blueprint resting on the oak table" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 60% at 40% 22%, rgba(255,232,180,0.5), transparent 68%)' }} />
          </div>
        </div>

        {/* ── the heading, in the language of the other rooms ───────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(80px,14vh,170px)' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, marginBottom: '1.3em' }}>{x.eyebrow}</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.2vw,90px)', lineHeight: 1.01, margin: '0 0 0.4em' }}>{x.name}<span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span></h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>{x.tagline}</p>
        </div>

        <ArchRule m="clamp(96px,17vh,220px) auto" />

        {/* ── the manifesto, then the philosophy ────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.8vw,68px)', lineHeight: 1.1, margin: '0 auto clamp(48px,8vh,96px)', maxWidth: '18ch', ...balance }}>We don’t build business plans. <span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.92)' }}>We reveal business architecture.</span></h2>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.86)', maxWidth: '28ch', margin: '0 auto', ...balance }}>Business plans attempt to predict the future. <span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.9)' }}>Architecture creates structures capable of carrying it.</span></p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.72)', maxWidth: '46ch', margin: 'clamp(48px,8vh,90px) auto 0', ...pretty }}>The Believe Blueprint™ is not a template, a deck, or a collection of recommendations. It is the architectural plan for your next chapter — a thoughtful examination of your company, your opportunities, your leadership, and the decisions that will shape what comes next.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.82)', maxWidth: '32ch', margin: 'clamp(34px,6vh,60px) auto 0', ...balance }}>Every Blueprint is built from the ground up. Never templated. Never borrowed. Always designed around the founder and the company they are becoming.</p>
        </div>

        {/* ── transition into the drawings ──────────────────────────────── */}
        <ArchRule m="clamp(110px,20vh,240px) auto clamp(70px,12vh,150px)" />
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...label, marginBottom: 'clamp(30px,5vh,52px)' }}>What we architect together</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.78)', maxWidth: '40ch', margin: '0 auto', ...pretty }}>Every meaningful building begins with a series of architectural drawings. The Believe Blueprint™ is built the same way — each drawing revealing another layer of your company’s architecture, until the complete picture comes into focus.</p>
        </div>

        {/* ── the seven drawings — one folio sheet at a time ────────────── */}
        <div style={{ marginTop: 'clamp(60px,10vh,120px)' }}>
          <DrawingSheet d={BLUEPRINT_DRAWINGS[0]} variant="center" />
          <DrawingSheet d={BLUEPRINT_DRAWINGS[1]} variant="left" />
          <DrawingSheet d={BLUEPRINT_DRAWINGS[2]} variant="split" />
          <DrawingSheet d={BLUEPRINT_DRAWINGS[3]} variant="left" sketch />

          {/* an archival note, resting between the drawings */}
          {x.archive && <ArchiveCard note={x.archive} />}

          <DrawingSheet d={BLUEPRINT_DRAWINGS[4]} variant="center" />
          <DrawingSheet d={BLUEPRINT_DRAWINGS[5]} variant="split" />
          <DrawingSheet d={BLUEPRINT_DRAWINGS[6]} variant="center" />
        </div>

        {/* ── the particulars — architectural specifications ────────────── */}
        <ArchRule m="clamp(110px,20vh,240px) auto clamp(60px,10vh,120px)" />
        <div style={{ ...surface() }}>
          <div style={{ ...label, textAlign: 'center', marginBottom: 'clamp(48px,8vh,90px)' }}>The particulars</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'clamp(36px,4.5vw,64px)', maxWidth: 820, margin: '0 auto' }}>
            {specs.map((p, i) => {
              const invest = p.label === 'Your investment'
              return (
                <div key={i} style={{ textAlign: 'left' }}>
                  <div style={{ ...label, fontSize: 10, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.62)', marginBottom: '1em' }}>{p.label}</div>
                  <div style={{ fontFamily: serif, fontWeight: 400, fontSize: invest ? 'clamp(28px,3.4vw,44px)' : 'clamp(18px,2vw,24px)', lineHeight: invest ? 1.05 : 1.55, color: invest ? '#2b2723' : 'rgba(43,39,35,0.8)', ...pretty }}>{p.value}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── what changes — one sentence at a time ─────────────────────── */}
        <ArchRule m="clamp(120px,22vh,260px) auto clamp(60px,10vh,120px)" />
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...label, marginBottom: 'clamp(50px,9vh,100px)', ...surface('entry 0% cover 22%') }}>What changes because of it</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6.5vh,82px)' }}>
            {CHANGES.map((c, i) => (
              <p key={i} style={{ fontFamily: serif, fontStyle: i < 2 ? 'normal' : 'italic', fontWeight: 400, fontSize: 'clamp(24px,3.2vw,42px)', lineHeight: 1.24, color: i < 2 ? '#2b2723' : 'rgba(122,94,52,0.86)', margin: 0, maxWidth: '22ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface('entry 0% cover 20%') }}>{c}</p>
            ))}
          </div>
        </div>

        {/* ── questions founders ask ────────────────────────────────────── */}
        <ArchRule m="clamp(120px,22vh,260px) auto clamp(50px,9vh,96px)" />
        <div style={{ maxWidth: 720, margin: '0 auto', ...surface() }}>
          <div style={{ ...label, textAlign: 'center', marginBottom: 'clamp(40px,7vh,72px)' }}>Questions founders ask</div>
          <Correspondence items={x.faqs} />
        </div>

        {/* ── the invitation — the words create the desire ──────────────── */}
        <ArchRule m="clamp(120px,22vh,260px) auto clamp(60px,10vh,120px)" />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.8vw,52px)', lineHeight: 1.16, color: '#2b2723', maxWidth: '18ch', margin: '0 auto', ...balance, ...surface('entry 2% cover 26%') }}>{x.joinLead}</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.7)', maxWidth: '44ch', margin: 'clamp(40px,7vh,72px) auto 0', ...pretty, ...surface() }}>{x.joinBody}</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.9)', maxWidth: '22ch', margin: 'clamp(70px,13vh,160px) auto 0', ...balance, ...surface() }}>{x.closing}</p>

          <El
            onClick={() => setNoteOpen(true)}
            style={{ display: 'inline-block', margin: 'clamp(48px,9vh,96px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', borderBottom: '1px solid rgba(122,94,52,0.5)', paddingBottom: 7, cursor: 'pointer', transition: 'color 500ms ease, border-color 500ms ease' }}
            hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}
          >
            Begin the Conversation
          </El>
        </div>

        <ArchRule m="clamp(96px,16vh,190px) auto clamp(36px,6vh,60px)" />
        <div style={{ textAlign: 'center' }}><BackPill onClose={ctx.closeDoorway} label="← Back" /></div>
      </div>

      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
