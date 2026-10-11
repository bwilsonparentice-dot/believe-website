import React, { useEffect, useRef } from 'react'
import type { Ctx } from '../lib/ctx'
import { HouseIndex } from './HouseIndex'

/**
 * The House Index, opened from the persistent "Explore the House" control and
 * the mobile Menu. The immersive bronze plaque on fluted travertine fills the
 * overlay; the House stays warmly present rather than a cold modal. Closing
 * returns the visitor exactly where they were; choosing a room carries them in.
 * Dismissable by the brass ×, the Escape key, or clicking outside the plaque.
 */
export function DirectoryOverlay({ ctx, onClose }: { ctx: Ctx; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    window.addEventListener('keydown', onKey, true)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="The House"
      style={{ position: 'fixed', inset: 0, zIndex: 130, overflow: 'hidden', animation: 'veilIn 420ms ease both' }}
    >
      <HouseIndex ctx={ctx} onNavigate={onClose} variant="overlay" />

      <button
        ref={closeRef}
        onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClose() }}
        aria-label="Close the House Index"
        onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(236,209,147,0.8)' }}
        onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = 'rgba(236,209,147,0.9)'; e.currentTarget.style.borderColor = 'rgba(236,209,147,0.5)' }}
        style={{ position: 'fixed', top: 'clamp(16px,3vh,30px)', right: 'clamp(16px,3vw,34px)', zIndex: 8, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(236,209,147,0.5)', background: 'rgba(20,15,9,0.5)', color: 'rgba(236,209,147,0.9)', fontFamily: "'Jost',sans-serif", fontSize: 20, lineHeight: 1, cursor: 'pointer', transition: 'color 300ms ease, border-color 300ms ease', WebkitBackdropFilter: 'blur(3px)', backdropFilter: 'blur(3px)' }}
      >
        &times;
      </button>
    </div>
  )
}
