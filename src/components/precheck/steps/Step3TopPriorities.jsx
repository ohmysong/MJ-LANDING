import { useState, useMemo } from 'react'
import { Reorder, motion, AnimatePresence } from 'framer-motion'
import StepWrapper from '../StepWrapper'
import NavButtons from '../ui/NavButtons'
import { SKIN_CONCERNS } from '../../../lib/precheck'

/* ── Drag handle icon ── */
function GripIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, cursor: 'grab', color: 'var(--warm-gray2)' }}>
      <circle cx="5.5" cy="4"  r="1.2" fill="currentColor"/>
      <circle cx="10.5" cy="4"  r="1.2" fill="currentColor"/>
      <circle cx="5.5" cy="8"  r="1.2" fill="currentColor"/>
      <circle cx="10.5" cy="8"  r="1.2" fill="currentColor"/>
      <circle cx="5.5" cy="12" r="1.2" fill="currentColor"/>
      <circle cx="10.5" cy="12" r="1.2" fill="currentColor"/>
    </svg>
  )
}

/* ── Rank number badge ── */
function RankBadge({ n }) {
  return (
    <div style={{
      width: 32, height: 32, flexShrink: 0,
      border: `1px solid ${n <= 3 ? 'var(--gold)' : 'var(--warm-gray2)'}`,
      background: n <= 3 ? 'rgba(199,164,106,0.07)' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.25s',
    }}>
      <span style={{
        fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 300, lineHeight: 1,
        color: n <= 3 ? 'var(--gold)' : 'var(--muted-lt)',
        transition: 'color 0.25s',
      }}>
        {n}
      </span>
    </div>
  )
}

/* ── Score pip shown on chips & priority rows ── */
function ScorePip({ score }) {
  if (!score) return null
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      fontFamily: 'var(--font-sans)', fontSize: 9,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--muted-lt)',
    }}>
      <span style={{ color: 'var(--warm-gray2)' }}>·</span>
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--gold)' }}>{score}</span>
    </span>
  )
}

export default function Step3Priorities({ concerns, selected: init, onNext, onBack }) {
  /* Pre-sort all concerns by Step 2 score desc */
  const allSorted = useMemo(
    () => [...SKIN_CONCERNS].sort((a, b) => (concerns[b.key] ?? 0) - (concerns[a.key] ?? 0)),
    [concerns]
  )

  /* Priority list — pre-populate with scored ≥ 3 on first visit */
  const [priorities, setPriorities] = useState(() => {
    if (init.length > 0)
      return SKIN_CONCERNS
        .filter(c => init.includes(c.key))
        .sort((a, b) => init.indexOf(a.key) - init.indexOf(b.key))
    return allSorted.filter(c => (concerns[c.key] ?? 0) >= 3)
  })

  /* Pool = everything not in priorities */
  const pool = useMemo(
    () => allSorted.filter(c => !priorities.some(p => p.key === c.key)),
    [priorities, allSorted]
  )

  const addToPriority = concern =>
    setPriorities(p => [...p, concern])

  const removeFromPriority = key =>
    setPriorities(p => p.filter(c => c.key !== key))

  const handleSubmit = e => {
    e.preventDefault()
    onNext({ priorities: priorities.map(c => c.key) })
  }

  return (
    <StepWrapper
      eyebrow="Step 3 · Your Priorities"
      title="Build your priority list."
      description="Tap a concern below to add it. Drag within your list to reorder. Items left at the bottom are not prioritised."
    >
      <form onSubmit={handleSubmit}>

        {/* ── PRIORITY ZONE ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--black)' }}>
              My Priorities
              {priorities.length > 0 && (
                <span style={{ marginLeft: 8, color: 'var(--gold)' }}>{priorities.length}</span>
              )}
            </p>
            {priorities.length > 1 && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-lt)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M2 6l3 3 3-3M2 4l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Drag to reorder
              </span>
            )}
          </div>

          {/* Drop zone */}
          <div style={{
            minHeight: 90,
            border: `1.5px dashed ${priorities.length === 0 ? 'var(--warm-gray2)' : 'transparent'}`,
            background: priorities.length === 0 ? 'rgba(237,233,226,0.4)' : 'transparent',
            transition: 'all 0.25s',
            padding: priorities.length === 0 ? 0 : undefined,
          }}>
            {priorities.length === 0 ? (
              <div style={{ height: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--warm-gray2)' }}>
                  <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)', letterSpacing: '0.05em' }}>
                  Tap a concern below to add it here
                </p>
              </div>
            ) : (
              <Reorder.Group
                axis="y"
                values={priorities}
                onReorder={setPriorities}
                style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                {priorities.map((concern, idx) => (
                  <Reorder.Item
                    key={concern.key}
                    value={concern}
                    whileDrag={{
                      scale: 1.018,
                      boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
                      zIndex: 50,
                      borderColor: 'rgba(199,164,106,0.5)',
                    }}
                    style={{
                      listStyle: 'none',
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px',
                      background: '#fff',
                      border: '1px solid var(--warm-gray2)',
                      cursor: 'grab',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      touchAction: 'none',
                    }}
                  >
                    <RankBadge n={idx + 1} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--black)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {concern.label}
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {concern.sub}
                      </p>
                    </div>

                    <ScorePip score={concerns[concern.key]} />

                    {/* Remove button */}
                    <motion.button
                      type="button"
                      onClick={() => removeFromPriority(concern.key)}
                      whileHover={{ color: 'var(--black)' }}
                      whileTap={{ scale: 0.88 }}
                      style={{
                        width: 24, height: 24, flexShrink: 0,
                        border: '1px solid var(--warm-gray2)', background: 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--muted-lt)',
                        transition: 'color 0.15s, border-color 0.15s',
                      }}
                      title="Remove from priorities"
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </motion.button>

                    <GripIcon />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </div>
        </div>

        {/* ── POOL ZONE ── */}
        <AnimatePresence>
          {pool.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
                Other Concerns
                <span style={{ marginLeft: 6, fontWeight: 400, color: 'var(--muted-lt)' }}>— tap to add</span>
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <AnimatePresence>
                  {pool.map(concern => (
                    <motion.button
                      key={concern.key}
                      type="button"
                      onClick={() => addToPriority(concern)}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88 }}
                      whileHover={{ borderColor: 'rgba(199,164,106,0.7)', color: 'var(--black)' }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '9px 14px',
                        border: '1px solid var(--warm-gray2)',
                        background: '#fff',
                        fontFamily: 'var(--font-sans)', fontSize: 11,
                        color: 'var(--muted)', cursor: 'pointer',
                        transition: 'border-color 0.15s, color 0.15s',
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ flexShrink: 0, color: 'var(--gold)', opacity: 0.7 }}>
                        <path d="M4.5 1v7M1 4.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      {concern.label}
                      <ScorePip score={concerns[concern.key]} />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <NavButtons onBack={onBack} disabled={priorities.length === 0} nextLabel="Continue" />
      </form>
    </StepWrapper>
  )
}
