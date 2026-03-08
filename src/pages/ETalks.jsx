import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar        from '../components/Navbar'
import Footer        from '../components/Footer'
import { Embers }    from '../components/Particles'
import StatCounter   from '../components/StatCounter'
import SpeakerCard   from '../components/SpeakerCard'
import { useReveal } from '../components/useReveal'
import { ScrambleText, WordReveal } from '../components/TextReveal'
import { MagneticButton }           from '../components/ScrollProgress'
import Marquee       from '../components/Marquee'
import SectionNav    from '../components/SectionNav'
import { DrawBorder, ClipReveal, GlowBorder } from '../components/AnimatedBorder'


// IMPORT SPEAKER PHOTOS
import speaker1 from '../assets/summit_speaker1_image.png'; 
import speaker2 from '../assets/summit_speaker2_image.png'; 
import speaker3 from '../assets/showdown_speaker_1_image.png'; 

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
    number: 3, 
    domain: 'Acting & Content', 
    name: 'Deesha Katkar', 
    title: 'Actor & Content Creator', 
    image: speaker3, 
    bio: 'Bridging the worlds of digital storytelling and performance, she brings a unique perspective on building a modern personal brand.' 
  },
  { number: 4, domain: 'Content Creation', name: '[Speaker Name]', title: '[Title · Organisation]', bio: '2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
  { number: 5, domain: 'Technical', name: '[Speaker Name]', title: '[Title · Organisation]', bio: '2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
  { number: 6, domain: 'Social Impact', name: '[Speaker Name]', title: '[Title · Organisation]', bio: '2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
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

function SecHead({ tag, title, body }) {
  const [ref, inView] = useReveal()
  return (
    <motion.div ref={ref} className="text-center mb-10 md:mb-14"
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title font-display">{title}</h2>
      {body && <p className="section-body">{body}</p>}
    </motion.div>
  )
}

export default function ETalks() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const bgY       = useTransform(scrollY, [0,700], [0,140])
  const shaftY    = useTransform(scrollY, [0,700], [0,70])
  const titleY    = useTransform(scrollY, [0,500], [0,-50])
  const titleOp   = useTransform(scrollY, [0,380], [1,0])
  const titleScale= useTransform(scrollY, [0,400], [1,0.92])

  const [aboutRef, aboutInView] = useReveal()
  const [whyRef,   whyInView]   = useReveal()
  const [ctaRef,   ctaInView]   = useReveal()

  // Updated SecHead with conditional styling
function SecHead({ tag, title, body, isKeynote }) {
  const [ref, inView] = useReveal()
  return (
    <motion.div ref={ref} className="text-center mb-10 md:mb-14"
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
      
      {/* TAG: Conditional size increase. 
          If isKeynote is true, it uses a larger clamp and wider spacing. 
      */}
      <span 
        className="section-tag" 
        style={isKeynote ? { 
          fontSize: 'clamp(0.85rem, 2vw, 1.15rem)', 
          letterSpacing: '0.5em',
          fontWeight: 600
        } : {}}
      >
        {tag}
      </span>

      <h2 className="section-title font-display">{title}</h2>
      {body && <p className="section-body">{body}</p>}
    </motion.div>
  )
}

  return (
    <div style={{ background:'#050507', minHeight:'100vh', fontFamily:'Raleway, sans-serif' }}>
      <Navbar />
      <SectionNav sections={SECTIONS} />

      {/* ══════ HERO ══════ */}
       <section id="hero" ref={heroRef}
        className="relative min-h-screen grid place-items-center text-center overflow-hidden"
        style={{ padding: 'clamp(6rem, 12vw, 8rem) clamp(1rem, 5vw, 2rem) clamp(3rem, 6vw, 4rem)' }}>

        {/* BG layers */}
        <motion.div className="absolute inset-0 z-0" style={{ y:bgY }}>
          <div style={{ position:'absolute', inset:0, background:`
            radial-gradient(ellipse 70% 55% at 50% 65%, rgba(139,105,20,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 35% 55% at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 100% 40% at 50% 0%, rgba(5,5,7,1) 0%, transparent 100%),
            linear-gradient(170deg, #050507 0%, #07070e 55%, #0a0a10 100%)` }} />
        </motion.div>

        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y:shaftY }}>
          {[{left:'20%',d:'0s'},{left:'40%',d:'1.5s'},{left:'60%',d:'3s',wide:true},{left:'80%',d:'4.5s'}].map((s,i)=>(
            <div key={i} className="shaft" style={{
              left:s.left, animationDelay:s.d, width:s.wide?'2px':'1px',
              background:s.wide
                ?'linear-gradient(180deg,transparent,rgba(201,168,76,0.28) 42%,rgba(201,168,76,0.38) 55%,transparent)'
                :'linear-gradient(180deg,transparent,rgba(201,168,76,0.12) 40%,rgba(201,168,76,0.18) 55%,transparent)',
            }}/>
          ))}
        </motion.div>
        <Embers count={28}/>

        {/* Content */}
        <motion.div className="relative z-10 w-full" style={{ y:titleY, opacity:titleOp, scale:titleScale, maxWidth:'min(820px, 92vw)', margin:'0 auto' }}>

          {/* Eyebrow */}
          <motion.div className="flex items-center justify-center mb-6 md:mb-8" style={{ gap:'clamp(8px,2vw,16px)', flexWrap:'wrap' }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}>
            <motion.div style={{ height:1, width:'clamp(24px,5vw,40px)', background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.5))' }}
              initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.3 }}/>
            <span className="font-cinzel uppercase text-center"
              style={{ fontSize:'clamp(0.55rem,1.5vw,0.65rem)', letterSpacing:'clamp(0.2em,1vw,0.5em)', color:'rgba(201,168,76,0.7)' }}>
              E-Cell VIT Pune · 17–25 March 2026
            </span>
            <motion.div style={{ height:1, width:'clamp(24px,5vw,40px)', background:'linear-gradient(90deg,rgba(201,168,76,0.5),transparent)' }}
              initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.3 }}/>
          </motion.div>

          {/* Main title */}
          <div style={{ overflow:'hidden' }}>
            <motion.h1 className="font-display leading-none mb-0"
              style={{
                fontSize:'clamp(3rem, 14vw, 8rem)',
                background:'linear-gradient(150deg,#fff 0%,#f0d080 40%,#c9a84c 70%,#a07828 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                filter:'drop-shadow(0 0 60px rgba(201,168,76,0.3))',
              }}
              initial={{ y:'100%', opacity:0 }} animate={{ y:0, opacity:1 }}
              transition={{ duration:0.9, delay:0.2, ease:[0.22,1,0.36,1] }}>
              <ScrambleText text="E-TALKS" trigger delay={350}/>
            </motion.h1>
          </div>

          {/* Ornament */}
          <motion.div className="ornament" initial={{ opacity:0, scaleX:0.3 }} animate={{ opacity:1, scaleX:1 }}
            transition={{ duration:0.8, delay:0.6, ease:[0.22,1,0.36,1] }}>
            <div className="ornament-line-l"/>
            <motion.div style={{ width:7, height:7, background:'#c9a84c', transform:'rotate(45deg)' }}
              animate={{ boxShadow:['0 0 6px rgba(201,168,76,0.4)','0 0 24px rgba(201,168,76,1)','0 0 6px rgba(201,168,76,0.4)'] }}
              transition={{ duration:2.5, repeat:Infinity }}/>
            <div className="ornament-line-r"/>
          </motion.div>

          {/* Tagline */}
          <div className="mb-10 md:mb-12 mt-2">
            <WordReveal
              text="Extraordinary individuals. Unfiltered stories. One stage. E-Talks brings together voices from every domain those who've built, navigated, failed, and risen."
              className="font-light text-center"
              style={{ color:'#a0988a', fontSize:'clamp(0.82rem,2.2vw,1rem)', lineHeight:1.85, maxWidth:'min(640px,90vw)', margin:'0 auto' }}
              delay={0.04}/>
          </div>

          {/* CTAs - Now directly under tagline since boxes were removed */}
          <motion.div style={{ display:'flex', gap:'clamp(8px,2vw,16px)', justifyContent:'center', flexWrap:'wrap' }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:1.0 }}>
            <MagneticButton href="#speakers" className="btn-gold">Meet the Speakers</MagneticButton>
            <MagneticButton href="/summit-showdown" className="btn-outline">Summit Showdown →</MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div style={{ position:'absolute', bottom:'clamp(1.5rem,4vw,2rem)', left:'50%', translateX:'-50%', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}>
          <span className="font-cinzel uppercase" style={{ fontSize:'0.5rem', letterSpacing:'0.5em', color:'rgba(201,168,76,0.3)' }}>Scroll</span>
          <motion.div style={{ width:1, height:'clamp(28px,5vw,44px)', background:'linear-gradient(180deg,rgba(201,168,76,0.5),transparent)', originY:0 }}
            animate={{ scaleY:[0,1,1,0], opacity:[0,1,1,0] }}
            transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut', times:[0,0.3,0.7,1] }}/>
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
            <StatCounter icon="" display="12+" target={12} suffix="+" label="Speakers Across Domains" delay={0}/>
            <StatCounter icon="" display="2"   target={2}           label="Days on the Grand Stage"  delay={150}/>
            <StatCounter icon="" display="5K+" target={5000} suffix="+" label="Inspired Attendees"  delay={300}/>
          </div>
        </div>
      </div>

      {/* ══════ KEYNOTE ══════ */}
      <div id="speakers" className="max-w-7xl mx-auto px-6 py-20">
        <SecHead tag="∙ Opening Keynote ∙" title="The Sovereign Voice" body="Our keynote speaker sets the tone raw, real, and unforgettable."
        isKeynote={true}/>
        {/* <ClipReveal delay={0.1}>
          <GlowBorder className="relative overflow-hidden grid md:grid-cols-2">
            <span className="font-cinzel uppercase" style={{ position:'absolute', top:14, right:-36, transform:'rotate(45deg)', zIndex:10, fontSize:'0.55rem', padding:'3px 52px', background:'#c9a84c', color:'#050507' }}>Keynote</span>
            <div style={{ position:'relative', minHeight:'400px', background:'linear-gradient(135deg,#0a0a14,#181028)', overflow:'hidden' }}>
              <motion.img src={speaker1} alt="Dr. Sanjay Katkar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 60%,rgba(22,22,31,1) 100%)' }} />
            </div>
            <div className="p-8 flex flex-col justify-center space-y-4 border-l border-white/10">
              <p className="font-cinzel text-[#c9a84c] text-xs">⬥ Day 1 · Opening Keynote</p>
              <h3 className="font-display text-white text-3xl">Dr. Sanjay Katkar</h3>
              <p className="font-cinzel text-[#c9a84c] text-sm">Co-Founder & Jt. MD · Quick Heal Technologies</p>
              <blockquote className="italic border-l-2 border-[#c9a84c]/40 pl-4 text-[#a0988a]">"Innovation is not just about technology..."</blockquote>
              <p className="text-[#6e6e88] text-sm">A visionary leader scaling Quick Heal into a global name.</p>
              <MagneticButton href="https://learner.vierp.in/events" className="btn-gold">Register to Attend</MagneticButton>
            </div>
          </GlowBorder>
        </ClipReveal> */}
        
        {/* SPEAKERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 mt-20">
          {SPEAKERS.map((s,i) => <SpeakerCard key={i} {...s} delay={i*0.07}/>)}
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

      {/* ══════ REGISTER SECTION (Claim Your Seat) ══════ */}
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
              17–25 MARCH 2026 · @v_edc · VIT PUNE 
            </p>
          </DrawBorder>
        </motion.div>
      </section>

      {/* ══ FINAL MARQUEE ══ */}
      <div style={{ borderTop:'1px solid rgba(201,168,76,0.06)', padding:'10px 0' }}>
        <Marquee items={[...MARQUEE_A,...MARQUEE_B]} speed={40}/>
      </div>

      <Footer/>
    </div>
  )
}