# Create Believers — how it works and how to run it

Create Believers lives at **believestudio.co/create-believers**. It is part of the
existing website, not a separate app.

## The pages

| Address | Who it is for | What it does |
| --- | --- | --- |
| `/create-believers` | Everyone | The public page: positioning, the host and founder paths, how it works, questions. |
| `/create-believers/host` | Hosts | The four-step gathering application. |
| `/create-believers/founders` | Founders | The short founder inquiry. |
| `/create-believers/brands` | Everyone | Published brand profiles, with search and filters. Shows a "first brands are on their way" message until one is published. |
| `/create-believers/g/<name>` | Guests | A guest page for one gathering: brand story, serving idea, confirmed places to buy. Unlisted. |
| `/create-believers/recap/<key>` | A host | The recap form, reached by a private link for one brand at one gathering. Unlisted. |
| `/create-believers/workspace` | Believe's team | The private workspace. Sign-in required. |

## Where information goes, and who can see it

Applications, founder inquiries, recaps, and all of Believe's notes are stored in
a private database (Supabase, in the Believe Studio organization). Nothing private
is stored in the website's files, in this repository, or in a visitor's browser.

- **Visitors** can send a form and read published brand profiles and open guest
  pages. They cannot read any record.
- **Team members** sign in at `/create-believers/workspace`. The database itself
  checks that the signed-in person is on the team list before returning anything,
  so the page address and the page's code give no access on their own.
- **To add or remove a team member**, see `supabase/first_setup.sql`. For the
  pilot, access is limited to Beth and the people she explicitly authorizes.
  Founders and hosts never need a sign-in: founders are sent a copied summary,
  and hosts use the public form and a private recap link.
- **A host's contact and delivery details stay private during matching.** Before
  giving any of them to a brand or a fulfilment partner, tell the host exactly
  what will be shared and with whom, get their permission, and record it on the
  partnership under **Sharing the host's details**.
- **Photos:** showing photos publicly and reuse in marketing by Believe Studio
  or the brand are two separate permissions, asked on the application (as an
  offer) and again on the recap (for the actual photos). Receiving photos
  grants neither.

The site is built with two settings, the database's address and its *publishable*
key. Both are designed to be public. The secret key is never used by the website.

## Routine work in the workspace

### Review an application
1. Open **Overview**. New applications are under **Needs review**. Choose one.
2. Read **The application**. Under **Your working notes**, set the status
   (Reviewing, Needs information, Approved, Declined…), add an owner, a next
   action, and notes. Press **Save changes**.
3. Tag the gathering's **Audience interests** (for example `reading, gardening`).
   These make it findable and feed the audience part of the fit score.

### Find a host or a gathering
Use the **Hosts** or **Gatherings** tab. The search box looks through names,
organizations, cities, states, gathering names, categories, tags, and notes.
**Filters** narrows by status, type, state, guest numbers, dates, and delivery
date. **Export this view (CSV)** downloads exactly what is listed.

### Add and publish a brand
1. **Brands → Add a brand.** It starts as a private draft.
2. Fill in what you know. Leave a field blank when something is not yet known;
   blank means "unknown", never "none". A founder inquiry can be turned into a
   draft from **Founder inquiries → Start a draft brand profile from this**.
3. Add at least one **Product** (case pack, ingredients, allergens).
4. Ask the founder to approve taking part and the public profile as written.
   Record the date under **Founder approved taking part on**. Until that date
   is set, the profile cannot be shown to visitors and is never suggested as a match.
5. To publish: set **Profile state** to **Approved**, tick **Show this profile
   on the public brands page**, and save. To take it down, untick the box or set
   the state to Paused.

Only the Public profile section is ever shown to visitors. Costs, stock,
contacts, and notes stay private.

### Approve a match
1. Open the gathering. **Suggestions** lists up to three brands that meet every
   practical requirement on file, each marked *Suggested—awaiting review*, with
   reasons, open questions, quantity, and estimated cost. Brands that are missing
   information are listed under **Needs information**, and are never passed.
2. Press **Link for review** (or choose any brand under *Link a brand yourself*).
   This creates a partnership in **Reviewing**. Nothing is reserved and nobody
   is notified.
3. On the partnership, **What the host has offered** lists the visibility,
   recap, photo-use, and shipping commitments from the application. Use **Copy
   this summary for the founder** to send it (it leaves out the host's name,
   contact details, and postal code).
4. When the founder agrees, record the date under **Founder approval**. A
   partnership cannot be moved to Approved without it.
5. Read the **Requirements checklist**, confirm stock and budget, set the
   approved quantity and the agreed commitments, then set the status to
   **Approved** and save. If the checklist still has open items you are asked
   to confirm first.
6. Move the status by hand as things happen: Preparing → Shipped → Delivered →
   Gathered → Recap received → Closed. Local pickup or delivery can skip Shipped.

A gathering can have several brands. Each is its own partnership with its own
status, costs, and recap.

**Stock is managed by hand.** The numbers on a brand are what was last typed in.
The checklist subtracts what is already promised to other approved gatherings,
but always verify with the founder before approving.

### Set up a guest page and QR code
On the gathering, under **Guest page**, give it a web address name (for example
`winter-book-club`), tick **Guest page is open**, and save. The page lists each
brand once its partnership is Approved, and only purchase links that have a
"verified on" date. A QR code appears once the page has something to show. Test
it with a phone before printing.

The page counts **page views** and **clicks on purchase links**. A page view is
not a guest, and a click is not a purchase. Nothing about individual guests is
recorded.

### Review a recap
1. On an approved partnership, copy the **Recap** link and send it to the host
   after the gathering.
2. When the host submits it, the partnership appears on **Overview → Recaps**.
   Open it to read the recap, add your notes, and set the status to **Recap
   received**.

Attendance, tastings, and purchases in a recap are the host's own account and
are labelled that way. Photo permission is recorded separately from the photos.

### A recurring gathering
Each date is its own record linked to the same host. On a gathering, use **Add
another date of this gathering**, then set the new date.

## What the matching aid does and does not do

It checks, in order: profile approved, product category, category conflicts,
geography, delivery lead time, availability dates, quantity and stock, storage,
dietary and allergen notes, required visibility, and budget. Any failed check
makes a brand *not eligible*; any check that cannot be made makes it *needs
information*. Only eligible brands get a fit score out of 10 (audience 0–3,
occasion 0–3, priority market 0–2, extras 0–2). Those weights are an initial
working choice for comparing options. They are not a prediction of sales, and
you can overwrite the score on any partnership.

## Not included in this first version

Automatic emails or outreach, payments, host or brand logins, automatic
approvals, shipping integration, a full inventory system, photo uploads (hosts
paste a link), and guest email sign-up (no mailing list is connected).

## For whoever maintains the site

- Code: `src/create-believers/`. Database: `supabase/migrations/`.
- Fixed choices (gathering types, statuses…) live in `options.ts` and must match
  the lists in the migration.
- Illustrative preview data: `demoData.ts`. It is used only when the connection
  settings are absent in local development or a preview build
  (`VITE_CB_PREVIEW=1`), and every use is labelled.
- Checks: `npm run test:create-believers` (form, matching, search, export
  logic) and `supabase/tests/run-local.sh` (access rules and server-side
  validation, against a local Postgres).
- Connection settings: `VITE_CB_SUPABASE_URL` and `VITE_CB_SUPABASE_KEY`. Locally
  in `.env.local`; for the live site as the GitHub repository variables
  `CB_SUPABASE_URL` and `CB_SUPABASE_KEY` (Settings → Secrets and variables →
  Actions → Variables). Without them, the forms show as not yet open.
- First-time database setup: apply `supabase/migrations/0001_create_believers.sql`,
  then follow `supabase/first_setup.sql`.
