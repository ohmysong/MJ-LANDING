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
const AGE_RANGES = ['Under 20','20–29','30–39','40–49','50–59','60+']
const GENDERS = ['Female','Male','Non-binary','Prefer not to say']

export default function Step1BasicInfo({ data, onNext }) {
  const [form, setForm] = useState({ fullName: '', country: '', city: '', preferredLanguage: '', ageRange: '', gender: '', ...data })
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
          <FormField label="Age Range" type="select" value={form.ageRange} onChange={set('ageRange')} options={AGE_RANGES.map(a=>({value:a,label:a}))} placeholder="Select age range" />
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
