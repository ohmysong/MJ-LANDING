import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

const countries = [
  'United States', 'United Kingdom', 'Singapore', 'Hong Kong', 'UAE',
  'Australia', 'Japan', 'China', 'France', 'Germany', 'Canada', 'Other',
]

const Consultation = () => {
  const [form, setForm] = useState({ name: '', country: '', contact: '', date: '', concern: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="consultation" style={{
      padding: 'var(--section-pad) 48px',
      background: 'var(--black)',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 16,
          }}>
            Private Consultation
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(38px, 6vw, 60px)',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 14,
          }}>
            Begin Your Beauty<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Aging Journey</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 17, fontStyle: 'italic',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 40,
          }}>
            Private consultation with Dr. —
          </p>

          {/* Pre-Check CTA */}
          <div style={{
            border: '1px solid rgba(199,164,106,0.2)',
            padding: '32px 40px',
            marginBottom: 56,
            textAlign: 'left',
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 10,
            }}>
              Recommended First Step
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 300,
              color: '#fff', marginBottom: 8,
            }}>
              Begin with a Curated Pre-Check
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 14, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.35)', marginBottom: 24, lineHeight: 1.7,
            }}>
              Share your skin concerns, goals, and lifestyle — so we can prepare
              a personalised consultation plan before your visit.
            </p>
            <motion.a
              href="/precheck"
              whileHover={{ opacity: 0.85 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                background: 'var(--gold)', color: '#111',
                padding: '14px 28px',
                textDecoration: 'none',
              }}
            >
              Start My Pre-Check
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ padding: '64px 0', textAlign: 'center' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  border: '1px solid var(--gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: 28,
                fontWeight: 300, color: '#fff', marginBottom: 12,
              }}>
                Thank you
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'rgba(255,255,255,0.35)', lineHeight: 1.8,
              }}>
                Your inquiry has been received.<br />
                We will be in touch with complete discretion.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              style={{ textAlign: 'left' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <style>{`
                  @media (max-width: 600px) {
                    .cta-form-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>

                <FormField label="Name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                <FormField label="Country" name="country" type="select" value={form.country} onChange={handleChange} required>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </FormField>
                <FormField label="Contact (Email or WhatsApp)" name="contact" placeholder="your@email.com · +1 234 567 8900" value={form.contact} onChange={handleChange} required />
                <FormField label="Preferred Date" name="date" placeholder="e.g. April 2026 or flexible" value={form.date} onChange={handleChange} />
                <div style={{ gridColumn: '1 / -1' }}>
                  <FormField label="Primary Concern" name="concern" type="textarea" placeholder="Tell us about your aesthetic goals or concerns…" value={form.concern} onChange={handleChange} />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ opacity: 0.88 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', marginTop: 8,
                  background: 'var(--gold)', color: '#111',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: 20, border: 'none',
                  cursor: 'pointer',
                }}
              >
                Request Consultation
              </motion.button>

              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 11,
                color: 'rgba(255,255,255,0.2)',
                textAlign: 'center', marginTop: 20,
                letterSpacing: '0.05em',
              }}>
                All inquiries are handled with complete privacy and discretion.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

const FormField = ({ label, name, type = 'input', placeholder, value, onChange, required, children }) => {
  const [focused, setFocused] = React.useState(false)
  const sharedStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
    color: '#fff',
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    padding: '16px 20px',
    outline: 'none',
    transition: 'border-color 0.2s',
    WebkitAppearance: 'none',
  }

  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: focused ? 'rgba(199,164,106,0.8)' : 'rgba(255,255,255,0.35)',
        marginBottom: 10,
        transition: 'color 0.2s',
      }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name} value={value} onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, resize: 'vertical', minHeight: 100 }}
        />
      ) : type === 'select' ? (
        <select
          name={name} value={value} onChange={onChange} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, cursor: 'pointer' }}
        >
          <option value="" disabled>Select country</option>
          {children}
        </select>
      ) : (
        <input
          type="text" name={name} value={value} onChange={onChange}
          placeholder={placeholder} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </div>
  )
}

export default Consultation
