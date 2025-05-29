
import { TableOfContentsItem } from './types';

// Table of contents for get-started page
export const getStartedTableOfContents: TableOfContentsItem[] = [
    { label: "Installation", anchor: "#installation" },
    { label: "Basic Usage", anchor: "#basic-usage" },
];

// Table of contents for text animation pages
export const textAnimationBlurTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

export const textAnimationSplitTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

export const textAnimationCircularTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

// Table of contents for animation pages
export const animationFadeInTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

export const animationClickSparkTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

export const animationMagnetTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

export const animationNoiseTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

// Table of contents for backgrounds pages
export const backgroundsSquareGridTableOfContents: TableOfContentsItem[] = [
    { label: "Install Depsendencies", anchor: "#install depsendencies" },
    { label: "Add util file", anchor: "#add util file" },
    { label: "Copy source code", anchor: "#copy source code" },
];

export const backgroundsDottedGridTableOfContents: TableOfContentsItem[] = [
    { label: "Install Depsendencies", anchor: "#install depsendencies" },
    { label: "Add util file", anchor: "#add util file" },
    { label: "Copy source code", anchor: "#copy source code" },
];

// Table of contents for components pages
export const componentsStaggeredLayoutTableOfContents: TableOfContentsItem[] = [
    { label: "Basic Usage", anchor: "#basic-usage" },
    { label: "Configuration", anchor: "#configuration" },
];

// Map of page slugs to their table of contents
export const pageTableOfContents: Record<string, TableOfContentsItem[]> = {
    "get-started": getStartedTableOfContents,

    // Text Animation pages
    "text-animation-blur": textAnimationBlurTableOfContents,
    "text-animation-split": textAnimationSplitTableOfContents,
    "text-animation-circular": textAnimationCircularTableOfContents,

    // Animation pages
    "animation-fadein": animationFadeInTableOfContents,
    "animation-clickspark": animationClickSparkTableOfContents,
    "animation-magnet": animationMagnetTableOfContents,
    "animation-noise": animationNoiseTableOfContents,

    // Backgrounds pages
    "backgrounds-squaregrid": backgroundsSquareGridTableOfContents,
    "backgrounds-dottedgrid": backgroundsDottedGridTableOfContents,

    // Components pages
    "components-staggeredlayout": componentsStaggeredLayoutTableOfContents,
};

// Helper function to get table of contents for a specific page
export const getTableOfContents = (slug: string): TableOfContentsItem[] => {
    return pageTableOfContents[slug] || [];
}; 