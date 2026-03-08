import React, { useRef, useState } from 'react'; // Added useState
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'; // Added icons
import bgImage from '../assets/throne-home-bg.png'; 
import SectionNav from '../components/SectionNav';
import { Embers } from '../components/Particles';
import { ScrambleText, WordReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/ScrollProgress';

const SECTIONS = [
  { id: 'hero',          label: 'Intro' },
  { id: 'competitions',  label: 'Competitions' },
  { id: 'pitch-perfect', label: 'Pitch Perfect' },
  { id: 'boardroom',     label: 'Boardroom' },
];

const Competition = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY        = useTransform(scrollY, [0, 700], [0, 140]);
  const shaftY     = useTransform(scrollY, [0, 700], [0, 70]);
  const titleY     = useTransform(scrollY, [0, 500], [0, -50]);
  const titleOp    = useTransform(scrollY, [0, 380], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 400], [1, 0.92]);

  // State to track which competition has "more details" open
  const [expandedId, setExpandedId] = useState(null);

  const competitions = [
    { 
      id: 'pitch-perfect', 
      title: "Pitch Perfect", 
      description: "Pitch Perfect is an exciting pitching competition that tests participants’ creativity, business thinking, and persuasive communication skills. The event takes place in multiple rounds where participants pitch product ideas, engage in brand pitch battles, and defend their arguments using real data and strong reasoning.",
      tagline: "Spontaneous Innovation",
      rulebookLink: "https://drive.google.com/file/d/1JrWOrun_Mx4aH0E40MVunISZMIV6vmND/view?usp=drive_link",
      rulebookText: "Pitch Perfect Rulebook"
    },
    { 
      id: 'boardroom', 
      title: "Boardroom", 
      description: "Step into the shoes of real corporate leaders, taking on high-stakes roles and tackling real-world business scenarios that demand sharp thinking, teamwork, and decisive action.",
      tagline: "Corporate Strategy",
      rulebookLink: "https://drive.google.com/file/d/1AUYhAszaX4jjAhMBEvzfmvj6lTU6BTTW/view?usp=sharing",
      rulebookText: "The Boardroom Rulebook"
    },
  ];

  return (
    <div style={{ background:'#050507', minHeight:'100vh', fontFamily:'Raleway, sans-serif' }}>
      <SectionNav sections={SECTIONS} />

      {/* ══════ HERO SECTION ══════ */}
      <section id="hero" ref={heroRef}
        className="relative min-h-screen grid place-items-center text-center overflow-hidden"
        style={{ padding: 'clamp(6rem, 12vw, 8rem) clamp(1rem, 5vw, 2rem) clamp(3rem, 6vw, 4rem)' }}>

        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat'
          }} />
          <div style={{ position:'absolute', inset:0, background:`
            radial-gradient(ellipse 70% 55% at 50% 65%, rgba(139,105,20,0.16) 0%, transparent 65%),
            radial-gradient(ellipse 35% 55% at 50% 100%, rgba(201,168,76,0.09) 0%, transparent 55%)` }} />
        </motion.div>

        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: shaftY }}>
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

        <motion.div className="relative z-10 w-full" style={{ y: titleY, opacity: titleOp, scale: titleScale, maxWidth: 'min(820px, 92vw)', margin: '0 auto' }}>
          <motion.div className="flex items-center justify-center mb-6 md:mb-8" style={{ gap: 'clamp(8px,2vw,16px)', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <motion.div style={{ height: 1, width: 'clamp(24px,5vw,40px)', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5))' }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }}/>
            <span className="font-cinzel uppercase text-center"
              style={{ fontSize: 'clamp(0.55rem,1.5vw,0.65rem)', letterSpacing: 'clamp(0.2em,1vw,0.5em)', color: 'rgba(201,168,76,0.7)' }}>
              E-Cell VIT Pune
            </span>
            <motion.div style={{ height: 1, width: 'clamp(24px,5vw,40px)', background: 'linear-gradient(90deg,rgba(201,168,76,0.5),transparent)' }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }}/>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h1 className="font-display font-bold leading-none mb-0 uppercase"
              style={{
                fontSize: 'clamp(3rem, 12vw, 7.5rem)',
                background: 'linear-gradient(150deg,#fff 0%,#f0d080 40%,#c9a84c 70%,#a07828 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: 'drop-shadow(0 0 60px rgba(201,168,76,0.3))',
              }}
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <ScrambleText text="COMPETITIONS" trigger delay={350}/>
            </motion.h1>
          </div>

          <motion.div className="ornament" initial={{ opacity: 0, scaleX: 0.3 }} animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <div className="ornament-line-l"/>
            <motion.div style={{ width: 7, height: 7, background: '#c9a84c', transform: 'rotate(45deg)' }}
              animate={{ boxShadow: ['0 0 6px rgba(201,168,76,0.4)', '0 0 24px rgba(201,168,76,1)', '0 0 6px rgba(201,168,76,0.4)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}/>
            <div className="ornament-line-r"/>
          </motion.div>

          <div className="mb-10 md:mb-12 mt-2">
            <WordReveal
              text="Push your limits. Test your instincts. Enter the arena where ideas are forged into empires."
              className="font-light text-center"
              style={{ color: '#a0988a', fontSize: 'clamp(0.82rem,2.2vw,1rem)', lineHeight: 1.85, maxWidth: 'min(640px,90vw)', margin: '0 auto' }}
              delay={0.04}/>
          </div>

          <motion.div style={{ display: 'flex', gap: 'clamp(8px,2vw,16px)', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}>
            <MagneticButton href="#competitions" className="btn-gold">Explore</MagneticButton>
            <MagneticButton href="https://learner.vierp.in/events" className="btn-outline">Register Now →</MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div style={{ position: 'absolute', bottom: 'clamp(1.5rem,4vw,2rem)', left: '50%', translateX: '-50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <span className="font-cinzel uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.5em', color: 'rgba(201,168,76,0.3)' }}>Scroll</span>
          <motion.div style={{ width: 1, height: 'clamp(28px,5vw,44px)', background: 'linear-gradient(180deg,rgba(201,168,76,0.5),transparent)', originY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.7, 1] }}/>
        </motion.div>
      </section>

      {/* ══════ MAIN CONTENT ══════ */}
      <main className="relative z-10 pt-10 pb-20 px-4 md:px-6">
        <section className="max-w-7xl mx-auto text-center">
          
          <div id="competitions" className="pt-20">
            <div className="max-w-4xl mx-auto mb-16 md:mb-20 bg-black/40 backdrop-blur-md p-6 md:p-10 border border-[#c5a059]/10">
              <h2 className="text-2xl md:text-5xl font-bold mb-6 italic uppercase tracking-wider text-[#c5a059]">Competitions</h2>
              <p className="text-sm md:text-xl text-gray-200 font-light leading-relaxed">
                E-Summit Pune brings to you two of the most thrilling competitions designed to challenge your entrepreneurial instincts and put your skills to the test.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10 md:gap-16 max-w-5xl mx-auto">
            {competitions.map((comp) => (
              <div 
                key={comp.id} 
                id={comp.id} 
                className="group bg-black/50 backdrop-blur-xl border border-[#c5a059]/10 p-8 md:p-24 hover:border-[#c5a059]/50 transition-all duration-700 pt-20 mt-[-20px]" 
              >
                <p className="text-[#c5a059] tracking-[0.3em] text-[8px] md:text-[10px] uppercase mb-4 font-bold">{comp.tagline}</p>
                <h3 className="text-3xl md:text-6xl font-light tracking-[0.2em] uppercase mb-8 group-hover:text-[#c5a059] transition-colors text-white">
                  {comp.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6 italic font-light text-sm md:text-xl max-w-3xl mx-auto px-2">
                  "{comp.description}"
                </p>

                {/* More Details Toggle */}
                <div className="mb-10">
                  <button 
                    onClick={() => setExpandedId(expandedId === comp.id ? null : comp.id)}
                    className="flex items-center justify-center gap-2 mx-auto text-[#c5a059] font-cinzel text-[10px] md:text-[12px] uppercase tracking-widest hover:text-white transition-colors"
                  >
                    {expandedId === comp.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    More Details
                  </button>
                  
                  <AnimatePresence>
                    {expandedId === comp.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-6"
                      >
                        <p className="text-gray-300 font-light text-sm md:text-lg mb-2">View Full Guidelines:</p>
                        <a 
                          href={comp.rulebookLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#c5a059] underline underline-offset-4 font-display italic hover:text-white transition-all text-sm md:text-lg"
                        >
                          {comp.rulebookText}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a 
                  href="https://learner.vierp.in/events" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 md:px-14 py-3 md:py-5 bg-[#c5a059] text-black font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[9px] md:text-[11px] hover:bg-white transition-all"
                >
                  Register now <ExternalLink className="inline-block ml-2 w-3 h-3 md:w-4 md:h-4" />
                </a>
              </div>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
};

export default Competition;