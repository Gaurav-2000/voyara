import React, { useState } from 'react'

export default function Subscribe({ showToast }) {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('🎉 Subscribed! Welcome to Voyara.')
  }

  return (
    <section id="subscribe" style={{ background: 'linear-gradient(135deg, var(--terra) 0%, #B84E20 100%)', padding: '80px 5%' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem' }}>Stay Updated</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
          Get the Best Deals<br />Before Anyone Else
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          Join 50,000+ Indian travelers getting exclusive deals, flash sales, and travel tips every week.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              autoComplete="email"
              style={{
                flex: 1, padding: '0.95rem 1.25rem', border: 'none',
                borderRadius: '50px 0 0 50px', fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem', outline: 'none', background: 'white',
                color: 'var(--dark)', minWidth: 0,
              }}
            />
            <button type="submit" style={{
              padding: '0.95rem 1.6rem', background: 'var(--dark)', color: 'white',
              border: 'none', borderRadius: '0 50px 50px 0',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 600,
              cursor: 'pointer', transition: 'background 0.3s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.target.style.background='#2D2010'}
              onMouseLeave={e => e.target.style.background='var(--dark)'}
            >Subscribe Free</button>
          </form>
        ) : (
          <div style={{ color: 'white', fontWeight: 600, fontSize: '1rem', margin: '0 auto' }}>
            🎉 You're in! Welcome to the Voyara family.
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          {['✓ No spam, ever', '✓ Unsubscribe anytime', '✓ Exclusive member deals'].map(t => (
            <span key={t} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
