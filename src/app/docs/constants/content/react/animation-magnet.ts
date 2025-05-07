import { DocContent } from '../../types';

// Magnet Content Animation for React
export const animationMagnet: DocContent = {
    title: 'Magnet Content Animation',
    description: 'Create interactive magnetic content effects with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement magnet content animations in your React project:
      `,
            code: `
import { MagnetContent } from 'lovable-ui/react';

function MyComponent() {
  return (
    <MagnetContent>
      <button>Hover over me</button>
    </MagnetContent>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your magnet content animation with various properties:
      `,
            code: `
import { MagnetContent } from 'lovable-ui/react';

function CustomMagnetContent() {
  return (
    <MagnetContent 
      strength={50}
      radius={100}
      smoothing={0.2}
      scale={1.1}
    >
      <button>Customized magnetic effect</button>
    </MagnetContent>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 