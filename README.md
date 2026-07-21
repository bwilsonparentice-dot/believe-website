# Handoff: Believe Studio — The World Map

## Overview
Believe Studio is a single-page, cinematic, editorial web experience — a "house for founders" rather than a marketing site. The visitor arrives at a limestone doorway, crosses a slow ritual (door drawing → threshold → building), then wanders a series of rooms, each of which is a chapter in a founder's journey. It is deliberately un-website-like: architecture over navigation, hospitality over marketing, restraint over decoration.

Guiding principle (from the client, honor it in every decision):
> If it feels more like **branding** than **architecture**, choose architecture. If it feels more like **marketing** than **hospitality**, choose hospitality. This is not a website inviting people to buy something. It is a house inviting founders to belong.

Aesthetic references: Aman Hotels, John Pawson, Axel Vervoordt, Hermès, Kinfolk, Cereal Magazine, Tadao Ando. Materials: limestone, walnut, linen, brushed brass, cotton paper, warm morning light, silence.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, motion, sound, and behavior. They are **not production code to copy directly**.

The prototype is authored as a single "Design Component" (`.dc.html`) that runs on a small proprietary runtime (`support.js`) using a template + logic-class pattern. **Do not port the runtime.** The task is to **recreate this experience in the target codebase's environment** (recommended: **React** + a motion library such as Framer Motion, or plain TS + GSAP for the timeline-heavy sequences), using its established patterns. If no environment exists yet, React + Vite + TypeScript is a good default for this kind of highly-animated single-page experience.

The `.dc.html` is the source of truth for **copy, layout, color, timing, and interaction**. Read it alongside this README.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, motion timings, and sound design are all present and intentional. Recreate pixel- and timing-faithfully. Where this README and the HTML disagree, the HTML wins.

## Architecture of the Experience

### Phased opening ritual (state machine)
A single `phase` variable drives the arrival. Sequence:
1. **`overture`** — full-bleed limestone façade photo (`facade.png`). Olive leaves drift (SVG turbulence breeze), one blue bird flies in. After ~1s, two lines fade in centered near the doorway: **"Come in."** then (after a pause) **"We've been expecting you."** No buttons. A brass key rests on the step is NOT shown (removed). Ambient audio: Tuscan-dawn bed (soft breeze, occasional distant bird, silence-dominant), started on first pointer interaction.
2. Click anywhere → the scene warms, the door eases open, scene washes to cream.
3. **`sketch`** — a hand-drawn arched doorway is drawn line-by-line in charcoal on cotton paper (SVG stroke-dashoffset animation, ~large arched door with dimension annotations). It then cracks open (foreshorten, not tilt) as warm light floods. A dreamlike music passage plays here (soft Dmaj9 pad + floating bell/celesta melody blooming into feedback delay). Auto-advances — no click needed.
4. **`threshold`** — brief "You already had the key" concept was REMOVED; flow goes straight to the building.
5. **`map`** — the building. On first arrival, **only the Threshold room is shown, full-bleed, clipped** (the container is `height:100vh; overflow:hidden`). A single quiet breathing chevron cue sits near the bottom. Clicking anywhere reveals the remaining rooms below (`overflow` released) and smoothly scrolls to the next room (The Founder's Room). Normal vertical scroll continues from there.

Respect `prefers-reduced-motion` (disables breeze, birds, dust, light drift) and a boolean "light motion" tweak.

### The building (walk-through rooms)
A vertical sequence of full-height `<section>`s, each id `room-<id>`, in this emotional order:
**Threshold → The Founder's Room → Field Notes → The Library → The Table → The Studio → Private Advisory → The Stage**
(The Garden section was removed from the walk-through.)

Each room = a full-screen editorial photograph (arched/rounded framing on a cream margin, slow zoom + almost-imperceptible "breathe" + per-room light color) with a short kicker, title, whisper line, and — on the classic variant — body paragraphs, keywords, a per-room emotional artifact, and a quiet invitation link *"Ready to begin? Explore how founders work with Believe Studio →"* that opens the Work chapter. Rooms have per-room personality variants (e.g. The Table shows one provocative question; Field Notes shows worn linen-paper note cards; The Studio shows unfinished-work tiles).

### Chapters (full-screen overlays, opened from footer or in-room links)
Each is a fixed, scrollable cream overlay with a "Back to the building" affordance and Escape-to-close. Opening one closes all siblings. Chapters:
- **The Founder's Room** — philosophy → promise → **The Believe Blueprint** (hero artifact) → How We Work Together → Ways to Begin → rhythm → Founder Letter → membership.
- **The Believe Blueprint** — standalone chapter; shares the same master artifact image (`blueprint-artifact` slot). "Begin Your Blueprint" → Founder's Room.
- **The Table** — arched header (`photo-table.png`); opening, a reflection question, "What happens here" (four *Sometimes…* observations), an anonymous "Left here after a conversation" quote, "Around this table", caretaker Jillian Waun, artifact "The Empty Chair" (Listen · Question · Decide · Build), close *"Your chair is waiting."*
- **The Library** — arched header (`photo-library.png`); poetic opening, Shelf One "the books we return to", Shelf Two "Left in the Margins" (anonymous fragments), Shelf Three "Founder Objects" (archive artifacts, arched photos `archive-00X.png`, brass key `key-photo.png`), Shelf Four "Who Keeps the Shelves" (caretakers, links to People), Shelf Five "Field Notes", Shelf Six "The House Archive", artifact "The Ladder", close *"Close the book. Keep building."*
- **Inside the Studio** — Resident Experts as editorial "An Evening at The Studio" chapters (bronze dividers, no boxes). Each resident belongs to a room. Nick Huggins (Fractional CFO), etc.
- **Private Advisory** — the quietest, most restrained chapter. No people, no photos, no social proof. "Trust isn't announced. It's earned quietly." → why it exists → "What happens here" → "In confidence" → subject list → artifact **Trust · The Threshold / The Private Door / Some conversations deserve a room of their own.** → close → "Request a Private Conversation".
- **The Stage** — "Every meaningful company eventually steps into the light." → The Moments (A Founder's First Yes · Around the Table · **Beyond the House** · Stories Worth Sharing) → quote → artifact "The Spotlight" → a growing gallery of arched drop-in image slots → "See What's Unfolding →".
- **The People of Believe Studio** — editorial portraits in arched niches. Each intro is a story: *"You'll probably meet [Name]… [when]"* then belief narrative. Beth, Joy, Jillian, Tiffany, Mona.
- **The Stories** ("Voices from the House") — founder statements: portrait, one quote, name, company (Michelle, Snehee, Lee, April).
- **Work With Believe Studio** — the single "front desk". "Begin your journey" → four paths (Believe Blueprint™ / The Founder's Room / Private Advisory / Inside the Studio) each with "for whom" + CTA, then Visionary Collective as a "Stay connected" layer.
- **The House** — the philosophy/about chapter.

### Footer — the brass directory
A landscape brushed-brass plaque image (`directory-plaque.png`) with its baked-in (garbled) engraving muted by a brass wash; real crisp clickable text is overlaid on top, in three columns: **ROOMS**, **BEGIN HERE / WORK WITH US**, **THE JOURNAL**. Above it: the philosophy breath ("No founder walks the same path — yet every room leads toward greater clarity. Come in. We've been expecting you. The door has never been locked.") and six engraved values (Arrival · Belonging · Clarity · Craftsmanship · Curiosity · Confidence). Closes with *"The house is always open."* and *"Return to the door"* (replays the ritual).

## Interactions & Behavior
- **Opening ritual**: auto-timed phase machine (see above). Click advances overture→sketch region; sketch auto-advances; map reveal on click.
- **Room reveal**: first map view clips to Threshold only; click sets `roomsRevealed=true`, releases overflow, smooth-scrolls to `#room-founders`.
- **Chapters**: open via footer/in-room links; each open closes siblings; Escape or "Back to the building" closes; body scroll retained per overlay.
- **Motion** (all gated by reduced-motion + light-motion flag):
  - Olive leaves / curtains: SVG `feTurbulence` + `feDisplacementMap`, JS-animated `baseFrequency` (two out-of-phase slow drifts). Applied ONLY to the threshold/façade & each room's own photo via a per-instance filter (shared filters don't repaint — give the room card its own `#breeze2`). Keep displacement subtle (scale ~6–9) and oversize the image slightly to avoid transparent edge bleed.
  - Room photos: `slowZoom` (18s ease-out) then perpetual `roomBreath` (~32s) + per-room light-color overlay + slow light migration.
  - Dust motes drift in strongest light shafts (cover + rooms).
  - Distant birds: imperative layer over the map — real gull/blue-bird crossings at random height/size/speed/direction/opacity; sometimes one, sometimes a loose pair, sometimes nothing for up to ~3 min; non-looping, unsynchronized wingbeats; disabled under reduced-motion / hidden tab / motion-off.
- **Sound** (Web Audio, synthesized — no audio files): ambient Tuscan-dawn bed; door-open dream music (pad + bell melody + feedback delay), plays once, only during the sketch/door sequence. Started on first user interaction (autoplay policy).

## State Management
- `phase`: `'overture' | 'sketch' | 'threshold' | 'map'` — drives the ritual.
- `roomsRevealed`: boolean — map clips to Threshold until true.
- `justEntered`, `opening`, `walk`, `activeId` — ritual/room bookkeeping.
- One boolean per chapter overlay: `showHouses, showPeople, showStudio, showFounderRoom, showStories, showHouse, showLibrary, showBlueprint, showFieldNotes, showTable, showWork, showAdvisory, showStage`. Opening any calls a "close all siblings" reset.
- Tweaks (props): light-motion boolean; veil mood (Warm dusk / Cool dawn); show-guide boolean.
- Persist nothing to localStorage except (optionally) whether the ritual has been seen; never clear existing storage.

## Design Tokens
**Color**
- Cream page / veil: `#efe6d3`; warmer cream `#e2d7bf`; near-white paper `#fbf7ee`→`#f3ecdd`→`#ece3d1`.
- Ink / text: `#2b2723`; muted text `rgba(43,39,35,0.6–0.9)`.
- Brass / bronze accent: `#7a5e34`, `rgba(122,94,52,…)`; brighter brass `#9c7a3f`, `#c8a24e`, `#e6c986`, engraved plaque browns `rgba(74,54,22,…)`, `rgba(58,42,16,…)`.
- Footer / dark ground: `#161613`.
- Kicker gold on dark: `rgba(236,209,147,…)`.
- Cream text on photos: `#f6efe4`.
- Per-room light colors via `oklch(0.62 0.09 <hue>)` with matching `/0.22` glow (each room a different hue).

**Typography**
- Display / serif: **Cormorant Garamond** (weights 300/400/500; italic used heavily for whispers & closings). Room titles `clamp(40–46px, 6–7vw, 92–104px)`, line-height ~1.0.
- Label / sans: **Jost** (weights 300/400/600) — uppercase kickers, `font-size:10–12px; letter-spacing:0.32–0.6em; text-transform:uppercase`.
- Handwriting: **Caveat** — used for "left in the margins" / anonymous notes.
- Body copy: Cormorant Garamond 300, `clamp(17–20px, 1.9–2.3vw, 23–30px)`, line-height 1.6–1.9, `text-wrap:pretty`; short statement lines use `text-wrap:balance` and tight `ch` max-widths for intentional emphasis.

**Spacing / layout**
- Chapter container max-width ~760–940px, centered, big vertical padding `clamp(90px,16vh,190px)` top.
- Vertical section dividers: 1px hairline, `linear-gradient(180deg, rgba(122,94,52,0.4), transparent)`, height `clamp(44–56px, 7–10vh, 88–120px)`.
- Room photo framing: arched top via `border-radius:999px 999px 6px 6px` (portraits/objects) or large clamp radii (headers).

**Motion timings**
- Word fade-in ~2.4s; door draw multi-second; slowZoom 18s; roomBreath ~32s; light sweep ~52s; breeze drift ~24s; veilIn 700–1800ms; chapter contentFocus ~950ms.

## Assets (included in this bundle)
- `facade.png` — limestone façade / arrival hero.
- `photo-threshold.png`, `photo-room.png`, `photo-library.png`, `photo-table.png`, `photo-fieldnotes.png`, `photo-stage.png`, `photo-advisory.png`, `photo-garden.png` — room photographs (garden currently unused in walk-through).
- `key-photo.png`, `key-cut.png`, `key-src.png` — the brass Believe key (photo, transparent cutout, source).
- `archive-002.png … archive-006.png` — Library "Founder Objects" archive photographs.
- `directory-plaque.png` — brass footer directory plaque texture (its baked-in engraving is AI-garbled; overlay real text, don't rely on the image's lettering).
- Fonts: Cormorant Garamond, Jost, Caveat (Google Fonts).
- All motion imagery/sound is generated in-code (SVG filters, Web Audio) — no video/audio asset files.

## Files
- `Believe Studio - World Map.dc.html` — the complete prototype (template markup + logic class). Source of truth. ~2500 lines. Read the logic class near the bottom for the room/chapter data getters (`DATA`, `EXTRAS`, `LIBRARY_BOOKS`, `STUDIO_NIGHTS`, `advisorySubjects`, `stageMoments`, `workPaths`, etc.) and the `renderVals()` method.
- `The Language of Believe Studio.dc.html` — companion "living vocabulary" document (Threshold, The Room, Catalyst, Field Notes, The Table, The Garden, The Studio, The Stage, The Library, Private Advisory). Linked from the footer.
- `support.js`, `image-slot.js` — proprietary runtime + a drag-and-drop image-slot web component. **Reference only — do not port.** Replace image-slots with your codebase's image components; the user fills real photography in later.
- `CLAUDE.md` — the guiding principle, restated.
