import React, { useState, useEffect } from 'react'

const STEPS = ['Destination', 'Dates', 'Travelers', 'Confirm']

const destinations = [
    { id: 1, name: 'Bali, Indonesia', emoji: '🏖️', tag: 'Honeymoon' },
    { id: 2, name: 'Paris, France', emoji: '🗼', tag: 'Romantic' },
    { id: 3, name: 'Dubai, UAE', emoji: '🏙️', tag: 'Luxury' },
    { id: 4, name: 'Thailand', emoji: '🛕', tag: 'Adventure' },
    { id: 5, name: 'Maldives', emoji: '🌊', tag: 'Beach' },
    { id: 6, name: 'Switzerland', emoji: '🏔️', tag: 'Nature' },
    { id: 7, name: 'Singapore', emoji: '🌆', tag: 'City' },
    { id: 8, name: 'Japan', emoji: '⛩️', tag: 'Culture' },
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate() }
function getFirstDay(year, month) { return new Date(year, month, 1).getDay() }

export default function BookingModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])
    const today = new Date()
    const [step, setStep] = useState(0)
    const [destination, setDestination] = useState(null)
    const [calYear, setCalYear] = useState(today.getFullYear())
    const [calMonth, setCalMonth] = useState(today.getMonth())
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [hoveredDate, setHoveredDate] = useState(null)
    const [tripType, setTripType] = useState('honeymoon')
    const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 })
    const [submitted, setSubmitted] = useState(false)

    if (!isOpen) return null

    const totalDays = startDate && endDate
        ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : null

    const handleDateClick = (date) => {
        if (!startDate || (startDate && endDate)) { setStartDate(date); setEndDate(null) }
        else { date < startDate ? (setStartDate(date), setEndDate(null)) : setEndDate(date) }
    }

    const isInRange = (date) => {
        if (!startDate) return false
        const end = endDate || hoveredDate
        if (!end) return false
        return date > startDate && date < end
    }

    const isStart = (date) => startDate && date.toDateString() === startDate.toDateString()
    const isEnd = (date) => endDate && date.toDateString() === endDate.toDateString()
    const isPast = (date) => {
        const t = new Date(); t.setHours(0, 0, 0, 0)
        return date < t
    }

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(calYear, calMonth)
        const firstDay = getFirstDay(calYear, calMonth)
        const cells = []
        for (let i = 0; i < firstDay; i++) cells.push(null)
        for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(calYear, calMonth, d))
        return cells
    }

    const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) } else setCalMonth(m => m - 1) }
    const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) } else setCalMonth(m => m + 1) }

    const canNext = () => {
        if (step === 0) return !!destination
        if (step === 1) return !!(startDate && endDate)
        if (step === 2) return travelers.adults >= 1
        return true
    }

    const handleClose = () => {
        setStep(0); setDestination(null); setStartDate(null); setEndDate(null)
        setTravelers({ adults: 2, children: 0, infants: 0 }); setSubmitted(false)
        onClose()
    }

    return (
        <>
            <style>{`
        .bm-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(26,18,8,0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: flex-end; justify-content: center;
          animation: bmFadeIn 0.25s ease;
        }
        @media (min-width: 600px) {
          .bm-overlay { align-items: center; padding: 1rem; }
        }

        @keyframes bmFadeIn { from { opacity: 0 } to { opacity: 1 } }

        .bm-modal {
          background: #fff;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-height: 95vh;
          display: flex; flex-direction: column;
          box-shadow: 0 -20px 60px rgba(26,18,8,0.2);
          animation: bmSlideUp 0.38s cubic-bezier(0.23,1,0.32,1);
          position: relative; overflow: hidden;
        }
        @media (min-width: 600px) {
          .bm-modal {
            border-radius: 28px;
            max-width: 560px;
            max-height: 92vh;
            box-shadow: 0 40px 120px rgba(26,18,8,0.25);
          }
        }
        @keyframes bmSlideUp {
          from { opacity:0; transform: translateY(60px) }
          to   { opacity:1; transform: translateY(0) }
        }

        /* Drag handle for mobile */
        .bm-drag-handle {
          width: 40px; height: 4px; border-radius: 2px;
          background: #ddd; margin: 10px auto 0; flex-shrink: 0;
        }
        @media (min-width: 600px) { .bm-drag-handle { display: none; } }

        /* Header */
        .bm-header {
          padding: 0.85rem 1.25rem 0.75rem;
          border-bottom: 1px solid #f0ebe3;
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
        }
        @media (min-width: 600px) {
          .bm-header { padding: 1.25rem 1.75rem 1rem; }
        }
        .bm-close {
          width: 38px; height: 38px; border-radius: 50%;
          border: none; background: #f5f0e8; cursor: pointer;
          font-size: 1rem; color: #666;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
          -webkit-tap-highlight-color: transparent;
          flex-shrink: 0;
        }
        .bm-close:hover { background: var(--terra); color: white; }

        /* Stepper */
        .bm-stepper {
          display: flex; align-items: center;
          padding: 0.85rem 1.25rem;
          gap: 0; flex-shrink: 0;
        }
        @media (min-width: 600px) { .bm-stepper { padding: 1rem 1.75rem; } }
        .bm-step { display: flex; align-items: center; gap: 0.35rem; flex: 1; min-width: 0; }
        .bm-step-circle {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; font-weight: 700; flex-shrink: 0;
          transition: all 0.3s;
        }
        @media (min-width: 600px) { .bm-step-circle { width: 30px; height: 30px; font-size: 0.75rem; } }
        .bm-step-circle.done   { background: var(--terra); color: white; }
        .bm-step-circle.active { background: var(--terra); color: white; box-shadow: 0 0 0 4px rgba(212,98,42,0.2); }
        .bm-step-circle.pending{ background: #f0ebe3; color: #999; }
        .bm-step-label {
          font-size: 0.62rem; font-weight: 600; color: #999;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media (min-width: 480px) { .bm-step-label { font-size: 0.7rem; } }
        .bm-step-label.active { color: var(--terra); }
        .bm-step-label.done   { color: #444; }
        .bm-step-line { flex: 1; height: 2px; background: #f0ebe3; margin: 0 0.2rem; transition: background 0.3s; min-width: 8px; }
        .bm-step-line.done { background: var(--terra); }

        /* Scrollable body */
        .bm-body {
          flex: 1; overflow-y: auto;
          padding: 0.5rem 1.25rem 1rem;
          -webkit-overflow-scrolling: touch;
        }
        @media (min-width: 600px) { .bm-body { padding: 0.5rem 1.75rem 1rem; } }

        .bm-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 700; color: #1a1208; margin-bottom: 0.2rem;
        }
        @media (min-width: 600px) { .bm-section-title { font-size: 1.3rem; } }
        .bm-section-sub { font-size: 0.78rem; color: #999; margin-bottom: 1rem; }

        /* Trip type pills */
        .trip-types { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .trip-type-btn {
          padding: 0.38rem 0.8rem; border-radius: 50px;
          border: 1.5px solid #e8e0d5; background: white;
          font-size: 0.75rem; font-weight: 500; cursor: pointer;
          transition: all 0.2s; color: #666;
          -webkit-tap-highlight-color: transparent;
        }
        .trip-type-btn.active { border-color: var(--terra); background: var(--terra); color: white; }

        /* Destination grid — 2 cols always, but cards slightly smaller on mobile */
        .dest-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 0.5rem; }
        .dest-card {
          border: 2px solid #f0ebe3; border-radius: 14px;
          padding: 0.7rem 0.85rem;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 0.6rem;
          background: white; -webkit-tap-highlight-color: transparent;
        }
        .dest-card:active, .dest-card:hover { border-color: var(--terra); background: rgba(212,98,42,0.04); }
        .dest-card.selected { border-color: var(--terra); background: rgba(212,98,42,0.07); }
        .dest-emoji { font-size: 1.35rem; flex-shrink: 0; }
        .dest-name { font-size: 0.78rem; font-weight: 600; color: #1a1208; line-height: 1.2; }
        .dest-tag  { font-size: 0.65rem; color: var(--terra); font-weight: 500; }

        /* Calendar */
        .cal-nav {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 0.85rem;
        }
        .cal-nav-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid #e8e0d5; background: white;
          cursor: pointer; font-size: 1.1rem; color: #444;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; -webkit-tap-highlight-color: transparent;
        }
        .cal-nav-btn:hover { border-color: var(--terra); color: var(--terra); }
        .cal-month-label { font-weight: 700; font-size: 0.95rem; color: #1a1208; }

        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; }
        .cal-day-header {
          text-align: center; font-size: 0.62rem; font-weight: 600;
          color: #aaa; padding: 0.3rem 0;
        }
        .cal-day {
          aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; border-radius: 50%;
          cursor: pointer; transition: all 0.15s;
          font-weight: 500; user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        @media (min-width: 400px) { .cal-day { font-size: 0.82rem; } }
        .cal-day:active:not(.past):not(.empty) { background: rgba(212,98,42,0.2); }
        .cal-day:hover:not(.past):not(.empty) { background: rgba(212,98,42,0.15); color: var(--terra); }
        .cal-day.past  { color: #ccc; cursor: not-allowed; }
        .cal-day.empty { cursor: default; }
        .cal-day.start, .cal-day.end { background: var(--terra) !important; color: white !important; border-radius: 50%; }
        .cal-day.in-range { background: rgba(212,98,42,0.12); border-radius: 0; color: var(--terra); }

        .date-summary { display: flex; gap: 0.6rem; margin-top: 0.85rem; }
        .date-box {
          flex: 1; background: #faf7f2; border-radius: 12px;
          padding: 0.75rem 0.85rem; border: 1.5px solid #f0ebe3;
        }
        .date-box-label { font-size: 0.62rem; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .date-box-val   { font-size: 0.82rem; font-weight: 700; color: #1a1208; margin-top: 0.2rem; }
        .date-box-nights{ font-size: 0.68rem; color: var(--terra); font-weight: 500; }

        /* Travelers */
        .traveler-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 0; border-bottom: 1px solid #f0ebe3;
        }
        .traveler-row:last-child { border-bottom: none; }
        .traveler-label { font-weight: 600; font-size: 0.9rem; color: #1a1208; }
        .traveler-sub   { font-size: 0.7rem; color: #aaa; margin-top: 1px; }
        .traveler-counter { display: flex; align-items: center; gap: 0.6rem; }
        .counter-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid #e8e0d5; background: white;
          font-size: 1.1rem; cursor: pointer; color: #444;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; -webkit-tap-highlight-color: transparent;
        }
        .counter-btn:hover:not(:disabled) { border-color: var(--terra); color: var(--terra); }
        .counter-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .counter-val { font-size: 1rem; font-weight: 700; color: #1a1208; min-width: 22px; text-align: center; }

        /* Confirm */
        .confirm-card {
          background: #faf7f2; border-radius: 16px;
          padding: 1rem; margin-bottom: 0.85rem;
          border: 1.5px solid #f0ebe3;
        }
        .confirm-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.45rem 0; border-bottom: 1px solid #ede7dc;
          font-size: 0.82rem; gap: 0.5rem;
        }
        .confirm-row:last-child { border-bottom: none; }
        .confirm-key { color: #888; font-weight: 500; flex-shrink: 0; }
        .confirm-val { color: #1a1208; font-weight: 600; text-align: right; }

        .confirm-note {
          background: rgba(212,98,42,0.07); border-radius: 12px;
          padding: 0.75rem 0.9rem; font-size: 0.74rem; color: #888; line-height: 1.7;
        }

        /* Sticky footer */
        .bm-footer {
          display: flex; gap: 0.6rem;
          padding: 0.85rem 1.25rem calc(0.85rem + env(safe-area-inset-bottom));
          border-top: 1px solid #f0ebe3;
          background: white; flex-shrink: 0;
        }
        @media (min-width: 600px) { .bm-footer { padding: 1rem 1.75rem 1.25rem; } }
        .bm-btn-back {
          flex: 1; padding: 0.85rem;
          border-radius: 50px; border: 1.5px solid #e8e0d5;
          background: white; font-size: 0.88rem; font-weight: 600;
          cursor: pointer; color: #666; transition: all 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .bm-btn-back:hover { border-color: var(--terra); color: var(--terra); }
        .bm-btn-next {
          flex: 2; padding: 0.85rem;
          border-radius: 50px; border: none;
          background: var(--terra); color: white;
          font-size: 0.92rem; font-weight: 700;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 6px 20px rgba(212,98,42,0.3);
          -webkit-tap-highlight-color: transparent;
        }
        .bm-btn-next:hover:not(:disabled) { background: #c4651a; transform: translateY(-1px); }
        .bm-btn-next:active:not(:disabled) { transform: scale(0.98); }
        .bm-btn-next:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }

        /* Success */
        .bm-success { text-align: center; padding: 2.5rem 1.5rem; }
        @media (min-width: 600px) { .bm-success { padding: 3rem 2rem; } }
        .success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50, #2e7d32);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; margin: 0 auto 1.25rem;
          box-shadow: 0 12px 40px rgba(76,175,80,0.3);
          animation: popIn 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        @keyframes popIn { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      `}</style>

            <div className="bm-overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
                <div className="bm-modal">

                    {/* Mobile drag handle */}
                    <div className="bm-drag-handle" />

                    {submitted ? (
                        <div className="bm-success">
                            <div className="success-icon">✓</div>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.45rem', fontWeight: 800, color: '#1a1208', marginBottom: '0.5rem' }}>
                                You're All Set! ✈️
                            </h2>
                            <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '300px', margin: '0 auto 0.6rem' }}>
                                Your trip enquiry to <strong style={{ color: '#1a1208' }}>{destination?.name}</strong> has been received. Our travel expert will call you within 2 hours.
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#bbb', marginBottom: '1.75rem' }}>
                                Booking ref: <strong>VOY{Math.random().toString(36).substr(2, 6).toUpperCase()}</strong>
                            </p>
                            <button onClick={handleClose} style={{
                                background: 'var(--terra)', color: 'white', border: 'none',
                                padding: '0.85rem 2.25rem', borderRadius: '50px',
                                fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
                                boxShadow: '0 6px 20px rgba(212,98,42,0.3)',
                            }}>Done</button>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="bm-header">
                                <div>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1rem', color: '#1a1208' }}>
                                        Plan Your Trip ✈️
                                    </div>
                                    <div style={{ fontSize: '0.68rem', color: '#aaa' }}>Step {step + 1} of {STEPS.length}</div>
                                </div>
                                <button className="bm-close" onClick={handleClose}>✕</button>
                            </div>

                            {/* Stepper */}
                            <div className="bm-stepper">
                                {STEPS.map((s, i) => (
                                    <React.Fragment key={s}>
                                        <div className="bm-step">
                                            <div className={`bm-step-circle ${i < step ? 'done' : i === step ? 'active' : 'pending'}`}>
                                                {i < step ? '✓' : i + 1}
                                            </div>
                                            <span className={`bm-step-label ${i < step ? 'done' : i === step ? 'active' : ''}`}>{s}</span>
                                        </div>
                                        {i < STEPS.length - 1 && <div className={`bm-step-line ${i < step ? 'done' : ''}`} />}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Scrollable body */}
                            <div className="bm-body">

                                {/* STEP 0 — Destination */}
                                {step === 0 && (
                                    <>
                                        <div className="bm-section-title">Where do you want to go?</div>
                                        <div className="bm-section-sub">Pick your dream destination</div>
                                        <div className="trip-types">
                                            {['honeymoon', 'family', 'solo', 'adventure', 'luxury'].map(t => (
                                                <button key={t} className={`trip-type-btn ${tripType === t ? 'active' : ''}`}
                                                    onClick={() => setTripType(t)}>
                                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="dest-grid">
                                            {destinations.map(d => (
                                                <div key={d.id} className={`dest-card ${destination?.id === d.id ? 'selected' : ''}`}
                                                    onClick={() => setDestination(d)}>
                                                    <span className="dest-emoji">{d.emoji}</span>
                                                    <div>
                                                        <div className="dest-name">{d.name}</div>
                                                        <div className="dest-tag">{d.tag}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* STEP 1 — Dates */}
                                {step === 1 && (
                                    <>
                                        <div className="bm-section-title">Pick your travel dates</div>
                                        <div className="bm-section-sub">Tap check-in then check-out</div>
                                        <div className="cal-nav">
                                            <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                                            <span className="cal-month-label">{MONTHS[calMonth]} {calYear}</span>
                                            <button className="cal-nav-btn" onClick={nextMonth}>›</button>
                                        </div>
                                        <div className="cal-grid">
                                            {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
                                            {renderCalendar().map((date, i) => {
                                                if (!date) return <div key={i} className="cal-day empty" />
                                                const past = isPast(new Date(date))
                                                const start = isStart(date)
                                                const end = isEnd(date)
                                                const inRange = isInRange(date)
                                                return (
                                                    <div key={i}
                                                        className={`cal-day ${past ? 'past' : ''} ${start ? 'start' : ''} ${end ? 'end' : ''} ${inRange ? 'in-range' : ''}`}
                                                        onClick={() => !past && handleDateClick(date)}
                                                        onMouseEnter={() => startDate && !endDate && setHoveredDate(date)}
                                                        onMouseLeave={() => setHoveredDate(null)}
                                                    >{date.getDate()}</div>
                                                )
                                            })}
                                        </div>
                                        <div className="date-summary">
                                            <div className="date-box">
                                                <div className="date-box-label">Check-in</div>
                                                <div className="date-box-val">{startDate ? startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</div>
                                            </div>
                                            <div className="date-box">
                                                <div className="date-box-label">Check-out</div>
                                                <div className="date-box-val">{endDate ? endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</div>
                                                {totalDays && <div className="date-box-nights">{totalDays} nights</div>}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* STEP 2 — Travelers */}
                                {step === 2 && (
                                    <>
                                        <div className="bm-section-title">Who's traveling?</div>
                                        <div className="bm-section-sub">Add your travel group</div>
                                        {[
                                            { key: 'adults', label: 'Adults', sub: 'Age 13+', min: 1 },
                                            { key: 'children', label: 'Children', sub: 'Age 2–12', min: 0 },
                                            { key: 'infants', label: 'Infants', sub: 'Under 2', min: 0 },
                                        ].map(({ key, label, sub, min }) => (
                                            <div className="traveler-row" key={key}>
                                                <div>
                                                    <div className="traveler-label">{label}</div>
                                                    <div className="traveler-sub">{sub}</div>
                                                </div>
                                                <div className="traveler-counter">
                                                    <button className="counter-btn" disabled={travelers[key] <= min}
                                                        onClick={() => setTravelers(t => ({ ...t, [key]: t[key] - 1 }))}>−</button>
                                                    <span className="counter-val">{travelers[key]}</span>
                                                    <button className="counter-btn"
                                                        onClick={() => setTravelers(t => ({ ...t, [key]: t[key] + 1 }))}>+</button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* STEP 3 — Confirm */}
                                {step === 3 && (
                                    <>
                                        <div className="bm-section-title">Review & Confirm</div>
                                        <div className="bm-section-sub">Everything look good?</div>
                                        <div className="confirm-card">
                                            {[
                                                ['Destination', `${destination?.emoji} ${destination?.name}`],
                                                ['Trip Type', tripType.charAt(0).toUpperCase() + tripType.slice(1)],
                                                ['Check-in', startDate?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })],
                                                ['Check-out', endDate?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })],
                                                ['Duration', `${totalDays} nights`],
                                                ['Travelers', `${travelers.adults} Adults${travelers.children ? `, ${travelers.children} Children` : ''}${travelers.infants ? `, ${travelers.infants} Infants` : ''}`],
                                            ].map(([k, v]) => (
                                                <div className="confirm-row" key={k}>
                                                    <span className="confirm-key">{k}</span>
                                                    <span className="confirm-val">{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="confirm-note">
                                            ✅ Free cancellation within 24 hrs &nbsp;·&nbsp; 📞 Expert calls within 2 hrs &nbsp;·&nbsp; 💳 No payment now
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Sticky footer */}
                            <div className="bm-footer">
                                {step > 0 && (
                                    <button className="bm-btn-back" onClick={() => setStep(s => s - 1)}>← Back</button>
                                )}
                                <button className="bm-btn-next" disabled={!canNext()}
                                    onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : setSubmitted(true)}>
                                    {step === STEPS.length - 1 ? '🎉 Confirm Booking' : 'Continue →'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}