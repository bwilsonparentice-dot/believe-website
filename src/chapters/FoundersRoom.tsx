import React, { useState, CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, ArchMark } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { ConversationNote } from '../components/ConversationNote'
import { Correspondence } from '../components/Correspondence'
import { EXPERIENCES, PHOTOS } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)',
}

/** A gentle scroll-linked reveal — quieter than the other rooms, on purpose. */
const surface = (range = 'entry 3% cover 26%'): CSSProperties => ({
  animation: 'fadeUpSoft 1300ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

const TRANSFORM = [
  'You start to make decisions differently.',
  'You stop carrying every decision alone.',
  'You grow clearer — and the company grows stronger for it.',
]

// The practical architecture of the room — each element given its own line to
// breathe, answering a real question a founder asks once they can imagine
// themselves here. The monthly rhythm lives in Gatherings; Cadence carries the
// standing, ongoing nature; growth lives in Rooms.
const SPECS = [
  { label: 'Cadence', value: 'A standing room, not a fixed-length program.' },
  { label: 'Gatherings', value: 'A monthly gathering in person, and the conversations that continue between them.' },
  { label: 'Belonging', value: 'Month to month, for as long as the room serves you.' },
  { label: 'Room Size', value: 'Up to eight founders around one table.' },
  { label: 'Placement', value: 'At the start, we place you alongside founders in a similar season of growth.' },
  { label: 'Rooms', value: 'When the Olive Room fills, the next quietly opens.' },
]

// The rooms of the House. For now only the Olive Room is revealed — its founding
// room. As the House genuinely grows, add the next plaque here (e.g. the Lantern
// Room, 'Now welcoming founders.') and mark the Olive Room 'Currently full.' —
// the layout already anticipates it; nothing else on the page needs to change.
const ROOMS = [
  { name: 'The Olive Room', image: '/photos/olive-room-plaque.webp', status: 'Now welcoming its founding founders.' },
]

// A brass plaque outside a private room — Beth's own olive-branch artwork,
// treated as architecture rather than an icon. Each room carries its own plaque,
// so a future room simply arrives with its own (e.g. the Lantern Room).
function RoomPlaque({ image, alt, status }: { image: string; alt: string; status: string }) {
  return (
    <div style={{ maxWidth: 128, margin: '0 auto', ...surface('entry 0% cover 20%') }}>
      <ImageSlot src={image} alt={alt} fit="contain" style={{ width: '100%', height: 'auto' }} />
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.85)', marginTop: 'clamp(28px,3.8vw,44px)', textAlign: 'center' }}>{status}</div>
    </div>
  )
}

/**
 * The Founder's Room — the emotional center of Believe Studio, and the quietest
 * room in the house. Where the Blueprint is paper and architecture, this is
 * space and presence: an immersive room, soft light, and a great deal of
 * silence. The visitor should feel themselves exhale. Not another artifact —
 * another emotional state. (ctx.openDoorway('founders-room').)
 */
export function FoundersRoom({ ctx }: { ctx: Ctx }) {
  const x = EXPERIENCES['founders-room']
  const [noteOpen, setNoteOpen] = useState(false)

  return (
    <ChapterShell onClose={ctx.closeDoorway} background="#efe7d5" z={130}>
      {/* the room's light — soft, slowly drifting, never quite noticed */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(42% 38% at 50% 6%, rgba(255,236,196,0.9), transparent 60%)', opacity: 0.66, animation: 'lightWander 90s ease-in-out infinite alternate' }} />

      {/* the room itself — no explanation, only presence */}
      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', height: 'clamp(380px,68vh,760px)', overflow: 'hidden', ...surface('entry 0% cover 12%') }}>
        <ImageSlot src={PHOTOS.founders} fit="cover" alt="The Founder’s Room — a quiet chair by a tall window in morning light" placeholder="a quiet chair by a tall window, morning light, only space to think" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'slowZoom 24s ease-out both' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(56% 52% at 34% 26%, rgba(255,226,178,0.34), transparent 68%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.08) 0%, transparent 30%, transparent 60%, rgba(239,231,213,0.7) 92%, #efe7d5 100%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(72px,12vh,150px) 8vw clamp(90px,16vh,200px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── the heading ───────────────────────────────────────────────── */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.4em' }}>The most personal room in the house</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.2vw,90px)', lineHeight: 1.01, margin: '0 0 0.45em' }}>The Founder’s Room<span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span></h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '22ch', ...balance }}>Every founder eventually needs a room like this.</p>

        {/* ── recognition — before any explanation, the room sees you ─────────
            Three quiet second-person lines name the weight a founder has
            learned to carry alone, then set it down. The room's whole purpose
            is that the visitor exhales; this is where that begins, in the first
            moments, so everything after lands on someone who feels understood. */}
        <div style={{ marginTop: 'clamp(84px,15vh,180px)', display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.8vh,20px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.5vw,32px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.64)', margin: 0, maxWidth: '27ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>By now, you have learned to carry it quietly &mdash;</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.5vw,32px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.64)', margin: 0, maxWidth: '27ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>to sound certain in the meeting when you weren&rsquo;t,</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.5vw,32px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.64)', margin: 0, maxWidth: '27ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>to make the hardest call alone, and live with it alone.</p>
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.28, color: '#2b2723', margin: 'clamp(44px,8vh,92px) auto 0', maxWidth: '16ch', ...balance, ...surface() }}>Here, you set it down.</p>

        {/* ── the passage ───────────────────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(100px,18vh,220px)', display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,24px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.86)', margin: 0, maxWidth: '24ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>Some decisions shouldn’t be made in isolation.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.86)', margin: 0, maxWidth: '24ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>Some questions deserve more than quick answers.</p>
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.28, color: '#2b2723', margin: 'clamp(56px,10vh,120px) auto 0', maxWidth: '20ch', ...balance, ...surface() }}>The Founder’s Room exists for the moments that shape the next chapter.</p>

        {/* ── the turn — the single communal payoff of the alone→not-alone spine.
            Recognition names the carrying; the passage names the room; this line
            answers both. The relief section that used to restate the carrying is
            gone, so the turn lands directly. */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(25px,3.3vw,45px)', lineHeight: 1.28, color: 'rgba(122,94,52,0.9)', margin: 'clamp(72px,13vh,150px) auto 0', maxWidth: '18ch', ...balance, ...surface() }}>You were never the only one carrying this.</p>

        {/* ── the first page — an honest beginning, not invented residue ──────
            The House has no history yet, and does not pretend to. Where a
            lived-in room would show the notes founders left behind, this room
            shows a blank first page: an invitation for the founding founders to
            write the first words, rather than evidence that others already have.
            The handwriting is the House's own hand, not a fabricated founder's. */}
        <div style={{ marginTop: 'clamp(88px,15vh,190px)' }}>
          <div style={{ ...label, marginBottom: 'clamp(40px,7vh,80px)', ...surface('entry 0% cover 22%') }}>The first page</div>

          <figure style={{ margin: '0 auto', width: 'min(72vw,252px)', padding: 'clamp(22px,2.8vw,32px) clamp(18px,2.2vw,28px)', background: '#efe7d5', border: '1px solid rgba(122,94,52,0.26)', boxShadow: 'inset 0 0 0 4px rgba(255,251,242,0.55), 0 24px 50px -34px rgba(60,44,20,0.55)', transform: 'rotate(-0.7deg)', ...surface() }}>
            <blockquote style={{ fontFamily: "'Caveat',cursive", fontWeight: 500, fontSize: 'clamp(21px,2.5vw,28px)', lineHeight: 1.32, color: 'rgba(43,39,35,0.72)', margin: 0 }}>The first page is still blank.</blockquote>
          </figure>

          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(20px,2.5vw,32px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.86)', margin: 'clamp(40px,7vh,80px) auto 0', maxWidth: '22ch', ...balance, ...surface() }}>The founders who arrive first will fill it.</p>
        </div>

        {/* ── what happens here — the room, as it is actually lived ────────
            Consolidates the former "What happens here" (process verbs), "Inside
            the room" (feature nouns), and "The rhythm" into one walk-through:
            not a list, but a single real conversation — from the decision a
            founder walks in with to the one move they leave holding. Her
            strongest lines are kept ("real businesses… real seasons", "one
            decision at a time"); the redundancy is gone. */}
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <div style={{ ...label, marginBottom: 'clamp(56px,10vh,110px)', ...surface('entry 0% cover 22%') }}>What happens here</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px,6vh,78px)' }}>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.24, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface('entry 0% cover 20%') }}>You bring the decision you&rsquo;ve been circling for weeks.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.24, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface('entry 0% cover 20%') }}>The room slows it down.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.24, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '23ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface('entry 0% cover 20%') }}>Noise is set aside. The assumption beneath the question is named out loud.</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.24, color: 'rgba(122,94,52,0.9)', margin: 0, maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface('entry 0% cover 20%') }}>And you leave holding one true next move.</p>
          </div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', color: 'rgba(122,94,52,0.7)', margin: 'clamp(56px,10vh,112px) auto 0', ...surface() }}>What the room holds &mdash;</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,3vh,30px)', marginTop: 'clamp(24px,4vh,44px)' }}>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.82)', margin: 0, ...balance, ...surface() }}>A trusted conversation.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '24ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface() }}>An outside perspective that owes you honesty.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.82)', margin: 0, ...balance, ...surface() }}>The accountability to actually move.</p>
          </div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.3, color: '#2b2723', margin: 'clamp(48px,8vh,96px) auto 0', maxWidth: '24ch', ...balance, ...surface() }}>Not a curriculum &mdash; real businesses, moving through real seasons.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', margin: 'clamp(36px,6vh,68px) auto 0', maxWidth: '22ch', ...balance, ...surface() }}>The work unfolds one decision at a time.</p>
        </div>

        {/* ── your room — not a cohort, a room ──────────────────────────── */}
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <div style={{ ...label, marginBottom: 'clamp(44px,8vh,90px)', ...surface('entry 0% cover 22%') }}>Your room</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.24, color: '#2b2723', margin: '0 auto', maxWidth: '18ch', ...balance, ...surface() }}>Every founder belongs to a room.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,27px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.6)', margin: 'clamp(32px,5vh,56px) auto 0', ...surface() }}>Not a cohort.<br />Not a forum.<br /><span style={{ color: '#2b2723' }}>A room.</span></p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.72)', margin: 'clamp(48px,8vh,96px) auto 0', maxWidth: '42ch', ...pretty, ...surface() }}>The Founder’s Room gathers up to eight founders around one table, returning to the same conversation over time &mdash; to work through what is actually in front of them, alongside people who understand what the decision carries.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.7)', margin: 'clamp(48px,8vh,96px) auto 0', maxWidth: '36ch', ...pretty, ...surface() }}>In time, some founders will stay together for years. Some will return to guide the founders who come after them.</p>

          {/* the plaque — treated as architecture, given room to breathe */}
          <div style={{ marginTop: 'clamp(90px,16vh,200px)' }}>
            {ROOMS.map((r) => (
              <RoomPlaque key={r.name} image={r.image} alt={`${r.name} — an olive branch on a brass plaque`} status={r.status} />
            ))}
          </div>

          {/* the founding room, spoken plainly around the plaque */}
          <div style={{ marginTop: 'clamp(52px,9vh,100px)', ...surface() }}>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: '#2b2723', margin: '0 auto', maxWidth: '26ch', ...balance }}>The Olive Room is where the first founders of Believe Studio will gather.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.6)', margin: 'clamp(48px,8vh,96px) auto 0' }}>No recordings.<br />No performance.</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.36, color: '#2b2723', margin: 'clamp(40px,7vh,80px) auto 0', maxWidth: '24ch', ...balance }}>Just founders helping one another build the next chapter.</p>
          </div>

        </div>

        {/* ── the particulars — quiet, never transactional ──────────────── */}
        <div style={{ marginTop: 'clamp(40px,7vh,90px)', ...surface() }}>
          <div style={{ ...label, marginBottom: 'clamp(48px,8vh,90px)' }}>In practice</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px,7vh,72px)', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            {SPECS.map((p, i) => (
              <div key={i}>
                <div style={{ ...label, fontSize: 10, letterSpacing: '0.4em', marginBottom: '0.9em' }}>{p.label}</div>
                <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,27px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.82)', maxWidth: '32ch', margin: '0 auto', ...balance }}>{p.value}</div>
              </div>
            ))}
          </div>

          {/* the investment — given its own space and a quiet certainty */}
          <div style={{ marginTop: 'clamp(64px,11vh,130px)', textAlign: 'center' }}>
            <div style={{ ...label, fontSize: 10, letterSpacing: '0.42em', marginBottom: '0.9em' }}>Investment</div>
            <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.05, color: '#2b2723' }}>$995 <span style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '0.46em', color: 'rgba(122,94,52,0.78)' }}>/ month</span></div>
          </div>
        </div>

        {/* ── the transformation — one sentence at a time ───────────────── */}
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <div style={{ ...label, marginBottom: 'clamp(56px,10vh,110px)', ...surface('entry 0% cover 22%') }}>What changes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(38px,7vh,90px)' }}>
            {TRANSFORM.map((t, i) => {
              const last = i === TRANSFORM.length - 1
              return (
                <p key={i} style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: last ? 'clamp(28px,3.8vw,52px)' : 'clamp(24px,3.1vw,40px)', lineHeight: 1.26, color: last ? '#2b2723' : 'rgba(122,94,52,0.86)', margin: 0, maxWidth: '22ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface('entry 0% cover 20%') }}>{t}</p>
              )
            })}
          </div>
        </div>

        {/* ── questions ─────────────────────────────────────────────────── */}
        <div style={{ marginTop: 'var(--space-lg)', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', ...surface() }}>
          <div style={{ ...label, marginBottom: 'clamp(40px,7vh,72px)' }}>Questions founders ask</div>
          <Correspondence items={x.faqs} />
        </div>

        {/* ── the invitation — the quietest on the website ──────────────── */}
        <div style={{ marginTop: 'var(--space-xl)' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.72)', margin: '0 auto', maxWidth: '30ch', ...pretty, ...surface('entry 2% cover 26%') }}>This room isn&rsquo;t here to tell you what Believe Studio has become.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.34, color: 'rgba(122,94,52,0.9)', margin: 'clamp(28px,5vh,52px) auto 0', maxWidth: '26ch', ...balance, ...surface() }}>It&rsquo;s here to invite you to help shape what it will become.</p>

          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.2, color: '#2b2723', margin: 'clamp(48px,9vh,96px) auto 0', ...balance, ...surface() }}>The door is open.</p>

          <El
            onClick={() => setNoteOpen(true)}
            style={{ display: 'inline-block', margin: 'clamp(56px,10vh,110px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', borderBottom: '1px solid rgba(122,94,52,0.5)', paddingBottom: 7, cursor: 'pointer', transition: 'color 500ms ease, border-color 500ms ease' }}
            hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}
          >
            Enter the Founder’s Room
          </El>
        </div>

        <div style={{ marginTop: 'clamp(110px,20vh,220px)', textAlign: 'center' }}><RoomNav ctx={ctx} slug="founders-room" /></div>
      </div>

      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
