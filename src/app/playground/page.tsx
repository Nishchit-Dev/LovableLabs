import React from 'react'
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
                    backgroundImage: `linear-gradient(to right,#80808012 1px,transparent 1px),linear-gradient(to bottom,#80808012 1px,transparent 1px)`,
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
              <GridBackground full centered className="" boxSize={42} >
                  <div className="h-10 w-20 bg-blue-500 rounded-lg flex justify-center items-center">
                      <p className="text-center text-white">Button</p>
                  </div>
              </GridBackground>
          )
        : () => <div>404 | Not Found</div>

export default DevTools
