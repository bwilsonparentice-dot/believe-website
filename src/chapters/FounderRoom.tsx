import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { LightShift, Keynote } from '../components/Living'
import { FR_INCLUDES, PHOTOS } from '../data'

const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }

/** A small ™ set in superscript, as used beside "Believe Blueprint". */
function Trade() {
  return <span style={{ fontSize: '0.42em', verticalAlign: 'super', letterSpacing: 0 }}>™</span>
}

/**
 * The Founder's Room — the most personal room in the house, and the largest
 * chapter: philosophy, the promise, the Believe Blueprint (the hero artifact),
 * how each engagement differs, what we build together, the rhythm of a
 * partnership, the Founder Letter, who it's for, the ways to begin, the
 * investment, and the invitation.
 */
export function FounderRoomChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeFounderRoom} background="#efe6d3">
      {/* a quiet interior: the founder's room */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(380px,66vh,780px)', overflow: 'hidden', borderRadius: '0 0 clamp(50px,8vw,150px) clamp(50px,8vw,150px)' }}>
        <ImageSlot
          src={PHOTOS.founders}
          alt="The Founder's Room — a quiet oak door with a brass key"
          fit="cover"
          placeholder="A quiet chair by a tall window, morning light, no desk and no technology — only space to think"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'slowZoom 20s ease-out both' }}
        />
        <LightShift at="30% 30%" strength={0.4} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 32% 26%, rgba(255,226,178,0.34), transparent 68%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.08) 0%, transparent 34%, transparent 60%, rgba(20,14,7,0.42) 89%, rgba(239,230,211,0.9) 100%)' }} />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: 'min(820px,96%)', height: '50%', pointerEvents: 'none', background: 'radial-gradient(82% 92% at 50% 100%, rgba(20,14,7,0.5), rgba(20,14,7,0.24) 48%, transparent 76%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(34px,6vh,70px)', textAlign: 'center', color: '#f6efe4', padding: '0 6vw' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(249,243,231,0.92)', marginBottom: '0.8em', textShadow: '0 1px 12px rgba(20,14,7,0.85), 0 2px 30px rgba(20,14,7,0.7)' }}>The most personal room in the house</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.6vw,96px)', lineHeight: 1, margin: 0, textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 30px rgba(0,0,0,0.55)' }}>The Founder’s Room</h2>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', color: 'rgba(246,239,228,0.96)', marginTop: '0.5em', textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 18px rgba(0,0,0,0.5)' }}>Where founders remember who they are beneath the business.</div>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: 'clamp(56px,10vh,120px) 6vw clamp(70px,14vh,170px)', textAlign: 'center', color: '#2b2723' }}>

        <Keynote mark={false}>You don’t have to hold it all alone.</Keynote>

        <ArchMark width={2.4} margin="0 auto 1.6em" />
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>The philosophy</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(34px,5.2vw,72px)', lineHeight: 1.03, margin: '0 0 0.6em' }}>No founder walks<br />the same path.</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.74)', maxWidth: '58ch', margin: '0 auto', ...pretty }}>Believe Studio was never built around a single program, because the best advice for one founder can be the wrong advice for another. So there is no curriculum here. Only thoughtful guidance, better decisions, and the unique journey of the person building.</p>

        <Divider />

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>Our promise</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(22px,2.6vw,34px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.9)', maxWidth: '28ch', margin: '0 auto 0.9em', ...pretty }}>A place founders come to think more clearly, make better decisions, and build more meaningful companies.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '32ch', margin: '0 auto' }}>Founders arrive carrying questions. They leave carrying clarity.</p>

        <Divider />

        {/* The Believe Blueprint — the artifact, the hero */}
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(38px,5.6vw,76px)', lineHeight: 1.02, margin: '0 0 0.5em' }}>Every founder begins<br />with a Blueprint.</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.82)', margin: '0 auto clamp(48px,8vh,88px)' }}>Not a business plan.<br />A foundation.</p>

        <ImageSlot
          fit="contain"
          placeholder="The Believe Blueprint — an architect's original set of plans"
          style={{ display: 'block', width: 'min(88%,860px)', height: 'clamp(320px,52vh,620px)', margin: '0 auto', background: '#f3ecdd' }}
        />

        <Divider m="clamp(56px,9vh,100px) auto clamp(40px,7vh,72px)" />

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.4em' }}>A Believe Blueprint<Trade /></div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.8)', maxWidth: '56ch', margin: '0 auto 1.1em', ...pretty }}>Before strategy. Before growth. Before execution. We begin by understanding the architecture of what you’re building.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.68)', maxWidth: '58ch', margin: '0 auto 1.1em', ...pretty }}>Every Believe Blueprint is a living strategic document that captures the foundation of your company — your vision, priorities, opportunities, blind spots, decisions, and next chapter.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '48ch', margin: '0 auto 0.6em' }}>Just as an architect begins with a blueprint before laying the first stone, every founder begins with clarity before building what comes next.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.6)', maxWidth: '48ch', margin: '0 auto', ...pretty }}>Because no founder walks the same path — and no meaningful company should be built from someone else’s.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.6)', maxWidth: '52ch', margin: '1.2em auto 0', ...pretty }}>Every Believe Blueprint is created from the ground up. Never templated. Never generated. Always built around the founder, the company, and the decisions that matter most.</p>

        <Divider />

        {/* Three columns of the Blueprint */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 'clamp(36px,5vw,64px)', textAlign: 'left', maxWidth: 840, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(23px,2.6vw,31px)', marginBottom: '0.7em' }}>Foundation</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)' }}>Where are you today?<br />What do you believe?<br />What’s already working?<br />What’s standing in your way?</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(23px,2.6vw,31px)', marginBottom: '0.7em' }}>Structure</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)' }}>Business model<br />Positioning<br />Revenue<br />Systems<br />Growth<br />Leadership</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(23px,2.6vw,31px)', marginBottom: '0.7em' }}>The Path Forward</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 2, color: 'rgba(43,39,35,0.66)' }}>Clear priorities.<br />Next decisions.<br />Strategic roadmap.<br />A living document that evolves as you grow.</div>
          </div>
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.5, color: '#2b2723', maxWidth: '32ch', margin: 'clamp(56px,9vh,100px) auto 0', ...pretty }}>The Blueprint becomes the foundation for everything that follows inside The Founder’s Room.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '26ch', margin: '1.1em auto 0' }}>Every Blueprint begins with a conversation.</p>

        <Divider />

        {/* 4. Inside the Founder's Room — the experience */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>Inside the Founder’s Room</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.06, margin: '0 0 0.8em' }}>Every engagement is different.<br />Because every founder is.</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.72)', maxWidth: '60ch', margin: '0 auto 1.4em', ...pretty }}>Some conversations begin with growth. Others begin with exhaustion. Some begin with retail expansion. Others with rebuilding confidence after a difficult season.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.72)', maxWidth: '60ch', margin: '0 auto 1.4em', ...pretty }}>The Founder’s Room adapts to the founder — not the other way around. Together we think, refine, challenge assumptions, make difficult decisions, and build meaningful companies.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,27px)', color: 'rgba(122,94,52,0.8)', maxWidth: '24ch', margin: '0 auto' }}>No two journeys are identical.</p>

        <Divider />

        {/* What we build together */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>What we build together</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85em', maxWidth: '50ch', margin: '0 auto' }}>
          {[
            'Sometimes we build confidence.',
            'Sometimes we rebuild positioning.',
            'Sometimes we redesign an entire revenue model.',
            'Sometimes we shape retailer strategy.',
            'Sometimes we grow into leadership.',
            'Sometimes we make sense of AI and what comes next.',
            'Sometimes we navigate difficult partnerships, or succession.',
            'Sometimes we prepare for the biggest opportunity of a founder’s life.',
            'And sometimes we simply make one decision that changes everything that follows.',
          ].map((line, i) => (
            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.78)' }}>{line}</div>
          ))}
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '26ch', margin: '1.6em auto 0' }}>No two Blueprints are alike. No two founder journeys are alike.</p>

        <Divider />

        {/* Why we don't teach one path — the differentiator */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>Why we don’t teach one path</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.3vw,30px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.82)', maxWidth: '30ch', margin: '0 auto 0.9em', ...pretty }}>Most founder programs begin with a curriculum.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(22px,2.6vw,34px)', lineHeight: 1.4, color: '#2b2723', maxWidth: '24ch', margin: '0 auto' }}>We begin with a conversation.</p>

        <Divider />

        {/* 5. A rhythm designed around founders */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>A rhythm designed around founders</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '48ch', margin: '0 auto clamp(40px,7vh,72px)', ...pretty }}>A partnership isn’t a set of sessions. It’s a rhythm you can build a company inside of. Every partnership includes:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, textAlign: 'left', maxWidth: 460, margin: '0 auto' }}>
          {FR_INCLUDES.map((i, idx) => (
            <div key={idx} style={{ borderTop: '1px solid rgba(122,94,52,0.26)', padding: 'clamp(16px,2.4vw,24px) 0', fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(43,39,35,0.82)' }}>{i}</div>
          ))}
          <div style={{ borderTop: '1px solid rgba(122,94,52,0.26)' }} />
        </div>

        <Divider />

        {/* The Founder Letter — the heartbeat */}
        <div style={{ position: 'relative', left: '50%', right: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', background: '#161613', color: 'rgba(246,239,228,0.92)', padding: 'clamp(60px,11vh,140px) 6vw', borderRadius: 'clamp(40px,7vw,130px) clamp(40px,7vw,130px)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.8)', marginBottom: '1.3em' }}>The heartbeat</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(32px,4.6vw,60px)', lineHeight: 1.05, margin: '0 0 0.7em' }}>A Letter From Beth</h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.66, color: 'rgba(246,239,228,0.82)', maxWidth: '56ch', margin: '0 auto', ...pretty }}>Once a month, a single, beautifully written letter. Not a newsletter. Not updates. A letter from one founder to another — what we’re seeing, learning, and wrestling with, and what the conversations revealed that month.</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(236,209,147,0.72)', margin: '1.4em auto 0', maxWidth: '32ch' }}>Not content. Companionship.</p>
          </div>
        </div>

        <Divider />

        {/* 6. Who it's for */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: 'clamp(36px,6vh,56px)' }}>Who it’s for</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,72px)', justifyContent: 'center', textAlign: 'left', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ flex: '1 1 260px', minWidth: 240 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(20px,2.2vw,28px)', color: '#2b2723', marginBottom: '0.9em' }}>The Founder’s Room is for founders who…</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.8vw,22px)', lineHeight: 1.95, color: 'rgba(43,39,35,0.76)' }}>are building meaningful companies<br />value thoughtful strategy over quick tactics<br />want a trusted thinking partner<br />are willing to do the work<br />believe better decisions build better businesses</div>
          </div>
          <div style={{ flex: '1 1 260px', minWidth: 240 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(20px,2.2vw,28px)', color: 'rgba(43,39,35,0.5)', marginBottom: '0.9em' }}>It probably isn’t for those who want…</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.8vw,22px)', lineHeight: 1.95, color: 'rgba(43,39,35,0.45)' }}>shortcuts<br />passive courses<br />someone else to build the company<br />generic advice</div>
          </div>
        </div>

        <Divider />

        {/* 7. Ways to begin */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: 'clamp(36px,6vh,60px)' }}>Begin your journey</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px,7vh,72px)', textAlign: 'left', maxWidth: 460, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.5vw,30px)' }}>Believe Blueprint</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.7)', margin: '0.4em 0 0' }}>A one-time strategic foundation — the first step for founders seeking clarity before their next chapter.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.5vw,30px)' }}>The Founder’s Room</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.7)', margin: '0.4em 0 0' }}>An ongoing advisory partnership for founders building meaningful companies.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.5vw,30px)' }}>Visionary Collective</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.7vw,21px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.7)', margin: '0.4em 0 0' }}>Stay connected to the conversations inside Believe Studio.</p>
          </div>
        </div>

        <Divider />

        {/* 8. Investment */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: 'clamp(36px,6vh,60px)' }}>Investment</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px,6.5vh,68px)', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.4vw,30px)' }}>Believe Blueprint<Trade /></div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(15px,1.6vw,20px)', lineHeight: 1.56, color: 'rgba(43,39,35,0.62)', maxWidth: '48ch', margin: '0.5em auto 0.7em' }}>A custom strategic foundation designed around your company, your vision, and your next chapter.</p>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,1.9vw,24px)', color: 'rgba(122,94,52,0.82)' }}>Starting at $2,500</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.4vw,30px)' }}>The Founder’s Room</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(15px,1.6vw,20px)', lineHeight: 1.56, color: 'rgba(43,39,35,0.62)', maxWidth: '48ch', margin: '0.5em auto 0.7em' }}>An ongoing private advisory partnership for founders building meaningful companies.</p>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,1.9vw,24px)', color: 'rgba(122,94,52,0.82)' }}>Monthly Partnership · Starting at $995/mo</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.4vw,30px)' }}>Visionary Collective</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(15px,1.6vw,20px)', lineHeight: 1.56, color: 'rgba(43,39,35,0.62)', maxWidth: '48ch', margin: '0.5em auto 0.7em' }}>Stay connected to the conversations happening inside Believe Studio.</p>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,1.9vw,24px)', color: 'rgba(122,94,52,0.82)' }}>Visionary $98/yr&emsp;·&emsp;Legacy $498/yr</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.4vw,30px)' }}>Inside the Studio</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(15px,1.6vw,20px)', lineHeight: 1.56, color: 'rgba(43,39,35,0.62)', maxWidth: '48ch', margin: '0.5em auto 0.7em' }}>Monthly conversations with Resident Experts.</p>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(16px,1.7vw,21px)', color: 'rgba(122,94,52,0.78)', lineHeight: 1.55 }}>Included for Legacy Members<br />Preferred pricing for Visionary Members<br />Individual invitations available</div>
          </div>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.45, color: '#2b2723', maxWidth: '28ch', margin: 'clamp(48px,8vh,80px) auto 0', ...pretty }}>Not every founder begins in the same room. Every founder begins somewhere.</p>

        <Divider />

        {/* 9. Begin with a conversation */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', marginBottom: '1.3em' }}>Begin with a conversation</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.8)', maxWidth: '58ch', margin: '0 auto 1.6em', ...pretty }}>Every partnership begins with a conversation. If it feels like the right place for both of us, we’ll send your invitation — and with it, the key. Not because the door was ever locked, but because every meaningful house deserves a proper welcome.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1.18, color: '#2b2723', maxWidth: '20ch', margin: '0 auto clamp(40px,7vh,64px)', ...pretty }}>Founders arrive carrying questions.<br />They leave carrying clarity.</p>
        <div onClick={ctx.receiveKey} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#1b140c', background: 'linear-gradient(160deg,#d9bd7e,#b8934e)', padding: '16px 40px', cursor: 'pointer', boxShadow: '0 20px 40px -22px rgba(120,90,40,0.7)' }}>Request an Invitation</div>

        <Divider h="clamp(48px,7vh,80px)" m="clamp(46px,7vh,80px) auto clamp(36px,5vh,60px)" />
        <BackPill onClose={ctx.closeFounderRoom} />
      </div>
    </ChapterShell>
  )
}
