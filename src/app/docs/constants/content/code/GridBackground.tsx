import React from 'react'
import { cn } from '@/app/utils/cn'

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    full?: boolean // fills the screen
    centered?: boolean // centers children
    overlay?: boolean // show radial overlay
}

export const GridBackground: React.FC<
    GridBackgroundProps & { boxSize?: number }
> = ({
    children,
    className,
    full = false,
    centered = false,
    overlay = false,
    boxSize = 24,
    ...props
}) => {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-md',
                full && 'min-h-screen w-full',
                centered && 'flex items-center justify-center',
                'bg-white',
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
            >
                {overlay && (
                    <div
                        className="flex flex-1 w-full h-full"
                        style={{
                            background:
                                'radial-gradient(ellipse, transparent 40%, white 90%, white 95%)',
                        }}
                    />
                )}
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    )
}
