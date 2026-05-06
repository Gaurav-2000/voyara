import React, { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import StickyCTA from './components/StickyCTA'
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
      <StickyCTA />

      {/* ── HERO ── */}
      <Hero showToast={showToast} />

      {/* ── FULL-WIDTH IMAGE SEPARATOR after Hero ── */}
      <ImageSeparator variant="afterHero" />

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