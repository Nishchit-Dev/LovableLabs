import React from 'react'
// import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'

import { BuildPrivewDraggableLiquidGlassEffect } from '../Builds/BuildPreviewDraggableLiquidGlass'
import { DraggableLiquidGlassEffectSm } from '../Builds/Variants/DraggableLiquidGlass/DraggableLiquidGlassVaraints'

export const liquidGlassDraggableContent: DocContent = {
    title: 'Draggable Liquid Glass Effect',
    description:
        'The Draggable Liquid Glass Effect creates an interactive, fluid-like glass surface that users can drag and move, adding a modern and dynamic visual experience to your UI.',
    preview: React.createElement(BuildPrivewDraggableLiquidGlassEffect),

    sections: [
        {
            title: 'Install Draggable Liquid Glass',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add DraggableLiquidGlass`,
            copy_event: 'Install Draggable Liquid Glass',
            isLiveDemo: false,
        },
        {
            title: 'Draggable Liquid Glass Effect',
            codeSrc: 'components/DraggableLiquidGlass.tsx',
            code: `'use client'
import React, { useRef, useEffect, useCallback, useState } from 'react'

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
    initialPosition?: { x: number; y: number }
}

const DraggableLiquidGlass: React.FC<LiquidGlassProps> = ({
    width = 300,
    height = 200,
    className = '',
    initialPosition = { x: 50, y: 50 }, // percentage from left/top
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const feImageRef = useRef<SVGFEImageElement>(null)
    const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null)

    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState(initialPosition)
    const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
    const mouseUsedRef = useRef(false)
    const animationFrameRef = useRef<number>(0)

    const canvasDPI = 1
    const offset = 10
    const id = useRef(\`liquid-glass-\${Math.random().toString(36).substr(2, 9)}\`)

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

    const constrainPosition = useCallback(
        (x: number, y: number) => {
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight

            const minX = offset
            const maxX = viewportWidth - width - offset
            const minY = offset
            const maxY = viewportHeight - height - offset

            const constrainedX = Math.max(minX, Math.min(maxX, x))
            const constrainedY = Math.max(minY, Math.min(maxY, y))

            return { x: constrainedX, y: constrainedY }
        },
        [width, height, offset]
    )

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

    // Convert percentage position to pixel position
    const getPixelPosition = useCallback(() => {
        if (typeof window === 'undefined') return { x: 0, y: 0 }

        const x = (position.x / 100) * window.innerWidth - width / 2
        const y = (position.y / 100) * window.innerHeight - height / 2

        return constrainPosition(x, y)
    }, [position, width, height, constrainPosition])

    // Mouse event handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true)
        e.preventDefault()
    }, [])

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const container = containerRef.current
            if (!container) return

            const rect = container.getBoundingClientRect()
            mouseRef.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            }

            if (isDragging) {
                const newX = e.clientX - width / 2
                const newY = e.clientY - height / 2
                const constrained = constrainPosition(newX, newY)

                // Convert back to percentage
                const percentX =
                    ((constrained.x + width / 2) / window.innerWidth) * 100
                const percentY =
                    ((constrained.y + height / 2) / window.innerHeight) * 100

                setPosition({ x: percentX, y: percentY })
            }

            if (mouseUsedRef.current) {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current)
                }
                animationFrameRef.current = requestAnimationFrame(updateShader)
            }
        },
        [isDragging, width, height, constrainPosition, updateShader]
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    const handleResize = useCallback(() => {
        // Maintain relative position on resize
        setPosition((prev) => prev)
    }, [])

    // Setup event listeners
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('resize', handleResize)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('resize', handleResize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [handleMouseMove, handleMouseUp, handleResize])

    // Initialize shader
    useEffect(() => {
        updateShader()
    }, [updateShader])

    const pixelPosition = getPixelPosition()

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
                        id={\`\${id.current}_filter\`}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                        x="0"
                        y="0"
                        width={width.toString()}
                        height={height.toString()}
                    >
                        <feImage
                            ref={feImageRef}
                            id={\`\${id.current}_map\`}
                            width={width.toString()}
                            height={height.toString()}
                        />
                        <feDisplacementMap
                            ref={feDisplacementMapRef}
                            in="SourceGraphic"
                            in2={\`\${id.current}_map\`}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Liquid Glass Container */}
            <div
                ref={containerRef}
                className={\`fixed rounded-full shadow-lg \${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                } pointer-events-auto \${className}\`}
                style={{
                    left: \`\${pixelPosition.x}px\`,
                    top: \`\${pixelPosition.y}px\`,
                    width: \`\${width}px\`,
                    height: \`\${height}px\`,
                    backdropFilter: \`url(#\${id.current}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)\`,
                    boxShadow:
                        '0 4px 8px rgba(0, 0, 0, 0.25), 0 -10px 25px inset rgba(0, 0, 0, 0.15)',
                    borderRadius: '150px',
                    zIndex: 9999,
                }}
                onMouseDown={handleMouseDown}
            />
        </>
    )
}

export default DraggableLiquidGlass
`,
            copy_event: 'Draggable Liquid Glass',
            isLiveDemo: false,
        },
    ],
    variantTab: [
        {
            preview: React.createElement(DraggableLiquidGlassEffectSm),
            title: 'Usage',
            codeSrc: 'Example',
            code: `<div className=" rounded-xl  flex items-center justify-center  h-full overflow-hidden   border border-[#333] ">
     <DraggableLiquidGlass width={500} height={500} />
</div>`,
            copy_event: 'Install Draggable Liquid Glass',
            isLiveDemo: false,
        },
    ],
    propsTab: [
        {
            name: 'width',
            type: 'number',
            default: '300',
            description: 'The width of the liquid glass element in pixels.',
        },
        {
            name: 'height',
            type: 'number',
            default: '200',
            description: 'The height of the liquid glass element in pixels.',
        },
        {
            name: 'className',
            type: 'string',
            description:
                'Custom CSS class to apply to the liquid glass container.',
        },
        {
            name: 'initialPosition',
            type: 'object',
            description:
                'Initial position of the liquid glass element as a percentage of the viewport size. Default is {x: 50, y: 50} (centered).',
        },
    ],
}
