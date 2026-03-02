import { motion } from 'framer-motion'
import { useReveal } from './useReveal'

// Animated border that draws itself around a container on scroll
export function DrawBorder({ children, className = '', style = {}, color = 'rgba(201,168,76,0.5)', duration = 1.2 }) {
  const [ref, inView] = useReveal()

  const stroke = {
    hidden:  { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      {/* SVG border — draws around the box */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
        fill="none"
      >
        <motion.rect
          x="0.5" y="0.5"
          width="calc(100% - 1px)" height="calc(100% - 1px)"
          stroke={color}
          strokeWidth="1"
          variants={stroke}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration, ease: 'easeInOut', delay: 0.1 }}
        />
      </svg>
      {children}
    </div>
  )
}

// Gradient border that pulses
export function GlowBorder({ children, className = '', style = {}, color = '#c9a84c' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        background: 'linear-gradient(#16161f, #16161f) padding-box, linear-gradient(135deg, rgba(201,168,76,0.6), rgba(139,26,26,0.3), rgba(201,168,76,0.6)) border-box',
        border: '1px solid transparent',
        ...style,
      }}
      animate={{
        filter: [
          'drop-shadow(0 0 0px rgba(201,168,76,0))',
          'drop-shadow(0 0 8px rgba(201,168,76,0.3))',
          'drop-shadow(0 0 0px rgba(201,168,76,0))',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

// Clip-path reveal — content wipes in from left
export function ClipReveal({ children, className = '', style = {}, delay = 0 }) {
  const [ref, inView] = useReveal()
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
