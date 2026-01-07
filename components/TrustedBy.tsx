import React from 'react';

export const TrustedBy: React.FC = () => {
    return (
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-40 pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Subtle "Trusted By" Label */}
                <div className="mb-4 md:mb-6">
                    <span className="text-white/60 text-xs md:text-sm">
                        Trusted By
                    </span>
                </div>

                <div className="overflow-hidden relative backdrop-blur-[2px] py-4 rounded-xl mx-[-1rem] px-[1rem]">
                    {/* Scrolling Container */}
                    <div className="flex animate-scroll w-[200%]">
                        {/* First Set of Logos */}
                        <div className="flex justify-around items-center w-1/2 px-12 md:px-24 gap-12 md:gap-24 opacity-40 brightness-0 invert hover:opacity-100 transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                            <img src="/logos/cnbc.svg" alt="CNBC" className="h-8 md:h-12 max-w-[140px] w-auto object-contain" />
                            <img src="/logos/delivery-hero.svg" alt="Delivery Hero" className="h-8 md:h-12 max-w-[180px] w-auto object-contain" />
                            <img src="/logos/hsbc.svg" alt="HSBC" className="h-8 md:h-12 max-w-[140px] w-auto object-contain" />
                        </div>
                        {/* Second Set of Logos (Duplicate) */}
                        <div className="flex justify-around items-center w-1/2 px-12 md:px-24 gap-12 md:gap-24 opacity-40 brightness-0 invert hover:opacity-100 transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                            <img src="/logos/cnbc.svg" alt="CNBC" className="h-8 md:h-12 max-w-[140px] w-auto object-contain" />
                            <img src="/logos/delivery-hero.svg" alt="Delivery Hero" className="h-8 md:h-12 max-w-[180px] w-auto object-contain" />
                            <img src="/logos/hsbc.svg" alt="HSBC" className="h-8 md:h-12 max-w-[140px] w-auto object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
