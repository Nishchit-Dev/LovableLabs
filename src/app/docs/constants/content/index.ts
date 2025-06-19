import { DocContent } from '../types'

// Framework-specific content imports
import * as reactContent from './react'

// Map framework ID to content module
const frameworkContent = {
    react: reactContent,
}

// Helper function to get content by slug
export const getContentBySlug = (slug: string): DocContent | null => {
    try {
        // Only react framework is supported
        const validFramework = 'react'

        // Get the content module for the specified framework
        const contentModule =
            frameworkContent[validFramework as keyof typeof frameworkContent]

        // Get the property key to access in the content module
        const contentKey = slugToContentKey[slug]

        if (!contentKey) {
            console.log(`No content key found for slug: ${slug}`)
            return null
        }

        // Check if this content exists for the specified framework
        if (contentModule && contentKey in contentModule) {
            return (contentModule as Record<string, DocContent>)[contentKey]
        }

        // Return null if content doesn't exist
        console.log(
            `Content not found for slug: ${slug} and key: ${contentKey}`
        )
        return null
    } catch (error) {
        console.error(`Error fetching content for slug: ${slug}`, error)
        return null
    }
}

// Map of slug to content key in each framework module
const slugToContentKey: Record<string, string> = {
    // 'get-started': 'getStarted',

    'install-tailwindcss': 'InstallTailwindCss',

    // Backgrounds
    'backgrounds-squaregrid': 'backgroundsSquareGridContent',
    'backgrounds-dottedgrid': 'backgroundsDottedGridContent',
    'backgrounds-parallaxgrid': 'backgroundParallaxGridContent',
    'backgrounds-parallaxdot': 'backgroundParallaxDotContent',

    // animations
    'loopbadge-animation': 'loopBadgeAnimationContent',
    'draggable-container': 'draggableContainerContent',
    'cursor-container': 'cursorContainerContent',
    'radiating-dot': 'radiatingDotContent',
    'animated-border': 'animatedBorderContent',
    'dot-martix-countdown': 'dotMatrixCountdownContent',
    'draggable-liquid-glass': 'liquidGlassDraggableContent',
    // text animation

    'motion-text-reveal': 'motionTextRevealContent',
}
// Export all content
const contentExports = {
    getContentBySlug,
}

export default contentExports
