import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { PHOTOS } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const hand = "'Caveat',cursive"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)',
}

/** A gentle scroll-linked reveal — the atelier waking slowly in morning light. */
const surface = (range = 'entry 3% cover 26%'): CSSProperties => ({
  animation: 'fadeUpSoft 1300ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

// the hero passage — every project begins with a conversation
const OPENING = [
  'Every project in this room began with a conversation.',
  'Some questions appeared once. Others kept returning.',
  'When founders carried the same burden often enough, we began building.',
]

// why the Studio exists — spoken before any project is shown
const PHILOSOPHY = [
  'Believe Studio doesn’t create software for the sake of creating software.',
  'Every build begins with a founder. A question. A frustration. A conversation that stayed with us long after the meeting ended.',
  'When enough founders carry the same burden, we begin building.',
]

// what is on the workbench now — each named by the question that began it.
// the status is a human line, never a version number.
const PROJECTS = [
  {
    name: 'Retailer Radar',
    question: 'How do I know which retailers are actually worth pursuing?',
    body: 'Retailer Radar exists to replace guesswork with clarity — helping founders spend more time building relationships with the retailers that matter most.',
    status: 'Quietly evolving beside founders.',
  },
  {
    name: 'Brandi',
    question: 'Why does it feel like I’m making every decision alone?',
    body: 'Brandi is being built as a trusted AI co-founder for CPG founders. Not to replace judgment. To strengthen it.',
    status: 'Learning every day.',
  },
  {
    name: 'The One',
    question: 'If I only focused on one thing this quarter, what should it be?',
    body: 'Still taking shape. Sometimes the most important projects require the longest conversations.',
    status: 'Still taking shape.',
  },
]

// three notes that live only here — the conversations that became projects
const STUDIO_NOTES = [
  { n: '032', quote: 'I don’t need another spreadsheet.', became: 'Retailer Radar' },
  { n: '041', quote: 'I wish someone remembered everything I forgot.', became: 'Brandi' },
  { n: '056', quote: 'I don’t know what matters most anymore.', became: 'The One' },
]

// still taking shape — no mockups, no promises, only questions being explored
const EXPLORING = ['Founder Hiring Compass', 'Shelf Intelligence', 'Retail Margin Map', 'Founder Memory', 'The Decision Journal']

// recently left the workbench — into the Library
const LEFT = ['Founder Workshop No. 001', 'The AI Employee Handbook', 'Retailer Radar Beta']

// a brass dot + hairline marking a project's living status
function StatusMark({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.7em', marginTop: 'clamp(34px,5.5vh,60px)' }}>
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(122,94,52,0.55)' }} />
      <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em' }}>Status</div>
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.9)' }}>{text}</div>
    </div>
  )
}

/**
 * The Studio — the workshop behind the public rooms, where a founder's recurring
 * question quietly becomes a useful thing. Not a portfolio, not a product
 * catalogue, not a software company: an atelier where prototypes become
 * institutions. Every build here started as a conversation that wouldn't leave.
 * (ctx.openStudioPage.)
 */
export function StudioChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStudioPage} background="#efe6d3" z={120}>
      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 7vw clamp(70px,12vh,150px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── the hero ──────────────────────────────────────────────────── */}
        <div style={{ ...label, marginBottom: '1.5em' }}>The workshop</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(42px,6.4vw,94px)', lineHeight: 1.0, margin: '0 0 0.42em' }}>The Studio</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.34, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>Where founder questions become useful things.</p>

        <div style={{ marginTop: 'clamp(64px,11vh,130px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3.6vh,36px)', ...surface() }}>
          {OPENING.map((p, i) => (
            <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '26ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>{p}</p>
          ))}
        </div>
      </div>

      {/* ── the workbench itself — an editorial still life ──────────────── */}
      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', height: 'clamp(340px,60vh,700px)', overflow: 'hidden', ...surface('entry 0% cover 14%') }}>
        <ImageSlot src={PHOTOS.studio} fit="cover" alt="An oak worktable in a warm workshop — tracing paper, a brass ruler, an open notebook, a packaging sketch and a prototype screen in morning light" placeholder="a warm workshop — oak table, tracing paper, brass ruler, notebook, packaging sketch, one prototype screen, coffee, morning light, no people" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'slowZoom 24s ease-out both' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 36% 22%, rgba(255,226,178,0.36), transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.08) 0%, transparent 26%, transparent 62%, rgba(239,230,211,0.72) 92%, #efe6d3 100%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: '0 7vw clamp(80px,15vh,190px)', textAlign: 'center', color: '#2b2723' }}>

        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.78)', margin: 'clamp(44px,8vh,90px) auto 0', maxWidth: '26ch', ...balance, ...surface() }}>Someone stepped away five minutes ago. The work is still warm.</p>

        {/* ── why the Studio exists — before any project ────────────────── */}
        <div style={{ marginTop: 'clamp(120px,22vh,280px)' }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4.2vw,60px)', lineHeight: 1.14, color: '#2b2723', margin: '0 auto', maxWidth: '18ch', ...balance, ...surface('entry 0% cover 24%') }}>We don’t build because we have ideas. We build because founders keep asking the same questions.</p>
          <div style={{ marginTop: 'clamp(56px,10vh,120px)', display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,30px)', ...surface() }}>
            {PHILOSOPHY.map((p, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.72)', margin: 0, maxWidth: '38ch', marginLeft: 'auto', marginRight: 'auto', ...pretty }}>{p}</p>
            ))}
          </div>
        </div>

        {/* ── on the workbench — each project named by its question ──────── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)' }}>
          <div style={{ ...label, marginBottom: 'clamp(30px,5vh,56px)', ...surface('entry 0% cover 22%') }}>On the workbench</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.64)', margin: '0 auto', ...surface() }}>Each project begins the same way.<br />Not with features.<br /><span style={{ color: '#2b2723' }}>With the founder’s question.</span></p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(120px,22vh,260px)', marginTop: 'clamp(110px,20vh,240px)' }}>
          {PROJECTS.map((p) => (
            <div key={p.name} style={surface('entry 0% cover 20%')}>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(36px,5.4vw,74px)', lineHeight: 1.02, margin: '0 0 0.5em' }}>{p.name}</h3>
              <div style={{ ...label, fontSize: 9.5, letterSpacing: '0.42em', marginBottom: '1.2em' }}>It started with this</div>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.28, color: '#2b2723', margin: '0 auto', maxWidth: '20ch', ...balance }}>“{p.question}”</p>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.74)', margin: 'clamp(34px,5.5vh,60px) auto 0', maxWidth: '40ch', ...pretty }}>{p.body}</p>
              <StatusMark text={p.status} />
            </div>
          ))}
        </div>

        {/* ── where the projects came from — three notes kept only here ──── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.5, color: '#2b2723', margin: '0 auto', maxWidth: '20ch', ...balance, ...surface('entry 0% cover 22%') }}>Every project begins somewhere.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', color: 'rgba(122,94,52,0.8)', margin: 'clamp(18px,2.6vh,28px) auto 0', ...surface('entry 0% cover 22%') }}>Usually here. A conversation.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px,10vh,110px)', margin: 'clamp(70px,13vh,150px) auto 0', maxWidth: 520 }}>
            {STUDIO_NOTES.map((s) => (
              <div key={s.n} style={surface('entry 0% cover 20%')}>
                <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em', color: 'rgba(122,94,52,0.55)', marginBottom: '1.1em' }}>Field Note {s.n}</div>
                <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.86)', margin: 0, ...balance }}>“{s.quote}”</p>
                <div aria-hidden="true" style={{ width: 1, height: 'clamp(30px,5vh,46px)', margin: 'clamp(20px,3vh,30px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.5), transparent)' }} />
                <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.5)', marginBottom: '0.7em' }}>Eventually became</div>
                <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(22px,2.7vw,34px)', color: '#2b2723' }}>{s.became}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── still taking shape — handwritten project cards ────────────── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, marginBottom: 'clamp(20px,3.5vh,40px)' }}>Still taking shape</div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.72)', margin: '0 auto clamp(56px,10vh,110px)' }}>Questions we’re still sitting with.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(24px,3.5vw,44px)' }}>
            {EXPLORING.map((e) => (
              <div key={e} style={{ flex: '0 1 240px', minWidth: 200, padding: 'clamp(26px,3.2vw,40px) clamp(24px,3vw,34px)', background: 'linear-gradient(160deg,#f7f1e2,#efe6d2)', borderRadius: '4px 7px 5px 6px', boxShadow: '0 1px 2px rgba(60,44,20,0.08), 0 8px 16px -12px rgba(60,44,20,0.18)', transform: `rotate(${(e.length % 3) - 1 ? '-0.5deg' : '0.6deg'})` }}>
                <div style={{ fontFamily: hand, fontWeight: 500, fontSize: 'clamp(23px,2.7vw,31px)', lineHeight: 1.16, color: 'rgba(43,39,35,0.86)', marginBottom: '0.6em' }}>{e}</div>
                <div style={{ ...label, fontSize: 8.5, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.55)' }}>Currently being explored</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── recently left the workbench — into the Library ────────────── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)' }}>
          <div style={{ ...label, marginBottom: 'clamp(30px,5vh,56px)', ...surface('entry 0% cover 22%') }}>Recently left the workbench</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.64)', margin: '0 auto clamp(48px,8vh,90px)', maxWidth: '26ch', ...balance, ...surface() }}>Not every project stays in the Studio forever. Some eventually leave.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,24px)', ...surface() }}>
            {LEFT.map((l) => (
              <div key={l} style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.8)' }}>{l}</div>
            ))}
          </div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', margin: 'clamp(48px,8vh,90px) auto 0', maxWidth: '24ch', ...balance, ...surface() }}>These become part of{' '}
            <El onClick={ctx.openLibrary} as="span" style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.85)', cursor: 'pointer', borderBottom: '1px solid rgba(122,94,52,0.32)', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>the Library</El>.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.34, color: '#2b2723', margin: 'clamp(48px,8vh,96px) auto 0', maxWidth: '20ch', ...balance, ...surface() }}>The Studio builds. The Library remembers.</p>
        </div>

        {/* ── the quiet thread — discovered, never announced ────────────── */}
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.7)', margin: 'clamp(130px,24vh,300px) auto 0', maxWidth: '30ch', ...balance, ...surface() }}>Believe Studio exists so that no founder has to learn alone what another founder has already lived.</p>

        {/* ── the closing ───────────────────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(110px,20vh,240px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', margin: '0 auto', maxWidth: '34ch', ...pretty }}>Some ideas become workshops. Some become tools. Some remain unfinished for years.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.8)', margin: 'clamp(28px,4.5vh,44px) auto 0' }}>That’s okay.</p>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.24, color: '#2b2723', margin: 'clamp(44px,8vh,88px) auto 0', maxWidth: '18ch', ...balance }}>The Studio was never meant to be finished.<br />Only useful.</p>
        </div>

        <div style={{ width: 1, height: 'clamp(52px,9vh,96px)', margin: 'clamp(80px,14vh,160px) auto clamp(36px,6vh,60px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <div style={{ textAlign: 'center' }}><RoomNav ctx={ctx} slug="studio" /></div>
      </div>
    </ChapterShell>
  )
}
