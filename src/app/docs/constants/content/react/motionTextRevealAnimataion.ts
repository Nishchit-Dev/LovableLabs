import React from 'react'
import { DocContent } from '../../types'
import { BuildPreviewMotionTextRevealAnimationSection } from '../Builds/BuildPreviewMotionTextReveal'
import { releaseDate } from '../../releaseDate/releaseDate'

export const motionTextRevealContent: DocContent = {
    title: 'Framer Text Reveal',
    releaseDate: releaseDate.motionTextReveal,
    description:
        'Create stunning text reveal animations using Framer Motion with lovablelabs UI.',
    preview: React.createElement(BuildPreviewMotionTextRevealAnimationSection),
    sections: [
        {
            title: 'Install Framer Text Reveal',
            codeSrc: 'Terminal',
            code: `npx install lovablelabs add MotionTextReveal`,
            copy_event: 'Install Framer Text Reveal',
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge framer-motion`,
            copy_event: 'Install Dependencies - MotionTextReveal',
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
            copy_event: 'Add util file - MotionTextReveal',
            isLiveDemo: false,
        },
        {
            title: 'Motion Text Reveal',
            codeSrc: 'components/MotionTextRevealAnimation.tsx',
            code: `import React, { useEffect, useState } from 'react'
import { motion, Transition, Variants } from 'framer-motion'

// Type definitions
export type SplitType = 'word' | 'char' | 'line'
export type TriggerType = 'mount' | 'hover' | 'click' | 'inView'
export type EasingType = number[] | string

export interface SpringConfig {
    type: 'spring'
    damping?: number
    stiffness?: number
    mass?: number
    velocity?: number
}

export interface SmoothTextAnimationProps {
    // Text configuration
    lines?: string[]
    splitBy?: SplitType

    // Animation timing
    staggerDelay?: number
    animationDuration?: number
    delayBetweenLines?: number

    // Physics & easing
    springConfig?: SpringConfig
    usePhysics?: boolean
    customEasing?: EasingType

    // Visual effects
    enableBlur?: boolean
    blurIntensity?: number
    enableScale?: boolean
    enableRotation?: boolean
    rotationRange?: [number, number]

    // Movement
    yOffset?: number
    xOffset?: number
    enableFloat?: boolean
    floatIntensity?: number

    // Styling
    className?: string
    textClassName?: string
    containerClassName?: string
    lineClassName?: string

    // Advanced options
    autoPlay?: boolean
    loop?: boolean
    onAnimationComplete?: () => void
    trigger?: TriggerType
    dark?: boolean
    replay?: boolean
}

export interface AnimationConfig {
    lines: string[]
    splitBy: SplitType
    staggerDelay: number
    animationDuration: number
    usePhysics: boolean
    enableBlur: boolean
    blurIntensity: number
    enableScale: boolean
    enableRotation: boolean
    yOffset: number
    enableFloat: boolean
    floatIntensity: number
    trigger: TriggerType
    loop: boolean
    dark: boolean
    replay: boolean
}

export const MotionTextAnimation: React.FC<SmoothTextAnimationProps> = ({
    // Text configuration
    lines = ['We Don't Just Design.', 'We Design with Soul.'],
    splitBy = 'word', // 'word', 'char', or 'line'

    // Animation timing
    staggerDelay = 0.08,
    animationDuration = 1.2,
    delayBetweenLines = 0.3,

    // Physics & easing
    springConfig = { type: 'spring', stiffness: 100 },
    usePhysics = true,
    customEasing = [0.25, 0.46, 0.45, 0.94],

    // Visual effects
    enableBlur = true,
    blurIntensity = 8,
    enableScale = true,
    enableRotation = false,
    rotationRange = [-2, 2],

    // Movement
    yOffset = 20,
    xOffset = 0,
    enableFloat = true,
    floatIntensity = 2,

    // Styling
    className = '',
    textClassName = 'text-4xl font-bold text-center',
    containerClassName = 'flex flex-col justify-center items-center ',
    lineClassName = 'flex flex-row gap-2 flex-wrap justify-center',

    // Advanced options
    autoPlay = true,
    loop = false,
    dark = false,
    onAnimationComplete = () => {},
    replay = false,
    trigger = 'mount', // 'mount', 'hover', 'click', 'inView'
}) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(autoPlay)
    const [animationKey, setAnimationKey] = useState<number>(0)

    useEffect(() => {
        setIsAnimating(false)
        setTimeout(() => {
            setIsAnimating(true)
        }, 1000)
    }, [replay])
    const splitText = (text: string, method: SplitType): string[] => {
        switch (method) {
            case 'char':
                return text.split('')
            case 'word':
                return text.split(' ')
            case 'line':
                return [text]
            default:
                return text.split(' ')
        }
    }

    const getRandomFloat = (min: number, max: number): number =>
        Math.random() * (max - min) + min

    const createVariants = (
        index: number,
        totalItems: number,
        lineIndex: number = 0
    ): Variants => {
        const delay: number =
            staggerDelay * index + delayBetweenLines * lineIndex

        const baseTransition: Transition = usePhysics
            ? {
                  ...springConfig,
                  delay,
              }
            : {
                  duration: animationDuration,
                  ease: customEasing,
                  delay,
              }

        return {
            hidden: {
                opacity: 0,
                y: yOffset,
                x: xOffset,
                scale: enableScale ? 0.8 : 1,
                rotateZ: enableRotation
                    ? getRandomFloat(rotationRange[0], rotationRange[1])
                    : 0,
                filter: enableBlur ? \`blur(\${blurIntensity}px)\` : 'none',
            },
            visible: {
                opacity: 1,
                y: enableFloat
                    ? getRandomFloat(-floatIntensity, floatIntensity)
                    : 0,
                x: 0,
                scale: 1,
                rotateZ: 0,
                filter: 'blur(0px)',
                transition: {
                    ...baseTransition,
                    filter: {
                        ...baseTransition,
                        duration: usePhysics
                            ? undefined
                            : animationDuration * 0.8,
                    },
                },
            },
            exit: {
                opacity: 0,
                y: -yOffset,
                scale: enableScale ? 0.8 : 1,
                filter: enableBlur ? \`blur(\${blurIntensity / 2}px)\` : 'none',
                transition: {
                    duration: 0.6,
                    ease: 'easeInOut',
                },
            },
        }
    }

    const handleTrigger = (): void => {
        if (trigger === 'click' || trigger === 'hover') {
            setIsAnimating(true)
            setAnimationKey((prev) => prev + 1)

            if (loop) {
                setTimeout(() => {
                    setIsAnimating(false)
                    setTimeout(() => setIsAnimating(true), 100)
                }, (lines.length * delayBetweenLines + staggerDelay * 10 + animationDuration) * 1000)
            }
        }
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: delayBetweenLines,
                delayChildren: 0.1,
            },
        },
    }

    const lineVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    }

    return (
        <motion.div
            className={\`\${containerClassName} \${className} \${
                dark ? 'text-black' : 'text-white'
            }\`}
            initial="hidden"
            animate={isAnimating ? 'visible' : 'hidden'}
            variants={containerVariants}
            onAnimationComplete={onAnimationComplete}
            onClick={trigger === 'click' ? handleTrigger : undefined}
            onHoverStart={trigger === 'hover' ? handleTrigger : undefined}
            key={animationKey}
        >
            {lines.map((line, lineIndex) => (
                <motion.div
                    key={\`line-\${lineIndex}-\${animationKey}\`}
                    className={\`\${lineClassName} \${textClassName}\`}
                    variants={lineVariants}
                >
                    {splitText(line, splitBy).map((item, itemIndex) => (
                        <motion.span
                            key={\`\${item}-\${itemIndex}-\${animationKey}\`}
                            variants={createVariants(
                                itemIndex,
                                splitText(line, splitBy).length,
                                lineIndex
                            )}
                            className="inline-block"
                            style={{
                                transformOrigin: 'center bottom',
                            }}
                        >
                            {item}
                            {splitBy === 'word' &&
                            itemIndex < splitText(line, splitBy).length - 1
                                ? ' '
                                : ''}
                        </motion.span>
                    ))}
                </motion.div>
            ))}
        </motion.div>
    )
}

`,
            copy_event: 'Motion Text Reveal',
            isLiveDemo: false,
        },
    ],
}
