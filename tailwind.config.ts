import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#403E43",
        foreground: "#F1F0FB",
        primary: {
          DEFAULT: "#6E59A5",
          foreground: "#F1F0FB",
        },
        secondary: {
          DEFAULT: "#4A4453",
          foreground: "#F1F0FB",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#4A4453",
          foreground: "#B4B0BC",
        },
        accent: {
          DEFAULT: "#6E59A5",
          foreground: "#F1F0FB",
        },
        popover: {
          DEFAULT: "#403E43",
          foreground: "#F1F0FB",
        },
        card: {
          DEFAULT: "#4A4453",
          foreground: "#F1F0FB",
        },
        typing: {
          current: "#6E59A5",
          error: "#ef4444",
          success: "#22c55e",
        },
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;