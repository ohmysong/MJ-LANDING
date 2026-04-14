import React from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from './FadeIn'

const Philosophy = () => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px 0px' })

  return (
    <section id="philosophy" ref={ref} style={{
      padding: 'var(--section-pad) 48px',
      background: 'var(--warm-gray)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background large text watermark */}
      <motion.div
        animate={inView ? { opacity: 0.035 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(120px, 22vw, 320px)',
          fontWeight: 300,
          color: 'var(--gold)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        Aging
      </motion.div>

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 24,
          }}>
            Our Philosophy
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 300,
            lineHeight: 0.95,
            color: 'var(--black)',
            letterSpacing: '-0.02em',
            marginBottom: 52,
          }}>
            Beauty{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Aging</em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#666',
            lineHeight: 2,
            marginBottom: 12,
          }}>
            Aging is not something to erase.
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 500,
            color: 'var(--black)',
            lineHeight: 2,
            marginBottom: 12,
          }}>
            It is a process of refinement.
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#888',
            lineHeight: 2,
            marginBottom: 64,
          }}>
            At Maison Privé, beauty evolves with time.
          </p>
        </FadeIn>

        {/* Dual images */}
        <FadeIn delay={0.3} y={48}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 3,
          }}>
            <div style={{ height: 'clamp(200px, 28vw, 360px)', overflow: 'hidden' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%' }}
              >
                <img
                  src="/images/Philosophy_01.png"
                  alt="Philosophy 01"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </div>
            <div style={{ height: 'clamp(200px, 28vw, 360px)', overflow: 'hidden' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%' }}
              >
                <img
                  src="/images/Philosophy_02.png"
                  alt="Philosophy 02"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Philosophy
