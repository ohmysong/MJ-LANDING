import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'
import ImagePlaceholder from './ImagePlaceholder'

const Trust = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="trust" ref={ref} style={{
      position: 'relative',
      minHeight: 540,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Parallax background */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: '-10% 0', zIndex: 0 }}>
        <ImagePlaceholder
          dark
          label="Trust Background"
          desc="Elegant clinic interior · Private atmosphere"
          style={{ height: '120%', minHeight: '120%', background: '#16120e' }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(105deg, rgba(17,11,6,0.88) 0%, rgba(17,11,6,0.5) 55%, rgba(17,11,6,0.1) 100%)',
      }} />
      {/* Top fade from previous section */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120, zIndex: 2,
        background: 'linear-gradient(to bottom, var(--warm-gray), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 3,
        padding: 'clamp(80px, 10vw, 120px) clamp(40px, 8vw, 100px)',
        maxWidth: 700,
      }}>
        <FadeIn>
          <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 36 }} />
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#fff',
            lineHeight: 1.75,
            marginBottom: 28,
          }}>
            "Trusted by celebrities and international clients seeking refined aesthetic care."
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.9,
          }}>
            Privacy and discretion are central<br />
            to the Maison Privé experience.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export default Trust
