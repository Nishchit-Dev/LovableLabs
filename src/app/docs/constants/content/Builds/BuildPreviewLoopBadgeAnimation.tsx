import React from 'react'
import { LoopBadge } from '../code/LoopBadge'
import { GridBackground } from '../code/GridBackground'

export const BuildPreviewLoopBadgeAnimationSection = () => {
    // Example: Render the first section's code as a live preview if available
    // You may want to enhance this logic to support more complex previews
    // For now, this will render a static preview box

    // Placeholder preview: Replace with actual preview logic as needed
    return (
        <div className="mb-10">
           
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full border border-[#333] ">
                {/* Replace below with actual component preview */}

                <GridBackground full overlay centered boxSize={36} >
                    <LoopBadge />
                </GridBackground>
            </div>
        </div>
    )
}
