import React, { useMemo, useRef, useState } from 'react'
import { MODE, CONTACT_EMAIL, submitFounderInquiry } from './backend'
import { CATEGORIES } from './options'
import type { Values } from './types'
import { validateFounder } from './validate'
import { Area, Check, Decoy, ErrorSummary, Link, Select, Text, newKey, useForm, useHeadingFocus, useMeta } from './ui'

const LABELS: Record<string, string> = {
  founder_name: 'Your name', email: 'Work email', brand_name: 'Brand name', description: 'Product description',
  explore: 'What you would like to explore', contact_consent: 'Permission to contact you',
}
const blank = (): Values => ({
  founder_name: '', email: '', brand_name: '', website: '', category: '', description: '', markets: '', explore: '', timing_budget: '',
  contact_consent: false, company_website: '',
})
const CONFIRMATION = 'Thank you. We’ve received your note and will read it with care. Sending an inquiry doesn’t commit you, or us, to a partnership.'

export function FounderForm() {
  useMeta('For brand founders | Create Believers', 'Explore the gatherings and collaborations where your food or beverage brand’s differences will matter. A short inquiry to Believe Studio.', { path: '/founders' })
  const f = useForm(useMemo(blank, []))
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [done, setDone] = useState<null | 'sent' | 'preview'>(null)
  const key = useRef(newKey())
  const summary = useRef<HTMLDivElement>(null)
  const heading = useHeadingFocus(done ?? undefined)
  const focusSummary = () => setTimeout(() => summary.current?.focus(), 30)

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    const errors = validateFounder(f.v)
    f.setErrors(errors)
    if (Object.keys(errors).length) return focusSummary()
    setSending(true); setFailed(false)
    try {
      const result = await submitFounderInquiry({ ...f.v, idempotency_key: key.current })
      if (result.ok) { setDone(result.preview ? 'preview' : 'sent'); key.current = newKey(); f.reset(blank()); window.scrollTo(0, 0) }
      else { f.setErrors(result.errors); focusSummary() }
    } catch { setFailed(true); focusSummary() } finally { setSending(false) }
  }

  return (
    <main className="cb-page">
      <div className="cb-narrow">
        <Link to="" className="cb-back">← Create Believers</Link>
        <p className="cb-eyebrow">For brand founders</p>
        <h1 ref={heading} tabIndex={-1}>{done ? 'Thank you' : 'Find the places where your brand’s differences will really matter.'}</h1>

        {done === 'sent' && (
          <div className="cb-done" role="status">
            <p>{CONFIRMATION}</p>
            <div className="cb-actions" style={{ marginTop: 24 }}><Link to="" className="cb-btn ghost">Back to Create Believers</Link></div>
          </div>
        )}
        {done === 'preview' && (
          <div className="cb-done" role="status">
            <p><span className="cb-tag">Preview only</span></p>
            <h2 style={{ marginTop: 12 }}>Nothing was sent or saved.</h2>
            <p>This page is not connected to its private tracker yet. Once it is, a founder who completes the form will see this message:</p>
            <blockquote>{CONFIRMATION}</blockquote>
            <div className="cb-actions" style={{ marginTop: 24 }}><button type="button" className="cb-btn ghost" onClick={() => setDone(null)}>Back to the form</button></div>
          </div>
        )}

        {!done && (
          <>
            <p className="cb-lead">Create Believers helps your brand find its people through thoughtfully matched gatherings and memorable product experiences.</p>
            <p className="intro">We help founders explore relevant gatherings, thoughtful collaborations, and new ways for people to experience their products—with a clear plan for what happens afterward.</p>
            <p className="intro">Tell us a little to begin. If there’s a fit, we’ll build the detail together.</p>
            {MODE === 'unavailable' ? (
              <div className="cb-notice" role="status">
                <strong>Inquiries are not open on this page yet.</strong> To start a conversation, write to <a href={`mailto:${CONTACT_EMAIL}?subject=Create%20Believers%3A%20a%20brand`}>{CONTACT_EMAIL}</a>.
              </div>
            ) : (
              <form className="cb-form" onSubmit={send} noValidate>
                {MODE === 'preview' && <div className="cb-notice" role="status" style={{ marginTop: 0 }}><strong>Preview.</strong> This form is not connected yet. Nothing you enter is sent or saved.</div>}
                {failed && (
                  <div className="cb-notice error" role="alert" tabIndex={-1} ref={summary}>
                    <h2>We could not send this just now</h2>
                    <p style={{ marginTop: 6 }}>Your answers are still here. Please try again in a moment. If it keeps happening, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
                  </div>
                )}
                {!failed && <ErrorSummary errors={f.errors} labels={LABELS} innerRef={summary} />}
                <Decoy f={f} />
                <div className="cb-row">
                  <Text f={f} name="founder_name" label="Your name" autoComplete="name" />
                  <Text f={f} name="email" label="Work email" type="email" autoComplete="email" inputMode="email" />
                </div>
                <div className="cb-row">
                  <Text f={f} name="brand_name" label="Brand name" autoComplete="organization" />
                  <Text f={f} name="website" label="Website" optional inputMode="url" autoComplete="url" />
                </div>
                <Select f={f} name="category" label="Product category" optional options={CATEGORIES} />
                <Area f={f} name="description" label="Describe your product in a sentence or two" style={{ minHeight: 84 }} />
                <Area f={f} name="markets" label="Where can people buy it today?" optional help="Regions, retailers, online. Whatever is true right now." style={{ minHeight: 84 }} />
                <Area f={f} name="explore" label="What would you like to explore?" help="The people you’d love to reach, or the kinds of gatherings you can picture your product in." />
                <Text f={f} name="timing_budget" label="Any timing or budget context?" optional />
                <hr className="cb-rule" />
                <Check f={f} name="contact_consent" required label="Believe Studio may contact me about this inquiry." />
                <div className="cb-nav"><span /><button type="submit" className="cb-btn" disabled={sending} aria-busy={sending}>{sending ? 'Sending…' : 'Send my inquiry'}</button></div>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  )
}
