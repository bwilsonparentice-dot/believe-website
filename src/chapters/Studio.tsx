import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { PHOTOS } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
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

// the hero passage — why the room exists, spoken plainly
const OPENING = [
  'Every founder eventually asks a question that doesn’t have a simple answer.',
  'Sometimes the answer becomes a conversation. Sometimes it becomes a framework. Sometimes it becomes something entirely new.',
  'The Studio is where those ideas take shape.',
  'Not everything here is finished. Some projects are still on the workbench. Some are already helping founders every day.',
]

// what is on the workbench now — projects as living creations, not products.
// each carries a human status marker rather than a version number.
const PROJECTS = [
  {
    no: 'I',
    name: 'Retailer Radar',
    kicker: 'A living retailer intelligence platform.',
    body: [
      'Years of relationships, buyer contacts, retailer insights, distributor knowledge, category research, and strategic observations — thoughtfully organized into one growing resource.',
      'Retailer Radar helps founders spend less time searching for the right people, and more time building meaningful retail relationships.',
      'Rather than starting from scratch, founders begin with context. The platform keeps growing as new relationships and insights are added over time.',
    ],
    status: 'Gathering Intelligence',
  },
  {
    no: 'II',
    name: 'Brandi',
    kicker: 'An AI co-founder for CPG brands.',
    body: [
      'Brandi helps founders think more clearly, move more confidently, and make better decisions across every stage of building a consumer brand.',
      'From retailer outreach and positioning to pricing, planning, product launches, and growth strategy, Brandi works alongside founders as a trusted thought partner.',
      'The goal isn’t to replace founders. It’s to help them become better ones.',
    ],
    status: 'Learning Beside Founders',
  },
  {
    no: 'III',
    name: 'The One',
    kicker: 'Find the customer everything else is built around.',
    body: [
      'Before a founder writes messaging, designs packaging, or creates marketing, they need clarity about who they’re truly building for.',
      'The One helps founders uncover the single customer who matters most — creating a brand persona that becomes the foundation for every future decision.',
      'Simple. Focused. Practical.',
    ],
    status: 'Ready to Explore',
  },
]

// work that has left the workbench — finished, and quietly kept.
const FINISHED = [
  { no: '001', name: 'The AI Employee Handbook', note: 'Created during Mona’s first residency.' },
  { no: '002', name: 'Founder Workshop No. 001', note: 'Buy Back 20 Hours.' },
]

// ideas still taking shape — proof the workbench is never empty.
const HORIZON = ['Founder Decision Atlas', 'Retail Opportunity Maps', 'Confidence Check', 'Launch Planner', 'Signature Spark', 'New AI companions']

// why the room stays open — the studio's quiet reason for being.
const WHY = [
  'Founders don’t need more noise. They need better tools.',
  'Every project inside The Studio begins the same way: a founder struggles with something, and we build a better way.',
  'Sometimes it’s a worksheet. Sometimes it’s software. Sometimes it’s artificial intelligence. Sometimes it’s simply a better question.',
]

// a small brass dot + hairline, used to mark each project's status
function StatusMark({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.7em', marginTop: 'clamp(30px,5vh,54px)' }}>
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(122,94,52,0.55)' }} />
      <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em' }}>Status</div>
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.9)' }}>{text}</div>
    </div>
  )
}

/**
 * The Studio — the workshop of Believe. Not a portfolio, not a product catalog:
 * a beautiful atelier early in the morning, ideas spread across oak tables, some
 * projects nearly complete and others just beginning. Everything here exists
 * because a founder asked a difficult question. (ctx.openStudioPage.)
 */
export function StudioChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStudioPage} background="#efe6d3" z={120}>
      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 7vw clamp(80px,15vh,190px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── the hero ──────────────────────────────────────────────────── */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.4em' }}>The workshop</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(42px,6.4vw,94px)', lineHeight: 1.0, margin: '0 0 0.4em' }}>The Studio</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.34, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '22ch', ...balance }}>Where ideas become tools.</p>

        <div style={{ marginTop: 'clamp(64px,11vh,130px)', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.4vh,34px)', ...surface() }}>
          {OPENING.map((p, i) => (
            <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '30ch', marginLeft: 'auto', marginRight: 'auto', ...pretty }}>{p}</p>
          ))}
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.6)', margin: '0.4em auto 0', maxWidth: '30ch', ...pretty }}>All of them exist for one reason —</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(23px,3vw,42px)', lineHeight: 1.28, color: '#2b2723', margin: 0, maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>to make building a company a little less lonely.</p>
        </div>
      </div>

      {/* ── the large editorial image — the atelier itself ──────────────── */}
      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', height: 'clamp(340px,60vh,700px)', overflow: 'hidden', ...surface('entry 0% cover 14%') }}>
        <ImageSlot src={PHOTOS.studio} fit="cover" alt="The Studio — an oak worktable in a warm European workshop, sketches and packaging mockups in morning light" placeholder="a warm European workshop — oak table, sketches, packaging mockups, tracing paper, brass ruler, morning light, no people" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'slowZoom 24s ease-out both' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 36% 22%, rgba(204,223,238,0.4), transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.08) 0%, transparent 26%, transparent 62%, rgba(239,230,211,0.72) 92%, #efe6d3 100%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: '0 7vw clamp(80px,15vh,190px)', textAlign: 'center', color: '#2b2723' }}>

        {/* ── currently on the workbench ────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(90px,16vh,200px)' }}>
          <div style={{ ...label, marginBottom: 'clamp(40px,7vh,80px)', ...surface('entry 0% cover 22%') }}>Currently on the workbench</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.34, color: '#2b2723', margin: '0 auto', maxWidth: '22ch', ...balance, ...surface() }}>The best ideas rarely begin as products.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', margin: 'clamp(20px,3.4vh,34px) auto 0', maxWidth: '24ch', ...balance, ...surface() }}>They begin with founders asking better questions.</p>
        </div>

        {/* ── the three projects — museum labels, not software cards ─────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(110px,20vh,240px)', marginTop: 'clamp(110px,20vh,240px)' }}>
          {PROJECTS.map((p) => (
            <div key={p.no} style={surface('entry 0% cover 20%')}>
              <div style={{ ...label, fontSize: 10, letterSpacing: '0.44em', marginBottom: '1.4em' }}>On the workbench · No. {p.no}</div>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(36px,5.4vw,74px)', lineHeight: 1.02, margin: '0 0 0.34em' }}>{p.name}</h3>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto clamp(30px,5vh,52px)', maxWidth: '24ch', ...balance }}>{p.kicker}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.4vh,24px)' }}>
                {p.body.map((b, k) => (
                  <p key={k} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.74)', margin: 0, maxWidth: '42ch', marginLeft: 'auto', marginRight: 'auto', ...pretty }}>{b}</p>
                ))}
              </div>
              <StatusMark text={p.status} />
            </div>
          ))}
        </div>

        {/* ── coming out of the Studio — recently finished ──────────────── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)' }}>
          <div style={{ ...label, marginBottom: '0.9em', ...surface('entry 0% cover 22%') }}>Coming out of the Studio</div>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.8)', marginBottom: 'clamp(56px,10vh,110px)', ...surface('entry 0% cover 22%') }}>Recently finished</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,9vh,100px)' }}>
            {FINISHED.map((f) => (
              <div key={f.no} style={surface('entry 0% cover 20%')}>
                <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em', color: 'rgba(122,94,52,0.5)', marginBottom: '1em' }}>Archive No. {f.no}</div>
                <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.06, margin: '0 0 0.4em' }}>{f.name}</div>
                <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(43,39,35,0.6)' }}>{f.note}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', margin: 'clamp(56px,10vh,110px) auto 0', maxWidth: '34ch', ...pretty, ...surface() }}>Future workshops naturally expand this collection. Everything built inside Believe eventually finds a place in{' '}
            <El onClick={ctx.openLibrary} as="span" style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.85)', cursor: 'pointer', borderBottom: '1px solid rgba(122,94,52,0.32)', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>the Library</El>.</p>
        </div>

        {/* ── why we keep building ──────────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)' }}>
          <div style={{ ...label, marginBottom: 'clamp(50px,9vh,100px)', ...surface('entry 0% cover 22%') }}>Why we keep building</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4.2vh,48px)' }}>
            {WHY.map((w, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '26ch', marginLeft: 'auto', marginRight: 'auto', ...balance, ...surface('entry 0% cover 20%') }}>{w}</p>
            ))}
          </div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.32, color: '#2b2723', margin: 'clamp(48px,8vh,96px) auto 0', maxWidth: '30ch', ...balance, ...surface() }}>The goal is always the same — less time wrestling with complexity, more time building companies that matter.</p>
        </div>

        {/* ── also taking shape — the workbench is never empty ──────────── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, marginBottom: 'clamp(36px,6vh,72px)' }}>Also taking shape</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.7em 1.6em', maxWidth: 620, margin: '0 auto' }}>
            {HORIZON.map((h, i) => (
              <span key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(43,39,35,0.5)' }}>{h}{i < HORIZON.length - 1 && <span aria-hidden="true" style={{ color: 'rgba(122,94,52,0.4)', margin: '0 0 0 1.6em' }}>·</span>}</span>
            ))}
          </div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.7)', margin: 'clamp(36px,6vh,72px) auto 0' }}>The page grows quietly, without ever being rebuilt.</p>
        </div>

        {/* ── the closing ───────────────────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4vw,58px)', lineHeight: 1.08, color: '#2b2723', margin: '0 auto', maxWidth: '18ch', ...balance }}>The Studio is never finished.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.68)', margin: 'clamp(44px,8vh,90px) auto 0', maxWidth: '38ch', ...pretty }}>Some ideas stay on the workbench for years. Others become conversations. Some become workshops. Some quietly become indispensable tools for founders around the world.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.6)', margin: 'clamp(32px,5vh,56px) auto 0', maxWidth: '34ch', ...pretty }}>This room remains open because the work is never complete.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.32, color: 'rgba(122,94,52,0.9)', margin: 'clamp(40px,7vh,80px) auto 0', maxWidth: '24ch', ...balance }}>There is always another idea taking shape.</p>
        </div>

        <Divider />
        <div style={{ textAlign: 'center' }}><BackPill onClose={ctx.closeStudioPage} /></div>
      </div>
    </ChapterShell>
  )
}
