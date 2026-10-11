/**
 * The Founder Conversation — the single booking destination for the whole site.
 * Every "Start a Conversation" / "Begin the Conversation" CTA opens this exact
 * Calendly page directly, in a new tab, with no intermediate form or step.
 *
 * This URL is owner-confirmed. Do not change it without explicit approval.
 * (The Calendly event itself — title "A Founder Conversation | Believe Studio"
 * and description — is maintained manually by Beth in Calendly.)
 */
export const FOUNDER_CALL_URL = 'https://calendly.com/beth-believeagency/elite-brand-visibility-call-clone'

/** Open the booking page directly in a new tab. Safe no-op if window is absent. */
export function openBooking(e?: { stopPropagation?: () => void }) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation()
  try { window.open(FOUNDER_CALL_URL, '_blank', 'noopener,noreferrer') } catch { /* ignore */ }
}
