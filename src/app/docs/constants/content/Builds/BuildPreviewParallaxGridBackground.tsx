import React from 'react'
import { ParallaxGridBackground } from '../code/ParallaxGridBackground'

export const BuildPreviewParallaxGridBackground = () => {
    // Example: Render the first section's code as a live preview if available
    // You may want to enhance this logic to support more complex previews
    // For now, this will render a static preview box

    // Placeholder preview: Replace with actual preview logic as needed
    return (
        <div className="mb-10">
           
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px]  border border-[#333] ">
                {/* Replace below with actual component preview */}

                <ParallaxGridBackground
                    className=" w-full min-h-[350px] rounded-lg bg-white"
                    centered
                    overlay
                    boxSize={42}
                >
                    <div className="realative top-1/4 left-1/4 text-center">
                        <p className="text-4xl font-bold text-black/80">
                            Explore the Parallax Grid Background!
                        </p>
                        <p className="mt-2 text-lg text-black/60">
                            This interactive background adds depth and motion to your UI.
                        </p>
                    </div>
                </ParallaxGridBackground>
            </div>
        </div>
    )
}
