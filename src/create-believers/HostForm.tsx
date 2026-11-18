import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MODE, CONTACT_EMAIL, listPublicBrands, submitHostApplication } from './backend'
import { CAPABILITIES, CATEGORIES, DISCOVERY, GATHERING_TYPES, HOST_ROLES, PHOTOS_WILLING, ROLES, SERVING_PLANS, SHIPPING_PREFS, TIMEZONES, VENUE_TYPES, type Opt } from './options'
import type { PublicBrand, Values } from './types'
import { HOST_STEPS, isoToday, validateHost, validateHostStep } from './validate'
import { Area, Check, Checks, Decoy, ErrorSummary, Link, Radios, Select, Text, newKey, useForm, useHeadingFocus, useMeta } from './ui'

const LABELS: Record<string, string> = {
  full_name: 'Your name', email: 'Email', name: 'Gathering name', type: 'Type of gathering', description: 'Description',
  event_date: 'Date', event_time: 'Time', timezone: 'Time zone', delivery_by: 'Product delivery date', city: 'City', region: 'State or region',
  country: 'Country', postal_code: 'Postal code', guest_count: 'Guest count', audience: 'Who is coming', requested_quantity: 'Quantity', shipping_preference: 'Shipping',
  recap_ack: 'Recap', contact_consent: 'Permission to contact you',
}
const STEP_OF: Record<string, number> = {
  full_name: 1, email: 1, name: 1, type: 1, description: 1,
  date_status: 2, event_date: 2, event_time: 2, timezone: 2, delivery_by: 2, city: 2, region: 2, country: 2, postal_code: 2, guest_count: 2, audience: 2,
  requested_quantity: 3, shipping_preference: 3, recap_ack: 4, contact_consent: 4,
}

function detectedZone(): string {
  try { const z = Intl.DateTimeFormat().resolvedOptions().timeZone; return TIMEZONES.some((t) => t[0] === z) ? z : '' } catch { return '' }
}
const blank = (): Values => ({
  full_name: '', email: '', organization: '', host_role: '', website: '', name: '', type: '', description: '',
  date_status: 'confirmed', event_date: '', event_time: '', timezone: detectedZone(), city: '', region: '', country: 'United States', postal_code: '',
  venue_type: '', guest_count: '', audience: '', repeats: false, frequency: '', delivery_by: '',
  categories: [], preferred_brand_id: '', roles: [], requested_quantity: '', dietary: '', dietary_unknown: false, serving_plan: [], capabilities: [], delivery_notes: '', shipping_preference: '',
  discovery: [], recap_ack: false, photos_willing: '', photo_public_offered: false, photo_reuse_offered: false, extra: '', contact_consent: false, marketing_opt_in: false, company_website: '',
})

export function HostForm({ brandSlug }: { brandSlug: string | null }) {
  useMeta('Tell us about your gathering | Create Believers', 'Tell Believe Studio who you are gathering and what you are planning. We review the fit and get in touch about possible product partnerships.', { path: '/host' })
  const f = useForm(useMemo(blank, []))
  const [step, setStep] = useState(1)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [done, setDone] = useState<null | 'sent' | 'preview'>(null)
  const [brands, setBrands] = useState<PublicBrand[]>([])
  const key = useRef(newKey())
  const summary = useRef<HTMLDivElement>(null)
  const heading = useHeadingFocus(done ? 'done' : step)
  const today = isoToday()

  useEffect(() => {
    let alive = true
    listPublicBrands().then((list) => {
      if (!alive) return
      setBrands(list)
      const wanted = brandSlug && list.find((b) => b.slug === brandSlug)
      if (wanted) f.set('preferred_brand_id', wanted.id)
    }).catch(() => { /* the form works without the brand list */ })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandSlug])

  const focusSummary = () => setTimeout(() => summary.current?.focus(), 30)
  const next = () => {
    const errors = validateHostStep(step, f.v, today)
    f.setErrors(errors)
    if (Object.keys(errors).length) return focusSummary()
    setStep(step + 1); window.scrollTo(0, 0)
  }
  const back = () => { f.setErrors({}); setStep(step - 1); window.scrollTo(0, 0) }

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) return next()
    if (sending) return
    const { errors, firstStep } = validateHost(f.v, today)
    if (firstStep) { f.setErrors(errors); setStep(firstStep); return focusSummary() }
    setSending(true); setFailed(false)
    try {
      const result = await submitHostApplication({ ...f.v, idempotency_key: key.current })
      if (result.ok) {
        setDone(result.preview ? 'preview' : 'sent'); key.current = newKey(); f.reset(blank()); setStep(1); window.scrollTo(0, 0)
      } else {
        f.setErrors(result.errors)
        const steps = Object.keys(result.errors).map((k) => STEP_OF[k]).filter(Boolean)
        if (steps.length) setStep(Math.min(...steps))
        focusSummary()
      }
    } catch { setFailed(true); focusSummary() } finally { setSending(false) }
  }

  const confirmed = f.v.date_status !== 'not_confirmed'
  const cats = f.v.categories as string[]; const plan = f.v.serving_plan as string[]
  const showServing = cats.includes('beverages') || plan.some((p) => ['poured_servings', 'recipe_mocktail', 'sampling'].includes(p))
  const brandOptions: Opt[] = brands.map((b) => [b.id, b.name + (b.illustrative ? ' (illustrative example)' : '')])

  return (
    <main className="cb-page">
      <div className="cb-narrow">
        <Link to="" className="cb-back">← Create Believers</Link>
        <p className="cb-eyebrow">For hosts</p>
        <h1 ref={heading} tabIndex={-1}>{done ? 'Thank you' : 'You’re bringing people together. Let’s find the brands that belong at your table.'}</h1>

        {done === 'sent' && (
          <div className="cb-done" role="status">
            <h2>Thank you for inviting us into your plans.</h2>
            <p>We’ve received your gathering details and will review potential fit. Product partnerships are subject to availability and approval.</p>
            <div className="cb-actions" style={{ marginTop: 24 }}><Link to="" className="cb-btn ghost">Back to Create Believers</Link></div>
          </div>
        )}
        {done === 'preview' && (
          <div className="cb-done" role="status">
            <p><span className="cb-tag">Preview only</span></p>
            <h2 style={{ marginTop: 12 }}>Nothing was sent or saved.</h2>
            <p>This page is not connected to its private tracker yet. Once it is, a host who completes the form will see this message:</p>
            <blockquote>Thank you for inviting us into your plans. We’ve received your gathering details and will review potential fit. Product partnerships are subject to availability and approval.</blockquote>
            <div className="cb-actions" style={{ marginTop: 24 }}><button type="button" className="cb-btn ghost" onClick={() => setDone(null)}>Back to the form</button></div>
          </div>
        )}

        {!done && (
          <>
            <p className="cb-lead">Tell us who you’re gathering, what you’re planning, and what would make the experience better. We’ll review the fit and be in touch about possible product partnerships.</p>
            {MODE === 'unavailable' ? (
              <div className="cb-notice" role="status">
                <strong>Applications are not open on this page yet.</strong> If you are planning a gathering and would like to talk, write to <a href={`mailto:${CONTACT_EMAIL}?subject=Create%20Believers%3A%20a%20gathering`}>{CONTACT_EMAIL}</a>.
              </div>
            ) : (
              <>
                {MODE === 'preview' && <div className="cb-notice" role="status"><strong>Preview.</strong> This form is not connected yet. You can try every step, and nothing you enter is sent or saved.</div>}
                <ol className="cb-progress" aria-label="Progress">
                  {HOST_STEPS.map((title, i) => (
                    <li key={title} className={i + 1 === step ? 'now' : i + 1 < step ? 'done' : ''} aria-current={i + 1 === step ? 'step' : undefined}>
                      <b>Step {i + 1}{i + 1 < step && <span className="sr"> (completed)</span>}</b><span>{title}</span>
                    </li>
                  ))}
                </ol>
                <p className="cb-stepline" aria-hidden="true">Step {step} of 4 · {HOST_STEPS[step - 1]}</p>

                <form className="cb-form" onSubmit={send} noValidate>
                  {failed && (
                    <div className="cb-notice error" role="alert" tabIndex={-1} ref={summary}>
                      <h2>We could not send this just now</h2>
                      <p style={{ marginTop: 6 }}>Your answers are still here. Please try again in a moment. If it keeps happening, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
                    </div>
                  )}
                  {!failed && <ErrorSummary errors={f.errors} labels={LABELS} innerRef={summary} />}
                  <Decoy f={f} />

                  {step === 1 && (
                    <fieldset>
                      <legend className="sr">{HOST_STEPS[0]}</legend>
                      <h2 aria-hidden="true">{HOST_STEPS[0]}</h2>
                      <div className="cb-row">
                        <Text f={f} name="full_name" label="Your full name" autoComplete="name" />
                        <Text f={f} name="email" label="Email" type="email" autoComplete="email" inputMode="email" />
                      </div>
                      <div className="cb-row">
                        <Text f={f} name="organization" label="Organization, club, or business" optional autoComplete="organization" />
                        <Select f={f} name="host_role" label="Your role" optional options={HOST_ROLES} />
                      </div>
                      <Text f={f} name="website" label="Website or social profile" optional help="Only so we can get a feel for what you do. We never ask for a follower count." inputMode="url" autoComplete="url" />
                      <hr className="cb-rule" />
                      <div className="cb-row">
                        <Text f={f} name="name" label="Gathering name" help="A working title is fine." />
                        <Select f={f} name="type" label="Type of gathering" help="Choose the closest." options={GATHERING_TYPES} />
                      </div>
                      <Area f={f} name="description" label="What are you bringing people together to do?" />
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset>
                      <legend className="sr">{HOST_STEPS[1]}</legend>
                      <h2 aria-hidden="true">{HOST_STEPS[1]}</h2>
                      <Radios f={f} name="date_status" label="Is the date set?" options={[['confirmed', 'Yes, the date is confirmed'], ['not_confirmed', 'Date not confirmed yet']]} />
                      {confirmed ? (
                        <>
                          <div className="cb-row three">
                            <Text f={f} name="event_date" label="Date" type="date" min={today} />
                            <Text f={f} name="event_time" label="Approximate time" placeholder="6:30 pm" />
                            <Select f={f} name="timezone" label="Time zone" options={TIMEZONES} />
                          </div>
                          <Text f={f} name="delivery_by" label="When would product need to arrive?" type="date" min={today} max={(f.v.event_date as string) || undefined}
                            help="A date before the gathering that leaves you time to prepare." />
                        </>
                      ) : (
                        <Text f={f} name="event_time" label="Roughly when are you hoping to gather?" optional placeholder="Early spring, a weekend evening" />
                      )}
                      <hr className="cb-rule" />
                      <div className="cb-row">
                        <Text f={f} name="city" label="City or town" autoComplete="address-level2" />
                        <Text f={f} name="region" label="State or region" autoComplete="address-level1" />
                      </div>
                      <div className="cb-row">
                        <Text f={f} name="country" label="Country" autoComplete="country-name" />
                        <Text f={f} name="postal_code" label="Postal code" autoComplete="postal-code" />
                      </div>
                      <p className="cb-help" style={{ marginTop: 10 }}>We don’t need a street address now. If a partnership is approved, we’ll ask where to send things then.</p>
                      <div className="cb-row">
                        <Select f={f} name="venue_type" label="Where will it be held?" optional options={VENUE_TYPES} />
                        <Text f={f} name="guest_count" label="About how many guests?" inputMode="numeric" help="Your best estimate." />
                      </div>
                      <Area f={f} name="audience" label="Who is coming?" help="Their interests, how they know you, and why they gather. Please don’t list individual guests." />
                      <Check f={f} name="repeats" label="This gathering happens regularly" />
                      {f.v.repeats === true && <Text f={f} name="frequency" label="How often?" optional placeholder="Monthly, every other Thursday" />}
                    </fieldset>
                  )}

                  {step === 3 && (
                    <fieldset>
                      <legend className="sr">{HOST_STEPS[2]}</legend>
                      <h2 aria-hidden="true">{HOST_STEPS[2]}</h2>
                      <Checks f={f} name="categories" label="What kind of product would suit the gathering?" optional options={CATEGORIES} />
                      {brandOptions.length > 0 && (
                        <Select f={f} name="preferred_brand_id" label="Is there a brand you have in mind?" optional options={brandOptions} placeholder="Open to suggestions" />
                      )}
                      <Checks f={f} name="roles" label="What role would it play?" optional options={ROLES} />
                      <Text f={f} name="requested_quantity" label="About how much would you need?" optional inputMode="numeric"
                        help="A rough number of servings or units. Leave it blank if you’re not sure; we won’t assume one per guest." />
                      <Area f={f} name="dietary" label="Dietary preferences or allergies we should know about" optional style={{ minHeight: 84 }} />
                      <Check f={f} name="dietary_unknown" label="I don’t know my guests’ dietary needs yet" />
                      <Checks f={f} name="serving_plan" label="How do you picture serving it?" optional options={SERVING_PLANS} />
                      {showServing && <Checks f={f} name="capabilities" label="What will you have on hand?" optional options={CAPABILITIES} />}
                      <Text f={f} name="delivery_notes" label="Anything we should know about receiving a delivery?" optional
                        help="For example, the days or hours someone can accept a package. No address needed yet." />
                      <Radios f={f} name="shipping_preference" one label="How would you like to handle shipping?"
                        help="This helps us plan. Nothing is charged or promised at this stage." options={SHIPPING_PREFS} />
                    </fieldset>
                  )}

                  {step === 4 && (
                    <fieldset>
                      <legend className="sr">{HOST_STEPS[3]}</legend>
                      <h2 aria-hidden="true">{HOST_STEPS[3]}</h2>
                      <Checks f={f} name="discovery" label="How could guests find out about the brand?" optional help="Choose any that feel natural for your gathering." options={DISCOVERY} />
                      <Radios f={f} name="photos_willing" label="Would you be willing to share a few photos of the product in use?" optional options={PHOTOS_WILLING} />
                      {f.v.photos_willing === 'yes' && (
                        <fieldset className="cb-field">
                          <legend>If you share photos, what would you allow? <span className="cb-opt">(optional)</span></legend>
                          <p className="cb-help">These are two separate choices. Sharing a photo with us grants neither. If you tick nothing, your photos are only for Believe Studio and the participating brand to see privately. We confirm the details with you in writing before anything is used.</p>
                          <Check f={f} name="photo_public_offered" label="Photos I share may be shown publicly, for example on social media or a website." />
                          <Check f={f} name="photo_reuse_offered" label="Believe Studio and the participating brand may reuse photos I share in their own marketing." />
                        </fieldset>
                      )}
                      <Area f={f} name="extra" label="Anything else you need, or an idea you’d like to try?" optional style={{ minHeight: 84 }} />
                      <hr className="cb-rule" />
                      <Check f={f} name="recap_ack" required label="If a partnership goes ahead, I can share a short recap afterwards, including how many people actually came." />
                      <Check f={f} name="contact_consent" required label="Believe Studio may contact me about this application." />
                      <Check f={f} name="marketing_opt_in" label="I’d also like occasional news from Believe Studio. (Optional.)" />
                      <p className="cb-review">We’ll review the audience, occasion, location, timing, and product fit. Submitting a gathering doesn’t guarantee a partnership. We’ll confirm the details before anything is arranged.</p>
                    </fieldset>
                  )}

                  <div className="cb-nav">
                    {step > 1 ? <button type="button" className="cb-btn ghost" onClick={back} disabled={sending}>Back</button> : <span />}
                    {step < 4
                      ? <button type="submit" className="cb-btn">Continue</button>
                      : <button type="submit" className="cb-btn" disabled={sending} aria-busy={sending}>{sending ? 'Sending…' : 'Send my gathering'}</button>}
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </main>
  )
}
