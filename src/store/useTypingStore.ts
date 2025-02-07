import { create } from 'zustand';

interface TypingState {
  mode: '30s' | '1min' | '2min' | 'custom';
  customTime: number;
  text: string;
  input: string;
  isStarted: boolean;
  isFinished: boolean;
  startTime: number | null;
  wpm: number;
  accuracy: number;
  errors: number;
  
  setMode: (mode: TypingState['mode']) => void;
  setCustomTime: (time: number) => void;
  setText: (text: string) => void;
  setInput: (input: string) => void;
  startTest: () => void;
  finishTest: () => void;
  resetTest: () => void;
  updateStats: (wpm: number, accuracy: number, errors: number) => void;
}

export const useTypingStore = create<TypingState>((set) => ({
  mode: '1min',
  customTime: 60,
  text: '',
  input: '',
  isStarted: false,
  isFinished: false,
  startTime: null,
  wpm: 0,
  accuracy: 100,
  errors: 0,

  setMode: (mode) => set({ mode }),
  setCustomTime: (time) => set({ customTime: time }),
  setText: (text) => set({ text }),
  setInput: (input) => set({ input }),
  startTest: () => set({ isStarted: true, startTime: Date.now() }),
  finishTest: () => set({ isFinished: true }),
  resetTest: () => set({
    input: '',
    isStarted: false,
    isFinished: false,
    startTime: null,
    wpm: 0,
    accuracy: 100,
    errors: 0,
  }),
  updateStats: (wpm, accuracy, errors) => set({ wpm, accuracy, errors }),
}));