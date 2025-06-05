import { DocContent } from '../types'

// Framework-specific content imports
import * as reactContent from './react'

// Map framework ID to content module
const frameworkContent = {
    react: reactContent,
}

// Map of slug to content key in each framework module
const slugToContentKey: Record<string, string> = {
    // 'get-started': 'getStarted',

    'install-tailwindcss': 'InstallTailwindCss',

    // Backgrounds
    'backgrounds-squaregrid': 'backgroundsSquareGridContent',
    'backgrounds-dottedgrid': 'backgroundsDottedGridContent',

    // animations
    'loopbadge-animation': 'loopBadgeAnimationContent',
    'draggable-container': 'draggableContainerContent',
}

// Helper function to get content by slug
export const getContentBySlug = (slug: string): DocContent | null => {
    // Only react framework is supported
    const validFramework = 'react'

    // Get the content module for the specified framework
    const contentModule =
        frameworkContent[validFramework as keyof typeof frameworkContent]

    // Get the property key to access in the content module
    const contentKey = slugToContentKey[slug]

    if (!contentKey) {
        return null
    }

    // Check if this content exists for the specified framework
    if (contentModule && contentKey in contentModule) {
        return (contentModule as Record<string, DocContent>)[contentKey]
    }

    // Return null if content doesn't exist
    return null
}

// Export all content
export default {
    getContentBySlug,
}
