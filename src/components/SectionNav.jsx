import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SectionNav({ sections }) {
  const [active,  setActive]  = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
      const scrollMid = window.scrollY + window.innerHeight * 0.45
      let found = 0
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= scrollMid) found = i
      })
      setActive(found)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <AnimatePresence>
      {/* Hidden on phones (< 1024px) — only show on desktop */}
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="hidden xl:flex"
          style={{
            position: 'fixed', right: 28, top: '50%', transform: 'translateY(-50%)',
            zIndex: 500, flexDirection: 'column', gap: 14, alignItems: 'flex-end',
          }}
        >
          {sections.map((s, i) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} title={s.label}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <AnimatePresence>
                {active === i && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="font-cinzel uppercase"
                    style={{ fontSize: '0.52rem', letterSpacing: '0.2em', color: '#c9a84c', whiteSpace: 'nowrap' }}>
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.div
                animate={{
                  width: active === i ? 20 : 5, height: active === i ? 5 : 5,
                  background: active === i ? '#c9a84c' : 'rgba(201,168,76,0.22)',
                  boxShadow: active === i ? '0 0 10px rgba(201,168,76,0.6)' : 'none',
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ borderRadius: 3 }}
              />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
