import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import { makeMotes, Motes } from './Motes'

/**
 * Living — the house is alive, not animated.
 *
 * A small vocabulary of atmosphere that never calls attention to itself:
 * light that wanders as if time is passing, dust caught in a shaft, coffee
 * steam rising and dissolving, a linen curtain breathing at a window, and —
 * rarely, unpredictably — a page corner that lifts for a moment and settles.
 *
 * Every gesture is gated by prefers-reduced-motion (via the global CSS reset
 * for CSS-driven layers, and via `useAlive` for JS-driven ones). Nothing loops
 * in a way the eye can catch; the slow things are slow enough to read as the
 * room simply existing.
 */

/** Whether ambient motion is welcome — respects the visitor who asks for stillness. */
export function useAlive(): boolean {
  const [alive, setAlive] = useState(true)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setAlive(!mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])
  return alive
}

/** The living light: a warm shaft that drifts across a room as the hours turn. */
export function LightShift({ at = '36% 26%', strength = 0.5 }: { at?: string; strength?: number }) {
  const s: CSSProperties = {
    position: 'absolute', inset: '-18%', pointerEvents: 'none', zIndex: 1,
    mixBlendMode: 'soft-light', opacity: strength,
    background: `radial-gradient(46% 42% at ${at}, rgba(255,226,168,0.9), transparent 62%)`,
    animation: 'lightWander 54s ease-in-out infinite alternate',
    willChange: 'transform',
  }
  return <div aria-hidden="true" style={s} />
}

/** Dust made visible in the strongest light — a handful of specks, drifting. */
export function Dust({ n = 16, seed = 7, box = [10, 80, 8, 62] as [number, number, number, number] }: { n?: number; seed?: number; box?: [number, number, number, number] }) {
  const alive = useAlive()
  const list = React.useMemo(() => makeMotes(n, seed, box[0], box[1], box[2], box[3]), [n, seed, box])
  return <Motes list={list} enabled={alive} />
}

/** Coffee, slowly releasing steam — two or three wisps that rise and dissolve. */
export function Steam({ x = '30%', y = '62%' }: { x?: string; y?: string }) {
  const alive = useAlive()
  if (!alive) return null
  const wisp = (left: string, delay: string, dur: string, w: number): CSSProperties => ({
    position: 'absolute', left, top: y, width: w, height: '20%',
    transform: 'translate(-50%,0)', transformOrigin: 'bottom center',
    background: 'linear-gradient(0deg, rgba(255,248,232,0) 0%, rgba(255,248,234,0.5) 40%, rgba(255,250,238,0) 100%)',
    filter: 'blur(7px)', opacity: 0, mixBlendMode: 'screen', pointerEvents: 'none',
    animation: `steamRise ${dur} ease-in-out ${delay} infinite`,
  })
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: x, top: 0, width: 60, height: '100%', pointerEvents: 'none', zIndex: 2 }}>
      <div style={wisp('44%', '0s', '9.5s', 10)} />
      <div style={wisp('58%', '3.4s', '11s', 8)} />
      <div style={wisp('50%', '6.7s', '10.2s', 7)} />
    </div>
  )
}

/** A linen curtain at a window, breathing with the morning air. */
export function Drape({ side = 'left', width = '22%' }: { side?: 'left' | 'right'; width?: string }) {
  const edge = side === 'left' ? { left: 0 } : { right: 0 }
  const s: CSSProperties = {
    position: 'absolute', top: '-4%', height: '108%', width, ...edge, pointerEvents: 'none', zIndex: 2,
    background:
      'linear-gradient(90deg, rgba(247,240,226,0.42), rgba(247,240,226,0.14) 58%, transparent 100%),' +
      'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 6px, rgba(120,100,66,0.05) 6px 12px)',
    filter: 'blur(0.4px)', mixBlendMode: 'soft-light',
    transformOrigin: side === 'left' ? 'left top' : 'right top',
    animation: 'drapeBreathe 13s ease-in-out infinite',
  }
  return <div aria-hidden="true" style={s} />
}

/**
 * A page corner that lifts for a moment — rare and unpredictable, so two
 * visitors rarely see it at the same time. Wrap a paper element; on a long
 * random cadence the top-right corner curls and settles.
 */
export function useRarePageLift(ref: React.RefObject<HTMLElement>, active = true) {
  const alive = useAlive()
  useEffect(() => {
    if (!alive || !active) return
    let stop = false
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      const wait = 24000 + Math.random() * 70000 // 24s .. ~90s
      timer = setTimeout(() => {
        const el = ref.current
        if (!stop && el && document.visibilityState === 'visible') {
          el.style.animation = 'pageCornerLift 3600ms cubic-bezier(.34,0,.28,1)'
          const clear = () => { el.style.animation = ''; el.removeEventListener('animationend', clear) }
          el.addEventListener('animationend', clear)
        }
        if (!stop) schedule()
      }, wait)
    }
    schedule()
    return () => { stop = true; clearTimeout(timer) }
  }, [ref, alive, active])
}

/**
 * The emotional keynote — the unspoken thing a founder feels at the threshold
 * of a room. One quiet first-person line, set apart, answering the room's
 * question before any of the copy does.
 */
export function Keynote({ children, dark = false, mark = true }: { children: React.ReactNode; dark?: boolean; mark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ maxWidth: '40ch', margin: '0 auto clamp(8px,2vh,20px)', textAlign: 'center' }}>
      {mark && (
      <svg width="19" height="22" viewBox="0 0 48 56" fill="none" style={{ display: 'block', margin: '0 auto 1em', opacity: seen ? 0.65 : 0, transition: 'opacity 1400ms ease' }}>
        <path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke={dark ? '#c8a24e' : '#9c7a3f'} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      )}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(19px,2.3vw,28px)', lineHeight: 1.4, margin: '0 auto',
          color: dark ? 'rgba(246,239,228,0.8)' : 'rgba(43,39,35,0.6)',
          opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(9px)',
          transition: 'opacity 1800ms ease, transform 1800ms cubic-bezier(.2,.7,.2,1)',
          textWrap: 'balance' as CSSProperties['textWrap'],
        }}
      >
        {children}
      </p>
    </div>
  )
}
