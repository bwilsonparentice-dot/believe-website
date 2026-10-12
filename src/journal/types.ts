/**
 * Believe Beyond Borders — the journal's content model.
 *
 * A lightweight, file-based system: an article is a plain typed object (see
 * articles.ts), rendered by one reusable component (ArticleView). Adding a
 * piece means adding an object and dropping its images into /public/photos.
 * No CMS, no third-party service. Nothing is invented; a story is only
 * published when it is real (see AUTHORING.md).
 */

/** Which collection a piece belongs to. */
export type Collection = 'beyond-borders' | 'from-the-studio'

/** An essay reads as long-form; a founder story opens with a portrait. */
export type ArticleKind = 'essay' | 'founder-story'

/** The long-form body is a sequence of simple, composable blocks. */
export type Block =
  | { type: 'text'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'pullquote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'brandLink'; label: string; url: string }

/** The founder a founder-story is about (their own brand, not an ad). */
export type FounderMeta = {
  name: string
  brand: string
  location: string
  brandUrl?: string
  portrait?: string
  portraitAlt?: string
}

export type Article = {
  slug: string                 // the shareable URL segment: /journal/<slug>
  title: string
  subtitle?: string
  collection: Collection
  destination?: string         // a chapter id, e.g. 'florence'
  chapter?: string             // the chapter label, e.g. 'Chapter 01'
  date: string                 // e.g. 'November 2026'
  author?: string              // defaults to Beth Wilson-Parentice
  hero?: string                // /photos/... ; omit for a temporary placeholder
  heroAlt?: string
  kind: ArticleKind
  founder?: FounderMeta        // founder-story only
  body: Block[]
  related?: string[]           // other article slugs
  draft?: boolean              // true = written but not published (never shown)
}
