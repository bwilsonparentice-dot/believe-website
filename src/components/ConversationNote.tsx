import React from 'react'
import { El } from '../lib/El'
import { ArchMark } from './ChapterShell'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as React.CSSProperties['textWrap'] }

// Beth's scheduling link for The Founder Conversation — reached only after this
// note, so the emotional tone is set before a time is ever chosen.
export const FOUNDER_CALL_URL = 'https://calendly.com/beth-believeagency/elite-brand-visibility-call-clone'

const label: React.CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)',
}

/**
 * The note shown when a founder chooses to begin — a quiet greeting before any
 * scheduling, so the first thing they meet is a question about themselves, not
 * a calendar. Shared by every doorway: the conversation is the one true CTA.
 */
export function ConversationNote({ onClose }: { onClose: () => void }) {
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
        <div style={{ ...label, fontSize: 10, letterSpacing: '0.44em', marginBottom: '1.4em' }}>The Founder Conversation</div>
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
