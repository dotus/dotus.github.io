import React, { useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { motion, useSpring, useTransform, MotionValue, useMotionValue } from 'framer-motion';

interface SmoothScrollContextType {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  velocity: MotionValue<number>;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) throw new Error('useSmoothScroll must be used within SmoothScrollProvider');
  return context;
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const velocity = useMotionValue(0);
  
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 300,
    damping: 40,
    mass: 0.1,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef<number>(0);
  const pendingUpdate = useRef(false);

  useEffect(() => {
    const scheduleUpdate = (currentScrollY: number) => {
      if (pendingUpdate.current) return;
      pendingUpdate.current = true;

      rafId.current = requestAnimationFrame(() => {
        pendingUpdate.current = false;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime.current;

        if (deltaTime > 0) {
          const currentVelocity = (currentScrollY - lastScrollY.current) / deltaTime;
          velocity.set(currentVelocity * 10);
        }

        scrollY.set(currentScrollY);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollYProgress.set(maxScroll > 0 ? currentScrollY / maxScroll : 0);

        lastScrollY.current = currentScrollY;
        lastTime.current = currentTime;
      });
    };

    const handleScroll = () => scheduleUpdate(window.scrollY);

    // Set initial values
    scheduleUpdate(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [scrollY, scrollYProgress, velocity]);

  return (
    <SmoothScrollContext.Provider value={{ scrollY: smoothScrollY, scrollYProgress, velocity }}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
};

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.5,
  className = '',
  direction = 'up',
}) => {
  const { scrollYProgress } = useSmoothScroll();
  
  const isHorizontal = direction === 'left' || direction === 'right';
  const multiplier = direction === 'up' || direction === 'left' ? -1 : 1;
  
  const transform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, 100 * speed * multiplier]
  );

  return (
    <motion.div
      className={className}
      style={{
        [isHorizontal ? 'x' : 'y']: transform,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  rotate?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 60,
  scale = 1,
  rotate = 0,
}) => {
  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y, scale: scale * 0.95, rotate }}
      whileInView={{ opacity: 1, y: 0, scale, rotate: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = '', delay = 0 }) => {
  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: '100%', opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: delay + i * 0.02,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  className = '',
  strength = 30,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width * strength;
    const deltaY = (e.clientY - centerY) / rect.height * strength;
    x.set(deltaX);
    y.set(deltaY);
  }, [strength, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

interface VelocitySkewProps {
  children: React.ReactNode;
  className?: string;
  maxSkew?: number;
}

export const VelocitySkew: React.FC<VelocitySkewProps> = ({
  children,
  className = '',
  maxSkew = 5,
}) => {
  const { velocity } = useSmoothScroll();
  const skewY = useTransform(velocity, [-2, 2], [-maxSkew, maxSkew]);
  const scaleY = useTransform(velocity, [-2, 2], [0.98, 1.02]);

  return (
    <motion.div
      className={className}
      style={{
        skewY,
        scaleY,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScrollProgressBarProps {
  className?: string;
  color?: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className = '',
  color = 'bg-white',
}) => {
  const { scrollYProgress } = useSmoothScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 ${color} origin-left z-[100] ${className}`}
      style={{ scaleX }}
    />
  );
};
