/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircularAnimation } from '../docs/constants/content/code/CircularAnimation'
import { DottedBackground } from '../docs/constants/content/code/DottedBackground'
import { GridBackground } from '../docs/constants/content/code/GridBackground'

const DevTools = () => (
    <div className="w-full h-screen flex justify-center items-center ">
        <GridBackground full overlay centered boxSize={36} dark>
            <CircularAnimation />
        </GridBackground>
    </div>
)

export default DevTools
