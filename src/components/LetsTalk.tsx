import React, { CSSProperties, useEffect } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ImageSlot } from './ImageSlot'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

/**
 * The booking destination for this page — the owner-provided Calendly event for
 * the Let's Talk It Through conversation. Swap this one line to point the page
 * at a different event. If it is ever left blank, the booking area renders a
 * clearly labelled preview state instead of a dead button.
 */
const LETS_TALK_CALENDLY_URL = 'https://calendly.com/beth-believeagency/a-founder-conversation-believe-studio-clone'
const bookingConfigured = typeof LETS_TALK_CALENDLY_URL === 'string' && /^https:\/\/calendly\.com\/\S+/.test(LETS_TALK_CALENDLY_URL)

function openBooking(e?: React.MouseEvent) {
  if (e && e.stopPropagation) e.stopPropagation()
  if (!bookingConfigured) return
  try { window.open(LETS_TALK_CALENDLY_URL, '_blank', 'noopener,noreferrer') } catch { /* ignore */ }
}

const eyebrow: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)',
}
const navyCta: CSSProperties = {
  fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase',
  color: palette.linen, background: palette.navy, border: `1px solid ${palette.navy}`, borderRadius: 2,
  padding: '16px 40px', cursor: 'pointer',
}
const fine: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
  color: 'rgba(43,39,35,0.55)',
}

function Section({ children, style, id }: { children: React.ReactNode; style?: CSSProperties; id?: string }) {
  return (
    <section id={id} style={{ position: 'relative', padding: 'clamp(48px,9vh,110px) 8vw', maxWidth: 980, margin: '0 auto', textAlign: 'center', ...style }}>
      {children}
    </section>
  )
}

const body: CSSProperties = {
  fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,25px)', lineHeight: 1.62,
  color: 'rgba(43,39,35,0.78)', margin: '0 auto', maxWidth: '40ch', ...pretty,
}

/** The one action on the page — open the conversation. Live when Calendly is
 *  configured; otherwise a clearly identified preview placeholder (never a
 *  broken button). */
function BookButton({ label, sub }: { label: string; sub?: string }) {
  if (!bookingConfigured) {
    return (
      <div style={{ margin: 'clamp(26px,4.2vh,44px) auto 0', maxWidth: 440 }}>
        <div role="status" style={{ border: '1px dashed rgba(45,106,102,0.5)', borderRadius: 4, padding: '18px 22px', background: 'rgba(21,106,102,0.06)' }}>
          <div style={{ ...fine, color: palette.teal, marginBottom: 8 }}>Booking preview</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(15px,1.7vw,19px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.72)', margin: 0 }}>The scheduling button appears here once the Calendly link is connected for this page.</p>
        </div>
      </div>
    )
  }
  return (
    <div style={{ margin: 'clamp(26px,4.2vh,44px) auto 0' }}>
      <El as="button" onClick={openBooking} aria-label={`${label} — opens the Calendly scheduling page in a new tab`} style={navyCta} hover={{ background: palette.navyDeep }}>{label}</El>
      {sub && <p style={{ ...fine, margin: 'clamp(16px,2.4vh,22px) auto 0' }}>{sub}</p>}
    </div>
  )
}

/**
 * Let's Talk It Through — a dedicated landing page for the LinkedIn invitation
 * to a complimentary 30-minute founder-to-founder conversation with Beth. A
 * warm, editorial extension of the House, reached at /lets-talk. Reuses the
 * site's header, footer, type, colour and spacing; the one action is to open
 * the conversation. (ctx.openLetsTalk; rendered with header + Footer in App.)
 */
export function LetsTalk({ ctx: _ctx }: { ctx: Ctx }) {
  // Per-route metadata for browsers and JS-aware crawlers. (A non-JS crawler
  // like LinkedIn's reads the static index.html tags; see the note to the team.)
  useEffect(() => {
    const prevTitle = document.title
    const setMeta = (sel: string, attr: string, val: string) => {
      let el = document.head.querySelector(sel) as HTMLMetaElement | null
      const created = !el
      if (!el) { el = document.createElement('meta'); const m = sel.match(/\[(property|name)="([^"]+)"\]/); if (m) el.setAttribute(m[1], m[2]); document.head.appendChild(el) }
      const prev = el.getAttribute('content')
      el.setAttribute('content', val)
      return () => { if (created) el?.remove(); else if (prev != null) el?.setAttribute('content', prev) }
    }
    document.title = 'Let’s Talk It Through | Believe Studio'
    const desc = 'A complimentary 30-minute conversation with Beth, founder of Believe Studio. Founder to founder: bring a retail challenge, a growth question, or a new idea, and let’s talk it through.'
    const restores = [
      setMeta('meta[name="description"]', 'name', desc),
      setMeta('meta[property="og:title"]', 'property', 'Let’s Talk It Through | Believe Studio'),
      setMeta('meta[property="og:description"]', 'property', desc),
      setMeta('meta[property="og:url"]', 'property', 'https://believestudio.co/lets-talk'),
      setMeta('meta[name="twitter:title"]', 'name', 'Let’s Talk It Through | Believe Studio'),
      setMeta('meta[name="twitter:description"]', 'name', desc),
    ]
    return () => { document.title = prevTitle; restores.forEach((r) => r && r()) }
  }, [])

  return (
    <div style={{ position: 'relative', background: 'linear-gradient(176deg,#f1e9d8 0%,#efe6d3 50%,#e9dfc9 100%)', color: palette.ink }}>

      {/* ── 1 · The invitation ─────────────────────────────────────────── */}
      <Section style={{ paddingTop: 'clamp(132px,21vh,224px)', paddingBottom: 'clamp(40px,7vh,88px)' }}>
        <div style={eyebrow}>An invitation for founders</div>
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(42px,7vw,92px)', lineHeight: 1.02, color: palette.navy, margin: 'clamp(18px,3vh,30px) auto 0', maxWidth: '14ch', ...balance }}>Let&rsquo;s Talk It Through.</h1>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px,2.6vw,32px)', lineHeight: 1.35, color: 'rgba(122,94,52,0.84)', margin: 'clamp(20px,3.2vh,32px) auto 0', maxWidth: '26ch', ...balance }}>Sometimes a fresh perspective can change everything.</p>
        <p style={{ ...fine, fontSize: 11.5, letterSpacing: '0.2em', color: 'rgba(43,39,35,0.6)', margin: 'clamp(16px,2.4vh,24px) auto 0' }}>A complimentary 30-minute conversation, founder to founder</p>

        <div style={{ margin: 'clamp(30px,4.6vh,52px) auto 0', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,24px)' }}>
          <p style={{ ...body }}>Building a brand is exciting. It&rsquo;s also full of decisions, unexpected challenges, and moments when you&rsquo;re not quite sure what comes next.</p>
          <p style={{ ...body, maxWidth: '44ch' }}>Maybe you&rsquo;re trying to get into the right retailers. Maybe sales aren&rsquo;t growing the way you&rsquo;d hoped. Maybe you&rsquo;re wondering if you&rsquo;re focusing on the right things.</p>
          <p style={{ ...body, maxWidth: '36ch' }}>Or maybe you just need someone to talk it through with.</p>
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(22px,2.9vw,34px)', lineHeight: 1.3, color: palette.navy, margin: 'clamp(8px,1.4vh,14px) auto 0', maxWidth: '24ch', ...balance }}>I&rsquo;ve been there. And I&rsquo;d love to hear what you&rsquo;re working through.</p>
        </div>

        <BookButton label="Schedule Your Conversation" sub="Complimentary &middot; 30 minutes &middot; Founder to founder" />
      </Section>

      {/* ── 2 · What this is really about ──────────────────────────────── */}
      <Section style={{ paddingTop: 'clamp(44px,8vh,104px)' }}>
        <div aria-hidden="true" style={{ width: 58, height: 2, borderRadius: 1, background: palette.teal, margin: '0 auto clamp(34px,5.5vh,60px)' }} />
        <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1.1, color: palette.navy, margin: '0 auto', maxWidth: '20ch', ...balance }}>Sometimes what you need most is a conversation.</p>
        <div style={{ margin: 'clamp(30px,4.8vh,52px) auto 0', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,24px)' }}>
          <p style={{ ...body, maxWidth: '40ch' }}>Not another strategy deck. Not another list of things to do.</p>
          <p style={{ ...body, maxWidth: '48ch' }}>Just someone who will listen, ask different questions, challenge your thinking, and help you see possibilities you might not have considered.</p>
          <p style={{ ...body, maxWidth: '50ch' }}>At Believe Studio, we believe that building a successful brand takes more than following a playbook. It takes curiosity, creativity, connection, and a willingness to see things differently.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(19px,2.3vw,28px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.8)', margin: 'clamp(6px,1.2vh,12px) auto 0', maxWidth: '34ch', ...balance }}>That&rsquo;s the spirit behind Let&rsquo;s Talk It Through.</p>
        </div>
      </Section>

      {/* ── 3 · What to expect — three understated editorial elements ───── */}
      <Section style={{ paddingTop: 'clamp(30px,5vh,64px)', paddingBottom: 'clamp(24px,4vh,52px)' }}>
        <div style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 'clamp(24px,3.2vh,40px) clamp(30px,4vw,56px)' }}>
          {[
            { t: 'Bring what’s on your mind.', d: 'A retail challenge, a growth question, a new idea, or something you haven’t quite figured out yet.' },
            { t: 'We’ll explore it together.', d: 'An honest conversation, a few different perspectives, and hopefully some new possibilities to consider.' },
            { t: 'No pressure. No pitch.', d: 'There’s nothing to prepare and no obligation afterward. Just 30 minutes dedicated to what matters to you and your brand.' },
          ].map((it, i) => (
            <div key={i}>
              <div aria-hidden="true" style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.28em', color: palette.teal, marginBottom: 'clamp(12px,1.8vh,16px)' }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(23px,2.6vw,32px)', lineHeight: 1.14, color: palette.navy, margin: 0 }}>{it.t}</h3>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.8vw,20px)', lineHeight: 1.58, color: 'rgba(43,39,35,0.72)', margin: 'clamp(12px,1.8vh,16px) 0 0', ...pretty }}>{it.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 4 · A personal note from Beth ──────────────────────────────── */}
      <Section style={{ paddingTop: 'clamp(20px,3.5vh,48px)', maxWidth: 1080 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(30px,5vw,72px)', alignItems: 'center', justifyContent: 'center' }}>
          <figure style={{ margin: 0, flex: '1 1 300px', maxWidth: 430, aspectRatio: '0.82', borderRadius: 6, overflow: 'hidden', boxShadow: '0 32px 64px -38px rgba(40,28,10,0.55)' }}>
            <ImageSlot src="/photos/portrait-beth.webp" alt="Editorial portrait of Beth Wilson-Parentice, founder of Believe Studio, in warm morning light" placeholder="Editorial portrait of the founder in warm morning light" fit="cover" loading="lazy" style={{ width: '100%', height: '100%', objectPosition: 'center 26%' }} />
          </figure>
          <div style={{ textAlign: 'left', flex: '1 1 360px', maxWidth: 520 }}>
            <div style={eyebrow}>A note from Beth</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(30px,4.4vw,54px)', lineHeight: 1.08, color: palette.navy, margin: 'clamp(16px,2.6vh,26px) 0 0', maxWidth: '16ch', ...balance }}>I&rsquo;ve been in your shoes.</h2>
            <div style={{ margin: 'clamp(24px,4vh,40px) 0 0', display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.2vh,20px)' }}>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.95vw,23px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.78)', margin: 0, maxWidth: '46ch', ...pretty }}>I&rsquo;ve built a brand from an idea, celebrated the wins, navigated the setbacks, and experienced those moments when I wasn&rsquo;t sure what my next move should be.</p>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.95vw,23px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.78)', margin: 0, maxWidth: '44ch', ...pretty }}>I know how much heart founders put into what they&rsquo;re building. And I know how valuable it can be to have someone genuinely interested in helping you see what&rsquo;s possible.</p>
              <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.44, color: palette.navy, margin: 'clamp(4px,1vh,10px) 0 0', maxWidth: '34ch', ...balance }}>That&rsquo;s why I&rsquo;m opening up a few conversations. I&rsquo;d love for one of them to be with you.</p>
            </div>
            <div style={{ marginTop: 'clamp(22px,3.6vh,34px)' }}>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1, color: palette.teal, margin: 0 }}>Beth</p>
              <p style={{ ...fine, margin: '10px 0 0' }}>Founder, Believe Studio</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5 · Schedule your conversation ─────────────────────────────── */}
      <Section id="book" style={{ paddingTop: 'clamp(52px,10vh,120px)', paddingBottom: 'clamp(70px,13vh,160px)' }}>
        <div aria-hidden="true" style={{ width: 58, height: 2, borderRadius: 1, background: palette.teal, margin: '0 auto clamp(34px,5.5vh,60px)' }} />
        <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(34px,5.4vw,66px)', lineHeight: 1.05, color: palette.navy, margin: '0 auto', maxWidth: '16ch', ...balance }}>What&rsquo;s on your mind?</p>
        <p style={{ ...body, maxWidth: '34ch', margin: 'clamp(24px,3.8vh,38px) auto 0' }}>Whatever you&rsquo;re working through, let&rsquo;s start with a conversation.</p>
        <BookButton label="Let&rsquo;s Talk It Through" />
        <p style={{ ...fine, textTransform: 'none', letterSpacing: '0.04em', fontSize: 13, color: 'rgba(43,39,35,0.6)', margin: 'clamp(18px,2.8vh,26px) auto 0', maxWidth: '40ch', lineHeight: 1.6 }}>Complimentary 30-minute conversation. No sales pitch. No obligation.</p>
      </Section>
    </div>
  )
}
