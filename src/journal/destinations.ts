/**
 * Journal chapters, organized by destination. Each chapter can grow as real
 * stories are written; until a chapter has at least one published article it
 * shows a quiet "arriving" state (never a placeholder story).
 */

export type DestinationStatus = 'live' | 'upcoming'

/**
 * An editorial teaser for an upcoming chapter: a preview of a feature not yet
 * written. It never presents experiences as having happened and never links to
 * an article until a real one is published. Shown in place of the plain
 * "arriving" line when a chapter has no published stories yet.
 */
export type ChapterTeaser = {
  title: string         // 'A Different Kind of Renaissance'
  subtitle: string      // 'The Art of Getting Lost in Florence'
  blurb: string[]       // airy, forward-looking paragraphs
  label: string         // 'Coming Soon · November 2026'
}

export type Destination = {
  id: string            // matches Article.destination, and the chapter anchor
  chapter: string       // 'Chapter 01'
  label: string         // 'Florence, Italy'
  date: string          // 'November 2026'
  hero?: string         // /photos/... ; omit for a temporary placeholder
  heroAlt?: string
  intro: string         // a short, warm, forward-looking line (no invented experiences)
  teaser?: ChapterTeaser // optional editorial preview of the first upcoming story
  status: DestinationStatus
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'florence',
    chapter: 'Chapter 01',
    label: 'Florence, Italy',
    date: 'November 2026',
    hero: '/photos/bbb-florence.webp',
    heroAlt: 'A sunlit marble cafe table in Florence, set with a croissant, coffee, and a glass of wine beside olive branches, overlooking the city and the Duomo.',
    intro: 'Where the journey begins. The first stories are being written now.',
    teaser: {
      title: 'A Different Kind of Renaissance',
      subtitle: 'The Art of Getting Lost in Florence',
      blurb: [
        'What happens when you travel somewhere not to find answers, but to rediscover your curiosity?',
        'In a city where art, imagination, and reinvention have flourished for centuries, a different kind of journey begins. One shaped by unexpected encounters, remarkable makers, winding streets, and the simple pleasure of following wherever inspiration leads.',
        'Perhaps the most beautiful discoveries are the ones we never planned to make.',
      ],
      label: 'Coming Soon · November 2026',
    },
    status: 'upcoming',
  },
]

export function destinationById(id: string | undefined): Destination | undefined {
  if (!id) return undefined
  return DESTINATIONS.find((d) => d.id === id)
}
