/**
 * Believe's architectural colour system.
 *
 * The rule: the environment is quiet — cream, chalk, stone, linen — and colour
 * appears only when the visitor CROSSES into a different part of the House,
 * never as decoration. Quiet at first glance; richer the further in you go.
 *
 *   navy   — authority. Selected full-width room transitions, and the one
 *            primary action (Start a Conversation). Navy on cream reads as
 *            institution, not luxury-brand.
 *   olive  — small institutional signals (a status, a marker, a quiet label).
 *   gold   — precious details only, discovered rather than announced: the arch
 *            mark, the Key, hairline rules, and active states.
 *
 * Use these by role, sparingly. If a colour is doing decoration, remove it.
 */
export const palette = {
  // the dominant environment
  cream: '#efe6d3',
  chalk: '#f4ede0',
  linen: '#faf4ea',
  stone: '#e7dcc4',
  ink: '#2b2723',

  // architectural accents — used by role, never as fill-the-space colour
  navy: '#1e2a44',
  navyDeep: '#16203a',
  olive: '#6f7d48',
  gold: '#9c7a3f',
} as const
