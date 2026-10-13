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
  const links: { t: string; go: () => void }[] = [
    { t: 'Why I built Believe', go: ctx.openWhyBelieve },
    { t: 'The People of Believe Studio', go: ctx.openPeople },
    { t: 'The House, what this place is', go: ctx.openHouse },
    { t: 'The Houses to Come', go: ctx.openHouses },
  ]
  return (
    <ChapterShell onClose={ctx.closeAbout} background="#efe6d3" backLabel={<>&larr;&nbsp;Back</>}>
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(100px,18vh,230px) 7vw clamp(80px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.4em' }}>About Believe</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5.2vw,70px)', lineHeight: 1.05, margin: '0 auto', maxWidth: '20ch', ...balance }}>A creative strategy studio for ambitious founders, built by a founder.</h2>

        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.15vw,27px)', lineHeight: 1.6, color: 'rgba(43,39,35,0.78)', maxWidth: '46ch', margin: 'clamp(40px,7vh,84px) auto 0', ...pretty }}>Believe was built by Beth Wilson-Parentice, who grew Sipp from her kitchen into a national brand on shelves at Target, Whole Foods, Starbucks, and thousands of retail doors, and who built the strategic partner she wished she&rsquo;d had.</p>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.84)', maxWidth: '32ch', margin: 'clamp(30px,5vh,54px) auto 0', ...balance }}>A house for founders: a place to think clearly, make better decisions, and build companies that matter.</p>

        <Divider h="clamp(44px,7vh,86px)" m="clamp(70px,12vh,150px) auto clamp(40px,7vh,70px)" />
        <div style={{ ...label, fontSize: 10, marginBottom: 'clamp(26px,4.5vh,44px)' }}>The foundation</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.6vh,22px)', alignItems: 'center' }}>
          {links.map((l) => (
            <El as="button" key={l.t} onClick={l.go}
              style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(21px,2.5vw,30px)', lineHeight: 1.2, color: '#2b2723', background: 'none', border: 'none', borderBottom: '1px solid rgba(122,94,52,0.3)', padding: '0 0 6px', cursor: 'pointer', transition: 'color 350ms ease, border-color 350ms ease' }}
              hover={{ color: 'rgba(122,94,52,0.95)', borderColor: 'rgba(122,94,52,0.7)' }}>
              {l.t}&nbsp;&rarr;
            </El>
          ))}
        </div>

        <Divider h="clamp(44px,7vh,80px)" m="clamp(80px,14vh,170px) auto clamp(36px,6vh,60px)" />
        <BackPill onClose={ctx.closeAbout} label="← Back" />
      </div>
    </ChapterShell>
  )
}
