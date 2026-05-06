import React, { useEffect, useRef } from 'react'

export default function Experience({ showToast }) {
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
    <section id="experience" ref={ref} style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden', padding: '90px 5%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}
        className="experience-grid-inner">
        {/* Text */}
        <div className="fade-up">
          <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' }}>The Voyara Experience</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
            See What Your<br />Journey Looks Like
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            From the moment you book to the final sunset — every detail is crafted to give you memories that last a lifetime.
          </p>
          <a href="#destinations"
            style={{ background: 'var(--terra)', color: 'white', padding: '0.9rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: '1.5rem', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.target.style.background='var(--terra-light)'; e.target.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.background='var(--terra)'; e.target.style.transform='' }}
          >Plan My Trip</a>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            {[['50K', '+', 'Trips Completed'], ['5', 'yr', 'In Business'], ['99', '%', 'Satisfaction']].map(([n, s, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>
                  {n}<span style={{ color: 'var(--terra)' }}>{s}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic video thumbnail — upgraded to show real people */}
        <div
          className="fade-up fade-up-d2"
          onClick={() => showToast('▶ Video player coming soon — experience the magic!')}
          style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform='scale(1.03)'; e.currentTarget.querySelector('.play-btn-inner').style.transform='scale(1.1)'; e.currentTarget.querySelector('.play-btn-inner').style.background='white' }}
          onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform=''; e.currentTarget.querySelector('.play-btn-inner').style.transform=''; e.currentTarget.querySelector('.play-btn-inner').style.background='rgba(255,255,255,0.95)' }}
        >
          {/* Upgraded to cinematic shot of couple traveling */}
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80"
            alt="Couple watching sunset on their travel adventure"
            loading="lazy"
            style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(0deg, rgba(26,18,8,0.65) 0%, rgba(26,18,8,0.15) 60%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem',
          }}>
            <div className="play-btn-inner" style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', transition: 'all 0.3s',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)', paddingLeft: '4px',
            }}>▶</div>
            <div style={{ color: 'white', fontSize: '0.88rem', fontWeight: 500, opacity: 0.85 }}>Watch how your journey looks</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .experience-grid-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
