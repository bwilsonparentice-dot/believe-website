import { useEffect, useState, CSSProperties } from 'react'

/**
 * RealDoor — the façade's oak door, actually swinging open.
 *
 * The door leaf is cropped out of the façade photograph at runtime and laid back
 * over its exact position, then rotated on its left hinge (rotateY) so the real
 * photographed wood swings inward, revealing a warm interior behind it. At rest
 * the leaf sits perfectly over the photo (seamless); it eases open once after the
 * arrival, and swings further on the click.
 *
 * Geometry measured from facade.png (1604×981): the arched opening spans
 * x∈[0.508, 0.648], y∈[0.05, 0.828]; the hinge is the left edge.
 */
const NW = 1604, NH = 981
const POS_X = 0.5, POS_Y = 0.46
const L = 0.515, R = 0.648, T = 0.05, B = 0.828

export function RealDoor({ opening, motionOn, src = '/photos/facade.png' }: { opening: boolean; motionOn: boolean; src?: string }) {
  const [leaf, setLeaf] = useState<string | null>(null)
  const [vp, setVp] = useState(() => ({ w: typeof window !== 'undefined' ? window.innerWidth : 1440, h: typeof window !== 'undefined' ? window.innerHeight : 900 }))
  const [eased, setEased] = useState(false)

  // crop the door leaf out of the façade photo once it's available
  useEffect(() => {
    let done = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const x = Math.round(L * img.naturalWidth), y = Math.round(T * img.naturalHeight)
        const w = Math.round((R - L) * img.naturalWidth), h = Math.round((B - T) * img.naturalHeight)
        const c = document.createElement('canvas'); c.width = w; c.height = h
        c.getContext('2d')!.drawImage(img, x, y, w, h, 0, 0, w, h)
        if (!done) setLeaf(c.toDataURL('image/png'))
      } catch { /* tainted or unsupported — leave the light-less closed door */ }
    }
    img.src = src
    return () => { done = true }
  }, [src])

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    const t = motionOn ? setTimeout(() => setEased(true), 2300) : undefined
    return () => { window.removeEventListener('resize', onResize); if (t) clearTimeout(t) }
  }, [motionOn])

  if (!leaf) return null

  // cover-crop mapping → the opening's screen box
  const scale = Math.max(vp.w / NW, vp.h / NH)
  const rw = NW * scale, rh = NH * scale
  const offX = (vp.w - rw) * POS_X, offY = (vp.h - rh) * POS_Y
  const box = { left: offX + L * rw, top: offY + T * rh, width: (R - L) * rw, height: (B - T) * rh }

  // the swing: closed & aligned at rest → ajar (a real slow open) → wide on the click
  const deg = opening ? -56 : eased ? -22 : -4
  const dur = opening ? 1900 : 3400
  const dim = 1 - Math.min(0.3, Math.abs(deg) / 190) // the leaf turns from the sun as it opens

  const op: CSSProperties = {
    position: 'absolute', ...box, perspective: '1500px', overflow: 'hidden',
    borderRadius: '47% 47% 3px 3px / 36% 36% 2px 2px', pointerEvents: 'none', zIndex: 3,
  }
  // a warm morning interior — never black; brighter toward the opening (latch) side
  const interior: CSSProperties = {
    position: 'absolute', inset: 0,
    background:
      'linear-gradient(90deg, rgba(58,42,22,0) 46%, rgba(255,236,192,0.55) 82%, rgba(255,246,220,0.92) 97%, rgba(255,248,226,1) 100%),' +
      'radial-gradient(135% 105% at 70% 56%, #f3d59a, #c79a56 26%, #7c5c34 58%, #4a3419 100%)',
  }
  const leafStyle: CSSProperties = {
    position: 'absolute', inset: 0, backgroundImage: `url('${leaf}')`, backgroundSize: '100% 100%',
    transformOrigin: 'left center', transform: `rotateY(${deg}deg)`,
    boxShadow: '10px 0 34px rgba(20,12,4,0.5)', filter: `brightness(${dim.toFixed(3)})`,
    transition: `transform ${dur}ms cubic-bezier(.34,0,.28,1), filter ${dur}ms ease`,
  }

  return (
    <div aria-hidden="true" style={op}>
      <div style={interior} />
      <div style={leafStyle} />
    </div>
  )
}
