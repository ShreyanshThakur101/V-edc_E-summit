import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from './useReveal'

function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }

export default function StatCounter({ icon, display, target = null, suffix = '', label, delay = 0 }) {
  const [ref, inView]   = useReveal()
  const [count, setCount]     = useState(0)
  const [started, setStarted] = useState(false)
  const duration = 1600

  useEffect(() => {
    if (!inView || started || target === null) return
    setStarted(true)
    const startTime = performance.now() + delay
    const tick = (now) => {
      if (now < startTime) { requestAnimationFrame(tick); return }
      const p = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(easeOutExpo(p) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, started, target, delay])

  const shown = target !== null ? `${count}${suffix}` : display

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="card-gold-border text-center"
      style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', transition: 'border-color 0.3s, transform 0.3s' }}>
      <motion.div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'clamp(6px, 1.5vw, 12px)' }}
        animate={inView ? { scale: [0.5, 1.2, 1], opacity: [0, 1, 1] } : {}}
        transition={{ duration: 0.6, delay: delay / 1000 + 0.1 }}>
        {icon}
      </motion.div>
      <div className="font-display" style={{ color: '#c9a84c', lineHeight: 1, marginBottom: 'clamp(4px, 1vw, 8px)', fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)' }}>
        {shown}
      </div>
      <p className="font-cinzel uppercase" style={{ fontSize: 'clamp(0.52rem, 1.2vw, 0.6rem)', letterSpacing: '0.25em', color: '#6e6e88' }}>{label}</p>
    </motion.div>
  )
}
