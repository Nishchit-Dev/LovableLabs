import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPreviewParallaxDotBackground } from '../Builds/BuildPreviewParallaxDotBackground'

export const backgroundParallaxDotContent: DocContent = {
    title: 'Parallax Dot Background',
    description:
        'Create stunning parallax dot backgrounds with Lovablelabs UI for a dynamic visual effect.',
    preview: BuildPreviewParallaxDotBackground(),
    releaseDate: releaseDate.parallaxDot,

    sections: [
        {
            title: 'Install Parallax Dot',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add ParallaxDotBackground`,
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
            codeSrc: 'components/ParallaxDotBackground.tsx',
            code: ``,
            isLiveDemo: false,
        },
    ],
}
