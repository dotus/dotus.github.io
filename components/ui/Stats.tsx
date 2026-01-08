import React from 'react';
import { DitherPattern } from './Dither';

export const Stats: React.FC = () => {
  const pillars = [
    {
      title: "Media Relations",
      description: "Securing impactful coverage in top-tier media.",
    },
    {
      title: "Brand Narrative",
      description: "Crafting stories that define your identity.",
    },
    {
      title: "Multilingual",
      description: "Reaching global audiences in English, 中文 and more.",
    },
    {
      title: "Strategic Communication",
      description: "Aligning your message with business goals.",
    },
  ];

  return (
    <div className="border-b border-black bg-white relative z-10 py-8 md:py-24 overflow-hidden">
      <DitherPattern opacity={0.1} className="z-0 mix-blend-multiply" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Label */}
        <div className="mb-6 md:mb-12 flex items-end justify-between">
          <span className="text-4xl font-bold text-gray-800 uppercase pb-2">
            What We Do
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-black">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative p-5 md:p-10 flex flex-col items-start justify-between min-h-[160px] md:min-h-[280px] border-r border-b border-black bg-white hover:bg-black hover:text-white transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover Background Accent */}
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />

              {/* Content */}
              <div className="relative z-10 w-full flex-1 flex flex-col justify-between">

                <div className="mt-2">
                  <h3
                    className="text-3xl md:text-4xl font-light tracking-tight leading-none mb-4 md:mb-6 group-hover:translate-x-2 transition-transform duration-300"
                    style={{ fontFamily: '"Instrument Serif", serif' }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-500 group-hover:text-gray-300 leading-relaxed max-w-full md:max-w-[90%] group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};