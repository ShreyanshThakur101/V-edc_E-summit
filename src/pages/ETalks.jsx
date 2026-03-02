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

const SPEAKERS = [
  { number:1, domain:'Business',         name:'[Speaker Name]', title:'[Title · Organisation]', bio:'2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
  { number:2, domain:'Politics',         name:'[Speaker Name]', title:'[Title · Organisation]', bio:'2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
  { number:3, domain:'Content Creation', name:'[Speaker Name]', title:'[Title · Organisation]', bio:'2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
  { number:4, domain:'Acting',           name:'[Speaker Name]', title:'[Title · Organisation]', bio:'2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
  { number:5, domain:'Technical',        name:'[Speaker Name]', title:'[Title · Organisation]', bio:'2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
  { number:6, domain:'Social Impact',    name:'[Speaker Name]', title:'[Title · Organisation]', bio:'2–3 sentence bio about this speaker\'s journey and what they bring to the E-Talks stage.' },
]
const DOMAINS   = ['Business','Politics','Content Creation','Acting','Technical Founding','Social Impact','& Beyond']
const MARQUEE_A = ['E-Talks','E-Summit Pune 26','Ascension to Reign','17–25 March','VIT Pune','VEDC']
const MARQUEE_B = ['Business','Politics','Acting','Content Creation','Technical Founding','Social Impact']
const WHY_ITEMS = [
  { num:'01', head:'Unfiltered Stories',  body:'No PR polish — just the raw truth of building from those who have lived it.' },
  { num:'02', head:'Cross-Domain Voices', body:'From politics to film to deep tech. Grit and vision transcend every field.' },
  { num:'03', head:'Ignited Ambition',    body:'Every talk shifts your perspective and fires up your own path.' },
  { num:'04', head:'Real-World Lessons',  body:'Wisdom earned through navigating industries, failures, and pivots firsthand.' },
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
              E-Cell VIT Pune · VEDC · 17–25 March 2026
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
          <div className="mb-6 md:mb-8 mt-2">
            <WordReveal
              text="Extraordinary individuals. Unfiltered stories. One stage. E-Talks brings together voices from every domain — those who've built, navigated, failed, and risen."
              className="font-light text-center"
              style={{ color:'#a0988a', fontSize:'clamp(0.82rem,2.2vw,1rem)', lineHeight:1.85, maxWidth:'min(640px,90vw)', margin:'0 auto' }}
              delay={0.04}/>
          </div>

          {/* Domain pills */}
          <motion.div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'clamp(5px,1.5vw,8px)', marginBottom:'clamp(1.5rem,4vw,2.5rem)' }}
            initial="hidden" animate="visible"
            variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.06, delayChildren:0.7 } } }}>
            {DOMAINS.map(d => (
              <motion.span key={d}
                className="font-cinzel uppercase"
                style={{
                  fontSize:'clamp(0.5rem,1.4vw,0.6rem)', letterSpacing:'0.18em',
                  padding:'clamp(4px,1vw,6px) clamp(8px,2vw,16px)',
                  color:'rgba(201,168,76,0.65)', border:'1px solid rgba(201,168,76,0.22)',
                  background:'rgba(201,168,76,0.04)', cursor:'default',
                }}
                variants={{ hidden:{ opacity:0, scale:0.8, y:10 }, visible:{ opacity:1, scale:1, y:0, transition:{ duration:0.4 } } }}
                whileHover={{ scale:1.08, color:'#f0d080', borderColor:'rgba(201,168,76,0.6)' }}>
                {d}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
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

      {/* ══ MARQUEE ══ */}
      <div style={{ borderTop:'1px solid rgba(201,168,76,0.07)', borderBottom:'1px solid rgba(201,168,76,0.07)', padding:'10px 0', background:'rgba(201,168,76,0.015)' }}>
        <Marquee items={MARQUEE_A} speed={30}/>
      </div>

      {/* ══════ ABOUT ══════ */}
      <div id="about" style={{ background:'#10101a', borderBottom:'1px solid rgba(201,168,76,0.08)' }}>
        {/* ADDED TAILWIND CONTAINER CLASSES HERE */}
        <motion.div ref={aboutRef}
          className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16"
          style={{ paddingTop:'clamp(3rem,6vw,5rem)', paddingBottom:'clamp(3rem,6vw,5rem)' }}
          initial={{ opacity:0 }} animate={aboutInView?{opacity:1}:{}} transition={{ duration:0.5 }}>

          {/* Responsive: stacked on phone, side-by-side on md+ */}
          <div style={{ display:'grid', gap:'clamp(2rem,5vw,3.5rem)', gridTemplateColumns:'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', alignItems:'center' }}>
            <div>
              <motion.span className="font-cinzel uppercase block mb-3" style={{ fontSize:'clamp(0.58rem,1.5vw,0.65rem)', letterSpacing:'0.35em', color:'#c9a84c' }}
                initial={{ opacity:0, x:-20 }} animate={aboutInView?{opacity:1,x:0}:{}} transition={{ duration:0.5 }}>
                ∙ About E-Talks ∙
              </motion.span>
              <div style={{ overflow:'hidden' }}>
                <motion.h2 className="font-display text-gold-gradient-sm leading-tight"
                  style={{ fontSize:'clamp(1.5rem,3.5vw,2.4rem)' }}
                  initial={{ y:'100%' }} animate={aboutInView?{y:0}:{}}
                  transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
                  More Than<br/>Just a Talk
                </motion.h2>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'clamp(0.8rem,2vw,1.25rem)', color:'#a0988a', lineHeight:1.9, fontWeight:300, fontSize:'clamp(0.82rem,2vw,0.95rem)' }}>
              {[
                "E-Talks is one of the most anticipated segments of E-Summit, where we bring together extraordinary individuals from a diverse range of domains — business, politics, content creation, acting, technical founding, or beyond.",
                "Each speaker takes the stage to share their unique journey, the challenges they've overcome, and the lessons that have shaped them. It's a window into the real, unfiltered world of building something from scratch.",
                "E-Talks is designed to spark curiosity, ignite ambition, and leave every member of the audience with a fresh perspective and the motivation to carve out their own path.",
              ].map((p,i) => (
                <motion.p key={i}
                  initial={{ opacity:0, x:40 }} animate={aboutInView?{opacity:1,x:0}:{}}
                  transition={{ delay:0.08*i, duration:0.65, ease:[0.22,1,0.36,1] }}>{p}</motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══ STATS ══ */}
      {/* ADDED TAILWIND CONTAINER CLASSES HERE */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop:'clamp(2.5rem,5vw,3.5rem)', paddingBottom:'clamp(2.5rem,5vw,3.5rem)' }}>
        <div style={{ display:'grid', gap:'clamp(0.75rem,2vw,1.25rem)', gridTemplateColumns:'repeat(auto-fit, minmax(min(220px, 100%), 1fr))' }}>
          <StatCounter icon="🎤" display="12+" target={12} suffix="+" label="Speakers Across Domains" delay={0}/>
          <StatCounter icon="🏛️" display="2"   target={2}           label="Days on the Grand Stage"  delay={150}/>
          <StatCounter icon="⚡" display="5K+" target={5000} suffix="+" label="Inspired Attendees"  delay={300}/>
        </div>
      </div>

      {/* ══ SECOND MARQUEE ══ */}
      <div style={{ padding:'10px 0', background:'rgba(201,168,76,0.01)' }}>
        <Marquee items={MARQUEE_B} speed={22} reverse/>
      </div>

      {/* ══════ KEYNOTE ══════ */}
      {/* ADDED TAILWIND CONTAINER CLASSES HERE */}
      <div id="speakers" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop:'clamp(3rem,6vw,5rem)', paddingBottom:0 }}>
        <SecHead tag="∙ Opening Keynote ∙" title="The Sovereign Voice"
          body="Our keynote speaker opens E-Summit '26 with a session that sets the tone — raw, real, and unforgettable."/>

        <ClipReveal delay={0.1}>
          <GlowBorder className="relative overflow-hidden mb-12 md:mb-16"
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(300px,100%),1fr))' }}>
            <span className="font-cinzel uppercase"
              style={{ position:'absolute', top:14, right:-36, transform:'rotate(45deg)', zIndex:10,
                       fontSize:'0.55rem', letterSpacing:'0.3em', padding:'3px 52px',
                       background:'#c9a84c', color:'#050507' }}>Keynote</span>

            {/* Photo */}
            <div style={{ position:'relative', minHeight:'clamp(240px,40vw,480px)', background:'linear-gradient(135deg,#0a0a14,#181028)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              <motion.span className="font-display" style={{ fontSize:'clamp(2rem,6vw,4rem)', color:'rgba(201,168,76,0.12)', zIndex:1, position:'relative' }}
                animate={{ scale:[1,1.05,1], opacity:[0.12,0.22,0.12] }} transition={{ duration:3, repeat:Infinity }}>✦</motion.span>
              <p className="font-cinzel uppercase" style={{ position:'absolute', bottom:'clamp(40px,8vw,70px)', fontSize:'0.52rem', letterSpacing:'0.35em', color:'rgba(201,168,76,0.2)', zIndex:1 }}>Keynote Speaker Photo</p>
              {/* Fade to right on desktop, fade to bottom on mobile */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 50%,rgba(22,22,31,1) 100%)' }} className="hidden md:block"/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 50%,rgba(22,22,31,1) 100%)' }} className="md:hidden"/>
            </div>

            {/* Text */}
            <div style={{ padding:'clamp(1.5rem,4vw,3rem)', display:'flex', flexDirection:'column', justifyContent:'center', borderLeft:'1px solid rgba(201,168,76,0.12)' }}>
              <p className="font-cinzel" style={{ fontSize:'0.58rem', letterSpacing:'0.4em', marginBottom:'clamp(0.8rem,2vw,1.25rem)', color:'#c9a84c' }}>⬥ Day 1 · Opening Keynote</p>
              <h3 className="font-display text-white leading-tight" style={{ fontSize:'clamp(1.3rem,3vw,2.2rem)', marginBottom:8 }}>[Speaker Name]</h3>
              <p className="font-cinzel" style={{ fontSize:'0.72rem', fontWeight:500, marginBottom:'clamp(0.8rem,2vw,1.25rem)', color:'#c9a84c' }}>[Title] · [Domain / Organisation]</p>
              <blockquote style={{ fontStyle:'italic', lineHeight:1.85, marginBottom:'clamp(1rem,2.5vw,1.5rem)', color:'#a0988a',
                                   borderLeft:'2px solid rgba(201,168,76,0.35)', paddingLeft:'clamp(0.8rem,2vw,1.2rem)',
                                   fontSize:'clamp(0.82rem,1.8vw,0.95rem)' }}>
                "[A powerful quote from the speaker — add once confirmed.]"
              </blockquote>
              <p style={{ fontSize:'clamp(0.78rem,1.7vw,0.88rem)', lineHeight:1.78, fontWeight:300, marginBottom:'clamp(1.2rem,3vw,2rem)', color:'#6e6e88' }}>
                [Speaker bio — 2–3 sentences on their journey and the perspective they'll bring.]
              </p>
              <MagneticButton href="#register" className="btn-gold" style={{ alignSelf:'flex-start' }}>Register to Attend</MagneticButton>
            </div>
          </GlowBorder>
        </ClipReveal>

        {/* Speaker grid */}
        <SecHead tag="∙ This Year's Voices ∙" title="The Speakers"
          body="From boardrooms to film sets, government offices to viral screens — every story on this stage is worth hearing."/>

        {/* Grid: 1 col phone / 2 col tablet / 3 col desktop / auto-fit for large */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(280px,100%),1fr))', gap:'1.5px', background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.1)' }}>
          {SPEAKERS.map((s,i) => <SpeakerCard key={i} {...s} delay={i*0.07}/>)}
        </div>

        <motion.div style={{ textAlign:'center', marginTop:'clamp(1rem,3vw,2rem)' }}
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
          <motion.span className="font-cinzel uppercase inline-block"
            style={{ fontSize:'0.6rem', letterSpacing:'0.35em', padding:'6px clamp(12px,3vw,24px)',
                     color:'rgba(201,168,76,0.4)', border:'1px solid rgba(201,168,76,0.15)', background:'rgba(201,168,76,0.03)' }}
            animate={{ opacity:[0.4,0.9,0.4] }} transition={{ duration:3, repeat:Infinity }}>
            ✦ &nbsp; More Speakers to be Announced &nbsp; ✦
          </motion.span>
        </motion.div>
      </div>

      {/* ══════ WHY ATTEND ══════ */}
      <div id="why" style={{ background:'#0f0f1a', borderTop:'1px solid rgba(201,168,76,0.07)', borderBottom:'1px solid rgba(201,168,76,0.07)', padding:'clamp(3rem,6vw,5rem) 0' }}>
        {/* ADDED TAILWIND CONTAINER CLASSES HERE */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <SecHead tag="∙ Why E-Talks ∙" title="What You'll Take Away"/>
          <motion.div ref={whyRef}
            style={{ display:'grid', gap:'1.5px', background:'rgba(201,168,76,0.08)', border:'1px solid rgba(201,168,76,0.08)',
                     gridTemplateColumns:'repeat(auto-fill, minmax(min(220px,100%),1fr))' }}
            initial="hidden" animate={whyInView?'show':'hidden'}
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 } } }}>
            {WHY_ITEMS.map(({ num, head, body }) => (
              <motion.div key={num}
                variants={{ hidden:{ opacity:0, y:40, clipPath:'inset(0 0 100% 0)' }, show:{ opacity:1, y:0, clipPath:'inset(0 0 0% 0)', transition:{ duration:0.7 } } }}
                whileHover={{ background:'#1e1e2e', y:-4 }}
                style={{ background:'#16161f', padding:'clamp(1.2rem,3vw,2rem)', cursor:'default', transition:'background 0.3s, transform 0.3s' }}>
                <motion.div className="font-display leading-none mb-4"
                  style={{ fontSize:'clamp(1.8rem,4vw,2.5rem)', color:'rgba(201,168,76,0.1)' }}
                  whileHover={{ color:'rgba(201,168,76,0.3)' }} transition={{ duration:0.3 }}>{num}</motion.div>
                <h4 className="font-cinzel" style={{ fontSize:'clamp(0.78rem,1.8vw,0.88rem)', marginBottom:8, color:'#e8e0d0' }}>{head}</h4>
                <p style={{ fontSize:'clamp(0.75rem,1.6vw,0.82rem)', lineHeight:1.75, fontWeight:300, color:'#6e6e88' }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════ CTA ══════ */}
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
            <span className="section-tag">∙ Be in the Room ∙</span>
            <h2 className="section-title font-display mb-4">Claim Your Seat</h2>
            <p className="section-body mb-8 md:mb-10">
              E-Talks seats fill fast. Register now to be in the audience when these stories are told live.
            </p>
            <div style={{ display:'flex', gap:'clamp(8px,2vw,16px)', justifyContent:'center', flexWrap:'wrap' }}>
              <MagneticButton href="#" className="btn-gold">Register Now</MagneticButton>
              <MagneticButton href="/summit-showdown" className="btn-outline">Explore Summit Showdown →</MagneticButton>
            </div>
            <p className="font-cinzel uppercase" style={{ marginTop:'clamp(1.2rem,3vw,2rem)', fontSize:'0.58rem', letterSpacing:'0.3em', color:'rgba(201,168,76,0.35)' }}>
              17–25 MARCH 2026 · VIT PUNE · @v_edc
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