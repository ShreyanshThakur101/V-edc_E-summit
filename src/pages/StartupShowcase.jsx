import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar        from '../components/Navbar'
import Footer        from '../components/Footer'
import { Embers }    from '../components/Particles'
import { useReveal } from '../components/useReveal'
import { ScrambleText, WordReveal } from '../components/TextReveal'
import { MagneticButton }           from '../components/ScrollProgress'
import Marquee       from '../components/Marquee'
import SectionNav    from '../components/SectionNav'
import { DrawBorder } from '../components/AnimatedBorder'

const MARQUEE_TEXT = ['Startup Showcase', 'Innovation', 'Pitches', 'V-EDC', 'VIT Pune', 'Future Founders']
const SECTIONS = [
  { id: 'hero',     label: 'Intro' },
  { id: 'about',    label: 'The Vision' },
  { id: 'register', label: 'Register' },
]

export default function StartupShowcase() {
  const { scrollY } = useScroll()
  const bgY       = useTransform(scrollY, [0, 700], [0, 140])
  const titleY    = useTransform(scrollY, [0, 500], [0, -50])
  const [aboutRef, aboutInView] = useReveal()
  const [ctaRef, ctaInView]     = useReveal()

  return (
    <div style={{ background: '#050507', minHeight: '100vh', fontFamily: 'Raleway, sans-serif' }}>
      <Navbar />
      <SectionNav sections={SECTIONS} />

      {/* ══════ HERO ══════ */}
      <section id="hero" className="relative min-h-screen grid place-items-center text-center overflow-hidden"
        style={{ padding: 'clamp(6rem, 12vw, 8rem) 2rem' }}>
        
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <div style={{ position: 'absolute', inset: 0, background: `
            radial-gradient(ellipse 70% 55% at 50% 65%, rgba(139,105,20,0.12) 0%, transparent 65%),
            linear-gradient(170deg, #050507 0%, #07070e 100%)` }} />
        </motion.div>

        <Embers count={20} />

        <motion.div className="relative z-10 w-full" style={{ y: titleY, maxWidth: '820px', margin: '0 auto' }}>
          <span className="font-cinzel uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.5em', color: 'rgba(201,168,76,0.7)' }}>
            The Stage for Innovation
          </span>
          
          <motion.h1 className="font-display leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', background: 'linear-gradient(150deg,#fff 0%,#c9a84c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            <ScrambleText text="STARTUP" trigger /><br/>
            <ScrambleText text="SHOWCASE" trigger delay={500} />
          </motion.h1>

          <WordReveal 
            text="Brightest young minds. Boldest ideas. One roof."
            className="font-light text-center mb-10"
            style={{ color: '#a0988a', fontSize: '1.2rem', letterSpacing: '0.1em' }}
          />

          <MagneticButton href="#about" className="btn-gold">Discover the Platform</MagneticButton>
        </motion.div>
      </section>

      <Marquee items={MARQUEE_TEXT} speed={30} />

      {/* ══════ ABOUT CONTENT ══════ */}
      <div id="about" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ py: 'clamp(5rem, 10vw, 8rem)' }}>
        <motion.div ref={aboutRef} initial={{ opacity: 0, y: 30 }} animate={aboutInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="grid md:grid-cols-2 gap-12 items-center py-20">
            <h2 className="font-display text-4xl md:text-5xl text-[#c9a84c] italic">The Most Electrifying Segment</h2>
            <div className="space-y-6 text-[#a0988a] font-light leading-relaxed text-lg">
              <p>E-Summit's Startup Showcase brings together the brightest young minds and boldest ideas under one roof. It is a platform where innovative startups get the opportunity to present their vision, demonstrate their products, and share the problems they are solving.</p>
              <p>Whether you're a first-time founder or a seasoned builder, the Startup Showcase is your stage to make an impact. It's more than just a presentation, it's a chance to spark conversations, attract potential collaborators, and take your startup one step closer to the next big milestone.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════ CTA ══════ */}
      <section id="register" className="py-24 text-center bg-[#0a0a10]">
        <motion.div ref={ctaRef} className="max-w-3xl mx-auto px-6" initial={{ opacity: 0 }} animate={ctaInView ? { opacity: 1 } : {}}>
          <DrawBorder style={{ padding: '4rem 2rem' }}>
            <h2 className="font-display text-4xl mb-6">Ready to Pitch?</h2>
            <p className="text-[#a0988a] mb-10">Come ready to pitch, connect, and inspire. Your journey to the next milestone begins here.</p>
            <MagneticButton href="https://learner.vierp.in/" className="btn-gold">Apply to Showcase</MagneticButton>
          </DrawBorder>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}