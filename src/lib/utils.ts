import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateWPM(
  typedChars: number,
  errors: number,
  timeInSeconds: number
): number {
  const minutes = timeInSeconds / 60;
  const wordsTyped = (typedChars / 5) - (errors / 5); // Standard: 5 chars = 1 word
  return Math.max(Math.round(wordsTyped / minutes), 0);
}

export function calculateAccuracy(
  totalChars: number,
  errors: number
): number {
  if (totalChars === 0) return 100;
  return Math.max(Math.round(((totalChars - errors) / totalChars) * 100), 0);
}