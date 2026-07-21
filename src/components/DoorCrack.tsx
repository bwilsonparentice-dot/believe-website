import { useEffect, useState, CSSProperties } from 'react'

/**
 * DoorCrack — the wooden façade door easing open a crack.
 *
 * The door is baked into the façade photograph, so we can't rotate it. Instead
 * we place a warm shaft of interior light exactly on the door's opening edge and
 * let it *widen and brighten* on arrival — reading as the door easing open and
 * light spilling across the threshold. Positioned with object-fit:cover math so
 * it stays on the real door at any viewport size.
 *
 * Measured from facade.png (1604×981): the crack sits at x≈0.644, from the
 * arch (y≈0.28) down to the light pooling on the step (y≈0.92).
 */

// façade image intrinsics + the measured door-crack geometry
const NW = 1604, NH = 981
const POS_X = 0.5, POS_Y = 0.46 // object-position of the façade photo
const FX = 0.644 // crack x, image fraction
const DOOR_TOP = 0.28, DOOR_BOTTOM = 0.80 // the door's lit edge
const STEP_Y = 0.9 // where light pools on the step

export function DoorCrack({ opening, motionOn }: { opening: boolean; motionOn: boolean }) {
  const [vp, setVp] = useState(() => ({ w: typeof window !== 'undefined' ? window.innerWidth : 1440, h: typeof window !== 'undefined' ? window.innerHeight : 900 }))
  // the door eases open a crack on its own, once, shortly after arrival —
  // so the visitor actually watches it part while the words appear.
  const [eased, setEased] = useState(false)
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    const t = motionOn ? setTimeout(() => setEased(true), 1600) : undefined
    return () => { window.removeEventListener('resize', onResize); if (t) clearTimeout(t) }
  }, [motionOn])

  // three stages: closed (0) → ajar a crack (1) → opening on arrival (2)
  const stage = opening ? 2 : eased ? 1 : 0
  const pick = <T,>(a: T, b: T, c: T) => [a, b, c][stage] as T
  const coreW = pick(3, 15, 30)
  const coreOp = pick(0.85, 0.96, 1)
  const coreBlur = pick(1.1, 2, 3)
  const haloW = pick(64, 108, 190)
  const haloOp = pick(0.42, 0.72, 0.92)
  const poolW = pick(46, 104, 150)
  const poolH = pick(26, 46, 60)
  const poolOp = pick(0.4, 0.72, 0.9)

  // object-fit: cover mapping from image fraction → screen px
  const scale = Math.max(vp.w / NW, vp.h / NH)
  const rw = NW * scale, rh = NH * scale
  const offX = (vp.w - rw) * POS_X, offY = (vp.h - rh) * POS_Y
  const x = offX + FX * rw
  const top = offY + DOOR_TOP * rh
  const doorH = (DOOR_BOTTOM - DOOR_TOP) * rh
  const stepTop = offY + STEP_Y * rh

  // once ajar, the crack breathes almost imperceptibly (never during the arrival wash)
  const breath = motionOn && stage === 1 ? 'crackBreath 6s ease-in-out infinite' : 'none'
  const T = 'width 2400ms cubic-bezier(.4,.1,.2,1), height 2400ms cubic-bezier(.4,.1,.2,1), filter 2400ms ease, opacity 2400ms ease'

  // the bright core of the crack — a thin sliver closed, a widening band as it parts
  const core: CSSProperties = {
    position: 'absolute', left: x, top, height: doorH, width: coreW,
    transform: 'translateX(-50%)',
    background: 'linear-gradient(180deg, rgba(255,240,205,0) 0%, rgba(255,244,214,0.85) 12%, rgba(255,239,198,1) 50%, rgba(255,244,214,0.85) 88%, rgba(255,240,205,0) 100%)',
    filter: `blur(${coreBlur}px)`, mixBlendMode: 'screen', opacity: coreOp,
    animation: breath, transition: T,
  }
  // the soft warm halo bleeding around the opening
  const halo: CSSProperties = {
    position: 'absolute', left: x, top: top - doorH * 0.06, height: doorH * 1.12, width: haloW,
    transform: 'translateX(-50%)',
    background: 'radial-gradient(closest-side, rgba(255,236,190,0.9), rgba(255,224,160,0.28) 55%, transparent 78%)',
    filter: 'blur(22px)', mixBlendMode: 'screen', opacity: haloOp, transition: T,
  }
  // light pooling on the limestone step as the door parts
  const pool: CSSProperties = {
    position: 'absolute', left: x, top: stepTop, width: poolW, height: poolH,
    transform: 'translate(-50%,-50%)',
    background: 'radial-gradient(closest-side, rgba(255,238,196,0.85), rgba(255,224,158,0.25) 55%, transparent 80%)',
    filter: 'blur(10px)', mixBlendMode: 'screen', opacity: poolOp, transition: T,
  }

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      <div style={halo} />
      <div style={pool} />
      <div style={core} />
    </div>
  )
}
