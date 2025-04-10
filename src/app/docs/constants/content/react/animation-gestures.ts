import { DocContent } from '../../types';

// Animation Gestures content for React
export const animationGestures: DocContent = {
    title: 'Gesture Animations - React',
    description: 'Learn how to create gesture-based animations with Lovable UI in React',
    sections: [
        {
            title: 'Hover Animations',
            content: `
## Hover Animations

Create smooth hover animations with the \`whileHover\` prop:
      `,
            code: `
import { motion } from 'lovable-ui/react';

function HoverButton() {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.1,
        backgroundColor: '#0088ff'
      }}
      transition={{ duration: 0.2 }}
    >
      Hover me
    </motion.button>
  );
}
      `
        },
        {
            title: 'Drag Gestures',
            content: `
## Drag Gestures

Enable drag interactions with the \`drag\` prop:
      `,
            code: `
import { motion } from 'lovable-ui/react';

function DraggableBox() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, top: 0, right: 500, bottom: 300 }}
      onDragStart={() => console.log('Drag started')}
      onDragEnd={() => console.log('Drag ended')}
      style={{
        width: 100,
        height: 100,
        background: 'red'
      }}
    />
  );
}
      `
        },
        {
            title: 'Tap Gestures',
            content: `
## Tap Gestures

Create tap animations with the \`whileTap\` prop:
      `,
            code: `
import { motion } from 'lovable-ui/react';

function TapButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      Tap me
    </motion.button>
  );
}
      `
        }
    ]
}; 