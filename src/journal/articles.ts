import type { Article } from './types'

/**
 * Believe Beyond Borders articles.
 *
 * This list ships EMPTY of published stories. The journal launches with its
 * concept and the Florence chapter in an "arriving" state. Real pieces are
 * added here as they are written (see AUTHORING.md) — never invented, never a
 * placeholder. Set `draft: true` to keep an in-progress piece in the file
 * without it appearing anywhere.
 */
export const ARTICLES: Article[] = [
  // (no published stories yet)
]

export const DEFAULT_AUTHOR = 'Beth Wilson-Parentice'

/** Only real, published pieces — drafts are never shown or routed. */
export function publishedArticles(): Article[] {
  return ARTICLES.filter((a) => !a.draft)
}

export function articleBySlug(slug: string | null | undefined): Article | undefined {
  if (!slug) return undefined
  return ARTICLES.find((a) => a.slug === slug && !a.draft)
}

export function isPublishedSlug(slug: string | null | undefined): boolean {
  return !!articleBySlug(slug)
}

export function articlesForDestination(id: string): Article[] {
  return publishedArticles().filter((a) => a.destination === id)
}
