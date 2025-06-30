import React from 'react'
import AnimatedBorder from '../../../code/AnimatedBorder'

export const BasicUsage = () => {
    return (
        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden bg-black">
            <AnimatedBorder>
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white font-medium">Animated Border</span>
                </div>
            </AnimatedBorder>
        </div>
    )
}

export const GradientBorder = () => {
    return (
        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden bg-black">
            <AnimatedBorder
                colors={['#8c80db', '#6a42c2', '#32247a', '#2b1c83', '#8b5dff', '#8c80db']}
                width={250}
                height={80}
                contentBg="rgba(20, 20, 30, 1)"
            >
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white font-medium">Gradient Border</span>
                </div>
            </AnimatedBorder>
        </div>
    )
}

export const CustomColors = () => {
    return (
        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden bg-black">
            <AnimatedBorder
                colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
                width={250}
                height={80}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white font-medium">Custom Colors</span>
                </div>
            </AnimatedBorder>
        </div>
    )
}

export const HoverEffect = () => {
    return (
        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden bg-black">
            <AnimatedBorder
                colors={['#8b5cf6', '#ec4899', '#06b6d4']}
                width={250}
                height={80}
                contentBg="rgba(20, 20, 30, 1)"
                enableHover={true}
                hoverScale={1.1}
                hoverBrighten={1.3}
                hoverSpeedMultiplier={2}
                hoverBlurIncrease={10}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white font-medium">Hover Effect</span>
                </div>
            </AnimatedBorder>
        </div>
    )
}

export const WithShadowEffect = () => {
    return (
        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden bg-black">
            <AnimatedBorder
                enableShadow={true}
                shadowVariant="glow"
                shadowDirection="all"
                colors={['#8b5cf6', '#ec4899', '#06b6d4']}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-white font-medium">Glowing Border</span>
                </div>
            </AnimatedBorder>
        </div>
    )
}

export const CardLayout = () => {
    return (
        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden bg-black">
            <AnimatedBorder
                width={300}
                height={200}
                borderRadius={16}
                contentBg="rgba(20, 20, 30, 1)"
                contentPadding={20}
                enableShadow={true}
                shadowVariant="medium"
                isCenterContent={true}
            >
                <div className="text-white text-center w-full">
                    <h3 className="text-xl font-bold mb-2">Premium Card</h3>
                    <p className="text-gray-300 text-sm">
                        This is a card with animated border and custom styling.
                    </p>
                </div>
            </AnimatedBorder>
        </div>
    )
}

export const ButtonVariant = () => {
    return (
        <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden bg-black">
            <div className="flex gap-6">
                <AnimatedBorder
                    width={145}
                    height={70}
                    borderRadius={25}
                    duration={2}
                    hoverScale={1.05}

                    colors={['#22c55e', '#16a34a', '#15803d']}
                    contentBg="rgba(20, 20, 20, 1)"
                    enableShadow={true}
                    shadowVariant="subtle"
                    shadowDirection="all"
                    blurIntensity={10}
                    isCenterContent={true}
                >
                    
                        <button className="text-white font-medium w-full h-full">
                            Success
                        </button>
                    
                </AnimatedBorder>

                <AnimatedBorder
                    width={145}
                    height={70}
                    borderRadius={25}
                    duration={2}
                    reverse={true}
                    hoverScale={1.05}
                    colors={['#ef4444', '#dc2626', '#b91c1c']}
                    contentBg="rgba(20, 20, 20, 1)"
                    enableShadow={true}
                    shadowVariant="subtle"
                    shadowDirection="all"
                    blurIntensity={10}
                    isCenterContent={true}
                >
                    <button className="text-white font-medium w-full h-full">
                        Danger
                    </button>
                </AnimatedBorder>
            </div>
        </div>
    )
} 