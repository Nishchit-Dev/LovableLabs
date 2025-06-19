import { ParallaxDotBackground } from '../../../code/ParallaxDotBackground'

export const ParallaxDottedGridVaraint = () => {
    return (
        <>
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px]  border border-[#333]">
                <ParallaxDotBackground dark centered boxSize={36} full>
                    <p className="text-white"> Centered Text with Dark Bg</p>
                </ParallaxDotBackground>
            </div>
        </>
    )
}

export const ParallaxDottedGridVaraintOverlay = () => {
    return (
        <>
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px]  border border-[#333]">
                <ParallaxDotBackground dark centered boxSize={46} overlay full>
                    <p className="text-white">
                        {' '}
                        Centered Text with Overlay Dark Bg and Box size 46
                    </p>

                </ParallaxDotBackground>
            </div>
        </>
    )
}
