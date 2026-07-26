import React, { CSSProperties } from 'react'
import type { ResidencyRecord } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 9, letterSpacing: '0.34em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)',
}

/**
 * ArchivalRecord — a single residency catalogued as a shelf record. A quiet
 * bookplate on warm paper with a brass edge: what a founder was carrying, the
 * decision it clarified, what was built, and the artifact left in the Library.
 * Not an ecommerce card, not a download tile — a library entry, meant to be
 * walked past and read, and to remain long after the residency ends.
 */
export function ArchivalRecord({ record, reveal = true }: { record: ResidencyRecord; reveal?: boolean }) {
  const rows: [string, string][] = [
    ['Resident', record.resident],
    ['What founders were carrying', record.carrying],
    ['The decision it clarifies', record.decision],
    ['What was built', record.built],
  ]
  const enter: CSSProperties = reveal
    ? { animation: 'fadeUpSoft 1200ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 2% cover 26%' as unknown as string }
    : {}

  return (
    <figure style={{ width: 'min(92%,540px)', margin: '0 auto', textAlign: 'left', ...enter }}>
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(172deg,#faf4e6,#f0e7d2)',
          borderLeft: '4px solid rgba(122,94,52,0.55)',
          borderRadius: '2px 5px 5px 2px',
          padding: 'clamp(38px,5vw,58px) clamp(32px,4.4vw,52px) clamp(34px,4.4vw,50px)',
          boxShadow: '0 40px 74px -42px rgba(60,44,20,0.5), 0 2px 3px rgba(60,44,20,0.12)',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.1), inset 0 0 34px rgba(122,94,52,0.05)', pointerEvents: 'none' }} />

        {/* the shelf mark — a catalogue number over a hairline */}
        <div style={{ ...label, letterSpacing: '0.42em' }}>Residency Record · No. {record.no}</div>
        <div aria-hidden="true" style={{ width: 30, height: 1, background: 'rgba(122,94,52,0.28)', margin: 'clamp(14px,2vw,18px) 0 clamp(24px,3.2vw,32px)' }} />

        {/* the workshop title — the record's spine */}
        <div style={{ ...label, fontSize: 8.5, marginBottom: '0.7em' }}>Workshop</div>
        <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.14, color: '#2b2723', marginBottom: 'clamp(24px,3.4vw,34px)' }}>{record.workshop}</div>

        {/* the fielded body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.4vw,22px)' }}>
          {rows.map(([k, v]) => (
            <div key={k}>
              <div style={{ ...label, fontSize: 8.5, marginBottom: '0.5em' }}>{k}</div>
              <div style={{ fontFamily: serif, fontWeight: 300, fontStyle: k.startsWith('What founders') ? 'italic' : 'normal', fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* the artifact left behind — the record's reason for being */}
        <div aria-hidden="true" style={{ width: '100%', height: 1, background: 'rgba(122,94,52,0.2)', margin: 'clamp(26px,3.6vw,34px) 0 clamp(22px,3vw,28px)' }} />
        <div style={{ ...label, fontSize: 8.5, marginBottom: '0.5em' }}>Left in the Library</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(20px,2.4vw,29px)', lineHeight: 1.1, color: '#2b2723' }}>{record.artifact}</div>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(122,94,52,0.66)' }}>{record.date}</div>
        </div>
      </div>
    </figure>
  )
}
