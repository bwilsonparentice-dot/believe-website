import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { PHOTOS } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const hand = "'Caveat',cursive"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

// where a founder can write to stay close — swapped for a proper list when ready
const STAY_LINK = 'mailto:bwilsonparentice@gmail.com?subject=Staying%20close%20to%20the%20House'

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.66)',
}

const surface = (range = 'entry 2% cover 26%'): CSSProperties => ({
  animation: 'fadeUpSoft 1300ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

// the wider life of the House — four things always happening somewhere nearby.
// two of them are rooms of their own, and quietly lead there.
type Card = { title: string; lines: string[]; go?: 'fieldnotes' | 'residence' }
const CARDS: Card[] = [
  { title: 'Field Notes', lines: ['Observations gathered from real founder work.', 'Not theory. Not trends.', 'Lessons earned in the room.'], go: 'fieldnotes' },
  { title: 'In Residence', lines: ['Each month a different practitioner enters the House.', 'Together we work through one real founder challenge.', 'Every Resident leaves something behind.'], go: 'residence' },
  { title: 'House Updates', lines: ['New Residents. New Library additions.', 'New Founder’s Rooms. Stories from founders.', 'The House continues to grow.'] },
  { title: 'Occasional Gatherings', lines: ['From time to time the doors open.', 'Founders gather — sometimes online, sometimes around a table.', 'Always with intention.'] },
]

/**
 * The Visionary Collective — the broadest circle inside Believe Studio. Not a
 * membership, not a newsletter, not a community platform: the wider life of the
 * House, where founders stay close between conversations, workshops and rooms.
 * Everyone is welcome; no path is expected. (openDoorway('visionary-collective').)
 */
export function VisionaryCollectiveChapter({ ctx }: { ctx: Ctx }) {
  const goCard = (c: Card) => (c.go === 'fieldnotes' ? ctx.openFieldNotes : c.go === 'residence' ? ctx.openStudio : undefined)

  return (
    <ChapterShell onClose={ctx.closeDoorway} background="#f4ede0">
      <div style={{ position: 'relative', maxWidth: 840, margin: '0 auto', padding: 'clamp(104px,20vh,260px) 7vw clamp(90px,16vh,200px)', color: '#2b2723' }}>

        {/* ── the opening — the widest circle ───────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, fontSize: 11, marginBottom: '1.6em' }}>The widest circle</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.4vw,96px)', lineHeight: 1.0, margin: '0 0 0.5em' }}>The Visionary Collective</h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.44, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '30ch', ...balance }}>A place to stay connected to the ideas, conversations and founders shaping Believe Studio.</p>
        </div>

        {/* ── who it's for — no single readiness required ───────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(90px,16vh,200px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.38, color: '#2b2723', maxWidth: '24ch', margin: '0 auto', ...balance }}>Not every founder is ready for the same conversation.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.95, color: 'rgba(43,39,35,0.64)', maxWidth: '34ch', margin: 'clamp(40px,7vh,80px) auto 0' }}>Some are building their first product.<br />Some are preparing for retail.<br />Some are rebuilding after a difficult season.<br />Some simply want to stay close to people who understand the journey.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.44, color: 'rgba(122,94,52,0.82)', margin: 'clamp(40px,7vh,80px) auto 0', maxWidth: '24ch', ...balance }}>The Visionary Collective exists for all of them.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', maxWidth: '30ch', margin: 'clamp(36px,6vh,64px) auto 0', ...pretty }}>It is where the wider Believe Studio community gathers between conversations, workshops and rooms.</p>
        </div>

        {/* ── an image — the entrance hall, conversations always nearby ──── */}
        <div style={{ margin: 'clamp(110px,20vh,240px) auto 0', width: 'min(96%,760px)', ...surface() }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: 'clamp(120px,22vw,300px) clamp(120px,22vw,300px) 8px 8px', boxShadow: '0 60px 110px -60px rgba(60,44,20,0.6)' }}>
            <ImageSlot src={PHOTOS.people} alt="An oak table in morning light — coffee, an open journal, empty chairs, a curtain moving gently" fit="cover" placeholder="an oak table at sunrise — coffee, an open notebook, empty chairs, morning light" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 56% at 38% 22%, rgba(255,230,178,0.5), transparent 70%)' }} />
          </div>
        </div>

        {/* ── what you'll find here — four quiet editorial cards ─────────── */}
        <div style={{ marginTop: 'clamp(120px,22vh,280px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, textAlign: 'center', marginBottom: 'clamp(48px,8vh,90px)' }}>What you’ll find here</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(20px,3vw,34px)' }}>
            {CARDS.map((c) => {
              const go = goCard(c)
              const inner = (
                <>
                  <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.04, margin: '0 0 0.7em', color: '#2b2723' }}>{c.title}{go && <span style={{ fontFamily: sans, fontSize: 13, letterSpacing: 0, color: 'rgba(122,94,52,0.5)', marginLeft: '0.5em', verticalAlign: 'middle' }}>→</span>}</h3>
                  {c.lines.map((l, k) => (
                    <p key={k} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.66)', margin: k === 0 ? 0 : '0.5em 0 0' }}>{l}</p>
                  ))}
                </>
              )
              const base: CSSProperties = { position: 'relative', textAlign: 'left', background: 'linear-gradient(168deg, rgba(255,250,240,0.7), rgba(246,238,222,0.5))', borderRadius: '3px 3px 3px 3px', padding: 'clamp(36px,4.4vw,54px) clamp(32px,4vw,48px)', boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.1)' }
              return go ? (
                <El key={c.title} onClick={go} style={{ ...base, cursor: 'pointer', transition: 'box-shadow 500ms ease, transform 500ms ease' }} hover={{ boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.26), 0 30px 60px -44px rgba(60,44,20,0.5)', transform: 'translateY(-3px)' }}>{inner}</El>
              ) : (
                <div key={c.title} style={base}>{inner}</div>
              )
            })}
          </div>
        </div>

        {/* ── the house has many rooms — no expected path ───────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '2em' }}>The House has many rooms</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.7)', maxWidth: '30ch', margin: '0 auto' }}>Some founders begin here.<br />Some eventually request a Conversation.<br />Some step into a Believe Blueprint.<br />Some join a Founder’s Room.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.82)', margin: 'clamp(44px,7vh,84px) auto 0', maxWidth: '22ch', ...balance }}>There is no expected path.<br />Only the one that’s right for you.</p>
        </div>

        {/* ── the quiet invitation — stay close ─────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, fontSize: 11, letterSpacing: '0.46em', marginBottom: '1.8em' }}>Stay close</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.6, color: '#2b2723', maxWidth: '26ch', margin: '0 auto' }}>We’ll let you know when a new Resident enters the House.<br />When a new Field Note is written.<br />When another room quietly opens.</p>
          <a
            href={STAY_LINK}
            style={{ display: 'inline-block', margin: 'clamp(52px,9vh,100px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.36em', textTransform: 'uppercase', color: '#f4ede0', background: '#3a2f1e', border: '1px solid #3a2f1e', borderRadius: 2, padding: '15px 42px', textDecoration: 'none' }}
          >
            Stay Connected
          </a>
        </div>

        {/* ── a personal note, in Beth's hand ───────────────────────────── */}
        <div style={{ marginTop: 'clamp(120px,22vh,280px)', ...surface() }}>
          <div style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(34px,4.5vw,58px)', background: 'linear-gradient(172deg,#fbf5e7,#f2ead6)', borderRadius: '4px 6px 4px 6px', boxShadow: '0 40px 74px -44px rgba(60,44,20,0.5)', textAlign: 'left' }}>
            <p style={{ fontFamily: hand, fontWeight: 500, fontSize: 'clamp(24px,2.9vw,36px)', lineHeight: 1.5, color: 'rgba(52,40,26,0.82)', margin: 0 }}>Founder,</p>
            <p style={{ fontFamily: hand, fontWeight: 500, fontSize: 'clamp(24px,2.9vw,36px)', lineHeight: 1.5, color: 'rgba(52,40,26,0.82)', margin: '0.6em 0 0' }}>You don’t have to build everything today. Sometimes the most important thing is simply staying close to good conversations.</p>
            <p style={{ fontFamily: hand, fontWeight: 500, fontSize: 'clamp(24px,2.9vw,36px)', lineHeight: 1.5, color: 'rgba(52,40,26,0.82)', margin: '0.6em 0 0' }}>I’ll see you around the House.</p>
            <p style={{ fontFamily: hand, fontWeight: 500, fontSize: 'clamp(26px,3.1vw,40px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.82)', margin: '0.9em 0 0' }}>— Beth</p>
          </div>
        </div>

        {/* ── around the House — the living close, not a call to action ──── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(140px,26vh,320px)', ...surface() }}>
          <div style={{ ...label, fontSize: 11, letterSpacing: '0.46em', marginBottom: '2.4em' }}>Around the House</div>

          <div style={{ ...label, fontSize: 9, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.7em' }}>This month</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.3, color: '#2b2723', margin: '0 auto' }}>In Residence: <El onClick={ctx.openStudio} as="span" style={{ fontStyle: 'italic', cursor: 'pointer', borderBottom: '1px solid rgba(122,94,52,0.32)', transition: 'color 400ms ease' }} hover={{ color: 'rgba(122,94,52,0.95)' }}>Chef MoWils</El></p>

          <div style={{ width: 1, height: 'clamp(40px,7vh,72px)', margin: 'clamp(44px,7vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.34), transparent)' }} />

          <div style={{ ...label, fontSize: 9, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.7em' }}>Recently added to the Library</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.3, color: '#2b2723', margin: '0 auto' }}>The AI Employee Handbook</p>

          <div style={{ width: 1, height: 'clamp(40px,7vh,72px)', margin: 'clamp(44px,7vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.34), transparent)' }} />

          <div style={{ ...label, fontSize: 9, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.55)', marginBottom: '1em' }}>Latest Field Note</div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px,2.9vw,40px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.88)', maxWidth: '24ch', margin: '0 auto', ...balance }}>Companies don’t grow because founders work harder. They grow because founders stop carrying everything alone.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(120px,22vh,260px)' }}><BackPill onClose={ctx.closeDoorway} label="← Back" /></div>
      </div>
    </ChapterShell>
  )
}
