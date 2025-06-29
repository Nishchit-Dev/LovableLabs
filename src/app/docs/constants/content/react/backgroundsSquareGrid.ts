import { DocContent } from '../../types'
import { BuildPrivewSqaureGridSection } from '../Builds/BuildPrivewSqaureGridBg'
import {
    SquareGridVaraint,
    SquareGridVaraintOverLay,
} from '../Builds/Variants/SquareGrid/SquareGrid'

export const backgroundsSquareGridContent: DocContent = {
    title: 'Square Grid Background',
    description: 'Create elegant square grid backgrounds with lovablelabs UI',
    preview: BuildPrivewSqaureGridSection(),
    sections: [
        {
            title: 'Install GridBackground',
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
            title: 'Square Grid Background',
            codeSrc: 'components/GridSquareBackground.tsx',
            code: `import React from 'react'
import { cn } from '@/app/utils/cn'

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    full?: boolean // fills the screen
    centered?: boolean // centers children
    overlay?: boolean // show radial overlay
}

export const GridBackground: React.FC<
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
            <div
                className="absolute inset-0 h-full w-full z-0 pointer-events-none"
                style={{
                    backgroundImage: \`linear-gradient(to right,\${resolvedDotColor} 1px,transparent 1px),linear-gradient(to bottom,\${resolvedDotColor} 1px,transparent 1px)\`,
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
            copy_event: 'Square Grid Background',
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
    propsTab:[
  {
    "name": "children",
    "type": "React.ReactNode",
    "description": "The content to be displayed inside the grid background."
  },
  {
    "name": "className",
    "type": "string",
    "description": "Additional CSS classes for the outer container."
  },
  {
    "name": "full",
    "type": "boolean",
    "default": "false",
    "description": "If true, the grid will fill the entire parent container."
  },
  {
    "name": "fullscreen",
    "type": "boolean",
    "default": "false",
    "description": "If true, the grid will fill the entire screen."
  },
  {
    "name": "centered",
    "type": "boolean",
    "default": "false",
    "description": "If true, the children will be centered inside the grid."
  },
  {
    "name": "overlay",
    "type": "boolean",
    "default": "false",
    "description": "If true, a radial gradient overlay will be applied on top of the grid."
  },
  {
    "name": "boxSize",
    "type": "number",
    "default": "24",
    "description": "The size of each box in the grid background."
  },
  {
    "name": "dark",
    "type": "boolean",
    "default": "false",
    "description": "Enables dark mode styling for the grid background."
  }
]

}
