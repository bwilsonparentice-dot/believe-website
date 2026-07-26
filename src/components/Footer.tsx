import { El } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'

/**
 * The brass directory — the real engraved plaque photograph, with invisible
 * clickable hotspots laid over each engraved line (as the design intends). The
 * lettering lives in the image; we only place the doors.
 *
 * Hotspot coordinates are fractions of the 1920×1080 plaque.
 */
type Spot = { left: string; top: string; width: string; go: Handler }

export function Footer({ ctx, principles }: { ctx: Ctx; principles: string[] }) {
  const rooms: Spot[] = [
    { left: '17%', top: '39.5%', width: '22%', go: ctx.openFounderRoom },
    { left: '17%', top: '45.5%', width: '22%', go: ctx.openBlueprint },
    { left: '17%', top: '51.5%', width: '22%', go: ctx.openTable },
    { left: '17%', top: '57.5%', width: '22%', go: ctx.openLibrary },
    { left: '17%', top: '63.5%', width: '22%', go: ctx.openStudioPage },
    { left: '17%', top: '69.5%', width: '22%', go: ctx.openStage },
    { left: '17%', top: '75.5%', width: '22%', go: ctx.openPeople },
  ]
  const begin: Spot[] = [
    { left: '41.5%', top: '39.5%', width: '24%', go: ctx.openBlueprint },
    { left: '41.5%', top: '45.5%', width: '24%', go: ctx.openFounderRoom },
    { left: '41.5%', top: '51.5%', width: '24%', go: ctx.openAdvisory },
    { left: '41.5%', top: '57.5%', width: '24%', go: ctx.openWork },
  ]
  const journal: Spot[] = [
    { left: '66.5%', top: '39.5%', width: '24%', go: ctx.openStories },
    { left: '66.5%', top: '45.5%', width: '24%', go: ctx.openFieldNotes },
    { left: '66.5%', top: '51.5%', width: '24%', go: ctx.openStudio },
    { left: '66.5%', top: '57.5%', width: '24%', go: ctx.openHouse },
    { left: '66.5%', top: '63.5%', width: '24%', go: ctx.openHouses },
  ]
  const all = [...rooms, ...begin, ...journal]

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

      {/* the engraved brass directory plaque + invisible hotspots */}
      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', padding: 'clamp(20px,4vh,60px) 6vw' }}>
        <div
          style={{
            maxWidth: 1120, margin: '0 auto', position: 'relative', aspectRatio: '1920 / 1080',
            backgroundImage: "url('/photos/directory-plaque.webp')",
            backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
            filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.6))',
          }}
        >
          {all.map((s, i) => (
            <El
              key={i}
              onClick={s.go}
              style={{ position: 'absolute', left: s.left, top: s.top, width: s.width, height: '5.4%', cursor: 'pointer', borderRadius: 3, transition: 'background 350ms ease' }}
              hover={{ background: 'radial-gradient(closest-side, rgba(255,240,205,0.14), transparent 80%)' }}
            />
          ))}
          {/* Return to the door */}
          <El
            onClick={ctx.replay}
            title="Return to the door"
            style={{ position: 'absolute', left: '38%', top: '80%', width: '24%', height: '9%', cursor: 'pointer', borderRadius: 4, transition: 'background 350ms ease' }}
            hover={{ background: 'radial-gradient(closest-side, rgba(255,240,205,0.16), transparent 80%)' }}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'clamp(34px,6vh,66px)' }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(246,239,228,0.38)', margin: '0 auto' }}>The house is always open.</p>
      </div>
    </footer>
  )
}
