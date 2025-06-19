import { DottedBackground } from '../../../code/DottedBackground'
import { cursorPresets, SpringCursor } from '../../../code/CursorFollow'

export const CursorDefault = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden">
            <SpringCursor
                key={JSON.stringify(cursorPresets.default)}
                variants={cursorPresets.default}
                velocityScale={true}
                maxScale={2}
                showTrail={true}
                className="bg-none cursor-none"
            >
                <DottedBackground full overlay centered boxSize={36}>
                    <div className="px-5 py-2 bg-pink-300 text-pink-900 rounded-lg opacity-80 hover:opacity-100  duration-300 ease-in-out hover:scale-105 transition-all shadow-lg">
                        Drag around to see Default Cursor
                    </div>
                </DottedBackground>
            </SpringCursor>
        </div>
    )
}

export const CursorMinimal = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden">
            <SpringCursor
                key={JSON.stringify(cursorPresets.minimal)}
                variants={cursorPresets.minimal}
                velocityScale={true}
                maxScale={2}
                showTrail={true}
                className="bg-none cursor-none absolute overflow-hidden"
            >
                <DottedBackground full overlay centered boxSize={36}>
                    <div className="px-5 py-2 bg-sky-300 text-sky-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                        Drag around to see Minimal Cursor
                    </div>
                </DottedBackground>
            </SpringCursor>
        </div>
    )
}

export const CursorNeon = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden">
            <SpringCursor
                key={JSON.stringify(cursorPresets.neon)}
                variants={cursorPresets.neon}
                velocityScale={true}
                maxScale={2}
                showTrail={true}
                className="bg-none cursor-none"
            >
                <DottedBackground full overlay centered boxSize={36}>
                    <div className="px-5 py-2 bg-green-300 text-green-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                        Drag around to see Neon Cursor
                    </div>
                </DottedBackground>
            </SpringCursor>
        </div>
    )
}
export const CursorElegant = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333]  overflow-hidden">
            <SpringCursor
                key={JSON.stringify(cursorPresets.elegant)}
                variants={cursorPresets.elegant}
                velocityScale={true}
                maxScale={2}
                showTrail={true}
                className="bg-none cursor-none"
            >
                <DottedBackground full overlay centered boxSize={36}>
                    <div className="px-5 py-2 text-violet-900 bg-violet-300 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                        Drag around to see Elegant Cursor
                    </div>
                </DottedBackground>
            </SpringCursor>
        </div>
    )
}
