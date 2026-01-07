import React from 'react';
import { GridPattern } from './ui/Dither';
import { PerspectiveCard } from './ui/PerspectiveCard';
import { motion } from 'framer-motion';

export const JournalistSection: React.FC = () => {
  return (
    <section id="journalists" className="py-32 bg-white text-black relative border-b border-black overflow-hidden">
      <GridPattern opacity={0.05} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Typography & Message */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-center h-full order-2 lg:order-1"
            >
                <h2 className="text-6xl md:text-6xl font-bold tracking-tighter leading-[0.85] mb-8">
                    WE WROTE <br/>
                    THE HEADLINES.
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif italic text-gray-400 mb-12">
                    Now we write yours.
                </h3>
                
                <div className="text-black py-2 max-w-lg">
                    <p className="font-sans text-xl md:text-2xl leading-relaxed font-light">
                        We aren't guessing what editors want. We know. Because for decades, <span className="font-bold border-b-2 border-black">we were the ones deleting bad pitches</span> and publishing the good ones.
                    </p>
                </div>
            </motion.div>

            {/* Right: Visual Proof (The Realistic Press Badge) */}
            {/* Added pendulum motion wrapper */}
            <motion.div 
                className="relative flex justify-center lg:justify-end py-12 order-1 lg:order-2 perspective-1000"
                initial={{ rotateZ: 5 }}
                animate={{ 
                    rotateZ: [-2, 2, -2],
                    y: [-10, 0, -10]
                }}
                transition={{
                    rotateZ: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                style={{ transformOrigin: "top center" }}
            >
                 <PerspectiveCard className="w-full max-w-[380px] mx-auto" intensity={20}>
                    <div className="relative w-full aspect-[3/4.8] select-none group">
                        
                        {/* 1. Lanyard Strap (Woven Fabric Texture) */}
                        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-8 h-48 bg-[#111] z-0 shadow-2xl origin-bottom flex flex-col items-center overflow-hidden">
                             {/* Fabric Weave Pattern */}
                             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%, transparent 50%, #333 50%, #333 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }}></div>
                             {/* Vertical stitching */}
                             <div className="absolute left-1 top-0 bottom-0 w-[1px] border-l border-dashed border-gray-600 opacity-50"></div>
                             <div className="absolute right-1 top-0 bottom-0 w-[1px] border-r border-dashed border-gray-600 opacity-50"></div>
                             
                             {/* Repeated Branding on Lanyard */}
                             <div className="h-full flex flex-col gap-12 py-4 opacity-40">
                                 <span className="text-[8px] font-bold text-white tracking-[0.3em] -rotate-90 whitespace-nowrap">STRIFE</span>
                                 <span className="text-[8px] font-bold text-white tracking-[0.3em] -rotate-90 whitespace-nowrap">STRIFE</span>
                             </div>
                        </div>

                        {/* 2. Metal Clip Mechanism */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                             {/* The Metal Loop */}
                             <div className="w-8 h-8 rounded-full border-[3px] border-gray-300 bg-transparent shadow-sm relative z-0"></div>
                             {/* The Clamp Body */}
                             <div className="w-14 h-10 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300 rounded-sm shadow-lg relative -mt-5 z-10 border border-gray-400 flex flex-col items-center justify-end pb-2">
                                 {/* Metallic sheen */}
                                 <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/10 rounded-sm pointer-events-none"></div>
                                 <div className="w-10 h-1 bg-black/20 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                             </div>
                        </div>

                        {/* 3. Main Badge Chassis (Thick Plastic Case) */}
                        <div className="absolute inset-0 bg-[#f8f8f8] rounded-xl overflow-hidden flex flex-col relative z-20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,1)]">
                            
                            {/* Plastic Texture / Scratches / Glare */}
                            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                            
                            {/* Automated Continuous Shimmer */}
                            <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
                                <motion.div 
                                    className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 blur-sm"
                                    initial={{ left: "-150%" }}
                                    animate={{ left: "200%" }}
                                    transition={{ 
                                        repeat: Infinity, 
                                        duration: 3.5, 
                                        repeatDelay: 3,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>

                            {/* Slot Punch */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#151515] rounded-full z-30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] border-b border-white/10"></div>

                            {/* --- HEADER --- */}
                            <div className="h-36 bg-[#b91c1c] relative w-full flex flex-col justify-end p-6 pb-5 overflow-hidden">
                                 {/* Micro-pattern texture */}
                                 <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                                 
                                 <div className="relative z-10 flex justify-between items-end border-b-2 border-white/20 pb-3">
                                     <div>
                                         <div className="flex items-center gap-2 mb-1.5">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div>
                                            <span className="text-[7px] font-mono uppercase tracking-[0.25em] text-white/90 font-bold">Authorized Personnel</span>
                                         </div>
                                         <h1 className="text-[3.5rem] font-black text-white tracking-tighter leading-[0.8] font-sans drop-shadow-lg">
                                             PRESS
                                         </h1>
                                     </div>
                                     <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md flex items-center justify-center shadow-inner">
                                         <div className="w-5 h-5 bg-white rotate-45 shadow-sm"></div>
                                     </div>
                                 </div>
                            </div>

                            {/* --- BODY --- */}
                            <div className="flex-1 bg-white p-6 flex flex-col relative">
                                {/* Subtle Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                                    <div className="w-48 h-48 border-[6px] border-black rounded-full flex items-center justify-center transform -rotate-12">
                                        <span className="text-4xl font-black uppercase tracking-widest text-black">Strife</span>
                                    </div>
                                </div>

                                <div className="flex gap-5 relative z-10">
                                    {/* Photo with Holographic Lamination */}
                                    <div className="w-32 h-40 bg-gray-200 relative shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden ring-1 ring-black/10 rounded-[2px]">
                                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover grayscale contrast-125 filter sepia-[0.05]" alt="Journalist" />
                                        
                                        {/* Holographic Foil Overlay - Auto Animated */}
                                        <motion.div 
                                            className="absolute inset-0 opacity-30 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-yellow-400/30 mix-blend-color-dodge"
                                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)' }}></div>
                                    </div>

                                    {/* Info Column */}
                                    <div className="flex-1 flex flex-col justify-center gap-5 pt-2">
                                        <div>
                                            <label className="block text-[7px] uppercase text-gray-400 font-bold tracking-widest mb-0.5">Operative Name</label>
                                            <div className="text-2xl font-bold text-black uppercase leading-none font-sans tracking-tight">Alex V.</div>
                                        </div>
                                        
                                        <div>
                                             <label className="block text-[7px] uppercase text-gray-400 font-bold tracking-widest mb-0.5">Title</label>
                                             <div className="inline-flex items-center px-2 py-1 bg-black text-white text-[10px] font-bold font-mono rounded-sm uppercase tracking-[0.05em]">
                                                 Senior Editor
                                             </div>
                                        </div>

                                        {/* Gold Contact Chip */}
                                        <div className="mt-2 w-11 h-9 rounded-md bg-gradient-to-br from-[#eab308] via-[#fcd34d] to-[#b45309] border border-[#a16207] shadow-sm relative overflow-hidden flex items-center justify-center">
                                            {/* Chip Circuit Pattern */}
                                            <div className="absolute inset-0 opacity-60 mix-blend-multiply" style={{ 
                                                backgroundImage: `
                                                    linear-gradient(90deg, transparent 48%, #78350f 48%, #78350f 52%, transparent 52%),
                                                    linear-gradient(0deg, transparent 48%, #78350f 48%, #78350f 52%, transparent 52%)
                                                `, 
                                                backgroundSize: '100% 100%' 
                                            }}></div>
                                            <div className="w-6 h-5 border border-[#78350f] rounded-sm opacity-40"></div>
                                            {/* Shine */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-60 pointer-events-none"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Section: Hologram & Barcode */}
                                <div className="mt-auto pt-6">
                                    <div className="h-px w-full bg-gray-200 mb-5 relative">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-300 rounded-full"></div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-300 rounded-full"></div>
                                    </div>
                                    
                                    <div className="flex items-end justify-between">
                                         {/* Hologram Sticker */}
                                         <div className="w-16 h-16 rounded-full bg-gray-100 relative overflow-hidden shadow-inner border border-gray-200 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-shadow">
                                              {/* Iridescent Gradient */}
                                              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/40 via-cyan-300/40 to-yellow-300/40 animate-spin-slow opacity-60" style={{ animationDuration: '3s' }}></div>
                                              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                                                  <div className="w-10 h-10 border-[3px] border-gray-300/50 rounded-full flex items-center justify-center">
                                                      <span className="text-[6px] font-bold text-gray-500 rotate-12">VALID</span>
                                                  </div>
                                              </div>
                                         </div>

                                         {/* Barcode Area */}
                                         <div className="flex flex-col items-end gap-1">
                                             {/* Generative Barcode Lines */}
                                             <div className="flex gap-[2px] h-8 items-end opacity-90">
                                                 {[4, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 4, 2, 1, 3].map((width, i) => (
                                                     <div key={i} className="bg-black" style={{ width: `${width}px`, height: '100%' }}></div>
                                                 ))}
                                             </div>
                                             <div className="font-mono text-[9px] font-bold tracking-[0.3em] text-gray-600">092-11-8X</div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </PerspectiveCard>
            </motion.div>

        </div>
      </div>
    </section>
  );
};