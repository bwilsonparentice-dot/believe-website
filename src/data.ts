// Believe Studio — The World Map
// The house's contents: every room, artifact, principle, person, and word.
// Ported verbatim from the design source of truth. Copy is intentional;
// where in doubt, the source HTML wins.

export type Door = { leaf: string; type: string; panel: string; handle: string }

const brass = 'radial-gradient(circle at 35% 30%, #ecd193, #9c7a3f)'
const steel = 'linear-gradient(150deg,#cfd4d8,#868d94)'

/** the arched framing plan + feature per room */
export const PLANS: Record<string, { feature: string; radius: string }> = {
  threshold: { feature: 'arch', radius: '30px 30px 3px 3px' },
  room: { feature: 'alcove', radius: '3px 3px 3px 44px' },
  founders: { feature: 'fireplace', radius: '44px 3px 3px 3px' },
  library: { feature: 'shelves', radius: '3px 44px 3px 3px' },
  fieldnotes: { feature: 'seat', radius: '3px 3px 30px 30px' },
  table: { feature: 'gallery', radius: '60px 60px 6px 6px / 34px 34px 6px 6px' },
  studio: { feature: 'atelier', radius: '3px' },
  advisory: { feature: 'secluded', radius: '3px' },
  stage: { feature: 'apse', radius: '3px' },
}

export const EXTRAS: Record<string, any> = {
  threshold: {
    photo: 'a handcrafted oak door, morning light across the grain',
    door: { leaf: 'linear-gradient(100deg,#4f3a20,#63482a 42%,#7a5a33)', type: 'panel2', panel: 'rgba(18,12,6,0.42)', handle: brass },
  },
  room: {
    photo: 'an empty sunlit room, one chair, soft plaster walls',
    door: { leaf: 'linear-gradient(100deg,#efe7d6,#e5dac3 45%,#dacdb3)', type: 'panel6', panel: 'rgba(120,100,70,0.4)', handle: brass },
  },
  founders: {
    photo: 'a founder by a tall window, half in shadow',
    person: { name: 'Beth Wilson-Parentice', first: 'Beth', role: 'The founder. She built this house — and created The Spark Method, which turns kitchen-table ideas into movements.' },
    door: { leaf: 'linear-gradient(100deg,#e8ddc7,#d9c9aa)', type: 'panel2', panel: 'rgba(120,95,60,0.42)', handle: brass },
  },
  library: {
    photo: 'floor-to-ceiling oak shelves, a reading ladder, low lamplight',
    person: { name: 'Tiffany Nilles', first: 'Tiffany', role: 'She keeps decades of retail wisdom on these shelves — how founder-led brands land the right doors, and stay there.' },
    story: { kind: 'a journal', by: 'Michelle', of: 'Date Better', text: 'I came in certain I needed a strategy. I left remembering why I started. That was the strategy.' },
    door: { leaf: 'linear-gradient(100deg,#3f2c17,#5a3f22 45%,#6b4c2b)', type: 'panel2', panel: 'rgba(18,12,6,0.5)', handle: brass },
  },
  fieldnotes: {
    photo: 'a linen-bound notebook open on a walnut desk',
    door: { leaf: 'linear-gradient(100deg,#eee6d6,#e3d8c2)', type: 'panel6', panel: 'rgba(120,105,78,0.36)', handle: brass },
  },
  table: {
    photo: 'a long communal table, low morning light, empty chairs',
    person: { name: 'Jillian Waun', first: 'Jillian', role: 'She tends the voice of the house — turning strategy into content that founders actually gather around.' },
    story: { kind: 'a reflection', by: 'A founder', of: 'left after a conversation', text: 'Nobody solved my problem for me. They just made me less afraid of it. Somehow that was enough.' },
    door: { leaf: 'linear-gradient(100deg,#6b4a30,#7d5836)', type: 'glass', panel: 'rgba(30,18,8,0.5)', handle: brass },
  },
  studio: {
    photo: 'a workbench of prototypes, sketches pinned to the wall',
    person: { name: 'Chef MoWils', first: 'Chef MoWils', role: 'She builds the systems, workflows, and automation that turn founder strategy into real-world momentum.' },
    story: { kind: 'a note', by: 'Snehee', of: 'Gallivant', text: 'You told me the unfinished version was worth showing. You were right. We shipped it Tuesday.' },
    door: { leaf: 'linear-gradient(100deg,#26282b,#34383c)', type: 'atelier', panel: '#15171a', handle: steel },
  },
  advisory: {
    photo: 'two chairs, a closed door, a single lamp', locked: true, person: null,
    door: { leaf: 'linear-gradient(100deg,#cbc4b4,#dad3c3)', type: 'arch', panel: 'rgba(90,78,58,0.45)', handle: brass },
  },
  garden: {
    photo: 'a stone courtyard, an olive tree, water catching morning light',
    door: { leaf: 'linear-gradient(100deg,#eef0e8,#e2e6da)', type: 'glass', panel: 'rgba(110,120,95,0.42)', handle: brass },
  },
  stage: {
    photo: 'a modest wooden platform, chairs arranged in a circle', locked: true,
    door: { leaf: 'linear-gradient(100deg,#ece3d2,#e0d5bf)', type: 'arch', panel: 'rgba(120,100,70,0.4)', handle: brass },
  },
}

export const HOUSES = [
  { city: 'New York', bldg: 'A former printworks in NoHo.' },
  { city: 'Nashville', bldg: 'A restored row house off the square.' },
  { city: 'Austin', bldg: 'An old limestone bank on Congress.' },
  { city: 'London', bldg: 'A Georgian townhouse in Marylebone.' },
  { city: 'Paris', bldg: 'A quiet atelier in the 3rd.' },
]

// ── The Language of Believe Studio: one artifact, one principle, one verb per room ──
export const ARTIFACTS: Record<string, any> = {
  threshold: { principle: 'Arrival', artifact: 'The Key', artifactImg: '/photos/artifact-key.webp', artifactNote: 'The invitation was always enough.', continueLabel: 'Step further in', light: 'radial-gradient(56% 50% at 38% 22%, rgba(255,238,196,0.55), transparent 66%)' },
  founders: { principle: 'Confidence', artifact: 'The Chair', artifactNote: 'Two chairs. One conversation. No agenda.', continueLabel: 'Continue', light: 'radial-gradient(60% 54% at 30% 26%, rgba(255,226,178,0.5), transparent 68%)' },
  library: { principle: 'Curiosity', artifact: 'The Ladder', artifactNote: 'For reaching what others left high on the shelf.', continueLabel: 'Take this with you', light: 'radial-gradient(50% 46% at 42% 30%, rgba(255,212,146,0.6), transparent 64%)' },
  fieldnotes: { principle: 'Curiosity', artifact: 'The Journal', artifactNote: 'Open. Already written in. Never pristine.', continueLabel: 'Keep noticing', light: 'radial-gradient(58% 52% at 40% 20%, rgba(224,238,255,0.44), transparent 66%)' },
  table: { principle: 'Belonging', artifact: 'The Empty Chair', artifactNote: 'Not reserved for experts. Reserved for honesty.', continueLabel: 'Come when you’re ready', light: 'radial-gradient(58% 52% at 40% 22%, rgba(255,231,186,0.52), transparent 66%)' },
  studio: { principle: 'Craftsmanship', artifact: 'The Worktable', artifactNote: 'Covered in the unfinished. That is the point.', continueLabel: 'Keep building', light: 'radial-gradient(62% 56% at 34% 18%, rgba(204,223,238,0.5), transparent 68%)' },
  advisory: { principle: 'Clarity', artifact: 'The Private Door', artifactNote: 'Closed. Heavy walnut. No explanation offered.', continueLabel: 'Continue', light: 'radial-gradient(46% 44% at 44% 34%, rgba(240,218,176,0.42), transparent 60%)' },
  garden: { principle: 'Clarity', artifact: 'The Stone Bench', artifactNote: 'Warm from the morning sun. Sit as long as you like.', continueLabel: 'Stay a while', light: 'radial-gradient(58% 52% at 38% 22%, rgba(224,240,194,0.5), transparent 66%)' },
  stage: { principle: 'Belonging', artifact: 'The Badge', artifactImg: '/photos/artifact-badge.webp', artifactNote: 'Proof that the work had begun to travel.', continueLabel: 'Pass it forward', light: 'radial-gradient(56% 50% at 40% 22%, rgba(255,222,204,0.5), transparent 66%)' },
}

export const DATA: any[] = [
  { id: 'threshold', roman: 'I', name: 'Threshold', l: '40%', t: '66%', w: '20%', h: '22%',
    accent: 'oklch(0.62 0.09 60)', glow: 'oklch(0.62 0.09 60 / 0.22)',
    whisper: 'Not a doorway. A decision.', keywords: ['Curiosity', 'Hope', 'Possibility'],
    body: [
      'To arrive here is already to have chosen something. The threshold asks nothing of you but willingness — the quiet admission that the way you have been building is not the only way.',
      'Beyond it, nothing is demanded and nothing is sold. Only an invitation to begin again, more honestly this time.',
    ] },
  { id: 'founders', roman: 'II', name: "The Founder's Room", l: '4%', t: '33%', w: '30%', h: '28%',
    accent: 'oklch(0.62 0.09 30)', glow: 'oklch(0.62 0.09 30 / 0.22)',
    whisper: 'Where founders remember who they are beneath the business.',
    keywords: ['Seen', 'Heard', 'Encouraged', 'Identity'],
    body: [
      'For a while, the company steps aside. The person who carries it is seen, heard, and taken seriously — not as a strategy, but as a human being with something worth protecting.',
      'Confidence does not arrive as noise. It returns as perspective, and the founder leaves a little more themselves.',
    ] },
  { id: 'blueprint', name: 'The Believe Blueprint', l: '71%', t: '60%', w: '22%', h: '24%',
    accent: 'oklch(0.62 0.09 90)', glow: 'oklch(0.62 0.09 90 / 0.22)',
    whisper: 'Every meaningful company begins with clarity.',
    keywords: ['Clarity', 'Foundation', 'Direction'],
    body: ['The architect’s first act. Before a single stone is laid, the shape of what you’re building is drawn.'] },
  { id: 'library', roman: 'IV', name: 'The Library', l: '4%', t: '5%', w: '15%', h: '25%',
    accent: 'oklch(0.6 0.085 132)', glow: 'oklch(0.6 0.085 132 / 0.22)',
    whisper: 'Borrowed wisdom.', keywords: ['Learn', 'Reflect', 'Remember'], variant: 'library',
    quote: 'Everything I know, someone had the generosity to tell me first.',
    reading: [
      { t: 'Letters to a Young Poet', a: 'Rilke' },
      { t: 'The Timeless Way of Building', a: 'Christopher Alexander' },
      { t: 'Bird by Bird', a: 'Anne Lamott' },
    ],
    body: [
      'Not information — perspective. The lessons of others, collected patiently and offered without insistence. What is gathered here is meant to be reflected upon, not merely consumed.',
      'You may borrow what you need and leave the rest for the next founder who wanders in.',
    ] },
  { id: 'fieldnotes', roman: 'V', name: 'Field Notes', l: '21%', t: '6%', w: '13%', h: '19%',
    accent: 'oklch(0.6 0.085 200)', glow: 'oklch(0.6 0.085 200 / 0.22)',
    whisper: 'Catching ideas before they disappear.',
    keywords: ['Observe', 'Notice', 'Collect', 'Listen'], variant: 'notes',
    notes: [
      { t: 'The best ideas arrive sideways.', align: 'flex-start', ml: '0', mr: '0', rot: '-1.6deg' },
      { t: 'She said it twice — that means it matters.', align: 'flex-end', ml: '0', mr: '3%', rot: '1.3deg' },
      { t: 'A brand is what survives the founder’s doubt.', align: 'center', ml: '0', mr: '0', rot: '-0.7deg' },
      { t: 'Write it down before you talk yourself out of it.', align: 'flex-start', ml: '7%', mr: '0', rot: '1.7deg' },
    ],
    body: [
      'Observations, conversations, half-formed patterns — the work before it hardens into strategy. This is the room for noticing, where an offhand remark is written down before it disappears.',
      'The most important ideas rarely announce themselves. They are caught, gently, in passing.',
    ] },
  { id: 'table', roman: 'VI', name: 'The Table', l: '37%', t: '5%', w: '26%', h: '20%',
    accent: 'oklch(0.62 0.09 350)', glow: 'oklch(0.62 0.09 350 / 0.22)',
    whisper: 'Where conversations become decisions.',
    keywords: ['Listen', 'Question', 'Decide', 'Build'], variant: 'question',
    question: 'What decision have you already made… but haven’t admitted to yourself yet?',
    questionSub: 'Sit with it. The table isn’t in a hurry.',
    body: [
      'There is a difference between talking about a company and sitting across from someone who helps you finally see it clearly. The Table exists for those conversations.',
      'Some last twenty minutes. Some last three hours. Almost all of them change something — not because advice was given, but because clarity arrived.',
    ] },
  { id: 'studio', roman: 'VII', name: 'The Studio', l: '66%', t: '30%', w: '30%', h: '31%',
    accent: 'oklch(0.63 0.09 92)', glow: 'oklch(0.63 0.09 92 / 0.22)',
    whisper: 'Where ideas become real.',
    keywords: ['Build', 'Craft', 'Experiment', 'Momentum'], variant: 'studio',
    sketches: ['Left on the worktable', 'Still becoming', 'Before the launch'],
    oneLine: 'Every finished company was once an unfinished conversation.',
    body: [
      'Nothing enters this room finished. Ideas arrive as sketches, half-written notes, packaging mockups, questions scribbled in the margins — and leave a little clearer than when they came.',
      'This is where uncertainty quietly becomes momentum. You don’t have to arrive with all the answers. Only the willingness to begin.',
    ] },
  { id: 'advisory', roman: 'VIII', name: 'Private Advisory', l: '72%', t: '6%', w: '24%', h: '19%',
    accent: 'oklch(0.6 0.085 300)', glow: 'oklch(0.6 0.085 300 / 0.22)',
    whisper: 'Trust made visible.',
    keywords: ['Trust', 'Honesty', 'Depth', 'Partnership'], variant: 'quiet',
    oneLine: 'What is said in this room stays in this room.',
    body: [
      'The quietest room, and the smallest. The conversations that happen nowhere else — where a founder can be uncertain, afraid, or wrong, and still be met with honesty.',
      'Depth is only possible where there is trust. Here, it is the whole point.',
    ] },
  { id: 'garden', roman: 'IX', name: 'The Garden', l: '34%', t: '29%', w: '32%', h: '34%', courtyard: true,
    accent: 'oklch(0.55 0.08 145)', glow: 'oklch(0.55 0.08 145 / 0.22)',
    whisper: 'Where clarity returns.',
    keywords: ['Rest', 'Breathe', 'Renew', 'Light'], variant: 'garden',
    oneLine: 'Stay as long as you like. Nothing is being produced here.',
    body: [
      'Not another room. A courtyard. Nothing is produced here — no output is owed, no progress measured. Only stone, morning light, and the slow return of perspective.',
      'Everything in the building quietly revolves around this place. To pause here is not to stop. It is to see.',
    ] },
  { id: 'stage', roman: 'X', name: 'The Stage', l: '66%', t: '64%', w: '30%', h: '24%',
    accent: 'oklch(0.62 0.09 22)', glow: 'oklch(0.62 0.09 22 / 0.22)',
    whisper: 'Where founders give back what they’ve learned.',
    keywords: ['Share', 'Give', 'Mentor', 'Legacy'],
    body: [
      'There comes a moment when what you’ve learned no longer belongs to you alone. Another founder needs to hear it — and you may be the only one who can say it plainly.',
      'The Stage is where founder stories are kept and passed on: the pivots, the quiet victories, the retail milestones, the lessons earned the hard way. Not a highlight reel — a gallery of contribution.',
      'Some founders speak. Some write. Some simply sit across from the next founder and say the thing no one told them. However it happens, the work stops being only yours. It was never about being seen — it’s about what you hand forward.',
    ] },
]

// The Gallery — founders framed like portraits on a gallery wall. Each carries
// a quote, a short narrative, and an understated museum label of what changed.
// `changed` is optional; a founder without verified milestones simply omits it.
// Add future founders here (Fizzy Wizzies, NIU, Tamalitoz, John Henry's,
// Peanut Butter & Co.) and the gallery grows with no redesign.
export const STORIES = [
  {
    name: 'Snehee', company: 'Founder, Gallivant', pid: 'story-snehee', dir: 'row',
    quote: 'Beth helped me believe that our brand belonged in rooms we once thought were out of reach.',
    narrative: [
      'When Snehee first sat down with Beth, Gallivant was a brand she believed in — and a story she hadn’t yet found the words for.',
      'Together they worked on clarity before growth: who Gallivant was for, why it mattered, and how a founder walks into a room and makes people believe. The confidence came first.',
      'The doors followed.',
    ],
    changed: ['Walmart Open Call Golden Ticket', 'Expanded from 6 to 44 H-E-B stores', 'Whole Foods', 'Sprouts'],
  },
  {
    name: 'Michelle', company: 'Founder, Date Better Snacks', pid: 'story-michelle', dir: 'row-reverse',
    quote: 'Having Beth as an advisor has been a gift. Her warm, caring presence makes every conversation feel like a safe place to think big, be vulnerable, and get clear.',
    narrative: [
      'Michelle came to the table with Date Better Snacks already in motion — and the particular loneliness of carrying every decision alone.',
      'What she found wasn’t another strategy deck. It was a place to think out loud, to be honest about what was hard, and to leave each conversation a little clearer than she arrived.',
    ],
  },
]

// The broader community — brands Believe has built beside, shown as quiet brass
// nameplates between the portraits rather than a logo wall. Seeded from the
// names Beth has associated with Believe; edit freely as the roster grows.
export const GALLERY_BRANDS = ['NIU', 'AJI', 'Fizzy Wizzies', 'Bowlcut']

// The House Collection — a founder's story, once told, leaves an artifact behind:
// a solid aged-brass plaque set into a shallow limestone recess, photographed as
// part of the House rather than as a product. Each plaque is unique in silhouette
// and setting; cohesion comes from spacing, caption, and light — not identical
// crops. Add future founders (Gallivant, Date Better, Bowlcut, NIU, Tamalitoz,
// Fizzy Wizzies, John Henry's) here with their own image and proportions.
export type FounderArtifact = {
  id: string
  founder: string
  image: string
  alt: string
  caption?: string
  secondaryCaption?: string
  /** the plaque photo's intrinsic ratio, so nothing is cropped (e.g. '3 / 2') */
  aspectRatio?: string
  alignment?: 'left' | 'center' | 'right'
  size?: 'intimate' | 'standard' | 'cinematic'
  /** art-direction note shown until the real photograph is added */
  placeholder?: string
}

export const HOUSE_COLLECTION: FounderArtifact[] = [
  {
    id: 'tamalitoz',
    founder: 'Tamalitoz',
    image: '/photos/plaque-tamalitoz.webp',
    alt: 'A handcrafted aged-brass Tamalitoz by Sugarox plaque set into a stucco wall beside an open pantry doorway inside Believe Studio, warm morning light.',
    caption: 'Tamalitoz',
    secondaryCaption: 'Built beside Believe Studio.',
    aspectRatio: '3 / 2',
    alignment: 'left',
    size: 'cinematic',
    placeholder: 'An aged-brass Tamalitoz by Sugarox plaque set into a stucco wall beside an open pantry doorway, copper bowls and warm light within',
  },
  {
    id: 'peanut-butter-co',
    founder: 'Peanut Butter & Co.',
    image: '/photos/plaque-peanut-butter.webp',
    alt: 'A handcrafted aged-brass Peanut Butter & Co. plaque set within a shallow limestone recess, photographed in warm sunlight inside Believe Studio.',
    caption: 'Peanut Butter & Co.',
    secondaryCaption: 'Built beside Believe Studio.',
    aspectRatio: '3 / 2',
    alignment: 'right',
    size: 'cinematic',
    placeholder: 'An aged-brass Peanut Butter & Co. plaque — “Since 1998” — set into a shallow limestone recess, olive branches at the edge, warm afternoon light',
  },
  {
    id: 'wizzies',
    founder: 'Wizzie’s',
    image: '/photos/plaque-wizzies.webp',
    alt: 'A handcrafted round aged-brass Wizzie’s fresh brewed tea plaque set into a stucco wall beside an olive courtyard inside Believe Studio, warm afternoon light.',
    caption: 'Wizzie’s',
    secondaryCaption: 'Built beside Believe Studio.',
    aspectRatio: '3 / 2',
    alignment: 'center',
    size: 'cinematic',
    placeholder: 'A round aged-brass Wizzie’s fresh brewed tea plaque set into a stucco wall beside an olive courtyard, terracotta pots and warm light',
  },
  {
    id: 'maia',
    founder: 'Maia',
    image: '/photos/plaque-maia.webp',
    alt: 'A handcrafted square aged-brass maia plaque set into a stucco wall beside an open doorway inside Believe Studio, olive shadows and warm evening light.',
    caption: 'Maia',
    secondaryCaption: 'Built beside Believe Studio.',
    aspectRatio: '4 / 5',
    alignment: 'right',
    size: 'cinematic',
    placeholder: 'A square aged-brass maia plaque set into a stucco wall beside an open doorway, milk bottles and warm light within, olive shadows across the stone',
  },
  {
    id: 'hormans',
    founder: 'Horman’s Family Pickles',
    image: '/photos/plaque-hormans.webp',
    alt: 'A Horman’s Family Pickles mark, “Since 1898”, set into a stucco wall beside a weathered wooden door inside Believe Studio, an olive tree and crocks below in warm dusk light.',
    caption: 'Horman’s Family Pickles',
    secondaryCaption: 'Built beside Believe Studio.',
    aspectRatio: '3 / 4',
    alignment: 'left',
    size: 'cinematic',
    placeholder: 'A Horman’s Family Pickles mark — “Since 1898” — set into a stucco wall beside a weathered wooden door, an olive tree and pickle crocks in warm dusk light',
  },
]

export const FR_RHYTHM = [
  { t: 'The weekly conversation', d: 'Ninety minutes to two hours, live. A different question each week — the same purpose always. No lecture, no slides. Just founders thinking out loud together.' },
  { t: 'Founder hot seats', d: 'One founder, one real decision, the room’s full attention. Not advice given from above, but clarity found in the open.' },
  { t: 'Founder Notes', d: 'After each gathering, the essence is written down and kept — a growing library of timeless insight rather than a feed to keep up with.' },
  { t: 'The conversation continues', d: 'The best thinking rarely ends when the room does. Founders carry it on naturally, in their own time.' },
]
export const FR_MEMBERSHIP = [
  'The handcrafted brass Founder Key, mailed as a welcome',
  'Preferential pricing for every Founder’s Room gathering',
  'Founder Notes, kept and added to over time',
  'The Library and Field Notes',
  'Invitations to member experiences',
  'Priority access to future rooms and offerings',
]
export const FR_OUTCOMES = ['I feel lighter.', 'I can see more clearly.', 'I know my next step.', 'I remembered why I started.']
export const FR_INCLUDES = [
  'Your Believe Blueprint', 'Private strategy sessions', 'Founder decision support', 'Ongoing implementation guidance',
  'Accountability', 'Access to resident expertise', 'Priority communication', 'Quarterly Blueprint refinement',
]

/**
 * EXPERIENCES — the dedicated editorial rooms behind each doorway.
 * The site is organized around experiences, not services. Each page is the
 * same quiet anatomy — what it is, who it's for, what's included, the
 * particulars, what changes, the questions founders ask — so five different
 * rooms still feel like one house. Every page ends the same way: a
 * conversation, never a checkout.
 */
export type Faq = { q: string; a: string }
export type Particular = { label: string; value: string }
/**
 * A page from the Believe Archive — one quiet observation gathered from years
 * of working with founders. Each room preserves its own: permission, clarity,
 * belonging, transformation. Not a quote or a testimonial — evidence that real
 * founders have already passed through, discovered rather than designed.
 */
export type ArchiveNote = { no: string; lines: string[]; source: string; image?: string }

/**
 * The Seven Drawings — the Believe Blueprint presented as an architect's folio.
 * Each is one sheet from the set: a numeral, a sheet number, the name, the one
 * line of meaning, and a brief narrative. Not deliverables — drawings.
 */
export type Drawing = { numeral: string; sheet: string; name: string; meaning: string; narrative: string }
export const BLUEPRINT_DRAWINGS: Drawing[] = [
  { numeral: 'I', sheet: 'A-01', name: 'Business Reinvention',
    meaning: 'The company you have built — and the company it must now become.',
    narrative: 'We begin where every reinvention begins: an honest look at what you’ve created, and a clear-eyed view of what it’s ready to grow into.' },
  { numeral: 'II', sheet: 'A-02', name: 'Brand Architecture',
    meaning: 'The meaning your company is built to carry.',
    narrative: 'Not a logo or a palette — the structure of belief beneath the brand. What it stands for, and why anyone should care.' },
  { numeral: 'III', sheet: 'A-03', name: 'Opportunity Atlas',
    meaning: 'A complete landscape of credible growth opportunities, prioritized by strategic fit rather than distraction.',
    narrative: 'Every direction you could take, mapped in a single view — so you can pursue the few that matter and let go of the many that don’t.' },
  { numeral: 'IV', sheet: 'A-04', name: 'Experience Channels',
    meaning: 'Every place your brand can be experienced — not simply purchased.',
    narrative: 'Where a founder sees sales, we map moments — each a chance for someone to feel the company long before they ever buy from it.' },
  { numeral: 'V', sheet: 'A-05', name: 'Dream Accounts',
    meaning: 'The relationships capable of changing the trajectory of your company.',
    narrative: 'The handful of partners, retailers, and rooms that would change everything — named, and approached with intention rather than hope.' },
  { numeral: 'VI', sheet: 'A-06', name: 'Growth Roadmap',
    meaning: 'The sequence that converts possibility into meaningful movement.',
    narrative: 'Not everything at once. The right order — the moves that make the next move easier — drawn as a path you can actually walk.' },
  { numeral: 'VII', sheet: 'A-07', name: 'Executive Debrief',
    meaning: 'A founder-to-founder perspective on what we see, what matters most, and what your next chapter asks of you.',
    narrative: 'We close by stepping back — one founder to another — naming the truth of where you are, and what this chapter is quietly asking of you.' },
]
export type Experience = {
  id: string
  eyebrow: string        // a spatial descriptor — "the gathering room"
  name: string
  tm?: boolean
  tagline: string        // the one-line promise
  photo?: string         // a PHOTOS key
  photoAlt?: string
  whatIsIt: string[]     // paragraphs — quiet, never a pitch
  whoFor: string        // who this room is for
  whoNotFor?: string     // and, gently, who it isn't
  includedHeading?: string
  included: string[]
  particulars: Particular[]   // the museum labels — group size · cadence · community
  investment: string          // its own moment — the figure alone
  investmentNote: string      // one quiet supporting line, no sales language
  changesLead: string    // the felt result, led by one line
  changes: string[]      // the first-person aftermath — felt, not explained
  faqs: Faq[]
  joinLead: string       // the large line that opens the invitation
  joinBody: string       // why we begin with a conversation
  closing: string        // the reflection that precedes "Begin the Conversation"
  archive?: ArchiveNote  // the room's own page of the Believe Archive
  interlude?: string     // a warm pull-quote set between sections (used sparingly)
  background?: string    // an optional warmer paper for rooms that ask for it
}

export const EXPERIENCES: Record<string, Experience> = {
  'founders-room': {
    id: 'founders-room',
    eyebrow: 'The gathering room',
    name: 'The Founder’s Room',
    tm: true,
    tagline: 'Grow beside other founders.',
    photo: 'founders',
    photoAlt: 'The Founder’s Room — a quiet circle of chairs by a tall window, morning light',
    whatIsIt: [
      'The Founder’s Room is an ongoing advisory circle for founders who believe the best decisions are rarely made alone.',
      'Each month a small, carefully chosen group of founders gathers — to think out loud, to bring the real decision to the room, and to become stronger leaders alongside one another. Not a course. Not a mastermind. A room you can build a company inside of.',
    ],
    whoFor: 'For founders building meaningful companies who value thoughtful strategy over quick tactics, want a trusted circle to think beside, and are willing to do the work of becoming a better leader.',
    whoNotFor: 'It’s probably not the room for those seeking shortcuts, passive courses, or someone else to build the company for them.',
    includedHeading: 'What membership includes',
    included: [
      'A monthly founder gathering',
      'A private founder community',
      'Ongoing founder discussions',
      'One individual strategy session',
      'Founder Notes, kept over time',
      'Real accountability',
    ],
    particulars: [
      { label: 'Group size', value: 'A small, curated circle — never a crowd. Small enough that every founder is known.' },
      { label: 'Meeting cadence', value: 'A live gathering each month, with the conversation continuing quietly between.' },
      { label: 'Community', value: 'A private space for members, open between gatherings, in your own time.' },
    ],
    investment: '$995 / month',
    investmentNote: 'An investment in the founder your company needs you to become.',
    changesLead: 'Founders arrive carrying questions. They leave carrying clarity.',
    changes: [
      'I feel lighter.',
      'I can see more clearly.',
      'I know my next step.',
      'I remembered why I started.',
    ],
    faqs: [
      { q: 'Is this coaching?', a: 'No. Coaching works on you; the Founder’s Room thinks with you. It’s a place to bring the real decision and find perspective before you make it.' },
      { q: 'How often does the room meet?', a: 'The Founder’s Room gathers virtually on the third Thursday of every month, with conversations continuing between gatherings. A standing rhythm, because trust is built over time — not in a set number of sessions.' },
      { q: 'What kinds of decisions?', a: 'The ones that don’t belong in a boardroom — a pivot, a partnership, a hire, a season of doubt. The decisions that quietly shape the next chapter.' },
      { q: 'How does it begin?', a: 'It begins with a private conversation — to understand the chapter you’re in, and whether this is the right room for it now.' },
    ],
    joinLead: 'The room opens through conversation.',
    joinBody: 'We begin with The Founder Conversation so we can understand where you are, what you’re building, and whether this is the right room for you today.',
    closing: 'The best founders don’t build alone. They build beside others who understand.',
  },

  'founders-table': {
    id: 'founders-table',
    eyebrow: 'The gathering table',
    name: 'The Founder’s Table',
    tm: false,
    tagline: 'You’re not building alone.',
    photo: 'table',
    photoAlt: 'A warm walnut table in morning light — coffee, an open notebook, chairs drawn close',
    background: '#f1e7d0',
    whatIsIt: [
      'The Founder’s Table is where founders stop building alone. A standing invitation to sit down beside others who understand — to think out loud, to be honest, and to leave in better company than you arrived.',
      'Some conversations last twenty minutes; some last three hours. Around the table, founders help founders — not with advice handed down, but with the collective wisdom of people who have built what you are building now.',
    ],
    whoFor: 'For founders who’ve carried it alone long enough — who want a table of others building meaningful companies, and the kind of honesty that only comes from people who have been there.',
    whoNotFor: 'It isn’t a networking room, and it isn’t an audience. It’s a table.',
    includedHeading: 'What gathering holds',
    included: [
      'A standing seat at the table',
      'Founders who understand',
      'Conversations that become decisions',
      'The quiet relief of not building alone',
    ],
    interlude: 'What decision have you already made… but haven’t admitted to yourself yet?',
    particulars: [
      { label: 'The table', value: 'Small and consistent — the same faces, growing familiar over time.' },
      { label: 'How often', value: 'Regular gatherings, in person and in conversation, never rushed.' },
      { label: 'The spirit', value: 'Honesty over polish. Belonging over programming.' },
    ],
    investment: 'By invitation',
    investmentNote: 'A seat at the table is offered, not sold. We begin, as always, with a conversation.',
    changesLead: 'Founders arrive carrying it alone. They leave knowing they never have to again.',
    changes: [
      'I’m not the only one.',
      'I can be honest here.',
      'I have people who understand.',
      'I’m not building alone anymore.',
    ],
    faqs: [
      { q: 'Is this networking?', a: 'No. Networking is transactional; the Table is relational. You won’t be pitching — you’ll be understood.' },
      { q: 'How large is the table?', a: 'Small and consistent — the same founders, growing familiar over time, so honesty has room to happen.' },
      { q: 'What actually happens?', a: 'Conversation. Real questions, real decisions, and the quiet relief of sitting among people who’ve been where you are.' },
      { q: 'How do I pull up a chair?', a: 'With a conversation. We begin with The Founder Conversation, so the table stays a place where everyone truly belongs.' },
    ],
    joinLead: 'Pull up a chair.',
    joinBody: 'The Table begins with a conversation — so that when you sit down, you’re already among founders who understand.',
    closing: 'The best founders don’t build alone. They build beside others who understand.',
  },

  'founder-conversation': {
    id: 'founder-conversation',
    eyebrow: 'Where it begins',
    name: 'The Founder Conversation',
    tm: false,
    tagline: 'The first conversation.',
    photo: 'conversation',
    photoAlt: 'Two chairs drawn close around a small walnut table, coffee and an open journal in morning light',
    whatIsIt: [
      'A relaxed thirty-minute conversation — to understand where you are, what you’re building, what you’re navigating, and whether Believe is the right place to support your journey.',
      'It is not a sales call. It’s the beginning of a relationship. Before we talk about strategy, growth, or opportunities, we’d simply like to understand you.',
    ],
    whoFor: 'For any founder wondering whether Believe is the right place for them — whether you’re merely curious, quietly navigating something, or ready for a real next step.',
    whoNotFor: 'There’s no wrong reason to come, and no obligation to continue.',
    includedHeading: 'What the conversation holds',
    included: [
      'Thirty unhurried minutes',
      'A real conversation about your company',
      'A sense of where you are, and what’s next',
      'No pressure, and no obligation',
    ],
    particulars: [
      { label: 'Format', value: 'A relaxed thirty-minute conversation, one to one.' },
      { label: 'When', value: 'At a time that suits you — scheduled the moment you’re ready.' },
      { label: 'Obligation', value: 'None. It’s a conversation, not a commitment.' },
    ],
    investment: 'Complimentary',
    investmentNote: 'The first conversation is always on us. Before anything else, we’d simply like to understand you.',
    changesLead: 'Most founders leave the first conversation lighter than they arrived.',
    changes: [
      'I feel understood.',
      'I can name what I’m really navigating.',
      'I know whether this is the right place.',
      'I’m not carrying it alone anymore.',
    ],
    faqs: [
      { q: 'Is this a sales call?', a: 'No. It’s a conversation. We’d simply like to understand you, what you’re building, and whether Believe is the right place to help. Nothing is expected of you afterward.' },
      { q: 'How long is it?', a: 'About thirty minutes — long enough to talk honestly, short enough that it never becomes a meeting.' },
      { q: 'What should I prepare?', a: 'Nothing. Come as you are, with whatever is on your mind. The best conversations aren’t rehearsed.' },
      { q: 'What happens afterward?', a: 'If it feels like the right fit, we’ll point you toward the doorway that matches where you are. If it doesn’t, you’ll still leave with clarity. Either way, no pressure.' },
    ],
    joinLead: 'There’s nothing to decide yet.',
    joinBody: 'Just a conversation — thirty minutes to understand where you are, what you’re building, and whether Believe is the right place to help.',
    closing: 'Every meaningful company begins with a single conversation.',
  },

  'believe-blueprint': {
    id: 'believe-blueprint',
    eyebrow: 'The drafting table',
    name: 'The Believe Blueprint',
    tm: false,
    tagline: 'Architect the next chapter.',
    photo: 'blueprint',
    photoAlt: 'The Believe Blueprint — an open journal and architectural plans on the oak table in morning light',
    whatIsIt: [
      'A one-time strategic engagement that brings your founder strategy, brand architecture, growth opportunities, and a practical roadmap into one comprehensive plan — designed specifically for your company.',
      'More than a strategy. The architectural plan for your next chapter — a living document you return to, built from the ground up and never templated.',
    ],
    whoFor: 'For founders entering a new chapter who want clarity before they build — a real plan, designed around their company, not borrowed from someone else’s.',
    whoNotFor: 'It isn’t for those looking for a quick template, or a deck to file away and forget.',
    includedHeading: 'What we architect together',
    included: [
      'Business Reinvention',
      'Brand Architecture',
      'Opportunity Atlas',
      'Experience Channels',
      'Dream Accounts',
      'A Growth Roadmap',
      'An Executive Debrief',
    ],
    particulars: [
      { label: 'Format', value: 'A one-time strategic engagement, built entirely around you.' },
      { label: 'Timeline', value: 'A few focused weeks, from first conversation to finished Blueprint.' },
      { label: 'What you leave with', value: 'A living strategic document — the architecture of your next chapter.' },
    ],
    investment: '$3,995',
    investmentNote: 'A one-time engagement — the foundation everything that follows is built upon.',
    changesLead: 'You stop guessing, and start building from a plan that is truly yours.',
    changes: [
      'I can see the whole picture.',
      'I know what matters most.',
      'I know my next move.',
      'I finally have a plan I believe in.',
    ],
    faqs: [
      { q: 'How long does a Blueprint take?', a: 'A few focused weeks, from the first conversation to the finished document — never rushed, never drawn out.' },
      { q: 'Is it a slide deck?', a: 'No. It’s a living strategic document you’ll return to — the architecture of your company, not a presentation to file away.' },
      { q: 'Is it templated?', a: 'Never. Every Blueprint is built from the ground up, around your founder, your company, and the decisions that matter most.' },
      { q: 'What happens after the Blueprint?', a: 'Many founders continue into The Founder’s Room, where the Blueprint becomes the foundation for everything that follows. But it’s yours to carry forward however you choose.' },
    ],
    joinLead: 'Every Blueprint begins with a conversation.',
    joinBody: 'Before we architect anything, we begin by understanding you — your company, your vision, and the chapter you’re entering.',
    closing: 'Just as an architect begins with a blueprint, every founder begins with clarity.',
  },

  'private-advisory': {
    id: 'private-advisory',
    eyebrow: 'The private room',
    name: 'Private Advisory',
    tm: false,
    tagline: 'Navigate your biggest decisions.',
    photo: 'advisory',
    photoAlt: 'A quiet private room — two chairs, warm light, a place for the decisions that matter most',
    whatIsIt: [
      'Reserved for founders navigating meaningful periods of growth, leadership, transition, or transformation — highly personalized advisory work, designed around your company, your leadership, and your biggest decisions.',
      'This is the most personal work we do. No curriculum, no template — only a trusted partner in the room for the decisions that shape everything else.',
    ],
    whoFor: 'For founders in a defining moment — growth, leadership, transition, or transformation — who want a trusted thinking partner beside them for the decisions that matter most.',
    whoNotFor: 'It isn’t for those who want someone else to make the decision for them.',
    includedHeading: 'What it involves',
    included: [
      'One-to-one advisory, shaped around you',
      'Direct support for your biggest decisions',
      'A trusted partner through the defining moments',
      'Complete discretion',
    ],
    particulars: [
      { label: 'Format', value: 'Highly personal, one-to-one advisory, shaped entirely around you.' },
      { label: 'Availability', value: 'By application — only a few founders at a time.' },
      { label: 'Reserved for', value: 'Defining moments — growth, leadership, transition, transformation.' },
    ],
    investment: 'By application',
    investmentNote: 'Scope and investment are designed around your company and the decisions in front of you.',
    changesLead: 'The biggest decisions stop being yours to carry alone.',
    changes: [
      'I have someone in the room with me.',
      'I can think clearly under pressure.',
      'I trust the decision I’m making.',
      'I’m becoming the leader this moment asks for.',
    ],
    faqs: [
      { q: 'Who is this for?', a: 'Founders navigating a defining moment — significant growth, a leadership shift, a transition, or a transformation — who want a trusted partner in the room.' },
      { q: 'Why is it by application?', a: 'Because it’s deeply personal work, and we take on only a few founders at a time so each receives real attention.' },
      { q: 'What does it involve?', a: 'Highly personalized advisory, shaped entirely around your company, your leadership, and the decisions in front of you. No two engagements are alike.' },
      { q: 'How do I begin?', a: 'With a conversation. We’ll understand the moment you’re in and whether Private Advisory is the right room for it.' },
    ],
    joinLead: 'It begins with a conversation.',
    joinBody: 'We begin with The Founder Conversation, so we can understand the moment you’re in and whether Private Advisory is the right room for it.',
    closing: 'The biggest decisions are easier when you don’t make them alone.',
  },

  'visionary-collective': {
    id: 'visionary-collective',
    eyebrow: 'The front porch',
    name: 'Visionary Collective',
    tm: false,
    tagline: 'Stay connected to the house.',
    photo: 'garden',
    photoAlt: 'The garden at the edge of the house — olive trees, a stone path, morning light',
    whatIsIt: [
      'Not every founder is ready to begin a Blueprint, and not every founder is looking for Private Advisory. Sometimes you simply want a place to return to.',
      'A place to think. A place to keep learning. A place to remain connected to other founders building meaningful companies. This is the front porch of the house — belonging, not buying.',
    ],
    whoFor: 'For founders who simply want to stay close to the house — to keep thinking, keep learning, and remain among others building meaningful companies.',
    whoNotFor: 'No engagement required, and no pressure to become more than a member.',
    includedHeading: 'What membership holds',
    included: [
      'A standing place in the house',
      'Ongoing ideas and conversations',
      'A community of founders',
      'An open door to whatever comes next',
    ],
    particulars: [
      { label: 'Membership', value: 'Two ways to belong — the Founder membership, or Legacy.' },
      { label: 'Rhythm', value: 'Yours to set — a place to return to, in your own time.' },
      { label: 'Community', value: 'A standing connection to the founders and conversations inside Believe.' },
    ],
    investment: 'Founder $98 · Legacy $498',
    investmentNote: 'Both renew yearly. Not a purchase — a quiet way to stay close to the house.',
    changesLead: 'The house stays close, even between chapters.',
    changes: [
      'I have a place to think.',
      'I’m still in the conversation.',
      'I keep learning, quietly.',
      'I never feel far from the house.',
    ],
    faqs: [
      { q: 'What is the Collective?', a: 'The front porch of the house — a way to stay connected to the ideas, conversations, and founders inside Believe, without beginning a formal engagement.' },
      { q: 'What’s the difference between Founder and Legacy?', a: 'Founder is the way in. Legacy is for those who want to give more and receive more — deeper access to gatherings and the Studio.' },
      { q: 'Do I need to be a client?', a: 'No. The Collective is open to any founder who wants to stay close to the house.' },
      { q: 'Can I begin something more later?', a: 'Of course. Many founders start on the porch and, when the time is right, step into a Blueprint or The Founder’s Room.' },
    ],
    joinLead: 'Pull up a chair.',
    joinBody: 'The Collective is the simplest way to stay close to the house — to keep thinking, keep learning, and remain among founders building meaningful companies.',
    closing: 'Sometimes belonging is the first step. The rest can come later.',
  },
}

// A Field Note is one conversation that refused to leave. Three quiet families:
// an Observation (obs alone), a Reveal (obs + a line in Beth's hand), and a Trace
// (what the conversation eventually became — `to`, or a full `trace` sentence).
// `where` is a tiny archival provenance caption; `tape` (1 or 2) marks the ~third
// of notes held to the wall with linen tape — the rest simply rest on the page.
export type FieldNote = {
  n: string; obs: string; tilt: string
  title?: string; hand?: string; to?: string; trace?: string; where?: string; tape?: 1 | 2
}
export const FIELD_NOTES: FieldNote[] = [
  { n: '014', obs: 'Growth usually creates new problems faster than confidence.', tilt: '-0.5deg' },
  { n: '027', obs: 'The founder wasn’t asking about packaging.', hand: 'She was asking for permission.', to: 'The Founder’s Room', where: 'Conversation 184.', tape: 2, tilt: '0.5deg' },
  { n: '041', obs: 'Questions repeated three times are usually the real questions.', tilt: '0.4deg' },
  { n: '056', obs: 'Most founders don’t need another framework. They need a room quiet enough to hear themselves think.', to: 'The House', tape: 1, tilt: '-0.6deg' },
  { n: '063', obs: 'Retail rarely breaks companies.', hand: 'Confusion usually does.', where: 'Outside Whole Foods.', tilt: '0.7deg' },
  { n: '071', title: 'On beginning', obs: 'Every meaningful company we’ve watched take shape began the same way — not with a plan, but with a better question.', to: 'The Believe Blueprint', tilt: '-0.4deg' },
  { n: '084', obs: 'A founder can outgrow their positioning long before they outgrow their business.', where: 'Collected after Expo West.', tape: 1, tilt: '0.6deg' },
  { n: '090', obs: 'The bravest thing said at the table is usually the quietest.', trace: 'This conversation became our first workshop.', tilt: '-0.5deg' },
  { n: '097', obs: 'Clarity is not the reward at the end of the work. It is the thing that makes the work possible.', where: 'Late Tuesday afternoon.', tilt: '0.4deg' },
  { n: '102', obs: 'Sometimes the next strategy begins with a better question.', tape: 2, tilt: '-0.5deg' },
  { n: '118', title: 'Unfinished', obs: '— what if belief is the only asset that compounds without capital?', hand: '(left for later)', tilt: '0.7deg' },
  { n: '126', obs: 'The founders who go on to build the most give the most away first.', to: 'The Stage', where: 'From a founder in tears.', tilt: '-0.4deg' },
]

export const LIBRARY_BOOKS = [
  { title: 'Letters to a Young Poet', author: 'Rainer Maria Rilke', why: 'For the founder who has forgotten why they began.' },
  { title: 'A Pattern Language', author: 'Christopher Alexander', why: 'Because building a company and building a house turn out to be the same craft.' },
  { title: 'Meditations', author: 'Marcus Aurelius', why: 'A reminder that clarity has always been the rarest kind of strength.' },
  { title: 'Let My People Go Surfing', author: 'Yvon Chouinard', why: 'Proof that a company can be built entirely around what its founder believes.' },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', why: 'Kept on the shelf because the essential is still invisible to the eye.' },
]
export const LIBRARY_MARGINS = [
  'I came looking for strategy. I left remembering why I started.',
  'I finally stopped building the company everyone expected, and started building the one I believed in.',
  'I thought I needed more confidence. I needed more clarity.',
]
export const LIBRARY_OBJECTS = [
  { no: '001', name: 'The Brass Key', src: '/photos/artifact-key.webp', story: 'Sent once, by mail, to every founder who joins the house. Most are never used to open anything — they are kept on desks, on shelves, in pockets, as a quiet reminder that the door was always open.', lesson: 'The invitation was always enough.', photo: 'The handcrafted brass key resting on linen beside a folded invitation — morning light, soft shadows, nothing staged', dir: 'row' },
  { no: '002', name: 'The Folded Buyer Note', src: '/photos/artifact-buyernote.webp', story: 'A handwritten note from a retail buyer, corners softened from being unfolded and refolded a hundred times. One sentence long. It was the yes that turned a kitchen idea into a company.', lesson: 'One sentence can change everything that follows.', photo: 'A slightly worn handwritten retailer note resting beside a coffee mug, corners softened from being unfolded many times', dir: 'row-reverse' },
  { no: '003', name: 'Prototype No. 1', src: '/photos/artifact-sipp.webp', story: 'The original. Imperfect in every way the founder later learned to fix, and kept precisely because of it — proof that meaningful things rarely arrive finished.', lesson: 'Still imperfect. Still worth keeping.', photo: 'The original imperfect prototype, beautifully photographed — evidence of beginnings', dir: 'row' },
  { no: '004', name: 'A Handwritten Blueprint', src: '/photos/artifact-sketch.webp', story: 'Before the plan had a name, it was pencil on tracing paper — construction lines, second thoughts, a ring left by a coffee cup. The first Believe Blueprint, drawn by hand.', lesson: 'Every company begins as a drawing before it becomes a building.', photo: 'The original Believe Blueprint resting beneath tracing paper, construction lines barely visible, coffee nearby', dir: 'row-reverse' },
  { no: '005', name: 'A Ceramic Mug', src: '/photos/artifact-journal.webp', story: 'Still half full. Left on the table the morning a founder finally said the thing they had been circling for months. Nobody washed it. It stayed.', lesson: 'The most important decisions are made over something warm.', photo: 'A ceramic mug, half full, on a walnut table — evidence someone has just stood up from a long conversation', dir: 'row' },
  { no: '006', name: 'A Retailer Badge', src: '/photos/artifact-badge.webp', story: 'A trade-show badge, lanyard still creased. The morning the shelf stopped being a dream and became an address.', lesson: 'The shelf becomes real the day someone walks you to it.', photo: 'A worn trade-show retailer badge with creased lanyard, resting on cream paper in soft light', dir: 'row-reverse', pos: '96% 50%' },
]
export const LIBRARY_KEEPERS = [
  { name: 'Tiffany Nilles', note: 'She keeps the shelf on finding the right rooms — and staying in them. The wisdom of knowing where a brand truly belongs before chasing where it doesn’t.' },
  { name: 'Jillian Rhys', note: 'She keeps the words founders leave behind, and the ones still forming. If a sentence in here stays with you, it likely passed through her hands first.' },
]

// Residency records — what each Resident worked through and left in the Library.
// A shared archival structure so every workshop is catalogued the same way, and
// the Library reads as an archive of lived knowledge rather than a download page.
export type ResidencyRecord = {
  no: string
  resident: string
  workshop: string
  carrying: string
  decision: string
  built: string
  artifact: string
  date: string
}
export const RESIDENCY_RECORDS: ResidencyRecord[] = [
  {
    no: '001',
    resident: 'Chef MoWils',
    workshop: 'Founder Workshop No. 001: Buy Back 20 Hours',
    carrying: '“There’s only one of me.”',
    decision: 'Which work to stop doing personally.',
    built: 'The Follow-Up and The Scout.',
    artifact: 'The AI Employee Handbook',
    date: 'August 2026',
  },
]
export const LIBRARY_NOTES = [
  'The best ideas arrive sideways.',
  'Don’t solve the wrong problem beautifully.',
  'She said it twice. That means it matters.',
  'Write it down before you explain it away.',
]
export const LIBRARY_WRITING = [
  { kind: 'Field Note', title: 'The founder is the strategy', note: 'Why the person building matters more than the plan they are building.' },
  { kind: 'Essay', title: 'On borrowing wisdom', note: 'What a decade of retail taught us about the questions worth asking early.' },
  { kind: 'Blueprint philosophy', title: 'Why no founder walks the same path', note: 'The thinking beneath the Believe Blueprint, and why we begin with clarity.' },
  { kind: 'Field Note', title: 'Momentum is a decision', note: 'How meaningful companies move from possibility to progress.' },
  { kind: 'Essay', title: 'The shelf, the scroll, the site', note: 'Where belief is won or lost before a founder ever makes the sale.' },
  { kind: 'Reading', title: 'From the founder’s shelf', note: 'A short, growing list of the books we return to, and why they endure.' },
]

export const STUDIO_NIGHTS = [
  { topic: 'Building Financial Confidence', name: 'Nick Huggins', role: 'Fractional CFO', room: 'The Studio', label: 'Inside the Studio', when: 'This month', note: 'Nick joins founders for an honest conversation about the financial side of building a remarkable company — the decisions, the discipline, and the quiet confidence of knowing your numbers.' },
  { topic: 'Landing the Right Shelves', name: 'Sarah Ellison', role: 'Retail Strategy', room: 'The Table', label: 'An Evening in the House', when: 'Next month', note: 'Sarah joins founders for an honest conversation about retail growth — how meaningful brands earn the right doors, build lasting partnerships, and stay on the shelf long after launch.' },
  { topic: 'Protecting What You Build', name: 'James Okafor', role: 'Trademark & Brand Counsel', room: 'The Library', label: 'In the Library', when: 'In the spring', note: 'Every lasting company eventually protects what it creates. An evening exploring trademarks, intellectual property, and the quiet decisions that preserve a founder’s work for decades.' },
  { topic: 'The Story Investors Believe', name: 'Priya Raman', role: 'Early-Stage Investor', room: 'The Stage', label: 'On the Stage', when: 'Later this year', note: 'An intimate evening on what makes an investor believe in a founder — not the deck, but the clarity underneath it, and the story only you can tell.' },
]

export const PEOPLE = [
  { first: 'Beth', name: 'Beth Wilson-Parentice', pid: 'portrait-beth', dir: 'row', room: 'The Founder’s Room', portrait: 'Editorial portrait of Beth in The Founder’s Room — morning light, a journal, coffee', belief: 'Beth created Believe Studio because she believes founders change the world when someone believes in them first. Her role isn’t to lecture — it’s to help founders see possibilities they couldn’t yet see themselves.', when: 'when you’re carrying a decision that feels too heavy to make alone.' },
  { first: 'Joy', name: 'Joy Mooiweer', pid: 'portrait-joy', dir: 'row-reverse', room: 'The Studio', portrait: 'Editorial portrait of Joy in The Studio — beautiful materials, packaging, paper, brass, warm oak', belief: 'Joy believes extraordinary hospitality is often invisible. The best experiences are the ones that simply feel right.', when: 'long before you realize she’s quietly orchestrated dozens of thoughtful details that made your experience feel effortless.' },
  { first: 'Jillian', name: 'Jillian Waun', pid: 'portrait-jillian', dir: 'row', room: 'The Library', portrait: 'Editorial portrait of Jillian in The Library — books, notes, window light', belief: 'Jillian believes thoughtful storytelling creates belonging.', when: 'through the stories you read, the words that stay with you, and the conversations that continue long after you’ve left.' },
  { first: 'Tiffany', name: 'Tiffany Nilles', pid: 'portrait-tiffany', dir: 'row-reverse', room: 'The Table', role: 'Retail Strategy Advisor', portrait: 'Editorial portrait of Tiffany at The Table — an open notebook, conversation, coffee', belief: 'Tiffany believes clarity creates momentum. She quietly helps founders move from possibility to progress.', when: 'when ideas begin becoming organized into meaningful action.' },
  { first: 'Chef MoWils', name: 'Chef MoWils', pid: 'portrait-mona', dir: 'row', room: 'The Garden', portrait: 'Editorial portrait of Chef MoWils in The Garden — olive trees, a stone path, morning light', belief: 'Chef MoWils believes meaningful conversations change lives.', when: 'around The Table—where AI meets CPG, and efficiency makes more room for connection.' },
]

/**
 * Team portraits, keyed by each person's pid. Drop a file at the matching path
 * under public/photos and it appears in The People of Believe Studio; until then
 * the ImageSlot falls back gracefully to the art-direction placeholder. (Both
 * .webp and .png inline into the self-contained preview.)
 */
export const PEOPLE_PHOTOS: Record<string, string> = {
  'portrait-beth': '/photos/portrait-beth.webp',
  'portrait-joy': '/photos/portrait-joy.webp',
  'portrait-jillian': '/photos/portrait-jillian.webp',
  'portrait-tiffany': '/photos/portrait-tiffany.webp',
  'portrait-mona': '/photos/portrait-mona.webp',
}

/** The People header — a table in morning light, the room ready for conversation. */
export const PEOPLE_HERO = '/photos/photo-the-people.webp'

/**
 * Founder (client) story portraits, keyed by pid. Drop a file at the matching
 * path and it appears in The Stories; until then the slot falls back to its
 * placeholder. Lee and April are written anonymously and stay unphotographed.
 */
export const STORY_PHOTOS: Record<string, string> = {
  'story-michelle': '/photos/portrait-michelle.webp',
  'story-snehee': '/photos/portrait-snehee.webp',
}

export const STAGE_MOMENTS = [
  { k: 'A Founder’s First Yes', b: 'The buyer who believed first. The retailer that opened the first door. The moment possibility became real.' },
  { k: 'Around the Table', b: 'Founder dinners. Shared meals. Honest conversations. The moments that never appear in press releases — yet often change everything.' },
  { k: 'Beyond the House', b: 'Fancy Food Show. Founder gatherings. Retail summits. Private salons. The house occasionally leaves home — carrying its philosophy wherever founders gather.' },
  { k: 'Stories Worth Sharing', b: 'Launches. Milestones. Golden Tickets. Shelf placements. Keynotes. Awards. Not because recognition defines success — because every founder deserves to have someone witness the moment.' },
]
export const STAGE_GALLERY = [
  'A founder beside their product, first time on shelf', 'Fancy Food Show installation', 'A Founder Table dinner',
  'Chef MoWils, mid-demonstration', 'A retail launch', 'A keynote, mid-sentence', 'Editorial founder portrait', 'A community dinner, late evening',
]
export const ADVISORY_SUBJECTS = [
  'Founder Clarity', 'Brand Positioning', 'Revenue Strategy', 'Retail Expansion', 'AI Discoverability',
  'Leadership Decisions', 'Team Alignment', 'Investor Preparation', 'Product Architecture', 'Long-Term Vision',
]

export const PRINCIPLES = ['Arrival', 'Belonging', 'Clarity', 'Craftsmanship', 'Curiosity', 'Confidence']

/** Which room a resident/person belongs to → the handler that opens it. */
export function roomKeyFor(room: string): string {
  const r = (room || '').toLowerCase()
  if (r.indexOf('founder') >= 0) return 'founders'
  if (r.indexOf('library') >= 0) return 'library'
  if (r.indexOf('table') >= 0) return 'table'
  if (r.indexOf('studio') >= 0) return 'studio'
  if (r.indexOf('garden') >= 0) return 'garden'
  if (r.indexOf('stage') >= 0) return 'stage'
  if (r.indexOf('advisory') >= 0) return 'advisory'
  return 'work'
}

// ── the walk-through journey: merge DATA + EXTRAS + ARTIFACTS + PLANS + layout ──
export const PHOTOS: Record<string, string> = {
  threshold: '/photos/photo-threshold.webp', room: '/photos/photo-room.webp', table: '/photos/photo-table.webp',
  garden: '/photos/photo-garden.webp', library: '/photos/photo-library.webp', fieldnotes: '/photos/photo-fieldnotes.webp',
  stage: '/photos/photo-stage.webp', advisory: '/photos/photo-advisory.webp',
  // The Studio and The Founder's Room now show photographs (previously type-led).
  studio: '/photos/photo-studio.webp', founders: '/photos/photo-founders.webp',
  blueprint: '/photos/photo-blueprint.webp',
  // editorial imagery for the final room (the investment / doorways)
  conversation: '/photos/photo-conversation.webp', people: '/photos/photo-the-people.webp',
}
const LAYOUT: Record<string, { side: string; corner?: string }> = {
  threshold: { side: 'center' }, room: { side: 'left' }, founders: { side: 'center' },
  library: { side: 'left', corner: 'left' }, fieldnotes: { side: 'right', corner: 'right' },
  table: { side: 'center', corner: 'center' }, studio: { side: 'left' },
  advisory: { side: 'center' }, garden: { side: 'center' }, stage: { side: 'left', corner: 'left' }, blueprint: { side: 'center' },
}
const featOf = (f: string) => ({
  isShelves: f === 'shelves', isFireplace: f === 'fireplace', isGallery: f === 'gallery', isAtelier: f === 'atelier',
  isSeat: f === 'seat', isAlcove: f === 'alcove', isArchway: f === 'arch', isSecluded: f === 'secluded', isApse: f === 'apse',
})
const sideStyle = (side: string) =>
  side === 'left'
    ? { justify: 'flex-start', textAlign: 'left', scrim: 'linear-gradient(90deg, rgba(26,19,11,0.66), rgba(26,19,11,0.22) 44%, transparent 74%)' }
    : side === 'right'
    ? { justify: 'flex-end', textAlign: 'right', scrim: 'linear-gradient(270deg, rgba(26,19,11,0.66), rgba(26,19,11,0.22) 44%, transparent 74%)' }
    : { justify: 'center', textAlign: 'center', scrim: 'radial-gradient(120% 100% at 50% 58%, rgba(26,19,11,0.6), rgba(26,19,11,0.18) 56%, transparent 80%)' }
// the house reads as an emotional sequence, grouped into chapters:
//   Clarity   — threshold → blueprint → founders
//   Decisions — table → advisory
//   Building  — studio → library
// After the Library comes the Founding Wall (the philosophical hinge), then the
// Living House chapter (In Residence, Stories, Field Notes, Visionary Collective)
// — a quieter editorial section, not more cinematic room blocks. Field Notes and
// the Stage therefore leave the guided room scroll: Field Notes is featured in
// the Living House, and the Stage stays reachable through the House Directory.
const ORDER = ['threshold', 'blueprint', 'founders', 'table', 'advisory', 'studio', 'library', 'fieldnotes', 'stage', 'garden']
const enterLabelMap: Record<string, string> = {
  table: 'Let’s think together.', studio: 'Step into the Studio →', advisory: 'Let’s decide together.',
  garden: 'Let’s gain perspective.', stage: 'Give your work to the world.', blueprint: 'Explore the Blueprint →',
  fieldnotes: 'Open the notebook.', library: 'Enter the Library.',
}

export type Room = any

/** Build the full merged room set + the journey (walk-through, garden excluded). */
export function buildRooms(): { all: Room[]; journey: Room[]; byId: (id: string) => Room | undefined } {
  const all: Room[] = DATA.map((r) => {
    const plan = PLANS[r.id] || {}
    return {
      ...r, ...(EXTRAS[r.id] || {}), ...(ARTIFACTS[r.id] || {}), ...featOf(plan.feature),
      radius: plan.radius || '3px', photoId: 'photo-' + r.id, photoSrc: PHOTOS[r.id] || '',
    }
  })
  all.sort((a, b) => {
    const ia = ORDER.indexOf(a.id), ib = ORDER.indexOf(b.id)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })
  const journey = all.filter((r) => r.id !== 'garden' && r.id !== 'fieldnotes' && r.id !== 'stage').map((r, i) => {
    const lo = LAYOUT[r.id] || { side: 'center' }
    const ss = sideStyle(lo.side)
    return {
      ...r, hero: i === 0, isStage: r.id === 'stage', justify: ss.justify, textAlign: ss.textAlign, scrim: ss.scrim,
      whisperWrap: r.id === 'threshold' ? 'nowrap' : 'normal',
      blockMax: ss.textAlign === 'center' ? '700px' : '32ch',
      blockW: ss.textAlign === 'center' ? 'min(700px,88vw)' : 'auto',
      blockMx: ss.textAlign === 'center' ? 'auto' : '0',
      breeze: r.id === 'threshold' ? 'url(#breeze)' : 'none',
      contentDelay: i === 0 ? '2800ms' : '0ms',
      enterLabel: enterLabelMap[r.id] || (r.locked ? 'Enter — a key opens this' : i === 0 ? 'Step inside' : 'Enter ' + r.name),
    }
  })
  const byId = (id: string) => all.find((r) => r.id === id)
  return { all, journey, byId }
}
