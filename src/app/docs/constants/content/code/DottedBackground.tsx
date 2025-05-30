import React from 'react'
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

export const DottedBackground: React.FC<DottedBackgroundProps> = ({
    children,
    className,
    full = false,
    overlay = false,
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
