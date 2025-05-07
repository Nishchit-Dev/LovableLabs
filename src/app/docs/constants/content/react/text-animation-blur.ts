import { DocContent } from '../../types';

// Blur Text Animation content for React
export const textAnimationBlur: DocContent = {
    title: 'Blur Text Animation',
    description: 'Create beautiful blur text animations with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement blur text animations in your React project:
      `,
            code: `
import { BlurText } from 'lovable-ui/react';

function MyComponent() {
  return (
    <BlurText>This text will have a blur animation</BlurText>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your blur text animation with various properties:
      `,
            code: `
import { BlurText } from 'lovable-ui/react';

function CustomBlurText() {
  return (
    <BlurText 
      intensity={5}
      duration={0.8}
      delay={0.2}
    >
      Customized blur text animation
    </BlurText>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 