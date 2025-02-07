import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generateWords } from '../utils/words';
import Stats from './Stats';
import { useToast } from '../components/ui/use-toast';

const TypingTest = () => {
  const [words, setWords] = useState<string[]>(generateWords(50));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testComplete, setTestComplete] = useState(false);
  const { toast } = useToast();
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  const resetTest = useCallback(() => {
    setWords(generateWords(50));
    setCurrentWordIndex(0);
    setCurrentInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setTimeLeft(60);
    setTestComplete(false);
  }, []);

  const calculateWPM = useCallback(() => {
    if (!startTime || correctChars === 0) return 0;
    const timeElapsed = ((endTime || Date.now()) - startTime) / 1000 / 60;
    if (timeElapsed === 0) return 0;
    return Math.round((correctChars / 5) * (60 / (60 - timeLeft)));
  }, [startTime, endTime, correctChars, timeLeft]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testComplete) return;
    
    const value = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.endsWith(' ')) {
      const word = value.trim();
      const correct = word === words[currentWordIndex];
      
      setTotalChars(prev => prev + words[currentWordIndex].length);
      if (correct) {
        setCorrectChars(prev => prev + words[currentWordIndex].length);
      }
      
      if (currentWordIndex === words.length - 1) {
        finishTest();
        return;
      }

      setCurrentWordIndex(prev => prev + 1);
      setCurrentInput('');
      setWpm(calculateWPM());
      setAccuracy(Math.round((correctChars / totalChars) * 100) || 100);
    } else {
      setCurrentInput(value);
    }
  };

  const finishTest = () => {
    setEndTime(Date.now());
    setTestComplete(true);
    const finalWPM = calculateWPM();
    toast({
      title: "Test completed!",
      description: `Final WPM: ${finalWPM}, Accuracy: ${Math.round((correctChars / totalChars) * 100)}%`,
    });
  };

  useEffect(() => {
    if (startTime && !testComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
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
  }, [startTime, testComplete, timeLeft]);

  useEffect(() => {
    if (wordsContainerRef.current) {
      const container = wordsContainerRef.current;
      const activeWord = container.querySelector('.active');
      if (activeWord) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeWord.getBoundingClientRect();
        
        if (activeRect.bottom > containerRect.bottom || activeRect.top < containerRect.top) {
          const htmlActiveWord = activeWord as HTMLElement;
          container.scrollTop = htmlActiveWord.offsetTop - container.offsetHeight / 2;
        }
      }
    }
  }, [currentWordIndex]);

  useEffect(() => {
    if (startTime && !testComplete) {
      const interval = setInterval(() => {
        setWpm(calculateWPM());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, testComplete, calculateWPM]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <Stats wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />
      
      <div 
        ref={wordsContainerRef}
        className="w-full max-w-3xl mt-8 mb-8 h-24 overflow-hidden text-xl leading-relaxed bg-white rounded-lg p-4 shadow-sm"
      >
        <div className="flex flex-wrap">
          {words.map((word, index) => (
            <div
              key={index}
              className={`mr-2 ${index === currentWordIndex ? 'active bg-slate-100 rounded px-1' : ''}`}
            >
              {word.split('').map((char, charIndex) => {
                let className = 'character';
                if (index === currentWordIndex) {
                  if (charIndex < currentInput.length) {
                    className += currentInput[charIndex] === char ? ' text-green-500' : ' text-red-500';
                  }
                }
                return (
                  <span key={charIndex} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        value={currentInput}
        onChange={handleInput}
        className="w-64 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        autoFocus
        disabled={testComplete}
      />

      <button
        onClick={resetTest}
        className="mt-8 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        Reset Test
      </button>
    </div>
  );
};

export default TypingTest;