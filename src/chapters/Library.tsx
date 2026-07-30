import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { LightShift, Dust, Keynote } from '../components/Living'
import { ArchivalRecord } from '../components/ArchivalRecord'
import { LIBRARY_BOOKS, LIBRARY_MARGINS, LIBRARY_OBJECTS, LIBRARY_NOTES, RESIDENCY_RECORDS, PHOTOS } from '../data'

/** The Library — borrowed wisdom, collected over years. */
export function LibraryChapter({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeLibrary} background="#efe6d3">
      {/* a quiet interior: floor-to-ceiling walnut shelving */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(360px,60vh,720px)', overflow: 'hidden', borderRadius: 'clamp(120px,26vw,420px) clamp(120px,26vw,420px) clamp(40px,6vw,120px) clamp(40px,6vw,120px)' }}>
        <ImageSlot src={PHOTOS.library} alt="Floor-to-ceiling walnut shelving in natural light" placeholder="Floor-to-ceiling walnut shelving, beautiful books, a ladder, natural light — an extraordinary private collection" fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'brightness(1.04)', animation: 'slowZoom 20s ease-out both' }} />
        <LightShift at="30% 22%" />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 30% 24%, rgba(255,214,150,0.5), transparent 68%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(20,14,7,0.24) 0%, transparent 34%, transparent 46%, rgba(239,230,211,0.94) 100%)' }} />
        <Dust n={20} seed={13} box={[8, 78, 6, 58]} />
        <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: 'min(780px,94%)', height: '48%', pointerEvents: 'none', background: 'radial-gradient(82% 92% at 50% 100%, rgba(22,16,9,0.58), rgba(22,16,9,0.26) 48%, transparent 76%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(34px,6vh,70px)', textAlign: 'center', color: '#f6efe4', padding: '0 6vw' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(249,243,231,0.92)', marginBottom: '0.8em', textShadow: '0 1px 12px rgba(20,14,7,0.85), 0 2px 30px rgba(20,14,7,0.7)' }}>How the house thinks</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(40px,6.6vw,96px)', lineHeight: 1, margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}>The Library</h2>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', color: 'rgba(248,242,232,0.96)', marginTop: '0.5em', textShadow: '0 1px 10px rgba(20,14,7,0.8), 0 2px 26px rgba(20,14,7,0.6)' }}>Borrowed wisdom, collected over years.</div>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(48px,8vh,96px) 6vw clamp(64px,11vh,140px)', textAlign: 'center', color: '#2b2723' }}>

        <Keynote>Others have walked this path before you.</Keynote>

        {/* the opening thought */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.9)', maxWidth: '24ch', margin: '0 auto 1.4em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every meaningful house eventually becomes a library.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 2, color: 'rgba(43,39,35,0.68)', maxWidth: '34ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Not because it collects books.<br />Because it collects wisdom.<br />Some of it printed.<br />Some of it spoken.<br />Some of it quietly left behind by the people who once sat here.</p>

        {/* the founding inscription of the Library — carved, permanent, inherited */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(28px,4.4vw,62px)', lineHeight: 1.16, color: 'rgba(52,40,26,0.82)', maxWidth: '18ch', margin: 'clamp(80px,14vh,180px) auto 0', letterSpacing: '0.005em', textWrap: 'balance' as React.CSSProperties['textWrap'], animation: 'fadeUpSoft 1200ms ease both', animationTimeline: 'view()' as unknown as string, animationRange: 'entry 4% cover 28%' as unknown as string }}>No founder should have to learn alone what another founder has already lived.</p>

        {/* how wisdom enters, and how it stays */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '28ch', margin: 'clamp(64px,11vh,130px) auto 0', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>The workshops are how wisdom enters the House. The Library is how it stays.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.75, color: 'rgba(43,39,35,0.68)', maxWidth: '44ch', margin: 'clamp(34px,5.5vh,60px) auto 0', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every Resident leaves something behind — a handbook, a dashboard, an audit, a framework, or another piece of hard-won wisdom. Long after the residency ends, that work remains here for founders they may never meet.</p>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(56px,9vh,110px) auto clamp(40px,6.5vh,80px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* SHELF ONE — From the Shelf */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Shelf One</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>From the Shelf</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '34ch', margin: '0 auto clamp(48px,8vh,84px)' }}>Not recommendations. The books we return to — the ones that shaped how Believe Studio thinks.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(34px,5.5vh,58px)', textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
          {LIBRARY_BOOKS.map((b, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.1 }}>{b.title}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', margin: '0.5em 0 0.7em' }}>{b.author}</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.7)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{b.why}</p>
            </div>
          ))}
        </div>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* SHELF TWO — Left in the Margins */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Shelf Two</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>Left in the Margins</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '34ch', margin: '0 auto clamp(52px,9vh,96px)' }}>Notes founders tucked inside a favorite book, and never took back.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px,10vh,110px)' }}>
          {LIBRARY_MARGINS.map((m, i) => (
            <p key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3.2vw,42px)', lineHeight: 1.38, color: 'rgba(43,39,35,0.86)', maxWidth: '22ch', margin: '0 auto', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>“{m}”</p>
          ))}
        </div>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* SHELF THREE — Founder Objects / The House Archive */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Shelf Three</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>Founder Objects</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '30ch', margin: '0 auto 0.5em' }}>Not books. Artifacts.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.85vw,23px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.62)', maxWidth: '34ch', margin: '0 auto clamp(72px,12vh,150px)', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Every meaningful company leaves something behind. These are a few of ours.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(58px,10vh,120px)', textAlign: 'left', maxWidth: 720, margin: '0 auto' }}>
          {LIBRARY_OBJECTS.map((o, i) => {
            // each snapshot placed a little differently — a scattered, handled feel
            const flip = i % 2 === 1
            const tilt = ['-2.6deg', '2deg', '-1.5deg', '2.7deg', '-2.2deg', '1.6deg'][i % 6]
            const drop = ['0px', 'clamp(16px,3vw,42px)', 'clamp(6px,1.6vw,22px)'][i % 3]
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(22px,4vw,54px)', flexDirection: flip ? 'row-reverse' : 'row' }}>
                {/* a small archival snapshot — ivory print border, soft contact shadow */}
                <figure style={{ flex: '0 0 auto', width: 'clamp(112px,19vw,168px)', margin: 0, marginTop: drop, transform: `rotate(${tilt})` }}>
                  <div style={{ position: 'relative', background: 'linear-gradient(160deg,#fbf6ec,#f3ebd9)', padding: 'clamp(6px,1vw,9px)', borderRadius: 2, boxShadow: '0 1px 2px rgba(60,44,20,0.12), 0 12px 20px -14px rgba(60,44,20,0.32)' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 1 }}>
                      <ImageSlot src={o.src} placeholder={o.photo} alt={o.name} fit="cover" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#f5efe1', objectPosition: (o as { pos?: string }).pos ?? 'center' }} />
                    </div>
                    <figcaption style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.55)', textAlign: 'center', marginTop: 'clamp(5px,0.9vw,8px)' }}>No. {o.no}</figcaption>
                  </div>
                </figure>
                <div style={{ flex: '1 1 auto', minWidth: 0, paddingTop: 'clamp(2px,1vw,10px)' }}>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: '0.46em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.55)', marginBottom: '1em' }}>House Archive</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(25px,3.2vw,40px)', lineHeight: 1.06, marginBottom: '0.5em' }}>{o.name}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.62, color: 'rgba(43,39,35,0.72)', margin: '0 0 1.2em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{o.story}</p>
                  <div style={{ borderTop: '1px solid rgba(122,94,52,0.24)', paddingTop: '1em' }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,25px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.85)', margin: 0 }}>{o.lesson}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,29px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.66)', maxWidth: '26ch', margin: 'clamp(80px,13vh,150px) auto 0', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>One day, an object of yours might rest here too.</p>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* SHELF FOUR — The People who keep the shelves */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Shelf Four</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>Who Keeps the Shelves</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '34ch', margin: '0 auto clamp(40px,6vh,64px)' }}>Not biographies. Caretakers. Each one quietly keeps a different shelf.</p>
        <El onClick={ctx.openPeople} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', cursor: 'pointer', borderBottom: '1px solid rgba(122,94,52,0.32)', paddingBottom: 3, transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Meet the people of Believe Studio →</El>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* SHELF FIVE — Field Notes */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Shelf Five</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>Field Notes</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '34ch', margin: '0 auto clamp(48px,8vh,84px)' }}>Observations, caught before they disappeared. This shelf grows slowly, over years.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(38px,6.5vh,66px)', maxWidth: '32ch', margin: '0 auto' }}>
          {LIBRARY_NOTES.map((n, i) => (
            <p key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.82)', margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{n}</p>
          ))}
        </div>
        <El onClick={ctx.openFieldNotes} style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)', borderBottom: '1px solid rgba(122,94,52,0.4)', paddingBottom: 5, cursor: 'pointer', marginTop: 'clamp(48px,8vh,84px)', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Open the notebook →</El>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* SHELF SIX — The Archive */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Shelf Six</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>The House Archive</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '36ch', margin: '0 auto clamp(44px,7vh,72px)' }}>Everything preserved. Nothing forgotten.</p>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 2.1, color: 'rgba(43,39,35,0.6)', maxWidth: '30ch', margin: '0 auto' }}>Original Believe Blueprints<br />Letters<br />Sketches<br />Architectural drawings<br />Invitations<br />Historic photographs</div>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* SHELF SEVEN — From the Residencies: workshops catalogued as records */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>Shelf Seven</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.04, margin: '0 0 0.5em' }}>From the Residencies</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,24px)', color: 'rgba(122,94,52,0.78)', maxWidth: '34ch', margin: '0 auto clamp(40px,6vh,64px)' }}>What each Resident worked through with founders, and the one thing they left behind.</p>

        {/* A small engraved brass plate on the spine of the bound ledger these
            records are transcribed from. Not interactive, not highlighted — it
            simply reads Volume VII, and the observant visitor wonders, quietly,
            where I–VI are. Evidence that the House was keeping records long
            before they arrived. */}
        <div aria-hidden="true" style={{ display: 'inline-block', margin: '0 auto clamp(52px,9vh,100px)', padding: '9px 19px', background: 'linear-gradient(152deg,#c1a468,#93763f 54%,#af9256)', borderRadius: 2, boxShadow: 'inset 0 1px 0 rgba(255,248,226,0.55), inset 0 -1px 0 rgba(52,38,16,0.5), 0 9px 20px -13px rgba(60,44,20,0.55)' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(40,29,13,0.72)', textShadow: '0 1px 0 rgba(255,248,226,0.4)' }}>Residency Log · Volume VII</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(44px,8vh,90px)' }}>
          {RESIDENCY_RECORDS.map((r) => (
            <ArchivalRecord key={r.no} record={r} />
          ))}
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.6)', maxWidth: '28ch', margin: 'clamp(56px,9vh,110px) auto 0', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>What one founder learns should not disappear when the room closes.</p>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* the artifact: The Ladder */}
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.62)', marginBottom: '0.9em' }}>The artifact</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.02, margin: '0 0 0.7em' }}>The Ladder</h3>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.76)', maxWidth: '34ch', margin: '0 auto 1.4em', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Some wisdom simply waits a little higher than expected. The ladder exists for the moments when experience needs a little help finding you.</p>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)' }}>Reach · Discover · Remember · Pass Along</div>

        <div style={{ width: 1, height: 'clamp(44px,7vh,88px)', margin: 'clamp(40px,6.5vh,80px) auto clamp(30px,5vh,56px)', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* quiet ending */}
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.35, color: '#2b2723', maxWidth: '22ch', margin: '0 auto 0.6em' }}>Take this with you.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.62)', maxWidth: '34ch', margin: '0 auto clamp(40px,7vh,72px)', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>Sometimes you’ll leave with a book.<br />Sometimes with a question.<br />Sometimes with the courage to keep building.<br /><br />Close the book. Keep building.</p>
        <RoomNav ctx={ctx} slug="library" />
      </div>
    </ChapterShell>
  )
}
