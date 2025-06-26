import React, { useState, useRef, useEffect } from 'react'
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
            className={`inline-block ${className}`}
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
