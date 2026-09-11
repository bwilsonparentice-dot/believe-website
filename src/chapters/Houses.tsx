import React from 'react'
import { El, stop } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { HOUSES } from '../data'

/** The houses to come — the vision of the building in more than one city. */
export function HousesChapter({ ctx }: { ctx: Ctx }) {
  return (
    <div onClick={ctx.closeHouses} style={{ position: 'fixed', inset: 0, zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px,7vh,90px) 6vw', overflow: 'auto', background: 'rgba(245,239,228,0.94)', backdropFilter: 'blur(8px)', animation: 'veilIn 600ms ease both' }}>
      <div onClick={stop} style={{ position: 'relative', maxWidth: 620, width: '100%', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.8)', marginLeft: '0.5em' }}>The vision</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(38px,5.4vw,66px)', lineHeight: 1, margin: '0.26em 0 0.5em' }}>The houses to come</h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.8vw,22px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.86)', maxWidth: '50ch', margin: '0 auto 2.2em' }}>One day this building will stand in more than one city. Never built new, never the same twice. Each a place with a memory: a former bank, a printworks, a townhouse restored. The same rooms, the same rituals. What stays constant is not the architecture. It is how it feels to be inside.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.05em', textAlign: 'left', maxWidth: 440, margin: '0 auto 2.4em' }}>
          {HOUSES.map((h) => (
            <div key={h.city} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1.4em', borderBottom: '1px solid rgba(236,209,147,0.16)', paddingBottom: '0.9em' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.4vw,30px)' }}>{h.city}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,19px)', color: 'rgba(122,94,52,0.7)', textAlign: 'right' }}>{h.bldg}</div>
            </div>
          ))}
        </div>
        <El onClick={ctx.closeHouses} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', border: '1px solid rgba(43,39,35,0.3)', borderRadius: 2, padding: '13px 28px', cursor: 'pointer' }} hover={{ borderColor: 'rgba(43,39,35,0.8)', color: '#2b2723' }}>Back to the building</El>
      </div>
    </div>
  )
}
