import React from 'react'
import { cn } from '../utils/cn'

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    full?: boolean // fills the screen
    centered?: boolean // centers children
}
export const GridBackground: React.FC<
    GridBackgroundProps & { boxSize?: number }
> = ({
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
                className="absolute inset-0 h-full w-full z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right,#80808016 1px,transparent 1px),linear-gradient(to bottom,#80808016 1px,transparent 1px)`,
                    backgroundSize: `${boxSize}px ${boxSize}px`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    )
}

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
    boxSize = 32,
    dotSize = 1.2,
    dotColor = 'var(--color-gray-300)',
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
                className="absolute inset-0 h-full w-full z-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${boxSize}px ${boxSize}px`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    )
}

const DevTools =
    process.env.NODE_ENV === 'development'
        ? () => (
              <DottedBackground
                  full
                  centered
                  className="bg-white"
              >
                  <div className="h-10 w-20 bg-blue-500 rounded-lg flex justify-center items-center bg-wh">
                      <p className="text-center text-white">Button</p>
                  </div>
              </DottedBackground>
          )
        : () => <div>404 | Not Found</div>

export default DevTools
