import React, { useState } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as React.CSSProperties['textWrap'] }

// Beth's scheduling link for The Founder Conversation. Leave blank until the real
// Calendly/scheduler URL is set; the note still shows, and the button waits.
const FOUNDER_CALL_URL = ''

/** A small ™ set in superscript. */
function TM() {
  return <span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span>
}

const label: React.CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)',
}

/** The word above the amount — "Your Investment", never "Price". */
function InvestmentLabel({ children = 'Your Investment' }: { children?: React.ReactNode }) {
  return <div style={{ ...label, letterSpacing: '0.46em', color: 'rgba(122,94,52,0.55)', marginBottom: '0.9em' }}>{children}</div>
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
 * Every Journey Begins Somewhere — the ecosystem, entered not through a price
 * list but through doorways. It opens with a conversation, not a purchase: The
 * Founder Conversation™ comes first, complimentary, so no one is asked what they
 * want to buy before they're asked what they're building. (ctx.openWork.)
 */
export function WorkChapter({ ctx }: { ctx: Ctx }) {
  const [noteOpen, setNoteOpen] = useState(false)

  return (
    <ChapterShell onClose={ctx.closeWork} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(96px,17vh,220px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── the opening ─────────────────────────────────────────────── */}
        <ArchMark width={2.2} margin="0 auto 1.8em" />
        <div style={{ ...label, marginBottom: '2em' }}>Every Journey Begins Somewhere</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5.2vw,74px)', lineHeight: 1.08, margin: '0 auto', maxWidth: '18ch', ...balance }}>Every founder arrives carrying something different.</h2>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.7)', maxWidth: '26ch', margin: 'clamp(40px,7vh,80px) auto 0', ...pretty }}>Some arrive carrying uncertainty.<br />Some carry momentum.<br />Some carry exhaustion.<br />Some carry possibility.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '24ch', margin: 'clamp(36px,6vh,64px) auto 0', ...balance }}>There is no single way to begin. Only the place that feels right for where you are today.</p>

        {/* room to breathe before the conversation */}
        <Divider h="clamp(80px,15vh,170px)" m="clamp(80px,15vh,180px) auto clamp(70px,12vh,150px)" />

        {/* ── before any door — the conversation ──────────────────────── */}
        <div style={{ ...label, marginBottom: '1.6em' }}>Not sure where to begin?</div>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.78)', maxWidth: '26ch', margin: '0 auto clamp(36px,6vh,60px)', ...balance }}>Every founder’s journey is different. Before choosing a path, let’s have a conversation.</p>
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.03, margin: '0 0 0.35em' }}>The Founder Conversation<TM /></h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.5em' }}>Complimentary · thirty minutes · no agenda.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.74)', maxWidth: '40ch', margin: '0 auto clamp(28px,5vh,48px)', ...pretty }}>A conversation for founders navigating growth, change, uncertainty, or their next chapter. Together we’ll explore —</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,2.2vh,20px)', maxWidth: '34ch', margin: '0 auto clamp(30px,5vh,52px)', textAlign: 'left' }}>
          {[
            'Where you are today',
            'What’s keeping you awake at night',
            'The decisions in front of you',
            'Whether Believe is the right place for your journey',
          ].map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.9em', alignItems: 'baseline' }}>
              <span aria-hidden="true" style={{ fontFamily: sans, fontSize: 12, color: 'rgba(122,94,52,0.55)', flex: '0 0 auto' }}>—</span>
              <span style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.78)', ...pretty }}>{line}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2.1vw,26px)', color: 'rgba(122,94,52,0.82)', margin: '0 auto clamp(36px,6vh,60px)', maxWidth: '24ch' }}>No pressure. No pitch. Just an honest conversation.</p>
        <El
          onClick={() => setNoteOpen(true)}
          style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#f6efe4', background: '#3a2f1e', border: '1px solid #3a2f1e', borderRadius: 2, padding: '16px 38px', cursor: 'pointer', transition: 'background 400ms ease, color 400ms ease' }}
          hover={{ background: '#54432a', color: '#fff' }}
        >
          Begin the Conversation
        </El>

        {/* ── and when you know which door is yours ───────────────────── */}
        <Divider h="clamp(80px,15vh,180px)" m="clamp(90px,16vh,190px) auto clamp(70px,12vh,150px)" />
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '24ch', margin: '0 auto clamp(64px,11vh,130px)', ...balance }}>And when you know which door is yours —</p>

        {/* Begin with a Blueprint */}
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.03, margin: '0 0 0.3em' }}>Begin with a Blueprint<TM /></h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.4em' }}>A one-time investment in clarity.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.74)', maxWidth: '42ch', margin: '0 auto 0.9em', ...pretty }}>Through a focused working session, we step back from the noise of day-to-day operations to understand the whole picture: your company, your leadership, your opportunities, and the decisions that matter most.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.66)', maxWidth: '42ch', margin: '0 auto clamp(40px,7vh,72px)', ...pretty }}>You leave with greater clarity, a practical strategic framework, and a personalized Believe Blueprint<TM /> that becomes the foundation for what comes next.</p>
        <InvestmentLabel />
        <Amount>$3,995</Amount>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.72)', margin: '1.4em auto 0', maxWidth: '28ch' }}>For founders seeking clarity before their next chapter.</p>

        <Divider h="clamp(64px,11vh,130px)" m="clamp(70px,12vh,150px) auto" />

        {/* The Founder's Room */}
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.03, margin: '0 0 0.3em' }}>The Founder’s Room<TM /></h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.4em' }}>Where transformation happens.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.74)', maxWidth: '42ch', margin: '0 auto 0.9em', ...pretty }}>An ongoing private advisory experience for founders navigating meaningful growth, difficult decisions, leadership transitions, investor conversations, retailer expansion, and the realities of building something that matters.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.72)', maxWidth: '34ch', margin: '0 auto clamp(40px,7vh,72px)', ...pretty }}>Not coaching, and not consulting. Partnership — the founder strengthened alongside the company.</p>
        <InvestmentLabel />
        <Amount>$995 <span style={{ fontStyle: 'italic', fontSize: '0.62em', color: 'rgba(122,94,52,0.75)' }}>per month</span></Amount>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.72)', margin: '1.4em auto 0', maxWidth: '30ch' }}>For founders who want ongoing guidance, peer wisdom, and accountability.</p>

        <Divider h="clamp(64px,11vh,130px)" m="clamp(70px,12vh,150px) auto" />

        {/* Private Advisory — quieter, more restrained */}
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.6vw,60px)', lineHeight: 1.04, margin: '0 0 0.3em' }}>Private Advisory</h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '0 0 1.4em' }}>Reserved for defining moments.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.66)', maxWidth: '40ch', margin: '0 auto clamp(40px,7vh,72px)', ...pretty }}>Some conversations cannot happen in a group, and some decisions deserve deeper partnership — rapid growth, acquisitions, family-business transitions, investor dynamics, leadership changes, the moments that shape a company’s future.</p>
        <InvestmentLabel />
        <Amount sub="For founders navigating significant growth, leadership decisions, or inflection points.">By application.</Amount>

        <Divider h="clamp(64px,11vh,130px)" m="clamp(70px,12vh,150px) auto" />

        {/* Founder Fellowship — the door not yet open */}
        <div style={{ opacity: 0.72 }}>
          <div style={{ ...label, color: 'rgba(122,94,52,0.5)', marginBottom: '1.4em' }}>The door not yet open</div>
          <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.6vw,60px)', lineHeight: 1.04, margin: '0 0 0.3em' }}>Founder Fellowship<TM /></h3>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.78)', margin: '0 0 1.4em' }}>For those ready to become guides.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.64)', maxWidth: '38ch', margin: '0 auto clamp(30px,5vh,52px)', ...pretty }}>For experienced founders ready to help shape the path for the next generation — the chapter where a founder becomes a guide for the ones who come next.</p>
          <div style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', border: '1px solid rgba(122,94,52,0.3)', borderRadius: 2, padding: '11px 26px' }}>Coming Soon</div>
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

        {/* the quiet invitation — the journey begins with the conversation */}
        <div style={{ margin: 'clamp(64px,11vh,130px) auto 0' }}>
          <El
            onClick={() => setNoteOpen(true)}
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

      {/* ── the note that greets a founder before any calendar ──────────── */}
      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}

/**
 * The note shown when a founder chooses to begin the conversation — a quiet
 * greeting before scheduling, so the first thing they meet is a question about
 * themselves, not a calendar grid.
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
        style={{ position: 'relative', width: 'min(680px,100%)', maxHeight: '92vh', overflowY: 'auto', background: 'radial-gradient(120% 90% at 34% 18%, #fbf6ec, #f1e8d7 70%, #e9dfc9)', borderRadius: 4, boxShadow: '0 60px 120px -50px rgba(30,20,8,0.7)', padding: 'clamp(40px,6vw,80px) clamp(30px,5vw,72px)', textAlign: 'center', animation: 'contentFocus 800ms cubic-bezier(.2,.7,.2,1) both' }}
      >
        <ArchMark width={2.2} margin="0 auto 1.6em" />
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,44px)', lineHeight: 1.16, color: '#2b2723', margin: '0 auto clamp(24px,4vh,40px)', maxWidth: '20ch', ...balance }}>Every meaningful company begins with a conversation.</p>
        <p style={{ ...line, color: 'rgba(43,39,35,0.72)', maxWidth: '34ch', margin: '0 auto clamp(30px,5vh,48px)', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, ...pretty }}>Before we talk about strategy, growth, or opportunities, we want to understand you.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.8vh,18px)', maxWidth: '22ch', margin: '0 auto clamp(30px,5vh,48px)' }}>
          <p style={line}>What are you building?</p>
          <p style={line}>What’s changing?</p>
          <p style={line}>What feels exciting?</p>
          <p style={line}>What feels heavy?</p>
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.85)', margin: '0 auto clamp(36px,6vh,56px)', maxWidth: '26ch', ...balance }}>This isn’t a sales call. It’s simply the beginning of a conversation between founders.</p>

        {FOUNDER_CALL_URL ? (
          <a
            href={FOUNDER_CALL_URL}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#f6efe4', background: '#3a2f1e', border: '1px solid #3a2f1e', borderRadius: 2, padding: '16px 38px', cursor: 'pointer' }}
          >
            Continue to scheduling&nbsp;&rarr;
          </a>
        ) : (
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(16px,1.8vw,22px)', color: 'rgba(122,94,52,0.7)', maxWidth: '28ch', margin: '0 auto' }}>Scheduling opens here soon. In the meantime, we’d love to hear from you.</div>
        )}

        <El onClick={onClose} style={{ display: 'block', margin: 'clamp(28px,5vh,44px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.4)', cursor: 'pointer', transition: 'color 400ms ease' }} hover={{ color: 'rgba(43,39,35,0.75)' }}>Not just now</El>
      </div>
    </div>
  )
}
