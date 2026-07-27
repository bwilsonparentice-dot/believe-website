import { El } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'

/**
 * The engraved brass directory plaque — the real plaque photograph with
 * invisible clickable hotspots laid over each engraved line. The lettering
 * lives in the image; we only place the doors.
 *
 * Shared by the footer (mounted at the end of the House) and the Directory
 * overlay (opened from the persistent control). When `onNavigate` is provided,
 * it fires after any hotspot is chosen — the overlay uses it to close itself,
 * so a visitor is carried straight into the room they picked.
 *
 * Hotspot coordinates are fractions of the 1920×1080 plaque.
 */
type Spot = { left: string; top: string; width: string; go: Handler; label: string }

export function DirectoryPlaque({ ctx, onNavigate }: { ctx: Ctx; onNavigate?: () => void }) {
  const wrap = (go: Handler): Handler => (e) => { go(e); onNavigate?.() }

  const rooms: Spot[] = [
    { left: '17%', top: '39.5%', width: '22%', go: ctx.openFounderRoom, label: 'The Founder’s Room' },
    { left: '17%', top: '45.5%', width: '22%', go: ctx.openBlueprint, label: 'The Believe Blueprint' },
    { left: '17%', top: '51.5%', width: '22%', go: ctx.openTable, label: 'The Table' },
    { left: '17%', top: '57.5%', width: '22%', go: ctx.openLibrary, label: 'The Library' },
    { left: '17%', top: '63.5%', width: '22%', go: ctx.openStudioPage, label: 'The Studio' },
    { left: '17%', top: '69.5%', width: '22%', go: ctx.openStage, label: 'The Stage' },
    { left: '17%', top: '75.5%', width: '22%', go: ctx.openPeople, label: 'The People' },
  ]
  const begin: Spot[] = [
    { left: '41.5%', top: '39.5%', width: '24%', go: ctx.openBlueprint, label: 'Begin with the Blueprint' },
    { left: '41.5%', top: '45.5%', width: '24%', go: ctx.openFounderRoom, label: 'Enter the Founder’s Room' },
    { left: '41.5%', top: '51.5%', width: '24%', go: ctx.openAdvisory, label: 'Private Advisory' },
    { left: '41.5%', top: '57.5%', width: '24%', go: ctx.openWork, label: 'Begin a conversation' },
  ]
  const journal: Spot[] = [
    { left: '66.5%', top: '39.5%', width: '24%', go: ctx.openStories, label: 'Stories' },
    { left: '66.5%', top: '45.5%', width: '24%', go: ctx.openFieldNotes, label: 'Field Notes' },
    { left: '66.5%', top: '51.5%', width: '24%', go: ctx.openStudio, label: 'In Residence' },
    { left: '66.5%', top: '57.5%', width: '24%', go: ctx.openHouse, label: 'The House' },
    { left: '66.5%', top: '63.5%', width: '24%', go: ctx.openHouses, label: 'The Houses to Come' },
  ]
  const all = [...rooms, ...begin, ...journal]

  return (
    <div
      style={{
        maxWidth: 1120, margin: '0 auto', position: 'relative', aspectRatio: '1920 / 1080',
        backgroundImage: "url('/photos/directory-plaque.webp')",
        backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.6))',
      }}
      role="navigation"
      aria-label="The House Directory"
    >
      {all.map((s, i) => (
        <El
          key={i}
          as="button"
          onClick={wrap(s.go)}
          aria-label={s.label}
          style={{ position: 'absolute', left: s.left, top: s.top, width: s.width, height: '5.4%', cursor: 'pointer', borderRadius: 3, border: 'none', background: 'transparent', padding: 0, transition: 'background 350ms ease' }}
          hover={{ background: 'radial-gradient(closest-side, rgba(255,240,205,0.14), transparent 80%)' }}
        />
      ))}
      {/* Return to the door */}
      <El
        as="button"
        onClick={wrap(ctx.replay)}
        aria-label="Return to the door"
        title="Return to the door"
        style={{ position: 'absolute', left: '38%', top: '80%', width: '24%', height: '9%', cursor: 'pointer', borderRadius: 4, border: 'none', background: 'transparent', padding: 0, transition: 'background 350ms ease' }}
        hover={{ background: 'radial-gradient(closest-side, rgba(255,240,205,0.16), transparent 80%)' }}
      />
    </div>
  )
}
