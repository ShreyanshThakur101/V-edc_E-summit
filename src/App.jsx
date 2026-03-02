import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Global Components
import Navbar from './components/Navbar';
import { Embers } from './components/Particles';
import SmoothScroll from './components/SmoothScroll';

// Pages
import Home from './pages/Home';
import Competition from './pages/Competition';
import ETalks from './pages/ETalks';
import SummitShowdown from './pages/SummitShowdown';

const App = () => {
  return (
    <Router>
      <SmoothScroll>
        <div className="min-h-screen text-white font-serif selection:bg-[#c5a059]/30 overflow-x-hidden relative bg-black">
          
          {/* Global Effects & Navigation */}
          <Embers />
          <Navbar /> 

          {/* Page Content Switches Here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/etalks" element={<ETalks />} />
            <Route path="/summit-showdown" element={<SummitShowdown />} />
          </Routes>
          
        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;