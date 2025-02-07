import React from "react";

interface TestMetricsProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
}

const TestMetrics = ({ wpm, accuracy, timeLeft }: TestMetricsProps) => {
  return (
    <div className="flex justify-center gap-8 mb-8 p-4 bg-opacity-10 bg-primary rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-mono">{wpm}</div>
        <div className="text-sm text-neutral">WPM</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-mono">{accuracy.toFixed(1)}%</div>
        <div className="text-sm text-neutral">Accuracy</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-mono">{timeLeft}s</div>
        <div className="text-sm text-neutral">Time</div>
      </div>
    </div>
  );
};

export default TestMetrics;