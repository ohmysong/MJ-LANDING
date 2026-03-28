import React from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import ImagePlaceholder from './ImagePlaceholder'

const pills = ['Facial Balance', 'Skin Condition', 'Aesthetic Goals', 'Long-Term Vision']

const Approach = () => (
  <section id="approach" style={{
    background: 'var(--black)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  }}>
    <style>{`
      @media (max-width: 860px) {
        #approach { grid-template-columns: 1fr !important; }
        .approach-img { display: none !important; }
      }
    `}</style>

    {/* Left: text */}
    <div style={{
      padding: 'clamp(60px, 8vw, 100px) clamp(40px, 6vw, 80px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <FadeIn>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 20,
        }}>
          Our Approach
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 4.5vw, 52px)',
          fontWeight: 300,
          color: '#fff',
          lineHeight: 1.2,
          marginBottom: 36,
        }}>
          Personalized<br />
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Beauty Design</em>
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div style={{
          width: 40, height: 1,
          background: 'var(--gold)',
          marginBottom: 32,
        }} />
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 2,
          marginBottom: 10,
        }}>
          Every face is unique.
        </p>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 2,
          marginBottom: 52,
        }}>
          Dr. designs treatment plans based on{' '}
          <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>facial balance</strong>,{' '}
          <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>skin condition</strong>,
          and <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>aesthetic goals</strong> —
          a holistic vision that evolves with you.
        </p>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {pills.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
              whileHover={{ background: 'rgba(199,164,106,0.12)', borderColor: 'var(--gold)' }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10, fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                border: '1px solid rgba(199,164,106,0.3)',
                color: 'var(--gold)',
                padding: '9px 18px',
                cursor: 'default',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              {p}
            </motion.span>
          ))}
        </div>
      </FadeIn>
    </div>

    {/* Right: image */}
    <div className="approach-img" style={{ overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%' }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <ImagePlaceholder
          dark
          label="Approach Image"
          desc="Doctor consultation · Clinic interior"
          style={{ height: '100%', minHeight: 600 }}
        />
      </motion.div>
    </div>
  </section>
)

export default Approach
