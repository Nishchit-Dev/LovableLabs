import { DocContent } from '../../types';

// Get Started content for React
export const getStarted: DocContent = {
    title: 'Get Started with Lovable UI',
    description: 'Learn how to set up and use Lovable UI with React',
    sections: [
        {
            title: 'Installation',
            content: `
Install Lovable UI using npm or yarn:

\`\`\`bash
npm install lovable-ui
# or
yarn add lovable-ui
\`\`\`
      `,
            isLiveDemo: false,
        },
        {
            title: 'Basic Usage',
            content: `
Import components from Lovable UI in your React project:
      `,
            code: `
import { Component } from 'lovable-ui/react';

function MyApp() {
  return (
    <div>
      <Component />
    </div>
  );
}
      `,
            isLiveDemo: false,
        }
    ]
}; 