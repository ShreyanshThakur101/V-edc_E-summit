import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function PerformerCard({ type, name, sub, desc, imgSrc, emoji, delay = 0 }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 180, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 180, damping: 22 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7])
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])
  const glareX  = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glareY  = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); setHovered(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY, rotateX,
        transformStyle: 'preserve-3d', perspective: 1000,
        background: '#16161f', border: '1px solid rgba(201,168,76,0.1)',
        position: 'relative', overflow: 'hidden', cursor: 'pointer', willChange: 'transform',
      }}
    >
      {/* Glare */}
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(212,105,10,0.06) 0%, transparent 65%)`,
        transition: 'opacity 0.3s',
      }} />

      {/* Amber accent */}
      <motion.div
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 10,
                 background: 'linear-gradient(90deg, transparent, #d4690a, transparent)', transformOrigin: 'center' }}
        animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
      />

      {/* Photo */}
      <div style={{
        height: 'clamp(180px, 26vw, 280px)',
        background: 'linear-gradient(135deg, #120a0a, #1e0d0d)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {imgSrc ? (
          <motion.img src={imgSrc} alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.6 }}
          />
        ) : (
          <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.4 }}>
            <span style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', opacity: 0.15 }}>{emoji || '🎤'}</span>
            <p className="font-cinzel" style={{ fontSize: '0.52rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(212,105,10,0.3)' }}>
              Performer Photo
            </p>
          </motion.div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(22,22,31,0.97) 100%)' }} />
        <span className="font-cinzel" style={{
          position: 'absolute', top: 10, left: 10, fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#d4690a', background: 'rgba(5,5,7,0.85)', padding: '3px 8px',
          border: '1px solid rgba(212,105,10,0.35)',
        }}>{type}</span>
      </div>

      <div style={{ padding: 'clamp(0.9rem, 2.5vw, 1.25rem)', paddingBottom: 'clamp(1.2rem, 3vw, 1.75rem)' }}>
        <motion.h3 className="font-cinzel font-bold"
          style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', marginBottom: 4 }}
          animate={{ color: hovered ? '#f0d080' : '#ede5d5' }} transition={{ duration: 0.3 }}>
          {name}
        </motion.h3>
        <p className="font-cinzel" style={{ fontSize: '0.7rem', fontWeight: 500, marginBottom: 10, color: '#c9a84c', letterSpacing: '0.05em' }}>{sub}</p>
        <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.82rem)', lineHeight: 1.75, fontWeight: 300, color: '#6e6e88' }}>{desc}</p>
      </div>
    </motion.div>
  )
}
