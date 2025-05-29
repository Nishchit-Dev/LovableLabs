import { DocContent } from '../../types'
import { BuildPrivewSqaureGridSection } from '@/app/docs/components/DocSection'

export const backgroundsSquareGrid: DocContent = {
    title: 'Square Grid Background',
    description: 'Create elegant square grid backgrounds with Lovable UI',
    preview: BuildPrivewSqaureGridSection(),
    sections: [
        {
            title: 'Install Depsendencies',
            codeSrc: 'Terminal',
            code: `npm i motion clsx tailwind-merge`,
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
            isLiveDemo: false,
        },
        {
            title: 'Square Grid Background',
            codeSrc: 'components/GridSquareBackground.tsx',
            code: `import React from 'react'
import { cn } from '../utils/cn'

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  full?: boolean // fills the screen
  centered?: boolean // centers children
}
export const GridBackground: React.FC<GridBackgroundProps & { boxSize?: number }> = ({
  children,
  className,
  full = false,
  centered = false,
  boxSize = 24,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md',
        full && 'min-h-screen w-full',
        centered && 'flex items-center justify-center',
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 h-full w-full bg-white z-0 pointer-events-none"
        style={{
          backgroundImage: \`linear-gradient(to right,#80808012 1px,transparent 1px),linear-gradient(to bottom,#80808012 1px,transparent 1px)\`,
          backgroundSize: \`\${boxSize}px \${boxSize}px\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}`,
            isLiveDemo: false,
        },
    ],
}
