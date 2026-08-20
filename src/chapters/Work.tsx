import React, { useState } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { ConversationNote } from '../components/ConversationNote'
import { PHOTOS, STORIES } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as React.CSSProperties['textWrap'] }

/** A small ™ set in superscript. */
function TM() {
  return <span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span>
}

const label: React.CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)',
}

// the single quiet action — the same underlined door treatment as the Foyer,
// never a filled agency button.
const cta: React.CSSProperties = {
  display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 13, letterSpacing: '0.34em',
  textTransform: 'uppercase', color: 'rgba(43,39,35,0.9)', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(122,94,52,0.6)', padding: '0 0 7px', cursor: 'pointer',
  transition: 'color 500ms ease, border-color 500ms ease',
}

/** A quiet architectural rule — a dimension line across the limestone. */
function ArchLine({ m = 'clamp(90px,16vh,200px) auto' }: { m?: string }) {
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: 'min(340px,60%)', height: 1, margin: m, background: 'linear-gradient(90deg, transparent, rgba(122,94,52,0.4) 22%, rgba(122,94,52,0.4) 78%, transparent)' }}>
      <span style={{ position: 'absolute', left: '22%', top: -3, width: 1, height: 7, background: 'rgba(122,94,52,0.4)' }} />
      <span style={{ position: 'absolute', left: '78%', top: -3, width: 1, height: 7, background: 'rgba(122,94,52,0.4)' }} />
    </div>
  )
}

/** The figure, set quietly beneath the transformation — never the headline. */
function Investment({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 'clamp(34px,6vh,60px)' }}>
      <div style={{ ...label, fontSize: 10, letterSpacing: '0.46em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.6em' }}>Investment</div>
      <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,2.9vw,38px)', lineHeight: 1.1, color: '#2b2723' }}>{children}</div>
    </div>
  )
}

/** A soft, editorial list of what's included — quiet, never a feature grid. */
function Included({ items, heading }: { items: string[]; heading?: string }) {
  return (
    <div style={{ margin: 'clamp(30px,5vh,52px) auto 0', maxWidth: 560 }}>
      {heading && <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em', color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>{heading}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: items.length > 4 ? 'repeat(auto-fit,minmax(180px,1fr))' : '1fr', gap: 'clamp(10px,1.8vh,16px) clamp(24px,4vw,56px)', justifyItems: 'center' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.7em' }}>
            <span aria-hidden="true" style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(122,94,52,0.5)', transform: 'translateY(-3px)', flex: '0 0 auto' }} />
            <span style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.75vw,21px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.72)' }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The primary invitation on a doorway — warm brass, lit like morning light on hover. */
function DoorButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <El
      onClick={onClick}
      style={{ display: 'inline-block', marginTop: 'clamp(34px,6vh,58px)', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#f6efe4', background: '#3a2f1e', border: '1px solid #3a2f1e', borderRadius: 2, padding: '16px 40px', cursor: 'pointer', transition: 'background 500ms ease, box-shadow 500ms ease' }}
      hover={{ background: '#54432a', boxShadow: '0 0 34px -6px rgba(201,162,78,0.6)' }}
    >
      {children}
    </El>
  )
}

/** A doorway image in an arched frame — a threshold you can almost step through. */
function DoorwayImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: 'min(88%,600px)', margin: 'clamp(30px,5vh,54px) auto clamp(6px,1vh,10px)', animation: 'doorwayReveal 1300ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 2% cover 30%' as unknown as string }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden', borderRadius: '999px 999px 6px 6px', boxShadow: '0 46px 90px -54px rgba(60,44,20,0.66)' }}>
        <ImageSlot src={src} alt={alt} fit="cover" placeholder={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 60% at 40% 22%, rgba(255,232,180,0.5), transparent 68%)' }} />
      </div>
    </div>
  )
}

const reveal: React.CSSProperties = {
  animation: 'doorwayReveal 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: 'entry 3% cover 26%' as unknown as string,
}

/** A soft cloud of small olive leaves around a point — deterministic, so it's calm. */
function leaves(cx: number, cy: number, n: number, seed: number, spread = 16) {
  let s = seed >>> 0
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
  const out: React.ReactNode[] = []
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2
    const r = Math.sqrt(rnd()) * spread
    const lx = cx + Math.cos(a) * r, ly = cy + Math.sin(a) * r * 0.82
    const rot = rnd() * 180
    const silver = rnd() < 0.45
    out.push(<ellipse key={`${seed}-${i}`} cx={lx} cy={ly} rx={1.8 + rnd() * 1} ry={4.2 + rnd() * 2.2} transform={`rotate(${rot} ${lx} ${ly})`} fill={silver ? '#9aa579' : '#6f7d48'} opacity={0.38 + rnd() * 0.34} />)
  }
  return out
}

/**
 * A centuries-old Mediterranean olive tree — the truer symbol of Believe. A
 * weathered, gnarled trunk of quiet strength; roots that grip; a low, wide
 * canopy of silvered leaves. It looks as though it stood long before the studio
 * and will stand long after. Roots of belief, trunk of transformation, branches
 * of growth, fruit that nourishes the founders who come next. Never a diagram.
 */
function OliveTree() {
  // fuller crown, still airy — clusters massed toward a low, spreading canopy
  const canopy: [number, number, number, number, number][] = [
    [150, 150, 20, 7, 30], [104, 172, 16, 23, 24], [198, 168, 16, 41, 24],
    [128, 138, 13, 59, 20], [176, 140, 13, 71, 20], [78, 196, 12, 83, 20],
    [224, 190, 12, 97, 20], [150, 118, 12, 109, 20], [150, 190, 10, 127, 18],
  ]
  const olives: [number, number][] = [[112, 176], [196, 170], [150, 146], [86, 194], [220, 188], [150, 176], [132, 200]]
  return (
    <svg viewBox="0 0 300 430" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      {/* the weathered trunk — a wide, buttressed, gnarled silhouette of great age */}
      <path
        d="M100 420 C110 398, 96 384, 110 366 C120 353, 106 342, 120 328 C130 318, 120 308, 130 298 C138 290, 130 282, 140 273 C144 269, 147 266, 150 262 C153 266, 156 269, 160 273 C170 282, 162 290, 170 298 C180 308, 170 318, 180 328 C194 342, 180 353, 190 366 C204 384, 190 398, 200 420"
        fill="#e7dcc3" stroke="#7a5e34" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"
      />
      {/* the split heartwood, and fluting lines, for age */}
      <path d="M150 414 C146 384, 156 356, 150 324 C146 306, 153 290, 150 268" fill="none" stroke="#7a5e34" strokeWidth={1.1} opacity={0.45} strokeLinecap="round" />
      <path d="M128 404 C134 374, 124 350, 134 322 C140 306, 132 296, 138 286" fill="none" stroke="#7a5e34" strokeWidth={0.8} opacity={0.28} strokeLinecap="round" />
      <path d="M172 404 C166 374, 176 350, 166 322" fill="none" stroke="#7a5e34" strokeWidth={0.8} opacity={0.28} strokeLinecap="round" />
      <g stroke="#7a5e34" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* buttress roots, gripping the ground */}
        <g strokeWidth={1.8} opacity={0.85}>
          <path d="M104 418 C80 410, 62 414, 44 426" />
          <path d="M130 420 C120 427, 110 429, 98 432" />
          <path d="M196 418 C220 410, 238 414, 256 426" />
          <path d="M170 420 C180 427, 190 429, 202 432" />
        </g>
        {/* gnarled boughs — thick at the fork, tapering as they twist out */}
        <g strokeWidth={3.4}>
          <path d="M143 276 C126 260, 116 240, 108 220" />
          <path d="M150 270 C150 246, 147 224, 150 202" />
          <path d="M157 276 C176 260, 188 240, 196 220" />
        </g>
        <g strokeWidth={2} opacity={0.92}>
          <path d="M108 220 C102 206, 92 196, 82 182" />
          <path d="M150 202 C152 184, 148 168, 150 150" />
          <path d="M196 220 C204 206, 214 196, 224 182" />
          <path d="M132 250 C124 236, 118 222, 116 206" />
          <path d="M168 250 C176 236, 182 222, 184 206" />
        </g>
      </g>
      {/* the silvered canopy */}
      <g>{canopy.map(([x, y, n, seed, sp]) => leaves(x, y, n, seed, sp))}</g>
      {/* a few olives */}
      <g>{olives.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={2.4} ry={3.2} fill="#4f4260" opacity={0.72} />)}</g>
    </svg>
  )
}

/**
 * The final room — where a founder decides whether they are ready to begin.
 * Not a pricing page: an editorial passage that opens with the transformation,
 * lets each doorway breathe, and keeps the figure quiet beneath the promise.
 * (ctx.openWork.)
 */
export function WorkChapter({ ctx }: { ctx: Ctx }) {
  const [noteOpen, setNoteOpen] = useState(false)
  const talk = () => setNoteOpen(true)

  return (
    <ChapterShell onClose={ctx.closeWork} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(96px,17vh,220px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* the lead — what Believe is, plainly and confidently */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.5em' }}>Work with Believe</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.08, margin: '0 auto', maxWidth: '20ch', ...balance }}>{'Believe is a founder‑first growth studio.'}</h2>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.15vw,28px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.74)', maxWidth: '40ch', margin: 'clamp(34px,6vh,72px) auto 0', ...balance }}>{'We work beside founder‑led brands across brand, sales, retail and marketing, solving what’s stuck, uncovering the opportunities others miss, and helping make the next move happen.'}</p>

        {/* built from the other side of the table */}
        <ArchLine m="clamp(90px,16vh,190px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(28px,5vh,50px)' }}>Built from the other side of the table</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,30px)', lineHeight: 1.5, color: '#2b2723', maxWidth: '30ch', margin: '0 auto', ...balance }}>{'Beth built Sipp from her kitchen into a multimillion‑dollar national brand, on the shelves at Target, Whole Foods, Starbucks, Wegmans and The Fresh Market.'}</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.72)', maxWidth: '40ch', margin: 'clamp(30px,5vh,54px) auto 0', ...pretty }}>She&rsquo;s sat across from buyers, worked with distributors, raised the money, run production, made the expensive mistakes and celebrated the wins, and hired plenty of people who promised they could help.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '36ch', margin: 'clamp(30px,5vh,54px) auto 0', ...pretty }}>That&rsquo;s why Believe works the way it does: experienced enough to see the business differently, close enough to roll up our sleeves and help move it forward.</p>

          {/* the signature — Beth's line alone, then her voice in body copy beneath */}
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.24, color: '#2b2723', maxWidth: '18ch', margin: 'clamp(58px,10vh,112px) auto 0', ...balance }}>&ldquo;I built the partner I wish I&rsquo;d had.&rdquo;</p>
          <div style={{ ...label, fontSize: 10, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.6)', marginTop: '1.5em' }}>Beth</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.7)', maxWidth: '34ch', margin: 'clamp(30px,5vh,52px) auto 0', ...pretty }}>When I was building Sipp, I had plenty of people telling me what I should do. What I needed was someone willing to get in it with me.</p>
        </div>

        {/* what we help founders do — outcomes, not departments */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(26px,4.5vh,44px)' }}>What we help founders do</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.8)', maxWidth: '26ch', margin: '0 auto clamp(60px,10vh,120px)', ...balance }}>Founders don&rsquo;t come to us for departments. They come because something needs to move.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(46px,8vh,84px)' }}>
            {[
              { name: 'Build the brand', line: 'Positioning, messaging, and the story that makes the product matter.' },
              { name: 'Grow sales', line: 'Retail strategy, buyer outreach, new channels, distribution and partnerships.' },
              { name: 'Create demand', line: 'Marketing, social, content, collaborations and activations.' },
              { name: 'Solve what’s stuck', line: 'Find the real constraint, uncover the opportunity, and help make the next move.' },
            ].map((o) => (
              <div key={o.name}>
                <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3.1vw,40px)', lineHeight: 1.1, color: '#2b2723' }}>{o.name}</div>
                <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '30ch', margin: '0.6em auto 0', ...balance }}>{o.line}</div>
              </div>
            ))}
          </div>
        </div>

        {/* the differentiator — how Believe sees */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4vw,54px)', lineHeight: 1.12, color: '#2b2723', maxWidth: '20ch', margin: '0 auto', ...balance }}>The biggest opportunity is rarely the one in the brief.</h3>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.72)', maxWidth: '38ch', margin: 'clamp(36px,6vh,72px) auto 0', ...pretty }}>{'We look across the brand, the business and the market for the move that isn’t obvious yet: the reframe, the connection, or the opportunity that changes what the company can become.'}</p>
        </div>

        {/* proof — real founders, in their words */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(44px,8vh,88px)' }}>In their words</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(52px,9vh,104px)' }}>
            {STORIES.map((s) => (
              <div key={s.name}>
                <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.4, color: '#2b2723', maxWidth: '30ch', margin: '0 auto', ...balance }}>&ldquo;{s.quote}&rdquo;</p>
                <div style={{ ...label, fontSize: 10, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.62)', marginTop: '1.5em' }}>{s.name} &middot; {s.company}</div>
              </div>
            ))}
          </div>
        </div>

        {/* how we work — one conversation, one action */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(26px,4.5vh,44px)' }}>How we work</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,44px)', lineHeight: 1.2, color: '#2b2723', maxWidth: '18ch', margin: '0 auto', ...balance }}>It starts with a conversation.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '40ch', margin: 'clamp(34px,6vh,64px) auto 0', ...pretty }}>{'Tell us where the business is, where you want it to go, and what feels like it’s getting in the way. From there we’ll figure out whether Believe is the right partner, and what work would actually move the business forward.'}</p>
          <El as="button" onClick={talk} style={{ ...cta, marginTop: 'clamp(46px,8vh,92px)' }} hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.85)' }}>Start a Conversation &rarr;</El>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.6vw,20px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.7)', maxWidth: '32ch', margin: 'clamp(48px,8vh,96px) auto 0', ...balance }}>The Founder&rsquo;s Room, our room for founders growing beside one another, is <El as="span" onClick={ctx.openFounderRoom} style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.92)', cursor: 'pointer', borderBottom: '1px solid rgba(122,94,52,0.4)', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>here</El>.</p>
        </div>

        <ArchLine m="clamp(80px,13vh,150px) auto clamp(40px,7vh,64px)" />
        <BackPill onClose={ctx.closeWork} label="← Back to the building" />
      </div>

      {/* the note that greets a founder before any calendar */}
      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
