import React, { CSSProperties } from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, ArchMark, Divider } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { PHOTOS } from '../data'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

export const BELIEVE_RADAR_URL = 'https://believeradar.com'

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)',
}

/**
 * The Observatory — a short introduction to Believe Radar, the market and
 * retail intelligence platform. It does not duplicate Radar; it introduces it
 * and opens its own site in a new tab. (ctx.openObservatory.)
 */
export function ObservatoryChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeObservatory} background="#efe6d3" z={120}>
      <div style={{ position: 'relative', maxWidth: 1060, margin: '0 auto', padding: 'clamp(76px,12vh,150px) 5vw clamp(70px,12vh,150px)', textAlign: 'center', color: palette.ink, animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.3em' }}>The Observatory</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.2vw,86px)', lineHeight: 1.02, margin: '0 0 0.4em' }}>Believe Radar</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>Market and retail intelligence for founders.</p>

        <div style={{ width: 'min(96%,1000px)', margin: 'clamp(34px,6vh,60px) auto 0' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden', borderRadius: '999px 999px 8px 8px', boxShadow: '0 64px 120px -60px rgba(60,44,20,0.7)' }}>
            <ImageSlot src={PHOTOS.observatory} alt="The Observatory: a deep-navy study with brass instruments and a telescope at a great arched window onto a twilight sky and the landscape below" fit="cover" placeholder="an observatory study: navy shelving, a brass telescope, celestial charts, a great arched window onto a twilight sky and the city below" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 60% at 40% 22%, rgba(255,232,180,0.4), transparent 68%)' }} />
          </div>
        </div>

        <Divider h="clamp(32px,5vh,58px)" m="clamp(38px,6vh,68px) auto clamp(24px,4vh,38px)" />

        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,27px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.8)', maxWidth: '40ch', margin: '0 auto', ...balance }}>From the Observatory, a founder can see the landscape clearly: where the brand stands, where its people are, and which moves are worth making next.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', maxWidth: '46ch', margin: 'clamp(26px,4vh,40px) auto 0', ...pretty }}>Believe Radar replaces guesswork with clarity. It lives on its own, and the work continues there.</p>

        <a
          href={BELIEVE_RADAR_URL}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-block', marginTop: 'clamp(44px,8vh,80px)', fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase', color: palette.linen, background: palette.navy, border: `1px solid ${palette.navy}`, borderRadius: 2, padding: '15px 34px', cursor: 'pointer' }}
        >
          Visit Believe Radar &rarr;
        </a>

        <Divider h="clamp(38px,6vh,62px)" m="clamp(52px,8vh,96px) auto clamp(28px,4vh,44px)" />
        <div style={{ textAlign: 'center' }}><RoomNav ctx={ctx} slug="" /></div>
      </div>
    </ChapterShell>
  )
}
