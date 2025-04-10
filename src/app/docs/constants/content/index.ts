import { DocContent } from '../types';

// Framework-specific content imports
import * as jsContent from './js';
import * as reactContent from './react';
import * as angularContent from './angular';

// Map framework ID to content module
const frameworkContent = {
    js: jsContent,
    react: reactContent,
    angular: angularContent,
};

// Map of slug to content key in each framework module
const slugToContentKey: Record<string, string> = {
    'get-started': 'getStarted',
    'animation-overview': 'animationOverview',
    'animation-gestures': 'animationGestures',
    'animation-scroll': 'animationOverview', // Placeholder, should create proper content
    'components-motion': 'componentsMotion',
    'components-animatepresence': 'componentsMotion', // Placeholder, should create proper content
    'components-animatenumber': 'componentsMotion', // Placeholder, should create proper content
    'components-directives': 'componentsDirectives', // Angular-specific
    'utilities-values': 'componentsMotion', // Placeholder, should create proper content
    'utilities-templates': 'componentsMotion', // Placeholder, should create proper content
    'utilities-hooks': 'componentsMotion', // Placeholder, should create proper content
    'utilities-services': 'componentsDirectives', // Angular-specific
};

// Helper function to get content by slug and framework
export const getContentBySlug = (slug: string, framework: string = 'react'): DocContent | null => {
    // If the framework doesn't exist, fall back to React
    const validFramework = Object.keys(frameworkContent).includes(framework) ? framework : 'react';

    // Get the content module for the specified framework
    const contentModule = frameworkContent[validFramework as keyof typeof frameworkContent];

    // Get the property key to access in the content module
    const contentKey = slugToContentKey[slug];

    if (!contentKey) {
        return null;
    }

    // Check if this content exists for the specified framework
    if (contentModule && contentKey in contentModule) {
        return (contentModule as any)[contentKey];
    }

    // If the content doesn't exist for the framework, check if it exists for React as fallback
    if (validFramework !== 'react' && contentKey in reactContent) {
        return (reactContent as any)[contentKey];
    }

    // Return null if content doesn't exist
    return null;
};

// Export all content
export default {
    getContentBySlug,
}; 