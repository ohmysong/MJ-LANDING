import { motion } from 'framer-motion'

export default function NavButtons({ onBack, showBack = true, nextLabel = 'Continue', loading = false, disabled = false }) {
  const isDisabled = disabled || loading

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: showBack ? 'space-between' : 'flex-end', marginTop: 40 }}>
      {showBack && (
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ x: -3 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', background: 'none', border: 'none',
            cursor: 'pointer', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </motion.button>
      )}

      <motion.button
        type="submit"
        disabled={isDisabled}
        whileHover={!isDisabled ? { opacity: 0.88 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          padding: '14px 28px',
          background: isDisabled ? 'var(--warm-gray2)' : 'var(--gold)',
          color: isDisabled ? 'var(--muted)' : '#111',
          border: 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {loading ? (
          <>
            <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Processing…
          </>
        ) : (
          <>
            {nextLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </motion.button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
