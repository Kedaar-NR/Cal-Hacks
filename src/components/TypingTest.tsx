import React, { useEffect, useRef, useState } from 'react';
import { useTypingStore } from '../store/useTypingStore';
import { calculateWPM, calculateAccuracy, cn } from '../lib/utils';
import { Timer, RefreshCw, Settings } from 'lucide-react';

const sampleText = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are often used to display font samples and test keyboards and printers.`;

export function TypingTest() {
  const {
    mode,
    text,
    input,
    isStarted,
    isFinished,
    startTime,
    wpm,
    accuracy,
    errors,
    setText,
    setInput,
    startTest,
    finishTest,
    resetTest,
    updateStats,
  } = useTypingStore();

  const [timeLeft, setTimeLeft] = useState(
    mode === '30s' ? 30 : mode === '1min' ? 60 : mode === '2min' ? 120 : 60
  );
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(sampleText);
  }, [setText]);

  useEffect(() => {
    if (isStarted && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted, isFinished, timeLeft, finishTest]);

  useEffect(() => {
    if (isStarted && startTime) {
      const currentErrors = input.split('').reduce((acc, char, i) => {
        return acc + (char !== text[i] ? 1 : 0);
      }, 0);

      const currentWPM = calculateWPM(
        input.length,
        currentErrors,
        (Date.now() - startTime) / 1000
      );

      const currentAccuracy = calculateAccuracy(input.length, currentErrors);

      updateStats(currentWPM, currentAccuracy, currentErrors);
    }
  }, [input, isStarted, startTime, text, updateStats]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    if (!isStarted && newInput.length > 0) {
      startTest();
    }
    setInput(newInput);
  };

  const handleReset = () => {
    resetTest();
    setTimeLeft(mode === '30s' ? 30 : mode === '1min' ? 60 : mode === '2min' ? 120 : 60);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Timer className="w-6 h-6" />
          <span className="text-2xl font-bold">{timeLeft}s</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="stats grid grid-cols-3 gap-4 mb-6">
        <div className="stat bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">WPM</div>
          <div className="text-2xl font-bold">{wpm}</div>
        </div>
        <div className="stat bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
          <div className="text-2xl font-bold">{accuracy}%</div>
        </div>
        <div className="stat bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500 dark:text-gray-400">Errors</div>
          <div className="text-2xl font-bold">{errors}</div>
        </div>
      </div>

      <div className="relative">
        <div
          className="text-lg leading-relaxed mb-4 font-mono whitespace-pre-wrap"
          style={{ opacity: isFinished ? 0.5 : 1 }}
        >
          {text.split('').map((char, i) => {
            const inputChar = input[i];
            const isCorrect = inputChar === char;
            const isCurrent = i === input.length;

            return (
              <span
                key={i}
                className={cn(
                  'transition-colors',
                  inputChar !== undefined && (
                    isCorrect
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
                  ),
                  isCurrent && 'border-l-2 border-blue-500 -ml-[2px]'
                )}
              >
                {char}
              </span>
            );
          })}
        </div>

        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          disabled={isFinished}
          className="absolute inset-0 opacity-0 cursor-default"
          autoFocus
        />
      </div>

      {isFinished && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}