import React, { useEffect, useRef, useState } from 'react'

const CHILDREN = [
  { type: 'card', img: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&q=70', name: 'Bali', price: '₹68,000' },
  { type: 'pill', icon: '✈️', text: 'Best Flights' },
  { type: 'card', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=70', name: 'Dubai', price: '₹85,000' },
  { type: 'pill', icon: '📍', text: 'Top Picks' },
  { type: 'card', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&q=70', name: 'Goa', price: '₹18,999' },
  { type: 'pill', icon: '🌤', text: 'Weather Ready' },
  { type: 'pill', icon: '🎉', text: 'Local Events' },
]

const ROTATION_RANGE = 15
const INTERVAL = 100

export default function Memories() {
  const containerRef = useRef(null)
  const layerRef = useRef(null)
  const currentIndex = useRef(0)
  const lastAddedTime = useRef(0)
  const zCounter = useRef(10)
  const prevPos = useRef({ x: -1, y: -1 })
  const pointer = useRef({ x: 0, y: 0 })
  const [hintHidden, setHintHidden] = useState(false)
  const rafRef = useRef(null)

  function buildChild(def, wrapper) {
    if (def.type === 'card') {
      wrapper.className = 'trail-item'
      const card = document.createElement('div')
      card.className = 'trail-card'
      card.innerHTML = `<img src="${def.img}" alt="${def.name}" loading="lazy"/><div class="trail-card-body"><div class="trail-card-name">${def.name}</div><div class="trail-card-price">${def.price}</div></div>`
      wrapper.appendChild(card)
    } else {
      wrapper.className = 'trail-item'
      const pill = document.createElement('div')
      pill.className = 'trail-pill'
      pill.innerHTML = `<span class="trail-pill-icon">${def.icon}</span><span class="trail-pill-text">${def.text}</span>`
      wrapper.appendChild(pill)
    }
  }

  function addToTrail(pos) {
    const layer = layerRef.current
    if (!layer) return
    const def = CHILDREN[currentIndex.current]
    currentIndex.current = (currentIndex.current + 1) % CHILDREN.length
    const rotation = (Math.random() - 0.5) * ROTATION_RANGE * 2
    const wrapper = document.createElement('div')
    wrapper.style.cssText = `position:absolute;left:${pos.x}px;top:${pos.y}px;z-index:${++zCounter.current};transform:translate(-50%,-50%) rotate(${rotation}deg) scale(0);pointer-events:none;transform-origin:center center;will-change:transform;`
    buildChild(def, wrapper)
    layer.appendChild(wrapper)

    const a1 = wrapper.animate(
      [{ transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(0)` },
      { transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(1.15)` }],
      { duration: 100, easing: 'cubic-bezier(0, 0.55, 0.45, 1)', fill: 'forwards' }
    )
    a1.onfinish = () => {
      const a2 = wrapper.animate(
        [{ transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(1.15)` },
        { transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(0)` }],
        { duration: 500, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'forwards' }
      )
      a2.onfinish = () => wrapper.remove()
    }
  }

  function loop(time) {
    const p = pointer.current
    const prev = prevPos.current
    if (p.x !== prev.x || p.y !== prev.y) {
      prevPos.current = { ...p }
      if (time - lastAddedTime.current >= INTERVAL) {
        lastAddedTime.current = time
        const container = containerRef.current
        if (container) {
          const rect = container.getBoundingClientRect()
          if (p.x >= 0 && p.x <= rect.width && p.y >= 0 && p.y <= rect.height) {
            addToTrail({ x: p.x, y: p.y })
          }
        }
      }
    }
    rafRef.current = requestAnimationFrame(loop)
  }

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (!hintHidden) setHintHidden(true)
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const t = e.touches[0]
    pointer.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
  }

  return (
    <section id="memories" style={{ background: '#EDEAE4', position: 'relative', overflow: 'hidden', padding: 0, minHeight: '520px', display: 'flex', alignItems: 'center', touchAction: 'none' }}>
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '80px 6% 90px', minHeight: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => { e.preventDefault(); if (!hintHidden) setHintHidden(true) }}
        onTouchMove={handleTouchMove}
      >
        <div id="trail-layer" ref={layerRef} />

        {/* Bottom hint (legacy, hidden after first move) */}
        {!hintHidden && (
          <div style={{
            position: 'absolute', bottom: '1.5rem', left: '6%',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--muted)', zIndex: 10, pointerEvents: 'none',
          }}>
            <span style={{ color: 'var(--terra)', fontSize: '0.6rem' }}>✦</span>
            Move your cursor
          </div>
        )}

        {/* Title block */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(4rem, 13vw, 12rem)', fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--dark)',
          opacity: 0.88, userSelect: 'none', position: 'relative', zIndex: 1,
          textAlign: 'center', pointerEvents: 'none',
        }}>
          {/* Eyebrow */}
          <span style={{
            display: 'block', fontSize: 'clamp(0.75rem, 2vw, 1.4rem)',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--terra)',
            marginBottom: '1rem', textAlign: 'center',
          }}>Your Journey</span>

          Memories

          {/* ── Interactive instruction badge ── */}
          <div style={{
            marginTop: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(196,97,42,0.3)',
              borderRadius: '60px',
              padding: '0.65rem 1.4rem',
              boxShadow: '0 4px 24px rgba(26,18,8,0.08)',
              animation: 'float-badge 3s ease-in-out infinite',
            }}>
              {/* Hand icon */}
              <span style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                display: 'inline-block',
                animation: 'wiggle 1.6s ease-in-out infinite',
                transformOrigin: 'bottom center',
              }}>🖐️</span>

              {/* Text */}
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(0.4rem, 1vw, 0.7rem)',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--terra, #c4612a)',
              }}>
                Hover here &nbsp;·&nbsp; Swipe on mobile
              </span>

              {/* Live dot */}
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--terra, #c4612a)',
                display: 'inline-block',
                flexShrink: 0,
                animation: 'blink 1.3s ease-in-out infinite',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}