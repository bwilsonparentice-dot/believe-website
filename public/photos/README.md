# Photography

The experience is fully furnished without photographs — every room and portrait
shows a warm, art-directed placeholder carrying the intended shot. To replace a
placeholder with real photography, drop a file here with the matching name. No code
changes are needed; the `ImageSlot` component picks it up automatically.

## Room photographs (walk-through + room overlays)

| File | Room / intended image |
| --- | --- |
| `photo-threshold.png` | The entry hall — oak door ajar, a brass key on the limestone floor |
| `photo-founders.png` | The Founder's Room — a founder by a tall window, half in shadow *(needed)* |
| `photo-fieldnotes.png` | Field Notes — an open handwritten journal, coffee, glasses, a page lifting |
| `photo-library.png` | The Library — floor-to-ceiling oak shelves, a reading ladder *(current file is a plain room; a shelves image is needed)* |
| `photo-table.png` | The Table — a long communal table, low morning light, empty chairs |
| `photo-studio.png` | The Studio — a workbench of prototypes, sketches pinned to the wall *(needed)* |
| `photo-advisory.png` | Private Advisory — two linen chairs facing, two mugs and an open journal between |
| `photo-stage.png` | The Stage — a modest wooden platform, chairs arranged, an empty podium |
| `photo-garden.png` | The Garden — a stone courtyard, an olive tree, morning light |

`The Believe Blueprint` leads with type and has no room photograph by design.
`photo-room.png` is unused in the walk-through.

## Arrival

| File | Intended image |
| --- | --- |
| `facade.png` | The limestone façade / doorway you arrive at (the overture renders a CSS limestone doorway when this is absent) |

## Library "Founder Objects", portraits, and gallery

The Library archive objects, the People portraits, the Stories portraits, and the
Stage gallery are all `ImageSlot` placeholders as well; wire real photography into
those components' `src` props (or extend `ImageSlot` usage) when the images exist.
