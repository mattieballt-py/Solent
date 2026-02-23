import { useState, useEffect, useCallback } from 'react'

const NAV_LINKS = [
  { href: '#fleet',        label: 'Our Fleet' },
  { href: '#charters',     label: 'Charters' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#areas',        label: 'Areas' },
]

function smoothScrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  const navEl = document.getElementById('nav')
  const navH = navEl ? navEl.offsetHeight : 0
  const top = target.getBoundingClientRect().top + window.scrollY - navH - 8
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    smoothScrollTo(href)
  }, [])

  const navClass = [
    scrolled   ? 'scrolled'   : '',
    menuOpen   ? 'menu-open'  : '',
  ].filter(Boolean).join(' ')

  return (
    <nav id="nav" className={navClass}>
      <div className="container">
        <a href="#" className="nav-logo" onClick={e => handleLinkClick(e, '#hero')}>
          Solent <span>Boat</span> Charter
        </a>

        <ul className="nav-links" id="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={e => handleLinkClick(e, href)}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-primary nav-cta" onClick={e => handleLinkClick(e, '#contact')}>
              Book Now
            </a>
          </li>
        </ul>

        <button
          className="nav-hamburger"
          id="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
