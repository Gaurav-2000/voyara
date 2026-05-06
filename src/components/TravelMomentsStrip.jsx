import React, { useRef, useEffect, useState } from 'react'

const moments = [
  { src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85', label: '✈️ Airport' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', label: '🏝️ Beach' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85', label: '🏨 Hotel' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85', label: '🍜 Food' },
  { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85', label: '🧗 Adventure' },
  { src: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1200&q=85', label: '🗺️ Explore' },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85', label: '🌅 Sunsets' },
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=85', label: '🚂 Train' },
  { src: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=85', label: '🏔️ Mountains' },
  { src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=85', label: '🛶 Water' },
  { src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', label: '🎭 Culture' },
  { src: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=85', label: '🧳 Packing' },
  { src: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=85', label: '🤿 Diving' },
  { src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=85', label: '🇮🇹 Europe' },
]

export default function TravelMomentsStrip() {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const pausedRef = useRef(false)
  const posRef = useRef(0)
  const panelRef = useRef(null)

  // ✅ Default to first moment on load
  const [selected, setSelected] = useState(moments[0])
  const [animIn, setAnimIn] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  // ✅ Trigger entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimIn(true), 60)
    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll loop
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const speed = 0.5
    const tick = () => {
      if (!pausedRef.current && track) {
        posRef.current += speed
        const half = track.scrollWidth / 2
        if (posRef.current >= half) posRef.current = 0
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const handleSelect = (moment) => {
    setImgLoaded(false)
    setAnimIn(false)
    setSelected(moment)
    setTimeout(() => setAnimIn(true), 20)
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  const handleClose = () => {
    setAnimIn(false)
    setTimeout(() => setSelected(null), 380)
  }

  const allMoments = [...moments, ...moments]

  return (
    <div style={{ background: 'var(--white, #faf8f5)' }}>

      {/* ── FEATURED WIDE PANEL ── */}
      <div
        ref={panelRef}
        style={{
          overflow: 'hidden',
          maxHeight: selected ? '520px' : '0px',
          transition: 'max-height 0.5s cubic-bezier(.77,0,.175,1)',
        }}
      >
        {selected && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '480px',
              background: '#0a0604',
              overflow: 'hidden',
            }}
          >
            {/* Wide image */}
            <img
              key={selected.src}
              src={selected.src}
              alt={selected.label}
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: imgLoaded && animIn ? 1 : 0,
                transform: animIn ? 'scale(1)' : 'scale(1.04)',
                transition: 'opacity 0.55s ease, transform 0.7s cubic-bezier(.22,.68,0,1.1)',
              }}
            />

            {/* Bottom gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(0deg, rgba(10,6,4,0.72) 0%, rgba(10,6,4,0.1) 55%, transparent 100%)',
              pointerEvents: 'none',
            }} />

            {/* Top gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(10,6,4,0.45) 0%, transparent 40%)',
              pointerEvents: 'none',
            }} />

            {/* Label pill — bottom left */}
            <div style={{
              position: 'absolute', bottom: '32px', left: '5%',
              opacity: animIn ? 1 : 0,
              transform: animIn ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.5s 0.18s ease, transform 0.5s 0.18s ease',
            }}>
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px',
                textTransform: 'uppercase', color: 'var(--terra, #c4612a)',
                marginBottom: '8px',
              }}>Now Viewing</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                fontWeight: 700, color: 'white',
                lineHeight: 1.1,
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              }}>{selected.label}</div>
            </div>

            {/* Thumb index dots */}
            <div style={{
              position: 'absolute', bottom: '36px', right: '5%',
              display: 'flex', gap: '6px', alignItems: 'center',
              opacity: animIn ? 1 : 0,
              transition: 'opacity 0.5s 0.25s ease',
            }}>
              {moments.map((m, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(m)}
                  style={{
                    width: selected.src === m.src ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: selected.src === m.src ? 'var(--terra, #c4612a)' : 'rgba(255,255,255,0.4)',
                    border: 'none', padding: 0, cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>



            {/* Prev / Next arrows */}
            {[
              { dir: -1, side: 'left', symbol: '‹' },
              { dir: 1, side: 'right', symbol: '›' },
            ].map(({ dir, side, symbol }) => (
              <button
                key={side}
                onClick={() => {
                  const idx = moments.findIndex(m => m.src === selected.src)
                  const next = moments[(idx + dir + moments.length) % moments.length]
                  handleSelect(next)
                }}
                style={{
                  position: 'absolute', top: '50%',
                  [side]: '22px',
                  transform: 'translateY(-50%)',
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: 'white', fontSize: '1.6rem',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  lineHeight: 1,
                  opacity: animIn ? 1 : 0,
                  transition: `opacity 0.4s 0.15s ease, background 0.2s, transform 0.2s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(180,80,30,0.7)'
                  e.currentTarget.style.transform = `translateY(-50%) scale(1.08)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.4)'
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                }}
              >{symbol}</button>
            ))}
          </div>
        )}
      </div>

      {/* ── HEADER + STRIP ── */}
      <div style={{
        borderBottom: '1px solid var(--sand, #e8e0d4)',
        borderTop: selected ? 'none' : '1px solid var(--sand, #e8e0d4)',
        padding: '28px 0',
      }}>
        <div style={{
          padding: '0 5%', marginBottom: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--terra, #c4612a)',
          }}>Travel Moments</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted, #9a9080)', fontWeight: 500 }}>
            {selected ? `Viewing: ${selected.label}` : 'Click any image to explore ✦'}
          </span>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Fade edges */}
          {['left', 'right'].map(side => (
            <div key={side} style={{
              position: 'absolute', top: 0, bottom: 0, [side]: 0,
              width: '80px', zIndex: 2, pointerEvents: 'none',
              background: `linear-gradient(${side === 'left' ? '90' : '270'}deg, var(--white, #faf8f5) 0%, transparent 100%)`,
            }} />
          ))}

          <div
            ref={trackRef}
            style={{
              display: 'flex', gap: '0.85rem',
              padding: '10px 5% 14px',
              width: 'max-content',
              willChange: 'transform',
            }}
            onMouseEnter={() => { pausedRef.current = true }}
            onMouseLeave={() => { pausedRef.current = false }}
          >
            {allMoments.map((m, i) => {
              const isActive = selected?.src === m.src
              return (
                <div
                  key={i}
                  onClick={() => handleSelect(m)}
                  style={{
                    flexShrink: 0,
                    width: '110px', height: '110px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: isActive
                      ? '0 0 0 3px var(--terra, #c4612a), 0 12px 30px rgba(180,80,30,0.35)'
                      : '0 4px 16px rgba(26,18,8,0.1)',
                    border: '2px solid transparent',
                    transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s',
                    transform: isActive ? 'translateY(-6px) scale(1.06)' : '',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(26,18,8,0.2)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.transform = ''
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,18,8,0.1)'
                    }
                  }}
                >
                  <img
                    src={m.src.replace('w=1200', 'w=300')}
                    alt={m.label}
                    loading="lazy"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                      filter: isActive ? 'brightness(1.1)' : 'brightness(1)',
                      transition: 'filter 0.3s',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(0deg, rgba(26,18,8,0.72) 0%, rgba(26,18,8,0.05) 55%)',
                    pointerEvents: 'none',
                  }} />
                  {/* Active dot */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', top: '8px', right: '8px',
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: 'var(--terra, #c4612a)',
                      boxShadow: '0 0 0 2px white',
                    }} />
                  )}
                  {/* Label */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    color: 'white', fontSize: '0.62rem', fontWeight: 700,
                    textAlign: 'center', padding: '0.4rem 0.25rem',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                  }}>{m.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}