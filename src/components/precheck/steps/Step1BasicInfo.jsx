import { useState } from 'react'
import StepWrapper from '../StepWrapper'
import FormField from '../ui/FormField'
import NavButtons from '../ui/NavButtons'

const COUNTRIES = [
  'United States','Canada','United Kingdom','Australia','New Zealand',
  'Singapore','Japan','South Korea','China','Hong Kong','Taiwan',
  'Thailand','Indonesia','Malaysia','Philippines','Vietnam',
  'UAE','Saudi Arabia','Qatar','Kuwait',
  'Russia','Kazakhstan','France','Germany','Italy','Spain','Netherlands','Switzerland',
  'Brazil','Mexico','India','Other',
]
const LANGUAGES = ['English','Korean','Japanese','Mandarin Chinese','Cantonese','Russian','Thai','Indonesian','Arabic','French','Spanish','Portuguese','Other']
const GENDERS = ['Female','Male','Non-binary','Prefer not to say']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const YEARS = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i))
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))

function DOBDropdowns({ value, onChange }) {
  const [focusedField, setFocusedField] = useState(null)
  const { year = '', month = '', day = '' } = value || {}

  const update = (field, val) => onChange({ year, month, day, [field]: val })

  const selectStyle = (field) => ({
    width: '100%',
    background: '#fff',
    border: `1px solid ${focusedField === field ? 'var(--gold)' : 'var(--warm-gray2)'}`,
    color: (field === 'year' ? year : field === 'month' ? month : day) ? 'var(--black)' : '#aaa',
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    padding: '14px 36px 14px 18px',
    outline: 'none',
    transition: 'border-color 0.2s',
    WebkitAppearance: 'none',
    appearance: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  })

  const chevron = (field) => (
    <svg
      style={{
        position: 'absolute', right: 12, top: '50%',
        transform: focusedField === field ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
        pointerEvents: 'none',
        transition: 'transform 0.2s',
      }}
      width="11" height="6" viewBox="0 0 11 6" fill="none"
    >
      <path d="M1 1l4.5 4L10 1" stroke={focusedField === field ? 'var(--gold)' : '#bbb'} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )

  const wrap = (field, children) => (
    <div style={{ position: 'relative', flex: 1 }}>
      {children}
      {chevron(field)}
    </div>
  )

  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: focusedField ? 'var(--gold)' : 'var(--muted)',
        marginBottom: 10, transition: 'color 0.2s',
      }}>
        Date of Birth
      </label>
      <div style={{ display: 'flex', gap: 10 }}>
        {wrap('year',
          <select
            value={year}
            onChange={e => update('year', e.target.value)}
            onFocus={() => setFocusedField('year')}
            onBlur={() => setFocusedField(null)}
            style={{ ...selectStyle('year'), minWidth: 0 }}
          >
            <option value="" disabled>Year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        )}
        {wrap('month',
          <select
            value={month}
            onChange={e => update('month', e.target.value)}
            onFocus={() => setFocusedField('month')}
            onBlur={() => setFocusedField(null)}
            style={{ ...selectStyle('month'), minWidth: 0 }}
          >
            <option value="" disabled>Month</option>
            {MONTHS.map((m, i) => <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
          </select>
        )}
        {wrap('day',
          <select
            value={day}
            onChange={e => update('day', e.target.value)}
            onFocus={() => setFocusedField('day')}
            onBlur={() => setFocusedField(null)}
            style={{ ...selectStyle('day'), minWidth: 0 }}
          >
            <option value="" disabled>Day</option>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        )}
      </div>
    </div>
  )
}

export default function Step1BasicInfo({ data, onNext }) {
  const [form, setForm] = useState({
    fullName: '', country: '', city: '',
    preferredLanguage: '', age: '',
    dateOfBirth: { year: '', month: '', day: '' },
    gender: '',
    ...data,
  })
  const [errors, setErrors] = useState({})
  const set = k => v => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Please enter your name'
    if (!form.country) errs.country = 'Please select your country'
    if (Object.keys(errs).length) { setErrors(errs); return }
    onNext({ basicInfo: form })
  }

  const grid = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }

  return (
    <StepWrapper eyebrow="Step 1 · Welcome" title="Let us get to know you." description="A few details to personalise your consultation preparation.">
      <form onSubmit={handleSubmit}>
        <div style={grid}>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField label="Full Name" value={form.fullName} onChange={set('fullName')} placeholder="Your full name" error={errors.fullName} required />
          </div>
          <FormField label="Country" type="select" value={form.country} onChange={set('country')} options={COUNTRIES.map(c=>({value:c,label:c}))} placeholder="Select country" error={errors.country} required />
          <FormField label="City" value={form.city} onChange={set('city')} placeholder="Your city" />
          <FormField label="Preferred Language" type="select" value={form.preferredLanguage} onChange={set('preferredLanguage')} options={LANGUAGES.map(l=>({value:l,label:l}))} placeholder="Select language" />
          <FormField label="Age" type="number" value={form.age} onChange={set('age')} placeholder="Your age" min={1} max={120} />
          <div style={{ gridColumn: '1 / -1' }}>
            <DOBDropdowns value={form.dateOfBirth} onChange={set('dateOfBirth')} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField label="Gender" type="select" value={form.gender} onChange={set('gender')} options={GENDERS.map(g=>({value:g,label:g}))} placeholder="Select gender" />
          </div>
        </div>
        <style>{`@media(max-width:600px){.precheck-grid{grid-template-columns:1fr!important}}`}</style>
        <NavButtons showBack={false} />
      </form>
    </StepWrapper>
  )
}
