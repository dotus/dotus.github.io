import React from 'react';

interface DitherProps {
  className?: string;
  opacity?: number;
}

export const DitherPattern: React.FC<DitherProps> = ({ className = "", opacity = 0.1 }) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{
        opacity: opacity,
        backgroundImage: `radial-gradient(#000 1px, transparent 0)`,
        backgroundSize: '4px 4px'
      }}
    />
  );
};

export const GridPattern: React.FC<DitherProps> = ({ className = "", opacity = 0.05 }) => {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none z-0 ${className}`}
        style={{
            opacity: opacity,
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                              linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />
    );
  };