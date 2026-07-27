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
 * The plaque is organized into four engraved families — ROOMS · THE LIVING
 * HOUSE · THE PEOPLE · THE FOUNDATION — with "Return to the Door" beneath.
 * Hotspot coordinates are fractions of the 1536×1024 plaque.
 */
type Spot = { left: string; top: string; width: string; height?: string; go: Handler; label: string }

export function DirectoryPlaque({ ctx, onNavigate }: { ctx: Ctx; onNavigate?: () => void }) {
  const wrap = (go: Handler): Handler => (e) => { go(e); onNavigate?.() }

  // the four engraved columns, by their left edge and text width
  const COL = {
    rooms: { left: '12.4%', width: '21%' },
    living: { left: '34.2%', width: '17%' },
    people: { left: '55%', width: '15%' },
    foundation: { left: '75.2%', width: '17%' },
  }
  // engraved rows, top edge for a ~4.6% tall line
  const R = ['37.4%', '42.1%', '46.7%', '51.4%', '56.1%', '60.7%', '65.3%']
  const H = '4.6%'

  const rooms: Spot[] = [
    { ...COL.rooms, top: R[0], height: H, go: ctx.openBlueprint, label: 'The Believe Blueprint' },
    { ...COL.rooms, top: R[1], height: H, go: ctx.openFounderRoom, label: 'The Founder’s Room' },
    { ...COL.rooms, top: R[2], height: H, go: ctx.openTable, label: 'The Table' },
    { ...COL.rooms, top: R[3], height: H, go: ctx.openAdvisory, label: 'Private Advisory' },
    { ...COL.rooms, top: R[4], height: H, go: ctx.openStudioPage, label: 'The Studio' },
    { ...COL.rooms, top: R[5], height: H, go: ctx.openLibrary, label: 'The Library' },
    { ...COL.rooms, top: R[6], height: H, go: ctx.openStage, label: 'The Stage' },
  ]
  const living: Spot[] = [
    { ...COL.living, top: R[0], height: H, go: ctx.openStudio, label: 'In Residence' },
    { ...COL.living, top: R[1], height: H, go: ctx.openStories, label: 'Stories' },
    { ...COL.living, top: R[2], height: H, go: ctx.openFieldNotes, label: 'Field Notes' },
    { ...COL.living, top: R[3], height: H, go: ctx.openDoorway('visionary-collective'), label: 'The Visionary Collective' },
  ]
  const people: Spot[] = [
    { ...COL.people, top: R[0], height: H, go: ctx.openPeople, label: 'The People' },
    { ...COL.people, top: R[1], height: H, go: ctx.openHouses, label: 'The Houses to Come' },
  ]
  const foundation: Spot[] = [
    { ...COL.foundation, top: R[0], height: H, go: ctx.gotoAnchor('room-threshold'), label: 'Threshold' },
    { ...COL.foundation, top: R[1], height: H, go: ctx.gotoAnchor('founding-wall'), label: 'The Founding Wall' },
    // "The Language of the House" wraps onto two engraved lines — a taller hotspot
    { ...COL.foundation, top: R[2], height: '9.2%', go: ctx.gotoAnchor('the-language'), label: 'The Language of the House' },
  ]
  const all = [...rooms, ...living, ...people, ...foundation]

  return (
    <div
      style={{
        maxWidth: 1120, margin: '0 auto', position: 'relative', aspectRatio: '1536 / 1024',
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
          style={{ position: 'absolute', left: s.left, top: s.top, width: s.width, height: s.height || '4.6%', cursor: 'pointer', borderRadius: 3, border: 'none', background: 'transparent', padding: 0, transition: 'background 350ms ease' }}
          hover={{ background: 'radial-gradient(closest-side, rgba(255,240,205,0.16), transparent 82%)' }}
        />
      ))}
      {/* Return to the Door */}
      <El
        as="button"
        onClick={wrap(ctx.replay)}
        aria-label="Return to the door"
        title="Return to the door"
        style={{ position: 'absolute', left: '38%', top: '68.5%', width: '24%', height: '7.5%', cursor: 'pointer', borderRadius: 4, border: 'none', background: 'transparent', padding: 0, transition: 'background 350ms ease' }}
        hover={{ background: 'radial-gradient(closest-side, rgba(255,240,205,0.18), transparent 82%)' }}
      />
    </div>
  )
}
