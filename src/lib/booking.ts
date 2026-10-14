/**
 * The Founder Conversation — the single booking destination for the whole site.
 *
 * Every "Start a Conversation" / "Let's Talk" CTA now opens the Founder
 * Conversation note first — a brief, warm welcome in Believe's own type — and
 * the note's own "Find a Time to Talk" is what continues to Calendly. The note
 * is a React overlay owned by App, so call sites (which only import the plain
 * `openBooking` function) reach it through a registered opener rather than a
 * direct import. If no opener is registered (e.g. an early call before mount),
 * we fall back to opening the booking page directly so a CTA is never dead.
 *
 * The Calendly URL is owner-confirmed. Do not change it without explicit
 * approval. (The event title/description are maintained manually in Calendly.)
 */
export const FOUNDER_CALL_URL = 'https://calendly.com/beth-believeagency/elite-brand-visibility-call-clone'

type Opener = (e?: { stopPropagation?: () => void }) => void

let conversationOpener: Opener | null = null

/** App registers the Founder Conversation note here on mount. */
export function setConversationOpener(fn: Opener | null) {
  conversationOpener = fn
}

/** Open the Founder Conversation note (preferred), or the booking page directly
 *  if no note is available. This is what every site CTA calls. */
export function openBooking(e?: { stopPropagation?: () => void }) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation()
  if (conversationOpener) { conversationOpener(e); return }
  openBookingDirect()
}

/** Open the Calendly booking page directly in a new tab. Used by the note's own
 *  "Find a Time to Talk" action — the one true hand-off to scheduling. */
export function openBookingDirect(e?: { stopPropagation?: () => void }) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation()
  try { window.open(FOUNDER_CALL_URL, '_blank', 'noopener,noreferrer') } catch { /* ignore */ }
}
