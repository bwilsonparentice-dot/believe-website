// Living motion: the breeze that ripples the threshold, and the distant birds
// that cross the sky over the building — real flight, never a loop.
// All gated by reduced-motion + the light-motion flag.

export function motionAllowed(lightMotion: boolean): boolean {
  if (!lightMotion) return false
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return true
}

/**
 * BreezeDriver — drives the SVG feTurbulence baseFrequency of the threshold
 * filter so the photo breathes. Two out-of-phase slow drifts.
 */
export class BreezeDriver {
  private els: (SVGFETurbulenceElement | null)[] = [null, null, null]
  private raf: number | null = null
  private t0 = 0
  constructor(private enabled: boolean) {}

  setEl(i: number, el: SVGFETurbulenceElement | null) {
    this.els[i] = el
    if (el) this.start()
  }
  private start() {
    if (this.raf != null || !this.enabled) return
    this.t0 = performance.now()
    const tick = (now: number) => {
      const [a, b, c] = this.els
      if (!a && !b && !c) { this.raf = null; return }
      const t = (now - this.t0) / 1000
      const fx = 0.011 + 0.003 * Math.sin(t * 0.22) + 0.0012 * Math.sin(t * 0.61)
      const fy = 0.017 + 0.004 * Math.sin(t * 0.17 + 1.3) + 0.0015 * Math.sin(t * 0.5)
      const v = fx.toFixed(5) + ' ' + fy.toFixed(5)
      if (a) a.setAttribute('baseFrequency', v)
      if (b) b.setAttribute('baseFrequency', v)
      if (c) { const cx = 0.009 + 0.0028 * Math.sin(t * 0.3) + 0.0012 * Math.sin(t * 0.8 + 0.5); c.setAttribute('baseFrequency', cx.toFixed(5) + ' ' + (cx * 1.5).toFixed(5)) }
      this.raf = requestAnimationFrame(tick)
    }
    this.raf = requestAnimationFrame(tick)
  }
  dispose() { if (this.raf) cancelAnimationFrame(this.raf); this.raf = null }
}

/**
 * BirdFlock — schedules distant birds crossing the sky over the map.
 * Sometimes one, sometimes a loose pair, sometimes nothing for up to ~3 min.
 */
export class BirdFlock {
  private layer: HTMLElement | null = null
  private timer: ReturnType<typeof setTimeout> | null = null
  private started = false
  constructor(private isAllowed: () => boolean) {}

  setLayer(el: HTMLElement | null) {
    this.layer = el
    if (el && !this.started) { this.started = true; this.schedule(18000 + Math.random() * 22000) }
  }
  private schedule(gap?: number) {
    if (this.timer) clearTimeout(this.timer)
    const wait = gap != null ? gap : 22000 + Math.random() * 165000 // 22s .. ~3min
    this.timer = setTimeout(() => {
      if (this.isAllowed() && this.layer) {
        const r = Math.random()
        if (r < 0.6) this.spawn()
        else if (r < 0.82) { this.spawn(); setTimeout(() => this.isAllowed() && this.spawn(), 1400 + Math.random() * 4200) }
      }
      this.schedule()
    }, wait)
  }
  private gullSVG(w: number, flip: boolean) {
    const bend = 0.5 + Math.random() * 0.35
    const d = `M2 ${7 * bend} Q9 1 16 ${5.2 * bend} Q23 1 30 ${7 * bend}`
    return `<svg viewBox="0 0 32 12" width="${w}" height="${(w * 12 / 32).toFixed(1)}" style="display:block; overflow:visible; transform:scaleX(${flip ? -1 : 1});"><path d="${d}" fill="none" stroke="rgba(38,32,24,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  }
  private spawn() {
    const layer = this.layer; if (!layer) return
    const rightward = Math.random() < 0.5
    const near = Math.random()
    const w = 9 + near * 26
    const y = 3 + Math.random() * 30
    const drift = Math.random() * 10 - 5
    const dur = 15000 + Math.random() * 26000
    const opacity = 0.14 + near * 0.5
    const sunlit = Math.random() < 0.28
    const el = document.createElement('div')
    el.style.cssText = `position:absolute; left:0; top:${y.toFixed(1)}vh; will-change:transform,opacity,filter; pointer-events:none;`
    el.innerHTML = this.gullSVG(Number(w.toFixed(1)), !rightward)
    if (Math.random() < 0.62) {
      const svg = el.firstChild as SVGElement
      svg.animate(
        [{ transform: svg.style.transform + ' scaleY(1)' }, { transform: svg.style.transform + ' scaleY(0.55)' }, { transform: svg.style.transform + ' scaleY(1)' }],
        { duration: 520 + Math.random() * 640, iterations: Infinity, easing: 'ease-in-out' },
      )
    }
    layer.appendChild(el)
    const x0 = rightward ? -7 : 107, x1 = rightward ? 107 : -7
    const at = (o: number) => `translate(${(x0 + (x1 - x0) * o).toFixed(1)}vw, ${(drift * o).toFixed(1)}vh)`
    const anim = el.animate(
      [
        { transform: at(0), opacity: 0, filter: 'brightness(1)' },
        { transform: at(0.1), opacity, offset: 0.1 },
        { transform: at(0.5), opacity, filter: sunlit ? 'brightness(1.9)' : 'brightness(1)', offset: 0.5 },
        { transform: at(0.9), opacity, offset: 0.9 },
        { transform: at(1), opacity: 0, filter: 'brightness(1)' },
      ],
      { duration: dur, easing: 'linear' },
    )
    anim.onfinish = () => { try { el.remove() } catch { /* ignore */ } }
  }
  dispose() { if (this.timer) clearTimeout(this.timer) }
}
