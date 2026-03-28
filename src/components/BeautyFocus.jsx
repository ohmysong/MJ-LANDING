import React from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import ImagePlaceholder from './ImagePlaceholder'

const treatments = [
  {
    num: '01', title: 'Brightening',
    desc: 'Skin clarity and tone refinement for luminous radiance.',
    label: 'Brightening · Image',
    img: 'Close-up skin texture · Even tone',
  },
  {
    num: '02', title: 'Lifting',
    desc: 'Natural facial elevation preserving authentic expression.',
    label: 'Lifting · Image',
    img: 'Jawline contour · Profile',
  },
  {
    num: '03', title: 'Wrinkles',
    desc: 'Softening expression lines while keeping character.',
    label: 'Wrinkles · Image',
    img: 'Smooth skin · Natural look',
  },
  {
    num: '04', title: 'Firmness',
    desc: 'Skin elasticity restoration for youthful resilience.',
    label: 'Firmness · Image',
    img: 'Cheekbone structure · Side view',
  },
  {
    num: '05', title: 'Contour',
    desc: 'Refined facial balance through sculpted definition.',
    label: 'Contour · Image',
    img: 'Facial silhouette · Clean line',
  },
]

const BeautyFocus = () => (
  <section id="beauty-focus" style={{
    padding: 'var(--section-pad) 0',
    background: 'var(--warm-gray)',
    overflow: 'hidden',
  }}>
    <FadeIn style={{ textAlign: 'center', marginBottom: 64, padding: '0 48px' }}>
      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'var(--gold)', marginBottom: 16,
      }}>
        Signature Beauty Focus
      </p>
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(36px, 5vw, 52px)',
        fontWeight: 300,
        color: 'var(--black)',
      }}>
        Areas of Refinement
      </h2>
    </FadeIn>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 2,
      maxWidth: '100%',
    }}>
      <style>{`
        @media (max-width: 1060px) { .focus-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px)  { .focus-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 400px)  { .focus-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {treatments.map((t, i) => (
        <FadeIn key={t.num} delay={i * 0.08}>
          <FocusCard {...t} />
        </FadeIn>
      ))}
    </div>
  </section>
)

const FocusCard = ({ num, title, desc, label, img }) => {
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ background: 'var(--white)', overflow: 'hidden', cursor: 'default' }}
    >
      {/* Image */}
      <div style={{ height: 'clamp(180px, 18vw, 280px)', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%' }}
        >
          <ImagePlaceholder
            label={label}
            desc={img}
            style={{ height: '100%', minHeight: 'unset', background: '#ddd5c8' }}
          />
        </motion.div>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(20px, 2.5vw, 32px) clamp(20px, 2.5vw, 28px)' }}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 12,
        }}>
          {num}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(20px, 2.2vw, 26px)',
          fontWeight: 400,
          color: 'var(--black)',
          marginBottom: 10,
          transition: 'color 0.2s',
          ...(hovered ? { color: 'var(--gold-dark)' } : {}),
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12, color: 'var(--muted)',
          lineHeight: 1.8, letterSpacing: '0.04em',
        }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

export default BeautyFocus
