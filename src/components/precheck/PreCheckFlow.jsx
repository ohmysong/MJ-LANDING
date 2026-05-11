import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from './ProgressBar'
import Step1BasicInfo     from './steps/Step1BasicInfo'
import Step2SkinScoring   from './steps/Step2SkinScoring'
import Step3TopPriorities  from './steps/Step3TopPriorities'
import Step4FaceAreaSelector from './steps/Step4FaceAreaSelector'
import Step4AestheticStyle from './steps/Step4AestheticStyle'
import Step5Budget        from './steps/Step5Budget'
import Step6Lifestyle     from './steps/Step6Lifestyle'
import Step7Medical       from './steps/Step7Medical'
import Step8PhotoUpload   from './steps/Step8PhotoUpload'
import Step9Complete      from './steps/Step9Complete'
import { EMPTY_CONCERNS } from '../../lib/precheck'
import { db } from '../../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function generateId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)
}

const TOTAL = 9

const variants = {
  enter: dir => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  dir => ({ x: dir > 0 ? -56 : 56, opacity: 0 }),
}

export default function PreCheckFlow() {
  const [step, setStep]       = useState(1)
  const [dir, setDir]         = useState(1)
  const [submitting, setSub]  = useState(false)
  const [submitErr, setErr]   = useState(null)
  const sessionId             = useRef(generateId()).current

  const [data, setData] = useState({
    concerns:      { ...EMPTY_CONCERNS },
    priorities:    [],
    aestheticStyle: '',
    imageUrls:     {},
    sessionId,
  })

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [step])

  const merge = patch => setData(p => ({ ...p, ...patch }))

  const go = (n, d) => { setDir(d); setStep(n) }
  const next = patch => { merge(patch); go(step + 1, 1) }
  const back = () => go(step - 1, -1)

  const handleFinalSubmit = async patch => {
    const full = { ...data, ...patch }
    setSub(true); setErr(null)
    try {
      await addDoc(collection(db, 'prechecks'), {
        ...full,
        status: 'submitted',
        createdAt: serverTimestamp(),
      })
      merge(patch)
      go(10, 1)
    } catch (err) {
      console.error(err)
      setErr('Submission failed. Please check your connection and try again.')
    } finally {
      setSub(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1BasicInfo     data={data.basicInfo ?? {}}        onNext={next} />
      case 2: return <Step2SkinScoring   data={data.concerns}               onNext={next} onBack={back} />
      case 3: return <Step3TopPriorities    concerns={data.concerns} selected={data.priorities} onNext={next} onBack={back} />
      case 4: return <Step4FaceAreaSelector data={data}                              onNext={next} onBack={back} />
      case 5: return <Step4AestheticStyle   value={data.aestheticStyle}              onNext={next} onBack={back} />
      case 6: return <Step5Budget           data={data.budget ?? {}}                 onNext={next} onBack={back} />
      case 7: return <Step6Lifestyle        data={data.lifestyle ?? {}}              onNext={next} onBack={back} />
      case 8: return <Step7Medical          data={data.medical ?? {}}                onNext={next} onBack={back} />
      case 9: return <Step8PhotoUpload      sessionId={sessionId} data={data.imageUrls} onNext={handleFinalSubmit} onBack={back} isSubmitting={submitting} />
      case 10: return <Step9Complete        name={data.basicInfo?.fullName ?? ''} />
      default: return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--warm-gray)' }}>
      {/* Fixed header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
        background: 'rgba(245,242,238,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--warm-gray2)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '20px 32px 16px' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: 16 }}>
            Maison Privé
          </p>
          {step < 9 && <ProgressBar step={step} total={TOTAL} />}
        </div>
      </header>

      {/* Content */}
      <main style={{ paddingTop: step < 9 ? 140 : 100, paddingBottom: 100, paddingLeft: 20, paddingRight: 20 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.36, ease: [0.16,1,0.3,1] }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {submitErr && (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 12, color: '#f87171', marginTop: 16 }}>
            {submitErr}
          </motion.p>
        )}
      </main>

      {/* Footer */}
      {step < 9 && (
        <footer style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'rgba(245,242,238,0.85)', backdropFilter: 'blur(8px)',
          borderTop: '1px solid var(--warm-gray2)',
          padding: '12px 0', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--muted-lt)', letterSpacing: '0.05em' }}>
            Curated Pre-Check · Maison Privé · All information handled with complete privacy
          </p>
        </footer>
      )}
    </div>
  )
}
