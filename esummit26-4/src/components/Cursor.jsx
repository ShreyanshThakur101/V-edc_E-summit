import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isTouch,  setIsTouch] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    // Detect touch device — don't render on mobile/tablet
    const touch = window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touch)
    if (touch) return

    setMounted(true)

    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const enter = (e) => {
      const t = e.target
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') || t.classList.contains('cursor-pointer'))
        setHovered(true)
    }
    const leave = () => setHovered(false)
    const down  = () => setClicked(true)
    const up    = () => setClicked(false)

    window.addEventListener('mousemove',  move)
    window.addEventListener('mouseover',  enter)
    window.addEventListener('mouseout',   leave)
    window.addEventListener('mousedown',  down)
    window.addEventListener('mouseup',    up)
    return () => {
      window.removeEventListener('mousemove',  move)
      window.removeEventListener('mouseover',  enter)
      window.removeEventListener('mouseout',   leave)
      window.removeEventListener('mousedown',  down)
      window.removeEventListener('mouseup',    up)
    }
  }, [])

  if (!mounted || isTouch) return null

  return (
    <>
      {/* Dot — snaps to cursor */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, x: mouseX, y: mouseY }}>
        <motion.div
          animate={{ width: hovered ? 4 : 6, height: hovered ? 4 : 6, opacity: hovered ? 0 : 1, translateX: '-50%', translateY: '-50%' }}
          transition={{ duration: 0.15 }}
          style={{ borderRadius: '50%', background: '#c9a84c', boxShadow: '0 0 8px rgba(201,168,76,0.8)' }}
        />
      </motion.div>

      {/* Ring — spring lag */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998, x: springX, y: springY }}>
        <motion.div
          animate={{
            width:       clicked ? 26 : hovered ? 46 : 30,
            height:      clicked ? 26 : hovered ? 46 : 30,
            opacity:     clicked ? 0.35 : hovered ? 0.7 : 0.32,
            translateX:  '-50%', translateY: '-50%',
            borderColor: hovered ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.45)',
            boxShadow:   hovered ? '0 0 20px rgba(201,168,76,0.35)' : 'none',
          }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ borderRadius: '50%', border: '1px solid rgba(201,168,76,0.45)' }}
        />
      </motion.div>
    </>
  )
}
