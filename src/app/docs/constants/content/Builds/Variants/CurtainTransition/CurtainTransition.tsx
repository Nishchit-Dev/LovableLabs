import React, { useState } from 'react'
import { GridBackground } from '../../../../content/code/GridBackground'
import CurtainTransition from '../../../../content/code/CurtainTransition'

// Wrapper component for the CurtainTransition with variants
interface CurtainTransitionVariantProps {
  title?: string;
  titleColor?: string;
  titleSize?: string;
  curtainColor?: string;
  animationStyle?: 'slide-up' | 'fade' | 'split';
  duration?: number;
  curtainAnimationDuration?: number;
  contentAnimationDuration?: number;
  contentTitle?: string;
  contentSubtitle?: string;
  buttonText?: string;
  contentTitleColor?: string;
  gridBoxSize?: number;
}

export const BasicVariant = ({
  title = "Curtain Effect",
  titleColor = "text-blue-400",
  titleSize = "text-3xl md:text-5xl",
  duration = 1500,
  curtainColor = "bg-black",
  animationStyle = "slide-up",
  contentTitle = "Curtain Transition",
  contentSubtitle = "This transition is contained within this box",
  buttonText = "Show Transition",
  contentTitleColor = "text-blue-400",
  gridBoxSize = 36,
}: CurtainTransitionVariantProps) => {
  const [showTransition, setShowTransition] = useState(false);
  
  const handleToggleTransition = () => {
      setShowTransition(true);
      // Reset after animation completes
      setTimeout(() => {
          setShowTransition(false);
      }, 3500); // Duration + animation time
  };
  
  return (
      <div className="rounded-xl p-6 flex items-center justify-center h-full border border-[#333]">
          <GridBackground
              full
              overlay
              centered
              dark
              boxSize={gridBoxSize}
              className="min-h-[420px] w-full p-12 relative overflow-hidden"
          >
              {/* Container for the curtain transition effect */}
              <div className="w-full h-full relative overflow-hidden rounded-xl">
                  {showTransition && (
                      <CurtainTransition
                          title={title}
                          titleColor={titleColor}
                          titleSize={titleSize}
                          duration={duration}
                          curtainColor={curtainColor}
                          animationStyle={animationStyle}
                      >
                          <div className="flex items-center justify-center h-full z-[20]">
                              <div className="text-center">
                                  <h3 className={`text-2xl font-bold mb-3 ${contentTitleColor}`}>{contentTitle}</h3>
                                  <p className="text-sm text-gray-400">{contentSubtitle}</p>
                              </div>
                          </div>
                      </CurtainTransition>
                  )}
                  
                  {!showTransition && (
                      <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                              <h3 className={`text-2xl font-bold mb-3 z-[20] ${contentTitleColor}`}>{contentTitle}</h3>
                              <p className="text-sm text-gray-400 mb-4 z-[20]">{contentSubtitle}</p>
                              <button
                                  onClick={handleToggleTransition}
                                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 z-[20]"
                              >
                                  {buttonText}
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          </GridBackground>
      </div>
  );
};

export const FadeVariant = () => {
  return (
    <BasicVariant 
      title="Fading In..."
      titleColor="text-pink-400"
      animationStyle="fade"
      contentTitle="Fade Animation"
      contentTitleColor="text-pink-400"
      contentSubtitle="Using smooth opacity transition"
      buttonText="Show Fade Effect"
      curtainColor="bg-gradient-to-br from-purple-900 via-black to-indigo-900"
    />
  );
};

export const SplitVariant = () => {
  return (
    <BasicVariant 
      title="Splitting..."
      titleColor="text-green-400"
      animationStyle="split"
      contentTitle="Split Animation"
      contentTitleColor="text-green-400"
      contentSubtitle="Curtain splits horizontally with precision"
      buttonText="Show Split Effect"
      curtainColor="bg-gradient-to-r from-emerald-900 to-teal-900"
    />
  );
};

export const CustomTitleVariant = () => {
  return (
    <BasicVariant 
      title="Welcome"
      titleColor="text-amber-400"
      titleSize="text-5xl md:text-7xl"
      contentTitle="Custom Title"
      contentTitleColor="text-amber-400"
      contentSubtitle="With a personalized welcome message"
      buttonText="Show Custom Title"
      gridBoxSize={24}
    />
  );
};

export const SlowMotionVariant = () => {
  return (
    <BasicVariant 
      title="Loading..."
      titleColor="text-blue-300"
      duration={2500}
      contentTitle="Slow Motion"
      contentTitleColor="text-blue-400"
      contentSubtitle="Extended duration for dramatic effect"
      buttonText="Show Slow Effect"
      gridBoxSize={48}
    />
  );
};