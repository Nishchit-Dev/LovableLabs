'use client'

import React, { useEffect, useState, useRef, Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
    getNavItems,
    getTableOfContents,
    getPageNavigation,
    frameworks,
    TableOfContentsItem,
} from '../constants'
import { motion } from 'framer-motion'

import './docLayout.css'
import { Lock } from 'lucide-react'

// Component that uses searchParams
function DocLayoutInner({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedFramework, setSelectedFramework] = useState('react')
    const [tableOfContents, setTableOfContents] = useState<
        TableOfContentsItem[]
    >([])
    const [navigation, setNavigation] = useState<{
        previous: { label: string; path: string } | null
        next: { label: string; path: string } | null
    }>({ previous: null, next: null })

    // References to scrollable elements
    const leftSidebarRef = useRef<HTMLDivElement>(null)
    const mainContentRef = useRef<HTMLDivElement>(null)
    const rightSidebarRef = useRef<HTMLDivElement>(null)

    // Check if we're on the main docs page
    const isMainDocsPage = pathname === '/docs'

    // Get current navigation based on selected framework
    const navItems = getNavItems(selectedFramework)

    // Update framework from URL or set default
    useEffect(() => {
        const framework = searchParams.get('framework')
        if (framework && frameworks.some((f) => f.id === framework)) {
            setSelectedFramework(framework)
        } else if (!isMainDocsPage && !framework) {
            // If no framework specified in URL, add it
            const newParams = new URLSearchParams(searchParams)
            newParams.set('framework', selectedFramework)
            router.replace(`${pathname}?${newParams.toString()}`)
        }
    }, [pathname, searchParams, router, isMainDocsPage, selectedFramework])

    useEffect(() => {
        if (isMainDocsPage) {
            // If on main docs page, reset navigation and TOC
            setTableOfContents([])
            setNavigation({ previous: null, next: null })
            return
        }

        // Extract slug from pathname (e.g., "/docs/animation-overview" -> "animation-overview")
        const slug = pathname.split('/').pop() || ''

        // Get table of contents for current page
        setTableOfContents(getTableOfContents(slug))

        // Get navigation links with current framework
        setNavigation(getPageNavigation(pathname, selectedFramework))
    }, [pathname, isMainDocsPage, selectedFramework])

    // Handle framework tab change
    const handleFrameworkChange = (framework: string) => {
        if (framework === selectedFramework) return

        setSelectedFramework(framework)

        // Update URL with new framework
        if (!isMainDocsPage) {
            const newParams = new URLSearchParams(searchParams)
            newParams.set('framework', framework)
            router.replace(`${pathname}?${newParams.toString()}`)
        }
    }

    // Set up scroll event handlers
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Don't prevent default behavior for whole page scrolling
            // We'll only prevent default in specific cases

            // Get the element that was scrolled on
            const targetElement = e.target as Node
            const deltaY = e.deltaY

            // Determine if cursor is over left sidebar
            const isOverLeftSidebar =
                leftSidebarRef.current &&
                (leftSidebarRef.current.contains(targetElement) ||
                    leftSidebarRef.current === targetElement)

            // Determine if cursor is over main content
            const isOverMainContent =
                mainContentRef.current &&
                (mainContentRef.current.contains(targetElement) ||
                    mainContentRef.current === targetElement)

            // Determine if cursor is over right sidebar
            const isOverRightSidebar =
                rightSidebarRef.current &&
                (rightSidebarRef.current.contains(targetElement) ||
                    rightSidebarRef.current === targetElement)

            // If scrolling over left sidebar
            if (isOverLeftSidebar && leftSidebarRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    leftSidebarRef.current

                // If scrolling down and not at the bottom yet, let sidebar scroll
                if (deltaY > 0 && scrollTop < scrollHeight - clientHeight) {
                    e.preventDefault()
                    leftSidebarRef.current.scrollTop += deltaY
                    return
                }
                // If scrolling down and at the bottom, continue to main content
                else if (
                    deltaY > 0 &&
                    scrollTop >= scrollHeight - clientHeight &&
                    mainContentRef.current
                ) {
                    e.preventDefault()
                    mainContentRef.current.scrollTop += deltaY
                    return
                }
                // If scrolling up and not at the top, let sidebar scroll
                else if (deltaY < 0 && scrollTop > 0) {
                    e.preventDefault()
                    leftSidebarRef.current.scrollTop += deltaY
                    return
                }
                // Let default behavior for other cases (the page will scroll)
            }

            // If scrolling over main content
            else if (isOverMainContent && mainContentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    mainContentRef.current

                // If scrolling down and not at the bottom, let main content scroll
                if (deltaY > 0 && scrollTop < scrollHeight - clientHeight) {
                    e.preventDefault()
                    mainContentRef.current.scrollTop += deltaY
                    return
                }
                // If scrolling up and not at the top, let main content scroll
                else if (deltaY < 0 && scrollTop > 0) {
                    e.preventDefault()
                    mainContentRef.current.scrollTop += deltaY
                    return
                }
                // If scrolling up and at the top, go to sidebar (if it has scrollable content)
                else if (
                    deltaY < 0 &&
                    scrollTop <= 0 &&
                    leftSidebarRef.current
                ) {
                    const { scrollTop: leftScrollTop } = leftSidebarRef.current

                    // Only scroll sidebar if it has room to scroll up
                    if (leftScrollTop > 0) {
                        e.preventDefault()
                        leftSidebarRef.current.scrollTop += deltaY
                        return
                    }
                }
                // Let default behavior for other cases (the page will scroll)
            }

            // If scrolling over right sidebar
            else if (isOverRightSidebar && rightSidebarRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    rightSidebarRef.current

                // If scrolling and not at boundaries, let sidebar scroll
                if (
                    (deltaY > 0 && scrollTop < scrollHeight - clientHeight) ||
                    (deltaY < 0 && scrollTop > 0)
                ) {
                    e.preventDefault()
                    rightSidebarRef.current.scrollTop += deltaY
                    return
                }
                // Let default behavior for other cases (the page will scroll)
            }

            // For all other cases, allow default browser scrolling
        }

        // Add event listener to window
        window.addEventListener('wheel', handleWheel, { passive: false })

        // Cleanup
        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [])

    if (isMainDocsPage) {
        // For the main docs page, we don't show any navigation
        return (
            <div className="min-h-screen bg-[var(--bg-dark)]">{children}</div>
        )
    }

    return (
        <div className="flex min-h-screen bg-[var(--bg-dark)] w-full pb-12 lg:pb-20 lg:pt-36 pt-24 lg:px-48 px-12 overflow-y-auto overflow-x-hidden">
            {/* Left Sidebar */}
            <motion.div
              layout="size"
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                type: 'tween',
                ease: [0.4, 0, 0.2, 1], // cubic-bezier for smoother ease
                delay: 0.2,
                duration: 0.8,
            }}
                className="w-[auto] flex-shrink-0 h-screen overflow-hidden"
            >
                <div
                    ref={leftSidebarRef}
                    className="h-full modern-scrollbar fade-edges"
                >
                    <div className="px-4 py-6">
                        <div className="flex mb-6 border-b border-[rgba(255,255,255,0.1)]">
                            {frameworks.map((framework) => (
                                <button
                                    key={framework.id}
                                    className={`px-4 py-2 ${
                                        selectedFramework === framework.id
                                            ? 'text-[var(--font-blue)] border-b-2 border-[var(--bg-blue)]'
                                            : 'text-[var(--font-gray)] hover:text-[var(--font-white)]'
                                    }`}
                                    onClick={() =>
                                        handleFrameworkChange(framework.id)
                                    }
                                >
                                    {framework.id === 'js'
                                        ? 'JS'
                                        : framework.id === 'react'
                                        ? 'React'
                                        : 'Angular'}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            {navItems.gettingStarted.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        href={item.path}
                                        className={`flex items-center transition-colors duration-200 ${
                                            pathname === item.path.split('?')[0]
                                                ? 'text-[var(--font-white)]'
                                                : 'text-[var(--font-gray)] hover:text-[var(--font-white)]'
                                        }`}
                                    >
                                        <span className="mr-2">
                                            {item.icon}
                                        </span>{' '}
                                        {item.label}
                                    </Link>
                                </div>
                            ))}

                            {navItems.categories.map((category, catIndex) => (
                                <div className="space-y-2" key={catIndex}>
                                    <h3 className="text-[var(--font-white)] font-medium mb-2">
                                        {category.title}
                                    </h3>
                                    <ul className="space-y-2 pl-2 border-l border-white/35 border-dashed">
                                        {category.items.map(
                                            (item, itemIndex) => (
                                                <li
                                                    key={itemIndex}
                                                    className="flex items-center flex-row group relative overflow-hidden"
                                                >
                                                    <motion.span
                                                        className={`h-2 w-0 group-hover:w-1.5 rounded-l-full mr-1 ${
                                                            pathname ===
                                                            item.path.split(
                                                                '?'
                                                            )[0]
                                                                ? 'bg-white w-1.5'
                                                                : 'bg-transparent group-hover:bg-white/50'
                                                        } transition-all duration-200 ease-in-out absolute left-0`}
                                                    />
                                                    <Link
                                                        href={item.path}
                                                        className={`${
                                                            pathname ===
                                                            item.path.split(
                                                                '?'
                                                            )[0]
                                                                ? 'text-[var(--font-white)] pl-3'
                                                                : 'text-[var(--font-gray)] hover:text-[var(--font-white)] group-hover:pl-3 pl-0'
                                                        } text-sm transition-all duration-200 ${
                                                            item.badge
                                                                ? 'flex items-center'
                                                                : ''
                                                        }`}
                                                        style={{
                                                            opacity:
                                                                new Date(
                                                                    item.releaseDate ||
                                                                        ''
                                                                ).getTime() >
                                                                Date.now()
                                                                    ? 0.7
                                                                    : 1,
                                                        }}
                                                    >
                                                        <div className="flex flex-row gap-2 items-center">
                                                            {new Date(
                                                                item.releaseDate ||
                                                                    ''
                                                            ).getTime() >
                                                            Date.now() ? (
                                                                <span>
                                                                    <Lock
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            {item.label}
                                                            {item.badge && (
                                                                <span
                                                                    className="ml-2 text-xs"
                                                                    style={{
                                                                        backgroundColor:
                                                                            item
                                                                                .badge
                                                                                .bgColor,
                                                                        color: item
                                                                            .badge
                                                                            .color,
                                                                        padding:
                                                                            '0.125rem 0.5rem',
                                                                        borderRadius:
                                                                            '0.25rem',
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .badge
                                                                            .text
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 h-screen  ">
                <div ref={mainContentRef} className="h-full fade-edges">
                    <div className="max-w-4xl mx-auto px-8 py-12">
                        {children}
                        {/* Page navigation */}
                        {(navigation.previous || navigation.next) && (
                            <div className="flex justify-between mt-16 pt-8">
                                {navigation.previous && (
                                    <Link
                                        href={navigation.previous.path}
                                        className="flex items-center text-[var(--font-blue)]"
                                    >
                                        <span className="mr-2">←</span>{' '}
                                        {navigation.previous.label}
                                    </Link>
                                )}

                                {navigation.next && (
                                    <Link
                                        href={navigation.next.path}
                                        className="flex items-center text-white bg-[var(--bg-blue)] px-4 py-2 rounded-md"
                                    >
                                        {navigation.next.label}{' '}
                                        <span className="ml-2">→</span>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Sidebar  */}
            {tableOfContents.length > 0 && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 200,
                        backdropFilter: 'blur(100px)',
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        backdropFilter: 'blur(0px)',
                    }}
                    transition={{
                        type: 'tween', // "tween" is smoother than "spring"
                        ease: 'easeInOut',
                        delay: 0.5,
                        duration: 1.5,
                    }}
                    style={{
                        transition:
                            'backdrop-filter 1.2s cubic-bezier(0.4,0,0.2,1), -webkit-backdrop-filter 1.2s cubic-bezier(0.4,0,0.2,1)',
                    }}
                    className="w-[auto] flex-shrink-0 h-screen overflow-hidden hidden md:block"
                >
                    <div
                        ref={rightSidebarRef}
                        className="h-full modern-scrollbar fade-edges"
                    >
                        <div className="px-4 py-6">
                            <h3 className="text-[var(--font-white)] font-medium mb-4 border-b border-[rgba(255,255,255,0.2)] w-fit pb-2">
                                On this page
                            </h3>

                            <ul className="space-y-2 pl-2 border-l border-white/35 border-dashed">
                                {tableOfContents.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li>
                                            <a
                                                href={item.anchor}
                                                className={`text-[var(--font-gray)] hover:text-[var(--font-white)] transition-colors duration-200 text-sm ${
                                                    item.isHeading
                                                        ? 'font-medium'
                                                        : ''
                                                }`}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                        {item.subItems?.map(
                                            (subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <a
                                                        href={subItem.anchor}
                                                        className="text-[var(--font-gray)] hover:text-[var(--font-white)] text-sm pl-2"
                                                    >
                                                        {subItem.label}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

// Main component with Suspense boundary
export default function DocLayoutClient({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[var(--bg-dark)] flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-t-4 border-[rgb(106,66,194)] border-solid rounded-full animate-spin"></div>
                            <div className="absolute inset-0 border-t-4 border-[rgb(70,50,119)] border-solid rounded-full opacity-40 animate-ping"></div>
                        </div>
                        <div className="mt-4 text-[var(--font-gray)]">Loading documentation...</div>
                    </div>
                </div>
            }
        >
            <DocLayoutInner>{children}</DocLayoutInner>
        </Suspense>
    )
}
