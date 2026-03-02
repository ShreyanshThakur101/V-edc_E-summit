import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RUNE_CHARS = ['᛭','ᚱ','ᚠ','ᛟ','ᚺ','ᛊ','ᚷ','ᚹ','ᛈ','ᛏ']

export default function Preloader({ onComplete }) {
  const [count,   setCount]   = useState(0)
  const [runes,   setRunes]   = useState(Array(6).fill('᛭'))
  const [done,    setDone]    = useState(false)

  useEffect(() => {
    const start = performance.now()
    const dur   = 2200
    const tick  = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 300)
    }
    requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      setRunes(r => r.map(() => RUNE_CHARS[Math.floor(Math.random() * RUNE_CHARS.length)]))
    }, 90)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 700)
      return () => clearTimeout(t)
    }
  }, [done, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="loader"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76,0,0.24,1] } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: '#030305',
            padding: 'clamp(1rem, 5vw, 2rem)',
          }}>
          {/* Corner brackets — responsive */}
          {[
            { top: 'clamp(16px,4vw,32px)', left: 'clamp(16px,4vw,32px)', borderTop: '1px solid', borderLeft: '1px solid'  },
            { top: 'clamp(16px,4vw,32px)', right: 'clamp(16px,4vw,32px)', borderTop: '1px solid', borderRight: '1px solid' },
            { bottom: 'clamp(16px,4vw,32px)', left: 'clamp(16px,4vw,32px)', borderBottom: '1px solid', borderLeft: '1px solid'  },
            { bottom: 'clamp(16px,4vw,32px)', right: 'clamp(16px,4vw,32px)', borderBottom: '1px solid', borderRight: '1px solid' },
          ].map((s, i) => (
            <motion.div key={i}
              style={{ position: 'absolute', width: 'clamp(24px,5vw,40px)', height: 'clamp(24px,5vw,40px)', borderColor: 'rgba(201,168,76,0.4)', ...s }}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            />
          ))}

          {/* Rune strip */}
          <motion.div className="font-cinzel" style={{ color: 'rgba(201,168,76,0.22)', letterSpacing: 'clamp(0.3em,2vw,0.6em)', marginBottom: 'clamp(1.5rem,4vw,2.5rem)', fontSize: 'clamp(0.6rem,2vw,0.85rem)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {runes.join(' ')}
          </motion.div>

          {/* Logo */}
          <motion.h1 className="font-display text-center"
            style={{
              fontSize: 'clamp(1.5rem, 6vw, 4rem)', marginBottom: '0.35em',
              background: 'linear-gradient(135deg,#fff 0%,#f0d080 45%,#c9a84c 75%,#a07828 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22,1,0.36,1] }}>
            E-Summit Pune
          </motion.h1>

          <motion.p className="font-cinzel uppercase text-center"
            style={{ color: 'rgba(201,168,76,0.5)', fontSize: 'clamp(0.55rem,1.5vw,0.65rem)', letterSpacing: 'clamp(0.25em,2vw,0.55em)', marginBottom: 'clamp(2rem,5vw,4rem)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Ascension to Reign &nbsp;·&nbsp; '26
          </motion.p>

          {/* Progress track */}
          <div style={{ position: 'relative', width: 'min(280px, 70vw)', height: 1, background: 'rgba(201,168,76,0.1)' }}>
            <motion.div style={{
              position: 'absolute', top: 0, left: 0, height: '100%',
              background: 'linear-gradient(90deg,#8b6914,#f0d080,#c9a84c)',
              width: `${count}%`, boxShadow: '0 0 12px rgba(201,168,76,0.6)',
              transition: 'width 0.05s linear',
            }} />
            <div style={{
              position: 'absolute', top: -3, left: `${count}%`,
              width: 6, height: 6, borderRadius: '50%',
              background: '#f0d080', boxShadow: '0 0 10px rgba(240,208,128,0.9)',
              transform: 'translateX(-50%)', transition: 'left 0.05s linear',
            }} />
          </div>

          <motion.p className="font-cinzel" style={{ color: 'rgba(201,168,76,0.4)', fontSize: 'clamp(0.55rem,1.5vw,0.6rem)', letterSpacing: '0.4em', marginTop: '1rem' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {String(count).padStart(3, '0')} %
          </motion.p>

          {/* Scanlines */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
