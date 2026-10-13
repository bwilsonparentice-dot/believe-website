import type { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { HouseIndex } from './HouseIndex'

/**
 * The end of the House — the brass directory encountered after the walk, then a
 * quiet closing doorway and a subordinate practical footer. (The reflective
 * transition and the six principles now lead into the Founding Wall, upstream.)
 */
export function Footer({ ctx }: { ctx: Ctx }) {
  return (
    <footer style={{ position: 'relative', zIndex: 2, background: '#1e2a44', color: 'rgba(246,239,228,0.9)', padding: 'clamp(60px,12vh,150px) clamp(30px,8vw,120px)' }}>
      {/* a quiet introduction, then the full brass directory */}
      <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto clamp(30px,5vh,56px)' }}>
        <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.6)', margin: '0 0 1.6em' }}>The House Directory</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(15px,1.7vw,22px)', lineHeight: 1.6, color: 'rgba(246,239,228,0.6)', margin: 0 }}>Every founder walks a different path. Return to any room whenever you need it.</p>
      </div>

      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', padding: 'clamp(20px,4vh,60px) 6vw' }}>
        <HouseIndex ctx={ctx} variant="footer" />
      </div>

      {/* the practical footer — subordinate, like publishing information at the
          end of a book. (The emotional closing — "the house is always open" —
          now lives in the Closing section just above; the footer is the quiet
          directory and the end-matter.) (Privacy/Terms/LinkedIn/Accessibility
          await real URLs.) */}
      <div style={{ maxWidth: 1120, margin: 'clamp(48px,7.5vh,104px) auto 0', paddingTop: 'clamp(26px,4vh,46px)', borderTop: '1px solid rgba(246,239,228,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em 2.4em' }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 15, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.7)' }}>Believe Studio</span>
        <nav aria-label="Site information" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6em 1.9em', alignItems: 'baseline' }}>
          {(() => {
            const fsLink: CSSProperties = { fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.55)', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'none', transition: 'color 350ms ease' }
            const hv = { color: 'rgba(246,239,228,0.9)' }
            return (
              <>
                <El as="button" onClick={ctx.openWork} style={fsLink} hover={hv}>Work with Believe</El>
                <El as="button" onClick={ctx.openPrivacy} style={fsLink} hover={hv}>Privacy</El>
                <El as="button" onClick={ctx.openTerms} style={fsLink} hover={hv}>Terms</El>
                <El as="a" href="https://www.linkedin.com/company/believe-studio-co" target="_blank" rel="noopener noreferrer" style={fsLink} hover={hv}>LinkedIn</El>
                <El as="button" onClick={ctx.openAccessibility} style={fsLink} hover={hv}>Accessibility</El>
              </>
            )
          })()}
        </nav>
        <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(246,239,228,0.36)' }}>&copy; 2026 Believe Studio &middot; Built by belief.</span>
      </div>
    </footer>
  )
}
