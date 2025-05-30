'use client'

export default function Home() {
    return (
        <div className="h-full">
            <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative ">
                {/* <div
                    className="w-full h-full absolute"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 30% at bottom, #F9F9FB 100%,transparent 100%)',
                    }}
                ></div>{' '} */}
                <div className="w-full absolute h-full xl:h-full lg:h-[80%] md:h-[60%] bottom-0">
                    <div
                        className="w-full h-full absolute  "
                        style={{
                            background:
                                'radial-gradient(ellipse 100% 100% at bottom, #000000 100%)',
                        }}
                    ></div>
                    <div
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 50% 70% at bottom,#32247A 95%, transparent 140%,transparent 60%,transparent 80%)',
                        }}
                    ></div>{' '}
                    <div
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 40% 80% at bottom, #2B1C83 70%, transparent 125%)',
                        }}
                    ></div>{' '}
                    <div
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 30% 60% at bottom, #8C80DB 80%, transparent 135%)',
                        }}
                    ></div>
                    <div
                        className="w-full h-full absolute"
                        style={{
                            background:
                                'radial-gradient(ellipse 20% 40% at bottom, #F9F9FB 50%,transparent 120%)',
                        }}
                    ></div>{' '}
                </div>

                <p className="text-center z-10 text-5xl font-extrabold text-white">
                    Build Beautiful UI - Faster
                </p>
            </div>
        </div>
    )
}
