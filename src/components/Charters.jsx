import { CHARTER_TYPES } from '../data/charters'
import { useFadeUp } from '../hooks/useFadeUp'

function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  const nav = document.getElementById('nav')
  const navH = nav ? nav.offsetHeight : 0
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' })
}

function CharterCard({ charter, delay }) {
  const [ref, visible] = useFadeUp()
  return (
    <div
      ref={ref}
      className={`charter-card${charter.featured ? ' featured' : ''} fade-up${delay ? ` delay-${delay}` : ''}${visible ? ' visible' : ''}`}
    >
      <div className="charter-card-icon">{charter.icon}</div>
      <h3>{charter.title}</h3>
      <p>{charter.description}</p>
      <ul className="charter-list">
        {charter.items.map(item => <li key={item}>{item}</li>)}
      </ul>
      <a
        href="#contact"
        className={`btn btn-${charter.ctaVariant}`}
        onClick={e => { e.preventDefault(); scrollTo('#contact') }}
      >
        Enquire Now
      </a>
    </div>
  )
}

export default function Charters() {
  const [headerRef, headerVisible] = useFadeUp()

  return (
    <section id="charters">
      <div className="container">
        <div ref={headerRef} className={`section-header fade-up${headerVisible ? ' visible' : ''}`}>
          <span className="section-label">Charter Options</span>
          <h2 className="section-title">Find the Right Charter for You</h2>
          <p className="section-sub">
            Whether you want to sit back and let our skipper take the wheel or take the helm yourself —
            we have a charter format to match.
          </p>
        </div>

        <div className="charter-grid">
          {CHARTER_TYPES.map((c, i) => (
            <CharterCard key={c.id} charter={c} delay={i || null} />
          ))}
        </div>
      </div>
    </section>
  )
}
