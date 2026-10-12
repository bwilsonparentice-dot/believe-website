/**
 * Journal chapters, organized by destination. Each chapter can grow as real
 * stories are written; until a chapter has at least one published article it
 * shows a quiet "arriving" state (never a placeholder story).
 */

export type DestinationStatus = 'live' | 'upcoming'

export type Destination = {
  id: string            // matches Article.destination, and the chapter anchor
  chapter: string       // 'Chapter 01'
  label: string         // 'Florence, Italy'
  date: string          // 'November 2026'
  hero?: string         // /photos/... ; omit for a temporary placeholder
  heroAlt?: string
  intro: string         // a short, warm, forward-looking line (no invented experiences)
  status: DestinationStatus
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'florence',
    chapter: 'Chapter 01',
    label: 'Florence, Italy',
    date: 'November 2026',
    // hero intentionally omitted — a temporary treatment stands in until real
    // photography exists; no unrelated stock image is published as editorial.
    heroAlt: 'Florence, Italy',
    intro: 'Where the journey begins. The first stories are being written now.',
    status: 'upcoming',
  },
]

export function destinationById(id: string | undefined): Destination | undefined {
  if (!id) return undefined
  return DESTINATIONS.find((d) => d.id === id)
}
