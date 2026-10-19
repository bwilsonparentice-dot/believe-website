import React, { CSSProperties } from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { El } from '../lib/El'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)',
}

/**
 * About Believe — the quiet front door to who founded the Studio, the
 * experience behind it, the philosophy, and the people. It consolidates the
 * Foundation (origin story, the House, the People, what's to come) so basic
 * information about the business is easy to find, without sending visitors
 * through hidden architectural experiences. It reuses existing, verified
 * content and links onward; it invents nothing. (ctx.openAbout.)
 */
export function AboutChapter({ ctx }: { ctx: Ctx }) {
  const links: { n: string; t: string; go: () => void }[] = [
    { n: '01', t: 'Why I Built Believe', go: ctx.openWhyBelieve },
    { n: '02', t: 'The People of Believe Studio', go: ctx.openPeople },
    { n: '03', t: 'The Houses to Come', go: ctx.openHouses },
  ]
  return (
    <ChapterShell onClose={ctx.closeAbout} background="#efe6d3" backLabel={<>&larr;&nbsp;Back</>}>
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(100px,18vh,230px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.4em' }}>About Believe</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5.2vw,70px)', lineHeight: 1.05, margin: '0 auto', maxWidth: '20ch', ...balance }}>A creative strategy studio for ambitious founders, built by a founder.</h2>

        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.15vw,27px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', maxWidth: '46ch', margin: 'clamp(40px,7vh,84px) auto 0', ...pretty }}>Believe Studio was founded by Beth Wilson-Parentice, who grew Sipp from her kitchen into a nationally distributed beverage brand, reaching shelves at Target, Whole Foods, Starbucks, and thousands of retail doors.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.15vw,27px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', maxWidth: '46ch', margin: 'clamp(20px,3.4vh,30px) auto 0', ...pretty }}>She knows what it means to build something from nothing, make the hard calls, and recognize the opportunities others miss.</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.15vw,27px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', maxWidth: '40ch', margin: 'clamp(24px,4vh,36px) auto 0', ...balance }}>Sometimes all it takes is someone who sees what you can&rsquo;t see yet.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.84)', maxWidth: '34ch', margin: 'clamp(30px,5vh,54px) auto 0', ...balance }}>A house for founders. A place to think differently, make better decisions, and build companies that matter.</p>

        <Divider h="clamp(44px,7vh,86px)" m="clamp(70px,12vh,150px) auto clamp(40px,7vh,70px)" />
        <div style={{ ...label, fontSize: 10, marginBottom: 'clamp(26px,4.5vh,44px)' }}>The foundation</div>
        <div style={{ maxWidth: 430, margin: '0 auto', textAlign: 'left' }}>
          {links.map((l, i) => (
            <El as="button" key={l.t} onClick={l.go}
              style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 clamp(18px,3vw,30px)', alignItems: 'baseline', width: '100%', textAlign: 'left', padding: 'clamp(16px,2.6vh,22px) 2px', background: 'none', borderTop: '1px solid rgba(122,94,52,0.26)', borderBottom: i === links.length - 1 ? '1px solid rgba(122,94,52,0.26)' : 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', transition: 'background 350ms ease' }}
              hover={{ background: 'rgba(122,94,52,0.055)' }}>
              <span style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.24em', color: 'rgba(122,94,52,0.78)', transform: 'translateY(-0.15em)' }}>{l.n}</span>
              <span style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.5vw,30px)', lineHeight: 1.12, color: '#2b2723' }}>{l.t}</span>
            </El>
          ))}
        </div>

        <Divider h="clamp(44px,7vh,80px)" m="clamp(80px,14vh,170px) auto clamp(36px,6vh,60px)" />
        <BackPill onClose={ctx.closeAbout} label="← Back" />
      </div>
    </ChapterShell>
  )
}
