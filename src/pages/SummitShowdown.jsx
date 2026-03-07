import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar        from '../components/Navbar'
import Footer        from '../components/Footer'
import { Confetti }  from '../components/Particles'
import StatCounter   from '../components/StatCounter'
import PerformerCard from '../components/PerformerCard'
import { useReveal } from '../components/useReveal'
import { ScrambleText, WordReveal } from '../components/TextReveal'
import { MagneticButton }           from '../components/ScrollProgress'
import Marquee       from '../components/Marquee'
import SectionNav    from '../components/SectionNav'
import { DrawBorder, ClipReveal, GlowBorder } from '../components/AnimatedBorder'

const COMEDIANS = [
  { type:'Coming Soon',emoji:'🎭', name:'More to be Announced', sub:'Stay tuned',               desc:'The full comedy lineup is being locked in. Follow @v_edc for the reveal.' },
]
const BANDS = [
  { type:'Live Band',  emoji:'🎵', name:'[Band / Artist Name]', sub:'[Genre · From]',           desc:'The headlining act. Genres collide, the crowd ignites — this is what the night builds toward.' },
  { type:'Coming Soon',emoji:'🎶', name:'More to be Announced', sub:'Stay tuned',               desc:'Something that will absolutely set the stage on fire. Dropping soon on @v_edc.' },
]
const SCHEDULE = [
  {emoji:'🚪', act:'Doors Open',           desc:'Arrive early, find your spot, soak it all in.' },
  {emoji:'🎤', act:'Opening Comedy Set',   desc:'The night kicks off. The first comedian takes the stage.' },
  {emoji:'😂', act:'Headline Comedy',      desc:'The main act. No holds barred. The house comes down.' },
  {emoji:'🎸', act:'Live Music — Opening', desc:'The first band takes the stage. Feel it in your chest.' },
  {emoji:'🔥', act:'Headline Live Band',   desc:'The headliner closes Summit Showdown. This is what it\'s been building to.' },
  {emoji:'✨', act:'Grand Finale',         desc:'E-Summit Pune \'26 takes its bow. The ascension is complete. The reign begins.' },
]
const VIBE_ITEMS = [
  { num:'01', head:'World-Class Comedy',       body:'Sharp wit, relatable chaos, an audience that can\'t stop laughing.' },
  { num:'02', head:'Live Music That Moves You', body:'Bands that turn a venue into a memory. You\'ll be talking about it for years.' },
  { num:'03', head:'A True Celebration',       body:'The perfect sendoff for two days of pitches, connections, and ideas.' },
  { num:'04', head:'The Perfect Curtain Call', body:'E-Summit Pune \'26 closes on the highest note possible. Every emotion crystallised.' },
]
const MARQUEE_A = ['Summit Showdown','Stand-up Comedy','Live Music','E-Summit Pune Pune 26','25 March','Grand Finale']
const MARQUEE_B = ['Ascension to Reign','VIT Pune','@v_edc','The Night You Won\'t Forget']
const SECTIONS = [
  { id:'hero',       label:'Intro'      },
  { id:'about',      label:'About'      },
  { id:'performers', label:'Lineup'      },
  { id:'schedule',   label:'Schedule'   },
  { id:'register',   label:'Register'   },
]

function SecHead({ tag, title, body, amber=false }) {
  const [ref, inView] = useReveal()
  return (
    <motion.div ref={ref} className="text-center mb-10 md:mb-14"
      initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}>
      <span className="font-cinzel uppercase block mb-3"
        style={{ fontSize:'clamp(0.58rem,1.5vw,0.65rem)', letterSpacing:'0.38em', color:amber?'#d4690a':'#c9a84c' }}>{tag}</span>
      <h2 className="section-title font-display">{title}</h2>
      {body && <p className="section-body">{body}</p>}
    </motion.div>
  )
}

export default function SummitShowdown() {
  const { scrollY } = useScroll()
  const bgY       = useTransform(scrollY, [0,700], [0,140])
  const shaftY    = useTransform(scrollY, [0,700], [0,70])
  const titleY    = useTransform(scrollY, [0,500], [0,-50])
  const titleOp   = useTransform(scrollY, [0,380], [1,0])
  const titleScale= useTransform(scrollY, [0,400], [1,0.92])

  const [aboutRef, aboutInView] = useReveal()
  const [schedRef, schedInView] = useReveal()
  const [vibeRef,  vibeInView]  = useReveal()
  const [ctaRef,   ctaInView]   = useReveal()

  return (
    <div style={{ background:'#050507', minHeight:'100vh', fontFamily:'Raleway, sans-serif' }}>
      <Navbar/>
      <SectionNav sections={SECTIONS}/>

      {/* ══════ HERO ══════ */}
      <section id="hero"
        className="relative min-h-screen grid place-items-center text-center overflow-hidden"
        style={{ padding:'clamp(6rem,12vw,8rem) clamp(1rem,5vw,2rem) clamp(3rem,6vw,4rem)' }}>

        <motion.div className="absolute inset-0 z-0" style={{ y:bgY }}>
          <div style={{ position:'absolute', inset:0, background:`
            radial-gradient(ellipse 70% 55% at 50% 60%, rgba(139,26,26,0.26) 0%, transparent 65%),
            radial-gradient(ellipse 45% 38% at 25% 72%, rgba(212,105,10,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 45% 38% at 75% 72%, rgba(212,105,10,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 100% 40% at 50% 0%, rgba(5,5,7,1) 0%, transparent 100%),
            linear-gradient(175deg, #050507 0%, #09070a 50%, #0d0808 100%)` }}/>
        </motion.div>

        {/* Spotlights */}
        {[{w:'min(300px,50vw)',color:'rgba(212,105,10,0.04)',delay:'0s'},{w:'min(220px,36vw)',color:'rgba(201,168,76,0.035)',delay:'2s'}].map((s,i)=>(
          <div key={i} style={{
            position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
            width:0, height:0, pointerEvents:'none',
            animation:`spotPulse 4s ease-in-out ${s.delay} infinite`,
            borderLeft:`${s.w} solid transparent`, borderRight:`${s.w} solid transparent`,
            borderBottom:`min(85vh, 700px) solid ${s.color}`,
          }}/>
        ))}

        {/* Shafts */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y:shaftY }}>
          {[{left:'30%',d:'0s'},{left:'50%',d:'2s',wide:true},{left:'70%',d:'4s'}].map((s,i)=>(
            <div key={i} className="shaft" style={{
              left:s.left, animationDelay:s.d, width:s.wide?'2px':'1px',
              background:s.wide
                ?'linear-gradient(180deg,transparent,rgba(201,168,76,0.25) 40%,rgba(201,168,76,0.35) 55%,transparent)'
                :'linear-gradient(180deg,transparent,rgba(139,26,26,0.2) 40%,rgba(139,26,26,0.28) 55%,transparent)',
            }}/>
          ))}
        </motion.div>

        <Confetti count={40}/>

        {/* Content */}
        <motion.div className="relative z-10 w-full" style={{ y:titleY, opacity:titleOp, scale:titleScale, maxWidth:'min(820px,92vw)', margin:'0 auto' }}>

          <motion.div className="flex items-center justify-center mb-6 md:mb-8" style={{ gap:'clamp(8px,2vw,16px)', flexWrap:'wrap' }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}>
            <motion.div style={{ height:1, width:'clamp(24px,5vw,40px)', background:'linear-gradient(90deg,transparent,rgba(212,105,10,0.5))' }}
              initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.3 }}/>
            <span className="font-cinzel uppercase text-center"
              style={{ fontSize:'clamp(0.55rem,1.5vw,0.65rem)', letterSpacing:'clamp(0.2em,1vw,0.45em)', color:'rgba(212,105,10,0.75)' }}>
               E-Cell VIT Pune · 17–25 March 2026
            </span>
            <motion.div style={{ height:1, width:'clamp(24px,5vw,40px)', background:'linear-gradient(90deg,rgba(212,105,10,0.5),transparent)' }}
              initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.3 }}/>
          </motion.div>

          <div style={{ overflow:'hidden' }}>
            <motion.h1 className="font-display leading-none"
              style={{
                fontSize:'clamp(2.4rem,12vw,7rem)',
                background:'linear-gradient(150deg,#fff 0%,#f0d080 30%,#c9a84c 58%,#c0392b 90%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                filter:'drop-shadow(0 0 60px rgba(139,26,26,0.5))',
              }}
              initial={{ y:'100%', opacity:0 }} animate={{ y:0, opacity:1 }}
              transition={{ duration:0.9, delay:0.2, ease:[0.22,1,0.36,1] }}>
              <ScrambleText text="SUMMIT" trigger delay={350}/><br/>
              <ScrambleText text="SHOWDOWN" trigger delay={620}/>
            </motion.h1>
          </div>

          <motion.div className="ornament" initial={{ opacity:0, scaleX:0.3 }} animate={{ opacity:1, scaleX:1 }}
            transition={{ duration:0.8, delay:0.7, ease:[0.22,1,0.36,1] }}>
            <div className="ornament-line-l" style={{ background:'linear-gradient(90deg,transparent,#8b1a1a)' }}/>
            <motion.div style={{ width:7, height:7, background:'#d4690a', transform:'rotate(45deg)' }}
              animate={{ boxShadow:['0 0 6px rgba(212,105,10,0.4)','0 0 26px rgba(212,105,10,1)','0 0 6px rgba(212,105,10,0.4)'] }}
              transition={{ duration:2.5, repeat:Infinity }}/>
            <div className="ornament-line-r" style={{ background:'linear-gradient(90deg,#8b1a1a,transparent)' }}/>
          </motion.div>

          <div className="mb-8 mt-2">
            <WordReveal
              text="The curtain falls on two extraordinary days and it goes out with a bang. Live comedy. Live music. An electric crowd. One unforgettable night."
              className="font-light text-center"
              style={{ color:'#a0988a', fontSize:'clamp(0.82rem,2.2vw,1rem)', lineHeight:1.85, maxWidth:'min(640px,90vw)', margin:'0 auto' }}
              delay={0.04}/>
          </div>

          <motion.div style={{ display:'flex', gap:'clamp(8px,2vw,16px)', justifyContent:'center', flexWrap:'wrap' }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:1.0 }}>
            <MagneticButton href="#performers" className="btn-fire">See the Lineup</MagneticButton>
            <MagneticButton href="/etalks" className="btn-outline">← E-Talks</MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div style={{ position:'absolute', bottom:'clamp(1.5rem,4vw,2rem)', left:'50%', translateX:'-50%', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}>
          <span className="font-cinzel uppercase" style={{ fontSize:'0.5rem', letterSpacing:'0.5em', color:'rgba(212,105,10,0.3)' }}>Scroll</span>
          <motion.div style={{ width:1, height:'clamp(28px,5vw,44px)', background:'linear-gradient(180deg,rgba(212,105,10,0.6),transparent)', originY:0 }}
            animate={{ scaleY:[0,1,1,0], opacity:[0,1,1,0] }}
            transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut', times:[0,0.3,0.7,1] }}/>
        </motion.div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ borderTop:'1px solid rgba(139,26,26,0.15)', borderBottom:'1px solid rgba(139,26,26,0.15)', padding:'10px 0', background:'rgba(139,26,26,0.03)' }}>
        <Marquee items={MARQUEE_A} speed={28} separator="⬥"/>
      </div>

      {/* ══════ ABOUT ══════ */}
      <div id="about" style={{ background:'#0f0f1a', borderBottom:'1px solid rgba(201,168,76,0.08)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,26,26,0.06) 0%, transparent 70%)' }}/>
        <motion.div ref={aboutRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16"
          style={{ paddingTop:'clamp(3rem,6vw,5rem)', paddingBottom:'clamp(3rem,6vw,5rem)', position:'relative', zIndex:1 }}
          initial={{ opacity:0 }} animate={aboutInView?{opacity:1}:{}} transition={{ duration:0.5 }}>
          <div style={{ display:'grid', gap:'clamp(2rem,5vw,3.5rem)', gridTemplateColumns:'repeat(auto-fit, minmax(min(280px,100%),1fr))', alignItems:'center' }}>
            <div>
              <motion.span className="font-cinzel uppercase block mb-3" style={{ fontSize:'clamp(0.58rem,1.5vw,0.65rem)', letterSpacing:'0.35em', color:'#d4690a' }}
                initial={{ opacity:0, x:-20 }} animate={aboutInView?{opacity:1,x:0}:{}} transition={{ duration:0.5 }}>∙ About the Event ∙</motion.span>
              <div style={{ overflow:'hidden' }}>
                <motion.h2 className="font-display text-gold-gradient-sm leading-tight"
                  style={{ fontSize:'clamp(1.5rem,3.5vw,2.4rem)' }}
                  initial={{ y:'100%' }} animate={aboutInView?{y:0}:{}}
                  transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
                  The Night<br/>You Won't Forget
                </motion.h2>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'clamp(0.8rem,2vw,1.25rem)', color:'#a0988a', lineHeight:1.9, fontWeight:300, fontSize:'clamp(0.82rem,2vw,0.95rem)' }}>
              {[
                "Summit Showdown is the grand finale of E-Summit Pune, and we've made sure it goes out with a bang. After days of pitches, talks, and ideas, it's time to let loose and celebrate the spirit of entrepreneurship.",
                "We bring in some of the most talented comedians to get the crowd laughing and live bands to set the stage on fire. Every connection made, every idea sparked celebrated in style.",
                "Summit Showdown is where the energy of the entire event comes together one last time, leaving everyone with memories that last long after the curtain falls.",
              ].map((p,i)=>(
                <motion.p key={i} initial={{ opacity:0, x:40 }} animate={aboutInView?{opacity:1,x:0}:{}}
                  transition={{ delay:0.08*i, duration:0.65, ease:[0.22,1,0.36,1] }}>{p}</motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══ STATS ══ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop:'clamp(2.5rem,5vw,3.5rem)', paddingBottom:'clamp(2.5rem,5vw,3.5rem)' }}>
        <div style={{ display:'grid', gap:'clamp(0.75rem,2vw,1.25rem)', gridTemplateColumns:'repeat(auto-fit,minmax(min(200px,100%),1fr))' }}>
          <StatCounter icon="🎤" display="Stand-up"  label="Top Comedians on Stage"      delay={0}/>
          <StatCounter icon="🎸" display="Live Bands" label="Setting the Stage on Fire"  delay={150}/>
          <StatCounter icon="🌟" display="One Night"  label="Memories That Last Forever" delay={300}/>
        </div>
      </div>

      {/* ══ SECOND MARQUEE ══ */}
      <div style={{ padding:'10px 0' }}>
        <Marquee items={MARQUEE_B} speed={24} reverse separator="⬥"/>
      </div>

      {/* ══════ PERFORMERS ══════ */}
      <div id="performers" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop:'clamp(3rem,6vw,5rem)', paddingBottom:'clamp(3rem,6vw,5rem)' }}>
        <SecHead tag="∙ The Lineup ∙" title="Tonight's Stars" amber
          body="Headlining comedians and bands who will make the final night of E-Summit Pune '26 one for the ages."/>

        {[{ label:'🎭 Stand-Up Comedy', items:COMEDIANS }, { label:'🎸 Live Music', items:BANDS }].map(({ label, items }) => (
          <div key={label} style={{ marginBottom:'clamp(2rem,5vw,3rem)' }}>
            <motion.div style={{ display:'flex', alignItems:'center', gap:'clamp(0.8rem,2vw,1.25rem)', marginBottom:'clamp(1rem,2.5vw,1.5rem)' }}
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5 }}>
              <span className="font-cinzel uppercase" style={{ fontSize:'clamp(0.6rem,1.6vw,0.72rem)', letterSpacing:'0.3em', color:'#c9a84c', whiteSpace:'nowrap' }}>{label}</span>
              <motion.div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(201,168,76,0.3),transparent)', transformOrigin:'left' }}
                initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:0.8 }}/>
            </motion.div>
            <div style={{ display:'grid', gap:'clamp(0.75rem,2vw,1.25rem)', gridTemplateColumns:'repeat(auto-fill,minmax(min(260px,100%),1fr))' }}>
              {items.map((c,i) => <PerformerCard key={i} {...c} delay={i*0.1}/>)}
            </div>
          </div>
        ))}
      </div>

      {/* ══════ SCHEDULE ══════ */}
      <div id="schedule" style={{ background:'#0f0f1a', borderTop:'1px solid rgba(201,168,76,0.07)', padding:'clamp(3rem,6vw,5rem) 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ maxWidth:'min(680px, 94vw)' }}>
          <SecHead tag="∙ The Evening ∙" title="How the Night Unfolds" amber/>
          <motion.div ref={schedRef} style={{ display:'flex', flexDirection:'column', gap:'1.5px' }}
            initial="hidden" animate={schedInView?'show':'hidden'}
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.1 } } }}>
            {SCHEDULE.map(({ emoji, act, desc }, i) => (
              <motion.div key={i}
                variants={{ hidden:{ opacity:0, x:-40 }, show:{ opacity:1, x:0, transition:{ duration:0.6, ease:[0.22,1,0.36,1] } } }}
                style={{ display:'block' }}> {/* Changed to block to remove the left column grid */}
                <motion.div
                  whileHover={{ borderColor:'rgba(212,105,10,0.35)', background:'#1e1e2e', x:4 }}
                  transition={{ duration:0.2 }}
                  style={{ display:'flex', alignItems:'center', gap:'clamp(0.7rem,2vw,1rem)', padding:'clamp(0.7rem,2vw,1rem) clamp(0.8rem,2.5vw,1.25rem)',
                           background:'#16161f', border:'1px solid rgba(201,168,76,0.08)' }}>
                  <motion.span style={{ fontSize:'clamp(1.2rem,3vw,1.5rem)', flexShrink:0 }}
                    whileHover={{ scale:1.3, rotate:[0,-12,12,0] }} transition={{ duration:0.35 }}>{emoji}</motion.span>
                  <div>
                    <p className="font-cinzel" style={{ fontSize:'clamp(0.72rem,1.8vw,0.88rem)', marginBottom:3, color:'#e8e0d0' }}>{act}</p>
                    <p style={{ fontSize:'clamp(0.68rem,1.5vw,0.78rem)', fontWeight:300, color:'#6e6e88' }}>{desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <p className="font-cinzel uppercase text-center" style={{ marginTop:'clamp(0.8rem,2vw,1.25rem)', fontSize:'0.55rem', letterSpacing:'0.25em', color:'rgba(201,168,76,0.3)' }}>
            ∙ Schedule subject to change ∙
          </p>
        </div>
      </div>

          {/* ══════ VIBE ══════ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop:'clamp(3rem,6vw,5rem)', paddingBottom:'clamp(3rem,6vw,5rem)' }}>
        <SecHead tag="∙ What to Expect ∙" title="An Unforgettable Night" amber/>
        <motion.div ref={vibeRef}
          style={{ 
            display:'grid', 
            gap:'1.5px', 
            background:'rgba(201,168,76,0.08)', 
            border:'1px solid rgba(201,168,76,0.08)',
            /* FIXED: Changed auto-fill to auto-fit to remove the 5th empty box */
            gridTemplateColumns:'repeat(auto-fit, minmax(min(220px,100%),1fr))' 
          }}
          initial="hidden" animate={vibeInView?'show':'hidden'}
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 } } }}>
          
          {VIBE_ITEMS.map(({ num, head, body }) => (
            <motion.div key={num}
              variants={{ hidden:{ opacity:0, y:40, clipPath:'inset(0 0 100% 0)' }, show:{ opacity:1, y:0, clipPath:'inset(0 0 0% 0)', transition:{ duration:0.7 } } }}
              whileHover={{ background:'#1e1e2e', y:-4 }}
              style={{ background:'#16161f', padding:'clamp(1.2rem,3vw,2rem)', cursor:'default', transition:'background 0.3s, transform 0.3s' }}>
              <motion.div className="font-display leading-none mb-4"
                style={{ fontSize:'clamp(1.8rem,4vw,2.5rem)', color:'rgba(212,105,10,0.12)' }}
                whileHover={{ color:'rgba(212,105,10,0.35)' }} transition={{ duration:0.3 }}>{num}</motion.div>
              <h4 className="font-cinzel" style={{ fontSize:'clamp(0.78rem,1.8vw,0.88rem)', marginBottom:8, color:'#e8e0d0' }}>{head}</h4>
              <p style={{ fontSize:'clamp(0.75rem,1.6vw,0.82rem)', lineHeight:1.75, fontWeight:300, color:'#6e6e88' }}>{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══════ CTA ══════ */}
      <section id="register" style={{
        position:'relative', textAlign:'center', overflow:'hidden',
        padding:'clamp(4rem,8vw,7rem) clamp(1rem,4vw,2rem)',
        background:'linear-gradient(175deg,#050507 0%,#0d0808 50%,#050507 100%)',
        borderTop:'1px solid rgba(139,26,26,0.2)',
      }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,26,26,0.1), transparent)' }}/>
        <motion.span style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', fontSize:'clamp(4rem,16vw,12rem)', opacity:0.02, pointerEvents:'none', userSelect:'none' }}
          animate={{ scale:[1,1.03,1] }} transition={{ duration:6, repeat:Infinity }}>🎸</motion.span>

        <motion.div ref={ctaRef} style={{ position:'relative', zIndex:10, maxWidth:'min(560px,90vw)', margin:'0 auto' }}
          initial={{ opacity:0, y:40 }} animate={ctaInView?{opacity:1,y:0}:{}}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
          <DrawBorder color="rgba(139,26,26,0.5)" style={{ padding:'clamp(1.5rem,4vw,3rem)', background:'rgba(139,26,26,0.03)' }}>
            <span className="font-cinzel uppercase block mb-3" style={{ fontSize:'clamp(0.58rem,1.5vw,0.65rem)', letterSpacing:'0.38em', color:'#d4690a' }}>
              
            </span>
            <h2 className="section-title font-display mb-4"> - Don't Miss the Finale - </h2>
            <p className="section-body" style={{ marginBottom:'clamp(1.5rem,4vw,2.5rem)' }}>
              Summit Showdown is included with your E-Summit Pune pass. Register now and secure your spot.
            </p>
            <div style={{ display:'flex', gap:'clamp(8px,2vw,16px)', justifyContent:'center', flexWrap:'wrap' }}>
              <MagneticButton href="https://learner.vierp.in/events" className="btn-fire">Get Your Pass</MagneticButton>
              <MagneticButton href="/etalks" className="btn-outline">← Explore E-Talks</MagneticButton>
            </div>
            <p className="font-cinzel uppercase" style={{ marginTop:'clamp(1.2rem,3vw,2rem)', fontSize:'0.58rem', letterSpacing:'0.3em', color:'rgba(201,168,76,0.35)' }}>
              25 MARCH 2026 · @v_edc · VIT PUNE 
            </p>
          </DrawBorder>
        </motion.div>
      </section>

      {/* ══ FINAL MARQUEE ══ */}
      <div style={{ borderTop:'1px solid rgba(201,168,76,0.06)', padding:'10px 0' }}>
        <Marquee items={[...MARQUEE_A,...MARQUEE_B]} speed={38} separator="⬥"/>
      </div>

      <Footer/>
    </div>
  )
}