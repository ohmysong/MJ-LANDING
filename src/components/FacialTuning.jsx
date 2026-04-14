import React from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const dimensions = [
  { num: '01', label: 'Front', desc: 'Facial symmetry and proportional balance' },
  { num: '02', label: 'Profile', desc: 'Side contour and jawline definition' },
  { num: '03', label: 'Expression', desc: 'Dynamic harmony during movement' },
  { num: '04', label: 'Movement', desc: 'Natural fluidity across all angles' },
]

const FacialTuning = () => {
  const [active, setActive] = React.useState(null)

  return (
    <section id="facial-tuning" style={{
      background: 'var(--black)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>
      <style>{`
        @media (max-width: 860px) {
          #facial-tuning { grid-template-columns: 1fr !important; }
          .tuning-img-wrap { display: none !important; }
        }
      `}</style>

      {/* Left image */}
      <div className="tuning-img-wrap" style={{ minHeight: 640, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', transformOrigin: 'center' }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/images/4D Facial Tuning.jpg"
            alt="4D Facial Tuning"
            style={{ width: '100%', height: '100%', minHeight: 640, objectFit: 'cover', objectPosition: 'center' }}
          />
        </motion.div>
      </div>

      {/* Right content */}
      <div style={{ padding: 'clamp(60px, 8vw, 100px) clamp(40px, 6vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <FadeIn>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 20,
          }}>Signature Method</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 5vw, 60px)',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 48,
          }}>
            4D Facial <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Tuning</em>
          </h2>
        </FadeIn>

        <ul style={{ listStyle: 'none', marginBottom: 48 }}>
          {dimensions.map((d, i) => (
            <FadeIn key={d.num} delay={0.1 * i}>
              <motion.li
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  cursor: 'default',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: active === i ? 'var(--gold)' : 'rgba(199,164,106,0.45)',
                  minWidth: 28,
                  transition: 'color 0.2s',
                  paddingTop: 4,
                }}>
                  {d.num}
                </span>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 300,
                    color: active === i ? '#fff' : 'rgba(255,255,255,0.8)',
                    transition: 'color 0.2s',
                    marginBottom: 4,
                  }}>
                    {d.label}
                  </p>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.35)',
                      overflow: 'hidden',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {d.desc}
                  </motion.p>
                </div>
              </motion.li>
            </FadeIn>
          ))}
        </ul>

        <FadeIn delay={0.5}>
          <blockquote style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 16,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.9,
            borderLeft: '1px solid var(--gold)',
            paddingLeft: 24,
          }}>
            True beauty is dynamic.<br /><br />
            Dr. analyzes facial harmony in motion,<br />
            not just in still images.
          </blockquote>
        </FadeIn>
      </div>
    </section>
  )
}

export default FacialTuning
