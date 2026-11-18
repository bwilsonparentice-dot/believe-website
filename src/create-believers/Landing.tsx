import React, { useEffect, useState } from 'react'
import { MODE, listPublicBrands } from './backend'
import { Link, useMeta } from './ui'

// Atmospheric photographs already used elsewhere on the site. They set a mood;
// they are not presented as pictures of a Believe gathering.
export const HERO_PHOTO = '/photos/unpaved-fireside-gathering.webp'
export const TABLE_PHOTO = '/photos/photo-table.webp'

const KINDS = ['Creative workshops', 'Supper clubs', 'Flower arranging', 'Book clubs', 'Community events', 'Hospitality experiences', 'Retreats', 'Social gatherings']
const STEPS: [string, string][] = [
  ['Find the fit.', 'The people, place, occasion, and product.'],
  ['Make it memorable.', 'A thoughtful role for the brand in the experience.'],
  ['Bring it together.', 'Product, timing, host guidance, and the details.'],
  ['Keep the connection going.', 'Feedback, discovery, and a next step to purchase.'],
]
const FAQ: [string, React.ReactNode][] = [
  ['Does telling you about my gathering guarantee a partnership?',
    'No. We review the audience, occasion, location, timing, and product fit, and every match is considered by a person at Believe. Product partnerships are subject to availability and approval, and we confirm the details with you before anything is arranged.'],
  ['What kinds of gatherings are a fit?',
    'Creative workshops, supper clubs, flower arranging, book clubs, community events, hospitality experiences, retreats, and social gatherings. What matters most is that people are coming together for a reason, and that a product could have a natural part in it.'],
  ['Do I need a large following?',
    'No. We never ask for a follower count. We care about who is gathering, why, and whether a brand would be welcome there.'],
  ['Where are you working first?',
    'We’re developing our first pilot in Virginia. If you are somewhere else, you are welcome to tell us about your plans, and we will be straightforward about what is possible.'],
  ['What will you ask of me as a host?',
    'If a partnership goes ahead, a short recap afterwards: how many people actually came, how the product was served, and what you noticed. Sharing photos is optional, and any permission to reuse them is agreed with you separately.'],
  ['I’m a founder. How do I take part?',
    'Start with the short founder inquiry. If there is a fit, we build your brand’s profile with you privately: where it belongs, what it can offer a host, and what you would like to learn. Sending an inquiry does not commit you to anything.'],
  ['Is this instead of retail?',
    'No. Where a brand is on shelves, a good gathering gives people a reason to look for it there. We plan each one with a clear next step to purchase.'],
  ['What happens to the details I share?',
    'We use them to review your application and to contact you about it. We do not ask for a home address at this stage, and we do not ask for the names of your guests.'],
]

export function Landing() {
  useMeta('Create Believers | Believe Studio',
    'Create Believers, by Believe Studio, brings food and beverage brands into the gatherings, rituals, and relationships where they naturally belong.', { path: '' })
  const [hasBrands, setHasBrands] = useState(false)
  useEffect(() => {
    let alive = true
    listPublicBrands().then((b) => alive && setHasBrands(b.length > 0)).catch(() => { /* the link simply stays hidden */ })
    return () => { alive = false }
  }, [])

  return (
    <main>
      <section className="cb-hero">
        <div className="cb-wrap cb-hero-grid">
          <div>
            <p className="cb-eyebrow">Create Believers <span className="slash" aria-hidden="true">/</span> by Believe Studio</p>
            <h1>Bring your brand into the moments that matter.</h1>
            <p className="cb-lead">We bring food and beverage brands into the gatherings, rituals, and relationships where they naturally belong—giving people a reason to try them, remember them, and buy them again.</p>
            <div className="cb-actions">
              <Link to="host" className="cb-btn">Tell us about your gathering</Link>
              <Link to="founders" className="cb-btn ghost">I’m a brand founder</Link>
            </div>
            {hasBrands && (
              <Link to="brands" className="cb-textlink">
                Explore the brands{MODE === 'preview' ? ' (preview with illustrative examples)' : ''} →
              </Link>
            )}
          </div>
          <figure className="cb-arch">
            <img src={HERO_PHOTO} alt="A small group of friends talking around a low table beside a fire, with flowers and candles between them." width={1199} height={1312} />
          </figure>
        </div>
      </section>

      <section className="cb-band on-navy" aria-labelledby="cb-belong">
        <div className="cb-wrap cb-belong">
          <div>
            <h2 id="cb-belong">Where else could your brand belong?</h2>
            <p className="cb-lead">A creative evening with friends. A table full of new faces. A community that gathers every month. The right product can become a welcome ritual, a conversation starter, or something guests want to bring home. We help make those connections thoughtfully.</p>
          </div>
          <ul className="cb-kinds" aria-label="Kinds of gatherings">
            {KINDS.map((k) => <li key={k}>{k}</li>)}
          </ul>
        </div>
      </section>

      <section className="cb-section cream" aria-label="Two ways in">
        <div className="cb-wrap cb-paths">
          <div className="cb-path">
            <p className="who">For hosts</p>
            <h2>You’re bringing people together. Let’s find the brands that belong at your table.</h2>
            <p>Tell us who you’re gathering, what you’re planning, and what would make the experience better. We’ll review the fit and be in touch about possible product partnerships.</p>
            <Link to="host" className="cb-btn">Tell us about your gathering</Link>
          </div>
          <div className="cb-path">
            <p className="who">For founders</p>
            <h2>Find the places where your brand’s differences will really matter.</h2>
            <p>We help founders explore relevant gatherings, thoughtful collaborations, and new ways for people to experience their products—with a clear plan for what happens afterward.</p>
            <Link to="founders" className="cb-btn ghost">I’m a brand founder</Link>
          </div>
        </div>
      </section>

      <img className="cb-wide" src={TABLE_PHOTO} alt="A long dining table laid for an evening, lit by candles and a fire, in a tall panelled room." width={1536} height={1024} loading="lazy" />

      <section className="cb-section cb-how" aria-labelledby="cb-how">
        <div className="cb-wrap">
          <p className="cb-eyebrow">How it works</p>
          <h2 id="cb-how">Curated by people, start to finish.</h2>
          <ol className="cb-steps">
            {STEPS.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
          </ol>
          <p className="cb-care">Believe curates each match, helps shape the product’s role, coordinates the details, and learns what happened afterward. Every application is reviewed by a person. Applying does not guarantee product, sponsorship, payment, or approval.</p>
        </div>
      </section>

      <section className="cb-section cream cb-faq" aria-labelledby="cb-faq">
        <div className="cb-narrow">
          <h2 id="cb-faq">Questions, answered plainly</h2>
          <div className="cb-faq-list">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="cb-section cb-close" aria-labelledby="cb-close">
        <div className="cb-wrap">
          <p className="cb-eyebrow">Begin here</p>
          <h2 id="cb-close">Who are you bringing together?</h2>
          <div className="cb-actions">
            <Link to="host" className="cb-btn">Tell us about your gathering</Link>
            <Link to="founders" className="cb-btn ghost">I’m a brand founder</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
