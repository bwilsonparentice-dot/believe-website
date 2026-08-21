import React from 'react'
import { FOUNDER_ANSWERS, type FounderAnswer } from '../data'

/**
 * Founder Answers — the Library's one useful, living shelf.
 *
 * Real questions founders ask, answered by people who have actually built
 * brands. Deliberately NOT an FAQ: no accordions, no expand/collapse, no feed.
 * All answers are simply present, read by scrolling, each set as its own quiet
 * editorial unit — the way a founder would read a page, not click a widget.
 *
 * Attribution is data (see FOUNDER_ANSWERS): today every answer is Beth's; a
 * later record can carry a different author (and, once real, a role) and this
 * same layout renders it — the shelf grows without a redesign. The signature
 * reads "— Beth" now, and "— Name, Role" only if a role is ever supplied.
 */

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }

function Answer({ a }: { a: FounderAnswer }) {
  const signature = a.author.role ? `— ${a.author.name}, ${a.author.role}` : `— ${a.author.name}`
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'left' }}>
      {/* the question — the visual anchor of the unit */}
      <h4 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(23px,2.9vw,37px)', lineHeight: 1.14, color: '#2b2723', margin: '0 0 clamp(20px,3.4vh,34px)', ...pretty }}>
        {a.question}
      </h4>

      {/* the answer — plain, experienced, a paragraph at a time */}
      {a.answer.map((p, i) => (
        <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.8)', margin: i === 0 ? 0 : 'clamp(14px,2.4vh,24px) 0 0', ...pretty }}>
          {p}
        </p>
      ))}

      {/* the signature — a person answered this, not a brand */}
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px,1.75vw,21px)', color: 'rgba(122,94,52,0.85)', marginTop: 'clamp(24px,4vh,40px)' }}>
        {signature}
      </div>

      {/* the optional lived note — used only where experience earns its place */}
      {a.fromExperience && (
        <div style={{ borderTop: '1px solid rgba(122,94,52,0.22)', marginTop: 'clamp(26px,4.4vh,44px)', paddingTop: 'clamp(16px,2.6vh,24px)' }}>
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '1em' }}>From experience</div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.62)', margin: 0, ...pretty }}>{a.fromExperience}</p>
        </div>
      )}
    </div>
  )
}

export function FounderAnswers() {
  return (
    <section aria-label="Founder Answers">
      {/* the shelf header — a serif title and one descriptor, unnumbered:
          this is the room's featured, living collection, not one more entry in
          the Shelf One–Seven catalogue. */}
      <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>Founder Answers</h3>
      <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '42ch', margin: '0 auto clamp(64px,11vh,120px)' }}>
        Real questions founders ask us — answered by people who have actually built brands.
      </p>

      {/* the answers — a continuous editorial sequence, punctuated by a quiet
          hairline, never boxed into an accordion or a list */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {FOUNDER_ANSWERS.map((a, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div aria-hidden="true" style={{ width: 40, height: 1, margin: 'clamp(64px,11vh,120px) auto', background: 'rgba(122,94,52,0.32)' }} />}
            <Answer a={a} />
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
