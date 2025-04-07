import { TableOfContentsItem } from './types';

// Table of contents for get-started page
export const getStartedTableOfContents: TableOfContentsItem[] = [
    { label: "Installation", anchor: "#installation" },
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Customization", anchor: "#customization" },
    { label: "Next Steps", anchor: "#next-steps" },
];

// Table of contents for animation overview page
export const animationOverviewTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Animation", anchor: "#basic-animation" },
    { label: "Animation Properties", anchor: "#animation-properties" },
];

// Table of contents for gesture animations page
export const gesturesTableOfContents: TableOfContentsItem[] = [
    { label: "Hover Animations", anchor: "#hover-animations" },
    { label: "Drag Gestures", anchor: "#drag-gestures" },
];

// Table of contents for scroll animations page
export const scrollTableOfContents: TableOfContentsItem[] = [
    { label: "Scroll-triggered Animations", anchor: "#scroll-triggered-animations" },
];

// Table of contents for motion component page
export const motionComponentTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    {
        label: "Advanced Properties",
        anchor: "#advanced-properties",
        isHeading: true,
        subItems: [
            { label: "Animation Controls", anchor: "#animation-controls" },
            { label: "Variants", anchor: "#variants" },
        ]
    },
];

// Table of contents for transitions page
export const transitionsTableOfContents: TableOfContentsItem[] = [
    { label: "Setting a transition", anchor: "#setting-transition" },
    { label: "Value-specific transitions", anchor: "#value-specific" },
    { label: "Default transitions", anchor: "#default-transitions" },
    {
        label: "Transition settings",
        anchor: "#transition-settings",
        isHeading: true,
        subItems: [
            { label: "Tween", anchor: "#tween" },
            { label: "Spring", anchor: "#spring" },
            { label: "Inertia", anchor: "#inertia" },
            { label: "Orchestration", anchor: "#orchestration" },
        ],
    },
];

// Map of page slugs to their table of contents
export const pageTableOfContents: Record<string, TableOfContentsItem[]> = {
    "get-started": getStartedTableOfContents,
    "animation-overview": animationOverviewTableOfContents,
    "animation-gestures": gesturesTableOfContents,
    "animation-scroll": scrollTableOfContents,
    "components-motion": motionComponentTableOfContents,
    "animation-transitions": transitionsTableOfContents,
    // Add more page-specific table of contents as needed
};

// Helper function to get table of contents for a specific page
export const getTableOfContents = (slug: string): TableOfContentsItem[] => {
    return pageTableOfContents[slug] || [];
}; 