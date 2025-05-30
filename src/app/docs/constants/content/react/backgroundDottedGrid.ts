
import { DocContent } from '../../types'
import { BuildPrivewDottedGridSection } from '../Builds/BuildPrivewDottedGridBg'

export const backgroundsDottedGrid: DocContent = {
    title: 'Square Grid Background',
    description: 'Create elegant square grid backgrounds with Lovable UI',
    preview: BuildPrivewDottedGridSection(),
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
            title: 'Dotted Background',
            codeSrc: 'components/DottedBackground.tsx',
            code: `
import { cn } from '../utils/cn'

interface DottedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  full?: boolean // fills the screen
  centered?: boolean // centers children
  boxSize?: number // distance between dots
  dotSize?: number // size of each dot
  dotColor?: string // dot color (e.g., rgba(0,0,0,0.1))
}

export const DottedBackground: React.FC<DottedBackgroundProps> = ({
  children,
  className,
  full = false,
  centered = false,
  boxSize = 24,
  dotSize = 1,
  dotColor = 'rgba(0, 0, 0, 0.05)',
  ...props
}) => {
  return React.createElement(
    'div',
    {
      className: cn(
        'relative overflow-hidden rounded-md',
        full && 'min-h-screen w-full',
        centered && 'flex items-center justify-center',
        className
      ),
      ...props
    },
    [
      React.createElement('div', {
        key: 'bg',
        className: 'absolute inset-0 h-full w-full z-0 pointer-events-none',
        style: {
          backgroundImage: \`radial-gradient(\${dotColor} \${dotSize}px, transparent \${dotSize}px)\`,
          backgroundSize: \`\${boxSize}px \${boxSize}px\`
        }
      }),
      React.createElement('div', { key: 'content', className: 'relative z-10' }, children)
    ]
  )
}
`,
            isLiveDemo: false,
        },
    ],
}
