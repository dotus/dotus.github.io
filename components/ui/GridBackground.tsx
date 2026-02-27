import React from 'react';

export const GridBackground: React.FC = () => {
    return (
        <>
            {/* Grid Pattern Background */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(13, 148, 136, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(13, 148, 136, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px'
                }}
            />
            
            {/* Dots at grid intersections */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(13, 148, 136, 0.15) 1.5px, transparent 1.5px)`,
                    backgroundSize: '48px 48px',
                    backgroundPosition: '0 0'
                }}
            />
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-200/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-100/20 rounded-full blur-3xl pointer-events-none" />
        </>
    );
};
