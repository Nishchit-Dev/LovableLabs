import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPreviewParallaxGridBackground } from '../Builds/BuildPreviewParallaxGridBackground'

export const backgroundParallaxGridContent: DocContent = {
    title: 'Parallax Grid Background',
    description:
        'Create stunning parallax grid backgrounds with Lovablelabs UI for a dynamic visual effect.',
    preview: BuildPreviewParallaxGridBackground(),
    releaseDate: releaseDate.parallaxGrid,

    sections: [
        {
            title: 'Install Parallax Grid',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add ParallaxGrid`,
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i framer-motion clsx tailwind-merge`,
            isLiveDemo: false,
        },
        {
            title: 'Add Utility File',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            isLiveDemo: false,
        },
        {
            title: 'Parallax Grid Background',
            codeSrc: 'components/ParallaxGridBackground.tsx',
            code: ``,
            isLiveDemo: false,
        },
    ],
}
