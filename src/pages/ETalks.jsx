import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar         from '../components/Navbar'
import Footer         from '../components/Footer'
import { Embers }     from '../components/Particles'
import MetricCounter  from '../components/MetricCounter'
import SpeakerCard    from '../components/SpeakerCard'
import { useReveal }  from '../components/useReveal'
import { ScrambleText, WordReveal } from '../components/TextReveal'
import { MagneticButton }           from '../components/ScrollProgress'
import Marquee        from '../components/Marquee'
import SectionNav     from '../components/SectionNav'
import { DrawBorder } from '../components/AnimatedBorder'

// IMPORT SPEAKER PHOTOS
import speaker1 from '../assets/summit_speaker1_image.png'; 
import speaker2 from '../assets/summit_speaker2_image.png'; 
// import speaker3 from '../assets/showdown_speaker_1_image.png'; 
import speaker4 from '../assets/summit_speaker4_image.png'; 

const SPEAKERS = [
  { 
    number: 1, 
    domain: 'Business & Tech', 
    name: 'Dr. Sanjay Katkar', 
    title: 'Co-Founder & Jt. MD of Quick Heal Technologies', 
    image: speaker1, 
    bio: 'A visionary leader in cybersecurity, he has been instrumental in scaling Quick Heal into a global name through relentless technical innovation.' 
  },
  { 
    number: 2, 
    domain: 'Gaming & Business', 
    name: '(GHATAK) Abhijeet Andhare', 
    title: 'Founder & CEO of Trident Gaming', 
    image: speaker2, 
    bio: 'A pioneer in Indian E-sports, GHATAK transitioned from a professional player to a top-tier mentor and successful entrepreneur in the gaming industry.' 
  },

  { 
    number: 4, 
    domain: 'Acting & Music', 
    name: 'Shubhankar Saleel Kulkarni', 
    title: 'Musician & Actor | Tale of Melodies', 
    image: speaker4, 
    bio: 'Blending a deep musical heritage with the art of performance, he brings the soul of "Tale of Melodies" to the stage, proving that creativity knows no boundaries.',
    /* 10% Size Increase for this specific photo */
    imageScale: 1.1 
  },
]

const MARQUEE_A = ['E-Talks','E-Summit Pune 26','Ascension to Reign','17–25 March','VIT Pune']
const MARQUEE_B = ['Business','Politics','Acting','Content Creation','Technical Founding','Social Impact']

const WHY_ITEMS = [
  { num:'01', head:'Unfiltered Stories',  body:'No PR polish — just the raw truth of building from those who have lived it.' },
  { num:'02', head:'Cross-Domain Voices', body:'From politics to film to deep tech. Grit and vision transcend every field.' },
  { num:'03', head:'Ignited Ambition',    body:'Every talk shifts your perspective and fires up your own path.' },
  { num:'04', head:'Real-World Lessons',  body:'Wisdom earned through navigating industries, failures, and pivots firsthand.' },
  { num:'05', head:'Event Experiences',   body:'Immersive networking sessions and curated vibes that turn high-level inspiration into real-world action.' },
]

const SECTIONS = [
  { id:'hero',     label:'Intro'    },
  { id:'about',    label:'About'    },
  { id:'speakers', label:'Speakers' },
  { id:'why',      label:'Why'      },
  { id:'register', label:'Register' },
]

function SecHead({ tag, title, body, isKeynote }) {
  const [ref, inView] = useReveal()
  return (
    <motion.div ref={ref} className="text-center mb-10 md:mb-14"
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
      <span className="section-tag" style={isKeynote ? { 
          fontSize: 'clamp(0.85rem, 2vw, 1.15rem)', 
          letterSpacing: '0.5em',
          fontWeight: 600
        } : {}}>
        {tag}
      </span>
      <h2 className="section-title font-display">{title}</h2>
      {body && <p className="section-body">{body}</p>}
    </motion.div>
  )
}

export default function ETalks() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const bgY       = useTransform(scrollY, [0,700], [0,140])
  const titleY    = useTransform(scrollY, [0,500], [0,-50])
  const titleOp   = useTransform(scrollY, [0,380], [1,0])
  const titleScale= useTransform(scrollY, [0,400], [1,0.92])

  const [aboutRef, aboutInView] = useReveal()
  const [whyRef,   whyInView]   = useReveal()
  const [ctaRef,   ctaInView]   = useReveal()

  return (
    <div style={{ background:'#050507', minHeight:'100vh', fontFamily:'Raleway, sans-serif' }}>
      <Navbar />
      <SectionNav sections={SECTIONS} />

      {/* ══════ HERO SECTION ══════ */}
      <section id="hero" ref={heroRef}
        className="relative min-h-screen grid place-items-center text-center overflow-hidden"
        style={{ padding: 'clamp(6rem, 12vw, 8rem) clamp(1rem, 5vw, 2rem) clamp(3rem, 6vw, 4rem)' }}>

        <motion.div className="absolute inset-0 z-0" style={{ y:bgY }}>
          <div style={{ position:'absolute', inset:0, background:`
            radial-gradient(ellipse 70% 55% at 50% 65%, rgba(139,105,20,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 35% 55% at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 100% 40% at 50% 0%, rgba(5,5,7,1) 0%, transparent 100%),
            linear-gradient(170deg, #050507 0%, #07070e 55%, #0a0a10 100%)` }} />
        </motion.div>

        <Embers count={28}/>

        <motion.div className="relative z-10 w-full" style={{ y:titleY, opacity:titleOp, scale:titleScale, maxWidth:'min(820px, 92vw)', margin:'0 auto' }}>
          <div style={{ overflow:'hidden' }}>
            <motion.h1 className="font-display leading-none mb-0"
              style={{ fontSize:'clamp(3rem, 14vw, 8rem)', background:'linear-gradient(150deg,#fff 0%,#f0d080 40%,#c9a84c 70%,#a07828 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              <ScrambleText text="E-TALKS" trigger delay={350}/>
            </motion.h1>
          </div>
          <div className="mb-10 mt-2">
            <WordReveal text="Extraordinary individuals. Unfiltered stories. One stage. Ascension Begins." className="font-light text-center" style={{ color:'#a0988a', fontSize:'clamp(0.82rem, 2.2vw, 1rem)' }} />
          </div>
          <MagneticButton href="#speakers" className="btn-gold">Meet the Speakers</MagneticButton>
        </motion.div>
      </section>

      <div style={{ borderTop:'1px solid rgba(201,168,76,0.07)', borderBottom:'1px solid rgba(201,168,76,0.07)', padding:'10px 0', background:'rgba(201,168,76,0.015)' }}>
        <Marquee items={MARQUEE_A} speed={30}/>
      </div>

      {/* ══ ABOUT ══ */}
      <div id="about" style={{ background:'#10101a', padding:'5rem 0', borderBottom:'1px solid rgba(201,168,76,0.08)' }}>
        <motion.div ref={aboutRef} className="max-w-7xl mx-auto px-6" initial={{ opacity:0 }} animate={aboutInView?{opacity:1}:{}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">∙ About E-Talks ∙</span>
              <h2 className="section-title font-display">More Than<br/>Just a Talk</h2>
            </div>
            <div className="space-y-6 text-[#a0988a] font-light leading-relaxed">
              <p>E-Talks brings together extraordinary individuals from diverse domains to share their unfiltered journeys.</p>
              <p>Each story serves as a window into the real world of building something from scratch.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══ STATS ══ */}
      <div className="relative z-10 bg-black/50 backdrop-blur-xl border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div style={{ display:'grid', gap:'clamp(0.75rem,2vw,1.25rem)', gridTemplateColumns:'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
            <MetricCounter display="12+" target={12} suffix="+" label="Speakers Across Domains" delay={0}/>
            <MetricCounter display="2"   target={2}           label="Days on the Grand Stage"  delay={150}/>
            <MetricCounter display="5K+" target={5000} suffix="+" label="Inspired Attendees"  delay={300}/>
          </div>
        </div>
      </div>

      {/* ══════ KEYNOTE & SPEAKER GRID ══════ */}
      <div id="speakers" className="max-w-7xl mx-auto px-6 py-20">
        <SecHead 
          tag="∙ Opening Keynote ∙" 
          title="The Sovereign Voice" 
          body="Our keynote speaker sets the tone raw, real, and unforgettable."
          isKeynote={true}
        />
        
        {/* SINGLE ROW GRID: Ensures all 4 speakers stay side-by-side on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 mt-20">
          {SPEAKERS.map((s, i) => (
            <div key={i}>
              <SpeakerCard 
                {...s} 
                delay={i * 0.07} 

              />
            </div>
          ))}
        </div>
      </div>

      {/* ══════ WHY SECTION ══════ */}
      <div id="why" className="bg-[#0f0f1a] py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SecHead tag="∙ Why E-Talks ∙" title="What You'll Take Away"/>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
            {WHY_ITEMS.map((item) => (
              <div key={item.num} className="bg-[#16161f] p-8 hover:bg-[#1e1e2e] transition-colors">
                <div className="text-4xl text-[#c9a84c]/20 font-display mb-4">{item.num}</div>
                <h4 className="font-cinzel text-[#e8e0d0] mb-2">{item.head}</h4>
                <p className="text-[#6e6e88] text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ REGISTER SECTION ══════ */}
      <section id="register" style={{ position:'relative', textAlign:'center', overflow:'hidden', padding:'clamp(4rem,8vw,7rem) clamp(1rem,4vw,2rem)', background:'#0f0f1a', borderTop:'1px solid rgba(201,168,76,0.08)' }}>
        <motion.span className="font-display pointer-events-none select-none"
          style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', fontSize:'clamp(4rem,16vw,12rem)', color:'rgba(201,168,76,0.025)', whiteSpace:'nowrap', letterSpacing:'0.1em' }}
          animate={{ scale:[1,1.02,1] }} transition={{ duration:5, repeat:Infinity }}>
          E-TALKS
        </motion.span>

        <motion.div ref={ctaRef} style={{ position:'relative', zIndex:10, maxWidth:'min(560px, 90vw)', margin:'0 auto' }}
          initial={{ opacity:0, y:40 }} animate={ctaInView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
          <DrawBorder style={{ padding:'clamp(1.5rem,4vw,3rem)', background:'rgba(201,168,76,0.02)' }}>
            <h2 className="section-title font-display mb-4">Claim Your Seat</h2>
            <p className="section-body mb-8 md:mb-10">
              E-Talks seats fill fast. Register now to be in the audience when these stories are told live.
            </p>
            <div style={{ display:'flex', gap:'clamp(8px,2vw,16px)', justifyContent:'center', flexWrap:'wrap' }}>
              <MagneticButton href="https://learner.vierp.in/events" className="btn-gold">Register Now</MagneticButton>
              <MagneticButton href="/summit-showdown" className="btn-outline">Explore Summit Showdown →</MagneticButton>
            </div>
            <p className="font-cinzel uppercase" style={{ marginTop:'clamp(1.2rem,3vw,2rem)', fontSize:'0.58rem', letterSpacing:'0.3em', color:'rgba(201,168,76,0.35)' }}>
              17–25 MARCH 2026 · VIT PUNE 
            </p>
          </DrawBorder>
        </motion.div>
      </section>

      <Footer/>
    </div>
  )
}