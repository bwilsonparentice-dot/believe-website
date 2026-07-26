import React, { useState, CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
import { ConversationNote } from '../components/ConversationNote'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

// the resident's own ink — a deep, quiet indigo, still at home on warm cream
const indigo = '#282c46'
const indigoSoft = 'rgba(40,44,70,0.7)'

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.66)',
}

const surface = (range = 'entry 2% cover 26%'): CSSProperties => ({
  animation: 'fadeUpSoft 1300ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

// The House this month — one practitioner, one workshop, one artifact left behind.
// `team` residents belong to Believe (their link goes inward to The People);
// outside residents instead carry a `website` that opens to their own work.
const RESIDENT: {
  month: string; name: string; role: string; line: string; bio: string[]; portrait: string
  workshopNo: string; workshopTitle: string; workshopSub: string; hook: string[]; artifact: string
  carrying: string; clarifies: string
  team?: boolean; website?: string
} = {
  month: 'August 2026',
  name: 'Mona',
  role: 'Resident AI Strategist',
  line: 'Helping founders build the first AI team they can actually manage.',
  // a short, warm bio — enough to show she has lived this, not merely studied it.
  // (edit with Mona's real details whenever you like.)
  bio: [
    'Mona spends her days where AI meets CPG — helping founders put new tools to work without losing the thread of why they started.',
    'She isn’t here to explain the technology. She’s here to build it beside you, live, with real work on the table.',
  ],
  portrait: '/photos/portrait-mona.webp',
  workshopNo: 'Founder Workshop No. 001',
  workshopTitle: 'Buy Back 20 Hours',
  workshopSub: 'Five roles you can put to work this week.',
  hook: ['You have a spreadsheet you haven’t opened.', 'In ninety minutes we’ll hire someone to handle it.'],
  artifact: 'The AI Employee Handbook',
  carrying: '“There’s only one of me.”',
  clarifies: 'Which work should no longer require the founder.',
  team: true, // Mona is the one resident who is also part of the Believe team
}

// the small museum-catalog line beneath the title — a pattern founders will
// begin to recognize: every Resident leaves one permanent thing behind.
const CATALOG: [string, string][] = [
  ['Current Resident', RESIDENT.name],
  ['Month', RESIDENT.month],
  ['Artifact', RESIDENT.artifact],
]

/**
 * In Residence — the room behind the "Resident Experts" doorway. A quiet study
 * inside the House: not a calendar, not a funnel, but a museum announcing the
 * practitioner currently in residence and the one thing they'll leave behind.
 * Warm cream, deep-indigo ink, generous air. (ctx.openStudio → this surface.)
 */
export function InResidenceChapter({ ctx }: { ctx: Ctx }) {
  const [noteOpen, setNoteOpen] = useState(false)

  return (
    <ChapterShell onClose={ctx.closeStudio} background="#f3ecdc">
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(104px,20vh,260px) 7vw clamp(90px,16vh,200px)', color: '#2b2723' }}>

        {/* ── the opening — the House names the room ────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, fontSize: 11, marginBottom: '1.6em' }}>The House this month</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(46px,8vw,116px)', lineHeight: 0.96, letterSpacing: '0.02em', margin: '0 0 0.5em', color: indigo }}>In Residence</h2>

          {/* the residency philosophy — the distinction, then the exchange */}
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.22, color: indigo, margin: '0 auto 0.9em', maxWidth: '18ch', ...balance }}>The Resident changes.<br />The House remembers.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', margin: '0 auto clamp(48px,8vh,90px)', maxWidth: '30ch', ...balance }}>Founders bring what they’ve been carrying alone. The House brings the wisdom to work it through.</p>

          {/* the museum-catalog line */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.55em', textAlign: 'left', margin: '0 auto', paddingTop: '0.4em' }}>
            {CATALOG.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: '1.1em' }}>
                <span style={{ ...label, fontSize: 9, letterSpacing: '0.3em', minWidth: '10.5em', color: 'rgba(122,94,52,0.6)' }}>{k}</span>
                <span style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(17px,1.9vw,23px)', color: indigo }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── what a residency is — discovered, not explained ───────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(110px,20vh,240px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.4, color: indigo, maxWidth: '24ch', margin: '0 auto', ...balance }}>A different practitioner enters the House each month.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', maxWidth: '32ch', margin: 'clamp(40px,7vh,80px) auto 0', ...pretty }}>A Resident is invited because they have lived something founders need — not simply studied it. During their month in the House they lead a Founder Workshop, work through something real with founders in the room, and leave one piece of hard-won wisdom in the Believe Library.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.8, color: 'rgba(43,39,35,0.62)', maxWidth: '26ch', margin: 'clamp(40px,7vh,80px) auto 0' }}>Every Resident leaves something behind.<br /><span style={{ fontStyle: 'italic', color: indigoSoft }}>A framework. A handbook. A way of seeing.</span></p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', margin: 'clamp(40px,7vh,80px) auto 0', maxWidth: '26ch', ...balance }}>Residents visit. What they leave behind remains.</p>
        </div>

        {/* ── this month's Resident, and the workshop she is leading ────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(36px,5vw,74px)', margin: 'clamp(130px,24vh,300px) auto 0', ...surface() }}>
          <div style={{ flex: '0 1 250px', minWidth: 200, maxWidth: 264 }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#e6dcc6', boxShadow: '0 36px 66px -46px rgba(40,44,70,0.5)', borderRadius: 'clamp(58px,7.5vw,104px) clamp(58px,7.5vw,104px) 8px 8px' }}>
              <ImageSlot src={RESIDENT.portrait} alt={`Portrait of ${RESIDENT.name}, ${RESIDENT.role}`} placeholder="Editorial portrait of the current resident in warm light" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'brightness(1.05)' }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 54% at 40% 26%, rgba(255,238,196,0.4), transparent 68%)' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 330px', minWidth: 290, textAlign: 'left' }}>
            <div style={{ ...label, fontSize: 10, letterSpacing: '0.42em', marginBottom: '1em' }}>{RESIDENT.month}</div>
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,5.4vw,72px)', lineHeight: 0.98, margin: '0 0 0.28em', color: indigo }}>{RESIDENT.name}</h3>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,27px)', color: 'rgba(122,94,52,0.82)', marginBottom: '1em' }}>{RESIDENT.role}</div>
            {RESIDENT.bio.map((b, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.72)', maxWidth: '34ch', margin: i === 0 ? 0 : '0.7em 0 0', ...pretty }}>{b}</p>
            ))}

            {/* a resident from within Believe links inward; an outside one links out */}
            {RESIDENT.team ? (
              <El onClick={ctx.openPeople} style={{ display: 'inline-block', marginTop: 'clamp(18px,2.6vh,26px)', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', borderBottom: '1px solid rgba(122,94,52,0.32)', paddingBottom: 4, cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease' }} hover={{ color: indigo, borderColor: indigoSoft }}>A member of the Believe team →</El>
            ) : RESIDENT.website ? (
              <a href={RESIDENT.website} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 'clamp(18px,2.6vh,26px)', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', borderBottom: '1px solid rgba(122,94,52,0.32)', paddingBottom: 4, textDecoration: 'none' }}>Visit {RESIDENT.name}’s work →</a>
            ) : null}

            {/* the workshop she is leading — joined to her so they read as one */}
            <div aria-hidden="true" style={{ width: 40, height: 1, background: 'rgba(122,94,52,0.3)', margin: 'clamp(28px,4.5vh,44px) 0' }} />
            <div style={{ ...label, fontSize: 9.5, letterSpacing: '0.4em', marginBottom: '0.8em' }}>{RESIDENT.workshopNo}</div>
            <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.7vw,48px)', lineHeight: 1.03, color: indigo, marginBottom: '0.35em' }}>{RESIDENT.workshopTitle}</div>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.8)', margin: 0, maxWidth: '26ch' }}>{RESIDENT.workshopSub}</p>
          </div>
        </div>

        {/* ── the workshop, worked through — the shape of the residency ──── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(90px,15vh,180px)', ...surface() }}>

          {/* how a workshop works — the shared shape of every residency */}
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', maxWidth: '34ch', margin: 'clamp(44px,7vh,84px) auto 0', ...pretty }}>Every workshop begins with something real a founder is carrying. A Resident works through it live with the room — not as a presentation, but as shared work. What is learned becomes part of the Library, so its value reaches beyond the founders who were present.</p>

          {/* the workshop, catalogued the way the Library will remember it */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 'clamp(20px,3vh,28px)', textAlign: 'left', margin: 'clamp(48px,8vh,96px) auto 0' }}>
            {([['What founders are carrying', RESIDENT.carrying], ['The decision it clarifies', RESIDENT.clarifies], ['What will remain in the Library', RESIDENT.artifact]] as [string, string][]).map(([k, v]) => (
              <div key={k}>
                <div style={{ ...label, fontSize: 9, letterSpacing: '0.32em', marginBottom: '0.5em', color: 'rgba(122,94,52,0.6)' }}>{k}</div>
                <div style={{ fontFamily: serif, fontStyle: k === 'What founders are carrying' ? 'italic' : 'normal', fontWeight: 400, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.32, color: indigo, maxWidth: '22ch' }}>{v}</div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.32, color: indigo, maxWidth: '20ch', margin: 'clamp(56px,9vh,110px) auto 0', ...balance }}>This workshop is not about AI. It is about what you would do with twenty hours.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', margin: 'clamp(20px,3vh,32px) auto 0' }}>AI does the prep. You do the judgment.</p>

          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(24px,3.4vw,46px)', lineHeight: 1.34, color: indigo, maxWidth: '20ch', margin: 'clamp(48px,8vh,96px) auto 0', ...balance }}>{RESIDENT.hook[0]}</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.5vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.66)', maxWidth: '24ch', margin: 'clamp(16px,2.6vh,30px) auto 0', ...balance }}>{RESIDENT.hook[1]}</p>

          <El
            onClick={() => setNoteOpen(true)}
            style={{ display: 'inline-block', margin: 'clamp(44px,7vh,84px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.36em', textTransform: 'uppercase', color: '#f3ecdc', background: indigo, border: `1px solid ${indigo}`, borderRadius: 2, padding: '15px 42px', cursor: 'pointer', transition: 'background 400ms ease, color 400ms ease' }}
            hover={{ background: 'transparent', color: indigo }}
          >
            Come in
          </El>
        </div>

        {/* ── what founders will experience — curiosity, not an agenda ───── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '2.4em' }}>What founders will experience</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.42, color: indigo, maxWidth: '26ch', margin: '0 auto', ...balance }}>During this workshop you’ll watch a founder bring real work into the room.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.9, color: 'rgba(43,39,35,0.6)', maxWidth: '24ch', margin: 'clamp(38px,6vh,72px) auto 0' }}>Nothing is rehearsed.<br />Nothing is polished.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.64)', maxWidth: '32ch', margin: 'clamp(38px,6vh,72px) auto 0', ...pretty }}>Together we’ll build two AI teammates using a real spreadsheet, a real buyer meeting, and the work someone has been avoiding.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', margin: 'clamp(44px,7vh,84px) auto 0', maxWidth: '20ch', ...balance }}>Then the recording stops.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.2vw,29px)', lineHeight: 1.42, color: indigo, maxWidth: '24ch', margin: 'clamp(30px,5vh,56px) auto 0', ...balance }}>The rest of the afternoon belongs only to the founders in the room.</p>
        </div>

        {/* ── left behind — the archival artifact, resting on a shelf ────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, fontSize: 11, letterSpacing: '0.46em', marginBottom: '1.6em' }}>Left Behind</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.42, color: 'rgba(43,39,35,0.72)', maxWidth: '28ch', margin: '0 auto clamp(64px,11vh,120px)', ...balance }}>Every Resident leaves something behind for the founders who come after them.</p>

          {/* a card that belongs on a shelf, not a download button */}
          <figure style={{ position: 'relative', width: 'min(88%,440px)', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ position: 'relative', background: 'linear-gradient(172deg,#faf4e6,#f0e7d2)', borderLeft: `4px solid ${indigo}`, borderRadius: '2px 5px 5px 2px', padding: 'clamp(40px,5vw,60px) clamp(34px,4.4vw,54px) clamp(36px,4.4vw,52px)', boxShadow: '0 40px 74px -40px rgba(40,44,70,0.5), 0 2px 3px rgba(60,44,20,0.12)', overflow: 'hidden' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(122,94,52,0.1), inset 0 0 34px rgba(122,94,52,0.05)', pointerEvents: 'none' }} />
              <div style={{ ...label, fontSize: 9, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.55)', marginBottom: '1.4em' }}>Left in the Library</div>
              <h4 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.6vw,44px)', lineHeight: 1.08, margin: '0 0 0.5em', color: indigo }}>{RESIDENT.artifact}</h4>
              <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: 'clamp(22px,3vw,30px)' }}>{RESIDENT.name} &middot; {RESIDENT.month}</div>
              <div aria-hidden="true" style={{ width: 30, height: 1, background: 'rgba(122,94,52,0.28)', margin: '0 0 clamp(22px,3vw,28px)' }} />
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.1vw,26px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.78)', margin: 0 }}>Five AI roles.<br />Five onboarding guides.<br />One operating system.</p>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px,1.6vw,19px)', lineHeight: 1.6, color: 'rgba(52,40,26,0.5)', margin: 'clamp(24px,3.4vw,34px) 0 0' }}>Delivered after the workshop.<br />Eventually archived in the Believe Library.</p>
            </div>
          </figure>
        </div>

        {/* ── the residency principle — a permanent rule of the House ─────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(22px,2.9vw,40px)', lineHeight: 1.32, color: indigo, maxWidth: '22ch', margin: '0 auto', ...balance }}>Every Resident leaves something behind so founders they’ve never met can benefit years later.</p>
        </div>

        {/* ── who is invited in — the casting standard ──────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(130px,24vh,300px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '2.4em' }}>Who is invited in</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.42, color: indigo, maxWidth: '24ch', margin: '0 auto' }}>We do not invite people simply because they are experts.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.42, color: indigo, maxWidth: '24ch', margin: 'clamp(20px,3vh,32px) auto 0' }}>We invite people who have lived what they teach.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', margin: 'clamp(40px,7vh,80px) auto 0', maxWidth: '26ch', ...balance }}>Frameworks are everywhere. Hard-won perspective is not.</p>
        </div>

        {/* ── looking ahead — anticipation, not a calendar ──────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(150px,28vh,340px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '2.4em' }}>Soon</div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.32, color: indigo, maxWidth: '20ch', margin: '0 auto', ...balance }}>Another Resident will enter the House.</p>
        </div>

        {/* ── previous residents — the absence is intentional ───────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(150px,28vh,340px)', ...surface() }}>
          <div style={{ ...label, fontSize: 11, letterSpacing: '0.46em', marginBottom: '1.8em' }}>Previous Residents</div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.5)', maxWidth: '24ch', margin: '0 auto' }}>The Library is just beginning.</p>
        </div>

        {/* ── while you're here — the Founder's Room, very quietly ───────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(150px,28vh,340px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '1.8em' }}>While you’re here</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', maxWidth: '30ch', margin: '0 auto', ...pretty }}>Founder’s Room members gather privately with each Resident during their residency month.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.76)', margin: 'clamp(28px,4.5vh,48px) auto 0' }}>Eight founders. One hour. Off the record.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(110px,20vh,240px)' }}><BackPill onClose={ctx.closeStudio} label="← Back" /></div>
      </div>

      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
