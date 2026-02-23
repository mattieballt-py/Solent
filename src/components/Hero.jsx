import { useState, useEffect, useRef } from 'react'
import { HERO_SLIDES } from '../data/boats'

const SCROLL_PER_SLIDE = 80

export default function Hero() {
  const heroRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const el = heroRef.current
        if (el) {
          const heroBottom = el.offsetTop + el.offsetHeight
          if (window.scrollY < heroBottom) {
            setActiveIdx(Math.floor(window.scrollY / SCROLL_PER_SLIDE) % HERO_SLIDES.length)
          }
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Preload images after mount
  useEffect(() => {
    HERO_SLIDES.slice(1).forEach((src, i) => {
      setTimeout(() => {
        const img = new Image()
        img.src = src
      }, i * 200)
    })
  }, [])

  function scrollTo(href) {
    const target = document.querySelector(href)
    if (!target) return
    const nav = document.getElementById('nav')
    const navH = nav ? nav.offsetHeight : 0
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={heroRef}>
      {/* Background image slides */}
      <div className="hero-slides">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className={`hero-slide${i === activeIdx ? ' active' : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>

      {/* Radial gradient vignette */}
      <div className="hero-overlay" />

      {/* Hero text */}
      <div className="hero-content">
        <span className="hero-eyebrow">
          TripAdvisor Travellers&#39; Choice 2025 &nbsp;·&nbsp; RYA Certified
        </span>
        <h1 className="hero-title">
          Explore The Solent<br />in <em>Luxury</em>
        </h1>
        <p className="hero-sub">
          Premium skippered &amp; bareboat charters aboard our Princess V58, Sealine F42,
          Axopar 28 &amp; Highfield RIBs — from Southampton, Portsmouth, Hamble &amp; beyond.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary" onClick={e => { e.preventDefault(); scrollTo('#contact') }}>
            Book Your Charter
          </a>
          <a href="#fleet" className="btn btn-outline" onClick={e => { e.preventDefault(); scrollTo('#fleet') }}>
            View Our Fleet
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>

      {/* Dot indicators */}
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <div key={i} className={`hero-dot${i === activeIdx ? ' active' : ''}`} />
        ))}
      </div>
    </section>
  )
}
