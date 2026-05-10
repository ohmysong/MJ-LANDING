import { useState } from 'react'
import StepWrapper from '../StepWrapper'
import FormField from '../ui/FormField'
import NavButtons from '../ui/NavButtons'

const FIELDS = [
  { key: 'indoorOutdoor', label: 'Daily Environment',   options: ['Mostly indoors','Mixed — indoors and outdoors','Mostly outdoors'] },
  { key: 'waterIntake',   label: 'Daily Water Intake',  options: ['Less than 1 litre','1 – 1.5 litres','1.5 – 2 litres','More than 2 litres'] },
  { key: 'smoking',       label: 'Smoking',             options: ['Non-smoker','Ex-smoker (quit 1+ years ago)','Ex-smoker (quit within a year)','Social smoker','Regular smoker'] },
  { key: 'alcohol',       label: 'Alcohol Frequency',   options: ['Never','Rarely (monthly)','Occasionally (weekly)','Frequently (several times per week)'] },
  { key: 'sleep',         label: 'Average Sleep',       options: ['Less than 5 hours','5 – 6 hours','6 – 7 hours','7 – 8 hours','More than 8 hours'] },
  { key: 'exercise',      label: 'Exercise Frequency',  options: ['Sedentary','Light (1–2×/week)','Moderate (3–4×/week)','Active (5+×/week)'] },
]

const EMPTY = { indoorOutdoor: '', waterIntake: '', smoking: '', alcohol: '', sleep: '', exercise: '' }

export default function Step6Lifestyle({ data, onNext, onBack }) {
  const [form, setForm] = useState({ ...EMPTY, ...data })
  const set = k => v => setForm(p => ({ ...p, [k]: v }))

  return (
    <StepWrapper eyebrow="Step 6 · Lifestyle" title="Your daily life." description="Lifestyle factors directly influence skin health. Share what feels comfortable.">
      <form onSubmit={e => { e.preventDefault(); onNext({ lifestyle: form }) }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
          {FIELDS.map(f => (
            <FormField key={f.key} label={f.label} type="select" value={form[f.key]} onChange={set(f.key)}
              options={f.options.map(o => ({ value: o, label: o }))} placeholder="Select an option" />
          ))}
        </div>
        <NavButtons onBack={onBack} />
      </form>
    </StepWrapper>
  )
}
