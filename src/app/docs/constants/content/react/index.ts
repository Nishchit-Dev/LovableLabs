import { DocContent } from '../../types';

// React Get Started content
export const getStarted: DocContent = {
  title: 'Getting Started with React',
  description: 'Learn how to use Lovable UI with React',
  sections: [
    {
      title: 'Installation',
      content: `
You can install Lovable UI for React using npm or yarn:

\`\`\`bash
npm install lovable-ui
# or
yarn add lovable-ui
\`\`\`
      `,
      code: `
// Import Lovable components in your React file
import { motion, AnimatePresence } from 'lovable-ui/react';
      `,
      isLiveDemo: false,
    },
    {
      title: 'Basic Usage',
      content: `
Lovable UI provides a \`motion\` component that you can use to create animations. Here's a basic example:
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
Now that you have Lovable UI set up, explore the different animation capabilities:

- **Gesture animations**: Create hover, tap, and drag interactions
- **Scroll animations**: Trigger animations based on scroll position
- **Transitions**: Define custom transitions between states

Check out the Animation section for more details.
      `,
      code: `
// Import Lovable components in your React file
import { motion, AnimatePresence } from 'lovable-ui/react';
      `,
      isLiveDemo: false,
    }
  ]
};



export const backgroundsSquareGrid: DocContent = {
  title: 'Square Grid Background',
  description: 'Create elegant square grid backgrounds with Lovable UI',
  sections: [
    {
      title: 'Basic Usage',
      content: `
Learn how to implement square grid backgrounds in your React project:
      `,
      code: `
import { SquareGrid } from 'lovable-ui/react';

function MyComponent() {
  return (
    <SquareGrid>
      <div>Content with square grid background</div>
    </SquareGrid>
  );
}
      `,
      isLiveDemo: false,
    },
    {
      title: 'Configuration',
      content: `
Customize your square grid background with various properties:
      `,
      code: `
import { SquareGrid } from 'lovable-ui/react';

function CustomSquareGrid() {
  return (
    <SquareGrid 
      gridSize={50}
      lineColor="#333333"
      lineWidth={1}
      animated={true}
      animationSpeed={10}
      backgroundColor="#121212"
    >
      <div>Customized square grid background</div>
    </SquareGrid>
  );
}
      `,
      isLiveDemo: false,
    }
  ]
};


export const backgroundsDottedGrid: DocContent = {
  title: 'Dotted Grid Background',
  description: 'Create stylish dotted grid backgrounds with Lovable UI',
  sections: [
    {
      title: 'Basic Usage',
      content: `
Learn how to implement dotted grid backgrounds in your React project:
      `,
      code: `
import { DottedGrid } from 'lovable-ui/react';

function MyComponent() {
  return (
    <DottedGrid>
      <div>Content with dotted grid background</div>
    </DottedGrid>
  );
}
      `,
      isLiveDemo: false,
    },
    {
      title: 'Configuration',
      content: `
Customize your dotted grid background with various properties:
      `,
      code: `
import { DottedGrid } from 'lovable-ui/react';

function CustomDottedGrid() {
  return (
    <DottedGrid 
      spacing={30}
      dotSize={3}
      dotColor="#444444"
      animated={true}
      animationSpeed={5}
      backgroundColor="#0f0f0f"
    >
      <div>Customized dotted grid background</div>
    </DottedGrid>
  );
}
      `,
      isLiveDemo: false,
    }
  ]
};

export const componentsStaggeredLayout: DocContent = {
  title: 'Staggered Layout Component',
  description: 'Create visually appealing staggered layouts with Lovable UI',
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
    }
  ]
};

// Importing other modules directly
import { textAnimationBlur } from './text-animation-blur';
import { textAnimationSplit } from './text-animation-split';
import { textAnimationCircular } from './text-animation-circular';
import { animationFadeIn } from './animation-fadein';
import { animationClickSpark } from './animation-clickspark';
import { animationMagnet } from './animation-magnet';
import { animationNoise } from './animation-noise';

// Re-export all imported modules
export {
  textAnimationBlur,
  textAnimationSplit,
  textAnimationCircular,
  animationFadeIn,
  animationClickSpark,
  animationMagnet,
  animationNoise
}; 