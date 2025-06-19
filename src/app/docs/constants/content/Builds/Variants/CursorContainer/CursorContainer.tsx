import { DottedBackground } from '../../../code/DottedBackground'
import { cursorPresets, SpringCursor } from '../../../code/CursorFollow'

export const CursorDefault = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden">
            <DottedBackground full overlay centered boxSize={36}>
                <SpringCursor
                    key={JSON.stringify(cursorPresets.default)}
                    variants={cursorPresets.default}
                    velocityScale={true}
                    maxScale={2}
                    showTrail={true}
                    className="bg-none cursor-none overflow-hidden"
                >
                    <div>
                        <p>Default Cusor</p>
                    </div>
                </SpringCursor>
            </DottedBackground>
        </div>
    )
}

export const CursorMinimal = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden">
            <DottedBackground full overlay centered boxSize={36}>
                <SpringCursor
                    key={JSON.stringify(cursorPresets.minimal)}
                    variants={cursorPresets.minimal}
                    velocityScale={true}
                    maxScale={2}
                    showTrail={true}
                    className="bg-none cursor-none"
                >
                    <div>
                        <p>Cursor Minimal</p>
                    </div>
                </SpringCursor>
            </DottedBackground>
        </div>
    )
}

export const CursorNeon = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden">
            <DottedBackground full overlay centered boxSize={36}>
                <SpringCursor
                    key={JSON.stringify(cursorPresets.neon)}
                    variants={cursorPresets.neon}
                    velocityScale={true}
                    maxScale={2}
                    showTrail={true}
                    className="bg-none cursor-none"
                >
                    <div>
                        <p>Cursor Neon</p>
                    </div>
                </SpringCursor>
            </DottedBackground>
        </div>
    )
}
export const CursorElegant = () => {
    // Use a key to force remount when config changes
    return (
        <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333]  overflow-hidden">
            <DottedBackground full overlay centered boxSize={36}>
                <SpringCursor
                    key={JSON.stringify(cursorPresets.elegant)}
                    variants={cursorPresets.elegant}
                    velocityScale={true}
                    maxScale={2}
                    showTrail={true}
                    className="bg-none cursor-none"
                >
                    <div>
                        <p>Cursor elegant</p>
                    </div>
                </SpringCursor>
            </DottedBackground>
        </div>
    )
}
