import clsx from 'clsx'
import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
    initialTime?: number // in seconds
    targetDateTime?: {
        date: string // dd-mm-yyyy
        time: string // hh-mm-ss (24h format)
    }
    onComplete?: () => void
    pixelSize?: number
    activeColor?: string
    inactiveColor?: string
    backgroundColor?: string
    showMilliseconds?: boolean
    autoStart?: boolean
    control?: boolean
    dark?: boolean
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
    initialTime = 300, // 5 minutes default
    targetDateTime,
    onComplete,
    pixelSize = 4,
    activeColor = '#ffffff',
    inactiveColor = '#333333',
    backgroundColor = '#000000',
    autoStart = true,
    control = false,
    dark = false,
}) => {
    // Calculate initial time left if targetDateTime is provided
    const calculateTimeLeftFromTarget = () => {
        if (!targetDateTime) return initialTime;
        
        // Parse the target date and time
        const [day, month, year] = targetDateTime.date.split('-').map(Number);
        const [hours, minutes, seconds] = targetDateTime.time.split('-').map(Number);
        
        // Create Date objects
        const targetDate = new Date(year, month - 1, day, hours, minutes, seconds);
        const now = new Date();
        
        // Calculate the difference in seconds
        const diffSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
        
        // Return the difference or 0 if it's negative (past date)
        return diffSeconds > 0 ? diffSeconds : 0;
    };
    
    const [timeLeft, setTimeLeft] = useState(targetDateTime ? calculateTimeLeftFromTarget() : initialTime)
    const [isRunning, setIsRunning] = useState(autoStart)

    // Digit patterns (7x5 pixel grid for each digit)
    const digitPatterns: { [key: string]: number[][] } = {
        '0': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        '1': [
            [0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
        ],
        '2': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 1, 1, 1, 1],
        ],
        '3': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        '4': [
            [0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
        ],
        '5': [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        '6': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        '7': [
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
        ],
        '8': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        '9': [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ],
        ':': [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ],
    }

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    // If using targetDateTime, recalculate remaining time on each tick
                    if (targetDateTime) {
                        const remainingTime = calculateTimeLeftFromTarget();
                        if (remainingTime <= 0) {
                            setIsRunning(false);
                            onComplete?.();
                            return 0;
                        }
                        return remainingTime;
                    } else {
                        // Original countdown logic for initialTime
                        if (prev <= 1) {
                            setIsRunning(false);
                            onComplete?.();
                            return 0;
                        }
                        return prev - 1;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval)
    }, [isRunning, timeLeft, onComplete, targetDateTime])

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        }
        return `${minutes.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`
    }

    const renderDigit = (digit: string, index: number) => {
        const pattern = digitPatterns[digit] || digitPatterns['0']

        return (
            <div key={index} className="inline-block mx-1">
                <div className="grid grid-cols-5 gap-0.5">
                    {pattern.map((row, rowIndex) =>
                        row.map((pixel, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="transition-all duration-200"
                                style={{
                                    width: `${pixelSize}px`,
                                    height: `${pixelSize}px`,
                                    backgroundColor: pixel
                                        ? dark
                                            ? activeColor
                                            : inactiveColor
                                        : dark
                                        ? inactiveColor
                                        : '#D7D7D7',
                                    borderRadius: '1px',
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        )
    }

    const timeString = formatTime(timeLeft)
    const digits = timeString.split('')

    const handleStart = () => setIsRunning(true)
    const handlePause = () => setIsRunning(false)
    const handleReset = () => {
        // Reset using the appropriate time source
        setTimeLeft(targetDateTime ? calculateTimeLeftFromTarget() : initialTime);
        setIsRunning(false);
    }

    const addTime = (seconds: number) => {
        setTimeLeft((prev) => prev + seconds)
    }

    return (
        <div className="flex flex-col items-center space-y-6 p-8">
            {/* Timer Display */}
            <div
                className={clsx(
                    "flex items-center justify-center px-8 py-6 rounded-3xl shadow-2xl",
                )}
                style={{
                    backgroundColor: dark ? backgroundColor : activeColor,
                    color: dark ? activeColor : inactiveColor,
                }}
            >
                <div className="flex items-center">
                    {digits.map((digit, index) => renderDigit(digit, index))}
                </div>
            </div>

            {/* Controls */}
            {control && (
                <>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {!isRunning ? (
                            <button
                                onClick={handleStart}
                                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg"
                            >
                                Start
                            </button>
                        ) : (
                            <button
                                onClick={handlePause}
                                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg"
                            >
                                Pause
                            </button>
                        )}

                        <button
                            onClick={handleReset}
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => addTime(60)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded font-medium transition-colors duration-200"
                        >
                            +1m
                        </button>
                        <button
                            onClick={() => addTime(300)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded font-medium transition-colors duration-200"
                        >
                            +5m
                        </button>
                        <button
                            onClick={() => addTime(-60)}
                            className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded font-medium transition-colors duration-200"
                        >
                            -1m
                        </button>
                    </div>

                    <div className="text-center text-gray-600">
                        <p className="text-sm">
                            Status:{' '}
                            <span className="font-medium">
                                {isRunning ? 'Running' : 'Paused'}
                            </span>
                        </p>
                        {timeLeft === 0 && (
                            <p className="text-red-500 font-bold mt-2 animate-pulse">
                                Time&apos;s Up!
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

// Demo component with multiple timer examples
const CountdownTimerDemo = () => {
    const [customTime, setCustomTime] = useState(180) // 3 minutes
    
    // Create a date 7 days in the future for demo
    const getFutureDate = () => {
        const future = new Date();
        future.setDate(future.getDate() + 7); // 7 days from now
        
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
    
    const targetDate = getFutureDate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">
                        Pixel Countdown Timer
                    </h1>
                    <p className="text-gray-300">
                        Classic digital display style countdown timers
                    </p>
                </div>

                {/* Main Timer */}
                <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-xl font-semibold text-white mb-6 text-center">
                        Main Timer
                    </h2>
                    <CountdownTimer
                        initialTime={300}
                        pixelSize={6}
                        onComplete={() => console.log('Timer completed!')}
                    />
                </div>

                {/* Custom Styled Timers */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">
                            Green Theme
                        </h3>
                        <CountdownTimer
                            initialTime={120}
                            pixelSize={5}
                            activeColor="#00ff00"
                            inactiveColor="#003300"
                            backgroundColor="#001100"
                            autoStart={false}
                        />
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">
                            Blue Theme
                        </h3>
                        <CountdownTimer
                            initialTime={60}
                            pixelSize={5}
                            activeColor="#00aaff"
                            inactiveColor="#001133"
                            backgroundColor="#000022"
                            autoStart={false}
                        />
                    </div>
                </div>

                {/* Large Display Timer */}
                <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h3 className="text-lg font-semibold text-white mb-6 text-center">
                        Large Display
                    </h3>
                    <CountdownTimer
                        initialTime={customTime}
                        pixelSize={8}
                        activeColor="#ff6b6b"
                        inactiveColor="#4a1a1a"
                        backgroundColor="#2d0d0d"
                        autoStart={false}
                    />

                    <div className="mt-6 text-center">
                        <input
                            type="number"
                            value={customTime}
                            onChange={(e) =>
                                setCustomTime(Number(e.target.value))
                            }
                            className="px-3 py-2 bg-gray-700 text-white rounded mr-2"
                            placeholder="Seconds"
                        />
                        <span className="text-gray-400 text-sm">
                            Set custom time (seconds)
                        </span>
                    </div>
                </div>

                {/* Target DateTime Timer */}
                <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h3 className="text-lg font-semibold text-white mb-6 text-center">
                        Countdown to Specific Date & Time
                    </h3>
                    <p className="text-center text-gray-400 mb-4">
                        Counting down to: {targetDate.date.replace(/-/g, '/')} at {targetDate.time.replace(/-/g, ':')}
                    </p>
                    <CountdownTimer
                        targetDateTime={targetDate}
                        pixelSize={6}
                        activeColor="#5e60ce"
                        inactiveColor="#22223b"
                        backgroundColor="#0f0e17"
                        onComplete={() => console.log('Target date reached!')}
                        control={true}
                    />
                </div>

                {/* Compact Timers */}
                <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-lg font-semibold text-white mb-6 text-center">
                        Compact Versions
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">
                                Pomodoro
                            </p>
                            <CountdownTimer
                                initialTime={1500} // 25 minutes
                                pixelSize={3}
                                activeColor="#ff4757"
                                inactiveColor="#2f1b14"
                                backgroundColor="#1a0d0a"
                                autoStart={false}
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">
                                Short Break
                            </p>
                            <CountdownTimer
                                initialTime={300} // 5 minutes
                                pixelSize={3}
                                activeColor="#2ed573"
                                inactiveColor="#0d2818"
                                backgroundColor="#0a1f12"
                                autoStart={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountdownTimerDemo
