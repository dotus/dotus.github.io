import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      // Show CTA only after scrolling past the main hero area (approx 1 viewport height)
      setShowCTA(scrollY > window.innerHeight - 100);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-black/20 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <span className="text-xl font-bold tracking-tighter text-white drop-shadow-sm">strife relations</span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-8">
            
            {/* CTA - conditionally visible */}
            <div className={`flex items-center gap-8 transition-all duration-500 ${showCTA ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <button 
                    onClick={onOpenModal}
                    className="group bg-white text-black px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-black/50 hover:text-white hover:backdrop-blur-md border border-white transition-all rounded-none flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                <span className="hidden sm:inline">Apply for Partnership</span>
                <span className="sm:hidden">Apply</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};