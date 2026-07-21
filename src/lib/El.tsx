import React, { useState, CSSProperties } from 'react'

/**
 * El — an element that can carry a `hover` style, mirroring the design
 * source's `style-hover` attribute. Keeps the ported markup close to the
 * original while staying pure React. Use for any element that had a
 * `style-hover` in the reference; a plain <div> is fine otherwise.
 */
type ElProps = {
  as?: keyof React.JSX.IntrinsicElements
  style?: CSSProperties
  hover?: CSSProperties
  children?: React.ReactNode
} & Record<string, unknown>

export function El({ as = 'div', style, hover, children, onMouseEnter, onMouseLeave, ...rest }: ElProps) {
  const [h, setH] = useState(false)
  const Tag = as as React.ElementType
  return (
    <Tag
      style={hover && h ? { ...style, ...hover } : style}
      onMouseEnter={(e: React.MouseEvent) => { if (hover) setH(true); (onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e) }}
      onMouseLeave={(e: React.MouseEvent) => { if (hover) setH(false); (onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e) }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Stop a click from bubbling to a backdrop close handler. */
export const stop = (e: React.MouseEvent) => e.stopPropagation()
