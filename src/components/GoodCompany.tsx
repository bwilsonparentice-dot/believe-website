import type { CSSProperties } from 'react'
import { ImageSlot } from './ImageSlot'
import { palette } from '../lib/palette'

/**
 * Good Company — the brands in our orbit. An art-directed editorial composition
 * (not a logo wall): two founder features, Gallivant with Snehee's words and
 * Date Better with Michelle's, bracket an organic scatter of the remaining four
 * brands at varied scale. Product imagery is authentic and unaltered; the two
 * testimonials are verbatim. Replaces the single testimonial that used to close
 * the People & Experience moment.
 */
const serif = "'Cormorant Garamond',serif"
const sans = "'Jost',sans-serif"

const eyebrow: CSSProperties = { fontFamily: sans, fontWeight: 400, fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(122,94,52,0.72)' }

type Brand = { key: string; name: string; cat: string; file: string }
const SCATTER: Brand[] = [
  { key: 'pb', name: 'Peanut Butter & Co.', cat: 'Spreads', file: '/photos/gc-pb.webp' },
  { key: 'hormans', name: 'Horman’s Pickles', cat: 'Pickles', file: '/photos/gc-hormans.webp' },
  { key: 'maia', name: 'Maia', cat: 'Greek Yogurt', file: '/photos/gc-maia.webp' },
  { key: 'fizzy', name: 'Fizzy Wizzie’s', cat: 'Sparkling Tea', file: '/photos/gc-fizzy.webp' },
]

function Obj({ src, alt, imgClass, name, cat }: { src: string; alt: string; imgClass: string; name: string; cat: string }) {
  return (
    <>
      <ImageSlot src={src} alt={alt} placeholder={alt} className={imgClass} />
      <div className="gc-lab">{name}</div>
      <div className="gc-cat">{cat}</div>
    </>
  )
}

export function GoodCompany() {
  return (
    <div className="gc-wrap" style={{ marginTop: 'clamp(70px,11vh,150px)' }}>
      <div className="gc-head">
        <div style={eyebrow}>The brands in our orbit</div>
        <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 'clamp(44px,7.4vw,86px)', lineHeight: 0.98, letterSpacing: '-0.01em', color: palette.navy, margin: 'clamp(16px,2.4vh,26px) 0 0' }}>Good company.</h3>
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.1vw,26px)', lineHeight: 1.5, color: 'rgba(43,39,35,0.66)', maxWidth: '34ch', margin: 'clamp(20px,3vh,30px) auto 0' }}>Different founders. Different ambitions. A shared belief in what could be.</p>
      </div>

      {/* Feature — Gallivant · Snehee */}
      <div className="gc-feature gc-reveal">
        <div className="gc-feature__prod gc-obj">
          <Obj src="/photos/gc-gallivant.webp" alt="Gallivant Ice Cream" imgClass="gc-img-gallivant" name="Gallivant" cat="Ice Cream" />
        </div>
        <div className="gc-feature__say">
          <p className="gc-quote">&ldquo;Beth helped me believe that our brand belonged in rooms we once thought were out of reach.&rdquo;</p>
          <div className="gc-attr">Snehee &middot; Founder, Gallivant</div>
        </div>
      </div>

      {/* Organic scatter — the remaining four */}
      <div className="gc-scatter">
        <div className="gc-s-pb gc-obj gc-reveal"><Obj src={SCATTER[0].file} alt={SCATTER[0].name} imgClass="gc-img-pb" name={SCATTER[0].name} cat={SCATTER[0].cat} /></div>
        <div className="gc-s-hormans gc-obj gc-reveal"><Obj src={SCATTER[1].file} alt={SCATTER[1].name} imgClass="gc-img-hormans" name={SCATTER[1].name} cat={SCATTER[1].cat} /></div>
        <div className="gc-s-maia gc-obj gc-reveal"><Obj src={SCATTER[2].file} alt={SCATTER[2].name} imgClass="gc-img-maia" name={SCATTER[2].name} cat={SCATTER[2].cat} /></div>
        <div className="gc-s-fizzy gc-obj gc-reveal"><Obj src={SCATTER[3].file} alt={SCATTER[3].name} imgClass="gc-img-fizzy" name={SCATTER[3].name} cat={SCATTER[3].cat} /></div>
      </div>

      {/* Feature — Michelle · Date Better (reversed) */}
      <div className="gc-feature gc-feature--rev gc-reveal">
        <div className="gc-feature__say">
          <p className="gc-quote">&ldquo;Having Beth as an advisor has been a gift. Her warm, caring presence makes every conversation feel like a safe place to think big, be vulnerable, and get clear.&rdquo;</p>
          <div className="gc-attr">Michelle &middot; Founder, Date Better Snacks</div>
        </div>
        <div className="gc-feature__prod gc-obj">
          <Obj src="/photos/gc-datebetter.webp" alt="Date Better Snacks" imgClass="gc-img-date" name="Date Better Snacks" cat="Dates" />
        </div>
      </div>
    </div>
  )
}
