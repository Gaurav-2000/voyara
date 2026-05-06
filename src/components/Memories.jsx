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
const MOUSE_INTERVAL = 100
const TOUCH_INTERVAL = 80

export default function Memories() {
  const containerRef = useRef(null)
  const layerRef = useRef(null)
  const currentIndex = useRef(0)
  const lastAddedTime = useRef(0)
  const zCounter = useRef(10)
  const prevPos = useRef({ x: -1, y: -1 })
  const pointer = useRef({ x: 0, y: 0 })
  const hintHiddenRef = useRef(false)
  const [hintHidden, setHintHidden] = useState(false)
  const rafRef = useRef(null)
  const intervalRef = useRef(MOUSE_INTERVAL)

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

  function spawnNow(pos) {
    lastAddedTime.current = 0
    addToTrail(pos)
  }

  function loop(time) {
    const p = pointer.current
    const prev = prevPos.current
    if (p.x !== prev.x || p.y !== prev.y) {
      prevPos.current = { ...p }
      if (time - lastAddedTime.current >= intervalRef.current) {
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

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const hideHint = () => {
      if (!hintHiddenRef.current) {
        hintHiddenRef.current = true
        setHintHidden(true)
      }
    }

    const getTouchPos = (e) => {
      const rect = el.getBoundingClientRect()
      const t = e.touches[0]
      return { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }

    const onTouchStart = (e) => {
      e.preventDefault()
      intervalRef.current = TOUCH_INTERVAL
      hideHint()
      const pos = getTouchPos(e)
      pointer.current = pos
      prevPos.current = { x: -1, y: -1 }
      spawnNow(pos)                        // spawn immediately on tap
    }

    const onTouchMove = (e) => {
      e.preventDefault()
      pointer.current = getTouchPos(e)
    }

    const onTouchEnd = () => {
      prevPos.current = { ...pointer.current }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  const handleMouseMove = (e) => {
    intervalRef.current = MOUSE_INTERVAL
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (!hintHiddenRef.current) { hintHiddenRef.current = true; setHintHidden(true) }
  }

  return (
    <section
      id="memories"
      style={{
        background: '#EDEAE4', position: 'relative', overflow: 'hidden',
        padding: 0, minHeight: '520px', display: 'flex', alignItems: 'center',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative', width: '100%', maxWidth: '1400px',
          margin: '0 auto', padding: '80px 6% 90px', minHeight: '520px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          touchAction: 'none',
          userSelect: 'none',
          cursor: 'crosshair',
        }}
        onMouseMove={handleMouseMove}
      >
        <div id="trail-layer" ref={layerRef} />

        {!hintHidden && (
          <div className="hint-pulse" style={{
            position: 'absolute', bottom: '1.5rem', left: '6%',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--muted)', zIndex: 10, pointerEvents: 'none',
          }}>
            <span style={{ color: 'var(--terra)', fontSize: '0.6rem' }}>✦</span>
            <span className="hint-desktop">Move your cursor</span>
            <span className="hint-mobile">Tap &amp; drag to explore</span>
          </div>
        )}

        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(4rem, 13vw, 12rem)', fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--dark)',
          opacity: 0.88, userSelect: 'none', position: 'relative', zIndex: 1,
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <span style={{
            display: 'block', fontSize: 'clamp(0.75rem, 2vw, 1.4rem)',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--terra)',
            marginBottom: '1rem', textAlign: 'center',
          }}>Your Journey</span>
          Memories
        </div>
      </div>

      <style>{`
        .hint-mobile  { display: none; }
        .hint-desktop { display: inline; }
        @media (hover: none) and (pointer: coarse) {
          .hint-mobile  { display: inline; }
          .hint-desktop { display: none; }
        }
      `}</style>
    </section>
  )
}