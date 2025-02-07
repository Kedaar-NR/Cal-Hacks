import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1A1F2C",
        primary: "#D6BCFA",
        secondary: "#9B87F5",
        error: "#ea384c",
        success: "#4ADE80",
        neutral: "#8E9196",
      },
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;