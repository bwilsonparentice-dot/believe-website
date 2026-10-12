import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { BeyondBordersHero } from './BeyondBordersHero'
import { palette } from '../lib/palette'

/**
 * JournalFeature — the restrained preview of Believe Beyond Borders inside The
 * Library. A smaller rendering of the signature watercolor (its full openness
 * is reserved for the journal landing), with a live label, a one-line teaser,
 * and the way in. The title is set within the artwork, so it is not duplicated
 * here.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

export function JournalFeature({ ctx }: { ctx: Ctx }) {
  return (
    <section aria-label="Believe Beyond Borders" style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.46em', textTransform: 'uppercase', color: palette.olive, marginBottom: 'clamp(22px,3.4vh,32px)' }}>Featured Journal</div>

      {/* the restrained preview — a smaller cover; openness is kept for the landing */}
      <El as="button" onClick={ctx.openJournal} aria-label="Enter Believe Beyond Borders" style={{ display: 'block', width: '100%', maxWidth: 560, margin: '0 auto', padding: 0, background: 'none', border: 'none', cursor: 'pointer' }} hover={{}}>
        <BeyondBordersHero variant="preview" />
      </El>

      <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.74)', maxWidth: '40ch', margin: 'clamp(28px,4.4vh,44px) auto 0', textWrap: 'pretty' as CSSProperties['textWrap'] }}>An exploration of remarkable people, unexpected places, and the ideas that connect us.</p>

      <El as="button" onClick={ctx.openJournal} style={{ display: 'inline-block', margin: 'clamp(26px,4vh,40px) auto 0', fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', background: 'none', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.5)', paddingBottom: 6, cursor: 'pointer' }} hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}>Enter the Journal &rarr;</El>
    </section>
  )
}
