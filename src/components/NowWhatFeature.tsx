import React from 'react'

/**
 * NOW WHAT? — the Library's conversation series, presented as an editorial film
 * archive rather than a YouTube embed. The identity leads (an oversized, typeset
 * NOW WHAT? wordmark with a brass rule), the thumbnail is compact, and each
 * episode is a 16:9 tile with its number, headline, and a discreet play icon.
 *
 * It is built to grow: with a single published episode it renders the featured
 * layout (compact thumbnail beside the headline and watch link); add a second
 * entry to EPISODES and it becomes a two-column collection, then three columns
 * on wider screens — no redesign needed. Real artwork and the verified video
 * link are preserved. Do not add an episode here until it is actually published.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const NAVY = '#1e2a44'
const GOLD = '#9c7a3f'

type Episode = { no: string; title: string; thumb: string; watchUrl: string }

const EPISODES: Episode[] = [
  { no: '01', title: 'My Competitor Raised $20 Million. Now What?', thumb: '/photos/nowwhat-ep1.webp', watchUrl: 'https://youtu.be/PFZHP0_OOF4' },
]

const epLabel: React.CSSProperties = { fontFamily: sans, fontWeight: 400, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(156,122,63,0.95)' }

function Thumb({ ep }: { ep: Episode }) {
  return (
    <div className="nowwhat-thumb">
      <img src={ep.thumb} alt={ep.title} />
      <span className="nowwhat-play" aria-hidden="true"><i /></span>
    </div>
  )
}

export function NowWhatFeature() {
  const multi = EPISODES.length > 1
  return (
    <section aria-label="NOW WHAT? conversation series" style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
      {/* the identity, given the room to lead */}
      <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD }}>The Believe Studio Conversation Series</div>
      <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(52px,8.2vw,108px)', lineHeight: 0.96, letterSpacing: '0.01em', color: NAVY, margin: 'clamp(10px,1.6vh,18px) 0 0' }}>NOW WHAT?</h3>
      <div aria-hidden="true" style={{ width: 'clamp(56px,7vw,86px)', height: 2, background: GOLD, margin: 'clamp(16px,2.4vh,26px) auto' }} />
      <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.45, color: 'rgba(43,39,35,0.78)', maxWidth: '26ch', margin: '0 auto' }}>Entrepreneurship isn&rsquo;t one great leap. It&rsquo;s a lifetime of Now What? moments.</p>

      {multi ? (
        /* two episodes → two columns, three+ → three columns (auto) */
        <div className="nowwhat-grid">
          {EPISODES.map((ep) => (
            <a key={ep.no} className="nowwhat-card" href={ep.watchUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch episode ${ep.no}: ${ep.title}`}>
              <Thumb ep={ep} />
              <div style={{ textAlign: 'left', marginTop: 14 }}>
                <div style={{ ...epLabel, fontSize: 9.5, letterSpacing: '0.4em' }}>Episode {ep.no}</div>
                <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(19px,1.9vw,23px)', lineHeight: 1.2, color: NAVY, margin: '0.5em 0 0' }}>{ep.title}</div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        /* one published episode → the featured layout */
        <a className="nowwhat-card nowwhat-featured" href={EPISODES[0].watchUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch episode ${EPISODES[0].no}: ${EPISODES[0].title}`}>
          <Thumb ep={EPISODES[0]} />
          <div className="nowwhat-meta" style={{ textAlign: 'left' }}>
            <div style={epLabel}>Episode {EPISODES[0].no} &middot; Watch now</div>
            <h4 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(24px,3vw,37px)', lineHeight: 1.14, color: NAVY, margin: '0.5em 0 0', maxWidth: '16ch' }}>{EPISODES[0].title}</h4>
            <span className="nowwhat-watch">Watch the Episode &rarr;</span>
          </div>
        </a>
      )}
    </section>
  )
}
