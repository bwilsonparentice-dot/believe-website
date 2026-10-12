import React from 'react'

/**
 * BeyondBordersHero — the signature Believe Beyond Borders artwork with the
 * journal title set as live typography. The watercolor (text-free) is the
 * background; BELIEVE and BEYOND BORDERS are rendered in the House serif with
 * balanced weight, over the artwork's clear centre on larger widths and
 * beneath it on narrow mobile (see .bbb-hero rules in index.css). Used both as
 * the Library's restrained preview and the journal landing's expansive hero.
 */
export function BeyondBordersHero({ variant = 'landing' }: { variant?: 'landing' | 'preview' }) {
  return (
    <div className={`bbb-hero bbb-hero--${variant}`}>
      <img
        className="bbb-hero__art"
        src="/photos/bbb-worldmap.webp"
        width={2000} height={750}
        alt="A watercolor world map tracing gold routes between New York, London, Paris, and Florence, framed by olive branches and a compass rose."
      />
      <div className="bbb-hero__title" aria-hidden="true">
        <span className="bbb-hero__believe">Believe</span>
        <span className="bbb-hero__beyond">Beyond Borders</span>
        <span className="bbb-hero__rule" aria-hidden="true" />
        <span className="bbb-hero__sub">A Journal of People, Places, and Possibility</span>
      </div>
    </div>
  )
}
