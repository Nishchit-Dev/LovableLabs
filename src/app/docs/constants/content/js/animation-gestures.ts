import { DocContent } from '../../types';

// Animation Gestures content for JavaScript
export const animationGestures: DocContent = {
  title: 'Gesture Animations - JavaScript',
  description: 'Learn how to create gesture-based animations with Lovable UI in JavaScript',
  sections: [
    {
      title: 'Hover Animations',
      content: `
## Hover Animations

Create smooth hover animations with the \`hover\` helper:
      `,
      code: `
import { hover } from 'lovable-ui';

// Get an element to animate
const button = document.querySelector('.button');

// Add hover animation
hover(button, {
  scale: 1.1,
  backgroundColor: '#0088ff'
}, {
  duration: 0.2
});
      `,
      isLiveDemo: false,
    },
    {
      title: 'Drag Gestures',
      content: `
## Drag Gestures

Enable drag interactions with the \`draggable\` helper:
      `,
      code: `
import { draggable } from 'lovable-ui';

// Get an element to make draggable
const box = document.querySelector('.draggable-box');

// Make it draggable
draggable(box, {
  bounds: { left: 0, top: 0, right: 500, bottom: 300 },
  onDragStart: () => console.log('Drag started'),
  onDragEnd: () => console.log('Drag ended'),
});
      `,
      isLiveDemo: false,
    },
    {
      title: 'Tap Gestures',
      content: `
## Tap Gestures

Create tap animations with the \`tap\` helper:
      `,
      code: `
import { tap } from 'lovable-ui';

// Get an element to animate
const button = document.querySelector('.button');

// Add tap animation
tap(button, {
  scale: 0.95,
}, {
  duration: 0.1
});
      `,
      isLiveDemo: false,
    }
  ]
}; 