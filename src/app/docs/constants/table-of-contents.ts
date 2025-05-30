
import { TableOfContentsItem } from './types';

// Table of contents for get-started page
export const getStartedTableOfContents: TableOfContentsItem[] = [
    { label: "Installation", anchor: "#installation" },
    { label: "Basic Usage", anchor: "#basic-usage" },
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


// Map of page slugs to their table of contents
export const pageTableOfContents: Record<string, TableOfContentsItem[]> = {
    // "get-started": getStartedTableOfContents,


    // Backgrounds pages
    "backgrounds-squaregrid": backgroundsSquareGridTableOfContents,
    "backgrounds-dottedgrid": backgroundsDottedGridTableOfContents,


};

// Helper function to get table of contents for a specific page
export const getTableOfContents = (slug: string): TableOfContentsItem[] => {
    return pageTableOfContents[slug] || [];
}; 