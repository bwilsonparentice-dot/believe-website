import React, { useState, CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { ConversationNote } from '../components/ConversationNote'
import { EXPERIENCES, PHOTOS, type Faq } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const hand = "'Caveat',cursive"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

/** A small ™ set in superscript. */
function TM() {
  return <span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span>
}

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)',
}

/** A gentle scroll-linked reveal — the section surfaces as it enters the view. */
const surface = (range = 'entry 4% cover 30%'): CSSProperties => ({
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

/**
 * One quiet question — the query typeset like a line of collected correspondence,
 * the reply unfolding beneath it like a page turning, not software opening.
 */
function Correspondence({ item, index, open, onToggle }: { item: Faq; index: number; open: boolean; onToggle: () => void }) {
  const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'][index] || String(index + 1)
  return (
    <div style={{ padding: 'clamp(22px,3.4vh,38px) 0' }}>
      <El
        onClick={onToggle}
        style={{ display: 'grid', gridTemplateColumns: 'clamp(28px,4vw,52px) 1fr', gap: 'clamp(10px,2vw,22px)', alignItems: 'baseline', width: '100%', cursor: 'pointer', textAlign: 'left', color: open ? '#2b2723' : 'rgba(43,39,35,0.8)', transition: 'color 500ms ease' }}
        hover={{ color: '#2b2723' }}
      >
        <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px,1.5vw,19px)', color: 'rgba(122,94,52,0.55)', lineHeight: 1.5 }}>{roman}.</span>
        <span style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.4vw,30px)', lineHeight: 1.32, letterSpacing: '0.005em' }}>{item.q}</span>
      </El>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 640ms cubic-bezier(.22,.7,.2,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', margin: 'clamp(14px,2vh,20px) 0 0', marginLeft: 'clamp(38px,6vw,74px)', maxWidth: '48ch', opacity: open ? 1 : 0, transition: 'opacity 700ms ease 120ms', ...pretty }}>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * A quiet artifact — a single page from a founder's notebook, left resting on
 * the table. Not decoration: evidence that real conversations and real
 * decisions have already passed through this room. It isn't meant to be read.
 */
function NotebookArtifact() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: 'clamp(84px,15vh,190px) auto', ...surface('entry 2% cover 26%') }}>
      <div style={{ position: 'relative', width: 'min(78%,420px)', transform: 'rotate(-2.2deg)' }}>
        <div style={{ position: 'relative', background: 'linear-gradient(178deg, #fdfaf2, #f4ecda)', borderRadius: 3, padding: 'clamp(30px,4.4vw,52px) clamp(28px,4vw,46px) clamp(38px,5vw,60px)', boxShadow: '0 34px 60px -34px rgba(60,44,20,0.5), 0 2px 4px rgba(60,44,20,0.12)' }}>
          {/* the faint ruling of a notebook page */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 'clamp(30px,4.4vw,52px) 0', background: 'repeating-linear-gradient(180deg, transparent, transparent 33px, rgba(122,94,52,0.10) 33px, rgba(122,94,52,0.10) 34px)', opacity: 0.7, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', fontFamily: sans, fontWeight: 400, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.42)', marginBottom: '1.4em' }}>No. 027</div>
          <p style={{ position: 'relative', fontFamily: hand, fontWeight: 400, fontSize: 'clamp(23px,2.8vw,32px)', lineHeight: 1.5, color: 'rgba(52,40,26,0.62)', margin: 0 }}>The founder wasn’t asking about packaging.</p>
          <p style={{ position: 'relative', fontFamily: hand, fontWeight: 500, fontSize: 'clamp(23px,2.8vw,32px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.6)', margin: '0.35em 0 0' }}>She was asking for permission.</p>
          <p style={{ position: 'relative', fontFamily: hand, fontWeight: 400, fontSize: 'clamp(18px,2vw,23px)', lineHeight: 1.5, color: 'rgba(52,40,26,0.4)', margin: '1.3em 0 0', textAlign: 'right' }}>— from The Founder’s Room</p>
        </div>
      </div>
    </div>
  )
}

/**
 * A dedicated experience page — you step through a doorway and quietly learn
 * what happens in that room. Composed like eight pages of an architectural
 * journal: every section carries its own rhythm — centered, then columned, then
 * a vertical list, then museum labels — so the page rewards scrolling and never
 * repeats a template. It ends not with a checkout, but with a conversation.
 * (ctx.openDoorway(id).)
 */
export function DoorwayChapter({ ctx, id }: { ctx: Ctx; id: string }) {
  const x = EXPERIENCES[id]
  const [noteOpen, setNoteOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  if (!x) return null

  return (
    <ChapterShell onClose={ctx.closeDoorway} background="#efe6d3" z={130}>
      <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto', padding: 'clamp(100px,18vh,230px) 7vw clamp(80px,14vh,170px)', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ══ Chapter One — arrival & what it is · centered, calm ══════════ */}
        <div style={{ textAlign: 'center' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, marginBottom: '1.3em' }}>{x.eyebrow}</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.2vw,90px)', lineHeight: 1.01, margin: '0 0 0.4em' }}>{x.name}{x.tm && <TM />}</h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>{x.tagline}</p>

          {x.photo && (
            <div style={{ width: 'min(90%,660px)', margin: 'clamp(44px,8vh,90px) auto 0' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden', borderRadius: '999px 999px 6px 6px', boxShadow: '0 46px 90px -54px rgba(60,44,20,0.66)' }}>
                <ImageSlot src={PHOTOS[x.photo]} alt={x.photoAlt || x.name} fit="cover" placeholder={x.photoAlt || x.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 60% at 40% 22%, rgba(255,232,180,0.5), transparent 68%)' }} />
              </div>
            </div>
          )}

          {/* tightened cadence: divider drawn closer, label close beneath it */}
          <Divider h="clamp(44px,7vh,86px)" m="clamp(46px,8vh,96px) auto clamp(26px,4vh,44px)" />
          <div style={{ ...label, marginBottom: '1em' }}>What it is</div>
          {x.whatIsIt.map((t, i) => (
            <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: i === 0 ? 'clamp(21px,2.5vw,30px)' : 'clamp(18px,2vw,25px)', lineHeight: i === 0 ? 1.5 : 1.72, color: i === 0 ? 'rgba(43,39,35,0.9)' : 'rgba(43,39,35,0.72)', maxWidth: i === 0 ? '30ch' : '46ch', margin: i === 0 ? '0 auto' : 'clamp(20px,3vh,32px) auto 0', ...(i === 0 ? balance : pretty) }}>{t}</p>
          ))}
        </div>

        {/* ══ Chapter Two — who it's for · two-column, off the center axis ══ */}
        <section style={{ margin: 'clamp(96px,17vh,220px) auto 0', maxWidth: 900, ...surface() }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,2fr)', gap: 'clamp(24px,6vw,80px)', alignItems: 'start' }}>
            <div style={{ ...label, paddingTop: '0.7em', textAlign: 'left' }}>Who it’s for</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.4, color: '#2b2723', margin: 0, maxWidth: '22ch', ...balance }}>{x.whoFor}</p>
              {x.whoNotFor && <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.5)', margin: 'clamp(26px,4vh,40px) 0 0', maxWidth: '30ch', ...pretty }}>{x.whoNotFor}</p>}
            </div>
          </div>
        </section>

        {/* ══ Chapter Three — what's included · a vertical list, like verse ══ */}
        <section style={{ margin: 'clamp(96px,17vh,210px) auto 0', textAlign: 'center', ...surface() }}>
          <div style={{ ...label, marginBottom: 'clamp(40px,7vh,80px)' }}>{x.includedHeading || 'What’s included'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5.5vh,64px)' }}>
            {x.included.map((it, i) => (
              <div key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(24px,3.1vw,42px)', lineHeight: 1.2, color: 'rgba(43,39,35,0.84)', ...balance }}>{it}</div>
            ))}
          </div>
        </section>

        {/* a founder's notebook, left resting on the table */}
        <NotebookArtifact />

        {/* ══ Chapter Four — the particulars · museum wall labels ══════════ */}
        <section style={{ margin: 'clamp(70px,12vh,150px) auto 0', ...surface() }}>
          <div style={{ ...label, textAlign: 'center', marginBottom: 'clamp(48px,8vh,90px)' }}>The particulars</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 'clamp(40px,5vw,72px)', maxWidth: 860, margin: '0 auto' }}>
            {x.particulars.map((p, i) => (
              <div key={i} style={{ textAlign: 'left' }}>
                <div style={{ ...label, fontSize: 10, letterSpacing: '0.36em', color: 'rgba(122,94,52,0.62)', marginBottom: '1em' }}>{p.label}</div>
                <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.78)', ...pretty }}>{p.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ Chapter Five — investment · its own quiet moment, centered ═══ */}
        <section style={{ margin: 'clamp(130px,24vh,300px) auto 0', textAlign: 'center', ...surface() }}>
          <div style={{ ...label, marginBottom: 'clamp(28px,5vh,52px)' }}>Your investment</div>
          <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(42px,6vw,88px)', lineHeight: 1, color: '#2b2723' }}>{x.investment}</div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.45, color: 'rgba(122,94,52,0.78)', margin: 'clamp(30px,5vh,54px) auto 0', maxWidth: '26ch', ...balance }}>{x.investmentNote}</p>
        </section>

        {/* ══ Chapter Six — what changes · statements surfacing one by one ══ */}
        <section style={{ margin: 'clamp(120px,22vh,270px) auto 0', textAlign: 'center' }}>
          <div style={{ ...label, marginBottom: 'clamp(44px,8vh,84px)', ...surface('entry 0% cover 22%') }}>What changes because of it</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.26, color: '#2b2723', maxWidth: '22ch', margin: '0 auto', ...balance, ...surface('entry 2% cover 26%') }}>{x.changesLead}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6.5vh,80px)', margin: 'clamp(64px,11vh,130px) auto 0' }}>
            {x.changes.map((c, i) => (
              <p key={i} style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px,2.8vw,36px)', lineHeight: 1.25, color: 'rgba(122,94,52,0.86)', margin: 0, ...surface('entry 0% cover 20%') }}>{c}</p>
            ))}
          </div>
        </section>

        {/* ══ Chapter Seven — questions · quiet correspondence ════════════ */}
        <section style={{ margin: 'clamp(120px,22vh,260px) auto 0', maxWidth: 720, ...surface() }}>
          <div style={{ ...label, textAlign: 'center', marginBottom: 'clamp(40px,7vh,72px)' }}>Questions founders ask</div>
          <div>
            {x.faqs.map((f, i) => (
              <Correspondence key={i} item={f} index={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </section>

        {/* ══ Chapter Eight — joining · the words do the convincing ═══════ */}
        <section style={{ margin: 'clamp(130px,24vh,300px) auto 0', textAlign: 'center' }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.6vw,66px)', lineHeight: 1.12, color: '#2b2723', maxWidth: '18ch', margin: '0 auto', ...balance, ...surface('entry 2% cover 26%') }}>{x.joinLead}</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.7)', maxWidth: '44ch', margin: 'clamp(40px,7vh,72px) auto 0', ...pretty, ...surface() }}>{x.joinBody}</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.28, color: 'rgba(122,94,52,0.9)', maxWidth: '20ch', margin: 'clamp(80px,15vh,180px) auto 0', ...balance, ...surface() }}>{x.closing}</p>

          {/* the invitation, kept deliberately quiet — a line, not a billboard */}
          <El
            onClick={() => setNoteOpen(true)}
            style={{ display: 'inline-block', margin: 'clamp(48px,9vh,96px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', borderBottom: '1px solid rgba(122,94,52,0.5)', paddingBottom: 7, cursor: 'pointer', transition: 'color 500ms ease, border-color 500ms ease' }}
            hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}
          >
            Begin the Conversation
          </El>
        </section>

        <Divider h="clamp(48px,7vh,80px)" m="clamp(96px,16vh,190px) auto clamp(36px,6vh,60px)" />
        <div style={{ textAlign: 'center' }}><BackPill onClose={ctx.closeDoorway} label="← Back" /></div>
      </div>

      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
