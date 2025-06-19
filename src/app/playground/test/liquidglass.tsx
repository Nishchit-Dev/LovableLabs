import React, { useEffect, useRef } from 'react'

interface LiquidGlassCursorProps {
    size?: number
    strength?: number
    blur?: number
    brightness?: number
    contrast?: number
    border?: string
    shadow?: string
    className?: string
    style?: React.CSSProperties
}

interface Position {
    x: number
    y: number
}

interface Texture {
    type: string
    x: number
    y: number
}

const LiquidGlassCursor: React.FC<LiquidGlassCursorProps> = ({
    size = 200,
    strength = 20,
    blur = 2,
    brightness = 1.1,
    contrast = 1.2,
    border = '1px solid rgba(255, 255, 255, 0.2)',
    shadow = '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1)',
    className = '',
    style = {},
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)

    const positionRef = useRef<Position>({ x: 0, y: 0 })
    const targetPositionRef = useRef<Position>({ x: 0, y: 0 })
    const velocityRef = useRef<Position>({ x: 0, y: 0 })
    const mouseRef = useRef<Position>({ x: 0.5, y: 0.5 })
    const mouseUsedRef = useRef(false)
    const filterId = useRef(
        `liquid-glass-${Math.random().toString(36).substr(2, 9)}`
    )

    // Utility functions
    const smoothStep = (a: number, b: number, t: number): number => {
        t = Math.max(0, Math.min(1, (t - a) / (b - a)))
        return t * t * (3 - 2 * t)
    }

    const length = (x: number, y: number): number => Math.sqrt(x * x + y * y)

    const roundedRectSDF = (
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
    ): number => {
        const qx = Math.abs(x) - width + radius
        const qy = Math.abs(y) - height + radius
        return (
            Math.min(Math.max(qx, qy), 0) +
            length(Math.max(qx, 0), Math.max(qy, 0)) -
            radius
        )
    }

    const texture = (x: number, y: number): Texture => ({ type: 't', x, y })

    // Fragment shader - creates the liquid distortion effect
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fragmentShader = (uv: Position, mouseProxy: Position): Texture => {
        const ix = uv.x - 0.5
        const iy = uv.y - 0.5
      
        // Create lens distortion effect
        const distanceToEdge = roundedRectSDF(ix, iy, 0.35, 0.35, 0.35)
        const displacement = smoothStep(0.1, -0.2, distanceToEdge)

        // Add velocity-based stretching
        const velocityMagnitude = length(
            velocityRef.current.x,
            velocityRef.current.y
        )
        const velocityFactor = Math.min(velocityMagnitude * 0.001, 0.1)

        // Create stronger lens effect
        const lensStrength = displacement * (1.0 + velocityFactor)
        const scaled = smoothStep(0, 1, lensStrength)

        // Apply magnification and distortion
        return texture(
            ix * (1 - scaled * 0.4) + 0.5,
            iy * (1 - scaled * 0.4) + 0.5
        )
    }

    // Update displacement map
    const updateShader = (): void => {
        const mouseProxy = new Proxy(mouseRef.current, {
            get: (target, prop: keyof Position) => {
                mouseUsedRef.current = true
                return target[prop]
            },
        })

        mouseUsedRef.current = false

        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        const w = size
        const h = size
        const data = new Uint8ClampedArray(w * h * 4)

        let maxScale = 0
        const rawValues: number[] = []

        // Generate displacement values
        for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % w
            const y = Math.floor(i / 4 / w)
            const pos = fragmentShader({ x: x / w, y: y / h }, mouseProxy)
            const dx = pos.x * w - x
            const dy = pos.y * h - y
            maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
            rawValues.push(dx, dy)
        }

        maxScale *= 0.5

        // Apply to image data
        let index = 0
        for (let i = 0; i < data.length; i += 4) {
            const r = rawValues[index++] / maxScale + 0.5
            const g = rawValues[index++] / maxScale + 0.5
            data[i] = r * 255
            data[i + 1] = g * 255
            data[i + 2] = 0
            data[i + 3] = 255
        }

        context.putImageData(new ImageData(data, w, h), 0, 0)

        // Update SVG filter
        const svg = svgRef.current
        if (!svg) return

        const feImage = svg.querySelector('feImage')
        const feDisplacementMap = svg.querySelector('feDisplacementMap')

        if (feImage && feDisplacementMap) {
            feImage.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'href',
                canvas.toDataURL()
            )
            feDisplacementMap.setAttribute(
                'scale',
                ((maxScale * strength) / 10).toString()
            )
        }
    }

    // Animation loop
    const animate = (): void => {
        // Spring physics for smooth cursor movement
        const spring = 0.2
        const damping = 0.8

        const dx = targetPositionRef.current.x - positionRef.current.x
        const dy = targetPositionRef.current.y - positionRef.current.y

        velocityRef.current.x += dx * spring
        velocityRef.current.y += dy * spring
        velocityRef.current.x *= damping
        velocityRef.current.y *= damping

        positionRef.current.x += velocityRef.current.x
        positionRef.current.y += velocityRef.current.y

        // Update visual position
        const container = containerRef.current
        if (container) {
            container.style.transform = `translate(${
                positionRef.current.x - size / 2
            }px, ${positionRef.current.y - size / 2}px)`
        }

        // Update displacement map
        updateShader()

        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        // Initialize canvas
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = size
        canvas.height = size

        // Start animation
        updateShader()
        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [size, strength])

    // Mouse event handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent): void => {
            targetPositionRef.current = {
                x: e.clientX,
                y: e.clientY,
            }

            // Update mouse position for shader
            mouseRef.current = {
                x: (e.clientX - positionRef.current.x + size / 2) / size,
                y: (e.clientY - positionRef.current.y + size / 2) / size,
            }
        }

        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [size])

    return (
        <>
            {/* SVG Filter for distortion effect */}
            <svg
                ref={svgRef}
                className="fixed top-0 left-0 pointer-events-none"
                width="0"
                height="0"
                style={{ zIndex: 999998 }}
            >
                <defs>
                    <filter
                        id={filterId.current}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                        x="0"
                        y="0"
                        width={size}
                        height={size}
                    >
                        <feImage
                            id={`${filterId.current}_map`}
                            width={size}
                            height={size}
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2={`${filterId.current}_map`}
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale={strength}
                        />
                    </filter>
                </defs>
            </svg>

            {/* The glass cursor element with Tailwind classes */}
            <div
                ref={containerRef}
                className={`fixed pointer-events-none rounded-full ${className}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backdropFilter: `url(#${filterId.current}) blur(${blur}px) contrast(${contrast}) brightness(${brightness})`,
                    border,
                    boxShadow: shadow,
                    zIndex: 999999,
                    ...style,
                }}
            />

            {/* Hidden canvas for displacement map */}
            <canvas
                ref={canvasRef}
                className="hidden"
                width={size}
                height={size}
            />
        </>
    )
}

export default LiquidGlassCursor
