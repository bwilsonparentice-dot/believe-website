import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { DirectoryPlaque } from './DirectoryPlaque'

/**
 * The end of the House — the brass directory encountered after the walk, then a
 * quiet closing doorway and a subordinate practical footer. (The reflective
 * transition and the six principles now lead into the Founding Wall, upstream.)
 */
export function Footer({ ctx }: { ctx: Ctx }) {
  return (
    <footer style={{ position: 'relative', zIndex: 2, background: '#161613', color: 'rgba(246,239,228,0.9)', padding: 'clamp(60px,12vh,150px) clamp(30px,8vw,120px)' }}>
      {/* a quiet introduction, then the full brass directory */}
      <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto clamp(30px,5vh,56px)' }}>
        <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.6)', margin: '0 0 1.6em' }}>The House Directory</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(15px,1.7vw,22px)', lineHeight: 1.6, color: 'rgba(246,239,228,0.6)', margin: 0 }}>Every founder walks a different path. Return to any room whenever you need it.</p>
      </div>

      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', padding: 'clamp(20px,4vh,60px) 6vw' }}>
        <DirectoryPlaque ctx={ctx} />
      </div>

      {/* the quiet closing — leaving the House slowly, a doorway still lit */}
      <div style={{ textAlign: 'center', marginTop: 'clamp(96px,18vh,220px)' }}>
        <div style={{ position: 'relative', width: 92, height: 128, margin: '0 auto clamp(30px,5vh,54px)' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-46% -70%', background: 'radial-gradient(circle at 50% 62%, rgba(255,224,158,0.26), transparent 68%)', filter: 'blur(6px)' }} />
          <svg viewBox="0 0 92 128" width="92" height="128" style={{ position: 'relative', display: 'block' }} aria-hidden="true">
            <defs>
              <radialGradient id="doorGlow" cx="50%" cy="64%" r="62%">
                <stop offset="0%" stopColor="rgba(255,232,178,0.5)" />
                <stop offset="100%" stopColor="rgba(255,232,178,0)" />
              </radialGradient>
            </defs>
            <path d="M20 126 L20 52 A26 26 0 0 1 72 52 L72 126 Z" fill="url(#doorGlow)" />
            <path d="M11 127 L11 48 A35 35 0 0 1 81 48 L81 127" fill="none" stroke="rgba(236,209,147,0.5)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.3, color: 'rgba(246,239,228,0.88)', margin: '0 auto' }}>The house is always open.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(15px,1.7vw,21px)', lineHeight: 1.6, color: 'rgba(246,239,228,0.5)', margin: 'clamp(16px,2.6vh,26px) auto 0' }}>Return whenever you need clarity.</p>
        <El
          onClick={ctx.replay}
          style={{ display: 'inline-block', margin: 'clamp(60px,11vh,132px) auto 0', fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.45)', borderBottom: '1px solid transparent', paddingBottom: 5, cursor: 'pointer', transition: 'color 500ms ease, border-color 500ms ease' }}
          hover={{ color: 'rgba(246,239,228,0.9)', borderColor: 'rgba(236,209,147,0.5)' }}
        >
          Return to the Door
        </El>
      </div>

      {/* the practical footer — subordinate, like publishing information at the
          end of a book. (Privacy/Terms/LinkedIn/Accessibility await real URLs.) */}
      <div style={{ maxWidth: 1120, margin: 'clamp(96px,16vh,200px) auto 0', paddingTop: 'clamp(28px,4.5vh,52px)', borderTop: '1px solid rgba(246,239,228,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em 2.4em' }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 15, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.7)' }}>Believe Studio</span>
        <nav aria-label="Site information" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6em 1.9em', alignItems: 'baseline' }}>
          <El as="button" onClick={ctx.openWork} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.55)', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', transition: 'color 350ms ease' }} hover={{ color: 'rgba(246,239,228,0.9)' }}>Contact</El>
          {['Privacy', 'Terms', 'LinkedIn', 'Accessibility'].map((t) => (
            <span key={t} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.4)' }}>{t}</span>
          ))}
        </nav>
        <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(246,239,228,0.36)' }}>&copy; 2026 Believe Studio &middot; Built by belief.</span>
      </div>
    </footer>
  )
}
