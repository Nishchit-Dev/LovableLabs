import { useState, useEffect, ReactNode } from 'react';

interface CurtainTransitionProps {
  children: ReactNode;
  title?: string;
  duration?: number;
  curtainColor?: string;
  titleColor?: string;
  titleSize?: string;
  animationStyle?: 'slide-up' | 'fade' | 'split';
  curtainAnimationDuration?: number;
  contentAnimationDuration?: number;
}

const CurtainTransition = ({ 
  children, 
  title = "Loading...", 
  duration = 2000,
  curtainColor = "bg-black",
  titleColor = "text-white",
  titleSize = "text-4xl md:text-6xl",
  animationStyle = "slide-up",
  curtainAnimationDuration = 1000,
  contentAnimationDuration = 800
}: CurtainTransitionProps) => {
  const [curtainVisible, setCurtainVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [contentMounted, setContentMounted] = useState(false);

  useEffect(() => {
    // Mount content immediately but keep it hidden
    setContentMounted(true);
    
    // Start curtain animation after delay
    const curtainTimer = setTimeout(() => {
      setCurtainVisible(false);
      
      // Start content animation slightly before curtain finishes
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, curtainAnimationDuration * 0.3); // Start content animation at 30% of curtain animation
      
      return () => clearTimeout(contentTimer);
    }, duration);

    return () => clearTimeout(curtainTimer);
  }, [duration, curtainAnimationDuration]);

  const getCurtainClasses = () => {
    const baseClasses = "fixed inset-0 z-[100] flex items-center justify-center will-change-transform";
    const transitionClass = `transition-all duration-[${curtainAnimationDuration}ms] ease-[cubic-bezier(0.4,0,0.2,1)]`;
    
    switch (animationStyle) {
      case "slide-up":
        return `${baseClasses} ${transitionClass} ${curtainVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`;
      case "fade":
        return `${baseClasses} ${transitionClass} ${curtainVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
      case "split":
        return `${baseClasses} ${transitionClass} ${curtainVisible ? 'transform scale-x-100' : 'transform scale-x-0'}`;
      default:
        return `${baseClasses} ${transitionClass} ${curtainVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`;
    }
  };

  const getTitleAnimation = () => {
    return title.split("").map((letter, index) => (
      <span
        key={index}
        className="inline-block"
        style={{
          animation: `titlePulse 3s infinite ease-in-out ${index * 0.1}s`,
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  const getContentClasses = () => {
    const transitionClass = `transition-all duration-[${contentAnimationDuration}ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform`;
    
    if (!contentMounted) {
      return `${transitionClass} opacity-0 transform translate-y-8 scale-95`;
    }
    
    return `${transitionClass} ${
      showContent 
        ? 'opacity-100 transform translate-y-0 scale-100' 
        : 'opacity-0 transform translate-y-8 scale-95'
    }`;
  };

  return (
    <>
      {/* Custom CSS for smooth animations */}
      <style jsx>{`
        @keyframes titlePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.98); }
        }
        
        .smooth-content {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
      `}</style>

      {/* Curtain Overlay */}
      <div className={`${getCurtainClasses()} ${curtainColor}`}>
        <div className={`${titleColor} ${titleSize} font-bold text-center select-none`}>
          {getTitleAnimation()}
        </div>
      </div>

      {/* Content */}
      <div className={`${getContentClasses()} smooth-content`}>
        {children}
      </div>
    </>
  );
};

export default CurtainTransition;