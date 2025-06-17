import { motion } from 'framer-motion'

const FramerTextAnimation = () => {
    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold text-white flex flex-1 flex-col justify-center items-center h-screen flex-wrap "
            >
                <motion.div
                    className="flex flex-row gap-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    {['Just', 'Publish', 'it', 'with', 'framer'].map(
                        (word, i) => (
                            <motion.p
                                key={i}
                                style={{ filter: 'blur(5px)' }}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 8,
                                        filter: 'blur(5px)',
                                    },

                                    visible: {
                                        opacity: [0, 0.2, 0.5, 0.8, 1],
                                        y: 0,
                                        filter: ['blur(5px)', 'blur(0px)'],
                                    },
                                }}
                                transition={{
                                    opacity: {
                                        duration: 1,
                                        ease: [0.4, 0, 0.2, 1],
                                    },
                                    y: {
                                        duration: 0.35,
                                        // ease: [0.4, 0, 0.2, 1],
                                        ease: 'circInOut',
                                    },
                                    filter: {
                                        duration: 0.9,
                                        ease: [0.8, 0, 0.2, 1],
                                    },
                                }}
                            >
                                {word + ' '}
                            </motion.p>
                        )
                    )}
                </motion.div>
                <motion.div
                    className="flex flex-row gap-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.05,
                            },
                        },
                    }}
                >
                    {['with', 'framer'].map((word, i) => (
                        <motion.p
                            key={i}
                            style={{ filter: 'blur(2px)' }}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 8,
                                    filter: 'blur(5px)',
                                },

                                visible: {
                                    opacity: [0, 0.2, 0.5, 0.8, 1],
                                    y: 0,
                                    filter: ['blur(5px)', 'blur(0px)'],
                                },
                            }}
                            transition={{
                                opacity: {
                                    duration: 1,
                                    ease: [0.4, 0, 0.2, 1],
                                },
                                y: {
                                    duration: 0.35,
                                    // ease: [0.4, 0, 0.2, 1],
                                    ease: 'circInOut',
                                },
                                filter: {
                                    duration: 0.9,
                                    ease: [0.8, 0, 0.2, 1],
                                },
                            }}
                        >
                            {word + ' '}
                        </motion.p>
                    ))}
                </motion.div>
            </motion.div>
        </>
    )
}

export default FramerTextAnimation
