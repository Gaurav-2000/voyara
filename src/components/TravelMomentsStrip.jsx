import React, { useRef, useEffect } from 'react'

const moments = [
  { src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80', label: '✈️ Airport' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80', label: '🏝️ Beach' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80', label: '🏨 Hotel' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80', label: '🍜 Food' },
  { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&q=80', label: '🧗 Adventure' },
  { src: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=300&q=80', label: '🗺️ Explore' },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80', label: '🌅 Sunsets' },
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&q=80', label: '🚂 Train' },
  { src: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=300&q=80', label: '🏔️ Mountains' },
  { src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=300&q=80', label: '🛶 Water' },
  { src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=300&q=80', label: '🎭 Culture' },
  { src: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=300&q=80', label: '🧳 Packing' },
  { src: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=300&q=80', label: '🤿 Diving' },
  { src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&q=80', label: '🇮🇹 Europe' },
]

export default function TravelMomentsStrip() {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const pausedRef = useRef(false)
  const posRef = useRef(0)

  // Auto-scroll loop
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const speed = 0.5 // px per frame

    const tick = () => {
      if (!pausedRef.current && track) {
        posRef.current += speed
        // Reset when scrolled half (since we duplicate items)
        const half = track.scrollWidth / 2
        if (posRef.current >= half) posRef.current = 0
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Duplicate items for seamless loop
  const allMoments = [...moments, ...moments]

  return (
    <div style={{
      background: 'var(--white)',
      padding: '28px 0',
      borderBottom: '1px solid var(--sand)',
      borderTop: '1px solid var(--sand)',
    }}>
      {/* Header */}
      <div style={{
        padding: '0 5%', marginBottom: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 600, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--terra)',
        }}>Travel Moments</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 500 }}>
          Auto-scrolling ✦
        </span>
      </div>

      {/* Strip wrapper — overflow hidden only here for fade edges, NOT on card wrapper */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Fade edges */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(90deg, var(--white) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(270deg, var(--white) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Track — extra padding top/bottom so hover lift isn't clipped */}
        <div
          style={{
            display: 'flex',
            gap: '0.85rem',
            padding: '10px 5% 14px',  /* top padding = lift amount */
            width: 'max-content',
            willChange: 'transform',
          }}
          ref={trackRef}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
          onTouchStart={() => { pausedRef.current = true }}
          onTouchEnd={() => { setTimeout(() => { pausedRef.current = false }, 2000) }}
        >
          {allMoments.map((m, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: '110px',
                height: '110px',
                borderRadius: '18px',
                overflow: 'hidden',      /* clip image inside card */
                position: 'relative',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(26,18,8,0.1)',
                border: '2px solid transparent',
                transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(26,18,8,0.2)'
                e.currentTarget.style.borderColor = 'rgba(212,98,42,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,18,8,0.1)'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              <img
                src={m.src}
                alt={m.label}
                loading="lazy"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  transition: 'transform 0.4s',
                  pointerEvents: 'none',
                }}
              />
              {/* Gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(0deg, rgba(26,18,8,0.7) 0%, rgba(26,18,8,0.05) 55%)',
                pointerEvents: 'none',
              }} />
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
          ))}
        </div>
      </div>
    </div>
  )
}