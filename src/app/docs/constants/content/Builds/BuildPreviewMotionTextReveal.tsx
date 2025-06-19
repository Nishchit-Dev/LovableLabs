import React, { useState } from 'react'
import { ParallaxDotBackground } from '../code/ParallaxDotBackground'
import { MotionTextAnimation } from '../code/MotionTextReveal'
import { RefreshCw } from 'lucide-react'

export const BuildPreviewMotionTextRevealAnimationSection = () => {
    const [showPreview, setShowPreview] = useState(true)
    return (
        <div className="mb-10">
           
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] ">
                {/* Replace below with actual component preview */}

                <div className="w-full h-full relative">
                    <button
                        className="absolute bottom-4 right-4 z-10 px-2 py-2 bg-violet-300 text-violet-600 rounded-lg cursor-pointer hover:text-violet-800 transition"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <RefreshCw />
                    </button>
                    <ParallaxDotBackground full overlay centered boxSize={36}>
                        {
                            <MotionTextAnimation
                                usePhysics={true}
                                enableScale={false}
                                lines={[
                                    `We Don't just Design.`,
                                    `We Design with Soul.`,
                                ]}
                                dark
                                replay={showPreview}
                            />
                        }
                    </ParallaxDotBackground>
                </div>
            </div>
        </div>
    )
}
