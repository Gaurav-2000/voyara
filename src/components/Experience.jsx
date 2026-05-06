import React, { useEffect, useRef, useState } from 'react'

const stats = [
  ['50K', '+', 'Trips Completed'],
  ['5', 'yr', 'In Business'],
  ['99', '%', 'Satisfaction'],
]

const VIDEO_SRC = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
const THUMB = `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85`

export default function Experience({ showToast }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [ripple, setRipple] = useState(false)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handlePlay = () => {
    setRipple(true)
    setTimeout(() => { setRipple(false); setPlaying(true) }, 380)
  }

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        background: 'var(--dark)',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 5%',
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        borderRadius: '50%', top: '-180px', right: '-120px',
        background: 'radial-gradient(circle, rgba(180,100,50,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '50%', bottom: '-100px', left: '-80px',
        background: 'radial-gradient(circle, rgba(180,100,50,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        className="experience-grid-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* ── Text side ── */}
        <div className="fade-up">
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '4px',
            textTransform: 'uppercase', color: 'var(--terra)',
            marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{
              display: 'inline-block', width: '28px', height: '2px',
              background: 'var(--terra)', borderRadius: '2px',
            }} />
            The Voyara Experience
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 700, color: 'white',
            lineHeight: 1.15, marginBottom: '1.25rem',
          }}>
            See What Your<br />
            <em style={{ fontStyle: 'italic', color: 'var(--terra-light, #d4845a)' }}>Journey</em> Looks Like
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem',
            lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '400px',
          }}>
            From the moment you book to the final sunset — every detail is
            crafted to give you memories that last a lifetime.
          </p>

          <a
            href="#destinations"
            style={{
              background: 'var(--terra)', color: 'white',
              padding: '0.95rem 2.2rem', borderRadius: '50px',
              fontSize: '0.95rem', fontWeight: 600,
              textDecoration: 'none', display: 'inline-flex',
              alignItems: 'center', gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 24px rgba(180,100,50,0.35)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--terra-light, #d4845a)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(180,100,50,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--terra)'
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(180,100,50,0.35)'
            }}
          >
            Plan My Trip
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            {stats.map(([n, s, l]) => (
              <div key={l} style={{ animation: 'fadeSlideUp 0.6s ease both' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.4rem', fontWeight: 700,
                  color: 'white', lineHeight: 1,
                }}>
                  {n}<span style={{ color: 'var(--terra)' }}>{s}</span>
                </div>
                <div style={{
                  fontSize: '0.72rem', letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.4)', marginTop: '6px',
                  textTransform: 'uppercase',
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Video side ── */}
        <div
          className="fade-up fade-up-d2"
          style={{ position: 'relative' }}
        >
          {/* Decorative frame behind card */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '32px',
            border: '1px solid rgba(180,100,50,0.25)',
            transform: 'translate(14px, 14px)',
            zIndex: 0,
          }} />

          {/* Main video card */}
          <div
            style={{
              position: 'relative', zIndex: 1,
              borderRadius: '28px', overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
              cursor: playing ? 'default' : 'pointer',
              transition: 'transform 0.4s cubic-bezier(.22,.68,0,1.2), box-shadow 0.4s ease',
              transform: hovered && !playing ? 'translateY(-6px) scale(1.01)' : '',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={!playing ? handlePlay : undefined}
          >
            {playing ? (
              /* ── HTML5 VIDEO PLAYER ── */
              <video
                src={VIDEO_SRC}
                autoPlay
                controls
                playsInline
                style={{
                  width: '100%', aspectRatio: '16/10',
                  display: 'block', background: '#000',
                  objectFit: 'cover',
                }}
              />
            ) : (
              /* ── THUMBNAIL WITH OVERLAY ── */
              <>
                {/* Thumbnail image */}
                <img
                  src={THUMB}
                  alt="Cinematic travel adventure thumbnail"
                  loading="lazy"
                  style={{
                    width: '100%', aspectRatio: '16/10',
                    objectFit: 'cover', display: 'block',
                    transition: 'transform 0.6s cubic-bezier(.22,.68,0,1.2)',
                    transform: hovered ? 'scale(1.05)' : 'scale(1)',
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(10,6,2,0.15) 0%, rgba(10,6,2,0.72) 100%)',
                }} />

                {/* Scanline shimmer */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: hovered
                    ? 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)'
                    : 'none',
                  transition: 'opacity 0.4s',
                }} />

                {/* Duration badge */}
                <div style={{
                  position: 'absolute', top: '18px', right: '18px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  color: 'white', fontSize: '0.72rem',
                  fontWeight: 600, letterSpacing: '0.5px',
                  padding: '5px 10px', borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>2:47</div>

                {/* Center play cluster */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '14px',
                }}>
                  {/* Ripple rings */}
                  {ripple && (
                    <>
                      <div style={{
                        position: 'absolute',
                        width: '90px', height: '90px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.5)',
                        animation: 'rippleOut 0.4s ease-out forwards',
                      }} />
                      <div style={{
                        position: 'absolute',
                        width: '110px', height: '110px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.25)',
                        animation: 'rippleOut 0.4s 0.07s ease-out forwards',
                      }} />
                    </>
                  )}

                  {/* Outer pulse ring */}
                  {!ripple && (
                    <div style={{
                      position: 'absolute',
                      width: '96px', height: '96px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.2)',
                      animation: 'pulse 2.5s ease-in-out infinite',
                    }} />
                  )}

                  {/* Play button */}
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: ripple
                      ? 'rgba(255,255,255,1)'
                      : hovered
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(255,255,255,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s ease',
                    transform: hovered ? 'scale(1.12)' : 'scale(1)',
                    boxShadow: hovered
                      ? '0 0 0 8px rgba(255,255,255,0.12), 0 12px 40px rgba(0,0,0,0.4)'
                      : '0 8px 30px rgba(0,0,0,0.35)',
                    paddingLeft: '5px',
                    zIndex: 2,
                  }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <polygon points="6,3 20,12 6,21" fill="#1a120a" />
                    </svg>
                  </div>

                  <div style={{
                    color: 'white', fontSize: '0.82rem', fontWeight: 500,
                    letterSpacing: '0.5px',
                    opacity: hovered ? 1 : 0.75,
                    transition: 'opacity 0.3s',
                    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                  }}>
                    Watch how your journey looks
                  </div>
                </div>

                {/* Bottom caption bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '18px 22px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'linear-gradient(0deg, rgba(10,6,2,0.85) 0%, transparent 100%)',
                  transform: hovered ? 'translateY(0)' : 'translateY(6px)',
                  opacity: hovered ? 1 : 0.7,
                  transition: 'all 0.35s ease',
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'var(--terra)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg>
                  </div>
                  <div>
                    <div style={{ color: 'white', fontSize: '0.78rem', fontWeight: 600 }}>Lago di Braies, Italy</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem' }}>Dolomites • Summer 2024</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Floating "HD" badge */}
          {!playing && (
            <div style={{
              position: 'absolute', top: '-12px', left: '28px',
              background: 'var(--terra)',
              color: 'white', fontSize: '0.65rem',
              fontWeight: 800, letterSpacing: '2px',
              padding: '5px 12px', borderRadius: '50px',
              boxShadow: '0 4px 16px rgba(180,100,50,0.45)',
              animation: 'float 3s ease-in-out infinite',
              zIndex: 2,
            }}>4K · HD</div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%       { transform: scale(1.18); opacity: 0; }
        }
        @keyframes rippleOut {
          from { transform: scale(1);   opacity: 1; }
          to   { transform: scale(1.8); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.8s cubic-bezier(.22,.68,0,1.2),
                      transform 0.8s cubic-bezier(.22,.68,0,1.2);
        }
        .fade-up.fade-up-d2 { transition-delay: 0.18s; }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .experience-grid-inner {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}