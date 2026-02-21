import React from 'react';

interface PerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const PerspectiveCard: React.FC<PerspectiveCardProps> = ({ 
  children, 
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};
