import React, { CSSProperties } from 'react'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark } from '../components/ChapterShell'

const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const balance = { textWrap: 'balance' as CSSProperties['textWrap'] }
const pretty = { textWrap: 'pretty' as CSSProperties['textWrap'] }

/** Effective date for the initial pages — update to the real publication date. */
const EFFECTIVE = 'October 11, 2026'

const label: CSSProperties = { fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.7)' }
const h3: CSSProperties = { fontFamily: serif, fontWeight: 500, fontSize: 'clamp(21px,2.3vw,30px)', lineHeight: 1.2, color: '#2b2723', margin: 'clamp(44px,7vh,76px) 0 0.7em' }
const body: CSSProperties = { fontFamily: serif, fontWeight: 300, fontSize: 'clamp(17px,1.65vw,21px)', lineHeight: 1.7, color: 'rgba(43,38,30,0.86)', margin: '0.8em 0 0', ...pretty }

/** The verified public contact address, rendered as a mailto link in the body
 *  serif so it sits naturally in the prose. */
const CONTACT_EMAIL = 'hello@believestudio.co'
function ContactEmail() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      style={{ color: '#7a5e34', textDecoration: 'none', borderBottom: '1px solid rgba(122,94,52,0.4)', paddingBottom: 1, transition: 'border-color 350ms ease' }}
    >
      {CONTACT_EMAIL}
    </a>
  )
}

function LegalShell({ ctx, onClose, eyebrow, title, children }: { ctx: Ctx; onClose: () => void; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <ChapterShell onClose={onClose} background="#efe6d3" backLabel={<>&larr;&nbsp;Back</>}>
      <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto', padding: 'clamp(100px,17vh,220px) 7vw clamp(80px,13vh,160px)', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>
        <div style={{ textAlign: 'center' }}>
          <ArchMark width={2.2} margin="0 auto 1.5em" />
          <div style={{ ...label, marginBottom: '1.3em' }}>{eyebrow}</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,4.6vw,58px)', lineHeight: 1.08, margin: '0 auto', maxWidth: '18ch', ...balance }}>{title}</h2>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.55)', margin: 'clamp(22px,3.5vh,34px) 0 0' }}>Effective {EFFECTIVE}</p>
        </div>
        <div style={{ textAlign: 'left', margin: 'clamp(40px,7vh,80px) auto 0', maxWidth: 620 }}>
          {children}
        </div>
        <div style={{ textAlign: 'center' }}>
          <BackPill onClose={onClose} label="Back to the building" />
        </div>
      </div>
    </ChapterShell>
  )
}

/* ─────────────────────────── Privacy ─────────────────────────── */
export function PrivacyPage({ ctx }: { ctx: Ctx }) {
  return (
    <LegalShell ctx={ctx} onClose={ctx.closePrivacy} eyebrow="Believe Studio" title="Privacy Policy">
      <p style={{ ...body, margin: 0 }}>Believe Studio (&ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This website is a simple, informational space, and it collects very little. This policy explains what happens when you visit believestudio.co and when you reach out to us.</p>

      <h3 style={h3}>What this website collects</h3>
      <p style={body}>The website itself has no contact forms, no email sign-ups, and no advertising or analytics trackers, and it does not set cookies. We do not build profiles of visitors or sell any information.</p>
      <p style={body}>The site stores a few small preferences in your browser&rsquo;s local storage &mdash; for example, whether you&rsquo;ve already seen the opening animation. This information stays on your own device, is not transmitted to us, and you can clear it at any time through your browser.</p>

      <h3 style={h3}>Technical information through our host</h3>
      <p style={body}>The site is hosted on GitHub Pages. Like virtually all web hosts, the host may process limited technical information &mdash; such as your IP address and basic request details &mdash; in standard server logs, in order to deliver and secure the website. That processing is handled by the host under its own terms.</p>

      <h3 style={h3}>Fonts</h3>
      <p style={body}>Our typefaces are served from our own website, so viewing the site does not send your information to a third-party font provider.</p>

      <h3 style={h3}>Booking a conversation (Calendly)</h3>
      <p style={body}>When you choose to start a conversation, you are taken to Calendly, an independent scheduling service, to book a time. Any details you enter there &mdash; such as your name, email address, and appointment details &mdash; are collected and processed by Calendly under its own privacy policy.</p>
      <p style={body}>Believe Studio may receive and retain the contact information and appointment details you submit through Calendly, so that we can schedule, prepare for, and follow up on our conversation with you. We use that information to correspond with you about working together, and we do not sell it.</p>

      <h3 style={h3}>Links to other sites</h3>
      <p style={body}>We link to other websites, including Believe Radar and third-party services. Those sites are operated independently and have their own privacy practices, which we don&rsquo;t control and aren&rsquo;t responsible for.</p>

      <h3 style={h3}>Contacting us</h3>
      <p style={body}>If you have a question or request about your privacy, you can reach us at <ContactEmail />. Because this is an evolving policy, we may update it from time to time; the effective date above reflects the latest version.</p>
    </LegalShell>
  )
}

/* ─────────────────────────── Terms ─────────────────────────── */
export function TermsPage({ ctx }: { ctx: Ctx }) {
  return (
    <LegalShell ctx={ctx} onClose={ctx.closeTerms} eyebrow="Believe Studio" title="Terms of Use">
      <p style={{ ...body, margin: 0 }}>Welcome to believestudio.co, operated by Believe Studio. By using this website, you agree to these terms. Please read them, and if you don&rsquo;t agree, kindly refrain from using the site.</p>

      <h3 style={h3}>Our content</h3>
      <p style={body}>The text, imagery, design, and brand marks on this site belong to Believe Studio (or are used with permission) and are provided for your information. Please don&rsquo;t copy, reproduce, distribute, or reuse them without our written permission.</p>

      <h3 style={h3}>Acceptable use</h3>
      <p style={body}>Please use the site lawfully and in good faith. Don&rsquo;t attempt to disrupt or misuse it, interfere with its normal operation, or gain unauthorized access to any part of it or its underlying systems.</p>

      <h3 style={h3}>External links and scheduling</h3>
      <p style={body}>The site links to third-party services &mdash; including Calendly for scheduling and Believe Radar &mdash; which are operated independently. We provide these links for convenience and are not responsible for the content, availability, or practices of those services.</p>

      <h3 style={h3}>No warranties</h3>
      <p style={body}>This website is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, whether express or implied. We don&rsquo;t warrant that the site will always be available, uninterrupted, or free of errors.</p>

      <h3 style={h3}>Limitation of liability</h3>
      <p style={body}>To the fullest extent permitted by law, Believe Studio will not be liable for any indirect, incidental, or consequential damages arising from your use of &mdash; or inability to use &mdash; this website.</p>

      <h3 style={h3}>Changes and governing law</h3>
      <p style={body}>We may update these terms from time to time; the effective date above reflects the latest version. These terms are governed by the laws of the Commonwealth of Pennsylvania, United States, without regard to its conflict-of-laws rules.</p>

      <h3 style={h3}>Contact</h3>
      <p style={body}>Questions about these terms? Reach us at <ContactEmail />.</p>
    </LegalShell>
  )
}

/* ─────────────────────────── Accessibility ─────────────────────────── */
export function AccessibilityPage({ ctx }: { ctx: Ctx }) {
  return (
    <LegalShell ctx={ctx} onClose={ctx.closeAccessibility} eyebrow="Believe Studio" title="Accessibility">
      <p style={{ ...body, margin: 0 }}>We want the House to feel welcoming to everyone. Believe Studio aims to provide an experience that is accessible and comfortable to use, and we care about getting it right.</p>

      <h3 style={h3}>What we&rsquo;ve built in</h3>
      <p style={body}>We&rsquo;ve designed the site with accessibility in mind, including:</p>
      <ul style={{ ...body, margin: '0.6em 0 0', paddingLeft: '1.2em', listStyle: 'none' }}>
        {[
          'A semantic, keyboard-navigable structure, with visible focus indicators so you can always see where you are.',
          'Respect for your system&rsquo;s reduced-motion setting &mdash; when you prefer reduced motion, animation is turned off and all content remains complete and usable.',
          'Descriptive alternative text for imagery, and clearly labelled controls.',
          'Attention to color contrast and readable, generously spaced typography.',
        ].map((t, i) => (
          <li key={i} style={{ position: 'relative', margin: '0.5em 0', paddingLeft: '1.1em' }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '0.62em', width: 5, height: 5, borderRadius: '50%', background: 'rgba(122,94,52,0.5)' }} />
            <span dangerouslySetInnerHTML={{ __html: t }} />
          </li>
        ))}
      </ul>

      <h3 style={h3}>An ongoing commitment</h3>
      <p style={body}>Accessibility is ongoing work rather than a finished state, and some areas of the site may not yet fully meet every guideline. We keep working to improve it.</p>

      <h3 style={h3}>Tell us how we&rsquo;re doing</h3>
      <p style={body}>If you encounter a barrier, or you have a suggestion that would make the experience better for you, we&rsquo;d genuinely like to hear from you at <ContactEmail />. We&rsquo;ll do our best to help and to put things right.</p>
    </LegalShell>
  )
}
