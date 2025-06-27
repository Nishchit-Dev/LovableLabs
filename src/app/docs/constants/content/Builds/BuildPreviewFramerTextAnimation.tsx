import React from 'react'
import { GridBackground } from '../code/GridBackground'
import { AnimatedText } from '../code/FramerTextAnimation'

export const BuildPreviewFramerTextAnimation = () => {
    return (
        <div className="mb-10">
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[250px]  border border-[#333] ">
                <GridBackground full overlay centered boxSize={36}>
                    <AnimatedText
                        animation="wave"
                        className="text-2xl font-bold text-black/70"
                    >
                        Our eyes follow your every move
                    </AnimatedText>
                </GridBackground>
            </div>
        </div>
    )
}
