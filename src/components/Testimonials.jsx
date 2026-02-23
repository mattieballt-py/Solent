import { useFadeUp } from '../hooks/useFadeUp'

// Replace these with real TripAdvisor / Google reviews
const TESTIMONIALS = [
  { initials: '[I]', name: '[REVIEWER NAME]', source: 'via TripAdvisor · [DATE]', quote: '[REVIEW TEXT — paste your real TripAdvisor or Google review here]' },
  { initials: '[I]', name: '[REVIEWER NAME]', source: 'via TripAdvisor · [DATE]', quote: '[REVIEW TEXT — paste your real TripAdvisor or Google review here]' },
  { initials: '[I]', name: '[REVIEWER NAME]', source: 'via TripAdvisor · [DATE]', quote: '[REVIEW TEXT — paste your real TripAdvisor or Google review here]' },
]

function TestimonialCard({ testimonial, delay }) {
  const [ref, visible] = useFadeUp()
  return (
    <div
      ref={ref}
      className={`testimonial-card fade-up${delay ? ` delay-${delay}` : ''}${visible ? ' visible' : ''}`}
    >
      <span className="star-row">★★★★★</span>
      <blockquote>"{testimonial.quote}"</blockquote>
      <div className="testimonial-meta">
        <div className="testimonial-avatar">{testimonial.initials}</div>
        <div>
          <div className="testimonial-name">{testimonial.name}</div>
          <div className="testimonial-source">{testimonial.source}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [headerRef, headerVisible] = useFadeUp()
  const [awardRef, awardVisible] = useFadeUp()

  return (
    <section id="testimonials">
      <div className="container">
        <div ref={headerRef} className={`section-header fade-up${headerVisible ? ' visible' : ''}`}>
          <span className="section-label">Reviews</span>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>

        <div ref={awardRef} className={`ta-award fade-up${awardVisible ? ' visible' : ''}`}>
          <div className="ta-award-logo">🏆</div>
          <div className="ta-award-text">
            <strong>Travellers&rsquo; Choice Award 2025</strong>
            <span>Awarded by TripAdvisor for consistently outstanding customer reviews</span>
          </div>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} delay={i || null} />
          ))}
        </div>
      </div>
    </section>
  )
}
