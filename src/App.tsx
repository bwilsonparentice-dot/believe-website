import React from 'react'
import { El, stop } from './lib/El'
import { HouseAudio } from './lib/audio'
import { BreezeDriver, BirdFlock, motionAllowed } from './lib/motion'
import { Motes, makeMotes, type Mote } from './components/Motes'
import { ImageSlot } from './components/ImageSlot'
import { FacadePhoto } from './components/FacadePhoto'
import { DoorCrack } from './components/DoorCrack'
import { Prologue } from './components/Prologue'
import { buildRooms, roomKeyFor, PRINCIPLES } from './data'
import type { Ctx, Handler } from './lib/ctx'
import { Footer } from './components/Footer'
import { DirectoryOverlay } from './components/DirectoryOverlay'
import { LivingHouse } from './components/LivingHouse'
import { Community } from './components/Community'

// chapters
import { BlueprintChapter } from './chapters/Blueprint'
import { TableChapter } from './chapters/Table'
import { LibraryChapter } from './chapters/Library'
import { InResidenceChapter } from './chapters/InResidence'
import { StudioChapter } from './chapters/Studio'
import { VisionaryCollectiveChapter } from './chapters/VisionaryCollective'
import { AdvisoryChapter } from './chapters/Advisory'
import { StageChapter } from './chapters/Stage'
import { PeopleChapter } from './chapters/People'
import { StoriesChapter } from './chapters/Stories'
import { HouseChapter } from './chapters/House'
import { WhyBelieveChapter } from './chapters/WhyBelieve'
import { WorkChapter } from './chapters/Work'
import { Foyer } from './components/Foyer'
import { DoorwayChapter } from './chapters/Doorway'
import { BlueprintFolio } from './chapters/BlueprintFolio'
import { FoundersRoom } from './chapters/FoundersRoom'
import { ArchiveCard } from './components/ArchiveCard'
import { FieldNotesChapter } from './chapters/FieldNotes'
import { HousesChapter } from './chapters/Houses'
import { ReceiveKey } from './chapters/ReceiveKey'
// NOTE: the legacy FounderRoomChapter (./chapters/FounderRoom) was removed — the
// Founder's Room resolves to FoundersRoom via openDoorway('founders-room').

type Phase = 'overture' | 'sketch' | 'foyer' | 'prologue' | 'map'

interface State {
  phase: Phase
  opening: boolean
  roomsRevealed: boolean
  justEntered: boolean
  prologueSeen: boolean
  activeId: string | null
  activeDoorway: string | null
  hasKey: boolean
  pendingRoom: string | null
  showHouses: boolean; showPeople: boolean; showStudio: boolean
  showHouse: boolean; showWhyBelieve: boolean; showLibrary: boolean; showBlueprint: boolean; showFieldNotes: boolean
  showStories: boolean; showTable: boolean; showWork: boolean; showAdvisory: boolean; showStage: boolean
  showStudioPage: boolean
  showDirectory: boolean
  showKey: boolean
  facadeReady: boolean
  birdLanded: boolean
}

// the founder philosophy, engraved in stone — the House's emotional anchor
const FOUNDER_WALL = '/photos/founder-wall.webp'

// house preferences (the source's tweak props, with their defaults)
const LIGHT_MOTION = true
const VEIL_MOOD: 'Warm dusk' | 'Cool dawn' = 'Warm dusk'

// The guided prologue plays only on a visitor's first arrival. We remember that
// across visits so a returning founder walks straight into the house.
const PROLOGUE_KEY = 'believe.prologueSeen'
function hasSeenPrologue(): boolean {
  try { return typeof localStorage !== 'undefined' && localStorage.getItem(PROLOGUE_KEY) === '1' } catch { return false }
}
function rememberPrologueSeen() {
  try { localStorage.setItem(PROLOGUE_KEY, '1') } catch { /* private mode — fall back to session memory */ }
}

// Whether the visitor has entered the House before. We remember it, but we
// never use it to skip the arrival: the door drawing is the strongest beat in
// the House, only eight seconds long, and every visitor — first-time or
// returning — should see it. The guided prologue is what a returning visitor
// is spared (see enterBuilding), never the drawing.
const VISITED_KEY = 'believe.visited'
function rememberVisited() {
  try { localStorage.setItem(VISITED_KEY, '1') } catch { /* ignore */ }
}
function hasVisited(): boolean {
  try { return typeof localStorage !== 'undefined' && localStorage.getItem(VISITED_KEY) === '1' } catch { return false }
}
// The Foyer as a direct destination — /foyer or ?foyer opens it straight away.
function isFoyerRoute(): boolean {
  if (typeof window === 'undefined') return false
  try { return new URLSearchParams(window.location.search).has('foyer') || /^\/foyer\/?$/.test(window.location.pathname) } catch { return false }
}

// ── shareable routes ────────────────────────────────────────────────────────
// A thin URL layer over the state machine. Opening a room reflects into the
// path; the browser back/forward buttons move between rooms; and a direct link
// (e.g. /in-residence) opens that room without walking through the Door. Scroll
// position is preserved for free — the building stays mounted beneath the fixed
// room overlays, so closing a room reveals it exactly where it was left.
const DOORWAY_SLUG: Record<string, string> = {
  'believe-blueprint': 'blueprint',
  'founders-room': 'founders-room',
  'founders-table': 'table',
  'private-advisory': 'private-advisory',
  'visionary-collective': 'visionary-collective',
}
const FLAG_SLUG: Partial<Record<keyof State, string>> = {
  showWork: 'work',
  showStudioPage: 'studio',
  showStudio: 'in-residence',
  showLibrary: 'library',
  showStories: 'stories',
  showFieldNotes: 'field-notes',
  showPeople: 'people',
  showHouses: 'houses',
  showStage: 'stage',
}
const SLUG_TO_DOORWAY: Record<string, string> = Object.fromEntries(Object.entries(DOORWAY_SLUG).map(([id, s]) => [s, id]))
const SLUG_TO_FLAG: Record<string, keyof State> = Object.fromEntries(Object.entries(FLAG_SLUG).map(([k, s]) => [s as string, k as keyof State]))
const ALL_ROUTE_SLUGS = new Set<string>([...Object.keys(SLUG_TO_DOORWAY), ...Object.keys(SLUG_TO_FLAG)])
// in-building scroll targets (not overlays) — links into the guided journey
const BUILDING_ANCHORS = new Set(['threshold', 'founding-wall'])

const rawPath = (pathname: string) => pathname.replace(/^\/+|\/+$/g, '')

/** the slug for the overlay currently open, or null for the building itself */
function overlaySlugOf(s: State): string | null {
  if (s.activeDoorway && DOORWAY_SLUG[s.activeDoorway]) return DOORWAY_SLUG[s.activeDoorway]
  for (const key of Object.keys(FLAG_SLUG) as (keyof State)[]) { if (s[key]) return FLAG_SLUG[key]! }
  return null
}
/** the overlay slug named by a path, or null if the path is the building/unknown */
function overlaySlugFromPath(pathname: string): string | null {
  const raw = rawPath(pathname)
  return ALL_ROUTE_SLUGS.has(raw) ? raw : null
}

// every overlay flag/doorway, closed — the neutral ground a route opens from
const CLOSED_OVERLAYS: Partial<State> = {
  showHouses: false, showPeople: false, showStudio: false, showStudioPage: false,
  showStories: false, showHouse: false, showWhyBelieve: false, showLibrary: false, showBlueprint: false,
  showFieldNotes: false, showTable: false, showWork: false, showAdvisory: false, showStage: false,
  showDirectory: false, activeDoorway: null,
}
/** the state that opens the overlay a slug names (all others closed) */
function openStateForSlug(slug: string): Partial<State> {
  const base: Partial<State> = { ...CLOSED_OVERLAYS }
  if (SLUG_TO_DOORWAY[slug]) base.activeDoorway = SLUG_TO_DOORWAY[slug]
  else if (SLUG_TO_FLAG[slug]) (base as Record<string, unknown>)[SLUG_TO_FLAG[slug] as string] = true
  return base
}

/** the base state, honoring a deep link so /in-residence opens the House directly */
function makeInitialState(): State {
  const base: State = {
    phase: 'overture', opening: false, roomsRevealed: false, justEntered: false, prologueSeen: hasSeenPrologue(),
    activeId: null, activeDoorway: null, hasKey: false, pendingRoom: null,
    showHouses: false, showPeople: false, showStudio: false,
    showHouse: false, showWhyBelieve: false, showLibrary: false, showBlueprint: false, showFieldNotes: false,
    showStories: false, showTable: false, showWork: false, showAdvisory: false, showStage: false,
    showStudioPage: false, showDirectory: false,
    showKey: false, facadeReady: false, birdLanded: false,
  }
  if (typeof window === 'undefined') return base
  const path = window.location.pathname
  if (isFoyerRoute()) return { ...base, phase: 'foyer' }
  const slug = overlaySlugFromPath(path)
  if (slug) return { ...base, phase: 'map', roomsRevealed: true, prologueSeen: true, ...openStateForSlug(slug) }
  if (BUILDING_ANCHORS.has(rawPath(path))) return { ...base, phase: 'map', roomsRevealed: true, prologueSeen: true }
  return base
}

export class App extends React.Component<Record<string, never>, State> {
  private audio = new HouseAudio()
  private breeze = new BreezeDriver(motionAllowed(LIGHT_MOTION))
  private birds = new BirdFlock(() => this.birdsAllowed())
  private rooms = buildRooms()
  private ctx: Ctx
  private headerEl: HTMLDivElement | null = null
  private coverMotes: Mote[] = makeMotes(7, 7, 40, 24, 20, 60)
  private roomMotes: Mote[] = makeMotes(6, 33, 12, 70, 12, 58)

  // timers
  private tAccept?: ReturnType<typeof setTimeout>
  private tDoor?: ReturnType<typeof setTimeout>
  private tEnter?: ReturnType<typeof setTimeout>
  private tWelcome?: ReturnType<typeof setTimeout>
  private tAuto?: ReturnType<typeof setTimeout>
  private tRoom?: ReturnType<typeof setTimeout>
  private tBird?: ReturnType<typeof setTimeout>
  private pending = false
  private leafPlayed = false
  // routing: the overlay slug currently reflected in the URL, and a guard so
  // popstate-driven state changes don't push a redundant history entry back.
  private lastSlug: string | null = null
  private suppressPush = false

  state: State = makeInitialState()

  constructor(props: Record<string, never>) {
    super(props)
    this.ctx = {
      // The Founder's Room now resolves to its dedicated experience page everywhere it's linked
      openFounderRoom: this.openDoorway('founders-room'), closeFounderRoom: this.closeDoorway,
      openBlueprint: this.openDoorway('believe-blueprint'), closeBlueprint: this.closeDoorway,
      openTable: this.openDoorway('founders-table'), closeTable: this.closeDoorway,
      openLibrary: this.openChapter('showLibrary'), closeLibrary: this.closeChapter('showLibrary'),
      // "Resident Experts" is the doorway; In Residence is the room inside it
      openStudio: this.openChapter('showStudio'), closeStudio: this.closeChapter('showStudio'),
      // The Studio — the workshop page, reached from the brass directory
      openStudioPage: this.openChapter('showStudioPage'), closeStudioPage: this.closeChapter('showStudioPage'),
      openAdvisory: this.openDoorway('private-advisory'), closeAdvisory: this.closeDoorway,
      openStage: this.openChapter('showStage'), closeStage: this.closeChapter('showStage'),
      openPeople: this.openChapter('showPeople'), closePeople: this.closeChapter('showPeople'),
      openStories: this.openChapter('showStories'), closeStories: this.closeChapter('showStories'),
      openHouse: this.openChapter('showHouse'), closeHouse: this.closeChapter('showHouse'),
      openWhyBelieve: this.openChapter('showWhyBelieve'), closeWhyBelieve: this.closeChapter('showWhyBelieve'),
      openHouses: this.openChapter('showHouses'), closeHouses: this.closeChapter('showHouses'),
      openWork: this.openChapter('showWork'), closeWork: this.closeChapter('showWork'),
      openFieldNotes: this.openChapter('showFieldNotes'), closeFieldNotes: this.closeChapter('showFieldNotes'),
      openDoorway: this.openDoorway, closeDoorway: this.closeDoorway,
      openDirectory: this.openDirectory, closeDirectory: this.closeDirectory,
      toBuilding: this.toBuilding,
      receiveKey: this.receiveKey, askKey: this.askKey, closeKey: this.closeKey,
      replay: this.replay,
      gotoRoom: this.gotoRoom,
      gotoAnchor: this.gotoAnchor,
      goForRoomKey: this.goForRoomKey,
      hasKey: false,
    }
  }

  // ── lifecycle ──────────────────────────────────────────────────────────
  componentDidMount() {
    try { if (localStorage.getItem('bs_key') === '1') this.setState({ hasKey: true }) } catch { /* ignore */ }
    window.addEventListener('keydown', this.onKey)
    window.addEventListener('pointerdown', this.onDown)
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('popstate', this.onPopState)

    // reflect the entry URL, and honor a deep link into a specific room
    this.lastSlug = overlaySlugOf(this.state)
    try { window.history.replaceState({ slug: this.lastSlug }, '', window.location.pathname) } catch { /* ignore */ }
    const deepLinked = this.state.phase === 'map'
    if (deepLinked && BUILDING_ANCHORS.has(rawPath(window.location.pathname)) && rawPath(window.location.pathname) === 'founding-wall') {
      setTimeout(() => this.scrollToWall(), 320)
    }

    // the arrival ritual runs only when we actually begin at the Door (first visit)
    if (this.state.phase === 'overture') {
      // the arrival plays hands-free, unhurried — the slowness is part of the
      // emotional experience, so we let it breathe. The faint "Step inside" cue
      // (below) is what reassures a first-time visitor the screen is theirs to
      // touch, without shortening the moment.
      this.tAuto = setTimeout(() => { if (this.state.phase === 'overture' && !this.state.opening) this.accept() }, 2600)
      // the bird finishes crossing and perches in the olive tree (Scene 2)
      this.tBird = setTimeout(() => this.setState({ birdLanded: true }), 2000)
    }
  }
  componentDidUpdate(_p: Record<string, never>, prev: State) {
    if (this.state.phase === 'map' && (prev.phase === 'sketch' || prev.phase === 'prologue')) this.audio.fadeAmbient(2.6)
    if (this.state.hasKey !== this.ctx.hasKey) this.ctx.hasKey = this.state.hasKey
    this.syncUrl()
  }

  // keep the URL in step with the open room, so links are shareable and the
  // browser back/forward buttons walk between rooms as the visitor expects.
  private syncUrl() {
    if (typeof window === 'undefined' || this.state.phase !== 'map') return
    const slug = overlaySlugOf(this.state)
    if (slug === this.lastSlug) return
    this.lastSlug = slug
    if (this.suppressPush) return
    const path = slug ? '/' + slug : '/'
    if (window.location.pathname !== path) {
      try { window.history.pushState({ slug }, '', path) } catch { /* ignore */ }
    }
  }
  // the browser back/forward buttons: mirror the URL back into open/closed state
  private onPopState = () => {
    const slug = overlaySlugFromPath(window.location.pathname)
    this.lastSlug = slug
    this.suppressPush = true
    const done = () => { this.suppressPush = false }
    if (slug) this.setState({ phase: 'map', roomsRevealed: true, prologueSeen: true, ...openStateForSlug(slug) } as unknown as Pick<State, keyof State>, done)
    else this.setState({ ...this.closedChapters() } as unknown as Pick<State, keyof State>, done)
  }
  private scrollToWall() {
    const el = document.querySelector('section[aria-label^="The founder philosophy"]') as HTMLElement | null
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKey)
    window.removeEventListener('pointerdown', this.onDown)
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('popstate', this.onPopState)
    ;[this.tAccept, this.tDoor, this.tEnter, this.tWelcome, this.tAuto, this.tRoom, this.tBird].forEach((t) => t && clearTimeout(t))
    this.breeze.dispose(); this.birds.dispose(); this.audio.dispose()
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.state.showDirectory) { this.setState({ showDirectory: false }); return }
      if (this.state.activeDoorway) { this.setState({ activeDoorway: null }); return }
      const order: (keyof State)[] = ['showStories', 'showFieldNotes', 'showBlueprint', 'showTable', 'showWork', 'showAdvisory', 'showStage', 'showLibrary', 'showHouse', 'showWhyBelieve', 'showStudio', 'showStudioPage', 'showPeople', 'showHouses', 'showKey']
      for (const k of order) { if (this.state[k]) { this.setState({ [k]: false } as unknown as Pick<State, keyof State>); return } }
      if (this.state.activeId) { this.closeRoom(); return }
    }
    if (this.state.phase === 'overture' && !this.state.opening && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); this.accept() }
  }
  private onDown = () => {
    this.audio.resume()
    if (this.state.phase === 'overture') {
      if (!this.leafPlayed) { this.leafPlayed = true; this.audio.leafRustle() }
      this.audio.startBreezeBed()
    }
    if (this.state.phase === 'sketch' && !this.audio.hasAmbient) this.audio.startAmbient()
  }
  private onScroll = () => {
    const el = this.headerEl; if (!el) return
    const y = window.scrollY || 0
    const fade = Math.max(0, Math.min(1, y / (window.innerHeight * 0.22)))
    el.style.opacity = String(1 - fade)
  }

  // ── the opening ritual ───────────────────────────────────────────────
  private accept = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (this.state.opening || this.pending) return
    this.pending = true
    this.audio.resume()
    setTimeout(() => {
      this.pending = false
      this.setState({ opening: true })
      if (this.tAccept) clearTimeout(this.tAccept)
      this.tAccept = setTimeout(() => this.toSketch(), 1000)
    }, 280) // Scene 5 — nothing happens immediately; ~280ms later the handle turns
  }
  private skip = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (this.tAccept) clearTimeout(this.tAccept)
    if (this.tDoor) clearTimeout(this.tDoor)
    if (this.tEnter) clearTimeout(this.tEnter)
    rememberVisited()
    this.audio.fadeAmbient(1.4)
    this.setState({ phase: 'foyer', opening: false })
  }
  private toSketch = () => {
    this.setState({ phase: 'sketch', activeId: null })
    this.audio.resume(); this.audio.startAmbient()
    if (this.tDoor) clearTimeout(this.tDoor)
    this.tDoor = setTimeout(() => { if (this.state.phase === 'sketch') this.audio.doorOpen() }, 1400)
    if (this.tEnter) clearTimeout(this.tEnter)
    this.tEnter = setTimeout(() => { if (this.state.phase === 'sketch') this.toFoyer() }, 2300)
  }
  private enterBuilding = () => {
    if (this.tEnter) clearTimeout(this.tEnter)
    // the guided walk plays once before the house opens; afterwards we go straight in
    if (!this.state.prologueSeen) { this.audio.fadeAmbient(2.2); this.setState({ phase: 'prologue', activeId: null }); return }
    this.enterHouse()
  }
  private enterHouse = () => {
    rememberPrologueSeen(); rememberVisited()
    this.audio.fadeAmbient(1.6)
    this.setState({ phase: 'map', prologueSeen: true, activeId: null, justEntered: true, roomsRevealed: false })
    if (this.tWelcome) clearTimeout(this.tWelcome)
    this.tWelcome = setTimeout(() => this.setState({ justEntered: false }), 5400)
  }
  // ── the Foyer — the hard stop after the cinematic arrival ──────────────
  private toFoyer = () => {
    if (this.tEnter) clearTimeout(this.tEnter)
    if (this.tDoor) clearTimeout(this.tDoor)
    rememberVisited() // the cinematic arrival is experienced once
    this.audio.fadeAmbient(1.8)
    this.setState({ phase: 'foyer', opening: false })
  }
  // Explore the House — the visitor chooses depth: continue exactly as the site
  // does today (the Prologue on the first visit, then the rooms).
  private foyerToExplore = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.enterBuilding()
  }
  private replay = () => {
    this.audio.fadeAmbient(1)
    this.setState({ ...this.closedChapters(), phase: 'overture', opening: false, activeId: null, roomsRevealed: false, birdLanded: false, prologueSeen: false } as unknown as Pick<State, keyof State>)
    // returning to the Door resets the path to the root
    this.lastSlug = null
    if (typeof window !== 'undefined' && rawPath(window.location.pathname) !== '') {
      try { window.history.pushState({ slug: null }, '', '/') } catch { /* ignore */ }
    }
    if (this.tBird) clearTimeout(this.tBird)
    this.tBird = setTimeout(() => this.setState({ birdLanded: true }), 2000)
  }
  private revealRooms = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ roomsRevealed: true })
    setTimeout(() => { const el = document.getElementById('room-founders'); if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' }) }, 80)
  }

  // ── rooms & chapters ─────────────────────────────────────────────────
  private openRoom = (id: string) => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const meta = this.rooms.byId(id)
    if (meta && meta.locked && !this.state.hasKey) { this.setState({ showKey: true, pendingRoom: id }); return }
    if (this.tRoom) clearTimeout(this.tRoom)
    this.setState({ activeId: id, showKey: false })
  }
  private closeRoom = () => this.setState({ activeId: null })

  // a dedicated experience page — opening one closes any other open overlay so
  // moving room-to-room (or jumping in from the Directory) never stacks two
  private openDoorway = (id: string): Handler => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ ...this.closedChapters(), activeDoorway: id } as unknown as Pick<State, keyof State>)
  }
  private closeDoorway = () => this.setState({ activeDoorway: null })

  // close every overlay and return to the building — used by the room-to-room
  // nav's "Continue through the House" at the end of the guided walk
  private toBuilding = (e?: React.MouseEvent) => { if (e && e.stopPropagation) e.stopPropagation(); this.setState({ ...this.closedChapters() } as unknown as Pick<State, keyof State>) }

  // The House Directory — the brass plaque, openable as a warm overlay from the
  // persistent control anywhere in the House. Closing returns the visitor to
  // exactly where they were; it never navigates away on its own.
  private openDirectory = (e?: React.MouseEvent) => { if (e && e.stopPropagation) e.stopPropagation(); this.setState({ showDirectory: true }) }
  private closeDirectory = () => this.setState({ showDirectory: false })

  private closedChapters(): Partial<State> {
    return { showHouses: false, showPeople: false, showStudio: false, showStudioPage: false, showStories: false, showHouse: false, showWhyBelieve: false, showLibrary: false, showBlueprint: false, showFieldNotes: false, showTable: false, showWork: false, showAdvisory: false, showStage: false, showDirectory: false, activeDoorway: null }
  }
  private openChapter = (key: keyof State): Handler => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ ...this.closedChapters(), [key]: true } as unknown as Pick<State, keyof State>)
  }
  private closeChapter = (key: keyof State): Handler => () => this.setState({ [key]: false } as unknown as Pick<State, keyof State>)

  private gotoRoom = (id: string): Handler => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ ...this.closedChapters(), showHouses: false } as unknown as Pick<State, keyof State>)
    setTimeout(() => { const el = document.getElementById('room-' + id); if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' }) }, 60)
  }
  // close overlays and scroll to any anchor in the guided page (the Founding
  // Wall, the Language) — used by the Directory's Foundation column
  private gotoAnchor = (elementId: string): Handler => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ ...this.closedChapters() } as unknown as Pick<State, keyof State>)
    setTimeout(() => { const el = document.getElementById(elementId); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 60)
  }
  private goForRoomKey = (key: string): Handler => {
    switch (key) {
      case 'founders': return this.ctx.openDoorway('founders-room')
      case 'library': return this.ctx.openLibrary
      case 'table': return this.ctx.openTable
      case 'studio': return this.ctx.openStudioPage
      case 'advisory': return this.ctx.openAdvisory
      case 'stage': return this.ctx.openStage
      case 'garden': return this.gotoRoom('garden')
      default: return this.ctx.openWork
    }
  }

  private askKey = (e?: React.MouseEvent) => { if (e && e.stopPropagation) e.stopPropagation(); this.setState({ showKey: true, pendingRoom: null }) }
  private closeKey = () => this.setState({ showKey: false, pendingRoom: null })
  private receiveKey = () => {
    try { localStorage.setItem('bs_key', '1') } catch { /* ignore */ }
    const pending = this.state.pendingRoom
    this.setState({ hasKey: true, showKey: false, pendingRoom: null })
    this.ctx.hasKey = true
    if (pending) setTimeout(() => this.openRoom(pending)(), 0)
  }

  private birdsAllowed() {
    if (this.state.phase !== 'map') return false
    if (typeof document !== 'undefined' && document.hidden) return false
    return motionAllowed(LIGHT_MOTION)
  }

  // ── render ───────────────────────────────────────────────────────────
  render() {
    const { phase, opening } = this.state
    const alive = motionAllowed(LIGHT_MOTION)
    const sunShiftAnim = alive ? 'sunShift 170s ease-in-out infinite alternate' : 'none'
    const roomPhotoAnim = alive ? 'slowZoom 18s ease-out both, roomBreath 32s ease-in-out 18s infinite' : 'slowZoom 18s ease-out both'
    const cool = VEIL_MOOD === 'Cool dawn'
    const veilBg = cool ? '#eef0ec' : '#efe6d3'

    // The Foyer sits above the building (z 200), so it must step aside whenever
    // ANY chapter is open — not just Work — or it would cover a page opened from
    // the Foyer (e.g. "Meet the people" from the Work page). Chapters are opaque
    // full-screen overlays, so unmounting the Foyer beneath them is invisible;
    // closing the chapter brings the Foyer back.
    const s = this.state
    const overlayOpen = !!(
      s.showWork || s.showPeople || s.showHouses || s.showStudio || s.showStudioPage ||
      s.showStories || s.showHouse || s.showWhyBelieve || s.showLibrary || s.showBlueprint ||
      s.showFieldNotes || s.showTable || s.showAdvisory || s.showStage || s.showDirectory ||
      s.showKey || s.activeDoorway
    )

    return (
      <>
        {phase === 'overture' && this.renderOverture(opening)}
        {phase === 'sketch' && this.renderSketch()}
        {phase === 'foyer' && !overlayOpen && <Foyer onWork={this.ctx.openWork} onStepInside={this.foyerToExplore} />}
        {phase === 'prologue' && <Prologue onEnter={this.enterHouse} motionOn={alive} />}
        {phase === 'map' && this.renderBuilding(alive, sunShiftAnim)}
        {this.state.activeId && this.renderRoomOverlay(veilBg, sunShiftAnim, roomPhotoAnim, alive)}

        {this.state.showKey && <ReceiveKey ctx={this.ctx} onClose={this.closeKey} />}
        {this.state.showHouses && <HousesChapter ctx={this.ctx} />}
        {this.state.showBlueprint && <BlueprintChapter ctx={this.ctx} />}
        {this.state.showFieldNotes && <FieldNotesChapter ctx={this.ctx} />}
        {this.state.showLibrary && <LibraryChapter ctx={this.ctx} />}
        {this.state.showTable && <TableChapter ctx={this.ctx} />}
        {this.state.showWork && <WorkChapter ctx={this.ctx} />}
        {this.state.activeDoorway === 'believe-blueprint'
          ? <BlueprintFolio ctx={this.ctx} />
          : this.state.activeDoorway === 'founders-room'
          ? <FoundersRoom ctx={this.ctx} />
          : this.state.activeDoorway === 'visionary-collective'
          ? <VisionaryCollectiveChapter ctx={this.ctx} />
          : this.state.activeDoorway && <DoorwayChapter key={this.state.activeDoorway} ctx={this.ctx} id={this.state.activeDoorway} />}
        {this.state.showAdvisory && <AdvisoryChapter ctx={this.ctx} />}
        {this.state.showStage && <StageChapter ctx={this.ctx} />}
        {this.state.showHouse && <HouseChapter ctx={this.ctx} />}
        {this.state.showWhyBelieve && <WhyBelieveChapter ctx={this.ctx} />}
        {this.state.showPeople && <PeopleChapter ctx={this.ctx} />}
        {this.state.showStudio && <InResidenceChapter ctx={this.ctx} />}
        {this.state.showStudioPage && <StudioChapter ctx={this.ctx} />}
        {this.state.showStories && <StoriesChapter ctx={this.ctx} />}
        {this.state.showDirectory && <DirectoryOverlay ctx={this.ctx} onClose={this.closeDirectory} />}
      </>
    )
  }

  // ── OVERTURE — the limestone doorway, filled with morning light ────────
  private renderOverture(opening: boolean) {
    const motionOn = motionAllowed(LIGHT_MOTION)
    const glowAnim = opening ? 'glowGrow 780ms ease 60ms forwards' : 'none'
    const overtureFade = opening ? 'overtureOut 720ms ease 270ms forwards' : 'none'
    const sunShiftAnim = motionOn ? 'sunShift 170s ease-in-out infinite alternate' : 'none'
    // Scene 7 — three quiet steps forward into the house (a walk, not a zoom)
    const walk = opening && motionOn ? 'walkForward 960ms cubic-bezier(.4,0,.3,1) 78ms forwards' : undefined
    return (
      <div onClick={this.accept} style={{ position: 'fixed', inset: 0, zIndex: 40, overflow: 'hidden', background: '#0b0906', cursor: 'pointer', animation: overtureFade }}>
        <div style={{ position: 'absolute', inset: 0, transformOrigin: '51% 46%', animation: walk, background: 'radial-gradient(120% 80% at 30% 10%, rgba(255,246,224,0.92), transparent 55%), linear-gradient(180deg,#efe6d3,#e4d9c1 58%,#dbcfb3)' }}>
          {/* the doorway itself — limestone arch, dark warm interior */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(30vh,60vw)', height: '66vh', maxHeight: 640, borderRadius: '999px 999px 10px 10px', background: 'linear-gradient(180deg, #2a2018 0%, #34271b 60%, #241a12)', boxShadow: 'inset 0 8px 60px rgba(10,6,3,0.8), inset 0 0 0 2px rgba(120,94,52,0.25)' }}>
            <div style={{ position: 'absolute', left: '51%', top: '54%', transform: 'translate(-50%,-50%)', width: '80%', height: '78%', borderRadius: '999px 999px 6px 6px', background: 'radial-gradient(closest-side, rgba(255,238,200,0.9), rgba(240,205,140,0.34) 55%, transparent 82%)', opacity: 0, mixBlendMode: 'screen', filter: 'blur(8px)', animation: glowAnim }} />
          </div>
          {/* the real arrival photograph, when present — covers the CSS doorway fallback */}
          <FacadePhoto onStatus={(present) => { if (present !== this.state.facadeReady) this.setState({ facadeReady: present }) }} />

          {/* the door eases open a crack — warm interior light spilling from the
              real opening edge, aligned to the photograph's own doorway */}
          {this.state.facadeReady && <DoorCrack opening={opening} motionOn={motionAllowed(LIGHT_MOTION)} />}

          {/* a soft limestone lintel shadow */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(58% 50% at 42% 26%, rgba(255,240,205,0.55), rgba(255,240,205,0) 68%)', animation: sunShiftAnim }} />
          <Motes list={this.coverMotes} enabled={motionAllowed(LIGHT_MOTION)} />

          {/* Scene 2 — one bird crosses and lands in the olive tree, then perches */}
          <div style={{ position: 'absolute', left: '13%', top: '30%', zIndex: 2, pointerEvents: 'none', animation: 'birdArrive 1380ms cubic-bezier(.32,.5,.3,1) 540ms both' }}>
            <svg width="46" height="26" viewBox="0 0 80 44" style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 5px 6px rgba(40,28,10,0.28))' }}>
              <g style={{ transformOrigin: '40px 25px', animation: this.state.birdLanded ? 'birdSettle 6s ease-in-out infinite' : 'birdFlap 90ms ease-in-out infinite' }}>
                <path d="M40 25 C31 12, 19 6, 3 3 C16 13, 28 19, 40 27 Z" fill="#243f5e" />
                <path d="M40 25 C49 12, 61 6, 77 3 C64 13, 52 19, 40 27 Z" fill="#243f5e" />
                <path d="M40 25 C33 15, 24 11, 12 7 C22 14, 31 18, 40 26 Z" fill="#b98a3c" opacity="0.7" />
                <path d="M40 25 C47 15, 56 11, 68 7 C58 14, 49 18, 40 26 Z" fill="#b98a3c" opacity="0.7" />
              </g>
              <ellipse cx="40" cy="26" rx="6.4" ry="3" fill="#1d3450" />
              <path d="M40 27 L46 35 L36 34 Z" fill="#c79a44" />
              <circle cx="45" cy="23.5" r="2.6" fill="#1a2f49" />
              <path d="M47.2 23 L51 22.4" stroke="#c79a44" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* the words that complete the photograph */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 4, textAlign: 'center', pointerEvents: 'none', padding: '0 6vw' }}>
            {/* a scrim confined to the doorway, so the words read as light in the dark opening */}
            {/* the house is experienced first — birds, the curtain, the light — then, only then, the words gather */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(300px,58vw)', height: 460, background: 'radial-gradient(60% 60% at 50% 50%, rgba(24,15,6,0.55), rgba(24,15,6,0.2) 62%, transparent 82%)', filter: 'blur(30px)', opacity: 0, animation: 'softFade 840ms ease 660ms both' }} />
            <p style={{ position: 'relative', fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(58px,8vw,122px)', lineHeight: 1.08, color: '#faf4ea', margin: 0, opacity: 0, animation: 'softFade 780ms ease 840ms both', textShadow: '0 1px 2px rgba(20,14,7,0.7), 0 4px 22px rgba(20,14,7,0.85), 0 0 60px rgba(20,14,7,0.6)' }}>Come in.</p>
            <p style={{ position: 'relative', fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(37px,5.3vw,76px)', lineHeight: 1.24, color: '#f2e7cf', margin: '0.5em 0 0', opacity: 0, animation: 'softFade 780ms ease 1620ms both', textShadow: '0 1px 3px rgba(20,14,7,0.85), 0 3px 18px rgba(20,14,7,0.9), 0 0 42px rgba(20,14,7,0.7)' }}>We&rsquo;ve been expecting you.</p>
          </div>

          {opening && (
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '70vh', height: '70vh', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,246,224,1),rgba(230,196,132,0.45) 45%,transparent 72%)', animation: 'bloom 780ms cubic-bezier(.4,.1,.2,1) forwards' }} />
          )}
        </div>

        {/* Scene 1 — the arrival fades up from black (morning birds are heard first) */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 8, background: '#0b0906', pointerEvents: 'none', animation: motionOn ? 'blackReveal 720ms ease 45ms both' : 'blackReveal 210ms ease both' }} />

        {/* a quiet cue that the arrival is theirs to touch — eased in only after
            the second line has landed, so the words are never rushed, and gone
            the moment the visitor steps in */}
        {!opening && (
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(52px,10vh,112px)', zIndex: 5, textAlign: 'center', pointerEvents: 'none', opacity: 0, animation: 'softFade 660ms ease 2040ms both' }}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.56)', marginBottom: '1em', textShadow: '0 1px 12px rgba(20,14,7,0.85)' }}>Step inside</div>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ margin: '0 auto', opacity: 0.7, animation: motionOn ? 'hint 3.4s ease-in-out infinite' : 'none' }}>
              <path d="M2 3 L8 9 L14 3" stroke="rgba(246,239,228,0.72)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        )}

        {/* One quiet way past the arrival for anyone genuinely impatient — never
            a prominent shortcut, and never shown for returning visitors, so the
            door drawing stays the default for everyone. */}
        <El onClick={this.skip} style={{ position: 'absolute', right: 'clamp(20px,3vw,40px)', bottom: 'clamp(18px,3vh,32px)', fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.32)', cursor: 'pointer', transition: 'color 120ms ease', zIndex: 5 }} hover={{ color: 'rgba(43,39,35,0.7)' }}>Skip&nbsp;&rarr;</El>
      </div>
    )
  }

  // ── SKETCH — the doorway drawn line by line, then flooded with light ───
  private renderSketch() {
    return (
      <div onClick={this.enterBuilding} style={{ position: 'fixed', inset: 0, zIndex: 37, cursor: 'pointer', overflow: 'hidden', background: '#f6f1e6', animation: 'veilIn 336ms ease both' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 50% 42%, #fbf7ee, #f3ecdd 72%, #ece3d1)', animation: 'paperBreath 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '11vh', opacity: 0, animation: 'doorFadeIn 336ms ease 112ms forwards' }}>
          <div style={{ position: 'relative', height: '74vh', maxHeight: 680, aspectRatio: '0.52/1' }}>
            <div style={{ position: 'absolute', inset: '5% 8% 0 8%', borderRadius: '999px 999px 0 0', background: 'radial-gradient(120% 96% at 50% 70%, #fff6de, #f1dca6 46%, #e7cb8b)', opacity: 0, animation: 'lightPour 728ms ease 1652ms forwards' }} />
            <svg viewBox="0 0 200 380" preserveAspectRatio="xMidYMax meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              <g fill="none" stroke="rgba(43,39,35,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M100,58 L100,376" pathLength={1} stroke="rgba(43,39,35,0.15)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 252ms ease 140ms forwards' }} />
                <path d="M11,122 L11,376" pathLength={1} stroke="rgba(43,39,35,0.16)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 252ms ease 168ms forwards' }} />
                <path d="M7,122 L15,122 M7,376 L15,376" pathLength={1} stroke="rgba(43,39,35,0.16)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 140ms ease 420ms forwards' }} />
                <path d="M40,42 L160,42" pathLength={1} stroke="rgba(43,39,35,0.15)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 224ms ease 252ms forwards' }} />
                <path d="M40,38 L40,46 M160,38 L160,46" pathLength={1} stroke="rgba(43,39,35,0.15)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 126ms ease 476ms forwards' }} />
                <path d="M36,120 A64,64 0 0 1 164,120" pathLength={1} stroke="rgba(43,39,35,0.13)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 336ms ease 196ms forwards' }} />
                <path d="M14,378 L186,378" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 196ms ease 224ms forwards' }} />
                <path d="M46,378 L46,362 L154,362 L154,378" pathLength={1} strokeWidth="1.3" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 308ms ease 364ms forwards' }} />
                <path d="M40,362 L40,120 A60,60 0 0 1 160,120 L160,362" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 560ms cubic-bezier(.5,0,.5,1) 420ms forwards' }} />
                <path d="M43,360 L43,121 A57,57 0 0 1 157,121 L157,360" pathLength={1} stroke="rgba(43,39,35,0.26)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 560ms cubic-bezier(.5,0,.5,1) 490ms forwards' }} />
                <path d="M102,132 L146,132 L146,350 L102,350 Z" fill="rgba(43,39,35,0.05)" stroke="none" style={{ opacity: 0, animation: 'doorFadeIn 504ms ease 1260ms both' }} />
                <path d="M92,74 L108,74 L106,92 L94,92 Z" pathLength={1} stroke="rgba(43,39,35,0.4)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 196ms ease 952ms forwards' }} />
                <path d="M52,180 L60,180 M52,300 L60,300" pathLength={1} stroke="rgba(43,39,35,0.34)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 140ms ease 1316ms forwards' }} />
                <g style={{ transformBox: 'fill-box', transformOrigin: '1% 52%', animation: 'doorCrack 672ms cubic-bezier(.42,0,.3,1) 1512ms forwards' }}>
                  <path d="M52,360 L52,126 A48,48 0 0 1 148,126 L148,360" pathLength={1} stroke="rgba(43,39,35,0.5)" strokeWidth="1.4" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 476ms cubic-bezier(.5,0,.5,1) 868ms forwards' }} />
                  <path d="M68,150 L132,150 L132,230 L68,230 Z" pathLength={1} stroke="rgba(43,39,35,0.38)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 252ms ease 1092ms forwards' }} />
                  <path d="M68,246 L132,246 L132,344 L68,344 Z" pathLength={1} stroke="rgba(43,39,35,0.38)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 252ms ease 1204ms forwards' }} />
                  <path d="M138,250 L138,300" pathLength={1} stroke="rgba(43,39,35,0.6)" strokeWidth="1.5" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 140ms ease 1372ms forwards' }} />
                  <circle cx="138" cy="250" r="3.4" pathLength={1} stroke="rgba(43,39,35,0.6)" strokeWidth="1.4" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 112ms ease 1456ms forwards' }} />
                </g>
                <path d="M150,130 L150,352" stroke="rgba(232,198,132,0.72)" strokeWidth="2.6" style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0, animation: 'inkDraw 280ms ease 1568ms forwards, doorFadeIn 252ms ease 1568ms forwards' }} />
                <path d="M152,150 L176,300" stroke="rgba(232,198,132,0.4)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0, animation: 'inkDraw 308ms ease 1624ms forwards, doorFadeIn 252ms ease 1624ms forwards' }} />
                <path d="M150,160 L164,330" stroke="rgba(232,198,132,0.34)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0, animation: 'inkDraw 308ms ease 1666ms forwards, doorFadeIn 252ms ease 1666ms forwards' }} />
              </g>
            </svg>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0, background: 'radial-gradient(82% 72% at 50% 66%, rgba(255,247,224,0.97), rgba(244,231,198,0.72) 52%, transparent 80%)', animation: 'lightPour 616ms ease 1792ms forwards' }} />
      </div>
    )
  }

  // ── THE BUILDING — the walk-through of rooms + brass directory footer ──
  private renderBuilding(alive: boolean, sunShiftAnim: string) {
    const clipped = !this.state.roomsRevealed
    const buildingStyle: React.CSSProperties = { position: 'relative', background: '#e2d7bf', animation: 'veilIn 1800ms ease both', ...(clipped ? { height: '100vh', overflow: 'hidden' } : {}) }
    return (
      <div style={buildingStyle}>
        {/* the living breeze filter for the threshold photo */}
        <svg width={0} height={0} style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden>
          <filter id="breeze" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence ref={(el) => this.breeze.setEl(0, el)} type="fractalNoise" baseFrequency="0.006 0.011" numOctaves={2} seed={7} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={7} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div ref={(el) => this.birds.setLayer(el)} style={{ position: 'fixed', inset: 0, zIndex: 12, pointerEvents: 'none', overflow: 'hidden' }} />

        {clipped && (
          <div onClick={this.revealRooms} style={{ position: 'fixed', inset: 0, zIndex: 15, cursor: 'pointer' }}>
            {/* The reveal stays wordless — the House is introduced by being
                entered, not explained. Only the quiet cue below, inviting the
                descent into the rooms. */}
            <div style={{ position: 'absolute', left: '50%', bottom: 'clamp(30px,6vh,64px)', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', animation: 'cueBreath 4.6s ease-in-out infinite' }}>
              <div style={{ width: 26, height: 26, margin: '0 auto', borderRight: '1px solid rgba(246,239,228,0.66)', borderBottom: '1px solid rgba(246,239,228,0.66)', transform: 'rotate(45deg)' }} />
            </div>
          </div>
        )}

        <div ref={(el) => { this.headerEl = el }} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20, padding: '20px 0 28px', textAlign: 'center', pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,15,9,0.32), transparent)', transition: 'opacity 600ms ease' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
            <svg width="30" height="35" viewBox="0 0 48 56" fill="none" style={{ display: 'block' }}>
              <path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke="rgba(236,209,147,0.92)" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 16, letterSpacing: '0.44em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.94)', paddingLeft: '0.44em' }}>Believe Studio</span>
            <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.5)', paddingLeft: '0.42em' }}>A House for Founders</span>
          </div>
        </div>

        {/* the persistent House Directory control — discreet aged brass, top
            right, appearing once the guided journey has begun so the Door and
            Threshold stay ceremonial. Opens the plaque as an overlay from
            anywhere; returns the visitor to exactly where they were. */}
        {this.state.roomsRevealed && (
          <div style={{ position: 'fixed', top: 'clamp(16px,3vh,28px)', right: 'clamp(16px,3vw,34px)', zIndex: 22, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', gap: 'clamp(8px,1.1vw,14px)', maxWidth: 'calc(100vw - clamp(32px,6vw,68px))' }}>
            {/* the plain door — a founder looking for how to work with us finds it
                immediately, without decoding House language. Kept quiet: same
                muted-brass pill, text only, so the Directory (with its arch mark)
                stays the primary House control beside it. */}
            <El
              as="button"
              onClick={this.ctx.openWork}
              aria-label="Work with Believe"
              title="Work with Believe"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '9px 14px', borderRadius: 3, border: '1px solid rgba(236,209,147,0.34)', background: 'rgba(20,15,9,0.28)', cursor: 'pointer', WebkitBackdropFilter: 'blur(3px)', backdropFilter: 'blur(3px)', transition: 'border-color 350ms ease, background 350ms ease' }}
              hover={{ borderColor: 'rgba(236,209,147,0.72)', background: 'rgba(20,15,9,0.42)' }}
            >
              <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.82)' }}>Work with Believe</span>
            </El>
            <El
              as="button"
              onClick={this.openDirectory}
              aria-label="Open the House Directory"
              title="Open the House Directory"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7em', padding: '9px 14px', borderRadius: 3, border: '1px solid rgba(236,209,147,0.34)', background: 'rgba(20,15,9,0.28)', cursor: 'pointer', WebkitBackdropFilter: 'blur(3px)', backdropFilter: 'blur(3px)', transition: 'border-color 350ms ease, background 350ms ease' }}
              hover={{ borderColor: 'rgba(236,209,147,0.72)', background: 'rgba(20,15,9,0.42)' }}
            >
              <svg width="13" height="15" viewBox="0 0 48 56" fill="none" aria-hidden="true" style={{ display: 'block' }}>
                <path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke="rgba(236,209,147,0.9)" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.82)' }}>Directory</span>
            </El>
          </div>
        )}

        {this.rooms.journey.map((room, i) => this.renderRoomSection(room, i, sunShiftAnim, alive))}

        {/* A closed door as the public rooms give way to the courtyard — the
            House is larger than what the visitor has been shown. It doesn't
            explain itself and nothing opens; it simply implies a private wing,
            the way a members' house always has one. Reward for observation. */}
        {this.renderResidentsDoor()}

        {/* A pause before the Founding Wall — leaving the active rooms and
            entering a quiet courtyard. The reflective line and the six
            principles slow the visitor down before the inscription. */}
        {this.renderWallTransition()}

        {/* The Founding Wall — the philosophical hinge of the House. It comes
            after the primary working rooms (…Studio, Library) and before the
            Living House, so it sits between what the House does and why the
            House exists. It stands alone: no paragraph explains it afterward —
            the inscription is allowed to echo into the next chapter. */}
        {this.renderFounderWall()}

        {/* The Living House — the evolving, editorial chapter that follows the
            wall: the current resident, stories, field notes, and the Collective. */}
        <LivingHouse ctx={this.ctx} />

        {/* a breath between the two editorial chapters — turning the page from
            what the House is doing to the people who make it */}
        {this.renderChapterBreath()}

        {/* The Community — the human chapter: the People, the Houses to come,
            and the language the House keeps. Belonging and future. */}
        <Community ctx={this.ctx} />

        <Footer ctx={this.ctx} />
      </div>
    )
  }

  private renderRoomSection(room: any, i: number, sunShiftAnim: string, alive: boolean) {
    return (
      <section key={room.id} id={'room-' + room.id} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: room.justify, padding: 'clamp(48px,10vh,140px) clamp(30px,9vw,150px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 'clamp(16px,3vh,48px) clamp(16px,3vw,60px)', borderRadius: 'clamp(70px,9vw,170px) clamp(70px,9vw,170px) clamp(28px,4vw,72px) clamp(28px,4vw,72px)', overflow: 'hidden', boxShadow: '0 50px 100px -60px rgba(40,28,10,0.7)' }}>
          <ImageSlot src={room.photoSrc} placeholder={room.photo} alt={room.photo} fit="cover" showNote style={{ position: 'absolute', top: '-2.5%', left: '-2.5%', width: '105%', height: '105%', filter: room.breeze }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: room.light, animation: sunShiftAnim }} />
          <Motes list={this.roomMotes} enabled={alive} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: room.scrim }} />
          {room.isStage && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(70% 60% at 50% 42%, rgba(255,232,182,0.85), rgba(255,214,150,0.3) 55%, transparent 80%)', opacity: 0, animation: 'stageWarm linear both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 8% cover 55%' as unknown as string }} />
          )}
          {/* Private Advisory is the quietest, smallest room — deepen it into
              shadow so it reads as hushed and intimate, not another bright
              daylit conversation like The Table just before it. */}
          {room.id === 'advisory' && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(88% 78% at 50% 50%, rgba(16,11,6,0.16), rgba(16,11,6,0.52) 68%, rgba(10,7,4,0.74))' }} />
          )}
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: room.blockMax, width: room.blockW, marginLeft: room.blockMx, marginRight: room.blockMx, textAlign: room.textAlign, color: '#f6efe4', pointerEvents: 'none', animation: 'contentFocus 1600ms cubic-bezier(.2,.7,.2,1) both', animationDelay: room.contentDelay }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(46px,7vw,104px)', lineHeight: 0.98, margin: 0, textShadow: '0 2px 40px rgba(20,14,7,0.35)' }}>{room.name}</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,29px)', lineHeight: 1.4, color: 'rgba(246,239,228,0.9)', margin: '0.7em 0 0', whiteSpace: room.whisperWrap, textShadow: '0 1px 24px rgba(20,14,7,0.4)' }}>{room.whisper}</p>
          <El onClick={this.enterLabelHandler(room)} style={{ pointerEvents: 'auto', cursor: 'pointer', display: 'inline-block', marginTop: '1.7em', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.85)', borderBottom: '1px solid rgba(246,239,228,0.42)', paddingBottom: 5, transition: 'color 500ms ease, border-color 500ms ease' }} hover={{ color: '#fff', borderColor: '#fff' }}>{room.enterLabel}</El>
        </div>
      </section>
    )
  }

  /**
   * A private door, met in passing between the public rooms and the courtyard.
   * A members'-house convention: one door marked for those who belong, which
   * does not open and does not explain itself. On hover it gives the faintest
   * catch of light — acknowledging the curious visitor without surrendering its
   * secret — so the House quietly feels larger than everything they have seen.
   * Decorative: it never navigates, and swallows its own click.
   */
  private renderResidentsDoor() {
    const reveal: React.CSSProperties = { animation: 'fadeUpSoft 1200ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 6% cover 36%' as unknown as string }
    return (
      <section aria-label="A private door" style={{ position: 'relative', background: '#ddd0b2', padding: 'clamp(130px,26vh,340px) clamp(24px,8vw,120px)', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
        {/* a soft corridor shadow, so the door reads as set into a wall */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 'min(560px,88vw)', height: '100%', background: 'radial-gradient(58% 66% at 50% 46%, rgba(40,28,12,0.18), transparent 74%)', pointerEvents: 'none' }} />
        <El
          onClick={stop}
          aria-label="Residents only"
          style={{ position: 'relative', width: 'clamp(158px,23vw,250px)', height: 'clamp(320px,54vh,500px)', borderRadius: 'clamp(78px,11vw,125px) clamp(78px,11vw,125px) 6px 6px', cursor: 'default', border: 'none', padding: 0, background: 'linear-gradient(172deg, #4b3826 0%, #3d2d1e 44%, #342617 78%, #2c2015 100%)', boxShadow: '0 44px 84px -46px rgba(30,20,8,0.78), inset 0 2px 0 rgba(255,236,196,0.10), inset 0 0 0 1px rgba(20,13,6,0.5)', transition: 'box-shadow 800ms ease', ...reveal }}
          hover={{ boxShadow: '0 44px 84px -46px rgba(30,20,8,0.78), inset 0 2px 0 rgba(255,236,196,0.14), inset 0 0 40px rgba(255,224,170,0.13), inset 0 0 0 1px rgba(255,236,196,0.18)' }}
        >
          {/* two recessed panels, so it reads as a real door */}
          <span aria-hidden="true" style={{ position: 'absolute', left: '17%', right: '17%', top: '13%', height: '40%', borderRadius: '58px 58px 3px 3px', boxShadow: 'inset 0 1px 3px rgba(20,13,6,0.6), inset 0 -1px 0 rgba(255,236,196,0.06)' }} />
          <span aria-hidden="true" style={{ position: 'absolute', left: '17%', right: '17%', bottom: '9%', height: '30%', borderRadius: 3, boxShadow: 'inset 0 1px 3px rgba(20,13,6,0.6), inset 0 -1px 0 rgba(255,236,196,0.06)' }} />
          {/* the brass plate */}
          <span aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '51%', transform: 'translate(-50%,-50%)', padding: '7px 13px', borderRadius: 2, background: 'linear-gradient(152deg,#c1a468,#8f7238 56%,#ac8f54)', boxShadow: 'inset 0 1px 0 rgba(255,248,226,0.5), 0 4px 10px -6px rgba(20,13,6,0.6)' }}>
            <span style={{ display: 'block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 'clamp(8px,1vw,10px)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(40,29,13,0.76)', textShadow: '0 1px 0 rgba(255,248,226,0.4)', whiteSpace: 'nowrap' }}>Residents Only</span>
          </span>
          {/* a small keyhole below the plate */}
          <span aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '65%', transform: 'translateX(-50%)', width: 9, height: 13, background: 'rgba(18,12,5,0.72)', borderRadius: '50% 50% 42% 42%', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.6), 0 1px 0 rgba(255,236,196,0.08)' }} />
        </El>
      </section>
    )
  }

  /**
   * A quiet courtyard before the Founding Wall — the reflective line and the six
   * principles, on a slightly deeper stone-warm ground, so the visitor slows
   * from the active rooms into the inscription. (This copy used to close the
   * footer; it belongs here, as the lead-in to why the House exists.)
   */
  private renderWallTransition() {
    const reveal = (range: string): React.CSSProperties => ({ animation: 'fadeUpSoft 1100ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: range as unknown as string })
    return (
      <section aria-label="A pause before the Founding Wall" style={{ position: 'relative', background: '#dccfb2', padding: 'clamp(120px,26vh,340px) clamp(24px,8vw,120px)', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3.4vw,48px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.86)', maxWidth: '26ch', margin: '0 auto', textWrap: 'balance' as React.CSSProperties['textWrap'], ...reveal('entry 4% cover 28%') }}>No founder walks the same path &mdash; yet every room leads toward greater clarity.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.9vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.6)', maxWidth: '32ch', margin: 'clamp(28px,5vh,52px) auto 0', textWrap: 'pretty' as React.CSSProperties['textWrap'], ...reveal('entry 2% cover 26%') }}>Come in. We&rsquo;ve been expecting you. The door has never been locked.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em 2.6em', alignItems: 'baseline', justifyContent: 'center', margin: 'clamp(52px,9vh,120px) auto 0', ...reveal('entry 0% cover 24%') }}>
          {PRINCIPLES.map((pr) => (
            <span key={pr} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.66)' }}>{pr}</span>
          ))}
        </div>
      </section>
    )
  }

  /**
   * The Founder Wall — the philosophical center of the House, met as a still,
   * contemplative room roughly two-thirds through. Almost edge-to-edge, no
   * frame, caption, shadow, overlay, or CTA — the page simply becomes this room.
   * It reveals with a gentle fade and a small rise as it enters view; the global
   * prefers-reduced-motion guard silences the motion. The image carries it all.
   */
  private renderFounderWall() {
    return (
      <section
        id="founding-wall"
        aria-label="The founder philosophy, engraved in the stone of the House"
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(130px,28vh,360px) clamp(16px,4vw,64px)', background: '#e2d7bf' }}
      >
        <img
          src={FOUNDER_WALL}
          alt="A hand-plastered limestone wall inside Believe Studio engraved with the founder philosophy beside a simple oak bench and brass key, illuminated by warm afternoon light."
          loading="lazy"
          style={{
            display: 'block', width: 'auto', height: 'auto',
            maxWidth: 'min(94vw, 900px)', maxHeight: '94vh', margin: '0 auto',
            borderRadius: 'clamp(14px,2.4vw,30px)',
            // feather all four edges so the wall dissolves into the page rather
            // than sitting as a hard rectangle — it reads as part of the House
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 4%, #000 96%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 4%, #000 96%, transparent 100%)',
            maskComposite: 'intersect',
            animation: 'fadeUpSoft 950ms ease both',
            animationTimeline: 'view()' as unknown as string,
            animationRange: 'entry 4% cover 26%' as unknown as string,
          }}
        />
      </section>
    )
  }

  /**
   * A breath between the Living House and the Community — a quiet page-turn,
   * not a section. Generous vertical space and a single small brass arch on a
   * ground that bridges the two chapters' tones, so they read as distinct
   * chapters rather than one continuous feed of features.
   */
  private renderChapterBreath() {
    return (
      <div aria-hidden="true" style={{ background: '#e8dfcd', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(74px,15vh,190px) 0' }}>
        <svg width="22" height="26" viewBox="0 0 48 56" fill="none" style={{ display: 'block', opacity: 0.55 }}>
          <path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke="rgba(122,94,52,0.5)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  /** in-room "enter" routing: chapters for some rooms, the room overlay for others */
  private enterLabelHandler(room: any): Handler {
    if (room.id === 'blueprint') return this.ctx.openBlueprint
    if (room.id === 'fieldnotes') return this.ctx.openFieldNotes
    if (room.id === 'library') return this.ctx.openLibrary
    // The Studio room opens its dedicated workshop page — one room, one page
    if (room.id === 'studio') return this.ctx.openStudioPage
    // rooms with a dedicated experience page open it directly — one room, one page
    if (room.id === 'founders') return this.ctx.openDoorway('founders-room')
    if (room.id === 'advisory') return this.ctx.openDoorway('private-advisory')
    if (room.id === 'table') return this.ctx.openDoorway('founders-table')
    if (room.id === 'stage') return this.ctx.openStage
    return this.openRoom(room.id)
  }

  // ── THE ROOM (a door opens) — full-screen editorial overlay ────────────
  private renderRoomOverlay(veilBg: string, sunShiftAnim: string, roomPhotoAnim: string, alive: boolean) {
    const active = this.rooms.byId(this.state.activeId!)
    if (!active) return null
    const v = active.variant || 'classic'
    const showKeywords = v !== 'garden' && v !== 'quiet'
    const hasPhoto = !!active.photo
    return (
      <div onClick={this.closeRoom} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '0 0 clamp(60px,12vh,120px)', background: veilBg, perspective: '2400px', overflowX: 'hidden', overflowY: 'auto', animation: 'veilIn 600ms ease both' }}>
        <div style={{ position: 'fixed', inset: 0, background: '#efe6d3', animation: 'focusIn 1700ms cubic-bezier(.2,.7,.2,1) both' }} />
        <div style={{ position: 'fixed', top: '-14%', left: '6%', width: '62vw', height: '86vh', background: 'radial-gradient(circle at 32% 28%, rgba(255,244,216,0.42), transparent 60%)', filter: 'blur(52px)', pointerEvents: 'none', animation: 'glowPulse 10s ease-in-out infinite' }} />

        <div onClick={stop} style={{ position: 'relative', zIndex: 2, maxWidth: 1080, width: '100%', padding: '0 6vw', boxSizing: 'border-box', textAlign: 'center', color: '#2b2723', animation: 'veilIn 900ms ease both' }}>
          {hasPhoto ? (
            <div style={{ position: 'relative', left: '50%', right: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', height: 'clamp(360px,62vh,720px)', overflow: 'hidden', marginBottom: 'clamp(46px,8vh,104px)', borderRadius: 'clamp(60px,9vw,180px) clamp(60px,9vw,180px) 0 0' }}>
              <ImageSlot src={active.photoSrc} placeholder={active.photo} alt={active.photo} fit="cover" style={{ position: 'absolute', top: '-2.5%', left: '-2.5%', width: '105%', height: '105%', animation: roomPhotoAnim }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: active.light, animation: sunShiftAnim }} />
              <Motes list={this.roomMotes} enabled={alive} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.3) 0%, transparent 28%, transparent 44%, rgba(20,14,7,0.58) 100%)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(46px,8vh,96px)', textAlign: 'center', color: '#f6efe4', padding: '0 6vw', animation: 'contentFocus 1700ms cubic-bezier(.2,.7,.2,1) 800ms both' }}>
                <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.92)', marginBottom: '0.6em' }}>Believe Studio</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(48px,7.5vw,112px)', lineHeight: 0.96, margin: 0, textShadow: '0 2px 46px rgba(20,14,7,0.5)' }}>{active.name}</h2>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,30px)', color: 'rgba(246,239,228,0.92)', marginTop: '0.5em', textShadow: '0 1px 26px rgba(20,14,7,0.55)' }}>{active.whisper}</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.8)', marginLeft: '0.5em', marginTop: 'clamp(70px,16vh,170px)' }}>Believe Studio</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(46px,7vw,88px)', lineHeight: 1, margin: '0.28em 0 0.22em' }}>{active.name}</h2>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,28px)', color: 'rgba(43,39,35,0.82)', marginBottom: '1.6em' }}>{active.whisper}</div>
            </>
          )}

          {v === 'classic' && active.body.map((para: string, k: number) => (
            <p key={k} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,1.9vw,25px)', lineHeight: 1.78, color: 'rgba(43,39,35,0.9)', maxWidth: 'min(92ch,92vw)', margin: '0 auto 2.1em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{para}</p>
          ))}

          {v === 'library' && (
            <>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(23px,2.7vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.95)', maxWidth: '26ch', margin: '0 auto 1.6em' }}>&ldquo;{active.quote}&rdquo;</p>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.75)', marginBottom: '1.1em' }}>From the shelf</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7em', alignItems: 'center' }}>
                {active.reading.map((b: any, k: number) => (
                  <div key={k} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(17px,1.7vw,21px)', color: 'rgba(43,39,35,0.9)' }}>{b.t}<span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.62)' }}>&nbsp;&mdash; {b.a}</span></div>
                ))}
              </div>
            </>
          )}

          {v === 'notes' && (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5em', margin: '0.4em 0 0.6em' }}>
              {active.notes.map((n: any, k: number) => (
                <div key={k} style={{ fontFamily: "'Caveat',cursive", fontWeight: 500, fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.15, color: 'rgba(43,39,35,0.92)', alignSelf: n.align, marginLeft: n.ml, marginRight: n.mr, transform: 'rotate(' + n.rot + ')' }}>{n.t}</div>
              ))}
            </div>
          )}

          {v === 'question' && (
            <>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(28px,3.7vw,50px)', lineHeight: 1.2, color: 'rgba(43,39,35,0.96)', maxWidth: '20ch', margin: '0.2em auto 0.9em' }}>{active.question}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(16px,1.7vw,21px)', color: 'rgba(122,94,52,0.7)', margin: 0 }}>{active.questionSub}</p>
            </>
          )}

          {v === 'studio' && (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,1.6vw,22px)', justifyContent: 'center', margin: '0.4em 0 1.5em' }}>
                {active.sketches.map((s: string, k: number) => (
                  <div key={k} style={{ width: 'clamp(120px,15vw,170px)', height: 'clamp(120px,15vw,170px)', border: '1px dashed rgba(236,209,147,0.4)', background: 'repeating-linear-gradient(-45deg, rgba(43,39,35,0.05) 0 8px, transparent 8px 16px)', display: 'flex', alignItems: 'flex-end', padding: 12 }}>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)' }}>{s}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(18px,1.9vw,24px)', color: 'rgba(43,39,35,0.85)', margin: '0 0 1.8em' }}>{active.oneLine}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.6)', maxWidth: '34ch', margin: '0 auto 1.4em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Some ideas are shaped quietly at the worktable. Others become clearer through conversation.</p>
              <El onClick={this.ctx.openStudioPage} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', cursor: 'pointer', borderBottom: '1px solid rgba(122,94,52,0.32)', paddingBottom: 3, transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Step Inside the Studio &rarr;</El>
            </>
          )}

          {v === 'quiet' && (
            <>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.88)', maxWidth: '24ch', margin: '1.2em auto 2.2em' }}>{active.oneLine}</p>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.55)' }}>&mdash; in confidence</div>
            </>
          )}

          {v === 'garden' && (
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(22px,2.4vw,32px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.85)', maxWidth: '22ch', margin: '2em auto 2.4em' }}>{active.oneLine}</p>
          )}

          {active.story && !active.archive && (
            <div style={{ maxWidth: 460, margin: '2.6em auto 0', padding: '1.5em 1.7em 1.6em', background: '#efe6d3', border: '1px solid rgba(236,209,147,0.5)', textAlign: 'left', boxShadow: '0 24px 60px -36px rgba(60,44,20,0.55)' }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '0.7em' }}>Left here &middot; {active.story.kind}</div>
              <p style={{ fontFamily: "'Caveat',cursive", fontWeight: 500, fontSize: 'clamp(22px,2.5vw,30px)', lineHeight: 1.25, color: 'rgba(43,39,35,0.92)', margin: '0 0 0.5em' }}>&ldquo;{active.story.text}&rdquo;</p>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(122,94,52,0.62)' }}>&mdash; {active.story.by}, {active.story.of}</div>
            </div>
          )}

          {active.archive && <ArchiveCard note={active.archive} />}

          {active.person && (
            <div style={{ margin: '2.4em auto 0', maxWidth: 440 }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '0.5em' }}>The people of Believe Studio</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(24px,2.6vw,32px)', lineHeight: 1 }}>{active.person.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.72)', marginTop: '0.3em' }}>{active.person.role}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(43,39,35,0.6)', marginTop: '0.7em', fontStyle: 'italic' }}>You&rsquo;ll likely be welcomed by {active.person.first} if you come by.</div>
            </div>
          )}

          {active.id === 'threshold' && (
            <div style={{ margin: 'clamp(60px,11vh,130px) auto clamp(30px,6vh,70px)' }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, textWrap: 'balance' as React.CSSProperties['textWrap'] }}>Architecture brings people together.</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: '0.5em 0 0', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>Conversations change them.</p>
            </div>
          )}

          {/* the artifact */}
          <div style={{ position: 'relative', left: '50%', right: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', background: 'transparent', padding: 'clamp(48px,9vh,110px) 6vw clamp(40px,7vh,90px)', marginTop: 'clamp(40px,7vh,90px)' }}>
            <div style={{ margin: '0 auto 0.2em', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55em' }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.5)', paddingLeft: '0.42em' }}>{active.principle} &middot; The artifact</div>
              {active.artifactImg ? (
                <div style={{ width: 'min(86vw,380px)', margin: '0.5em auto 0.7em', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 40px 70px -40px rgba(60,44,20,0.55), 0 2px 4px rgba(60,44,20,0.12)' }}>
                  <ImageSlot src={active.artifactImg} alt={active.artifact} fit="cover" style={{ display: 'block', width: '100%', height: 'clamp(180px,26vh,280px)' }} />
                </div>
              ) : (
                <svg width="19" height="22" viewBox="0 0 48 56" fill="none" style={{ display: 'block', opacity: 0.72 }}><path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke="#9c7a3f" strokeWidth="2.4" strokeLinecap="round" /></svg>
              )}
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(23px,2.5vw,32px)', lineHeight: 1.05, color: 'rgba(43,39,35,0.92)' }}>{active.artifact}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.72)', maxWidth: '32ch' }}>{active.artifactNote}</div>
            </div>

            {showKeywords && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em 1.4em', justifyContent: 'center', margin: '2.1em 0 2.4em' }}>
                {active.keywords.map((kw: string, k: number) => (
                  <span key={k} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.9)' }}>{kw}</span>
                ))}
              </div>
            )}

            {/* The Threshold is the cinematic open — a held breath, not a sales
                floor. It ends on the Key artifact and the soft "Step further in",
                never a transactional ask; the House hasn't earned one yet. Every
                other room keeps the invitation to see how founders work. */}
            {active.id !== 'threshold' && (
              <El onClick={this.ctx.openWork} style={{ margin: '0.4em auto 0', display: 'inline-block', cursor: 'pointer' }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(16px,1.7vw,22px)', color: 'rgba(122,94,52,0.8)', borderBottom: '1px solid rgba(122,94,52,0.35)', paddingBottom: 2 }}>Ready to begin? Explore how founders work with Believe Studio &rarr;</span>
              </El>
            )}

            <El onClick={this.closeRoom} style={{ marginTop: '2.4em', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer' }} hover={{}}>
              <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.6)', transition: 'color 500ms ease' }}>{active.continueLabel}</span>
              <span style={{ width: 1, height: 38, background: 'linear-gradient(180deg, rgba(43,39,35,0.5), transparent)', animation: 'cueBreath 3.6s ease-in-out infinite' }} />
            </El>
          </div>
        </div>
      </div>
    )
  }
}
