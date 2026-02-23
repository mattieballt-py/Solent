import { AREAS } from '../data/charters'
import { useFadeUp } from '../hooks/useFadeUp'

export default function Areas() {
  const [headerRef, headerVisible] = useFadeUp()
  const [pillsRef, pillsVisible] = useFadeUp()

  return (
    <section id="areas">
      <div className="container">
        <div ref={headerRef} className={`fade-up${headerVisible ? ' visible' : ''}`}>
          <span className="section-label">Where We Go</span>
          <h2 className="section-title">Explore The Solent &amp; Beyond</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Discover places only accessible by water — stunning coastlines, hidden anchorages,
            bustling racing events and world-famous sailing towns, all within easy reach.
          </p>
        </div>

        <div ref={pillsRef} className={`areas-pills fade-up delay-1${pillsVisible ? ' visible' : ''}`}>
          {AREAS.map(area => (
            <span key={area} className="area-pill">
              <span className="area-pill-dot" />
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
