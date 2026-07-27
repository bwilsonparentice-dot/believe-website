import { CSSProperties, ReactNode } from 'react'
import { El } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'
import { ImageSlot } from './ImageSlot'

/**
 * The Living House — the chapter after the Founding Wall. Once a visitor has
 * walked the primary rooms and met the House's foundation, this is the evidence
 * that the House is alive: a current resident, stories founders carried out,
 * notes gathered along the way, and a way to stay close. It is deliberately more
 * editorial and less cinematic than the primary rooms — a change in rhythm, not
 * four more identical image blocks.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const hand = "'Caveat',cursive"
const ink = '#2b2723'
const brass = 'rgba(122,94,52,0.9)'
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.66)',
}

// a gentle scroll-linked reveal, matching the rest of the House
const reveal = (range = 'entry 2% cover 24%'): CSSProperties => ({
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: range as unknown as string,
})

/** the House's quiet enter-label — dark on the warm archival ground */
function Enter({ onClick, children }: { onClick: Handler; children: ReactNode }) {
  return (
    <El
      as="button"
      onClick={onClick}
      style={{ display: 'inline-block', marginTop: 'clamp(24px,3.4vh,40px)', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: brass, background: 'transparent', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.4)', padding: '0 0 5px', cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease' }}
      hover={{ color: ink, borderColor: ink }}
    >
      {children}
    </El>
  )
}

export function LivingHouse({ ctx }: { ctx: Ctx }) {
  return (
    <section aria-label="The Living House" style={{ position: 'relative', background: '#e7ddc7', padding: 'clamp(120px,22vh,300px) clamp(24px,7vw,120px)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>

        {/* ── the chapter opens ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', ...reveal() }}>
          <div style={{ ...label, marginBottom: '1.7em' }}>The House Is Alive</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(23px,3.2vw,44px)', lineHeight: 1.26, color: ink, maxWidth: '18ch', margin: '0 auto', ...balance }}>New voices enter. New wisdom is gathered. New stories become part of the House.</p>
        </div>

        {/* ── In Residence — the featured, current moment ───────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(32px,5vw,76px)', marginTop: 'clamp(96px,17vh,220px)', ...reveal() }}>
          <div style={{ flex: '1 1 320px', minWidth: 280 }}>
            <div style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 'clamp(6px,1vw,12px)', overflow: 'hidden', boxShadow: '0 54px 96px -58px rgba(40,44,70,0.55)' }}>
              <ImageSlot src="/photos/workshop-buyback20.webp" fit="cover" alt="Founder Workshop No. 001 — Buy Back 20 Hours, the current residency of Chef MoWils, Resident AI Strategist" placeholder="the current residency — Founder Workshop No. 001, Buy Back 20 Hours" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 360px', minWidth: 300 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7em', marginBottom: '1.6em' }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: brass }} />
              <span style={{ ...label, fontSize: 10 }}>In Residence &middot; Current</span>
            </div>
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,4.8vw,64px)', lineHeight: 1.0, margin: '0 0 0.3em', color: ink }}>Chef MoWils</h3>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,26px)', color: brass, margin: '0 0 1.3em' }}>Resident AI Strategist</p>
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.34, color: ink, margin: '0 0 0.5em', ...balance }}>Founder Workshop No. 001 &mdash; Buy Back 20 Hours</p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.68)', maxWidth: '28ch', ...pretty }}>Five AI teammates. One founder. Twenty hours returned.</p>
            <Enter onClick={ctx.openStudio}>Meet the Current Resident</Enter>
          </div>
        </div>

        {/* ── Stories & Field Notes — the ongoing archives, side by side ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(44px,6vw,96px)', marginTop: 'clamp(112px,20vh,260px)' }}>

          {/* a story from the House */}
          <div style={{ flex: '1 1 320px', minWidth: 280, ...reveal() }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 'clamp(6px,1vw,12px)', overflow: 'hidden', marginBottom: 'clamp(28px,4vh,50px)', boxShadow: '0 46px 84px -58px rgba(40,28,10,0.5)' }}>
              <ImageSlot src="/photos/portrait-snehee.webp" fit="cover" alt="Snehee, founder of Gallivant — a story from the House" placeholder="an editorial founder portrait — a story from the House" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
            <div style={{ ...label, fontSize: 10, marginBottom: '1.1em' }}>A Story From the House</div>
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.4vw,46px)', lineHeight: 1.04, margin: '0 0 0.5em', color: ink }}>Gallivant</h3>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.56, color: 'rgba(43,39,35,0.74)', maxWidth: '34ch', ...pretty }}>What happened when a founder finally found the words for her brand &mdash; and walked into rooms she once believed were out of reach.</p>
            <Enter onClick={ctx.openStories}>Read the Stories</Enter>
          </div>

          {/* a page from the archive */}
          <div style={{ flex: '1 1 320px', minWidth: 280, ...reveal() }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', marginBottom: 'clamp(28px,4vh,50px)', background: 'linear-gradient(158deg,#f7f1e2,#efe6d2)', borderRadius: '5px 8px 6px 7px', boxShadow: '0 1px 2px rgba(60,44,20,0.08), 0 30px 62px -44px rgba(60,44,20,0.42)', transform: 'rotate(-0.7deg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px,5vw,64px)' }}>
              <div style={{ ...label, fontSize: 9, letterSpacing: '0.42em', color: 'rgba(122,94,52,0.55)', marginBottom: '1.5em' }}>Field Note No. 027</div>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(21px,2.7vw,34px)', lineHeight: 1.28, color: ink, margin: 0 }}>The founder wasn&rsquo;t asking about packaging.</p>
              <p style={{ fontFamily: hand, fontWeight: 500, fontSize: 'clamp(23px,3vw,38px)', lineHeight: 1.16, color: brass, margin: '0.8em 0 0' }}>She was asking for permission.</p>
            </div>
            <div style={{ ...label, fontSize: 10, marginBottom: '1.1em' }}>From the Archive</div>
            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,3.4vw,46px)', lineHeight: 1.04, margin: '0 0 0.5em', color: ink }}>Field Notes</h3>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.56, color: 'rgba(43,39,35,0.74)', maxWidth: '34ch', ...pretty }}>Wisdom noticed before it becomes a framework &mdash; caught, gently, in passing.</p>
            <Enter onClick={ctx.openFieldNotes}>Open the Notebook</Enter>
          </div>
        </div>

        {/* ── the Visionary Collective — a quiet invitation to stay close ─ */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(120px,22vh,300px)', ...reveal() }}>
          <div style={{ ...label, marginBottom: '1.9em' }}>The Visionary Collective</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.9vw,38px)', lineHeight: 1.36, color: ink, maxWidth: '24ch', margin: '0 auto', ...balance }}>Some founders enter through a workshop. Some through a conversation. Some simply want to stay close to what the House is learning.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.64)', maxWidth: '34ch', margin: 'clamp(26px,4vh,44px) auto 0', ...pretty }}>A way to remain close to the ideas, people, and work unfolding inside Believe Studio.</p>
          <Enter onClick={ctx.openDoorway('visionary-collective')}>Stay Close to the House</Enter>
        </div>

      </div>
    </section>
  )
}
