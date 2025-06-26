import { releaseDate } from './releaseDate/releaseDate'
import { NavItem, Category, Framework } from './types'

// Define the available frameworks
export const frameworks: Framework[] = [
    { id: 'react', name: 'React', color: '#61dafb', textColor: '#000000' },
]

// Getting Started items - shared across frameworks
export const gettingStartedItems: NavItem[] = [
    { icon: '🚀', label: 'Get started', path: '/docs/get-started' },
]

// Documentation categories with their items - framework specific
export const getDocCategories = (framework: string): Category[] => {
    // Base content structure is the same, but we can have framework-specific content
    const categories: Category[] = [
        // {
        //     title: "Text Animation",
        //     slug: "text-animation",
        //     items: [
        //         { label: "Blur Text", path: `/docs/text-animation-blur?framework=${framework}` },
        //         { label: "Split Text", path: `/docs/text-animation-split?framework=${framework}` },
        //         { label: "Circular Text", path: `/docs/text-animation-circular?framework=${framework}` },
        //     ],
        // },
        // {
        //     title: "Animation",
        //     slug: "animation",
        //     items: [
        //         { label: "Fade In Content", path: `/docs/animation-fadein?framework=${framework}` },
        //         { label: "Click Spark", path: `/docs/animation-clickspark?framework=${framework}` },
        //         { label: "Magnet Content", path: `/docs/animation-magnet?framework=${framework}` },
        //         { label: "Noise", path: `/docs/animation-noise?framework=${framework}` },
        //     ],
        // },
        {
            title: 'Tailwind-CSS',
            slug: 'install-tailwindcss',
            items: [
                {
                    label: 'tailwindcss',
                    path: `/docs/install-tailwindcss?framework=${framework}`,
                },
            ],
        },
        {
            title: 'Text Animations',
            slug: 'Animations components with in-built framer',
            items: [
                {
                    badge: {
                        text: 'New',
                        color: 'text-red-500',
                        bgColor: 'bg-red-100',
                    },
                    label: 'Motion Text Reveal',
                    path: `/docs/motion-text-reveal?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.motionTextReveal,
                },
                {
                    label: 'Framer Text Reveal',
                    path: `/docs/framer-text-animation?framework=${framework}`,
                    // isLock: false,
                    // releaseDate: releaseDate.motionTextReveal,
                },
            ],
        },
        {
            title: 'Animations',
            slug: 'Animation',
            items: [
                {
                    label: 'LoopBadge',
                    path: `/docs/loopbadge-animation?framework=${framework}`,
                },
                {
                    label: 'Radiating Dot',
                    path: `/docs/radiating-dot?framework=${framework}`,
                    releaseDate: releaseDate.radiatingDot,
                },
                {
                    label: 'Animated Border',
                    path: `/docs/animated-border?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.animatedBorder,
                },
            ],
        },
        {
            title: 'Backgrounds',
            slug: 'backgrounds',
            items: [
                {
                    label: 'Square Grid',
                    path: `/docs/backgrounds-squaregrid?framework=${framework}`,
                },
                {
                    label: 'Dotted Grid',
                    path: `/docs/backgrounds-dottedgrid?framework=${framework}`,
                },
                {
                    label: 'Parallax Grid Background',
                    path: `/docs/backgrounds-parallaxgrid?framework=${framework}`,
                    releaseDate: releaseDate.parallaxGrid,
                },
                {
                    label: 'Parallax Dot Background',
                    path: `/docs/backgrounds-parallaxdot?framework=${framework}`,
                    releaseDate: releaseDate.parallaxDot,
                },
            ],
        },

        {
            title: 'Container',
            slug: 'Container',
            items: [
                {
                    label: 'Draggable Container',
                    path: `/docs/draggable-container?framework=${framework}`,
                },
                {
                    label: 'Cursor Container',
                    path: `/docs/cursor-container?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.cursorFollow,
                },
                {
                    label: 'Draggable Liquid Glass',
                    path: `/docs/draggable-liquid-glass?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.cursorFollow,
                },
            ],
        },

        {
            title: 'CountDown',
            slug: 'Dot Matrix CountDown Timer',

            items: [
                {
                    label: 'Dot-Matrix CountDown',
                    path: `/docs/dot-martix-countdown?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.dotmatrixCountdown,
                },
            ],
        },
        {
            title: 'Coming Soon',
            slug: 'Coming Soon',

            items: [
                {
                    isComingSoon: true,
                    label: 'Coming Soon',
                    path: `/docs/coming-soon?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.dotmatrixCountdown,
                },
                {
                    isComingSoon: true,

                    label: 'Coming Soon',
                    path: `/docs/coming-soon?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.dotmatrixCountdown,
                },
                {
                    isComingSoon: true,

                    label: 'Coming Soon',
                    path: `/docs/coming-soon?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.dotmatrixCountdown,
                },
            ],
        },
        {
            title: 'Coming Soon',
            slug: 'Coming Soon',
            items: [
                {
                    isComingSoon: true,

                    label: 'Coming Soon',
                    path: `/docs/coming-soon?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.dotmatrixCountdown,
                },
                {
                    isComingSoon: true,

                    label: 'Coming Soon',
                    path: `/docs/coming-soon?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.dotmatrixCountdown,
                },
                {
                    isComingSoon: true,

                    label: 'Coming Soon',
                    path: `/docs/coming-soon?framework=${framework}`,
                    isLock: true,
                    releaseDate: releaseDate.dotmatrixCountdown,
                },
            ],
        },

        // {
        //     title: "Components",
        //     slug: "components",
        //     items: [
        //         { label: "Staggered Layout", path: `/docs/components-staggeredlayout?framework=${framework}` },
        //     ],
        // },
    ]

    return categories
}

// Helper function to find next and previous pages for navigation
export const getPageNavigation = (currentPath: string, framework: string) => {
    const docCategories = getDocCategories(framework)

    // Flatten all navigation items into a single array
    const allPages = [
        ...gettingStartedItems,
        ...docCategories.flatMap((category) => category.items),
    ]

    // Extract the base path without query parameters
    const basePath = currentPath.split('?')[0]

    // Find the current page index
    const currentIndex = allPages.findIndex((item) => {
        // Extract the base path from the item path
        const itemBasePath = item.path.split('?')[0]
        return itemBasePath === basePath
    })

    // If not found or at boundaries, return null for those directions
    return {
        previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
        next:
            currentIndex !== -1 && currentIndex < allPages.length - 1
                ? allPages[currentIndex + 1]
                : null,
    }
}

// Generate navigation items for a specific framework
export const getNavItems = (framework: string) => {
    return {
        gettingStarted: gettingStartedItems.map((item) => ({
            ...item,
            path: `${item.path}?framework=${framework}`,
        })),
        categories: getDocCategories(framework),
    }
}
