import React, { CSSProperties, ReactNode } from 'react'

/**
 * HouseArch — the canonical architectural opening of The House.
 *
 * One arch geometry, shared across the important rooms, so that every room
 * photograph reads as a doorway *into the same building* rather than a
 * web-card that happens to be rounded. The shape is measured from the real
 * door on the facade (see RealDoor.tsx): an elliptical arched top, straight
 * vertical sides, and a grounded, near-square base.
 *
 * It is deliberately NOT a pill (the base stays square), NOT a stadium (the
 * sides are straight and the top is a controlled ellipse, not a full
 * semicircle), and NOT a card (there is no outer drop shadow — only a soft
 * inner recess, the thickness of the opening). The crop itself is the
 * transition; no cream gradient is needed to dissolve the photo into the page.
 *
 * Two sanctioned scales, clearly the same family:
 *   standard  — primary room photography (Founder's Room, Library)
 *   intimate  — smaller, more private moments
 *
 * Pass a single child positioned to fill the frame (an <ImageSlot> or <img>
 * with position:absolute; inset:0; object-fit:cover). Nothing about the layout
 * depends on the image being present — an empty ImageSlot degrades to its warm
 * arched placeholder, still in the arch.
 */
type Scale = 'standard' | 'intimate'

const GEOMETRY: Record<Scale, { ratio: string; maxW: number; radius: string }> = {
  standard: { ratio: '4 / 5', maxW: 620, radius: '48% 48% 5px 5px / 34% 34% 4px 4px' },
  intimate: { ratio: '5 / 6', maxW: 440, radius: '48% 48% 5px 5px / 32% 32% 4px 4px' },
}

export function HouseArch({
  children,
  scale = 'standard',
  width,
  light = 'radial-gradient(58% 52% at 38% 24%, rgba(255,226,178,0.30), transparent 70%)',
  style,
}: {
  /** an <ImageSlot> or <img> positioned to fill the frame (inset:0, object-fit:cover) */
  children: ReactNode
  scale?: Scale
  /** override the frame width; defaults to min(88vw, <scale max>) */
  width?: string
  /** the soft warm shaft of light over the photo; pass null to omit */
  light?: string | null
  style?: CSSProperties
}) {
  const g = GEOMETRY[scale]
  return (
    <div
      style={{
        position: 'relative',
        width: width || `min(88vw, ${g.maxW}px)`,
        aspectRatio: g.ratio,
        margin: '0 auto',
        borderRadius: g.radius,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}

      {/* the warm light of the room, laid into the photograph */}
      {light && (
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: light }}
        />
      )}

      {/* the thickness of the opening — a soft inner recess so the arch reads as
          cut into the wall, not stuck on top of it. Never an outer drop shadow. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: g.radius,
          boxShadow: 'inset 0 0 0 1px rgba(74,56,32,0.12), inset 0 20px 46px -26px rgba(20,14,7,0.5)',
        }}
      />
    </div>
  )
}
