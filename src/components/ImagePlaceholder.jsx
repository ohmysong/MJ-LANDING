import React from 'react'

const ImagePlaceholder = ({ label, desc, style, className, dark = false }) => {
  const base = {
    width: '100%',
    height: '100%',
    minHeight: 300,
    background: dark ? '#1c1a17' : '#e6ddd2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
    ...style,
  }

  return (
    <div className={className} style={base}>
      {/* Subtle diagonal lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`diag-${label}`} width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="28" stroke="#c7a46a" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#diag-${label})`} />
      </svg>

      {/* Icon ring */}
      <div style={{
        width: 52, height: 52,
        borderRadius: '50%',
        border: '1px solid rgba(199,164,106,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="rgba(199,164,106,0.7)" strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>

      {label && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(199,164,106,0.8)',
          position: 'relative', zIndex: 1,
        }}>
          {label}
        </p>
      )}
      {desc && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(100,80,60,0.5)',
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          padding: '0 24px',
          lineHeight: 1.6,
        }}>
          {desc}
        </p>
      )}
    </div>
  )
}

export default ImagePlaceholder
