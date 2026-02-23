import { useFadeUp } from '../hooks/useFadeUp'

const TRUST_ITEMS = [
  { icon: '🏆', title: "Travellers' Choice 2025", sub: 'TripAdvisor Award Winner' },
  { icon: '⚓', title: 'RYA Certified Skippers', sub: 'Commercially Endorsed' },
  { icon: '⭐', title: '5★ Premium Marinas', sub: 'Port Solent · Hamble · Ocean Village' },
  { icon: '🛥️', title: '5 Luxury Vessels', sub: 'Skippered & Bareboat Available' },
]

function TrustItem({ icon, title, sub, delay }) {
  const [ref, visible] = useFadeUp()
  return (
    <div ref={ref} className={`trust-item fade-up${delay ? ` delay-${delay}` : ''}${visible ? ' visible' : ''}`}>
      <div className="trust-icon">{icon}</div>
      <div className="trust-text">
        <strong>{title}</strong>
        <span>{sub}</span>
      </div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <div id="trust-bar">
      <div className="container">
        <div className="trust-bar-inner">
          {TRUST_ITEMS.map(({ icon, title, sub }, i) => (
            <TrustItem key={title} icon={icon} title={title} sub={sub} delay={i || null} />
          ))}
        </div>
      </div>
    </div>
  )
}
