'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
            },
        },
    }

    const footerLinks = [
        {
            title: 'SITE',
            links: [
                { label: 'About', url: '/about' },
                { label: 'Blog', url: '/blog' },
                { label: 'Docs', url: '/docs' },
            ],
        },
        {
            title: 'SOCIAL',
            links: [
                { label: 'Discord', url: 'https://discord.gg/lovablelabs-ui' },
                { label: 'GitHub', url: 'https://github.com/lovablelabs-ui' },
                {
                    label: 'X/Twitter',
                    url: 'https://twitter.com/lovablelabs-ui',
                },
            ],
        },
    ]

    return (
        <div className="bg-[var(--bg-dark)]">
            <motion.footer
                className=" border-t border-[rgba(255,255,255,0.1)] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-screen-xl mx-auto">
                    <div className="pt-4 mb-6 sm:mb-8 md:mb-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h3 className="text-[var(--font-white)] font-medium text-base sm:text-lg">
                                    Stay in the loop
                                </h3>
                                <p className="text-[var(--font-gray)] text-xs sm:text-sm">
                                    Subscribe for the latest news & updates.
                                </p>
                            </div>
                            <motion.div
                                className="flex w-full md:w-auto mt-4 md:mt-0"
                                whileHover={{ scale: 1.02 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="my@email.com"
                                    className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-l px-3 sm:px-4 py-2 text-[var(--font-white)] text-sm w-full md:w-auto"
                                />
                                <motion.button
                                    className="bg-[var(--bg-blue)] text-[var(--bg-offwhite)] font-medium px-3 sm:px-4 py-2 rounded-r whitespace-nowrap text-sm"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Subscribe
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                        <motion.div
                            variants={itemVariants}
                            className="mb-8 md:mb-0 mt-6 md:mt-0"
                        >
                            <div className="flex items-center">
                                <div
                                    onClick={() => (window.location.href = '/')}
                                    className="w-6 h-6 rounded flex items-center justify-center cursor-pointer"
                                >
                                    <Image
                                        alt="LovableLabs Logo"
                                        width={20}
                                        height={20}
                                        src={'/assets/memoji/lovablelabs.png'}
                                    />
                                </div>
                            </div>

                            <p className="text-[var(--font-gray)] text-xs mt-4">
                                ©{currentYear} LovableLabs UI. All rights
                                reserved.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap gap-8 sm:gap-10 md:gap-12 lg:space-x-16 lg:gap-0">
                            {footerLinks.map((category, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="min-w-[120px]"
                                >
                                    <h4 className="text-[var(--font-white)] font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                                        {category.title}
                                    </h4>
                                    <ul className="space-y-2">
                                        {category.links.map((link, linkIdx) => (
                                            <li key={linkIdx}>
                                                <a
                                                    href={link.url}
                                                    className="text-[var(--font-gray)] text-xs sm:text-sm hover:text-[var(--font-white)] transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.footer>
            <div className="flex justify-center items-center flex-1 w-full">
                <Image
                    src={'/assets/footer/branding_Logo.svg'}
                    alt=""
                    height={0}
                    width={0}
                    className="h-full w-max"
                />
            </div>
        </div>
    )
}

export default Footer
