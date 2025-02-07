import React from "react";

interface TypingTextProps {
  text: string;
  input: string;
  isFinished: boolean;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  input,
  isFinished,
}) => {
  return (
    <div className="relative font-mono text-lg leading-relaxed bg-muted/30 rounded-lg p-6">
      {text.split("").map((char, index) => {
        const isTyped = index < input.length;
        const isCorrect = input[index] === char;
        const isCurrent = index === input.length;

        return (
          <span
            key={index}
            className={`${
              isTyped
                ? isCorrect
                  ? "text-typing-success"
                  : "text-typing-error underline"
                : "text-foreground/50"
            } ${isCurrent ? "border-r-2 border-typing-current animate-blink" : ""}`}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};