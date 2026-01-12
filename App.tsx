import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { PRDashboard } from './components/pr/PRDashboard';
import { Newsroom } from './components/pr/Newsroom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white relative font-sans">
        {/* Global Fixed Background with Wave Effect */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="hero-wave-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.002 0.003"
                numOctaves="1"
                result="warp"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="20s"
                  values="0.002 0.003; 0.002 0.005; 0.002 0.003"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          </defs>
        </svg>
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/hero-bg.png"
            alt="Field of flowers"
            className="w-full h-full object-cover opacity-100 scale-110"
            style={{ filter: 'url(#hero-wave-filter)' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pr/*" element={<PRDashboard />} />
            <Route path="/pr/newsroom" element={<Newsroom />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;