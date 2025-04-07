import { DocContent } from '../types';
import animationOverviewContent from './animation-overview';
import animationGesturesContent from './animation-gestures';
import animationScrollContent from './animation-scroll';
import componentsMotionContent from './components-motion';

// Map all content by slug
const docContent: Record<string, DocContent> = {
    'animation-overview': animationOverviewContent,
    'animation-gestures': animationGesturesContent,
    'animation-scroll': animationScrollContent,
    'components-motion': componentsMotionContent,
    // Add more content as needed
};

// Helper function to get content by slug
export const getContentBySlug = (slug: string): DocContent | null => {
    return docContent[slug] || null;
};

export default docContent; 