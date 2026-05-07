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

      <VoyaraScrollSection
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
        title="Discover World"
        date="Year Round"
        scrollToExpand="Scroll to explore ↓"
      >
        <div style={{
          padding: '5rem 2rem',
          textAlign: 'center',
          background: '#fff',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
            Plan Your Dream Trip
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '100%', margin: '0 auto' }}>
            From honeymoons to family adventures — every journey curated just for youFrom honeymoons to family adventures — every journey curated just for youFrom honeymoons to family adventures — every journey curated just for youFrom honeymoons to family adventures — every journey curated just for youFrom honeymoons to family adventures — every journey curated just for you.
          </p>
        </div>
      </VoyaraScrollSection>

      {/* ── TRAVEL MOMENTS STRIP ── */}
      <TravelMomentsStrip />

      {/* ── TRUST STRIP ── */}
      <TrustStrip />

      {/* ── WHY CHOOSE US ── */}
      <WhyChooseUs />

      {/* ── SERVICES ── */}
      <Services />

      {/* ── MEMORIES (image trail) ── */}
      <Memories />

      {/* ── DESTINATIONS ── */}
      <Destinations showToast={showToast} />

      {/* ── FULL-WIDTH IMAGE SEPARATOR between Destinations and Experience ── */}
      <ImageSeparator variant="afterDestinations" />

      {/* ── EXPERIENCE / VIDEO ── */}
      <Experience showToast={showToast} />

      {/* ── BOOK TRIP ── ✅ pass openBooking prop */}
      <BookTrip onBookClick={openBooking} />

      {/* ── FULL-WIDTH IMAGE SEPARATOR before Testimonials ── */}
      <ImageSeparator variant="beforeTestimonials" />

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

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