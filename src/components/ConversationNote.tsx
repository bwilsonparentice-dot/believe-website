import { useEffect, useRef } from 'react'
import { ArchMark } from './ChapterShell'
import { FOUNDER_CALL_URL, openBookingDirect } from '../lib/booking'

// Re-export for any legacy import.
export { FOUNDER_CALL_URL }

/**
 * The Founder Conversation — the welcome a founder meets when they choose to
 * begin. A brief, warm greeting in Believe's own type, shown over the House
 * before any calendar. Its own "Find a Time to Talk" is the single hand-off to
 * scheduling. Every "Start a Conversation" / "Let's Talk" CTA opens this note.
 *
 * Accessibility: a labelled modal dialog that takes focus on open, traps Tab
 * within itself, and locks background scroll. Escape-to-close and returning
 * focus to the triggering control are owned by App (its global key handler and
 * open/close of showConversation). Entrance motion is disabled under
 * prefers-reduced-motion (see .fc-* in index.css).
 */
export function ConversationNote({ onClose }: { onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const focusables = () =>
      Array.from(
        card.querySelectorAll<HTMLElement>('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)

    // move focus into the dialog (the card itself, so no control gets a ring
    // on open and screen readers announce the labelled dialog)
    card.focus()

    // lock background scroll while the note is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // trap Tab within the note
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) { e.preventDefault(); return }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && (active === first || active === card)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
    }
    card.addEventListener('keydown', onKeyDown)
    return () => {
      card.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // The one hand-off to scheduling: open Calendly in a new tab (so the House
  // stays open behind it) and dismiss the note in this tab.
  const toScheduling = () => {
    openBookingDirect()
    onClose()
  }

  return (
    <div className="fc-veil" onClick={onClose}>
      <div
        ref={cardRef}
        className="fc-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fc-headline"
        aria-describedby="fc-intro"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <ArchMark width={2.2} margin="0 auto 1.3em" />
        <div className="fc-eyebrow">The Founder Conversation</div>
        <p className="fc-headline" id="fc-headline">Every meaningful company begins with a conversation.</p>
        <p className="fc-intro" id="fc-intro">Before we talk about strategy, growth, or what&rsquo;s possible, we&rsquo;d love to hear your story.</p>
        <p className="fc-listening">Good conversations begin with listening.</p>
        <a
          className="fc-continue"
          href={FOUNDER_CALL_URL}
          target="_blank"
          rel="noreferrer"
          data-primary
          onClick={toScheduling}
        >
          Find a Time to Talk&nbsp;&rarr;
        </a>
        <button className="fc-dismiss" type="button" onClick={onClose}>Not just now</button>
      </div>
    </div>
  )
}
