import React from 'react';

export const TrustedBy: React.FC = () => {
    return (
        <div className="relative mt-auto pt-12 pb-8 md:pb-12 z-40">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Subtle "Trusted By" Label */}
                <div className="mb-4 md:mb-6">
                    <span className="text-white/60 text-xs md:text-sm">
                        Trusted By
                    </span>
                </div>

                <div className="overflow-hidden relative py-4 rounded-xl mx-[-1rem] px-[1rem]">
                    {/* Scrolling Container */}
                    <div className="flex animate-scroll w-[200%] md:w-[200%]">
                        {/* First Set of Logos */}
                        <div className="flex justify-around items-center w-1/2 px-2 sm:px-4 md:px-12 gap-3 sm:gap-6 md:gap-20 opacity-40 brightness-0 invert hover:opacity-100 transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                            <img src="/logos/cnbc.svg" alt="CNBC" className="h-5 sm:h-6 md:h-12 max-w-[80px] sm:max-w-[100px] md:max-w-[140px] w-auto object-contain flex-shrink-0" />
                            <img src="/logos/delivery-hero.svg" alt="Delivery Hero" className="h-5 sm:h-6 md:h-12 max-w-[100px] sm:max-w-[120px] md:max-w-[180px] w-auto object-contain flex-shrink-0" />
                            <img src="/logos/hsbc.svg" alt="HSBC" className="h-5 sm:h-6 md:h-12 max-w-[80px] sm:max-w-[100px] md:max-w-[140px] w-auto object-contain flex-shrink-0" />
                            <img src="/logos/hkstp.svg" alt="HKSTP" className="h-5 sm:h-6 md:h-12 max-w-[100px] sm:max-w-[120px] md:max-w-[180px] w-auto object-contain flex-shrink-0" />
                        </div>
                        {/* Second Set of Logos (Duplicate) */}
                        <div className="flex justify-around items-center w-1/2 px-2 sm:px-4 md:px-12 gap-3 sm:gap-6 md:gap-20 opacity-40 brightness-0 invert hover:opacity-100 transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                            <img src="/logos/cnbc.svg" alt="CNBC" className="h-5 sm:h-6 md:h-12 max-w-[80px] sm:max-w-[100px] md:max-w-[140px] w-auto object-contain flex-shrink-0" />
                            <img src="/logos/delivery-hero.svg" alt="Delivery Hero" className="h-5 sm:h-6 md:h-12 max-w-[100px] sm:max-w-[120px] md:max-w-[180px] w-auto object-contain flex-shrink-0" />
                            <img src="/logos/hsbc.svg" alt="HSBC" className="h-5 sm:h-6 md:h-12 max-w-[80px] sm:max-w-[100px] md:max-w-[140px] w-auto object-contain flex-shrink-0" />
                            <img src="/logos/hkstp.svg" alt="HKSTP" className="h-5 sm:h-6 md:h-12 max-w-[100px] sm:max-w-[120px] md:max-w-[180px] w-auto object-contain flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
