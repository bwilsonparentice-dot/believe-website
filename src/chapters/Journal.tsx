import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { ArticleView } from '../components/ArticleView'
import { BeyondBordersHero } from '../components/BeyondBordersHero'
import { palette } from '../lib/palette'
import { DESTINATIONS } from '../journal/destinations'
import { articleBySlug, articlesForDestination } from '../journal/articles'

/**
 * Believe Beyond Borders — the journal landing, the signature destination of
 * The Library. The watercolor world map is the hero, given room to breathe
 * (its lightness preserved; never cropped or darkened). Beneath it the journal
 * concept, then the chapters, organized by destination. A chapter with no
 * published stories shows a quiet "arriving" state — never a placeholder.
 *
 * When an article is open (/journal/<slug>) this surface renders ArticleView
 * for that piece instead of the landing.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.46em',
  textTransform: 'uppercase', color: palette.olive,
}
const surface = (range = 'entry 3% cover 26%'): CSSProperties => ({
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

/** One chapter, by destination — its index of stories, or a quiet arriving note. */
function Chapter({ ctx, id }: { ctx: Ctx; id: string }) {
  const d = DESTINATIONS.find((x) => x.id === id)
  if (!d) return null
  const stories = articlesForDestination(id)
  return (
    <section style={{ marginTop: 'clamp(72px,12vh,150px)', ...surface() }}>
      <div style={{ ...label, marginBottom: 'clamp(16px,2.4vh,22px)' }}>{d.chapter}</div>
      <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.8vw,68px)', lineHeight: 1.04, margin: '0 auto', maxWidth: '16ch', ...balance }}>{d.label}</h3>

      {/* a calm, warm chapter image — a temporary treatment until real
          photography exists; no unrelated stock photo is shown as editorial */}
      <div style={{ width: 'min(94%,760px)', margin: 'clamp(34px,6vh,64px) auto 0' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', borderRadius: 5, overflow: 'hidden', background: 'linear-gradient(135deg,#e7dcc4,#efe6d3 52%,#e3d7bd)', boxShadow: '0 40px 80px -56px rgba(60,44,20,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.5)' }}>Florence &middot; photography to come</div>
        </div>
      </div>

      <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.45, color: 'rgba(122,94,52,0.84)', margin: 'clamp(28px,4.6vh,44px) auto 0', maxWidth: '26ch', ...balance }}>{d.intro}</p>

      {stories.length === 0 ? (
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.8vw,21px)', lineHeight: 1.6, letterSpacing: '0.02em', color: 'rgba(43,39,35,0.6)', margin: 'clamp(26px,4vh,38px) auto 0', ...balance }}>Arriving {d.date}.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3.4vh,34px)', maxWidth: 620, margin: 'clamp(40px,6.5vh,72px) auto 0' }}>
          {stories.map((s) => (
            <El as="button" key={s.slug} onClick={ctx.openArticle(s.slug)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }} hover={{}}>
              {s.kind === 'founder-story' && s.founder && <div style={{ ...label, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(122,94,52,0.6)', marginBottom: '0.7em' }}>{s.founder.location}</div>}
              <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3vw,36px)', lineHeight: 1.12, color: '#2b2723' }}>{s.title}</div>
              {s.subtitle && <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,21px)', color: 'rgba(122,94,52,0.8)', marginTop: '0.5em' }}>{s.subtitle}</div>}
            </El>
          ))}
        </div>
      )}
    </section>
  )
}

export function Journal({ ctx, articleSlug }: { ctx: Ctx; articleSlug?: string | null }) {
  // an open article takes over the surface (it brings its own shell)
  const open = articleBySlug(articleSlug)
  if (open) return <ArticleView ctx={ctx} article={open} />

  return (
    <ChapterShell onClose={ctx.openLibrary} background="#efe6d3" z={130} backLabel={<>&larr;&nbsp;The Library</>}>
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: 'clamp(72px,12vh,150px) 7vw clamp(72px,12vh,150px)', color: '#2b2723', textAlign: 'center', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* the signature artwork — the hero, given openness and light. The title
            and subtitle are set within the artwork; we do not duplicate them.
            (When a text-free version is supplied, this becomes a calm background
            with the title rendered as live typography.) */}
        <h1 className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>Believe Beyond Borders. A Journal of People, Places, and Possibility.</h1>
        <div style={{ width: '100%', maxWidth: 1040, margin: '0 auto' }}>
          <BeyondBordersHero variant="landing" />
        </div>

        {/* the journal introduction */}
        <div style={{ marginTop: 'clamp(44px,7.5vh,88px)', ...surface('entry 0% cover 24%') }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.6vw,48px)', lineHeight: 1.16, color: '#2b2723', margin: '0 auto', maxWidth: '20ch', ...balance }}>Every journey begins with curiosity.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72, color: 'rgba(43,39,35,0.76)', margin: 'clamp(30px,5vh,52px) auto 0', maxWidth: '52ch', ...pretty }}>Believe Beyond Borders is an exploration of remarkable people, unexpected places, and the ideas that connect us. A journal shaped by the founders we meet, the stories we discover, and the possibilities that emerge when we look beyond what&rsquo;s familiar.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.9)', margin: 'clamp(26px,4.4vh,40px) auto 0', ...balance }}>Our first chapter begins in Florence.</p>
        </div>

        {/* the chapters */}
        {DESTINATIONS.map((d) => <Chapter key={d.id} ctx={ctx} id={d.id} />)}

        {/* a quiet line home — one subtle connection back to the studio */}
        <div aria-hidden="true" style={{ width: 1, height: 'clamp(48px,8vh,88px)', margin: 'clamp(80px,13vh,160px) auto clamp(34px,5.5vh,56px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.66)', margin: '0 auto clamp(26px,4vh,36px)', maxWidth: '30ch', ...balance }}>An editorial journal from Believe Studio.</p>
        <El as="button" onClick={ctx.openLibrary} style={{ background: 'none', border: 'none', cursor: 'pointer', ...label, color: 'rgba(122,94,52,0.8)' }} hover={{ color: '#2b2723' }}>&larr;&nbsp;Return to The Library</El>
      </div>
    </ChapterShell>
  )
}
