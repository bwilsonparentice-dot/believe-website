/**
 * Find Your Next Possibility — the single source of truth for the experience.
 *
 * All questions, answers, results, and the answer-specific copy live here so the
 * wording and matching can be edited in one place without touching the
 * component. The matching is fully deterministic (no AI, no scoring):
 *
 *   Question 1  → selects the primary result (discovery | purchases |
 *                 partnerships | focus) and the "hoping for" phrase.
 *   Question 2  → adds one observation to the result explanation.
 *   Question 3  → adds one adjustment to the suggested next move.
 *   Question 4  → tailors the closing invitation.
 *
 * Copy avoids diagnosing the business: it uses "You shared…" and "One
 * possibility worth testing…" rather than stating verified facts. No em dashes.
 */

export type ResultKey = 'discovery' | 'purchases' | 'partnerships' | 'focus'

export interface Answer { id: string; label: string }
export interface Question { id: 1 | 2 | 3 | 4; prompt: string; answers: Answer[] }

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'What would you love to see happen next for your brand?',
    answers: [
      { id: 'discovery', label: 'Get discovered by more of the right people.' },
      { id: 'purchases', label: 'Turn interest into more purchases.' },
      { id: 'partnerships', label: 'Find a promising new place or partnership.' },
      { id: 'focus', label: 'Get clearer about where to focus.' },
    ],
  },
  {
    id: 2,
    prompt: 'When someone discovers your product, what usually happens?',
    answers: [
      { id: 'understand', label: 'They understand it and want to try it.' },
      { id: 'explain', label: 'They need a little explanation first.' },
      { id: 'interest', label: 'They show interest, but buying does not always follow.' },
      { id: 'learning', label: 'We are still learning.' },
    ],
  },
  {
    id: 3,
    prompt: 'How are you choosing where to grow?',
    answers: [
      { id: 'signals', label: 'Following where we already see customer interest.' },
      { id: 'approach', label: 'Approaching places we think could fit.' },
      { id: 'ascome', label: 'Pursuing opportunities as they come.' },
      { id: 'fresh', label: 'We could use a fresh perspective.' },
    ],
  },
  {
    id: 4,
    prompt: 'Finish this sentence: "I wish we had a partner who could help us…"',
    answers: [
      { id: 'see', label: 'See opportunities we might be missing.' },
      { id: 'plan', label: 'Turn our ideas into a focused plan.' },
      { id: 'connect', label: 'Bring the right people together.' },
      { id: 'alongside', label: 'Work alongside us to make things happen.' },
    ],
  },
]

// Question 1 answer id → primary result
export const RESULT_BY_Q1: Record<string, ResultKey> = {
  discovery: 'discovery',
  purchases: 'purchases',
  partnerships: 'partnerships',
  focus: 'focus',
}

// Question 1 answer id → the "what you'd love next" phrase used in the explanation
export const Q1_HOPE: Record<string, string> = {
  discovery: 'be discovered by more of the right people',
  purchases: 'turn interest into more purchases',
  partnerships: 'find a promising new place or partnership',
  focus: 'get clearer about where to focus',
}

export interface Result { headline: string; nextMove: string; example: string; freshQuestion: string }

export const RESULTS: Record<ResultKey, Result> = {
  discovery: {
    headline: 'Find a setting where your difference matters.',
    nextMove: 'List three places where your product’s difference would matter to the customer. Choose one and propose a small sampling test. Notice what people ask, try and buy before expanding.',
    example: 'A travel snack might explore a walking-tour company, a boutique hotel welcome bag or a local adventure group.',
    freshQuestion: 'Where could someone experience your product and immediately understand why it belongs there?',
  },
  purchases: {
    headline: 'Explore the step between interest and purchase.',
    nextMove: 'Pick the one moment where interested people tend to pause before buying. Make a single small change there, such as a clearer first line, a sample or an easier way to begin, and watch whether more people move forward.',
    example: 'A skincare brand might try a trial size, a short “how to use it” card or clear information about delivery and returns, changing only one thing at a time to see which one eases the decision.',
    freshQuestion: 'What might someone need to feel confident enough to try your product?',
  },
  partnerships: {
    headline: 'Create a connection worth exploring.',
    nextMove: 'Name three businesses that already reach the customer you would love to meet, without competing with you. Choose one and sketch a small shared offer that gives their customer something genuinely useful, then suggest a short trial before anything bigger.',
    example: 'A small coffee roaster might approach a neighborhood bookshop, a cycling club or a weekend market about a limited pairing or a short pop-up.',
    freshQuestion: 'Who already has a relationship with the people you would love to reach?',
  },
  focus: {
    headline: 'Give one promising idea room to prove itself.',
    // Default wording, used when the founder's answers suggest they already have
    // some customer feedback to lean on (see FOCUS_NEXT_MOVE_NO_FEEDBACK below).
    nextMove: 'Write down the few directions competing for your attention. Choose the one with the clearest sign of customer interest that you can realistically test. Give it two weeks with a clear question you want answered. Decide now what result would tell you to keep going, adjust or set it aside.',
    example: 'A brand weighing wholesale, a pop-up and a new online bundle might compare the effort, the cost and what each could teach them about customer interest, then try the one with the least effort and the most useful learning.',
    freshQuestion: 'Which small experiment could help you make your next decision with more clarity?',
  },
}

// Focus path, alternate "next move" used when the founder's answers indicate they
// do not yet have customer feedback to lean on (Question 2 = "We are still
// learning"). The surrounding two-week experiment and the continue/adjust/stop
// decision are kept identical to the default above.
export const FOCUS_NEXT_MOVE_NO_FEEDBACK = 'Write down the few directions competing for your attention. Choose one idea you can realistically test to learn whether customers are interested. Give it two weeks with a clear question you want answered. Decide now what result would tell you to keep going, adjust or set it aside.'

// Question 2 answer id → an observation added to the explanation (reads as a
// follow-on sentence after "You shared that you'd love to <hope>.")
export const Q2_OBSERVATION: Record<string, string> = {
  understand: 'Since people tend to understand it quickly, the opportunity may be less about explaining your product and more about placing it in front of the right people at the right moment.',
  explain: 'Since people often need a little context first, a setting or a story that does some of that explaining for you could help the first impression land faster.',
  interest: 'Since interest does not always turn into a purchase yet, exploring that gap could help you learn what is holding people back.',
  learning: 'Since you are still learning how people respond, a few small, low-stakes tests could turn that uncertainty into clearer answers.',
}

// Question 3 answer id → an adjustment added to the suggested next move (reads
// as a follow-on sentence after the result's nextMove)
export const Q3_ADJUSTMENT: Record<string, string> = {
  signals: 'Because you are already watching what customers ask for and respond to, begin with the opportunity they point to most clearly.',
  approach: 'Because you are approaching options you believe could fit, treat your first step as a small test of whether the fit is really there before you commit further.',
  ascome: 'Because opportunities are arriving as they come, give yourself a simple way to compare them so your energy goes to the few that matter most.',
  fresh: 'Because a fresh perspective would help, keep this first step small and focused so what you learn points clearly to the next one.',
}

// Question 4 answer id → the closing invitation (collaborative, curious,
// practical; promises no free research and no finished strategy)
export const Q4_INVITATION: Record<string, string> = {
  see: 'At Believe Studio, we love noticing the opportunities that are easy to miss when you are close to the work. If you would like a second set of eyes on yours, we would be glad to look together.',
  plan: 'At Believe Studio, we enjoy turning a founder’s ideas into a focused, practical plan. If you would like to shape yours into a clear next step, we would be glad to think it through with you.',
  connect: 'At Believe Studio, we are always connecting complementary brands, people, and places. If bringing the right people together would help, we would be glad to explore who that might be.',
  alongside: 'At Believe Studio, we work as a committed partner beside founders, creative thinking paired with practical follow-through. If you would like someone in it with you, we would be glad to begin.',
}

export const RESULT_NOTE = 'A starting point based on your answers, ready to explore further.'
