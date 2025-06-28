import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPrivewScrollWaves } from '../Builds/BuildPreviewScrollWave'

import {
    ClassicWaveformVariant,
    NeonGlowWaveformVariant,
    MinimalMonochromeVariant,
    ThickBarsWaveformVariant,
    DenseFrequencyVariant,
    AudioSpectrumStyleVariant,
} from '../Builds/Variants/ScrollWaves/ScrollWavesVaraints'

export const scrollWaveContent: DocContent = {
    title: 'Scroll Waves',
    description:
        'The Scroll Waves component animates wave patterns that scale and descale as the user scrolls, with an indicator that moves in sync with scrolling. Enhance your UI with dynamic, interactive backgrounds using Lovablelabs UI.',
    preview: BuildPrivewScrollWaves(),
    releaseDate: releaseDate.scrollWave,
    sections: [
        {
            title: 'Install Scroll Waves',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add ScrollWaves`,
            copy_event: 'Install ScrollWaves',
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i framer-motion`,
            copy_event: 'Install Dependencies - ScrollWaves',
            isLiveDemo: false,
        },
        {
            title: 'ScrollWaves of component',
            codeSrc: 'components/ScrollWaves.tsx',
            code: `import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Type definitions
type WaveLength = 'none' | 'short' | 'medium' | 'long' | 'custom'

interface WaveConfig {
    frequency: number
    amplitude: number
}

interface WaveConfigs {
    [key: string]: {
        waves: WaveConfig[]
    }
}

interface BarData {
    id: number
    isBigBar: boolean
    baseHeight: number
    baseWidth: number
    currentHeight: number
    currentWidth: number
    targetHeight: number
    targetWidth: number
}

interface ScrollWaveformProps {
    /** Number of bars in the waveform */
    barCount?: number
    /** Fixed height for small bars in pixels */
    smallBarHeight?: number
    /** Fixed height for big bars (every 5th) in pixels */
    bigBarHeight?: number
    /** Total width of the waveform component */
    width?: number
    /** Total height of the waveform component */
    height?: number
    /** Color for small bars */
    barColor?: string
    /** Color for big bars (every 5th) */
    bigBarColor?: string
    /** Color for the scroll indicator */
    indicatorColor?: string
    /** Background color of the waveform */
    backgroundColor?: string
    /** Width of small bars in pixels */
    barWidth?: number
    /** Width of big bars in pixels */
    bigBarWidth?: number
    /** Spacing between bars in pixels */
    barSpacing?: number
    /** Scale factor for height scaling effect (0-1) */
    heightScale?: number
    /** Scale factor for width scaling effect (0-1) */
    widthScale?: number
    /** Animation smoothing factor (0-1, lower = smoother) */
    smoothing?: number
    /** Wave pattern type */
    waveLength?: WaveLength
    /** Custom wave count when waveLength is "custom" */
    customWaveCount?: number
    /** Additional CSS classes */
    className?: string
    /** Callback fired when a bar is clicked */
    onBarClick?: (barIndex: number, barData: BarData) => void
    /** Callback fired when scroll position changes */
    onScrollChange?: (position: number, velocity: number) => void
}

interface DemoConfig {
    smallBarHeight: number
    bigBarHeight: number
    barWidth: number
    bigBarWidth: number
    barSpacing: number
    heightScale: number
    widthScale: number
    smoothing: number
    waveLength: WaveLength
    customWaveCount: number
}

interface WaveOption {
    value: WaveLength
    label: string
    description?: string
}

export const ScrollWaveform: React.FC<ScrollWaveformProps> = ({
    barCount = 45,
    smallBarHeight = 20,
    bigBarHeight = 35,
    width = 400,
    height = 200,
    barColor = '#6B7280',
    bigBarColor = '#374151',
    indicatorColor = '#F97316',
    backgroundColor = '',
    barWidth = 1,
    bigBarWidth = 1.2,
    barSpacing = 8,
    heightScale = 0.4,
    widthScale = 0.15,
    smoothing = 0.5,
    waveLength = 'none',
    customWaveCount = 2,
    className = '',
    onBarClick,
    onScrollChange,
}) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0)
    const [scrollVelocity, setScrollVelocity] = useState<number>(0)
    const [barData, setBarData] = useState<BarData[]>([])
    const lastScrollY = useRef<number>(0)
    const lastScrollTime = useRef<number>(Date.now())

    // Framer Motion values
    const scrollProgress = useMotionValue(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const indicatorX = useTransform(scrollProgress, [0, 1], [0, width - 2])

    // Wave length configurations
    const waveConfigs: WaveConfigs = {
        none: { waves: [] },
        short: { waves: [{ frequency: 8, amplitude: 0.3 }] },
        medium: {
            waves: [
                { frequency: 4, amplitude: 0.2 },
                { frequency: 8, amplitude: 0.1 },
            ],
        },
        long: {
            waves: [
                { frequency: 2, amplitude: 0.25 },
                { frequency: 6, amplitude: 0.15 },
            ],
        },
        custom: { waves: [{ frequency: customWaveCount, amplitude: 0.2 }] },
    }

    // Generate waveform pattern
    useEffect(() => {
        const bars: BarData[] = []
        const config = waveConfigs[waveLength] || waveConfigs.medium

        for (let i = 0; i < barCount; i++) {
            const isBigBar: boolean = (i + 1) % 5 === 0 // Every 5th bar
            const normalizedPosition: number = i / (barCount - 1)

            let baseHeight: number
            let baseWidth: number

            if (isBigBar) {
                // Big bars have fixed height
                baseHeight = bigBarHeight
                baseWidth = bigBarWidth
            } else {
                // Small bars: either uniform or with wave variation
                if (config.waves.length === 0) {
                    // No wave - uniform height
                    baseHeight = smallBarHeight
                } else {
                    // Apply wave pattern
                    let waveValue: number = 0
                    config.waves.forEach((wave: WaveConfig) => {
                        waveValue +=
                            Math.sin(
                                normalizedPosition * Math.PI * wave.frequency
                            ) * wave.amplitude
                    })

                    // Keep within reasonable bounds
                    const variation: number = waveValue * smallBarHeight
                    baseHeight = Math.max(
                        smallBarHeight * 0.6,
                        smallBarHeight + variation
                    )
                }
                baseWidth = barWidth
            }

            bars.push({
                id: i,
                isBigBar,
                baseHeight,
                baseWidth,
                currentHeight: baseHeight,
                currentWidth: baseWidth,
                targetHeight: baseHeight,
                targetWidth: baseWidth,
            })
        }

        setBarData(bars)
    }, [
        barCount,
        smallBarHeight,
        bigBarHeight,
        barWidth,
        bigBarWidth,
        waveLength,
        customWaveCount,
    ])

    // Handle scroll events
    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollY: number = window.scrollY
            const currentTime: number = Date.now()
            const deltaY: number = currentScrollY - lastScrollY.current
            const deltaTime: number = Math.max(
                currentTime - lastScrollTime.current,
                1
            )

            const velocity: number = Math.abs(deltaY) / deltaTime
            const smoothedVelocity: number =
                velocity * 0.2 + scrollVelocity * 0.8

            const maxScroll: number = Math.max(
                document.documentElement.scrollHeight - window.innerHeight,
                1
            )
            const normalizedPosition: number = Math.min(
                currentScrollY / maxScroll,
                1
            )

            setScrollPosition(normalizedPosition)
            setScrollVelocity(smoothedVelocity)
            scrollProgress.set(normalizedPosition)

            // Fire callback if provided
            if (onScrollChange) {
                onScrollChange(normalizedPosition, smoothedVelocity)
            }

            lastScrollY.current = currentScrollY
            lastScrollTime.current = currentTime
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrollProgress, scrollVelocity, onScrollChange])

    // Update bar targets based on scroll
    useEffect(() => {
        if (barData.length === 0) return

        setBarData((prevBars: BarData[]) => {
            return prevBars.map((bar: BarData, index: number) => {
                const normalizedIndex: number = index / (barCount - 1)
                const distance: number = Math.abs(
                    normalizedIndex - scrollPosition
                )

                const influence: number = Math.max(0, 1 - distance * 5)

                const heightEffect: number =
                    influence * scrollVelocity * heightScale * 60
                const widthEffect: number =
                    influence * scrollVelocity * widthScale * 8

                const targetHeight: number = bar.baseHeight + heightEffect
                const targetWidth: number = bar.baseWidth + widthEffect

                return {
                    ...bar,
                    targetHeight,
                    targetWidth,
                }
            })
        })
    }, [scrollPosition, scrollVelocity, heightScale, widthScale, barCount])

    // Smooth interpolation
    useEffect(() => {
        if (barData.length === 0) return

        const animate = (): void => {
            setBarData((prevBars: BarData[]) => {
                return prevBars.map((bar: BarData) => {
                    const newHeight: number =
                        bar.currentHeight +
                        (bar.targetHeight - bar.currentHeight) * smoothing
                    const newWidth: number =
                        bar.currentWidth +
                        (bar.targetWidth - bar.currentWidth) * smoothing

                    return {
                        ...bar,
                        currentHeight: newHeight,
                        currentWidth: newWidth,
                    }
                })
            })

            setScrollVelocity((prev: number) => prev * 0.95)
        }

        const animationFrame: number = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [barData, smoothing])

    const handleBarClick = (index: number, bar: BarData): void => {
        if (onBarClick) {
            onBarClick(index, bar)
        }
    }

    return (
        <div className={\`inline-block \${className}\`}>
            <svg
                width={width}
                height={height}
                style={{ backgroundColor }}
                className="rounded-lg w-full"
            >
                {/* Waveform bars - all touching the base */}
                {barData.map((bar: BarData, index: number) => {
                    const x: number =
                        index * (Math.max(barWidth, bigBarWidth) + barSpacing)
                    const y: number = height - bar.currentHeight - 10 // All bars start from same baseline

                    const distance: number = Math.abs(
                        index / (barCount - 1) - scrollPosition
                    )
                    const glowOpacity: number = Math.max(
                        0,
                        (1 - distance * 4) * 0.4
                    )

                    return (
                        <motion.rect
                            key={bar.id}
                            x={x}
                            y={y}
                            width={bar.currentWidth}
                            height={bar.currentHeight}
                            fill={bar.isBigBar ? bigBarColor : barColor}
                            rx={bar.currentWidth / 4}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{
                                scaleY: 1,
                                opacity: bar.isBigBar ? 0.9 : 0.7 + glowOpacity,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.015,
                                ease: 'easeOut',
                            }}
                            style={{
                                transformOrigin: 'center bottom',
                                filter:
                                    glowOpacity > 0.1
                                        ? \`drop-shadow(0 0 \${
                                              glowOpacity * 6
                                          }px \${indicatorColor}25)\`
                                        : 'none',
                                cursor: onBarClick ? 'pointer' : 'default',
                            }}
                            onClick={() => handleBarClick(index, bar)}
                        />
                    )
                })}

                {/* Base line */}
                <line
                    x1={0}
                    y1={height - 10}
                    x2={width}
                    y2={height - 10}
                    stroke={barColor}
                    strokeWidth="0.5"
                    opacity="0.3"
                />

                <motion.line
                    x1={scrollPosition * (width - 2 )}
                    y1={height-5}
                    x2={scrollPosition * (width - 2)}
                    y2={140}
                    stroke={indicatorColor}
                    strokeWidth="2"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: scrollPosition * (width - 2) }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 120, damping: 18 }}
                    style={{
                        filter: \`drop-shadow(0 0 4px \${indicatorColor}40)\`,
                    }}
                />

                {/* Indicator triangle */}
                {/* <motion.polygon
                    points={\`\${scrollPosition * (width - 2) - 6},8 \${
                        scrollPosition * (width - 2) + 6
                    },8 \${scrollPosition * (width - 2)},2\`}
                    fill={indicatorColor}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.6,
                        ease: 'easeOut',
                    }}
                    className={\`rotate-0\`}
                    style={{
                        filter: \`drop-shadow(0 1px 2px \${indicatorColor}30) \`,
                    }}
                /> */}
            </svg>
        </div>
    )
}

// Demo component with enhanced TypeScript support
const ScrollWaveformDemo: React.FC = () => {
    const [config, setConfig] = useState<DemoConfig>({
        smallBarHeight: 40,
        bigBarHeight: 80,
        barWidth: 2,
        bigBarWidth: 3,
        barSpacing: 4,
        heightScale: 0.4,
        widthScale: 0.15,
        smoothing: 0.12,
        waveLength: 'medium',
        customWaveCount: 2,
    })

    const [scrollInfo, setScrollInfo] = useState<{
        position: number
        velocity: number
    }>({
        position: 0,
        velocity: 0,
    })

    const waveOptions: WaveOption[] = [
        {
            value: 'none',
            label: 'None (Uniform)',
            description: 'All small bars same height',
        },
        {
            value: 'short',
            label: 'Short Wave',
            description: 'Quick oscillations',
        },
        {
            value: 'medium',
            label: 'Medium Wave',
            description: 'Balanced pattern',
        },
        { value: 'long', label: 'Long Wave', description: 'Gentle waves' },
        {
            value: 'custom',
            label: 'Custom',
            description: 'Developer-defined pattern',
        },
    ]

    const handleScrollChange = (position: number, velocity: number): void => {
        setScrollInfo({ position, velocity })
    }

    const handleBarClick = (barIndex: number, barData: BarData): void => {
        console.log(\`Clicked bar \${barIndex}:\`, barData)
        // You can add custom logic here
    }

    const updateConfig = <K extends keyof DemoConfig>(
        key: K,
        value: DemoConfig[K]
    ): void => {
        setConfig((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Enhanced Controls with TypeScript */}
            <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg space-y-3 w-80">
                <h3 className="font-semibold text-gray-800">
                    TypeScript Waveform Controls
                </h3>

                {/* Scroll Info Display */}
                <div className="bg-gray-50 p-3 rounded text-xs">
                    <div>
                        Position: {(scrollInfo.position * 100).toFixed(1)}%
                    </div>
                    <div>Velocity: {scrollInfo.velocity.toFixed(3)}</div>
                </div>

                {/* Wave Length Selection */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Wave Pattern:
                    </label>
                    <select
                        value={config.waveLength}
                        onChange={(e) =>
                            updateConfig(
                                'waveLength',
                                e.target.value as WaveLength
                            )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                        {waveOptions.map((option: WaveOption) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500">
                        {
                            waveOptions.find(
                                (opt) => opt.value === config.waveLength
                            )?.description
                        }
                    </p>
                </div>

                {/* Custom Wave Count */}
                {config.waveLength === 'custom' && (
                    <label className="block text-sm">
                        Custom Wave Count: {config.customWaveCount}
                        <input
                            type="range"
                            min="1"
                            max="8"
                            value={config.customWaveCount}
                            onChange={(e) =>
                                updateConfig(
                                    'customWaveCount',
                                    parseInt(e.target.value)
                                )
                            }
                            className="w-full mt-1"
                        />
                    </label>
                )}

                <label className="block text-sm">
                    Small Bar Height: {config.smallBarHeight}px
                    <input
                        type="range"
                        min="20"
                        max="80"
                        value={config.smallBarHeight}
                        onChange={(e) =>
                            updateConfig(
                                'smallBarHeight',
                                parseInt(e.target.value)
                            )
                        }
                        className="w-full mt-1"
                    />
                </label>

                <label className="block text-sm">
                    Big Bar Height: {config.bigBarHeight}px
                    <input
                        type="range"
                        min="60"
                        max="120"
                        value={config.bigBarHeight}
                        onChange={(e) =>
                            updateConfig(
                                'bigBarHeight',
                                parseInt(e.target.value)
                            )
                        }
                        className="w-full mt-1"
                    />
                </label>

                <label className="block text-sm">
                    Bar Width: {config.barWidth}px
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={config.barWidth}
                        onChange={(e) =>
                            updateConfig('barWidth', parseFloat(e.target.value))
                        }
                        className="w-full mt-1"
                    />
                </label>
            </div>

            {/* Header */}
            <div className="bg-white py-16 px-8 text-center">
                <motion.h1
                    className="text-4xl font-bold text-gray-900 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    TypeScript Scroll Waveform
                </motion.h1>

                <motion.p
                    className="text-lg text-gray-600 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Fully typed component with IntelliSense support • Click bars
                    to see console logs
                </motion.p>

                {/* Waveform component */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <ScrollWaveform
                        {...config}
                        width={650}
                        height={200}
                        barCount={50}
                        barColor="#6B7280"
                        bigBarColor="#374151"
                        indicatorColor="#F97316"
                        backgroundColor="#F9FAFB"
                        onScrollChange={handleScrollChange}
                        onBarClick={handleBarClick}
                    />
                </motion.div>
            </div>

            {/* TypeScript Features Section */}
            <div className="max-w-6xl mx-auto px-8 py-16">
                <motion.section
                    className="bg-white rounded-xl p-8 shadow-sm mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        TypeScript Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                🎯 Type Safety
                            </h3>
                            <ul className="text-gray-700 space-y-2 text-sm">
                                <li>• Comprehensive interface definitions</li>
                                <li>• Type-safe prop validation</li>
                                <li>• IntelliSense support in IDEs</li>
                                <li>• Compile-time error checking</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                🔧 Developer Experience
                            </h3>
                            <ul className="text-gray-700 space-y-2 text-sm">
                                <li>• Auto-completion for all props</li>
                                <li>• JSDoc comments for documentation</li>
                                <li>• Callback type definitions</li>
                                <li>• Generic type constraints</li>
                            </ul>
                        </div>
                    </div>

                    {/* Type Definitions Code Block */}
                    <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                            Type Definitions:
                        </h4>
                        <pre className="text-xs text-gray-700 bg-white p-3 rounded overflow-x-auto">
                            {\`interface ScrollWaveformProps {
  barCount?: number;
  smallBarHeight?: number;
  bigBarHeight?: number;
  waveLength?: "none" | "short" | "medium" | "long" | "custom";
  onBarClick?: (barIndex: number, barData: BarData) => void;
  onScrollChange?: (position: number, velocity: number) => void;
  // ... and many more typed props
}\`}
                        </pre>
                    </div>

                    {/* Usage Example */}
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                            Usage Example:
                        </h4>
                        <pre className="text-xs text-blue-800 bg-white p-3 rounded overflow-x-auto">
                            {\`<ScrollWaveform
  barCount={32}
  waveLength="medium"
  smallBarHeight={40}
  onBarClick={(index, data) => console.log('Bar clicked:', index, data)}
  onScrollChange={(pos, vel) => setScrollInfo({ position: pos, velocity: vel })}
/>\`}
                        </pre>
                    </div>
                </motion.section>

                {/* Scrollable test content */}
                {[...Array(6)].map((_, i: number) => (
                    <motion.section
                        key={i}
                        className="bg-white rounded-xl p-8 shadow-sm mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            TypeScript Section {i + 1}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            This fully typed component provides excellent
                            developer experience with comprehensive type
                            definitions, callback handlers, and IntelliSense
                            support. Check the browser console to see typed
                            callback data when you click on bars.
                        </p>
                        {i === 2 && (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <p className="text-green-800 text-sm">
                                    <strong>TypeScript Benefits:</strong> Get
                                    auto-completion, type checking, and better
                                    refactoring support. The component is fully
                                    typed with comprehensive interfaces and
                                    proper generic constraints.
                                </p>
                            </div>
                        )}
                    </motion.section>
                ))}
            </div>
        </div>
    )
}

export default ScrollWaveformDemo
`,
            copy_event: 'ScrollWaves',
            isLiveDemo: false,
        },
    ],
    variantTab: [
        {
            preview: MinimalMonochromeVariant(),
            title: 'Minimal Mono chrome Variant',
            codeSrc: 'MinimalMonochromeVariant.tsx',
            code: `export const MinimalMonochromeVariant = () => {
                return (
                    <div className="mb-10">
                        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                            <GridBackground
                                full
                                overlay
                                centered
                                boxSize={36}
                                className="min-h-[150px] w-full p-20"
                            >
                                <ScrollWaveform
                                    barCount={25}
                                    waveLength="none"
                                    smallBarHeight={20}
                                    bigBarHeight={35}
                                    barColor="#FFFFFF"
                                    bigBarColor="#FFFFFF"
                                    indicatorColor="#FF4444"
                                    barWidth={1}
                                    bigBarWidth={1}
                                    barSpacing={12}
                                    width={400}
                                    height={120}
                                />
                            </GridBackground>
                        </div>
                    </div>
                )
            }`,
            isLiveDemo: false,
        },
        {
            preview: ClassicWaveformVariant(),
            title: 'Classic Wave Variant',
            codeSrc: 'ClassicWaveFromVaraint.tsx',
            code: `export const ClassicWaveformVariant = () => {
                return (
                    <div className="mb-10">
                        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                            <GridBackground
                                full
                                overlay
                                centered
                                boxSize={36}
                                className="min-h-[150px] w-full p-20"
                            >
                                <ScrollWaveform
                                    barCount={32}
                                    waveLength="medium"
                                    smallBarHeight={40}
                                    bigBarHeight={70}
                                    barColor="#6B7280"
                                    bigBarColor="#374151"
                                    indicatorColor="#F97316"
                                    width={500}
                                    height={180}
                                />
                            </GridBackground>
                        </div>
                    </div>
                )
            }`,
            isLiveDemo: false,
        },
        {
            preview: NeonGlowWaveformVariant(),
            title: 'Neon Glow Wave Variant',
            codeSrc: 'NeonGlowWaveformVariant.tsx',
            code: `export const NeonGlowWaveformVariant = () => {
                return (
                    <div className="mb-10">
                        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                            <GridBackground
                                full
                                overlay
                                centered
                                boxSize={36}
                                className="min-h-[150px] w-full p-20"
                            >
                                <ScrollWaveform
                                    barCount={40}
                                    waveLength="short"
                                    smallBarHeight={30}
                                    bigBarHeight={60}
                                    barColor="#00FFE1"
                                    bigBarColor="#FF0080"
                                    indicatorColor="#FFFF00"
                                    backgroundColor="#000000"
                                    heightScale={0.6}
                                    width={480}
                                    height={160}
                                />
                            </GridBackground>
                        </div>
                    </div>
                )
            }`,
            isLiveDemo: false,
        },
        
        {
            preview: ThickBarsWaveformVariant(),
            title: 'Thick Bars Wave form Variant',
            codeSrc: 'ThickBarsWaveformVariant.tsx',
            code: `export const ThickBarsWaveformVariant = () => {
                return (
                    <div className="mb-10">
                        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                            <GridBackground
                                full
                                overlay
                                centered
                                boxSize={36}
                                className="min-h-[150px] w-full p-20"
                            >
                                <ScrollWaveform
                                    barCount={20}
                                    waveLength="long"
                                    smallBarHeight={50}
                                    bigBarHeight={80}
                                    barColor="#8B5CF6"
                                    bigBarColor="#A855F7"
                                    indicatorColor="#F59E0B"
                                    barWidth={8}
                                    bigBarWidth={12}
                                    barSpacing={6}
                                    width={520}
                                    height={200}
                                />
                            </GridBackground>
                        </div>
                    </div>
                )
            }`,
            isLiveDemo: false,
        },
        {
            preview: DenseFrequencyVariant(),
            title: 'Dense Frequency Variant',
            codeSrc: 'DenseFrequencyVariant.tsx',
            code: `export const DenseFrequencyVariant = () => {
                return (
                    <div className="mb-10">
                        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                            <GridBackground
                                full
                                overlay
                                centered
                                boxSize={36}
                                className="min-h-[150px] w-full p-20"
                            >
                                <ScrollWaveform
                                    barCount={60}
                                    waveLength="custom"
                                    customWaveCount={4}
                                    smallBarHeight={25}
                                    bigBarHeight={45}
                                    barColor="#10B981"
                                    bigBarColor="#059669"
                                    indicatorColor="#EF4444"
                                    barWidth={2}
                                    bigBarWidth={3}
                                    barSpacing={3}
                                    width={600}
                                    height={140}
                                />
                            </GridBackground>
                        </div>
                    </div>
                )
            }`,
            isLiveDemo: false,
        },
        {
            preview: AudioSpectrumStyleVariant(),
            title: 'Audio Spectrum Style Variant',
            codeSrc: 'AudioSpectrumStyleVariant.tsx',
            code: `export const AudioSpectrumStyleVariant = () => {
                return (
                    <div className="mb-10">
                        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                            <GridBackground
                                full
                                overlay
                                centered
                                boxSize={36}
                                className="min-h-[150px] w-full p-20"
                            >
                                <ScrollWaveform
                                    barCount={35}
                                    waveLength="medium"
                                    smallBarHeight={15}
                                    bigBarHeight={90}
                                    barColor="#3B82F6"
                                    bigBarColor="#1D4ED8"
                                    indicatorColor="#FBBF24"
                                    barWidth={4}
                                    bigBarWidth={6}
                                    barSpacing={2}
                                    heightScale={0.8}
                                    widthScale={0.3}
                                    width={450}
                                    height={220}
                                />
                            </GridBackground>
                        </div>
                    </div>
                )
            }`,
            isLiveDemo: false,
        },
    ],
}
