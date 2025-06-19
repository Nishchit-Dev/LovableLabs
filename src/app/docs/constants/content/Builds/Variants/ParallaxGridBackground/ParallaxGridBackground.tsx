import { ParallaxGridBackground } from '../../../code/ParallaxGridBackground'
export const ParallaxSquareGridVaraint = () => {
    return (
        <>
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px]  border border-[#333]">
                <ParallaxGridBackground dark centered boxSize={36} full>
                    <p className="text-white"> Centered Text with Dark Bg</p>
                </ParallaxGridBackground>
            </div>
        </>
    )
}

export const ParallaxSquareGridVaraintOverLay = () => {
    return (
        <>
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px]  border border-[#333]">
                <ParallaxGridBackground dark centered boxSize={46} overlay full>
                    <p className="text-white">
                        {' '}
                        Centered Text with Overlay Dark Bg and Box size 46
                    </p>
                </ParallaxGridBackground>
            </div>
        </>
    )
}
