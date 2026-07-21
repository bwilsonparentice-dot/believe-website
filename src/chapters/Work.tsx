import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'

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

/** The word above the amount — "Your Investment", never "Price". */
function InvestmentLabel() {
  return <div style={{ ...label, letterSpacing: '0.46em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.9em' }}>Your Investment</div>
}

/** The amount, set as editorial type — a quiet figure, never a price tag. */
function Amount({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4vw,52px)', lineHeight: 1.1, color: '#2b2723' }}>
      {children}
      {sub && <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', color: 'rgba(122,94,52,0.7)', marginTop: '0.5em' }}>{sub}</div>}
    </div>
  )
}

/**
 * Every Journey Begins Somewhere — the investment section, reimagined not as a
 * price list but as the different doors through which founders enter the house.
 * The figures are part of the story, never the focus. (Reached through the
 * building as "Begin Here"; kept under ctx.openWork/closeWork.)
 */
export function WorkChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeWork} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(96px,17vh,220px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── the opening ─────────────────────────────────────────────── */}
        <ArchMark width={2.2} margin="0 auto 1.8em" />
        <div style={{ ...label, marginBottom: '2em' }}>Every Journey Begins Somewhere</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5.2vw,74px)', lineHeight: 1.08, margin: '0 auto', maxWidth: '18ch', ...balance }}>Every founder arrives carrying something different.</h2>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.7)', maxWidth: '26ch', margin: 'clamp(40px,7vh,80px) auto 0', ...pretty }}>Some arrive carrying uncertainty.<br />Some carry momentum.<br />Some carry exhaustion.<br />Some carry possibility.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '24ch', margin: 'clamp(36px,6vh,64px) auto 0', ...balance }}>There is no single way to begin. Only the place that feels right for where you are today.</p>

        {/* room to breathe before the first door */}
        <Divider h="clamp(80px,15vh,170px)" m="clamp(80px,15vh,180px) auto clamp(70px,12vh,150px)" />

        {/* ── the first door ──────────────────────────────────────────── */}
        <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.8em' }}>The First Door</div>
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.03, margin: '0 0 0.3em' }}>Begin with a Blueprint<TM /></h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.4em' }}>A thoughtful beginning.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.74)', maxWidth: '42ch', margin: '0 auto 0.9em', ...pretty }}>The Believe Blueprint<TM /> is where every meaningful journey starts. Through a focused working session, we step back from the noise of day-to-day operations to understand the whole picture: your company, your leadership, your opportunities, and the decisions that matter most.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.66)', maxWidth: '42ch', margin: '0 auto clamp(40px,7vh,72px)', ...pretty }}>You leave with greater clarity, a practical strategic framework, and a personalized Believe Blueprint<TM /> that becomes the foundation for what comes next.</p>
        <InvestmentLabel />
        <Amount>$2,500</Amount>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.72)', margin: '1.4em auto 0' }}>The place every founder begins.</p>

        <Divider h="clamp(64px,11vh,130px)" m="clamp(70px,12vh,150px) auto" />

        {/* ── the second door ─────────────────────────────────────────── */}
        <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.8em' }}>The Second Door</div>
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.03, margin: '0 0 0.3em' }}>The Founder’s Room<TM /></h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.4em' }}>Where transformation happens.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.74)', maxWidth: '42ch', margin: '0 auto 0.9em', ...pretty }}>An ongoing private advisory experience for founders navigating meaningful growth, difficult decisions, leadership transitions, investor conversations, retailer expansion, and the realities of building something that matters.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.72)', maxWidth: '34ch', margin: '0 auto clamp(40px,7vh,72px)', ...pretty }}>The work extends far beyond business strategy. Together, we strengthen the founder behind the company. This is not coaching, or consulting. It is partnership.</p>
        <InvestmentLabel />
        <Amount>Starting at $995 <span style={{ fontStyle: 'italic', fontSize: '0.62em', color: 'rgba(122,94,52,0.75)' }}>per month</span></Amount>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.72)', margin: '1.4em auto 0', maxWidth: '28ch' }}>Designed for founders committed to building with intention.</p>

        <Divider h="clamp(64px,11vh,130px)" m="clamp(70px,12vh,150px) auto" />

        {/* ── the third door — quieter, more restrained ───────────────── */}
        <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.8em' }}>The Third Door</div>
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.6vw,60px)', lineHeight: 1.04, margin: '0 0 0.3em' }}>Private Advisory</h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.4em' }}>Reserved for defining moments.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.68)', maxWidth: '40ch', margin: '0 auto 1em', ...pretty }}>Some conversations cannot happen in a group. Some decisions deserve deeper partnership.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.6)', maxWidth: '40ch', margin: '0 auto clamp(40px,7vh,72px)', ...pretty }}>Reserved for founders navigating pivotal chapters: rapid growth, acquisitions, family-business transitions, investor dynamics, leadership changes, or moments that will shape the future of the company.</p>
        <InvestmentLabel />
        <Amount sub="By invitation or application.">Custom engagement.</Amount>

        <Divider h="clamp(64px,11vh,130px)" m="clamp(70px,12vh,150px) auto" />

        {/* ── the fourth door ─────────────────────────────────────────── */}
        <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.8em' }}>The Fourth Door</div>
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.6vw,60px)', lineHeight: 1.04, margin: '0 0 0.3em' }}>Visionary Collective</h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.4em' }}>Stay connected to the house.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.72)', maxWidth: '42ch', margin: '0 auto clamp(40px,7vh,76px)', ...pretty }}>Not every founder needs deep advisory every month. Some simply want to remain close to the conversations, the thinking, and the people — through founder conversations, private gatherings, early access, Field Notes, and shared wisdom.</p>
        {/* two thoughtfully written invitations, never a comparison chart */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(40px,7vw,90px)', maxWidth: 620, margin: '0 auto' }}>
          <div style={{ flex: '0 1 220px' }}>
            <div style={{ ...label, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.8em' }}>Founder Membership</div>
            <Amount>$98 <span style={{ fontStyle: 'italic', fontSize: '0.5em', color: 'rgba(122,94,52,0.72)' }}>annually</span></Amount>
          </div>
          <div style={{ flex: '0 1 220px' }}>
            <div style={{ ...label, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.8em' }}>Legacy Membership</div>
            <Amount>$498 <span style={{ fontStyle: 'italic', fontSize: '0.5em', color: 'rgba(122,94,52,0.72)' }}>annually</span></Amount>
          </div>
        </div>

        {/* ── the pause, then what every journey shares ───────────────── */}
        <Divider h="clamp(90px,16vh,190px)" m="clamp(96px,17vh,200px) auto clamp(80px,14vh,160px)" />

        <div style={{ ...label, marginBottom: '1.8em' }}>What Every Journey Includes</div>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.9)', maxWidth: '22ch', margin: '0 auto 0.7em', ...balance }}>No matter where your journey begins, you become part of something larger.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.78)', margin: '0 auto clamp(48px,8vh,88px)' }}>Every Believe experience is grounded in the same philosophy.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.5vh,34px)', maxWidth: '34ch', margin: '0 auto', textAlign: 'left' }}>
          {[
            'Honest founder conversations.',
            'Practical growth strategy.',
            'Lived operating experience.',
            'Thoughtful guidance.',
            'AI and systems where they genuinely create leverage.',
            'A place where founders are understood before they are advised.',
            'The opportunity to one day become a guide for the founder who comes next.',
          ].map((line, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: '0.9em', alignItems: 'baseline' }}>
              <span aria-hidden="true" style={{ fontFamily: sans, fontSize: 13, color: 'rgba(122,94,52,0.6)', flex: '0 0 auto', transform: 'translateY(-1px)' }}>{i === arr.length - 1 ? '✦' : '✓'}</span>
              <span style={{ fontFamily: serif, fontWeight: i === arr.length - 1 ? 400 : 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: i === arr.length - 1 ? 'rgba(122,94,52,0.92)' : 'rgba(43,39,35,0.76)', ...pretty }}>{line}</span>
            </div>
          ))}
        </div>

        {/* ── the closing reflection ──────────────────────────────────── */}
        <Divider h="clamp(80px,14vh,170px)" m="clamp(88px,15vh,180px) auto clamp(70px,12vh,140px)" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55em', maxWidth: '28ch', margin: '0 auto' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.32, color: 'rgba(43,39,35,0.78)', margin: 0 }}>Every founder changes a company.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.32, color: 'rgba(43,39,35,0.88)', margin: 0 }}>Some founders change an industry.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(22px,2.7vw,34px)', lineHeight: 1.32, color: 'rgba(122,94,52,0.92)', margin: 0 }}>The greatest founders change other founders.</p>
        </div>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: '#2b2723', margin: 'clamp(28px,5vh,48px) auto 0', maxWidth: '30ch' }}>Believe exists to help them do both.</p>

        {/* the quiet invitation — never a hard call to action */}
        <div style={{ margin: 'clamp(64px,11vh,130px) auto 0' }}>
          <El
            onClick={ctx.openBlueprint}
            style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', border: '1px solid rgba(43,39,35,0.28)', borderRadius: 2, padding: '15px 34px', cursor: 'pointer' }}
            hover={{ borderColor: 'rgba(43,39,35,0.8)', color: '#2b2723' }}
          >
            Begin Your Journey
          </El>
        </div>

        {/* a seed, planted in very small editorial type */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(14px,1.5vw,18px)', lineHeight: 1.7, color: 'rgba(122,94,52,0.55)', maxWidth: '30ch', margin: 'clamp(72px,12vh,150px) auto 0', ...balance }}>Some founders come to Believe seeking guidance.<br />Some eventually return carrying it.</p>

        <Divider h="clamp(40px,7vh,72px)" m="clamp(56px,9vh,90px) auto clamp(36px,6vh,60px)" />
        <BackPill onClose={ctx.closeWork} label="← Back to the building" />
      </div>
    </ChapterShell>
  )
}
