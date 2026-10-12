import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { HouseArch } from '../components/HouseArch'
import { RoomHeader } from '../components/RoomHeader'
import { FounderAnswers } from '../components/FounderAnswers'
import { NowWhatFeature } from '../components/NowWhatFeature'
import { LIBRARY_NOTES, PHOTOS } from '../data'

/**
 * The Library — a curated, useful collection, not a fictional archive. Four
 * collections only: Founder Answers (featured), NOW WHAT? (the launched film
 * series), From the Shelf (books curated with Beth), and Field Notes. The old
 * seven numbered shelves, the invented marginalia, the "House Archive" and
 * "Founder Objects", the "Volume VII" residency fiction and the Ladder artifact
 * were removed: nothing is presented as historical that is not real.
 */

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }

const label: React.CSSProperties = { fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }
const h3: React.CSSProperties = { fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }
const sub: React.CSSProperties = { fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', margin: '0 auto' }
const body: React.CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.68)', maxWidth: '42ch', margin: '0 auto', ...pretty }

function Divider() {
  return <div aria-hidden="true" style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(48px,7.5vh,92px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
}

export function LibraryChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeLibrary} background="#efe6d3">
      {/* the room, entered through the House arch — imagery and architecture kept */}
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(92px,15vh,196px) 6vw 0', textAlign: 'center', color: '#2b2723' }}>
        <RoomHeader eyebrow="How the house thinks" title="The Library" descriptor="Borrowed wisdom, worth returning to." titleSize="clamp(40px,6.4vw,92px)" />
        <div style={{ marginTop: 'clamp(44px,7.5vh,98px)', animation: 'fadeUpSoft 1200ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 0% cover 16%' as unknown as string }}>
          <HouseArch scale="standard" width="min(88vw,600px)">
            <ImageSlot src={PHOTOS.library} alt="Floor-to-ceiling walnut shelving in the Library, natural light" placeholder="Floor-to-ceiling walnut shelving, beautiful books, a ladder, natural light" fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: 'center', filter: 'brightness(1.03)', animation: 'slowZoom 20s ease-out both' }} />
          </HouseArch>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(48px,8vh,96px) 6vw clamp(64px,11vh,140px)', textAlign: 'center', color: '#2b2723' }}>

        {/* short intro — the one idea, no long poem */}
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.8vw,52px)', lineHeight: 1.18, color: 'rgba(52,40,26,0.86)', maxWidth: '20ch', margin: '0 auto', letterSpacing: '0.005em', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>No founder should have to learn alone what another has already lived.</p>
        <p style={{ ...body, margin: 'clamp(28px,4.5vh,44px) auto 0' }}>A collection of the questions, ideas, and observations worth returning to.</p>

        <Divider />

        {/* 1 · NOW WHAT? — the launched film series as a curated film feature,
            placed near the top so a founder can watch first. The Watch action
            goes live once the verified YouTube URL is wired in NowWhatFeature
            (never invented). */}
        <NowWhatFeature />

        <Divider />

        {/* 2 · Founder Answers — the read. Follows the film so there are two ways
            in: watch a challenge talked through, or read a perspective. Three
            shown, the rest revealed in place. */}
        <FounderAnswers />

        <Divider />

        {/* 3 · From the Shelf — a growing, curated collection. One confirmed
            title for now; no other books and no invented endorsements. */}
        <div style={label}>From the shelf</div>
        <h3 style={h3}>From the Shelf</h3>
        <p style={{ ...sub, maxWidth: '40ch', display: 'block', marginBottom: 'clamp(40px,6.5vh,72px)' }}>A growing, carefully curated collection of the books that have genuinely shaped how we think about creativity, business, and the connection between brands and people.</p>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.14 }}>The Creative Act: A Way of Being</div>
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', margin: '0.7em 0 0' }}>Rick Rubin</div>
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.7vw,20px)', color: 'rgba(43,39,35,0.55)', margin: 'clamp(34px,5.5vh,56px) auto 0' }}>The first of a growing collection.</p>

        <Divider />

        {/* 4 · Field Notes — a few observations + the full notebook */}
        <div style={label}>Field notes</div>
        <h3 style={h3}>Field Notes</h3>
        <p style={{ ...sub, maxWidth: '34ch', display: 'block', marginBottom: 'clamp(40px,7vh,72px)' }}>Short observations, caught before they disappear.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(34px,6vh,60px)', maxWidth: '32ch', margin: '0 auto' }}>
          {LIBRARY_NOTES.map((n, i) => (
            <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, ...pretty }}>{n}</p>
          ))}
        </div>
        <El onClick={ctx.openFieldNotes} style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', borderBottom: '1px solid rgba(122,94,52,0.4)', paddingBottom: 5, cursor: 'pointer', marginTop: 'clamp(44px,7.5vh,80px)', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Open the notebook &rarr;</El>

        <div aria-hidden="true" style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(48px,7.5vh,92px) auto clamp(28px,4.5vh,48px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* quiet ending */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.35, color: '#2b2723', maxWidth: '22ch', margin: '0 auto clamp(40px,7vh,72px)' }}>Take what&rsquo;s useful. Keep building.</p>
        <RoomNav ctx={ctx} slug="library" />
      </div>
    </ChapterShell>
  )
}
