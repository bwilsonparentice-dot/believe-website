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
  const coreW = pick(3, 22, 38)
  const coreOp = pick(0.85, 0.97, 1)
  const coreBlur = pick(1.1, 2.4, 3.4)
  const haloW = pick(66, 150, 230)
  const haloOp = pick(0.42, 0.8, 0.95)
  const poolW = pick(46, 120, 160)
  const poolH = pick(26, 52, 64)
  const poolOp = pick(0.4, 0.8, 0.92)

  // object-fit: cover mapping from image fraction → screen px
  const scale = Math.max(vp.w / NW, vp.h / NH)
  const rw = NW * scale, rh = NH * scale
  const offX = (vp.w - rw) * POS_X, offY = (vp.h - rh) * POS_Y
  const x = offX + FX * rw
  const top = offY + DOOR_TOP * rh
  const doorH = (DOOR_BOTTOM - DOOR_TOP) * rh
  const stepTop = offY + STEP_Y * rh

  // the brass handle — a long vertical pull just left of the opening seam (Scenes 4–5)
  const HX = 0.585, H_TOP = 0.42, H_BOT = 0.68
  const hx = offX + HX * rw
  const hTop = offY + H_TOP * rh
  const hH = (H_BOT - H_TOP) * rh
  const handleAnim = !motionOn ? 'none' : opening ? 'handleSheen 1000ms ease 260ms both' : eased ? 'handleRest 9s ease-in-out infinite' : 'none'

  // once ajar, the crack itself breathes wider and narrower (never during the arrival wash)
  const breath = motionOn && stage === 1 ? 'crackBreath 7s ease-in-out infinite' : 'none'
  const haloBreath = motionOn && stage === 1 ? 'crackHaloBreath 7s ease-in-out infinite' : 'none'
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
    filter: 'blur(22px)', mixBlendMode: 'screen', opacity: haloOp, transition: T, animation: haloBreath,
  }
  // light pooling on the limestone step as the door parts
  const pool: CSSProperties = {
    position: 'absolute', left: x, top: stepTop, width: poolW, height: poolH,
    transform: 'translate(-50%,-50%)',
    background: 'radial-gradient(closest-side, rgba(255,238,196,0.85), rgba(255,224,158,0.25) 55%, transparent 80%)',
    filter: 'blur(10px)', mixBlendMode: 'screen', opacity: poolOp, transition: T,
  }

  // a soft warm spot that travels the handle — a slow glint at rest, a sheen on release
  const handle: CSSProperties = {
    position: 'absolute', left: hx, top: hTop, height: hH, width: 18,
    transform: 'translateX(-50%)', overflow: 'hidden', mixBlendMode: 'screen', pointerEvents: 'none',
  }
  const handleSpot: CSSProperties = {
    position: 'absolute', left: '50%', top: '50%', width: 12, height: Math.max(24, hH * 0.28), borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(255,247,216,0.95), rgba(255,232,172,0.25) 60%, transparent 82%)',
    filter: 'blur(3px)', animation: handleAnim, opacity: 0,
  }

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      <div style={halo} />
      <div style={pool} />
      <div style={core} />
      <div style={handle}><div style={handleSpot} /></div>
    </div>
  )
}
