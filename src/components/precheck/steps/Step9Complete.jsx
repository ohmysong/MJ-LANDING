import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Step9Complete({ name }) {
  const first = name?.split(' ')[0] || ''
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.1 }}
        style={{ width: 64, height: 64, border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}
      >
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
          <path d="M1 9l7 7L21 1" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.3 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
          Maison Privé
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--black)', lineHeight: 1.15, marginBottom: 24 }}>
          {first ? `Thank you, ${first}.` : 'Thank you.'}
        </h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 40px' }}>
          Your curated pre-check has been submitted successfully.
        </p>
        <div style={{ width: 1, height: 40, background: 'var(--warm-gray2)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.9, maxWidth: 400, margin: '0 auto' }}>
          The MAK consultation team will carefully review your information and prepare a personalised consultation summary for Maison Privé.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)', marginTop: 32, letterSpacing: '0.05em' }}>
          You will be contacted within 24–48 hours.
        </p>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
        style={{ fontFamily: 'var(--font-serif)', fontSize: 13, fontStyle: 'italic', color: 'var(--muted-lt)', marginTop: 64 }}>
        We look forward to welcoming you.
      </motion.p>
    </div>
  )
}
