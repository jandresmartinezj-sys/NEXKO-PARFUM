import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050508",
        dark: "#0A0A12",
        surface: "#12121E",
        gold: {
          DEFAULT: "#C9A84C",
          primary: "#C9A84C",
          light: "#E8C97A",
          glow: "#FFE0A0",
        },
        rose: { scent: "#E8A0B0" },
        oud: { deep: "#4A2020" },
        musk: { neutral: "#C8B8A2" },
        fresh: { aqua: "#7EC8C8" },
        spice: { amber: "#D4803C" },
        ink: {
          primary: "#F5F0E8",
          secondary: "#A09080",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        gold: "0 0 30px -8px rgba(201,168,76,0.45)",
        "gold-lg": "0 0 60px -12px rgba(201,168,76,0.55)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E8C97A 0%, #C9A84C 45%, #8a6f2e 100%)",
        "void-radial":
          "radial-gradient(circle at 50% 30%, #12121E 0%, #0A0A12 45%, #050508 100%)",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "float-up": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-gold": "pulse-gold 1.8s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        "float-up": "float-up 0.6s ease-out both",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
