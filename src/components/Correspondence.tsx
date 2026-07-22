import React, { useState, CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Faq } from '../data'

const serif = "'Cormorant Garamond',serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

/**
 * One quiet question — the query typeset like a line of collected correspondence,
 * the reply unfolding beneath it like a page turning, not software opening.
 */
function Row({ item, index, open, onToggle }: { item: Faq; index: number; open: boolean; onToggle: () => void }) {
  const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'][index] || String(index + 1)
  return (
    <div style={{ padding: 'clamp(22px,3.4vh,38px) 0' }}>
      <El
        onClick={onToggle}
        style={{ display: 'grid', gridTemplateColumns: 'clamp(28px,4vw,52px) 1fr', gap: 'clamp(10px,2vw,22px)', alignItems: 'baseline', width: '100%', cursor: 'pointer', textAlign: 'left', color: open ? '#2b2723' : 'rgba(43,39,35,0.8)', transition: 'color 500ms ease' }}
        hover={{ color: '#2b2723' }}
      >
        <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px,1.5vw,19px)', color: 'rgba(122,94,52,0.55)', lineHeight: 1.5 }}>{roman}.</span>
        <span style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.4vw,30px)', lineHeight: 1.32, letterSpacing: '0.005em' }}>{item.q}</span>
      </El>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 640ms cubic-bezier(.22,.7,.2,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.85vw,22px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', margin: 'clamp(14px,2vh,20px) 0 0', marginLeft: 'clamp(38px,6vw,74px)', maxWidth: '48ch', opacity: open ? 1 : 0, transition: 'opacity 700ms ease 120ms', ...pretty }}>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/** A self-contained list of questions that unfold like collected correspondence. */
export function Correspondence({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {items.map((f, i) => (
        <Row key={i} item={f} index={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  )
}
