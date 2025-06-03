'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
    return (
        <div className="h-full">
            <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative ">
                {/* <div
                    className="w-full h-full absolute"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 30% at bottom, #F9F9FB 100%,transparent 100%)',
                    }}
                ></div>{' '} */}

                <div className="w-full  absolute xl:h-[80%] lg:h-[80%] md:h-[60%] bottom-0">
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
                <div className="z-[1000] flex flex-row justify-center items-center -space-x-3">
                    <div className="bg-violet-100 rounded-full border-1  border-violet-300">
                        <Image
                            src={'/assets/memoji/memoji_black.png'}
                            width={60}
                            height={60}
                            alt=""
                        />
                    </div>
                    <div className="bg-violet-100  rounded-full border-1 border-violet-300">
                        <Image
                            src={'/assets/memoji/memoji_yellow.png'}
                            width={60}
                            height={60}
                            alt=""
                        />
                    </div>
                </div>
                <div className=" pt-5        flex flex-col gap-2 opacity-75 justify-center items-center">
                    <p className="text-center z-10 text-5xl font-extrabold text-white ">
                        Build <motion.span>5x Faster</motion.span>. Design{' '}
                        <motion.span>Better</motion.span>. Ship{' '}
                        <motion.span>Sooner</motion.span>.
                    </p>
                    <p className="z-10 text-white font-regular text-lg">
                        A modern, accessible UI component library for React
                        projects.
                    </p>
                    <div className="flex flex-row gap-4 pt-2">
                        <div className="btn-animated">
                            <div>
                                <p className="z-10 text-white font-regular text-lg">
                                    Get Started 🚀
                                </p>
                            </div>
                        </div>
                        <div className="bg-black/70 group bg-opacity-75 px-4 py-2 rounded-full cursor-pointer border-1 border-violet-200/70">
                            <p className="z-10 group-hover:text-white text-white/70 transition duration-300 ease-in-out font-regular text-lg">
                                docs 📄
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
