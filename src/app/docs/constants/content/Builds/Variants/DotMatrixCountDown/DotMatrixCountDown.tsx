import React from 'react'
import { GridBackground } from '../../../code/GridBackground'
import { CountdownTimer } from '../../../code/DotMatrixCountdownTimer'

// Helper function to get a future date for demo
const getFutureDate = (daysAhead = 7) => {
    const future = new Date();
    future.setDate(future.getDate() + daysAhead);
    
    const day = future.getDate().toString().padStart(2, '0');
    const month = (future.getMonth() + 1).toString().padStart(2, '0');
    const year = future.getFullYear();
    
    const hours = future.getHours().toString().padStart(2, '0');
    const minutes = future.getMinutes().toString().padStart(2, '0');
    const seconds = future.getSeconds().toString().padStart(2, '0');
    
    return {
        date: `${day}-${month}-${year}`,
        time: `${hours}-${minutes}-${seconds}`
    };
};

export const DotMatrixCountdownLight = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center  h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[350px] w-full p-12"
                >
                    <CountdownTimer
                        initialTime={450000}
                        pixelSize={6}
                        onComplete={() => console.log('Timer completed!')}
                    />

                    <p className="text-black/70 text-center">
                        Hour : Minute : Second{' '}
                    </p>
                </GridBackground>
            </div>
        </div>
    )
}

export const DotMatrixCountdownDark = () => {
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center  h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[350px] w-full p-12"
                >
                    <CountdownTimer
                        initialTime={100520}
                        pixelSize={6}
                        dark
                        onComplete={() => console.log('Timer completed!')}
                    />
                    <p className="text-black/70 text-center">
                        Hour : Minute : Second{' '}
                    </p>
                </GridBackground>
            </div>
        </div>
    )
}

export const DotMatrixCountdownWithTargetDate = () => {
    const targetDate = getFutureDate(4); 
    
    return (
        <div className="mb-10">
            <div className="rounded-xl p-6 flex items-center justify-center h-full border border-[#333]">
                <GridBackground
                    full
                    overlay
                    centered
                    boxSize={36}
                    className="min-h-[350px] w-full p-12"
                >
                    <CountdownTimer
                        targetDateTime={targetDate}
                        pixelSize={6}
                        activeColor="#5e60ce"
                        inactiveColor="#22223b"
                        backgroundColor="#0f0e17"
                        onComplete={() => console.log('Target date reached!')}
                    />
                    <p className="text-black/70 text-center">
                        Counting to: {targetDate.date.replace(/-/g, '/')} {targetDate.time.replace(/-/g, ':')}
                    </p>
                </GridBackground>
            </div>
        </div>
    )
}
