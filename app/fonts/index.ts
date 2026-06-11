import localFont from "next/font/local";

/**
 * Fuentes auto-alojadas (next/font/local). Evitan la descarga desde Google
 * Fonts en tiempo de build, que provocaba fallos intermitentes de deploy.
 */

export const playfair = localFont({
  src: "./playfair-var.woff2",
  variable: "--font-playfair",
  display: "swap",
  weight: "400 800",
});

export const inter = localFont({
  src: "./inter-var.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "400 700",
});

export const cormorant = localFont({
  src: [
    { path: "./cormorant-400.woff2", weight: "400", style: "normal" },
    { path: "./cormorant-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
