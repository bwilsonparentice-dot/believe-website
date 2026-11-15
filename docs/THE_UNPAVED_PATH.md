# The Unpaved Path: invitation page

An unlisted, invitation-only page for the inaugural founder gathering concept.
It exists to test genuine interest. It takes no payments and shows no price,
dates, venue, attendees or partners, because none of those are confirmed.

| | |
| --- | --- |
| Live URL | `https://believestudio.co/the-unpaved-path/` |
| File | `public/the-unpaved-path/index.html` (one self-contained file: markup, styles, script) |
| Local preview | `npm run dev`, then open `http://localhost:5173/the-unpaved-path/` |
| Skip the door | add `#invitation` or `#interest` to the URL |

## How it is built, and why

The page is a static HTML file rather than a route inside the React app. That
is deliberate:

- It reads in full **without JavaScript**. The door is a progressive
  enhancement; without it the closed door is simply the first image and
  "Open your invitation" is an ordinary link down the page.
- The `noindex` tag is in the HTML itself, so every crawler sees it. A tag
  injected by the app after load would be missed by crawlers that do not run
  scripts.
- Nothing in the existing site was changed, so nothing in it can regress.
  The same pattern is already used for the `public/discovery/` pages.

It reuses the House's own pieces: the homepage door photographs
(`entrance49-base.webp` and `entrance49-leaf.webp`, the same hinged-leaf
technique as `.bs-ent` in `src/index.css`), the brass nameplate, the
self-hosted fonts in `public/fonts/`, the palette from `src/lib/palette.ts`,
and the room photographs in `public/photos/`.

The only other code change is a small dev-only helper in `vite.config.ts` so
that static pages in `public/` open at their real address during local
preview. GitHub Pages already serves them that way in production.

## The experience

1. **The door.** The townhouse entrance, the title, the line "You've spent so
   much time opening doors for your brand. This one is for you." and one
   action: Open your invitation. Clicking or tapping anywhere on the scene
   also opens it.
2. **The door opens.** The leaf swings on its hinge and the scene steps
   forward, about 2.8 seconds in all. The candlelit table is visible through
   the doorway before the scene dissolves into it.
3. **Welcome home.** The room is revealed first. "Welcome home." arrives alone, then after a held breath "We've saved you a seat.", then the name of the gathering, then a quiet "Read your invitation" cue. With reduced motion, or when the animation is skipped, everything is shown at once.
4. **The invitation.** The approved copy, in order, with two quiet photographs.
5. **The invitation to connect.** The interest form and a link to book a
   conversation with Beth.

On phones and other portrait screens the house sits in the upper part of the
screen and the words gather on navy beneath the doorstep. On wide screens the
words stand to the left of the door.

### Accessibility

- Keyboard: Tab reaches "Open your invitation" and "Skip the animation";
  Enter or Space opens; Escape skips. While the door is closed, the page
  behind it cannot be tabbed into. After opening, focus moves to
  "Welcome home."
- Reduced motion: no swing and no scroll reveals, only a short fade.
- "Skip the animation" is always visible on the door.
- If the door photograph fails to load, the page opens by itself.

## The interest form: what is and is not connected

**No form backend exists on this site, so none has been invented.** Today the
button "I'd love to learn more" checks the fields, then opens a ready-to-send
email to `hello@believestudio.co` in the founder's own mail app. The page says
this plainly and never claims the note was sent or saved.

To collect submissions directly instead:

1. Create an endpoint that accepts a JSON `POST` and answers `2xx` on success.
   Formspree or Basin work with no code; a Supabase Edge Function or a CRM
   webhook also work.
2. In `public/the-unpaved-path/index.html`, find `CONFIG` near the bottom and
   set `formEndpoint` to that URL.

The page then posts `firstName`, `lastName`, `email`, `brand`, `message` and
`source`, and shows the thank-you message only after the endpoint confirms
receipt. A failed send is reported, with the email address as a fallback.
`contactEmail` in the same `CONFIG` block sets the fallback address.

The form never asks for revenue, funding, distribution or anything financial.

## Privacy

Unlisted is not private. Anyone who has the URL can open the page. It is not
linked from the navigation, directory, footer or any sitemap, and it is marked
`noindex`, but that only keeps it out of search results.

- Do not put anything invitee-specific in this file.
- Do not personalise through the URL (for example `?name=`). Personalise the
  email instead.
- If real access control is needed later, use signed, expiring invitation
  tokens checked by a server (for example a Supabase Edge Function that
  serves the page only for a valid token), or a host that supports password
  protection. GitHub Pages cannot do either. A password checked in the
  browser is not protection and should not be used.

## Updating it later

All in `public/the-unpaved-path/index.html`:

| To change | Where |
| --- | --- |
| Invitation wording | the `<main>` section; each passage is plain text in order |
| Dates or venue, once confirmed | the line `England. Three days. An intimate founding circle.` (marked with a comment) |
| The dining room photograph | currently `/photos/unpaved-dining-country.webp` (used three times: the preload link, `.ent-room` in the styles, and the `welcome-photo` image). The earlier London room is `/photos/photo-table.webp`; swap the name back in those three places to return to it. `--room-pos` on `.welcome-photo` sets which part of the photograph stays in frame. |
| The other two photographs | the `<img>` tags for `photo-closing.webp` and `photo-conversation.webp`; update the `alt` text to match |
| The booking link | the Calendly link just above `</main>` |
| Door timing | the two numbers in the `enter` function (`1650`, `2800`) and the `1750ms` leaf transition |
| Welcome message timing | the `animation-delay` values under "Each welcome has its own moment" in the styles (counted from the click on the door) |

## Copy review against the approved invitation

Every line of the approved invitation copy appears, in order and unaltered.
Formatting only: the three "Not to" lines are set as a short list, and the
three takeaways are set as a numbered trio with their opening words
emphasised.

Additions, all using language from the brief, none replacing approved text:

- The door and welcome scenes use the scripted lines ("You've spent so much
  time opening doors for your brand. This one is for you.", "Welcome home.",
  "We've saved you a seat.", "The Unpaved Path. A gathering for the person
  behind the brand.").
- **One added passage:** a three-part strip, Day One / Belonging / "Arrive as
  you are.", Day Two / Possibility / "Discover what you haven't considered.",
  Day Three / Courage / "Take the next step." It is one `<ol class="arc">`
  block marked with a comment; delete it to return to the approved copy
  exactly.
- Small interface labels: "Skip the animation", "Read your invitation",
  the form labels, and "Or find a time to talk with Beth".

Suggestions for approval, not implemented:

- A short signed note from Beth near the form, built around "Sometimes the
  person behind the brand needs someone to believe in them, too."
- A line near the form: "You may be building your business on your own, but
  you don't have to navigate the journey alone."

## Assets still needed

- A larger master of the 16:9 dining room. The current file is 1672 pixels
  wide, which is slightly soft on large or high-density desktop screens;
  2560 pixels or more would be crisp.
- One or two country house images (an exterior or approach, a garden or
  landscape) to replace the hallway and fireside photographs if wanted.
- A dedicated link-preview image. The page currently uses the site's
  townhouse image, `og-believe.jpg`.

## The dining room: two framings

| Screen | Photograph |
| --- | --- |
| Phones and portrait screens | `public/photos/unpaved-dining-country.webp` (the approved original, 1199 x 1312) |
| Wide screens (desktop, landscape tablet) | `public/photos/unpaved-dining-country-wide.webp` (16:9, 1672 x 941) |

The two are different photographs of the same kind of room, not one picture
cropped two ways, so a founder on a phone and a founder on a laptop see
slightly different rooms.

On wide screens the chandelier hangs in the middle of the picture, so the
welcome is set around it: "Welcome home." above the lampshades, "We've saved
you a seat." just beneath the brass ring, the naming lines clear of the candle
flames. The sizes are tied to screen height so this holds at any desktop size.
The glimpse through the opening door uses the same photograph as the scene it
opens onto.

**Rollback to the approved original on wide screens** (all in
`public/the-unpaved-path/index.html`, each marked `ROLLBACK`):

1. Delete the `<source>` line inside the `<picture>` element.
2. Delete the `.ent-room` line inside the wide-screen door rules.
3. In the wide-screen welcome rules, use the values listed in the comment
   above them.

The earlier London room (`photo-table.webp`) also remains in the repo.

## The personal email

Send individually, never as a bulk campaign. Personalise the greeting and,
ideally, one sentence about why this founder came to mind.

**Subject:** There's a place for you at our table

```
Hi [First Name],

I've been creating something very close to my heart, and as I've thought
about the founders I'd love to bring together, you came to mind.

It's called The Unpaved Path, and it's a little different from the founder
gatherings we're used to.

Rather than trying to explain it all in an email, I wanted to invite you to
experience the idea for yourself.

Open your invitation
https://believestudio.co/the-unpaved-path/

I'd love to hear what you think.

Warmly,
Beth
```

In Gmail, make "Open your invitation" the link text and remove the bare URL
line. Use the same URL for everyone; do not add names or other details to it.
