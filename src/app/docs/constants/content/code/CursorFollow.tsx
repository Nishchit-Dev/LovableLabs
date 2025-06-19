'use client'
import React, { useState, useEffect, ReactNode, useMemo, useRef } from 'react'
import {
    motion,
    useSpring,
    useMotionValue,
    useVelocity,
    useTransform,
    MotionValue,
    useMotionTemplate,
} from 'framer-motion'

// Types
interface SpringConfig {
    damping: number
    stiffness: number
    mass: number
}

interface CursorVariant {
    size: number
    color: string
    opacity: number
    springConfig: SpringConfig
    blur?: number
    glow?: boolean
}

interface SpringCursorProps {
    /**
     * Enable/disable the custom cursor
     * @default true
     */
    enabled?: boolean

    /**
     * Cursor variants configuration
     */
    variants: CursorVariant[]

    /**
     * Enable velocity-based scaling
     * @default true
     */
    velocityScale?: boolean

    /**
     * Maximum scale factor for velocity scaling
     * @default 1.8
     */
    maxScale?: number

    /**
     * Enable rotation based on movement direction
     * @default true
     */
    velocityRotation?: boolean

    /**
     * Show particle trail effect
     * @default false
     */
    showTrail?: boolean

    /**
     * Custom className for the cursor container
     */
    className?: string

    /**
     * Children elements that will have the cursor applied
     */
    children: ReactNode

    /**
     * Z-index for cursor layers
     * @default 9999
     */
    zIndex?: number
}

// Default cursor variants
const defaultVariants: CursorVariant[] = [
    {
        size: 32,
        color: 'rgb(236, 72, 153)', // pink-500
        opacity: 1,
        springConfig: { damping: 25, stiffness: 400, mass: 0.3 },
        glow: true,
    },
    {
        size: 24,
        color: 'rgb(244, 114, 182)', // pink-400
        opacity: 0.7,
        springConfig: { damping: 20, stiffness: 250, mass: 0.5 },
        glow: true,
    },
    {
        size: 16,
        color: 'rgb(251, 146, 195)', // pink-300
        opacity: 0.5,
        springConfig: { damping: 15, stiffness: 150, mass: 0.8 },
    },
    {
        size: 12,
        color: 'rgb(252, 165, 206)', // pink-200
        opacity: 0.3,
        springConfig: { damping: 12, stiffness: 100, mass: 1.2 },
    },
]

/**
 * SpringCursor Component
 *
 * A smooth, physics-based cursor component with spring animations and velocity effects.
 * The cursor is contained within the component boundaries and hides when mouse leaves.
 *
 * @example
 * ```tsx
 * <SpringCursor>
 *   <div>Your content here</div>
 * </SpringCursor>
 * ```
 *
 * @example
 * ```tsx
 * <SpringCursor
 *   velocityScale={true}
 *   maxScale={2}
 *   showTrail={true}
 *   variants={customVariants}
 * >
 *   <YourApp />
 * </SpringCursor>
 * ```
 */
export const SpringCursor: React.FC<SpringCursorProps> = ({
    enabled = true,
    variants = defaultVariants,
    velocityScale = true,
    maxScale = 1.8,
    velocityRotation = true,
    showTrail = false,
    className = '',
    children,
    zIndex = 9999,
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Motion values for smooth tracking
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Create spring motion values for each variant using fixed hooks
    const spring1X = useSpring(
        mouseX,
        variants[0]?.springConfig || defaultVariants[0].springConfig
    )
    const spring1Y = useSpring(
        mouseY,
        variants[0]?.springConfig || defaultVariants[0].springConfig
    )

    const spring2X = useSpring(
        mouseX,
        variants[1]?.springConfig || defaultVariants[1].springConfig
    )
    const spring2Y = useSpring(
        mouseY,
        variants[1]?.springConfig || defaultVariants[1].springConfig
    )

    const spring3X = useSpring(
        mouseX,
        variants[2]?.springConfig || defaultVariants[2].springConfig
    )
    const spring3Y = useSpring(
        mouseY,
        variants[2]?.springConfig || defaultVariants[2].springConfig
    )

    const spring4X = useSpring(
        mouseX,
        variants[3]?.springConfig || defaultVariants[3].springConfig
    )
    const spring4Y = useSpring(
        mouseY,
        variants[3]?.springConfig || defaultVariants[3].springConfig
    )

    // Create springs array from the fixed hooks
    const springs = useMemo(
        () =>
            [
                { x: spring1X, y: spring1Y },
                { x: spring2X, y: spring2Y },
                { x: spring3X, y: spring3Y },
                { x: spring4X, y: spring4Y },
            ].slice(0, variants.length),
        [
            spring1X,
            spring1Y,
            spring2X,
            spring2Y,
            spring3X,
            spring3Y,
            spring4X,
            spring4Y,
            variants.length,
        ]
    )

    // Velocity-based effects for the main cursor
    const mainSpring = springs[0]
    const cursorXVelocity = useVelocity(mainSpring.x)
    const cursorYVelocity = useVelocity(mainSpring.y)

    // Transform velocity to scale
    const cursorScale = useTransform(
        useMotionTemplate`${cursorXVelocity} ${cursorYVelocity}`,
        (latest) => {
            if (!velocityScale) return 1
            const [x, y] = latest.split(' ').map(Number)
            const velocity = Math.sqrt(x * x + y * y)
            return Math.min(1 + velocity / 3000, maxScale)
        }
    )

    // For cursorRotate
    const cursorRotate = useTransform(
        useMotionTemplate`${cursorXVelocity} ${cursorYVelocity}`,
        (latest) => {
            if (!velocityRotation) return 0
            const [x, y] = latest.split(' ').map(Number)
            return Math.atan2(y, x) * (180 / Math.PI)
        }
    )

    useEffect(() => {
        if (!enabled || !containerRef.current) return

        const container = containerRef.current

        const updateMousePosition = (e: MouseEvent) => {
            if (!container) return
            
            const rect = container.getBoundingClientRect()
            const relativeX = e.clientX - rect.left
            const relativeY = e.clientY - rect.top
            
            // Check if mouse is within container bounds
            if (
                relativeX >= 0 && 
                relativeX <= rect.width && 
                relativeY >= 0 && 
                relativeY <= rect.height
            ) {
                mouseX.set(relativeX)
                mouseY.set(relativeY)
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        const handleMouseEnter = (e: MouseEvent) => {
            if (!container) return
            const rect = container.getBoundingClientRect()
            const relativeX = e.clientX - rect.left
            const relativeY = e.clientY - rect.top
            
            mouseX.set(relativeX)
            mouseY.set(relativeY)
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        // Add event listeners to the container instead of window/document
        container.addEventListener('mousemove', updateMousePosition)
        container.addEventListener('mouseenter', handleMouseEnter)
        container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            container.removeEventListener('mousemove', updateMousePosition)
            container.removeEventListener('mouseenter', handleMouseEnter)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [enabled, mouseX, mouseY])

    if (!enabled) {
        return <>{children}</>
    }

    return (
        <div 
            ref={containerRef}
            className={`relative overflow-hidden ${className} w-full h-full`}
            style={{ cursor: 'none' }} // Hide default cursor within container
        >
            {children}

            {/* Render cursor variants */}
            {variants.slice(0, 4).map((variant, index) => (
                <CursorElement
                    key={index}
                    variant={variant}
                    springX={springs[index].x}
                    springY={springs[index].y}
                    isVisible={isVisible}
                    scale={index === 0 ? cursorScale : undefined}
                    rotate={index === 0 ? cursorRotate : undefined}
                    zIndex={zIndex - index}
                />
            ))}

            {/* Particle trail effect */}
            {showTrail && springs.length > 0 && (
                <TrailEffect
                    springX={springs[springs.length - 1].x}
                    springY={springs[springs.length - 1].y}
                    isVisible={isVisible}
                    zIndex={zIndex - variants.length}
                />
            )}
        </div>
    )
}

// Individual cursor element component
interface CursorElementProps {
    variant: CursorVariant
    springX: MotionValue<number>
    springY: MotionValue<number>
    isVisible: boolean
    scale?: MotionValue<number>
    rotate?: MotionValue<number>
    zIndex: number
}

const CursorElement: React.FC<CursorElementProps> = ({
    variant,
    springX,
    springY,
    isVisible,
    scale,
    rotate,
    zIndex,
}) => {
    const glowStyle = variant.glow
        ? {
              boxShadow: `0 0 ${variant.size * 0.8}px ${variant.color}80, 0 0 ${
                  variant.size * 1.6
              }px ${variant.color}40`,
          }
        : {}

    return (
        <motion.div
            className="absolute top-0 left-0 pointer-events-none"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
                zIndex,
            }}
            animate={{
                opacity: isVisible ? variant.opacity : 0,
            }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="rounded-full"
                style={{
                    width: variant.size,
                    height: variant.size,
                    backgroundColor: variant.color,
                    scale,
                    rotate,
                    ...glowStyle,
                }}
            />
        </motion.div>
    )
}

// Trail effect component
interface TrailEffectProps {
    springX: MotionValue<number>
    springY: MotionValue<number>
    isVisible: boolean
    zIndex: number
}

const TrailEffect: React.FC<TrailEffectProps> = ({
    springX,
    springY,
    isVisible,
    zIndex,
}) => {
    return (
        <motion.div
            className="absolute top-0 left-0 pointer-events-none"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
                zIndex,
            }}
            animate={{
                opacity: isVisible ? 0.1 : 0,
            }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="w-16 h-16 rounded-full"
                style={{
                    background:
                        'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.div>
    )
}

// Export types for consumers
export type { SpringCursorProps, CursorVariant, SpringConfig }

// Preset configurations
export const cursorPresets = {
    default: defaultVariants,
    minimal: [
        {
            size: 20,
            color: 'rgb(59, 130, 246)', // blue-500
            opacity: 0.8,
            springConfig: { damping: 30, stiffness: 500, mass: 0.2 },
        },
    ],
    neon: [
        {
            size: 28,
            color: 'rgb(34, 197, 94)', // green-500
            opacity: 1,
            springConfig: { damping: 20, stiffness: 300, mass: 0.4 },
            glow: true,
        },
        {
            size: 20,
            color: 'rgb(74, 222, 128)', // green-400
            opacity: 0.6,
            springConfig: { damping: 15, stiffness: 200, mass: 0.7 },
        },
    ],
    elegant: [
        {
            size: 24,
            color: 'rgb(139, 92, 246)', // violet-500
            opacity: 0.9,
            springConfig: { damping: 35, stiffness: 450, mass: 0.3 },
            glow: true,
        },
        {
            size: 16,
            color: 'rgb(167, 139, 250)', // violet-400
            opacity: 0.5,
            springConfig: { damping: 25, stiffness: 300, mass: 0.6 },
        },
        {
            size: 8,
            color: 'rgb(196, 181, 253)', // violet-300
            opacity: 0.3,
            springConfig: { damping: 20, stiffness: 200, mass: 1.0 },
        },
    ],
}