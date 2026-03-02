import React from 'react';
import { ExternalLink } from 'lucide-react';
import bgImage from '../assets/throne-bg.png'; 

const Competition = () => {
  const competitions = [
    { 
      id: 1, 
      title: "Pitch Perfect", 
      description: "You're handed five keywords and tasked with building and pitching an entire startup around them. It's spontaneous, it's fast-paced, and it's the ultimate test of creativity and confidence under pressure.",
      tagline: "Spontaneous Innovation"
    },
    { 
      id: 2, 
      title: "Boardroom", 
      description: "Step into the shoes of real corporate leaders, taking on high-stakes roles and tackling real-world business scenarios that demand sharp thinking, teamwork, and decisive action.",
      tagline: "Corporate Strategy"
    },
  ];

  return (
    <>
      {/* Cinematic Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-black flex items-start justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${bgImage})`,
          backgroundSize: 'contain', 
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#000000'
        }}
      />

      <main className="relative z-10 pt-32 md:pt-48 pb-20 px-4 md:px-6">
        <section className="max-w-7xl mx-auto text-center">
          
          {/* Hero Section */}
          <div className="mb-16 md:mb-24">
            <p className="text-[#c5a059] tracking-[0.5em] md:tracking-[1em] text-[9px] md:text-[12px] uppercase mb-6">Vishwakarma Institute of Technology Presents</p>
            <h1 className="text-5xl md:text-[11rem] font-bold tracking-tighter mb-4 italic uppercase leading-none text-white">
              E-Summit
            </h1>
            <h2 className="text-3xl md:text-8xl font-light tracking-[0.3em] md:tracking-[0.4em] text-[#c5a059] mb-8 uppercase">
              PUNE '26
            </h2>
            <div className="w-12 md:w-24 h-px bg-[#c5a059] mx-auto mb-8" />
            <p className="text-sm md:text-2xl tracking-[0.3em] md:tracking-[0.5em] uppercase text-gray-400 font-light italic">"Ascension To Reign"</p>
          </div>

          {/* Intro Text - Fully Restored */}
          <div className="max-w-4xl mx-auto mb-16 md:mb-20 bg-black/40 backdrop-blur-md p-6 md:p-10 border border-[#c5a059]/10">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 italic uppercase tracking-wider text-[#c5a059]">Competitions</h2>
            <p className="text-sm md:text-xl text-gray-200 font-light leading-relaxed mb-6">
              E-Summit brings to you two of the most thrilling competitions designed to challenge your entrepreneurial instincts and put your skills to the test.
            </p>
            <p className="text-xs md:text-base italic text-gray-400 leading-relaxed font-light">
              Whether you're someone who thrives in the spotlight or someone who loves strategizing behind the scenes, these competitions have something for everyone. They're not just contests, they're experiences that push you to think bigger, act bolder, and discover what you're truly capable of.
            </p>
          </div>

          {/* Cards - Fully Restored */}
          <div className="flex flex-col gap-10 md:gap-16 max-w-5xl mx-auto">
            {competitions.map((comp) => (
              <div 
                key={comp.id} 
                className="group bg-black/50 backdrop-blur-xl border border-[#c5a059]/10 p-8 md:p-24 hover:border-[#c5a059]/50 transition-all duration-700"
              >
                <p className="text-[#c5a059] tracking-[0.3em] text-[8px] md:text-[10px] uppercase mb-4 font-bold">{comp.tagline}</p>
                <h3 className="text-3xl md:text-6xl font-light tracking-[0.2em] uppercase mb-8 group-hover:text-[#c5a059] transition-colors text-white">
                  {comp.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-10 italic font-light text-sm md:text-xl max-w-3xl mx-auto px-2">
                  "{comp.description}"
                </p>
                <a 
                  href="https://learner.vierp.in/" 
                  className="inline-block px-8 md:px-14 py-3 md:py-5 bg-[#c5a059] text-black font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[9px] md:text-[11px] hover:bg-white transition-all"
                >
                  Enter The Arena <ExternalLink className="inline-block ml-2 w-3 h-3 md:w-4 md:h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Competition;