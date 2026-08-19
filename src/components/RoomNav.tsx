import { CSSProperties, ReactNode } from 'react'
import { El } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'

/**
 * RoomNav — the understated way to keep moving through the House from inside a
 * room: the previous room, the next room (or "Continue through the House" at the
 * end of the walk), and the Directory. Returning to the building stays available
 * in the corner of every chapter (ChapterShell), so this stays quiet text —
 * a hallway between rooms, never a website menu.
 */
const sans = "'Jost',sans-serif"
const ink = '#2b2723'
const brass = 'rgba(122,94,52,0.9)'

type Room = { slug: string; name: string; open: (c: Ctx) => Handler }
// the guided walk through the primary rooms, in narrative order
const WALK: Room[] = [
  { slug: 'blueprint', name: 'The Believe Blueprint', open: (c) => c.openBlueprint },
  { slug: 'founders-room', name: 'The Founder’s Room', open: (c) => c.openFounderRoom },
  { slug: 'table', name: 'The Table', open: (c) => c.openTable },
  { slug: 'private-advisory', name: 'Private Advisory', open: (c) => c.openAdvisory },
  { slug: 'studio', name: 'The Studio', open: (c) => c.openStudioPage },
  { slug: 'library', name: 'The Library', open: (c) => c.openLibrary },
]

const linkBase: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
  color: brass, background: 'transparent', border: 'none', padding: '4px 0', cursor: 'pointer',
  transition: 'color 360ms ease', lineHeight: 1.5,
}

function NavLink({ onClick, children, align = 'center', dim = false }: { onClick: Handler; children: ReactNode; align?: CSSProperties['textAlign']; dim?: boolean }) {
  return (
    <El as="button" onClick={onClick} style={{ ...linkBase, textAlign: align, ...(dim ? { fontSize: 10, letterSpacing: '0.24em', color: 'rgba(122,94,52,0.62)' } : {}) }} hover={{ color: ink }}>{children}</El>
  )
}

export function RoomNav({ ctx, slug }: { ctx: Ctx; slug: string }) {
  const i = WALK.findIndex((r) => r.slug === slug)
  const prev = i > 0 ? WALK[i - 1] : null
  const next = i >= 0 && i < WALK.length - 1 ? WALK[i + 1] : null
  return (
    <nav aria-label="Move through the House" style={{ width: 'min(760px, 92vw)', margin: '0 auto' }}>
      {/* primary spatial navigation — the previous and next rooms. This is the
          room-to-room hierarchy and it never bends around anything else. */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1em 2em', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'left' }}>
          {prev && <NavLink onClick={prev.open(ctx)} align="left">&larr;&nbsp;{prev.name}</NavLink>}
        </div>
        <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
          {next
            ? <NavLink onClick={next.open(ctx)} align="right">{next.name}&nbsp;&rarr;</NavLink>
            : <NavLink onClick={ctx.toBuilding} align="right">Continue through the House&nbsp;&rarr;</NavLink>}
        </div>
      </div>
      {/* a quiet secondary line — the plain commercial door and the House
          index, kept subordinate so the spatial navigation stays primary. */}
      <div style={{ marginTop: 'clamp(20px,3.4vh,34px)', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: '0.5em 1.1em' }}>
        <NavLink onClick={ctx.openWork} dim>Work with Believe</NavLink>
        <span aria-hidden="true" style={{ color: 'rgba(122,94,52,0.38)', fontSize: 10 }}>&middot;</span>
        <NavLink onClick={ctx.openDirectory} dim>Directory</NavLink>
      </div>
    </nav>
  )
}
