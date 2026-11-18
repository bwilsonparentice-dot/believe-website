import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CONTACT_EMAIL, MODE, getRecapContext, submitRecap } from './backend'
import { HOST_INTEREST } from './options'
import type { RecapContext, Values } from './types'
import { validateRecap } from './validate'
import { Area, Check, ErrorSummary, Radios, Text, useForm, useMeta } from './ui'

const LABELS: Record<string, string> = {
  actual_attendance: 'How many people came', tried_count: 'How many tried the product', units_served: 'Units served', units_taken_home: 'Units taken home',
  units_remaining: 'Units left over', served_how: 'How it was served',
}
const blank = (): Values => ({
  actual_attendance: '', tried_count: '', units_served: '', units_taken_home: '', units_remaining: '', served_how: '', introduced_how: '',
  reactions: '', worked: '', improve: '', photo_links: '', photo_public_ok: false, photo_reuse_ok: false, photo_permission_notes: '', host_interest: '', purchases_self_reported: '',
})

/** The short recap a host completes after a gathering, reached by a private link for one brand at one gathering. */
export function RecapForm({ token }: { token: string }) {
  useMeta('Share your recap | Create Believers', 'A short recap of your gathering for Believe Studio.', { noindex: true })
  const f = useForm(useMemo(blank, []))
  const [ctx, setCtx] = useState<'loading' | 'missing' | RecapContext>('loading')
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [done, setDone] = useState<null | 'sent' | 'preview'>(null)
  const summary = useRef<HTMLDivElement>(null)
  const focusSummary = () => setTimeout(() => summary.current?.focus(), 30)

  useEffect(() => {
    let alive = true
    getRecapContext(token).then((c) => alive && setCtx(c ?? 'missing')).catch(() => alive && setCtx('missing'))
    return () => { alive = false }
  }, [token])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    const errors = validateRecap(f.v)
    f.setErrors(errors)
    if (Object.keys(errors).length) return focusSummary()
    setSending(true); setFailed(false)
    try {
      const result = await submitRecap(token, f.v)
      if (result.ok) { setDone(result.preview ? 'preview' : 'sent'); window.scrollTo(0, 0) }
      else { f.setErrors(result.errors); focusSummary() }
    } catch { setFailed(true); focusSummary() } finally { setSending(false) }
  }

  return (
    <>
      <header className="cb-mast"><a href="/" aria-label="Believe Studio home"><img src="/logo/believe-horizontal.svg" alt="Believe Studio" /></a></header>
      <main className="cb-page plain">
        <div className="cb-narrow">
          {ctx === 'loading' && <p role="status">Loading…</p>}
          {ctx === 'missing' && (
            <>
              <h1>This recap link isn’t available.</h1>
              <p className="cb-lead">Please use the link in your most recent note from Believe, or write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we’ll help.</p>
            </>
          )}
          {typeof ctx === 'object' && (
            <>
              <p className="cb-eyebrow">After the gathering</p>
              <h1>{done ? 'Thank you' : 'How did it go?'}</h1>
              {done === 'sent' && <div className="cb-done" role="status"><p>We’ve received your recap for {ctx.gathering_name}. Thank you for taking the time. It helps us, and the founder, understand what the evening was really like.</p></div>}
              {done === 'preview' && <div className="cb-done" role="status"><p><span className="cb-tag">Preview only</span></p><h2 style={{ marginTop: 12 }}>Nothing was sent or saved.</h2><p>Once this page is connected, the recap is saved against this gathering and brand in the private tracker.</p></div>}
              {!done && (ctx.submitted ? (
                <div className="cb-notice" role="status"><strong>A recap has already been sent for this gathering.</strong> Thank you. If something needs correcting, reply to your last note from Believe.</div>
              ) : !ctx.open ? (
                <div className="cb-notice" role="status"><strong>This recap isn’t open at the moment.</strong> If you think it should be, reply to your last note from Believe and we’ll help.</div>
              ) : (
                <>
                  <p className="cb-lead">A few notes on <strong>{ctx.gathering_name}</strong> and how <strong>{ctx.brand_name}</strong> took part. Estimates are welcome, and it’s fine to leave a question blank if you don’t know.</p>
                  {MODE === 'preview' && <div className="cb-notice" role="status"><strong>Preview.</strong> This form is not connected yet. Nothing you enter is sent or saved.</div>}
                  <form className="cb-form" onSubmit={send} noValidate>
                    {failed && <div className="cb-notice error" role="alert" tabIndex={-1} ref={summary}><h2>We could not send this just now</h2><p style={{ marginTop: 6 }}>Your answers are still here. Please try again in a moment.</p></div>}
                    {!failed && <ErrorSummary errors={f.errors} labels={LABELS} innerRef={summary} />}
                    <div className="cb-row">
                      <Text f={f} name="actual_attendance" label="How many people came?" inputMode="numeric" />
                      <Text f={f} name="tried_count" label="About how many tried the product?" optional inputMode="numeric" />
                    </div>
                    <div className="cb-row three">
                      <Text f={f} name="units_served" label="Units served" optional inputMode="numeric" />
                      <Text f={f} name="units_taken_home" label="Taken home" optional inputMode="numeric" />
                      <Text f={f} name="units_remaining" label="Left over" optional inputMode="numeric" />
                    </div>
                    <Area f={f} name="served_how" label="How was the product served?" style={{ minHeight: 84 }} />
                    <Area f={f} name="introduced_how" label="How was it introduced to guests?" optional style={{ minHeight: 84 }} />
                    <Area f={f} name="reactions" label="What did guests say or do?" optional />
                    <div className="cb-row">
                      <Area f={f} name="worked" label="What worked well?" optional style={{ minHeight: 84 }} />
                      <Area f={f} name="improve" label="What would you change?" optional style={{ minHeight: 84 }} />
                    </div>
                    <Area f={f} name="purchases_self_reported" label="Did anyone mention buying it, or ask where to find it?" optional help="Only what you saw or heard. We record this as your own account." style={{ minHeight: 84 }} />
                    <hr className="cb-rule" />
                    <Area f={f} name="photo_links" label="Photos of the product in use" optional help="Paste a link to a shared album or folder. Please only share photos you have the right to share." style={{ minHeight: 70 }} />
                    <fieldset className="cb-field">
                      <legend>What may be done with these photos? <span className="cb-opt">(optional)</span></legend>
                      <p className="cb-help">These are two separate choices, and sharing photos grants neither. If you tick nothing, the photos are only for Believe Studio and the participating brand to see privately.</p>
                      <Check f={f} name="photo_public_ok" label="These photos may be shown publicly, for example on social media or a website." />
                      <Check f={f} name="photo_reuse_ok" label="Believe Studio and the participating brand may reuse these photos in their own marketing." />
                    </fieldset>
                    <Text f={f} name="photo_permission_notes" label="Anything to add about the photos?" optional help="For example, a credit line, or a photo that should stay private." />
                    <hr className="cb-rule" />
                    <Radios f={f} name="host_interest" label="Would you like to host another gathering with a brand partner?" optional options={HOST_INTEREST} />
                    <div className="cb-nav"><span /><button type="submit" className="cb-btn" disabled={sending} aria-busy={sending}>{sending ? 'Sending…' : 'Send my recap'}</button></div>
                  </form>
                </>
              ))}
            </>
          )}
        </div>
      </main>
      <footer className="cb-foot">Create Believers, by <a href="/">Believe Studio</a></footer>
    </>
  )
}
