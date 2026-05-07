import React, { useState, useCallback } from 'react'
import { useEffect, useRef, } from 'react';
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import TravelMomentsStrip from './components/TravelMomentsStrip'
import ImageSeparator from './components/ImageSeparator'
import WhyChooseUs from './components/WhyChooseUs'
import Services from './components/Services'
import Memories from './components/Memories'
import Destinations from './components/Destinations'
import Experience from './components/Experience'
import BookTrip from './components/BookTrip'
import Testimonials from './components/Testimonials'
import SocialProof from './components/SocialProof'
import { AboutStrip, Partners } from './components/AboutPartners'
import Subscribe from './components/Subscribe'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'  // ✅ ADD
import VoyaraScrollSection from './components/ScrollExpandMedia'

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [bookingOpen, setBookingOpen] = useState(false)  // ✅ ADD
  const timerRef = React.useRef(null)

  const showToast = useCallback((msg) => {
    setToast({ visible: true, message: msg })
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000)
  }, [])

  const openBooking = useCallback(() => setBookingOpen(true), [])   // ✅ ADD
  const closeBooking = useCallback(() => setBookingOpen(false), []) // ✅ ADD

  return (
    <>
      <Toast message={toast.message} visible={toast.visible} />

      {/* ✅ ADD — single modal instance for whole app */}
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />

      {/* ✅ pass openBooking prop */}
      <Navbar onBookClick={openBooking} />


      {/* ── HERO ── */}
      <Hero showToast={showToast} />


      {/* ── scroll expand ── */}
      <VoyaraScrollSection
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
        title="Discover World"
        date="Year Round"
        scrollToExpand="Scroll to explore ↓"
      >
        <div
          style={{
            padding: window.innerWidth < 768 ? '3.5rem 1.2rem' : '5rem 2rem',
            textAlign: 'center',
            background: 'rgba(250,247,242,0.99)',
          }}
        >

          {/* Heading */}
          <h2
            style={{
              fontSize: window.innerWidth < 768 ? '1.8rem' : '5rem',
              lineHeight: window.innerWidth < 768 ? 1.15 : 1.05,
              lineHeight: 1.05,
              fontWeight: 700,
              marginBottom: '2rem',
              color: '#1a1a1a',
              letterSpacing: '-0.05em',
              width: '100%',
            }}
          >
            {['Plan', 'Your', 'Dream', 'Trip'].map((word, i) => (
              <span key={i} className="sem-word">
                <span
                  className="sem-word-inner"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </h2>

          {/* Paragraph */}
          <p
            style={{
              fontSize: window.innerWidth < 768 ? '1rem' : '1.15rem',
              color: '#555',
              width: '100%',
              margin: '0 auto',
              lineHeight: window.innerWidth < 768 ? 1.7 : 1.9,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              textAlign: 'center',
              wordBreak: 'normal',
              overflowWrap: 'normal',
            }}
          >
            {[
              'From', 'the', 'snow-capped', 'peaks', 'of', 'the',
              'Himalayas', 'to', 'the', 'sun-kissed', 'beaches',
              'of', 'the', 'Maldives,', 'every', 'journey',
              'begins', 'with', 'a', 'single', 'dream.',
              'At', 'Voyara,', 'we', 'transform', 'that',
              'dream', 'into', 'a', 'seamless,',
              'unforgettable', 'adventure', 'tailored',
              'just', 'for', 'you.',

              'Whether', "you're", 'planning', 'a',
              'romantic', 'honeymoon,', 'a',
              'fun-filled', 'family', 'vacation,',
              'or', 'a', 'soul-searching', 'solo',
              'escape,', 'our', 'expert', 'travel',
              'curators', 'handle', 'every',
              'detail', 'with', 'care', 'and',
              'precision.',

              'From', 'luxury', 'stays', 'and',
              'private', 'transfers', 'to',
              'handpicked', 'experiences',
              'and', 'hidden', 'gems,',
              'we', 'create', 'journeys',
              'that', 'feel', 'effortless,',
              'immersive,', 'and',
              'truly', 'memorable.',

              'With', 'over', '800',
              'destinations', 'across',
              'the', 'globe', 'and',
              '50,000+', 'happy',
              'travelers,', 'Voyara',
              'has', 'become',
              "India's", 'trusted',
              'travel', 'planning',
              'partner', 'for',
              'modern', 'explorers.',

              'No', 'hidden', 'charges,',
              'no', 'last-minute',
              'surprises,', 'just',
              'beautifully', 'crafted',
              'travel', 'experiences',
              'designed', 'to',
              'help', 'you',
              'discover', 'the',
              'world', 'in',
              'the', 'most',
              'meaningful', 'way.',

            ].map((word, i) => (
              <span
                key={i}
                className="sem-word"
                style={{
                  marginRight: '0.12em',
                }}
              >
                <span
                  className="sem-word-inner"
                  style={{
                    animationDelay: `${0.35 + i * 0.02}s`,
                    display: 'inline-block',
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </p>

        </div>
      </VoyaraScrollSection>

      {/* ── TRAVEL MOMENTS STRIP ── */}
      < TravelMomentsStrip />

      {/* ── TRUST STRIP ── */}
      < TrustStrip />

      {/* ── WHY CHOOSE US ── */}
      < WhyChooseUs />

      {/* ── SERVICES ── */}
      < Services />

      {/* ── MEMORIES (image trail) ── */}
      < Memories />

      {/* ── DESTINATIONS ── */}
      < Destinations showToast={showToast} />

      {/* ── FULL-WIDTH IMAGE SEPARATOR between Destinations and Experience ── */}
      < ImageSeparator variant="afterDestinations" />

      {/* ── EXPERIENCE / VIDEO ── */}
      < Experience showToast={showToast} />

      {/* ── BOOK TRIP ── ✅ pass openBooking prop */}
      < BookTrip onBookClick={openBooking} />

      {/* ── FULL-WIDTH IMAGE SEPARATOR before Testimonials ── */}
      < ImageSeparator variant="beforeTestimonials" />

      {/* ── TESTIMONIALS ── */}
      < Testimonials />

      {/* ── TOUR PACKAGES ── */}
      {/* <TourPackages /> */}

      {/* ── SOCIAL PROOF ── */}
      <SocialProof />

      {/* ── ABOUT STRIP ── */}
      <AboutStrip />

      {/* ── PARTNERS ── */}
      <Partners />

      {/* ── SUBSCRIBE ── */}
      <Subscribe showToast={showToast} />

      {/* ── FOOTER ── */}
      <Footer showToast={showToast} />
    </>
  )
}