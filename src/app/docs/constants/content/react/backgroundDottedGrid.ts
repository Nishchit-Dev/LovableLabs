import { DocContent } from '../../types'
import { BuildPrivewDottedGridSection } from '../Builds/BuildPrivewDottedGridBg'
import {
    DottedBgVaraint,
    DottedBgVaraintOverLay,
} from '../Builds/Variants/DottedBackground/DottedBackground'

export const backgroundsDottedGridContent: DocContent = {
    title: 'Square Grid Background',
    description: 'Create elegant square grid backgrounds with lovablelabs UI',
    preview: BuildPrivewDottedGridSection(),
    sections: [
        {
            title: 'Install DottedGridContent',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add DottedBackground`,
            copy_event: 'Install DottedGridContent',
            isLiveDemo: false,
        },
        {
            title: 'Install Depsendencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge`,
            copy_event: 'Install Depsendencies - DottedBackground',
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
            copy_event: 'Add util file - DottedBackground',
            isLiveDemo: false,
        },
        {
            title: 'Dotted Background',
            codeSrc: 'components/DottedBackground.tsx',
            code: `import React from 'react'
import { cn } from '@/app/utils/cn'

interface DottedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    full?: boolean // fills the screen
    centered?: boolean // centers children
    boxSize?: number // distance between dots
    dotSize?: number // size of each dot
    dotColor?: string // dot color (e.g., rgba(0,0,0,0.1))
    overlay?: boolean
}
export const DottedBackground: React.FC<
    DottedBackgroundProps & { dark?: false | true }
> = ({
    children,
    className,
    full = false,
    overlay = false,
    centered = false,
    boxSize = 32,
    dotSize = 1.2,
    dotColor,
    dark = false,
    ...props
}) => {
    // Set default dotColor and overlay gradient based on theme
    const resolvedDotColor =
        dotColor || (dark ? 'rgba(255,255,255,0.16)' : 'var(--color-gray-300)')
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
            <div
                className="absolute inset-0 h-full w-full z-0 pointer-events-none"
                style={{
                    backgroundImage: \`radial-gradient(\${resolvedDotColor} \${dotSize}px, transparent \${dotSize}px)\`,
                    backgroundSize: \`\${boxSize}px \${boxSize}px\`,
                }}
            >
                {overlay && (
                    <div
                        className="flex flex-1 w-full h-full"
                        style={{
                            background: overlayGradient,
                        }}
                    />
                )}
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    )
}
`,
            copy_event: 'Dotted Background',
            isLiveDemo: false,
        },
    ],

    variantTab: [
        {
            preview: DottedBgVaraint(),
            title: 'Dark Varaint',
            codeSrc: 'Example',
            code: `<DottedBackground dark centered boxSize={36} full>
    <p className="text-white">
    Centered Text with Dark Bg
    </p>
</DottedBackground>`,
            isLiveDemo: false,
        },
        {
            preview: DottedBgVaraintOverLay(),
            title: 'Dark Varaint with Overlay',
            codeSrc: 'Example',
            code: `<DottedBackground dark centered boxSize={46} full overlay>
    <p className="text-white">
    Centered Text with Overlay Dark Bg and Box size 46
    </p>
</DottedBackground>`,
            isLiveDemo: false,
        },
    ],
    propsTab: [
        {
            name: 'children',
            type: 'React.ReactNode',
            description:
                'The content to be displayed inside the dotted background.',
        },
        {
            name: 'className',
            type: 'string',
            description: 'Additional CSS classes for the outer container.',
        },
        {
            name: 'full',
            type: 'boolean',
            default: 'false',
            description:
                'If true, the dotted background will fill the entire parent container.',
        },
        {
            name: 'fullscreen',
            type: 'boolean',
            default: 'false',
            description:
                'If true, the dotted background will fill the entire screen.',
        },
        {
            name: 'centered',
            type: 'boolean',
            default: 'false',
            description:
                'If true, the children will be centered inside the dotted background.',
        },
        {
            name: 'boxSize',
            type: 'number',
            default: '32',
            description:
                'The distance between each dot in the dotted background grid.',
        },
        {
            name: 'dotSize',
            type: 'number',
            default: '1.2',
            description: 'The size (diameter) of each dot.',
        },
        {
            name: 'dotColor',
            type: 'string',
            description:
                'The color of the dots. Defaults to a light gray or white based on the theme if not provided.',
        },
        {
            name: 'overlay',
            type: 'boolean',
            default: 'false',
            description:
                'If true, a radial gradient overlay will be applied on top of the dotted background.',
        },
        {
            name: 'dark',
            type: 'boolean',
            default: 'false',
            description: 'Enables dark mode styling for the dotted background.',
        },
    ],
}
