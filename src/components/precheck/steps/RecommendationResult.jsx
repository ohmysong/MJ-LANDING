import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { generateRecommendation, formatPriceKRW } from '../../../lib/recommendationEngine.js'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay },
})

const CATEGORY_ICONS = {
  'Lifting & Firming':    '◈',
  'Lifting & Contouring': '◈',
  'Volume & Contouring':  '◇',
  'Expression Lines':     '—',
  'Eye Area':             '○',
  'Brightening & Clarity':'◉',
  'Acne & Clarifying':    '◎',
  'Hydration & Glow':     '◌',
}

function parseBoldText(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ fontWeight: 500, color: 'var(--black)' }}>{part}</strong>
      : part
  )
}

function TreatmentCard({ treatment, index }) {
  return (
    <motion.div
      {...fadeUp(0.1 + index * 0.08)}
      style={{
        borderTop: '1px solid var(--warm-gray2)',
        paddingTop: 28,
        paddingBottom: 28,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '16px 32px',
        alignItems: 'start',
      }}
    >
      <div>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 8,
        }}>
          {treatment.tagline}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(18px,2.4vw,22px)',
          fontWeight: 400,
          color: 'var(--black)',
          marginBottom: 4,
          lineHeight: 1.25,
        }}>
          {treatment.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          color: 'var(--muted-lt)',
          letterSpacing: '0.1em',
          marginBottom: 14,
        }}>
          {treatment.nameKr}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: 'var(--muted)',
          lineHeight: 1.85,
          maxWidth: 520,
        }}>
          {treatment.description}
        </p>
      </div>

      <div style={{ textAlign: 'right', whiteSpace: 'nowrap', paddingTop: 6 }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 9,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--muted-lt)',
          marginBottom: 6,
        }}>
          From
        </p>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(15px,2vw,18px)',
          fontWeight: 400,
          color: 'var(--black)',
        }}>
          {formatPriceKRW(treatment.price)}
        </p>
      </div>
    </motion.div>
  )
}

function CategorySection({ category, treatments, sectionIndex }) {
  return (
    <motion.div
      {...fadeUp(0.2 + sectionIndex * 0.1)}
      style={{ marginBottom: 16 }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 4,
        paddingBottom: 16,
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: 'var(--gold-light)',
        }}>
          {CATEGORY_ICONS[category] || '·'}
        </span>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--black)',
        }}>
          {category}
        </p>
      </div>

      {treatments.map((t, i) => (
        <TreatmentCard key={t.id} treatment={t} index={i} />
      ))}
    </motion.div>
  )
}

export default function RecommendationResult({ data }) {
  const firstName = data?.basicInfo?.fullName?.split(' ')[0] || ''
  const result = useMemo(() => generateRecommendation(data ?? {}), [data])

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px 120px' }}>

      {/* ── Submission confirmed ──────────────────────────────────── */}
      <motion.div
        {...fadeUp(0)}
        style={{
          textAlign: 'center',
          paddingBottom: 72,
          borderBottom: '1px solid var(--warm-gray2)',
          marginBottom: 72,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.1 }}
          style={{
            width: 56,
            height: 56,
            border: '1px solid var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 36px',
          }}
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M1 8l6 6L19 1" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <motion.div {...fadeUp(0.25)}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 20,
          }}>
            Maison Privé · Pre-Check Submitted
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(30px,5vw,48px)',
            fontWeight: 300,
            color: 'var(--black)',
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            {firstName ? `Thank you, ${firstName}.` : 'Thank you.'}
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 16,
            fontStyle: 'italic',
            color: 'var(--muted)',
            lineHeight: 1.75,
            maxWidth: 400,
            margin: '0 auto',
          }}>
            Your pre-check has been received. Below is a preliminary treatment outline based on your profile.
          </p>
        </motion.div>
      </motion.div>

      {/* ── Recommendation header ─────────────────────────────────── */}
      <motion.div {...fadeUp(0.35)} style={{ marginBottom: 56 }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 16,
        }}>
          Your Curated Treatment Plan
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(26px,4vw,38px)',
          fontWeight: 300,
          color: 'var(--black)',
          lineHeight: 1.2,
          marginBottom: 32,
        }}>
          A journey crafted for you
        </h2>

        {/* Narrative paragraph */}
        {result.narrative && (
          <div style={{
            background: 'rgba(199,164,106,0.06)',
            border: '1px solid rgba(199,164,106,0.2)',
            borderLeft: '3px solid var(--gold)',
            padding: '28px 32px',
            borderRadius: 2,
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13.5,
              color: 'var(--black)',
              lineHeight: 1.9,
            }}>
              {parseBoldText(result.narrative)}
            </p>
          </div>
        )}
      </motion.div>

      {/* ── Treatment groups ──────────────────────────────────────── */}
      {result.groups.length > 0 ? (
        <div style={{ marginBottom: 80 }}>
          {result.groups.map((group, i) => (
            <CategorySection
              key={group.category}
              category={group.category}
              treatments={group.treatments}
              sectionIndex={i}
            />
          ))}
        </div>
      ) : (
        <motion.div {...fadeUp(0.4)} style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontStyle: 'italic' }}>
            Your personalised plan will be prepared by our specialists.
          </p>
        </motion.div>
      )}

      {/* ── Investment summary ────────────────────────────────────── */}
      {result.treatmentCount > 0 && (
        <motion.div
          {...fadeUp(0.5)}
          style={{
            borderTop: '1px solid var(--black)',
            borderBottom: '1px solid var(--warm-gray2)',
            padding: '32px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 80,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 8,
            }}>
              Estimated Investment · {result.treatmentCount} Protocol{result.treatmentCount > 1 ? 's' : ''}
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px,4vw,36px)',
              fontWeight: 300,
              color: 'var(--black)',
              letterSpacing: '-0.01em',
            }}>
              From {formatPriceKRW(result.totalCost)}
            </p>
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            color: 'var(--muted)',
            lineHeight: 1.7,
            maxWidth: 280,
          }}>
            Final investment will be confirmed following your in-person consultation with our specialist physician.
          </p>
        </motion.div>
      )}

      {/* ── Disclaimer & next steps ───────────────────────────────── */}
      <motion.div {...fadeUp(0.55)} style={{ marginBottom: 72 }}>
        <div style={{
          padding: '28px 32px',
          background: 'var(--warm-gray)',
          border: '1px solid var(--warm-gray2)',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--muted-lt)',
            marginBottom: 12,
          }}>
            Please Note
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.85,
          }}>
            This preliminary plan is generated from your pre-check responses and is intended as a starting point for your consultation. Treatment suitability, exact protocols, and pricing will be assessed and confirmed by our physician during your in-person visit. Individual results may vary.
          </p>
        </div>
      </motion.div>

      {/* ── Contact info ──────────────────────────────────────────── */}
      <motion.div {...fadeUp(0.6)} style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ width: 1, height: 48, background: 'var(--warm-gray2)', margin: '0 auto 36px' }} />
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          color: 'var(--muted)',
          lineHeight: 1.9,
          maxWidth: 400,
          margin: '0 auto 8px',
        }}>
          The MAK consultation team will review your profile and be in touch within 24–48 hours to confirm your appointment.
        </p>
      </motion.div>

      {/* ── Closing ───────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 14,
          fontStyle: 'italic',
          color: 'var(--muted-lt)',
          textAlign: 'center',
        }}
      >
        We look forward to welcoming you.
      </motion.p>
    </div>
  )
}
