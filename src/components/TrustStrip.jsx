import React from 'react'

export default function TrustStrip() {
  return (
    <div id="trust" style={{ background: 'var(--white)', padding: '20px 5%', borderBottom: '1px solid var(--sand)' }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }} className="trust-strip-inner">

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="trust-item">
          <div style={{ color: '#F59E0B', fontSize: '0.9rem' }}>★★★★★</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>4.8 / 5</strong>
            from 12,000+ verified reviews
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', background: 'var(--sand)' }} className="trust-divider hidden sm:block" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="trust-item">
          <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>Based in New Delhi</strong>
            Trusted across India
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', background: 'var(--sand)' }} className="trust-divider hidden sm:block" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="trust-item">
          <span style={{ fontSize: '1.1rem' }}>🔒</span>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>Secure Payments</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
              {['VISA', 'MC', 'UPI', 'EMI'].map(p => (
                <span key={p} style={{
                  background: 'var(--sand)', borderRadius: '6px', padding: '4px 10px',
                  fontSize: '0.7rem', fontWeight: 700, color: 'var(--mid)', letterSpacing: '0.5px',
                }}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', background: 'var(--sand)' }} className="trust-divider hidden sm:block" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="trust-item">
          <span style={{ fontSize: '1.1rem' }}>✅</span>
          <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--mid)' }}>
            <strong style={{ color: 'var(--dark)', display: 'block', fontSize: '0.88rem' }}>Verified Reviews</strong>
            Only real travelers
          </div>
        </div>
      </div>

      <style>{`
        /* Mobile: 2-column grid, hide vertical dividers */
        @media (max-width: 640px) {
          .trust-strip-inner {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0 !important;
            justify-items: start !important;
            align-items: start !important;
          }

          .trust-divider {
            display: none !important;
          }

          .trust-item {
            padding: 0.75rem 0.5rem !important;
            width: 100% !important;
            border-bottom: 1px solid var(--sand) !important;
          }

          /* Top-left & top-right: border-right between cols */
          .trust-item:nth-child(1),
          .trust-item:nth-child(3) {
            border-right: 1px solid var(--sand) !important;
          }

          /* Bottom row: no bottom border */
          .trust-item:nth-child(3),
          .trust-item:nth-child(4) {
            border-bottom: none !important;
          }

          /* Payment badges: slightly smaller to fit */
          .trust-item span[style*="VISA"],
          .trust-item span {
            padding: 3px 7px !important;
            font-size: 0.65rem !important;
          }
        }

        @media (max-width: 400px) {
          .trust-strip-inner {
            grid-template-columns: 1fr 1fr !important;
          }
          .trust-item {
            gap: 0.4rem !important;
          }
        }
      `}</style>
    </div>
  )
}