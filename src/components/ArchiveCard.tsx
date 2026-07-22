import React, { CSSProperties } from 'react'
import type { ArchiveNote } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const hand = "'Caveat',cursive"

// a fine, desaturated paper grain — cotton-paper texture, not printed onto it
const paperGrain = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='140' height='140' filter='url(%23g)' opacity='0.55'/></svg>\")"

/**
 * A page from the Believe Archive — one quiet observation, left resting inside
 * a room. A warm-cream archival card with softly worn edges and cotton-paper
 * grain, discovered rather than designed: evidence that real founders have
 * already passed through. Each room keeps its own note, and its own collection.
 */
export function ArchiveCard({ note, reveal = true }: { note: ArchiveNote; reveal?: boolean }) {
  const last = note.lines.length - 1
  const enter: CSSProperties = reveal
    ? { animation: 'fadeUpSoft 1200ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 2% cover 26%' as unknown as string }
    : { animation: 'fadeUpSoft 1100ms ease both' }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: 'clamp(84px,15vh,190px) auto', ...enter }}>
      <figure style={{ position: 'relative', width: 'min(80%,430px)', margin: 0, transform: 'rotate(-1.7deg)' }}>
        <div style={{ position: 'relative', background: 'linear-gradient(176deg, #f9f3e4, #f1e8d3)', borderRadius: '3px 6px 3px 5px', padding: 'clamp(36px,4.8vw,60px) clamp(32px,4.4vw,52px) clamp(30px,4vw,46px)', boxShadow: '0 30px 56px -30px rgba(60,44,20,0.46), 0 2px 3px rgba(60,44,20,0.13)', overflow: 'hidden' }}>
          {/* cotton-paper grain, and a softly worn edge */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: paperGrain, backgroundSize: '180px 180px', mixBlendMode: 'multiply', opacity: 0.05, pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.09), inset 0 0 34px rgba(122,94,52,0.05)', pointerEvents: 'none' }} />

          {/* the archival hand — a small catalog number over a hairline */}
          <div style={{ position: 'relative', fontFamily: sans, fontWeight: 400, fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.5)' }}>Archive No. {note.no}</div>
          <div aria-hidden="true" style={{ position: 'relative', width: 30, height: 1, background: 'rgba(122,94,52,0.28)', margin: 'clamp(12px,1.8vh,18px) 0 clamp(22px,3vh,30px)' }} />

          {note.lines.map((l, i) => (
            <p key={i} style={{ position: 'relative', fontFamily: hand, fontWeight: i === last ? 500 : 400, fontSize: 'clamp(22px,2.7vw,31px)', lineHeight: 1.5, color: i === last ? 'rgba(122,94,52,0.62)' : 'rgba(52,40,26,0.58)', margin: i === 0 ? 0 : '0.3em 0 0' }}>{l}</p>
          ))}
          <figcaption style={{ position: 'relative', fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.6vw,19px)', color: 'rgba(52,40,26,0.4)', margin: 'clamp(24px,3.6vh,36px) 0 0', textAlign: 'right' }}>{note.source}</figcaption>
        </div>
      </figure>
    </div>
  )
}
