export const calculateWPM = (input: string, time: number): number => {
  if (time === 0) return 0;
  const words = input.trim().split(/\s+/).length;
  const minutes = time / 60;
  return Math.round(words / minutes);
};

export const calculateAccuracy = (original: string, typed: string): number => {
  if (typed.length === 0) return 100;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) correct++;
  }
  return Math.round((correct / typed.length) * 100);
};