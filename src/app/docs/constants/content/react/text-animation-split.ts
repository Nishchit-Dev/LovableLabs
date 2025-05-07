import { DocContent } from '../../types';

// Split Text Animation content for React
export const textAnimationSplit: DocContent = {
    title: 'Split Text Animation',
    description: 'Create dynamic split text animations with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement split text animations in your React project:
      `,
            code: `
import { SplitText } from 'lovable-ui/react';

function MyComponent() {
  return (
    <SplitText>This text will be split and animated</SplitText>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your split text animation with various properties:
      `,
            code: `
import { SplitText } from 'lovable-ui/react';

function CustomSplitText() {
  return (
    <SplitText 
      type="chars"
      staggerDelay={0.05}
      animation={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
    >
      Customized split text animation
    </SplitText>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 