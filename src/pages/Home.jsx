import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReveal } from '../components/useReveal';
import { ScrambleText, WordReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/ScrollProgress';
import MetricCounter from '../components/MetricCounter';
import Marquee from '../components/Marquee';
import SectionNav from '../components/SectionNav';
import Footer from '../components/Footer';
import { DrawBorder } from '../components/AnimatedBorder';
import { Embers } from '../components/Particles';

import bgImage from '../assets/throne-home-bg.png'; 
import summitLogo from '../assets/summit_logo.png'; 

import { Rocket, Mic2, Briefcase, MessageSquare, Trophy, ArrowUpRight } from 'lucide-react';

const SECTIONS = [
  { id: 'hero',     label: 'Welcome' },
  { id: 'stats',    label: 'The Scale' },
  { id: 'about',    label: 'Vision' },
  { id: 'lineup',   label: 'Events' },
  { id: 'schedule', label: 'Timeline' },
  { id: 'register', label: 'Join Us' },
];

const EVENTS = [
  { 
    title: "Startup Showcase", 
    desc: "A high-stakes platform where innovation meets investment. Watch the region's boldest startups pitch live to industry titans.", 
    icon: Rocket,
    tag: "Pitching"
  },
  { 
    title: "Pitch Perfect", 
    desc: "The ultimate test of wit and adaptability. Competitors must build and pitch a business model using surprise keywords.", 
    icon: Mic2,
    tag: "Skill"
  },
  { 
    title: "The Boardroom", 
    desc: "Step into the shoes of a corporate leader. Solve real-world crises and navigate complex business landscapes.", 
    icon: Briefcase,
    tag: "Corporate"
  },
  { 
    title: "E-Talks", 
    desc: "Extraordinary individuals. Unfiltered stories. Gain insights from the raw truth of building from those who lived it.", 
    icon: MessageSquare,
    tag: "Talks"
  },
  { 
    title: "Summit Showdown", 
    desc: "The grand finale. A celebration of talent, grit, and entrepreneurial spirit that marks the peak of Ascension to Reign.", 
    icon: Trophy,
    tag: "Finale"
  }
];

const MARQUEE_ITEMS = ['Innovation', 'Leadership', 'Grit', 'Vision', 'Ascension', 'Excellence', 'Entrepreneurship', 'Impact'];

const Home = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  const bgY       = useTransform(scrollY, [0, 800], [0, 200]);
  const contentY  = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOp = useTransform(scrollY, [0, 500], [1, 0]);
  const glowScale = useTransform(scrollY, [0, 600], [1, 1.2]);

  const [aboutRef, aboutInView] = useReveal();
  const [eventsRef, eventsInView] = useReveal();
  const [timeRef, timeInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  return (
    <div className="bg-[#050507] min-h-screen selection:bg-[#c9a84c]/30">
      <SectionNav sections={SECTIONS} />
      
      {/* ═ HERO SECTION ═ */}
      <section id="hero" ref={heroRef} 
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ padding: 'clamp(6rem, 12vw, 8rem) clamp(1rem, 5vw, 2rem) clamp(3rem, 6vw, 4rem)' }}
      >
        <motion.div className="absolute inset-0 z-0"
          style={{ 
            y: bgY,
            backgroundImage: `linear-gradient(to bottom, rgba(5,5,7,0.1) 0%, rgba(5,5,7,0.8) 70%, rgba(5,5,7,1) 100%), url(${bgImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center top',
          }}
        />

        <div className="absolute inset-0 z-0 pointer-events-none">
          <Embers count={32} />
          <motion.div style={{ scale: glowScale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] bg-[#c9a84c]/[0.08] rounded-full blur-[140px]" 
          />
        </div>

        <motion.div style={{ y: contentY, opacity: contentOp }} className="relative z-10 w-full max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-6 mb-10">
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }}
              className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] tracking-[0.5em] text-[9px] md:text-[11px] uppercase font-cinzel font-semibold text-center whitespace-nowrap">
              E-Cell VIT Pune Presents
            </span>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }}
              className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </motion.div>

          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-10">
            <img src={summitLogo} alt="E-Summit Pune 26" className="w-full max-w-[280px] md:max-w-[720px] lg:max-w-[880px] mx-auto drop-shadow-[0_0_80px_rgba(201,168,76,0.3)]" />
          </motion.div>

          <motion.div initial={{ opacity:0, scaleX:0.3 }} animate={{ opacity:1, scaleX:1 }} transition={{ duration:0.8, delay:0.7, ease:[0.22,1,0.36,1] }}
            className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-[#c9a84c]/30" />
            <motion.div style={{ width: 8, height: 8, background: '#c9a84c', transform: 'rotate(45deg)' }}
              animate={{ boxShadow: ['0 0 8px rgba(201,168,76,0.4)', '0 0 30px rgba(201,168,76,1)', '0 0 8px rgba(201,168,76,0.4)'] }} transition={{ duration: 3, repeat: Infinity }} />
            <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-[#c9a84c]/30" />
          </motion.div>

          <div className="max-w-4xl mx-auto mb-14">
            <WordReveal text="Where extraordinary individuals meet unfiltered stories. The nine-day journey of grit, vision, and the pursuit of excellence begins here." className="text-[#a0988a] text-sm md:text-xl font-light tracking-wide leading-relaxed italic opacity-80" delay={0.03} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex flex-wrap justify-center gap-6">
            <MagneticButton href="#lineup" className="btn-outline px-12 py-4">Explore Lineup →</MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ═ STATS SECTION ═ */}
      <section id="stats" className="relative z-10 py-20 bg-black/50 backdrop-blur-xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricCounter target={15} suffix="K+" label="Footfall Expected" delay={0} />
            <MetricCounter target={50} suffix="+" label="Speakers & Mentors" delay={150} />
            <MetricCounter target={20} suffix="+" label="Flagship Events" delay={300} />
            <MetricCounter target={100} suffix="+" label="Startups pitching" delay={450} />
          </div>
        </div>
      </section>

      <div className="py-2 border-y border-white/5 bg-[#c9a84c]/[0.02]">
        <Marquee items={MARQUEE_ITEMS} speed={40} />
      </div>

      {/* ═ ABOUT SECTION ═ */}
      <section id="about" className="py-32 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div ref={aboutRef} initial={{ opacity: 0 }} animate={aboutInView ? { opacity: 1 } : {}} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">∙ The Vision ∙</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-white">Ascension <br/> To <span className="text-[#c9a84c]">Reign</span></h2>
              <div className="w-20 h-1 bg-[#c9a84c] mb-8" />
            </div>
            <div className="space-y-8">
              <div className="text-xl md:text-2xl font-light text-[#a0988a] leading-relaxed">
                <WordReveal text="E-Summit Pune is more than a festival; it's a movement where ambition meets opportunity." delay={0.02} />
              </div>
              <p className="text-[#6e6e88] font-light leading-relaxed text-lg italic border-l-2 border-[#c9a84c]/20 pl-6">
                "We provide the stage for the next generation of leaders to rise, connecting them with industry titans, mentors, and fellow visionaries in an immersive 9-day experience."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═ RESTORED: ELITE FLAGSHIP EVENTS ═ */}
      <section id="lineup" className="py-32 bg-[#0a0a0f] relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a84c]/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c9a84c]/[0.02] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24" ref={eventsRef}>
            <span className="section-tag">∙ The Lineup ∙</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4">Elite flagship <span className="text-[#c9a84c]">Events</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map((event, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={eventsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="group relative">
                <div className="relative z-10 bg-[#12121a] border border-white/5 p-8 md:p-10 h-full flex flex-col transition-all duration-500 hover:border-[#c9a84c]/30 hover:translate-y-[-8px]">
                  <div className="flex justify-between items-start mb-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#c9a84c]/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                      <div className="relative p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                        <event.icon className="w-8 h-8 text-[#c9a84c] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="font-cinzel text-[#c9a84c]/20 text-4xl group-hover:text-[#c9a84c]/40 transition-colors duration-500">0{i+1}</span>
                  </div>
                  <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/60 mb-3">{event.tag}</span>
                  <h3 className="font-display text-2xl text-white mb-6 group-hover:text-[#f0d080] transition-colors line-height-tight">{event.title}</h3>
                  <p className="text-[#6e6e88] font-light text-sm leading-relaxed mb-10 group-hover:text-[#a0988a] transition-colors">{event.desc}</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-white">Learn More</span>
                    <ArrowUpRight className="w-4 h-4 text-[#c9a84c]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═ SCHEDULE SECTION ═ */}
      <section id="schedule" className="py-32 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20" ref={timeRef}>
            <span className="section-tag">∙ Timeline ∙</span>
            <h2 className="font-display text-4xl text-white mt-2">The 9-Day Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[30px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent" />
            <div className="space-y-12">
              {[
                { date: "March 17", name: "Startup Showcase" },
                { date: "March 18", name: "Pitch Perfect" },
                { date: "March 20-21", name: "The Boardroom" },
                { date: "March 23", name: "E-Talks" },
                { date: "March 24", name: "Summit Showdown" }
              ].map((item, i) => (
                <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={timeInView ? { x: 0, opacity: 1 } : {}} transition={{ delay: i * 0.1 }} className="flex items-center gap-12 group">
                  <div className="w-[60px] h-[60px] rounded-full bg-[#16161f] border border-[#c9a84c]/30 flex items-center justify-center font-display text-[10px] text-[#c9a84c] z-10 transition-colors group-hover:bg-[#c9a84c] group-hover:text-black">{i + 1}</div>
                  <div className="flex-1 p-6 bg-white/[0.02] border border-white/5 hover:border-[#c9a84c]/30 transition-all">
                    <div className="flex justify-between items-center mb-2"><span className="font-cinzel text-[#c9a84c] text-xs tracking-widest">{item.date}</span></div>
                    <h4 className="font-display text-white uppercase tracking-[0.2em]">{item.name}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═ REGISTRATION CTA ═ */}
      <section id="register" className="py-32 relative z-10 bg-[#0a0a14] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div ref={ctaRef} initial={{ opacity: 0, y: 30 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <DrawBorder className="p-16 bg-[#c9a84c]/[0.02] relative overflow-hidden">
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Will You Rise?</h2>
              <p className="text-[#a0988a] text-lg font-light mb-12 max-w-2xl mx-auto leading-relaxed">The grandest celebration of entrepreneurship in Pune awaits. Secure your spot and be part of the ascension.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <MagneticButton href="https://learner.vierp.in/events" className="btn-gold">Register now!</MagneticButton>
                <MagneticButton href="/etalks" className="btn-outline">About E-Talks</MagneticButton>
              </div>
              <div className="mt-12 pt-12 border-t border-white/5"><p className="font-cinzel text-[10px] tracking-[0.4em] text-[#c9a84c]/50">17–25 MARCH 2026 · VIT PUNE</p></div>
            </DrawBorder>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;