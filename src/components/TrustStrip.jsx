import React from 'react'

export default function TrustStrip() {
  return (
    <div id="trust" style={{ background: 'var(--white)', padding: '20px 5%', borderBottom: '1px solid var(--sand)' }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ color: '#F59E0B', fontSize: '0.9rem' }}>★★★★★</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>4.8 / 5</strong>
            from 12,000+ verified reviews
          </div>
        </div>
        <div style={{ width: '1px', height: '36px', background: 'var(--sand)' }} className="hidden sm:block" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>Based in New Delhi</strong>
            Trusted across India
          </div>
        </div>
        <div style={{ width: '1px', height: '36px', background: 'var(--sand)' }} className="hidden sm:block" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🔒</span>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>Secure Payments</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
              {['VISA','MC','UPI','EMI'].map(p => (
                <span key={p} style={{ background: 'var(--sand)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--mid)', letterSpacing: '0.5px' }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ width: '1px', height: '36px', background: 'var(--sand)' }} className="hidden sm:block" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.1rem' }}>✅</span>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>Verified Reviews</strong>
            Only real travelers
          </div>
        </div>
      </div>
    </div>
  )
}
