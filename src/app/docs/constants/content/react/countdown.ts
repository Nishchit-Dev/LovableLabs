import React from 'react'
import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPreviewDotMatrixCountDown } from '../Builds/BuildPreviewDotMatrixCountdown'


export const dotMatrixCountdownContent: DocContent = {
    title: 'Dot Matrix Countdown Timer',
    description:
        'Build a stylish dot-matrix countdown timer using lovablelabs UI components.',
    preview: React.createElement(BuildPreviewDotMatrixCountDown),
    releaseDate: releaseDate.dotmatrixCountdown,
    sections: [
        {
            title: 'Install CountdownTimer',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add DotMatrixCountdownTimer`,
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge`,
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
            title: 'Dot Matrix Countdown Timer',
            codeSrc: 'components/DotMatrixCountdownTimer.tsx',
            code: `
            
`,
            isLiveDemo: false,
        },
    ],
}
