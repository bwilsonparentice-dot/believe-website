/**
 * Form checks that run in the browser so problems are shown beside the field
 * straight away. The database repeats every one of these checks when the form
 * is sent (see supabase/migrations) — the browser is never trusted.
 */
import type { Errors, Values } from './types'

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/
const str = (v: Values, k: string) => (typeof v[k] === 'string' ? (v[k] as string).trim() : '')
const yes = (v: Values, k: string) => v[k] === true
const wholeNumber = (s: string) => /^[0-9]{1,7}$/.test(s)

export const isoToday = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const HOST_STEPS = ['You and your gathering', 'People, place, timing', 'What belongs in the experience', 'Help guests discover the brand'] as const

/** Problems with one step of the host application (step is 1 to 4). */
export function validateHostStep(step: number, v: Values, today = isoToday()): Errors {
  const e: Errors = {}
  if (step === 1) {
    if (!str(v, 'full_name')) e.full_name = 'Please tell us your name.'
    if (!EMAIL.test(str(v, 'email'))) e.email = 'Please enter an email address we can reply to.'
    if (!str(v, 'name')) e.name = 'Please give your gathering a name, even a working one.'
    if (!str(v, 'type')) e.type = 'Please choose the closest type.'
    if (!str(v, 'description')) e.description = 'Please tell us what you are bringing people together to do.'
  }
  if (step === 2) {
    if (str(v, 'date_status') !== 'not_confirmed') {
      const event = str(v, 'event_date'); const delivery = str(v, 'delivery_by')
      if (!event) e.event_date = 'Please choose the date, or select “Date not confirmed yet”.'
      else if (event < today) e.event_date = 'This date has already passed.'
      if (!str(v, 'event_time')) e.event_time = 'Please give an approximate time.'
      if (!str(v, 'timezone')) e.timezone = 'Please choose a time zone.'
      if (!delivery) e.delivery_by = 'Please tell us when product would need to arrive.'
      else if (event && delivery >= event) e.delivery_by = 'Product needs to arrive before the day of the gathering.'
      else if (delivery < today) e.delivery_by = 'This date has already passed.'
    }
    if (!str(v, 'city')) e.city = 'Please enter the city or town.'
    if (!str(v, 'region')) e.region = 'Please enter the state or region.'
    if (!str(v, 'country')) e.country = 'Please enter the country.'
    if (!str(v, 'postal_code')) e.postal_code = 'Please enter the postal code.'
    const guests = str(v, 'guest_count')
    if (!wholeNumber(guests) || Number(guests) < 1) e.guest_count = 'Please enter your best estimate as a whole number.'
    if (!str(v, 'audience')) e.audience = 'Please tell us a little about who is coming.'
  }
  if (step === 3) {
    const qty = str(v, 'requested_quantity')
    if (qty && (!wholeNumber(qty) || Number(qty) < 1)) e.requested_quantity = 'Please enter a whole number, or leave this blank.'
  }
  if (step === 4) {
    if (!yes(v, 'recap_ack')) e.recap_ack = 'Please confirm you can share a short recap afterwards.'
    if (!yes(v, 'contact_consent')) e.contact_consent = 'Please confirm we may contact you about this application.'
  }
  return e
}

export function validateHost(v: Values, today = isoToday()): { errors: Errors; firstStep: number } {
  let errors: Errors = {}; let firstStep = 0
  for (let s = 1; s <= 4; s++) {
    const e = validateHostStep(s, v, today)
    if (Object.keys(e).length && !firstStep) firstStep = s
    errors = { ...errors, ...e }
  }
  return { errors, firstStep }
}

export function validateFounder(v: Values): Errors {
  const e: Errors = {}
  if (!str(v, 'founder_name')) e.founder_name = 'Please tell us your name.'
  if (!EMAIL.test(str(v, 'email'))) e.email = 'Please enter a work email we can reply to.'
  if (!str(v, 'brand_name')) e.brand_name = 'Please tell us the name of your brand.'
  if (!str(v, 'description')) e.description = 'Please describe your product in a sentence or two.'
  if (!str(v, 'explore')) e.explore = 'Please tell us what you would like to explore.'
  if (!yes(v, 'contact_consent')) e.contact_consent = 'Please confirm we may contact you about this inquiry.'
  return e
}

export function validateRecap(v: Values): Errors {
  const e: Errors = {}
  if (!wholeNumber(str(v, 'actual_attendance'))) e.actual_attendance = 'Please enter how many people actually came.'
  for (const k of ['tried_count', 'units_served', 'units_taken_home', 'units_remaining']) {
    const s = str(v, k)
    if (s && !wholeNumber(s)) e[k] = 'Please enter a whole number, or leave this blank.'
  }
  if (!str(v, 'served_how')) e.served_how = 'Please tell us how the product was served.'
  if (str(v, 'photo_links') && (str(v, 'photo_permission') || 'not_shared') === 'not_shared') {
    e.photo_permission = 'Please choose how the photos you are sharing may be used.'
  }
  return e
}

/** Turns the short codes the server returns into sentences for the visitor. */
const SERVER_MESSAGES: Record<string, string> = {
  required: 'This is needed before we can review.',
  invalid: 'Please check this and try again.',
  past: 'This date has already passed.',
  after_event: 'Product needs to arrive before the day of the gathering.',
  too_many: 'We have received several submissions from you recently. Please write to us instead and we will pick it up from there.',
  closed: 'This recap link is not open at the moment. Please reply to your last note from Believe and we will help.',
  already_submitted: 'A recap has already been sent for this gathering. Thank you. If something needs correcting, reply to your last note from Believe.',
}
export function serverErrors(codes: Record<string, string>): Errors {
  const out: Errors = {}
  for (const [k, code] of Object.entries(codes)) out[k] = SERVER_MESSAGES[code] ?? SERVER_MESSAGES.invalid
  return out
}
