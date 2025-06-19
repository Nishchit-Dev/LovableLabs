import DraggableLiquidGlass from '../code/DraggableLiquidGlass'

export const BuildPrivewDraggableLiquidGlassEffect = () => {
    return (
        <div className="mb-10">
            <div className=" rounded-xl  flex items-center justify-center  h-full overflow-hidden   border border-[#333] ">
                {/* Replace below with actual component preview */}

                <iframe
                    src="https://pagemonks.vercel.app/"
                    title="Website Preview"
                    className="w-screen h-[120vh] rounded-lg border-none"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                ></iframe>
                <DraggableLiquidGlass />
            </div>
        </div>
    )
}
