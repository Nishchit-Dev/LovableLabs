import React from 'react'
import { GridBackground } from '../code/GridBackground'
import { CountdownTimer } from '../code/DotMatrixCountdownTimer'

export const BuildPreviewDotMatrixCountDown = () => {
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
                    <CountdownTimer
                        initialTime={450000}
                        pixelSize={6}
                        onComplete={() => console.log('Timer completed!')}
                    />
                </GridBackground>
            </div>
        </div>
    )
}
