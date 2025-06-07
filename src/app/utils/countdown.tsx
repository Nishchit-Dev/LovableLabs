import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date | string;
  className?: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = new Date(targetDate).getTime() - Date.now();
      const timeLeft: TimeLeft = {
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
      };
      return timeLeft;
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Then update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Add leading zeros to numbers below 10
  const addLeadingZero = (num: number) => num < 10 ? `0${num}` : num;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {timeLeft.days > 0 && (
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold bg-gray-800 text-white rounded-lg px-3 py-2">
            {addLeadingZero(timeLeft.days)}
          </span>
          <span className="text-sm text-gray-500 mt-1">Days</span>
        </div>
      )}
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold bg-gray-800 text-white rounded-lg px-3 py-2">
          {addLeadingZero(timeLeft.hours)}
        </span>
        <span className="text-sm text-gray-500 mt-1">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold bg-gray-800 text-white rounded-lg px-3 py-2">
          {addLeadingZero(timeLeft.minutes)}
        </span>
        <span className="text-sm text-gray-500 mt-1">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold bg-gray-800 text-white rounded-lg px-3 py-2">
          {addLeadingZero(timeLeft.seconds)}
        </span>
        <span className="text-sm text-gray-500 mt-1">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;