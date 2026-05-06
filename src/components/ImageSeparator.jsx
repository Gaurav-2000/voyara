import React from 'react'

const separators = {

  afterDestinations: {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80',
    alt: 'Friends exploring a beautiful mountain landscape',
    overlayStyle: 'linear-gradient(180deg, rgba(26,18,8,0.0) 0%, rgba(26,18,8,0.45) 60%, rgba(26,18,8,0.7) 100%)',
    height: '380px',
    caption: { text: '"Every journey begins with a single step."', sub: 'Explore 800+ destinations with Voyara' },
  },
  beforeTestimonials: {
    src: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1600&q=80',
    alt: 'Family enjoying vacation on the beach at sunset',
    overlayStyle: 'linear-gradient(180deg, rgba(26,18,8,0.55) 0%, rgba(26,18,8,0.2) 50%, rgba(26,18,8,0.65) 100%)',
    height: '360px',
    caption: { text: '50,000+ Families. One Trusted Partner.', sub: 'Real stories from real Indian travelers' },
  },
}

export default function ImageSeparator({ variant }) {
  const sep = separators[variant]
  if (!sep) return null

  return (
    <div className="img-separator" style={{ height: sep.height }}>
      <img src={sep.src} alt={sep.alt} loading="lazy" />
      <div className="sep-overlay" style={{ background: sep.overlayStyle }} />
      {sep.caption && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, padding: '0 5%', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 3vw, 1.8rem)', color: 'white',
            fontWeight: 700, maxWidth: '700px', lineHeight: 1.4,
            textShadow: '0 2px 20px rgba(0,0,0,0.4)', marginBottom: '0.75rem',
          }}>{sep.caption.text}</p>
          <span style={{
            fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)',
            fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase',
            background: 'rgba(212,98,42,0.7)', padding: '0.4rem 1.2rem',
            borderRadius: '50px',
          }}>{sep.caption.sub}</span>
        </div>
      )}
    </div>
  )
}
