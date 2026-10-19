import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = 'balance' as React.CSSProperties['textWrap']

/**
 * The closing — an ivory archway with open black French doors, looking from the
 * navy-panelled interior out to a sunlit garden and glass conservatory. We are
 * already inside the House, looking toward what comes next. The photograph is an
 * immersive panel whose inner edge feathers into the warm limestone ground, so
 * the image and the invitation read as one continuous room (not a split screen).
 * This is the final emotional moment of the homepage; the footer below is a
 * quiet directory, no longer repeating "the house is always open."
 *
 * Motion is a subtle fade + scale reveal only, gated by prefers-reduced-motion
 * (see .bs-closing-* in index.css); the section is complete without animation.
 */
export function Closing({ ctx }: { ctx: Ctx }) {
  return (
    <section className="bs-closing" aria-label="The house is always open">
      <div className="bs-closing-photo">
        <img
          className="bs-closing-reveal"
          src="/photos/photo-closing.webp"
          alt="An ivory archway with open black French doors in a navy-panelled Georgian room, white hydrangeas on a marble table, opening onto a sunlit garden and glass conservatory beyond"
          loading="lazy"
        />
      </div>
      <div className="bs-closing-copy bs-closing-copy-reveal">
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,3.6vw,56px)', lineHeight: 1.06, color: '#241c10', maxWidth: '12ch', margin: 0, textWrap: balance }}>The house is always open.</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.5, color: 'rgba(36,28,16,0.72)', maxWidth: '26ch', margin: 'clamp(22px,3.4vh,32px) 0 0', textAlign: 'center', textWrap: balance }}>Bring the question that&rsquo;s been keeping you up at night. We&rsquo;ll start there.</p>
        <El
          as="button"
          onClick={ctx.openConversation}
          style={{ display: 'inline-block', margin: 'clamp(34px,5vh,58px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#faf4ea', background: '#1e2a44', border: '1px solid #1e2a44', borderRadius: 2, padding: '16px 42px', cursor: 'pointer', boxShadow: '0 22px 44px -28px rgba(22,32,58,0.6)', transition: 'background 400ms ease, box-shadow 500ms ease' }}
          hover={{ background: '#16203a', boxShadow: 'inset 0 0 0 1px rgba(156,122,63,0.4), 0 22px 44px -28px rgba(22,32,58,0.7)' }}
        >
          Start a Conversation &rarr;
        </El>
      </div>
    </section>
  )
}
