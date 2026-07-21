import React, { useState } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { ConversationNote } from '../components/ConversationNote'
import { PHOTOS } from '../data'

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

  const H3: React.CSSProperties = { fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.03, margin: '0 0 0.35em' }
  const SUB: React.CSSProperties = { fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '26ch' }
  const P: React.CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.74)', maxWidth: '42ch', margin: '0 auto', ...pretty }

  return (
    <ChapterShell onClose={ctx.closeWork} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto', padding: 'clamp(100px,18vh,240px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── opening: the word, then the reframe ─────────────────────── */}
        <div style={{ ...label, marginBottom: 'clamp(30px,5vh,52px)' }}>Investment</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.6vw,64px)', lineHeight: 1.14, margin: '0 auto', maxWidth: '20ch', ...balance }}>You’re not investing in a deliverable. You’re investing in becoming the leader your company needs you to become.</h2>

        <ArchLine m="clamp(80px,14vh,180px) auto" />

        <p style={{ ...P, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.8)', maxWidth: '30ch' }}>Most consulting ends when the recommendations are delivered. We believe the real work begins there.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(22px,2.7vw,36px)', lineHeight: 1.3, color: '#2b2723', maxWidth: '20ch', margin: 'clamp(36px,6vh,64px) auto 0', ...balance }}>Because companies don’t make decisions. Founders do.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.1vw,26px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)', maxWidth: '28ch', margin: 'clamp(36px,6vh,60px) auto 0' }}>Every strategy.<br />Every opportunity.<br />Every hire.<br />Every partnership.<br />Every conversation.</p>
        <p style={{ ...SUB, margin: 'clamp(30px,5vh,52px) auto 0' }}>Begins with a founder making a decision.</p>
        <p style={{ ...P, margin: 'clamp(44px,8vh,90px) auto 0', maxWidth: '38ch' }}>Our role isn’t simply to help you build a stronger business. Our role is to help you become the leader your business needs you to become.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.2, color: '#2b2723', margin: 'clamp(44px,8vh,88px) auto 0', maxWidth: '16ch', ...balance }}>We are not transactional. <span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.92)' }}>We are transformational.</span></p>

        <ArchLine m="clamp(96px,17vh,210px) auto clamp(80px,14vh,170px)" />

        {/* ── choose your doorway ─────────────────────────────────────── */}
        <ArchMark width={2.2} margin="0 auto 1.6em" />
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(36px,5.6vw,80px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>Choose Your Doorway</h2>
        <p style={{ ...SUB, fontStyle: 'normal', fontWeight: 300, color: 'rgba(43,39,35,0.7)', fontSize: 'clamp(19px,2.1vw,27px)' }}>Every founder enters Believe differently. Choose the doorway that best reflects where you are today.</p>

        {/* Doorway One — The Founder Conversation */}
        <div style={{ ...reveal, marginTop: 'clamp(80px,15vh,180px)' }}>
          <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>Doorway One</div>
          <h3 style={H3}>The Founder Conversation<TM /></h3>
          <p style={SUB}>Sometimes the most valuable next step is simply a conversation.</p>
          <DoorwayImage src={PHOTOS.conversation} alt="Two chairs drawn close around a small walnut table, coffee and an open journal in morning light" />
          <p style={{ ...P, margin: 'clamp(28px,5vh,48px) auto 0' }}>A relaxed thirty-minute conversation to understand where you are, what you’re building, what you’re navigating, and whether Believe is the right place to support your journey.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2.1vw,26px)', color: 'rgba(122,94,52,0.82)', margin: '1.2em auto 0', maxWidth: '26ch' }}>This is not a sales call. It’s the beginning of a relationship.</p>
          <Included items={['30 minutes', 'Founder conversation', 'Growth discussion', 'No obligation']} />
          <Investment><span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.85)' }}>Complimentary.</span></Investment>
          <DoorButton onClick={talk}>Begin the Conversation</DoorButton>
        </div>

        <ArchLine />

        {/* Doorway Two — The Believe Blueprint */}
        <div style={reveal}>
          <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>Doorway Two</div>
          <h3 style={H3}>The Believe Blueprint<TM /></h3>
          <p style={SUB}>Architect the next chapter of your company.</p>
          <DoorwayImage src={PHOTOS.blueprint} alt="The Believe Blueprint — an open journal and architectural plans on the oak table in morning light" />
          <p style={{ ...P, margin: 'clamp(28px,5vh,48px) auto 0' }}>Together we’ll bring founder strategy, brand architecture, growth opportunities, Experience Channels<TM />, Dream Accounts<TM />, and a practical roadmap into one comprehensive blueprint, designed specifically for your business.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2.1vw,26px)', color: 'rgba(122,94,52,0.82)', margin: '1.2em auto 0', maxWidth: '26ch' }}>More than a strategy. The architectural plan for your next chapter.</p>
          <Included heading="What we architect together" items={['Business Reinvention', 'Brand Architecture', 'Opportunity Atlas™', 'Experience Channels™', 'Dream Accounts™', 'Growth Roadmap', 'Executive Debrief']} />
          <Investment>$3,995 <span style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', color: 'rgba(122,94,52,0.72)' }}>· a one-time strategic engagement</span></Investment>
          <DoorButton onClick={talk}>Begin the Conversation</DoorButton>
        </div>

        <ArchLine />

        {/* Doorway Three — The Founder's Room */}
        <div style={reveal}>
          <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>Doorway Three</div>
          <h3 style={H3}>The Founder’s Room<TM /></h3>
          <p style={SUB}>A place where founders become stronger together.</p>
          <p style={{ ...P, margin: 'clamp(28px,5vh,48px) auto 0' }}>For founders who believe the best decisions are rarely made alone. Join a carefully curated group of founders committed to becoming stronger leaders while helping one another navigate the realities of building meaningful companies.</p>
          <Included heading="Membership includes" items={['Monthly Founder Gathering', 'Private Community', 'Ongoing Founder Discussions', 'One Individual Strategy Session', 'Shared Wisdom', 'Real Accountability']} />
          <Investment>$995 <span style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', color: 'rgba(122,94,52,0.72)' }}>/ month</span></Investment>
          <DoorButton onClick={ctx.openDoorway('founders-room')}>Step Inside The Founder’s Room</DoorButton>
        </div>

        <ArchLine />

        {/* Doorway Four — Private Advisory */}
        <div style={reveal}>
          <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>Doorway Four</div>
          <h3 style={{ ...H3, fontSize: 'clamp(32px,4.6vw,60px)' }}>Private Advisory</h3>
          <p style={SUB}>Reserved for defining moments.</p>
          <p style={{ ...P, margin: 'clamp(28px,5vh,48px) auto 0' }}>Reserved for founders navigating meaningful periods of growth, leadership, transition, or transformation. Highly personalized advisory work, designed around your company, your leadership, and your biggest decisions.</p>
          <Investment><span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.85)' }}>By application.</span></Investment>
          <DoorButton onClick={talk}>Begin the Conversation</DoorButton>
        </div>

        <ArchLine />

        {/* Doorway Five — Founder Fellowship (not yet open) */}
        <div style={{ ...reveal, opacity: 0.74 }}>
          <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>Doorway Five</div>
          <h3 style={{ ...H3, fontSize: 'clamp(32px,4.6vw,60px)' }}>Founder Fellowship<TM /></h3>
          <p style={SUB}>Some arrive seeking guidance. Others become guides.</p>
          <p style={{ ...P, margin: 'clamp(28px,5vh,48px) auto 0', color: 'rgba(43,39,35,0.64)' }}>The Founder Fellowship is being thoughtfully created for experienced founders who feel called to help shape the next generation.</p>
          <div style={{ display: 'inline-block', marginTop: 'clamp(30px,5vh,50px)', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', border: '1px solid rgba(122,94,52,0.3)', borderRadius: 2, padding: '12px 28px' }}>Coming Soon</div>
        </div>

        {/* ── how Believe grows — the olive tree ──────────────────────── */}
        <ArchLine m="clamp(100px,18vh,220px) auto clamp(70px,12vh,150px)" />
        <div style={{ ...label, marginBottom: 'clamp(30px,5vh,52px)' }}>How Believe grows</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(24px,5vw,72px)', maxWidth: 620, margin: '0 auto', ...reveal }}>
          <div style={{ flex: '0 0 auto', width: 'clamp(190px,26vw,260px)', aspectRatio: '300/430' }}><OliveTree /></div>
          {/* the branches, rising — Conversation at the root, guiding others at the crown */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column-reverse', gap: 'clamp(14px,2.6vh,24px)', textAlign: 'left', paddingLeft: 22 }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: 5, top: '6%', bottom: '6%', width: 1, background: 'linear-gradient(180deg, rgba(125,138,83,0.55), rgba(122,94,52,0.3))' }} />
            {['The Founder Conversation', 'The Believe Blueprint™', 'The Founder’s Room™', 'Private Advisory', 'Founder Fellowship™', 'Founders Leading Founders™'].map((s, i, arr) => {
              const top = i === arr.length - 1
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.7em' }}>
                  <span aria-hidden="true" style={{ position: 'absolute', left: 2, width: 7, height: 7, borderRadius: '50%', background: top ? '#8a6a3a' : '#7d8a53', transform: 'translateX(-1px)' }} />
                  <span style={{ fontFamily: serif, fontWeight: top ? 500 : 300, fontStyle: top ? 'italic' : 'normal', fontSize: top ? 'clamp(19px,2.2vw,27px)' : 'clamp(17px,1.9vw,23px)', lineHeight: 1.25, color: top ? 'rgba(122,94,52,0.95)' : 'rgba(43,39,35,0.74)' }}>{s}</span>
                </div>
              )
            })}
          </div>
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.72)', maxWidth: '34ch', margin: 'clamp(40px,7vh,80px) auto 0', ...balance }}>The roots are belief. The trunk, transformation. The branches, growth. The fruit nourishes the founders who come next.</p>
        <p style={{ ...P, margin: 'clamp(44px,8vh,90px) auto 0', maxWidth: '32ch', lineHeight: 1.9 }}>Every founder enters Believe differently. Some begin with a conversation. Some begin with a Blueprint. Some join The Founder’s Room. Over time, some become Founder Fellows.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.24, color: '#2b2723', maxWidth: '20ch', margin: 'clamp(32px,5.5vh,60px) auto 0', ...balance }}>The greatest founders don’t simply build successful companies. <span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.92)' }}>They help build stronger founders.</span></p>

        {/* ── the front porch — Visionary Collective ──────────────────── */}
        <ArchLine m="clamp(100px,18vh,220px) auto clamp(70px,12vh,150px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: '1.8em' }}>The Front Porch</div>
          <p style={{ ...P, margin: '0 auto', maxWidth: '28ch', fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.82)' }}>Not every founder is ready to begin a Blueprint. Not every founder is looking for Private Advisory.</p>
          <p style={{ ...P, margin: 'clamp(30px,5vh,52px) auto 0', maxWidth: '26ch', lineHeight: 2, color: 'rgba(43,39,35,0.66)' }}>Sometimes you simply want a place to return to.<br />A place to think.<br />A place to continue learning.<br />A place to remain connected to other founders building meaningful companies.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', color: 'rgba(122,94,52,0.72)', margin: 'clamp(44px,8vh,88px) auto 0.35em' }}>Welcome to the</p>
          <h3 style={{ ...H3, fontSize: 'clamp(32px,4.6vw,60px)', margin: 0 }}>Visionary Collective<TM /></h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(36px,6vw,80px)', maxWidth: 560, margin: 'clamp(40px,7vh,72px) auto 0' }}>
            <div style={{ flex: '0 1 200px' }}>
              <div style={{ ...label, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.7em' }}>Founder</div>
              <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.2vw,40px)', color: '#2b2723' }}>$98 <span style={{ fontStyle: 'italic', fontSize: '0.5em', color: 'rgba(122,94,52,0.72)' }}>/ year</span></div>
            </div>
            <div style={{ flex: '0 1 200px' }}>
              <div style={{ ...label, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.7em' }}>Legacy</div>
              <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.2vw,40px)', color: '#2b2723' }}>$498 <span style={{ fontStyle: 'italic', fontSize: '0.5em', color: 'rgba(122,94,52,0.72)' }}>/ year</span></div>
            </div>
          </div>
          <DoorButton onClick={talk}>Join the Collective</DoorButton>
        </div>

        {/* ── closing ─────────────────────────────────────────────────── */}
        <div style={{ margin: 'clamp(110px,20vh,240px) auto clamp(48px,8vh,90px)', width: 'min(94%,760px)', ...reveal }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: 'clamp(120px,22vw,300px) clamp(120px,22vw,300px) 8px 8px', boxShadow: '0 60px 110px -60px rgba(60,44,20,0.66)' }}>
            <ImageSlot src={PHOTOS.people} alt="A walnut table in morning light — empty chairs, coffee, an open notebook" fit="cover" placeholder="the walnut table at sunrise — empty chairs, coffee, a notebook, morning light" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 56% at 38% 22%, rgba(255,230,178,0.5), transparent 70%)' }} />
          </div>
        </div>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.6vw,48px)', lineHeight: 1.18, color: '#2b2723', maxWidth: '20ch', margin: '0 auto 0.6em', ...balance }}>Every meaningful company begins with a founder willing to take the next step.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.84)', maxWidth: '24ch', margin: '0 auto' }}>If today feels like that moment, we’d be honored to walk beside you.</p>

        <div style={{ margin: 'clamp(52px,9vh,110px) auto 0' }}>
          <DoorButton onClick={talk}>Begin Your Journey</DoorButton>
        </div>

        {/* a seed, planted in very small editorial type */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(14px,1.5vw,18px)', lineHeight: 1.7, color: 'rgba(122,94,52,0.55)', maxWidth: '30ch', margin: 'clamp(72px,12vh,150px) auto 0', ...balance }}>Some founders come to Believe seeking guidance.<br />Some eventually return carrying it.</p>

        <ArchLine m="clamp(56px,9vh,90px) auto clamp(36px,6vh,60px)" />
        <BackPill onClose={ctx.closeWork} label="← Back to the building" />
      </div>

      {/* ── the note that greets a founder before any calendar ──────────── */}
      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
