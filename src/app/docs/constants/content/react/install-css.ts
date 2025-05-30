import { DocContent } from '../../types'

// Tailwind CSS Setup Guide for React Projects
export const InstallTailwindCss: DocContent = {
    title: 'Setting Up Tailwind CSS in Your Project',
    description: `Tailwind CSS generates utility-first styles by scanning your source files for class names and compiling them into a single CSS file. It’s efficient, highly customizable, and doesn’t require any runtime code.`,
    sections: [
        {
            title: 'Install the Required Packages',
            description: 'Use npm to add Tailwind CSS and the Vite plugin for Tailwind.',
            content: '',
            code: `npm install tailwindcss @tailwindcss/vite`,
            codeSrc: 'Terminal',
            isLiveDemo: false,
        },
        {
            title: 'Set Up the Vite Plugin',
            description: `Include the Tailwind plugin in your Vite configuration to enable automatic style generation.`,
            content: '',
            code: `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})`,
            codeSrc: 'vite.config.js',
            isLiveDemo: false,
        },
        {
            title: 'Link Tailwind in Your CSS',
            description: `Import Tailwind's base styles in your project's main stylesheet to activate the utility classes.`,
            content: '',
            code: `@import "tailwindcss";`,
            codeSrc: 'CSS',
            isLiveDemo: false,
        },
        {
            title: 'Launch the Dev Server',
            description: `Start your development environment using the standard npm script to see Tailwind in action.`,
            content: '',
            code: `npm run dev`,
            codeSrc: 'Terminal',
            isLiveDemo: false,
        },
        {
            title: 'Apply Tailwind Classes in in your CODE',
            description: `Ensure the compiled CSS is loaded on your page. Once set up, you can begin using Tailwind utility classes directly in your markup.`,
            content: '',
            code: `<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/styles.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>`,
            codeSrc: 'Html',
            isLiveDemo: false,
        },
    ],
}
