import React, { useState, useEffect } from 'react'
import BookingModal from './BookingModal'

const links = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#services', label: 'Services' },
  { href: '#book', label: 'How It Works' },
  { href: '#testimonials', label: 'Reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%;
          background: rgba(250,247,242,0.97);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(212,98,42,0.08);
          transition: box-shadow 0.35s, background 0.35s;
        }
        .nav-root.scrolled {
          box-shadow: 0 4px 32px rgba(26,18,8,0.09);
          background: rgba(250,247,242,0.99);
        }

        /* Logo */
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.65rem; font-weight: 900;
          color: var(--dark); text-decoration: none;
          letter-spacing: -0.5px; flex-shrink: 0;
          transition: transform 0.2s;
          display: flex; align-items: center; gap: 0;
        }
        .nav-logo:hover { transform: scale(1.03); }
        .nav-logo span { color: var(--terra); }

        /* Desktop links */
        .nav-links {
          display: flex; align-items: center; gap: 0.25rem;
          list-style: none;
        }
        .nav-links a {
          text-decoration: none; color: var(--mid);
          font-size: 0.92rem; font-weight: 500;
          padding: 0.5rem 0.85rem; border-radius: 50px;
          transition: color 0.2s, background 0.2s;
          position: relative; white-space: nowrap;
        }
        .nav-links a:hover { color: var(--terra); background: rgba(212,98,42,0.07); }
        .nav-links a.active { color: var(--terra); }

        /* Book button */
        .nav-book {
          background: var(--terra); color: white !important;
          padding: 0.6rem 1.4rem !important; border-radius: 50px !important;
          font-weight: 600 !important; font-size: 0.92rem !important;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s !important;
          box-shadow: 0 4px 14px rgba(212,98,42,0.25);
        }
        .nav-book:hover {
          background: var(--terra-light) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(212,98,42,0.35) !important;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; width: 44px; height: 44px;
          background: none; border: none; cursor: pointer;
          border-radius: 12px;
          transition: background 0.2s;
          -webkit-tap-highlight-color: transparent;
          padding: 0;
        }
        .hamburger:hover { background: rgba(212,98,42,0.08); }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--dark); border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1),
                      opacity 0.25s, width 0.3s;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile overlay backdrop */
        .mobile-backdrop {
          display: none;
          position: fixed; inset: 0; z-index: 998;
          background: rgba(26,18,8,0.35);
          backdrop-filter: blur(2px);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .mobile-backdrop.open { opacity: 1; }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw);
          z-index: 999;
          background: var(--cream);
          box-shadow: -20px 0 60px rgba(26,18,8,0.18);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
          display: flex; flex-direction: column;
          padding: 0;
          overflow: hidden;
        }
        .mobile-drawer.open { transform: translateX(0); }

        /* Drawer header */
        .drawer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 1.5rem;
          border-bottom: 1px solid var(--sand);
          background: var(--white);
        }
        .drawer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 900; color: var(--dark); text-decoration: none;
        }
        .drawer-logo span { color: var(--terra); }
        .drawer-close {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--sand); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: var(--mid);
          transition: background 0.2s, color 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .drawer-close:hover { background: var(--terra); color: white; }

        /* Drawer nav links */
        .drawer-nav {
          flex: 1; padding: 1rem 0;
          overflow-y: auto;
        }
        .drawer-link {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 1rem 1.5rem;
          text-decoration: none; color: var(--mid);
          font-size: 1rem; font-weight: 500;
          border-bottom: 1px solid var(--sand);
          transition: background 0.2s, color 0.2s, padding-left 0.25s;
          -webkit-tap-highlight-color: transparent;
        }
        .drawer-link:hover, .drawer-link:active {
          background: rgba(212,98,42,0.06);
          color: var(--terra);
          padding-left: 1.9rem;
        }
        .drawer-link-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: var(--sand);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
          transition: background 0.2s;
        }
        .drawer-link:hover .drawer-link-icon { background: rgba(212,98,42,0.12); }
        .drawer-link-text strong {
          display: block; font-size: 0.95rem; font-weight: 600; color: var(--dark);
        }
        .drawer-link-text span {
          font-size: 0.75rem; color: var(--muted); font-weight: 400;
        }

        /* Drawer footer */
        .drawer-footer {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--sand);
          background: var(--white);
        }
        .drawer-cta {
          display: block; width: 100%; text-align: center;
          background: var(--terra); color: white;
          padding: 0.9rem; border-radius: 50px;
          font-size: 1rem; font-weight: 600; text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .drawer-cta:hover { background: var(--terra-light); transform: translateY(-1px); }
        .drawer-trust {
          display: flex; justify-content: center; gap: 1rem;
          margin-top: 0.75rem; flex-wrap: wrap;
        }
        .drawer-trust span {
          font-size: 0.7rem; color: var(--muted); font-weight: 500;
        }

        /* Stagger animation for drawer links */
        .drawer-link {
          opacity: 0;
          transform: translateX(16px);
          transition: background 0.2s, color 0.2s, padding-left 0.25s,
                      opacity 0.35s, transform 0.35s;
        }
        .mobile-drawer.open .drawer-link { opacity: 1; transform: translateX(0); }
        .mobile-drawer.open .drawer-link:nth-child(1) { transition-delay: 0.08s; }
        .mobile-drawer.open .drawer-link:nth-child(2) { transition-delay: 0.13s; }
        .mobile-drawer.open .drawer-link:nth-child(3) { transition-delay: 0.18s; }
        .mobile-drawer.open .drawer-link:nth-child(4) { transition-delay: 0.23s; }

        /* Responsive */
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-backdrop { display: block; }
        }
      `}</style>

      {/* ── NAVBAR BAR ── */}


      <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
        <a href="#home" className="nav-logo">Voy<span>ara</span></a>

        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={activeLink === href ? 'active' : ''}
                onClick={() => setActiveLink(href)}>{label}</a>
            </li>
          ))}
          <li>
            {/* CHANGE href to onClick */}
            <button
              onClick={() => setBookingOpen(true)}
              className="nav-book"
              style={{ cursor: 'pointer', border: 'none' }}
            >Book a Trip</button>
          </li>
        </ul>

        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={toggleMenu}
          aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE BACKDROP ── */}
      <div
        className={`mobile-backdrop${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`} role="navigation" aria-label="Mobile navigation">
        {/* Drawer header */}
        <div className="drawer-header">
          <a href="#home" className="drawer-logo" onClick={closeMenu}>Voy<span>ara</span></a>
          <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">✕</button>
        </div>

        {/* Drawer links */}
        <div className="drawer-nav">
          {[
            { href: '#destinations', label: 'Destinations', sub: 'Browse 800+ places', icon: '🗺️' },
            { href: '#services', label: 'Services', sub: 'Flights, hotels & more', icon: '✈️' },
            { href: '#book', label: 'How It Works', sub: 'Book in 3 easy steps', icon: '📋' },
            { href: '#testimonials', label: 'Reviews', sub: '12,000+ happy travelers', icon: '⭐' },
          ].map(({ href, label, sub, icon }) => (
            <a
              key={href}
              href={href}
              className="drawer-link"
              onClick={closeMenu}
            >
              <div className="drawer-link-icon">{icon}</div>
              <div className="drawer-link-text">
                <strong>{label}</strong>
                <span>{sub}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Drawer footer CTA */}
        <div className="drawer-footer">
          <button
            className="drawer-cta"
            onClick={() => { closeMenu(); setBookingOpen(true); }}
            style={{ border: 'none', cursor: 'pointer' }}
          >✈ Book a Trip</button>
          <div className="drawer-trust">
            <span>✓ Free cancellation</span>
            <span>✓ No hidden charges</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </>
  )
}