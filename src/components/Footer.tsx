import React from 'react'
import { El } from '../lib/El'
import type { Ctx, Handler } from '../lib/ctx'

/**
 * The brass directory — a brushed-brass plaque laid on the black footer.
 * The prototype leaned on an AI-garbled engraved image; per the handoff we
 * overlay real, crisp, engraved text instead. Three columns, the philosophy
 * breath above, the engraved values, and the way back to the door.
 */
export function Footer({ ctx, principles }: { ctx: Ctx; principles: string[] }) {
  const rooms: { label: string; go: Handler }[] = [
    { label: 'The Founder’s Room', go: ctx.openFounderRoom },
    { label: 'The Believe Blueprint', go: ctx.openBlueprint },
    { label: 'The Table', go: ctx.openTable },
    { label: 'The Library', go: ctx.openLibrary },
    { label: 'The Studio', go: ctx.openStudio },
    { label: 'The Garden', go: ctx.gotoRoom('garden') },
    { label: 'The Stage', go: ctx.openStage },
    { label: 'The People', go: ctx.openPeople },
  ]
  const begin: { label: string; go: Handler }[] = [
    { label: 'Believe Blueprint', go: ctx.openBlueprint },
    { label: 'Apply to the Founder’s Room', go: ctx.openFounderRoom },
    { label: 'Private Advisory', go: ctx.openAdvisory },
    { label: 'Work With Believe Studio', go: ctx.openWork },
  ]
  const journal: { label: string; go: Handler }[] = [
    { label: 'The Stories', go: ctx.openStories },
    { label: 'Field Notes', go: ctx.openFieldNotes },
    { label: 'Resident Experts', go: ctx.openStudio },
    { label: 'The House', go: ctx.openHouse },
    { label: 'The Houses to Come', go: ctx.openHouses },
  ]

  return (
    <footer style={{ position: 'relative', zIndex: 2, background: '#161613', color: 'rgba(246,239,228,0.9)', padding: 'clamp(60px,12vh,150px) clamp(30px,8vw,120px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto 3.4em', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.34, color: 'rgba(246,239,228,0.9)', margin: '0 auto 1.5em', maxWidth: '26ch' }}>No founder walks the same path &mdash; yet every room leads toward greater clarity.</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(13px,1.5vw,20px)', lineHeight: 1.7, color: 'rgba(246,239,228,0.62)', margin: '0 auto 2.6em' }}>Come in. We&rsquo;ve been expecting you. The door has never been locked.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em 2.6em', alignItems: 'baseline', justifyContent: 'center' }}>
          {principles.map((pr) => (
            <span key={pr} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(236,209,147,0.6)' }}>{pr}</span>
          ))}
        </div>
      </div>

      {/* the brass plaque */}
      <div style={{ position: 'relative', left: '50%', width: '100vw', marginLeft: '-50vw', marginRight: '-50vw', padding: 'clamp(20px,4vh,60px) 6vw' }}>
        <div
          style={{
            maxWidth: 1120, margin: '0 auto', position: 'relative', padding: 'clamp(38px,6vw,84px) clamp(30px,5vw,80px)',
            borderRadius: 6,
            background: 'linear-gradient(150deg, #9c7a3f 0%, #cbA24e 8%, #b78f45 22%, #e6c986 40%, #9c7a3f 58%, #c8a24e 74%, #8a6a34 100%)',
            boxShadow: 'inset 0 2px 6px rgba(255,240,200,0.5), inset 0 -3px 10px rgba(58,42,16,0.6), 0 40px 80px -50px rgba(0,0,0,0.9)',
            backgroundBlendMode: 'overlay',
          }}
        >
          {/* brushed-brass grain */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 6, pointerEvents: 'none', opacity: 0.35, mixBlendMode: 'overlay', background: 'repeating-linear-gradient(90deg, rgba(255,246,214,0.16) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(58,42,16,0.14) 0 1px, transparent 1px 5px)' }} />
          {/* engraved title */}
          <div style={{ position: 'relative', textAlign: 'center', marginBottom: 'clamp(28px,4vw,52px)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, fontSize: 'clamp(20px,2.4vw,30px)', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(58,42,16,0.85)', textShadow: '0 1px 0 rgba(255,244,206,0.5)', paddingLeft: '0.42em' }}>Directory</div>
          </div>

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(30px,4vw,64px)' }}>
            <PlaqueColumn title="Rooms" items={rooms} />
            <PlaqueColumn title="Begin Here" items={begin} />
            <PlaqueColumn title="The Journal" items={journal} />
          </div>

          <div style={{ position: 'relative', textAlign: 'center', marginTop: 'clamp(34px,5vw,64px)' }}>
            <El
              onClick={ctx.replay}
              style={{ display: 'inline-block', fontFamily: "'Jost',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(43,30,10,0.7)', border: '1px solid rgba(43,30,10,0.32)', borderRadius: 2, padding: '12px 30px', cursor: 'pointer', transition: 'color 400ms ease, border-color 400ms ease' }}
              hover={{ color: 'rgba(30,20,6,0.95)', borderColor: 'rgba(30,20,6,0.7)' }}
            >
              Return to the door
            </El>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'clamp(34px,6vh,66px)' }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(246,239,228,0.38)', margin: '0 auto' }}>The house is always open.</p>
      </div>
    </footer>
  )
}

function PlaqueColumn({ title, items }: { title: string; items: { label: string; go: Handler }[] }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(58,42,16,0.9)', textShadow: '0 1px 0 rgba(255,244,206,0.45)', marginBottom: '1.3em', borderBottom: '1px solid rgba(58,42,16,0.25)', paddingBottom: '0.7em' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85em' }}>
        {items.map((it) => (
          <El
            key={it.label}
            onClick={it.go}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(16px,1.6vw,20px)', color: 'rgba(46,32,12,0.82)', cursor: 'pointer', textShadow: '0 1px 0 rgba(255,244,206,0.4)', transition: 'color 350ms ease, transform 350ms ease', width: 'fit-content' }}
            hover={{ color: 'rgba(24,16,4,1)', transform: 'translateX(3px)' }}
          >
            {it.label}
          </El>
        ))}
      </div>
    </div>
  )
}
