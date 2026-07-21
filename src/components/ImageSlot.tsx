import React, { CSSProperties, useState } from 'react'

/**
 * ImageSlot — the production replacement for the prototype's drag-and-drop
 * <image-slot> web component.
 *
 * If a real photograph is supplied (place files under /public/photos and pass
 * `src`), it is shown. Otherwise a warm, quiet placeholder stands in its
 * place — an arched pane of morning light carrying the art-direction note,
 * so the house still feels furnished before the photography arrives.
 *
 * The founder fills real photography in later; nothing about the layout,
 * framing, or motion depends on the image itself.
 */
export function ImageSlot({
  src,
  placeholder,
  alt,
  tint,
  fit = 'cover',
  showNote = false,
  style,
}: {
  src?: string
  placeholder?: string
  alt?: string
  /** a per-room wash so each placeholder carries the room's own light */
  tint?: string
  fit?: 'cover' | 'contain'
  /** show the art-direction note in the empty pane (off by default to keep heroes clean) */
  showNote?: boolean
  style?: CSSProperties
}) {
  const [failed, setFailed] = useState(false)
  const has = src && !failed

  if (has) {
    return (
      <img
        src={src}
        alt={alt || ''}
        onError={() => setFailed(true)}
        style={{ objectFit: fit, objectPosition: 'center', ...style, display: 'block' }}
      />
    )
  }

  const wash =
    tint ||
    'radial-gradient(120% 90% at 34% 22%, rgba(255,246,224,0.95), transparent 55%), linear-gradient(158deg, #efe6d3, #e4d9c1 56%, #d9ccb0)'

  return (
    <div
      aria-label={alt || placeholder}
      style={{
        ...style,
        background: wash,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* a soft shaft of light, so the empty pane still breathes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'soft-light',
          background:
            'radial-gradient(60% 54% at 40% 26%, rgba(255,238,196,0.5), transparent 70%)',
        }}
      />
      {placeholder && showNote && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(20px,4vw,42px)',
            maxWidth: '32ch',
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(14px,1.5vw,19px)',
            lineHeight: 1.5,
            color: 'rgba(43,39,35,0.42)',
          }}
        >
          {placeholder}
        </div>
      )}
    </div>
  )
}
