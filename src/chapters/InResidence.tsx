import React, { useState, CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'
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

// The current resident. Not an event listing — a practitioner invited into an
// institution because of what they leave behind. Copy is philosophy-first;
// credentials appear only as evidence. (Edit with the resident's real details.)
// the workshop cover — the poster for Founder Workshop No. 001 (carries the
// resident's name, the workshop title, and its promise in one designed image)
const WORKSHOP_COVER = '/photos/workshop-buyback20.webp'

// where founders reserve a seat at the workshop — the Luma event page
const REGISTER_URL = 'https://luma.com/fubwg0mx'

const RESIDENT = {
  name: 'Chef MoWils',
  fullName: 'Chef MoWils',
  role: 'Resident AI Strategist',
  season: 'Summer 2026',
  month: 'August 2026',
  team: true,

  // why she belongs here — the qualities first, the résumé only as evidence
  why: [
    'Chef MoWils has spent a career refusing to accept that things must be done the way they have always been done.',
    'Long before AI, she was inventing categories that didn’t yet exist — turning one unlikely idea, the savory cupcake, into a company, It’s A CupCake!, and a story that reached Food Network, People, and Food & Wine.',
    'What made her a remarkable entrepreneur is exactly what makes her a remarkable resident: curiosity, a willingness to experiment, the discipline to actually ship, and the resilience to keep going when the map runs out.',
    'Those were the qualities we wanted for the House’s first AI residency — not a technologist, but a builder who has lived the founder’s road and now helps others walk it with new tools in hand.',
  ],

  // a concise, warm biography — judgment over technology
  about: [
    'Chef MoWils is Believe Studio’s Resident AI Strategist. She helps founders use AI the way a seasoned operator would — thoughtfully, practically, and always in service of the business, never for its own sake.',
    'Her focus is judgment, not technology. She is far less interested in what a tool can do than in what a founder should do with the hours it hands back.',
    'People over software. Capacity over automation. The aim is never to take the founder out of the work that matters — only out of the work that never should have required them.',
  ],

  workshopNo: 'Founder Workshop No. 001',
  workshopTitle: 'Buy Back 20 Hours',
  workshopSub: 'Five roles you can put to work this week.',
  carrying: '“There’s only one of me.”',
  clarifies: 'Some work no longer belongs to the founder.',
  artifact: 'The AI Employee Handbook',

  // what a founder walks away with — each an outcome, never a feature
  leaveWith: [
    'An AI teammate that quietly handles the repetitive work.',
    'The judgment to think alongside AI, not merely use it.',
    'A clear sense of which work should no longer require you.',
    'And twenty hours you didn’t have last week.',
  ],

  hook: ['You have a spreadsheet you haven’t opened.', 'In ninety minutes we’ll hire someone to handle it.'],
}

// the House Card — a museum object label for the current resident
const HOUSE_CARD: [string, string][] = [
  ['In Residence', RESIDENT.season],
  ['Current Contribution', `${RESIDENT.workshopNo} — ${RESIDENT.workshopTitle}`],
  ['What Founders Are Carrying', RESIDENT.carrying],
  ['What Becomes Clear', RESIDENT.clarifies],
  ['Leaves Behind', RESIDENT.artifact],
]

/**
 * In Residence — an institution welcoming a respected resident into the House.
 * Closer to an artist or university residency than an event page: residents are
 * invited not to teach but to contribute something permanent. Philosophy leads;
 * credentials appear only as evidence. Warm cream, deep-indigo ink, museum air.
 * (ctx.openStudio → this surface.)
 */
export function InResidenceChapter({ ctx }: { ctx: Ctx }) {
  const [noteOpen, setNoteOpen] = useState(false)
  const R = RESIDENT

  return (
    <ChapterShell onClose={ctx.closeStudio} background="#f3ecdc">
      <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', padding: 'clamp(104px,20vh,260px) 7vw clamp(90px,16vh,200px)', color: '#2b2723' }}>

        {/* ── the hero — an invitation, quietly ─────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, fontSize: 11, marginBottom: '1.6em' }}>A residency at Believe Studio</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(46px,8vw,116px)', lineHeight: 0.96, letterSpacing: '0.02em', margin: '0 0 0.6em', color: indigo }}>In Residence</h2>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3vw,42px)', lineHeight: 1.24, color: indigo, margin: '0 auto', maxWidth: '20ch', ...balance }}>Some wisdom is too valuable to remain outside the House.</p>

          <div style={{ marginTop: 'clamp(56px,10vh,120px)', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3.2vh,32px)', ...surface() }}>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.72)', maxWidth: '36ch', margin: '0 auto', ...pretty }}>Throughout the year, Believe Studio invites remarkable founders, operators, strategists, and builders to spend time in residence.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.4, color: indigo, maxWidth: '18ch', margin: 'clamp(8px,1.6vh,18px) auto 0', ...balance }}>Not simply to teach.<br />To contribute.</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.82)', margin: 'clamp(8px,1.6vh,18px) auto 0', maxWidth: '24ch', ...balance }}>Each residency adds something permanent to the House.</p>
          </div>
        </div>

        {/* ── why Chef MoWils is in residence — philosophy before credentials ──── */}
        <div style={{ textAlign: 'center', margin: 'var(--space-lg) auto 0', ...surface() }}>
          <div style={{ ...label, fontSize: 10, letterSpacing: '0.42em', marginBottom: 'clamp(34px,6vh,64px)' }}>Why Chef MoWils is in residence</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3.6vh,38px)' }}>
            {R.why.map((p, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: i === 0 ? 'clamp(24px,3.2vw,44px)' : 'clamp(18px,2.1vw,26px)', lineHeight: i === 0 ? 1.22 : 1.6, color: i === 0 ? indigo : 'rgba(43,39,35,0.76)', maxWidth: i === 0 ? '20ch' : '38ch', margin: '0 auto', ...(i === 0 ? balance : pretty) }}>{p}</p>
            ))}
          </div>
        </div>

        {/* ── about Chef MoWils — concise, warm, human ─────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: 'clamp(40px,7vh,80px)' }}>About Chef MoWils</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,4vh,44px)' }}>
            {R.about.map((p, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', maxWidth: '38ch', margin: '0 auto', ...pretty }}>{p}</p>
            ))}
          </div>
        </div>

        {/* ── the House Card — a museum object label ────────────────────── */}
        <figure style={{ width: 'min(94%,540px)', margin: 'clamp(120px,22vh,280px) auto 0', textAlign: 'left', ...surface() }}>
          <div style={{ border: '1px solid rgba(40,44,70,0.28)', padding: 'clamp(38px,5vw,60px) clamp(32px,4.4vw,56px)', background: 'rgba(255,251,243,0.4)' }}>
            <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 'clamp(13px,1.5vw,16px)', letterSpacing: '0.4em', textTransform: 'uppercase', color: indigo }}>{R.fullName}</div>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.82)', marginTop: '0.5em' }}>{R.role}</div>
            <div aria-hidden="true" style={{ height: 1, background: 'rgba(40,44,70,0.2)', margin: 'clamp(26px,3.6vw,34px) 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3vw,28px)' }}>
              {HOUSE_CARD.map(([k, v]) => (
                <div key={k}>
                  <div style={{ ...label, fontSize: 8.5, letterSpacing: '0.34em', color: 'rgba(122,94,52,0.6)', marginBottom: '0.6em' }}>{k}</div>
                  <div style={{ fontFamily: serif, fontStyle: k === 'What Founders Are Carrying' ? 'italic' : 'normal', fontWeight: 400, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.32, color: indigo }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </figure>

        {/* ── the current contribution — the work of the residency ──────── */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: 'clamp(30px,5vh,56px)' }}>The current contribution</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.42, color: indigo, maxWidth: '26ch', margin: '0 auto' }}>Every resident contributes something meaningful to the House.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', color: 'rgba(122,94,52,0.82)', margin: 'clamp(18px,2.6vh,28px) auto 0' }}>For Chef MoWils, that contribution begins here.</p>

          {/* the workshop cover — the poster carries the number, title, and promise */}
          <figure style={{ width: 'min(90vw, 560px)', margin: 'clamp(64px,11vh,130px) auto 0' }}>
            <img
              src={WORKSHOP_COVER}
              alt={`${R.workshopNo} — ${R.workshopTitle}. Five AI teammates. One founder. Twenty hours returned. In residence: ${R.fullName}, ${R.role}.`}
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 'clamp(5px,0.9vw,11px)', boxShadow: '0 54px 96px -56px rgba(40,44,70,0.55)' }}
            />
          </figure>

          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', maxWidth: '34ch', margin: 'clamp(44px,7vh,84px) auto 0', ...pretty }}>The workshop begins with something real a founder is carrying. Chef MoWils works through it live with the room — not performed, but genuinely worked through together. What is learned enters the Library, so its value reaches beyond the founders who were present.</p>

          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.32, color: indigo, maxWidth: '20ch', margin: 'clamp(56px,9vh,110px) auto 0', ...balance }}>This workshop is not about AI. It is about what you would do with twenty hours.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.8)', margin: 'clamp(20px,3vh,32px) auto 0' }}>AI does the prep. You do the judgment.</p>

          {/* reserve a seat — the workshop registration (Luma) */}
          <div style={{ marginTop: 'clamp(56px,9vh,110px)' }}>
            <div style={{ ...label, fontSize: 9.5, letterSpacing: '0.42em', marginBottom: '1.5em', color: 'rgba(122,94,52,0.62)' }}>{R.month}</div>
            <El as="a" href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.36em', textTransform: 'uppercase', color: '#f3ecdc', background: indigo, border: `1px solid ${indigo}`, borderRadius: 2, padding: '15px 42px', cursor: 'pointer', textDecoration: 'none', transition: 'background 400ms ease, color 400ms ease' }}
              hover={{ background: 'transparent', color: indigo }}
            >
              Reserve your seat
            </El>
          </div>
        </div>

        {/* ── what founders leave with — transformations, not features ──── */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: 'clamp(48px,8vh,96px)' }}>What founders leave with</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(30px,5vh,58px)' }}>
            {R.leaveWith.map((t, i) => (
              <p key={i} style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.5vw,34px)', lineHeight: 1.34, color: i === R.leaveWith.length - 1 ? 'rgba(122,94,52,0.9)' : indigo, fontStyle: i === R.leaveWith.length - 1 ? 'italic' : 'normal', maxWidth: '24ch', margin: '0 auto', ...balance, ...surface('entry 0% cover 20%') }}>{t}</p>
            ))}
          </div>
        </div>

        {/* ── what Chef MoWils leaves behind — the permanent artifact, into the Library ── */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', ...surface() }}>
          <div style={{ ...label, fontSize: 11, letterSpacing: '0.46em', marginBottom: '1.6em' }}>What Chef MoWils leaves behind</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1.42, color: 'rgba(43,39,35,0.72)', maxWidth: '26ch', margin: '0 auto clamp(56px,10vh,110px)', ...balance }}>Every resident contributes one permanent artifact to the House.</p>

          <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 1.04, margin: '0 0 0.6em', color: indigo }}>{R.artifact}</h3>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.74)', maxWidth: '36ch', margin: '0 auto', ...pretty }}>A practical handbook documenting the AI employees every founder can begin building immediately.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.62)', maxWidth: '38ch', margin: 'clamp(28px,4.5vh,44px) auto 0', ...pretty }}>It becomes part of the Believe Library, so founders Chef MoWils may never meet can keep learning from her residency long after it ends.</p>

          {/* a small archival marker — added to the Library */}
          <El onClick={ctx.openLibrary} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8em', margin: 'clamp(40px,7vh,80px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', border: '1px solid rgba(122,94,52,0.32)', borderRadius: 2, padding: '10px 20px', cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease' }} hover={{ color: indigo, borderColor: indigoSoft }}>
            <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(122,94,52,0.6)' }} />
            Added to the Believe Library
          </El>
        </div>

        {/* ── the closing — a quiet reflection, then the door ───────────── */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', ...surface() }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,38px)', lineHeight: 1.36, color: indigo, maxWidth: '24ch', margin: '0 auto', ...balance }}>Every residency leaves the House a little richer.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.66)', maxWidth: '30ch', margin: 'clamp(34px,5.5vh,60px) auto 0', ...pretty }}>Every founder leaves with something they didn’t have before. Sometimes that’s clarity. Sometimes it’s confidence. Sometimes it’s simply twenty hours they never thought they’d get back.</p>

          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', color: 'rgba(122,94,52,0.8)', margin: 'clamp(48px,8vh,96px) auto 0' }}>{R.hook[0]} {R.hook[1]}</p>
          <div style={{ marginTop: 'clamp(40px,7vh,80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(22px,3.4vh,34px)' }}>
            <El as="a" href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.36em', textTransform: 'uppercase', color: '#f3ecdc', background: indigo, border: `1px solid ${indigo}`, borderRadius: 2, padding: '15px 42px', cursor: 'pointer', textDecoration: 'none', transition: 'background 400ms ease, color 400ms ease' }}
              hover={{ background: 'transparent', color: indigo }}
            >
              Reserve your seat
            </El>
            {/* a quieter path — for founders who'd rather talk before they register */}
            <El
              onClick={() => setNoteOpen(true)}
              style={{ fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.5)', borderBottom: '1px solid rgba(43,39,35,0.24)', paddingBottom: 4, cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease' }}
              hover={{ color: indigo, borderColor: indigoSoft }}
            >
              Or come in and say hello first
            </El>
          </div>
        </div>

        {/* ── while you're here — the Founder's Room, very quietly ───────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(150px,28vh,340px)', ...surface() }}>
          <div style={{ ...label, fontSize: 10, marginBottom: '1.8em' }}>While you’re here</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.62)', maxWidth: '30ch', margin: '0 auto', ...pretty }}>Founder’s Room members gather privately with each resident during their residency month.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.6, color: 'rgba(122,94,52,0.76)', margin: 'clamp(28px,4.5vh,48px) auto 0' }}>Eight founders. One hour. Off the record.</p>
        </div>

        {/* ── the residencies still to come ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(150px,28vh,340px)', ...surface() }}>
          <div style={{ ...label, fontSize: 11, letterSpacing: '0.46em', marginBottom: '1.8em' }}>Soon</div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.32, color: indigo, maxWidth: '20ch', margin: '0 auto', ...balance }}>Another resident will enter the House.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.5)', maxWidth: '24ch', margin: 'clamp(30px,5vh,56px) auto 0' }}>The Library is just beginning.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(110px,20vh,240px)' }}><BackPill onClose={ctx.closeStudio} label="← Back" /></div>
      </div>

      {noteOpen && <ConversationNote onClose={() => setNoteOpen(false)} />}
    </ChapterShell>
  )
}
