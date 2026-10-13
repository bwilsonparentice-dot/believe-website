import React from 'react'
import { El } from '../lib/El'

/**
 * NOW WHAT? — the Library's film series, presented as a curated editorial film
 * feature (not a YouTube embed). The panel background is set to the logo's own
 * navy (#0D2B46) so the real logo blends seamlessly, with its proportions
 * preserved and nothing recreated. One published episode is featured; the
 * thumbnail and the Watch Episode button both open the verified video in a new
 * tab. Kept compact so it is engaging without reintroducing a long scroll.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"

const NAVY = '#0D2B46' // the NOW WHAT? logo's own navy — panel matches it to blend

const EPISODE = {
  title: 'My Competitor Raised $20 Million. Now What?',
  thumb: '/photos/nowwhat-ep1.webp',
  watchUrl: 'https://youtu.be/PFZHP0_OOF4',
}

export function NowWhatFeature() {
  return (
    <section
      aria-label="NOW WHAT? film series"
      style={{
        position: 'relative', maxWidth: 720, margin: '0 auto', textAlign: 'center',
        background: NAVY,
        borderRadius: 'clamp(10px,1.4vw,18px)',
        padding: 'clamp(38px,5vw,60px) clamp(24px,5vw,64px)',
        boxShadow: '0 40px 80px -54px rgba(13,43,70,0.72)',
        color: '#faf4ea',
      }}
    >
      {/* series mark — the real NOW WHAT? logo, used as-is and blended into the navy */}
      <img
        src="/photos/nowwhat-logo.webp"
        alt="NOW WHAT? The Believe Studio film series"
        style={{ display: 'block', width: 'clamp(116px,15vw,150px)', height: 'auto', margin: '0 auto' }}
      />

      <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.5, color: 'rgba(246,239,228,0.82)', maxWidth: '30ch', margin: 'clamp(18px,3vh,28px) auto 0' }}>
        Short conversations on the questions founders actually face.
      </p>

      {/* the featured episode — an editorial film card linking to the video */}
      <div style={{ marginTop: 'clamp(28px,4.4vh,44px)' }}>
        <El
          as="a" href={EPISODE.watchUrl} target="_blank" rel="noopener noreferrer"
          aria-label={`Watch: ${EPISODE.title}`}
          style={{ display: 'block', position: 'relative', width: '100%', maxWidth: 560, margin: '0 auto', borderRadius: 'clamp(8px,1.1vw,14px)', overflow: 'hidden', boxShadow: '0 28px 56px -38px rgba(0,0,0,0.6)', cursor: 'pointer' }}
          hover={{ boxShadow: '0 32px 64px -34px rgba(0,0,0,0.7)' }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#16203a' }}>
            <img src={EPISODE.thumb} alt={EPISODE.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(52px,6.5vw,68px)', height: 'clamp(52px,6.5vw,68px)', borderRadius: '50%', background: 'rgba(13,43,70,0.46)', border: '1.5px solid rgba(246,239,228,0.92)', WebkitBackdropFilter: 'blur(2px)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '15px solid #faf4ea', marginLeft: 4 }} />
            </div>
          </div>
        </El>

        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,164,76,0.92)', margin: 'clamp(22px,3.4vh,32px) 0 0.8em' }}>Featured episode</div>
        <h4 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3.2vw,38px)', lineHeight: 1.12, color: '#faf4ea', maxWidth: '18ch', margin: '0 auto' }}>{EPISODE.title}</h4>

        <El
          as="a" href={EPISODE.watchUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: 'clamp(24px,3.8vh,36px)', fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#0D2B46', background: '#c9a44c', border: '1px solid #c9a44c', borderRadius: 2, padding: '15px 34px', cursor: 'pointer', textDecoration: 'none' }}
          hover={{ background: '#d8b461', borderColor: '#d8b461' }}
        >
          Watch Episode &rarr;
        </El>
      </div>
    </section>
  )
}
