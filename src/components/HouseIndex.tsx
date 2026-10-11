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

function Plate({ ctx, onNavigate, showFoot }: { ctx: Ctx; onNavigate?: () => void; showFoot: boolean }) {
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
          <El as="button" className="hi-room" onClick={go(r.open)} aria-label={`${r.name} — ${r.desc.replace(/[.?]$/, '')}`}>
            <span className="hi-room-top"><span className="hi-name">{r.name}</span><span className="hi-arrow" aria-hidden="true">&rarr;</span></span>
            <span className="hi-desc">{r.desc}</span>
          </El>
          {(showFoot || i < ROOMS.length - 1) && <div className="hi-rule" />}
        </React.Fragment>
      ))}
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
        <Plate ctx={ctx} onNavigate={onNavigate} showFoot={false} />
      </div>
    )
  }
  return (
    <div className="hi-scene">
      <div className="hi-archway" aria-hidden="true" />
      <Plate ctx={ctx} onNavigate={onNavigate} showFoot />
      <div className="hi-ways">
        <El as="button" onClick={() => { ctx.openWork(); onNavigate?.() }}>Ways to Work with Believe</El>
        <span className="dot" aria-hidden="true">&middot;</span>
        <El as="button" onClick={() => { ctx.openConversation(); onNavigate?.() }}>Start a Conversation</El>
      </div>
    </div>
  )
}
