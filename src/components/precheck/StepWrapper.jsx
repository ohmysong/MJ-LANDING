export default function StepWrapper({ eyebrow, title, description, children, maxWidth = 680 }) {
  return (
    <div style={{ maxWidth, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        {eyebrow && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            {eyebrow}
          </p>
        )}
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300, color: 'var(--black)', lineHeight: 1.15 }}>
          {title}
        </h1>
        {description && (
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontStyle: 'italic', color: 'var(--muted)', marginTop: 12, lineHeight: 1.7 }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}
