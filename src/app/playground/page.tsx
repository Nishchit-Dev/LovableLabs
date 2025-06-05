/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoopBadge } from '../docs/constants/content/code/LoopBagdeAnimation'
import { DottedBackground } from '../docs/constants/content/code/DottedBackground'
import { GridBackground } from '../docs/constants/content/code/GridBackground'
import React from 'react'
import { DragableItem } from '../docs/constants/content/code/DragableContainer'
import Image from 'next/image'

const DevTools = () => (
    <div className="w-full h-screen flex justify-center items-center ">
        <DottedBackground full overlay centered boxSize={36}>
            {/* <LoopBadge /> */}
            <div className="realative top-1/4 left-1/4 text-center">
                <p className="text-5xl font-bold text-black/70 w-[650px]">
                    We are the creator of LovableLabs and you can{' '}
                    <span className=" text-violet-500">Drag us</span> around
                </p>
            </div>
            <DragableItem
                initialPosition={{ x: 120, y: -50 }}
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
                initialPosition={{ x: -120, y: 50 }}

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
)

export default DevTools
