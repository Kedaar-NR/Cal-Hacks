import React from 'react';

interface StatsProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
}

const Stats = ({ wpm, accuracy, timeLeft }: StatsProps) => {
  return (
    <div className="flex gap-12 text-xl bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col items-center">
        <span className="text-slate-800 text-4xl font-bold">{wpm}</span>
        <span className="text-slate-500 text-sm mt-2">WPM</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-slate-800 text-4xl font-bold">{accuracy}%</span>
        <span className="text-slate-500 text-sm mt-2">accuracy</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-slate-800 text-4xl font-bold">{timeLeft}</span>
        <span className="text-slate-500 text-sm mt-2">seconds</span>
      </div>
    </div>
  );
};

export default Stats;