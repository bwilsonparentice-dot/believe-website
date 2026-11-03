/**
 * Find Your Next Possibility — the single source of truth for the experience.
 *
 * All questions, answers, results, and the answer-specific copy live here so the
 * wording and matching can be edited in one place without touching the
 * component. The matching is fully deterministic (no AI, no scoring):
 *
 *   Question 1  → selects the primary result (discovery | purchases |
 *                 partnerships | focus), its headline, takeaway, example and
 *                 fresh question, and the "hoping for" phrase.
 *   Question 2  → acknowledged (Q2_SHARED) and then given a GOAL-SPECIFIC
 *                 observation (Q2_OBSERVATION[result][answer]).
 *   Question 3  → shapes the single experiment the founder is offered, by
 *                 choosing a GOAL-SPECIFIC "what to try" (EXPERIMENT_TRY[result]
 *                 [answer]). "What to notice" (EXPERIMENT_NOTICE[result]) is
 *                 goal-level. Q3 is woven into one coherent experiment, never
 *                 appended as a sentence that repeats the core instruction.
 *   Question 4  → tailors the closing invitation.
 *
 * Copy is tentative and faithful: it acknowledges only what the founder told us
 * and never assumes product category, customer identity, pricing, performance
 * or buying behavior we have not collected. No timeframes are prescribed, no
 * outcome is promised, and there are no em dashes.
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

export interface Result { headline: string; example: string; freshQuestion: string }

export const RESULTS: Record<ResultKey, Result> = {
  discovery: {
    headline: 'Find a setting where your difference matters.',
    example: 'A travel snack might explore a walking-tour company, a boutique hotel welcome bag or a local adventure group.',
    freshQuestion: 'Where could someone experience your product and immediately understand why it belongs there?',
  },
  purchases: {
    headline: 'Explore the step between interest and purchase.',
    example: 'A skincare brand might try a trial size, a short “how to use it” card or clear information about delivery and returns, changing only one thing at a time to see which one eases the decision.',
    freshQuestion: 'What might someone need to feel confident enough to try your product?',
  },
  partnerships: {
    headline: 'Create a connection worth exploring.',
    example: 'A small coffee roaster might approach a neighborhood bookshop, a cycling club or a weekend market about a limited pairing or a short pop-up.',
    freshQuestion: 'Who already has a relationship with the people you would love to reach?',
  },
  focus: {
    headline: 'Give one promising idea room to prove itself.',
    example: 'A brand weighing wholesale, a pop-up and a new online bundle might compare the effort, the cost and what each could teach them about customer interest, then try the one with the least effort and the most useful learning.',
    freshQuestion: 'Which small experiment could help you make your next decision with more clarity?',
  },
}

// One memorable, editorial takeaway per goal: Believe Studio's perspective, not
// a personalized finding or a proven conclusion about the founder's brand.
export const TAKEAWAY: Record<ResultKey, string> = {
  discovery: 'Where someone meets your brand can help them see why it matters.',
  purchases: 'Understanding your product and feeling ready to buy are two different moments.',
  partnerships: 'A useful partnership starts with something valuable for the customer you share.',
  focus: 'Give your next move a clear question to answer.',
}

// Question 2 answer id → a neutral paraphrase of what the founder told us,
// used to acknowledge their answer in the explanation. It only restates their
// choice (no claim we have not collected), reading as:
// "You shared that you'd love to <hope>, and that <shared>."
export const Q2_SHARED: Record<string, string> = {
  understand: 'people tend to understand your product quickly',
  explain: 'people often need a little context first',
  interest: 'interest does not always turn into a purchase yet',
  learning: 'you are still learning how people respond',
}

// Goal-specific observation that follows the acknowledgement above. Keyed by the
// Q1 result FIRST, then the Q2 answer, so the observation always supports the
// founder's stated goal rather than drifting toward a different one. Tentative
// ("one possibility", "may be") and never assumes facts we have not collected.
export const Q2_OBSERVATION: Record<ResultKey, Record<string, string>> = {
  discovery: {
    understand: 'One possibility worth testing is placing it where the right people would naturally meet it, to see whether the right context does more for you than extra explaining would.',
    explain: 'One possibility is to let the setting do some of that explaining for you, so where and when people first meet the product carries more of the story.',
    interest: 'One possibility is to aim your discovery at the places and moments where people tend to be ready to act, not only to look.',
    learning: 'One possibility is to let yourself be discovered in a few different settings and notice where the right people respond most naturally.',
  },
  purchases: {
    understand: 'One possibility is to explore what happens next: what do they still need to know, feel or experience before deciding to buy?',
    explain: 'One possibility is that the context people need early is also part of what delays the decision, so making it clear at the right moment could help.',
    interest: 'That gap between interest and buying is the place to look, where one small, specific change could make the decision easier.',
    learning: 'One possibility is to run a few small tests around the moment of decision and watch what helps someone move from interested to buying.',
  },
  partnerships: {
    understand: 'One possibility is a partner who already has the right audience, since a product people grasp quickly can be straightforward for them to introduce.',
    explain: 'One possibility is a partner who can lend context and credibility, introducing you to people who already trust them.',
    interest: 'One possibility is that a trusted partner’s recommendation becomes the nudge that helps interested people act.',
    learning: 'One possibility is to treat a small partnership as a low-stakes way to test the product with a new, well-matched audience.',
  },
  focus: {
    understand: 'One possibility is that your time is best spent choosing which direction to pursue first, which is worth testing rather than assuming.',
    explain: 'That is worth weighing as you choose where to focus, since some directions will ask for more explaining than others.',
    interest: 'One useful place to focus could be understanding what happens between someone showing interest and deciding whether to buy.',
    learning: 'So focus may come less from deciding now and more from a few small tests that show you where to commit.',
  },
}

// The single experiment, split into a scannable "what to try" and "what to
// notice". "What to try" is keyed by the Q1 result FIRST, then the Q3 answer, so
// how the founder is choosing where to grow shapes the ONE experiment rather
// than being appended as a repetitive extra sentence. "What to notice" is
// goal-level. No timeframe is prescribed and no outcome is promised.
export const EXPERIMENT_TRY: Record<ResultKey, Record<string, string>> = {
  discovery: {
    signals: 'Starting from where you already see interest, pick one place that resembles it and put the product in front of people there in a small, low-commitment way.',
    approach: 'Pick one place you believe could fit and put the product in front of people there in a small, low-commitment way, before committing to more.',
    ascome: 'From the places that have come your way, pick the one that fits best and put the product in front of people there in a small, low-commitment way.',
    fresh: 'Pick one place you have not tried before and put the product in front of people there in a small, low-commitment way, to see how it lands.',
  },
  purchases: {
    signals: 'Follow the people who already show interest and pick one point where fewer of them continue. Try one small change there, such as offering a sample, answering a common question or making the first purchase easier.',
    approach: 'Choose one point where you suspect interested people hesitate before buying. Try one small change, such as offering a sample, answering a common question or making the first purchase easier.',
    ascome: 'Look at the main way people reach a purchase and pick the one step where some stop. Try one small change there, such as offering a sample, answering a common question or making the first purchase easier.',
    fresh: 'Ask a few recent buyers and non-buyers where they nearly stopped, and pick the point they name. Try one small change there, such as offering a sample, answering a common question or making the first purchase easier.',
  },
  partnerships: {
    signals: 'Pick one business whose audience overlaps with where you already see interest, and sketch a small shared offer that gives their customers something genuinely useful, then propose a short first run.',
    approach: 'Pick one business you believe could fit and sketch a small shared offer that gives their customers something genuinely useful, then propose a short first run to see whether the fit is there.',
    ascome: 'From the partnership ideas that have come your way, pick the one with the clearest shared benefit and sketch a small shared offer for their customers, then propose a short first run.',
    fresh: 'Pick one business outside your usual circles whose audience would still value what you make, and sketch a small shared offer for their customers, then propose a short first run.',
  },
  focus: {
    signals: 'Let the interest you have already noticed point to one direction, and give it a small, real test built around one clear question you want answered.',
    approach: 'Take the one direction you believe could fit and give it a small, real test built around one clear question you want answered.',
    ascome: 'List the directions that have come your way side by side, pick the most promising one, and give it a small, real test built around one clear question you want answered.',
    fresh: 'Compare the directions by what each could teach you about customers. Choose one you can realistically test, and build the experiment around one clear question you want answered.',
  },
}

// Goal-level "what to notice": what the founder should watch for, phrased as
// observation rather than measurement, and never promising a result.
export const EXPERIMENT_NOTICE: Record<ResultKey, string> = {
  discovery: 'Which settings make people stop, look closer and ask about it, and where it seems to belong most naturally.',
  purchases: 'Whether more people buy, what questions they ask and what you can learn from those who don’t.',
  partnerships: 'How their customers respond, whether the shared offer feels useful to them, and whether the fit seems real on both sides.',
  focus: 'What the test teaches you about customer interest, and whether it gives you a clear reason to keep going, adjust or set it aside.',
}

// Question 4 answer id → the closing invitation (collaborative, curious,
// practical; promises no free research and no finished strategy)
export const Q4_INVITATION: Record<string, string> = {
  see: 'At Believe Studio, we love noticing the opportunities that are easy to miss when you are close to the work. If you would like a second set of eyes on yours, we would be glad to look together.',
  plan: 'At Believe Studio, we enjoy turning a founder’s ideas into a focused, practical plan. If you would like to shape yours into a clear next step, we would be glad to think it through with you.',
  connect: 'At Believe Studio, we are always connecting complementary brands, people, and places. If bringing the right people together would help, we would be glad to explore who that might be.',
  alongside: 'At Believe Studio, we work as a committed partner beside founders, creative thinking paired with practical follow-through. If you would like someone in it with you, we would be glad to begin.',
}

// A quiet honesty note shown below the fresh question: this is a starting point
// from four answers, not a finding about the founder's brand.
export const RESULT_NOTE = 'A starting point based on your answers, ready to explore further.'

