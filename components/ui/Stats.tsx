import React from 'react';

export const Stats: React.FC = () => {
  const pillars = [
    "Media Relations",
    "Brand Architecture",
    "Multilingual (EN/中文)",
    "Strategic Communications",
  ];

  return (
    <div className="border-b border-black bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Section Label - Floating 'Tab' Style */}
        <div className="absolute top-0 left-6 md:left-12 -translate-y-1/2 z-20">
          <div className="bg-white border border-black px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            What We Do
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black border-l border-r border-black">
          {pillars.map((pillar, i) => (
            <div key={i} className="p-6 md:p-8 flex items-center justify-center text-center bg-white hover:bg-gray-50 transition-colors group cursor-default min-h-[160px]">
              <span className="text-lg md:text-2xl font-bold tracking-tight leading-tight group-hover:scale-105 transition-transform duration-300 max-w-[12rem]">
                {pillar}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};