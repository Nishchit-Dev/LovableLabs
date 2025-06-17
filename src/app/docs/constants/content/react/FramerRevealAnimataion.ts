import { DocContent } from '../../types'
import { BuildPrivewSqaureGridSection } from '../Builds/BuildPrivewSqaureGridBg'

export const backgroundsSquareGridContent: DocContent = {
    title: 'Framer Text Reveal',
    description: 'Create stunning text reveal animations using Framer Motion with lovablelabs UI.',
    preview: BuildPrivewSqaureGridSection(),
    sections: [
        {
            title: 'Install Framer Text Reveal',
            codeSrc: 'Terminal',
            code: `npx install lovablelabs add FramerTextReveal`,
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge`,
            isLiveDemo: false,
        },
        {
            title: 'Add util file',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            isLiveDemo: false,
        },
        {
            title: 'Framer Text Reveal',
            codeSrc: 'components/FramerTextReveal.tsx',
            code: `   
`,
            isLiveDemo: false,
        },
    ],
}
