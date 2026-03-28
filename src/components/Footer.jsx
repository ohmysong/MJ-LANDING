import React from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Treatments', href: '#beauty-focus' },
  { label: 'Approach', href: '#approach' },
  { label: 'Concierge', href: '#concierge' },
  { label: 'Privacy Policy', href: '#' },
]

const Footer = () => (
  <footer style={{
    background: '#080808',
    padding: '56px 48px',
    borderTop: '1px solid rgba(199,164,106,0.1)',
  }}>
    <div style={{
      maxWidth: 'var(--container)', margin: '0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 24,
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 22, fontWeight: 400,
        color: '#fff', letterSpacing: '0.1em',
      }}>
        Maison <span style={{ color: 'var(--gold)' }}>Privé</span>
      </div>

      <ul style={{ display: 'flex', gap: 32, flexWrap: 'wrap', listStyle: 'none' }}>
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10, fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 11, color: 'rgba(255,255,255,0.18)',
        letterSpacing: '0.05em',
      }}>
        © 2026 Maison Privé · All rights reserved
      </p>
    </div>
  </footer>
)

export default Footer
