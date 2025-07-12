import React from 'react'
import { releaseDate } from '../../releaseDate/releaseDate'
import { BuildPreviewCurtainTransition } from '../Builds/BuildPreviewCurtainTransition'
import { DocContent } from '../../types'
import { 
  BasicVariant,
  FadeVariant,
  SplitVariant,
  CustomTitleVariant,
  SlowMotionVariant
} from '../Builds/Variants/CurtainTransition/CurtainTransition'

export const curtainTransitionContent: DocContent = {
    title: 'Curtain Transition',
    description:
        'A customizable React component that provides a curtain-like loading transition with animated text for page or content loading states. Click the "Show Transition Effect" button in each example to see the animation in action.',
    preview: React.createElement(BuildPreviewCurtainTransition),
    isLock: true,
    releaseDate: releaseDate.curtainTransition,
    variants: [
        {
            title: 'Basic Usage',
            component: React.createElement(BasicVariant),
            description: 'Click the "Show Transition" button to see the default curtain transition in action with smooth content reveal.',
        },
        {
            title: 'Custom Title',
            component: React.createElement(CustomTitleVariant),
            description: 'Customize the loading text with your own message and styling. The content appears with a smooth fade-in animation.',
        },
        {
            title: 'Fade Animation',
            component: React.createElement(FadeVariant),
            description: 'Use a fade animation style instead of the default slide-up transition for a more subtle effect.',
        },
        {
            title: 'Split Animation',
            component: React.createElement(SplitVariant),
            description: 'Use a horizontal split animation style for a dramatic reveal effect that parts like curtains.',
        },
        {
            title: 'Slow Motion',
            component: React.createElement(SlowMotionVariant),
            description: 'Extended duration for a more dramatic effect, giving users more time to appreciate the transition.',
        }
    ],
    variantTab: [
        {
            preview: React.createElement(BasicVariant),
            title: 'Basic Usage',
            codeSrc: 'Example',
            code: `<CurtainTransition>
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Your Content</h2>
    <p>This content will be revealed after the transition completes.</p>
  </div>
</CurtainTransition>`,
            isLiveDemo: false,
        },
        {
            preview: React.createElement(CustomTitleVariant),
            title: 'Custom Title',
            codeSrc: 'Example',
            code: `<CurtainTransition
  title="Welcome"
  titleColor="text-amber-400"
  titleSize="text-5xl md:text-7xl"
>
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Custom Title Example</h2>
    <p>Using a custom welcome message instead of "Loading..."</p>
  </div>
</CurtainTransition>`,
            isLiveDemo: false,
        },
        {
            preview: React.createElement(FadeVariant),
            title: 'Fade Animation',
            codeSrc: 'Example',
            code: `<CurtainTransition
  title="Fading In..."
  titleColor="text-pink-400"
  animationStyle="fade"
  duration={1500}
>
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Fade Animation</h2>
    <p>The curtain fades out instead of sliding up</p>
  </div>
</CurtainTransition>`,
            isLiveDemo: false,
        },
        {
            preview: React.createElement(SplitVariant),
            title: 'Split Animation',
            codeSrc: 'Example',
            code: `<CurtainTransition
  title="Splitting..."
  titleColor="text-green-400"
  animationStyle="split"
  duration={1800}
  curtainColor="bg-gradient-to-r from-emerald-900 to-teal-900"
>
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Split Animation</h2>
    <p>The curtain splits horizontally and reveals the content</p>
  </div>
</CurtainTransition>`,
            isLiveDemo: false,
        },
        {
            preview: React.createElement(SlowMotionVariant),
            title: 'Slow Motion',
            codeSrc: 'Example',
            code: `<CurtainTransition
  title="Loading..."
  titleColor="text-blue-300"
  duration={2500}
>
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Slow Motion</h2>
    <p>Extended duration for a more dramatic effect</p>
  </div>
</CurtainTransition>`,
            isLiveDemo: false,
        }
    ],
    propsTab: [
        {
            name: 'children',
            type: 'ReactNode',
            description: 'The content to be displayed after the transition completes.'
        },
        {
            name: 'title',
            type: 'string',
            default: 'Loading...',
            description: 'The text to display during the transition.'
        },
        {
            name: 'duration',
            type: 'number',
            default: '2000',
            description: 'Duration in milliseconds before the transition starts.'
        },
        {
            name: 'curtainColor',
            type: 'string',
            default: 'bg-black',
            description: 'Tailwind CSS class for the curtain background color.'
        },
        {
            name: 'titleColor',
            type: 'string',
            default: 'text-white',
            description: 'Tailwind CSS class for the title text color.'
        },
        {
            name: 'titleSize',
            type: 'string',
            default: 'text-4xl md:text-6xl',
            description: 'Tailwind CSS class for the title text size.'
        },
        {
            name: 'animationStyle',
            type: "'slide-up' | 'fade' | 'split'",
            default: 'slide-up',
            description: 'The animation style for the curtain transition.'
        },
        {
            name: 'contentAnimationDuration',
            type: 'number',
            default: '800',
            description: 'Duration in milliseconds for the content fade-in animation.'
        }
    ],
    sections: [
        {
            title: 'Install Curtain Transition',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add CurtainTransition`,
            copy_event: 'Install Curtain Transition',
            isLiveDemo: false,
        },
        {
            title: 'CurtainTransition Component',
            codeSrc: 'components/ui/CurtainTransition.tsx',
            code: `import { useState, useEffect, ReactNode } from 'react';

interface CurtainTransitionProps {
  children: ReactNode;
  title?: string;
  duration?: number;
  curtainColor?: string;
  titleColor?: string;
  titleSize?: string;
  animationStyle?: 'slide-up' | 'fade' | 'split';
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
  contentAnimationDuration = 800
}: CurtainTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Start the transition after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Prepare content but keep it invisible
      setTimeout(() => {
        setContentReady(true);
        
        // Show content with animation after curtain animation is almost complete
        setTimeout(() => {
          setShowContent(true);
        }, 200); // Small delay after content is ready before showing it
      }, contentAnimationDuration - 200); // Start preparing content before curtain is fully gone
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, contentAnimationDuration]);

  const getAnimationClasses = () => {
    const baseClasses = "fixed inset-0 z-50 flex items-center justify-center transition-all ease-in-out";
    const durationClass = \`duration-\${contentAnimationDuration}\`;
    
    switch (animationStyle) {
      case "slide-up":
        return \`\${baseClasses} \${durationClass} \${isVisible ? 'transform -translate-y-full' : 'transform translate-y-0'}\`;
      case "fade":
        return \`\${baseClasses} \${durationClass} \${isVisible ? 'opacity-0' : 'opacity-100'}\`;
      case "split":
        return \`\${baseClasses} \${durationClass} \${isVisible ? 'transform scale-x-0' : 'transform scale-x-100'}\`;
      default:
        return \`\${baseClasses} \${durationClass} \${isVisible ? 'transform -translate-y-full' : 'transform translate-y-0'}\`;
    }
  };

  const getTitleAnimation = () => {
    return title.split("").map((letter, index) => (
      <span
        key={index}
        className={\`inline-block animate-pulse\`}
        style={{
          animationDelay: \`\${index * 0.1}s\`,
          animationDuration: '2s',
          animationIterationCount: 'infinite'
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  const getContentClasses = () => {
    const baseClasses = "transition-all";
    const durationClass = \`duration-\${contentAnimationDuration}\`;
    
    if (!contentReady) {
      return \`\${baseClasses} \${durationClass} opacity-0 transform translate-y-4\`;
    }
    
    return \`\${baseClasses} \${durationClass} \${
      showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
    }\`;
  };

  return (
    <>
      {/* Curtain Overlay */}
      <div className={\`\${getAnimationClasses()} \${curtainColor}\`}>
        <div className={\`\${titleColor} \${titleSize} font-bold text-center\`}>
          {getTitleAnimation()}
        </div>
      </div>

      {/* Content */}
      <div className={getContentClasses()}>
        {children}
      </div>
    </>
  );
};

export default CurtainTransition;`,
            copy_event: 'Copy CurtainTransition Component',
            isLiveDemo: false,
        },
        {
            title: 'Usage Example',
            codeSrc: 'Example',
            code: `import CurtainTransition from '@/components/ui/CurtainTransition';

// The CurtainTransition component will automatically show and hide
// when the component mounts. In the interactive demos above, we've
// added a button to trigger the transition on demand.

export default function Page() {
  return (
    <CurtainTransition 
      title="Welcome"
      duration={1500}
      curtainColor="bg-gradient-to-r from-blue-900 to-purple-900"
      titleColor="text-white"
      animationStyle="slide-up"
      contentAnimationDuration={1000} // Control the content animation speed
    >
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Your Page Content</h1>
        <p>This content will be revealed after the transition completes with a smooth animation.</p>
      </main>
    </CurtainTransition>
  );
}`,
            copy_event: 'Copy CurtainTransition Usage Example',
            isLiveDemo: false,
        }
    ],
} 