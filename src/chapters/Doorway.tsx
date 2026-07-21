import React, { useState } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { ConversationNote } from '../components/ConversationNote'
import { EXPERIENCES, PHOTOS, type Faq } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as React.CSSProperties['textWrap'] }

/** A small ™ set in superscript. */
function TM() {
  return <span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span>
}

const label: React.CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)',
}

/** A section eyebrow — the quiet caption above each part of the room. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ ...label, marginBottom: '1.4em' }}>{children}</div>
}

/** A body paragraph, centered and measured for reading. */
function P({ children, dim = false, max = '52ch' }: { children: React.ReactNode; dim?: boolean; max?: string }) {
  return (
    <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: dim ? 'rgba(43,39,35,0.6)' : 'rgba(43,39,35,0.78)', maxWidth: max, margin: '0 auto 1.1em', ...pretty }}>{children}</p>
  )
}

/**
 * One quiet FAQ row — the question always visible, the answer unfolding on a
 * hairline. A ledger you read, not an app you operate.
 */
function FaqRow({ item, open, onToggle }: { item: Faq; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderTop: '1px solid rgba(122,94,52,0.26)' }}>
      <El
        onClick={onToggle}
        style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1.4em', width: '100%', padding: 'clamp(20px,3vw,28px) 0', cursor: 'pointer', textAlign: 'left', color: open ? '#2b2723' : 'rgba(43,39,35,0.82)', transition: 'color 400ms ease' }}
        hover={{ color: '#2b2723' }}
      >
        <span style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.3 }}>{item.q}</span>
        <span aria-hidden="true" style={{ position: 'relative', flex: '0 0 auto', width: 13, height: 13, marginTop: '0.5em' }}>
          <span style={{ position: 'absolute', top: '50%', left: 0, width: 13, height: 1, background: 'rgba(122,94,52,0.7)', transform: 'translateY(-50%)' }} />
          <span style={{ position: 'absolute', top: 0, left: '50%', width: 1, height: 13, background: 'rgba(122,94,52,0.7)', transform: `translateX(-50%) scaleY(${open ? 0 : 1})`, transition: 'transform 500ms cubic-bezier(.2,.7,.2,1)' }} />
        </span>
      </El>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 560ms cubic-bezier(.2,.7,.2,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.66)', margin: '0 0 clamp(22px,3.2vw,30px)', maxWidth: '52ch', ...pretty }}>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * A dedicated experience page — you step through a doorway and quietly learn
 * what happens in that room. Emotionally driven, practically complete: what it
 * is, who it's for, what's included, the particulars, what changes, and the
 * questions founders ask. It never ends with "Buy Now." It ends with a
 * conversation. (ctx.openDoorway(id).)
 */
export function DoorwayChapter({ ctx, id }: { ctx: Ctx; id: string }) {
  const x = EXPERIENCES[id]
  const [noteOpen, setNoteOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  if (!x) return null

  const H = { fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.2vw,90px)', lineHeight: 1.01, margin: '0 0 0.4em', color: '#2b2723' } as React.CSSProperties

  return (
    <ChapterShell onClose={ctx.closeDoorway} background="#efe6d3" z={130}>
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(100px,18vh,230px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── arrival — you've stepped inside ─────────────────────────── */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.3em' }}>{x.eyebrow}</div>
        <h2 style={{ ...H }}>{x.name}{x.tm && <TM />}</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>{x.tagline}</p>

        {x.photo && (
          <div style={{ width: 'min(90%,640px)', margin: 'clamp(44px,8vh,90px) auto 0' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden', borderRadius: '999px 999px 6px 6px', boxShadow: '0 46px 90px -54px rgba(60,44,20,0.66)' }}>
              <ImageSlot src={PHOTOS[x.photo]} alt={x.photoAlt || x.name} fit="cover" placeholder={x.photoAlt || x.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 60% at 40% 22%, rgba(255,232,180,0.5), transparent 68%)' }} />
            </div>
          </div>
        )}

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,140px) auto" />

        {/* ── what it is ──────────────────────────────────────────────── */}
        <Eyebrow>What it is</Eyebrow>
        {x.whatIsIt.map((t, i) => (
          <P key={i} max="46ch">{i === 0 ? <span style={{ fontSize: '1.12em', color: 'rgba(43,39,35,0.9)' }}>{t}</span> : t}</P>
        ))}

        <Divider />

        {/* ── who it's for ────────────────────────────────────────────── */}
        <Eyebrow>Who it’s for</Eyebrow>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.56, color: 'rgba(43,39,35,0.86)', maxWidth: '34ch', margin: '0 auto', ...balance }}>{x.whoFor}</p>
        {x.whoNotFor && <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.5)', maxWidth: '32ch', margin: '1.4em auto 0', ...balance }}>{x.whoNotFor}</p>}

        <Divider />

        {/* ── what's included ─────────────────────────────────────────── */}
        <Eyebrow>{x.includedHeading || 'What’s included'}</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,2vh,18px)', maxWidth: 440, margin: '0 auto', textAlign: 'left' }}>
          {x.included.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.9em' }}>
              <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(122,94,52,0.55)', flex: '0 0 auto', transform: 'translateY(-4px)' }} />
              <span style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.8)' }}>{it}</span>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── the particulars — the quiet ledger ──────────────────────── */}
        <Eyebrow>The particulars</Eyebrow>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'left' }}>
          {x.particulars.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(120px,0.5fr) 1fr', gap: 'clamp(16px,4vw,48px)', alignItems: 'baseline', padding: 'clamp(18px,2.6vw,26px) 0', borderTop: '1px solid rgba(122,94,52,0.24)' }}>
              <div style={{ ...label, fontSize: 10, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.6)' }}>{p.label}</div>
              <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.82)', ...pretty }}>{p.value}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.24)' }} />
        </div>

        <Divider />

        {/* ── what changes because of it ──────────────────────────────── */}
        <Eyebrow>What changes because of it</Eyebrow>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.28, color: '#2b2723', maxWidth: '24ch', margin: '0 auto clamp(40px,7vh,72px)', ...balance }}>{x.changesLead}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,22px)', maxWidth: '30ch', margin: '0 auto' }}>
          {x.changes.map((c, i) => (
            <p key={i} style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.86)', margin: 0 }}>{c}</p>
          ))}
        </div>

        <Divider />

        {/* ── questions founders ask ──────────────────────────────────── */}
        <Eyebrow>Questions founders ask</Eyebrow>
        <div style={{ maxWidth: 620, margin: 'clamp(10px,2vh,20px) auto 0', textAlign: 'left' }}>
          {x.faqs.map((f, i) => (
            <FaqRow key={i} item={f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.26)' }} />
        </div>

        {/* ── the invitation — a conversation, never a checkout ───────── */}
        <Divider h="clamp(56px,10vh,120px)" m="clamp(72px,13vh,150px) auto clamp(40px,7vh,72px)" />
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.2, color: '#2b2723', maxWidth: '22ch', margin: '0 auto clamp(40px,7vh,66px)', ...balance }}>{x.closing}</p>
        <El
          onClick={() => setNoteOpen(true)}
          style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#f6efe4', background: '#3a2f1e', border: '1px solid #3a2f1e', borderRadius: 2, padding: '16px 40px', cursor: 'pointer', transition: 'background 500ms ease, box-shadow 500ms ease' }}
          hover={{ background: '#54432a', boxShadow: '0 0 34px -6px rgba(201,162,78,0.6)' }}
        >
          Begin the Conversation
        </El>

        <Divider h="clamp(48px,7vh,80px)" m="clamp(52px,9vh,96px) auto clamp(36px,6vh,60px)" />
        <BackPill onClose={ctx.closeDoorway} label="← Back to the doorways" />
      </div>

      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
