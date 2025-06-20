'use client'

import React, { Suspense } from 'react'
import DocSection from '../components/DocSection'
import { DocContent } from '../constants'

// Create a DocContent object for the getting started page
const getStartedContent: DocContent = {
    title: 'Get Started',
    description:
        'Lovablelabs UI is a modern, customizable React component library. This guide walks you through installation and basic usage.',
    sections: [
        {
            title: 'Install via NPM',
            content: 'Begin by installing Lovablelabs UI using npm:',
            isLiveDemo: false,
            code: `# With npm
npm install lovablelabs`,
            codeSrc: 'Terminal',
            copy_event: 'Install via NPM - Get Started',
        },
        {
            title: 'Install Specific Components',
            content:
                'You can install only the components you need. For example, to add just the Button component:',
            isLiveDemo: false,
            code: `# With npm
npx lovablelabs add --component`,
            codeSrc: 'Terminal',
            copy_event: 'Install Specific Components - Get Started',
        },
        {
            title: 'Try a Component Example',
            content:
                'Here&apos;s how to quickly install and experiment with a component:',
            isLiveDemo: false,
            code: `# With npm
npx lovablelabs add GridBackground`,
            codeSrc: 'Terminal',
            copy_event: 'Try a Component Example - Get Started',
        },
        {
            title: 'Explore Further',
            content: `Now that you&apos;re set up, explore our examples for advanced usage, or browse the documentation for details on all components and their props.

* [Animated Component](/docs/loopbadge-animation?framework=react) - Explore the core motion component
* [Background Overview](/docs/backgrounds-squaregrid?framework=react) - Learn about background for your website.
* [CountDown Timer](/docs/dot-martix-countdown?framework=react) - Add interactive animations with gestures.
`,
            isLiveDemo: false,
        },
    ],
}

function GetStartedContent() {
    return <DocSection content={getStartedContent} />
}

export default function GetStartedPage() {
    return (
        <Suspense fallback={<div className="animate-pulse p-8">Loading...</div>}>
            <GetStartedContent />
        </Suspense>
    )
}
