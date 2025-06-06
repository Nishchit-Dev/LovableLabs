/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { LoopBadge } from '../docs/constants/content/code/LoopBadge'
import { DottedBackground } from '../docs/constants/content/code/DottedBackground'
import { GridBackground } from '../docs/constants/content/code/GridBackground'
import React, { useEffect, useState } from 'react'
import { DragableItem } from '../docs/constants/content/code/DragableContainer'
import Image from 'next/image'
import { motion } from 'framer-motion'

import {
    cursorPresets,
    SpringCursor,
} from '../docs/constants/content/code/CursorFollow'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BuildPreivewDraggableContainer } from '../docs/constants/content/Builds/BuildPreviewDragableContainer'
import { RadiatingDot } from '../docs/constants/content/code/RadiatingDot'

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

const ContentSlider = () => {
    const slides = [
        
        {
            title: 'LoopBadge',
            description:
                'This badge demonstrates a looping animation. Useful for drawing attention to UI elements.',
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
            Component: (
                <div className="w-full h-full flex justify-center items-center ">
                    <OnlineStatusDevMode />
                </div>
            ),
        },
        {
            title: 'Drag & Drop',
            description: 'Drag the item below to see drag-and-drop in action.',
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
    ]

    const [current, setCurrent] = useState(0)

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

    return (
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
                    <div className="flex justify-center items-center flex-col flex-1 h-full">
                        {slides[current].Component}
                        <motion.h2
                            key={slides[current].title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 18,
                            }}
                            className="text-2xl font-semibold mb-2 mt-10"
                        >
                            {slides[current].title}
                        </motion.h2>
                        {/* <motion.p
                            key={slides[current].description}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: 0.05,
                                type: 'spring',
                                stiffness: 200,
                                damping: 18,
                            }}
                            className="text-gray-700 mb-4"
                        >
                            {slides[current].description}
                        </motion.p> */}
                        <span className="text-sm text-gray-500">
                            {current + 1} / {slides.length}
                        </span>
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
    )
}

const DevTools = () => {
    return (
        <DottedBackground fullscreen >
            <div className="w-full h-screen flex flex-1 justify-center items-center  ">
                <ContentSlider />
            </div>
        </DottedBackground>
    )
}

export default DevTools
