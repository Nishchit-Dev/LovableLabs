'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'

interface MousePosition {
    x: number
    y: number
}

interface ShaderUV {
    x: number
    y: number
}

interface TextureResult {
    type: 't'
    x: number
    y: number
}

interface LiquidGlassProps {
    width?: number
    height?: number
    className?: string
}

const LiquidCursor: React.FC<LiquidGlassProps> = ({
    width = 300,
    height = 200,
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const feImageRef = useRef<SVGFEImageElement>(null)
    const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null)

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
    const mouseUsedRef = useRef(false)
    const animationFrameRef = useRef<number>(0)

    const canvasDPI = 1
    const id = useRef(`liquid-glass-${Math.random().toString(36).substr(2, 9)}`)

    // Utility functions
    const smoothStep = useCallback(
        (a: number, b: number, t: number): number => {
            t = Math.max(0, Math.min(1, (t - a) / (b - a)))
            return t * t * (3 - 2 * t)
        },
        []
    )

    const length = useCallback((x: number, y: number): number => {
        return Math.sqrt(x * x + y * y)
    }, [])

    const roundedRectSDF = useCallback(
        (
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
        },
        [length]
    )

    const texture = useCallback((x: number, y: number): TextureResult => {
        return { type: 't', x, y }
    }, [])

    const fragmentShader = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (uv: ShaderUV, mouse: MousePosition): TextureResult => {
            const ix = uv.x - 0.5
            const iy = uv.y - 0.5
            const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
            const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
            const scaled = smoothStep(0, 1, displacement)
            return texture(ix * scaled + 0.5, iy * scaled + 0.5)
        },
        [roundedRectSDF, smoothStep, texture]
    )

    const updateShader = useCallback(() => {
        const canvas = canvasRef.current
        const feImage = feImageRef.current
        const feDisplacementMap = feDisplacementMapRef.current

        if (!canvas || !feImage || !feDisplacementMap) return

        const context = canvas.getContext('2d')
        if (!context) return

        const mouseProxy = new Proxy(mouseRef.current, {
            get: (target, prop) => {
                mouseUsedRef.current = true
                return target[prop as keyof MousePosition]
            },
        })

        mouseUsedRef.current = false

        const w = width * canvasDPI
        const h = height * canvasDPI
        const data = new Uint8ClampedArray(w * h * 4)

        let maxScale = 0
        const rawValues: number[] = []

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
        feImage.setAttributeNS(
            'http://www.w3.org/1999/xlink',
            'href',
            canvas.toDataURL()
        )
        feDisplacementMap.setAttribute(
            'scale',
            (maxScale / canvasDPI).toString()
        )
    }, [width, height, canvasDPI, fragmentShader])

    // Mouse tracking for cursor following
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            // Update cursor position for following
            setCursorPosition({
                x: e.clientX - width / 2,
                y: e.clientY - height / 2,
            })

            // Update internal mouse ref for shader effects
            const container = containerRef.current
            if (container) {
                const rect = container.getBoundingClientRect()
                mouseRef.current = {
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                }

                if (mouseUsedRef.current) {
                    if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current)
                    }
                    animationFrameRef.current =
                        requestAnimationFrame(updateShader)
                }
            }
        },
        [width, height, updateShader]
    )

    // Setup event listeners
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [handleMouseMove])

    // Initialize shader
    useEffect(() => {
        updateShader()
    }, [updateShader])

    return (
        <>
            {/* Hidden canvas for displacement map */}
            <canvas
                ref={canvasRef}
                width={width * canvasDPI}
                height={height * canvasDPI}
                className="hidden"
            />

            {/* SVG Filter */}
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                width="0"
                height="0"
                className="fixed top-0 left-0 pointer-events-none"
                style={{ zIndex: 9998 }}
            >
                <defs>
                    <filter
                        id={`${id.current}_filter`}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                        x="0"
                        y="0"
                        width={width.toString()}
                        height={height.toString()}
                    >
                        <feImage
                            ref={feImageRef}
                            id={`${id.current}_map`}
                            width={width.toString()}
                            height={height.toString()}
                        />
                        <feDisplacementMap
                            ref={feDisplacementMapRef}
                            in="SourceGraphic"
                            in2={`${id.current}_map`}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Liquid Glass Container - Now follows cursor smoothly */}
            <motion.div
                ref={containerRef}
                className={`fixed rounded-full shadow-lg pointer-events-none ${className}`}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backdropFilter: `url(#${id.current}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`,
                    boxShadow:
                        '0 4px 8px rgba(0, 0, 0, 0.25), 0 -10px 25px inset rgba(0, 0, 0, 0.15)',
                    borderRadius: '150px',
                    zIndex: 9999,
                }}
                animate={{
                    x: cursorPosition.x,
                    y: cursorPosition.y,
                }}
                transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200,
                    mass: 0.8,
                }}
            />
        </>
    )
}

export default LiquidCursor
