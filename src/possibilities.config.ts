/**
 * Find Your Next Possibility — the single source of truth for the experience.
 *
 * All questions, answers, results, and the answer-specific copy live here so the
 * wording and matching can be edited in one place without touching the
 * component. The matching is fully deterministic (no AI, no scoring):
 *
 *   Question 1  → selects the primary result (discovery | purchases |
 *                 partnerships | focus) and the "hoping for" phrase.
 *   Question 2  → acknowledged (Q2_SHARED) and then given a GOAL-SPECIFIC
 *                 observation (Q2_OBSERVATION[result][answer]).
 *   Question 3  → adds a GOAL-SPECIFIC adjustment to the suggested next move
 *                 (Q3_ADJUSTMENT[result][answer]).
 *   Question 4  → tailors the closing invitation.
 *
 * Q2 and Q3 copy is keyed by the result first, so every combination supports
 * one coherent experiment anchored to the founder's stated goal.
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

// Goal-specific adjustment that follows the result's experiment (nextMove).
// Keyed by the Q1 result FIRST, then the Q3 answer, so the adjustment tailors
// the SAME experiment to how the founder is choosing where to grow, rather than
// a universal sentence appended to every result.
export const Q3_ADJUSTMENT: Record<ResultKey, Record<string, string>> = {
  discovery: {
    signals: 'Begin with a place that resembles where you already see interest, so you build on something real.',
    approach: 'Treat the place you believe could fit as a first test, and use what people do there to judge the fit before you expand.',
    ascome: 'If places tend to come to you, give yourself a simple way to compare them so you sample the one with the clearest fit first.',
    fresh: 'For a fresh angle, try a setting you have not considered before and watch what people actually do, not only what you expect.',
  },
  purchases: {
    signals: 'Since you can already see where interest shows up, follow those interested people one step further to find where fewer of them continue.',
    approach: 'Start with the step you suspect is the sticking point, and treat your change as a small test of whether that is really what holds people back.',
    ascome: 'Since opportunities arrive as they come, start by mapping the main paths people take toward buying, then improve the one step most of them reach.',
    fresh: 'For a fresh angle, ask a few recent buyers and non-buyers what nearly stopped them, and test the change their answers point to.',
  },
  partnerships: {
    signals: 'Start with a partner whose audience overlaps with where you already see interest, so the match is grounded in something real.',
    approach: 'With the partner you believe could fit, use their customers’ responses to assess whether the fit is there before going further.',
    ascome: 'If partnership ideas arrive as they come, give yourself a simple way to compare them so you pursue the one with the clearest shared benefit first.',
    fresh: 'For a fresh angle, consider a partner outside your usual circles whose audience would still value what you make.',
  },
  focus: {
    signals: 'Let the interest you have already noticed shape the question your test should answer, not only which direction you choose.',
    approach: 'Take the direction you believe could fit and treat this as a test of whether it earns more of your attention.',
    ascome: 'If opportunities arrive as they come, list them side by side first so your time goes to the most promising one.',
    fresh: 'For a fresh angle, compare the options by what each could teach you about customers, rather than how exciting or familiar it feels.',
  },
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
