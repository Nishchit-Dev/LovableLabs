import { GridBackground } from '../code/GridBackground'

export const BuildPrivewSqaureGridSection = () => {
    // Example: Render the first section's code as a live preview if available
    // You may want to enhance this logic to support more complex previews
    // For now, this will render a static preview box

    // Placeholder preview: Replace with actual preview logic as needed

    return (
        <div className="mb-10">
            <p className="text-2xl font-bold mb-3">Preview</p>
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-full overflow-hidden   border border-[#333] ">
                {/* Replace below with actual component preview */}
                <GridBackground
                    className=" rounded-lg bg-white w-full min-h-[250px]"
                    centered
                    overlay
                    // boxSize={options.boxSize}
                >
                    <div className="h-min w-min px-3 py-2 cursor-pointer bg-blue-500 hover:shadow-2xl transition-all duration-600 ease-in-out shadow-blue-400 rounded-lg flex justify-center items-center">
                        <p className="text-center text-white">Preview</p>
                    </div>
                </GridBackground>
            </div>
        </div>
    )
}
