import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { palette } from '../lib/palette'
import type { Article, Block } from '../journal/types'
import { DEFAULT_AUTHOR, articleBySlug } from '../journal/articles'

/**
 * ArticleView — the single, reusable editorial template behind every Believe
 * Beyond Borders piece. One renderer, data-driven: an essay and a founder
 * story share the same spine; `kind: 'founder-story'` turns on the portrait,
 * name/brand/location, quotation, and brand link. Long-form body is composed
 * from simple blocks (text, heading, pull quote, image+caption, brand link).
 *
 * Cinematic photography for the hero (never the watercolor, which belongs to
 * the journal landing). Where a real photograph is not yet placed, a quiet
 * temporary treatment stands in — no unrelated stock image is shown as final.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)',
}
const surface: CSSProperties = {
  animation: 'fadeUpSoft 1100ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: 'entry 2% cover 26%' as unknown as string,
}
const bodyText: CSSProperties = {
  fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,23px)', lineHeight: 1.78,
  color: 'rgba(43,39,35,0.82)', maxWidth: '62ch', margin: '0 auto', ...pretty,
}

/** The cinematic hero — a real photograph, or a calm temporary treatment. */
function Hero({ a }: { a: Article }) {
  return (
    <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', height: 'clamp(300px,54vh,620px)', overflow: 'hidden', background: 'linear-gradient(135deg,#e9dec6,#efe6d3 55%,#e3d7bd)' }}>
      {a.hero
        ? <ImageSlot src={a.hero} alt={a.heroAlt || a.title} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        : (
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.5)' }}>Photography to come</div>
          </div>
        )}
      {/* a soft settle into the cream page beneath */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.06) 0%, transparent 24%, transparent 64%, rgba(239,230,211,0.85) 94%, #efe6d3 100%)' }} />
    </div>
  )
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case 'heading':
      return <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,40px)', lineHeight: 1.14, color: '#2b2723', maxWidth: '30ch', margin: 'clamp(44px,7vh,80px) auto clamp(18px,2.6vh,26px)', ...balance }}>{b.text}</h3>
    case 'pullquote':
      return (
        <figure style={{ margin: 'clamp(48px,8vh,96px) auto', maxWidth: 'min(92%,640px)', textAlign: 'center' }}>
          <div aria-hidden="true" style={{ width: 40, height: 1, margin: '0 auto clamp(22px,3.4vh,32px)', background: 'rgba(122,94,52,0.5)' }} />
          <blockquote style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(26px,3.6vw,46px)', lineHeight: 1.26, color: palette.navy, margin: 0, ...balance }}>{b.text}</blockquote>
          {b.cite && <figcaption style={{ ...label, fontSize: 10, letterSpacing: '0.34em', marginTop: 'clamp(18px,2.8vh,26px)' }}>{b.cite}</figcaption>}
        </figure>
      )
    case 'image':
      return (
        <figure style={{ margin: 'clamp(44px,7vh,88px) auto', width: 'min(100%,900px)' }}>
          <div style={{ width: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: '0 40px 80px -56px rgba(60,44,20,0.5)' }}>
            <ImageSlot src={b.src} alt={b.alt} fit="cover" style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
          {b.caption && <figcaption style={{ fontFamily: sans, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(12px,1.4vw,14px)', color: 'rgba(43,39,35,0.6)', textAlign: 'center', marginTop: 'clamp(12px,1.8vh,18px)', letterSpacing: '0.02em' }}>{b.caption}</figcaption>}
        </figure>
      )
    case 'brandLink':
      return (
        <div style={{ textAlign: 'center', margin: 'clamp(40px,6vh,72px) auto 0' }}>
          <El as="a" href={b.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', borderBottom: '1px solid rgba(122,94,52,0.5)', paddingBottom: 6, textDecoration: 'none', cursor: 'pointer' }} hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}>{b.label} &rarr;</El>
        </div>
      )
    default:
      return <p style={{ ...bodyText, margin: 'clamp(22px,3.4vh,30px) auto 0' }}>{b.text}</p>
  }
}

export function ArticleView({ ctx, article, slug }: { ctx: Ctx; article?: Article; slug?: string | null }) {
  const a = article || articleBySlug(slug)
  if (!a) return null
  const author = a.author || DEFAULT_AUTHOR

  return (
    <ChapterShell onClose={ctx.openJournal} background="#efe6d3" z={130} backLabel={<>&larr;&nbsp;Believe Beyond Borders</>}>
      <Hero a={a} />

      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(40px,7vh,84px) 7vw clamp(72px,12vh,150px)', color: '#2b2723', textAlign: 'center', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* opening — location + chapter, title, subtitle, byline */}
        <div style={{ ...label, marginBottom: 'clamp(20px,3vh,28px)' }}>
          {[a.founder?.location, a.chapter].filter(Boolean).join(' · ')}
        </div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5.4vw,74px)', lineHeight: 1.04, margin: '0 auto', maxWidth: '20ch', ...balance }}>{a.title}</h2>
        {a.subtitle && <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.38, color: 'rgba(122,94,52,0.84)', margin: 'clamp(18px,2.6vh,26px) auto 0', maxWidth: '34ch', ...balance }}>{a.subtitle}</p>}
        <div style={{ ...label, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(122,94,52,0.6)', marginTop: 'clamp(24px,3.6vh,34px)' }}>By {author} &middot; {a.date}</div>

        {/* founder story — the portrait, the person, a quotation, the brand */}
        {a.kind === 'founder-story' && a.founder && (
          <div style={{ margin: 'clamp(48px,8vh,96px) auto 0', ...surface }}>
            <div style={{ width: 'min(70%,320px)', margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '48% 48% 6px 6px / 34% 34% 5px 5px', boxShadow: '0 44px 84px -54px rgba(60,44,20,0.6)' }}>
                <ImageSlot src={a.founder.portrait} alt={a.founder.portraitAlt || a.founder.name} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              </div>
            </div>
            <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1.1, marginTop: 'clamp(26px,4vh,40px)' }}>{a.founder.name}</div>
            <div style={{ ...label, fontSize: 10, letterSpacing: '0.3em', marginTop: '0.9em' }}>{[a.founder.brand, a.founder.location].filter(Boolean).join(' · ')}</div>
          </div>
        )}

        {/* the long-form body */}
        <div style={{ marginTop: 'clamp(48px,8vh,96px)', textAlign: 'left', ...surface }}>
          {a.body.map((b, i) => <BlockView key={i} b={b} />)}
        </div>

        {/* related */}
        {a.related && a.related.length > 0 && (
          <div style={{ marginTop: 'clamp(72px,12vh,150px)' }}>
            <div aria-hidden="true" style={{ width: 1, height: 'clamp(44px,7vh,80px)', margin: '0 auto clamp(30px,5vh,50px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
            <div style={{ ...label, marginBottom: 'clamp(24px,3.6vh,34px)' }}>Related</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.2vh,20px)' }}>
              {a.related.map((rs) => {
                const r = articleBySlug(rs)
                if (!r) return null
                return (
                  <El as="button" key={rs} onClick={ctx.openArticle(rs)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: serif, fontWeight: 400, fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.15, color: '#2b2723' }} hover={{ color: 'rgba(122,94,52,0.95)' }}>{r.title} &rarr;</El>
                )
              })}
            </div>
          </div>
        )}

        {/* return paths */}
        <div aria-hidden="true" style={{ width: 1, height: 'clamp(44px,7vh,80px)', margin: 'clamp(72px,12vh,150px) auto clamp(30px,5vh,50px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: '0.6em 1.4em' }}>
          <El as="button" onClick={ctx.openJournal} style={{ background: 'none', border: 'none', cursor: 'pointer', ...label, color: 'rgba(122,94,52,0.8)' }} hover={{ color: '#2b2723' }}>&larr;&nbsp;Believe Beyond Borders</El>
          <span aria-hidden="true" style={{ color: 'rgba(122,94,52,0.38)', fontSize: 10 }}>&middot;</span>
          <El as="button" onClick={ctx.openLibrary} style={{ background: 'none', border: 'none', cursor: 'pointer', ...label, color: 'rgba(122,94,52,0.8)' }} hover={{ color: '#2b2723' }}>The Library</El>
        </div>
      </div>
    </ChapterShell>
  )
}
