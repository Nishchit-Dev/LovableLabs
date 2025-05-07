import { DocContent } from '../../types';

// Noise Animation content for React
export const animationNoise: DocContent = {
    title: 'Noise Animation',
    description: 'Create dynamic noise animations with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement noise animations in your React project:
      `,
            code: `
import { NoiseEffect } from 'lovable-ui/react';

function MyComponent() {
  return (
    <NoiseEffect>
      <div>Content with noise effect</div>
    </NoiseEffect>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your noise animation with various properties:
      `,
            code: `
import { NoiseEffect } from 'lovable-ui/react';

function CustomNoiseEffect() {
  return (
    <NoiseEffect 
      intensity={0.5}
      scale={100}
      speed={0.3}
      blendMode="overlay"
      color="#ffffff"
    >
      <div>Customized noise effect</div>
    </NoiseEffect>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 