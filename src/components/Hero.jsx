import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

const word = {
  hidden: { opacity: 0, y: 40 },
  show:  { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY  = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} id="hero" style={{ position: 'relative', height: '100svh', minHeight: 640, overflow: 'hidden' }}>
      {/* Background image layer — parallax */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: '-10% 0', zIndex: 0 }}>
        <ImagePlaceholder
          dark
          label="Hero Background"
          desc="Natural female face close-up · Bright skin · Natural light"
          style={{ height: '120%', minHeight: '120%', background: '#18140f' }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,8,6,0.35) 0%, rgba(10,8,6,0.2) 40%, rgba(10,8,6,0.7) 100%)',
        }} />
      </motion.div>

      {/* Decorative floating elements */}
      <FloatingOrb style={{ top: '18%', left: '8%' }} delay={0} />
      <FloatingOrb style={{ top: '30%', right: '12%' }} delay={1.2} size={6} />
      <FloatingOrb style={{ bottom: '28%', left: '18%' }} delay={0.6} size={4} />

      {/* Centered hero text */}
      <motion.div
        style={{
          y: textY, opacity,
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 28,
          }}
        >
          Maison Privé · Seoul
        </motion.p>

        {/* Main heading */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.h1 variants={word} style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(52px, 8vw, 108px)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: '#fff',
            marginBottom: 4,
            letterSpacing: '-0.01em',
          }}>
            Still Beautiful
          </motion.h1>
          <motion.h1 variants={word} style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(52px, 8vw, 108px)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: 'var(--gold)',
            fontStyle: 'italic',
            marginBottom: 32,
            letterSpacing: '-0.01em',
          }}>
            at Any Age
          </motion.h1>
        </motion.div>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 48, height: 1, background: 'var(--gold)', marginBottom: 28, transformOrigin: 'center' }}
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(16px, 2.2vw, 24px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: 12,
          }}
        >
          Where Beauty Deepens Over Time
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 52,
          }}
        >
          4D Facial Tuning · The Philosophy of Beauty Aging
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <HeroBtn href="#consultation" primary>Private Consultation</HeroBtn>
          <HeroBtn href="https://wa.me/">WhatsApp Inquiry</HeroBtn>
        </motion.div>
      </motion.div>

      {/* Bottom mist fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, zIndex: 3,
        background: 'linear-gradient(to bottom, transparent, var(--warm-gray))',
        pointerEvents: 'none',
      }} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
        }}>Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(199,164,106,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

const HeroBtn = ({ children, href, primary }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        padding: '16px 36px',
        background: primary ? (hovered ? 'rgba(199,164,106,0.85)' : 'var(--gold)') : 'transparent',
        color: primary ? '#111' : (hovered ? 'var(--gold)' : '#fff'),
        border: primary ? 'none' : `1px solid ${hovered ? 'var(--gold)' : 'rgba(255,255,255,0.35)'}`,
        transition: 'all 0.25s ease',
        display: 'inline-block',
      }}
    >
      {children}
    </motion.a>
  )
}

const FloatingOrb = ({ style, delay, size = 8 }) => (
  <motion.div
    animate={{ y: [0, -12, 0], opacity: [0.25, 0.5, 0.25] }}
    transition={{ repeat: Infinity, duration: 4 + delay, delay, ease: 'easeInOut' }}
    style={{
      position: 'absolute', zIndex: 1,
      width: size, height: size, borderRadius: '50%',
      background: 'var(--gold)',
      filter: 'blur(1px)',
      ...style,
    }}
  />
)

export default Hero
