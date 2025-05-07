import { DocContent } from '../../types';

// Click Spark Animation content for React
export const animationClickSpark: DocContent = {
    title: 'Click Spark Animation',
    description: 'Create interactive click spark effects with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement click spark animations in your React project:
      `,
            code: `
import { ClickSpark } from 'lovable-ui/react';

function MyComponent() {
  return (
    <ClickSpark>
      <button>Click me for sparks!</button>
    </ClickSpark>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your click spark animation with various properties:
      `,
            code: `
import { ClickSpark } from 'lovable-ui/react';

function CustomClickSpark() {
  return (
    <ClickSpark 
      particleCount={15}
      particleSize={8}
      colors={['#ff0000', '#00ff00', '#0000ff']}
      particleLife={1000}
      spreadRadius={50}
    >
      <button>Customized click spark effect</button>
    </ClickSpark>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 