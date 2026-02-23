function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  const nav = document.getElementById('nav')
  const navH = nav ? nav.offsetHeight : 0
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' })
}

const FOOTER_LINKS = [
  { href: '#fleet',        label: 'Our Fleet' },
  { href: '#charters',     label: 'Charter Types' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#areas',        label: 'Areas' },
  { href: '#contact',      label: 'Book Now' },
]

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Solent <span>Boat</span> Charter</div>
            <div className="footer-tagline">Your journey is our destination.</div>
          </div>
          <nav className="footer-links">
            {FOOTER_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}>
                {label}
              </a>
            ))}
            <a href="https://www.solentboatcharter.com" target="_blank" rel="noopener noreferrer">
              solentboatcharter.com
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2025 Solent Boat Charter. All rights reserved.</span>
          <span>023 9396 0397 &nbsp;&middot;&nbsp; info@solentboatcharter.com</span>
        </div>
      </div>
    </footer>
  )
}
