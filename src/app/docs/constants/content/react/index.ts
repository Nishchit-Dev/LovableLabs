import { DocContent } from '../../types';

// React Get Started content
export const getStarted: DocContent = {
    title: 'Getting Started with React',
    description: 'Learn how to use Lovable UI with React',
    sections: [
        {
            title: 'Installation',
            content: `
## Installation

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
      `
        },
        {
            title: 'Basic Usage',
            content: `
## Basic Usage

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
      `
        },
        {
            title: 'Next Steps',
            content: `
## Next Steps

Now that you have Lovable UI set up, explore the different animation capabilities:

- **Gesture animations**: Create hover, tap, and drag interactions
- **Scroll animations**: Trigger animations based on scroll position
- **Transitions**: Define custom transitions between states

Check out the Animation section for more details.
      `
        }
    ]
};

// Animation Overview content
export const animationOverview: DocContent = {
    title: 'Animation Overview - React',
    description: 'Learn about the animation capabilities in Lovable UI with React',
    sections: [
        {
            title: 'Basic Animation',
            content: `
## Basic Animation

Lovable UI provides a simple yet powerful API for creating animations in React. 

The core component is \`motion\`, which lets you create smooth animations with a variety of options.
      `,
            code: `
import { motion } from 'lovable-ui/react';

function MyComponent() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      I'll animate in from the left!
    </motion.div>
  );
}
      `
        },
        {
            title: 'Animation Properties',
            content: `
## Animation Properties

Lovable UI supports a wide range of properties to animate:

- **Transform properties**: x, y, z, rotate, scale, etc.
- **CSS properties**: opacity, backgroundColor, width, etc.
- **SVG properties**: For animating SVG elements

You can animate multiple properties at once with different timings.
      `,
            code: `
import { motion } from 'lovable-ui/react';

function AnimatedButton() {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        backgroundColor: '#666'
      }}
      transition={{
        scale: { duration: 0.2, ease: 'easeOut' },
        backgroundColor: { duration: 0.5, ease: 'linear' }
      }}
    >
      Hover me!
    </motion.button>
  );
}
      `
        }
    ]
};

// Components Motion content
export const componentsMotion: DocContent = {
    title: 'Motion Component - React',
    description: 'Learn how to use the motion component in Lovable UI with React',
    sections: [
        {
            title: 'Basic Usage',
            content: `
## Basic Usage

The \`motion\` component is the primary way to create animations in React:

      `,
            code: `
import { motion } from 'lovable-ui/react';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello world!
    </motion.div>
  );
}
      `
        },
        {
            title: 'Animation Controls',
            content: `
## Animation Controls

You can control animations with the \`useAnimation\` hook:

      `,
            code: `
import { motion, useAnimation } from 'lovable-ui/react';
import { useEffect } from 'react';

function ControlledAnimation() {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      x: 100,
      transition: { duration: 2 }
    });
    
    // You can sequence animations too
    const sequence = async () => {
      await controls.start({ scale: 1.5 });
      await controls.start({ rotate: 180 });
      return await controls.start({ scale: 1 });
    };
    
    sequence();
  }, [controls]);
  
  return (
    <motion.div
      animate={controls}
      initial={{ x: 0, scale: 1, rotate: 0 }}
      style={{ width: 150, height: 150, background: 'red' }}
    />
  );
}
      `
        }
    ]
}; 