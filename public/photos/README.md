# Photography

The experience is fully furnished without photographs — every room and portrait
shows a warm, art-directed placeholder carrying the intended shot. To replace a
placeholder with real photography, drop a file here with the matching name. No code
changes are needed; the `ImageSlot` component picks it up automatically.

## Room photographs (walk-through + room overlays)

| File | Room / intended image |
| --- | --- |
| `photo-threshold.png` | A handcrafted oak door, morning light across the grain |
| `photo-room.png` | An empty sunlit room, one chair, soft plaster walls |
| `photo-library.png` | Floor-to-ceiling oak shelves, a reading ladder, low lamplight |
| `photo-table.png` | A long communal table, low morning light, empty chairs |
| `photo-fieldnotes.png` | A linen-bound notebook open on a walnut desk |
| `photo-stage.png` | A modest wooden platform, chairs arranged in a circle |
| `photo-advisory.png` | Two chairs, a closed door, a single lamp |
| `photo-garden.png` | A stone courtyard, an olive tree, morning light |

`The Founder's Room`, `The Studio`, and `The Believe Blueprint` intentionally have
no room photograph in the walk-through — they lead with type.

## Arrival

| File | Intended image |
| --- | --- |
| `facade.png` | The limestone façade / doorway you arrive at (the overture renders a CSS limestone doorway when this is absent) |

## Library "Founder Objects", portraits, and gallery

The Library archive objects, the People portraits, the Stories portraits, and the
Stage gallery are all `ImageSlot` placeholders as well; wire real photography into
those components' `src` props (or extend `ImageSlot` usage) when the images exist.
