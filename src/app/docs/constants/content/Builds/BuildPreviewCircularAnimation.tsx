import React from 'react'
import { CircularAnimation } from '../code/CircularAnimation'
import { GridBackground } from '../code/GridBackground'

export const BuildPreviewCircularAnimationSection = () => {
    // Example: Render the first section's code as a live preview if available
    // You may want to enhance this logic to support more complex previews
    // For now, this will render a static preview box

    // Placeholder preview: Replace with actual preview logic as needed
    return (
        <div className="mb-10">
            <p className="text-2xl font-bold mb-3">Preview</p>
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333] ">
                {/* Replace below with actual component preview */}

                <GridBackground full overlay centered boxSize={36} >
                    <CircularAnimation />
                </GridBackground>
            </div>
        </div>
    )
}
