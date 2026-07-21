# Believe Studio — The World Map

> Believe Studio is a house for founders, not a website.
> *If it feels more like branding than architecture, choose architecture.
> If it feels more like marketing than hospitality, choose hospitality.*

A single-page, cinematic, editorial web experience. The visitor arrives at a
limestone doorway, crosses a slow ritual (door drawing → threshold → building),
then wanders a series of rooms — each a chapter in a founder's journey. Architecture
over navigation, hospitality over marketing, restraint over decoration.

This project was recreated in React + Vite + TypeScript from the Believe Studio
design (the source of truth for copy, layout, color, timing, and interaction).
Motion (SVG turbulence, dust, birds, slow light) and sound (a synthesized
Tuscan-dawn ambience and a dreamlike door passage — no audio files) are generated
in-code, and everything respects `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## The experience

1. **Overture** — the limestone doorway fills with morning light; a bird flies in;
   *"Come in."* … *"We've been expecting you."* Click (or wait) to enter.
2. **The sketch** — an arched doorway is drawn line-by-line in charcoal, then cracks
   open as warm light floods; a dreamlike passage plays.
3. **The building** — the Threshold room fills the screen; a quiet chevron invites you
   deeper. Click to release the rest of the rooms and walk the house:
   Threshold → The Founder's Room → Field Notes → The Library → The Table →
   The Studio → Private Advisory → The Stage.
4. **Rooms & chapters** — each room opens into an editorial overlay; the brass footer
   directory and in-room links open the full chapters (Founder's Room, Blueprint,
   Table, Library, Inside the Studio, Private Advisory, The Stage, The People, The
   Stories, Work With Believe Studio, The House, Field Notes, and the vision of the
   houses to come).

## Structure

```
src/
  App.tsx               phase state machine · overture · sketch · building · room overlay
  data.ts               every room, artifact, principle, person, and word
  index.css             global styles + the full keyframe vocabulary
  lib/
    audio.ts            the synthesized Web Audio engine
    motion.ts           the living breeze + distant birds
    El.tsx              a hover-aware element (mirrors the source's style-hover)
    ctx.ts              the house's navigation contract
  components/
    ImageSlot.tsx       photography drop-in with an art-directed placeholder
    Motes.tsx           dust made visible in the strongest light
    ChapterShell.tsx    the shared chapter overlay chrome
    Footer.tsx          the brass directory
  chapters/             the full-screen chapter overlays
```

## Photography

Real photography is optional — see [`public/photos/README.md`](public/photos/README.md).
The house is fully furnished with warm, art-directed placeholders until real images
are dropped in.
