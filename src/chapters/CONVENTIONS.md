# Chapter conversion conventions

You are porting one or more **chapter overlays** from the design source of truth
(`/home/user/believe-website/.design-reference/world-map.dc.html`) into React + TypeScript
components. The `.dc.html` is authored on a proprietary runtime (`sc-if`, `sc-for`, `{{ }}`);
**do not port the runtime** — translate to plain JSX. The HTML is the source of truth for
copy, layout, color, spacing, and timing. Recreate it faithfully.

## File & export shape

Each chapter is one file `src/chapters/<Name>.tsx` exporting:

```tsx
import React from 'react'
import { El } from '../lib/El'
import type { Ctx } from '../lib/ctx'
import { ChapterShell, BackPill, ArchMark, Divider } from '../components/ChapterShell'
import { ImageSlot } from '../components/ImageSlot'
// import needed data from '../data'

export function <Name>Chapter({ ctx }: { ctx: Ctx }) {
  return ( ...jsx... )
}
```

The component is **only mounted when open** — do NOT wrap in a conditional or `sc-if`.
Escape-to-close and closing sibling chapters are handled globally in `App`; do not add them.

## Translating the markup

- `style="a:b; c:d"` → `style={{ a: 'b', c: 'd' }}` (camelCase keys; keep clamp()/vw/vh string values verbatim).
- `style-hover="x:y"` → put the base style on an `<El>` and pass `hover={{ x: 'y' }}`. Use `<El>` only for elements that had `style-hover` (links, buttons, cards). Plain `<div>` otherwise.
- `onClick="{{ handlerName }}"` → `onClick={ctx.handlerName}` (see handler list). A backdrop close on the outermost div maps to the chapter's `ctx.close…`.
- `<sc-for list="{{ x }}" as="item">…</sc-for>` → `{x.map((item, i) => (<... key={i}>…</...>))}`.
- `<sc-if value="{{ item.foo }}">…</sc-if>` inside a loop → `{item.foo && (…)}`.
- HTML entities: write the real unicode char in JSX text (—, ’, “, ”, →, ·, ™). For `&nbsp;` use `{' '}` or `&nbsp;`.
- `<image-slot id=".." placeholder="text ..." src="..." style="..">` → `<ImageSlot placeholder="text …" style={{…}} />` (drop `id`; omit `src` unless a real photo path is intended — the placeholder stands in).
- `text-wrap:pretty|balance` → `textWrap: 'pretty' as React.CSSProperties['textWrap']`.
- Numeric CSS values are fine as numbers (`fontSize: 11`) or strings; keep `clamp(...)`/percentages as strings.

## Shared chrome

Most chapters are a full-screen scrollable cream overlay with a corner "← Back to the
building" and a centered content column. Use `ChapterShell`:

```tsx
<ChapterShell onClose={ctx.closeX} background="#efe6d3">
  <div style={{ position: 'relative', maxWidth: 940, margin: '0 auto', padding: 'clamp(90px,16vh,190px) 6vw clamp(70px,14vh,170px)', textAlign: 'center', color: '#2b2723', animation: 'contentFocus 950ms cubic-bezier(.2,.7,.2,1) both' }}>
    <ArchMark />
    … content …
    <Divider />
    <div style={{ textAlign: 'center' }}><BackPill onClose={ctx.closeX} /></div>
  </div>
</ChapterShell>
```

- `ChapterShell` already renders the fixed top-right "← Back to the building". Match the
  reference's `background` color for that chapter (e.g. Field Notes uses `#ece2cd`).
- `ArchMark` = the small brass arch `<svg>` that heads chapters.
- `Divider` = the 1px vertical hairline used between sections (`h`/`m` props to adjust).
- `BackPill` = the bordered "Back to the building" button at the foot.
- Some chapters (Houses, ReceiveKey) are **centered modals** with a translucent backdrop and
  a backdrop-click close, not the scrollable shell — for those, replicate the reference's
  outer `<div>` directly with an `onClick={ctx.close…}` backdrop and `onClick={stop}` inner
  (`import { stop } from '../lib/El'`).

## Ctx handlers (all `(e?) => void`)

openFounderRoom closeFounderRoom · openBlueprint closeBlueprint · openTable closeTable ·
openLibrary closeLibrary · openStudio closeStudio · openAdvisory closeAdvisory ·
openStage closeStage · openPeople closePeople · openStories closeStories ·
openHouse closeHouse · openHouses closeHouses · openWork closeWork ·
openFieldNotes closeFieldNotes · receiveKey askKey closeKey · replay ·
gotoRoom(id) → handler (e.g. `ctx.gotoRoom('garden')`) · goForRoomKey(key) → handler · hasKey

In the reference, `gotoStage`/`gotoAdvisory` map to `openStage`/`openAdvisory`. An in-room
link like `onClick="{{ openWork }}"` → `onClick={ctx.openWork}`.

## Fidelity

Keep every paragraph of copy, every color, every clamp() and spacing value. Match the
reference exactly. When the README and HTML disagree, the HTML wins. Read your assigned
line range with the Read tool (offset/limit by line number) before writing.
