

import React, { useState } from 'react'
import { GridBackground } from '../code/GridBackground'
import CurtainTransition from '../code/CurtainTransition'

export const BuildPreviewCurtainTransition = () => {
    const [showTransition, setShowTransition] = useState(false);
    
    const handleToggleTransition = () => {
        setShowTransition(true);
        // Reset after animation completes
        setTimeout(() => {
            setShowTransition(false);
        }, 3500); // Duration + animation time
    };
    
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[350px] w-full p-12 relative overflow-hidden"
                >
                    {/* Container for the curtain transition effect */}
                    <div className="w-full h-full relative overflow-hidden rounded-xl">
                        {showTransition && (
                            <CurtainTransition
                                title="Curtain Effect"
                                titleColor="text-blue-400"
                                titleSize="text-3xl md:text-5xl"
                                duration={1500}
                                curtainColor="bg-black"
                                animationStyle="slide-up"
                            >
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-3 text-indigo-600">Curtain Transition</h3>
                                        <p className="text-sm text-gray-600">This transition is contained within this box</p>
                                    </div>
                                </div>
                            </CurtainTransition>
                        )}
                        
                        {!showTransition && (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-3 text-indigo-600">Curtain Transition</h3>
                                    <p className="text-sm text-gray-600 mb-4">This transition is contained within this box</p>
                                    <button
                                        onClick={handleToggleTransition}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-200"
                                    >
                                        Show Transition
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </GridBackground>
            </div>
        </div>
    );
}

 