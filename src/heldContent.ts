/**
 * HELD CONTENT — removed from the live Believe Studio experience.
 * ============================================================================
 * This material was removed from the live site during editorial Pass Two
 * (borrowed history). It is preserved here for EDITORIAL REFERENCE ONLY.
 *
 * It DOES NOT represent verified events, testimonials, records, or institutional
 * history. It is fabricated editorial-concept material — invented "archive" notes
 * the House had not earned.
 *
 * It must NOT be rendered as factual House memory, or reactivated on any live
 * surface, without real, attributable provenance.
 *
 * Nothing here is exported, so it cannot be imported or wired back into the live
 * experience without a deliberate change to this file. The archive *form* (the
 * ArchiveCard component and its conditional render paths) remains in place and
 * dormant; only the fabricated content was removed.
 * ============================================================================
 */

// Removed fabricated "archive" notes, keyed by the room or experience they were
// taken from. Shape matches the former `archive` field: { no, lines, source, image? }.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const heldArchiveNotes = {
  // — inline room notes (were rendered via the room overlay) —
  'library-room': { no: '012', lines: ['The answer wasn’t new.', 'It had simply waited for the right moment to be understood.'], source: '— from The Library Collection' },
  'table-room': { no: '044', lines: ['She arrived looking for advice.', 'She left realizing she wasn’t building alone.'], source: '— from The Founder’s Table Journal' },
  'studio-room': { no: '038', lines: ['She thought she needed a better idea.', 'She only needed to begin.'], source: '— from The Studio Notes' },
  'stage-room': { no: '058', lines: ['The applause wasn’t the reward.', 'Knowing another founder believed because of your story was.'], source: '— from The Stage Archive' },
  // — experience notes (were rendered on the experience pages) —
  'believe-blueprint': { no: '031', lines: ['Nothing about the company changed.', 'Only the founder’s ability to finally see it clearly.'], source: '— from The Believe Blueprint Archive', image: '/photos/artifact-sketch.webp' },
  'founders-room': { no: '027', lines: ['The founder wasn’t asking about packaging.', 'She was asking for permission.'], source: '— from The Founder’s Room Archive', image: '/photos/artifact-buyernote.webp' },
  'founders-table': { no: '044', lines: ['She arrived looking for advice.', 'She left realizing she wasn’t building alone.'], source: '— from The Founder’s Table', image: '/photos/artifact-journal.webp' },
  'founder-conversation': { no: '003', lines: ['She expected us to ask about the numbers.', 'We asked about her instead.'], source: '— from the Conversation Notes' },
  'private-advisory': { no: '051', lines: ['The breakthrough didn’t happen in the meeting.', 'It happened when she finally trusted herself.'], source: '— from The Private Advisory Archive' },
  'visionary-collective': { no: '072', lines: ['She wasn’t ready to begin.', 'She only wanted to know the door would still be open.'], source: '— from The Front Porch Archive' },
  // — Stage chapter local note (Stage itself is slated for removal in Pass Five) —
  'stage-chapter': { no: '058', lines: ['The applause wasn’t the reward.', 'Knowing another founder believed because of your story was.'], source: '— from The Stage Archive' },
}
