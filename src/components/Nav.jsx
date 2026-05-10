import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Treatments', href: '#beauty-focus' },
  { label: 'Approach', href: '#approach' },
  { label: 'Concierge', href: '#concierge' },
]

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 48px',
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s ease, border-color 0.4s ease',
          background: scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(199,164,106,0.12)' : '1px solid transparent',
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <a href="#" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 21,
          fontWeight: 400,
          color: '#fff',
          letterSpacing: '0.1em',
        }}>
          Maison <span style={{ color: 'var(--gold)' }}>Privé</span>
        </a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', gap: 40, listStyle: 'none',
        }} className="nav-desktop">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-cta">
          <a
            href="#consultation"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
          >
            Consultation
          </a>
          <a
            href="/precheck"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#111',
              background: 'var(--gold)',
              padding: '10px 22px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Pre-Check
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: 'none', border: 'none',
            display: 'none', flexDirection: 'column', gap: 5,
            padding: 8,
          }}
          className="nav-hamburger"
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1,
              background: menuOpen && i === 1 ? 'transparent' : '#fff',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                : i === 2 ? 'rotate(-45deg) translate(4px, -4px)' : 'none'
                : 'none',
              transition: 'transform 0.25s, opacity 0.25s',
            }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
              background: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(16px)',
              padding: '32px 48px 48px',
              borderBottom: '1px solid rgba(199,164,106,0.15)',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 28,
                  fontWeight: 300,
                  color: '#fff',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {l.label}
              </motion.a>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a
                href="#consultation"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(199,164,106,0.5)',
                  color: 'var(--gold)',
                  padding: '14px 28px',
                }}
              >
                Consultation
              </a>
              <a
                href={PRECHECK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  background: 'var(--gold)', color: '#111',
                  padding: '14px 28px',
                }}
              >
                Begin Pre-Check
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Nav
