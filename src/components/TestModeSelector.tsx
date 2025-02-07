import React from "react";
import { TestMode } from "./TypingTest";

interface TestModeSelectorProps {
  mode: TestMode;
  onModeChange: (mode: TestMode) => void;
}

const TestModeSelector = ({ mode, onModeChange }: TestModeSelectorProps) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => onModeChange("30s")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          mode === "30s"
            ? "bg-secondary text-white"
            : "bg-primary bg-opacity-10 hover:bg-opacity-20"
        }`}
      >
        30 seconds
      </button>
      <button
        onClick={() => onModeChange("1min")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          mode === "1min"
            ? "bg-secondary text-white"
            : "bg-primary bg-opacity-10 hover:bg-opacity-20"
        }`}
      >
        1 minute
      </button>
    </div>
  );
};

export default TestModeSelector;