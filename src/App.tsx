import React from 'react'
import { El, stop } from './lib/El'
import { HouseAudio } from './lib/audio'
import { BreezeDriver, BirdFlock, motionAllowed } from './lib/motion'
import { Motes, makeMotes, type Mote } from './components/Motes'
import { ImageSlot } from './components/ImageSlot'
import { FacadePhoto } from './components/FacadePhoto'
import { DoorCrack } from './components/DoorCrack'
import { buildRooms, roomKeyFor, PRINCIPLES } from './data'
import type { Ctx, Handler } from './lib/ctx'
import { Footer } from './components/Footer'
import { DirectoryOverlay } from './components/DirectoryOverlay'
import { LivingHouse } from './components/LivingHouse'
import { Community } from './components/Community'
import { Closing } from './components/Closing'

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
import { DoorwayChapter } from './chapters/Doorway'
import { BlueprintFolio } from './chapters/BlueprintFolio'
import { FoundersRoom } from './chapters/FoundersRoom'
import { ArchiveCard } from './components/ArchiveCard'
import { FieldNotesChapter } from './chapters/FieldNotes'
import { Journal } from './chapters/Journal'
import { isPublishedSlug } from './journal/articles'
import { HousesChapter } from './chapters/Houses'
import { ReceiveKey } from './chapters/ReceiveKey'
import { Home } from './components/Home'

// Mockup toggle: hide the Founders Wall from the homepage scroll while keeping
// its implementation (renderFounderWall) intact, so it can be restored or
// relocated later. Set back to true to bring it back exactly as before.
const SHOW_FOUNDER_WALL = false
import { ObservatoryChapter } from './chapters/Observatory'
import { AboutChapter } from './chapters/About'
import { PrivacyPage, TermsPage, AccessibilityPage } from './chapters/Legal'
import { setConversationOpener } from './lib/booking'
import { ConversationNote } from './components/ConversationNote'
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
  showJournal: boolean; openArticle: string | null
  showDirectory: boolean
  showObservatory: boolean; showConversation: boolean; showAbout: boolean
  showPrivacy: boolean; showTerms: boolean; showAccessibility: boolean
  showKey: boolean
  facadeReady: boolean
  birdLanded: boolean
  /** when the People page is opened from a Foyer portrait, the person to scroll to */
  peopleAnchor?: string
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

// The arrival now plays once per BROWSING SESSION rather than once per device.
// A new tab or a fresh browser session sees the Door again; but reloading,
// moving between rooms, and back/forward within the same session never replay
// it (sessionStorage is per-tab-session and survives reloads, not restarts).
const SESSION_KEY = 'believe.entered'
function rememberEnteredSession() {
  try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* private mode — falls back to in-memory for this load */ }
}
function enteredThisSession(): boolean {
  try { return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1' } catch { return false }
}
// Visitors who ask for less motion skip the cinematic arrival entirely.
function prefersReducedMotion(): boolean {
  try { return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}
// The Foyer as a direct destination — /foyer or ?foyer opens it straight away.
function isFoyerRoute(): boolean {
  if (typeof window === 'undefined') return false
  try { return new URLSearchParams(window.location.search).has('foyer') || /^\/foyer\/?$/.test(window.location.pathname) } catch { return false }
}

// Replay the entrance — /enter or ?enter always plays the opening Door, even for
// returning visitors, without changing anyone's normal first-visit experience.
function isEnterRoute(): boolean {
  if (typeof window === 'undefined') return false
  try { return new URLSearchParams(window.location.search).has('enter') || /^\/enter\/?$/.test(window.location.pathname) } catch { return false }
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
  showJournal: 'journal',
  showStories: 'stories',
  showFieldNotes: 'field-notes',
  showPeople: 'people',
  showHouses: 'houses',
  showStage: 'stage',
  showObservatory: 'observatory',
  showAbout: 'about',
  showPrivacy: 'privacy',
  showTerms: 'terms',
  showAccessibility: 'accessibility',
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
/** the full path the URL should show for the current state (journal articles
    live one level deeper, at /journal/<slug>) */
function pathForState(s: State): string {
  const slug = overlaySlugOf(s)
  if (!slug) return '/'
  if (slug === 'journal' && s.openArticle) return '/journal/' + s.openArticle
  return '/' + slug
}
/** the article slug named by a /journal/<slug> path, or '' */
function articleSlugFromPath(pathname: string): string {
  const raw = rawPath(pathname)
  return raw.startsWith('journal/') ? raw.slice('journal/'.length).split('/')[0] : ''
}
/** the overlay slug named by a path, or null if the path is the building/unknown */
function overlaySlugFromPath(pathname: string): string | null {
  const raw = rawPath(pathname)
  if (raw === 'journal' || raw.startsWith('journal/')) return 'journal'
  return ALL_ROUTE_SLUGS.has(raw) ? raw : null
}

// every overlay flag/doorway, closed — the neutral ground a route opens from
const CLOSED_OVERLAYS: Partial<State> = {
  showHouses: false, showPeople: false, showStudio: false, showStudioPage: false,
  showStories: false, showHouse: false, showWhyBelieve: false, showLibrary: false, showBlueprint: false,
  showFieldNotes: false, showTable: false, showWork: false, showAdvisory: false, showStage: false,
  showObservatory: false, showAbout: false, showPrivacy: false, showTerms: false, showAccessibility: false,
  showJournal: false, openArticle: null,
  showDirectory: false, activeDoorway: null,
}
/** the state that opens the overlay a slug names (all others closed). For the
    journal, an optional article slug opens that piece directly. */
function openStateForSlug(slug: string, articleSlug?: string): Partial<State> {
  const base: Partial<State> = { ...CLOSED_OVERLAYS }
  if (SLUG_TO_DOORWAY[slug]) base.activeDoorway = SLUG_TO_DOORWAY[slug]
  else if (SLUG_TO_FLAG[slug]) (base as Record<string, unknown>)[SLUG_TO_FLAG[slug] as string] = true
  if (slug === 'journal' && articleSlug && isPublishedSlug(articleSlug)) base.openArticle = articleSlug
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
    showStudioPage: false, showJournal: false, openArticle: null, showDirectory: false,
    showObservatory: false, showConversation: false, showAbout: false,
    showPrivacy: false, showTerms: false, showAccessibility: false,
    showKey: false, facadeReady: false, birdLanded: false,
  }
  if (typeof window === 'undefined') return base
  const path = window.location.pathname
  const entered: State = { ...base, phase: 'map', roomsRevealed: true, prologueSeen: true }
  // ?enter (or /enter) always replays the opening Door, for anyone, on demand
  if (isEnterRoute()) return base
  // Direct links to a page, room, or article bypass the arrival and open their
  // destination — and count as having arrived this session, so returning to the
  // home root in the same session won't suddenly play the Door.
  if (isFoyerRoute()) { rememberEnteredSession(); return entered }
  const slug = overlaySlugFromPath(path)
  if (slug) { rememberEnteredSession(); return { ...entered, ...openStateForSlug(slug, articleSlugFromPath(path)) } }
  if (BUILDING_ANCHORS.has(rawPath(path))) { rememberEnteredSession(); return entered }
  // Already arrived in this browsing session, or a reduced-motion visitor —
  // straight to the usable homepage, no arrival.
  if (enteredThisSession() || prefersReducedMotion()) return entered
  // First arrival of a new browsing session → the Door.
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
      openPeople: this.openPeoplePlain, closePeople: this.closeChapter('showPeople'),
      openPeopleAt: this.openPeopleAt,
      openStories: this.openChapter('showStories'), closeStories: this.closeChapter('showStories'),
      openHouse: this.openChapter('showHouse'), closeHouse: this.closeChapter('showHouse'),
      openWhyBelieve: this.openChapter('showWhyBelieve'), closeWhyBelieve: this.closeChapter('showWhyBelieve'),
      openHouses: this.openChapter('showHouses'), closeHouses: this.closeChapter('showHouses'),
      openWork: this.openChapter('showWork'), closeWork: this.closeChapter('showWork'),
      openFieldNotes: this.openChapter('showFieldNotes'), closeFieldNotes: this.closeChapter('showFieldNotes'),
      openJournal: this.openJournal, closeJournal: this.openChapter('showLibrary'),
      openArticle: this.openArticle, closeArticle: this.closeArticle,
      openObservatory: this.openChapter('showObservatory'), closeObservatory: this.closeChapter('showObservatory'),
      openAbout: this.openChapter('showAbout'), closeAbout: this.closeChapter('showAbout'),
      openPrivacy: this.openChapter('showPrivacy'), closePrivacy: this.closeChapter('showPrivacy'),
      openTerms: this.openChapter('showTerms'), closeTerms: this.closeChapter('showTerms'),
      openAccessibility: this.openChapter('showAccessibility'), closeAccessibility: this.closeChapter('showAccessibility'),
      openConversation: this.openConversation, closeConversation: this.closeConversation,
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
    // every "Start a Conversation" CTA across the House reaches the Founder
    // Conversation note through this opener (see src/lib/booking.ts)
    setConversationOpener(() => this.openConversation())
    window.addEventListener('keydown', this.onKey)
    window.addEventListener('pointerdown', this.onDown)
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('popstate', this.onPopState)

    // reflect the entry URL, and honor a deep link into a specific room
    this.lastSlug = pathForState(this.state)
    try { window.history.replaceState({ path: this.lastSlug }, '', window.location.pathname) } catch { /* ignore */ }
    const deepLinked = this.state.phase === 'map'
    if (deepLinked && BUILDING_ANCHORS.has(rawPath(window.location.pathname)) && rawPath(window.location.pathname) === 'founding-wall') {
      setTimeout(() => this.scrollToWall(), 320)
    }

    // the arrival ritual runs only when we actually begin at the Door
    if (this.state.phase === 'overture') {
      // Mark the session as arrived the moment the Door is shown, so this plays
      // exactly once per browsing session — a reload, or any internal navigation,
      // lands straight on the homepage afterward.
      rememberEnteredSession()
      // the arrival is short and skippable: a visible "Enter the House" control
      // is shown from the first frame, and the two lines land quickly. The door
      // begins to open on its own in ~0.7s; a tap/click/Enter starts it sooner.
      this.tAuto = setTimeout(() => { if (this.state.phase === 'overture' && !this.state.opening) this.accept() }, 700)
      // the bird finishes crossing and perches in the olive tree (Scene 2)
      this.tBird = setTimeout(() => this.setState({ birdLanded: true }), 450)
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
    const path = pathForState(this.state)
    if (path === this.lastSlug) return
    this.lastSlug = path
    if (this.suppressPush) return
    if (window.location.pathname !== path) {
      try { window.history.pushState({ path }, '', path) } catch { /* ignore */ }
    }
  }
  // the browser back/forward buttons: mirror the URL back into open/closed state
  private onPopState = () => {
    const raw = window.location.pathname
    const slug = overlaySlugFromPath(raw)
    const article = slug === 'journal' ? articleSlugFromPath(raw) : ''
    this.lastSlug = slug ? (slug === 'journal' && article && isPublishedSlug(article) ? '/journal/' + article : '/' + slug) : '/'
    this.suppressPush = true
    const done = () => { this.suppressPush = false }
    if (slug) this.setState({ phase: 'map', roomsRevealed: true, prologueSeen: true, ...openStateForSlug(slug, article) } as unknown as Pick<State, keyof State>, done)
    else this.setState({ ...this.closedChapters() } as unknown as Pick<State, keyof State>, done)
  }
  private scrollToWall() {
    const el = document.querySelector('section[aria-label^="The founder philosophy"]') as HTMLElement | null
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  componentWillUnmount() {
    setConversationOpener(null)
    window.removeEventListener('keydown', this.onKey)
    window.removeEventListener('pointerdown', this.onDown)
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('popstate', this.onPopState)
    ;[this.tAccept, this.tDoor, this.tEnter, this.tWelcome, this.tAuto, this.tRoom, this.tBird].forEach((t) => t && clearTimeout(t))
    this.breeze.dispose(); this.birds.dispose(); this.audio.dispose()
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.state.showConversation) { this.setState({ showConversation: false }); return }
      if (this.state.showDirectory) { this.setState({ showDirectory: false }); return }
      if (this.state.activeDoorway) { this.setState({ activeDoorway: null }); return }
      if (this.state.showJournal && this.state.openArticle) { this.setState({ openArticle: null }); return }
      const order: (keyof State)[] = ['showPrivacy', 'showTerms', 'showAccessibility', 'showStories', 'showFieldNotes', 'showJournal', 'showBlueprint', 'showTable', 'showWork', 'showAdvisory', 'showStage', 'showLibrary', 'showHouse', 'showWhyBelieve', 'showStudio', 'showStudioPage', 'showObservatory', 'showAbout', 'showPeople', 'showHouses', 'showKey']
      for (const k of order) { if (this.state[k]) { this.setState({ [k]: false } as unknown as Pick<State, keyof State>); return } }
      if (this.state.activeId) { this.closeRoom(); return }
    }
    if (this.state.phase === 'overture' && !this.state.opening && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); this.accept() }
  }
  private onDown = () => {
    // The entrance is intentionally silent — no music or sound effects. We only
    // unlock the audio context for any later, in-House sound a visitor opts into.
    this.audio.resume()
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
    const motionOn = motionAllowed(LIGHT_MOTION)
    setTimeout(() => {
      this.pending = false
      this.setState({ opening: true })
      // the door opens in silence — no sound effect
      if (this.tAccept) clearTimeout(this.tAccept)
      // the leaf swings open (~1700ms), holds a beat as the library is revealed,
      // then a warm dissolve carries us straight onto the homepage
      this.tAccept = setTimeout(() => this.enterHouse(), motionOn ? 2150 : 420)
    }, motionOn ? 150 : 60) // a brief held beat, then the door gives way
  }
  private skip = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (this.tAccept) clearTimeout(this.tAccept)
    if (this.tDoor) clearTimeout(this.tDoor)
    if (this.tEnter) clearTimeout(this.tEnter)
    rememberVisited(); rememberPrologueSeen()
    this.audio.fadeAmbient(1.4)
    this.setState({ phase: 'map', opening: false, roomsRevealed: true, prologueSeen: true, activeId: null, justEntered: true })
    if (this.tWelcome) clearTimeout(this.tWelcome)
    this.tWelcome = setTimeout(() => this.setState({ justEntered: false }), 5400)
  }
  private enterHouse = () => {
    rememberPrologueSeen(); rememberVisited()
    this.audio.fadeAmbient(1.6)
    this.setState({ phase: 'map', prologueSeen: true, activeId: null, justEntered: true, roomsRevealed: true })
    if (this.tWelcome) clearTimeout(this.tWelcome)
    this.tWelcome = setTimeout(() => this.setState({ justEntered: false }), 5400)
  }
  // People — opened plainly (no target), or deep-linked to a specific person.
  // peopleAnchor tells the People page which section to land on.
  private openPeoplePlain = (e?: React.MouseEvent) => {
    this.setState({ peopleAnchor: undefined })
    this.openChapter('showPeople')(e)
  }
  private openPeopleAt = (id: string) => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ peopleAnchor: id })
    this.openChapter('showPeople')(e)
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
  // Start a Conversation opens the Founder Conversation note (the warm welcome
  // before scheduling). We remember the control that opened it so focus returns
  // there when the note closes — a quiet, correct keyboard experience.
  private convTrigger: HTMLElement | null = null
  private openConversation = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    try { this.convTrigger = (document.activeElement as HTMLElement) ?? null } catch { this.convTrigger = null }
    this.setState({ showConversation: true })
  }
  private closeConversation = () => {
    this.setState({ showConversation: false })
    const t = this.convTrigger
    this.convTrigger = null
    if (t && typeof t.focus === 'function') { try { t.focus() } catch { /* ignore */ } }
  }

  private closedChapters(): Partial<State> {
    return { showHouses: false, showPeople: false, showStudio: false, showStudioPage: false, showStories: false, showHouse: false, showWhyBelieve: false, showLibrary: false, showBlueprint: false, showFieldNotes: false, showJournal: false, openArticle: null, showTable: false, showWork: false, showAdvisory: false, showStage: false, showObservatory: false, showAbout: false, showPrivacy: false, showTerms: false, showAccessibility: false, showDirectory: false, activeDoorway: null }
  }
  private openChapter = (key: keyof State): Handler => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ ...this.closedChapters(), [key]: true } as unknown as Pick<State, keyof State>)
  }
  private closeChapter = (key: keyof State): Handler => () => this.setState({ [key]: false } as unknown as Pick<State, keyof State>)

  // Believe Beyond Borders — the journal landing, and individual articles
  private openJournal = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ ...this.closedChapters(), showJournal: true, openArticle: null } as unknown as Pick<State, keyof State>)
  }
  private openArticle = (slug: string): Handler => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ ...this.closedChapters(), showJournal: true, openArticle: slug } as unknown as Pick<State, keyof State>)
    try { window.scrollTo({ top: 0 }) } catch { /* ignore */ }
  }
  private closeArticle = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ openArticle: null })
  }

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

    return (
      <>
        {phase === 'overture' && this.renderOverture(opening)}
        {phase === 'map' && this.renderBuilding(alive, sunShiftAnim)}
        {this.state.activeId && this.renderRoomOverlay(veilBg, sunShiftAnim, roomPhotoAnim, alive)}

        {this.state.showKey && <ReceiveKey ctx={this.ctx} onClose={this.closeKey} />}
        {this.state.showHouses && <HousesChapter ctx={this.ctx} />}
        {this.state.showBlueprint && <BlueprintChapter ctx={this.ctx} />}
        {this.state.showFieldNotes && <FieldNotesChapter ctx={this.ctx} />}
        {this.state.showLibrary && <LibraryChapter ctx={this.ctx} />}
        {this.state.showJournal && <Journal ctx={this.ctx} articleSlug={this.state.openArticle} />}
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
        {this.state.showPeople && <PeopleChapter ctx={this.ctx} anchor={this.state.peopleAnchor} />}
        {this.state.showStudio && <InResidenceChapter ctx={this.ctx} />}
        {this.state.showStudioPage && <StudioChapter ctx={this.ctx} />}
        {this.state.showStories && <StoriesChapter ctx={this.ctx} />}
        {this.state.showDirectory && <DirectoryOverlay ctx={this.ctx} onClose={this.closeDirectory} />}
        {this.state.showObservatory && <ObservatoryChapter ctx={this.ctx} />}
        {this.state.showAbout && <AboutChapter ctx={this.ctx} />}
        {this.state.showPrivacy && <PrivacyPage ctx={this.ctx} />}
        {this.state.showTerms && <TermsPage ctx={this.ctx} />}
        {this.state.showAccessibility && <AccessibilityPage ctx={this.ctx} />}
        {this.state.showConversation && <ConversationNote onClose={this.closeConversation} />}
      </>
    )
  }

  // ── OVERTURE — the Dusty Rose Door, opening onto the House ─────────────
  // The approved London Georgian photograph is kept whole as the architectural
  // surround; the door LEAF is a separate layer that swings on its hinge to
  // reveal the House's own warm limestone corridor (composited into the base's
  // opening, so the stone step and doormat never move). One lightweight CSS
  // transform — photographic fidelity, no video, no layout shift.
  private renderOverture(opening: boolean) {
    const motionOn = motionAllowed(LIGHT_MOTION)
    const sunShiftAnim = motionOn ? 'sunShift 170s ease-in-out infinite alternate' : 'none'
    return (
      <div onClick={this.accept} style={{ position: 'fixed', inset: 0, zIndex: 40, overflow: 'hidden', cursor: 'pointer', background: 'radial-gradient(132% 92% at 50% 16%, #f3ebd9, #e7dcc4 56%, #dccfb2)' }}>
        {/* a slow drift of warm daylight across the whole scene */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: '-10%', pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(46% 40% at 46% 14%, rgba(255,241,210,0.6), transparent 66%)', animation: sunShiftAnim }} />

        {/* the entrance — the photograph, with the door leaf swinging open */}
        <div className={'bs-ent-stage' + (opening && motionOn ? ' bs-ent-walk' : '')}>
          <div className="bs-ent" data-open={opening ? 'true' : 'false'}>
            <div className="bs-ent-base" role="img" aria-label="A beautifully restored London Georgian townhouse entrance: a dusty-rose panelled front door with a large centred aged-brass knob, a glowing fanlight and lantern above, a pale limestone facade with symmetrical sash windows, black wrought-iron railings, and two neatly clipped topiaries in dark planters." />
            <div className="bs-ent-spill" aria-hidden="true" />
            <div className="bs-ent-leaf" aria-hidden="true" />
            {/* the engraved aged-brass nameplate — a stationary graphic layer, never
                moving with the door, carrying the true Believe Studio wordmark */}
            <div className="bs-ent-plate" aria-label="Believe Studio"><span className="bs-ent-plate-face"><span className="n1">BELIEVE</span><span className="n2">STUDIO</span></span></div>
            {/* No introductory wording: the townhouse and the opening door carry the
                story on their own. The homepage headline is the first text a visitor reads. */}
          </div>
        </div>

        {/* after the door holds open a beat, a soft warm light gathers and carries
            the visitor inside — a quiet dissolve, never a flash */}
        {opening && (
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', background: 'radial-gradient(118% 92% at 50% 44%, rgba(248,241,226,0.97), rgba(238,228,207,0.99))', opacity: 0, animation: motionOn ? 'glowGrow 650ms ease 1750ms both' : 'glowGrow 260ms ease forwards' }} />
        )}

        {/* the arrival fades up from a dark hush on the first paint */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 8, background: '#0b0906', pointerEvents: 'none', animation: motionOn ? 'blackReveal 760ms ease 40ms both' : 'blackReveal 210ms ease both' }} />

        {/* A discreet, accessible way past the arrival — a quiet text link in the
            corner that never competes with the architecture. It reads on the pale
            pavement via a soft light halo, and strengthens on hover/focus. */}
        <El onClick={this.skip} aria-label="Enter the House" style={{ position: 'absolute', right: 'clamp(16px,2.5vw,30px)', bottom: 'clamp(14px,2.5vh,26px)', display: 'inline-flex', alignItems: 'center', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(58,44,24,0.5)', background: 'transparent', border: 'none', padding: '8px 10px', cursor: 'pointer', textShadow: '0 1px 6px rgba(247,240,224,0.85)', transition: 'color 200ms ease', zIndex: 6 }} hover={{ color: 'rgba(38,27,10,0.88)' }}>Enter the House&nbsp;&rarr;</El>
      </div>
    )
  }

  // ── THE BUILDING — the walk-through of rooms + brass directory footer ──
  // The persistent house header — wordmark, poetic nav, and the one primary
  // action. Shown on the scrollable homepage; chapter overlays sit above it.
  // Mobile collapses the nav into a Menu button that opens the brass Directory.
  private renderHeader() {
    const c = this.ctx
    return (
      <header className="bs-header">
        <button className="bs-brand" onClick={() => { try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch { /* ignore */ } }} aria-label="Believe Studio, back to top">
          <svg width="20" height="23" viewBox="0 0 48 56" fill="none" aria-hidden="true"><path d="M9 55 L9 24 A15 15 0 0 1 39 24 L39 55" stroke="#9c7a3f" strokeWidth="2.6" strokeLinecap="round" /></svg>
          <span className="wm">Believe Studio</span>
        </button>
        <nav className="bs-nav" aria-label="Primary">
          <button onClick={c.openDirectory}>The House</button>
          <button onClick={c.openWork}>Ways to Work</button>
          <button onClick={c.openAbout}>About Believe</button>
        </nav>
        <div className="bs-right">
          <button className="bs-menu-btn" onClick={c.openDirectory} aria-label="Open the House Index">Menu</button>
          <button className="bs-cta" onClick={c.openConversation}>
            <span className="bs-cta-full">Start a Conversation</span>
            <span className="bs-cta-short">Let&rsquo;s Talk</span>
          </button>
        </div>
      </header>
    )
  }

  private renderBuilding(alive: boolean, sunShiftAnim: string) {
    const clipped = false
    const buildingStyle: React.CSSProperties = { position: 'relative', background: '#e2d7bf', animation: 'veilIn 850ms ease both', ...(clipped ? { height: '100vh', overflow: 'hidden' } : {}) }
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

        {this.renderHeader()}

        {/* the persistent House Directory control — discreet aged brass, top
            right, appearing once the guided journey has begun so the Door and
            Threshold stay ceremonial. Opens the plaque as an overlay from
            anywhere; returns the visitor to exactly where they were. */}
        {false && this.state.roomsRevealed && (
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

        <Home ctx={this.ctx} />

        {/* The Founding Wall — a wordless philosophical beat that carries the
            visitor from the five homepage moments into the closing courtyard.
            The forced inline room walk, the wall transition, the Living House and
            the Community chapters were removed from the main scroll in the
            simplification; every room and chapter is retained in the codebase and
            remains reachable through the House Directory (see HouseIndex). */}
        {SHOW_FOUNDER_WALL && this.renderFounderWall()}

        {/* The closing — an open limestone arch onto the courtyard: the final
            invitation, and the single home of "the house is always open." */}
        <Closing ctx={this.ctx} />

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
          {/* The Studio photograph is bright, so its left-aligned title needs a
              localized left scrim for contrast; it fades out by ~58% so the
              window light and shelving on the right stay luminous. */}
          {room.id === 'studio' && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(26,19,11,0.56) 0%, rgba(26,19,11,0.3) 28%, rgba(26,19,11,0) 58%)' }} />
          )}
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: room.blockMax, width: room.blockW, marginLeft: room.blockMx, marginRight: room.blockMx, textAlign: room.textAlign, color: '#f6efe4', pointerEvents: 'none', animation: 'contentFocus 1600ms cubic-bezier(.2,.7,.2,1) both', animationDelay: room.contentDelay }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(46px,7vw,104px)', lineHeight: 0.98, margin: 0, textShadow: '0 2px 40px rgba(20,14,7,0.35)' }}>{room.name}</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,29px)', lineHeight: 1.4, color: 'rgba(246,239,228,0.9)', margin: '0.7em 0 0', whiteSpace: room.whisperWrap, textShadow: '0 1px 24px rgba(20,14,7,0.4)' }}>{room.whisper}</p>
          {room.functional && (
            <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 'clamp(11px,1.15vw,13px)', letterSpacing: '0.08em', lineHeight: 1.55, color: 'rgba(246,239,228,0.82)', margin: '1.05em 0 0', maxWidth: '36ch', marginLeft: room.textAlign === 'left' ? 0 : 'auto', marginRight: room.textAlign === 'right' ? 0 : 'auto', textShadow: '0 1px 14px rgba(20,14,7,0.6)' }}>{room.functional}</p>
          )}
          <El onClick={this.enterLabelHandler(room)} style={{ pointerEvents: 'auto', cursor: 'pointer', display: 'inline-block', marginTop: '1.7em', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.85)', borderBottom: '1px solid rgba(246,239,228,0.42)', paddingBottom: 5, transition: 'color 500ms ease, border-color 500ms ease' }} hover={{ color: '#fff', borderColor: '#fff' }}>{room.enterLabel}</El>
        </div>
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
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3.4vw,48px)', lineHeight: 1.3, color: 'rgba(43,39,35,0.86)', maxWidth: '26ch', margin: '0 auto', textWrap: 'balance' as React.CSSProperties['textWrap'], ...reveal('entry 4% cover 28%') }}>No founder walks the same path, yet every room leads toward greater clarity.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(16px,1.9vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.6)', maxWidth: '32ch', margin: 'clamp(28px,5vh,52px) auto 0', textWrap: 'pretty' as React.CSSProperties['textWrap'], ...reveal('entry 2% cover 26%') }}>Come in. We&rsquo;ve been waiting for you. The door has never been locked.</p>
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
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(56px,10vh,110px) clamp(16px,4vw,64px)', background: '#e2d7bf' }}
      >
        <img
          src={FOUNDER_WALL}
          alt="A hand-plastered limestone wall inside Believe Studio engraved with the founder philosophy beside a simple oak bench and brass key, illuminated by warm afternoon light."
          loading="lazy"
          style={{
            display: 'block', width: 'auto', height: 'auto',
            maxWidth: 'min(92vw, 1060px)', maxHeight: '92vh', margin: '0 auto',
            // crisp, intentional architectural framing: a subtle corner radius and
            // a soft low shadow so the photograph sits as a real panel on the warm
            // ground, rather than a feathered vignette dissolving into the page
            borderRadius: 'clamp(6px,0.9vw,14px)',
            boxShadow: '0 34px 64px -44px rgba(60,44,20,0.5)',
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
    // The Observatory room section opens its own chapter (Believe Radar), never a room overlay
    if (room.id === 'observatory') return this.ctx.openObservatory
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
                  <div key={k} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(17px,1.7vw,21px)', color: 'rgba(43,39,35,0.9)' }}>{b.t}<span style={{ fontStyle: 'italic', color: 'rgba(122,94,52,0.62)' }}>&nbsp;&middot; {b.a}</span></div>
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
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.55)' }}>in confidence</div>
            </>
          )}

          {v === 'garden' && (
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(22px,2.4vw,32px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.85)', maxWidth: '22ch', margin: '2em auto 2.4em' }}>{active.oneLine}</p>
          )}

          {active.story && !active.archive && (
            <div style={{ maxWidth: 460, margin: '2.6em auto 0', padding: '1.5em 1.7em 1.6em', background: '#efe6d3', border: '1px solid rgba(236,209,147,0.5)', textAlign: 'left', boxShadow: '0 24px 60px -36px rgba(60,44,20,0.55)' }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '0.7em' }}>Left here &middot; {active.story.kind}</div>
              <p style={{ fontFamily: "'Caveat',cursive", fontWeight: 500, fontSize: 'clamp(22px,2.5vw,30px)', lineHeight: 1.25, color: 'rgba(43,39,35,0.92)', margin: '0 0 0.5em' }}>&ldquo;{active.story.text}&rdquo;</p>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(122,94,52,0.62)' }}>{active.story.by}, {active.story.of}</div>
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
