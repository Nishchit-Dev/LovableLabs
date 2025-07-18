import { DocContent } from '../../types'
import TemplateBuildPreview from '../Builds/BuildComponent.template copy'
import {
    SquareGridVaraint,
    SquareGridVaraintOverLay,
} from '../Builds/Variants/SquareGrid/SquareGrid'

export const comingSoonContent: DocContent = {
    title: 'Coming soon',
    isComingSoon: true,
    description: 'Create elegant square grid backgrounds with lovablelabs UI',
    preview: TemplateBuildPreview(),
    sections: [
        {
            title: 'Install Component',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add GridBackground`,
            copy_event: 'Install GridBackground',
            isLiveDemo: false,
        },
        {
            title: 'Install Depsendencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge`,
            copy_event: 'Install Depsendencies - GridBackground',
            isLiveDemo: false,
        },
        {
            title: 'Add util file ',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            copy_event: 'Add util file - GridBackground',
            isLiveDemo: false,
        },
        {
            title: 'Component',
            codeSrc: 'components/Component.tsx',
            code: `import React from 'react'
import { cn } from '@/app/utils/cn'

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    full?: boolean // fills the screen
    centered?: boolean // centers children
    overlay?: boolean // show radial overlay
}

export const Component: React.FC<
    GridBackgroundProps & { boxSize?: number } & { dark?: false | true }
> = ({
    children,
    className,
    full = false,
    centered = false,
    overlay = false,
    boxSize = 24,
    dark = false,
    ...props
}) => {
    // Set default dotColor and overlay gradient based on theme

    const resolvedDotColor = dark
        ? 'rgba(255,255,255,0.04)'
        : 'var(--color-gray-200)'
    const overlayGradient = dark
        ? 'radial-gradient(ellipse, transparent 40%, #000 90%, #000 95%)'
        : 'radial-gradient(ellipse, transparent 40%, white 90%, white 95%)'
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-md',
                full && 'min-h-screen w-full',
                centered && 'flex items-center justify-center',
                dark ? 'bg-black' : 'bg-white',
                className
            )}
            {...props}
        >
    ......       
`,
            copy_event: 'Coming soon',
            isLiveDemo: false,
        },
    ],
    variantTab: [
        {
            preview: SquareGridVaraint(),
            title: 'Dark Varaint',
            codeSrc: 'Example',
            code: `<GridBackground dark centered boxSize={36} full>
    <p className="text-white">
    Centered Text with Dark Bg
    </p>
</GridBackground>`,
            isLiveDemo: false,
        },
        {
            preview: SquareGridVaraintOverLay(),
            title: 'Dark Varaint with Overlay',
            codeSrc: 'Example',
            code: `<GridBackground dark centered boxSize={46} full overlay>
    <p className="text-white">
    Centered Text with Overlay Dark Bg and Box size 46
    </p>
</GridBackground>`,
            isLiveDemo: false,
        },
    ],
}
