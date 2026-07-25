import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = 'pretty' as React.CSSProperties['textWrap']
const balance = 'balance' as React.CSSProperties['textWrap']

const MANIFESTO = [
  'Founders deserve someone who understands what it feels like to carry the weight.',
  'No founder should build alone.',
  'Businesses don’t grow until founders grow.',
  'Wisdom compounds when it is shared.',
  'The greatest gift one founder can give another is experience honestly shared.',
  'Every founder eventually becomes someone’s guide.',
]

const ROOMS: { name: string; because: string }[] = [
  { name: 'The Founder’s Table', because: 'Because founders gather there.' },
  { name: 'The Library', because: 'Because wisdom lives there.' },
  { name: 'The Founder’s Room', because: 'Because transformation begins there.' },
  { name: 'The Blueprint', because: 'Because every meaningful company deserves thoughtful architecture.' },
  { name: 'The Studio', because: 'Because ideas become reality there.' },
]

const TRIAD: { q: string; a: string; note: string }[] = [
  { q: 'What is Believe?', a: 'A House for Founders.', note: 'A place founders come to think more clearly, make better decisions, and build more meaningful companies.' },
  { q: 'Why does Believe exist?', a: 'To transform founders.', note: 'So they build stronger companies — and eventually strengthen other founders.' },
  { q: 'What does Believe do?', a: 'We are a catalyst.', note: 'A catalyst for founders building brands that matter.' },
]

/** The House — the answer to "What is this place?" */
export function HouseChapter({ ctx }: { ctx: Ctx }) {
  const label = { fontFamily: sans, fontWeight: 400 as const, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: 'rgba(122,94,52,0.7)' }
  return (
    <ChapterShell onClose={ctx.closeHouse} background="#f4ede0">
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(90px,17vh,200px) 7vw clamp(80px,15vh,180px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        <ArchMark margin="0 auto 1.6em" />
        <div style={{ ...label, marginBottom: '1.4em' }}>The House</div>
        <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(40px,7vw,104px)', lineHeight: 1, margin: '0 0 0.4em' }}>What is<br />this place?</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,28px)', lineHeight: 1.5, color: 'rgba(122,94,52,0.82)', maxWidth: '28ch', margin: '0 auto' }}>You have walked the rooms. Here is the answer they were quietly leading to.</p>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* Why Believe exists — emotion, then conviction, then (quietly) definition */}
        <div style={{ ...label, marginBottom: '1.6em' }}>Why Believe exists</div>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4.2vw,58px)', lineHeight: 1.1, color: '#2b2723', maxWidth: '17ch', margin: '0 auto', textWrap: balance }}>Founders change the world <span style={{ fontStyle: 'italic' }}>when someone believes in them first.</span></p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.8)', maxWidth: '46ch', margin: 'clamp(36px,6vh,64px) auto 0', textWrap: pretty }}>Believe was built on that conviction. When founders become stronger, they build stronger companies — and when they share what they’ve learned, they change the path for the founder coming next.</p>

        <div style={{ width: 1, height: 'clamp(40px,7vh,80px)', margin: 'clamp(46px,8vh,92px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(22px,2.7vw,36px)', lineHeight: 1.42, color: 'rgba(122,94,52,0.9)', maxWidth: '26ch', margin: '0 auto', textWrap: balance }}>We don’t simply help founders build businesses. We help founders become the leaders their businesses need them to become.</p>

        <div style={{ width: 1, height: 'clamp(40px,7vh,80px)', margin: 'clamp(46px,8vh,92px) auto', background: 'linear-gradient(180deg, rgba(122,94,52,0.4), transparent)' }} />

        {/* the definition — arriving last, as explanation, not introduction */}
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.56)', maxWidth: '34ch', margin: '0 auto', textWrap: pretty }}>In the language of business, Believe is a founder transformation ecosystem. In the language of founders, it is simply the place where someone believes in you first.</p>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* Transactional vs transformational */}
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,5vw,64px)', lineHeight: 1.06, margin: '0 0 0.7em', textWrap: balance }}>We are not transactional.<br /><span style={{ fontStyle: 'italic' }}>We are transformational.</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(28px,5vw,72px)', maxWidth: 680, margin: 'clamp(36px,6vh,64px) auto 0', textAlign: 'left' }}>
          <div>
            <div style={{ ...label, fontSize: 10, marginBottom: '0.9em' }}>Traditional consulting</div>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.66)', margin: 0 }}>Delivers recommendations.</p>
          </div>
          <div>
            <div style={{ ...label, fontSize: 10, marginBottom: '0.9em' }}>Believe</div>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.55, color: '#2b2723', margin: 0 }}>Transforms decision-makers.</p>
          </div>
        </div>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.7, color: 'rgba(43,39,35,0.72)', maxWidth: '48ch', margin: 'clamp(40px,7vh,80px) auto 0', textWrap: pretty }}>Because every meaningful company is ultimately built by a founder making thousands of decisions. We believe better founders build better companies.</p>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* The manifesto */}
        <div style={{ ...label, marginBottom: 'clamp(36px,6vh,64px)' }}>What we believe</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4.5vh,48px)', maxWidth: 640, margin: '0 auto' }}>
          {MANIFESTO.map((line, i) => (
            <div key={i}>
              <div style={{ fontFamily: sans, fontWeight: 300, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.5)', marginBottom: '0.7em' }}>We believe</div>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.7vw,34px)', lineHeight: 1.38, color: '#2b2723', margin: 0, textWrap: balance }}>{line}</p>
            </div>
          ))}
        </div>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* Founders Leading Founders */}
        <div style={{ ...label, marginBottom: '1.4em' }}>The philosophy of the house</div>
        <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,6vw,84px)', lineHeight: 1.02, margin: '0 0 0.1em' }}>Founders Leading Founders</h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.9vw,23px)', color: 'rgba(122,94,52,0.7)', margin: '0.6em 0 0' }}>Not a program. A philosophy.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9em', maxWidth: '30ch', margin: 'clamp(40px,7vh,80px) auto 0' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.4, color: '#2b2723', margin: 0 }}>Every founder arrives carrying questions.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.3vw,29px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.78)', margin: 0 }}>Some leave carrying answers.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.4, color: 'rgba(122,94,52,0.9)', margin: 0 }}>The greatest among them return carrying wisdom.</p>
        </div>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.66, color: 'rgba(43,39,35,0.72)', maxWidth: '42ch', margin: 'clamp(40px,7vh,80px) auto 0', textWrap: pretty }}>Founders Leading Founders isn’t something Believe offers. It is what Believe becomes.</p>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* The rooms, given purpose */}
        <div style={{ ...label, marginBottom: '0.9em' }}>And now the house makes sense</div>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', color: 'rgba(122,94,52,0.75)', margin: '0 auto clamp(40px,7vh,64px)', maxWidth: '32ch' }}>Every room suddenly has a reason.</p>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'left' }}>
          {ROOMS.map((r, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(122,94,52,0.24)', padding: 'clamp(20px,3.2vw,32px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, ...(i === ROOMS.length - 1 ? { borderBottom: '1px solid rgba(122,94,52,0.24)' } : {}) }}>
              <span style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(20px,2.4vw,29px)' }}>{r.name}</span>
              <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px,1.6vw,20px)', color: 'rgba(122,94,52,0.75)', textAlign: 'right', maxWidth: '22ch' }}>{r.because}</span>
            </div>
          ))}
        </div>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* The triad — What / Why / What-do */}
        <div style={{ ...label, marginBottom: 'clamp(36px,6vh,64px)' }}>Three questions, three answers</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px,7vh,80px)', maxWidth: 640, margin: '0 auto' }}>
          {TRIAD.map((t, i) => (
            <div key={i}>
              <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(17px,1.9vw,23px)', color: 'rgba(122,94,52,0.72)', marginBottom: '0.4em' }}>{t.q}</div>
              <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.6vw,46px)', lineHeight: 1.08, marginBottom: '0.4em' }}>{t.a}</div>
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(16px,1.8vw,22px)', lineHeight: 1.55, color: 'rgba(43,39,35,0.66)', margin: 0, maxWidth: '44ch', marginInline: 'auto', textWrap: pretty }}>{t.note}</p>
            </div>
          ))}
        </div>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* The reframe */}
        <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.6)', marginBottom: '1.2em' }}>For a while we said</p>
        <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.2, color: 'rgba(43,39,35,0.5)', margin: '0 0 0.7em' }}>A House for Founders.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,5.2vw,68px)', lineHeight: 1.05, color: '#2b2723', margin: 0, textWrap: balance }}>A House Where Founders<br /><span style={{ fontStyle: 'italic' }}>Become Guides.</span></p>

        <Divider h="clamp(56px,10vh,120px)" m="clamp(64px,11vh,130px) auto" />

        {/* Legacy close */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6em', maxWidth: '28ch', margin: '0 auto' }}>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.34, color: 'rgba(43,39,35,0.78)', margin: 0 }}>Every founder changes a company.</p>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.34, color: 'rgba(43,39,35,0.88)', margin: 0 }}>Some founders change an industry.</p>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(22px,2.7vw,34px)', lineHeight: 1.34, color: 'rgba(122,94,52,0.92)', margin: 0 }}>The greatest founders change other founders.</p>
        </div>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.5, color: '#2b2723', margin: 'clamp(28px,5vh,48px) auto 0', maxWidth: '30ch' }}>Believe exists to help them do both.</p>

        {/* the institution has a founder, and the founder has a reason */}
        <El onClick={ctx.openWhyBelieve} style={{ display: 'inline-block', margin: 'clamp(48px,8vh,90px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)', borderBottom: '1px solid rgba(122,94,52,0.35)', paddingBottom: 5, cursor: 'pointer', transition: 'color 400ms ease' }} hover={{ color: '#2b2723' }}>Why I built Believe →</El>

        <Divider h="clamp(48px,8vh,88px)" m="clamp(56px,9vh,100px) auto" />

        {/* the standard, kept quietly — the last thing the house says */}
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.7)', margin: '0 auto clamp(6px,1.5vh,14px)', maxWidth: '26ch', textWrap: balance }}>You may forget the door, the light, the small map that brought you here.</p>
        <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(23px,3vw,40px)', lineHeight: 1.28, color: '#2b2723', margin: '0 auto', maxWidth: '26ch', textWrap: balance }}>We hope you remember how it felt to be understood — and that, one day, you become the one who understands.</p>

        <Divider h="clamp(48px,8vh,88px)" m="clamp(56px,9vh,100px) auto clamp(40px,6vh,70px)" />
        <BackPill onClose={ctx.closeHouse} label="← Back into the house" />
      </div>
    </ChapterShell>
  )
}
