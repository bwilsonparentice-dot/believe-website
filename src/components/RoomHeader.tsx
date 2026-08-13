import React, { CSSProperties } from 'react'
import { ArchMark } from './ChapterShell'

/**
 * RoomHeader — the quiet header grammar shared across the rooms of The House:
 *
 *   small brass arch mark
 *   small uppercase eyebrow / room descriptor
 *   large editorial serif room name
 *   short italic descriptor
 *
 * It exists as *page architecture* — standing on the cream ground above the
 * room's photograph — rather than as text laid over an image. This is what
 * lets a room title belong to the House instead of depending on an overlay.
 *
 * It is a rhythm, not a rigid template: a page whose existing composition is
 * stronger should keep it. Type scale is tunable per room via `titleSize` so
 * the header can be a room's largest gesture (a hero) or a quieter mark,
 * without inventing new fonts or tokens.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"

export function RoomHeader({
  eyebrow,
  title,
  descriptor,
  titleSize = 'clamp(40px,6vw,90px)',
  mark = true,
  style,
}: {
  eyebrow?: string
  title: string
  descriptor?: string
  /** the room name's type scale; default is hero-sized */
  titleSize?: string
  /** show the small brass arch mark above the eyebrow */
  mark?: boolean
  style?: CSSProperties
}) {
  const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
  return (
    <div style={{ textAlign: 'center', color: '#2b2723', ...style }}>
      {mark && <ArchMark width={2.2} margin="0 auto 1.5em" />}
      {eyebrow && (
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '1.4em' }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: titleSize, lineHeight: 1.01, margin: 0 }}>{title}</h2>
      {descriptor && (
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.5vw,31px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0.5em auto 0', maxWidth: '24ch', ...balance }}>
          {descriptor}
        </p>
      )}
    </div>
  )
}
