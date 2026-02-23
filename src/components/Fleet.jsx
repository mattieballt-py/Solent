import { BOATS } from '../data/boats'
import { useFadeUp } from '../hooks/useFadeUp'

function FleetCard({ boat, delay }) {
  const [ref, visible] = useFadeUp()
  return (
    <div
      ref={ref}
      className={`fleet-card fade-up${delay ? ` delay-${delay}` : ''}${visible ? ' visible' : ''}`}
    >
      <div className="fleet-photos">
        {boat.photos.map(p => (
          <img key={p.src} className="fleet-photo" src={p.src} alt={p.alt} loading="lazy" />
        ))}
      </div>
      <div className="fleet-card-body">
        <img className="fleet-logo" src={boat.logo} alt={boat.logoAlt} loading="lazy" />
        <h3>{boat.name}</h3>
        <div className="fleet-nickname">{boat.nickname}</div>
        <p>{boat.description}</p>
        <div className="fleet-meta">
          {boat.meta.map(({ icon, label }) => (
            <div key={label} className="fleet-meta-item">
              {icon} <strong>{label}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Fleet() {
  const [headerRef, headerVisible] = useFadeUp()

  return (
    <section id="fleet">
      <div className="container">
        <div ref={headerRef} className={`section-header fade-up${headerVisible ? ' visible' : ''}`}>
          <span className="section-label">Our Fleet</span>
          <h2 className="section-title">Five World-Class Vessels</h2>
          <p className="section-sub">
            From the 58ft Princess superyacht to our high-performance Highfield RIBs,
            every vessel in our fleet is immaculately maintained and ready to deliver
            an unforgettable day on the water.
          </p>
        </div>

        <div className="fleet-grid">
          {BOATS.map((boat, i) => (
            <FleetCard key={boat.id} boat={boat} delay={i % 4 || null} />
          ))}
        </div>
      </div>
    </section>
  )
}
