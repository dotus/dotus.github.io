import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white relative">
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/hero-bg.png"
            alt="Field of flowers"
            className="w-full h-full object-cover opacity-100 scale-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
