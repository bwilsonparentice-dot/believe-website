import React, { CSSProperties } from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill } from '../components/ChapterShell'
import { palette } from '../lib/palette'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)',
}

// The four parts, in the founder's own words — a quiet numbered index, not a
// grid of service cards. The optional note under "Capture the Moments" keeps
// the promise that appearing on camera is never required.
const STEPS: { n: string; t: string; d: string; note?: string }[] = [
  { n: '01', t: 'Find Your Story', d: 'Discover what makes the founder, the product, and the journey meaningful. Identify the stories people may connect with and establish comfortable boundaries around what is shared.' },
  { n: '02', t: 'Capture the Moments', d: 'Help founders recognize everyday moments worth documenting. These might be photographs, simple videos, voice notes, product testing, packing orders, or interactions with their team.', note: 'Appearing on camera is optional.' },
  { n: '03', t: 'Bring People Along', d: 'Turn those experiences into authentic storytelling that encourages curiosity, conversation, and participation.' },
  { n: '04', t: 'Learn and Grow', d: 'Understand what audiences respond to, what creates connection, and what those interactions reveal about consumer behavior and opportunities for growth.' },
]

/**
 * Build in Public (BIP) — a founder-storytelling and consumer-connection
 * methodology, and a natural extension of the Studio's point of view: the
 * founder sees a task; we see a story. Not a social-media service, and not a
 * promise of results. A dedicated, quiet room reached from the homepage, the
 * House Directory, and the Studio's Believe approach. (ctx.openBuildInPublic.)
 */
export function BuildInPublic({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeBuildInPublic} background="#efe6d3" z={120}>
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(96px,17vh,210px) 7vw clamp(80px,14vh,180px)', textAlign: 'center', color: palette.ink, animation: 'contentFocus 1000ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* ── the opening ──────────────────────────────────────────────── */}
        <div style={{ ...label, marginBottom: '1.6em' }}>The BIP Method</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.4vw,88px)', lineHeight: 1.03, color: palette.navy, margin: '0 auto', maxWidth: '16ch', ...balance }}>Let people into the story.</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.4vw,30px)', lineHeight: 1.3, color: 'rgba(122,94,52,0.84)', margin: 'clamp(22px,3.4vh,34px) auto 0' }}>BIP. Build in Public.</p>

        {/* the editorial opening — the proposed copy, as a calm descent */}
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,27px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.8)', margin: 'clamp(40px,6.5vh,72px) auto 0', maxWidth: '34ch', ...balance }}>Some of the most meaningful moments in building a brand happen long before a product reaches the shelf.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', margin: 'clamp(18px,2.8vh,26px) auto 0', maxWidth: '34ch', ...balance }}>The first samples. The unexpected challenges. The decisions made around the kitchen table. The little victories that remind you why you started.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.34, color: palette.navy, margin: 'clamp(22px,3.4vh,34px) auto 0', maxWidth: '24ch', ...balance }}>We believe those moments are worth sharing.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.78)', margin: 'clamp(26px,4vh,42px) auto 0', maxWidth: '46ch', ...pretty }}>Our BIP Method helps founders discover the stories already happening around them and find authentic, approachable ways to bring people into their journey.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', margin: 'clamp(20px,3vh,30px) auto 0', maxWidth: '40ch', ...balance }}>You don&rsquo;t have to be an influencer. You don&rsquo;t have to love being on camera.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', margin: 'clamp(12px,1.8vh,18px) auto 0', maxWidth: '40ch', ...balance }}>You just have to be willing to let people see a little more of what you&rsquo;re building.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(20px,2.5vw,32px)', lineHeight: 1.3, color: palette.navy, margin: 'clamp(30px,4.6vh,50px) auto 0', maxWidth: '26ch', ...balance }}>Because sometimes, the most powerful way to grow a brand is to give people something to believe in along the way.</p>

        <p style={{ ...label, letterSpacing: '0.34em', color: 'rgba(45,92,89,0.85)', margin: 'clamp(34px,5.5vh,58px) auto 0' }}>Founder storytelling &middot; Consumer connection &middot; Meaningful growth</p>

        {/* ── the guiding statement — set apart with the house's vertical rule ── */}
        <div style={{ marginTop: 'clamp(70px,13vh,150px)' }}>
          <div aria-hidden="true" style={{ width: 1, height: 'clamp(26px,4vh,44px)', margin: '0 auto clamp(20px,3.2vh,32px)', background: 'linear-gradient(180deg, rgba(45,92,89,0.55), transparent)' }} />
          <p style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(28px,4.4vw,58px)', lineHeight: 1.12, color: palette.navy, margin: '0 auto', maxWidth: '18ch', ...balance }}>The founder sees a task. We see a story.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,25px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.68)', margin: 'clamp(24px,3.8vh,38px) auto 0', maxWidth: '30ch', ...balance }}>You don&rsquo;t have to be an influencer to invite people into your story.</p>
        </div>

        {/* ── the four parts — a quiet numbered index, left-aligned ──────── */}
        <div style={{ marginTop: 'clamp(80px,15vh,180px)' }}>
          <div style={{ ...label, marginBottom: 'clamp(10px,1.6vh,18px)' }}>The method</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.66)', margin: '0 auto', maxWidth: '30ch', ...balance }}>Four interconnected parts, shaped around each founder.</p>

          <div style={{ maxWidth: 720, margin: 'clamp(36px,6vh,66px) auto 0', textAlign: 'left' }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ padding: 'clamp(26px,4.6vh,46px) 0', borderTop: '1px solid rgba(45,92,89,0.22)', ...(i === STEPS.length - 1 ? { borderBottom: '1px solid rgba(45,92,89,0.22)' } : {}) }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(14px,2.6vw,28px)' }}>
                  <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.24em', color: palette.gold, flex: 'none' }}>{s.n}</span>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.08, color: palette.navy, margin: 0 }}>{s.t}</h3>
                </div>
                <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,22px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.78)', margin: 'clamp(12px,2vh,18px) 0 0', maxWidth: '54ch', ...pretty }}>{s.d}</p>
                {s.note && (
                  <p style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(45,92,89,0.78)', margin: 'clamp(12px,1.8vh,16px) 0 0' }}>{s.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── a quiet close ─────────────────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(80px,15vh,180px)' }}>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px,2.9vw,38px)', lineHeight: 1.3, color: palette.ink, margin: '0 auto', maxWidth: '24ch', ...balance }}>The most powerful way to grow a brand can be to give people something to believe in along the way.</p>
          <div style={{ marginTop: 'clamp(40px,7vh,72px)' }}>
            <BackPill onClose={ctx.closeBuildInPublic} label="Back to the building" />
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
