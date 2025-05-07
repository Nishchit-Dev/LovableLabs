import { DocContent } from '../../types';

// Fade In Animation content for React
export const animationFadeIn: DocContent = {
    title: 'Fade In Content Animation',
    description: 'Create smooth fade-in animations for content with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement fade-in animations in your React project:
      `,
            code: `
import { FadeIn } from 'lovable-ui/react';

function MyComponent() {
  return (
    <FadeIn>
      <div>This content will fade in smoothly</div>
    </FadeIn>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your fade-in animation with various properties:
      `,
            code: `
import { FadeIn } from 'lovable-ui/react';

function CustomFadeIn() {
  return (
    <FadeIn 
      duration={0.8}
      delay={0.2}
      direction="up"
      distance={50}
      triggerOnce={true}
    >
      <div>Customized fade-in animation</div>
    </FadeIn>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 