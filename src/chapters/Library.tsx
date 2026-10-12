import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { HouseArch } from '../components/HouseArch'
import { RoomHeader } from '../components/RoomHeader'
import { JournalFeature } from '../components/JournalFeature'
import { NowWhatFeature } from '../components/NowWhatFeature'
import { PHOTOS } from '../data'

/**
 * The Library — reimagined as an editorial reading room. Three collections:
 * Believe Beyond Borders (the featured journal), From the Studio (original
 * writing, perspectives, and the NOW WHAT? film), and On Our Shelves (books
 * and references that move us). The advisory Founder Answers now live in the
 * Founder's Room; a quiet pointer keeps them discoverable here. The room's
 * own architecture and imagery are preserved. Nothing is invented.
 */

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as React.CSSProperties['textWrap'] }

const label: React.CSSProperties = { fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }
const h3: React.CSSProperties = { fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }
const sub: React.CSSProperties = { fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', margin: '0 auto' }
const body: React.CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.68)', maxWidth: '42ch', margin: '0 auto', ...pretty }
const quietLink: React.CSSProperties = { display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', borderBottom: '1px solid rgba(122,94,52,0.38)', paddingBottom: 5, cursor: 'pointer', transition: 'color 400ms ease' }

function Divider() {
  return <div aria-hidden="true" style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(56px,9vh,112px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />
}

export function LibraryChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeLibrary} background="#efe6d3">
      {/* the reading room, entered through the House arch — architecture kept */}
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(92px,15vh,196px) 6vw 0', textAlign: 'center', color: '#2b2723' }}>
        <RoomHeader eyebrow="The reading room" title="The Library" descriptor="Stories worth sharing." titleSize="clamp(40px,6.4vw,92px)" />
        <div style={{ marginTop: 'clamp(44px,7.5vh,98px)', animation: 'fadeUpSoft 1200ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 0% cover 16%' as unknown as string }}>
          <HouseArch scale="standard" width="min(88vw,600px)">
            <ImageSlot src={PHOTOS.library} alt="Floor-to-ceiling walnut shelving in the Library, natural light" placeholder="Floor-to-ceiling walnut shelving, beautiful books, a ladder, natural light" fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectPosition: 'center', filter: 'brightness(1.03)', animation: 'slowZoom 20s ease-out both' }} />
          </HouseArch>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(48px,8vh,96px) 6vw clamp(64px,11vh,140px)', textAlign: 'center', color: '#2b2723' }}>

        {/* the one idea — editorial, warm, brief */}
        <p style={{ ...body, fontSize: 'clamp(19px,2.2vw,27px)', color: 'rgba(43,39,35,0.74)', maxWidth: '34ch' }}>A collection of people, places, ideas, and things that move us.</p>

        <Divider />

        {/* 1 · Believe Beyond Borders — the featured journal, a restrained preview */}
        <JournalFeature ctx={ctx} />

        <Divider />

        {/* 2 · From the Studio — original writing, perspectives, and film. NOW
            WHAT? keeps its full feature treatment and prominence. */}
        <div style={label}>From the studio</div>
        <h3 style={h3}>From the Studio</h3>
        <p style={{ ...sub, maxWidth: '38ch', display: 'block', marginBottom: 'clamp(44px,7.5vh,84px)' }}>Original writing, perspectives, and film on creativity, brand, and the questions that shape our work.</p>
        <NowWhatFeature />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: '0.8em 2.4em', marginTop: 'clamp(44px,7.5vh,84px)' }}>
          <El onClick={ctx.openFieldNotes} style={quietLink} hover={{ color: '#2b2723' }}>Open the Notebook &rarr;</El>
          <El onClick={ctx.openFounderRoom} style={quietLink} hover={{ color: '#2b2723' }}>Founder Answers, in the Founder&rsquo;s Room &rarr;</El>
        </div>

        <Divider />

        {/* 3 · On Our Shelves — books and references that move us. The Creative
            Act is the first; no invented endorsements. */}
        <div style={label}>On our shelves</div>
        <h3 style={h3}>On Our Shelves</h3>
        <p style={{ ...sub, maxWidth: '40ch', display: 'block', marginBottom: 'clamp(40px,6.5vh,72px)' }}>A growing, carefully curated selection of the books and references that have genuinely shaped how we think.</p>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.14 }}>The Creative Act: A Way of Being</div>
          <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', margin: '0.7em 0 0' }}>Rick Rubin</div>
        </div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.7vw,20px)', color: 'rgba(43,39,35,0.55)', margin: 'clamp(34px,5.5vh,56px) auto 0' }}>The first of a growing collection.</p>

        <div aria-hidden="true" style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(56px,9vh,112px) auto clamp(28px,4.5vh,48px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* quiet ending */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.35, color: '#2b2723', maxWidth: '22ch', margin: '0 auto clamp(40px,7vh,72px)' }}>There is always more to discover.</p>
        <RoomNav ctx={ctx} slug="library" />
      </div>
    </ChapterShell>
  )
}
