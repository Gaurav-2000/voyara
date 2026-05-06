import React from 'react'

export default function Footer({ showToast }) {
  const T = (msg) => (e) => { e.preventDefault(); showToast(msg) }

  return (
    <footer id="contact" style={{ background: 'var(--dark)', color: 'white', padding: '70px 5% 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto 3rem' }}
        className="footer-grid-inner">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>
            Voy<span style={{ color: 'var(--terra)' }}>ara</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            India's most trusted travel partner. Book your dream trip in minutes — we handle everything so you can just enjoy the journey.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[['f', 'Follow us on Facebook!'], ['in', 'Follow us @voyara.travel!'], ['𝕏', 'Tweet us @voyara!']].map(([icon, msg]) => (
              <a key={icon} href="#" onClick={T(msg)}
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--terra)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
              >{icon}</a>
            ))}
          </div>
        </div>

        {[
          { title: 'Company', links: [['About Us', 'About page coming soon!'], ['Careers', 'Careers page coming soon!'], ['Mobile App', 'Mobile app coming soon!'], ['Press', 'Press kit coming soon!']] },
          { title: 'Support', links: [['Help / FAQ', 'Help centre coming soon!'], ['WhatsApp Us', 'WhatsApp support loading...'], ['Cancellation Policy', 'Cancellation policy coming soon!'], ['Affiliates', 'Affiliates page coming soon!']] },
          { title: 'Destinations', links: [['Goa', 'Goa packages loading...'], ['Bali', 'Bali packages loading...'], ['Dubai', 'Dubai packages loading...'], ['Europe', 'Europe packages loading...']] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.3rem' }}>{col.title}</h4>
            {col.links.map(([label, msg]) => (
              <a key={label} href="#" onClick={T(msg)}
                style={{ display: 'block', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.8rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='var(--terra)'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.65)'}
              >{label}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>© 2026 Voyara Travel Pvt. Ltd. · New Delhi, India · All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['Privacy Policy', 'Privacy policy coming soon!'], ['Terms of Service', 'Terms coming soon!'], ['Sitemap', 'Sitemap coming soon!']].map(([l, m]) => (
            <a key={l} href="#" onClick={T(m)}
              style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='var(--terra)'}
              onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.3)'}
            >{l}</a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid-inner { grid-template-columns: 1fr 1fr 1fr !important; }
          .footer-grid-inner > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer-grid-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
