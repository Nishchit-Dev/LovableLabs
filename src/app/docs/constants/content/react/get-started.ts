import { DocContent } from '../../types';

// Get Started content for React
export const getStarted: DocContent = {
    title: 'Get Started with lovablelabs UI',
    description: 'Learn how to set up and use lovablelabs UI with React',
    sections: [
        {
            title: 'Installation',
            content: `
Install lovablelabs UI using npm or yarn:

\`\`\`bash
npm install lovablelabs
# or
yarn add lovablelabs
\`\`\`
      `,
            isLiveDemo: false,
        },
        {
            title: 'Basic Usage',
            content: `
Import components from lovablelabs UI in your React project:
      `,
            code: `
import { Component } from 'lovablelabs-ui/react';

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