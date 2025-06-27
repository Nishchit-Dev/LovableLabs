
import { GridBackground } from '../code/GridBackground'

const TemplateBuildPreview = () => {
    return (
        <div className="mb-10">
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full overflow-hidden   border border-[#333] ">
                {/* Replace below with actual component preview */}
                <GridBackground
                    className=" rounded-lg bg-white w-full min-h-[250px]"
                    centered
                    overlay
                    // boxSize={options.boxSize}
                >
                    <div className="h-min w-min px-3 py-2 cursor-pointer bg-black/80 hover:shadow-2xl transition-all duration-600 ease-in-out  rounded-lg flex justify-center items-center">
                        <span className="flex justify-center items-center gap-4 text-center text-white whitespace-nowrap">
                            🚧 Coming Soon
                        </span>
                    </div>
                </GridBackground>
            </div>
        </div>
    )
}

export default TemplateBuildPreview
