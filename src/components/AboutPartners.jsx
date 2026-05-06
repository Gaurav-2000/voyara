import React, { useEffect, useRef, useState } from 'react'

const logos = [
  { src: 'https://cdn.prod.website-files.com/6170700f1a1db6b3a0ac16ed/617938cf9e2702befb6cd457_logo-avon.png', alt: 'Axon' },
  { src: 'https://cdn.prod.website-files.com/6170700f1a1db6b3a0ac16ed/617938d05c891c4cf1ca713a_logo-jetstar.png', alt: 'Jetstar' },
  { src: 'https://cdn.prod.website-files.com/6170700f1a1db6b3a0ac16ed/617938cf9f94ee62add0ce04_logo-expedia.png', alt: 'Expedia' },
  { src: 'https://cdn.prod.website-files.com/6170700f1a1db6b3a0ac16ed/617938cf9ff2818825438ce4_logo-qantas.png', alt: 'Qantas' },
  { src: 'https://cdn.prod.website-files.com/6170700f1a1db6b3a0ac16ed/617938d04df7bbb8e49a5f22_logo-alitalia.png', alt: 'Alitalia' },
]
const allLogos = [...logos, ...logos]

const stats = [
  { num: 50, suffix: 'K+', label: 'Travelers Served', icon: '👥' },
  { num: 800, suffix: '+', label: 'Destinations', icon: '🌍' },
  { num: 5, suffix: '+', label: 'Years Experience', icon: '🏆' },
]

const badges = [
  { icon: '📍', text: 'Based in New Delhi, India', color: '#FFF3ED' },
  { icon: '🏅', text: 'IATA Accredited Agency', color: '#FFF8ED' },
  { icon: '🔒', text: '100% Secure & Licensed', color: '#F0FDF4' },
  { icon: '📱', text: "India's #1 Travel App 2025", color: '#EFF6FF' },
]

function useCounter(target, isVisible, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const timer = setInterval(() => {
      start += target / (duration / 16)
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target])
  return count
}

export function AboutStrip() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setIsVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--sand)',
      padding: '90px 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Decorative background elements */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 90% 10%, rgba(212,98,42,0.07) 0%, transparent 50%),
          radial-gradient(circle at 10% 90%, rgba(212,98,42,0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />
      {/* Top border accent */}
      <div style={{
        position: 'absolute', top: 0, left: '5%', right: '5%', height: '3px',
        background: 'linear-gradient(90deg, transparent, var(--terra), transparent)',
        borderRadius: '0 0 4px 4px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* — SAME 3-COL LAYOUT — */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }} className="about-main-grid">

          {/* ── COL 1: Text ── */}
          <div style={{
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-28px)',
          }}>
            {/* Live dot pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'white',
              border: '1px solid rgba(212,98,42,0.18)',
              borderRadius: '50px', padding: '0.3rem 0.85rem 0.3rem 0.5rem',
              marginBottom: '1.25rem',
              boxShadow: '0 2px 12px rgba(212,98,42,0.1)',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#22c55e', display: 'inline-block',
                boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
                animation: 'livePulse 2s infinite',
              }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mid)' }}>
                Since 2019 · Active
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
              fontWeight: 900, lineHeight: 1.15,
              color: 'var(--dark)', marginBottom: '1rem',
            }}>
              India's Most<br />
              <span style={{
                color: 'var(--terra)', fontStyle: 'italic',
                position: 'relative', display: 'inline-block',
              }}>
                Trusted
                {/* Underline squiggle */}
                <svg viewBox="0 0 120 8" style={{
                  position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '8px',
                }} preserveAspectRatio="none">
                  <path d="M0,5 Q15,0 30,5 Q45,10 60,5 Q75,0 90,5 Q105,10 120,5"
                    fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>
              {' '}Travel Partner
            </h3>

            <p style={{
              color: 'var(--muted)', fontSize: '0.9rem',
              lineHeight: 1.85, maxWidth: '360px', marginBottom: '1.75rem',
            }}>
              A New Delhi–based travel company crafting unforgettable journeys for Indian travelers — from Goa weekends to Europe adventures.
            </p>

            {/* Mini trust row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ display: 'flex' }}>
                  {['#e07b54', '#d4622a', '#c2541f'].map((c, i) => (
                    <div key={i} style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: c, border: '2px solid var(--sand)',
                      marginLeft: i > 0 ? '-8px' : '0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', color: 'white', fontWeight: 700,
                    }}>
                      {['R', 'A', 'P'][i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>
                  +50K travelers
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} style={{ color: '#F59E0B', fontSize: '0.85rem' }}>★</span>
                ))}
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>4.8/5</span>
              </div>
            </div>
          </div>

          {/* ── COL 2: Stats card ── */}
          <div style={{
            background: 'white',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(26,18,8,0.1)',
            border: '1px solid rgba(212,98,42,0.08)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
          }}>
            {/* Card header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--terra) 0%, var(--terra-dark) 100%)',
              padding: '1.25rem 1.75rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: 'white', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                Our Numbers
              </span>
              <span style={{ fontSize: '1.1rem' }}>📊</span>
            </div>

            {/* Stat rows */}
            {stats.map((s, i) => {
              const count = useCounter(s.num, isVisible)
              return (
                <div key={s.label} style={{
                  padding: '1.2rem 1.75rem',
                  borderBottom: i < stats.length - 1 ? '1px solid var(--sand)' : 'none',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,98,42,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: 'rgba(212,98,42,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', flexShrink: 0,
                  }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500, marginBottom: '2px' }}>{s.label}</div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.5rem', fontWeight: 900, lineHeight: 1,
                      color: 'var(--terra)',
                    }}>{count}{s.suffix}</div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ width: '48px' }}>
                    <div style={{
                      height: '4px', borderRadius: '2px',
                      background: 'var(--sand)', overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', borderRadius: '2px',
                        background: 'linear-gradient(90deg, var(--terra), var(--terra-light))',
                        width: isVisible ? ['92%', '85%', '95%'][i] : '0%',
                        transition: `width 1.2s ease ${0.3 + i * 0.15}s`,
                      }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── COL 3: Badges ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.7rem',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(28px)',
          }}>
            {badges.map((b, i) => (
              <div key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  background: 'white',
                  border: '1px solid rgba(212,98,42,0.09)',
                  borderRadius: '16px',
                  padding: '0.95rem 1.15rem',
                  boxShadow: '0 4px 18px rgba(26,18,8,0.05)',
                  transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s, border-color 0.25s',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(8px) scale(1.01)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(26,18,8,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(212,98,42,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(26,18,8,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(212,98,42,0.09)'
                }}
              >
                {/* Left color accent bar */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: '3px',
                  background: 'linear-gradient(180deg, var(--terra), var(--terra-light))',
                  borderRadius: '0 2px 2px 0',
                  opacity: 0.6,
                }} />
                <span style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: b.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.05rem', flexShrink: 0,
                }}>{b.icon}</span>
                <span style={{
                  fontSize: '0.83rem', fontWeight: 500,
                  color: 'var(--mid)', lineHeight: 1.3,
                }}>{b.text}</span>
                {/* Arrow */}
                <span style={{
                  marginLeft: 'auto', fontSize: '0.7rem',
                  color: 'var(--terra)', opacity: 0.5,
                  flexShrink: 0,
                }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.1); }
        }
        @media (max-width: 1024px) {
          .about-main-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .about-main-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .about-main-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}

export function Partners() {
  return (
    <div id="partners" style={{ background: 'var(--cream)', padding: '60px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,98,42,0.18), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,98,42,0.18), transparent)' }} />
      <p style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center', marginBottom: '2.5rem', padding: '0 5%' }}>
        Trusted by leading travel brands worldwide
      </p>
      <div className="marquee-wrapper" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '100px', background: 'linear-gradient(90deg, var(--cream) 0%, transparent 100%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '100px', background: 'linear-gradient(270deg, var(--cream) 0%, transparent 100%)', zIndex: 2 }} />
        <div className="marquee-track" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
          {allLogos.map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3rem', flexShrink: 0 }}>
              <img src={l.src} alt={l.alt}
                style={{ height: '28px', width: 'auto', filter: 'grayscale(1) brightness(0.6)', opacity: 0.55, transition: 'all 0.4s', display: 'block' }}
                onMouseEnter={e => { e.target.style.filter = 'grayscale(0) brightness(1)'; e.target.style.opacity = '1'; e.target.style.transform = 'scale(1.08) translateY(-2px)' }}
                onMouseLeave={e => { e.target.style.filter = 'grayscale(1) brightness(0.6)'; e.target.style.opacity = '0.55'; e.target.style.transform = '' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}