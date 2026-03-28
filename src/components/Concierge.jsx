import React from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const services = [
  {
    title: 'Consultation Coordination',
    desc: 'Scheduling and preparation for your private visit',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: 'Medical Interpretation',
    desc: 'Accurate communication across languages',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: 'Travel Assistance',
    desc: 'Transportation, accommodation, and logistics',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    title: 'Aftercare Support',
    desc: 'Continued guidance after you return home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
]

const Concierge = () => (
  <section id="concierge" style={{
    padding: 'var(--section-pad) 48px',
    background: 'var(--warm-gray)',
  }}>
    <div style={{
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(40px, 8vw, 100px)',
      alignItems: 'center',
    }}>
      <style>{`
        @media (max-width: 760px) {
          .concierge-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Left: text */}
      <FadeIn>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 12,
        }}>
          Powered by MAK
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 300,
          color: 'var(--black)',
          lineHeight: 1.2,
          marginBottom: 24,
        }}>
          International<br />Patient Concierge
        </h2>
        <div style={{ width: 36, height: 1, background: 'var(--gold)', marginBottom: 24 }} />
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13, color: 'var(--muted)',
          lineHeight: 1.9, letterSpacing: '0.04em',
        }}>
          A seamless journey from first inquiry to aftercare —
          every detail curated for the international guest.
        </p>
      </FadeIn>

      {/* Right: services list */}
      <ul style={{ listStyle: 'none' }}>
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={0.1 * i}>
            <ServiceItem {...s} />
          </FadeIn>
        ))}
      </ul>
    </div>
  </section>
)

const ServiceItem = ({ title, desc, icon }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <motion.li
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '22px 0',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        cursor: 'default',
      }}
    >
      <motion.div
        animate={{
          background: hovered ? 'var(--gold)' : 'var(--white)',
          borderColor: hovered ? 'var(--gold)' : 'rgba(199,164,106,0.3)',
          color: hovered ? '#111' : 'var(--gold)',
        }}
        transition={{ duration: 0.25 }}
        style={{
          width: 44, height: 44, minWidth: 44,
          border: '1px solid rgba(199,164,106,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {icon}
      </motion.div>
      <div>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 18, fontWeight: 400,
          color: 'var(--black)',
          marginBottom: 3,
          transition: 'color 0.2s',
          ...(hovered ? { color: 'var(--gold-dark)' } : {}),
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12, color: 'var(--muted)',
          letterSpacing: '0.04em',
        }}>
          {desc}
        </p>
      </div>
    </motion.li>
  )
}

export default Concierge
