import { motion } from 'framer-motion'

const socials = [
  { label: 'in',    href: 'https://linkedin.com/company/v-edc' },
  { label: '𝕏',    href: 'https://x.com/v_edc'               },
  { label: 'Insta', href: 'https://instagram.com/v_edc'        },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(201,168,76,0.1)',
      background: '#0d0d14',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 'clamp(0.75rem, 2vw, 1rem)',
      padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 3.5rem)',
    }}>
      <span className="font-display" style={{ color: '#c9a84c', fontSize: 'clamp(0.65rem, 2vw, 0.875rem)' }}>
        E-Summit Pune '26
      </span>

      <p className="font-cinzel uppercase text-center" style={{ fontSize: 'clamp(0.5rem, 1.3vw, 0.62rem)', letterSpacing: '0.3em', color: '#6e6e88' }}>
        Ascension to Reign &nbsp;·&nbsp; 
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.5vw, 12px)', flexWrap: 'wrap' }}>
        {socials.map(({ label, href }) => (
          <motion.a key={label} href={href} target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.08, color: '#c9a84c' }}
            className="font-cinzel uppercase"
            style={{
              fontSize: 'clamp(0.48rem, 1.2vw, 0.58rem)', letterSpacing: '0.2em',
              padding: 'clamp(3px, 0.8vw, 5px) clamp(8px, 2vw, 12px)',
              color: '#6e6e88', border: '1px solid rgba(201,168,76,0.15)', textDecoration: 'none',
            }}>
            {label}
          </motion.a>
        ))}
        <p className="font-cinzel" style={{ fontSize: 'clamp(0.45rem, 1vw, 0.55rem)', letterSpacing: '0.2em', color: '#4a4a5a' }}>
          © 2026 E-Cell VIT Pune
        </p>
      </div>
    </footer>
  )
}
