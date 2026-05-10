import { useState } from 'react'
import { motion } from 'framer-motion'
import StepWrapper from '../StepWrapper'
import NavButtons from '../ui/NavButtons'

const OPTIONS = [
  { value: 'natural',    marker: '01', title: 'Natural Enhancement',      subtitle: 'Subtle & refined',    description: 'Delicate refinements that elevate your natural features. Results are personal — a renewed confidence only you will fully notice.' },
  { value: 'noticeable', marker: '02', title: 'Noticeable Improvement',   subtitle: 'Visible & harmonious', description: 'A clearly visible transformation that remains true to your facial harmony. Others will recognise the change.' },
  { value: 'dramatic',   marker: '03', title: 'Dramatic Transformation',  subtitle: 'Bold & elevated',     description: 'Significant, unapologetic change. A purposeful reinvention of your appearance that speaks clearly and confidently.' },
]

export default function Step4AestheticStyle({ value: init, onNext, onBack }) {
  const [selected, setSelected] = useState(init || '')

  return (
    <StepWrapper eyebrow="Step 4 · Aesthetic Goals" title="How do you envision your result?" description="There is no wrong answer. This simply helps us understand the direction that resonates with you.">
      <form onSubmit={e => { e.preventDefault(); if (selected) onNext({ aestheticStyle: selected }) }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {OPTIONS.map(opt => {
            const isSel = selected === opt.value
            return (
              <motion.button
                key={opt.value} type="button"
                onClick={() => setSelected(opt.value)}
                whileTap={{ scale: 0.99 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 24, textAlign: 'left',
                  padding: '28px 32px',
                  border: `1px solid ${isSel ? 'var(--gold)' : 'var(--warm-gray2)'}`,
                  background: isSel ? 'rgba(199,164,106,0.03)' : '#fff',
                  cursor: 'pointer', transition: 'all 0.25s',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 300, lineHeight: 1, color: isSel ? 'var(--gold)' : 'var(--warm-gray2)', flexShrink: 0, marginTop: 4, transition: 'color 0.25s' }}>
                  {opt.marker}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 300, color: 'var(--black)' }}>{opt.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: isSel ? 'var(--gold)' : 'var(--muted)', marginTop: 4, transition: 'color 0.25s' }}>{opt.subtitle}</p>
                    </div>
                    <div style={{ width: 20, height: 20, border: `2px solid ${isSel ? 'var(--gold)' : 'var(--warm-gray2)'}`, background: isSel ? 'var(--gold)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4, transition: 'all 0.2s' }}>
                      {isSel && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.7, marginTop: 12 }}>{opt.description}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
        <NavButtons onBack={onBack} disabled={!selected} />
      </form>
    </StepWrapper>
  )
}
