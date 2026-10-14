import type { CSSProperties } from 'react'
import { ImageSlot } from './ImageSlot'
import { palette } from '../lib/palette'

/**
 * Good Company — the brands in our orbit. A refined editorial gallery: six
 * authentic product photographs on consistent warm backdrops, presented as a
 * three-column, two-row collection with gentle column offsets. Beneath, the two
 * founder testimonials (Snehee of Gallivant, Michelle of Date Better) sit with
 * their circular portraits beside their words. Imagery is authentic and
 * unaltered; both quotes are verbatim. Replaces the single testimonial that
 * used to close the People & Experience moment.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"
const eyebrow: CSSProperties = { fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)' }

type Brand = { name: string; cat?: string; file: string; alt: string }
const BRANDS: Brand[] = [
  { name: 'Peanut Butter & Co.', cat: 'Spreads', file: '/photos/gc-pb.webp', alt: 'Peanut Butter & Co. smooth peanut butter' },
  { name: 'Date Better Snacks', cat: 'Dates', file: '/photos/gc-datebetter.webp', alt: 'Date Better Snacks chocolate-covered dates' },
  { name: 'Gallivant Ice Cream', file: '/photos/gc-gallivant.webp', alt: 'Gallivant mango mawa ice cream' },
  { name: 'Maia', cat: 'Greek Yogurt', file: '/photos/gc-maia.webp', alt: 'Maia grass-fed Greek yogurt' },
  { name: 'Tamalitoz', cat: 'British × Mexican Candy', file: '/photos/gc-tamalitoz.webp', alt: 'Tamalitoz by Sugarox candy' },
  { name: 'Fizzy Wizzie’s', cat: 'Sparkling Tea', file: '/photos/gc-fizzy.webp', alt: 'Fizzy Wizzie’s sparkling fresh brewed tea' },
]

export function GoodCompany() {
  return (
    <div className="gc-wrap">
      <div className="gc-head">
        <div style={eyebrow}>The brands in our orbit</div>
        <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(44px,7.4vw,86px)', lineHeight: 0.98, letterSpacing: '-0.01em', color: palette.navy, margin: 'clamp(16px,2.4vh,26px) 0 0' }}>Good company.</h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.66)', maxWidth: '34ch', margin: 'clamp(20px,3vh,30px) auto 0' }}>Different founders. Different ambitions. A shared belief in what could be.</p>
      </div>

      <div className="gc-grid">
        {BRANDS.map((b) => (
          <div className="gc-cell gc-reveal" key={b.name}>
            <div className="gc-plate"><ImageSlot src={b.file} alt={b.alt} placeholder={b.name} /></div>
            <div className="gc-lab">{b.name}</div>
            {b.cat && <div className="gc-cat">{b.cat}</div>}
          </div>
        ))}
      </div>

      <div className="gc-rule" aria-hidden="true" />

      <div className="gc-voices">
        <div className="gc-voice gc-reveal">
          <div className="gc-port"><ImageSlot src="/photos/portrait-snehee-gc.webp" alt="Snehee, founder of Gallivant" placeholder="Snehee" style={{ objectPosition: '48% 50%' }} /></div>
          <div>
            <p className="gc-quote">&ldquo;She broke down complex brand and marketing language into simple, compelling stories. I knew my brand deeply, but Beth helped me tell it &mdash; clearly, confidently, and in a way that actually landed with the right audience.&rdquo;</p>
            <div className="gc-attr">Snehee Chaplot &middot; Founder, Gallivant</div>
          </div>
        </div>
        <div className="gc-voice gc-reveal">
          <div className="gc-port"><ImageSlot src="/photos/portrait-michelle.webp" alt="Michelle, founder of Date Better Snacks" placeholder="Michelle" style={{ objectPosition: '52% 32%' }} /></div>
          <div>
            <p className="gc-quote">&ldquo;She&rsquo;s helped me in countless ways, from strategy to mindset and has a superpower of connecting the right people at the right time. If you&rsquo;re lucky enough to work with her, say yes.&rdquo;</p>
            <div className="gc-attr">Michelle Valdez-Wilton &middot; Founder, Date Better Snacks</div>
          </div>
        </div>
      </div>
    </div>
  )
}
