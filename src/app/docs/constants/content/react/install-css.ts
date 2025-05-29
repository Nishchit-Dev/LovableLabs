import { DocContent } from '../../types'

// Blur Text Animation content for React
export const InstallTailwindCss: DocContent = {
    title: 'Get started with Tailwind CSS',
    description: `Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. It's fast, flexible, and reliable — with zero-runtime.`,
    sections: [
        {
            title: 'Install Tailwind CSS',
            description: 'Install tailwindcss and @tailwindcss/vite via npm.',
            content: '',
            code: `npm install tailwindcss @tailwindcss/vite`,
            codeSrc: 'Terminal',
            isLiveDemo: false,
        },
        {
            title: 'Configure the Vite plugin',
            description:
                'Add the @tailwindcss/vite plugin to your Vite configuration.',
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
            title: 'Import Tailwind CSS',
            description:
                'Add an @import to your CSS file that imports Tailwind CSS.',
            content: '',
            code: `@import "tailwindcss";`,
            codeSrc: 'CSS',
            isLiveDemo: false,
        },
        {
            title: 'Start your build process',
            description:
                'Run your build process with npm run dev or whatever command is configured in your package.json file.',
            content: '',
            code: `npm run dev`,
            codeSrc: 'Terminal',
            isLiveDemo: false,
        },
        {
            title: 'Start using Tailwind in your HTML',
            description:
                'Make sure your compiled CSS is included in the <head> (your framework might handle this for you), then start using Tailwind’s utility classes to style your content.',
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
