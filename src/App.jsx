import React from 'react';
import './index.css';
import { ExternalLink, ChevronRight, Rocket } from 'lucide-react';
import logo from './assets/logo.png';

const App = () => {
  // Array to manage multiple competitions
  const competitions = [
    { id: 1, title: "E-Summit Pune Competition One" },
    { id: 2, title: "E-Summit Pune Competition Two" },
    { id: 3, title: "E-Summit Pune Competition Three" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white font-sans">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0d0f14]/90 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="V-EDC Logo" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col border-l border-gray-700 pl-3">
              <span className="text-sm font-bold tracking-tight">V-EDC <span className="text-blue-500">|</span> VIT Pune</span>
              <span className="text-[9px] uppercase tracking-tighter text-gray-400">Entrepreneurship Development Cell</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Competitions</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <section className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Competitions</h2>
            <p className="text-gray-400 text-lg">Empowering students through impactful entrepreneurial experiences</p>
          </div>

          {/* Grid for Multiple Competition Cards */}
          <div className="flex flex-col gap-10">
            {competitions.map((comp) => (
              <div 
                key={comp.id} 
                className="bg-[#141720] rounded-2xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-2xl"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="p-12">
                    <div className="flex items-center space-x-3 mb-6">
                      <Rocket className="text-blue-500 w-8 h-8" />
                      <h3 className="text-3xl font-bold">{comp.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-8 border-l-4 border-blue-600 pl-4 bg-blue-600/5 py-3 italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <ul className="space-y-3 mb-10 text-gray-400">
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 text-blue-500 mr-2" /> Keynote sessions</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 text-blue-500 mr-2" /> Startup pitch competitions</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 text-blue-500 mr-2" /> Investor networking</li>
                    </ul>

                    <a 
                      href="https://learner.vierp.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                      Register Now <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-600/10 via-transparent to-transparent flex items-center justify-center p-12 border-l border-gray-800/50">
                    <div className="w-full h-64 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center text-gray-500 uppercase tracking-widest text-xs">
                      [ {comp.title} Visual ]
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;