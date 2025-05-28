import { DocContent } from '../../types'

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
        },
    ],
}

export const backgroundsSquareGrid: DocContent = {
    title: 'Square Grid Background',
    description: 'Create elegant square grid backgrounds with Lovable UI',
    sections: [
        {
            title: 'Code',
            content:
                'Here is the code for createing a square grid background in React/Next.js',
            code: `import React from 'react'
import { cn } from '../utils/cn'

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  full?: boolean // fills the screen
  centered?: boolean // centers children
}
export const GridBackground: React.FC<GridBackgroundProps & { boxSize?: number }> = ({
  children,
  className,
  full = false,
  centered = false,
  boxSize = 24,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md',
        full && 'min-h-screen w-full',
        centered && 'flex items-center justify-center',
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 h-full w-full bg-white z-0 pointer-events-none"
        style={{
          backgroundImage: \`linear-gradient(to right,#80808012 1px,transparent 1px),linear-gradient(to bottom,#80808012 1px,transparent 1px)\`,
          backgroundSize: \`\${boxSize}px \${boxSize}px\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}`,
            isLiveDemo: false,
        },
        {
            title: 'Dependencies',
            description:
                'we gonna use tailwindcss for styling the grid background',
            content:
                'Make sure to install the required dependencies for the grid background component:',
            code: ``,
            isLiveDemo: false,
        },
        {
            title: 'installing Tailwind CSS',
            description:
                'we gonna use tailwindcss for styling the grid background',
            content:
                'Make sure to install the required dependencies for the grid background component:',
            code: `npm install tailwindcss @tailwindcss/cli`,
            isLiveDemo: false,
        },
        {
            title: 'Import Tailwind in your CSS',
            description:
                'Add the @import "tailwindcss"; import to your main CSS file.',
            content:
                'Make sure to install the required dependencies for the grid background component:',
            code: `@import "tailwindcss";`,
            isLiveDemo: false,
        },
        {
            title: 'Start the Tailwind CLI build process',
            description:
                'Add the @import "tailwindcss"; import to your main CSS file.',
            content:
                'Make sure to install the required dependencies for the grid background component:',
            code: `npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch`,
            isLiveDemo: false,
        },
        {
            title: 'Start using Tailwind in your HTML',
            description:
                'Add your compiled CSS file to the <head> and start using Tailwind’s utility classes to style your content.',
            content:
                'Make sure to install the required dependencies for the grid background component:',
            code: `<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>`,
            isLiveDemo: false,
        },
    ],
}

export const backgroundsDottedGrid: DocContent = {
    title: 'Dotted Grid Background',
    description: 'Create stylish dotted grid backgrounds with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement dotted grid backgrounds in your React project:
      `,
      codeSrc:"src/app.js",
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
        },
    ],
}

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
        },
    ],
}

// Importing other modules directly
import { textAnimationBlur } from './text-animation-blur'
import { textAnimationSplit } from './text-animation-split'
import { textAnimationCircular } from './text-animation-circular'
import { animationFadeIn } from './animation-fadein'
import { animationClickSpark } from './animation-clickspark'
import { animationMagnet } from './animation-magnet'
import { animationNoise } from './animation-noise'

// Re-export all imported modules
export {
    textAnimationBlur,
    textAnimationSplit,
    textAnimationCircular,
    animationFadeIn,
    animationClickSpark,
    animationMagnet,
    animationNoise,
}
