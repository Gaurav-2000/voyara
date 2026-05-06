import React, { useEffect, useRef } from 'react'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80',
    label: '🏝 Maldives',
    alt: 'Traveler at Maldives beach',
    gridArea: '1 / 1 / 2 / 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80',
    label: '🕌 Jaipur',
    alt: 'Exploring Jaipur heritage',
    gridArea: '1 / 3 / 2 / 4',
  },
  {
    src: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=80',
    label: '🇬🇷 Santorini',
    alt: 'Couple in Santorini',
    gridArea: '1 / 4 / 2 / 5',
  },
  {
    src: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&q=80',
    label: '🌅 Thailand',
    alt: 'Solo traveler in Thailand',
    gridArea: '1 / 5 / 2 / 7',
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
    label: '🏔 Swiss Alps',
    alt: 'Friends exploring Swiss Alps',
    gridArea: '2 / 1 / 3 / 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80',
    label: '🌴 Bali',
    alt: 'Couple traveling in Bali',
    gridArea: '2 / 3 / 3 / 5',
  },
  {
    src: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80',
    label: '🏙 Dubai',
    alt: 'Dubai cityscape at night',
    gridArea: '2 / 5 / 3 / 7',
  },
]

export default function SocialProof() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="social-proof" ref={ref} style={{ background: 'var(--cream)', padding: '90px 5%' }}>
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem',
        }}>@voyara.travel</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700,
          color: 'var(--dark)', marginBottom: '1rem',
        }}>From Our Travelers</h2>
        <p style={{
          color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7,
          maxWidth: '520px', margin: '0 auto',
        }}>Real moments, real people, real adventures — shared by our community.</p>
      </div>

      {/* Desktop grid */}
      <div
        className="fade-up sp-desktop-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(2, 220px)',
          gap: '0.75rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {photos.map((p, i) => (
          <div
            key={i}
            style={{ gridArea: p.gridArea, borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('img').style.transform = 'scale(1.08)'
              e.currentTarget.querySelector('.sp-overlay').style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('img').style.transform = ''
              e.currentTarget.querySelector('.sp-overlay').style.opacity = '0'
            }}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
            />
            <div className="sp-overlay" style={{
              position: 'absolute', inset: 0,
              background: 'rgba(26,18,8,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transition: 'opacity 0.3s',
            }}>
              <span style={{
                color: 'white', fontSize: '0.82rem', fontWeight: 600,
                background: 'rgba(0,0,0,0.3)', padding: '0.35rem 0.85rem',
                borderRadius: '50px', backdropFilter: 'blur(4px)',
              }}>{p.label}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sp-desktop-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: auto !important;
            gap: 0.6rem !important;
          }
          .sp-desktop-grid > div {
            grid-area: auto !important;
            aspect-ratio: 1 !important;
            height: 150px;
          }
        }
      `}</style>
    </section>
  )
}