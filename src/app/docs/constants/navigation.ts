import { NavItem, Category, Framework } from './types';

// Define the available frameworks
export const frameworks: Framework[] = [
    { id: 'js', name: 'JavaScript', color: '#f7df1e', textColor: '#000000' },
    { id: 'react', name: 'React', color: '#61dafb', textColor: '#000000' },
    { id: 'angular', name: 'Angular', color: '#dd0031', textColor: '#ffffff' },
];

// Getting Started items - shared across frameworks
export const gettingStartedItems: NavItem[] = [
    { icon: "🚀", label: "Get started", path: "/docs/get-started" },
    { icon: "⭕", label: "Examples", path: "/docs/examples" },
];

// Documentation categories with their items - framework specific
export const getDocCategories = (framework: string): Category[] => {
    // Base content structure is the same, but we can have framework-specific content
    const categories: Category[] = [
        {
            title: "Animation",
            slug: "animation",
            items: [
                { label: "Overview", path: `/docs/animation-overview?framework=${framework}` },
                { label: "Gestures", path: `/docs/animation-gestures?framework=${framework}` },
                { label: "Scroll", path: `/docs/animation-scroll?framework=${framework}` },
            ],
        },
        {
            title: "Components",
            slug: "components",
            items: [
                { label: "Motion", path: `/docs/components-motion?framework=${framework}` },
                { label: "AnimatePresence", path: `/docs/components-animatepresence?framework=${framework}` },
                {
                    label: "AnimateNumber",
                    path: `/docs/components-animatenumber?framework=${framework}`,
                    badge: {
                        text: "Prem+",
                        color: "var(--font-blue)",
                        bgColor: "var(--bg-dark)",
                    },
                },
            ],
        },
        {
            title: "Utilities",
            slug: "utilities",
            items: [
                { label: "Values", path: `/docs/utilities-values?framework=${framework}` },
                { label: "Templates", path: `/docs/utilities-templates?framework=${framework}` },
                { label: "Hooks", path: `/docs/utilities-hooks?framework=${framework}` },
            ],
        },
    ];

    // Framework-specific adjustments
    if (framework === 'js') {
        // JavaScript has no hooks
        const utilitiesCategory = categories.find(c => c.slug === 'utilities');
        if (utilitiesCategory) {
            utilitiesCategory.items = utilitiesCategory.items.filter(item => !item.path.includes('hooks'));
        }
    } else if (framework === 'angular') {
        // Angular has services instead of hooks
        const utilitiesCategory = categories.find(c => c.slug === 'utilities');
        if (utilitiesCategory) {
            const hooksItem = utilitiesCategory.items.find(item => item.path.includes('hooks'));
            if (hooksItem) {
                hooksItem.label = 'Services';
                hooksItem.path = `/docs/utilities-services?framework=${framework}`;
            }
        }

        // Angular specific components
        const componentsCategory = categories.find(c => c.slug === 'components');
        if (componentsCategory) {
            componentsCategory.items.push({
                label: "Directives",
                path: `/docs/components-directives?framework=${framework}`
            });
        }
    }

    return categories;
};

// Helper function to find next and previous pages for navigation
export const getPageNavigation = (currentPath: string, framework: string) => {
    const docCategories = getDocCategories(framework);

    // Flatten all navigation items into a single array
    const allPages = [
        ...gettingStartedItems,
        ...docCategories.flatMap(category => category.items)
    ];

    // Extract the base path without query parameters
    const basePath = currentPath.split('?')[0];

    // Find the current page index
    const currentIndex = allPages.findIndex(item => {
        // Extract the base path from the item path
        const itemBasePath = item.path.split('?')[0];
        return itemBasePath === basePath;
    });

    // If not found or at boundaries, return null for those directions
    return {
        previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
        next: currentIndex !== -1 && currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null
    };
};

// Generate navigation items for a specific framework
export const getNavItems = (framework: string) => {
    return {
        gettingStarted: gettingStartedItems.map(item => ({
            ...item,
            path: `${item.path}?framework=${framework}`
        })),
        categories: getDocCategories(framework)
    };
}; 