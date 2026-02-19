import React from 'react';

export const TrustedByLogos: React.FC = () => {
    return (
        <div className="relative mt-auto pt-12 pb-12 z-40">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-6">
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-semibold">Trusted By</span>
                </div>
                <div className="overflow-hidden relative py-2">
                    <div className="flex animate-scroll w-[200%]">
                        <div className="flex justify-around items-center w-1/2 px-12 gap-16">
                            {['CNBC', 'TechCrunch', 'WIRED', 'The Verge'].map(logo => (
                                <span key={logo} className="text-xl font-bold tracking-tight text-white/25 hover:text-white/50 transition-colors">
                                    {logo}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-around items-center w-1/2 px-12 gap-16">
                            {['CNBC', 'TechCrunch', 'WIRED', 'The Verge'].map(logo => (
                                <span key={logo} className="text-xl font-bold tracking-tight text-white/25 hover:text-white/50 transition-colors">
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
