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
    person: { name: 'Beth Wilson-Parentice', first: 'Beth', role: 'The founder. She built this house — and created The Spark Method™, which turns kitchen-table ideas into movements.' },
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
    person: { name: 'Mona Wilson', first: 'Mona', role: 'She builds the systems, workflows, and automation that turn founder strategy into real-world momentum.' },
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
  threshold: { principle: 'Arrival', artifact: 'The Key', artifactNote: 'The invitation was always enough.', continueLabel: 'Step further in', light: 'radial-gradient(56% 50% at 38% 22%, rgba(255,238,196,0.55), transparent 66%)' },
  founders: { principle: 'Confidence', artifact: 'The Chair', artifactNote: 'Two chairs. One conversation. No agenda.', continueLabel: 'Continue', light: 'radial-gradient(60% 54% at 30% 26%, rgba(255,226,178,0.5), transparent 68%)' },
  library: { principle: 'Curiosity', artifact: 'The Ladder', artifactNote: 'For reaching what others left high on the shelf.', continueLabel: 'Take this with you', light: 'radial-gradient(50% 46% at 42% 30%, rgba(255,212,146,0.6), transparent 64%)' },
  fieldnotes: { principle: 'Curiosity', artifact: 'The Journal', artifactNote: 'Open. Already written in. Never pristine.', continueLabel: 'Keep noticing', light: 'radial-gradient(58% 52% at 40% 20%, rgba(224,238,255,0.44), transparent 66%)' },
  table: { principle: 'Belonging', artifact: 'The Empty Chair', artifactNote: 'Not reserved for experts. Reserved for honesty.', continueLabel: 'Come when you’re ready', light: 'radial-gradient(58% 52% at 40% 22%, rgba(255,231,186,0.52), transparent 66%)' },
  studio: { principle: 'Craftsmanship', artifact: 'The Worktable', artifactNote: 'Covered in the unfinished. That is the point.', continueLabel: 'Keep building', light: 'radial-gradient(62% 56% at 34% 18%, rgba(204,223,238,0.5), transparent 68%)' },
  advisory: { principle: 'Clarity', artifact: 'The Private Door', artifactNote: 'Closed. Heavy walnut. No explanation offered.', continueLabel: 'Continue', light: 'radial-gradient(46% 44% at 44% 34%, rgba(240,218,176,0.42), transparent 60%)' },
  garden: { principle: 'Clarity', artifact: 'The Stone Bench', artifactNote: 'Warm from the morning sun. Sit as long as you like.', continueLabel: 'Stay a while', light: 'radial-gradient(58% 52% at 38% 22%, rgba(224,240,194,0.5), transparent 66%)' },
  stage: { principle: 'Belonging', artifact: 'The Podium', artifactNote: 'Empty. Waiting for what you have become.', continueLabel: 'Pass it forward', light: 'radial-gradient(56% 50% at 40% 22%, rgba(255,222,204,0.5), transparent 66%)' },
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
    whisper: 'When Belief Becomes Visible.',
    keywords: ['Share', 'Teach', 'Inspire', 'Legacy'],
    body: [
      'There comes a moment when the work no longer belongs only to you. After the Blueprint, after the conversations, after the difficult decisions, your ideas begin to travel farther than you ever could.',
      'Some founders publish books. Some mentor the next generation. Some stand on stages. Some simply build companies that quietly change lives.',
      'The Stage isn’t about being seen. It’s about creating something worth remembering.',
    ] },
]

export const STORIES = [
  { name: 'Michelle', of: 'Date Better', pid: 'story-michelle', dir: 'row', quote: 'Having Beth as an advisor has been a gift. Her warm, caring presence makes every conversation feel like a safe place to think big, be vulnerable, and get clear. If you’re lucky enough to work with her, say yes.' },
  { name: 'Snehee', of: 'Gallivant', pid: 'story-snehee', dir: 'row-reverse', quote: 'Beth came in at a pivotal time — she helped me get investor-ready, not just on paper, but in confidence, clarity, and how I showed up in the room. She turned complex brand language into simple, compelling stories.' },
  { name: 'Lee', of: 'building quietly, for years', pid: 'story-lee', dir: 'row', quote: 'Nobody here tried to fix me. They just helped me hear myself think again.' },
  { name: 'April', of: 'a founder, twice over', pid: 'story-april', dir: 'row-reverse', quote: 'I stopped performing certainty and started making better decisions. That changed everything.' },
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

export type FieldNote = { n: string; obs: string; tilt: string; title?: string; hand?: string; to?: string }
export const FIELD_NOTES: FieldNote[] = [
  { n: '014', obs: 'Growth usually creates new problems faster than confidence.', tilt: '-0.5deg' },
  { n: '027', obs: 'The founder wasn’t asking about packaging.', hand: 'She was asking for permission.', to: 'The Founder’s Room', tilt: '0.5deg' },
  { n: '041', obs: 'Questions repeated three times are usually the real questions.', tilt: '0.4deg' },
  { n: '056', obs: 'Most founders don’t need another framework. They need a room quiet enough to hear themselves think.', to: 'The House', tilt: '-0.6deg' },
  { n: '063', obs: 'Retail rarely breaks companies.', hand: 'Confusion usually does.', tilt: '0.5deg' },
  { n: '071', title: 'On beginning', obs: 'Every meaningful company we’ve watched take shape began the same way — not with a plan, but with a better question.', to: 'The Believe Blueprint', tilt: '-0.4deg' },
  { n: '084', obs: 'A founder can outgrow their positioning long before they outgrow their business.', tilt: '0.6deg' },
  { n: '090', obs: 'The bravest thing said at the table is usually the quietest.', to: 'Inside the Studio', tilt: '-0.5deg' },
  { n: '097', obs: 'Clarity is not the reward at the end of the work. It is the thing that makes the work possible.', tilt: '0.4deg' },
  { n: '102', obs: 'Sometimes the next strategy begins with a better question.', tilt: '-0.5deg' },
  { n: '118', title: 'Unfinished', obs: '— what if belief is the only asset that compounds without capital?', hand: '(left for later)', tilt: '0.6deg' },
  { n: '126', obs: 'The founders who go on to build the most give the most away first.', to: 'The Stage', tilt: '-0.4deg' },
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
  { no: '001', name: 'The Brass Key', src: 'key-photo.png', story: 'Sent once, by mail, to every founder who joins the house. Most are never used to open anything — they are kept on desks, on shelves, in pockets, as a quiet reminder that the door was always open.', lesson: 'The invitation was always enough.', photo: 'The handcrafted brass key resting on linen beside a folded invitation — morning light, soft shadows, nothing staged', dir: 'row' },
  { no: '002', name: 'The Folded Buyer Note', src: 'archive-002.png', story: 'A handwritten note from a retail buyer, corners softened from being unfolded and refolded a hundred times. One sentence long. It was the yes that turned a kitchen idea into a company.', lesson: 'One sentence can change everything that follows.', photo: 'A slightly worn handwritten retailer note resting beside a coffee mug, corners softened from being unfolded many times', dir: 'row-reverse' },
  { no: '003', name: 'Prototype No. 1', src: 'archive-003.png', story: 'The original. Imperfect in every way the founder later learned to fix, and kept precisely because of it — proof that meaningful things rarely arrive finished.', lesson: 'Still imperfect. Still worth keeping.', photo: 'The original imperfect prototype, beautifully photographed — evidence of beginnings', dir: 'row' },
  { no: '004', name: 'A Handwritten Blueprint', src: 'archive-004.png', story: 'Before the plan had a name, it was pencil on tracing paper — construction lines, second thoughts, a ring left by a coffee cup. The first Believe Blueprint, drawn by hand.', lesson: 'Every company begins as a drawing before it becomes a building.', photo: 'The original Believe Blueprint resting beneath tracing paper, construction lines barely visible, coffee nearby', dir: 'row-reverse' },
  { no: '005', name: 'A Ceramic Mug', src: 'archive-005.png', story: 'Still half full. Left on the table the morning a founder finally said the thing they had been circling for months. Nobody washed it. It stayed.', lesson: 'The most important decisions are made over something warm.', photo: 'A ceramic mug, half full, on a walnut table — evidence someone has just stood up from a long conversation', dir: 'row' },
  { no: '006', name: 'A Retailer Badge', src: 'archive-006.png', story: 'A trade-show badge, lanyard still creased. The morning the shelf stopped being a dream and became an address.', lesson: 'The shelf becomes real the day someone walks you to it.', photo: 'A worn trade-show retailer badge with creased lanyard, resting on cream paper in soft light', dir: 'row-reverse' },
]
export const LIBRARY_KEEPERS = [
  { name: 'Tiffany Nilles', note: 'She keeps the shelf on finding the right rooms — and staying in them. The wisdom of knowing where a brand truly belongs before chasing where it doesn’t.' },
  { name: 'Jillian Rhys', note: 'She keeps the words founders leave behind, and the ones still forming. If a sentence in here stays with you, it likely passed through her hands first.' },
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
  { first: 'Tiffany', name: 'Tiffany Nilles', pid: 'portrait-tiffany', dir: 'row-reverse', room: 'The Table', portrait: 'Editorial portrait of Tiffany at The Table — an open notebook, conversation, coffee', belief: 'Tiffany believes clarity creates momentum. She quietly helps founders move from possibility to progress.', when: 'when ideas begin becoming organized into meaningful action.' },
  { first: 'Mona', name: 'Mona Wilson', pid: 'portrait-mona', dir: 'row', room: 'The Garden', portrait: 'Editorial portrait of Mona in The Garden — olive trees, a stone path, morning light', belief: 'Mona believes meaningful conversations change lives.', when: 'around The Table—where AI meets CPG, and efficiency makes more room for connection.' },
]

export const STAGE_MOMENTS = [
  { k: 'A Founder’s First Yes', b: 'The buyer who believed first. The retailer that opened the first door. The moment possibility became real.' },
  { k: 'Around the Table', b: 'Founder dinners. Shared meals. Honest conversations. The moments that never appear in press releases — yet often change everything.' },
  { k: 'Beyond the House', b: 'Fancy Food Show. Founder gatherings. Retail summits. Private salons. The house occasionally leaves home — carrying its philosophy wherever founders gather.' },
  { k: 'Stories Worth Sharing', b: 'Launches. Milestones. Golden Tickets. Shelf placements. Keynotes. Awards. Not because recognition defines success — because every founder deserves to have someone witness the moment.' },
]
export const STAGE_GALLERY = [
  'A founder beside their product, first time on shelf', 'Fancy Food Show installation', 'A Founder Table dinner',
  'Chef Mona, mid-demonstration', 'A retail launch', 'A keynote, mid-sentence', 'Editorial founder portrait', 'A community dinner, late evening',
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
  threshold: '/photos/photo-threshold.png', room: '/photos/photo-room.png', table: '/photos/photo-table.png',
  garden: '/photos/photo-garden.png', library: '/photos/photo-library.png', fieldnotes: '/photos/photo-fieldnotes.png',
  stage: '/photos/photo-stage.png', advisory: '/photos/photo-advisory.png',
  // The Studio and The Founder's Room now show photographs (previously type-led).
  studio: '/photos/photo-studio.png', founders: '/photos/photo-founders.webp',
  blueprint: '/photos/photo-blueprint.webp',
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
const ORDER = ['threshold', 'founders', 'blueprint', 'fieldnotes', 'library', 'table', 'studio', 'garden', 'advisory', 'stage']
const enterLabelMap: Record<string, string> = {
  table: 'Let’s think together.', studio: 'Let’s learn together.', advisory: 'Let’s decide together.',
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
  const journey = all.filter((r) => r.id !== 'garden').map((r, i) => {
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
