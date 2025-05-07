import { DocContent } from '../../types';

// Circular Text Animation content for React
export const textAnimationCircular: DocContent = {
    title: 'Circular Text Animation',
    description: 'Create eye-catching circular text animations with Lovable UI',
    sections: [
        {
            title: 'Basic Usage',
            content: `
Learn how to implement circular text animations in your React project:
      `,
            code: `
import { CircularText } from 'lovable-ui/react';

function MyComponent() {
  return (
    <CircularText>This text will be displayed in a circle</CircularText>
  );
}
      `,
            isLiveDemo: false,
        },
        {
            title: 'Configuration',
            content: `
Customize your circular text animation with various properties:
      `,
            code: `
import { CircularText } from 'lovable-ui/react';

function CustomCircularText() {
  return (
    <CircularText 
      radius={100}
      startAngle={0}
      endAngle={360}
      direction="clockwise"
      animated={true}
      animationDuration={5}
    >
      Customized circular text animation example
    </CircularText>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 