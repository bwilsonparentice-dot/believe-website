import type { Ctx } from '../lib/ctx'
import { DirectoryPlaque } from './DirectoryPlaque'

/**
 * The end of the House. The reflective transition and the six principles form a
 * quiet courtyard, and then the brass directory appears in full — no longer an
 * interruption, but an architectural object encountered after the walk:
 * every room still here, should the visitor wish to return to any of them.
 */
export function Footer({ ctx, principles }: { ctx: Ctx; principles: string[] }) {
  return (
    <footer style={{ position: 'relative', zIndex: 2, background: '#161613', color: 'rgba(246,239,228,0.9)', padding: 'clamp(60px,12vh,150px) clamp(30px,8vw,120px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto 3.4em', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.34, color: 'rgba(246,239,228,0.9)', margin: '0 auto 1.5em', maxWidth: '26ch' }}>No founder walks the same path &mdash; yet every room leads toward greater clarity.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(13px,1.5vw,20px)', lineHeight: 1.7, color: 'rgba(246,239,228,0.62)', margin: '0 auto 2.6em' }}>Come in. We&rsquo;ve been expecting you. The door has never been locked.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em 2.6em', alignItems: 'baseline', justifyContent: 'center' }}>
          {principles.map((pr) => (
            <span key={pr} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.6)' }}>{pr}</span>
          ))}
        </div>
      </div>

      {/* a quiet introduction, then the full brass directory */}
      <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto clamp(30px,5vh,56px)' }}>
        <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.6)', margin: '0 0 1.6em' }}>The House Directory</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(15px,1.7vw,22px)', lineHeight: 1.6, color: 'rgba(246,239,228,0.6)', margin: 0 }}>Every founder walks a different path. Return to any room whenever you need it.</p>
      </div>

      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', padding: 'clamp(20px,4vh,60px) 6vw' }}>
        <DirectoryPlaque ctx={ctx} />
      </div>

      <div style={{ textAlign: 'center', marginTop: 'clamp(34px,6vh,66px)' }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(246,239,228,0.38)', margin: '0 auto' }}>The house is always open.</p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.4)', margin: 'clamp(22px,4vh,40px) auto 0' }}>Built by belief.</p>
      </div>
    </footer>
  )
}
