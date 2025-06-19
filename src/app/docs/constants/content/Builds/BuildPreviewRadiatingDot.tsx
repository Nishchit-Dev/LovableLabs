import React from 'react'
import { GridBackground } from '../code/GridBackground'
import { RadiatingDot } from '../code/RadiatingDot'

export const BuildPreviewRadiatingDotAnimation = () => {
    // Example: Render the first section's code as a live preview if available
    // You may want to enhance this logic to support more complex previews
    // For now, this will render a static preview box

    // Placeholder preview: Replace with actual preview logic as needed
    return (
        <div className="mb-10">
           
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px]  h-full border border-[#333] ">
                {/* Replace below with actual component preview */}

                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[350px] w-full p-20"
                >
                    <div className="flex flex-wrap flex-row gap-5 justify-center items-center">
                        <RadiatingDot text="Offline" isOnline={false} />
                        <RadiatingDot text="Online" isOnline={true} />
                        <RadiatingDot
                            text="Away"
                            isOnline={true}
                            dotColor="bg-yellow-400"
                        />
                        <RadiatingDot
                            text="Busy"
                            isOnline={true}
                            dotColor="bg-red-400"
                        />
                        <RadiatingDot
                            text="Custom Blue"
                            dotColor="bg-blue-400"
                            backgroundColor="bg-blue-50"
                            textColor="text-blue-900"
                            borderColor="border-blue-200"
                        />
                        <RadiatingDot
                            text="Custom Purple"
                            dotColor="bg-purple-400"
                            backgroundColor="bg-purple-50"
                            textColor="text-purple-900"
                            borderColor="border-purple-200"
                        />
                        <RadiatingDot
                            text="Custom Orange"
                            dotColor="bg-orange-400"
                            backgroundColor="bg-orange-50"
                            textColor="text-orange-900"
                            borderColor="border-orange-200"
                        />
                    </div>
                </GridBackground>
            </div>
        </div>
    )
}
