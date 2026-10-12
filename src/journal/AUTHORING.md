# Adding a Believe Beyond Borders article

The journal is file-based. To publish a piece you add one object to
`src/journal/articles.ts` and drop its images into `public/photos/`. No CMS,
no new page design.

## Steps

1. Add any images to `public/photos/` (e.g. `florence-essay-hero.webp`).
2. Append an `Article` object to `ARTICLES` in `src/journal/articles.ts`.
3. That's it — the piece appears in its chapter, gets the URL `/journal/<slug>`,
   and renders through the shared template.

To keep a piece in progress without publishing it, set `draft: true`. Draft
pieces never appear in a chapter and their URL is not reachable.

## The shape of an article

```ts
{
  slug: 'rediscovering-florence',          // the URL: /journal/rediscovering-florence
  title: 'Rediscovering a Dream in Florence',
  subtitle: 'A personal essay on working internationally.',
  collection: 'beyond-borders',            // or 'from-the-studio'
  destination: 'florence',                 // the chapter id (see destinations.ts)
  chapter: 'Chapter 01',
  date: 'November 2026',
  author: 'Beth Wilson-Parentice',         // optional; this is the default
  hero: '/photos/florence-essay-hero.webp',
  heroAlt: 'A quiet Florentine street in morning light',
  kind: 'essay',                           // or 'founder-story'

  // founder-story only:
  founder: {
    name: 'Name',
    brand: 'Brand',
    location: 'Florence, Italy',
    brandUrl: 'https://example.com',
    portrait: '/photos/founder-portrait.webp',
    portraitAlt: 'Portrait of Name in their studio',
  },

  body: [
    { type: 'text', text: 'An opening paragraph.' },
    { type: 'pullquote', text: 'A line worth setting apart.', cite: 'Name' },
    { type: 'image', src: '/photos/florence-01.webp', alt: '…', caption: 'A caption.' },
    { type: 'heading', text: 'A section' },
    { type: 'text', text: 'More writing.' },
    { type: 'brandLink', label: 'Visit Brand', url: 'https://example.com' },
  ],

  related: ['another-slug'],               // optional
}
```

## Principles
- Nothing is invented. Publish only real writing, quotes, and photography.
- A founder feature is a story, never an advertisement or a sponsored post.
- Add new chapters (London, Paris, Lisbon…) in `src/journal/destinations.ts`.
