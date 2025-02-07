import React from "react";
import { calculateWPM, calculateAccuracy } from "@/lib/metrics";

interface TypingMetricsProps {
  input: string;
  text: string;
  currentTime: number;
  isStarted: boolean;
}

export const TypingMetrics: React.FC<TypingMetricsProps> = ({
  input,
  text,
  currentTime,
  isStarted,
}) => {
  const wpm = calculateWPM(input, currentTime);
  const accuracy = calculateAccuracy(text.slice(0, input.length), input);

  return (
    <div className="flex justify-center space-x-8">
      <div className="text-center">
        <div className="text-3xl font-mono font-medium">{isStarted ? wpm : 0}</div>
        <div className="text-sm text-muted-foreground">WPM</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-mono font-medium">
          {isStarted ? accuracy : 100}%
        </div>
        <div className="text-sm text-muted-foreground">Accuracy</div>
      </div>
    </div>
  );
};