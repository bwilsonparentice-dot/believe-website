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

export function RealDoor({ opening, motionOn, src = '/photos/facade.webp' }: { opening: boolean; motionOn: boolean; src?: string }) {
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
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // The door holds shut for a beat, then swings open on its own — scheduled only
  // once the leaf has been cropped and painted closed (deg 0), so the browser
  // has a real "closed" frame to animate away from. Without this gate the leaf
  // could mount already-open and the swing would never be seen.
  useEffect(() => {
    if (!leaf || !motionOn) return
    const t = setTimeout(() => setEased(true), 1400)
    return () => clearTimeout(t)
  }, [leaf, motionOn])

  if (!leaf) return null

  // cover-crop mapping → the opening's screen box
  const scale = Math.max(vp.w / NW, vp.h / NH)
  const rw = NW * scale, rh = NH * scale
  const offX = (vp.w - rw) * POS_X, offY = (vp.h - rh) * POS_Y
  const box = { left: offX + L * rw, top: offY + T * rh, width: (R - L) * rw, height: (B - T) * rh }

  // the swing: flush-shut at rest (deg 0, seamless over the façade) → a wide,
  // watchable open on its own → wider still on the click. Large angles so the
  // motion is unmistakable; slow easing so it still feels like a heavy door.
  const deg = opening ? -74 : eased ? -46 : 0
  const dur = opening ? 2000 : 2900
  const dim = 1 - Math.min(0.34, Math.abs(deg) / 150) // the leaf turns from the sun as it opens
  // a heavy door has mass: it's slow to break from the latch, then swings freely,
  // then settles. This easing lingers at both ends and moves through the middle.
  const swingEase = 'cubic-bezier(.62,.02,.2,1)'
  // the brass pull catches the morning as the latch releases
  const glint = motionOn && (opening || eased)

  const op: CSSProperties = {
    position: 'absolute', ...box, perspective: '1500px', overflow: 'hidden',
    borderRadius: '47% 47% 3px 3px / 36% 36% 2px 2px', pointerEvents: 'none', zIndex: 3,
  }
  // a warm hall glimpsed through the opening — golden light spilling from the
  // latch (right) side, receding into a soft warm dark on the hinge (left) side,
  // so the reveal reads as depth rather than a flat bright panel. Never white.
  const interior: CSSProperties = {
    position: 'absolute', inset: 0,
    background:
      'linear-gradient(90deg, rgba(34,23,11,0.62) 0%, rgba(70,50,26,0.12) 44%, rgba(206,162,98,0.5) 76%, rgba(240,204,140,0.82) 93%, rgba(247,220,166,0.94) 100%),' +
      'radial-gradient(160% 130% at 82% 54%, #f2d494, #cca45e 28%, #8a6636 60%, #402d17 100%)',
  }
  const leafStyle: CSSProperties = {
    position: 'absolute', inset: 0, backgroundImage: `url('${leaf}')`, backgroundSize: '100% 100%',
    transformOrigin: 'left center', transform: `rotateY(${deg}deg)`,
    boxShadow: '10px 0 34px rgba(20,12,4,0.5)', filter: `brightness(${dim.toFixed(3)})`,
    transition: `transform ${dur}ms ${swingEase}, filter ${dur}ms ease`,
  }
  // the brass pull sits on the latch (right) side of the leaf — a slow catch of
  // light at rest, a sheen falling down its length as the door releases
  const handleGlint: CSSProperties = {
    position: 'absolute', top: '34%', height: '32%', left: '88.5%', width: '3.4%',
    transform: 'translateX(-50%)', overflow: 'hidden', mixBlendMode: 'screen', pointerEvents: 'none',
  }
  const handleSpot: CSSProperties = {
    position: 'absolute', left: '50%', top: '50%', width: '220%', height: '30%', borderRadius: '50%',
    transform: 'translate(-50%,-50%)',
    background: 'radial-gradient(closest-side, rgba(255,248,220,0.95), rgba(255,232,172,0.3) 58%, transparent 82%)',
    filter: 'blur(2px)', opacity: 0,
    animation: !glint ? 'none' : opening ? 'handleSheen 1200ms ease 260ms both' : 'handleRest 15s ease-in-out infinite',
  }

  return (
    <div aria-hidden="true" style={op}>
      <div style={interior} />
      <div style={leafStyle}>
        <div style={handleGlint}><div style={handleSpot} /></div>
      </div>
    </div>
  )
}
