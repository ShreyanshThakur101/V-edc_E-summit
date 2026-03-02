import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.3, ease: 'easeIn'  } },
}

// Gold curtain that wipes across on route change
const curtainVariants = {
  initial: { scaleX: 0, originX: 0 },
  enter:   { scaleX: 0, originX: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
  exit:    { scaleX: 1, originX: 0, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
}

export default function PageTransition({ children }) {
  const { pathname } = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ position: 'relative', minHeight: '100vh' }}
      >
        {/* Curtain overlay */}
        <motion.div
          key={`curtain-${pathname}`}
          variants={curtainVariants}
          initial="exit"
          animate="enter"
          exit="exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            pointerEvents: 'none',
            background: 'linear-gradient(135deg, #0d0d14 0%, #1a1408 50%, #0d0d14 100%)',
            borderRight: '2px solid rgba(201,168,76,0.4)',
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
