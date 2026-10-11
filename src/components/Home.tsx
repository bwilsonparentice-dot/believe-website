import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ArchMark } from './ChapterShell'
import { ImageSlot } from './ImageSlot'
import { CORE_TEAM, STORIES } from '../data'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

const eyebrow: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)',
}
const lead: CSSProperties = {
  fontFamily: serif, fontWeight: 500, fontSize: 'clamp(26px,4vw,46px)', lineHeight: 1.08, color: palette.ink, ...balance,
}
const body: CSSProperties = {
  fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.74)', ...balance,
}
// a quiet underlined door, reused from the House grammar
const ghost: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase',
  color: 'rgba(43,39,35,0.82)', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.55)',
  padding: '0 0 7px', cursor: 'pointer',
}
const navyCta: CSSProperties = {
  fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase',
  color: palette.linen, background: palette.navy, border: `1px solid ${palette.navy}`, borderRadius: 2,
  padding: '15px 34px', cursor: 'pointer',
}

function Section({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <section style={{ position: 'relative', padding: 'clamp(70px,12vh,150px) 8vw', maxWidth: 1040, margin: '0 auto', textAlign: 'center', ...style }}>
      {children}
    </section>
  )
}

/** The Creativity · Commerce · Connection mark — compact, legible, static. */
function Venn() {
  return (
    <svg width="100%" height="auto" viewBox="0 0 320 272" role="img" aria-label="Three overlapping circles, Creativity, Commerce and Connection, meeting at Believe" style={{ display: 'block', maxWidth: 360, margin: '0 auto' }}>
      <g fillOpacity={0.15} strokeWidth={1.6}>
        <circle cx="126" cy="110" r="84" fill={palette.olive} stroke={palette.olive} />
        <circle cx="194" cy="110" r="84" fill={palette.gold} stroke={palette.gold} />
        <circle cx="160" cy="172" r="84" fill={palette.navy} stroke={palette.navy} />
      </g>
      <text x="90" y="84" textAnchor="middle" fontFamily={sans} fontSize="13" fill={palette.ink}>Creativity</text>
      <text x="230" y="84" textAnchor="middle" fontFamily={sans} fontSize="13" fill={palette.ink}>Commerce</text>
      <text x="160" y="210" textAnchor="middle" fontFamily={sans} fontSize="13" fill={palette.ink}>Connection</text>
      <text x="160" y="138" textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize="18" fill={palette.ink}>Believe</text>
    </svg>
  )
}

function TeamFace({ m }: { m: typeof CORE_TEAM[number] }) {
  const w = m.lead ? 'clamp(122px,14vw,150px)' : 'clamp(112px,12.5vw,138px)'
  return (
    <div style={{ width: 'clamp(124px,14vw,152px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: w, aspectRatio: '0.758', borderRadius: '46% 46% 7px 7px / 56% 56% 6px 6px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 34px -22px rgba(60,44,20,0.5)' }}>
        <ImageSlot src={m.photo} alt={`Portrait of ${m.name || m.role}`} placeholder={`Editorial portrait of ${m.name || m.role}`} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: m.pos || 'center 28%' }} />
      </div>
      <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 18, marginTop: 12, color: palette.ink }}>{m.name ? m.name.split(' ')[0] : m.role}</div>
      <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: palette.olive, marginTop: 5 }}>{m.roleShort || m.role}</div>
    </div>
  )
}

/**
 * The Believe Studio homepage — a clear, scrollable introduction, experienced
 * inside the house. The visitor understands what the studio is and how we work
 * with founders before being invited to explore the rooms below. The approved
 * hero, the Creativity · Commerce · Connection framework, Demand before
 * distribution, and Build belonging all live here; the cinematic rooms follow.
 */
export function Home({ ctx }: { ctx: Ctx }) {
  const toRooms = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const el = document.getElementById('room-threshold')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="home" style={{ position: 'relative', background: 'linear-gradient(176deg,#f1e9d8 0%,#efe6d3 50%,#e9dfc9 100%)', color: palette.ink }}>

      {/* ── Hero — the studio, stated ──────────────────────────────────── */}
      <Section style={{ paddingTop: 'clamp(118px,20vh,210px)' }}>
        <ArchMark width={2.2} margin="0 auto 1.4em" />
        <div style={eyebrow}>Believe Studio &middot; A House for Founders</div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px,2.1vw,22px)', color: palette.gold, margin: 'clamp(26px,4vh,40px) 0 0' }}>For those who see what could be.</p>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(34px,6.4vw,74px)', lineHeight: 1.02, color: palette.ink, margin: '0.22em auto 0', maxWidth: '18ch', ...balance }}>A creative strategy studio for ambitious founders.</h1>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(18px,2.4vw,27px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.72)', margin: '0.9em auto 0', maxWidth: '32ch', ...balance }}>The imagination to see what doesn&rsquo;t exist. The experience to make it real.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: 'clamp(0.5em,1.4vw,1.1em)', margin: 'clamp(30px,4.6vh,50px) auto 0' }}>
          {['Brand Strategy', 'Creative Direction', 'Storytelling', 'Omnichannel Growth', 'Founder Advisory'].map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && <span aria-hidden="true" style={{ color: 'rgba(122,94,52,0.4)', fontSize: 11 }}>&middot;</span>}
              <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 'clamp(9.5px,1vw,11.5px)', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', whiteSpace: 'nowrap' }}>{t}</span>
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '18px 26px', margin: 'clamp(34px,5vh,56px) auto 0' }}>
          <El as="button" onClick={ctx.openConversation} style={navyCta} hover={{ background: palette.navyDeep }}>Start a Conversation</El>
          <El as="button" onClick={toRooms} style={ghost} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Explore the House &rarr;</El>
        </div>
      </Section>

      {/* ── Creativity · Commerce · Connection ─────────────────────────── */}
      <Section>
        <div style={eyebrow}>What we do</div>
        <p style={{ ...lead, margin: '0.5em auto 0', maxWidth: '20ch' }}>Creativity, commerce, and connection, in one room.</p>
        <div style={{ margin: 'clamp(26px,4vh,44px) auto clamp(20px,3vh,30px)' }}><Venn /></div>
        <p style={{ ...body, maxWidth: '46ch', margin: '0 auto' }}>Creativity imagines what&rsquo;s possible. Commerce brings it to life. Connection gives it meaning. The best work happens where all three meet.</p>
      </Section>

      {/* ── Demand before distribution (short band) + belonging ────────── */}
      <Section style={{ background: 'rgba(30,42,68,0.035)', maxWidth: 'none', borderTop: '1px solid rgba(122,94,52,0.16)', borderBottom: '1px solid rgba(122,94,52,0.16)' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div style={eyebrow}>Our point of view</div>
          <p style={{ ...lead, color: palette.navy, margin: '0.5em auto 0', maxWidth: '18ch' }}>Demand before distribution.</p>
          <p style={{ ...body, maxWidth: '48ch', margin: 'clamp(22px,3.4vh,34px) auto 0' }}>Growth isn&rsquo;t just more stores, or a single viral moment. We build demand intentionally and use every channel strategically, so discovery, distribution, and demand reinforce one another, and give people reasons to discover, choose, and return.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px,2vw,22px)', color: 'rgba(90,68,34,0.9)', margin: 'clamp(18px,2.6vh,26px) auto 0', maxWidth: '30ch', ...balance }}>Don&rsquo;t just build an audience. Build belonging.</p>
          <El as="button" onClick={ctx.openStudioPage} style={{ ...ghost, marginTop: 'clamp(26px,4vh,40px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>See how we think &rarr;</El>
        </div>
      </Section>

      {/* ── How we work with founders — the three ways ─────────────────── */}
      <Section>
        <div style={eyebrow}>How we work with founders</div>
        <p style={{ ...lead, margin: '0.5em auto 0', maxWidth: '16ch' }}>Before we advise, we understand.</p>
        <p style={{ ...body, maxWidth: '50ch', margin: 'clamp(20px,3vh,30px) auto clamp(34px,5vh,54px)' }}>We bring a small, experienced team around the founder and the business, then work across the disciplines the decision needs. You are never handed to junior staff, and never relying on one person alone.</p>
        <div className="home-areas" style={{ textAlign: 'left' }}>
          {[
            { pn: 'Creative Strategy & Brand Worlds', fn: 'Positioning, story, identity, and the creative direction that makes a brand impossible to ignore.', eg: 'For example: a positioning you can say in one line, a brand world in words and images, creative direction any partner can follow.', go: ctx.openStudioPage },
            { pn: 'Omnichannel Demand Strategy', fn: 'Where your people gather, how they discover you, and the partnerships, experiences, and channels that turn attention into advocacy.', eg: 'For example: a map of where your customers already are, a demand plan across the channels that matter, the partnerships worth pursuing first.', go: ctx.openStudioPage },
            { pn: 'Private Founder Advisory', fn: 'A trusted strategic partner, one to one, through the decisions that shape what comes next.', eg: 'For example: a thinking partner for the decision in front of you, clarity on the next move, someone beside you through the defining moments.', go: ctx.openAdvisory },
          ].map((a) => (
            <El as="button" key={a.pn} onClick={a.go}
              style={{ textAlign: 'left', background: 'rgba(250,246,236,0.7)', border: '1px solid rgba(122,94,52,0.22)', borderRadius: 8, padding: 'clamp(20px,2.4vw,28px)', cursor: 'pointer', transition: 'border-color 350ms ease, background 350ms ease' }}
              hover={{ borderColor: 'rgba(122,94,52,0.55)', background: 'rgba(250,246,236,0.95)' }}>
              <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(21px,2.4vw,26px)', lineHeight: 1.08, color: palette.ink }}>{a.pn}</div>
              <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(15px,1.7vw,18px)', lineHeight: 1.45, color: 'rgba(43,39,35,0.72)', marginTop: 10 }}>{a.fn}</div>
              <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 14, lineHeight: 1.4, color: 'rgba(122,94,52,0.8)', marginTop: 12 }}>{a.eg}</div>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.gold, marginTop: 14 }}>Enter &rarr;</div>
            </El>
          ))}
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.9vw,22px)', color: 'rgba(43,39,35,0.6)', margin: 'clamp(34px,5vh,52px) auto 0', maxWidth: '40ch', ...balance }}>Every engagement is shaped around the founder and the work.</p>
        <El as="button" onClick={ctx.openWork} style={{ ...ghost, marginTop: 'clamp(26px,4vh,40px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>See all the ways to work with Believe &rarr;</El>
      </Section>

      {/* ── Who you'll work with ───────────────────────────────────────── */}
      <Section>
        <div style={eyebrow}>Who you&rsquo;ll find inside</div>
        <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(23px,3.4vw,38px)', lineHeight: 1.18, color: palette.navy, margin: '0.6em auto 0', maxWidth: '24ch', ...balance }}>No founder should have to carry the whole company alone.</p>
        <div aria-hidden="true" style={{ width: 'clamp(60px,7vw,80px)', height: 1, background: palette.gold, opacity: 0.75, margin: 'clamp(22px,3.2vh,30px) auto clamp(28px,4vh,40px)' }} />
        <div className="home-team">
          {CORE_TEAM.map((m, i) => <TeamFace key={i} m={m} />)}
        </div>
        <p style={{ ...body, maxWidth: '50ch', margin: 'clamp(34px,5vh,54px) auto 0' }}>A small, experienced team around the founder, with specialist expertise added when the work calls for it. Led by Beth Wilson-Parentice, who built Sipp from a kitchen into a national brand on shelves at Target, Whole Foods, and Starbucks.</p>
        <El as="button" onClick={ctx.openPeople} style={{ ...ghost, marginTop: 'clamp(30px,4.4vh,46px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Meet the people of Believe Studio &rarr;</El>
      </Section>

      {/* ── Proof — in their words (verified against data.ts STORIES) ──── */}
      <Section style={{ background: 'rgba(30,42,68,0.035)', maxWidth: 'none', borderTop: '1px solid rgba(122,94,52,0.16)', borderBottom: '1px solid rgba(122,94,52,0.16)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={eyebrow}>In their words</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,8vh,96px)', marginTop: 'clamp(34px,5vh,56px)' }}>
            {STORIES.map((s, i) => (
              <div key={s.name}>
                <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.6vw,32px)', lineHeight: 1.36, color: palette.ink, maxWidth: '30ch', margin: '0 auto', ...balance }}>&ldquo;{s.quote}&rdquo;</p>
                <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', marginTop: '1.3em' }}>{s.name} &middot; {s.company}</div>
                {i === 0 && s.changed && (
                  <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(14px,1.5vw,17px)', color: 'rgba(43,39,35,0.6)', marginTop: '0.9em', maxWidth: '44ch', marginLeft: 'auto', marginRight: 'auto', ...pretty }}>{s.changed.join(' · ')}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Explore the House — the transition into the rooms + CTA ────── */}
      <Section style={{ paddingBottom: 'clamp(50px,8vh,90px)' }}>
        <div style={eyebrow}>Explore the House</div>
        <p style={{ ...lead, margin: '0.5em auto 0', maxWidth: '14ch' }}>There&rsquo;s more inside.</p>
        <p style={{ ...body, maxWidth: '38ch', margin: 'clamp(20px,3vh,30px) auto 0' }}>Beyond this page the house keeps going, room after quiet room, each with its own light and its own invitation. Take your time. The door stays open.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '18px 26px', margin: 'clamp(34px,5vh,52px) auto 0' }}>
          <El as="button" onClick={ctx.openConversation} style={navyCta} hover={{ background: palette.navyDeep }}>Start a Conversation</El>
          <El as="button" onClick={toRooms} aria-label="Wander the rooms" style={{ ...ghost }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Wander the rooms &darr;</El>
        </div>
      </Section>
    </div>
  )
}
