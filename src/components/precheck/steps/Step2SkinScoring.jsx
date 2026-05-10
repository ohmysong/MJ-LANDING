import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepWrapper from '../StepWrapper'
import NavButtons from '../ui/NavButtons'
import { SKIN_CONCERNS, EMPTY_CONCERNS } from '../../../lib/precheck'

const SCORE_LABELS = ['', 'Minimal', 'Low', 'Moderate', 'High', 'Priority']

function ScoreCard({ label, sub, value, onChange }) {
  const [hovered, setHovered] = useState(null)
  const active = hovered ?? value

  return (
    <motion.div
      layout
      style={{
        border: `1px solid ${value > 0 ? 'rgba(199,164,106,0.35)' : 'var(--warm-gray2)'}`,
        background: value > 0 ? 'rgba(199,164,106,0.02)' : '#fff',
        padding: '20px 22px',
        transition: 'border-color 0.25s, background 0.25s',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ flex: 1, paddingRight: 12 }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--black)', marginBottom: 3 }}>{label}</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)', lineHeight: 1.5 }}>{sub}</p>
        </div>
        <AnimatePresence mode="wait">
          {value > 0 ? (
            <motion.span
              key={value}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--gold)', flexShrink: 0,
              }}
            >
              {SCORE_LABELS[value]}
            </motion.span>
          ) : (
            <motion.span
              key="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-lt)', flexShrink: 0 }}
            >
              Not rated
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Score buttons */}
      <div style={{ display: 'flex', gap: 5 }}>
        {[1, 2, 3, 4, 5].map(n => {
          const isSelected = n === value
          const isHovered  = n === hovered
          return (
            <motion.button
              key={n}
              type="button"
              onClick={() => onChange(n === value ? 0 : n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(null)}
              whileTap={{ scale: 0.88 }}
              style={{
                flex: 1, height: 40,
                border: `1px solid ${isSelected ? 'var(--gold)' : isHovered ? 'rgba(199,164,106,0.6)' : 'var(--warm-gray2)'}`,
                background: isSelected ? 'var(--gold)' : isHovered ? 'rgba(199,164,106,0.08)' : '#fff',
                color: isSelected ? '#fff' : isHovered ? 'var(--gold-dark)' : 'var(--muted)',
                fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s',
                position: 'relative',
              }}
            >
              {n}
              {/* Active indicator dot */}
              {isSelected && (
                <motion.div
                  layoutId={`dot-${label}`}
                  style={{
                    position: 'absolute', bottom: 4, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 3, height: 3, borderRadius: '50%',
                    background: '#fff',
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Scale labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-lt)' }}>Minimal</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-lt)' }}>Highest</span>
      </div>
    </motion.div>
  )
}

export default function Step2SkinScoring({ data, onNext, onBack }) {
  const [scores, setScores] = useState({ ...EMPTY_CONCERNS, ...data })
  const set = key => n => setScores(p => ({ ...p, [key]: n }))
  const scored = Object.values(scores).filter(v => v > 0).length

  return (
    <StepWrapper
      eyebrow="Step 2 · Skin Assessment"
      title="Rate your skin concerns."
      description="Select a level for each concern. Tap the same number again to clear. Skip anything that doesn't apply."
    >
      <form onSubmit={e => { e.preventDefault(); onNext({ concerns: scores }) }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {SKIN_CONCERNS.map(({ key, label, sub }) => (
            <ScoreCard key={key} label={label} sub={sub} value={scores[key]} onChange={set(key)} />
          ))}
        </div>

        <AnimatePresence>
          {scored > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 24 }}
            >
              {scored} of {SKIN_CONCERNS.length} concerns rated
            </motion.p>
          )}
        </AnimatePresence>

        <NavButtons onBack={onBack} />

        <style>{`@media(max-width:580px){ .score-grid { grid-template-columns: 1fr !important; } }`}</style>
      </form>
    </StepWrapper>
  )
}
