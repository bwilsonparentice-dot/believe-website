import React from 'react'
import { El, stop } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'

/**
 * The House Index — the interactive bronze plaque that replaces the old
 * photographic DirectoryPlaque. Four primary rooms, each a real link; the
 * lettering is live HTML (selectable, translatable, accessible, editable), the
 * bronze/travertine/archway are CSS + texture layers. Styles live in index.css
 * under the `.hi-*` classes (approved Concept C).
 *
 * variant 'overlay' — the immersive scene (travertine + archway + plate), used
 *   inside the Directory overlay and the mobile Menu.
 * variant 'footer' — the plate alone, centered on the footer's own dark ground.
 */
const ROOMS: { name: string; desc: string; open: (c: Ctx) => Handler }[] = [
  { name: 'The Studio', desc: 'Creative strategy & brand worlds.', open: (c) => c.openStudioPage },
  { name: 'The Library', desc: 'Founder stories, insights & NOW WHAT?', open: (c) => c.openLibrary },
  { name: 'The Drawing Room', desc: 'Founder conversations and advisory.', open: (c) => c.openAdvisory },
  { name: 'The Observatory', desc: 'Believe Radar and retail intelligence.', open: (c) => c.openObservatory },
]

// Two distinct experiences beyond the core engagements: a founder community and
// a brand experience. Their descriptions keep them from reading as the same thing.
const BEYOND: { name: string; desc: string; open: (c: Ctx) => Handler }[] = [
  { name: 'The Founder’s Room', desc: 'A monthly founder community.', open: (c) => c.openFounderRoom },
  { name: 'The Table', desc: 'Where brands meet culture.', open: (c) => c.openTable },
]

function Plate({ ctx, onNavigate, showFoot, showBeyond = showFoot }: { ctx: Ctx; onNavigate?: () => void; showFoot: boolean; showBeyond?: boolean }) {
  const go = (open: (c: Ctx) => Handler): Handler => (e) => { open(ctx)(e); onNavigate?.() }
  return (
    <nav className="hi-plate" aria-label="The House" onClick={stop}>
      <div className="hi-head">
        <svg className="hi-arch" width="42" height="36" viewBox="0 0 60 50" fill="none" aria-hidden="true">
          <path d="M12 49 L12 22 A18 18 0 0 1 48 22 L48 49" stroke="#d6b478" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="hi-wordmark">Believe Studio</div>
      </div>
      <div className="hi-rule" />
      {ROOMS.map((r, i) => (
        <React.Fragment key={r.name}>
          <El as="button" className="hi-room" onClick={go(r.open)} aria-label={`${r.name}, ${r.desc.replace(/[.?]$/, '')}`}>
            <span className="hi-room-top"><span className="hi-name">{r.name}</span><span className="hi-arrow" aria-hidden="true">&rarr;</span></span>
            <span className="hi-desc">{r.desc}</span>
          </El>
          {(showBeyond || i < ROOMS.length - 1) && <div className="hi-rule" />}
        </React.Fragment>
      ))}
      {showBeyond && (
        <div style={{ marginBottom: 'clamp(2px,0.4vw,6px)' }}>
          <span className="hi-more-label" style={{ marginBottom: 'clamp(16px,1.5vw,24px)' }}>Beyond the Studio</span>
          {BEYOND.map((r, i) => (
            <React.Fragment key={r.name}>
              <El as="button" className="hi-room" onClick={go(r.open)} aria-label={`${r.name}, ${r.desc.replace(/[.?]$/, '')}`}>
                <span className="hi-room-top"><span className="hi-name">{r.name}</span><span className="hi-arrow" aria-hidden="true">&rarr;</span></span>
                <span className="hi-desc">{r.desc}</span>
              </El>
              {i < BEYOND.length - 1 && <div className="hi-rule" />}
            </React.Fragment>
          ))}
          {showFoot && <div className="hi-rule" />}
        </div>
      )}
      {showFoot && (
        <div className="hi-more">
          <span className="hi-more-label">Also inside the House</span>
          <div className="hi-more-links">
            <El as="button" onClick={go((c) => c.openPeople)}>The People</El>
            <El as="button" onClick={go((c) => c.openStories)}>Stories</El>
            <El as="button" onClick={go((c) => c.openFieldNotes)}>Field Notes</El>
            <El as="button" onClick={go((c) => c.openStudio)}>In Residence</El>
            <El as="button" onClick={go((c) => c.openDoorway('visionary-collective'))}>The Collective</El>
          </div>
          <div className="hi-rule" style={{ marginTop: 'clamp(18px,1.6vw,24px)' }} />
        </div>
      )}
      {showFoot && (
        <div className="hi-foot">
          <div className="hi-foot-mark" />
          <div className="hi-foot-line">The house is<br />always open.</div>
        </div>
      )}
    </nav>
  )
}

export function HouseIndex({ ctx, onNavigate, variant = 'overlay' }: { ctx: Ctx; onNavigate?: () => void; variant?: 'overlay' | 'footer' }) {
  if (variant === 'footer') {
    return (
      <div className="hi-footer">
        <Plate ctx={ctx} onNavigate={onNavigate} showFoot={false} showBeyond />
      </div>
    )
  }
  return (
    <div className="hi-scene">
      <div className="hi-archway" aria-hidden="true" />
      <Plate ctx={ctx} onNavigate={onNavigate} showFoot />
      <div className="hi-ways">
        <El as="button" onClick={() => { ctx.openWork(); onNavigate?.() }}>Ways to Work</El>
        <span className="dot" aria-hidden="true">&middot;</span>
        <El as="button" onClick={() => { ctx.openAbout(); onNavigate?.() }}>About Believe</El>
        <span className="dot" aria-hidden="true">&middot;</span>
        <El as="button" onClick={() => { ctx.openConversation(); onNavigate?.() }}>Start a Conversation</El>
      </div>
    </div>
  )
}
