import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPreviewParallaxDotBackground } from '../Builds/BuildPreviewParallaxDotBackground'
import {
    ParallaxDottedGridVaraint,
    ParallaxDottedGridVaraintOverlay,
} from '../Builds/Variants/ParallaxDottedBackground/ParallaxDottedBackground'

export const backgroundParallaxDotContent: DocContent = {
    title: 'Parallax Dot Background',
    description:
        'Create stunning parallax dot backgrounds with Lovablelabs UI for a dynamic visual effect.',
    preview: BuildPreviewParallaxDotBackground(),
    releaseDate: releaseDate.parallaxDot,

    sections: [
        {
            title: 'Install Parallax Dot',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add ParallaxDotBackground`,
            copy_event: 'Install Parallax Dot',
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i framer-motion clsx tailwind-merge`,
            copy_event: 'Install Dependencies - ParallaxDotBackground',
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
            copy_event: 'Add Utility File - ParallaxDotBackground',
            isLiveDemo: false,
        },
        {
            title: 'Parallax Dot Background',
            codeSrc: 'components/ParallaxDotBackground.tsx',
            code: `import React, { useEffect, useRef, useState } from 'react'
            
            // Simple cn utility for className merging
            const cn = (...classes: (string | boolean | undefined)[]) =>
                classes.filter(Boolean).join(' ')
            
            interface ParallaxDotBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
                children: React.ReactNode
                full?: boolean // fills the screen
                centered?: boolean // centers children
                boxSize?: number // distance between dots
                dotSize?: number // size of each dot
                dotColor?: string // dot color (e.g., rgba(0,0,0,0.1))
                overlay?: boolean
                fullscreen?: boolean // full screen
            }
            
            export const ParallaxDotBackground: React.FC<
                ParallaxDotBackgroundProps & {
                    dark?: false | true
                    parallaxStrength?: number // Controls how much the dots move (0-1)
                    smoothness?: number // Controls animation smoothness (0-1)
                }
            > = ({
                children,
                className,
                full = false,
                overlay = false,
                centered = false,
                boxSize = 32,
                dotSize = 1.2,
                dotColor,
                dark = false,
                fullscreen = false,
                parallaxStrength = 0.5,
                smoothness = 0.15,
                ...props
            }) => {
                const containerRef = useRef<HTMLDivElement>(null)
                const backgroundRef = useRef<HTMLDivElement>(null)
                const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
                const currentPos = useRef({ x: 0, y: 0 })
                const animationId = useRef<number>(0)
            
                // Set default dotColor and overlay gradient based on theme
                const resolvedDotColor =
                    dotColor || (dark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.2)')
                const overlayGradient = dark
                    ? 'radial-gradient(ellipse, transparent 40%, #000 90%, #000 95%)'
                    : 'radial-gradient(ellipse, transparent 40%, white 90%, white 95%)'
            
                // Animation loop for smooth movement
                const animate = () => {
                    if (!backgroundRef.current) return
            
                    // Lerp towards target position
                    currentPos.current.x += (mousePos.x - currentPos.current.x) * smoothness
                    currentPos.current.y += (mousePos.y - currentPos.current.y) * smoothness
            
                    // Apply transform
                    backgroundRef.current.style.transform = \`translate(\${currentPos.current.x}px, \${currentPos.current.y}px)\`
            
                    // Continue animation
                    animationId.current = requestAnimationFrame(animate)
                }
            
                useEffect(() => {
                    // Start animation loop
                    animationId.current = requestAnimationFrame(animate)
            
                    return () => {
                        if (animationId.current) {
                            cancelAnimationFrame(animationId.current)
                        }
                    }
                }, [mousePos, smoothness])
            
                useEffect(() => {
                    const handleMouseMove = (e: MouseEvent) => {
                        if (!containerRef.current) return
            
                        const rect = containerRef.current.getBoundingClientRect()
                        const centerX = rect.width / 2
                        const centerY = rect.height / 2
            
                        // Get mouse position relative to container
                        const mouseX = e.clientX - rect.left
                        const mouseY = e.clientY - rect.top
            
                        // Calculate offset from center, normalized to -1 to 1
                        const offsetX = (mouseX - centerX) / centerX
                        const offsetY = (mouseY - centerY) / centerY
            
                        // Apply parallax strength and scale
                        const maxMove = 60 * parallaxStrength
                        const newX = offsetX * maxMove
                        const newY = offsetY * maxMove
            
                        setMousePos({ x: newX, y: newY })
                    }
            
                    const handleMouseLeave = () => {
                        setMousePos({ x: 0, y: 0 })
                    }
            
                    const container = containerRef.current
                    if (container) {
                        container.addEventListener('mousemove', handleMouseMove)
                        container.addEventListener('mouseleave', handleMouseLeave)
                    }
            
                    return () => {
                        if (container) {
                            container.removeEventListener('mousemove', handleMouseMove)
                            container.removeEventListener('mouseleave', handleMouseLeave)
                        }
                    }
                }, [parallaxStrength])
            
                return (
                    <div
                        ref={containerRef}
                        className={cn(
                            'relative overflow-hidden rounded-md',
                            full && 'h-full w-full',
                            fullscreen && 'min-h-screen w-screen',
                            centered && 'flex items-center justify-center',
                            dark ? 'bg-black' : 'bg-white',
                            className
                        )}
                        {...props}
                    >
                        <div
                            ref={backgroundRef}
                            className="absolute inset-0 h-full w-full z-0 pointer-events-none"
                            style={{
                                backgroundImage: \`radial-gradient(\${resolvedDotColor} \${dotSize}px, transparent \${dotSize}px)\`,
                                backgroundSize: \`\${boxSize}px \${boxSize}px\`,
                                width: '120%',
                                height: '120%',
                                left: '-10%',
                                top: '-10%',
                            }}
                        >
                            {overlay && (
                                <div
                                    className="flex flex-1 w-full h-full"
                                    style={{
                                        background: overlayGradient,
                                    }}
                                />
                            )}
                        </div>
                        <div className="relative z-10">{children}</div>
                    </div>
                )
            }
            `,
            copy_event: 'Parallax Grid Background',
            isLiveDemo: false,
        },
    ],

    variantTab: [
        {
            preview: ParallaxDottedGridVaraint(),
            title: 'Dark Varaint',
            codeSrc: 'Example',
            code: `<ParallaxDotBackground dark centered boxSize={36} full>
    <p className="text-white">
        Centered Text with Dark Bg
    </p>
</ParallaxDotBackground>`,
            isLiveDemo: false,
        },
        {
            preview: ParallaxDottedGridVaraintOverlay(),
            title: 'Dark Varaint with Overlay',
            codeSrc: 'Example',
            code: `<ParallaxDotBackground dark centered boxSize={46} full overlay>
    <p className="text-white">
        Centered Text with Overlay Dark Bg and Box size 46
    </p>
</ParallaxDotBackground>`,
            isLiveDemo: false,
        },
    ],
    propsTab: [
        {
            name: 'children',
            type: 'React.ReactNode',
            description:
                'The content to be displayed inside the parallax dot background.',
        },
        {
            name: 'className',
            type: 'string',
            description: 'Additional CSS classes for the outer container.',
        },
        {
            name: 'full',
            type: 'boolean',
            default: 'false',
            description:
                'If true, the background will fill the entire parent container.',
        },
        {
            name: 'fullscreen',
            type: 'boolean',
            default: 'false',
            description: 'If true, the background will fill the entire screen.',
        },
        {
            name: 'centered',
            type: 'boolean',
            default: 'false',
            description:
                'If true, the children will be centered inside the background.',
        },
        {
            name: 'overlay',
            type: 'boolean',
            default: 'false',
            description:
                'If true, a radial gradient overlay will be applied on top of the background.',
        },
        {
            name: 'boxSize',
            type: 'number',
            default: '32',
            description:
                'The distance between the dots in the background grid.',
        },
        {
            name: 'dotSize',
            type: 'number',
            default: '1.2',
            description: 'The size of each individual dot in the background.',
        },
        {
            name: 'dotColor',
            type: 'string',
            description:
                'The color of the dots. Defaults to a light or dark color based on the theme.',
        },
        {
            name: 'dark',
            type: 'boolean',
            default: 'false',
            description: 'Enables dark mode styling for the background.',
        },
        {
            name: 'parallaxStrength',
            type: 'number',
            default: '0.5',
            description:
                'Controls how much the dots move in response to mouse movement. Value between 0 and 1.',
        },
        {
            name: 'smoothness',
            type: 'number',
            default: '0.15',
            description:
                'Controls the animation smoothness. Lower values create smoother, slower animations.',
        },
    ],
}
