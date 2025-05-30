import { GridBackground } from "../docs/constants/content/code/GridBackground"


const DevTools =
    process.env.NODE_ENV === 'development'
        ? () => (
              <GridBackground full centered className="bg-white" overlay boxSize={42}>
                  <div className="h-10 w-20 bg-blue-500 rounded-lg flex justify-center items-center bg-wh">
                      <p className="text-center text-white">Button</p>
                  </div>
              </GridBackground>
          )
        : () => <div>404 | Not Found</div>

export default DevTools
