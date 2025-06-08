import React from 'react'
import { GridBackground } from '../code/GridBackground'
import { CountdownTimer } from '../code/DotMatrixCountdownTimer'

export const BuildPreviewDotMatrixCountDown = () => {
    return (
        <div className="mb-10">
            <p className="text-2xl font-bold mb-3">Preview</p>
            <div className="rounded-xl p-6 flex items-center justify-center  h-full border border-[#333]">
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
                     <CountdownTimer
                        initialTime={100520}
                        pixelSize={6}
                        dark
                        onComplete={() => console.log('Timer completed!')}
                    />
                    <p className='text-black/70 text-center'>Day  :  Hour  :  Second </p>
                </GridBackground>
            </div>
        </div>
    )
}
