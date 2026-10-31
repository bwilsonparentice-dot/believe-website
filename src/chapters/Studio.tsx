import React, { CSSProperties, useEffect } from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { PHOTOS } from '../data'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)',
}

/** the URL hash as a bare, sanitised element id, or '' */
function hashAnchorFromUrl(): string {
  if (typeof window === 'undefined') return ''
  try { return (window.location.hash || '').replace(/^#/, '').replace(/[^a-zA-Z0-9-]/g, '') } catch { return '' }
}

/** A gentle scroll-linked reveal — the atelier waking slowly in morning light. */
const surface = (range = 'entry 3% cover 26%'): CSSProperties => ({
  animation: 'fadeUpSoft 1300ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

// The reframe — demand built intentionally, channels reinforcing one another.
const SHIFT: [string, string][] = [
  ['How do we get into 500 stores?', 'Where do our ideal customers already gather?'],
  ['How do we get more shelf space?', 'How do we create more reasons to discover and choose us?'],
  ['How do we secure another distributor?', 'Which partnerships could create demand first?'],
  ['How do we increase promotions?', 'What experiences would make people remember us?'],
  ['How do we drive trial?', 'How do we turn trial into repeat purchase and advocacy?'],
]

const CHANNELS = ['Hospitality', 'Collaborations', 'Content', 'Community', 'Experiential discovery', 'Direct-to-consumer', 'Foodservice', 'Retail']

// The conditions for a passionate following — created intentionally, not promised.
const CONDITIONS: [string, string][] = [
  ['Shared identity', 'What people believe in beyond the product, and the first believers who gather around it.'],
  ['Rituals & experiences', 'The moments that bring people back.'],
  ['Participation', 'How people become part of the brand’s world, not just buyers of it.'],
  ['Meaningful partnerships', 'Collaborations that introduce the brand to the right communities.'],
  ['Advocacy', 'The reasons people introduce the brand to others.'],
  ['Repeat engagement', 'How affinity becomes repeat purchase and durable demand, not a one-time spike.'],
]

/**
 * The Studio — the creative heart of Believe. Where a founder's positioning,
 * brand world, and next move are built, and where the studio's point of view
 * lives: demand before distribution, and belonging over audience. Not a
 * portfolio or a catalogue of tools. (ctx.openStudioPage.)
 */
export function StudioChapter({ ctx, anchor }: { ctx: Ctx; anchor?: string }) {
  // When the page is opened to a named section (from the homepage "Explore our
  // approach" link or a /studio#… deep link), scroll to it once the section has
  // rendered. We wait for layout with requestAnimationFrame rather than an
  // arbitrary timeout, and honour reduced-motion by jumping instead of gliding.
  useEffect(() => {
    const target = anchor || hashAnchorFromUrl()
    if (!target) return
    let raf1 = 0, raf2 = 0
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = document.getElementById(target)
        if (!el) return
        let reduce = false
        try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { /* default to motion */ }
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      })
    })
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
  }, [anchor])
  return (
    <ChapterShell onClose={ctx.closeStudioPage} background="#efe6d3" z={120}>
      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 7vw clamp(42px,7.5vh,92px)', textAlign: 'center', color: palette.ink, animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>
        {/* ── the hero ──────────────────────────────────────────────────── */}
        <div style={{ ...label, marginBottom: '1.5em' }}>The Studio</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(42px,6.4vw,94px)', lineHeight: 1.0, margin: '0 0 0.42em' }}>The Studio</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.34, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '30ch', ...balance }}>Creative strategy. Meaningful&nbsp;connections. New possibilities.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,25px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.72)', margin: 'clamp(26px,4vh,40px) auto 0', maxWidth: '38ch', ...balance }}>Where we uncover what makes your brand matter, understand where it fits into people&rsquo;s lives, and shape your next move.</p>
      </div>

      {/* ── the workbench — an editorial still life ─────────────────────── */}
      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', height: 'clamp(340px,60vh,700px)', overflow: 'hidden', ...surface('entry 0% cover 14%') }}>
        <ImageSlot src={PHOTOS.studio} fit="cover" alt="An oak worktable in a warm workshop: tracing paper, a brass ruler, an open notebook, a packaging sketch in morning light" placeholder="a warm workshop: oak table, tracing paper, brass ruler, notebook, packaging sketch, coffee, morning light, no people" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'slowZoom 24s ease-out both' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 36% 22%, rgba(255,226,178,0.36), transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.08) 0%, transparent 26%, transparent 62%, rgba(239,230,211,0.72) 92%, #efe6d3 100%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: '0 7vw clamp(80px,15vh,190px)', textAlign: 'center', color: palette.ink }}>

        {/* ── what the Studio makes ─────────────────────────────────────── */}
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4.2vw,58px)', lineHeight: 1.14, color: palette.ink, margin: '0 auto', maxWidth: '18ch', ...balance, ...surface('entry 0% cover 24%') }}>A founder&rsquo;s imagination, made real.</p>

          {/* the defining question — the Studio's intellectual anchor, set apart
              as a quiet editorial centerpiece rather than another paragraph */}
          <div style={{ marginTop: 'clamp(32px,5.5vh,64px)', ...surface('entry 0% cover 22%') }}>
            <div aria-hidden="true" style={{ width: 1, height: 'clamp(26px,4vh,44px)', margin: '0 auto clamp(20px,3.2vh,32px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.5), transparent)' }} />
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.38, letterSpacing: '0.005em', color: palette.navy, margin: '0 auto', maxWidth: '26ch', ...balance }}>Beyond your logo and packaging, what makes your brand unmistakably yours?</p>
          </div>

          <div style={{ marginTop: 'clamp(32px,5.5vh,64px)', display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,30px)', ...surface() }}>
            {[
              'That question is where we begin. Together, we uncover the perspective and character at the heart of your brand, then bring it to life through creative strategy, storytelling, and experiences that connect with people.',
              'Some of it is shaped quietly at the worktable. Some becomes clearer in conversation. All of it is built around the founder, never templated.',
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.72)', margin: 0, maxWidth: '40ch', marginLeft: 'auto', marginRight: 'auto', ...pretty }}>{p}</p>
            ))}
          </div>
        </div>

        {/* ══ the point of view — demand before distribution ═══════════════ */}
        <div id="demand-before-distribution" style={{ scrollMarginTop: 'clamp(80px,12vh,120px)', marginTop: 'clamp(100px,18vh,212px)', textAlign: 'left', ...surface('entry 0% cover 22%') }}>
          <div style={{ ...label, marginBottom: '1.4em', textAlign: 'center' }}>The Believe approach</div>
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(28px,4.2vw,56px)', lineHeight: 1.08, color: palette.navy, margin: '0 auto', maxWidth: '16ch', textAlign: 'center', ...balance }}>Demand before distribution.</p>
          {/* The point of view in Believe's own voice: demand begins before
              distribution. This replaces the earlier, more clinical
              "not anti-retail / omnichannel" paragraph; the retail-positive
              stance now lands through the closing lines here and the channels
              line below. */}
          {/* deliberate rhythm, not a uniform stack: paragraph gaps are drawn in
              ~25-30%, connected pairs sit tight (the questions with their answer;
              the retailer setup with "already asking for us"), and a longer pause
              precedes the climax so "possibility becomes momentum" lands hardest. */}
          <div style={{ marginTop: 'clamp(34px,5.5vh,60px)', textAlign: 'center' }}>
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.34, color: palette.navy, margin: '0 auto', maxWidth: '24ch', ...balance }}>We believe demand begins long before distribution.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.78)', margin: 'clamp(13px,2vh,18px) auto 0', maxWidth: '34ch', ...balance }}>A great product is just the beginning.</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.48, color: 'rgba(122,94,52,0.85)', margin: 'clamp(15px,2.3vh,21px) auto 0', maxWidth: '32ch', ...balance }}>What makes people care? What makes them curious? What makes them want to share something they&rsquo;ve discovered?</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.68)', margin: 'clamp(5px,0.9vh,9px) auto 0', maxWidth: '30ch', ...balance }}>Those are the questions we love exploring.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.82)', margin: 'clamp(16px,2.6vh,23px) auto 0', maxWidth: '50ch', ...pretty }}>At Believe Studio, we look beyond getting products onto shelves. We look for the stories, connections, experiences, and unexpected opportunities that make a brand matter to people.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.82)', margin: 'clamp(14px,2.2vh,20px) auto 0', maxWidth: '46ch', ...pretty }}>Because the most powerful conversation with a retailer isn&rsquo;t simply, &ldquo;We have a great product.&rdquo;</p>
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.34, color: palette.navy, margin: 'clamp(5px,0.9vh,9px) auto 0', maxWidth: '26ch', ...balance }}>It&rsquo;s, &ldquo;People are already asking for us.&rdquo;</p>
            <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(24px,3.1vw,42px)', lineHeight: 1.16, color: palette.navy, margin: 'clamp(22px,3.5vh,34px) auto 0', maxWidth: '22ch', ...balance }}>That&rsquo;s where possibility becomes momentum.</p>
          </div>
          {/* the tangible method — set apart as an editorial centrepiece (the
              same vertical-rule motif used by the Studio's defining question),
              so the approach reads as something concrete, not a slogan. This
              replaces the earlier "where its people already gather" line, which
              said the same thing less tangibly. */}
          <div style={{ marginTop: 'clamp(40px,6.5vh,74px)' }}>
            <div aria-hidden="true" style={{ width: 1, height: 'clamp(26px,4vh,44px)', margin: '0 auto clamp(20px,3.2vh,32px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.5), transparent)' }} />
            <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(25px,3.6vw,46px)', lineHeight: 1.16, color: palette.navy, margin: '0 auto', maxWidth: '27ch', textAlign: 'center', ...balance }}>Find the places where your brand&rsquo;s differences will really matter to the customer.</p>
            {/* the method, grounded in consumer behaviour: a subordinate lead
                statement (with a quiet gold-italic emphasis), then the moments
                we explore, then how we act on them. */}
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(19px,2.3vw,28px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.9)', margin: 'clamp(28px,4.5vh,44px) auto 0', maxWidth: '30ch', textAlign: 'center', ...balance }}>It&rsquo;s not enough to know who your customer is. We want to understand <span style={{ fontStyle: 'italic', color: palette.gold }}>where your brand fits into their life</span>.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', margin: 'clamp(16px,2.6vh,24px) auto 0', maxWidth: '44ch', textAlign: 'center', ...pretty }}>What draws them in? What&rsquo;s happening when they decide to buy? Is it a daily ritual, a little indulgence, a thoughtful gift, or something they discover with friends? And what brings them back?</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.78)', margin: 'clamp(14px,2.2vh,20px) auto 0', maxWidth: '48ch', textAlign: 'center', ...pretty }}>We explore those moments alongside what your customer conversations, sales, and repeat purchases reveal. Then we develop the ideas, introductions, and partnerships that connect your brand with people when its differences matter most.</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,22px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.82)', margin: 'clamp(16px,2.6vh,24px) auto 0', maxWidth: '46ch', textAlign: 'center', ...balance }}>A caf&eacute;. A hotel. A collaboration nobody had considered. Each opportunity starts with a thoughtful connection and a clear reason to pursue it.</p>
          </div>

          {/* the shift — a quiet reframe, left to right */}
          <div className="home-shift" style={{ margin: 'clamp(40px,7vh,72px) 0 0', background: 'rgba(250,246,236,0.6)' }}>
            <div className="home-srow" style={{ background: 'rgba(240,232,214,0.7)' }}>
              {/* the comparison heading row, carried in the house's deep muted
                  teal so the reframe reads as its own quiet accent */}
              <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.teal }}>The familiar questions</div>
              <div className="srow-ar" />
              <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.teal }}>The Believe approach</div>
            </div>
            {SHIFT.map(([t, b], i) => (
              <div className="home-srow" key={i}>
                <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px,1.9vw,19px)', color: 'rgba(43,39,35,0.5)' }}>{t}</div>
                <div className="srow-ar" aria-hidden="true" style={{ color: palette.gold, textAlign: 'center' }}>&rarr;</div>
                <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(16px,2.1vw,21px)', lineHeight: 1.2, color: palette.ink }}>{b}</div>
              </div>
            ))}
          </div>

          {/* where demand gets built */}
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.66)', margin: 'clamp(40px,6vh,70px) auto clamp(18px,2.6vh,26px)', maxWidth: '44ch', textAlign: 'center', ...balance }}>Demand can be built wherever a brand is experienced, with retail as one channel among many:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px 10px', justifyContent: 'center' }}>
            {CHANNELS.map((c) => (
              <span key={c} style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', background: 'rgba(250,246,236,0.7)', border: '1px solid rgba(45,92,89,0.42)', borderRadius: 20, padding: '6px 13px' }}>{c}</span>
            ))}
          </div>
        </div>

        {/* ══ build belonging ══════════════════════════════════════════════ */}
        <div style={{ marginTop: 'clamp(100px,18vh,212px)', textAlign: 'left', ...surface('entry 0% cover 22%') }}>
          <div style={{ ...label, marginBottom: '1.4em', textAlign: 'center' }}>The deeper aim</div>
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(26px,4vw,52px)', lineHeight: 1.1, color: palette.ink, margin: '0 auto', maxWidth: '18ch', textAlign: 'center', ...balance }}>Don&rsquo;t just build an audience. Build belonging.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.74)', margin: 'clamp(34px,5.5vh,60px) auto 0', maxWidth: '52ch', ...pretty }}>A single viral moment can be useful, but it is not a brand. The brands that last are the ones people identify with, talk about, and want to be part of. We help founders give people meaningful reasons to connect, participate, return, and introduce the brand to others.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 'clamp(12px,1.8vw,18px)', margin: 'clamp(40px,7vh,72px) 0 0' }}>
            {CONDITIONS.map(([t, d]) => (
              <div key={t} style={{ border: '1px solid rgba(122,94,52,0.22)', borderRadius: 6, padding: '16px 18px', background: 'rgba(250,246,236,0.6)' }}>
                <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.gold }}>{t}</div>
                <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(15px,1.8vw,19px)', lineHeight: 1.36, color: palette.ink, marginTop: 6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ tied to the three pillars ════════════════════════════════════ */}
        <div style={{ marginTop: 'clamp(94px,17vh,198px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.3, color: palette.navy, margin: '0 auto', maxWidth: '34ch', ...balance }}>Creativity imagines what&rsquo;s possible. Commerce brings it to life. Connection gives it meaning.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.68)', margin: 'clamp(26px,4vh,40px) auto 0', maxWidth: '46ch', ...pretty }}>Demand gives a brand reach. Belonging gives it roots. At Believe Studio, we bring these ideas together to help founders build brands people choose, return to, and share.</p>
        </div>

        {/* ── the closing ───────────────────────────────────────────────── */}
        <div style={{ marginTop: 'var(--space-lg)', ...surface() }}>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px,2.9vw,38px)', lineHeight: 1.3, color: palette.ink, margin: '0 auto', maxWidth: '22ch', ...balance }}>Every lasting brand began as something a founder could only imagine.</p>
        </div>

        <div style={{ width: 1, height: 'clamp(52px,9vh,96px)', margin: 'clamp(68px,12vh,136px) auto clamp(32px,5vh,52px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <div style={{ textAlign: 'center' }}><RoomNav ctx={ctx} slug="studio" /></div>
      </div>
    </ChapterShell>
  )
}
