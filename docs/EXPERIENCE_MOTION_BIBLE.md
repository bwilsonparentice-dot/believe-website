# The Believe Studio Experience & Motion Bible

*Book Three.*

*The Brand Vision says what the house believes. The Design Constitution says how the
house looks and holds together. This book says how the house **moves** — second by
second, gesture by gesture. It is the choreography.*

*It is not mixed into any build prompt. It is the document to open **every time an
interaction is built** — the equivalent of an Imagineering attraction script or a
Human Interface Guideline, written only for Believe Studio. Colors can be matched.
Typography can be copied. Pages can be rebuilt. A choreographed experience, intended
at this level, is what cannot be copied.*

---

## The three books

1. **Brand Vision** — why the house exists. *(`00-vision-brief.md`)*
2. **Design Constitution** — how the house looks, sounds, and decides. *(`DESIGN_CONSTITUTION.md`)*
3. **Experience & Motion Bible** — how the house moves. *(this document)*

A companion, **Book Four — the Editorial Photography Bible**, specifies every image
(camera, lens, light, composition) and is stubbed at the end of this file.

---

## The First Law of Motion in this house

> **Every movement must have a physical explanation.**

Before anything moves, ask: *what caused it?* Wind? Light? Gravity? A person who just
left the room? If there is no believable physical cause, **it does not move.** Nothing
in this house animates simply because it can.

This law outranks every scene below. The scenes are how the law is honored; the law is
why the scenes exist.

---

## 00 · How to read this book

- **Timings are intentions, not tolerances.** When a scene says *one full second*, it
  means the visitor is given a full second — not "around a second, whatever's easy."
- **Everything here is gated by `prefers-reduced-motion`.** Under it, motion ceases and
  the house is presented at rest — a complete, dignified state, never a broken one.
- **Sound follows the same law as motion** — it exists because a bird exists, a breeze
  exists, a latch releases. It never announces, stings, or cues. It begins only on the
  visitor's first gesture (autoplay respect).
- Each scene notes its **build status** against the current implementation, so this book
  is actionable, not aspirational.

---

## 01 · The Arrival Sequence

**Goal.** The visitor must not feel they have landed on a homepage. They must feel they
have arrived somewhere they were *invited*.

The arrival is one continuous, weighted passage. It is never skippable as a labeled
"exit"; it simply plays, and the visitor may click to move it forward.

### Scene 1 — The reveal *(≈0–2.0s)*
- The screen **fades up from black.** Not white. Not a loading state. **Black.**
- **Morning birds are heard before the image appears.** A Mediterranean breeze is
  almost imperceptibly audible beneath them. (Sound begins on the first gesture; if the
  page loads silent, the first pointer/scroll starts it and the reveal re-cues.)
- Warm morning light **slowly reveals the limestone entrance** out of the black.
- **Nothing moves immediately.** The visitor is given **one full second** to absorb the
  architecture before anything stirs.
- *Build status: partial — the overture currently fades up from limestone cream, not
  from black. **Delta to build:** open on black, hold, then reveal.*

### Scene 2 — The bird *(≈2.0–6.5s, then it stays)*
- **One small bird flies across the screen.** Not dramatically. It must feel completely
  **accidental** — as though it simply happened to cross.
- The bird **gently lands in the olive tree** beside the doorway. On landing, **the tree
  moves slightly** — a small settle, cause and effect.
- The bird **remains there.** No further attention is drawn to it. No glow, no sound
  sting, no repeat. If the visitor never notices it, the house is no poorer.
- *This is the Living World Principle (Constitution §9a) made literal. Build status:
  partial — a bird flies in, but does not land in the olive tree or settle it. **Delta
  to build:** the perch, and the tree's small answering movement.*

### Scene 3 — The curtain *(continuous, from ≈1s)*
- The **linen curtain** within the doorway begins moving **almost imperceptibly** — not
  because an animation started, but **because a breeze exists.** It is never on a loop
  the eye can learn; it drifts and settles on its own, out of phase with everything else.
- *Build status: the SVG-turbulence breeze exists for the threshold; the façade's own
  curtain is not yet independently driven. **Delta:** a per-instance breeze on the door
  curtain.*

### Scene 4 — The handle *(continuous)*
- The **brass handle catches the morning light.** Not brighter. Not a shimmer effect.
  Simply **reflecting the sun naturally**, the way brass does when light moves across it.
- *Build status: baked into the photograph; a faint, slow specular drift may be added.*

### Scene 5 — The click, and the pause *(on interaction)*
- The visitor clicks. **Nothing happens immediately.** This pause is the point.
- **About 200–300 milliseconds later**, the brass handle **slowly turns.** The **latch
  quietly releases** — a soft, physical sound, not a UI click.
- *Build status: not yet — the current arrival begins its warm bloom on click without
  the deliberate 200–300ms held beat, the handle turn, or the latch. **Delta:** the
  held beat, the turn, the latch sound.*

### Scene 6 — The door *(weighted, ≈1.6–2.4s)*
- The **oak door opens.** **Heavy doors do not swing** — the movement is **weighted**,
  slow to start, slow to settle.
- The door opens **only enough to suggest welcome.** **Warm light spills across the
  limestone.**
- **Never reveal the entire room. Mystery must remain.**
- *Build status: partial — the façade door now eases open a crack of warm light that
  widens and breathes (a light-shaft on the baked door). **Delta:** couple the crack's
  widening to the weighted-door timing and the latch of Scene 5, so light follows the
  handle.*

### Scene 7 — Three quiet steps *(≈1.5–2.5s)*
- The camera **slowly walks forward.** **Not a zoom — a walk.** As though someone takes
  **three quiet steps** into the house. A gentle, uneven forward drift with the faint
  parallax of walking, not the mechanical push of a scale transform.
- *Build status: not yet — the current transition washes to the sketch/interior. **Delta:**
  replace the wash with a short walked-forward move before the interior resolves.*

### Scene 8 — The house begins
- The homepage — the building — **begins.** The visitor is now *inside*, and the walk of
  rooms is theirs.

> Now imagine doing that for every room. Below, each does.

---

## 02 · The House — how the world behaves

The physics of the house, applied everywhere. These are the "believable reasons" the
First Law asks for.

**Light.**
- Light is **directional and tied to a time of day.** It falls from a knowable source
  and **migrates slowly** across a surface, as the sun would (reference: slow sweeps over
  ~50–170s). A gradient that merely sits is decoration; light *moves*.
- Light **warms toward the thresholds and doorways** — the interior is always a little
  warmer than the wall, because there is life inside.
- Aspiration: one directional sun advances across the whole procession — **dawn at the
  door, toward dusk at Private Advisory** — so the visitor feels time pass as they walk.

**Shadow.**
- Shadows are **dappled and soft**, cast by things that exist off-frame — olive leaves,
  a curtain, a mullion. **Dappled leaf-shadow drifts** because the branch that casts it
  sways; the two always move together, never independently.
- Shadows deepen at the edges of rooms so the center — where the visitor's attention
  rests — stays luminous.

**Objects.**
- Objects move **only from a cause:** a page lifts because of a draft; steam rises
  because coffee is hot; a curtain breathes because of wind; a chair sits askew because
  **someone just stood up.** Dust is visible only **in the strongest shaft of light.**
- Movement is **almost imperceptible and unsynchronized.** Two things never move on the
  same clock. Silence between movements is long and uneven.

---

## 03 · Room Transitions — moving through the house

- **Between rooms (the walk-through):** vertical passage is a **walk down a hall**, not a
  scroll through a feed. Each room holds the full height; entering the next is arriving in
  a new volume. Per the Constitution, **rooms differ in proportion and light**, so passage
  is *felt as changing volume*, not read as changing text.
- **Entering a room's chapter (a door opens):** the overlay resolves **into focus** —
  blur and warmth clearing — as though stepping from a bright hall into a room whose light
  your eyes adjust to. It is a threshold crossed, never a modal popping.
- **Leaving a chapter:** the room recedes and the hall returns; the visitor is set back
  down **where they were standing**, never dropped at the top.
- **First reveal of the building:** only the Threshold is shown, held, until the visitor
  chooses to go deeper — a single breathing cue near the floor invites, never instructs.
- **Departure (site-wide):** the house has a grand door in; it must have a door out. The
  final beat **quiets the light** and leaves one line — *"The door stays open."*

---

## 04 · Microinteractions — the small, honest gestures

Every tiny interaction obeys the First Law and the restraint of the house.

- **Links & labels:** on hover, a link **warms** (color deepens toward brass) and its
  hairline underline settles in — a 350–500ms ease, never an instant snap, never an
  underline that *slides*. The change is a candle brightening, not a switch flipping.
- **The reveal cue:** a single chevron near the floor **breathes** (slow opacity, ~4.6s)
  — the house inhaling. It never bounces or pulses insistently.
- **Cursor:** ordinary. The house does not replace the cursor with a novelty; it is a
  place, not a toy.
- **Buttons / "begin" affordances:** on hover, a **2px lift** at most, and a warming —
  the object catching a little more light as a hand approaches. No shadow bloom, no color
  flip.
- **Sound triggers:** the ambient bed begins on the **first gesture**; the door latch
  (Scene 5) sounds once, from the physical release; the dream passage plays once, only
  during the door-drawing. Nothing loops audibly. Everything is dismissible.
- **Photograph replacement (authoring):** the "replace photo" affordance is a quiet
  corner control, present for the founder, invisible in spirit to the guest.
- **Focus (keyboard):** a **warm brass focus ring**, on-brand and clearly visible — the
  house receiving a guest who arrived by keyboard with the same courtesy.
- **Escape / back:** always available, always quiet, always returns the visitor to where
  they stood.

---

## 05 · Motion Rules — what must NEVER happen

These are absolute. A single violation reads as "software," and the spell breaks.

- **Never bounce.**
- **Never pulse** (no attention-seeking throb).
- **Never spin.**
- **Never ease-back/overshoot** (no springy settle).
- **Never animate simply because something *can* animate.**
- **Never move two things on the same synchronized clock.**
- **Never loop on a cadence the eye can learn.**
- **Never reveal the whole interior at the threshold** — mystery remains.
- **Never a zoom where a walk is meant.**
- **Never a UI "ding"** — sound comes from physical causes only.
- **Never strobe, never parallax-on-scroll for its own sake, never a marquee.**
- **Never override the visitor's request for stillness** (`prefers-reduced-motion`).

**The test, every time:** *If something moves — what caused it? Wind, light, gravity, or
a person who just left? If there is no believable reason, do not animate it.*

---

## Per-room motion scripts

Each room is scored as carefully as the arrival. What moves, and its cause.

### The Library
The visitor enters. **Sunlight falls across the books.** **Dust floats** in the one
strong shaft. **One page moves slightly** (a draft from the open window). A **reading
ladder casts a slowly changing shadow** as the light migrates. **Nothing else moves.**

### The Founder's Table
**Coffee steam rises** (it is hot). **A page corner lifts** (a draft). **One chair sits
slightly away from the table** — as though **someone just stood up.** The room is warm
and recently left.

### Private Advisory
**Nothing moves. Almost.** **Only the curtain**, because a breeze exists. Here, **silence
is the interaction.** No dust theatrics, no drifting light show — the restraint *is* the
content.

### The Founder's Room
Half in shadow, half in light. The **curtain breathes** at the tall window; the **light
holds** the empty chair. The room waits for a person, and says so by staying still around
the one place a person would sit.

### Field Notes
The **notebook lies open**; a **page lifts and settles** (draft). A pen rests where it was
set down. The linen note-cards are still — they are *kept*, not performed.

### The Studio
The busiest room, and still quiet. **Sketches on the pinboard stir faintly** at their
corners (a draft through the arched window). **Dust drifts** in the window light. Nothing
is finished; nothing rushes.

### The Stage
The quietest before it matters. **Warm light gathers on the empty podium** as the visitor
approaches (light responding to arrival, per the stage warm-in). The chairs are still,
arranged, waiting. Light is the only motion, and it *grows*.

### The Garden
**Olive leaves drift.** Light moves across stone. **Water catches the morning** and
returns it in slow ripples. Nothing is produced here; the only motion is the world
breathing.

### The Believe Blueprint
Still. Architectural. If anything moves, it is the **light crossing the drawing** — as a
draftsman's lamp would, slowly, revealing a line at a time. The document is calm because
the thinking beneath it is calm.

---

## Reduced motion — the house at rest

Under `prefers-reduced-motion`, the house is presented **at rest**: birds do not cross,
dust does not drift, curtains hang still, light does not migrate, the door shows a still
sliver of warmth rather than easing open. Every scene above has a **defined resting
frame** — the single most composed still of that scene — and that frame *is* the
experience for a visitor who asked for stillness. Stillness is first-class, never a
degraded fallback.

---

## Build status — the deltas, gathered

For the team, the concrete gaps between this book and the current build, in the order
they would most deepen the arrival:

1. **Open on black**, birds-first, then reveal the limestone (Scene 1).
2. **The bird lands in the olive tree** and the tree settles (Scene 2 · §9a).
3. **The click → 200–300ms pause → handle turns → latch releases** (Scene 5).
4. **Couple the door's crack** to the weighted-door timing and the latch (Scene 6).
5. **Three walked steps forward**, not a wash, into the interior (Scene 7).
6. **The door's own curtain** driven by its own breeze (Scene 3).
7. **One directional sun** advancing dawn→dusk across the walk (§02).
8. **The per-room object scripts** above, each with its single physical cause.

Everything else in this book — the breeze, dust, distant birds, slow light, the
reduced-motion resting frames, the microinteraction eases — is already honored in the
current implementation and should be *preserved*.

---

## Book Four — the Editorial Photography Bible *(stub)*

A companion book: **every image gets its own specification** — the arrival door, the
Library, the Founder's Room, the Table, Private Advisory, the Blueprint, and the rest.
Each entry fixes the **subject, camera angle, lens, lighting condition, materials in
frame, what is implied (the absent founder), and what must never appear** (no stock, no
teams, no laptops). It is the visual twin of this motion book: this one choreographs
time, that one composes light. *To be authored next, on request.*

---

*The magic is not in the colors, the type, or the pages. It is here — in choreographing
the experience with this level of intention. Guard this book accordingly.*
