import React, { useEffect, useRef, useState } from 'react'

const destinations = [
  {
    id: 'goa',
    category: 'india',
    badge: { label: '🔥 Trending', type: 'trending' },
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    name: 'Goa, India',
    price: '₹18,999',
    per: 'per person',
    trip: '📍 4 nights · Weekend trip',
    includes: 'Includes flight + hotel + transfers',
    urgency: '14 people booked this today',
    toast: 'Opening Goa package...',
  },
  {
    id: 'manali',
    category: 'india',
    badge: { label: '📅 Dec–Feb', type: 'besttime' },
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    name: 'Manali, India',
    price: '₹22,500',
    per: 'per person',
    trip: '📍 5 nights · Snow trip',
    includes: 'Includes hotel + cab + activities',
    urgency: 'Only 3 seats left',
    toast: 'Opening Manali package...',
  },
  {
    id: 'bali',
    category: 'international honeymoon',
    badge: { label: '💑 Honeymoon Pick', type: 'trending' },
    img: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&q=80',
    name: 'Bali, Indonesia',
    price: '₹68,000',
    per: 'per couple',
    trip: '📍 6 nights · Honeymoon',
    includes: 'Includes flight + resort + candle dinner',
    urgency: 'Popular this week',
    toast: 'Opening Bali package...',
  },
  {
    id: 'dubai',
    category: 'international',
    badge: { label: '⏳ Limited seats', type: 'limited' },
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    name: 'Dubai, UAE',
    price: '₹85,000',
    per: 'per person',
    trip: '📍 5 nights · Luxury',
    includes: 'Includes flight + 5★ hotel + desert safari',
    urgency: '8 people booked this today',
    toast: 'Opening Dubai package...',
  },
  {
    id: 'rome',
    category: 'international',
    badge: { label: '📅 Apr–Jun', type: 'besttime' },
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
    name: 'Rome, Italy',
    price: '₹4,30,000',
    per: 'per person',
    trip: '📍 10 nights · Heritage',
    includes: 'Includes flight + hotel + guided tours',
    urgency: null,
    toast: 'Opening Rome package...',
  },
  {
    id: 'london',
    category: 'international',
    badge: { label: '🌍 Popular', type: '' },
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    name: 'London, UK',
    price: '₹3,50,000',
    per: 'per person',
    trip: '📍 12 nights · City break',
    includes: 'Includes flight + hotel + Oyster card',
    urgency: null,
    toast: 'Opening London package...',
  },
]

const badgeColors = {
  trending: 'rgba(212,98,42,0.9)',
  limited: 'rgba(180,30,30,0.85)',
  besttime: 'rgba(16,100,60,0.85)',
  '': 'rgba(26,18,8,0.75)',
}

export default function Destinations({ showToast }) {
  const [filter, setFilter] = useState('all')
  const [wishlist, setWishlist] = useState({})
  const ref = useRef(null)

  // Re-show cards immediately when filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = ref.current?.querySelectorAll('.dest-card-item')
      if (!els) return
      els.forEach(el => el.classList.add('visible'))
    }, 30)
    return () => clearTimeout(timer)
  }, [filter])

  // Initial scroll-based reveal for non-card elements
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const visible = destinations.filter(d => {
    if (filter === 'all') return true
    const cats = d.category.split(' ')
    return cats.includes(filter)
  })

  return (
    <section id="destinations" ref={ref} style={{ background: 'var(--cream)', padding: '90px 5%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', gap: '1rem', flexWrap: 'wrap' }}
        className="fade-up">
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.75rem' }}>Top Selling</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--dark)' }}>Top Destinations</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {['all', 'india', 'international', 'honeymoon'].map(f => (
              <button key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.45rem 1.1rem', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 500,
                  border: '1.5px solid', cursor: 'pointer', transition: 'all 0.2s',
                  WebkitTapHighlightColor: 'transparent',
                  background: filter === f ? 'var(--terra)' : 'transparent',
                  color: filter === f ? 'white' : 'var(--mid)',
                  borderColor: filter === f ? 'var(--terra)' : 'var(--sand)',
                }}
              >{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
        </div>
        <a href="#subscribe"
          style={{ background: 'var(--terra)', color: 'white', padding: '0.9rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}
        >View All</a>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        {visible.map((d, i) => (
          <a key={d.id}
            href="#"
            className="dest-card-item fade-up"
            onClick={(e) => { e.preventDefault(); showToast(d.toast) }}
            style={{
              borderRadius: '24px', overflow: 'hidden', background: 'var(--white)',
              boxShadow: '0 20px 60px rgba(26,18,8,0.10)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'block',
              position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 30px 80px rgba(26,18,8,0.18)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 20px 60px rgba(26,18,8,0.10)' }}
          >
            {/* Image wrapper with gradient overlay */}
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                onMouseEnter={e => e.target.style.transform='scale(1.05)'}
                onMouseLeave={e => e.target.style.transform=''}
              />
              {/* Gradient overlay for depth */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(26,18,8,0.5) 100%)',
                zIndex: 1,
              }} />
              {/* Badge */}
              <span style={{
                position: 'absolute', top: '12px', left: '12px', zIndex: 2,
                background: badgeColors[d.badge.type],
                backdropFilter: 'blur(8px)',
                color: 'white', borderRadius: '50px', padding: '0.3rem 0.8rem',
                fontSize: '0.72rem', fontWeight: 600,
              }}>{d.badge.label}</span>
              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.preventDefault(); e.stopPropagation()
                  const next = !wishlist[d.id]
                  setWishlist(w => ({ ...w, [d.id]: next }))
                  showToast(next ? '❤️ Added to wishlist!' : 'Removed from wishlist')
                }}
                style={{
                  position: 'absolute', top: '12px', right: '12px', zIndex: 2,
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                  color: wishlist[d.id] ? 'var(--terra)' : 'inherit',
                }}
              >{wishlist[d.id] ? '♥' : '♡'}</button>
            </div>

            {/* Info */}
            <div style={{ padding: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--dark)' }}>{d.name}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--terra)', display: 'block' }}>{d.price}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 500 }}>{d.per}</span>
                </div>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>{d.trip}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', background: 'var(--sand)', borderRadius: '6px', padding: '3px 8px', display: 'inline-block' }}>{d.includes}</div>
              {d.urgency && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 600, color: '#B91C1C', marginTop: '0.6rem' }}>
                  <span style={{ width: '6px', height: '6px', background: '#EF4444', borderRadius: '50%', display: 'inline-block' }} className="pulse-dot" />
                  {d.urgency}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}