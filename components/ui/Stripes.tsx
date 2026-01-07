import React from 'react';

export const DiagonalStripes: React.FC<{ className?: string; opacity?: number }> = ({ className = "", opacity = 1 }) => (
  <div 
    className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    style={{
      opacity: opacity,
      backgroundImage: `repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 2px,
        #000 2px,
        #000 3px
      )`
    }}
  />
);