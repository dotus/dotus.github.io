import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DitherPattern } from './ui/Dither';

interface FooterProps {
    onOpenModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
    return (
        <footer className="bg-transparent text-white pt-24 pb-12 relative overflow-hidden border-t border-white/10">


            {/* Dither Pattern - Z-0 but after image */}
            <DitherPattern opacity={0.2} className="z-0 mix-blend-overlay" />

            {/* Gradient decoration */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-gray-800/50 to-black/50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* CTA Section */}
                <div className="mb-32 max-w-3xl">
                    <span className="text-gray-300 text-sm font-mono uppercase tracking-widest mb-4 block drop-shadow-md">Get Early Access</span>
                    <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-10 text-white leading-none drop-shadow-lg">
                        Ready to scale?
                    </h3>
                    <button
                        onClick={onOpenModal}
                        className="group bg-transparent border border-white/50 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all rounded-none flex items-center gap-3 backdrop-blur-sm"
                    >
                        Apply for Partnership
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Navigation Section - SIMPLIFIED */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-12 gap-8">

                    {/* Brand Column */}
                    <div className="space-y-4 max-w-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold tracking-tighter drop-shadow-md">strife relations</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            The VCs of storytelling.
                        </p>
                    </div>

                    {/* Links - Minimal */}
                    <div className="flex gap-8 text-sm font-mono uppercase tracking-wide text-gray-400">
                        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Terms of Use</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest opacity-50">
                    <p>© 2026 Strife Relations Inc.</p>
                    <p>lONDON, HONG KONG</p>
                </div>
            </div>
        </footer>
    );
};