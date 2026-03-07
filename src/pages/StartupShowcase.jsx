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
  const heroRef = useRef(null)
  
  // ══════ ANIMATION LOGIC (Mirroring ETalks) ══════
  const { scrollY } = useScroll()
  const bgY       = useTransform(scrollY, [0, 700], [0, 140])
  const shaftY    = useTransform(scrollY, [0, 700], [0, 70])
  const titleY    = useTransform(scrollY, [0, 500], [0, -50])
  const titleOp   = useTransform(scrollY, [0, 380], [1, 0])
  const titleScale= useTransform(scrollY, [0, 400], [1, 0.92])

  const [aboutRef, aboutInView] = useReveal()
  const [ctaRef, ctaInView]     = useReveal()

  return (
    <div style={{ background: '#050507', minHeight: '100vh', fontFamily: 'Raleway, sans-serif' }}>
      <Navbar />
      <SectionNav sections={SECTIONS} />

      {/* ══════ HERO SECTION ══════ */}
      <section id="hero" ref={heroRef}
        className="relative min-h-screen grid place-items-center text-center overflow-hidden"
        style={{ padding: 'clamp(6rem, 12vw, 8rem) 2rem' }}>
        
        {/* Layered Backgrounds */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <div style={{ position: 'absolute', inset: 0, background: `
            radial-gradient(ellipse 70% 55% at 50% 65%, rgba(139,105,20,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 35% 55% at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 55%),
            linear-gradient(170deg, #050507 0%, #07070e 100%)` }} />
        </motion.div>

        {/* Light Shafts Animation */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: shaftY }}>
          {[{left:'30%',d:'0s'},{left:'50%',d:'2s',wide:true},{left:'70%',d:'4s'}].map((s,i)=>(
            <div key={i} className="shaft" style={{
              left:s.left, animationDelay:s.d, width:s.wide?'2px':'1px',
              background:s.wide
                ?'linear-gradient(180deg,transparent,rgba(201,168,76,0.28) 42%,rgba(201,168,76,0.38) 55%,transparent)'
                :'linear-gradient(180deg,transparent,rgba(201,168,76,0.12) 40%,rgba(201,168,76,0.18) 55%,transparent)',
            }}/>
          ))}
        </motion.div>

        <Embers count={28} />

        {/* Content with Scroll Transformations */}
        <motion.div className="relative z-10 w-full" 
          style={{ y: titleY, opacity: titleOp, scale: titleScale, maxWidth: 'min(820px, 92vw)', margin: '0 auto' }}>
          
          <span className="font-cinzel uppercase block mb-4" 
            style={{ fontSize: '0.65rem', letterSpacing: '0.5em', color: 'rgba(201,168,76,0.7)' }}>
            The Stage for Innovation
          </span>
          
          <div style={{ overflow: 'hidden' }}>
            <motion.h1 className="font-display leading-tight mb-6"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 7rem)', 
                background: 'linear-gradient(150deg,#fff 0%,#f0d080 40%,#c9a84c 70%,#a07828 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 60px rgba(201,168,76,0.3))'
              }}
              initial={{ y: '100%', opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <ScrambleText text="STARTUP" trigger /><br/>
              <ScrambleText text="SHOWCASE" trigger delay={500} />
            </motion.h1>
          </div>

          <div className="mb-10">
            <WordReveal 
              text="VEDC's Inaugural Event . Brightest young minds. Boldest ideas. The ultimate platform for the future of industry."
              className="font-light text-center"
              style={{ color: '#a0988a', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', letterSpacing: '0.1em', lineHeight: 1.6 }}
              delay={0.05}
            />
          </div>

          <MagneticButton href="#about" className="btn-gold">Discover the Platform</MagneticButton>
        </motion.div>

        {/* Scroll cue (Mirroring ETalks) */}
        <motion.div style={{ position:'absolute', bottom:'2rem', left:'50%', translateX:'-50%', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}>
          <span className="font-cinzel uppercase" style={{ fontSize:'0.5rem', letterSpacing:'0.5em', color:'rgba(201,168,76,0.3)' }}>Scroll</span>
          <motion.div style={{ width:1, height:'44px', background:'linear-gradient(180deg,rgba(201,168,76,0.5),transparent)', originY:0 }}
            animate={{ scaleY:[0,1,1,0], opacity:[0,1,1,0] }}
            transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut', times:[0,0.3,0.7,1] }}/>
        </motion.div>
      </section>

      <Marquee items={MARQUEE_TEXT} speed={30} />

      {/* ══════ ABOUT THE VISION ══════ */}
      <div id="about" className="bg-[#0f0f1a] border-b border-white/5">
        <motion.div ref={aboutRef} 
          className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" 
          style={{ py: 'clamp(5rem, 10vw, 8rem)' }}
          initial={{ opacity: 0, y: 30 }} 
          animate={aboutInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8 }}>
          
          <div className="grid md:grid-cols-2 gap-12 items-center py-24">
            <div>
              <span className="section-tag">∙ The Vision ∙</span>
              <h2 className="font-display text-4xl md:text-5xl text-gold-gradient leading-tight">
                The Most Electrifying Segment
              </h2>
            </div>
            <div className="space-y-6 text-[#a0988a] font-light leading-relaxed text-lg">
              <p>E-Summit Pune's Startup Showcase brings together the brightest young minds and boldest ideas under one roof. It is a platform where innovative startups get the opportunity to present their vision, demonstrate their products, and share the problems they are solving.</p>
              <p>Whether you're a first-time founder or a seasoned builder, the Startup Showcase is your stage to make an impact. It's more than just a presentation, it's a chance to spark conversations, attract potential collaborators, and take your startup one step closer to the next big milestone.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════ FINAL CALL TO ACTION ══════ */}
      <section id="register" className="py-32 relative overflow-hidden text-center bg-[#050507]">
        <motion.div ref={ctaRef} className="max-w-3xl mx-auto px-6 relative z-10" 
          initial={{ opacity: 0, y: 20 }} 
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          
          <DrawBorder style={{ padding: '4rem 2rem', background: 'rgba(201,168,76,0.02)' }}>
            <span className="section-tag">∙ Be Part of the Reign ∙</span>
            <h2 className="font-display text-4xl md:text-6xl mb-6">Claim Your Stage</h2>
            <p className="section-body mb-10 text-[#a0988a]">
              Come ready to pitch, connect, and inspire. Join an audience of investors and industry leaders looking for the next big thing.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <MagneticButton href="https://learner.vierp.in/events" className="btn-gold">Apply to Showcase</MagneticButton>
              <MagneticButton href="/etalks" className="btn-outline">Explore E-Talks →</MagneticButton>
            </div>
          </DrawBorder>
        </motion.div>

        {/* Massive Background Scramble */}
        <motion.span className="font-display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] text-white/5 pointer-events-none select-none"
          animate={{ scale: [1, 1.05, 1], opacity: [0.03, 0.06, 0.03] }} 
          transition={{ duration: 8, repeat: Infinity }}>
          STARTUP
        </motion.span>
      </section>

      <Footer />
    </div>
  )
}