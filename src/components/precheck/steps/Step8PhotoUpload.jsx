import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import StepWrapper from '../StepWrapper'
import NavButtons from '../ui/NavButtons'
import { uploadImage } from '../../../lib/firebaseStorage'

const SLOTS = [
  { key: 'front',   label: 'Front Face',     desc: 'Looking directly at the camera, neutral expression' },
  { key: 'angle45', label: '45° Side Angle', desc: 'Slight turn, natural posture' },
  { key: 'concern', label: 'Concern Area',   desc: 'Any area you would like us to focus on' },
]

function DropZone({ slot, state, onFile }) {
  const onDrop = useCallback(files => { if (files[0]) onFile(files[0]) }, [onFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg','.jpeg','.png','.webp','.heic'] },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
  })

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>{slot.label}</p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)', marginBottom: 12, lineHeight: 1.5 }}>{slot.desc}</p>

      <div {...getRootProps()} style={{
        border: `2px dashed ${isDragActive ? 'var(--gold)' : 'var(--warm-gray2)'}`,
        background: isDragActive ? 'rgba(199,164,106,0.04)' : state.preview ? 'transparent' : '#fff',
        height: state.preview ? 'auto' : 120,
        aspectRatio: state.preview ? '4/3' : undefined,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.2s, background 0.2s',
      }}>
        <input {...getInputProps()} />
        <AnimatePresence>
          {state.preview ? (
            <motion.img key="img" src={state.preview} alt={slot.label}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <motion.div key="ph" style={{ textAlign: 'center', padding: '0 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--muted-lt)', margin: '0 auto 8px' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)' }}>
                {isDragActive ? 'Drop to upload' : 'Drag & drop or tap'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {state.uploading && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--warm-gray2)' }}>
            <motion.div style={{ height: '100%', background: 'var(--gold)' }} animate={{ width: `${state.progress}%` }} transition={{ duration: 0.2 }} />
          </div>
        )}
        {state.url && !state.uploading && (
          <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        )}
      </div>
      {state.error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#f87171', marginTop: 6 }}>{state.error}</p>}
    </div>
  )
}

export default function Step8PhotoUpload({ sessionId, data, onNext, onBack, isSubmitting }) {
  const [uploads, setUploads] = useState({
    front:   { progress: 0, uploading: false, url: data.front   || '' },
    angle45: { progress: 0, uploading: false, url: data.angle45 || '' },
    concern: { progress: 0, uploading: false, url: data.concern || '' },
  })

  const handleFile = async (slot, file) => {
    const preview = URL.createObjectURL(file)
    setUploads(p => ({ ...p, [slot]: { file, preview, progress: 0, uploading: true } }))
    try {
      const url = await uploadImage(file, sessionId, slot, pct =>
        setUploads(p => ({ ...p, [slot]: { ...p[slot], progress: pct } }))
      )
      setUploads(p => ({ ...p, [slot]: { ...p[slot], url, uploading: false, progress: 100 } }))
    } catch {
      setUploads(p => ({ ...p, [slot]: { ...p[slot], uploading: false, error: 'Upload failed. Please try again.' } }))
    }
  }

  const anyUploading = Object.values(uploads).some(u => u.uploading)

  return (
    <StepWrapper eyebrow="Step 8 · Reference Photos" title="Share reference photos." description="Optional but helpful. Photos allow our team to better understand your starting point and goals.">
      <form onSubmit={e => { e.preventDefault(); onNext({ imageUrls: { front: uploads.front.url, angle45: uploads.angle45.url, concern: uploads.concern.url } }) }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 16 }}>
          {SLOTS.map(slot => (
            <DropZone key={slot.key} slot={slot} state={uploads[slot.key]} onFile={f => handleFile(slot.key, f)} />
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)', marginBottom: 4 }}>Accepted: JPG, PNG, HEIC · Max 15 MB per photo</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted-lt)' }}>Photos are stored securely and shared only with your consultation team.</p>
        <NavButtons onBack={onBack} nextLabel="Complete My Pre-Check" loading={isSubmitting || anyUploading} disabled={anyUploading} />
      </form>
    </StepWrapper>
  )
}
