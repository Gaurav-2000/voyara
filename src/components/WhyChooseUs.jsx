import React, { useEffect, useRef } from 'react'

const cards = [
  { icon: '🧭', title: 'Stress-Free Planning', desc: 'Tell us your dream. We handle flights, hotels, transfers, and activities. You just pack your bags.', tag: 'Full itinerary included →' },
  { icon: '🛡️', title: 'Everything Managed', desc: 'From airport pickup to local experiences — every detail is arranged, confirmed, and ready for you.', tag: 'Zero surprises →' },
  { icon: '🌙', title: '24/7 Travel Support', desc: 'Flight delayed? Lost luggage? Our India-based team is available round the clock to help.', tag: 'WhatsApp support →' },
  { icon: '🌍', title: 'Handpicked Experiences', desc: 'Every destination, hotel, and activity is personally vetted by our travel experts for quality.', tag: 'Curated for India →' },
]

export default function WhyChooseUs() {
  const sectionRef = useRef(null)

  // Header reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Cards staggered entrance
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cardEls = section.querySelectorAll('.why-card-item')
    const timers = []
    cardEls.forEach((el, i) => {
      const t = setTimeout(() => el.classList.add('visible'), 200 + i * 100)
      timers.push(t)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="why" ref={sectionRef} style={{ background: 'var(--cream)', padding: '90px 5%' }}>

      {/* Header */}
      <div className="fade-up header-block" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' }}>Why Voyara</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--dark)', marginBottom: '1rem' }}>Travel Without the Stress</h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>We handle everything so you can focus on making memories.</p>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        {cards.map((c, i) => (
          <div
            key={c.title}
            className="why-card-item"
            style={{ perspective: '800px' }}
          >
            {/* Flip wrapper */}
            <div
              className="why-card-inner"
              style={{
                background: 'var(--white)',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                border: '1px solid transparent',
                cursor: 'default',
                transformStyle: 'preserve-3d',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                const inner = e.currentTarget
                inner.style.borderColor = 'rgba(212,98,42,0.12)'
                inner.style.boxShadow = '0 30px 80px rgba(26,18,8,0.18)'
                inner.classList.add('flip-once')
              }}
              onMouseLeave={e => {
                const inner = e.currentTarget
                inner.style.borderColor = 'transparent'
                inner.style.boxShadow = ''
              }}
            >
              <div style={{
                width: '68px', height: '68px', borderRadius: '20px',
                background: 'linear-gradient(135deg, var(--terra), var(--terra-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', marginBottom: '1.5rem',
                boxShadow: '0 8px 20px rgba(212,98,42,0.3)',
              }}>{c.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--dark)' }}>{c.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{c.desc}</p>
              <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--terra)' }}>{c.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* ── Header fade-up ── */
        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(.22,1,.36,1),
                      transform 0.75s cubic-bezier(.22,1,.36,1);
        }
        .fade-up.header-block { transition-delay: 0.1s; }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Card entrance ── */
        .why-card-item {
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1),
                      transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .why-card-item.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── Flip once on hover ── */
        @keyframes flipOnce {
          0%   { transform: rotateY(0deg); }
          50%  { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        .why-card-inner.flip-once {
          animation: flipOnce 0.55s cubic-bezier(.45,0,.55,1) forwards;
        }
      `}</style>
    </section>
  )
}