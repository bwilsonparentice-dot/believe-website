import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { HouseArch } from '../components/HouseArch'
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
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

// The framed invitation — given real presence now (a bordered pill, not a quiet
// underline), because asking to join is the whole point of the page.
const joinBtn: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.7em', fontFamily: sans, fontWeight: 400,
  fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2b2723',
  background: 'transparent', border: '1px solid rgba(122,94,52,0.55)', borderRadius: 2,
  padding: '15px 32px', cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease, background 400ms ease',
}
const joinHover = { color: '#1e2a44', borderColor: 'rgba(30,42,68,0.7)', background: 'rgba(122,94,52,0.06)' }

/** A small numbered section heading for the three-column band. */
function Step({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ ...label, fontSize: 10, letterSpacing: '0.34em', marginBottom: 'clamp(16px,1.6vw,22px)' }}>
      <span style={{ color: 'rgba(122,94,52,0.5)' }}>{n}</span>
      <span style={{ color: 'rgba(122,94,52,0.3)', margin: '0 0.7em' }}>&middot;</span>
      <span>{title}</span>
    </div>
  )
}

/**
 * The Founder's Room — a monthly virtual gathering for consumer-brand founders.
 * Reworked as four clear moments: the invitation (hero), the experience, the
 * founding circle (The Lantern Room), and the invitation to join. Quieter and
 * roughly half the former length; the emotional idea is stated once, warmly,
 * and the join action is given real presence. (ctx.openDoorway('founders-room').)
 */
export function FoundersRoom({ ctx }: { ctx: Ctx }) {
  const x = EXPERIENCES['founders-room']
  const colP: CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.25vw,20px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.74)', margin: '0 0 1.1em', ...pretty }

  return (
    <ChapterShell onClose={ctx.closeDoorway} background="#efe7d5" z={130}>
      {/* the room's light — soft, slowly drifting, never quite noticed */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(42% 38% at 50% 6%, rgba(255,236,196,0.9), transparent 60%)', opacity: 0.66, animation: 'lightWander 90s ease-in-out infinite alternate' }} />

      <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: 'clamp(100px,15vh,190px) clamp(26px,6vw,80px) clamp(80px,13vh,170px)', color: '#2b2723', animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ══ 1 · THE INVITATION — split hero: copy left, the room through the arch right ══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(36px,5vw,80px)', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ ...label, marginBottom: '1.6em' }}>A monthly virtual gathering</div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,5.4vw,78px)', lineHeight: 1.02, margin: '0 0 0.3em' }}>The Founder&rsquo;s Room</h2>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px,2.6vw,34px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.86)', margin: '0 0 clamp(26px,3.4vh,40px)', maxWidth: '20ch', ...balance }}>You don&rsquo;t have to figure it all out alone.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,1.45vw,23px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.78)', margin: '0 0 clamp(22px,3vh,32px)', maxWidth: '40ch', ...pretty }}>Once a month, a small circle of consumer brand founders meets live and online for honest conversations about the decisions, challenges, and possibilities of building a brand.</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.35vw,22px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', margin: '0 0 clamp(36px,5vh,52px)', maxWidth: '32ch', ...balance }}>No recordings. No performance. Just people who understand.</p>
            <El as="button" onClick={ctx.openConversation} style={joinBtn} hover={joinHover}>Ask About Joining &rarr;</El>
          </div>
          <div style={{ ...surface('entry 0% cover 16%') }}>
            <HouseArch scale="standard" width="min(100%,520px)">
              <ImageSlot src={PHOTOS.foundersRoom} fit="cover" alt="The Founder&rsquo;s Room: a richly appointed navy-panelled library with curated bookshelves lit by warm brass picture lights, an intimate circle of seating around a round stone table, an olive-green velvet chair, and an atmospheric framed riverside painting beside a marble fireplace." placeholder="a navy-panelled library with curated bookshelves, warm brass lighting, an intimate circle of seating and an olive-green velvet chair" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: 'center 50%', animation: 'slowZoom 24s ease-out both' }} />
            </HouseArch>
          </div>
        </div>

        {/* a quiet full-width hairline between the hero and the band */}
        <div aria-hidden="true" style={{ height: 1, width: '100%', margin: 'clamp(64px,11vh,130px) 0 clamp(56px,9vh,104px)', background: 'linear-gradient(90deg, transparent, rgba(122,94,52,0.32) 20%, rgba(122,94,52,0.32) 80%, transparent)' }} />

        {/* ══ 2–4 · THE EXPERIENCE · THE FOUNDING CIRCLE · THE INVITATION ══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(248px,1fr))', gap: 'clamp(40px,4.5vw,72px)', textAlign: 'left', ...surface() }}>

          {/* The Experience */}
          <div>
            <Step n="01" title="The Experience" />
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,2.3vw,32px)', lineHeight: 1.12, margin: '0 0 clamp(20px,2.4vw,30px)', ...balance }}>A different kind of founder conversation.</h3>
            <p style={colP}>Bring the question you&rsquo;ve been sitting with. Hear perspectives from people who have been there, or are right there with you.</p>
            <p style={{ ...colP, fontStyle: 'italic', color: 'rgba(122,94,52,0.8)', margin: 0 }}>No presentations. No prescribed agenda. Just thoughtful conversation that helps you see what comes next.</p>
          </div>

          {/* The Founding Circle — the lantern kept small, as a symbol, not the hero */}
          <div>
            <Step n="02" title="The Founding Circle" />
            <div style={{ maxWidth: 66, margin: '0 0 clamp(18px,2vw,26px)' }}>
              <ImageSlot src="/photos/lantern-room-plaque.webp" alt="The Lantern Room: a brass lantern holding a single candle." fit="contain" style={{ width: '100%', height: 'auto' }} />
            </div>
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,2.3vw,32px)', lineHeight: 1.12, margin: '0 0 0.3em' }}>The Lantern Room</h3>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.4vw,22px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.84)', margin: '0 0 clamp(20px,2.4vw,30px)' }}>Clarity. Perspective. Possibility.</p>
            <p style={colP}>An intimate founding circle of up to eight brands and ten founders.</p>
            <p style={{ ...colP, margin: 0 }}>We&rsquo;re shaping the next gatherings with the founders who want to be part of them.</p>
          </div>

          {/* The Invitation to join */}
          <div>
            <Step n="03" title="The Invitation" />
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,2.3vw,32px)', lineHeight: 1.12, margin: '0 0 clamp(20px,2.4vw,30px)', ...balance }}>There&rsquo;s a place for your perspective.</h3>
            <p style={{ ...colP, margin: '0 0 clamp(30px,4vh,44px)' }}>Interested in joining the circle? We&rsquo;d love to hear from you.</p>
            <El as="button" onClick={ctx.openConversation} style={joinBtn} hover={joinHover}>Ask About Joining &rarr;</El>
          </div>
        </div>

        {/* a quiet hairline before the questions */}
        <div aria-hidden="true" style={{ height: 1, width: '100%', margin: 'clamp(64px,11vh,130px) 0 clamp(52px,9vh,100px)', background: 'linear-gradient(90deg, transparent, rgba(122,94,52,0.32) 20%, rgba(122,94,52,0.32) 80%, transparent)' }} />

        {/* ══ a small, practical FAQ — frequency, format, participation, joining ══ */}
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'left', ...surface() }}>
          <div style={{ ...label, marginBottom: 'clamp(36px,6vh,64px)', textAlign: 'center' }}>Questions founders ask</div>
          <Correspondence items={x.faqs} />
        </div>

        <div style={{ marginTop: 'clamp(84px,15vh,170px)', textAlign: 'center' }}><RoomNav ctx={ctx} slug="founders-room" /></div>
      </div>
    </ChapterShell>
  )
}
