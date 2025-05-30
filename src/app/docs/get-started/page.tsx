'use client'

import React from 'react'
import DocSection from '../components/DocSection'
import { DocContent } from '../constants'

// Create a DocContent object for the getting started page
const getStartedContent: DocContent = {
    title: 'Getting Started with Lovable UI',
    description:
        'Welcome to Lovable UI - a beautiful and flexible UI component library for React. This guide will help you get started with installation and basic usage.',
    //   sections: [
    //     {
    //       title: "Installation",
    //       content: `
    // To get started with Lovable UI, install it via npm or yarn:

    // \`\`\`bash
    // # With npm
    // npm install lovable-ui

    // # With yarn
    // yarn add lovable-ui
    // \`\`\`
    //       `,
    //       isLiveDemo: false,
    //     },
    //     {
    //       title: "Basic Usage",
    //       content: `
    // Import components from Lovable UI:
    //       `,
    //       code: `
    // import { Button, Card } from 'lovable-ui';

    // function App() {
    //   return (
    //     <div>
    //       <Card>
    //         <h2>Welcome to Lovable UI</h2>
    //         <p>This is a beautiful card component</p>
    //         <Button>Click me</Button>
    //       </Card>
    //     </div>
    //   );
    // }`,
    //       isLiveDemo: false,
    //     },
    //     {
    //       title: "Customization",
    //       content: `
    // Lovable UI components are highly customizable. You can override styles, extend functionality, and create your own themes:
    //       `,
    //       code: `
    // import { ThemeProvider, Button } from 'lovable-ui';

    // const myTheme = {
    //   colors: {
    //     primary: '#ff0088',
    //     secondary: '#121212',
    //     // ...other colors
    //   },
    //   // ...other theme properties
    // };

    // function App() {
    //   return (
    //     <ThemeProvider theme={myTheme}>
    //       <Button>Themed Button</Button>
    //     </ThemeProvider>
    //   );
    // }`,
    //       isLiveDemo: false,
    //     },
    //     {
    //       title: "Next Steps",
    //       content: `
    // Now that you've got the basics, check out our examples to see more complex use cases, or dive into our component documentation to learn about all available components and their props.

    // * [Animation Overview](/docs/animation-overview) - Learn about creating animations
    // * [Motion Component](/docs/components-motion) - Explore the core motion component
    // * [Gestures](/docs/animation-gestures) - Add interactive animations with gestures
    //       `,
    //       isLiveDemo: false,
    //     },
    //   ],
    sections: [
        {
            title: 'Work under Progress 🚧',
            content:
                'This section is under construction. Stay tuned for updates!',
            isLiveDemo: false,
        },
    ],
}

export default function GetStartedPage() {
    return <DocSection content={getStartedContent} />
}
