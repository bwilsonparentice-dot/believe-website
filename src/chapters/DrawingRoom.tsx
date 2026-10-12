import React, { CSSProperties } from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, ArchMark, Divider } from '../components/ChapterShell'
import { RoomNav } from '../components/RoomNav'
import { ImageSlot } from '../components/ImageSlot'
import { openBooking } from '../lib/booking'
import { PHOTOS } from '../data'

/**
 * The Drawing Room — Private Advisory, as a quiet, intimate invitation rather
 * than a program brochure. A dedicated five-moment page (opening, the
 * relationship, who it's for, what the relationship looks like, the invitation),
 * separate from the generic DoorwayChapter so the other rooms are untouched.
 * One discreet action: the complimentary Founder Conversation (openBooking).
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }

const label: CSSProperties = {
  fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em',
  textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)',
}
const body: CSSProperties = {
  fontFamily: serif, fontWeight: 300, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.72,
  color: 'rgba(43,39,35,0.74)', maxWidth: '46ch', margin: '0 auto', ...pretty,
}
/** a gentle scroll-linked reveal, as elsewhere in the House */
const surface: CSSProperties = {
  animation: 'fadeUpSoft 1200ms ease both',
  animationTimeline: 'view()' as unknown as string,
  animationRange: 'entry 4% cover 30%' as unknown as string,
}
/** spacious, but without the generic doorway's oversized gaps */
const moment: CSSProperties = { margin: 'clamp(66px,11vh,128px) auto 0', ...surface }

export function DrawingRoom({ ctx }: { ctx: Ctx }) {
  return (
    <ChapterShell onClose={ctx.closeDoorway} background="#efe6d3" z={130}>
      <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: 'clamp(100px,18vh,230px) 7vw clamp(80px,14vh,170px)', color: '#2b2723', textAlign: 'center', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>

        {/* 1 · Opening */}
        <ArchMark width={2.2} margin="0 auto 1.5em" />
        <div style={{ ...label, marginBottom: '1.3em' }}>Private Advisory</div>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px,6.2vw,88px)', lineHeight: 1.02, margin: '0 0 0.45em' }}>The Drawing Room</h2>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(21px,2.6vw,33px)', lineHeight: 1.36, color: 'rgba(122,94,52,0.84)', margin: '0 auto', maxWidth: '24ch', ...balance }}>A seat beside you when the decisions matter most.</p>

        <div style={{ width: 'min(90%,660px)', margin: 'var(--hero-gap) auto 0' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden', borderRadius: '999px 999px 6px 6px', boxShadow: '0 46px 90px -54px rgba(60,44,20,0.66)' }}>
            <ImageSlot src={PHOTOS.advisory} alt="A quiet private room: two chairs, warm light, a place for the decisions that matter most" fit="cover" placeholder="A quiet private room with two chairs and warm light" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(60% 60% at 40% 22%, rgba(255,232,180,0.5), transparent 68%)' }} />
          </div>
        </div>

        {/* 2 · The relationship */}
        <section style={moment}>
          <div style={{ ...label, marginBottom: 'clamp(22px,3.6vh,36px)' }}>The relationship</div>
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(26px,3.6vw,50px)', lineHeight: 1.12, color: '#2b2723', margin: '0 auto', maxWidth: '20ch', ...balance }}>A relationship built around you.</p>
          <p style={{ ...body, margin: 'clamp(30px,5vh,52px) auto 0' }}>The Drawing Room is the most private room in the House. A place for founders who value having an experienced, trusted perspective beside them as they build, grow, and consider what comes next.</p>
          <p style={{ ...body, margin: 'clamp(22px,3.4vh,34px) auto 0' }}>No curriculum. No template. Just thoughtful conversations, honest perspective, and a relationship shaped around you, your leadership, and the opportunities and decisions in front of you.</p>
        </section>

        {/* 3 · Who it's for */}
        <section style={moment}>
          <div style={{ ...label, marginBottom: 'clamp(26px,4vh,42px)' }}>Who it&rsquo;s for</div>
          <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(22px,2.8vw,36px)', lineHeight: 1.4, color: '#2b2723', margin: '0 auto', maxWidth: '26ch', ...balance }}>For founders at defining moments, whether they&rsquo;re pursuing an ambitious new direction, considering an important opportunity, navigating change, or simply ready to think differently about what&rsquo;s possible.</p>
        </section>

        {/* 4 · What the relationship looks like */}
        <section style={moment}>
          <div style={{ ...label, marginBottom: 'clamp(40px,7vh,72px)' }}>What the relationship looks like</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(26px,4.6vh,48px)', maxWidth: 620, margin: '0 auto' }}>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,29px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.84)', margin: 0, ...balance }}>Highly personal, one-to-one advisory, shaped around your business and your goals.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,29px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.84)', margin: 0, ...balance }}>We work with only a small number of founders at a time, allowing each relationship the attention, discretion, and depth it deserves.</p>
            <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(20px,2.4vw,29px)', lineHeight: 1.4, color: 'rgba(43,39,35,0.84)', margin: 0, ...balance }}>The scope and investment are determined together, based on what would be most valuable.</p>
          </div>
        </section>

        {/* 5 · The invitation */}
        <section style={{ margin: 'clamp(84px,13vh,158px) auto 0', ...surface }}>
          <ArchMark width={2} margin="0 auto clamp(24px,4vh,40px)" />
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,60px)', lineHeight: 1.12, color: '#2b2723', margin: '0 auto', maxWidth: '18ch', ...balance }}>It begins with a conversation.</p>
          <p style={{ ...body, maxWidth: '44ch', margin: 'clamp(32px,5.5vh,56px) auto 0' }}>Your first Founder Conversation is complimentary, with no obligation. It&rsquo;s an opportunity to get to know each other, explore what&rsquo;s in front of you, and discover whether Private Advisory is the right fit.</p>
          <El
            onClick={openBooking}
            style={{ display: 'inline-block', margin: 'clamp(40px,7vh,72px) auto 0', fontFamily: sans, fontWeight: 400, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(43,39,35,0.72)', borderBottom: '1px solid rgba(122,94,52,0.5)', paddingBottom: 7, cursor: 'pointer', transition: 'color 500ms ease, border-color 500ms ease' }}
            hover={{ color: '#2b2723', borderColor: 'rgba(43,39,35,0.8)' }}
          >
            Begin the Conversation &rarr;
          </El>
        </section>

        <Divider h="clamp(48px,7vh,80px)" m="clamp(74px,12vh,148px) auto clamp(32px,5vh,52px)" />
        <div style={{ textAlign: 'center' }}><RoomNav ctx={ctx} slug="private-advisory" /></div>
      </div>
    </ChapterShell>
  )
}
