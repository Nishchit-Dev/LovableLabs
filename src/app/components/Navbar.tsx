'use client'

import ShinyText from '@/UI/ShinyText'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface LinkItem {
    label: string
    path: string
}

interface TabPosition {
    left: number
    width: number
    opacity: number
}

interface NavTabProps {
    link: LinkItem
    setPosition: React.Dispatch<React.SetStateAction<TabPosition>>
    isActive: boolean
    hasWhiteBackground: boolean
    onHover: () => void
}

interface TabCursorProps {
    position: TabPosition
}

export default function Navbar() {
    const links = [
        { label: 'Docs', path: '/docs/get-started?framework=react' },

        { label: 'playground', path: '/playground' },
        // { label: "Examples", path: "/examples" },
    ]

    const [position, setPosition] = useState<TabPosition>({
        left: 0,
        width: 0,
        opacity: 0,
    })

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const pathname = usePathname()
    
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Only try to highlight an active tab if we're not on the root route
        if (pathname !== '/') {
            const activeTab =
                navRef.current?.querySelector(`[data-active="true"]`)
            if (activeTab) {
                const { offsetLeft, offsetWidth } = activeTab as HTMLElement
                setPosition({
                    left: offsetLeft,
                    width: offsetWidth,
                    opacity: 1,
                })
            } else {
                // Reset position if no active tab
                setPosition({
                    left: 0,
                    width: 0,
                    opacity: 0,
                })
            }
        } else {
            // Reset position on home page
            setPosition({
                left: 0,
                width: 0,
                opacity: 0,
            })
        }
    }, [pathname])

    return (
        <nav className="  text-white fixed top-5 z-[99] w-[65%] left-1/2 -translate-x-1/2 rounded-full">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center px-2 md:px-0">
                <div className="flex items-center space-x-4 md:space-x-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <motion.div
                            className="md:w-6 md:h-6 w-[18px] h-[18px] flex items-center justify-center "
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <Image
                                alt="LovableLabs Logo"
                                width={20}
                                height={20}
                                src={'/assets/memoji/lovablelabs.png'}
                            />
                        </motion.div>
                    </Link>

                    {/* Nav links */}
                    <div className="px-3 py-2 w-full bg-black/30 backdrop-blur-sm rounded-full">
                        <div
                            ref={navRef}
                            className="flex gap-2 relative "
                            onMouseLeave={() => {
                                setHoveredIndex(null)

                                if (pathname !== '/') {
                                    const activeTab =
                                        navRef.current?.querySelector(
                                            `[data-active="true"]`
                                        )
                                    if (activeTab) {
                                        const { offsetLeft, offsetWidth } =
                                            activeTab as HTMLElement
                                        setPosition({
                                            left: offsetLeft,
                                            width: offsetWidth,
                                            opacity: 1,
                                        })
                                    }
                                } else {
                                    setPosition({
                                        left: 0,
                                        width: 0,
                                        opacity: 0,
                                    })
                                }
                            }}
                        >
                            {links.map((link, index) => {
                                const isActive = link.path === '/docs/get-started?framework=react' ? 
                                    pathname.includes("/docs") : 
                                    link.path === '/' ? 
                                    false : 
                                    pathname.startsWith(link.path);
                               
                                // Only apply white background if hovering this tab OR if it's active and not hovering any tab
                                const hasWhiteBackground = hoveredIndex === index || (isActive && hoveredIndex === null);
                                // console.log(link.path, pathname, isActive, hoveredIndex, "nabavar")
                                return (
                                    <NavTab
                                        key={index}
                                        link={link}
                                        setPosition={setPosition}
                                        isActive={isActive}
                                        hasWhiteBackground={hasWhiteBackground}
                                        onHover={() => setHoveredIndex(index)}
                                    />
                                )
                            })}

                            <TabCursor position={position} />
                        </div>
                    </div>
                </div>

                {/* Right side */}
                {false && (
                    <div className="flex items-center space-x-4">
                        <ShinyText
                            text="Get Prem +"
                            speed={3}
                            isHoverEnable={true}
                            hoverClass="hover:text-blue-300"
                            className="cursor-pointer"
                        />
                    </div>
                )}
            </div>
        </nav>
    )
}

const NavTab = ({
    link,
    setPosition,
    isActive,
    hasWhiteBackground,
    onHover,
}: NavTabProps) => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={ref}
            className="relative"
            data-active={isActive}
            onMouseEnter={() => {
                if (!ref?.current) return
                onHover()

                const { width } = ref.current.getBoundingClientRect()

                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                })
            }}
        >
            <Link
                href={link.path}
                className="relative z-10 block px-3 py-1.5 transition-colors duration-300"
            >
                <span
                    className={`transition-colors duration-150 ${
                        hasWhiteBackground ? 'text-black' : 'text-white'
                    }`}
                >
                    {link.label}
                </span>
            </Link>
        </div>
    )
}

const TabCursor = ({ position }: TabCursorProps) => {
    return (
        <motion.div
            animate={{
                ...position,
            }}
            className="absolute z-0 h-full rounded-full bg-white bottom-0"
            transition={{ duration: 0.15, ease: 'easeOut' }}
        />
    )
}
