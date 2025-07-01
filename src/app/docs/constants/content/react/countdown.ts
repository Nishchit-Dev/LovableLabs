import React from 'react'
import { releaseDate } from '../../releaseDate/releaseDate'
import { DocContent } from '../../types'
import { BuildPreviewDotMatrixCountDown } from '../Builds/BuildPreviewDotMatrixCountdown'
import {
    DotMatrixCountdownDark,
    DotMatrixCountdownLight,
    DotMatrixCountdownWithTargetDate,
} from '../Builds/Variants/DotMatrixCountDown/DotMatrixCountDown'

export const dotMatrixCountdownContent: DocContent = {
    title: 'Dot Matrix Countdown Timer',
    description:
        'Build a stylish dot-matrix countdown timer using lovablelabs UI components.',
    preview: React.createElement(BuildPreviewDotMatrixCountDown),
    releaseDate: releaseDate.dotmatrixCountdown,
    sections: [
        {
            title: 'Install CountdownTimer',
            codeSrc: 'Terminal',
            code: `npx lovablelabs add DotMatrixCountdownTimer`,
            copy_event: 'Install CountdownTimer',
            isLiveDemo: false,
        },
        {
            title: 'Install Dependencies',
            codeSrc: 'Terminal',
            code: `npm i clsx tailwind-merge`,
            copy_event: 'Install Dependencies',
            isLiveDemo: false,
        },
        {
            title: 'Add Utility File',
            codeSrc: 'app/lib/utils/cn.ts',
            code: `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            copy_event: 'Add Utility File - DotMatrixCountdownTimer',
            isLiveDemo: false,
        },
        {
            title: 'Dot Matrix Countdown Timer',
            codeSrc: 'components/DotMatrixCountdownTimer.tsx',
            code: `
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
    
    const calculateTimeLeftFromTarget = () => {
        if (!targetDateTime) return initialTime;

        const [day, month, year] = targetDateTime.date.split('-').map(Number);
        const [hours, minutes, seconds] = targetDateTime.time.split('-').map(Number);
        
        const targetDate = new Date(year, month - 1, day, hours, minutes, seconds);
        const now = new Date();
        
        const diffSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
        
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
            return \`\${hours.toString().padStart(2, '0')}:\${minutes
                .toString()
                .padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`
        }
        return \`\${minutes.toString().padStart(2, '0')}:\${secs
            .toString()
            .padStart(2, '0')}\`
    }

    const renderDigit = (digit: string, index: number) => {
        const pattern = digitPatterns[digit] || digitPatterns['0']

        return (
            <div key={index} className="inline-block mx-1">
                <div className="grid grid-cols-5 gap-0.5">
                    {pattern.map((row, rowIndex) =>
                        row.map((pixel, colIndex) => (
                            <div
                                key={\`\${rowIndex}-\${colIndex}\`}
                                className="transition-all duration-200"
                                style={{
                                    width: \`\${pixelSize}px\`,
                                    height: \`\${pixelSize}px\`,
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
            
`,
            copy_event: 'Dot Matrix Countdown Timer',
            isLiveDemo: false,
        },
        {
            title: 'Using with Target Date and Time',
            codeSrc: 'components/TargetDateCountdown.tsx',
            code: `
import React from 'react';
import { CountdownTimer } from './DotMatrixCountdownTimer';

export default function TargetDateExample() {
  // Example target date format: 
  // { date: "dd-mm-yyyy", time: "hh-mm-ss" } (24h format)
  const targetDateTime = {
    date: "31-12-2024", // December 31, 2024
    time: "23-59-59"    // 11:59:59 PM
  };
  
  return (
    <div className="p-8 flex justify-center">
      <CountdownTimer
        targetDateTime={targetDateTime}
        pixelSize={6}
        activeColor="#5e60ce"
        inactiveColor="#22223b"
        backgroundColor="#0f0e17"
        onComplete={() => alert('Happy New Year!')}
        control={true}
      />
    </div>
  );
}`,
            copy_event: 'Target Date Countdown Example',
            isLiveDemo: false,
        },
    ],
    variantTab: [
        {
            preview: React.createElement(DotMatrixCountdownLight),
            title: 'Light CountdownTimer',
            codeSrc: 'Terminal',
            code: `<CountdownTimer
initialTime={450000}
pixelSize={6}
onComplete={() => console.log('Timer completed!')} />`,
            copy_event: 'Light CountdownTimer',
            isLiveDemo: false,
        },
        {
            preview: React.createElement(DotMatrixCountdownDark),
            title: 'Dark CountdownTimer',
            codeSrc: 'Terminal',
            code: `<CountdownTimer
initialTime={100520}
pixelSize={6}
dark
onComplete={() => console.log('Timer completed!')} />`,
            copy_event: 'Dark CountdownTimer',
            isLiveDemo: false,
        },
        {
            preview: React.createElement(DotMatrixCountdownWithTargetDate),
            title: 'With Target Date',
            codeSrc: 'Terminal',
            code: `<CountdownTimer
targetDateTime={{
  date: "02-12-2025", // December 2, 2025
  time: "13-00-00"    // 01:00:00 PM
}}
pixelSize={6}
activeColor="#5e60ce"
inactiveColor="#22223b"
backgroundColor="#0f0e17"
onComplete={() => console.log('Target date reached!')} />`,
            copy_event: 'Target Date CountdownTimer',
            isLiveDemo: false,
        },
    ],
    propsTab: [
        {
            name: 'initialTime',
            type: 'number',
            default: '300',
            description:
                'The initial countdown time in seconds (default is 300 seconds, i.e., 5 minutes).',
        },
        {
            name: 'targetDateTime',
            type: 'object',
            description: 
                'An object with date and time for countdown: { date: "dd-mm-yyyy", time: "hh-mm-ss" } (24h format). Overrides initialTime if provided.',
        },
        {
            name: 'onComplete',
            type: 'function',
            description:
                'Callback function that gets called when the timer reaches zero.',
        },
        {
            name: 'pixelSize',
            type: 'number',
            default: '4',
            description: 'The size of each pixel for the digital display.',
        },
        {
            name: 'activeColor',
            type: 'string',
            default: '#ffffff',
            description:
                'The color of the active pixels (when the digit is on).',
        },
        {
            name: 'inactiveColor',
            type: 'string',
            default: '#333333',
            description:
                'The color of the inactive pixels (when the digit is off).',
        },
        {
            name: 'backgroundColor',
            type: 'string',
            default: '#000000',
            description: 'The background color of the timer.',
        },
        {
            name: 'showMilliseconds',
            type: 'boolean',
            description: 'If true, the timer will display milliseconds.',
        },
        {
            name: 'autoStart',
            type: 'boolean',
            default: 'true',
            description:
                'If true, the timer starts automatically when the component mounts.',
        },
        {
            name: 'control',
            type: 'boolean',
            default: 'false',
            description:
                'If true, control buttons like start, pause, and reset will be displayed.',
        },
        {
            name: 'dark',
            type: 'boolean',
            default: 'false',
            description:
                'If true, the timer will use dark mode styling (background and pixel colors).',
        },
    ],
}
