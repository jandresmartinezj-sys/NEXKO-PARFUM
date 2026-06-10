export interface CollectionTheme {
  title: string;
  copy: string;
  brands: string;
  accent: string; // clases de gradiente Tailwind
  emoji: string;
}

export const COLLECTION_THEMES: Record<string, CollectionTheme> = {
  arabes: {
    title: "Árabes & Orientales",
    copy: "Fragancias que cuentan historias milenarias.",
    brands: "Lattafa · Xerjoff · Paris Corner · Al Haramain · Orientica · Armaf",
    accent: "from-gold/25 via-spice-amber/15 to-void",
    emoji: "🕌",
  },
  masculinos: {
    title: "Masculinos",
    copy: "Aromas que definen al hombre moderno.",
    brands: "Jean Paul Gaultier · Dior · Paco Rabanne · Valentino · Armaf",
    accent: "from-blue-700/25 via-slate-600/15 to-void",
    emoji: "🖤",
  },
  femeninos: {
    title: "Femeninos",
    copy: "Fragancias que celebran tu esencia.",
    brands: "Carolina Herrera · Victoria's Secret · Tous · Ariana Grande",
    accent: "from-rose-scent/25 via-gold/10 to-void",
    emoji: "🌹",
  },
  "body-sprays": {
    title: "Body Sprays",
    copy: "Frescura todo el día, precio que enamora.",
    brands: "Orientica · Lattafa · Armaf · Al Haramain",
    accent: "from-fresh-aqua/25 via-blue-500/10 to-void",
    emoji: "🌊",
  },
  "sets-regalo": {
    title: "Sets & Kits Regalo",
    copy: "El regalo perfecto ya está listo.",
    brands: "Lattafa · Armaf · Orientica · Moschino",
    accent: "from-emerald-600/25 via-gold/10 to-void",
    emoji: "🎁",
  },
};
