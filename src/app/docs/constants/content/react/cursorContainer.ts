import React from 'react'
import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildSpringCursorContainer } from '../Builds/BuildPreviewCursorContainer'
import {
    CursorDefault,
    CursorMinimal,
    CursorElegant,
    CursorNeon,
} from '../Builds/Variants/CursorContainer/CursorContainer'

export const cursorContainerContent: DocContent = {
    title: 'Cursor Container',

    description: 'Create elegant square grid backgrounds with lovablelabs UI',
    preview: React.createElement(BuildSpringCursorContainer),
    isLock: true,
    releaseDate: releaseDate.cursorFollow,
    sections: [
        {
            title: 'Install Cursor Follow Container',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add CursorFollow`,
            copy_event: 'Install Cursor Follow Container',
            isLiveDemo: false,
        },
        {
            title: 'Install Depsendencies',
            codeSrc: 'Terminal',
            code: `npm i framer-motion clsx tailwind-merge`,
            copy_event: 'Install Depsendencies',
            isLiveDemo: false,
        },
        {
            title: 'Add util file ',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            copy_event: 'Add util file - CursorFollow',
            isLiveDemo: false,
        },
        {
            title: 'Cursor Follow Container',
            codeSrc: 'components/CursorContainer.tsx',
            code: `
'use client'
import React, { useState, useEffect, ReactNode, useMemo } from 'react'
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
 *
 * @example
 * Example usage:
 * <SpringCursor>
 *   <div>Your content here</div>
 * </SpringCursor>
 *
 * Another example:
 * <SpringCursor
 *   velocityScale={true}
 *   maxScale={2}
 *   showTrail={true}
 *   variants={customVariants}
 * >
 *   <YourApp />
 * </SpringCursor>
 */
export const SpringCursor: React.FC<SpringCursorProps> = ({
    enabled = true,
    variants,
    velocityScale = true,
    maxScale = 1.8,
    velocityRotation = true,
    showTrail = false,
    className = '',
    children,
    zIndex = 9999,
}) => {
    const [isVisible, setIsVisible] = useState(false)

    // Motion values for smooth tracking
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Create spring motion values for each variant using fixed hooks
    // We need to create a fixed number of springs to avoid hooks violations
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

    // Transform velocity to scale - fix the useTransform syntax
    const cursorScale = useTransform(
        useMotionTemplate\`\${cursorXVelocity} \${cursorYVelocity}\`,
        (latest) => {
            if (!velocityScale) return 1
            const [x, y] = latest.split(' ').map(Number)
            const velocity = Math.sqrt(x * x + y * y)
            return Math.min(1 + velocity / 3000, maxScale)
        }
    )

    useEffect(() => {
        console.log('change of variant')
    }, [variants])

    // For cursorRotate
    const cursorRotate = useTransform(
        useMotionTemplate \`\${cursorXVelocity} \${cursorYVelocity}\`,
        (latest) => {
            if (!velocityRotation) return 0
            const [x, y] = latest.split(' ').map(Number)
            return Math.atan2(y, x) * (180 / Math.PI)
        }
    )
    useEffect(() => {
        if (!enabled) return

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        const handleMouseEnter = () => {
            setIsVisible(true)
        }

        window.addEventListener('mousemove', updateMousePosition)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', updateMousePosition)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [enabled, mouseX, mouseY])

    if (!enabled) {
        return <>{children}</>
    }

    return (
        <div className={\`relative \${className}\`}>
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
              boxShadow: \`0 0 \${variant.size * 0.8}px \${variant.color}80, 0 0 \${
                  variant.size * 1.6
              }px \${variant.color}40\`,
          }
        : {}

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none"
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
            className="fixed top-0 left-0 pointer-events-none"
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


`,
            copy_event: 'Cursor Follow Container',
            isLiveDemo: false,
        },
    ],
    variantTab: [
        {
            preview: React.createElement(CursorDefault),
            title: 'Cursor Default',
            codeSrc: 'Example',
            code: `<SpringCursor
    key={JSON.stringify(cursorPresets.default)}
    variants={cursorPresets.default}
    velocityScale={true}
    maxScale={2}
    showTrail={true}
    className="bg-none cursor-none" >
    <DottedBackground full overlay centered boxSize={36}>
                <div className="px-5 py-2 bg-pink-300 text-pink-900 rounded-lg opacity-80 hover:opacity-100  duration-300 ease-in-out hover:scale-105 transition-all shadow-lg">
                    Drag around to see Default Cursor
                </div>
    </DottedBackground>
</SpringCursor>`,
            isLiveDemo: false,
        },
        {
            preview: React.createElement(CursorMinimal),
            title: 'Cursor Minimal',
            codeSrc: 'Example',
            code: `<SpringCursor
    key={JSON.stringify(cursorPresets.minimal)}
    variants={cursorPresets.minimal}
    velocityScale={true}
    maxScale={2}
    showTrail={true}
    className="bg-none cursor-none absolute overflow-hidden" >
        <DottedBackground full overlay centered boxSize={36}>
            <div className="px-5 py-2 bg-sky-300 text-sky-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                                    Drag around to see Minimal Cursor
            </div>
        </DottedBackground>
</SpringCursor>`,
            isLiveDemo: false,
        },
        {
            preview: React.createElement(CursorNeon),
            title: 'Cursor Neon',
            codeSrc: 'Example',
            code: ` <SpringCursor
    key={JSON.stringify(cursorPresets.neon)}
    variants={cursorPresets.neon}
    velocityScale={true}
    maxScale={2}
    showTrail={true}
    className="bg-none cursor-none" >
        <DottedBackground full overlay centered boxSize={36}>
            <div className="px-5 py-2 bg-green-300 text-green-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                Drag around to see Neon Cursor
            </div>
        </DottedBackground>
</SpringCursor>`,
            isLiveDemo: false,
        },
        {
            preview: React.createElement(CursorElegant),
            title: 'Cursor Elegant',
            codeSrc: 'Example',
            code: ` <SpringCursor
    key={JSON.stringify(cursorPresets.elegant)}
    variants={cursorPresets.elegant}
    velocityScale={true}
    maxScale={2}
    showTrail={true}
    className="bg-none cursor-none" >
        <DottedBackground full overlay centered boxSize={36}>
            <div className="px-5 py-2 text-violet-900 bg-violet-300 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                Drag around to see Elegant Cursor
            </div>
        </DottedBackground>
</SpringCursor>`,
            isLiveDemo: false,
        },
    ],
    propsTab: [
        {
            name: 'enabled',
            type: 'boolean',
            default: 'true',
            description: 'Enable or disable the custom cursor.',
        },
        {
            name: 'variants',
            type: 'CursorVariant[]',
            default: 'defaultVariants',
            description:
                'An array of cursor variants defining size, color, spring animation, and optional glow.',
        },
        {
            name: 'velocityScale',
            type: 'boolean',
            default: 'true',
            description:
                'If true, scales the cursor based on movement velocity.',
        },
        {
            name: 'maxScale',
            type: 'number',
            default: '1.8',
            description:
                'Maximum scaling factor when velocity scaling is enabled.',
        },
        {
            name: 'velocityRotation',
            type: 'boolean',
            default: 'true',
            description:
                'If true, the cursor rotates based on movement direction.',
        },
        {
            name: 'showTrail',
            type: 'boolean',
            default: 'false',
            description:
                'If true, displays a trailing particle effect behind the cursor.',
        },
        {
            name: 'className',
            type: 'string',
            description: 'Custom CSS class for the cursor container.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            description:
                'Content to render inside the cursor-enabled container.',
        },
        {
            name: 'zIndex',
            type: 'number',
            default: '9999',
            description:
                'Z-index applied to cursor layers to control stacking order.',
        },
    ],
}
