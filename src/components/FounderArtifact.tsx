import React, { CSSProperties } from 'react'
import { ImageSlot } from './ImageSlot'
import type { FounderArtifact as FounderArtifactData } from '../data'

const serif = "'Cormorant Garamond',serif"

// rendered maximum width of the photograph by intent — the surrounding stone,
// not scale, carries the emotional weight
const MAXW: Record<NonNullable<FounderArtifactData['size']>, number> = {
  intimate: 760,
  standard: 980,
  cinematic: 1240,
}

/**
 * FounderArtifact — a piece of the House Collection. A founder's story, once
 * told, leaves a brass plaque behind, embedded in the limestone of the House.
 * It is not a logo, a credential, or a card: it is an architectural artifact,
 * discovered while moving through the page. Full-width and generous, with no
 * frame, no card, no shadow, no overlay — the photograph is the whole object,
 * and its warm stone dissolves into the cream of the page. Reused for every
 * future founder; individuality lives in each unique photograph.
 */
// target on-screen height per size, so portrait and landscape plaques share a
// consistent presence rather than tall images dwarfing wide ones
const MAXH_VH: Record<NonNullable<FounderArtifactData['size']>, number> = {
  intimate: 66,
  standard: 80,
  cinematic: 88,
}

export function FounderArtifact({ artifact }: { artifact: FounderArtifactData }) {
  const { image, alt, caption, secondaryCaption, aspectRatio = '3 / 2', alignment = 'center', size = 'standard', placeholder, founder } = artifact
  const maxW = MAXW[size]

  // the photo's width/height ratio, so we can cap by height too (a tall plaque
  // would otherwise run far past the viewport at full cinematic width)
  const [rw, rh] = aspectRatio.split('/').map((s) => parseFloat(s.trim()))
  const ratio = rw && rh ? rw / rh : 1
  const boxWidth = `min(92vw, ${maxW}px, ${(MAXH_VH[size] * ratio).toFixed(1)}vh)`

  // a quiet, composed asymmetry — never centered by default for every plaque
  const offset: CSSProperties =
    alignment === 'right' ? { marginLeft: 'auto', marginRight: 0 }
    : alignment === 'left' ? { marginLeft: 0, marginRight: 'auto' }
    : { marginLeft: 'auto', marginRight: 'auto' }

  // the same restrained reveal used across the house: a soft fade with a small
  // rise, scroll-triggered, and silenced automatically under prefers-reduced-motion
  const reveal: CSSProperties = {
    animation: 'fadeUpSoft 1100ms ease both',
    animationTimeline: 'view()' as unknown as string,
    animationRange: 'entry 8% cover 30%' as unknown as string,
  }

  return (
    <section
      aria-label={`${founder} — the House Collection`}
      style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', padding: '0 clamp(16px,5vw,90px)', boxSizing: 'border-box' }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <figure style={{ margin: 0, width: boxWidth, ...offset, ...reveal }}>
          {/* the photograph itself — intrinsic ratio, no crop of the architecture */}
          <div style={{ position: 'relative', width: '100%', aspectRatio }}>
            <ImageSlot
              src={image}
              alt={alt}
              placeholder={placeholder}
              showNote
              fit="cover"
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          </div>

          {(caption || secondaryCaption) && (
            <figcaption style={{ marginTop: 'clamp(22px,3.4vh,38px)', textAlign: alignment === 'center' ? 'center' : 'left' }}>
              {caption && (
                <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(20px,2.2vw,29px)', lineHeight: 1.1, color: 'rgba(43,39,35,0.82)' }}>{caption}</div>
              )}
              {secondaryCaption && (
                <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.72)', marginTop: '0.4em' }}>{secondaryCaption}</div>
              )}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  )
}
