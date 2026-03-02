import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gold progress bar fixed to top of viewport */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #8b6914, #f0d080, #c9a84c)',
        transformOrigin: '0%',
        zIndex: 9990,
      }}
    />
  )
}

/**
 * MagneticButton — element that subtly follows the cursor when hovered,
 * snapping back with a spring on mouse leave.
 */
export function MagneticButton({ children, className = '', style = {}, onClick, href, strength = 0.35 }) {
  const ref      = useRef(null)
  const x        = useRef(0)
  const y        = useRef(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    x.current  = (e.clientX - cx) * strength
    y.current  = (e.clientY - cy) * strength
    setPos({ x: x.current, y: y.current })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      style={{ display: 'inline-block' }}
    >
      <Tag
        href={href}
        onClick={onClick}
        className={className}
        style={style}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
