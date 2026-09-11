import React from 'react'
import { El, stop } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'

/** Receive Your Key — the quiet membership threshold for the locked rooms. */
export function ReceiveKey({ ctx, onClose }: { ctx: Ctx; onClose: Handler }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6vh 6vw', background: 'rgba(245,239,228,0.93)', backdropFilter: 'blur(8px)', animation: 'veilIn 600ms ease both' }}>
      <div onClick={stop} style={{ position: 'relative', maxWidth: 560, textAlign: 'center', color: '#2b2723', animation: 'contentFocus 900ms cubic-bezier(.2,.7,.2,1) both' }}>
        <div style={{ width: 54, height: 54, margin: '0 auto 1.4em', borderRadius: '50%', border: '1px solid rgba(236,209,147,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'keyShimmer 3.6s ease-in-out infinite' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #d8b877' }} />
        </div>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.8)', marginLeft: '0.5em' }}>Membership</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(38px,5.4vw,64px)', lineHeight: 1, margin: '0.28em 0 0.5em' }}>Receive Your Key</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.8vw,22px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.86)', maxWidth: '62ch', margin: '0 auto 1em' }}>Some rooms are kept for those who belong to the house. A key is not a subscription. It is an invitation to stay longer, and to be known.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(16px,1.7vw,21px)', color: 'rgba(122,94,52,0.72)', margin: '0 auto 2.2em', maxWidth: '56ch' }}>With a key, Private Advisory and the Stage open to you.</p>
        <El onClick={ctx.receiveKey} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#1b140c', background: 'linear-gradient(120deg,#e6c986,#c9a45f)', borderRadius: 2, padding: '15px 36px', cursor: 'pointer', transition: 'transform 400ms ease' }} hover={{ transform: 'translateY(-2px)' }}>Receive your key</El>
        <div style={{ marginTop: '1.4em' }}>
          <span onClick={onClose} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.5)', cursor: 'pointer' }}>Not yet</span>
        </div>
      </div>
    </div>
  )
}
