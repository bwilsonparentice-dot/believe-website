import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { openBooking } from '../lib/booking'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as React.CSSProperties['textWrap'] }

const label: React.CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)',
}

// the single primary action — deep navy on cream: authority and contrast, with
// gold appearing only as a detail discovered on hover.
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

const reveal: React.CSSProperties = {
  animation: 'doorwayReveal 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: 'entry 3% cover 26%' as unknown as string,
}

/**
 * Ways to Work — a warm, confident invitation, not a capabilities deck. Five
 * moments: a concise introduction (with the complimentary first conversation
 * visible near the top), the three invitations as photographic spreads, how
 * engagements take shape (Blueprint / Private Advisory / The Table), the
 * experience and people behind Believe, and a final invitation. The invitations
 * are evocative directions a conversation can take, never fixed packages.
 */
export function WorkChapter({ ctx }: { ctx: Ctx }) {
  const talk = openBooking

  const invitations = [
    {
      n: '01', title: 'Create What’s Next', verb: 'Imagine.',
      forWhom: 'For founders ready to see their brand differently.',
      body: 'From positioning and storytelling to unexpected partnerships, experiences, and new ways of connecting with consumers, we explore what a brand could become.',
      message: 'We turn possibility into creative strategy.',
      img: '/photos/photo-atelier.webp', imgAlt: 'A sunlit creative atelier, a small team reviewing moodboards, materials, and sketches around a long table',
    },
    {
      n: '02', title: 'A Seat at Your Table', verb: 'Think together.',
      forWhom: 'For founders navigating what comes next.',
      body: 'A trusted strategic voice who has built a company, beside you through the decisions that shape it.',
      message: 'You don’t have to figure out every next move alone.',
      img: '/photos/photo-conversation.webp', imgAlt: 'Two chairs drawn close around a small walnut table, coffee and an open journal in morning light',
    },
    {
      n: '03', title: 'Build Something Together', verb: 'Connect.',
      forWhom: 'For founders who believe the right connection can change everything.',
      body: 'We bring together brands, people, ideas, and communities to create opportunities that might never have existed otherwise.',
      message: 'Sometimes the most valuable thing we create is the connection itself.',
      img: '/photos/photo-courtyard.webp', imgAlt: 'A Mediterranean courtyard at golden hour, a long linen-dressed table set for gathering beneath olive trees',
    },
  ]

  return (
    <ChapterShell onClose={ctx.closeWork} background="#efe6d3" backLabel={<>←&nbsp;Back</>}>
      <div className="wtw" style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: 'clamp(96px,17vh,220px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* 1 · Introduction — warm and concise, with the complimentary first
            conversation made visible near the top */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.5em' }}>Ways to Work With Believe</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5.1vw,68px)', lineHeight: 1.06, margin: '0 auto', maxWidth: '18ch', ...balance }}>The best things begin with a conversation.</h2>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.15vw,28px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.74)', maxWidth: '46ch', margin: 'clamp(34px,5.5vh,66px) auto 0', ...balance }}>We don&rsquo;t begin with a package. We begin with what you&rsquo;re building, what you&rsquo;re questioning, and what you believe could be possible.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.84)', maxWidth: '40ch', margin: 'clamp(24px,4vh,40px) auto 0', ...balance }}>The first conversation is complimentary, with no obligation. You don&rsquo;t need to know exactly what you need before reaching out.</p>
        <El as="button" onClick={talk} style={{ ...cta, marginTop: 'clamp(38px,6.5vh,68px)' }} hover={ctaHover}>Start a Conversation &rarr;</El>

        {/* 2 · The three ways to work — photographic spreads, distinct
            personalities, a few meaningful lines each (no capability lists) */}
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
                  <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.4vw,30px)', lineHeight: 1.3, color: '#2b2723', maxWidth: '30ch', margin: 'var(--wtw-inv-msg) 0 0', ...balance }}>{inv.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 · How engagements take shape — the deeper pathways, kept accessible
            and clearly secondary to the invitations; future concepts set apart */}
        <ArchLine m="clamp(90px,15vh,180px) auto clamp(56px,9vh,110px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(22px,4vh,40px)' }}>How engagements take shape</div>
          <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'left' }}>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.68)', margin: '0 0 clamp(20px,3.4vh,34px)', textAlign: 'center', ...pretty }}>In time, a conversation might become a focused engagement, an ongoing seat at the table, or a place to gather with other founders.</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { n: 'The Believe Blueprint', d: 'A focused strategic engagement, the architecture of your next chapter.', go: ctx.openBlueprint },
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
            <div style={{ marginTop: 'clamp(36px,6vh,64px)', borderTop: '1px solid rgba(122,94,52,0.2)', paddingTop: 'clamp(22px,3.6vh,34px)' }}>
              <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em', color: 'rgba(122,94,52,0.5)', marginBottom: '1.1em' }}>On the horizon</div>
              <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(19px,2.2vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.58)' }}>The Founder&rsquo;s Room &middot; The Visionary Collective<span style={{ display: 'block', fontStyle: 'italic', fontSize: '0.82em', color: 'rgba(122,94,52,0.72)', marginTop: '0.5em' }}>Future and evolving concepts, opening to more founders over time.</span></div>
            </div>
          </div>
        </div>

        {/* 4 · The experience and people behind Believe — combined and concise */}
        <ArchLine m="clamp(90px,16vh,190px) auto clamp(56px,10vh,120px)" />
        <div style={reveal}>
          <div style={{ ...label, marginBottom: 'clamp(26px,4.5vh,44px)' }}>Built from the other side of the table</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,44px)', lineHeight: 1.16, color: '#2b2723', maxWidth: '20ch', margin: '0 auto', ...balance }}>Believe was built by a founder who has actually built one.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.05vw,26px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', maxWidth: '46ch', margin: 'clamp(30px,5vh,52px) auto 0', ...pretty }}>Beth grew Sipp from her kitchen into a national brand on shelves at Target, Whole Foods, and Starbucks. Around her, Believe brings a small, experienced team to the founder&rsquo;s side, with specialist expertise added when the work calls for it.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.24, color: '#2b2723', maxWidth: '18ch', margin: 'clamp(50px,9vh,100px) auto 0', ...balance }}>&ldquo;I built the partner I wish I&rsquo;d had.&rdquo;</p>
          <div style={{ ...label, fontSize: 10, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.6)', marginTop: '1.5em' }}>Beth</div>
          <El as="button" onClick={ctx.openPeople} style={{ display: 'inline-block', marginTop: 'clamp(40px,7vh,72px)', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.4)', paddingBottom: 4, cursor: 'pointer', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Meet the people of Believe Studio &rarr;</El>
        </div>

        {/* 5 · A final invitation */}
        <ArchLine m="clamp(90px,16vh,200px) auto clamp(48px,8vh,96px)" />
        <div style={reveal}>
          <ArchMark width={2} margin="0 auto clamp(24px,4vh,40px)" />
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4vw,54px)', lineHeight: 1.14, color: '#2b2723', maxWidth: '20ch', margin: '0 auto', ...balance }}>What if the next chapter begins with a conversation?</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.05vw,26px)', lineHeight: 1.65, color: 'rgba(43,39,35,0.74)', maxWidth: '40ch', margin: 'clamp(30px,5vh,52px) auto 0', ...pretty }}>Tell us what you&rsquo;re building. What&rsquo;s keeping you up at night. Or the possibility you can&rsquo;t stop thinking about.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.84)', margin: 'clamp(20px,3.4vh,30px) auto 0' }}>We&rsquo;d love to hear it.</p>
          <El as="button" onClick={talk} style={{ ...cta, marginTop: 'clamp(38px,6.5vh,72px)' }} hover={ctaHover}>Start a Conversation &rarr;</El>
        </div>

        <ArchLine m="clamp(80px,13vh,150px) auto clamp(40px,7vh,64px)" />
        <BackPill onClose={ctx.closeWork} label="← Back" />
      </div>
    </ChapterShell>
  )
}
