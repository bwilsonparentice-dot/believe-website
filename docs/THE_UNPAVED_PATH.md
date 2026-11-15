# The Unpaved Path: invitation page

An unlisted, invitation-only page for the inaugural founder gathering concept.
It exists to test genuine interest. It takes no payments and shows no price,
dates, venue, attendees or partners, because none of those are confirmed.

| | |
| --- | --- |
| Live URL | `https://believestudio.co/welcome-home/` |
| File | `public/welcome-home/index.html` (one self-contained file: markup, styles, script) |
| Local preview | `npm run dev`, then open `http://localhost:5173/welcome-home/` |
| Why this address | The public event page lives at `/the-unpaved-path/live`, so the invitation sits at an address that cannot be guessed by trimming that link. Nothing is served at `/the-unpaved-path/` itself. |
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

## The interest form

**Status: connected to Formspree** (`https://formspree.io/f/myeweeor`, free
plan). Notifications go to `hello@believestudio.co`, which forwards to Beth's
inbox. Formspree keeps each submission in the account's history.

**How it behaves**

- The form posts JSON to Formspree from the page; the founder never leaves
  the invitation.
- While it sends, the button is disabled and reads "Sending your note". A
  second click or Enter does nothing.
- The thank-you (addressed by first name) appears only after Formspree
  confirms receipt.
- If the send fails, the page says so kindly, keeps everything typed, and
  offers the email address. Trying again works.

**What is sent:** `firstName`, `lastName`, `name`, `email`, `brand`,
`message`, `source` and a subject line. Nothing financial is ever asked.

**Settings** are in `CONFIG` near the bottom of
`public/welcome-home/index.html`: `formEndpoint` (the Formspree address) and
`contactEmail` (shown if a send fails, and to visitors without JavaScript).
If `formEndpoint` is ever blanked, the form falls back to preparing an email
in the founder's own mail app.

**If a real submission fails:** in Formspree's form settings, check that a
CAPTCHA is not required (it can block a form that submits in place), and that
`believestudio.co` is allowed if a domain restriction is on. The free plan
also stops accepting submissions once its monthly allowance is used.

**Before or at launch:** the site's Privacy page says the website has no
contact forms. That needs updating to mention this form and Formspree.

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

All in `public/welcome-home/index.html`:

| To change | Where |
| --- | --- |
| Invitation wording | the `<main>` section; each passage is plain text in order |
| Dates or venue, once confirmed | the line `England. Three days. An intimate founding circle.` (marked with a comment) |
| The dining room photograph | see "The dining room" below |
| The other two photographs | the `<img>` tags for `photo-closing.webp` and `photo-conversation.webp`; update the `alt` text to match |
| The booking link | the Calendly link just above `</main>`. It opens the dedicated event "The Unpaved Path \| A Founder Conversation", not the site-wide booking event. |
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

## The dining room

One home in two photographs:

| Screen | Photograph |
| --- | --- |
| Wide screens (desktop, landscape tablet) | `public/photos/unpaved-dining-country-wide.webp` (16:9, 1672 x 941, Study 1 Refined colour) |
| Phones and portrait screens | `public/photos/unpaved-dining-country-portrait.webp` (2:3, 1024 x 1536) |

The `<picture>` element in the welcome section chooses between them, and the
glimpse through the opening door (`.ent-room`) uses the same photograph as the
scene it opens onto.

On every screen the welcome is set around the chandelier: "Welcome home."
above the lampshades, "We've saved you a seat." in the calm wall beneath the
brass ring, the naming lines ending before the candle flames. Sizes are tied
to screen height so the words keep their place against the photograph. Each
photograph has its own style block ("Wide screens" and "Phones and portrait
screens"), because the chandelier and candles sit at different heights in
each.

Narrow phones show about the middle 70% of the portrait's width. The framing
leans right (`--room-pos: 62% 42%`) so a phone holds both the navy curtain and
the glow of the fire; the countryside window at the far left is only seen on
wider phones and tablets.

**Colour.** The wide photograph carries the approved "Study 1 Refined" grade.
The ungraded file is kept as `unpaved-dining-country-wide-original.webp`; to
return to it, copy it over `unpaved-dining-country-wide.webp`. The portrait
was generated from the graded photograph and is used as received.

**Rollback.**
- Phones back to a centre framing of the 16:9 photograph: delete the portrait
  `<source>` line and the portrait `.ent-room` rule; the portrait style block
  notes the values that suited that framing.
- Earlier photographs still in the repo: `unpaved-dining-country.webp` (the
  first, nearly square room) and `photo-table.webp` (the London room).

**Sharper masters, if ever available.** Both files are below the density of
the best screens (a 3x phone shows about 0.6 image pixels per screen pixel).
Larger masters of the same pictures can be dropped in under the same names.

## Brief used for the portrait dining room (phones)

Status: **done**. Kept for reference in case the portrait is ever remade.

**How to generate it (ChatGPT Images)**

1. Attach the approved, graded desktop photograph
   (`public/photos/unpaved-dining-country-wide.webp`, Study 1 Refined) as the
   reference image.
2. Ask for a portrait image at the tallest size offered (1024 x 1536, 2:3).
3. Paste the prompt below.
4. If an upscale option is offered, upscale 2x. Send the result as a file.

**Prompt**

> Using the attached photograph as the exact reference, create a new portrait
> (2:3, vertical) photograph of this same English country-house dining room,
> as if the same photographer took a second picture in the same room, at the
> same moment, standing at the near end of the table and turning the camera
> upright. Same room, same furniture, same objects, same architecture. Do not
> redesign anything.
>
> Keep exactly: the long vintage wooden dining table with its worn, planked
> top and turned legs; the cream upholstered dining chairs; the botanical
> cushions; the low, loose arrangement of garden hydrangeas and roses in a
> simple aged ceramic bowl, with natural colour variation within the petals;
> the relaxed place settings with softly folded mauve linen napkins and
> minimal glassware; the brass ring chandelier with cream linen shades; the
> deep navy curtains; the tall dark-framed leaded windows looking onto rolling
> green English countryside; the carved pale stone fireplace with a lit fire;
> the exposed oak ceiling beams; the warm plaster walls.
>
> Composition, top to bottom:
> - Top 12 percent: calm ceiling and a beam, nothing busy.
> - From about 12 to 30 percent: the brass chandelier, centred, complete, and
>   noticeably smaller in the frame than the table. It supports the scene and
>   does not dominate it.
> - From about 30 to 48 percent: a calm, plain band of warm plaster wall
>   across the centre of the image, with no lamps, artwork, flowers or candle
>   flames in it. Lettering will be placed here.
> - From about 50 percent down: the table running away from the camera, with
>   plenty of the wooden tabletop visible. The flowers sit low on the table,
>   their tops no higher than the halfway line. Any candle flames stay below
>   the halfway line.
> - Four to six chairs clearly recognisable along both sides, some only partly
>   in frame. They are not perfectly aligned: one or two are pulled slightly
>   away from the table, and the nearest chair in the foreground is turned a
>   little toward the camera, as if left for someone about to sit down.
> - Left side: the navy curtain and a tall window with the countryside beyond.
>   Right side, if it fits naturally: a glimpse of the fireplace and its glow.
> - Keep everything important within the central 70 percent of the width. The
>   outer edges may be cropped on narrow screens.
>
> Light and colour: late afternoon. Soft natural daylight from the windows,
> with the fire and candles giving a gentle glow. Warm, but not orange or
> golden overall: walls a soft warm ivory, wood a natural mid brown. The
> curtains a rich, deep, elegant navy. Mauve and blush accents understated.
> Not dark, not cold, not grey, not dramatic.
>
> Mood: a beautiful, lived-in English home prepared with care for a small
> gathering of friends. Thoughtfully prepared, never staged. Not a hotel, not
> an event venue, not an advertisement. Do not add flowers, candles, branches,
> greenery, accessories or decorations beyond those in the reference.
>
> No people. No text or lettering. Photographic realism with authentic
> material textures. Eye level, natural lens, no wide-angle distortion.

**Checklist before sending it**

- Is it plainly the same room as the desktop photograph?
- Can you count four to six chairs, with at least one pulled out?
- Is there a clear band of plain wall between the chandelier and the flowers?
- Are the flower tops and candle flames at or below the halfway line?
- Is the chandelier smaller than it is in the current phone view?

**When the file arrives**

Save it as `public/photos/unpaved-dining-country-portrait.webp`, remove the
comment marks around the portrait `<source>` line in the `<picture>` element,
give the doorway glimpse (`.ent-room`) the same file on portrait screens, and
re-check the welcome text positions, contrast and the 21 regression checks.

**Colour.** Use the graded desktop photograph (Study 1 Refined) as the
reference image, so the portrait inherits the same colour.

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
https://believestudio.co/welcome-home/

I'd love to hear what you think.

Warmly,
Beth
```

In Gmail, make "Open your invitation" the link text and remove the bare URL
line. Use the same URL for everyone; do not add names or other details to it.
