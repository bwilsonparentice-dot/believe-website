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

const eyebrow: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)',
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
    <svg viewBox="0 0 320 272" role="img" aria-label="Three overlapping circles, Creativity, Commerce and Connection, meeting at Believe" style={{ display: 'block', width: '100%', height: 'auto', maxWidth: 360, margin: '0 auto' }}>
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

function TeamFace({ m, ctx }: { m: typeof CORE_TEAM[number]; ctx: Ctx }) {
  const w = m.lead ? 'clamp(122px,14vw,150px)' : 'clamp(112px,12.5vw,138px)'
  const anchor = m.name ? m.name.split(' ')[0].toLowerCase() : ''
  // each face is a door into the People page, landing on that person's section
  const open = anchor ? ctx.openPeopleAt(anchor) : ctx.openPeople
  return (
    <El as="button" className="home-teamface" onClick={open} aria-label={`Meet ${m.name || m.role} on the People page`} style={{ width: 'clamp(124px,14vw,152px)', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
      <div className="home-teamface__img" style={{ width: w, aspectRatio: '0.758', borderRadius: '46% 46% 7px 7px / 56% 56% 6px 6px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 34px -22px rgba(60,44,20,0.5)' }}>
        <ImageSlot src={m.photo} alt={`Portrait of ${m.name || m.role}`} placeholder={`Editorial portrait of ${m.name || m.role}`} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: m.pos || 'center 28%' }} />
      </div>
      <div className="home-teamface__name" style={{ fontFamily: serif, fontWeight: 500, fontSize: 18, marginTop: 12, color: palette.ink }}>{m.name ? m.name.split(' ')[0] : m.role}</div>
      <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: palette.olive, marginTop: 5 }}>{m.roleShort || m.role}</div>
    </El>
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
  return (
    <div className="home" style={{ position: 'relative', background: 'linear-gradient(176deg,#f1e9d8 0%,#efe6d3 50%,#e9dfc9 100%)', color: palette.ink }}>

      {/* ── Moment 1 · Hero — simple and emotionally compelling. The eyebrow
          carries the category clarity; the headline carries the feeling. ── */}
      <Section style={{ paddingTop: 'clamp(118px,20vh,210px)' }}>
        <ArchMark width={2.2} margin="0 auto 1.4em" />
        <div style={eyebrow}>Believe Studio &middot; Creative Strategy &amp; Advisory for Consumer Brands</div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px,2.1vw,22px)', color: palette.gold, margin: 'clamp(26px,4vh,40px) 0 0' }}>For those who see what could be.</p>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(34px,6.4vw,74px)', lineHeight: 1.03, color: palette.ink, margin: '0.22em auto 0', maxWidth: '16ch', ...balance }}>You&rsquo;ve built the brand. But what could it become?</h1>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(18px,2.4vw,27px)', lineHeight: 1.45, color: 'rgba(43,39,35,0.72)', margin: '0.9em auto 0', maxWidth: '38ch', ...balance }}>You&rsquo;ve made the decisions, taken the risks, opened the doors, and carried the responsibility of building something from nothing.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '18px 26px', margin: 'clamp(36px,5.5vh,58px) auto 0' }}>
          <El as="button" onClick={ctx.openConversation} style={navyCta} hover={{ background: palette.navyDeep }}>Start a Conversation</El>
          <El as="button" onClick={ctx.openDirectory} style={ghost} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Explore the House &rarr;</El>
        </div>
      </Section>

      {/* ── Moment 2 · The shift in perspective, then how we help. The passage
          unfolds here: the turn is carried by type and whitespace, with one
          faint brass hairline as its only accent. The three value cards then
          follow so the founder sees, plainly, what Believe does. ── */}
      <Section>
        <p style={{ ...body, maxWidth: '42ch', margin: '0 auto' }}>But sometimes the next opportunity isn&rsquo;t another retailer, another campaign, or another item on your to-do list.</p>

        <div aria-hidden="true" style={{ width: 48, height: 1, background: 'rgba(122,94,52,0.45)', margin: 'clamp(44px,7.5vh,84px) auto clamp(30px,5vh,52px)' }} />
        <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1.08, color: palette.navy, margin: '0 auto', maxWidth: '18ch', ...balance }}>Sometimes it begins with a different conversation.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,25px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.7)', margin: 'clamp(30px,5vh,52px) auto 0', maxWidth: '36ch', ...balance }}>One that helps you see your business, and its possibilities, in an entirely new way.</p>
        <El as="button" onClick={ctx.openConversation} style={{ ...ghost, marginTop: 'clamp(30px,5vh,48px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Start a Conversation &rarr;</El>

        {/* a quiet architectural rule into the concrete "how we help" */}
        <div aria-hidden="true" style={{ width: 'min(300px,54%)', height: 1, background: 'linear-gradient(90deg, transparent, rgba(122,94,52,0.32) 24%, rgba(122,94,52,0.32) 76%, transparent)', margin: 'clamp(66px,11vh,128px) auto clamp(40px,6.5vh,64px)' }} />
        <div style={eyebrow}>How we help</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 'clamp(30px,4vw,56px)', textAlign: 'left', maxWidth: 940, margin: 'clamp(30px,4.5vh,44px) auto 0' }}>
          {[
            { t: 'Create what’s next', d: 'Discover what makes your brand unmistakably itself, then bring it to life through creative strategy, storytelling, and experiences that connect with people.' },
            { t: 'Grow in every direction', d: 'Omnichannel demand, strategic partnerships, and the community that turns attention into belonging.' },
            { t: 'Think it through together', d: 'A trusted partner for the decisions that shape what comes next, from the next growth move to the ones only a founder can make.' },
          ].map((a) => (
            <div key={a.t}>
              <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(21px,2.2vw,27px)', lineHeight: 1.1, color: palette.ink, margin: 0 }}>{a.t}</h3>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.7vw,19px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.74)', margin: '0.6em 0 0' }}>{a.d}</p>
            </div>
          ))}
        </div>
        <El as="button" onClick={ctx.openWork} style={{ ...ghost, marginTop: 'clamp(38px,5.5vh,58px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>See all the ways to work &rarr;</El>
      </Section>

      {/* ── 3 · What makes our approach different — one point of view as a large editorial statement ── */}
      <Section>
        <div style={eyebrow}>Our point of view</div>
        <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(46px,8.4vw,98px)', lineHeight: 0.98, letterSpacing: '-0.015em', color: palette.navy, margin: 'clamp(18px,2.6vh,30px) auto 0', maxWidth: '12ch', ...balance }}>Demand before distribution.</p>
        <p style={{ ...body, maxWidth: '42ch', margin: 'clamp(30px,4.4vh,48px) auto 0' }}>Growth isn&rsquo;t more stores, or one loud moment. We build demand on purpose, so discovery, distribution, and loyalty feed one another.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.95vw,23px)', lineHeight: 1.46, color: 'rgba(90,68,34,0.9)', margin: 'clamp(20px,3vh,28px) auto 0', maxWidth: '36ch', ...balance }}>And the biggest opportunity is rarely the one in the brief. We look for the move that isn&rsquo;t obvious yet.</p>
      </Section>

      {/* ── 4 · The people & experience — the human difference, personal and credible ── */}
      <Section style={{ paddingBottom: 'clamp(70px,12vh,150px)' }}>
        {/* The dramatic editorial moment of the People section: an oversized,
            asymmetric question set to the left with open whitespace to its
            right, the italic second line stepping in, echoing the reference
            spreads. It stands entirely on its own, no eyebrow and no supporting
            copy; the founder story and portraits below are its answer. */}
        {/* widened container: this moment breaks out of the Section's 8vw padded
            column (which narrows to ~810px on wide screens) so the oversized
            question keeps full scale and "Who's helping you see" stays on one
            line, with the italic second line beneath. Centered on the viewport,
            never wider than the viewport minus a safe gutter. */}
        <div style={{ textAlign: 'left', width: 'min(1120px, calc(100vw - clamp(32px,6vw,110px)))', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <div aria-hidden="true" style={{ width: 56, height: 1, background: 'rgba(122,94,52,0.55)', margin: '0 0 clamp(26px,4.4vh,46px)' }} />
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(34px,9vw,112px)', lineHeight: 0.97, letterSpacing: '-0.02em', color: palette.navy, margin: 0 }}>Who&rsquo;s helping you see<span style={{ display: 'block', fontStyle: 'italic', fontWeight: 400, paddingLeft: '0.14em' }}>the bigger picture?</span></h2>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.74)', maxWidth: '46ch', margin: 'clamp(48px,8vh,96px) 0 0', textWrap: 'pretty' as CSSProperties['textWrap'] }}>Believe Studio is led by Beth Wilson-Parentice, who built Sipp from her kitchen into a national brand on shelves at Target, Whole Foods, and Starbucks. She has sat in the founder&rsquo;s chair, and built the partner she wished she&rsquo;d had.</p>
        </div>
        <div className="home-team" style={{ marginTop: 'clamp(38px,6vh,62px)' }}>
          {CORE_TEAM.map((m, i) => (
            <React.Fragment key={i}>
              {i === 3 && <div className="team-row-break" aria-hidden="true" />}
              <TeamFace m={m} ctx={ctx} />
            </React.Fragment>
          ))}
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.3vw,28px)', lineHeight: 1.4, color: palette.ink, maxWidth: '34ch', margin: 'clamp(42px,6vh,68px) auto 0', ...balance }}>&ldquo;{STORIES[0].quote}&rdquo;</p>
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', marginTop: '1.3em' }}>{STORIES[0].name} &middot; {STORIES[0].company}</div>
        <El as="button" onClick={ctx.openPeople} style={{ ...ghost, marginTop: 'clamp(36px,5vh,54px)' }} hover={{ color: palette.ink, borderColor: 'rgba(43,39,35,0.8)' }}>Meet the people of Believe Studio &rarr;</El>
      </Section>
    </div>
  )
}
