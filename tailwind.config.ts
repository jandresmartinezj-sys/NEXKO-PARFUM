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
        // Tema CLARO (estilo Perfumarte). `void` se mantiene oscuro porque
        // se usa como texto sobre acentos dorados (text-void), no como fondo.
        void: "#14110C",
        dark: "#23282B", // slate oscuro para footer / barra de nav
        surface: "#F5F1E8", // tarjetas/paneles cálidos claros
        paper: "#FFFFFF", // fondo base blanco
        gold: {
          DEFAULT: "#C9A84C",
          primary: "#C9A84C",
          light: "#E8C97A",
          glow: "#B8942F",
        },
        rose: { scent: "#C56A7C" },
        oud: { deep: "#4A2020" },
        musk: { neutral: "#C8B8A2" },
        fresh: { aqua: "#4FA3A3" },
        spice: { amber: "#D4803C" },
        ink: {
          primary: "#1A1A1A", // texto principal oscuro
          secondary: "#6B655C", // texto secundario gris cálido
        },
        cream: {
          DEFAULT: "#F8F6F1",
          tile: "#FFFFFF",
          ink: "#1A160F",
          muted: "#94804F",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        gold: "0 6px 20px -8px rgba(201,168,76,0.35)",
        "gold-lg": "0 12px 40px -12px rgba(201,168,76,0.35)",
        card: "0 8px 24px -12px rgba(0,0,0,0.18)",
        "card-hover": "0 16px 40px -14px rgba(0,0,0,0.25)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E8C97A 0%, #C9A84C 45%, #8a6f2e 100%)",
        "void-radial": "none",
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
