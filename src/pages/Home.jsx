import React from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../components/useReveal';
import { WordReveal } from '../components/TextReveal';
import bgImage from '../assets/throne-home-bg.png'; 
import summitLogo from '../assets/summit_logo.png'; //

const Home = () => {
  const [aboutRef, aboutInView] = useReveal();
  const [eventsRef, eventsInView] = useReveal();
  const [timeRef, timeInView] = useReveal();

  const events = [
    { title: "Startup Showcase", desc: "Bold startups pitching innovation live." },
    { title: "Pitch Perfect", desc: "Build and pitch using surprise keywords." },
    { title: "The Boardroom", desc: "Real-world corporate leadership challenge." },
    { title: "E-Talks", desc: "Inspiring journeys from industry leaders." },
    { title: "Summit Showdown", desc: "The grand finale celebration." }
  ];

  return (
    <div className="bg-black min-h-screen">
      
      {/* 1. CINEMATIC BACKGROUND LAYER */}
      <div 
        className="fixed inset-0 z-0 bg-black flex items-start justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${bgImage})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
        }}
      />

      {/* 2. CONTENT WRAPPER */}
      <main className="relative z-10">
        
        {/* HERO SECTION - UPDATED WITH LOGO IMAGE */}
        <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Brow text remains for context */}
            <p className="text-[#c5a059] tracking-[0.5em] md:tracking-[1em] text-[9px] md:text-[12px] uppercase mb-12">
              Vishwakarma Institute of Technology Presents
            </p>

            {/* Logo Image replacing E-Summit Pune and Tagline */}
            <img 
              src={summitLogo} 
              alt="E-Summit Pune 26 - Ascension to Reign" 
              className="w-full max-w-[280px] md:max-w-[700px] lg:max-w-[900px] mx-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-black/60 backdrop-blur-sm border-y border-white/5 relative z-10">
          <motion.div 
            ref={aboutRef}
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            className="page-content text-center"
          >
            <span className="section-tag">∙ The Experience ∙</span>
            <h2 className="section-title">What is E-Summit Pune?</h2>
            <div className="section-body max-w-3xl mx-auto space-y-6">
              <WordReveal text="E-Summit Pune is the annual entrepreneurship festival that brings together the most passionate minds and boldest ideas." delay={0.02} />
              <p className="text-gray-400 font-light italic mt-6 leading-relaxed text-sm md:text-lg">
                It is more than just an event, it is an experience that connects students, founders, creators, and industry leaders in a space where ideas are celebrated and ambitions are fueled.
              </p>
            </div>
          </motion.div>
        </section>
        {/* EVENTS GRID */}
        <section className="py-24 bg-black/40 backdrop-blur-md relative z-10">
          <div className="page-content" ref={eventsRef}>
            <div className="text-center mb-16">
              <span className="section-tag">∙ The Lineup ∙</span>
              <h2 className="section-title">Enter The Arena</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={eventsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/60 backdrop-blur-xl p-8 border border-[#c9a84c]/10 hover:border-[#c9a84c]/40 transition-all group"
                >
                  <h3 className="font-cinzel text-[#c9a84c] text-lg mb-3 group-hover:text-white transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 font-light text-sm italic">"{event.desc}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="py-24 bg-black/80 relative z-10">
          <div className="page-content max-w-2xl" ref={timeRef}>
            <div className="text-center mb-16">
              <span className="section-tag">∙ Schedule ∙</span>
              <h2 className="section-title">Event Timeline</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { date: "March 17", name: "Startup Showcase" },
                { date: "March 18", name: "Pitch Perfect" },
                { date: "March 20-21", name: "The Boardroom" },
                { date: "March 23", name: "E-Talks" },
                { date: "March 24", name: "Summit Showdown" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={timeInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-6 border-b border-[#c9a84c]/10 hover:bg-[#c9a84c]/5 transition-colors"
                >
                  <span className="font-cinzel text-[#c9a84c] text-sm">{item.date}</span>
                  <span className="font-body text-gray-300 font-bold uppercase tracking-widest text-xs">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;