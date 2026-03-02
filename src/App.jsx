import React, { useState } from 'react';
import './index.css';
import { ExternalLink, Menu, X } from 'lucide-react';
import logo from './assets/logo.png';
import bgImage from './assets/throne-bg.png'; 

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "https://ecellvitpune.in/" },
    { name: "About", href: "https://ecellvitpune.in/about" },
    { name: "Events", href: "https://ecellvitpune.in/events" },
    { name: "Team", href: "https://ecellvitpune.in/team" },
    { name: "Sponsors", href: "https://ecellvitpune.in/sponsors" },
    { name: "Gallery", href: "https://ecellvitpune.in/gallery" },
    { name: "Contact", href: "https://ecellvitpune.in/contact" },
  ];

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
    <div className="min-h-screen text-white font-serif selection:bg-[#c5a059]/30 overflow-x-hidden">
      {/* Background */}
{/* Cinematic Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-black flex items-start justify-center"
        style={{ 
          // 1. We use 'contain' so the image NEVER crops
          // 2. We align it to the top (80% height)
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${bgImage})`,
          backgroundSize: 'contain', 
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#000000' // Matches the deep shadows of the throne
        }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-[#c5a059]/10 backdrop-blur-md">
        <div className="max-w-[100rem] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2 shrink-0">
            <img src={logo} alt="V-EDC Logo" className="h-8 md:h-12 w-auto" />
            <div className="hidden sm:flex flex-col border-l border-[#c5a059]/30 pl-3">
              <span className="text-[11px] md:text-[14px] font-bold tracking-[0.1em] text-[#c5a059] whitespace-nowrap uppercase">V-EDC | VIT PUNE</span>
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-gray-400">Ascension to Reign</span>
            </div>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a059] transition-colors">{link.name}</a>
            ))}
          </div>

          {/* Desktop Action & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block border border-[#c5a059] px-5 py-2 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all text-[10px] font-black tracking-widest">
              REGISTER NOW
            </button>
            <button 
              className="lg:hidden text-[#c5a059]" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-black/fb backdrop-blur-xl border-b border-[#c5a059]/20 py-10 flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold tracking-[0.3em] uppercase text-gray-300 hover:text-[#c5a059]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="border border-[#c5a059] px-10 py-3 text-[#c5a059] font-black tracking-widest text-[11px]">
              REGISTER NOW
            </button>
          </div>
        )}
      </nav>

      <main className="relative z-10 pt-32 md:pt-48 pb-20 px-4 md:px-6">
        <section className="max-w-7xl mx-auto text-center">
          
          {/* Hero Section - Scaled for Mobile */}
          <div className="mb-16 md:mb-24">
            <p className="text-[#c5a059] tracking-[0.5em] md:tracking-[1em] text-[9px] md:text-[12px] uppercase mb-6">Vishwakarma Institute of Technology Presents</p>
            <h1 className="text-5xl md:text-[11rem] font-bold tracking-tighter mb-4 italic uppercase leading-none">
              E-Summit
            </h1>
            <h2 className="text-3xl md:text-8xl font-light tracking-[0.3em] md:tracking-[0.4em] text-[#c5a059] mb-8 uppercase">
              PUNE '26
            </h2>
            <div className="w-12 md:w-24 h-px bg-[#c5a059] mx-auto mb-8" />
            <p className="text-sm md:text-2xl tracking-[0.3em] md:tracking-[0.5em] uppercase text-gray-400 font-light italic">"Ascension To Reign"</p>
          </div>

          {/* Intro Text - Responsive Padding */}
          <div className="max-w-4xl mx-auto mb-16 md:mb-20 bg-black/40 backdrop-blur-md p-6 md:p-10 border border-[#c5a059]/10">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 italic uppercase tracking-wider">Competitions</h2>
            <p className="text-sm md:text-xl text-gray-200 font-light leading-relaxed mb-6">
              E-Summit brings to you two of the most thrilling competitions designed to challenge your entrepreneurial instincts.
            </p>
          </div>

          {/* Cards - Stacking on Mobile */}
          <div className="flex flex-col gap-10 md:gap-16 max-w-5xl mx-auto">
            {competitions.map((comp) => (
              <div 
                key={comp.id} 
                className="group bg-black/50 backdrop-blur-xl border border-[#c5a059]/10 p-8 md:p-24 hover:border-[#c5a059]/50 transition-all duration-700"
              >
                <p className="text-[#c5a059] tracking-[0.3em] text-[8px] md:text-[10px] uppercase mb-4 font-bold">{comp.tagline}</p>
                <h3 className="text-3xl md:text-6xl font-light tracking-[0.2em] uppercase mb-8 group-hover:text-[#c5a059] transition-colors">
                  {comp.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-10 italic font-light text-sm md:text-xl max-w-3xl mx-auto px-2">
                  "{comp.description}"
                </p>
                <a 
                  href="https://learner.vierp.in/" 
                  className="inline-block px-8 md:px-14 py-3 md:py-5 bg-[#c5a059] text-black font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[9px] md:text-[11px] hover:bg-white transition-all"
                >
                  Enter Arena <ExternalLink className="inline-block ml-2 w-3 h-3 md:w-4 md:h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;