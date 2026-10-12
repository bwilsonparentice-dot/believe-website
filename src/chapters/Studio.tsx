import React, { CSSProperties } from 'react'
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
export function StudioChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeStudioPage} background="#efe6d3" z={120}>
      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 7vw clamp(42px,7.5vh,92px)', textAlign: 'center', color: palette.ink, animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>
        {/* ── the hero ──────────────────────────────────────────────────── */}
        <div style={{ ...label, marginBottom: '1.5em' }}>The Studio</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(42px,6.4vw,94px)', lineHeight: 1.0, margin: '0 0 0.42em' }}>The Studio</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.34, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>Creative strategy and brand worlds.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,25px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.72)', margin: 'clamp(26px,4vh,40px) auto 0', maxWidth: '34ch', ...balance }}>Where a founder&rsquo;s positioning, brand, and next move are built.</p>
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
          <div style={{ marginTop: 'clamp(38px,6.5vh,76px)', display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,30px)', ...surface() }}>
            {[
              'We build the brand world a company lives inside: its positioning, its story, its identity, and the creative direction that makes it impossible to ignore.',
              'Some of it is shaped quietly at the worktable. Some becomes clearer in conversation. All of it is built around the founder, never templated.',
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.72)', margin: 0, maxWidth: '40ch', marginLeft: 'auto', marginRight: 'auto', ...pretty }}>{p}</p>
            ))}
          </div>
        </div>

        {/* ══ the point of view — demand before distribution ═══════════════ */}
        <div style={{ marginTop: 'clamp(100px,18vh,212px)', textAlign: 'left', ...surface('entry 0% cover 22%') }}>
          <div style={{ ...label, marginBottom: '1.4em', textAlign: 'center' }}>The Believe approach</div>
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(28px,4.2vw,56px)', lineHeight: 1.08, color: palette.navy, margin: '0 auto', maxWidth: '16ch', textAlign: 'center', ...balance }}>Demand before distribution.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.74)', margin: 'clamp(34px,5.5vh,60px) auto 0', maxWidth: '52ch', ...pretty }}>We are not anti-retail. Retail is one powerful part of a much larger omnichannel strategy. But the conventional path assumes growth is mostly a matter of more stores, more shelf, more distributors. We think differently. We build demand intentionally and use every channel strategically, so discovery, distribution, and demand reinforce one another instead of waiting on each other.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.74)', margin: 'clamp(22px,3.4vh,34px) auto 0', maxWidth: '52ch', ...pretty }}>So before we ask where a brand should be sold, we ask where its people already gather, how they discover and experience it, and what would make them remember, return, and tell someone.</p>

          {/* the shift — a quiet reframe, left to right */}
          <div className="home-shift" style={{ margin: 'clamp(40px,7vh,72px) 0 0', background: 'rgba(250,246,236,0.6)' }}>
            <div className="home-srow" style={{ background: 'rgba(240,232,214,0.7)' }}>
              <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.6)' }}>Traditional thinking</div>
              <div className="srow-ar" />
              <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.6)' }}>The Believe approach</div>
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
              <span key={c} style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.66)', border: '1px solid rgba(43,39,35,0.22)', borderRadius: 20, padding: '6px 13px' }}>{c}</span>
            ))}
          </div>
        </div>

        {/* ══ build belonging ══════════════════════════════════════════════ */}
        <div style={{ marginTop: 'clamp(100px,18vh,212px)', textAlign: 'left', ...surface('entry 0% cover 22%') }}>
          <div style={{ ...label, marginBottom: '1.4em', textAlign: 'center' }}>The deeper aim</div>
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(26px,4vw,52px)', lineHeight: 1.1, color: palette.ink, margin: '0 auto', maxWidth: '18ch', textAlign: 'center', ...balance }}>Don&rsquo;t just build an audience. Build belonging.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.74)', margin: 'clamp(34px,5.5vh,60px) auto 0', maxWidth: '52ch', ...pretty }}>A single viral moment can be useful, but it is not a brand. The brands that last are the ones people identify with, talk about, and want to be part of. We can&rsquo;t manufacture a cult following, and we wouldn&rsquo;t try. What we can do is help founders intentionally create the conditions for a passionate following to form.</p>

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
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.68)', margin: 'clamp(26px,4vh,40px) auto 0', maxWidth: '46ch', ...pretty }}>Demand gives a brand reach. Belonging gives it roots. The work that changes a company happens where all three meet.</p>
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
