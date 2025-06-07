import { DocContent } from '../../types'

// React Get Started content
export const getStarted: DocContent = {
    title: 'Getting Started with React',
    description: 'Learn how to use Lovablelabs UI with React',
    sections: [
        {
            title: 'Installation',
            content: `
You can install Lovablelabs UI for React using npm or yarn:

\`\`\`bash
npm install lovable-ui
# or
yarn add lovable-ui
\`\`\`
      `,
            code: `
// Import Lovablelabs components in your React file
import { motion, AnimatePresence } from 'lovable-ui/react';
      `,
            isLiveDemo: false,
        },
        {
            title: 'Basic Usage',
            content: `
Lovablelabs UI provides a \`motion\` component that you can use to create animations. Here's a basic example:
      `,
            code: `
import { motion } from 'lovable-ui/react';

function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello World!
    </motion.div>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Next Steps',
            content: `
Now that you have Lovablelabs UI set up, explore the different animation capabilities:

- **Gesture animations**: Create hover, tap, and drag interactions
- **Scroll animations**: Trigger animations based on scroll position
- **Transitions**: Define custom transitions between states

Check out the Animation section for more details.
      `,
            code: `
// Import Lovablelabs components in your React file
import { motion, AnimatePresence } from 'lovable-ui/react';
      `,
            isLiveDemo: false,
        },
    ],
}

export const componentsStaggeredLayout: DocContent = {
    title: 'Staggered Layout Component',
    description:
        'Create visually appealing staggered layouts with Lovablelabs UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement staggered layouts in your React project:
      `,
            code: `
import { StaggeredLayout } from 'lovable-ui/react';

function MyComponent() {
  return (
    <StaggeredLayout>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </StaggeredLayout>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your staggered layout with various properties:
      `,
            code: `
import { StaggeredLayout } from 'lovable-ui/react';

function CustomStaggeredLayout() {
  return (
    <StaggeredLayout 
      staggerDelay={0.1}
      columns={3}
      gap={16}
      animationSettings={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
      }}
    >
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
    </StaggeredLayout>
  );
}
      `,
            isLiveDemo: false,
        },
    ],
}

// Importing other modules directly

import { InstallTailwindCss } from './install-css'
import { backgroundsSquareGridContent } from './backgroundsSquareGrid'
import { backgroundsDottedGridContent } from './backgroundDottedGrid'
import { loopBadgeAnimationContent } from './loopBadgeAnimation'
import { draggableContainerContent } from './draggableContainer'
import { cursorContainerContent } from './cursorContainer'

// Re-export all imported modules
export {
    InstallTailwindCss,
    backgroundsSquareGridContent,
    backgroundsDottedGridContent,
    loopBadgeAnimationContent,
    draggableContainerContent,
    cursorContainerContent,
}
