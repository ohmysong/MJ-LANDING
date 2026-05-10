import { useState } from 'react'
import { motion } from 'framer-motion'
import StepWrapper from '../StepWrapper'
import NavButtons from '../ui/NavButtons'

const RANGES = [
  { value: 'under_5m',  label: '₩5M 미만',    sub: 'Under ₩5,000,000' },
  { value: '5m_10m',   label: '₩5M – ₩10M',  sub: '₩5,000,000 – ₩10,000,000' },
  { value: '10m_15m',  label: '₩10M – ₩15M', sub: '₩10,000,000 – ₩15,000,000' },
  { value: '15m_20m',  label: '₩15M – ₩20M', sub: '₩15,000,000 – ₩20,000,000' },
  { value: '20m_30m',  label: '₩20M – ₩30M', sub: '₩20,000,000 – ₩30,000,000' },
  { value: 'over_30m', label: '₩30M 이상',    sub: 'Over ₩30,000,000' },
]

const FLEXIBILITY = [
  { value: 'fixed',             label: 'Fixed Budget',               desc: 'I have a firm limit I cannot exceed' },
  { value: 'slightly_flexible', label: 'Slightly Flexible',          desc: 'I can adjust if results warrant it' },
  { value: 'flexible',          label: 'Flexible for Better Results', desc: 'Quality is the priority over cost' },
]

export default function Step5Budget({ data, onNext, onBack }) {
  const [range, setRange] = useState(data.range || '')
  const [flexibility, setFlex] = useState(data.flexibility || '')

  const cardBtn = isSel => ({
    textAlign: 'left', padding: '20px 20px',
    border: `1px solid ${isSel ? 'var(--gold)' : 'var(--warm-gray2)'}`,
    background: isSel ? 'rgba(199,164,106,0.04)' : '#fff',
    cursor: 'pointer', transition: 'all 0.2s',
  })

  return (
    <StepWrapper eyebrow="Step 5 · Investment" title="Your consultation investment." description="Understanding your budget allows us to curate the most appropriate treatment options for your goals.">
      <form onSubmit={e => { e.preventDefault(); if (range && flexibility) onNext({ budget: { range, flexibility } }) }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>Budget Range</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {RANGES.map(r => (
            <motion.button key={r.value} type="button" onClick={() => setRange(r.value)} whileTap={{ scale: 0.97 }} style={cardBtn(range === r.value)}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300, color: range === r.value ? 'var(--gold)' : 'var(--black)', transition: 'color 0.2s' }}>{r.label}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--muted-lt)', marginTop: 4 }}>{r.sub}</p>
            </motion.button>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>Budget Flexibility</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FLEXIBILITY.map(f => (
            <motion.button key={f.value} type="button" onClick={() => setFlex(f.value)} whileTap={{ scale: 0.99 }}
              style={{ ...cardBtn(flexibility === f.value), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--black)' }}>{f.label}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)', marginTop: 2 }}>{f.desc}</p>
              </div>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${flexibility === f.value ? 'var(--gold)' : 'var(--warm-gray2)'}`, background: flexibility === f.value ? 'var(--gold)' : 'transparent', flexShrink: 0, transition: 'all 0.2s' }} />
            </motion.button>
          ))}
        </div>
        <NavButtons onBack={onBack} disabled={!range || !flexibility} />
        <style>{`@media(max-width:540px){.budget-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </form>
    </StepWrapper>
  )
}
