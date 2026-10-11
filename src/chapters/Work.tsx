import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { openBooking } from '../lib/booking'
import { PHOTOS, STORIES } from '../data'
import { palette } from '../lib/palette'

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

// the single primary action — deep navy on cream: authority and contrast, not
// a luxury-brand gold button. Kept institutional (small, tracked, sharp corner),
// with gold appearing only as a detail discovered on hover.
const cta: React.CSSProperties = {
  display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 13, letterSpacing: '0.32em',
  textTransform: 'uppercase', color: palette.linen, background: palette.navy, border: `1px solid ${palette.navy}`,
  borderRadius: 2, padding: '17px 42px', cursor: 'pointer', boxShadow: 'inset 0 0 0 1px rgba(250,244,234,0)',
  transition: 'background 500ms ease, box-shadow 600ms ease',
}
const ctaHover: React.CSSProperties = { background: palette.navyDeep, boxShadow: `inset 0 0 0 1px ${palette.gold}55, 0 20px 40px -26px rgba(22,32,58,0.7)` }

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
    <div style={{ margin: 'var(--wtw-inv-list, clamp(30px,5vh,52px)) auto 0', maxWidth: 560 }}>
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
  const talk = openBooking

  // The three invitations — evocative directions a conversation can take, not
  // fixed packages or promises of particular deliverables. Verbatim editorial
  // direction from the studio; each carries its own honest "this is not" line.
  const invitations = [
    {
      n: '01', title: 'Create What’s Next', verb: 'Imagine.',
      forWhom: 'For founders ready to see their brand differently.',
      body: 'For founders reimagining their brand, exploring new opportunities, building something that doesn’t exist yet, or creating a more meaningful relationship with the people they serve.',
      encompass: ['Brand positioning and creative strategy', 'Brand worlds and storytelling', 'Omnichannel demand strategy', 'Creative campaigns and brand experiences', 'Strategic collaborations and partnerships', 'Community-building and belonging', 'New market and audience opportunities'],
      message: 'We help founders see what’s possible — and build the strategy to bring it to life.',
      img: '/photos/photo-atelier.webp', imgAlt: 'A sunlit creative atelier — a small team reviewing moodboards, materials, and sketches around a long table',
    },
    {
      n: '02', title: 'A Seat at Your Table', verb: 'Think together.',
      forWhom: 'For founders navigating what comes next.',
      body: 'Some founders don’t need another agency or another presentation. They need a trusted strategic voice who understands what it’s like to build a company, make difficult decisions, and see both the creative and commercial picture.',
      encompass: ['Private founder advisory', 'Strategic sounding-board relationships', 'Navigating growth and important crossroads', 'Evaluating opportunities and trade-offs', 'Brand and business direction', 'Founder decision-making and perspective', 'Ongoing strategic partnership'],
      message: 'You don’t have to figure out every next move alone.',
      img: '/photos/photo-conversation.webp', imgAlt: 'Two chairs drawn close around a small walnut table, coffee and an open journal in morning light',
    },
    {
      n: '03', title: 'Build Something Together', verb: 'Connect.',
      forWhom: 'For founders who know the right connections can change everything.',
      body: 'Some of the most powerful opportunities happen when the right people, ideas, brands, and communities come together.',
      encompass: ['Strategic partnerships and collaborations', 'Building brand communities and belonging', 'Creating meaningful brand experiences', 'Bringing founders and creative thinkers together', 'Cross-category collaborations', 'Unconventional growth opportunities', 'Connections that extend beyond traditional distribution'],
      message: 'Sometimes what changes everything is who — and what — you bring together.',
      img: '/photos/photo-courtyard.webp', imgAlt: 'A Mediterranean courtyard at golden hour — a long linen-dressed table set for gathering beneath olive trees',
    },
  ]

  return (
    <ChapterShell onClose={ctx.closeWork} background="#efe6d3" backLabel={<>←&nbsp;Back</>}>
      <div className="wtw" style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: 'clamp(96px,17vh,220px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* the lead — what Believe is, plainly and confidently */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.5em' }}>Ways to Work With Believe</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5.1vw,68px)', lineHeight: 1.06, margin: '0 auto', maxWidth: '18ch', ...balance }}>The best things begin with a conversation.</h2>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.15vw,28px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.74)', maxWidth: '46ch', margin: 'clamp(36px,6vh,76px) auto 0', ...balance }}>We don&rsquo;t begin with a predetermined package. We begin with what you&rsquo;re building, what you&rsquo;re questioning, and what you believe could be possible.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '44ch', margin: 'clamp(26px,4.4vh,44px) auto 0', ...pretty }}>Sometimes that calls for a new creative direction. Sometimes it takes a trusted voice at the table. And sometimes the right connection changes everything.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.84)', maxWidth: '40ch', margin: 'clamp(26px,4.4vh,44px) auto 0', ...balance }}>Every engagement takes shape around the founder, the opportunity, and the work worth doing.</p>
        <El as="button" onClick={talk} style={{ ...cta, marginTop: 'clamp(40px,7vh,72px)' }} hover={ctaHover}>Start a Conversation &rarr;</El>

        {/* the engagements — the concrete ways to work, made easy to understand.
            Active engagements have real pages/flows; future concepts are set
            apart under "On the horizon" so nothing is implied to be available
            before it has launched. */}
        <ArchLine m="var(--wtw-hero-invite-t) auto var(--wtw-hero-invite-b)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(22px,4vh,40px)' }}>The invitations</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3.1vw,40px)', lineHeight: 1.16, color: '#2b2723', maxWidth: '24ch', margin: '0 auto', ...balance }}>Three ways a conversation can begin.</p>

          <div className="wtw-invitations" style={{ marginTop: 'var(--wtw-head-first)' }}>
            {invitations.map((inv, i) => (
              <div className={'wtw-spread' + (i % 2 === 1 ? ' flip' : '')} key={inv.n}>
                <div className="wtw-media wtw-reveal-media">
                  <ImageSlot src={inv.img} alt={inv.imgAlt} placeholder={inv.imgAlt} fit="cover" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                </div>
                <div className="wtw-copy wtw-reveal-copy">
                  <div style={{ ...label, color: 'rgba(122,94,52,0.72)', marginBottom: 'var(--wtw-inv-label)' }}>{inv.n}&nbsp;&mdash;&nbsp;{inv.title}</div>
                  <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.2vw,56px)', lineHeight: 1.03, color: '#2b2723', margin: 0 }}>{inv.verb}</p>
                  <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(110,84,44,0.95)', maxWidth: '30ch', margin: 'var(--wtw-inv-for) 0 0', ...pretty }}>{inv.forWhom}</p>
                  <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.68, color: 'rgba(43,38,30,0.9)', margin: 'var(--wtw-inv-body) 0 0', ...pretty }}>{inv.body}</p>
                  <div className="wtw-encompass"><b>This can encompass</b><span className="items">{inv.encompass.map((it, k) => (<React.Fragment key={k}>{k > 0 && <span className="sep" aria-hidden="true">·</span>}{it}</React.Fragment>))}</span></div>
                  <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.4vw,30px)', lineHeight: 1.3, color: '#2b2723', maxWidth: '30ch', margin: 'var(--wtw-inv-msg) 0 0', ...balance }}>{inv.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* the first conversation — a quiet editorial invitation carrying on from
              the courtyard, not an abrupt CTA. Arch mark for continuity; the
              approved complimentary line verbatim; the same booking action. */}
          <div className="wtw-reveal-copy" style={{ marginTop: 'clamp(84px,15vh,180px)', textAlign: 'center' }}>
            <ArchMark width={2} margin="0 auto clamp(22px,3.6vh,38px)" />
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,27px)', lineHeight: 1.5, color: 'rgba(110,84,44,0.92)', maxWidth: '34ch', margin: '0 auto', ...balance }}>The first Founder Conversation is complimentary &mdash; simply a chance to understand each other, with no obligation to continue.</p>
            <El as="button" onClick={talk} style={{ ...cta, marginTop: 'clamp(34px,5.5vh,56px)' }} hover={ctaHover}>Start a Conversation &rarr;</El>
          </div>

          {/* existing experiences & gatherings — preserved and reachable, clearly secondary to the invitations */}
          <div style={{ maxWidth: 620, margin: 'clamp(66px,11vh,120px) auto 0', textAlign: 'left' }}>
            <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em', color: 'rgba(122,94,52,0.5)', marginBottom: '1.1em' }}>Inside the House</div>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.8vw,21px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.64)', margin: '0 0 clamp(16px,2.8vh,28px)', ...pretty }}>In time, a conversation may take shape as a focused engagement, an ongoing seat at the table, or a place to gather with other founders.</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { n: 'The Believe Blueprint', d: 'A focused strategic engagement — the architecture of your next chapter.', go: ctx.openBlueprint },
                { n: 'Private Advisory', d: 'An ongoing strategic partnership, within The Drawing Room.', go: ctx.openAdvisory },
                { n: 'The Table', d: 'A gathering space for founders and conversation.', go: ctx.openTable },
              ].map((e) => (
                <El as="button" key={e.n} onClick={e.go} style={{ textAlign: 'left', background: 'none', border: 'none', borderTop: '1px solid rgba(122,94,52,0.2)', padding: 'clamp(18px,2.6vh,26px) 0', cursor: 'pointer', transition: 'background 300ms ease' }} hover={{ background: 'rgba(122,94,52,0.05)' }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em' }}>
                    <span style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(20px,2.3vw,28px)', lineHeight: 1.05, color: '#2b2723' }}>{e.n}</span>
                    <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', whiteSpace: 'nowrap' }}>Enter &rarr;</span>
                  </span>
                  <span style={{ display: 'block', fontFamily: serif, fontWeight: 300, fontSize: 'clamp(15px,1.7vw,20px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.7)', marginTop: '0.4em', ...pretty }}>{e.d}</span>
                </El>
              ))}
            </div>
          </div>

          {/* future and evolving — never implied to be available before it launches */}
          <div style={{ maxWidth: 620, margin: 'clamp(40px,7vh,72px) auto 0', textAlign: 'left', borderTop: '1px solid rgba(122,94,52,0.2)', paddingTop: 'clamp(24px,4vh,36px)' }}>
            <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em', color: 'rgba(122,94,52,0.5)', marginBottom: '1.1em' }}>On the horizon</div>
            <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(19px,2.2vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.58)' }}>The Founder&rsquo;s Room &middot; The Visionary Collective<span style={{ display: 'block', fontStyle: 'italic', fontSize: '0.82em', color: 'rgba(122,94,52,0.72)', marginTop: '0.5em' }}>Future and evolving concepts, opening to more founders over time.</span></div>
          </div>
        </div>

        {/* built from the other side of the table */}
        <ArchLine m="clamp(90px,16vh,190px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(28px,5vh,50px)' }}>Built from the other side of the table</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(25px,3.3vw,42px)', lineHeight: 1.16, color: '#2b2723', maxWidth: '20ch', margin: '0 auto', ...balance }}>Experience changes what you see.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.05vw,26px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.78)', maxWidth: '42ch', margin: 'clamp(28px,4.6vh,48px) auto 0', ...balance }}>Beth built Sipp from her kitchen into a multimillion-dollar national brand sold at Target, Whole Foods, Starbucks, Wegmans, The Fresh Market, and thousands of retail doors.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.72)', maxWidth: '45ch', margin: 'clamp(30px,5vh,54px) auto 0', ...pretty }}>She has sat across from buyers, worked with distributors, raised money, managed production, made expensive mistakes, celebrated the wins, and hired plenty of people who promised they could help.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '42ch', margin: 'clamp(30px,5vh,54px) auto 0', ...pretty }}>Believe was built from that experience. Not to stand outside the business and tell founders what they should do, but to bring experienced people around the table and help make the next move happen.</p>

          {/* the signature — Beth's line alone, then her voice in body copy beneath (emphasis preserved) */}
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.24, color: '#2b2723', maxWidth: '18ch', margin: 'clamp(58px,10vh,112px) auto 0', ...balance }}>&ldquo;I built the partner I wish I&rsquo;d had.&rdquo;</p>
          <div style={{ ...label, fontSize: 10, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.6)', marginTop: '1.5em' }}>Beth</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.7)', maxWidth: '38ch', margin: 'clamp(30px,5vh,52px) auto 0', ...pretty }}>When I was building Sipp, I had plenty of people telling me what I should do. What I needed was someone willing to get in it with me.</p>
        </div>

        {/* who you're working with — the House around Beth, so a founder sees
            this is an institution, not one person. Names and roles, quietly set
            (never headshot cards); the fuller portraits live in The People. */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(56px,10vh,120px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(26px,4.5vh,44px)' }}>Who you&rsquo;re working with</div>
          {/* two registers: the confident line, then the operating explanation */}
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,42px)', lineHeight: 1.16, color: '#2b2723', maxWidth: '22ch', margin: '0 auto', ...balance }}>You are not hiring one person.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.05vw,26px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.8)', maxWidth: '42ch', margin: 'clamp(22px,3.8vh,36px) auto 0', ...balance }}>Believe brings a small, experienced team around the founder, then adds specialist expertise when the work calls for it.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.82)', maxWidth: '34ch', margin: 'clamp(26px,4.5vh,44px) auto 0', ...balance }}>You&rsquo;re not handed off to junior staff, and you&rsquo;re not relying on one person alone.</p>

          {/* one clear way to the full team, instead of repeating the roster here */}
          <El as="button" onClick={ctx.openPeople} style={{ display: 'inline-block', marginTop: 'clamp(40px,7vh,76px)', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.4)', paddingBottom: 4, cursor: 'pointer', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Meet the people of Believe Studio &rarr;</El>
        </div>

        {/* what we help founders do — outcomes, not departments (more hierarchy + breathing room) */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(26px,4.5vh,44px)' }}>What we help founders do</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.8)', maxWidth: '34ch', margin: '0 auto clamp(66px,11vh,132px)', ...balance }}>Founders rarely arrive with a department problem. They arrive because something needs to move.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px,10vh,112px)' }}>
            {[
              { name: 'See the business clearly', line: 'Positioning, customer, economics, retail reality, and the real constraint beneath the obvious problem.' },
              { name: 'Build a brand people choose', line: 'Clarify the positioning, story, experience, and reason the product deserves to matter.' },
              { name: 'Create the next growth move', line: 'Retail, channels, partnerships, buyer strategy, distribution, demand, and the opportunities worth pursuing.' },
              { name: 'Unstick what isn’t moving', line: 'Find the issue behind the issue, make the decision, and turn the next move into action.' },
            ].map((o) => (
              <div key={o.name}>
                <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.8vw,50px)', lineHeight: 1.06, color: '#2b2723' }}>{o.name}</div>
                <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '34ch', margin: '0.72em auto 0', ...balance }}>{o.line}</div>
              </div>
            ))}
          </div>
        </div>

        {/* the differentiator — how Believe sees (emphasis preserved) */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4vw,54px)', lineHeight: 1.12, color: '#2b2723', maxWidth: '20ch', margin: '0 auto', ...balance }}>The biggest opportunity is rarely the one in the brief.</h3>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.72)', maxWidth: '42ch', margin: 'clamp(36px,6vh,72px) auto 0', ...pretty }}>We look across the founder, the business, and the market for the move that is not obvious yet: the reframe, connection, decision, or opportunity that changes what becomes possible.</p>
        </div>

        {/* proof — real founders, in their words (restrained hierarchy preserved) */}
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

        {/* how we work — one conversation, one unmistakable action */}
        <ArchLine m="clamp(100px,17vh,210px) auto clamp(64px,11vh,130px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(26px,4.5vh,44px)' }}>How we work</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.16, color: '#2b2723', maxWidth: '18ch', margin: '0 auto', ...balance }}>Before we advise, we understand.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '45ch', margin: 'clamp(34px,6vh,64px) auto 0', ...pretty }}>We begin with the founder, the business, and the decision in front of them &mdash; then we shape the work around what will actually move it forward.</p>
          <El as="button" onClick={talk} style={{ ...cta, marginTop: 'clamp(48px,9vh,100px)' }} hover={ctaHover}>Start a Conversation &rarr;</El>
        </div>

        <ArchLine m="clamp(80px,13vh,150px) auto clamp(40px,7vh,64px)" />
        <BackPill onClose={ctx.closeWork} label="← Back" />
      </div>

      {/* the note that greets a founder before any calendar */}
    </ChapterShell>
  )
}
