import React from 'react'

export default function Hero({ showToast }) {
  return (
    <section id="home" style={{
      minHeight: '100vh', paddingTop: '64px',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Curved background shape - RIGHT SIDE */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '55%', height: '120%',
        background: 'linear-gradient(135deg,#F0E9DC 0%,#E8D5BB 100%)',
        borderRadius: '0 0 0 60%', zIndex: 0,
      }} />

      {/* Dots pattern */}
      <div style={{
        position: 'absolute', top: '15%', right: '18%',
        width: '200px', height: '200px',
        backgroundImage: 'radial-gradient(var(--terra) 1.5px,transparent 1.5px)',
        backgroundSize: '18px 18px', opacity: 0.2, zIndex: 0,
      }} className="hidden md:block" />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: '3rem 5% 4rem', maxWidth: '1200px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', gap: '4rem',
      }}
        className="hero-content-grid"
      >
        {/* Text */}
        <div className="hero-text-block" style={{ order: 0 }}>
          <span style={{
            display: 'inline-block', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1.2rem',
          }}>✈ Trusted by 50,000+ Indian Travelers</span>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 900,
            lineHeight: 1.08, color: 'var(--dark)', marginBottom: '1.5rem',
          }}>
            Travel, <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>Enjoy</em><br />
            Live a New &amp;<br />Full Life
          </h1>

          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '440px', marginBottom: '2rem' }}>
            Plan your dream trip from India — honeymoons, family vacations, solo adventures. Everything managed for you, from flights to experiences.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}
            className="hero-btn-group">
            <a href="#destinations" style={{
              background: 'var(--terra)', color: 'white', padding: '0.9rem 2rem', borderRadius: '50px',
              fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.target.style.background = 'var(--terra-light)'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 25px rgba(212,98,42,0.35)' }}
              onMouseLeave={e => { e.target.style.background = 'var(--terra)'; e.target.style.transform = ''; e.target.style.boxShadow = '' }}
            >Start Your Journey</a>
            <a href="#book" style={{
              background: 'transparent', color: 'var(--dark)', padding: '0.9rem 2rem', borderRadius: '50px',
              fontSize: '1rem', fontWeight: 600, textDecoration: 'none', border: '2px solid var(--dark)',
              display: 'inline-block', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--terra)'; e.target.style.color = 'var(--terra)'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'var(--dark)'; e.target.style.color = 'var(--dark)'; e.target.style.transform = '' }}
            >How It Works</a>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}
            className="hero-trust-badges">
            {['Free cancellation', 'No hidden charges', '24/7 support'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="var(--terra)"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: '2.5rem', flexWrap: 'wrap' }}
            className="hero-stats-row">
            {[['800', '+', 'Destinations'], ['50K', '+', 'Happy Travelers'], ['4.8', '★', 'Avg Rating']].map(([n, s, l]) => (
              <div key={l} style={{ paddingRight: '1.5rem', marginRight: '1.5rem', borderRight: '1px solid rgba(26,18,8,0.12)' }}
                className="hero-stat-item last:border-r-0 last:pr-0 last:mr-0">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1 }}>
                  {n}<span style={{ color: 'var(--terra)' }}>{s}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '5px', fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image - NO card block, just image + badges */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="hero-image-block">
          <img
            src="/images/hero.png"
            alt="Traveler girl with backpack and luggage"
            className="float-anim hero-main-img"
            style={{
              width: '100%', maxWidth: '420px', display: 'block',
              objectFit: 'contain',
            }}
          />
          {/* Badge 1 */}
          <div className="float-anim-2 hero-badge-1" style={{
            position: 'absolute', bottom: '2rem', left: '-1.5rem',
            background: 'white', borderRadius: '16px', padding: '1rem 1.25rem',
            boxShadow: '0 15px 40px rgba(26,18,8,0.15)',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>🏖</span>
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--dark)' }}>Bali Honeymoon</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Booked 2 hrs ago</span>
            </div>
          </div>
          {/* Badge 2 */}
          <div className="float-anim-3 hero-badge-2" style={{
            position: 'absolute', top: '2rem', right: '-1rem',
            background: 'var(--terra)', borderRadius: '16px', padding: '0.8rem 1.1rem',
            boxShadow: '0 12px 30px rgba(212,98,42,0.4)', textAlign: 'center', color: 'white',
          }}>
            <strong style={{ display: 'block', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>4.9</strong>
            <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>★ Rating</span>
          </div>
        </div>
      </div>

      {/* Mobile layout overrides */}
      <style>{`
        @media (max-width: 900px) {
          .hero-content-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 2rem 5% 4rem !important;
            gap: 1.5rem !important;
          }
          .hero-image-block { order: -1 !important; }
          .hero-main-img { max-width: 220px !important; }
          .hero-text-block p,
          .hero-trust-badges,
          .hero-stats-row { margin-left: auto !important; margin-right: auto !important; }
          .hero-badge-1, .hero-badge-2 { display: none !important; }

          /* Center buttons */
          .hero-btn-group {
            justify-content: center !important;
          }

          /* Center trust badges */
          .hero-trust-badges {
            justify-content: center !important;
          }

          /* Stats: keep all 3 on one line */
          .hero-stats-row {
            flex-wrap: nowrap !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .hero-stat-item {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            padding-right: 1rem !important;
            margin-right: 1rem !important;
          }
        }

        @media (max-width: 640px) {
          .hero-main-img { max-width: 180px !important; }

          /* Buttons: stack vertically, full width */
          .hero-btn-group {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
            max-width: 320px !important;
          }
          .hero-btn-group a {
            text-align: center !important;
          }

          /* Stats: shrink font so all 3 fit in one row */
          .hero-stat-item > div:first-child {
            font-size: 1.35rem !important;
          }
          .hero-stat-item > div:last-child {
            font-size: 0.68rem !important;
          }
          .hero-stat-item {
            padding-right: 0.75rem !important;
            margin-right: 0.75rem !important;
          }
        }

        @media (max-width: 400px) {
          .hero-main-img { max-width: 150px !important; }

          .hero-stat-item > div:first-child {
            font-size: 1.1rem !important;
          }
          .hero-stat-item > div:last-child {
            font-size: 0.62rem !important;
          }
          .hero-stat-item {
            padding-right: 0.5rem !important;
            margin-right: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}