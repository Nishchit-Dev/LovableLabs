import React, { CSSProperties } from 'react';
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
  const angleProperty = `--angle-${uniqueId}`;
  
  // Ensure contentBg always has opacity 1
  const ensureOpacityOne = (color: string) => {
    // If it's rgba format, replace the opacity value with 1
    if (color.startsWith('rgba')) {
      return color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/, 'rgba($1, $2, $3, 1)');
    }
    // If it's rgb format, convert to rgba with opacity 1
    else if (color.startsWith('rgb')) {
      return color.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/, 'rgba($1, $2, $3, 1)');
    }
    // If it's a hex color, it already has opacity 1 (or we can't easily change it)
    return color;
  };
  
  const formattedContentBg = ensureOpacityOne(contentBg);
  
  const gradientColors = colors.join(', ');
  const conicGradient = `conic-gradient(from var(${angleProperty}), ${gradientColors})`;
  
  const animationDirection = reverse ? 'reverse' : 'normal';

  const formatCSSValue = (value: string | number, unit: string = 'px') => {
    if (typeof value === 'number') {
      return `${value}${unit}`;
    }
    return value;
  };

  const formattedBorderRadius = formatCSSValue(borderRadius);
  const formattedWidth = formatCSSValue(width);
  const formattedHeight = formatCSSValue(height);
  const formattedContentPadding = typeof contentPadding === 'number' 
    ? `${contentPadding * 4}px` 
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
      `${offset.x}px ${offset.y}px ${currentShadow.blur * 0.5}px ${shadowColor1}${opacity1}`,
      `${offset.x * 1.5}px ${offset.y * 1.5}px ${currentShadow.blur * 0.8}px ${shadowColor2}${opacity2}`,
      `${offset.x * 2}px ${offset.y * 2}px ${currentShadow.blur}px ${shadowColor3}${opacity3}`,
      `${offset.x * 0.5}px ${offset.y * 0.5}px ${currentShadow.blur * 0.3}px ${shadowColor1}${opacity4}`
    ].join(', ');
  };
  
  const containerStyle: CSSProperties = {
    width: formattedWidth,
    height: formattedHeight,
    borderRadius: formattedBorderRadius,
    padding: `${borderWidth}px`,
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
    animation: `rotate-border-${uniqueId} ${duration}s linear infinite ${animationDirection}`,
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  };
  
  const blurStyle: CSSProperties = {
    ...borderStyle,
    filter: `blur(${blurIntensity}px)`,
    opacity: blurOpacity,
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  };
  
  const contentStyle: CSSProperties = {
    background: formattedContentBg,
    borderRadius: `calc(${formattedBorderRadius} - ${borderWidth}px)`,
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
    filter: `blur(${currentShadow.blur * 1.2}px)`,
    opacity: currentShadow.opacity * 0.4,
    transform: `translate(${offset.x * 1.8}px, ${offset.y * 1.8}px)`,
    animation: `rotate-border-${uniqueId} ${duration}s linear infinite ${animationDirection}`,
    zIndex: -2,
    transition: enableHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  } : {};
  
  const keyframesCSS = `
    @keyframes rotate-border-${uniqueId} {
      from { ${angleProperty}: 0deg; }
      to { ${angleProperty}: 360deg; }
    }
    @property ${angleProperty} {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }
  `;
  
  const hoverStyles = enableHover ? `
    .animated-border-${uniqueId}:hover {
      transform: scale(${hoverScale}) !important;
    }
    
    .animated-border-${uniqueId}:hover .border-element-${uniqueId} {
      filter: brightness(${hoverBrighten}) !important;
      animation-duration: ${duration / hoverSpeedMultiplier}s !important;
    }
    
    .animated-border-${uniqueId}:hover .blur-element-${uniqueId} {
      filter: blur(${blurIntensity + hoverBlurIncrease}px) brightness(${hoverBrighten}) !important;
      opacity: ${Math.min(blurOpacity * 1.3, 1)} !important;
    }
    
    .animated-border-${uniqueId}:hover .shadow-element-${uniqueId} {
      filter: blur(${currentShadow.blur * 1.5}px) brightness(${hoverBrighten}) !important;
      opacity: ${currentShadow.opacity * 0.6} !important;
      animation-duration: ${duration / hoverSpeedMultiplier}s !important;
    }
    
    .animated-border-${uniqueId}:hover .content-element-${uniqueId} {
      transform: translateZ(0) !important;
      background: ${formattedContentBg} !important;
    }
  ` : '';
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS + hoverStyles }} />
      <div
        className={cn('relative z-0 overflow-visible', `animated-border-${uniqueId}`, containerClassName)}
        style={containerStyle}
        {...props}
      >
        {/* Animated gradient shadow  */}
        {enableShadow && (
          <div
            className={`absolute shadow-element-${uniqueId}`}
            style={shadowElementStyle}
          />
        )}
        
        {/* Main animated border */}
        <div
          className={`absolute z-[-1] border-element-${uniqueId}`}
          style={borderStyle}
        />
        
        {/* Blurred background effect */}
        <div
          className={`absolute z-[-1] blur-element-${uniqueId}`}
          style={blurStyle}
        />
        
        {/* Content container */}
        <div
          className={cn('relative z-[1]', `content-element-${uniqueId}`, contentClassName)}
          style={contentStyle}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default AnimatedBorder;