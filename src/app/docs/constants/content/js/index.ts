import { DocContent } from '../../types';

// JS Get Started content
export const getStarted: DocContent = {
  title: 'Getting Started with JavaScript',
  description: 'Learn how to use Lovable UI with vanilla JavaScript',
  sections: [
    {
      title: 'Installation',
      content: `
You can install Lovable UI for JavaScript using npm or yarn:

\`\`\`bash
npm install lovable-ui
# or
yarn add lovable-ui
\`\`\`

Or include it directly in your HTML:

\`\`\`html
<script src="https://unpkg.com/lovable-ui@latest/dist/lovable.min.js"></script>
\`\`\`
      `,
      code: `
// Import Lovable in your JavaScript file
import { animate, scroll } from 'lovable-ui';

// Or access it globally if using the script tag
// const { animate, scroll } = window.Lovable;
      `,
      isLiveDemo: false,
    },
    {
      title: 'Basic Usage',
      content: `
Lovable UI provides a simple API for creating animations. Here's a basic example:
      `,
      code: `
// Get an element to animate
const element = document.querySelector('.my-element');

// Create a simple animation
animate(element, { 
  opacity: [0, 1],
  y: [50, 0]
}, { 
  duration: 0.5, 
  easing: 'ease-out' 
});
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
      isLiveDemo: false,
    }
  ]
};

// Animation Overview content
export const animationOverview: DocContent = {
  title: 'Animation Overview - JavaScript',
  description: 'Learn about the animation capabilities in Lovable UI with JavaScript',
  sections: [
    {
      title: 'Basic Animation',
      content: `
Lovable UI provides a simple yet powerful API for creating animations in JavaScript. 

The core function is \`animate()\`, which lets you create smooth animations with a variety of options.
      `,
      code: `
import { animate } from 'lovable-ui';

// Animate an element
animate('#my-element', {
  x: [0, 100],
  opacity: [0, 1],
  scale: [0.5, 1]
}, {
  duration: 0.5,
  easing: 'ease-out'
});
      `,
      isLiveDemo: false,
    },
    {
      title: 'Animation Properties',
      content: `
Lovable UI supports a wide range of properties to animate:

- **Transform properties**: x, y, z, rotate, scale, etc.
- **CSS properties**: opacity, backgroundColor, width, etc.
- **SVG properties**: For animating SVG elements

You can animate multiple properties at once, and each property can have a different timing.
      `,
      code: `
// Animate multiple properties with different timings
animate('.button', {
  scale: [1, 1.1],
  backgroundColor: ['#333', '#666']
}, {
  duration: { scale: 0.2, backgroundColor: 0.5 },
  easing: { scale: 'ease-out', backgroundColor: 'linear' }
});
      `,
      isLiveDemo: false,
    }
  ]
};

// Components Motion content
export const componentsMotion: DocContent = {
  title: 'Using Motion - JavaScript',
  description: 'Learn how to use the motion component in Lovable UI with JavaScript',
  sections: [
    {
      title: 'Basic Usage',
      content: `
In JavaScript, you can create motion elements using the \`createMotionElement\` function:

      `,
      code: `
import { createMotionElement } from 'lovable-ui';

// Create a motion div
const motionDiv = createMotionElement('div', {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
});

// Append to the DOM
document.body.appendChild(motionDiv);
      `,
      isLiveDemo: false,
    },
    {
      title: 'Animation Controls',
      content: `
You can control animations with the \`controls\` API:

      `,
      code: `
import { createMotionElement, animationControls } from 'lovable-ui';

// Create controls
const controls = animationControls();

// Create a motion element with controls
const motionDiv = createMotionElement('div', {
  initial: { opacity: 0 },
  animate: controls
});

// Start the animation later
controls.start({ opacity: 1, scale: 1.2 });

// Stop or reverse as needed
controls.stop();
// or
controls.start({ opacity: 0, scale: 1 });
      `,
      isLiveDemo: false,
    }
  ]
}; 