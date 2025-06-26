// import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPreviewFramerTextAnimation } from '../Builds/BuildPreviewFramerTextAnimation'
import {
    AnimatedTextDefault,
    AnimatedTextFadeUp,
    AnimatedTextFadeDown,
    AnimatedTextSlideLeft,
    AnimatedTextSlideRight,
    AnimatedTextScale,
    AnimatedTextZoom,
    AnimatedTextBounce,
    AnimatedTextFlip,
    AnimatedTextFlipY,
    AnimatedTextRotate,
    AnimatedTextWave,
    AnimatedTextSkew,
    AnimatedTextSpiral,
    AnimatedTextQuick,
    AnimatedTextSlow,
    AnimatedTextTypewriter,
    AnimatedTextGlitch,
    AnimatedTextFadeUpWords,
    AnimatedTextBounceWords,
    AnimatedTextFlipWords,
    AnimatedTextWaveWords,
    AnimatedTextFadeUpFast,
    AnimatedTextBounceSlow,
    AnimatedTextGradient,
    AnimatedTextNeon,
    AnimatedTextMultiLine,
    AnimatedTextHero,
    AnimatedTextButton,
} from '../Builds/Variants/FramerTextAnimation/FramerTextAnimationVariant'

export const FramerTextAnimationContent: DocContent = {
    title: 'Framer Text Animation',
    description:
        'Create Text Animation as you want with Lovablelabs UI for a dynamic visual effect.',
    preview: BuildPreviewFramerTextAnimation(),
    // releaseDate: releaseDate.template,

    sections: [
        {
            title: 'Install Framer Text Animation',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add FramerTextAnimation`,
            copy_event: 'Install FramerTextAnimation',
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i framer-motion clsx tailwind-merge`,
            copy_event: 'Install Dependencies - FramerTextAnimation',
            isLiveDemo: false,
        },
        {
            title: 'Add Utility File',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            copy_event: 'Add Utility File - ParallaxGridBackground',
            isLiveDemo: false,
        },
        {
            title: 'Framer Text Animation Component',
            codeSrc: 'components/FramerTextAnimation.tsx',
            code: `import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

// Animation presets - developers just pick by name!
const ANIMATION_PRESETS = {
    // Basic animations
    fadeUp: {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
        delay: 50,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    fadeDown: {
        from: { opacity: 0, y: -40 },
        to: { opacity: 1, y: 0 },
        delay: 50,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    slideLeft: {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0 },
        delay: 40,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    slideRight: {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0 },
        delay: 40,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
    },

    // Scale animations
    scale: {
        from: { opacity: 0, scale: 0.5 },
        to: { opacity: 1, scale: 1 },
        delay: 30,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    zoom: {
        from: { opacity: 0, scale: 0.3 },
        to: { opacity: 1, scale: 1 },
        delay: 25,
        duration: 0.9,
        ease: [0.68, -0.55, 0.265, 1.55], // elastic
    },
    bounce: {
        from: { opacity: 0, scale: 0, y: 50 },
        to: { opacity: 1, scale: 1, y: 0 },
        delay: 40,
        duration: 1,
        ease: [0.68, -0.55, 0.265, 1.55],
    },

    // 3D animations
    flip: {
        from: { opacity: 0, rotateX: -90 },
        to: { opacity: 1, rotateX: 0 },
        delay: 60,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    flipY: {
        from: { opacity: 0, rotateY: 90 },
        to: { opacity: 1, rotateY: 0 },
        delay: 60,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    rotate: {
        from: { opacity: 0, rotate: -180, scale: 0.5 },
        to: { opacity: 1, rotate: 0, scale: 1 },
        delay: 50,
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
    },

    // Creative animations
    wave: {
        from: { opacity: 0, y: 30, rotateZ: -5 },
        to: { opacity: 1, y: 0, rotateZ: 0 },
        delay: 80,
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    skew: {
        from: { opacity: 0, skewX: -20, x: -50 },
        to: { opacity: 1, skewX: 0, x: 0 },
        delay: 45,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
    },
    spiral: {
        from: { opacity: 0, scale: 0.1, rotate: 360, x: 100, y: 100 },
        to: { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 },
        delay: 30,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
    },

    // Fast animations
    quick: {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        delay: 20,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
    },

    // Slow animations
    slow: {
        from: { opacity: 0, y: 60, scale: 0.8 },
        to: { opacity: 1, y: 0, scale: 1 },
        delay: 100,
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
    },

    // Typewriter effect
    typewriter: {
        from: { opacity: 0, width: 0 },
        to: { opacity: 1, width: 'auto' },
        delay: 100,
        duration: 0.1,
        ease: 'linear',
    },

    // Glitch effect
    glitch: {
        from: { opacity: 0, x: -10, filter: 'brightness(0)' },
        to: { opacity: 1, x: 0, filter: 'brightness(1)' },
        delay: 20,
        duration: 0.3,
        ease: 'easeOut',
    },
}

// Super simple component interface
interface AnimatedTextProps {
    children: string
    animation?: keyof typeof ANIMATION_PRESETS
    splitType?: 'chars' | 'words'
    className?: string
    style?: React.CSSProperties
    speed?: 'slow' | 'normal' | 'fast'
    triggerOnce?: boolean
    delay?: number // Override default delay
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
    children,
    animation = 'fadeUp',
    splitType = 'chars',
    className = '',
    style = {},
    speed = 'normal',
    triggerOnce = true,
    delay,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const controls = useAnimation()
    const [isInView, setIsInView] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Get animation preset
    const preset = ANIMATION_PRESETS[animation]

    // Speed multipliers
    const speedMultipliers = {
        slow: 1.5,
        normal: 1,
        fast: 0.5,
    }

    const speedMultiplier = speedMultipliers[speed]
    const finalDelay = delay ?? preset.delay * speedMultiplier
    const finalDuration = preset.duration * speedMultiplier

    // Intersection observer
    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
                    setIsInView(true)
                    if (triggerOnce) setHasAnimated(true)
                } else if (!triggerOnce) {
                    setIsInView(false)
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        observer.observe(element)
        return () => observer.unobserve(element)
    }, [triggerOnce, hasAnimated])

    // Trigger animation
    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        } else if (!triggerOnce) {
            controls.start('hidden')
        }
    }, [isInView, controls, triggerOnce])

    // Split text
    const splitText = (text: string, type: 'chars' | 'words') => {
        if (type === 'words') {
            return text.split(/(\s+)/).filter((word) => word.trim().length > 0)
        }
        return text.split('')
    }

    const elements = splitText(children, splitType)

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: finalDelay / 1000,
                delayChildren: 0,
            },
        },
    }

    const elementVariants = {
        hidden: preset.from,
        visible: {
            ...preset.to,
            transition: {
                duration: finalDuration,
                ease: preset.ease,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            className={\`inline-block \${className}\`}
            style={{ ...style }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
        >
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    variants={elementVariants}
                    className={
                        splitType === 'words'
                            ? 'inline-block mr-1'
                            : 'inline-block'
                    }
                    style={{
                        whiteSpace: splitType === 'words' ? 'nowrap' : 'normal',
                    }}
                >
                    {element === ' ' ? '\u00A0' : element}
                </motion.span>
            ))}
        </motion.div>
    )
}
`,
            copy_event: 'Framer Text Animation src',
            isLiveDemo: false,
        },
    ],
    variantTab: [
        // Default Variant
        {
            preview: AnimatedTextDefault(),
            title: 'Default',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText className="text-4xl font-bold text-white">
    Default Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Basic Movement Variants
        {
            preview: AnimatedTextFadeUp(),
            title: 'Fade Up',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="fadeUp" 
    className="text-4xl font-bold text-white"
>
    Fade Up Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextFadeDown(),
            title: 'Fade Down',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="fadeDown" 
    className="text-4xl font-bold text-white"
>
    Fade Down Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextSlideLeft(),
            title: 'Slide Left',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="slideLeft" 
    className="text-4xl font-bold text-white"
>
    Slide Left Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextSlideRight(),
            title: 'Slide Right',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="slideRight" 
    className="text-4xl font-bold text-white"
>
    Slide Right Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Scale & Transform Variants
        {
            preview: AnimatedTextScale(),
            title: 'Scale',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="scale" 
    className="text-4xl font-bold text-white"
>
    Scale Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextZoom(),
            title: 'Zoom',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="zoom" 
    className="text-4xl font-bold text-white"
>
    Zoom Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextBounce(),
            title: 'Bounce',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="bounce" 
    className="text-4xl font-bold text-white"
>
    Bounce Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // 3D Rotation Variants
        {
            preview: AnimatedTextFlip(),
            title: 'Flip X',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="flip" 
    className="text-4xl font-bold text-white"
>
    Flip X Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextFlipY(),
            title: 'Flip Y',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="flipY" 
    className="text-4xl font-bold text-white"
>
    Flip Y Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextRotate(),
            title: 'Rotate',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="rotate" 
    className="text-4xl font-bold text-white"
>
    Rotate Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Creative Effect Variants
        {
            preview: AnimatedTextWave(),
            title: 'Wave',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="wave" 
    className="text-4xl font-bold text-white"
>
    Wave Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextSkew(),
            title: 'Skew',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="skew" 
    className="text-4xl font-bold text-white"
>
    Skew Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextSpiral(),
            title: 'Spiral',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="spiral" 
    className="text-4xl font-bold text-white"
>
    Spiral Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Speed Variants
        {
            preview: AnimatedTextQuick(),
            title: 'Quick',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="quick" 
    className="text-4xl font-bold text-white"
>
    Quick Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextSlow(),
            title: 'Slow',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="slow" 
    className="text-4xl font-bold text-white"
>
    Slow Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Special Effect Variants
        {
            preview: AnimatedTextTypewriter(),
            title: 'Typewriter',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="typewriter" 
    className="text-4xl font-bold text-white"
>
    Typewriter Effect
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextGlitch(),
            title: 'Glitch',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="glitch" 
    className="text-4xl font-bold text-white"
>
    Glitch Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Word-based Animation Variants
        {
            preview: AnimatedTextFadeUpWords(),
            title: 'Fade Up Words',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="fadeUp" 
    splitType="words" 
    className="text-4xl font-bold text-white text-center"
>
    Fade Up Word Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextBounceWords(),
            title: 'Bounce Words',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="bounce" 
    splitType="words" 
    className="text-4xl font-bold text-white text-center"
>
    Bounce Word Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextFlipWords(),
            title: 'Flip Words',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="flip" 
    splitType="words" 
    className="text-4xl font-bold text-white text-center"
>
    Flip Word Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextWaveWords(),
            title: 'Wave Words',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="wave" 
    splitType="words" 
    className="text-4xl font-bold text-white text-center"
>
    Wave Word Animation
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Speed Combination Variants
        {
            preview: AnimatedTextFadeUpFast(),
            title: 'Fast Fade Up',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="fadeUp" 
    speed="fast" 
    className="text-4xl font-bold text-white"
>
    Fast Fade Up
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextBounceSlow(),
            title: 'Slow Bounce',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="bounce" 
    speed="slow" 
    className="text-4xl font-bold text-white"
>
    Slow Bounce
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Styled Variants
        {
            preview: AnimatedTextGradient(),
            title: 'Gradient',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="scale" 
    className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
>
    Gradient Animation
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextNeon(),
            title: 'Neon Glow',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="glitch" 
    className="text-4xl font-bold text-cyan-400"
    style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff' }}
>
    Neon Glitch
</AnimatedText>`,
            isLiveDemo: false,
        },

        // Layout Variants
        {
            preview: AnimatedTextMultiLine(),
            title: 'Multi Line',
            codeSrc: 'AnimatedText',
            code: `<div className="text-center">
    <AnimatedText 
        animation="fadeUp" 
        splitType="words"
        className="text-3xl font-bold text-white block mb-2"
    >
        Multi Line
    </AnimatedText>
    <AnimatedText 
        animation="slideLeft" 
        splitType="words"
        className="text-3xl font-bold text-purple-400 block"
        delay={200}
    >
        Animation Effect
    </AnimatedText>
</div>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextHero(),
            title: 'Hero Text',
            codeSrc: 'AnimatedText',
            code: `<AnimatedText 
    animation="spiral" 
    className="text-6xl font-bold text-white text-center"
>
    HERO TEXT
</AnimatedText>`,
            isLiveDemo: false,
        },
        {
            preview: AnimatedTextButton(),
            title: 'Button Text',
            codeSrc: 'AnimatedText',
            code: `<button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors">
    <AnimatedText 
        animation="quick" 
        className="text-lg font-semibold text-white"
    >
        Click Me
    </AnimatedText>
</button>`,
            isLiveDemo: false,
        },
    ],
}
