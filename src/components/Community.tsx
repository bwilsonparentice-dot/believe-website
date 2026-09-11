import { CSSProperties, ReactNode } from 'react'
import { El } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'
import { ImageSlot } from './ImageSlot'

/**
 * The Community — the warm, human chapter after the Living House: the people who
 * shape the House, the Houses still to come, and the language the House keeps.
 * Softer and more editorial than the primary rooms — belonging and future, not
 * another set of offerings. Flows into the Directory in the footer.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const ink = '#2b2723'
const brass = 'rgba(122,94,52,0.9)'
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.66)',
}
const reveal = (range = 'entry 2% cover 24%'): CSSProperties => ({
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

function Enter({ onClick, children }: { onClick: Handler; children: ReactNode }) {
  return (
    <El
      as="button"
      onClick={onClick}
      style={{ display: 'inline-block', marginTop: 'clamp(24px,3.4vh,40px)', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: brass, background: 'transparent', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.4)', padding: '0 0 5px', cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease' }}
      hover={{ color: ink, borderColor: ink }}
    >
      {children}
    </El>
  )
}

// the language the House keeps — a small glossary, discovered like a page in a book
const GLOSSARY: [string, string][] = [
  ['Resident', 'Someone invited into the House to contribute wisdom that remains after they leave.'],
  ['Artifact', 'Something useful made through a conversation, workshop, or residency, and kept for the founders who come next.'],
  ['Field Note', 'An observation written down before it hardens into a framework.'],
  ['The Table', 'A place where conversation becomes decision.'],
  ['House', 'Not a platform. Not a program. A place founders can return to.'],
]

export function Community({ ctx }: { ctx: Ctx }) {
  return (
    <section aria-label="The Community" style={{ position: 'relative', background: '#ece4d4', padding: 'clamp(120px,22vh,300px) clamp(24px,7vw,120px)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>

        {/* ── The People ────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', ...reveal() }}>
          <div style={{ ...label, marginBottom: '1.7em' }}>The People</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3.2vw,44px)', lineHeight: 1.26, color: ink, maxWidth: '18ch', margin: '0 auto', ...balance }}>Every house is shaped by the people who enter it.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(32px,5vw,76px)', marginTop: 'clamp(80px,14vh,180px)', ...reveal() }}>
          <div style={{ flex: '0 1 300px', minWidth: 230, maxWidth: 340 }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 'clamp(6px,1vw,12px)', overflow: 'hidden', boxShadow: '0 50px 90px -58px rgba(40,28,10,0.5)' }}>
              <ImageSlot src="/photos/portrait-beth.webp" fit="cover" alt="Editorial portrait of Beth Wilson-Parentice, founder of Believe Studio, in warm morning light" placeholder="Editorial portrait of the founder in warm morning light" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 360px', minWidth: 300, textAlign: 'left' }}>
            <div style={{ ...label, fontSize: 10, letterSpacing: '0.42em', marginBottom: '1.2em' }}>Founder</div>
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4vw,54px)', lineHeight: 1.02, margin: '0 0 0.5em', color: ink }}>Beth Wilson-Parentice</h3>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.78)', maxWidth: '30ch', ...balance }}>Building the place she wished had existed when she was building alone.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.6)', maxWidth: '34ch', margin: '1.4em 0 0', ...pretty }}>Around her, a small circle of residents, advisors, builders, and collaborators, each known by what they contribute to the House.</p>
            <Enter onClick={ctx.openPeople}>Meet the People</Enter>
          </div>
        </div>

        {/* ── The Houses to Come ────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(120px,22vh,300px)', ...reveal() }}>
          <div style={{ ...label, marginBottom: '1.7em' }}>The Houses to Come</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.7vw,36px)', lineHeight: 1.36, color: ink, maxWidth: '26ch', margin: '0 auto', ...balance }}>Believe Studio begins as one House. In time, there may be others: places where founders gather around tables, work through what matters, and leave something useful for those who come next.</p>

          {/* a quiet brass plate for the next House, not yet located */}
          <div style={{ width: 'min(100%, 380px)', margin: 'clamp(56px,9vh,110px) auto 0', border: '1px solid rgba(40,44,70,0.26)', padding: 'clamp(30px,4.4vw,48px) clamp(26px,3.6vw,40px)', background: 'rgba(255,251,243,0.4)' }}>
            <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 'clamp(12px,1.4vw,15px)', letterSpacing: '0.42em', textTransform: 'uppercase', color: ink }}>House No. 002</div>
            <div aria-hidden="true" style={{ height: 1, background: 'rgba(40,44,70,0.18)', margin: 'clamp(18px,2.6vw,24px) auto' }} />
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,2vw,24px)', color: 'rgba(122,94,52,0.82)' }}>Location not yet chosen.</div>
          </div>

          <Enter onClick={ctx.openHouses}>See What Comes Next</Enter>
        </div>

        {/* ── The Language of the House ─────────────────────────────────── */}
        <div id="the-language" style={{ marginTop: 'clamp(120px,22vh,300px)', ...reveal() }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...label, marginBottom: '1.7em' }}>The Language of the House</div>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.3vw,30px)', lineHeight: 1.44, color: ink, maxWidth: '30ch', margin: '0 auto clamp(56px,10vh,110px)', ...balance }}>Words shape what people believe is possible. Believe Studio uses language deliberately, not to sound different, but to behave differently.</p>
          </div>

          <dl style={{ width: 'min(100%, 640px)', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            {GLOSSARY.map(([term, def], i) => (
              <div key={term} style={{ padding: 'clamp(24px,3.4vh,40px) 0', borderTop: i === 0 ? 'none' : '1px solid rgba(122,94,52,0.2)' }}>
                <dt style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.1, color: ink, marginBottom: '0.42em' }}>{term}</dt>
                <dd style={{ margin: 0, fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.72)', maxWidth: '46ch', ...pretty }}>{def}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  )
}
