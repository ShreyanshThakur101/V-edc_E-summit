import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import logo from '../assets/logo.png' // <-- Added Logo Import

const links = [
  { label: 'Home',            to: '/'                },
  { label: 'Competition',     to: '/competition'     },
  { label: 'E-Talks',         to: '/etalks'          },
  { label: 'Summit Showdown', to: '/summit-showdown' },
  { label: 'Startup Showcase', to: '/startup-showcase' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { pathname } = useLocation()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div style={{
        scaleX,
        position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, #8b6914, #f0d080, #c9a84c)',
        transformOrigin: '0%', zIndex: 9995,
      }} />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          /* Responsive padding: 1rem on mobile, 2rem tablet, 3.5rem desktop */
          padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(1rem, 4vw, 3.5rem)',
          transition: 'background 0.5s, border-color 0.5s, backdrop-filter 0.5s',
          background: scrolled ? 'rgba(5,5,7,0.96)' : 'linear-gradient(180deg, rgba(5,5,7,0.88) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(4px)',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
        }}
      >
        {/* Custom Logo Section */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <motion.div 
            className="flex items-center space-x-2 shrink-0"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={logo} alt="V-EDC Logo" className="h-8 md:h-12 w-auto" />
            <div className="hidden sm:flex flex-col border-l border-[#c5a059]/30 pl-3">
              <span className="text-[11px] md:text-[14px] font-bold tracking-[0.1em] text-[#c5a059] whitespace-nowrap uppercase">V-EDC | VIT PUNE</span>
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-gray-400">Ascension to Reign</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop nav — hidden below lg */}
        <ul className="hidden lg:flex" style={{ gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}>
          {links.map(({ label, to }) => {
            const active = pathname === to
            return (
              <li key={to}>
                <Link to={to} style={{ textDecoration: 'none' }}>
                  <motion.span
                    className="font-cinzel uppercase"
                    style={{
                      fontSize: 'clamp(0.6rem, 1vw, 0.68rem)',
                      letterSpacing: '0.18em',
                      color: active ? '#c9a84c' : '#a0988a',
                      paddingBottom: '4px', display: 'inline-block', position: 'relative',
                    }}
                    whileHover={{ color: '#f0d080' }}
                  >
                    {label}
                    <motion.span style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: 1, background: '#c9a84c', transformOrigin: '0%',
                    }}
                      animate={{ scaleX: active ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </Link>
              </li>
            )
          })}
          <li>
            {/* Desktop Register Button -> Links to ERP */}
            <motion.a
              href="https://learner.vierp.in/events"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel uppercase"
              style={{
                fontSize: 'clamp(0.6rem, 1vw, 0.68rem)', letterSpacing: '0.18em',
                color: '#c9a84c', border: '1px solid rgba(201,168,76,0.4)',
                padding: '0.4rem clamp(0.6rem, 1.5vw, 1.1rem)', textDecoration: 'none', display: 'inline-block',
              }}
              whileHover={{ background: 'rgba(201,168,76,0.1)', borderColor: '#c9a84c', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Register
            </motion.a>
          </li>
        </ul>

        {/* Hamburger — visible below lg */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="lg:hidden"
          aria-label="Toggle menu"
          style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '8px', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          {[0, 1, 2].map(i => (
            <motion.span key={i}
              style={{ display: 'block', height: 1, width: 22, background: '#c9a84c' }}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 6 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.22 }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile/tablet drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,7,0.7)', backdropFilter: 'blur(6px)', zIndex: 189 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'clamp(260px, 75vw, 320px)',
                zIndex: 190,
                background: 'rgba(10,10,18,0.99)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(201,168,76,0.12)',
                display: 'flex', flexDirection: 'column',
                paddingTop: 'clamp(5rem, 12vw, 7rem)',
                paddingLeft: 'clamp(1.5rem, 5vw, 2.5rem)',
                paddingRight: 'clamp(1.5rem, 5vw, 2.5rem)',
                gap: 4,
              }}
            >
              {links.map(({ label, to }, i) => (
                <motion.div key={to}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={to} style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                    <motion.span
                      className="font-cinzel uppercase"
                      style={{
                        fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
                        letterSpacing: '0.2em', color: '#a0988a',
                        display: 'block',
                        padding: 'clamp(0.7rem, 2vw, 1rem) 0',
                        borderBottom: '1px solid rgba(201,168,76,0.08)',
                      }}
                      whileHover={{ color: '#f0d080', x: 4 }}
                    >
                      {label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Register Button -> Links to ERP */}
              <motion.a
                href="https://learner.vierp.in/events"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                className="btn-gold"
                style={{
                  marginTop: 'clamp(1rem, 4vw, 2rem)',
                  justifyContent: 'center', textAlign: 'center',
                  fontSize: 'clamp(0.65rem, 2.5vw, 0.75rem)',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
              >
                Register
              </motion.a>

              {/* Social links */}
              <div style={{ marginTop: 'auto', paddingBottom: '2rem', display: 'flex', gap: 12 }}>
                {[['in', 'https://linkedin.com/company/v-edc'], ['𝕏', 'https://x.com/v_edc'], ['Insta', 'https://instagram.com/v_edc']].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="font-cinzel"
                    style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#6e6e88',
                             border: '1px solid rgba(201,168,76,0.15)', padding: '4px 8px', textDecoration: 'none' }}>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}