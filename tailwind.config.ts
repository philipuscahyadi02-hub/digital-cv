import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fixed (never flips with theme) — used for text that sits on the
        // accent-colored buttons, which stays dark in both light and dark mode.
        ink: {
          950: "#07070b",
          900: "#0b0b12",
          800: "#12121c",
          700: "#1b1b28",
          600: "#26263a",
        },
        // Theme-aware tokens, backed by CSS variables in globals.css so
        // switching themes needs no per-component dark:/light: variants.
        // `white` itself is overridden so every existing text-white,
        // bg-white/X, border-white/X utility repaints automatically.
        white: "rgb(var(--fg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        // Card tint's own alpha is set per-theme (globals.css) rather than
        // via Tailwind's opacity modifier, since dark/light need different
        // strengths to read at the same visual weight.
        card: "rgb(var(--card) / var(--card-alpha))",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          dim: "rgb(var(--accent-dim) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "#e6b95c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

export default config;
