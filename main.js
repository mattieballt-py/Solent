/* ============================================================
   SOLENT BOAT CHARTER — MAIN JS
   - Hero scroll-driven image cycling
   - Nav scroll state
   - Fade-up IntersectionObserver animations
   - Mobile nav toggle
   - Contact form handler
   ============================================================ */

(function () {
  'use strict';

  /* ── Hero scroll cycling ──────────────────────────────────── */
  const slides   = Array.from(document.querySelectorAll('.hero-slide'));
  const dots     = Array.from(document.querySelectorAll('.hero-dot'));
  const heroEl   = document.getElementById('hero');
  const SCROLL_PER_SLIDE = 80; // px of scroll per image change
  let   currentIdx = 0;

  function setSlide(idx) {
    if (idx === currentIdx) return;

    // Deactivate old
    slides[currentIdx].classList.remove('active');
    dots[currentIdx].classList.remove('active');

    // Activate new
    currentIdx = idx;
    slides[currentIdx].classList.add('active');
    dots[currentIdx].classList.add('active');
  }

  function onScroll() {
    const scrollY   = window.scrollY;
    const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;

    // Only cycle while hero is in view
    if (scrollY < heroBottom) {
      const idx = Math.floor(scrollY / SCROLL_PER_SLIDE) % slides.length;
      setSlide(idx);
    }
  }

  // Throttle scroll handler to ~60fps
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── Nav scroll state ─────────────────────────────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run on load

  /* ── Mobile hamburger ─────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    nav.classList.toggle('menu-open');
    const isOpen = nav.classList.contains('menu-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  /* ── Fade-up IntersectionObserver ─────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback — just show everything
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Smooth anchor scroll (nav height offset) ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Contact form ─────────────────────────────────────────── */
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstName = form.querySelector('#first-name').value.trim();
      const email     = form.querySelector('#email').value.trim();

      if (!firstName || !email) {
        showFormMessage('Please fill in your name and email address.', 'error');
        return;
      }

      // In production, replace with a real form handler (Netlify, Formspree, etc.)
      showFormMessage(
        'Thanks ' + firstName + '! We\'ve received your enquiry and will be in touch shortly.',
        'success'
      );
      form.reset();
    });
  }

  function showFormMessage(msg, type) {
    // Remove any existing message
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const el = document.createElement('p');
    el.className = 'form-message';
    el.textContent = msg;
    el.style.cssText = [
      'padding: 14px 18px',
      'border-radius: 8px',
      'font-size: 14px',
      'margin-top: 16px',
      'font-weight: 500',
      type === 'success'
        ? 'background: rgba(26,180,100,0.12); color: #4cde97; border: 1px solid rgba(26,180,100,0.25);'
        : 'background: rgba(255,60,60,0.1); color: #ff7070; border: 1px solid rgba(255,60,60,0.2);'
    ].join(';');

    form.appendChild(el);
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
      setTimeout(function () { el.remove(); }, 6000);
    }
  }

  /* ── Preload hero images for smooth cycling ───────────────── */
  const heroImageUrls = [
    'boat_images/princess_v58/photo2.png',
    'boat_images/sealine_f42/photo1.webp',
    'boat_images/sealine_f42/photo2.jpg',
    'boat_images/highfield_patrol_860/photo1.jpg',
    'boat_images/highfield_patrol_860/photo2.jpg',
    'boat_images/highfield_patrol_760/photo1.jpg',
    'boat_images/highfield_patrol_760/photo2.png',
    'boat_images/axopar_28/photo1.jpg',
    'boat_images/axopar_28/photo2.jpg',
  ];

  // Staggered preload after page is interactive
  window.addEventListener('load', function () {
    heroImageUrls.forEach(function (src, i) {
      setTimeout(function () {
        const img = new Image();
        img.src = src;
      }, i * 200);
    });
  });

})();
