import { GridBackground } from '../../../code/GridBackground'

export const SquareGridVaraint = () => {
    return (
        <>
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px]  border border-[#333]">
                <GridBackground dark centered boxSize={36} full>
                    <p className="text-white"> Centered Text with Dark Bg</p>
                </GridBackground>
            </div>
        </>
    )
}

export const SquareGridVaraintOverLay = () => {
    return (
        <>
            <div className="rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px]  border border-[#333]">
                <GridBackground dark centered boxSize={46} overlay full>
                    <p className="text-white">
                        {' '}
                        Centered Text with Overlay Dark Bg and Box size 46
                    </p>
                </GridBackground>
            </div>
        </>
    )
}
