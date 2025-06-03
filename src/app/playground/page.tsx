import { CircularAnimation } from '../docs/constants/content/code/circularAnimation'

const DevTools =
    process.env.NODE_ENV === 'development'
        ? () => (
              <div className='w-full h-screen flex justify-center items-center'>
                  <CircularAnimation />
              </div>
          )
        : () => <div>404 | Not Found</div>

export default DevTools
