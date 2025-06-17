'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MotionTextAnimation } from './docs/constants/content/code/MotionTextReveal'

export default function Home() {
    return (
        <div className="h-full relative">
            <div
                style={{ opacity: 0.04 }}
                className="absolute z-10 w-screen h-screen  bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] bg-repeat bg-[length:128px]  rounded-none"
            ></div>
            <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative px-3 sm:px-4">
                {/* Soft gradient overlay for mobile */}

                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-[5] pointer-events-none md:hidden"></div>

                {/* <div
                    className="w-full h-full absolute"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 30% at bottom, #F9F9FB 100%,transparent 100%)',
                    }}
                ></div>{' '} */}

                <div className="w-full absolute h-[70%] sm:h-[75%] md:h-[60%] lg:h-[80%] xl:h-[80%] bottom-0 z-[1]">
                    <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-full h-full absolute  "
                        style={{
                            background:
                                'radial-gradient(ellipse 100% 100% at bottom, #000000 100%)',
                        }}
                    ></motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 50% 70% at bottom,#32247A 95%, transparent 140%,transparent 60%,transparent 80%)',
                        }}
                    ></motion.div>{' '}
                    <motion.div
                        animate={{ scale: [1, 1.18, 1], opacity: [1, 0.7, 1] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 40% 80% at bottom, #2B1C83 70%, transparent 125%)',
                        }}
                    ></motion.div>{' '}
                    <motion.div
                        animate={{ scale: [1, 1.08, 1], opacity: [1, 0.8, 1] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 30% 60% at bottom, #8C80DB 80%, transparent 135%)',
                        }}
                    ></motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.07, 1], opacity: [1, 0.75, 1] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 20% 40% at bottom, #F9F9FB 50%,transparent 120%)',
                        }}
                    ></motion.div>{' '}
                </div>

                <div className="z-[1000] flex flex-row justify-center items-center -space-x-2 sm:-space-x-3 pt-20 md:pt-0">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { x: -30, y: -30, opacity: 0 },
                            visible: {
                                x: 0,
                                y: 0,
                                opacity: 1,
                                transition: {
                                    delay: 1,

                                    type: 'spring',
                                    duration: 3,
                                },
                            },
                        }}
                        className="bg-violet-100 rounded-full border-1  border-violet-300"
                    >
                        <Image
                            src={'/assets/memoji/memoji_black.png'}
                            width={45}
                            height={45}
                            className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px]"
                            alt=""
                        />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { x: 20, y: 30, opacity: 0 },
                            visible: {
                                y: 0,
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 1,
                                    type: 'spring',
                                    duration: 3,
                                },
                            },
                        }}
                        className="bg-violet-100  rounded-full border-1 border-violet-300"
                    >
                        <Image
                            src={'/assets/memoji/memoji_yellow.png'}
                            width={45}
                            height={45}
                            className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px]"
                            alt=""
                        />
                    </motion.div>
                </div>
                <div className="pt-5 px-4 sm:px-6 flex flex-col gap-2 opacity-75 justify-center items-center z-[10]">
                    <MotionTextAnimation
                        lines={[
                            'Build  5x  Faster. Design Better. Ship Sooner.',
                        ]}
                        enableFloat={false}
                        enableScale={false}
                        textClassName="text-center z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white "
                    />

                    <MotionTextAnimation
                        lines={[
                            'A modern, accessible UI component library for React projects.',
                        ]}
                        enableScale={false}
                        floatIntensity={0}
                        textClassName="z-10 text-white font-regular text-sm sm:text-md md:text-lg text-center"
                    />

                    <div className="flex flex-row gap-3 sm:gap-4 pt-4 sm:pt-5">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="btn-animated"
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: 2,

                                        type: 'spring',
                                        duration: 3,
                                    },
                                },
                            }}
                        >
                            <div>
                                <Link
                                    href="/docs/get-started?framework=react"
                                    className="z-10 text-white font-regular text-base sm:text-lg"
                                >
                                    Get Started 🚀
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: 2,

                                        type: 'spring',
                                        duration: 5,
                                    },
                                },
                            }}
                            className="bg-black/70 flex items-center justify-center group bg-opacity-75 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer border-1 border-violet-200/70"
                        >
                            <Link
                                href="/playground"
                                className="z-10 flex items-center justify-center group-hover:text-white text-white/80 transition duration-300 ease-in-out font-regular text-base sm:text-lg"
                            >
                                Playground 🛝
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
