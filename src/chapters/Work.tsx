import React, { useState } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { PHOTOS } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as React.CSSProperties['textWrap'] }

// Beth's scheduling link for The Founder Conversation — reached only after the
// transitional note, so the emotional tone is set before a time is ever chosen.
const FOUNDER_CALL_URL = 'https://calendly.com/beth-believeagency/elite-brand-visibility-call-clone'

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

/** A cluster of small olive leaves around a point — deterministic, so it's calm. */
function leaves(cx: number, cy: number, n: number, seed: number) {
  let s = seed >>> 0
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
  const out: React.ReactNode[] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd() * 0.7
    const r = 5 + rnd() * 12
    const lx = cx + Math.cos(a) * r, ly = cy + Math.sin(a) * r * 0.9
    const rot = (a * 180) / Math.PI + 90
    out.push(<ellipse key={`${seed}-${i}`} cx={lx} cy={ly} rx={2.2 + rnd() * 1} ry={5 + rnd() * 2.4} transform={`rotate(${rot} ${lx} ${ly})`} fill="#7d8a53" opacity={0.5 + rnd() * 0.35} />)
  }
  return out
}

/**
 * A Mediterranean olive tree — the shape of how Believe grows. Roots of belief,
 * a trunk of transformation, branches of growth, fruit that nourishes the
 * founders who come next. Drawn simply; never a diagram.
 */
function OliveTree() {
  const tips: [number, number, number, number][] = [
    [84, 226, 8, 11], [224, 224, 8, 29], [112, 182, 7, 43], [196, 180, 7, 61],
    [150, 162, 9, 79], [128, 150, 6, 97], [172, 150, 6, 113], [150, 200, 5, 131],
  ]
  const olives: [number, number][] = [[90, 224], [220, 222], [150, 158], [116, 184], [194, 182], [150, 196]]
  return (
    <svg viewBox="0 0 300 430" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <g stroke="#8a6a3a" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* roots */}
        <g strokeWidth={2} opacity={0.85}>
          <path d="M150 384 C128 398, 108 402, 92 416" />
          <path d="M150 384 C172 398, 192 402, 210 416" />
          <path d="M150 384 C144 402, 138 408, 128 420" />
          <path d="M150 384 C156 402, 164 408, 176 420" />
        </g>
        {/* trunk */}
        <path d="M150 386 C144 340, 154 312, 150 260" strokeWidth={7} />
        {/* branches */}
        <g strokeWidth={2.6}>
          <path d="M150 300 C122 282, 102 258, 86 230" />
          <path d="M150 288 C180 270, 204 250, 222 228" />
          <path d="M150 262 C134 238, 122 212, 114 186" />
          <path d="M150 258 C168 234, 184 210, 194 184" />
          <path d="M150 258 C150 224, 150 196, 150 166" />
        </g>
      </g>
      {/* foliage */}
      <g>{tips.map(([x, y, n, seed]) => leaves(x, y, n, seed))}</g>
      {/* olives */}
      <g>{olives.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={2.6} ry={3.4} fill="#5b4a6b" opacity={0.8} />)}</g>
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

        {/* ── opening: the emotional heading, then the reframe ────────── */}
        <div style={{ ...label, marginBottom: 'clamp(22px,4vh,40px)' }}>Investment</div>
        <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(38px,6vw,86px)', lineHeight: 1.04, margin: '0 auto clamp(30px,5vh,52px)', maxWidth: '15ch', ...balance }}>Every Journey Begins Somewhere.</h1>
        <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.24, color: 'rgba(43,39,35,0.82)', margin: '0 auto', maxWidth: '22ch', ...balance }}>You’re not investing in a deliverable. You’re investing in becoming the leader your company needs you to become.</h2>

        <ArchLine m="clamp(80px,14vh,180px) auto" />

        <p style={{ ...P, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.8)', maxWidth: '30ch' }}>Most consulting ends when the recommendations are delivered. We believe the real work begins there.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(22px,2.7vw,36px)', lineHeight: 1.3, color: '#2b2723', maxWidth: '20ch', margin: 'clamp(36px,6vh,64px) auto 0', ...balance }}>Because companies don’t make decisions. Founders do.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.1vw,26px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)', maxWidth: '28ch', margin: 'clamp(36px,6vh,60px) auto 0' }}>Every strategy.<br />Every opportunity.<br />Every hire.<br />Every partnership.<br />Every conversation.</p>
        <p style={{ ...SUB, margin: 'clamp(30px,5vh,52px) auto 0' }}>Begins with a founder making a decision.</p>
        <p style={{ ...P, margin: 'clamp(44px,8vh,90px) auto 0', maxWidth: '38ch' }}>Our role isn’t simply to help you build a stronger business. Our role is to help you become the leader your business needs you to become.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.2, color: '#2b2723', margin: 'clamp(44px,8vh,88px) auto 0', maxWidth: '16ch', ...balance }}>We are not transactional. <span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.92)' }}>We are transformational.</span></p>

        <ArchLine m="clamp(96px,17vh,210px) auto clamp(80px,14vh,170px)" />

        {/* ── the doorways ────────────────────────────────────────────── */}
        <ArchMark width={2.2} margin="0 auto 1.6em" />
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.8vw,64px)', lineHeight: 1.06, margin: '0 0 0.5em', ...balance }}>Every founder enters Believe differently.</h2>
        <p style={{ ...SUB, fontStyle: 'normal', fontWeight: 300, color: 'rgba(43,39,35,0.7)', fontSize: 'clamp(19px,2.1vw,27px)' }}>Choose the doorway that best reflects where you are today.</p>

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
          <DoorButton onClick={talk}>Begin Your Blueprint</DoorButton>
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
          <DoorButton onClick={talk}>Join the Room</DoorButton>
        </div>

        <ArchLine />

        {/* Doorway Four — Private Advisory */}
        <div style={reveal}>
          <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>Doorway Four</div>
          <h3 style={{ ...H3, fontSize: 'clamp(32px,4.6vw,60px)' }}>Private Advisory</h3>
          <p style={SUB}>Reserved for defining moments.</p>
          <p style={{ ...P, margin: 'clamp(28px,5vh,48px) auto 0' }}>Reserved for founders navigating meaningful periods of growth, leadership, transition, or transformation. Highly personalized advisory work, designed around your company, your leadership, and your biggest decisions.</p>
          <Investment><span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.85)' }}>By application.</span></Investment>
          <DoorButton onClick={talk}>Request an Introduction</DoorButton>
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
          <div style={{ ...label, marginBottom: '1.6em' }}>Stay Connected</div>
          <h3 style={{ ...H3, fontSize: 'clamp(32px,4.6vw,60px)' }}>Visionary Collective<TM /></h3>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0.2em auto 1.5em', maxWidth: '30ch', ...balance }}>Not every founder is ready for a Blueprint, or for The Founder’s Room. That’s okay.</p>
          <p style={{ ...P, margin: '0 auto', maxWidth: '42ch' }}>A place to stay connected, continue learning, and receive thoughtful insights as you build your company — among founders from around the world who believe meaningful businesses are built one thoughtful decision at a time.</p>
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

/**
 * The note shown when a founder chooses to begin — a quiet greeting before any
 * scheduling, so the first thing they meet is a question about themselves.
 */
function ConversationNote({ onClose }: { onClose: () => void }) {
  const line: React.CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,30px)', lineHeight: 1.32, color: 'rgba(43,39,35,0.82)', margin: 0 }
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px,5vw,60px)', background: 'rgba(26,19,11,0.5)', backdropFilter: 'blur(6px)', animation: 'veilIn 500ms ease both' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: 'min(680px,100%)', maxHeight: '92vh', overflowY: 'auto', background: 'radial-gradient(120% 90% at 34% 18%, #fbf6ec, #f1e8d7 70%, #e9dfc9)', borderRadius: 4, boxShadow: '0 60px 120px -50px rgba(30,20,8,0.7)', padding: 'clamp(36px,5.5vw,72px) clamp(28px,5vw,68px)', textAlign: 'center', animation: 'contentFocus 800ms cubic-bezier(.2,.7,.2,1) both' }}
      >
        <ArchMark width={2.2} margin="0 auto 1.3em" />
        <div style={{ ...label, fontSize: 10, letterSpacing: '0.44em', marginBottom: '1.4em' }}>The Founder Conversation<span style={{ fontSize: '0.7em', verticalAlign: 'super' }}>™</span></div>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(25px,3.2vw,42px)', lineHeight: 1.16, color: '#2b2723', margin: '0 auto clamp(22px,3.6vh,36px)', maxWidth: '20ch', ...balance }}>Every meaningful company begins with a conversation.</p>
        <p style={{ ...line, color: 'rgba(43,39,35,0.72)', maxWidth: '36ch', margin: '0 auto clamp(26px,4.4vh,42px)', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, ...pretty }}>Before we talk about strategy, growth, or opportunities, we’d simply like to understand you.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1.2vh,13px)', maxWidth: '30ch', margin: '0 auto clamp(24px,4vh,38px)' }}>
          <p style={{ ...line, fontSize: 'clamp(19px,2.2vw,28px)' }}>What are you building?</p>
          <p style={{ ...line, fontSize: 'clamp(19px,2.2vw,28px)' }}>What feels exciting?</p>
          <p style={{ ...line, fontSize: 'clamp(19px,2.2vw,28px)' }}>What feels uncertain?</p>
          <p style={{ ...line, fontSize: 'clamp(19px,2.2vw,28px)' }}>What chapter are you entering?</p>
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.85)', margin: '0 auto clamp(32px,5.4vh,52px)', maxWidth: '24ch', ...balance }}>This conversation isn’t about selling. It’s about listening.</p>

        <a
          href={FOUNDER_CALL_URL}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#f6efe4', background: '#3a2f1e', border: '1px solid #3a2f1e', borderRadius: 2, padding: '16px 40px', cursor: 'pointer' }}
        >
          Continue to Scheduling&nbsp;&rarr;
        </a>

        <El onClick={onClose} style={{ display: 'block', margin: 'clamp(26px,4.4vh,42px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.4)', cursor: 'pointer', transition: 'color 400ms ease' }} hover={{ color: 'rgba(43,39,35,0.75)' }}>Not just now</El>
      </div>
    </div>
  )
}
