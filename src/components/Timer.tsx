import React from "react";

interface TimerProps {
  duration: number;
  currentTime: number;
  isStarted: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  duration,
  currentTime,
  isStarted,
}) => {
  const timeLeft = Math.max(0, duration - currentTime);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  return (
    <div className="text-2xl font-mono font-medium">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};