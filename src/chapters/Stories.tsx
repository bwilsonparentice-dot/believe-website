import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { STORIES, STORY_PHOTOS, GALLERY_BRANDS } from '../data'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)',
}

/** The quietest reveal in the house — portraits emerging in soft morning light. */
const surface = (range = 'entry 3% cover 26%'): CSSProperties => ({
  animation: 'fadeUpSoft 1300ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

// the hero — why the gallery exists, spoken plainly
const OPENING = [
  'Every company has a story.',
  'Behind every story is a founder.',
  'This gallery exists to celebrate the people who chose to keep building.',
]

// one founder, framed like a portrait on a gallery wall — no card, only air
type Story = (typeof STORIES)[number]
function FounderStory({ s }: { s: Story }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(36px,6vw,92px)', flexDirection: s.dir as CSSProperties['flexDirection'], textAlign: 'left', ...surface('entry 0% cover 24%') }}>
      {/* the portrait — an arched niche, warm and unhurried */}
      <div style={{ flex: '0 1 420px', minWidth: 260, maxWidth: 440 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: '#e6dcc6', boxShadow: '0 50px 90px -50px rgba(60,44,20,0.6)', borderRadius: 'clamp(100px,12vw,170px) clamp(100px,12vw,170px) 10px 10px' }}>
          <ImageSlot src={STORY_PHOTOS[s.pid]} alt={`Portrait of ${s.name}`} placeholder={`A quiet, editorial portrait of ${s.name}`} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 40% 24%, rgba(255,238,196,0.4), transparent 70%)' }} />
        </div>
      </div>

      {/* the plate beside the portrait — name, company, quote, story, what changed */}
      <div style={{ flex: '1 1 360px', minWidth: 300 }}>
        <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(32px,4vw,56px)', lineHeight: 1.0 }}>{s.name}</div>
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.8)', marginTop: '0.3em' }}>{s.company}</div>

        <p style={{ fontFamily: serif, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.28, color: '#2b2723', margin: 'clamp(28px,4.5vh,48px) 0 0', ...pretty }}>“{s.quote}”</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,2vh,20px)', marginTop: 'clamp(28px,4.5vh,48px)' }}>
          {s.narrative.map((p, i) => (
            <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.68, color: 'rgba(43,39,35,0.72)', margin: 0, ...pretty }}>{p}</p>
          ))}
        </div>

        {'changed' in s && Array.isArray((s as { changed?: string[] }).changed) && (
          <div style={{ marginTop: 'clamp(34px,5.5vh,60px)', borderTop: '1px solid rgba(122,94,52,0.22)', paddingTop: 'clamp(24px,3.6vh,34px)' }}>
            <div style={{ ...label, fontSize: 10, letterSpacing: '0.42em', marginBottom: 'clamp(16px,2.4vh,22px)' }}>What changed</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55em' }}>
              {(s as { changed: string[] }).changed.map((c, i) => (
                <div key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.8)' }}>{c}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// a brass nameplate between portraits — the broader community, never a logo wall
function BrandPlaque({ title, brands, intro }: { title: string; brands: string[]; intro?: string }) {
  return (
    <div style={{ textAlign: 'center', ...surface('entry 0% cover 22%') }}>
      <ArchMark width={1.8} margin="0 auto 1.6em" opacity={0.66} />
      <div style={{ ...label, fontSize: 10, letterSpacing: '0.4em', color: 'rgba(122,94,52,0.7)' }}>{title}</div>
      {intro && (
        <p style={{ fontFamily: serif, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.66)', margin: 'clamp(28px,4.5vh,44px) auto 0', maxWidth: '40ch', ...balance }}>{intro}</p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', gap: 'clamp(28px,4.5vw,64px)', maxWidth: 760, margin: 'clamp(38px,6vh,66px) auto 0' }}>
        {brands.map((b, i) => (
          <span key={i} style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.4vw,32px)', letterSpacing: '0.01em', color: 'rgba(52,40,26,0.66)', whiteSpace: 'nowrap' }}>{b}</span>
        ))}
      </div>
    </div>
  )
}

// an inscription on the gallery wall — a moment of air between portraits
function PullQuote({ lines }: { lines: string[] }) {
  return (
    <div style={{ textAlign: 'center', ...surface() }}>
      {lines.map((l, i) => (
        <p key={i} style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3.4vw,46px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.9)', margin: i === 0 ? 0 : '0.15em 0 0', maxWidth: '22ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>{l}</p>
      ))}
    </div>
  )
}

/**
 * The Gallery — the quietest room in the house. Not testimonials, not a client
 * list, not a logo wall: a curated gallery of founders who kept building, each
 * framed like a portrait, with the broader community named on small brass
 * plaques between them. (Reached from the brass directory's "Stories".)
 */
export function StoriesChapter({ ctx }: { ctx: Ctx }) {
  const [snehee, michelle] = STORIES
  const brandsA = GALLERY_BRANDS.slice(0, 4)
  const brandsB = GALLERY_BRANDS.slice(4)

  return (
    <ChapterShell onClose={ctx.closeStories} background="#efe6d3">
      <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 7vw clamp(80px,15vh,190px)', color: '#2b2723', animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── the hero ──────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, marginBottom: '1.4em' }}>The Gallery</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(44px,6.6vw,98px)', lineHeight: 1.0, margin: '0 0 0.5em' }}>Stories</h2>

          <div style={{ marginTop: 'clamp(56px,10vh,120px)', display: 'flex', flexDirection: 'column', gap: 'clamp(18px,3vh,30px)', ...surface() }}>
            {OPENING.map((p, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, maxWidth: '26ch', marginLeft: 'auto', marginRight: 'auto', ...balance }}>{p}</p>
            ))}
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.65, color: 'rgba(43,39,35,0.62)', margin: 'clamp(14px,2.4vh,26px) auto 0', maxWidth: '38ch', ...pretty }}>Some arrived searching for clarity. Some needed confidence. Some needed a strategy. Some simply needed someone who believed in them before they fully believed in themselves.</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.82)', margin: 'clamp(8px,1.6vh,18px) auto 0' }}>These are a few of their stories.</p>
          </div>
        </div>

        {/* ── the portraits, with brass plaques and inscriptions between ──── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(120px,22vh,260px)', marginTop: 'clamp(120px,22vh,260px)' }}>
          <FounderStory s={snehee} />

          <BrandPlaque title="Other founders we’ve had the privilege to build beside" brands={brandsA} />

          <PullQuote lines={['The business didn’t need another strategy.', 'It needed a founder who believed again.']} />

          <FounderStory s={michelle} />

          <BrandPlaque
            title="Brands we’ve built beside"
            intro="Every founder’s journey is different. Together, these brands represent thousands of conversations, countless decisions, and years spent building products that matter."
            brands={brandsB}
          />

          <PullQuote lines={['The best companies are rarely built alone.']} />
        </div>

        {/* ── the closing — the empty frame ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(120px,22vh,260px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.4, color: '#2b2723', margin: '0 auto', maxWidth: '24ch', ...balance }}>Every portrait in this gallery began with a conversation.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.6)', margin: 'clamp(28px,4.5vh,44px) auto 0', maxWidth: '22ch', ...balance }}>The next frame is still empty.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.9)', margin: 'clamp(14px,2.4vh,24px) auto clamp(48px,8vh,88px)', maxWidth: '20ch', ...balance }}>Perhaps it’s waiting for yours.</p>
          <El
            onClick={ctx.openDoorway('founder-conversation')}
            style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.78)', border: '1px solid rgba(122,94,52,0.5)', borderRadius: 2, padding: '15px 34px', cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease, background 400ms ease' }}
            hover={{ color: '#2b2723', borderColor: 'rgba(122,94,52,0.9)', background: 'rgba(122,94,52,0.06)' }}
          >
            Begin the Conversation
          </El>
        </div>

        <div style={{ width: 1, height: 'clamp(52px,9vh,96px)', margin: 'clamp(70px,12vh,140px) auto clamp(36px,6vh,60px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
        <div style={{ textAlign: 'center' }}><BackPill onClose={ctx.closeStories} /></div>
      </div>
    </ChapterShell>
  )
}
