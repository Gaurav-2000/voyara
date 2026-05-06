import React, { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    text: 'Booked our Bali honeymoon through Voyara — every detail was sorted, from the airport transfers to the candle dinner on the beach. Not a single hitch. Pure magic.',
    name: 'Riya Sharma',
    detail: 'New Delhi · Jan 2026',
    badge: '💑 Bali Honeymoon',
    // Real couple / person photo
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=120&q=80',
  },
  {
    text: 'Solo trip to Manali in February — the snow was unreal and the itinerary was packed with adventures. Voyara\'s 24/7 support saved me when my return flight changed last minute.',
    name: 'Arjun Mehta',
    detail: 'Mumbai · Feb 2026',
    badge: '🎒 Solo · Manali Snow Trip',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
  {
    text: 'Took the whole family to Dubai — parents, kids, everyone loved it. The desert safari and Burj Khalifa experience were unforgettable. Voyara handled everything flawlessly.',
    name: 'Priya Nair',
    detail: 'Bengaluru · Dec 2025',
    badge: '👨‍👩‍👧‍👦 Family · Dubai Luxury',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef(null)
  const autoRef = useRef(null)
  const touchStartX = useRef(0)
  const touchDelta = useRef(0)
  const isSwiping = useRef(false)
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

  const total = testimonials.length

  const goTo = (idx) => {
    const next = ((idx % total) + total) % total
    setCurrent(next)
  }

  const startAuto = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 5000)
  }

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [])

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * 100}%)`
    }
  }, [current])

  return (
    <section id="testimonials" ref={ref} style={{ background: 'var(--dark)', color: 'white', padding: '90px 5%' }}>
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' }}>Testimonials</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'white' }}>
          Real Stories from<br />Real Travelers
        </h2>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        <div style={{ overflow: 'hidden' }}>
          <div
            ref={trackRef}
            className="testimonials-track"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX
              isSwiping.current = true
              clearInterval(autoRef.current)
              trackRef.current.style.transition = 'none'
            }}
            onTouchMove={(e) => {
              if (!isSwiping.current) return
              touchDelta.current = e.touches[0].clientX - touchStartX.current
              const offset = -current * 100 + (touchDelta.current / (trackRef.current?.parentElement?.offsetWidth || 1)) * 100
              trackRef.current.style.transform = `translateX(${offset}%)`
            }}
            onTouchEnd={() => {
              isSwiping.current = false
              trackRef.current.style.transition = ''
              if (Math.abs(touchDelta.current) > 50) {
                goTo(touchDelta.current < 0 ? current + 1 : current - 1)
              } else {
                goTo(current)
              }
              touchDelta.current = 0
              startAuto()
            }}
          >
            {testimonials.map((t, i) => (
              <div key={i} style={{ minWidth: '100%', padding: '0 1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', lineHeight: 1, color: 'var(--terra)', fontFamily: "'Playfair Display', serif", marginBottom: '0.5rem' }}>"</div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.88)', lineHeight: 1.75,
                  maxWidth: '680px', margin: '0 auto 2rem',
                }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--terra)', flexShrink: 0 }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{t.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '2px' }}>{t.detail}</div>
                    <div style={{
                      background: 'rgba(212,98,42,0.2)', border: '1px solid rgba(212,98,42,0.3)',
                      color: 'var(--terra-light)', borderRadius: '50px',
                      padding: '0.3rem 0.9rem', fontSize: '0.75rem', fontWeight: 600,
                      display: 'inline-block', marginTop: '0.5rem',
                    }}>{t.badge}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
          <button onClick={() => { goTo(current - 1); startAuto() }}
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => { e.target.style.background='var(--terra)'; e.target.style.borderColor='var(--terra)' }}
            onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.borderColor='rgba(255,255,255,0.2)' }}
          >←</button>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {testimonials.map((_, i) => (
              <div key={i}
                onClick={() => { goTo(i); startAuto() }}
                style={{
                  height: '8px', borderRadius: i === current ? '4px' : '50%',
                  background: i === current ? 'var(--terra)' : 'rgba(255,255,255,0.3)',
                  width: i === current ? '24px' : '8px',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
          <button onClick={() => { goTo(current + 1); startAuto() }}
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => { e.target.style.background='var(--terra)'; e.target.style.borderColor='var(--terra)' }}
            onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.borderColor='rgba(255,255,255,0.2)' }}
          >→</button>
        </div>
      </div>
    </section>
  )
}
