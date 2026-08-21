import React from 'react'
import { El } from '../lib/El'

/**
 * ChapterShell — a fixed, scrollable cream overlay with a "Back to the
 * building" affordance in the corner. Opening a chapter closes its siblings
 * (handled in App); Escape closes (handled globally in App).
 */
export function ChapterShell({
  onClose,
  background = '#efe6d3',
  z = 120,
  dark = false,
  backLabel,
  children,
}: {
  onClose: Handler
  background?: string
  z?: number
  /** lighten the corner "Back to the building" link for dark chapters */
  dark?: boolean
  /** override the corner affordance's wording (defaults to "← Back to the building") */
  backLabel?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: z, overflowY: 'auto', overflowX: 'hidden', background, animation: 'veilIn 700ms ease both' }}>
      <El
        onClick={onClose}
        style={{ position: 'fixed', top: 'clamp(20px,3vh,34px)', right: 'clamp(20px,3vw,40px)', zIndex: 6, fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: dark ? 'rgba(246,239,228,0.55)' : 'rgba(43,39,35,0.5)', cursor: 'pointer', transition: 'color 400ms ease' }}
        hover={{ color: dark ? 'rgba(246,239,228,0.95)' : 'rgba(43,39,35,0.9)' }}
      >
        {backLabel ?? <>←&nbsp;Back to the building</>}
      </El>
      {children}
    </div>
  )
}

type Handler = (e?: React.MouseEvent) => void

/** A hairline vertical divider — the house's breath between sections. */
export function Divider({ h = 'clamp(52px,9vh,96px)', m = 'clamp(56px,9vh,100px) auto' }: { h?: string; m?: string }) {
  return <div style={{ width: 1, height: h, margin: m, background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
}

/** The small brass arch mark used to head chapters. */
export function ArchMark({ size = 26, stroke = '#9c7a3f', width = 1.8, opacity = 0.8, margin = '0 auto 1.5em' }: { size?: number; stroke?: string; width?: number; opacity?: number; margin?: string }) {
  return (
    <svg width={size} height={(size * 30) / 26} viewBox="0 0 48 56" fill="none" style={{ display: 'block', margin, opacity }}>
      <path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke={stroke} strokeWidth={width} fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** The "Back to the building" pill button used at the foot of chapters. */
export function BackPill({ onClose, label = 'Back to the building' }: { onClose: Handler; label?: string }) {
  return (
    <El
      onClick={onClose}
      style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', border: '1px solid rgba(43,39,35,0.3)', borderRadius: 2, padding: '13px 28px', cursor: 'pointer' }}
      hover={{ borderColor: 'rgba(43,39,35,0.8)', color: '#2b2723' }}
    >
      {label}
    </El>
  )
}
