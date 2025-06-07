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
    fullscreen?: boolean // full screen
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
    fullscreen = false,
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
                full && 'h-full w-full',
                fullscreen && 'min-h-screen w-screen',
                centered && 'flex items-center justify-center',
                dark ? 'bg-black' : 'bg-white',
                className
            )}
            {...props}
        >
            <div
                className="absolute inset-0 h-full w-full z-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(${resolvedDotColor} ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${boxSize}px ${boxSize}px`,
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
