import { useState, CSSProperties } from 'react'

/**
 * FacadePhoto — the arrival photograph.
 *
 * Renders /photos/facade.png (the limestone doorway) full-bleed when it exists,
 * and quietly removes itself if the file isn't there — revealing the CSS
 * limestone doorway beneath as a faithful fallback. Drop the real photograph
 * into public/photos/facade.png and the arrival matches the design exactly, with
 * no code change.
 */
export function FacadePhoto({ src = '/photos/facade.png', style, onStatus }: { src?: string; style?: CSSProperties; onStatus?: (present: boolean) => void }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      onLoad={() => onStatus?.(true)}
      onError={() => { setFailed(true); onStatus?.(false) }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '50% 46%',
        transform: 'scale(1.03)',
        transformOrigin: '50% 46%',
        ...style,
      }}
    />
  )
}
