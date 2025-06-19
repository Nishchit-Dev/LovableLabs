import React from 'react'
import { DottedBackground } from '../code/DottedBackground'
import { DragableItem } from '../code/DragableContainer'
import Image from 'next/image'

export const BuildPreivewDraggableContainer = () => {
    // Example: Render the first section's code as a live preview if available
    // You may want to enhance this logic to support more complex previews
    // For now, this will render a static preview box

    // Placeholder preview: Replace with actual preview logic as needed
    return (
        <div className="mb-10">
           
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] ">
                {/* Replace below with actual component preview */}

                <DottedBackground full overlay centered boxSize={36}>
                    {/* <LoopBadge /> */}
                    <div className='realative top-1/4 left-1/4 text-center'>
                        <p className="text-5xl font-bold text-black/70">
                            We are the creator of LovableLabs and you can <span className=' text-violet-500'>Drag us</span> around
                        </p>
                    </div>
                    <DragableItem
                        initialPosition={{ x: 500, y: -100 }}
                        className="h-[60px] w-[60px]  rounded-full"
                    >
                        <div className="flex items-center flex-col gap-2">
                            <Image
                                src={'/assets/memoji/memoji_black.png'}
                                width={60}
                                height={60}
                                alt=""
                                className="bg-violet-100  rounded-full border-1 border-violet-300 "
                            />
                            <p className="text-black/70">0xHet</p>
                        </div>
                    </DragableItem>

                    <DragableItem
                        friction={0.42}
                        bounciness={0.7}
                        snapToGrid={20}
                        initialPosition={{ x: 120, y: 120 }}
                        className=" h-[60px] w-[60px] rounded-full"
                    >
                        <div className="flex items-center flex-col gap-2 ">
                            <Image
                                src={'/assets/memoji/memoji_yellow.png'}
                                width={60}
                                height={60}
                                alt=""
                                className="bg-violet-100  rounded-full border-1 border-violet-300"
                            />
                            <p className="text-black/70">0xNishchit</p>
                        </div>
                    </DragableItem>
                </DottedBackground>
            </div>
        </div>
    )
}
