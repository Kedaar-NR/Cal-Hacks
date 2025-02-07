import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { calculateWPM, calculateAccuracy } from "@/lib/metrics";
import { Timer } from "@/components/Timer";
import { TypingMetrics } from "@/components/TypingMetrics";
import { TypingText } from "@/components/TypingText";
import { sampleTexts } from "@/lib/texts";

export const TypingTest = () => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    if (isStarted && !isFinished) {
      intervalRef.current = setInterval(() => {
        const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
        if (elapsed >= duration) {
          finishTest();
        } else {
          setCurrentTime(elapsed);
        }
      }, 100);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStarted, startTime, isFinished, duration]);

  const startTest = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setIsFinished(false);
    setInput("");
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    inputRef.current?.focus();
  };

  const finishTest = () => {
    setIsFinished(true);
    setIsStarted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const wpm = calculateWPM(input, currentTime);
    const accuracy = calculateAccuracy(text.slice(0, input.length), input);
    toast({
      title: "Test Complete!",
      description: `WPM: ${wpm} | Accuracy: ${accuracy}%`,
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    
    if (!isStarted && newInput.length === 1) {
      startTest();
    }
    
    if (newInput === text) {
      finishTest();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && e.getModifierState("Shift")) {
        e.preventDefault();
        startTest();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Timer
          duration={duration}
          currentTime={currentTime}
          isStarted={isStarted}
        />
        <Button
          onClick={startTest}
          variant="outline"
          className="text-primary-foreground hover:text-primary-foreground"
        >
          restart test
        </Button>
      </div>

      <TypingMetrics
        input={input}
        text={text}
        currentTime={currentTime}
        isStarted={isStarted}
      />

      <div className="relative">
        <TypingText
          text={text}
          input={input}
          isFinished={isFinished}
        />
        <input
          ref={inputRef}
          value={input}
          onChange={handleInput}
          className="absolute inset-0 opacity-0 cursor-default"
          autoFocus
        />
      </div>

      <div className="text-sm text-muted-foreground text-center">
        {!isStarted ? "Start typing to begin the test" : ""}
        {isFinished ? "Test complete! Click restart to try again" : ""}
      </div>
    </div>
  );
};