import React, { useState, useEffect, useCallback } from "react";

interface TypingAreaProps {
  isActive: boolean;
  onStart: () => void;
  onMetricsUpdate: (wpm: number, accuracy: number) => void;
  timeLeft: number;
}

const sampleText = "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Technology is best when it brings people together.";

const TypingArea = ({ isActive, onStart, onMetricsUpdate, timeLeft }: TypingAreaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);

  const calculateMetrics = useCallback(() => {
    if (!startTime) return;
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = currentIndex / 5; // approximate words
    const wpm = Math.round(wordsTyped / timeElapsed);
    const accuracy = 100 - (errors.size / currentIndex) * 100;
    
    onMetricsUpdate(wpm, accuracy);
  }, [currentIndex, errors, startTime, onMetricsUpdate]);

  useEffect(() => {
    if (isActive) {
      calculateMetrics();
    }
  }, [isActive, calculateMetrics]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isActive || timeLeft === 0) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (e.key === sampleText[currentIndex]) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setErrors((prev) => new Set(prev).add(currentIndex));
    }
  }, [isActive, currentIndex, timeLeft, startTime]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handleKeyPress]);

  const renderText = () => {
    return sampleText.split("").map((char, index) => {
      let className = "font-mono text-lg";
      
      if (index === currentIndex) {
        className += " bg-secondary bg-opacity-50 animate-blink";
      } else if (index < currentIndex) {
        className += errors.has(index) ? " text-error" : " text-success";
      } else {
        className += " text-neutral";
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="bg-background bg-opacity-50 p-8 rounded-lg border border-primary border-opacity-20">
      {!isActive ? (
        <button
          onClick={onStart}
          className="w-full py-4 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start Typing Test
        </button>
      ) : (
        <div className="min-h-[200px] leading-relaxed tracking-wide">
          {renderText()}
        </div>
      )}
    </div>
  );
};

export default TypingArea;