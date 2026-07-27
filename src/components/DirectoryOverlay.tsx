import React, { useEffect, useRef } from 'react'
import { stop } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { DirectoryPlaque } from './DirectoryPlaque'

/**
 * The House Directory, opened from the persistent control. It feels like
 * turning toward the brass plaque mounted in the entrance hall — the House
 * stays warmly visible behind it rather than a cold black modal. Closing
 * returns the visitor to exactly where they were; choosing a room carries them
 * straight in. Dismissable by the brass ×, the Escape key, or clicking outside.
 */
export function DirectoryOverlay({ ctx, onClose }: { ctx: Ctx; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    window.addEventListener('keydown', onKey, true)
    // move focus to the close control so the overlay is keyboard-navigable
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="The House Directory"
      style={{
        position: 'fixed', inset: 0, zIndex: 130, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(20px,5vh,64px) clamp(16px,5vw,80px)', overflowY: 'auto',
        // a warm shadowed interior, never a cold black backdrop
        background: 'radial-gradient(120% 100% at 50% 40%, rgba(28,20,10,0.72), rgba(14,10,6,0.9))',
        backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
        animation: 'veilIn 420ms ease both',
      }}
    >
      <div onClick={stop} style={{ position: 'relative', width: 'min(1120px, 96vw)', margin: 'auto' }}>
        <div style={{ textAlign: 'center', margin: '0 auto clamp(20px,3vh,36px)' }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.72)', margin: 0 }}>The House Directory</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.7vw,22px)', color: 'rgba(246,239,228,0.66)', margin: '0.9em 0 0' }}>Return to any room whenever you need it.</p>
        </div>

        <DirectoryPlaque ctx={ctx} onNavigate={onClose} />

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(246,239,228,0.4)', textAlign: 'center', margin: 'clamp(20px,3vh,34px) 0 0' }}>The house is always open.</p>
      </div>

      {/* the brass × — close and return to where you were */}
      <button
        ref={closeRef}
        onClick={(e: React.MouseEvent) => { stop(e); onClose() }}
        aria-label="Close the directory"
        onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(236,209,147,0.8)' }}
        onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = 'rgba(236,209,147,0.85)'; e.currentTarget.style.borderColor = 'rgba(236,209,147,0.42)' }}
        style={{ position: 'fixed', top: 'clamp(16px,3vh,30px)', right: 'clamp(16px,3vw,34px)', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(236,209,147,0.42)', background: 'rgba(20,15,9,0.4)', color: 'rgba(236,209,147,0.85)', fontFamily: "'Jost',sans-serif", fontSize: 20, lineHeight: 1, cursor: 'pointer', transition: 'color 300ms ease, border-color 300ms ease' }}
      >
        &times;
      </button>
    </div>
  )
}
