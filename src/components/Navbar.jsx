import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import BookingModal from './BookingModal'

const links = [
  { href: '#destinations', label: 'Destinations', sub: 'Browse 800+ places', icon: '🗺️' },
  { href: '#services', label: 'Services', sub: 'Flights, hotels & more', icon: '✈️' },
  { href: '#book', label: 'How It Works', sub: 'Book in 3 easy steps', icon: '📋' },
  { href: '#testimonials', label: 'Reviews', sub: '12,000+ happy travelers', icon: '⭐' },
]

// ─── Animated underline link ────────────────────────────────────────────────
function NavLink({ href, label, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.li
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <a
        href={href}
        onClick={onClick}
        className={`
          relative flex flex-col items-center gap-0
          px-3.5 py-2 rounded-full
          text-[0.88rem] font-[500] tracking-[0.01em]
          no-underline select-none
          transition-colors duration-200
          ${isActive ? 'text-[#D4622A]' : 'text-[#7A6B58]'}
        `}
      >
        {/* Pill hover background */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#D4622A]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: hovered ? 0.07 : 0, scale: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Label */}
        <motion.span
          className="relative z-10"
          animate={{ color: hovered || isActive ? '#D4622A' : '#7A6B58' }}
          transition={{ duration: 0.18 }}
        >
          {label}
        </motion.span>

        {/* Animated underline */}
        <motion.span
          className="absolute bottom-1.5 left-1/2 h-[1.5px] bg-[#D4622A] rounded-full"
          style={{ translateX: '-50%' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: hovered || isActive ? '55%' : '0%',
            opacity: hovered || isActive ? 1 : 0,
          }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </a>
    </motion.li>
  )
}

// ─── CTA Book Button ─────────────────────────────────────────────────────────
function BookButton({ onClick, className = '' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      className={`
        relative overflow-hidden
        px-[1.35rem] py-[0.58rem]
        rounded-full border-none
        text-white text-[0.88rem] font-[650] tracking-[0.02em]
        cursor-pointer select-none
        ${className}
      `}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #E07B3A 0%, #D4622A 60%, #B84E1C 100%)'
          : 'linear-gradient(135deg, #D4622A 0%, #C05520 100%)',
        boxShadow: hovered
          ? '0 8px 28px rgba(212,98,42,0.55), 0 2px 8px rgba(212,98,42,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
          : '0 4px 16px rgba(212,98,42,0.35), 0 1px 4px rgba(212,98,42,0.2)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
          backgroundSize: '250% 100%',
        }}
        animate={{ backgroundPosition: hovered ? '0% 0%' : '200% 0%' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />

      <motion.span
        className="relative z-10 flex items-center gap-1.5"
        animate={{ y: hovered ? -1 : 0 }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.span
          animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.25 }}
        >
          ✈
        </motion.span>
        Book a Trip
      </motion.span>
    </motion.button>
  )
}

// ─── Hamburger icon ──────────────────────────────────────────────────────────
function Hamburger({ open, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={open}
      whileTap={{ scale: 0.92 }}
      className="
        flex flex-col justify-center items-center gap-[5px]
        w-11 h-11 rounded-xl
        bg-transparent border-none cursor-pointer
        transition-colors duration-200
        hover:bg-[rgba(212,98,42,0.09)]
        md:hidden
      "
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-[2px] bg-[#1A1208] rounded-full origin-center"
          animate={
            open
              ? {
                width: i === 1 ? 0 : 22,
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 7 : i === 2 ? -7 : 0,
                opacity: i === 1 ? 0 : 1,
              }
              : { width: 22, rotate: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        />
      ))}
    </motion.button>
  )
}

// ─── Mobile Drawer ───────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose, onBooking }) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const drawerVariants = {
    hidden: { x: '100%', opacity: 0.6 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] } },
    exit: { x: '100%', opacity: 0.6, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } },
  }

  const linkVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({
      x: 0, opacity: 1,
      transition: { delay: 0.08 + i * 0.065, duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
    exit: { x: 20, opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[101] md:hidden"
            style={{ background: 'rgba(26,18,8,0.48)', backdropFilter: 'blur(3px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            className="
              fixed top-0 right-0 bottom-0 z-[102]
              flex flex-col
              w-[min(320px,85vw)]
              overflow-hidden
              md:hidden
            "
            style={{
              background: 'rgba(250,247,242,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '-20px 0 80px rgba(26,18,8,0.22), -4px 0 16px rgba(26,18,8,0.1)',
              borderLeft: '1px solid rgba(212,98,42,0.10)',
            }}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-[1.05rem]"
              style={{ borderBottom: '1px solid rgba(212,98,42,0.10)', background: 'rgba(255,255,255,0.7)' }}
            >
              <a
                href="#home"
                onClick={onClose}
                className="font-['Playfair_Display',serif] text-[1.38rem] font-black text-[#1A1208] no-underline"
              >
                Voy<span className="text-[#D4622A]">ara</span>
              </a>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.08, background: '#D4622A', color: '#fff' }}
                whileTap={{ scale: 0.94 }}
                aria-label="Close menu"
                className="
                  w-9 h-9 rounded-full border-none cursor-pointer
                  flex items-center justify-center
                  text-[0.95rem] text-[#7A6B58]
                  transition-colors duration-200
                "
                style={{ background: 'rgba(212,98,42,0.10)' }}
              >
                ✕
              </motion.button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-2">
              {links.map(({ href, label, sub, icon }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={onClose}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{
                    paddingLeft: '2rem',
                    background: 'rgba(212,98,42,0.06)',
                    color: '#D4622A',
                  }}
                  className="
                    flex items-center gap-3.5
                    px-6 py-[0.95rem]
                    no-underline text-[#7A6B58]
                    cursor-pointer select-none
                  "
                  style={{ borderBottom: '1px solid rgba(212,98,42,0.08)', transition: 'padding-left 0.22s ease, background 0.2s, color 0.2s' }}
                >
                  <motion.div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[1rem] flex-shrink-0"
                    style={{ background: 'rgba(212,98,42,0.09)' }}
                    whileHover={{ scale: 1.1, background: 'rgba(212,98,42,0.18)' }}
                  >
                    {icon}
                  </motion.div>
                  <div>
                    <strong className="block text-[0.93rem] font-[600] text-[#1A1208]">{label}</strong>
                    <span className="text-[0.73rem] text-[#A89880] font-[400]">{sub}</span>
                  </div>

                  {/* Arrow */}
                  <motion.span
                    className="ml-auto text-[#D4622A] text-[0.75rem] opacity-0"
                    whileHover={{ opacity: 1, x: 3 }}
                    transition={{ duration: 0.18 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </nav>

            {/* Footer CTA */}
            <motion.div
              className="px-5 pt-4 pb-5"
              style={{ borderTop: '1px solid rgba(212,98,42,0.10)', background: 'rgba(255,255,255,0.7)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              <BookButton
                onClick={() => { onClose(); onBooking(); }}
                className="w-full justify-center text-[1rem]"
              />
              <div className="flex justify-center gap-4 flex-wrap mt-3">
                {['✓ Free cancellation', '✓ No hidden charges', '✓ 24/7 support'].map((t) => (
                  <span key={t} className="text-[0.68rem] text-[#A89880] font-[500]">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Track scroll
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Derived scroll values (clamped)
  const progress = Math.min(scrollY / 80, 1) // 0→1 over first 80px

  const navHeight = 68 - progress * 10              // 68→58 px
  const blurAmount = progress * 20                   // 0→20px blur
  const bgOpacity = 0.72 + progress * 0.24          // 0.72→0.96
  const borderOpacity = 0.06 + progress * 0.10          // subtle→visible border
  const shadowOpacity = progress * 0.12

  return (
    <>
      {/* ── BookingModal ── */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* ── NAVBAR ENTRANCE ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between"
        style={{
          height: `${navHeight}px`,
          padding: '0 5%',
          background: `rgba(250,247,242,${bgOpacity})`,
          backdropFilter: `blur(${blurAmount}px) saturate(${1 + progress * 0.4})`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${1 + progress * 0.4})`,
          borderBottom: `1px solid rgba(212,98,42,${borderOpacity})`,
          boxShadow: scrolled
            ? `0 4px 40px rgba(26,18,8,${shadowOpacity}), 0 1px 0 rgba(212,98,42,0.06), 0 0 60px rgba(212,98,42,${shadowOpacity * 0.5})`
            : 'none',
          transition: 'height 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* ── LOGO ── */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 340, damping: 22 }}
          className="
            font-['Playfair_Display',serif]
            text-[1.62rem] font-black tracking-[-0.5px]
            text-[#1A1208] no-underline flex-shrink-0
            flex items-center
          "
          style={{ lineHeight: 1 }}
        >
          Voy<span className="text-[#D4622A]">ara</span>
        </motion.a>

        {/* ── DESKTOP LINKS ── */}
        <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
          {links.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={activeLink === href}
              onClick={() => setActiveLink(href)}
            />
          ))}

          {/* Divider */}
          <motion.li
            className="w-px h-4 mx-1.5 rounded-full"
            style={{ background: 'rgba(212,98,42,0.18)' }}
          />

          {/* CTA */}
          <li>
            <BookButton onClick={() => setBookingOpen(true)} />
          </li>
        </ul>

        {/* ── HAMBURGER (mobile) ── */}
        <Hamburger open={menuOpen} onClick={() => setMenuOpen((p) => !p)} />
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBooking={() => setBookingOpen(true)}
      />
    </>
  )
}