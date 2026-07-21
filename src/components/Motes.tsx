import { useMemo } from 'react'

export type Mote = { left: string; top: string; size: string; op: string; sx: string; dur: string; delay: string }

/** deterministic dust: the same specks drift each render, seeded like the source */
export function makeMotes(n: number, seed: number, x0: number, xr: number, y0: number, yr: number): Mote[] {
  let s = seed >>> 0
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
  const arr: Mote[] = []
  for (let i = 0; i < n; i++) {
    arr.push({
      left: (x0 + rnd() * xr).toFixed(1),
      top: (y0 + rnd() * yr).toFixed(1),
      size: (1 + rnd() * 1.5).toFixed(2),
      op: (0.12 + rnd() * 0.22).toFixed(2),
      sx: (rnd() * 14 - 7).toFixed(1),
      dur: (19 + rnd() * 16).toFixed(1),
      delay: (rnd() * 26).toFixed(1),
    })
  }
  return arr
}

/** dust made visible in the strongest light — cover & rooms */
export function Motes({ list, enabled }: { list: Mote[]; enabled: boolean }) {
  const items = useMemo(() => list, [list])
  if (!enabled) return null
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {items.map((m, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', left: m.left + '%', top: m.top + '%',
            width: m.size + 'px', height: m.size + 'px', borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, rgba(255,247,222,0.95), rgba(255,240,205,0))',
            ['--op' as string]: m.op, ['--sx' as string]: m.sx + 'px', opacity: 0,
            animation: 'mote ' + m.dur + 's linear ' + m.delay + 's infinite',
          }}
        />
      ))}
    </div>
  )
}
