import React, { useEffect, useRef } from 'react'

const steps = [
  { num: '01', title: 'Choose Your Destination', desc: 'Browse our curated destinations and pick your dream location — or tell us your wish and we\'ll suggest the perfect trip.' },
  { num: '02', title: 'Secure Payment', desc: 'Pay via UPI, card, or EMI. All transactions are 100% encrypted. EMI options starting at ₹3,999/month.' },
  { num: '03', title: 'Pack & Go', desc: 'Get your e-tickets and full itinerary instantly. Our team will be on WhatsApp throughout your journey.' },
]

export default function BookTrip({ onBookClick }) {  // ✅ accept prop
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="book" ref={ref} style={{ background: 'var(--white)', padding: '90px 5%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}
        className="book-grid-inner">
        <div className="fade-up">
          <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' }}>Easy &amp; Fast</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--dark)', marginBottom: '2.5rem' }}>
            Book Your Next Trip<br />in 3 Easy Steps
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}
                onMouseEnter={e => { e.currentTarget.querySelector('.step-num-inner').style.background = 'var(--terra)'; e.currentTarget.querySelector('.step-num-inner').style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.querySelector('.step-num-inner').style.background = 'var(--sand)'; e.currentTarget.querySelector('.step-num-inner').style.color = 'var(--terra)' }}
              >
                <div className="step-num-inner" style={{
                  width: '52px', height: '52px', borderRadius: '50%', background: 'var(--sand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--terra)',
                  flexShrink: 0, transition: 'background 0.3s, color 0.3s',
                }}>{s.num}</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--dark)' }}>{s.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ CHANGED: anchor → button, opens booking modal */}

          {/* Replace the button block with this */}
          <button
            onClick={onBookClick}
            onTouchEnd={e => { e.preventDefault(); onBookClick?.() }}
            className="book-btn"
            style={{
              background: 'var(--terra)', color: 'white', padding: '0.9rem 2rem',
              borderRadius: '50px', fontSize: '1rem', fontWeight: 600,
              border: 'none', cursor: 'pointer', display: 'inline-block',
              marginTop: '2.5rem', transition: 'all 0.3s',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              position: 'relative', zIndex: 10,        // ← ensures nothing overlaps it
            }}
          >✈ Book Your Trip</button>
        </div>

        {/* Visual */}
        <div className="fade-up fade-up-d2" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'var(--white)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(26,18,8,0.14)', width: '100%', maxWidth: '320px' }}>
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
              alt="Bali Trip"
              loading="lazy"
              style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '1.2rem 1.5rem' }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: '0.3rem' }}>Bali, Indonesia</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>6 nights · Starting from ₹68,000 per couple</p>
            </div>
          </div>
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px',
            background: 'var(--terra)', color: 'white', borderRadius: '20px',
            padding: '1rem 1.5rem', boxShadow: '0 10px 30px rgba(212,98,42,0.4)', textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>800+</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Destinations</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .book-grid-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .book-grid-inner > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  )
}