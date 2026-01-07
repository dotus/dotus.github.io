import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/ui/Stats';
import { TechSection } from './components/TechSection';
import { Services } from './components/Services';
import { Comparison } from './components/Comparison';
import { JournalistSection } from './components/JournalistSection';
import { Footer } from './components/Footer';

import { ContactModal } from './components/ui/ContactModal';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openModal = () => setIsContactOpen(true);
  const closeModal = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white relative">
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
          src="hero-bg.png"
          alt="Field of flowers"
          className="w-full h-full object-cover opacity-100 scale-110"
          style={{ filter: 'url(#hero-wave-filter)' }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <Stats />
        <Services />

        <TechSection />
        <Comparison />
        <JournalistSection />
      </main>
      <Footer onOpenModal={openModal} />

      <ContactModal isOpen={isContactOpen} onClose={closeModal} />
    </div>
  );
}

export default App;