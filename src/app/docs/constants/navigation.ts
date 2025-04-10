import { NavItem, Category } from './types';

// Getting Started items
export const gettingStartedItems: NavItem[] = [
    { icon: "🚀", label: "Get started", path: "/docs/get-started" },
    { icon: "⭕", label: "Examples", path: "/docs/examples" },
];

// Documentation categories with their items
export const docCategories: Category[] = [
    {
        title: "Animation",
        slug: "animation",
        items: [
            { label: "Overview", path: "/docs/animation-overview" },
            { label: "Gestures", path: "/docs/animation-gestures" },
            { label: "Scroll", path: "/docs/animation-scroll" },
            { label: "Layout", path: "/docs/animation-layout" },
            { label: "Transitions", path: "/docs/animation-transitions" },
        ],
    },
    {
        title: "Animation",
        slug: "animation",
        items: [
            { label: "Overview", path: "/docs/animation-overview" },
            { label: "Gestures", path: "/docs/animation-gestures" },
            { label: "Scroll", path: "/docs/animation-scroll" },
            { label: "Layout", path: "/docs/animation-layout" },
            { label: "Transitions", path: "/docs/animation-transitions" },
        ],
    },
    {
        title: "Animation",
        slug: "animation",
        items: [
            { label: "Overview", path: "/docs/animation-overview" },
            { label: "Gestures", path: "/docs/animation-gestures" },
            { label: "Scroll", path: "/docs/animation-scroll" },
            { label: "Layout", path: "/docs/animation-layout" },
            { label: "Transitions", path: "/docs/animation-transitions" },
        ],
    },
    {
        title: "Components",
        slug: "components",
        items: [
            { label: "motion", path: "/docs/components-motion" },
            { label: "AnimatePresence", path: "/docs/components-animatepresence" },
            {
                label: "AnimateNumber",
                path: "/docs/components-animatenumber",
                badge: {
                    text: "Prem+",
                    color: "var(--font-blue)",
                    bgColor: "var(--bg-dark)",
                },
            },
        ],
    },
    {
        title: "Motion values",
        slug: "values",
        items: [
            { label: "Overview", path: "/docs/values-overview" },
            { label: "useMotionTemplate", path: "/docs/values-usemotiontemplate" },
        ],
    },
    {
        title: "Integrations",
        slug: "integrations",
        items: [{ label: "Radix", path: "/docs/integrations-radix" }],
    },
];

// Full navigation data object
export const navItems = {
    gettingStarted: gettingStartedItems,
    categories: docCategories,
};

// Helper function to find next and previous pages for navigation
export const getPageNavigation = (currentPath: string) => {
    // Flatten all navigation items into a single array
    const allPages = [
        ...gettingStartedItems,
        ...docCategories.flatMap(category => category.items)
    ];

    // Find the current page index
    const currentIndex = allPages.findIndex(item => item.path === currentPath);

    // If not found or at boundaries, return null for those directions
    return {
        previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
        next: currentIndex !== -1 && currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null
    };
}; 