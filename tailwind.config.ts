import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        primary: "#1A1A1A",
        secondary: "#4B5563",
        error: "#DC2626",
        success: "#16A34A",
        neutral: "#6B7280",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        // Consider removing or simplifying animations for a more minimal look
      },
      keyframes: {
        // Consider removing keyframes for a cleaner design
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;