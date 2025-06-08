import React from 'react'
import { GridBackground } from '../code/GridBackground'
import AnimatedBorder from '../code/AnimatedBorder'

export const BuildPreviewAnimatedBorder = () => {
    return (
        <div className="mb-10">
            <p className="text-2xl font-bold mb-3">Preview</p>
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[350px] w-full p-12"
                >
                    <div className="flex flex-col gap-8 justify-center items-center">
                        {/* Buttons in a row */}
                        <div className="flex flex-row gap-5 justify-center items-center">
                            {/* Standard button style */}
                            <AnimatedBorder
                                width={180}
                                height={50}
                                borderWidth={2}
                                contentBg="rgba(0, 0, 0, 1)"
                                contentClassName="flex items-center justify-center"
                                colors={['#8c80db', '#6a42c2', '#32247a', '#2b1c83', '#8b5dff']}
                                enableShadow={true}
                            >
                                <span className="text-white">Default Button</span>
                            </AnimatedBorder>

                            {/* Success variant */}
                            <AnimatedBorder
                                width={180}
                                height={50}
                                borderWidth={2}
                                contentBg="rgba(0, 0, 0, 1)"
                                contentClassName="flex items-center justify-center"
                                colors={['#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534']}
                                enableShadow={true}
                            >
                                <span className="text-green-400">Success</span>
                            </AnimatedBorder>

                            {/* Warning variant */}
                            <AnimatedBorder
                                width={180}
                                height={50}
                                borderWidth={2}
                                contentBg="rgba(0, 0, 0, 1)"
                                contentClassName="flex items-center justify-center"
                                colors={['#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e']}
                                enableShadow={true}
                            >
                                <span className="text-yellow-400">Warning</span>
                            </AnimatedBorder>
                        </div>

                        {/* Enhanced Card example */}
                        <AnimatedBorder
                            width={300}
                            height={200}
                        
                            borderWidth={3}
                            contentBg="rgba(0, 0, 0, 1)"
                            containerClassName="mt-2"
                            contentClassName="flex flex-col justify-between"
                            borderRadius={32}
                            contentPadding={6}
                            colors={['#ec4899', '#d946ef', '#a855f7', '#8b5cf6', '#6366f1']}
                            enableShadow={true}
                            shadowDirection='all'
                            shadowVariant="subtle"
                            hoverScale={1.03}
                            blurIntensity={10}
                            blurOpacity={0.7}
                        >
                            <div>
                                <h3 className="text-white text-lg font-bold mb-3">Card Title</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                                    <p className="text-gray-300 text-xs">High qulity border effects</p>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                                    <p className="text-gray-300 text-xs">Animation, transitions, hover & shadow effects</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    <p className="text-gray-300 text-xs">Customizable</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">New</span>
                                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full">
                                    Action
                                </button>
                            </div>
                        </AnimatedBorder>
                    </div>
                </GridBackground>
            </div>
        </div>
    )
}