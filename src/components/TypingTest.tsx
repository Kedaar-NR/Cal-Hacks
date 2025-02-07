import React, { useState, useEffect, useCallback } from "react";
import TestMetrics from "./TestMetrics";
import TypingArea from "./TypingArea";
import TestModeSelector from "./TestModeSelector";

export type TestMode = "30s" | "1min";

const TypingTest = () => {
  const [mode, setMode] = useState<TestMode>("30s");
  const [isTestActive, setIsTestActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);

  const startTest = useCallback(() => {
    setIsTestActive(true);
    setTimeLeft(mode === "30s" ? 30 : 60);
    setWpm(0);
    setAccuracy(100);
  }, [mode]);

  useEffect(() => {
    let timer: number;
    if (isTestActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const updateMetrics = useCallback((newWpm: number, newAccuracy: number) => {
    setWpm(newWpm);
    setAccuracy(newAccuracy);
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">TypeMaster</h1>
        <TestModeSelector mode={mode} onModeChange={setMode} />
        <TestMetrics wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />
        <TypingArea
          isActive={isTestActive}
          onStart={startTest}
          onMetricsUpdate={updateMetrics}
          timeLeft={timeLeft}
        />
      </div>
    </div>
  );
};

export default TypingTest;