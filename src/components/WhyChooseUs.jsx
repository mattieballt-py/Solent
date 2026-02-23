import { WHY_CARDS } from '../data/whyCards'
import { useFadeUp } from '../hooks/useFadeUp'

function WhyCard({ icon, title, body, badge, delay }) {
  const [ref, visible] = useFadeUp()
  return (
    <div
      ref={ref}
      className={`why-card fade-up${delay ? ` delay-${delay}` : ''}${visible ? ' visible' : ''}`}
    >
      <span className="why-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <span className="why-badge">{badge}</span>
    </div>
  )
}

export default function WhyChooseUs() {
  const [headerRef, headerVisible] = useFadeUp()

  return (
    <section id="why">
      <div className="container">
        <div ref={headerRef} className={`section-header fade-up${headerVisible ? ' visible' : ''}`}>
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">Your Safety &amp; Enjoyment<br />Come First</h2>
          <p className="section-sub">
            We combine professionally qualified crew, a premium fleet and tailor-made itineraries
            so every minute on the water exceeds your expectations.
          </p>
        </div>

        <div className="why-grid">
          {WHY_CARDS.map(({ icon, title, body, badge }, i) => (
            <WhyCard key={title} icon={icon} title={title} body={body} badge={badge} delay={(i % 3) + 1 || null} />
          ))}
        </div>
      </div>
    </section>
  )
}
