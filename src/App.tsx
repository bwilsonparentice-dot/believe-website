import React from 'react'
import { El, stop } from './lib/El'
import { HouseAudio } from './lib/audio'
import { BreezeDriver, BirdFlock, motionAllowed } from './lib/motion'
import { Motes, makeMotes, type Mote } from './components/Motes'
import { ImageSlot } from './components/ImageSlot'
import { FacadePhoto } from './components/FacadePhoto'
import { RealDoor } from './components/RealDoor'
import { Prologue } from './components/Prologue'
import { buildRooms, roomKeyFor, PRINCIPLES } from './data'
import type { Ctx, Handler } from './lib/ctx'
import { Footer } from './components/Footer'

// chapters
import { FounderRoomChapter } from './chapters/FounderRoom'
import { BlueprintChapter } from './chapters/Blueprint'
import { TableChapter } from './chapters/Table'
import { LibraryChapter } from './chapters/Library'
import { StudioChapter } from './chapters/Studio'
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
import { HousesChapter } from './chapters/Houses'
import { ReceiveKey } from './chapters/ReceiveKey'

type Phase = 'overture' | 'sketch' | 'prologue' | 'map'

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
  showHouses: boolean; showPeople: boolean; showStudio: boolean; showFounderRoom: boolean
  showHouse: boolean; showWhyBelieve: boolean; showLibrary: boolean; showBlueprint: boolean; showFieldNotes: boolean
  showStories: boolean; showTable: boolean; showWork: boolean; showAdvisory: boolean; showStage: boolean
  showKey: boolean
  facadeReady: boolean
  birdLanded: boolean
}

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

  state: State = {
    phase: 'overture', opening: false, roomsRevealed: false, justEntered: false, prologueSeen: hasSeenPrologue(),
    activeId: null, activeDoorway: null, hasKey: false, pendingRoom: null,
    showHouses: false, showPeople: false, showStudio: false, showFounderRoom: false,
    showHouse: false, showWhyBelieve: false, showLibrary: false, showBlueprint: false, showFieldNotes: false,
    showStories: false, showTable: false, showWork: false, showAdvisory: false, showStage: false,
    showKey: false, facadeReady: false, birdLanded: false,
  }

  constructor(props: Record<string, never>) {
    super(props)
    this.ctx = {
      // The Founder's Room now resolves to its dedicated experience page everywhere it's linked
      openFounderRoom: this.openDoorway('founders-room'), closeFounderRoom: this.closeDoorway,
      openBlueprint: this.openDoorway('believe-blueprint'), closeBlueprint: this.closeDoorway,
      openTable: this.openDoorway('founders-table'), closeTable: this.closeDoorway,
      openLibrary: this.openChapter('showLibrary'), closeLibrary: this.closeChapter('showLibrary'),
      // The Studio has merged into the Blueprint — every Studio link now opens it
      openStudio: this.openDoorway('believe-blueprint'), closeStudio: this.closeDoorway,
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
      receiveKey: this.receiveKey, askKey: this.askKey, closeKey: this.closeKey,
      replay: this.replay,
      gotoRoom: this.gotoRoom,
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
    // the arrival plays hands-free: accepted on its own after a beat
    this.tAuto = setTimeout(() => { if (this.state.phase === 'overture' && !this.state.opening) this.accept() }, 13000)
    // the bird finishes crossing and perches in the olive tree (Scene 2)
    this.tBird = setTimeout(() => this.setState({ birdLanded: true }), 6600)
  }
  componentDidUpdate(_p: Record<string, never>, prev: State) {
    if (this.state.phase === 'map' && (prev.phase === 'sketch' || prev.phase === 'prologue')) this.audio.fadeAmbient(2.6)
    if (this.state.hasKey !== this.ctx.hasKey) this.ctx.hasKey = this.state.hasKey
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKey)
    window.removeEventListener('pointerdown', this.onDown)
    window.removeEventListener('scroll', this.onScroll)
    ;[this.tAccept, this.tDoor, this.tEnter, this.tWelcome, this.tAuto, this.tRoom, this.tBird].forEach((t) => t && clearTimeout(t))
    this.breeze.dispose(); this.birds.dispose(); this.audio.dispose()
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.state.activeDoorway) { this.setState({ activeDoorway: null }); return }
      const order: (keyof State)[] = ['showStories', 'showFieldNotes', 'showBlueprint', 'showTable', 'showWork', 'showAdvisory', 'showStage', 'showLibrary', 'showHouse', 'showWhyBelieve', 'showFounderRoom', 'showStudio', 'showPeople', 'showHouses', 'showKey']
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
      this.tAccept = setTimeout(() => this.toSketch(), 3200)
    }, 280) // Scene 5 — nothing happens immediately; ~280ms later the handle turns
  }
  private skip = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (this.tAccept) clearTimeout(this.tAccept)
    rememberPrologueSeen()
    this.audio.fadeAmbient(1.4)
    this.setState({ phase: 'map', opening: false, prologueSeen: true })
  }
  private toSketch = () => {
    this.setState({ phase: 'sketch', activeId: null })
    this.audio.resume(); this.audio.startAmbient()
    if (this.tDoor) clearTimeout(this.tDoor)
    this.tDoor = setTimeout(() => { if (this.state.phase === 'sketch') this.audio.doorOpen() }, 5500)
    if (this.tEnter) clearTimeout(this.tEnter)
    this.tEnter = setTimeout(() => { if (this.state.phase === 'sketch') this.enterBuilding() }, 8200)
  }
  private enterBuilding = () => {
    if (this.tEnter) clearTimeout(this.tEnter)
    // the guided walk plays once before the house opens; afterwards we go straight in
    if (!this.state.prologueSeen) { this.audio.fadeAmbient(2.2); this.setState({ phase: 'prologue', activeId: null }); return }
    this.enterHouse()
  }
  private enterHouse = () => {
    rememberPrologueSeen()
    this.audio.fadeAmbient(1.6)
    this.setState({ phase: 'map', prologueSeen: true, activeId: null, justEntered: true, roomsRevealed: false })
    if (this.tWelcome) clearTimeout(this.tWelcome)
    this.tWelcome = setTimeout(() => this.setState({ justEntered: false }), 5400)
  }
  private replay = () => {
    this.audio.fadeAmbient(1)
    this.setState({ phase: 'overture', opening: false, activeId: null, roomsRevealed: false, birdLanded: false, prologueSeen: false })
    if (this.tBird) clearTimeout(this.tBird)
    this.tBird = setTimeout(() => this.setState({ birdLanded: true }), 6600)
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

  // a dedicated experience page — layered above the doorways it was opened from
  private openDoorway = (id: string): Handler => (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation()
    this.setState({ activeDoorway: id })
  }
  private closeDoorway = () => this.setState({ activeDoorway: null })

  private closedChapters(): Partial<State> {
    return { showHouses: false, showPeople: false, showStudio: false, showFounderRoom: false, showStories: false, showHouse: false, showWhyBelieve: false, showLibrary: false, showBlueprint: false, showFieldNotes: false, showTable: false, showWork: false, showAdvisory: false, showStage: false, activeDoorway: null }
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
  private goForRoomKey = (key: string): Handler => {
    switch (key) {
      case 'founders': return this.ctx.openDoorway('founders-room')
      case 'library': return this.ctx.openLibrary
      case 'table': return this.ctx.openTable
      case 'studio': return this.ctx.openStudio
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
        {phase === 'sketch' && this.renderSketch()}
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
          : this.state.activeDoorway && <DoorwayChapter ctx={this.ctx} id={this.state.activeDoorway} />}
        {this.state.showAdvisory && <AdvisoryChapter ctx={this.ctx} />}
        {this.state.showStage && <StageChapter ctx={this.ctx} />}
        {this.state.showHouse && <HouseChapter ctx={this.ctx} />}
        {this.state.showWhyBelieve && <WhyBelieveChapter ctx={this.ctx} />}
        {this.state.showPeople && <PeopleChapter ctx={this.ctx} />}
        {this.state.showStudio && <StudioChapter ctx={this.ctx} />}
        {this.state.showFounderRoom && <FounderRoomChapter ctx={this.ctx} />}
        {this.state.showStories && <StoriesChapter ctx={this.ctx} />}
      </>
    )
  }

  // ── OVERTURE — the limestone doorway, filled with morning light ────────
  private renderOverture(opening: boolean) {
    const motionOn = motionAllowed(LIGHT_MOTION)
    const glowAnim = opening ? 'glowGrow 2600ms ease 200ms forwards' : 'none'
    const overtureFade = opening ? 'overtureOut 2400ms ease 900ms forwards' : 'none'
    const sunShiftAnim = motionOn ? 'sunShift 170s ease-in-out infinite alternate' : 'none'
    // Scene 7 — three quiet steps forward into the house (a walk, not a zoom)
    const walk = opening && motionOn ? 'walkForward 3200ms cubic-bezier(.4,0,.3,1) 260ms forwards' : undefined
    return (
      <div onClick={this.accept} style={{ position: 'fixed', inset: 0, zIndex: 40, overflow: 'hidden', background: '#0b0906', cursor: 'pointer', animation: overtureFade }}>
        <div style={{ position: 'absolute', inset: 0, transformOrigin: '51% 46%', animation: walk, background: 'radial-gradient(120% 80% at 30% 10%, rgba(255,246,224,0.92), transparent 55%), linear-gradient(180deg,#efe6d3,#e4d9c1 58%,#dbcfb3)' }}>
          {/* the doorway itself — limestone arch, dark warm interior */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(30vh,60vw)', height: '66vh', maxHeight: 640, borderRadius: '999px 999px 10px 10px', background: 'linear-gradient(180deg, #2a2018 0%, #34271b 60%, #241a12)', boxShadow: 'inset 0 8px 60px rgba(10,6,3,0.8), inset 0 0 0 2px rgba(120,94,52,0.25)' }}>
            <div style={{ position: 'absolute', left: '51%', top: '54%', transform: 'translate(-50%,-50%)', width: '80%', height: '78%', borderRadius: '999px 999px 6px 6px', background: 'radial-gradient(closest-side, rgba(255,238,200,0.9), rgba(240,205,140,0.34) 55%, transparent 82%)', opacity: 0, mixBlendMode: 'screen', filter: 'blur(8px)', animation: glowAnim }} />
          </div>
          {/* the real arrival photograph, when present — covers the CSS doorway fallback */}
          <FacadePhoto onStatus={(present) => { if (present !== this.state.facadeReady) this.setState({ facadeReady: present }) }} />

          {/* the wooden door actually swings open — the real leaf, cropped and hinged */}
          {this.state.facadeReady && <RealDoor opening={opening} motionOn={motionAllowed(LIGHT_MOTION)} />}

          {/* a soft limestone lintel shadow */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(58% 50% at 42% 26%, rgba(255,240,205,0.55), rgba(255,240,205,0) 68%)', animation: sunShiftAnim }} />
          <Motes list={this.coverMotes} enabled={motionAllowed(LIGHT_MOTION)} />

          {/* Scene 2 — one bird crosses and lands in the olive tree, then perches */}
          <div style={{ position: 'absolute', left: '13%', top: '30%', zIndex: 2, pointerEvents: 'none', animation: 'birdArrive 4600ms cubic-bezier(.32,.5,.3,1) 1800ms both' }}>
            <svg width="46" height="26" viewBox="0 0 80 44" style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 5px 6px rgba(40,28,10,0.28))' }}>
              <g style={{ transformOrigin: '40px 25px', animation: this.state.birdLanded ? 'birdSettle 6s ease-in-out infinite' : 'birdFlap 300ms ease-in-out infinite' }}>
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
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(300px,58vw)', height: 460, background: 'radial-gradient(60% 60% at 50% 50%, rgba(24,15,6,0.55), rgba(24,15,6,0.2) 62%, transparent 82%)', filter: 'blur(30px)', opacity: 0, animation: 'softFade 2800ms ease 2200ms both' }} />
            <p style={{ position: 'relative', fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(58px,8vw,122px)', lineHeight: 1.08, color: '#faf4ea', margin: 0, opacity: 0, animation: 'softFade 2600ms ease 2800ms both', textShadow: '0 1px 2px rgba(20,14,7,0.7), 0 4px 22px rgba(20,14,7,0.85), 0 0 60px rgba(20,14,7,0.6)' }}>Come in.</p>
            <p style={{ position: 'relative', fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(37px,5.3vw,76px)', lineHeight: 1.24, color: '#f2e7cf', margin: '0.5em 0 0', opacity: 0, animation: 'softFade 2600ms ease 5400ms both', textShadow: '0 1px 3px rgba(20,14,7,0.85), 0 3px 18px rgba(20,14,7,0.9), 0 0 42px rgba(20,14,7,0.7)' }}>We&rsquo;ve been expecting you.</p>
          </div>

          {opening && (
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '70vh', height: '70vh', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,246,224,1),rgba(230,196,132,0.45) 45%,transparent 72%)', animation: 'bloom 2600ms cubic-bezier(.4,.1,.2,1) forwards' }} />
          )}
        </div>

        {/* Scene 1 — the arrival fades up from black (morning birds are heard first) */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 8, background: '#0b0906', pointerEvents: 'none', animation: motionOn ? 'blackReveal 2400ms ease 150ms both' : 'blackReveal 700ms ease both' }} />

        <El onClick={this.skip} style={{ position: 'absolute', right: 'clamp(20px,3vw,40px)', bottom: 'clamp(18px,3vh,32px)', fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.32)', cursor: 'pointer', transition: 'color 400ms ease', zIndex: 5 }} hover={{ color: 'rgba(43,39,35,0.7)' }}>Skip&nbsp;&rarr;</El>
      </div>
    )
  }

  // ── SKETCH — the doorway drawn line by line, then flooded with light ───
  private renderSketch() {
    return (
      <div onClick={this.enterBuilding} style={{ position: 'fixed', inset: 0, zIndex: 37, cursor: 'pointer', overflow: 'hidden', background: '#f6f1e6', animation: 'veilIn 1200ms ease both' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 50% 42%, #fbf7ee, #f3ecdd 72%, #ece3d1)', animation: 'paperBreath 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '11vh', opacity: 0, animation: 'doorFadeIn 1200ms ease 400ms forwards' }}>
          <div style={{ position: 'relative', height: '74vh', maxHeight: 680, aspectRatio: '0.52/1' }}>
            <div style={{ position: 'absolute', inset: '5% 8% 0 8%', borderRadius: '999px 999px 0 0', background: 'radial-gradient(120% 96% at 50% 70%, #fff6de, #f1dca6 46%, #e7cb8b)', opacity: 0, animation: 'lightPour 2600ms ease 5900ms forwards' }} />
            <svg viewBox="0 0 200 380" preserveAspectRatio="xMidYMax meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              <g fill="none" stroke="rgba(43,39,35,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M100,58 L100,376" pathLength={1} stroke="rgba(43,39,35,0.15)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 900ms ease 500ms forwards' }} />
                <path d="M11,122 L11,376" pathLength={1} stroke="rgba(43,39,35,0.16)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 900ms ease 600ms forwards' }} />
                <path d="M7,122 L15,122 M7,376 L15,376" pathLength={1} stroke="rgba(43,39,35,0.16)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 500ms ease 1500ms forwards' }} />
                <path d="M40,42 L160,42" pathLength={1} stroke="rgba(43,39,35,0.15)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 800ms ease 900ms forwards' }} />
                <path d="M40,38 L40,46 M160,38 L160,46" pathLength={1} stroke="rgba(43,39,35,0.15)" strokeWidth="0.9" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 450ms ease 1700ms forwards' }} />
                <path d="M36,120 A64,64 0 0 1 164,120" pathLength={1} stroke="rgba(43,39,35,0.13)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 1200ms ease 700ms forwards' }} />
                <path d="M14,378 L186,378" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 700ms ease 800ms forwards' }} />
                <path d="M46,378 L46,362 L154,362 L154,378" pathLength={1} strokeWidth="1.3" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 1100ms ease 1300ms forwards' }} />
                <path d="M40,362 L40,120 A60,60 0 0 1 160,120 L160,362" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 2000ms cubic-bezier(.5,0,.5,1) 1500ms forwards' }} />
                <path d="M43,360 L43,121 A57,57 0 0 1 157,121 L157,360" pathLength={1} stroke="rgba(43,39,35,0.26)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 2000ms cubic-bezier(.5,0,.5,1) 1750ms forwards' }} />
                <path d="M102,132 L146,132 L146,350 L102,350 Z" fill="rgba(43,39,35,0.05)" stroke="none" style={{ opacity: 0, animation: 'doorFadeIn 1800ms ease 4500ms both' }} />
                <path d="M92,74 L108,74 L106,92 L94,92 Z" pathLength={1} stroke="rgba(43,39,35,0.4)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 700ms ease 3400ms forwards' }} />
                <path d="M52,180 L60,180 M52,300 L60,300" pathLength={1} stroke="rgba(43,39,35,0.34)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 500ms ease 4700ms forwards' }} />
                <g style={{ transformBox: 'fill-box', transformOrigin: '1% 52%', animation: 'doorCrack 2400ms cubic-bezier(.42,0,.3,1) 5400ms forwards' }}>
                  <path d="M52,360 L52,126 A48,48 0 0 1 148,126 L148,360" pathLength={1} stroke="rgba(43,39,35,0.5)" strokeWidth="1.4" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 1700ms cubic-bezier(.5,0,.5,1) 3100ms forwards' }} />
                  <path d="M68,150 L132,150 L132,230 L68,230 Z" pathLength={1} stroke="rgba(43,39,35,0.38)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 900ms ease 3900ms forwards' }} />
                  <path d="M68,246 L132,246 L132,344 L68,344 Z" pathLength={1} stroke="rgba(43,39,35,0.38)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 900ms ease 4300ms forwards' }} />
                  <path d="M138,250 L138,300" pathLength={1} stroke="rgba(43,39,35,0.6)" strokeWidth="1.5" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 500ms ease 4900ms forwards' }} />
                  <circle cx="138" cy="250" r="3.4" pathLength={1} stroke="rgba(43,39,35,0.6)" strokeWidth="1.4" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'inkDraw 400ms ease 5200ms forwards' }} />
                </g>
                <path d="M150,130 L150,352" stroke="rgba(232,198,132,0.72)" strokeWidth="2.6" style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0, animation: 'inkDraw 1000ms ease 5600ms forwards, doorFadeIn 900ms ease 5600ms forwards' }} />
                <path d="M152,150 L176,300" stroke="rgba(232,198,132,0.4)" strokeWidth="1.1" style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0, animation: 'inkDraw 1100ms ease 5800ms forwards, doorFadeIn 900ms ease 5800ms forwards' }} />
                <path d="M150,160 L164,330" stroke="rgba(232,198,132,0.34)" strokeWidth="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0, animation: 'inkDraw 1100ms ease 5950ms forwards, doorFadeIn 900ms ease 5950ms forwards' }} />
              </g>
            </svg>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0, background: 'radial-gradient(82% 72% at 50% 66%, rgba(255,247,224,0.97), rgba(244,231,198,0.72) 52%, transparent 80%)', animation: 'lightPour 2200ms ease 6400ms forwards' }} />
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

        {this.rooms.journey.map((room, i) => this.renderRoomSection(room, i, sunShiftAnim, alive))}

        <Footer ctx={this.ctx} principles={PRINCIPLES} />
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
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: room.blockMax, width: room.blockW, marginLeft: room.blockMx, marginRight: room.blockMx, textAlign: room.textAlign, color: '#f6efe4', pointerEvents: 'none', animation: 'contentFocus 1600ms cubic-bezier(.2,.7,.2,1) both', animationDelay: room.contentDelay }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(46px,7vw,104px)', lineHeight: 0.98, margin: 0, textShadow: '0 2px 40px rgba(20,14,7,0.35)' }}>{room.name}</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.1vw,29px)', lineHeight: 1.4, color: 'rgba(246,239,228,0.9)', margin: '0.7em 0 0', whiteSpace: room.whisperWrap, textShadow: '0 1px 24px rgba(20,14,7,0.4)' }}>{room.whisper}</p>
          <El onClick={this.enterLabelHandler(room)} style={{ pointerEvents: 'auto', cursor: 'pointer', display: 'inline-block', marginTop: '1.7em', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(246,239,228,0.85)', borderBottom: '1px solid rgba(246,239,228,0.42)', paddingBottom: 5, transition: 'color 500ms ease, border-color 500ms ease' }} hover={{ color: '#fff', borderColor: '#fff' }}>{room.enterLabel}</El>
        </div>
      </section>
    )
  }

  /** in-room "enter" routing: chapters for some rooms, the room overlay for others */
  private enterLabelHandler(room: any): Handler {
    if (room.id === 'blueprint') return this.ctx.openBlueprint
    if (room.id === 'fieldnotes') return this.ctx.openFieldNotes
    if (room.id === 'library') return this.ctx.openLibrary
    // rooms with a dedicated experience page open it directly — one room, one page
    if (room.id === 'founders') return this.ctx.openDoorway('founders-room')
    if (room.id === 'advisory') return this.ctx.openDoorway('private-advisory')
    if (room.id === 'table') return this.ctx.openDoorway('founders-table')
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
              <El onClick={this.ctx.openStudio} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', cursor: 'pointer', borderBottom: '1px solid rgba(122,94,52,0.32)', paddingBottom: 3, transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Step Inside the Studio &rarr;</El>
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

            <El onClick={this.ctx.openWork} style={{ margin: '0.4em auto 0', display: 'inline-block', cursor: 'pointer' }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(16px,1.7vw,22px)', color: 'rgba(122,94,52,0.8)', borderBottom: '1px solid rgba(122,94,52,0.35)', paddingBottom: 2 }}>Ready to begin? Explore how founders work with Believe Studio &rarr;</span>
            </El>

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
