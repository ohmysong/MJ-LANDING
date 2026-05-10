import { motion } from 'framer-motion'
import { STEP_NAMES } from '../../lib/precheck'

export default function ProgressBar({ step, total = 8 }) {
  const pct = Math.min((step / total) * 100, 100)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {STEP_NAMES[step] ?? ''}
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-lt)' }}>
          {step <= total ? `${step} / ${total}` : 'Complete'}
        </span>
      </div>
      <div style={{ height: 1, background: 'var(--warm-gray2)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', inset: '0 auto 0 0', background: 'var(--gold)' }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
