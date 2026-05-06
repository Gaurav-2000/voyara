import React, { useEffect, useRef } from 'react'

export default function Footer({ showToast }) {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.footer-fade')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <footer
      ref={ref}
      style={{
        background: `
      radial-gradient(circle at top left, rgba(212,98,42,0.18), transparent 28%),
      radial-gradient(circle at bottom right, rgba(232,131,74,0.14), transparent 30%),
      linear-gradient(135deg, #08131f 0%, #0f1e2e 45%, #081018 100%)
    `,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
      /* Premium animated background */
.footer-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.18;
  pointer-events: none;
  animation: floatGlow 10s ease-in-out infinite;
}

.footer-glow.one {
  top: -180px;
  left: -120px;
  background: #d4622a;
}

.footer-glow.two {
  bottom: -220px;
  right: -150px;
  background: #e8834a;
  animation-delay: 4s;
}

@keyframes floatGlow {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) translateX(10px) scale(1.08);
  }
}

/* subtle grid overlay */
.footer-grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
}
        /* Fade-up animation */
        .footer-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .footer-fade.visible { opacity: 1; transform: translateY(0); }
        .footer-fade.d1 { transition-delay: 0.1s; }
        .footer-fade.d2 { transition-delay: 0.2s; }
        .footer-fade.d3 { transition-delay: 0.3s; }
        .footer-fade.d4 { transition-delay: 0.4s; }

        /* Hexagon pattern background */
        .footer-hex-bg {
          position: absolute; inset: 0; z-index: 0; opacity: 0.06;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V52l28-16 28 16v32z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 56px 100px;
        }

        /* Animated gradient line at top */
        .footer-top-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4622a, #e8834a, #d4622a, transparent);
          background-size: 200% 100%;
          animation: lineMove 3s linear infinite;
        }
        @keyframes lineMove {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Main footer grid */
        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          padding: 4rem 5% 3rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }
        @media (max-width: 1000px) {
          .footer-main { grid-template-columns: 1fr 1fr; gap: 2.5rem; padding: 3rem 5% 2rem; }
        }
        @media (max-width: 580px) {
          .footer-main { grid-template-columns: 1fr; gap: 2rem; padding: 2.5rem 5% 1.5rem; }
        }

        /* Links */
        .footer-link {
          display: block; color: rgba(255,255,255,0.6); text-decoration: none;
          font-size: 0.88rem; padding: 0.3rem 0;
          transition: color 0.25s, transform 0.25s; width: fit-content;
        }
        .footer-link:hover { color: #d4622a; transform: translateX(4px); }

        /* Social icons */
        .footer-social {
          display: flex; gap: 0.65rem; margin-top: 1.25rem; flex-wrap: wrap;
        }
        .social-btn {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s; color: rgba(255,255,255,0.7);
          font-size: 0.85rem; text-decoration: none;
        }
        .social-btn:hover { background: #d4622a; border-color: #d4622a; color: white; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(212,98,42,0.4); }

        /* Divider */
        .footer-divider {
          border: none; border-top: 1px solid rgba(255,255,255,0.08);
          margin: 0; position: relative; z-index: 1;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 5%;
          max-width: 1200px; margin: 0 auto;
          flex-wrap: wrap; gap: 0.75rem;
          position: relative; z-index: 1;
        }
        @media (max-width: 600px) {
          .footer-bottom { flex-direction: column; text-align: center; gap: 0.5rem; padding: 1rem 5%; }
        }

        /* Newsletter input */
        .newsletter-row {
          display: flex; gap: 0.5rem; margin-top: 1rem;
        }
        @media (max-width: 400px) {
          .newsletter-row { flex-direction: column; }
        }
        .newsletter-input {
          flex: 1; background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px; padding: 0.6rem 1rem;
          color: white; font-size: 0.82rem; outline: none;
          transition: border-color 0.2s;
          min-width: 0;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.35); }
        .newsletter-input:focus { border-color: #d4622a; }
        .newsletter-btn {
          background: #d4622a; color: white; border: none;
          border-radius: 50px; padding: 0.6rem 1.1rem;
          font-size: 0.82rem; font-weight: 600; cursor: pointer;
          transition: background 0.2s, transform 0.2s; white-space: nowrap;
        }
        .newsletter-btn:hover { background: #c4551e; transform: translateY(-1px); }

        /* Powered by link */
        .powered-link {
          color: #d4622a; font-weight: 700; text-decoration: none;
          transition: color 0.2s, text-shadow 0.2s;
          animation: glow 2.5s ease-in-out infinite;
        }
        .powered-link:hover { color: #e8834a; }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 6px rgba(212,98,42,0.3); }
          50% { text-shadow: 0 0 14px rgba(212,98,42,0.7), 0 0 28px rgba(212,98,42,0.3); }
        }

        /* Footer section heading */
        .footer-heading {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
          margin-bottom: 1rem;
        }
      `}</style>

      {/* Animated top line */}
      <div className="footer-top-line" />

      {/* Hexagon background pattern */}
      <div className="footer-hex-bg" />

      {/* Animated background glow */}
      <div className="footer-glow one" />
      <div className="footer-glow two" />

      {/* Grid overlay */}
      <div className="footer-grid-overlay" />

      {/* Main content grid */}
      <div className="footer-main">

        {/* Brand column */}
        <div className="footer-fade d1">
          <a href="#home" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 900, color: 'white', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
            Voy<span style={{ color: '#d4622a' }}>ara</span>
          </a>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: '280px', marginBottom: '1.25rem' }}>
            India's most trusted travel partner. We craft unforgettable journeys — honeymoons, family holidays, solo adventures and luxury escapes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { icon: '📍', text: 'New Delhi, India' },
              { icon: '📞', text: '+91 98765 43210' },
              { icon: '✉️', text: 'hello@voyara.in' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
          <div className="footer-social">
            {[
              { icon: 'f', label: 'Facebook', href: '#' },
              { icon: '𝕏', label: 'Twitter', href: '#' },
              { icon: '📸', label: 'Instagram', href: '#' },
              { icon: 'in', label: 'LinkedIn', href: '#' },
              { icon: '▶', label: 'YouTube', href: '#' },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} className="social-btn" aria-label={label} title={label}>{icon}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-fade d2">
          <div className="footer-heading">Quick Links</div>
          {[
            { label: 'Home', href: '#home' },
            { label: 'Destinations', href: '#destinations' },
            { label: 'Services', href: '#services' },
            { label: 'How It Works', href: '#book' },
            { label: 'Reviews', href: '#testimonials' },
            { label: 'About Us', href: '#about' },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="footer-link">→ {label}</a>
          ))}
        </div>

        {/* Top Destinations */}
        <div className="footer-fade d3">
          <div className="footer-heading">Top Destinations</div>
          {['Bali, Indonesia', 'Paris, France', 'Dubai, UAE', 'Maldives', 'Switzerland', 'Thailand', 'Singapore', 'Japan'].map(d => (
            <a key={d} href="#destinations" className="footer-link">→ {d}</a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-fade d4">
          <div className="footer-heading">Stay Updated</div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            Get exclusive deals and travel inspiration straight to your inbox.
          </p>
          <div className="newsletter-row">
            <input className="newsletter-input" type="email" placeholder="Your email address" />
            <button className="newsletter-btn" onClick={() => showToast?.('🎉 Subscribed successfully!')}>Go</button>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div className="footer-heading">We Accept</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['UPI', 'Visa', 'MC', 'EMI', 'GPay'].map(p => (
                <span key={p} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '0.25rem 0.6rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div className="footer-heading">Certified By</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['IATA', 'ATOL', 'ISO 9001'].map(c => (
                <span key={c} style={{ background: 'rgba(212,98,42,0.15)', border: '1px solid rgba(212,98,42,0.3)', borderRadius: '6px', padding: '0.25rem 0.6rem', fontSize: '0.7rem', color: '#d4622a', fontWeight: 600 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="footer-divider" />

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', margin: 0 }}>
          © 2025 Puniya Global Private Limited. All rights reserved.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
            <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#d4622a'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >{l}</a>
          ))}
        </div>

        {/* Powered by Aedrea — matches image */}
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', margin: 0 }}>
          Website Powered by{' '}
          <a
            href="https://www.aedrea.com"
            target="_blank"
            rel="noopener noreferrer"
            className="powered-link"
          >
            www.aedrea.com
          </a>
        </p>
      </div>
    </footer>
  )
}