import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import TemplateBuildPreview from '../Builds/BuildComponent.template copy'


export const backgroundParallaxGridContent: DocContent = {
    title: 'name of component',
    description:
        'Create stunning parallax grid backgrounds with Lovablelabs UI for a dynamic visual effect.',
    preview: TemplateBuildPreview(),
    releaseDate: releaseDate.template,

    sections: [
        {
            title: 'Install --name',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add --component`,
            copy_event: 'Install --name',
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i --dependencies`,
            copy_event: 'Install Dependencies - ParallaxGridBackground',
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
            copy_event: 'Add Utility File - ParallaxGridBackground',
            isLiveDemo: false,
        },
        {
            title: '--name of component',
            codeSrc: 'components/--componentFile.tsx',
            code: ``,
            copy_event: 'Parallax Grid Background',
            isLiveDemo: false,
        },
    ],
    variantTab: [
        {
            preview: TemplateBuildPreview(),
            title: '--varaint 1',
            codeSrc: 'Example',
            code: `--varaint code 1`,
            isLiveDemo: false,
        },
        {
            preview: TemplateBuildPreview(),
            title: '--varaint 2',
            codeSrc: 'Example',
            code: `--varaint code 2`,
            isLiveDemo: false,
        },
    ],
}
