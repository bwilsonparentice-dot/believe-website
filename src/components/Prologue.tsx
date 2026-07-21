import React, { useEffect, useState, CSSProperties } from 'react'
import { El } from '../lib/El'
import { ImageSlot } from './ImageSlot'
import { useAlive } from './Living'
import { PHOTOS } from '../data'

/**
 * Prologue — the guided walk before the house opens.
 *
 * Not navigation. A sequence. The visitor crosses the threshold and moves,
 * one quiet room at a time, through the reason the house exists before ever
 * seeing a door: Threshold → Why Believe Exists → The Founder → The Blueprint,
 * then the house opens. One thought per beat. Nothing to decide. Only Continue.
 *
 * Restraint is the point: no chrome, no logo, no menu — just light, a line,
 * and the invitation to keep walking.
 */

const serif = "'Cormorant Garamond', serif"
const sans = "'Jost', sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const eyebrow: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)',
}

/** The founder's unspoken questions — surfaced one at a time. */
const PROMPTS = [
  'Have you felt responsible for everyone?',
  'Wondered, quietly, if you were making the right call?',
  'Carried the weight alone?',
  'Celebrated, then gone straight back to work?',
]

export function Prologue({ onEnter, motionOn }: { onEnter: () => void; motionOn: boolean }) {
  const alive = useAlive() && motionOn
  const [step, setStep] = useState(0)
  const LAST = 3
  const next = () => setStep((s) => Math.min(LAST, s + 1))

  // gentle keyboard: Enter / Space / ↓ advances; the space bar never scrolls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        step >= LAST ? onEnter() : next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  const wrap: CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 38, overflow: 'hidden',
    background: 'radial-gradient(120% 96% at 34% 20%, #fbf6ec, #f1e8d7 62%, #e7dcc4)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', color: '#2b2723', padding: 'clamp(28px,6vw,80px)',
    animation: 'veilIn 900ms ease both',
  }
  // a slow shaft of morning light, drifting — the only motion
  const lightWash: CSSProperties = {
    position: 'absolute', inset: '-18%', pointerEvents: 'none', mixBlendMode: 'soft-light',
    background: 'radial-gradient(46% 42% at 36% 24%, rgba(255,226,168,0.9), transparent 62%)',
    opacity: 0.6, animation: alive ? 'lightWander 60s ease-in-out infinite alternate' : 'none',
  }

  const arch = (
    <svg width="22" height="26" viewBox="0 0 48 56" fill="none" style={{ display: 'block', margin: '0 auto clamp(20px,4vh,40px)', opacity: 0.7 }}>
      <path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke="#9c7a3f" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )

  // the "Continue" invitation — a breathing cue, never a hard button
  const Continue = ({ label = 'Continue', onClick }: { label?: string; onClick: () => void }) => (
    <El onClick={onClick} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.6em', marginTop: 'clamp(32px,6vh,68px)', cursor: 'pointer', color: 'rgba(43,39,35,0.62)', transition: 'color 500ms ease' }} hover={{ color: '#2b2723' }}>
      <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase' }}>{label}</span>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ opacity: 0.7, animation: alive ? 'hint 3.4s ease-in-out infinite' : 'none' }}>
        <path d="M2 3 L8 9 L14 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </El>
  )

  const beat = (key: number, children: React.ReactNode) => (
    <div key={key} style={{ position: 'relative', alignSelf: 'stretch', width: '100%', maxWidth: 900, margin: '0 auto', animation: 'contentFocus 1400ms cubic-bezier(.2,.7,.2,1) both' }}>
      {children}
    </div>
  )

  return (
    <div style={wrap}>
      <div style={lightWash} />

      {/* a faint sense of where you are in the walk — never a progress bar */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(26px,5vh,48px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i === step ? 'rgba(122,94,52,0.8)' : 'rgba(122,94,52,0.22)', transition: 'background 700ms ease' }} />
        ))}
      </div>

      {step === 0 && beat(0, (
        <>
          {arch}
          <div style={{ ...eyebrow, marginBottom: 'clamp(20px,4vh,36px)' }}>You have crossed the threshold</div>
          <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(38px,6vw,86px)', lineHeight: 1.05, margin: '0 auto', maxWidth: '16ch', ...balance }}>You’re inside now.</h1>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.68)', maxWidth: '26ch', margin: 'clamp(30px,5vh,56px) auto 0', ...balance }}>There is no map to memorize, and nothing to decide yet.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,27px)', color: 'rgba(122,94,52,0.8)', margin: '0.9em auto 0', maxWidth: '22ch' }}>Walk with us a moment.</p>
          <Continue onClick={next} />
        </>
      ))}

      {step === 1 && beat(1, (
        <>
          <div style={{ ...eyebrow, marginBottom: 'clamp(26px,5vh,48px)' }}>Why this house exists</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.9vw,68px)', lineHeight: 1.1, color: '#2b2723', maxWidth: '17ch', margin: '0 auto clamp(30px,5vh,52px)', ...balance }}>Founders change the world <span style={{ fontStyle: 'italic' }}>when someone believes in them first.</span></p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.45, color: 'rgba(43,39,35,0.66)', maxWidth: '26ch', margin: '0 auto', ...balance }}>Believe is a founder transformation ecosystem, built on that single conviction.</p>
          <Continue onClick={next} />
        </>
      ))}

      {step === 2 && beat(2, (
        <>
          <div style={{ ...eyebrow, marginBottom: 'clamp(22px,4vh,40px)' }}>Before the company — the founder</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,2.2vh,22px)', maxWidth: '40ch', margin: '0 auto' }}>
            {PROMPTS.map((q, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.82)', margin: 0, opacity: 0, animation: `riseFade 1100ms ease ${300 + i * 900}ms both`, ...balance }}>{q}</p>
            ))}
          </div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(22px,2.9vw,38px)', lineHeight: 1.2, color: '#2b2723', margin: 'clamp(28px,5vh,56px) auto 0', maxWidth: '18ch', opacity: 0, animation: `riseFade 1400ms ease ${300 + PROMPTS.length * 900}ms both`, ...balance }}>You are not the only one.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2.1vw,26px)', color: 'rgba(122,94,52,0.85)', margin: '0.7em auto 0', opacity: 0, animation: `riseFade 1400ms ease ${900 + PROMPTS.length * 900}ms both` }}>Someone here understands.</p>
          <Continue onClick={next} />
        </>
      ))}

      {step === 3 && beat(3, (
        <>
          <div style={{ ...eyebrow, marginBottom: 'clamp(16px,3vh,30px)' }}>And it begins the same way for everyone</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.6vw,62px)', lineHeight: 1.04, margin: '0 auto 0.35em', maxWidth: '16ch', ...balance }}>Every founder begins<br />with a Blueprint.</h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', color: 'rgba(122,94,52,0.82)', margin: '0 auto clamp(22px,3.6vh,40px)' }}>Not a business plan. A foundation.</p>
          <div style={{ width: 'min(74%,520px)', margin: '0 auto', animation: alive ? 'blueprintUnfold 2600ms cubic-bezier(.2,.7,.2,1) both' : 'none', transformOrigin: 'center top' }}>
            <ImageSlot src={PHOTOS.blueprint} alt="The Believe Blueprint — an open journal and the architectural plans in morning light" placeholder="the Believe Blueprint unfolding" fit="cover" style={{ display: 'block', width: '100%', height: 'clamp(180px,26vh,320px)', background: '#f3ecdd', borderRadius: 4, boxShadow: '0 40px 90px -50px rgba(60,44,20,0.7)' }} />
          </div>
          <Continue label="Enter the house" onClick={onEnter} />
        </>
      ))}

      {/* always a quiet way straight in — the guided walk is an invitation, never a gate */}
      <El onClick={onEnter} style={{ position: 'absolute', right: 'clamp(20px,3vw,40px)', bottom: 'clamp(18px,3vh,32px)', fontFamily: sans, fontWeight: 300, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.32)', cursor: 'pointer', transition: 'color 400ms ease' }} hover={{ color: 'rgba(43,39,35,0.7)' }}>
        Enter the house&nbsp;&rarr;
      </El>
    </div>
  )
}
