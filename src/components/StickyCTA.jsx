import React, { useEffect, useState, useRef } from 'react'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const dismissedRef = useRef(false)

  useEffect(() => {
    // Only show on mobile
    const isMobile = window.innerWidth < 900
    if (!isMobile) return

    // Check if already dismissed this session
    if (sessionStorage.getItem('ctaDismissed') === 'true') return

    // Small delay so it slides up nicely on load
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisible(false)
      else if (!dismissedRef.current && !sessionStorage.getItem('ctaDismissed')) setVisible(true)
    }, { threshold: 0.1 })
    obs.observe(footer)
    return () => obs.disconnect()
  }, [visible])

  const dismiss = (e) => {
    e.preventDefault()
    dismissedRef.current = true
    sessionStorage.setItem('ctaDismissed', 'true')
    setVisible(false)
    const el = document.getElementById('destinations')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900,
      background: 'white', padding: '0.9rem 5%',
      boxShadow: '0 -4px 30px rgba(26,18,8,0.12)',
      borderTop: '1px solid var(--sand)',
      transform: visible ? 'translateY(0)' : 'translateY(110%)',
      transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <a
        href="#destinations"
        onClick={dismiss}
        style={{
          background: 'var(--terra)', color: 'white', padding: '0.9rem 2rem',
          borderRadius: '50px', fontWeight: 600, textDecoration: 'none',
          display: 'block', textAlign: 'center', cursor: 'pointer',
        }}
      >Start Your Journey</a>
      <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginTop: '0.4rem' }}>
        ✓ Free cancellation &nbsp;·&nbsp; ✓ No hidden charges
      </div>
    </div>
  )
}