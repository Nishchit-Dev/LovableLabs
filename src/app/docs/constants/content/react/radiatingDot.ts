import React from 'react'
import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPreviewRadiatingDotAnimation } from '../Builds/BuildPreviewRadiatingDot'

export const radiatingDotContent: DocContent = {
    title: 'Radiating Dot',

    description: 'Create elegant square grid backgrounds with lovablelabs UI',
    preview: React.createElement(BuildPreviewRadiatingDotAnimation),
    isLock: true,
    releaseDate: releaseDate.radiatingDot,
    sections: [
        {
            title: 'Install RadiatingDot',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add RadiatingDot`,
            isLiveDemo: false,
        },
        {
            title: 'Install Depsendencies',
            codeSrc: 'Terminal',
            code: `npm i framer-motion clsx tailwind-merge`,
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
            title: 'Radiating Dot',
            codeSrc: 'components/RadiatingDot.tsx',
            code: `

'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface RadiatingDotProps {
    // Text content
    text?: string

    // Status configuration
    isOnline?: boolean

    // Appearance customization
    size?: 'sm' | 'md' | 'lg'
    variant?: 'subtle' | 'prominent' | 'minimal'
    dotColor?: string
    backgroundColor?: string
    textColor?: string
    borderColor?: string

    // Animation configuration
    pulseIntensity?: number
    pulseDuration?: number
    pulseDelay?: number
    fadeInDuration?: number

    // Layout
    dotPosition?: 'left' | 'right'
    className?: string

    // Interaction
    onClick?: () => void
    disabled?: boolean
}

export const RadiatingDot: React.FC<RadiatingDotProps> = ({
    text = 'Online',
    isOnline = true,
    size = 'md',
    variant = 'subtle',
    dotColor,
    backgroundColor,
    textColor,
    borderColor,
    pulseIntensity = 2.5,
    pulseDuration = 2.5,
    pulseDelay = 0,
    fadeInDuration = 0.6,
    dotPosition = 'left',
    className = '',
    onClick,
    disabled = false,
}) => {
    // Size configurations
    const sizeConfig = {
        sm: {
            container: 'px-3 py-1.5 text-xs',
            dot: 'w-1.5 h-1.5',
            gap: 'mr-1.5',
        },
        md: {
            container: 'px-4 py-2 text-sm',
            dot: 'w-2 h-2',
            gap: 'mr-2',
        },
        lg: {
            container: 'px-5 py-2.5 text-base',
            dot: 'w-2.5 h-2.5',
            gap: 'mr-2.5',
        },
    }

    // Variant configurations
    const variantConfig = {
        subtle: {
            bg: backgroundColor || 'bg-white',
            text: textColor || 'text-black/70',
            border: borderColor || 'border-black/10',
            shadow: 'shadow-sm',
        },
        prominent: {
            bg: backgroundColor || 'bg-gradient-to-r from-white to-gray-50',
            text: textColor || 'text-black/80',
            border: borderColor || 'border-black/20',
            shadow: 'shadow-md',
        },
        minimal: {
            bg: backgroundColor || 'bg-transparent',
            text: textColor || 'text-black/60',
            border: borderColor || 'border-transparent',
            shadow: '',
        },
    }

    const currentSize = sizeConfig[size]
    const currentVariant = variantConfig[variant]

    // Animation variants
    const containerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: 5,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: fadeInDuration,
                ease: [0.25, 0.25, 0, 1],
            },
        },
    }

    const pulseVariants = {
        pulse: {
            scale: [1, pulseIntensity, 0],
            opacity: [0.8, 0.3, 0],
            transition: {
                duration: pulseDuration,
                repeat: Infinity,
                delay: pulseDelay,
                ease: [0.25, 0.25, 0, 1],
            },
        },
    }

    const staticDotVariants = {
        online: {
            scale: [0.8, 1, 0.8],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
        offline: {
            scale: 1,
            opacity: 0.5,
        },
    }

    const getStatusColor = () => {
        if (dotColor) return dotColor
        return isOnline ? 'bg-emerald-400' : 'bg-gray-400'
    }

    const dotContent = (
        <div
            className={\`relative flex items-center justify-center \${
                dotPosition === 'right' ? 'ml-2' : currentSize.gap
            }\`}
        >
            {/* Animated pulse ring */}
            {isOnline && (
                <motion.div
                    className={\`absolute \${
                        currentSize.dot
                    } \${getStatusColor()} rounded-full opacity-75\`}
                    variants={pulseVariants}
                    animate="pulse"
                />
            )}

            {/* Static dot */}
            <motion.div
                className={\`\${
                    currentSize.dot
                } \${getStatusColor()} rounded-full relative z-10\`}
                variants={staticDotVariants}
                animate={isOnline ? 'online' : 'offline'}
            />
        </div>
    )

    return (
        <motion.div
            className={\`
        flex items-center justify-center
        \${currentSize.container}
        \${currentVariant.bg}
        \${currentVariant.text}
        \${currentVariant.border}
        \${currentVariant.shadow}
        border rounded-full
        \${
            onClick && !disabled
                ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                : ''
        }
        \${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        transition-all duration-200
        \${className}
      \`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onClick={onClick && !disabled ? onClick : undefined}
            whileHover={
                onClick && !disabled
                    ? {
                          scale: 1.02,
                          transition: { duration: 0.2 },
                      }
                    : undefined
            }
            whileTap={
                onClick && !disabled
                    ? {
                          scale: 0.98,
                          transition: { duration: 0.1 },
                      }
                    : undefined
            }
        >
            {dotPosition === 'left' && dotContent}

            <span className="font-medium select-none">{text}</span>

            {dotPosition === 'right' && dotContent}
        </motion.div>
    )
}


`,
            isLiveDemo: false,
        },
    ],
}
