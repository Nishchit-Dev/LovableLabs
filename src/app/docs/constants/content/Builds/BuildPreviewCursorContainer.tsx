'use client'
import { useState } from 'react'
import { cursorPresets, SpringCursor } from '../code/CursorFollow'
import { DottedBackground } from '../code/DottedBackground'

export const BuildSpringCursorContainer = () => {
    const [config, setConfig] = useState(cursorPresets.default)
    // Use a key to force remount when config changes
    return (
        <div className="mb-10">
            <div className=" rounded-xl p-6 flex items-center justify-center max-h-[420px] h-[420px] border border-[#333] overflow-hidden">
                <SpringCursor
                    key={JSON.stringify(config)}
                    variants={config}
                    velocityScale={true}
                    maxScale={2}
                    showTrail={true}
                    className="bg-none cursor-none h-full w-full"
                >
                    <DottedBackground full  overlay centered boxSize={36}>
                        <div className="flex justify-center items-center flex-col gap-10">
                            {/* <LoopBadge /> */}
                            <div className="realative top-1/4 left-1/4 text-center">
                                <p className="text-5xl font-bold text-black/70 w-[650px]">
                                    Our eyes follow your every
                                    <span className=" text-violet-500">
                                        {' '}
                                        move
                                    </span>{' '}
                                    👀
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
                                            if (
                                                config != cursorPresets.minimal
                                            ) {
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
                                            if (
                                                config != cursorPresets.elegant
                                            ) {
                                                setConfig(cursorPresets.elegant)
                                            }
                                        }}
                                    >
                                        Elegant
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DottedBackground>
                </SpringCursor>
            </div>
        </div>
    )
}
