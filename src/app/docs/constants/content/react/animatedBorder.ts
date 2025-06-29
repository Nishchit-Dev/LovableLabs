import React from 'react'
import { releaseDate } from '../../releaseDate/releaseDate'
import { BuildPreviewAnimatedBorder } from '../Builds/BuildPreviewAnimatedBorder'
import { DocContent } from '../../types'

export const animatedBorderContent: DocContent = {
    title: 'Animated Border',
    description:
        'A customizable React component with animated rotating gradient borders, blur effects, shadows, and hover interactions',
    preview: React.createElement(BuildPreviewAnimatedBorder),
    isLock: true,
    releaseDate: releaseDate.animatedBorder,
    sections: [
        {
            title: 'Install Animated Border',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add AnimatedBorder`,
            copy_event: 'Install Animated Border',
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge`,
            copy_event: 'Install Dependencies - AnimatedBorder',
            isLiveDemo: false,
        },
        {
            title: 'Add util file',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            copy_event: 'Add util file - AnimatedBorder',
            isLiveDemo: false,
        },
        {
            title: 'AnimatedBorder Component',
            codeSrc: 'components/ui/AnimatedBorder.tsx',
            code: `import React, { CSSProperties } from 'react';
import { cn } from '@/app/utils/cn';

type ShadowVariant = 'subtle' | 'medium' | 'intense' | 'glow' | 'neon' | 'soft' | 'custom';
type ShadowDirection = 'bottom' | 'top' | 'left' | 'right' | 'all';

interface AnimatedBorderProps {
  children: React.ReactNode;
  
  // Animation customization
  colors?: string[];
  duration?: number;
  reverse?: boolean;
  
  // Sizing and spacing
  width?: string | number;
  height?: string | number;
  borderWidth?: number;
  borderRadius?: string | number;
  contentPadding?: string | number;
  
  // Content styling
  contentBg?: string;
  contentClassName?: string;
  isCenterContent?: boolean;
  
  // Blur effect
  blurIntensity?: number;
  blurOpacity?: number;
  
  // Shadow customization
  enableShadow?: boolean;
  shadowVariant?: ShadowVariant;
  shadowDirection?: ShadowDirection;
  
  // Custom shadow props (only used when shadowVariant is 'custom')
  shadowDistance?: number;
  shadowOpacity?: number;
  shadowBlur?: number;
  
  // Hover effects
  enableHover?: boolean;
  hoverScale?: number;
  hoverBrighten?: number;
  hoverSpeedMultiplier?: number;
  hoverBlurIncrease?: number;
  
  // Additional props
  containerClassName?: string;
  style?: CSSProperties;
}

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  colors = ['#8c80db', '#6a42c2', '#32247a', '#2b1c83', '#8b5dff', '#8c80db'],
  duration = 3,
  reverse = false,
  width = 200,
  height = 60,
  borderWidth = 4,
  borderRadius = 64,
  contentPadding = 5,
  contentBg = 'rgba(0, 0, 0, 1)',
  contentClassName = '',
  isCenterContent = false,
  blurIntensity = 10,
  blurOpacity = 0.9,
  enableShadow = false,
  shadowVariant = 'custom',
  shadowDirection = 'all',
  shadowDistance = 10,
  shadowOpacity = 0.6,
  shadowBlur = 30,
  enableHover = true,
  hoverScale = 1.05,
  hoverBrighten = 1.2,
  hoverSpeedMultiplier = 1.5,
  hoverBlurIncrease = 5,
  containerClassName = '',
  style = {},
  ...props
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const angleProperty = \`--angle-\${uniqueId}\`;
  
  // Ensure contentBg always has opacity 1
  const ensureOpacityOne = (color: string) => {
    // If it's rgba format, replace the opacity value with 1
    if (color.startsWith('rgba')) {
      return color.replace(/rgba\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*[\\d.]+\\)/, 'rgba($1, $2, $3, 1)');
    }
    // If it's rgb format, convert to rgba with opacity 1
    else if (color.startsWith('rgb')) {
      return color.replace(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/, 'rgba($1, $2, $3, 1)');
    }
    // If it's a hex color, it already has opacity 1 (or we can't easily change it)
    return color;
  };
  
  const formattedContentBg = ensureOpacityOne(contentBg);
  
  const gradientColors = colors.join(', ');
  const conicGradient = \`conic-gradient(from var(\${angleProperty}), \${gradientColors})\`;
  
  const animationDirection = reverse ? 'reverse' : 'normal';

  const formatCSSValue = (value: string | number, unit: string = 'px') => {
    if (typeof value === 'number') {
      return \`\${value}\${unit}\`;
    }
    return value;
  };

  const formattedBorderRadius = formatCSSValue(borderRadius);
  const formattedWidth = formatCSSValue(width);
  const formattedHeight = formatCSSValue(height);
  const formattedContentPadding = typeof contentPadding === 'number' 
    ? \`\${contentPadding * 4}px\` 
    : contentPadding;
  
  const shadowVariants = {
    subtle: { distance: 8, blur: 20, opacity: 0.4 },
    medium: { distance: 15, blur: 35, opacity: 0.6 },
    intense: { distance: 25, blur: 50, opacity: 0.8 },
    glow: { distance: 0, blur: 50, opacity: 0.9 },
    neon: { distance: 0, blur: 80, opacity: 1 },
    soft: { distance: 12, blur: 30, opacity: 0.5 },
    custom: { distance: shadowDistance, blur: shadowBlur, opacity: shadowOpacity },
  };
  
  const currentShadow = shadowVariants[shadowVariant];
  
  const getDirectionalOffset = (direction: ShadowDirection) => {
    const baseDistance = currentShadow.distance;
    switch (direction) {
      case 'bottom': return { x: 0, y: baseDistance };
      case 'top': return { x: 0, y: -baseDistance };
      case 'left': return { x: -baseDistance, y: 0 };
      case 'right': return { x: baseDistance, y: 0 };
      case 'all': return { x: baseDistance * 0.3, y: baseDistance };
      default: return { x: 0, y: baseDistance };
    }
  };
  
  const offset = getDirectionalOffset(shadowDirection);
  
  const createGradientShadow = () => {
    if (!enableShadow) return '';
    
    const shadowColor1 = colors[0] || '#8c80db';
    const shadowColor2 = colors[Math.floor(colors.length / 2)] || '#32247a';
    const shadowColor3 = colors[colors.length - 1] || '#8b5dff';
    
    const opacity1 = Math.floor(currentShadow.opacity * 255).toString(16).padStart(2, '0');
    const opacity2 = Math.floor(currentShadow.opacity * 0.8 * 255).toString(16).padStart(2, '0');
    const opacity3 = Math.floor(currentShadow.opacity * 0.5 * 255).toString(16).padStart(2, '0');
    const opacity4 = Math.floor(currentShadow.opacity * 0.9 * 255).toString(16).padStart(2, '0');

    return [
      \`\${offset.x}px \${offset.y}px \${currentShadow.blur * 0.5}px \${shadowColor1}\${opacity1}\`,
      \`\${offset.x * 1.5}px \${offset.y * 1.5}px \${currentShadow.blur * 0.8}px \${shadowColor2}\${opacity2}\`,
      \`\${offset.x * 2}px \${offset.y * 2}px \${currentShadow.blur}px \${shadowColor3}\${opacity3}\`,
      \`\${offset.x * 0.5}px \${offset.y * 0.5}px \${currentShadow.blur * 0.3}px \${shadowColor1}\${opacity4}\`
    ].join(', ');
  };
  
  const containerStyle: CSSProperties = {
    width: formattedWidth,
    height: formattedHeight,
    borderRadius: formattedBorderRadius,
    padding: \`\${borderWidth}px\`,
    boxShadow: createGradientShadow(),
    [angleProperty]: '0deg',
    cursor: enableHover ? 'pointer' : 'default',
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
    ...style,
  };
  
  const borderStyle: CSSProperties = {
    inset: '0px',
    backgroundImage: conicGradient,
    borderRadius: formattedBorderRadius,
    animation: \`rotate-border-\${uniqueId} \${duration}s linear infinite \${animationDirection}\`,
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  };
  
  const blurStyle: CSSProperties = {
    ...borderStyle,
    filter: \`blur(\${blurIntensity}px)\`,
    opacity: blurOpacity,
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  };
  
  const contentStyle: CSSProperties = {
    background: formattedContentBg,
    borderRadius: \`calc(\${formattedBorderRadius} - \${borderWidth}px)\`,
    padding: formattedContentPadding,
    width: '100%',
    height: '100%',
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
    ...(isCenterContent && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  };
  
  const shadowElementStyle: CSSProperties = enableShadow ? {
    position: 'absolute',
    inset: '0px',
    backgroundImage: conicGradient,
    borderRadius: formattedBorderRadius,
    filter: \`blur(\${currentShadow.blur * 1.2}px)\`,
    opacity: currentShadow.opacity * 0.4,
    transform: \`translate(\${offset.x * 1.8}px, \${offset.y * 1.8}px)\`,
    animation: \`rotate-border-\${uniqueId} \${duration}s linear infinite \${animationDirection}\`,
    zIndex: -2,
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  } : {};
  
  const keyframesCSS = \`
    @keyframes rotate-border-\${uniqueId} {
      from { \${angleProperty}: 0deg; }
      to { \${angleProperty}: 360deg; }
    }
    @property \${angleProperty} {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }
  \`;
  
  const hoverStyles = enableHover ? \`
    .animated-border-\${uniqueId}:hover {
      transform: scale(\${hoverScale}) !important;
    }
    
    .animated-border-\${uniqueId}:hover .border-element-\${uniqueId} {
      filter: brightness(\${hoverBrighten}) !important;
      animation-duration: \${duration / hoverSpeedMultiplier}s !important;
    }
    
    .animated-border-\${uniqueId}:hover .blur-element-\${uniqueId} {
      filter: blur(\${blurIntensity + hoverBlurIncrease}px) brightness(\${hoverBrighten}) !important;
      opacity: \${Math.min(blurOpacity * 1.3, 1)} !important;
    }
    
    .animated-border-\${uniqueId}:hover .shadow-element-\${uniqueId} {
      filter: blur(\${currentShadow.blur * 1.5}px) brightness(\${hoverBrighten}) !important;
      opacity: \${currentShadow.opacity * 0.6} !important;
      animation-duration: \${duration / hoverSpeedMultiplier}s !important;
    }
    
    .animated-border-\${uniqueId}:hover .content-element-\${uniqueId} {
      transform: translateZ(0) !important;
      background: \${formattedContentBg} !important;
    }
  \` : '';
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS + hoverStyles }} />
      <div
        className={cn('relative z-0 overflow-visible', \`animated-border-\${uniqueId}\`, containerClassName)}
        style={containerStyle}
        {...props}
      >
        {/* Animated gradient shadow  */}
        {enableShadow && (
          <div
            className={\`absolute shadow-element-\${uniqueId}\`}
            style={shadowElementStyle}
          />
        )}
        
        {/* Main animated border */}
        <div
          className={\`absolute z-[-1] border-element-\${uniqueId}\`}
          style={borderStyle}
        />
        
        {/* Blurred background effect */}
        <div
          className={\`absolute z-[-1] blur-element-\${uniqueId}\`}
          style={blurStyle}
        />
        
        {/* Content container */}
        <div
          className={cn('relative z-[1]', \`content-element-\${uniqueId}\`, contentClassName)}
          style={contentStyle}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default AnimatedBorder;`,
            copy_event: 'AnimatedBorder Component',
            isLiveDemo: false,
        },
        {
            title: 'Basic Usage',
            codeSrc: 'page.tsx',
            code: `import AnimatedBorder from '@/components/ui/AnimatedBorder';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <AnimatedBorder>
        <span className="text-white font-medium">Animated Border</span>
      </AnimatedBorder>
    </div>
  );
}`,
            copy_event: 'Basic Usage - AnimatedBorder',
            isLiveDemo: true,
        },
        {
            title: 'Custom Colors',
            codeSrc: 'page.tsx',
            code: `import AnimatedBorder from '@/components/ui/AnimatedBorder';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <AnimatedBorder
        colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
        width={250}
        height={80}
      >
        <span className="text-white font-medium">Custom Colors</span>
      </AnimatedBorder>
    </div>
  );
}`,
            copy_event: 'Custom Colors - AnimatedBorder',
            isLiveDemo: true,
        },
        {
            title: 'With Shadow Effect',
            codeSrc: 'page.tsx',
            code: `import AnimatedBorder from '@/components/ui/AnimatedBorder';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <AnimatedBorder
        enableShadow={true}
        shadowVariant="glow"
        shadowDirection="all"
        colors={['#8b5cf6', '#ec4899', '#06b6d4']}
      >
        <span className="text-white font-medium">Glowing Border</span>
      </AnimatedBorder>
    </div>
  );
}`,
            copy_event: 'With Shadow Effect - AnimatedBorder',
            isLiveDemo: true,
        },
        {
            title: 'Card Layout',
            codeSrc: 'page.tsx',
            code: `import AnimatedBorder from '@/components/ui/AnimatedBorder';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <AnimatedBorder
        width={300}
        height={200}
        borderRadius={16}
        contentBg="rgba(20, 20, 30, 1)"
        contentPadding={20}
        enableShadow={true}
        shadowVariant="medium"
      >
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2">Premium Card</h3>
          <p className="text-gray-300">
            This is a card with animated border and custom styling.
          </p>
        </div>
      </AnimatedBorder>
    </div>
  );
}`,
            copy_event: 'Card Layout - AnimatedBorder',
            isLiveDemo: true,
        },
        {
            title: 'Button Variant',
            codeSrc: 'page.tsx',
            code: `import AnimatedBorder from '@/components/ui/AnimatedBorder';

export default function Page() {
  return (
    <div className="flex gap-4 items-center justify-center min-h-screen bg-black">
      <AnimatedBorder
        width={120}
        height={45}
        borderRadius={25}
        duration={2}
        hoverScale={1.1}
        colors={['#10b981', '#059669', '#047857']}
      >
        <button className="text-white font-medium w-full h-full">
          Success
        </button>
      </AnimatedBorder>
      
      <AnimatedBorder
        width={120}
        height={45}
        borderRadius={25}
        duration={2}
        reverse={true}
        hoverScale={1.1}
        colors={['#ef4444', '#dc2626', '#b91c1c']}
      >
        <button className="text-white font-medium w-full h-full">
          Danger
        </button>
      </AnimatedBorder>
    </div>
  );
}`,
            copy_event: 'Button Variant - AnimatedBorder',
            isLiveDemo: true,
        },
    ],
    propsTab: [
        {
            name: 'children',
            type: 'React.ReactNode',
            description:
                'The content to be wrapped inside the animated border.',
        },
        {
            name: 'colors',
            type: 'string[]',
            default:
                '["#8c80db", "#6a42c2", "#32247a", "#2b1c83", "#8b5dff", "#8c80db"]',
            description:
                'Array of colors used in the animated border gradient.',
        },
        {
            name: 'duration',
            type: 'number',
            default: '3',
            description:
                'Duration of the border rotation animation in seconds.',
        },
        {
            name: 'reverse',
            type: 'boolean',
            default: 'false',
            description: 'If true, reverses the animation direction.',
        },
        {
            name: 'width',
            type: 'string | number',
            default: '200',
            description: 'Width of the animated border container.',
        },
        {
            name: 'height',
            type: 'string | number',
            default: '60',
            description: 'Height of the animated border container.',
        },
        {
            name: 'borderWidth',
            type: 'number',
            default: '4',
            description: 'Thickness of the animated border.',
        },
        {
            name: 'borderRadius',
            type: 'string | number',
            default: '64',
            description: 'Border radius of the container.',
        },
        {
            name: 'contentPadding',
            type: 'string | number',
            default: '5',
            description: 'Padding inside the border around the content.',
        },
        {
            name: 'contentBg',
            type: 'string',
            default: '"rgba(0, 0, 0, 1)"',
            description: 'Background color of the content area.',
        },
        {
            name: 'contentClassName',
            type: 'string',
            description: 'Additional CSS classes for the content area.',
        },
        {
            name: 'isCenterContent',
            type: 'boolean',
            default: 'false',
            description:
                'Centers the content both vertically and horizontally.',
        },
        {
            name: 'blurIntensity',
            type: 'number',
            default: '10',
            description: 'Blur intensity of the background effect.',
        },
        {
            name: 'blurOpacity',
            type: 'number',
            default: '0.9',
            description: 'Opacity of the blurred background effect.',
        },
        {
            name: 'enableShadow',
            type: 'boolean',
            default: 'false',
            description:
                'Enables the gradient shadow effect around the border.',
        },
        {
            name: 'shadowVariant',
            type: "'subtle' | 'medium' | 'intense' | 'glow' | 'neon' | 'soft' | 'custom'",
            default: '"custom"',
            description:
                'Predefined or custom shadow intensity and blur style.',
        },
        {
            name: 'shadowDirection',
            type: "'bottom' | 'top' | 'left' | 'right' | 'all'",
            default: '"all"',
            description: 'Direction of the shadow offset.',
        },
        {
            name: 'shadowDistance',
            type: 'number',
            default: '10',
            description:
                "Distance of the custom shadow offset (used when shadowVariant is 'custom').",
        },
        {
            name: 'shadowOpacity',
            type: 'number',
            default: '0.6',
            description:
                "Opacity of the custom shadow (used when shadowVariant is 'custom').",
        },
        {
            name: 'shadowBlur',
            type: 'number',
            default: '30',
            description:
                "Blur radius of the custom shadow (used when shadowVariant is 'custom').",
        },
        {
            name: 'enableHover',
            type: 'boolean',
            default: 'true',
            description:
                'Enables hover animations like scaling and brightness.',
        },
        {
            name: 'hoverScale',
            type: 'number',
            default: '1.05',
            description: 'Scale factor applied on hover.',
        },
        {
            name: 'hoverBrighten',
            type: 'number',
            default: '1.2',
            description: 'Brightness increase applied on hover.',
        },
        {
            name: 'hoverSpeedMultiplier',
            type: 'number',
            default: '1.5',
            description: 'Multiplier that increases animation speed on hover.',
        },
        {
            name: 'hoverBlurIncrease',
            type: 'number',
            default: '5',
            description: 'Additional blur amount applied on hover.',
        },
        {
            name: 'containerClassName',
            type: 'string',
            description: 'Additional CSS classes for the outer container.',
        },
        {
            name: 'style',
            type: 'CSSProperties',
            description: 'Inline styles for the outer container.',
        },
    ],
}
