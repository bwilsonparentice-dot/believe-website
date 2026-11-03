import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { palette } from '../lib/palette'
import {
  QUESTIONS, RESULTS, RESULT_BY_Q1, Q1_HOPE, Q2_SHARED, Q2_OBSERVATION, Q4_INVITATION,
  TAKEAWAY, EXPERIMENT_TRY, EXPERIMENT_NOTICE, RESULT_NOTE,
} from '../possibilities.config'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

const eyebrow: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)',
}
const smallLabel: CSSProperties = {
  fontFamily: sans, fontWeight: 500, fontSize: 10.5, letterSpacing: '0.28em',
  textTransform: 'uppercase', color: 'rgba(21,106,102,0.9)',
}
const navyCta: CSSProperties = {
  fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase',
  color: palette.linen, background: palette.navy, border: `1px solid ${palette.navy}`, borderRadius: 2,
  padding: '16px 38px', cursor: 'pointer',
}
const ghostBtn: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase',
  color: 'rgba(43,39,35,0.6)', background: 'transparent', border: 'none', padding: '8px 4px', cursor: 'pointer',
}

function prefersReducedMotion(): boolean {
  try { return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}

/**
 * Find Your Next Possibility — a short, welcoming, four-question experience that
 * introduces how Believe Studio thinks and offers a fresh angle plus one small
 * next move. Fully deterministic (see possibilities.config.ts); no AI, no email,
 * no storage beyond this session. Reached at /possibilities, rendered with the
 * site header and footer in App. The booking button reuses ctx.openConversation.
 */
export function Possibilities({ ctx }: { ctx: Ctx }) {
  // step: 0 = intro, 1..4 = questions (by Question.id), 5 = result
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [reduce] = useState(prefersReducedMotion)
  // Copy-my-next-move state: 'copied' drives the accessible confirmation;
  // 'copyFailed' reveals a selectable fallback when clipboard access is denied.
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  // Move focus to the screen's heading whenever the step changes, so keyboard
  // and screen-reader users are carried to the new content.
  useEffect(() => {
    const el = headingRef.current
    if (el) { try { el.focus() } catch { /* ignore */ } }
  }, [step])

  // Per-route metadata for browsers and JS-aware crawlers. (A non-JS crawler
  // reads the static index.html tags; see the note to the team.)
  useEffect(() => {
    const prevTitle = document.title
    const setMeta = (sel: string, attr: string, val: string) => {
      let el = document.head.querySelector(sel) as HTMLMetaElement | null
      const created = !el
      if (!el) { el = document.createElement('meta'); const m = sel.match(/\[(property|name)="([^"]+)"\]/); if (m) el.setAttribute(m[1], m[2]); document.head.appendChild(el) }
      const prev = el.getAttribute('content')
      el.setAttribute('content', val)
      return () => { if (created) el?.remove(); else if (prev != null) el?.setAttribute('content', prev) }
    }
    document.title = 'Find Your Next Possibility | Believe Studio'
    const desc = 'A short, welcoming experience from Believe Studio. Answer four quick questions for a fresh angle on your brand and one small move you can try next. No email required.'
    const restores = [
      setMeta('meta[name="description"]', 'name', desc),
      setMeta('meta[property="og:title"]', 'property', 'Find Your Next Possibility | Believe Studio'),
      setMeta('meta[property="og:description"]', 'property', desc),
      setMeta('meta[property="og:url"]', 'property', 'https://believestudio.co/possibilities'),
      setMeta('meta[name="twitter:title"]', 'name', 'Find Your Next Possibility | Believe Studio'),
      setMeta('meta[name="twitter:description"]', 'name', desc),
    ]
    return () => { document.title = prevTitle; restores.forEach((r) => r && r()) }
  }, [])

  const select = (qid: number, aid: string) => setAnswers((a) => ({ ...a, [qid]: aid }))
  const restart = () => { setAnswers({}); setCopied(false); setCopyFailed(false); setStep(0) }

  const fade: CSSProperties = reduce ? {} : { animation: 'veilIn 450ms ease both' }
  // A gentle, opacity-only second beat that draws the eye to the takeaway just
  // after the headline. No transform, so it never shifts layout; skipped under
  // reduced motion, and the content is present throughout (no delayed access).
  const takeawayFade: CSSProperties = reduce ? {} : { animation: 'veilIn 600ms ease 140ms both' }

  // ── shared frame ──────────────────────────────────────────────────────
  const frame = (children: React.ReactNode) => (
    <div style={{ position: 'relative', background: '#efe6d3', color: palette.ink, minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(100px,12vh,140px) 8vw clamp(60px,9vh,104px)' }}>
        {children}
      </div>
    </div>
  )

  // ── intro ─────────────────────────────────────────────────────────────
  if (step === 0) {
    return frame(
      <div key="intro" style={{ textAlign: 'center', ...fade }}>
        <div style={eyebrow}>A fresh perspective from Believe Studio</div>
        <h1 ref={headingRef} tabIndex={-1} style={{ outline: 'none', fontFamily: serif, fontWeight: 500, fontSize: 'clamp(34px,5vw,62px)', lineHeight: 1.06, color: palette.navy, margin: 'clamp(14px,2.2vh,24px) auto 0', maxWidth: '18ch', ...balance }}>Let&rsquo;s find a fresh possibility for your brand.</h1>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.58, color: 'rgba(43,39,35,0.78)', margin: 'clamp(20px,3vh,32px) auto 0', maxWidth: '42ch', ...pretty }}>Sometimes you&rsquo;re so close to what you&rsquo;re building that it helps to have someone look at it a little differently.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,22px)', lineHeight: 1.58, color: 'rgba(43,39,35,0.72)', margin: 'clamp(12px,1.8vh,18px) auto 0', maxWidth: '40ch', ...pretty }}>Answer four quick questions for a fresh angle to explore and one small move you can make next.</p>
        <div style={{ margin: 'clamp(26px,4vh,42px) auto 0' }}>
          <El as="button" className="poss-btn" onClick={() => setStep(1)} style={navyCta} hover={{ background: palette.navyDeep }}>Let&rsquo;s take a look</El>
        </div>
        <p style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.5)', margin: 'clamp(16px,2.2vh,22px) auto 0' }}>Four quick questions. No email required.</p>
      </div>,
    )
  }

  // ── result ────────────────────────────────────────────────────────────
  if (step === 5) {
    const key = RESULT_BY_Q1[answers[1]]
    const r = RESULTS[key]
    // Acknowledge the goal (Q1) and what they shared (Q2), then add a
    // goal-specific observation so the explanation never drifts off the goal.
    const explanation = `You shared that you’d love to ${Q1_HOPE[answers[1]]}, and that ${Q2_SHARED[answers[2]]}. ${Q2_OBSERVATION[key][answers[2]]}`
    const takeaway = TAKEAWAY[key]
    const tryText = EXPERIMENT_TRY[key][answers[3]]
    const noticeText = EXPERIMENT_NOTICE[key]
    const invitation = Q4_INVITATION[answers[4]]

    // Plain-text summary for "Copy my next move" (no booking language; useful
    // on its own). Kept in sync with what is shown on screen.
    const summaryText = [
      r.headline,
      takeaway,
      '',
      'Your experiment',
      `What to try: ${tryText}`,
      `What to notice: ${noticeText}`,
      '',
      'A fresh question to consider',
      r.freshQuestion,
      '',
      'From Believe Studio',
      'https://believestudio.co/possibilities',
    ].join('\n')

    const copyMove = async () => {
      setCopyFailed(false)
      let ok = false
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(summaryText); ok = true
        }
      } catch { ok = false }
      if (!ok) {
        // Fallback for browsers without the async Clipboard API.
        try {
          const ta = document.createElement('textarea')
          ta.value = summaryText; ta.setAttribute('readonly', '')
          ta.style.position = 'fixed'; ta.style.top = '0'; ta.style.left = '0'; ta.style.opacity = '0'
          document.body.appendChild(ta); ta.focus(); ta.select()
          ok = typeof document.execCommand === 'function' && document.execCommand('copy')
          document.body.removeChild(ta)
        } catch { ok = false }
      }
      if (ok) { setCopied(true); window.setTimeout(() => setCopied(false), 2600) }
      else { setCopyFailed(true) } // graceful: reveal the text to copy by hand
    }

    const block: CSSProperties = { margin: '0 auto', maxWidth: '46ch', textAlign: 'left' }
    const blockP: CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.95vw,22px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.82)', margin: 'clamp(8px,1.4vh,12px) 0 0', ...pretty }
    const copyBtn: CSSProperties = {
      fontFamily: sans, fontWeight: 500, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
      color: copied ? palette.teal : 'rgba(21,106,102,0.82)', background: 'transparent',
      border: 'none', padding: '8px 0', cursor: 'pointer',
    }
    return frame(
      <div key="result" style={{ textAlign: 'center', ...fade }}>
        <div style={eyebrow}>A possibility to explore</div>
        <h1 ref={headingRef} tabIndex={-1} style={{ outline: 'none', fontFamily: serif, fontWeight: 500, fontSize: 'clamp(32px,5vw,58px)', lineHeight: 1.08, color: palette.navy, margin: 'clamp(16px,2.6vh,26px) auto 0', maxWidth: '18ch', ...balance }}>{r.headline}</h1>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,24px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.8)', margin: 'clamp(22px,3.4vh,34px) auto 0', maxWidth: '44ch', ...pretty }}>{explanation}</p>

        {/* Memorable takeaway: an editorial Believe Studio perspective, not a finding */}
        <div style={{ margin: 'clamp(26px,4vh,40px) auto 0', ...takeawayFade }}>
          <span aria-hidden="true" style={{ display: 'block', width: 40, height: 2, background: 'rgba(21,106,102,0.5)', margin: '0 auto clamp(14px,2vh,18px)' }} />
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.3, color: palette.teal, margin: '0 auto', maxWidth: '26ch', ...balance }}>{takeaway}</p>
        </div>

        {/* The one experiment, easy to scan: what to try / what to notice */}
        <div style={{ margin: 'clamp(30px,4.8vh,48px) auto 0', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,24px)', maxWidth: 520 }}>
          <div style={block}>
            <div style={smallLabel}>What to try</div>
            <p style={blockP}>{tryText}</p>
          </div>
          <div style={block}>
            <div style={{ ...smallLabel, color: 'rgba(21,106,102,0.72)' }}>What to notice</div>
            <p style={blockP}>{noticeText}</p>
          </div>
          <div style={{ ...block, marginTop: 'clamp(2px,0.6vh,6px)' }}>
            <El as="button" className="poss-link" onClick={copyMove} style={copyBtn} hover={{ color: palette.teal }}>
              {copied ? 'Copied' : 'Copy my next move'}
            </El>
            <span role="status" aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>{copied ? 'Copied to clipboard' : ''}</span>
            {copyFailed && (
              <div style={{ marginTop: 'clamp(10px,1.6vh,14px)' }}>
                <p style={{ fontFamily: sans, fontWeight: 400, fontSize: 12, lineHeight: 1.5, color: 'rgba(43,39,35,0.7)', margin: '0 0 8px' }}>Copying is not available here. Select the text below to copy it.</p>
                <textarea readOnly value={summaryText} rows={8} aria-label="Your next move, ready to copy" style={{ width: '100%', fontFamily: sans, fontSize: 13, lineHeight: 1.5, color: palette.ink, background: 'rgba(250,246,236,0.75)', border: '1px solid rgba(43,39,35,0.22)', borderRadius: 8, padding: '12px 14px', resize: 'vertical' }} />
              </div>
            )}
          </div>
          <div style={{ ...block, borderTop: '1px solid rgba(122,94,52,0.22)', paddingTop: 'clamp(20px,3.2vh,30px)' }}>
            <div style={{ ...smallLabel, color: 'rgba(122,94,52,0.85)' }}>An illustrative example</div>
            <p style={{ ...blockP, color: 'rgba(43,39,35,0.68)' }}>{r.example}</p>
          </div>
          <div style={{ ...block, borderTop: '1px solid rgba(21,106,102,0.28)', paddingTop: 'clamp(20px,3.2vh,30px)' }}>
            <div style={{ ...smallLabel, color: 'rgba(21,106,102,0.9)' }}>A fresh question to consider</div>
            <p style={{ ...blockP, fontStyle: 'italic', color: palette.navy }}>{r.freshQuestion}</p>
            <p style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.42)', margin: 'clamp(14px,2vh,18px) 0 0', lineHeight: 1.7 }}>{RESULT_NOTE}</p>
          </div>
        </div>

        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.82)', margin: 'clamp(30px,4.8vh,48px) auto 0', maxWidth: '44ch', ...pretty }}>{invitation}</p>

        <div style={{ margin: 'clamp(26px,4vh,40px) auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(16px,2.6vh,22px)' }}>
          <El as="button" className="poss-btn" onClick={ctx.openConversation} style={navyCta} hover={{ background: palette.navyDeep }}>Let&rsquo;s talk through your possibility</El>
          <El as="button" className="poss-link" onClick={restart} style={ghostBtn} hover={{ color: palette.ink }}>Start again</El>
        </div>
      </div>,
    )
  }

  // ── questions (step 1..4) ──────────────────────────────────────────────
  const q = QUESTIONS[step - 1]
  const chosen = answers[q.id]
  const canContinue = Boolean(chosen)
  return frame(
    <div key={`q${step}`} style={{ ...fade }}>
      {/* progress */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ ...eyebrow, color: 'rgba(21,106,102,0.9)', letterSpacing: '0.3em' }}>Question {step} of 4</div>
        <div role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4} aria-label={`Question ${step} of 4`} style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: 'clamp(16px,2.4vh,22px) auto 0' }}>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} aria-hidden="true" style={{ width: 'clamp(26px,5vw,42px)', height: 3, borderRadius: 2, background: n <= step ? palette.teal : 'rgba(43,39,35,0.16)', transition: reduce ? undefined : 'background 300ms ease' }} />
          ))}
        </div>
      </div>

      <h1 ref={headingRef} tabIndex={-1} id={`poss-q${step}`} style={{ outline: 'none', fontFamily: serif, fontWeight: 500, fontSize: 'clamp(26px,3.4vw,40px)', lineHeight: 1.14, color: palette.navy, margin: 'clamp(22px,3vh,34px) auto clamp(20px,2.8vh,30px)', maxWidth: '22ch', textAlign: 'center', ...balance }}>{q.prompt}</h1>

      <div role="group" aria-labelledby={`poss-q${step}`} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.4vh,14px)', maxWidth: 560, margin: '0 auto' }}>
        {q.answers.map((a) => {
          const selected = chosen === a.id
          return (
            <El as="button" key={a.id} className="poss-opt" aria-pressed={selected} onClick={() => select(q.id, a.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,2vw,16px)', width: '100%', textAlign: 'left', fontFamily: serif, fontWeight: 400, fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.4, color: palette.ink, background: selected ? 'rgba(21,106,102,0.08)' : 'rgba(250,246,236,0.65)', border: selected ? '1px solid rgba(21,106,102,0.7)' : '1px solid rgba(43,39,35,0.18)', borderRadius: 10, padding: 'clamp(13px,1.8vh,17px) clamp(16px,3vw,24px)', cursor: 'pointer', transition: reduce ? undefined : 'border-color 200ms ease, background 200ms ease' }}
              hover={{ borderColor: selected ? 'rgba(16,79,75,0.95)' : 'rgba(21,106,102,0.4)' }}>
              <span aria-hidden="true" style={{ flex: 'none', width: 18, height: 18, borderRadius: '50%', border: selected ? `5.5px solid ${palette.teal}` : '1.5px solid rgba(43,39,35,0.35)', background: selected ? palette.teal : 'transparent', transition: reduce ? undefined : 'border-width 150ms ease' }} />
              <span>{a.label}</span>
            </El>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, maxWidth: 560, margin: 'clamp(24px,3.4vh,36px) auto 0' }}>
        <El as="button" className="poss-link" onClick={() => setStep(step - 1)} style={ghostBtn} hover={{ color: palette.ink }}>&larr;&nbsp;Back</El>
        <El as="button" className="poss-btn" onClick={() => canContinue && setStep(step + 1)} aria-disabled={!canContinue} style={{ ...navyCta, opacity: canContinue ? 1 : 0.4, pointerEvents: canContinue ? 'auto' : 'none' }} hover={canContinue ? { background: palette.navyDeep } : {}}>{step === 4 ? 'See your possibility' : 'Continue'}</El>
      </div>
    </div>,
  )
}
