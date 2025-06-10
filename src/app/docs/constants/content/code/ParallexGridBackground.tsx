'use client'
import React, { useEffect, useRef, useState } from 'react'

// Simple cn utility for className merging
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

interface ParallexGridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    full?: boolean // fills the screen
    centered?: boolean // centers children
    overlay?: boolean // show radial overlay
    fullscreen?: boolean // full screen
}

export const ParallaxGridBackground: React.FC<
    ParallexGridBackgroundProps & {
        boxSize?: number
        dark?: false | true
        parallaxStrength?: number // Controls how much the grid moves (0-1)
        smoothness?: number // Controls animation smoothness (0-1)
    }
> = ({
    children,
    className,
    full = false,
    centered = false,
    overlay = false,
    boxSize = 24,
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
    const animationId = useRef<number>(null)

    // Set default dotColor and overlay gradient based on theme
    const resolvedDotColor = dark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.15)'
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
        backgroundRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`

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
            const maxMove = 50 * parallaxStrength
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
                    backgroundImage: `linear-gradient(to right,${resolvedDotColor} 1px,transparent 1px),linear-gradient(to bottom,${resolvedDotColor} 1px,transparent 1px)`,
                    backgroundSize: `${boxSize}px ${boxSize}px`,
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
