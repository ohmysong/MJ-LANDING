import React from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const pillars = [
  {
    title: 'Clean Lines',
    sub: 'Refined facial balance',
    desc: 'Precise proportion and structure that creates effortless elegance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    ),
  },
  {
    title: 'Healthy Skin',
    sub: 'Natural glow and vitality',
    desc: 'Luminous radiance that reflects inner wellness and vitality.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="5" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    title: 'Elegant Presence',
    sub: 'Subtle yet confident beauty',
    desc: 'A quiet confidence that commands attention without effort.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
]

const KoreanAesthetic = () => (
  <section id="korean-aesthetic" style={{
    padding: 'var(--section-pad) 48px',
    background: 'var(--white)',
  }}>
    <FadeIn style={{ textAlign: 'center', marginBottom: 72 }}>
      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'var(--gold)', marginBottom: 16,
      }}>
        Korean Aesthetic
      </p>
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(36px, 5vw, 52px)',
        fontWeight: 300,
        color: 'var(--black)',
      }}>
        The Standard of Beauty
      </h2>
    </FadeIn>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 2,
      maxWidth: 'var(--container)',
      margin: '0 auto',
    }}>
      <style>{`
        @media (max-width: 700px) {
          .ka-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {pillars.map((p, i) => (
        <FadeIn key={p.title} delay={i * 0.12}>
          <KaCard {...p} index={i} />
        </FadeIn>
      ))}
    </div>
  </section>
)

const KaCard = ({ title, sub, desc, icon }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -6 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--warm-gray)',
        padding: 'clamp(40px, 5vw, 64px) clamp(32px, 4vw, 52px)',
        textAlign: 'center',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.08)' : '0 0 0 rgba(0,0,0,0)',
        transition: 'box-shadow 0.35s',
        cursor: 'default',
      }}
    >
      {/* Icon */}
      <motion.div
        animate={{ borderColor: hovered ? 'var(--gold)' : 'rgba(199,164,106,0.35)' }}
        style={{
          width: 56, height: 56, margin: '0 auto 28px',
          border: '1px solid rgba(199,164,106,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hovered ? 'var(--gold)' : 'rgba(199,164,106,0.6)',
          transition: 'color 0.3s',
        }}
      >
        {icon}
      </motion.div>

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 28, fontWeight: 400,
        color: 'var(--black)',
        marginBottom: 8,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 16, fontStyle: 'italic',
        color: 'var(--gold)',
        marginBottom: 16,
      }}>
        {sub}
      </p>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 12, color: 'var(--muted)',
        lineHeight: 1.8, letterSpacing: '0.04em',
      }}>
        {desc}
      </p>
    </motion.div>
  )
}

export default KoreanAesthetic
