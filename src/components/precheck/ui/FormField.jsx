import { useState } from 'react'

export default function FormField({ label, type = 'text', value, onChange, placeholder, error, required, options, rows = 3 }) {
  const [focused, setFocused] = useState(false)

  const fieldStyle = {
    width: '100%',
    background: '#fff',
    border: `1px solid ${focused ? 'var(--gold)' : error ? '#f87171' : 'var(--warm-gray2)'}`,
    color: 'var(--black)',
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    padding: '14px 18px',
    outline: 'none',
    transition: 'border-color 0.2s',
    WebkitAppearance: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: focused ? 'var(--gold)' : 'var(--muted)',
    marginBottom: 10,
    transition: 'color 0.2s',
  }

  return (
    <div>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--gold)', marginLeft: 4 }}>·</span>}
      </label>

      {type === 'select' ? (
        <div style={{ position: 'relative' }}>
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...fieldStyle, cursor: 'pointer', paddingRight: 40 }}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)' }}
            width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1l5 5 5-5" stroke="var(--muted)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>

      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={rows}
          style={{ ...fieldStyle, resize: 'none', lineHeight: 1.7 }}
        />

      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={fieldStyle}
        />
      )}

      {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#f87171', marginTop: 6 }}>{error}</p>}
    </div>
  )
}
