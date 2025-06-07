/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { LoopBadge } from '../docs/constants/content/code/LoopBadge'
import { DottedBackground } from '../docs/constants/content/code/DottedBackground'
import { GridBackground } from '../docs/constants/content/code/GridBackground'
import React, { useEffect, useState } from 'react'
import { DragableItem } from '../docs/constants/content/code/DragableContainer'
import Image from 'next/image'
import {
    cursorPresets,
    SpringCursor,
} from '../docs/constants/content/code/CursorFollow'

const SpringFollowCursorDevMode = () => {
    const [config, setConfig] = useState(cursorPresets.default)

    // Use a key to force remount when config changes
    return (
        <SpringCursor
            key={JSON.stringify(config)}
            variants={config}
            velocityScale={true}
            maxScale={2}
            showTrail={true}
            className="bg-none cursor-none"
        >
            <div className="flex justify-center items-center flex-col gap-10">
                {/* <LoopBadge /> */}
                <div className="realative top-1/4 left-1/4 text-center">
                    <p className="text-5xl font-bold text-black/70 w-[650px]">
                        Our eyes follow your every
                        <span className=" text-violet-500"> move</span> 👀
                    </p>
                </div>

                <div>
                    <div className="flex flex-row gap-5">
                        <div
                            className="px-5 py-2 bg-pink-300 text-pink-900 rounded-lg opacity-80 hover:opacity-100  duration-300 ease-in-out hover:scale-105 transition-all shadow-lg"
                            onClick={() => {
                                setConfig(cursorPresets.default)
                            }}
                        >
                            Default
                        </div>
                        <div
                            className="px-5 py-2 bg-sky-300 text-sky-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
                            onClick={() => {
                                if (config != cursorPresets.minimal) {
                                    setConfig(cursorPresets.minimal)
                                }
                            }}
                        >
                            Minimal
                        </div>
                        <div
                            className="px-5 py-2 bg-green-300 text-green-900 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
                            onClick={() => {
                                if (config != cursorPresets.neon) {
                                    setConfig(cursorPresets.neon)
                                }
                            }}
                        >
                            Neon
                        </div>
                        <div
                            className="px-5 py-2 text-violet-900 bg-violet-300 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 shadow-lg"
                            onClick={() => {
                                if (config != cursorPresets.elegant) {
                                    setConfig(cursorPresets.elegant)
                                }
                            }}
                        >
                            Elegant
                        </div>
                    </div>
                </div>
            </div>
        </SpringCursor>
    )
}

const DevTools = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center cursor-none">
            <DottedBackground full overlay centered boxSize={36}>
                <SpringFollowCursorDevMode />
            </DottedBackground>
        </div>
    )
}

export default DevTools
