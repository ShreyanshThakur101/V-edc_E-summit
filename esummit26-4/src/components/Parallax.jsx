import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ParallaxLayer — children move at a different scroll speed.
 * speed > 0 = slower than scroll (recedes)
 * speed < 0 = faster than scroll (advances)
 * Default speed of 0.4 gives a gentle background parallax.
 */
export default function ParallaxLayer({ children, speed = 0.4, className = '', style = {} }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Map scroll 0→1 to a vertical translation
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 80}px`, `${speed * 80}px`])

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * ParallaxHero — for full-viewport hero sections.
 * Background layers move slower, content stays fixed relative to viewport.
 */
export function ParallaxHeroLayer({ children, speed = 0.25, style = {} }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <motion.div style={{ y, ...style }}>
      {children}
    </motion.div>
  )
}
