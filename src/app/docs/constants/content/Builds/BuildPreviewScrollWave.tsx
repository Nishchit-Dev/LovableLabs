import React from 'react'
import { DottedBackground } from '../code/DottedBackground'
import { ScrollWaveform } from '../code/ScrollWave'

export const BuildPrivewScrollWaves = () => {
    // Example: Render the first section's code as a live preview if available
    // You may want to enhance this logic to support more complex previews
    // For now, this will render a static preview box

    // Placeholder preview: Replace with actual preview logic as needed
    return (
        <div className="mb-10">
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px]  border border-[#333] ">
                {/* Replace below with actual component preview */}

                <DottedBackground
                    className=" w-full min-h-[250px] rounded-lg bg-white"
                    centered
                    overlay
                >
                    <div className='flex justify-center items-center flex-col'>
                        <ScrollWaveform />
                        <p className="text-md text-black/70">
                            Drag ScrollBar and see the Magic
                        </p>
                    </div>
                </DottedBackground>
            </div>
        </div>
    )
}
