import React, { useEffect, useRef } from 'react'

const services = [
  { icon: '🌤', title: 'Weather Planning', desc: 'Smart forecasting so you always travel in the best season and pack the right things.' },
  { icon: '✈️', title: 'Best Flights', desc: 'We compare hundreds of airlines to find you the best fares and most convenient routes from India.' },
  { icon: '🎉', title: 'Local Experiences', desc: 'Discover local festivals, hidden gems, and exclusive tours at every destination.' },
  { icon: '🎨', title: 'Custom Trips', desc: 'Honeymoon, family, solo, group — we tailor every trip to your style, budget, and timeline.' },
]

export default function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" ref={ref} style={{ background: 'var(--white)', padding: '90px 5%' }}>
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' }}>What We Offer</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--dark)', marginBottom: '1rem' }}>Everything for Your Perfect Trip</h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>One platform for all your travel needs — no juggling, no confusion.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '1200px', margin: '0 auto' }}>
        {services.map((s, i) => (
          <div key={s.title}
            className={`fade-up service-card${i > 0 ? ` fade-up-d${Math.min(i,3)}` : ''}`}
            style={{
              background: 'var(--cream)', borderRadius: '24px', padding: '2.5rem 2rem',
              textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer',
              border: '1px solid transparent', position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 20px 60px rgba(26,18,8,0.10)'; e.currentTarget.style.borderColor='rgba(212,98,42,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor='transparent' }}
          >
            <div style={{
              width: '72px', height: '72px', background: 'var(--sand)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem', fontSize: '2rem', transition: 'background 0.3s',
            }}>{s.icon}</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--dark)' }}>{s.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
