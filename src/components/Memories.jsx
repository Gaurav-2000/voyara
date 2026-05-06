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
const INTERVAL = 90

export default function Memories() {
  const containerRef = useRef(null)
  const layerRef = useRef(null)
  const currentIndex = useRef(0)
  const lastAddedTime = useRef(0)
  const zCounter = useRef(10)
  const prevPos = useRef({ x: -1, y: -1 })
  const pointer = useRef({ x: 0, y: 0 })
  const hintHiddenRef = useRef(false)
  const rafRef = useRef(null)
  const [hintHidden, setHintHidden] = useState(false)

  /* ── build DOM child ── */
  function buildChild(def, wrapper) {
    wrapper.className = 'trail-item'
    if (def.type === 'card') {
      const card = document.createElement('div')
      card.className = 'trail-card'
      card.innerHTML = `
        <img src="${def.img}" alt="${def.name}" loading="lazy"/>
        <div class="trail-card-body">
          <div class="trail-card-name">${def.name}</div>
          <div class="trail-card-price">${def.price}</div>
        </div>`
      wrapper.appendChild(card)
    } else {
      const pill = document.createElement('div')
      pill.className = 'trail-pill'
      pill.innerHTML = `<span class="trail-pill-icon">${def.icon}</span><span class="trail-pill-text">${def.text}</span>`
      wrapper.appendChild(pill)
    }
  }

  /* ── spawn one item at pos ── */
  function addToTrail(pos) {
    const layer = layerRef.current
    if (!layer) return
    const def = CHILDREN[currentIndex.current]
    currentIndex.current = (currentIndex.current + 1) % CHILDREN.length
    const rotation = (Math.random() - 0.5) * ROTATION_RANGE * 2
    const wrapper = document.createElement('div')
    wrapper.style.cssText = `
      position:absolute;
      left:${pos.x}px;top:${pos.y}px;
      z-index:${++zCounter.current};
      transform:translate(-50%,-50%) rotate(${rotation}deg) scale(0);
      pointer-events:none;
      transform-origin:center center;
      will-change:transform;`
    buildChild(def, wrapper)
    layer.appendChild(wrapper)

    const a1 = wrapper.animate(
      [{ transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(0)` },
      { transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(1.15)` }],
      { duration: 100, easing: 'cubic-bezier(0,0.55,0.45,1)', fill: 'forwards' }
    )
    a1.onfinish = () => {
      const a2 = wrapper.animate(
        [{ transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(1.15)` },
        { transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(0)` }],
        { duration: 500, easing: 'cubic-bezier(0.55,0,1,0.45)', fill: 'forwards' }
      )
      a2.onfinish = () => wrapper.remove()
    }
  }

  /* ── RAF loop — throttled spawning ── */
  function loop(time) {
    const p = pointer.current
    const prev = prevPos.current
    if (p.x !== prev.x || p.y !== prev.y) {
      prevPos.current = { ...p }
      if (time - lastAddedTime.current >= INTERVAL) {
        lastAddedTime.current = time
        const el = containerRef.current
        if (el) {
          const r = el.getBoundingClientRect()
          if (p.x >= 0 && p.x <= r.width && p.y >= 0 && p.y <= r.height) {
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

  /* ── Unified Pointer Events (mouse + touch + stylus) ── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const hideHint = () => {
      if (!hintHiddenRef.current) {
        hintHiddenRef.current = true
        setHintHidden(true)
      }
    }

    const getPos = (e) => {
      const r = el.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    /* tap / click → spawn immediately + start tracking */
    const onPointerDown = (e) => {
      hideHint()
      // capture so pointermove keeps firing even if finger drifts outside
      try { el.setPointerCapture(e.pointerId) } catch (_) { }
      const pos = getPos(e)
      pointer.current = pos
      prevPos.current = { x: -1, y: -1 } // force loop to see new pos
      lastAddedTime.current = 0               // bypass throttle on first tap
      addToTrail(pos)
    }

    /* move (hover on desktop, drag on mobile) */
    const onPointerMove = (e) => {
      hideHint()
      pointer.current = getPos(e)
    }

    /* finger/click lift → freeze so loop stops */
    const onPointerUp = () => {
      prevPos.current = { ...pointer.current }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  return (
    <section
      id="memories"
      style={{
        background: '#EDEAE4', position: 'relative',
        overflow: 'hidden', padding: 0,
        minHeight: '520px', display: 'flex', alignItems: 'center',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative', width: '100%', maxWidth: '1400px',
          margin: '0 auto', padding: '80px 6% 90px', minHeight: '520px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          /* touch-action:none tells browser "don't scroll, let JS handle it"
             — works without any preventDefault() at all                     */
          touchAction: 'none',
          userSelect: 'none',
          cursor: 'crosshair',
        }}
      >
        <div ref={layerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

        {/* Hint */}
        {!hintHidden && (
          <div className="hint-pulse" style={{
            position: 'absolute', bottom: '1.5rem', left: '6%',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--muted)',
            zIndex: 10, pointerEvents: 'none',
          }}>
            <span style={{ color: 'var(--terra)', fontSize: '0.6rem' }}>✦</span>
            <span className="hint-desktop">Move your cursor</span>
            <span className="hint-mobile">Tap &amp; drag to explore</span>
          </div>
        )}

        {/* Title */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(4rem,13vw,12rem)', fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--dark)',
          opacity: 0.88, userSelect: 'none', position: 'relative', zIndex: 1,
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <span style={{
            display: 'block', fontSize: 'clamp(0.75rem,2vw,1.4rem)',
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