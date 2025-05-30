'use client'

import { motion } from 'framer-motion'

export default function Home() {
    return (
        <div className="h-full">
            <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative ">
                {/* <div
                    className="w-full h-full absolute"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 30% at bottom, #F9F9FB 100%,transparent 100%)',
                    }}
                ></div>{' '} */}
                <div className="w-full absolute xl:h-[80%] lg:h-[80%] md:h-[60%] bottom-0">
                    <motion.div
                        animate={{ scale: [1, 1.08, 0.8,1] }}
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
                        animate={{ scale: [1, 1.1,1] }}
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
                        animate={{ scale: [1, 1.14, 1],opacity:[1,0.7,1] }}
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
                        animate={{ scale: [1, 1.03,1],opacity:[1,0.8,1] }}
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
                        animate={{ scale: [1, 1.02,1],opacity:[1,0.75,1]  }}
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

                <p className="text-center z-10 text-5xl font-extrabold text-white">
                    Build Beautiful UI - Faster
                </p>
            </div>
        </div>
    )
}
