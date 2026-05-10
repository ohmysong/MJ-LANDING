import { useState } from 'react'
import StepWrapper from '../StepWrapper'
import FormField from '../ui/FormField'
import NavButtons from '../ui/NavButtons'

const FIELDS = [
  { key: 'allergies',        label: 'Known Allergies',                 placeholder: 'Any known allergies to medications, materials, or substances…' },
  { key: 'medications',      label: 'Current Medications',             placeholder: 'Prescription or ongoing medications…' },
  { key: 'supplements',      label: 'Supplements',                     placeholder: 'Vitamins, herbal supplements, or other…' },
  { key: 'recentProcedures', label: 'Recent Aesthetic Procedures',     placeholder: 'Any procedures in the past 6–12 months…' },
  { key: 'anesthesia',       label: 'Sedation or Anesthesia History',  placeholder: 'Any reactions or concerns with anesthesia…' },
  { key: 'keloid',           label: 'Keloid or Scarring Tendency',     placeholder: 'History of keloid formation or abnormal scarring…' },
  { key: 'conditions',       label: 'Underlying Medical Conditions',   placeholder: 'Any ongoing health conditions relevant to treatment…', wide: true },
]

const EMPTY = { allergies: '', medications: '', supplements: '', recentProcedures: '', anesthesia: '', keloid: '', conditions: '' }

export default function Step7Medical({ data, onNext, onBack }) {
  const [form, setForm] = useState({ ...EMPTY, ...data })
  const set = k => v => setForm(p => ({ ...p, [k]: v }))

  return (
    <StepWrapper eyebrow="Step 7 · Health Profile" title="Your health background." description="Share only what you are comfortable disclosing. All fields are optional.">
      <form onSubmit={e => { e.preventDefault(); onNext({ medical: form }) }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 32 }}>
          {FIELDS.map(f => (
            <div key={f.key} style={f.wide ? { gridColumn: '1 / -1' } : {}}>
              <FormField label={f.label} type="textarea" value={form[f.key]} onChange={set(f.key)} placeholder={f.placeholder} rows={f.wide ? 4 : 2} />
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid var(--warm-gray2)', background: '#fff', padding: '20px 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Consultation Preparation Only</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.8 }}>
            This information is used solely for consultation preparation purposes.
            Final medical decisions and treatment recommendations are determined exclusively
            by the clinic's licensed medical professionals during your personal consultation.
          </p>
        </div>

        <NavButtons onBack={onBack} />
      </form>
    </StepWrapper>
  )
}
