import { CircularAnimation } from '../docs/constants/content/code/circularAnimation'
import { DottedBackground } from '../docs/constants/content/code/DottedBackground'

const DevTools = () => (
    <div className="w-full h-screen flex justify-center items-center ">
        <DottedBackground full overlay centered  >
            <CircularAnimation />
        </DottedBackground>
    </div>
)

export default DevTools
