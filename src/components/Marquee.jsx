import { motion } from 'framer-motion'

// Infinite horizontal scrolling marquee — reverses direction on scroll direction
export default function Marquee({ items, speed = 35, reverse = false, separator = '✦' }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden w-full" style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        style={{
          display: 'flex',
          gap: '0',
          width: 'max-content',
        }}
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span
              className="font-cinzel text-xs tracking-[0.4em] uppercase whitespace-nowrap px-6"
              style={{ color: 'rgba(201,168,76,0.4)' }}
            >
              {item}
            </span>
            <span className="font-cinzel text-[0.5rem]" style={{ color: 'rgba(201,168,76,0.2)' }}>
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
