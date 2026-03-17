import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function PerformerCard({ type, emoji, name, sub, desc, delay = 0, image }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 180, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 180, damping: 22 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
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
        transformStyle: 'preserve-3d',
        perspective: 1000,
        background: '#0a0505',
        borderBottom: '1px solid rgba(139,26,26,0.15)',
        borderRight:  '1px solid rgba(139,26,26,0.15)',
        position: 'relative', overflow: 'hidden', cursor: 'pointer', willChange: 'transform',
      }}
    >
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(212,105,10,0.08) 0%, transparent 65%)`,
        transition: 'opacity 0.3s',
      }} />

      <motion.div
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 10,
                 background: 'linear-gradient(90deg, transparent, #d4690a, transparent)', transformOrigin: 'center' }}
        animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
      />

      <div style={{
        height: 'clamp(220px, 30vw, 320px)',
        background: 'linear-gradient(135deg, #0d0404 0%, #140808 100%)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* FIX: Checking for image prop explicitly */}
        {image ? (
          <motion.img 
            src={image} 
            alt={name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              objectPosition: 'top center',
              filter: 'grayscale(15%) contrast(1.1) brightness(0.9)'
            }}
            animate={{ 
              scale: hovered ? 1.06 : 1, 
              filter: hovered ? 'grayscale(0%) contrast(1.1) brightness(1)' : 'grayscale(15%) contrast(1.1) brightness(0.9)' 
            }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <motion.span 
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', opacity: 0.15, filter: 'grayscale(100%)' }}
              animate={{ opacity: hovered ? 0.3 : 0.15, scale: hovered ? 1.1 : 1, filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)' }}>
              {emoji || '🎤'}
            </motion.span>
            <p className="font-cinzel" style={{ fontSize: '0.52rem', letterSpacing: '0.35em', color: 'rgba(139,26,26,0.3)', textTransform: 'uppercase' }}>Performer Photo</p>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(10,5,5,0.95) 100%)' }} />

        {type && (
          <span className="font-cinzel" style={{
            position: 'absolute', top: 10, left: 10, fontSize: '0.48rem', letterSpacing: '0.15em',
            color: '#d4690a', background: 'rgba(5,3,3,0.85)', padding: '4px 8px',
            border: '1px solid rgba(212,105,10,0.2)', textTransform: 'uppercase',
          }}>
            {type}
          </span>
        )}
      </div>

      <div style={{ padding: 'clamp(1rem, 2.5vw, 1.5rem)', paddingBottom: 'clamp(1.5rem, 3vw, 2rem)', transform: 'translateZ(20px)' }}>
        <motion.h3 className="font-cinzel font-bold"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', marginBottom: 6, color: '#e8e0d0' }}
          animate={{ color: hovered ? '#d4690a' : '#e8e0d0' }} transition={{ duration: 0.3 }}>
          {name}
        </motion.h3>
        <p className="font-cinzel" style={{ fontSize: '0.7rem', fontWeight: 500, marginBottom: 12, color: '#c9a84c', letterSpacing: '0.05em' }}>{sub}</p>
        <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', lineHeight: 1.8, fontWeight: 300, color: '#8a8a9a' }}>{desc}</p>
      </div>
    </motion.div>
  )
}