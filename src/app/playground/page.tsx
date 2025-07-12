/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { LoopBadge } from '../docs/constants/content/code/LoopBadge'
import { DottedBackground } from '../docs/constants/content/code/DottedBackground'
import { GridBackground } from '../docs/constants/content/code/GridBackground'
import React, { useState, Suspense, useRef, useEffect } from 'react'
import { DragableItem } from '../docs/constants/content/code/DragableContainer'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import CurtainTransition from '../docs/constants/content/code/CurtainTransition'

import {
    cursorPresets,
    SpringCursor,
} from '../docs/constants/content/code/CursorFollow'
import { ChevronLeft, ChevronRight, Settings, Eye, EyeOff } from 'lucide-react'
import { BuildPreivewDraggableContainer } from '../docs/constants/content/Builds/BuildPreviewDragableContainer'
import { RadiatingDot } from '../docs/constants/content/code/RadiatingDot'
import AnimatedBorder from '../docs/constants/content/code/AnimatedBorder'
import { BuildPreviewAnimatedBorder } from '../docs/constants/content/Builds/BuildPreviewAnimatedBorder'
import { CountdownTimer } from '../docs/constants/content/code/DotMatrixCountdownTimer'
import { ParallaxGridBackground } from '../docs/constants/content/code/ParallaxGridBackground'
import { ParallaxDotBackground } from '../docs/constants/content/code/ParallaxDotBackground'
import { MotionTextAnimation } from '../docs/constants/content/code/MotionTextReveal'
import DraggableLiquidGlass from '../docs/constants/content/code/DraggableLiquidGlass'
import { ScrollWaveform } from '../docs/constants/content/code/ScrollWave'

// Transition Icons
const SlideIcon = () => (
  <div className="w-8 h-8 bg-gradient-to-t from-purple-500 to-purple-300 rounded-lg flex items-center justify-center">
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  </div>
);

const FadeIcon = () => (
  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </div>
);

const SplitIcon = () => (
  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  </div>
);

// Toggle Component
const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
      enabled ? 'bg-purple-500' : 'bg-gray-600'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// Tooltip Component
const Tooltip = ({ children, content, show }: { children: React.ReactNode; content: string; show: boolean }) => (
  <div className="relative">
    {children}
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 10 }}
          className="absolute top-1/2 right-full transform -translate-y-1/2 mr-6 px-4 py-2.5 text-sm text-white bg-gray-900 rounded-lg whitespace-nowrap z-[100] shadow-xl border border-white/10"
        >
          {content}
          <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900"></div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Enhanced Transition Settings Component
const TransitionSettings = ({ 
    isEnabled, 
    setIsEnabled, 
    animationStyle, 
    setAnimationStyle 
}: {
    isEnabled: boolean;
    setIsEnabled: (enabled: boolean) => void;
    animationStyle: 'slide-up' | 'fade' | 'split';
    setAnimationStyle: (style: 'slide-up' | 'fade' | 'split') => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [selectedTransition, setSelectedTransition] = useState('curtain');
    const [showFirstTimeTooltip, setShowFirstTimeTooltip] = useState(true);
    
    const panelRef = useRef<HTMLDivElement>(null);
    const settingsButtonRef = useRef<HTMLButtonElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current && 
                !panelRef.current.contains(event.target as Node) &&
                settingsButtonRef.current &&
                !settingsButtonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Hide first-time tooltip after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFirstTimeTooltip(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const transitionComponents = [
        {
            id: 'curtain',
            name: 'Curtain Transition',
            description: 'Full-screen overlay with smooth reveal effect',
            icon: '🎭',
            styles: [
                { id: 'slide-up', name: 'Slide', icon: <SlideIcon /> },
                { id: 'fade', name: 'Fade', icon: <FadeIcon /> },
                { id: 'split', name: 'Split', icon: <SplitIcon /> }
            ]
        }
    ];

    const selectedComponent = transitionComponents.find(comp => comp.id === selectedTransition);

    return (
        <div className="fixed top-6 right-6 z-50">
            {/* Settings Button */}
            <Tooltip 
                content="You can use transition effects from our library" 
                show={showFirstTimeTooltip && !isOpen}
            >
                <button
                    ref={settingsButtonRef}
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setShowFirstTimeTooltip(false);
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="w-12 h-12 bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-all duration-200 shadow-lg border border-white/10"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </Tooltip>

            {/* Settings Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        className="absolute top-16 right-0 w-[450px] bg-black/90 backdrop-blur-xl text-white rounded-xl shadow-2xl border border-white/10 overflow-hidden z-40"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-700/50">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🎯</span>
                                <h3 className="font-semibold text-lg">Transition Settings</h3>
                            </div>
                        </div>

                        {/* Enable Transitions */}
                        <div className="p-4 border-b border-gray-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-medium mb-1">Enable Transitions</h4>
                                    <p className="text-sm text-gray-400">
                                        Components will transition with curtain effect
                                    </p>
                                </div>
                                <Toggle 
                                    enabled={isEnabled} 
                                    onToggle={() => setIsEnabled(!isEnabled)} 
                                />
                            </div>
                        </div>

                        {/* Transition Components List */}
                        {isEnabled && (
                            <>
                                <div className="p-4 border-b border-gray-700/50">
                                    <h4 className="font-medium mb-3">Transition Components</h4>
                                    <div className="space-y-2">
                                        {transitionComponents.map((component) => (
                                            <motion.div
                                                key={component.id}
                                                onClick={() => setSelectedTransition(component.id)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`p-3 rounded-lg cursor-pointer transition-all ${
                                                    selectedTransition === component.id
                                                        ? 'bg-purple-600 text-white shadow-lg'
                                                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{component.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{component.name}</div>
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            {component.description}
                                                        </div>
                                                    </div>
                                                    {selectedTransition === component.id && (
                                                        <motion.div 
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="w-2 h-2 bg-white rounded-full"
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Animation Styles */}
                                {selectedComponent && selectedComponent.styles && (
                                    <div className="p-4 border-b border-gray-700/50">
                                        <h4 className="font-medium mb-3">Animation Style</h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            {selectedComponent.styles.map((style) => (
                                                <motion.button
                                                    key={style.id}
                                                    onClick={() => setAnimationStyle(style.id as 'slide-up' | 'fade' | 'split')}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all ${
                                                        animationStyle === style.id
                                                            ? 'bg-purple-600 text-white shadow-lg'
                                                            : 'bg-gray-800/50 hover:bg-gray-700/50'
                                                    }`}
                                                >
                                                    {style.icon}
                                                    <span className="text-xs font-medium">{style.name}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Instructions */}
                                <div className="p-4 bg-purple-900/20 border-t border-purple-800/30">
                                    <p className="text-sm text-purple-200 leading-relaxed">
                                        <strong>Instructions:</strong> Navigate between components using the arrow 
                                        buttons to see the {animationStyle} transition effect!
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const SpringFollowCursorDevMode = () => {
    const [config, setConfig] = useState(cursorPresets.default)

    // Use a key to force remount when config changes
    return (
        <SpringCursor
            key={JSON.stringify(config)}
            variants={config}
            velocityScale={true}
            maxScale={2}
            showTrail={true}
            className="bg-none cursor-none"
        >
            <div className="flex justify-center items-center flex-col gap-10">
                {/* <LoopBadge /> */}
                <div className="realative top-1/4 left-1/4 text-center">
                    <p className="text-5xl font-bold text-black/70 w-[650px]">
                        Our eyes follow your every
                        <span className=" text-violet-500"> move</span> 👀
                    </p>
                </div>

                <div>
                    <div className="flex flex-row gap-5">
                        <div
                            className="px-5 py-2 bg-pink-300 text-pink-900 rounded-lg opacity-80 hover:opacity-100  duration-300 ease-in-out hover:scale-105 transition-all shadow-lg"
                            onClick={() => {
                                setConfig(cursorPresets.default)
                            }}
                        >
                            Default
                        </div>
                        <div
                            className="px-5 py-2 bg-sky-300 text-sky-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
                            onClick={() => {
                                if (config != cursorPresets.minimal) {
                                    setConfig(cursorPresets.minimal)
                                }
                            }}
                        >
                            Minimal
                        </div>
                        <div
                            className="px-5 py-2 bg-green-300 text-green-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
                            onClick={() => {
                                if (config != cursorPresets.neon) {
                                    setConfig(cursorPresets.neon)
                                }
                            }}
                        >
                            Neon
                        </div>
                        <div
                            className="px-5 py-2 text-violet-900 bg-violet-300 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
                            onClick={() => {
                                if (config != cursorPresets.elegant) {
                                    setConfig(cursorPresets.elegant)
                                }
                            }}
                        >
                            Elegant
                        </div>
                    </div>
                </div>
            </div>
        </SpringCursor>
    )
}

const OnlineStatusDevMode = () => {
    const [isOnline, setIsOnline] = React.useState(true)

    return (
        <div className=" bg-gradient-to-br  p-8">
            <div className="max-w-4xl mx-auto ">
                {/* Interactive Demo */}
                <div className=" p-8">
                    <h2 className="text-xl font-semibold mb-6">
                        Interactive Demo
                    </h2>
                    <div className="flex flex-col items-center space-y-6">
                        <RadiatingDot
                            text={isOnline ? 'Online' : 'Offline'}
                            isOnline={isOnline}
                            size="md"
                            variant="prominent"
                            onClick={() => setIsOnline(!isOnline)}
                        />
                        <button
                            onClick={() => setIsOnline(!isOnline)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Toggle Status
                        </button>
                    </div>
                </div>

                {/* Style Variants */}
                <div className="p-8 ">
                    <h2 className="text-xl font-semibold mb-6">
                        Style Variants
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <RadiatingDot text="Subtle" variant="subtle" />
                        <RadiatingDot text="Prominent" variant="prominent" />
                        <RadiatingDot text="Minimal" variant="minimal" />
                    </div>
                </div>

                {/* Custom Colors */}
                <div className=" p-8">
                    <h2 className="text-xl font-semibold mb-6">
                        Custom Colors
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <RadiatingDot
                            text="Custom Blue"
                            dotColor="bg-blue-400"
                            backgroundColor="bg-blue-50"
                            textColor="text-blue-900"
                            borderColor="border-blue-200"
                        />
                        <RadiatingDot
                            text="Custom Purple"
                            dotColor="bg-purple-400"
                            backgroundColor="bg-purple-50"
                            textColor="text-purple-900"
                            borderColor="border-purple-200"
                        />
                        <RadiatingDot
                            text="Custom Orange"
                            dotColor="bg-orange-400"
                            backgroundColor="bg-orange-50"
                            textColor="text-orange-900"
                            borderColor="border-orange-200"
                        />
                    </div>
                </div>

                {/* Status States */}
                <div className=" p-8">
                    <h2 className="text-xl font-semibold mb-6">
                        Status States
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <RadiatingDot text="Online" isOnline={true} />
                        <RadiatingDot text="Offline" isOnline={false} />
                        <RadiatingDot
                            text="Away"
                            isOnline={true}
                            dotColor="bg-yellow-400"
                        />
                        <RadiatingDot
                            text="Busy"
                            isOnline={true}
                            dotColor="bg-red-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const AnimatedBorderDevMode = () => {
    return (
        <div className="bg-gradient-to-br p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-8 text-center">
                    AnimatedBorder Components
                </h2>

                <div className="flex flex-row gap-8 justify-between">
                    <div className="w-1/2">
                        <h3 className="text-xl font-semibold mb-6">
                            Card Example
                        </h3>
                        <div className="flex justify-center">
                            <AnimatedBorder
                                width={350}
                                height={350}
                                borderWidth={3}
                                contentBg="rgba(0, 0, 0, 1)"
                                containerClassName="mt-2"
                                contentClassName="flex flex-col justify-between"
                                borderRadius={32}
                                contentPadding={6}
                                colors={[
                                    '#ec4899',
                                    '#d946ef',
                                    '#a855f7',
                                    '#8b5cf6',
                                    '#6366f1',
                                ]}
                                enableShadow={true}
                                shadowDirection="all"
                                shadowVariant="subtle"
                                hoverScale={1.03}
                                blurIntensity={10}
                                blurOpacity={0.7}
                            >
                                <div>
                                    <h3 className="text-white text-xl font-bold mb-4">
                                        Featured Content
                                    </h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                        <p className="text-gray-300 text-sm">
                                            High-quality animated & customizable
                                            components
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                                        <p className="text-gray-300 text-sm">
                                            Fully customizable border effects
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <p className="text-gray-300 text-sm">
                                            Smooth animations & transitions with
                                            hover & shadow effects
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center mt-4">
                                    <button
                                        onClick={() =>
                                            (window.location.href =
                                                '/docs/animated-border?framework=react')
                                        }
                                        className=" cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </AnimatedBorder>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <h3 className="text-xl font-semibold mb-6">
                            Interactive Demo
                        </h3>
                        <div className="flex justify-center mb-8">
                            <AnimatedBorder
                                width={240}
                                enableHover
                                height={60}
                                contentBg="rgba(0, 0, 0, 1)"
                                contentClassName="flex items-center justify-center"
                                enableShadow={true}
                                hoverBrighten={1.2}
                                colors={[
                                    '#8c80db',
                                    '#6a42c2',
                                    '#32247a',
                                    '#2b1c83',
                                    '#8b5dff',
                                ]}
                            >
                                <span className="text-white font-medium">
                                    Animated Border
                                </span>
                            </AnimatedBorder>
                        </div>

                        <h3 className="text-xl font-semibold mb-6">
                            Style Variants
                        </h3>
                        <div className="flex flex-col gap-6 items-center">
                            <AnimatedBorder
                                width={240}
                                height={55}
                                contentBg="rgba(0, 0, 0, 1)"
                                contentClassName="flex items-center justify-center"
                                enableShadow={true}
                                enableHover
                                hoverBlurIncrease={10}
                                shadowVariant="subtle"
                                colors={[
                                    '#3b82f6',
                                    '#1d4ed8',
                                    '#1e40af',
                                    '#1e3a8a',
                                    '#3b82f6',
                                ]}
                            >
                                <span className="text-white font-medium">
                                    Subtle Shadow{' '}
                                </span>
                            </AnimatedBorder>

                            <AnimatedBorder
                                width={240}
                                height={55}
                                contentBg="rgba(0, 0, 0, 1)"
                                contentClassName="flex items-center justify-center"
                                enableShadow={true}
                                enableHover
                                shadowVariant="intense"
                                hoverSpeedMultiplier={2.5}
                                colors={[
                                    '#f97316',
                                    '#ea580c',
                                    '#c2410c',
                                    '#9a3412',
                                    '#f97316',
                                ]}
                            >
                                <span className="text-white font-medium">
                                    Intense Shadow
                                </span>
                            </AnimatedBorder>

                            <AnimatedBorder
                                width={240}
                                height={55}
                                contentBg="rgba(0, 0, 0, 1)"
                                contentClassName="flex items-center justify-center"
                                enableShadow={true}
                                shadowVariant="glow"
                                hoverScale={1.05}
                                hoverSpeedMultiplier={2.5}
                                hoverBrighten={1.5}
                                colors={[
                                    '#10b981',
                                    '#059669',
                                    '#047857',
                                    '#065f46',
                                    '#10b981',
                                ]}
                            >
                                <span className="text-white font-medium">
                                    Glow Effect
                                </span>
                            </AnimatedBorder>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CountDownDevMode = () => {
    return (
        <>
            <CountdownTimer
                initialTime={450000}
                pixelSize={6}
                onComplete={() => console.log('Timer completed!')}
                dark
            />
        </>
    )
}

const ContentSlider = () => {
    const slides = [
        {
            title: 'ScrollWave',
            description:
                'This component creates an animated CountDown Effect with customizable colors and controls and more.',
            curtainTitle: 'ScrollWave',
            curtainColor: 'bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900',
            Component: (
                <div className="">
                    <ScrollWaveform 
                        waveLength='none'
                    />
                </div>
            ),
        },
        {
            title: 'LoopBadge',
            description:
                'This badge demonstrates a looping animation. Useful for drawing attention to UI elements.',
            curtainTitle: 'LoopBadge',
            curtainColor: 'bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900',
            Component: (
                <div className="flex flex-col items-center justify-center h-40">
                    <LoopBadge />
                </div>
            ),
        },
        {
            title: 'Cursor Container',
            description:
                'This badge demonstrates a looping animation. Useful for drawing attention to UI elements.',
            curtainTitle: 'Cursor Follow',
            curtainColor: 'bg-gradient-to-br from-pink-900 via-purple-900 to-violet-900',
            Component: (
                <div className="w-full h-full flex justify-center items-center ">
                    <SpringFollowCursorDevMode />
                </div>
            ),
        },
        {
            title: 'Radiating Dot',
            description:
                'This badge demonstrates a Radiating Dot animation. Useful for drawing attention to UI elements.',
            curtainTitle: 'Radiating Dot',
            curtainColor: 'bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900',
            Component: (
                <div className="w-full h-full flex justify-center items-center ">
                    <OnlineStatusDevMode />
                </div>
            ),
        },
        {
            title: 'Animated Border',
            description:
                'This component creates an animated border effect with customizable colors and shadows.',
            curtainTitle: 'Animated Border',
            curtainColor: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
            Component: (
                <div className="w-full h-full flex justify-center items-center">
                    <AnimatedBorderDevMode />
                </div>
            ),
        },
        {
            title: 'Drag & Drop',
            description: 'Drag the item below to see drag-and-drop in action.',
            curtainTitle: 'Drag & Drop',
            curtainColor: 'bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900',
            Component: (
                <div className="flex flex-col items-center justify-center ">
                    <div className="realative top-1/4 left-1/4 text-center">
                        <p className="text-5xl font-bold text-black/70">
                            We are the creator of LovableLabs and you can{' '}
                            <span className=" text-violet-500">Drag us</span>{' '}
                            around
                        </p>
                    </div>
                    <DragableItem
                        initialPosition={{ x: 1000, y: 400 }}
                        className="h-[60px] w-[60px]  rounded-full"
                    >
                        <div className="flex items-center flex-col gap-2">
                            <Image
                                src={'/assets/memoji/memoji_black.png'}
                                width={60}
                                height={60}
                                alt=""
                                className="bg-violet-100  rounded-full border-1 border-violet-300 "
                            />
                            <p className="text-black/70">0xHet</p>
                        </div>
                    </DragableItem>

                    <DragableItem
                        friction={0.42}
                        bounciness={0.7}
                        snapToGrid={20}
                        initialPosition={{ x: 1200, y: 520 }}
                        className=" h-[60px] w-[60px] rounded-full"
                    >
                        <div className="flex items-center flex-col gap-2 ">
                            <Image
                                src={'/assets/memoji/memoji_yellow.png'}
                                width={60}
                                height={60}
                                alt=""
                                className="bg-violet-100  rounded-full border-1 border-violet-300"
                            />
                            <p className="text-black/70">0xNishchit</p>
                        </div>
                    </DragableItem>
                </div>
            ),
        },
        {
            title: 'Dot-Matrix CountDown',
            description:
                'This component creates an animated CountDown Effect with customizable colors and controls and more.',
            curtainTitle: 'CountDown Timer',
            curtainColor: 'bg-gradient-to-br from-slate-900 via-gray-900 to-black',
            Component: (
                <div className="w-full h-full flex justify-center items-center">
                    <CountDownDevMode />
                </div>
            ),
        },
        {
            title: 'Motion Text Animation',
            description:
                'This component creates an animated CountDown Effect with customizable colors and controls and more.',
            curtainTitle: 'Text Animation',
            curtainColor: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
            Component: (
                <div className="">
                    <MotionTextAnimation
                        enableScale={false}
                        dark
                        textClassName="text-5xl font-bold"
                    />
                </div>
            ),
        },
    ]

    const [current, setCurrent] = useState(0)
    const [showTransition, setShowTransition] = useState(false)
    const [transitionKey, setTransitionKey] = useState(0)
    
    // Transition settings
    const [transitionsEnabled, setTransitionsEnabled] = useState(false)
    const [animationStyle, setAnimationStyle] = useState<'slide-up' | 'fade' | 'split'>('slide-up')

    const nextSlide = () => {
        if (transitionsEnabled) {
            setShowTransition(true)
            setTransitionKey(prev => prev + 1)
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % slides.length)
                setTimeout(() => setShowTransition(false), 100)
            }, 1000)
        } else {
            setCurrent((prev) => (prev + 1) % slides.length)
        }
    }

    const prevSlide = () => {
        if (transitionsEnabled) {
            setShowTransition(true)
            setTransitionKey(prev => prev + 1)
            setTimeout(() => {
                setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
                setTimeout(() => setShowTransition(false), 100)
            }, 1000)
        } else {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        }
    }

    const currentSlide = slides[current]

    return (
        <>
            {/* Enhanced Transition Settings Component */}
            <TransitionSettings 
                isEnabled={transitionsEnabled}
                setIsEnabled={setTransitionsEnabled}
                animationStyle={animationStyle}
                setAnimationStyle={setAnimationStyle}
            />

        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className=" top-10 left-1/2  z-20  rounded-xl  px-8 py-6 flex flex-col items-center w-full justify-center h-full"
        >
            <div className="flex gap-4 w-full min-w-[900px] justify-between items-center mb-4">
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition -z-0 h-20"
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                >
                    <ChevronLeft />
                </button>
                <div className="flex-1 flex flex-col items-center justify-center ">
                        <div className="flex justify-center items-center flex-col flex-1 h-full relative">
                            {showTransition && transitionsEnabled ? (
                                <CurtainTransition
                                    key={transitionKey}
                                    title={currentSlide.curtainTitle}
                                    titleColor="text-white"
                                    titleSize="text-4xl md:text-6xl"
                                    curtainColor={currentSlide.curtainColor}
                                    animationStyle={animationStyle}
                                    duration={800}
                                    curtainAnimationDuration={800}
                                    contentAnimationDuration={400}
                                >
                    <div className="flex justify-center items-center flex-col flex-1 h-full">
                                        {currentSlide.Component}
                        <motion.h2
                                            key={currentSlide.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 18,
                            }}
                            className="text-2xl font-semibold mb-2 mt-10"
                        >
                                            {currentSlide.title}
                        </motion.h2>
                                        <span className="text-sm text-gray-500">
                                            {current + 1} / {slides.length}
                                        </span>
                                    </div>
                                </CurtainTransition>
                            ) : (
                                <>
                                    {currentSlide.Component}
                                    <motion.h2
                                        key={currentSlide.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 18,
                            }}
                                        className="text-2xl font-semibold mb-2 mt-10"
                        >
                                        {currentSlide.title}
                                    </motion.h2>
                        <span className="text-sm text-gray-500">
                            {current + 1} / {slides.length}
                        </span>
                                </>
                            )}
                    </div>
                </div>
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition h-20"
                    onClick={nextSlide}
                    aria-label="Next Slide"
                >
                    <ChevronRight />
                </button>
            </div>
        </motion.div>
        </>
    )
}

const DevTools = () => {
    return (
        <ParallaxDotBackground boxSize={42} overlay>
            <div className="w-full h-screen flex flex-1 justify-center items-center  ">
                <ContentSlider />
            </div>
            <DraggableLiquidGlass
                width={400}
                height={250}
                className="border-2 border-white/20"
            />
        </ParallaxDotBackground>
    )
}

export default function PlaygroundPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DevTools />
        </Suspense>
    )
}