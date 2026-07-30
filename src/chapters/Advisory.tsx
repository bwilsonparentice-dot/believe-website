import React from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, Divider } from '../components/ChapterShell'
import { Keynote } from '../components/Living'
import { ADVISORY_SUBJECTS } from '../data'

const eyebrow: React.CSSProperties = {
  fontFamily: "'Jost',sans-serif",
  fontWeight: 400,
  fontSize: 10,
  letterSpacing: '0.5em',
  textTransform: 'uppercase',
  color: 'rgba(122,94,52,0.6)',
}

/** Private Advisory — the quietest room. Trust earned quietly; no people, no photos. */
export function AdvisoryChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeAdvisory} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(110px,20vh,240px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723' }}>
        <Keynote>Some things can only be said here.</Keynote>

        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '2em' }}>Private Advisory</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(34px,5.2vw,72px)', lineHeight: 1.08, margin: '0 auto', maxWidth: '16ch' }}>Trust isn’t announced. It’s earned quietly.</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', maxWidth: '30ch', margin: '1.6em auto 0' }}>Some of the most important founder conversations are the ones no one else ever hears.</p>

        <Divider h="clamp(60px,11vh,120px)" m="clamp(56px,10vh,110px) auto" />

        {/* why it exists */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.72)', maxWidth: '32ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Some conversations should never become case studies. Not every decision belongs in a board meeting. Not every question belongs on LinkedIn. Some of the most important moments in a founder’s journey happen quietly — before the announcement, before the funding, before the launch, before anyone else knows.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: '1.6em auto 0', maxWidth: '28ch' }}>Private Advisory exists for those moments — when the stakes are unusually high, when clarity matters more than speed, when you need someone who can hold both the business and the person building it.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.6)', maxWidth: '26ch', margin: '1.4em auto 0' }}>No audience. No performance. No templates. Just thoughtful conversation, honest perspective, and decisions made with care.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.82)', maxWidth: '30ch', margin: '1.8em auto 0' }}>Plainly: what you say here stays here. It is never a pitch, and it is never used to sell you anything. It is a conversation between people — nothing more, and nothing less.</p>

        <Divider h="clamp(50px,9vh,100px)" m="clamp(56px,10vh,110px) auto" />

        {/* what happens here */}
        <div style={{ ...eyebrow, marginBottom: '1.4em' }}>Every founder arrives differently</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.7)', maxWidth: '30ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Sometimes it’s growth. Sometimes uncertainty. Sometimes a difficult retailer conversation. Sometimes preparing for Target. Sometimes rebuilding after success. Sometimes deciding whether to walk away.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.8)', margin: '1.4em auto 0' }}>Every conversation is different, because every founder is.</p>

        <Divider h="clamp(50px,9vh,100px)" m="clamp(56px,10vh,110px) auto" />

        {/* in confidence — the subject list */}
        <div style={{ ...eyebrow, marginBottom: '2em' }}>What we build together</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9em', maxWidth: '30ch', margin: '0 auto' }}>
          {ADVISORY_SUBJECTS.map((s, i) => (
            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.3vw,30px)', lineHeight: 1.2, color: 'rgba(43,39,35,0.78)' }}>{s}</div>
          ))}
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.8vw,23px)', color: 'rgba(122,94,52,0.72)', margin: '2.2em auto 0', maxWidth: '28ch' }}>No engagement follows a template. Every advisory relationship begins with listening.</p>

        <Divider h="clamp(50px,9vh,100px)" m="clamp(56px,10vh,110px) auto" />

        {/* the artifact */}
        <div style={{ ...eyebrow, marginBottom: '1.2em' }}>Trust · The Threshold</div>
        <svg width="26" height="34" viewBox="0 0 52 68" fill="none" style={{ display: 'block', margin: '0 auto 1em', opacity: 0.66 }}>
          <path d="M8 66 L8 20 A18 18 0 0 1 44 20 L44 66" stroke="#9c7a3f" strokeWidth="2.4" />
          <circle cx="37" cy="43" r="1.8" fill="#9c7a3f" />
        </svg>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>The Private Door</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', color: 'rgba(43,39,35,0.72)', margin: '0 auto 1.4em', maxWidth: '26ch' }}>Some conversations deserve a room of their own.</p>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)' }}>Trust · Perspective · Clarity · Confidence</div>

        <Divider h="clamp(50px,9vh,100px)" m="clamp(56px,10vh,110px) auto" />

        {/* who it's for */}
        <div style={{ ...eyebrow, marginBottom: '1.4em' }}>Who it’s for</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '32ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Private Advisory is designed for founders leading meaningful companies who want a trusted thought partner — not another consultant.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.6)', maxWidth: '28ch', margin: '1.4em auto 0' }}>Some engagements last a single day. Others continue for years. There is no standard timeline — only the work that needs to be done.</p>

        <Divider h="clamp(50px,9vh,100px)" m="clamp(56px,10vh,110px) auto" />

        {/* the close */}
        <div style={{ ...eyebrow, marginBottom: '1.4em' }}>Begin</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.3vw,30px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.72)', maxWidth: '26ch', margin: '0 auto 0.5em' }}>Every private advisory relationship begins the same way. A conversation.</p>
        {/* The Held Silence ends quietly. This room's discretion is its whole
            claim, so it closes on the promise itself — no button to press, no
            ask. A private conversation is begun the way everything here is: by
            being known, not by a form. The BackPill is the only quiet way out. */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.78)', margin: '0 auto', maxWidth: '28ch' }}>No proposal. No presentation. No pressure. Just enough time to discover whether we’re the right people to build together.</p>

        <div style={{ marginTop: 'clamp(52px,9vh,104px)' }}>
          <BackPill onClose={ctx.closeAdvisory} />
        </div>
      </div>
    </ChapterShell>
  )
}
