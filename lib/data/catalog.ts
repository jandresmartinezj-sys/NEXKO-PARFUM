/**
 * Catálogo semilla de NEXKO PARFUM.
 *
 * - El script de seed (scripts/seed.mjs) usa: handle, title, vendor, category,
 *   gender, presentation, priceVenta, tags, description para crear los productos
 *   en Shopify.
 * - La app NUNCA lee `priceVenta` de aquí para mostrarlo: los precios siempre
 *   vienen de la Storefront API. De este archivo la app solo usa los `accords`
 *   (pirámide olfativa) y metadatos de aroma, indexados por `handle`.
 */

export type ScentFamily =
  | "floral"
  | "oriental"
  | "amaderado"
  | "fresco"
  | "acuatico"
  | "gourmand"
  | "especiado";

export type Gender = "dama" | "caballero" | "unisex";
export type Presentation = "cofre" | "caja" | "spray" | "set";
export type Intensity = "light" | "moderate" | "intense" | "extreme";

export interface Accords {
  top: string[];
  heart: string[];
  base: string[];
}

export interface CatalogItem {
  handle: string;
  title: string;
  vendor: string;
  /** Handle de la colección a la que pertenece. */
  category: "arabes" | "masculinos" | "femeninos" | "body-sprays" | "sets-regalo";
  gender: Gender;
  presentation: Presentation;
  /** Precio de venta en COP (pesos, sin decimales). Solo para el seed. */
  priceVenta: number;
  family: ScentFamily;
  intensity: Intensity;
  tags: string[];
  description: string;
  accords: Accords;
  bestseller?: boolean;
}

const FEATURED: CatalogItem[] = [
  /* ───────────── ÁRABES / ORIENTALES (detallados, con notas reales) ───────────── */
  {
    handle: "khamrah-lattafa",
    title: "Khamrah Lattafa 100 ML",
    vendor: "Lattafa",
    category: "arabes",
    gender: "unisex",
    presentation: "caja",
    priceVenta: 124000,
    family: "gourmand",
    intensity: "intense",
    tags: ["arabe", "lattafa", "caja", "bestseller", "gourmand"],
    description:
      "Un brindis oriental de dátiles, canela y vainilla. Khamrah envuelve la piel con una estela cálida, dulce y especiada que perdura por horas.",
    accords: {
      top: ["Canela", "Bergamota", "Nuez moscada"],
      heart: ["Dátiles", "Praliné", "Flor de azahar"],
      base: ["Vainilla", "Haba tonka", "Benjuí"],
    },
    bestseller: true,
  },
  {
    handle: "yara-lattafa",
    title: "Yara Lattafa 100 ML",
    vendor: "Lattafa",
    category: "arabes",
    gender: "dama",
    presentation: "caja",
    priceVenta: 124000,
    family: "floral",
    intensity: "moderate",
    tags: ["arabe", "lattafa", "caja", "bestseller", "floral"],
    description:
      "Cremoso, dulce y luminoso. Yara combina orquídea y heliotropo sobre una base de sándalo y vainilla para un rastro adictivo y femenino.",
    accords: {
      top: ["Orquídea", "Mandarina"],
      heart: ["Heliotropo", "Gardenia", "Jazmín"],
      base: ["Sándalo", "Vainilla", "Almizcle"],
    },
    bestseller: true,
  },
  {
    handle: "asad-lattafa",
    title: "Asad Lattafa 100 ML",
    vendor: "Lattafa",
    category: "arabes",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 124000,
    family: "amaderado",
    intensity: "intense",
    tags: ["arabe", "lattafa", "caja", "amaderado"],
    description:
      "Potente y magnético. Asad abre con pimienta y piña para asentarse en un fondo de vainilla, ámbar y pachulí de gran proyección.",
    accords: {
      top: ["Pimienta negra", "Piña"],
      heart: ["Lavanda", "Bergamota"],
      base: ["Vainilla", "Ámbar", "Pachulí"],
    },
  },
  {
    handle: "oud-for-glory-cofre",
    title: "Oud For Glory Cofre 100 ML",
    vendor: "Lattafa",
    category: "arabes",
    gender: "unisex",
    presentation: "cofre",
    priceVenta: 184000,
    family: "amaderado",
    intensity: "extreme",
    tags: ["arabe", "lattafa", "cofre", "oud", "amaderado"],
    description:
      "Una oda al oud. Azafrán y nuez moscada dan paso a maderas resinosas y pachulí en un cofre de lujo de altísima duración.",
    accords: {
      top: ["Azafrán", "Nuez moscada"],
      heart: ["Oud", "Pachulí", "Geranio"],
      base: ["Ámbar", "Almizcle", "Maderas"],
    },
    bestseller: true,
  },
  {
    handle: "erba-pura-caja",
    title: "Erba Pura en Caja 100 ML",
    vendor: "Xerjoff",
    category: "arabes",
    gender: "unisex",
    presentation: "caja",
    priceVenta: 126000,
    family: "gourmand",
    intensity: "moderate",
    tags: ["arabe", "xerjoff", "caja", "frutal"],
    description:
      "Explosión frutal sobre un fondo dulce y ambarado. Erba Pura es alegre, jugosa y sorprendentemente versátil para cualquier ocasión.",
    accords: {
      top: ["Cítricos", "Frutas rojas"],
      heart: ["Frutas blancas", "Flores"],
      base: ["Almizcle", "Ámbar", "Vainilla"],
    },
  },
  {
    handle: "mayar-lattafa",
    title: "Mayar Lattafa 100 ML",
    vendor: "Lattafa",
    category: "arabes",
    gender: "dama",
    presentation: "caja",
    priceVenta: 166000,
    family: "floral",
    intensity: "moderate",
    tags: ["arabe", "lattafa", "caja", "floral"],
    description:
      "Elegancia floral con un guiño frutal. Jazmín y azahar arropados por vainilla y cachemira para una firma sofisticada y delicada.",
    accords: {
      top: ["Bergamota", "Frutas rojas"],
      heart: ["Jazmín", "Flor de azahar"],
      base: ["Vainilla", "Cachemira", "Almizcle"],
    },
  },
  {
    handle: "fakhar-black",
    title: "Fakhár Black 100 ML",
    vendor: "Lattafa",
    category: "arabes",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 190000,
    family: "amaderado",
    intensity: "intense",
    tags: ["arabe", "lattafa", "caja", "amaderado", "aromatico"],
    description:
      "Frescura aromática y fondo amaderado. Fakhár Black es la versatilidad hecha perfume: oficina de día, seducción de noche.",
    accords: {
      top: ["Bergamota", "Manzana"],
      heart: ["Lavanda", "Geranio"],
      base: ["Vainilla", "Pachulí", "Haba tonka"],
    },
  },
  {
    handle: "eclaire-lattafa",
    title: "Eclaire Lattafa 100 ML",
    vendor: "Lattafa",
    category: "arabes",
    gender: "dama",
    presentation: "caja",
    priceVenta: 170000,
    family: "gourmand",
    intensity: "moderate",
    tags: ["arabe", "lattafa", "caja", "gourmand", "dulce"],
    description:
      "Un postre embotellado. Caramelo, praliné y vainilla cremosa para quienes aman las fragancias dulces y golosas.",
    accords: {
      top: ["Frutas confitadas"],
      heart: ["Caramelo", "Flores blancas"],
      base: ["Vainilla", "Praliné", "Almizcle"],
    },
  },

  /* ───────────── MASCULINOS ───────────── */
  {
    handle: "sauvage-dior",
    title: "Sauvage Dior 100 ML",
    vendor: "Dior",
    category: "masculinos",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 126000,
    family: "fresco",
    intensity: "intense",
    tags: ["masculino", "dior", "fresco", "especiado", "bestseller"],
    description:
      "Frescura radiante y especiada. Bergamota crujiente, pimienta de Sichuan y un fondo de ambroxan que proyecta sin esfuerzo.",
    accords: {
      top: ["Bergamota", "Pimienta"],
      heart: ["Lavanda", "Pimienta de Sichuan", "Geranio"],
      base: ["Ambroxan", "Cedro", "Labdanum"],
    },
    bestseller: true,
  },
  {
    handle: "one-million",
    title: "One Million 100 ML",
    vendor: "Paco Rabanne",
    category: "masculinos",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 116000,
    family: "especiado",
    intensity: "intense",
    tags: ["masculino", "paco-rabanne", "especiado", "cuero"],
    description:
      "Opulento y seductor. Toronja y menta brillantes sobre canela, cuero y ámbar para una presencia inolvidable.",
    accords: {
      top: ["Toronja", "Menta", "Mandarina"],
      heart: ["Rosa", "Canela", "Especias"],
      base: ["Cuero", "Ámbar", "Pachulí"],
    },
  },
  {
    handle: "invictus",
    title: "Invictus 100 ML",
    vendor: "Paco Rabanne",
    category: "masculinos",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 116000,
    family: "acuatico",
    intensity: "moderate",
    tags: ["masculino", "paco-rabanne", "acuatico", "fresco"],
    description:
      "Frescura deportiva y victoriosa. Notas marinas y pomelo sobre una base ambarada de guayaco para el día a día.",
    accords: {
      top: ["Pomelo", "Nota marina"],
      heart: ["Hoja de laurel", "Jazmín"],
      base: ["Ámbar gris", "Guayaco", "Roble"],
    },
  },
  {
    handle: "le-male-elixir",
    title: "Le Male Elixir 120 ML",
    vendor: "Jean Paul Gaultier",
    category: "masculinos",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 146000,
    family: "oriental",
    intensity: "extreme",
    tags: ["masculino", "jean-paul-gaultier", "oriental", "gourmand"],
    description:
      "La versión más adictiva del clásico. Lavanda y miel sobre haba tonka y benjuí: dulce, cálido y de proyección bestial.",
    accords: {
      top: ["Lavanda", "Menta"],
      heart: ["Miel", "Salvia"],
      base: ["Vainilla", "Haba tonka", "Benjuí"],
    },
    bestseller: true,
  },
  {
    handle: "stronger-with-you",
    title: "Stronger With You 100 ML",
    vendor: "Emporio Armani",
    category: "masculinos",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 126000,
    family: "especiado",
    intensity: "moderate",
    tags: ["masculino", "armani", "especiado", "gourmand"],
    description:
      "Cálido y carismático. Cardamomo y salvia sobre castañas glaseadas, vainilla y ámbar para un rastro acogedor y moderno.",
    accords: {
      top: ["Cardamomo", "Rosa pimienta"],
      heart: ["Salvia", "Lavanda", "Geranio"],
      base: ["Vainilla", "Castañas glaseadas", "Ámbar"],
    },
  },
  {
    handle: "valentino-uomo",
    title: "Valentino Uomo 100 ML",
    vendor: "Valentino",
    category: "masculinos",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 130000,
    family: "amaderado",
    intensity: "moderate",
    tags: ["masculino", "valentino", "amaderado", "gourmand"],
    description:
      "Elegancia italiana. Crema de avellana y café sobre cuero y cedro para un caballero refinado y contemporáneo.",
    accords: {
      top: ["Bergamota", "Mirto"],
      heart: ["Crema de avellana", "Café"],
      base: ["Cuero", "Cedro"],
    },
  },
  {
    handle: "fahrenheit-dior",
    title: "Fahrenheit Dior 100 ML",
    vendor: "Dior",
    category: "masculinos",
    gender: "caballero",
    presentation: "caja",
    priceVenta: 116000,
    family: "amaderado",
    intensity: "intense",
    tags: ["masculino", "dior", "amaderado", "cuero"],
    description:
      "Un ícono inconfundible. Violeta y madreselva sobre cuero y almizcle: distintivo, viril y atemporal.",
    accords: {
      top: ["Mandarina", "Espino", "Bergamota"],
      heart: ["Madreselva", "Violeta", "Nuez moscada"],
      base: ["Cuero", "Almizcle", "Pachulí"],
    },
  },

  /* ───────────── FEMENINOS ───────────── */
  {
    handle: "good-girl",
    title: "Good Girl 80 ML",
    vendor: "Carolina Herrera",
    category: "femeninos",
    gender: "dama",
    presentation: "caja",
    priceVenta: 116000,
    family: "oriental",
    intensity: "intense",
    tags: ["femenino", "carolina-herrera", "oriental", "bestseller"],
    description:
      "Dualidad seductora. Jazmín y nardo luminosos sobre un fondo de cacao, tonka y praliné. El equilibrio perfecto entre lo dulce y lo oscuro.",
    accords: {
      top: ["Almendra", "Café", "Bergamota"],
      heart: ["Jazmín sambac", "Nardo"],
      base: ["Haba tonka", "Cacao", "Praliné"],
    },
    bestseller: true,
  },
  {
    handle: "212-vip-rose",
    title: "212 VIP Rosé 80 ML",
    vendor: "Carolina Herrera",
    category: "femeninos",
    gender: "dama",
    presentation: "caja",
    priceVenta: 116000,
    family: "floral",
    intensity: "moderate",
    tags: ["femenino", "carolina-herrera", "floral", "frutal"],
    description:
      "Burbujeante y festivo. Champagne rosado y durazno sobre flores blancas y almizcle para noches que brillan.",
    accords: {
      top: ["Champagne", "Durazno"],
      heart: ["Flores blancas"],
      base: ["Almizcle", "Maderas"],
    },
  },
  {
    handle: "bombshell",
    title: "Bombshell 100 ML",
    vendor: "Victoria's Secret",
    category: "femeninos",
    gender: "dama",
    presentation: "caja",
    priceVenta: 116000,
    family: "floral",
    intensity: "moderate",
    tags: ["femenino", "victorias-secret", "floral", "frutal"],
    description:
      "Coqueto y fresco. Pomelo y piña sobre peonía y orquídea: vibrante, juvenil e irresistible.",
    accords: {
      top: ["Pomelo", "Piña"],
      heart: ["Peonía", "Orquídea"],
      base: ["Almizcle", "Vainilla"],
    },
  },
  {
    handle: "ch-woman",
    title: "CH Woman 100 ML",
    vendor: "Carolina Herrera",
    category: "femeninos",
    gender: "dama",
    presentation: "caja",
    priceVenta: 126000,
    family: "oriental",
    intensity: "moderate",
    tags: ["femenino", "carolina-herrera", "oriental", "cuero"],
    description:
      "Sofisticación con carácter. Praliné y rosa sobre cuero, sándalo y ámbar para una mujer segura de sí misma.",
    accords: {
      top: ["Bergamota", "Toronja"],
      heart: ["Jazmín", "Rosa", "Praliné"],
      base: ["Cuero", "Sándalo", "Ámbar"],
    },
  },
  {
    handle: "cloud-ariana-grande",
    title: "Cloud Ariana Grande 100 ML",
    vendor: "Ariana Grande",
    category: "femeninos",
    gender: "dama",
    presentation: "caja",
    priceVenta: 126000,
    family: "gourmand",
    intensity: "moderate",
    tags: ["femenino", "ariana-grande", "gourmand", "dulce"],
    description:
      "Suave como una nube. Pera y lavanda sobre crema batida, praliné y coco. Reconfortante, dulce y muy duradero.",
    accords: {
      top: ["Lavanda", "Pera", "Bergamota"],
      heart: ["Crema batida", "Praliné", "Coco"],
      base: ["Almizcle", "Maderas"],
    },
    bestseller: true,
  },
  {
    handle: "love-me-tous",
    title: "Love Me Tous 90 ML",
    vendor: "Tous",
    category: "femeninos",
    gender: "dama",
    presentation: "caja",
    priceVenta: 126000,
    family: "floral",
    intensity: "light",
    tags: ["femenino", "tous", "floral", "frutal"],
    description:
      "Delicado y romántico. Frutos rojos y flor de cerezo sobre almizcle suave para un uso diario fresco y femenino.",
    accords: {
      top: ["Frutos rojos"],
      heart: ["Flor de cerezo", "Peonía"],
      base: ["Almizcle", "Cedro"],
    },
  },
  {
    handle: "good-girl-blush",
    title: "Good Girl Blush 80 ML",
    vendor: "Carolina Herrera",
    category: "femeninos",
    gender: "dama",
    presentation: "caja",
    priceVenta: 130000,
    family: "floral",
    intensity: "moderate",
    tags: ["femenino", "carolina-herrera", "floral"],
    description:
      "Luminoso y optimista. Un ramo de rosa y peonía sobre sándalo cremoso y vainilla: la cara más radiante de Good Girl.",
    accords: {
      top: ["Pera", "Bergamota"],
      heart: ["Rosa", "Peonía"],
      base: ["Sándalo", "Vainilla"],
    },
  },

  /* ───────────── BODY SPRAYS ───────────── */
  {
    handle: "orientica-royal-amber-body-spray",
    title: "Orientica Royal Amber Body Spray 200 ML",
    vendor: "Orientica",
    category: "body-sprays",
    gender: "unisex",
    presentation: "spray",
    priceVenta: 62000,
    family: "oriental",
    intensity: "moderate",
    tags: ["body-spray", "orientica", "oriental", "unisex"],
    description:
      "Frescura ambarada y oriental para todo el día. Formato generoso de 200 ml ideal para reaplicar cuando quieras.",
    accords: {
      top: ["Bergamota", "Azafrán"],
      heart: ["Ámbar", "Flores"],
      base: ["Maderas", "Almizcle"],
    },
  },
  {
    handle: "club-de-nuit-intense-body-spray",
    title: "Club de Nuit Intense Man Body Spray 200 ML",
    vendor: "Armaf",
    category: "body-sprays",
    gender: "caballero",
    presentation: "spray",
    priceVenta: 62000,
    family: "amaderado",
    intensity: "moderate",
    tags: ["body-spray", "armaf", "amaderado", "caballero"],
    description:
      "El icónico Club de Nuit en formato body spray. Piña y abedul sobre vainilla y almizcle: fresco, masculino y rendidor.",
    accords: {
      top: ["Piña", "Limón", "Bergamota"],
      heart: ["Abedul", "Jazmín", "Rosa"],
      base: ["Vainilla", "Almizcle", "Ámbar"],
    },
  },
  {
    handle: "yara-body-spray",
    title: "Yara Body Spray 200 ML",
    vendor: "Lattafa",
    category: "body-sprays",
    gender: "dama",
    presentation: "spray",
    priceVenta: 58000,
    family: "floral",
    intensity: "light",
    tags: ["body-spray", "lattafa", "floral", "dama"],
    description:
      "La estela cremosa de Yara en spray corporal. Orquídea y vainilla suaves para refrescar tu día con un toque dulce.",
    accords: {
      top: ["Orquídea"],
      heart: ["Heliotropo", "Gardenia"],
      base: ["Sándalo", "Vainilla", "Almizcle"],
    },
  },

  /* ───────────── SETS Y KITS ───────────── */
  {
    handle: "set-mini-khamrah-30ml",
    title: "Set Mini Khamrah 30 ML (Dukhan + Qawha + Khamrah)",
    vendor: "Lattafa",
    category: "sets-regalo",
    gender: "unisex",
    presentation: "set",
    priceVenta: 190000,
    family: "gourmand",
    intensity: "intense",
    tags: ["set", "lattafa", "regalo", "gourmand", "bestseller"],
    description:
      "El trío más codiciado de Lattafa en formato viaje: Khamrah, Khamrah Qawha y Khamrah Dukhan. El regalo perfecto para los amantes de lo dulce y especiado.",
    accords: {
      top: ["Canela", "Café"],
      heart: ["Dátiles", "Praliné"],
      base: ["Vainilla", "Tonka", "Maderas ahumadas"],
    },
    bestseller: true,
  },
  {
    handle: "set-mini-yara-30ml-x4",
    title: "Set Mini Yara 30 ML x4 (todas dama)",
    vendor: "Lattafa",
    category: "sets-regalo",
    gender: "dama",
    presentation: "set",
    priceVenta: 170000,
    family: "floral",
    intensity: "moderate",
    tags: ["set", "lattafa", "regalo", "floral"],
    description:
      "Cuatro versiones de Yara en formato mini: descubre tu favorita o regálalas todas. Cremosas, dulces y femeninas.",
    accords: {
      top: ["Orquídea", "Frutas"],
      heart: ["Heliotropo", "Gardenia"],
      base: ["Sándalo", "Vainilla", "Almizcle"],
    },
  },
  {
    handle: "set-bolso-crema-perfume-yara",
    title: "Set Bolso + Crema + Perfume 60 ML + Yara",
    vendor: "Lattafa",
    category: "sets-regalo",
    gender: "dama",
    presentation: "set",
    priceVenta: 210000,
    family: "floral",
    intensity: "moderate",
    tags: ["set", "lattafa", "regalo", "premium", "floral"],
    description:
      "Un kit de lujo listo para regalar: bolso, crema corporal y perfume Yara de 60 ml. Presentación impecable y experiencia completa.",
    accords: {
      top: ["Orquídea"],
      heart: ["Heliotropo", "Jazmín"],
      base: ["Sándalo", "Vainilla", "Almizcle"],
    },
  },
];

/* ───────────── Catálogo completo (resto del listado) ─────────────
   Generado a partir del listado de precios. Las notas olfativas del long-tail
   usan un set genérico por familia; los 28 productos destacados (arriba)
   conservan sus notas específicas. */

const CATEGORY_TAG: Record<CatalogItem["category"], string> = {
  arabes: "arabe",
  masculinos: "masculino",
  femeninos: "femenino",
  "body-sprays": "body-spray",
  "sets-regalo": "set",
};

const FAMILY_ADJ: Record<ScentFamily, string> = {
  floral: "floral",
  oriental: "oriental",
  amaderado: "amaderada",
  fresco: "fresca",
  acuatico: "acuática",
  gourmand: "gourmand",
  especiado: "especiada",
};

const FAMILY_DEFAULTS: Record<ScentFamily, Accords> = {
  floral: {
    top: ["Bergamota", "Frutas"],
    heart: ["Jazmín", "Rosa", "Flor de azahar"],
    base: ["Almizcle", "Sándalo", "Vainilla"],
  },
  oriental: {
    top: ["Azafrán", "Especias"],
    heart: ["Ámbar", "Oud", "Incienso"],
    base: ["Vainilla", "Maderas", "Almizcle"],
  },
  amaderado: {
    top: ["Bergamota", "Pimienta"],
    heart: ["Cedro", "Vetiver", "Pachulí"],
    base: ["Sándalo", "Ámbar", "Cuero"],
  },
  fresco: {
    top: ["Cítricos", "Menta"],
    heart: ["Lavanda", "Notas marinas"],
    base: ["Ambroxan", "Almizcle", "Cedro"],
  },
  acuatico: {
    top: ["Pomelo", "Nota marina"],
    heart: ["Jazmín acuático", "Laurel"],
    base: ["Ámbar gris", "Maderas"],
  },
  gourmand: {
    top: ["Frutas dulces"],
    heart: ["Caramelo", "Praliné", "Vainilla"],
    base: ["Haba tonka", "Almizcle", "Cacao"],
  },
  especiado: {
    top: ["Pimienta", "Cardamomo"],
    heart: ["Canela", "Especias", "Rosa"],
    base: ["Ámbar", "Cuero", "Maderas"],
  },
};

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

interface RawItem {
  t: string;
  v: string;
  c: CatalogItem["category"];
  g: Gender;
  p: Presentation;
  price: number;
  f: ScentFamily;
  i?: Intensity;
  bs?: boolean;
}

function build(r: RawItem): CatalogItem {
  return {
    handle: slugify(r.t),
    title: r.t,
    vendor: r.v,
    category: r.c,
    gender: r.g,
    presentation: r.p,
    priceVenta: r.price,
    family: r.f,
    intensity: r.i ?? "moderate",
    tags: Array.from(new Set([CATEGORY_TAG[r.c], r.g, r.p, r.f, slugify(r.v)])),
    description: `${r.t}: una fragancia ${FAMILY_ADJ[r.f]} de ${r.v}. Estela distintiva y gran calidad a un precio justo, con envío a toda Colombia.`,
    accords: FAMILY_DEFAULTS[r.f],
    bestseller: r.bs,
  };
}

const EXTRA_RAW: RawItem[] = [
  /* ── Árabes / Orientales ── */
  { t: "Erba Pura en Cofre 100 ML", v: "Xerjoff", c: "arabes", g: "unisex", p: "cofre", price: 190000, f: "gourmand", bs: true },
  { t: "Erba Pura Tipo Original Cofre 100 ML", v: "Xerjoff", c: "arabes", g: "unisex", p: "cofre", price: 240000, f: "gourmand" },
  { t: "Xerjoff Alexandria II 100 ML", v: "Xerjoff", c: "arabes", g: "caballero", p: "caja", price: 176000, f: "amaderado", i: "intense" },
  { t: "Afeef Lattafa 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 190000, f: "oriental" },
  { t: "Berry On Top 100 ML", v: "Al Wataniah", c: "arabes", g: "dama", p: "caja", price: 190000, f: "gourmand" },
  { t: "Mallow Madness 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 190000, f: "gourmand" },
  { t: "Vanilla Freak 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 190000, f: "gourmand" },
  { t: "Whipped Pleasure 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 190000, f: "gourmand" },
  { t: "Choco Overdose 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 190000, f: "gourmand" },
  { t: "Cookie Crave 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 190000, f: "gourmand" },
  { t: "Arte del Universo 100 ML", v: "Maison Alhambra", c: "arabes", g: "unisex", p: "caja", price: 190000, f: "oriental" },
  { t: "Haya Lattafa Cofre 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "cofre", price: 184000, f: "floral" },
  { t: "Haya Lattafa Caja 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 146000, f: "floral" },
  { t: "Emaan Lattafa 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 190000, f: "oriental" },
  { t: "Sakina Lattafa 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 190000, f: "floral" },
  { t: "Victoria by Lattafa 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 160000, f: "floral" },
  { t: "His Confession Men 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 180000, f: "amaderado" },
  { t: "Her Confession Dama 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 180000, f: "floral" },
  { t: "Khamrah Lattafa Cofre 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "cofre", price: 184000, f: "gourmand", bs: true },
  { t: "Khamrah Qawha Cofre 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "cofre", price: 184000, f: "gourmand" },
  { t: "Khamrah Qawha Caja 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 124000, f: "gourmand" },
  { t: "Khamrah Dukhan Cofre 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "cofre", price: 184000, f: "oriental" },
  { t: "Khamrah Dukhan Caja 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 124000, f: "oriental" },
  { t: "Musaman Black Intense 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "oriental", i: "intense" },
  { t: "Musaman White Intense 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "amaderado", i: "intense" },
  { t: "Musaman 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "oriental" },
  { t: "Now Woman Lattafa 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 130000, f: "floral" },
  { t: "Teriaq Lattafa 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 136000, f: "gourmand" },
  { t: "Eclaire Pistache 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 190000, f: "gourmand" },
  { t: "Eclaire Bananofi 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 190000, f: "gourmand" },
  { t: "Mayar Cherry Intense 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 170000, f: "floral", i: "intense" },
  { t: "Mayar Natural Intense 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 166000, f: "floral" },
  { t: "Yara Lattafa Elixir 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 130000, f: "floral", i: "intense" },
  { t: "Yara Candy 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 124000, f: "gourmand" },
  { t: "Yara Tous 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 124000, f: "floral" },
  { t: "Yara Moi 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 124000, f: "floral" },
  { t: "Asad Bourbon 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 124000, f: "amaderado" },
  { t: "Asad Zanzibar 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 130000, f: "amaderado" },
  { t: "Asad Lattafa Elixir 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 130000, f: "oriental", i: "intense" },
  { t: "Oud For Glory Caja 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 124000, f: "amaderado" },
  { t: "Lattafa Amethyst Cofre 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "cofre", price: 184000, f: "oriental" },
  { t: "Lattafa Amethyst Caja 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 124000, f: "oriental" },
  { t: "Lattafa Sublime Cofre 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "cofre", price: 184000, f: "oriental" },
  { t: "Lattafa Sublime Caja 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 124000, f: "oriental" },
  { t: "Honor & Glory Cofre 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "cofre", price: 184000, f: "amaderado" },
  { t: "Honor & Glory Caja 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 124000, f: "amaderado" },
  { t: "Noble Blush Cofre 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "cofre", price: 124000, f: "floral" },
  { t: "Ajwad Lattafa 100 ML", v: "Lattafa", c: "arabes", g: "unisex", p: "caja", price: 124000, f: "gourmand" },
  { t: "Fakhár Rose 100 ML", v: "Lattafa", c: "arabes", g: "dama", p: "caja", price: 190000, f: "floral" },
  { t: "Fakhár Gold Extrait 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "oriental", i: "intense" },
  { t: "Shaheen Gold 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "oriental" },
  { t: "Shaheen Silver 100 ML", v: "Lattafa", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "amaderado" },
  { t: "Marshmallow Blush Paris Corner 100 ML", v: "Paris Corner", c: "arabes", g: "dama", p: "caja", price: 190000, f: "gourmand" },
  { t: "Liquid Burn Cofre 100 ML", v: "Paris Corner", c: "arabes", g: "caballero", p: "cofre", price: 184000, f: "oriental", i: "intense" },
  { t: "Vulcan Feu 100 ML", v: "Maison Alhambra", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "especiado" },
  { t: "Vulcan Baie 100 ML", v: "Maison Alhambra", c: "arabes", g: "unisex", p: "caja", price: 190000, f: "fresco" },
  { t: "Vulcan Sable 100 ML", v: "Maison Alhambra", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "amaderado" },
  { t: "Amber Oud Gold Edition Cofre 100 ML", v: "Al Haramain", c: "arabes", g: "unisex", p: "cofre", price: 184000, f: "oriental", i: "intense" },
  { t: "Island Breeze Armaf 100 ML", v: "Armaf", c: "arabes", g: "caballero", p: "caja", price: 190000, f: "fresco" },

  /* ── Masculinos ── */
  { t: "Valentino Intense 100 ML", v: "Valentino", c: "masculinos", g: "caballero", p: "caja", price: 130000, f: "amaderado" },
  { t: "Valentino Born in Roma 100 ML", v: "Valentino", c: "masculinos", g: "caballero", p: "caja", price: 130000, f: "amaderado" },
  { t: "Nitro Red by Dumont 100 ML", v: "Dumont", c: "masculinos", g: "caballero", p: "caja", price: 144000, f: "especiado" },
  { t: "Stronger Intensely 100 ML", v: "Emporio Armani", c: "masculinos", g: "caballero", p: "caja", price: 136000, f: "especiado", i: "intense" },
  { t: "Scandal Parfum Men 100 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 136000, f: "amaderado" },
  { t: "Scandal Men JP 100 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 126000, f: "amaderado" },
  { t: "Scandal Absolu 100 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 126000, f: "amaderado", i: "intense" },
  { t: "Le Male Le Parfum 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "oriental" },
  { t: "Le Male Elixir Absolu 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "oriental", i: "extreme" },
  { t: "Le Male Elixir Lata 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "oriental", i: "extreme" },
  { t: "Jean Paul Le Beau Parfum 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "amaderado" },
  { t: "Jean Paul Paradise Garden 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "fresco" },
  { t: "Jean Paul Le Beau 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "amaderado" },
  { t: "Jean Paul Ultramale 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "oriental" },
  { t: "Le Male Lata 120 ML", v: "Jean Paul Gaultier", c: "masculinos", g: "caballero", p: "caja", price: 146000, f: "fresco" },
  { t: "Yves Saint Laurent 100 ML", v: "Yves Saint Laurent", c: "masculinos", g: "caballero", p: "caja", price: 126000, f: "amaderado" },
  { t: "Sauvage Elixir Dior 60 ML", v: "Dior", c: "masculinos", g: "caballero", p: "caja", price: 144000, f: "especiado", i: "extreme" },
  { t: "One Million Gold 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 126000, f: "especiado" },
  { t: "One Million Lucky 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 116000, f: "especiado" },
  { t: "One Million Prive 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 116000, f: "especiado" },
  { t: "One Million Elixir 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 124000, f: "especiado", i: "intense" },
  { t: "One Million Royal 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 124000, f: "especiado" },
  { t: "One Million Parfum 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 124000, f: "especiado", i: "intense" },
  { t: "Invictus Parfum 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 124000, f: "acuatico", i: "intense" },
  { t: "Invictus Legend 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 116000, f: "acuatico" },
  { t: "Invictus Intense 100 ML", v: "Paco Rabanne", c: "masculinos", g: "caballero", p: "caja", price: 116000, f: "acuatico", i: "intense" },

  /* ── Femeninos ── */
  { t: "La Bomba Carolina Herrera 90 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 130000, f: "floral" },
  { t: "Good Girl Velvet Fatale 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 130000, f: "oriental" },
  { t: "Good Girl Leguere 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "oriental" },
  { t: "Good Girl So Very 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 126000, f: "floral" },
  { t: "Good Girl Supreme 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 124000, f: "oriental" },
  { t: "Good Girl Fantastic Pink 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "gourmand" },
  { t: "212 Heroes Woman 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral" },
  { t: "212 VIP Dama 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 120000, f: "floral" },
  { t: "212 Woman 100 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 120000, f: "floral" },
  { t: "212 Sexy Woman 100 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 126000, f: "oriental" },
  { t: "212 VIP Red Rose 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral" },
  { t: "212 VIP Wins Woman 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral" },
  { t: "212 VIP Wild Party Dama 80 ML", v: "Carolina Herrera", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral" },
  { t: "Bombshell Paradise 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral" },
  { t: "Bombshell Gold 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral" },
  { t: "Bombshell Intense 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral", i: "intense" },
  { t: "Bombshell Seduction 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 116000, f: "floral" },
  { t: "Bombshell Night 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 126000, f: "oriental" },
  { t: "Victoria Very Sexy Sea 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 130000, f: "floral" },
  { t: "Victoria Very Sexy Oasis 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 130000, f: "floral" },
  { t: "Victoria Very Sexy Night 100 ML", v: "Victoria's Secret", c: "femeninos", g: "dama", p: "caja", price: 130000, f: "oriental" },
  { t: "Love Me Tous Onyx 90 ML", v: "Tous", c: "femeninos", g: "dama", p: "caja", price: 126000, f: "floral" },
  { t: "Love Me Tous Esmeralda 90 ML", v: "Tous", c: "femeninos", g: "dama", p: "caja", price: 126000, f: "floral" },
  { t: "Cloud Pink Ariana Grande 100 ML", v: "Ariana Grande", c: "femeninos", g: "dama", p: "caja", price: 126000, f: "gourmand" },
  { t: "Thank U Next Ariana Grande 100 ML", v: "Ariana Grande", c: "femeninos", g: "dama", p: "caja", price: 126000, f: "gourmand" },

  /* ── Body Sprays (200 ml) ── */
  { t: "Orientica Rouge Body Spray 200 ML", v: "Orientica", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "oriental" },
  { t: "Orientica Velvet Body Spray 200 ML", v: "Orientica", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "oriental" },
  { t: "Azure Fantasy Body Spray 200 ML", v: "Armaf", c: "body-sprays", g: "caballero", p: "spray", price: 62000, f: "fresco" },
  { t: "Oud Saffron Body Spray 200 ML", v: "Armaf", c: "body-sprays", g: "caballero", p: "spray", price: 62000, f: "oriental" },
  { t: "Lattafa Sublime Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "oriental" },
  { t: "Lattafa Amethysta Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "oriental" },
  { t: "Lattafa Oud For Glory Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "caballero", p: "spray", price: 62000, f: "amaderado" },
  { t: "Lattafa Noble Blush Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "dama", p: "spray", price: 58000, f: "floral" },
  { t: "Lattafa Honor & Glory Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "amaderado" },
  { t: "Jean Paul Divine Body Spray 200 ML", v: "Jean Paul Gaultier", c: "body-sprays", g: "dama", p: "spray", price: 58000, f: "floral" },
  { t: "Ultra Violet Body Spray 200 ML", v: "Al Haramain", c: "body-sprays", g: "dama", p: "spray", price: 58000, f: "floral" },
  { t: "Mandarin Sky Body Spray 200 ML", v: "Armaf", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "fresco" },
  { t: "Odyssey Candee Body Spray 200 ML", v: "Armaf", c: "body-sprays", g: "dama", p: "spray", price: 58000, f: "gourmand" },
  { t: "Club de Nuit Untold Body Spray 200 ML", v: "Armaf", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "amaderado" },
  { t: "Thank U Next Body Spray 200 ML", v: "Ariana Grande", c: "body-sprays", g: "dama", p: "spray", price: 58000, f: "gourmand" },
  { t: "Cloud Body Spray 200 ML", v: "Ariana Grande", c: "body-sprays", g: "dama", p: "spray", price: 58000, f: "gourmand" },
  { t: "Khamrah Lattafa Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "unisex", p: "spray", price: 62000, f: "gourmand" },
  { t: "Asad Zanzibar Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "caballero", p: "spray", price: 62000, f: "amaderado" },
  { t: "Yara Candy Body Spray 200 ML", v: "Lattafa", c: "body-sprays", g: "dama", p: "spray", price: 58000, f: "gourmand" },

  /* ── Sets y Kits Regalo ── */
  { t: "Set Mini Club de Nuit 30 ML Men", v: "Armaf", c: "sets-regalo", g: "caballero", p: "set", price: 190000, f: "amaderado" },
  { t: "Set Odyssey Mini 50 ML", v: "Armaf", c: "sets-regalo", g: "unisex", p: "set", price: 190000, f: "oriental" },
  { t: "Set Mini Yara 30 ML x4 Mixto", v: "Lattafa", c: "sets-regalo", g: "unisex", p: "set", price: 170000, f: "floral" },
  { t: "Set Mini Moschino 30 ML", v: "Moschino", c: "sets-regalo", g: "dama", p: "set", price: 176000, f: "gourmand" },
  { t: "Set Mini Ilmin 30 ML", v: "Ilmin", c: "sets-regalo", g: "unisex", p: "set", price: 200000, f: "amaderado" },
  { t: "Set Mini Orientica Collection 5 ML", v: "Orientica", c: "sets-regalo", g: "unisex", p: "set", price: 210000, f: "oriental" },
  { t: "Set Bolso + Crema + Perfume 60 ML + Khamrah", v: "Lattafa", c: "sets-regalo", g: "unisex", p: "set", price: 210000, f: "gourmand" },
  { t: "Set Bolso + Crema + Perfume 60 ML + Mandarin Sky", v: "Armaf", c: "sets-regalo", g: "unisex", p: "set", price: 210000, f: "fresco" },
  { t: "Set Bolso + Crema + Perfume 60 ML + Odyssey Candee", v: "Armaf", c: "sets-regalo", g: "dama", p: "set", price: 210000, f: "gourmand" },
  { t: "Set Bolso + Crema + Perfume 60 ML + Yum Yum", v: "Lattafa", c: "sets-regalo", g: "dama", p: "set", price: 210000, f: "gourmand" },
  { t: "Kit Crema + Splash + Perfume Club de Nuit + 30ML", v: "Armaf", c: "sets-regalo", g: "caballero", p: "set", price: 190000, f: "amaderado" },
  { t: "Kit Crema + Splash + Perfume Mandarin Sky", v: "Armaf", c: "sets-regalo", g: "unisex", p: "set", price: 170000, f: "fresco" },
  { t: "Kit Crema + Splash + Perfume Le Male Elixir", v: "Jean Paul Gaultier", c: "sets-regalo", g: "caballero", p: "set", price: 170000, f: "oriental" },
  { t: "Kit Crema + Splash + Perfume Le Beau Parfum", v: "Jean Paul Gaultier", c: "sets-regalo", g: "caballero", p: "set", price: 170000, f: "amaderado" },
  { t: "Kit Crema + Splash + Perfume Asad", v: "Lattafa", c: "sets-regalo", g: "caballero", p: "set", price: 170000, f: "amaderado" },
  { t: "Kit Crema + Splash + Perfume Asad Bourbon", v: "Lattafa", c: "sets-regalo", g: "caballero", p: "set", price: 170000, f: "amaderado" },
  { t: "Kit Crema + Splash + Perfume Fakhár Black", v: "Lattafa", c: "sets-regalo", g: "caballero", p: "set", price: 170000, f: "amaderado" },
  { t: "Kit Crema + Splash + Perfume Amethysta", v: "Lattafa", c: "sets-regalo", g: "dama", p: "set", price: 170000, f: "oriental" },
  { t: "Kit Crema + Splash + Perfume Eclaire", v: "Lattafa", c: "sets-regalo", g: "dama", p: "set", price: 170000, f: "gourmand" },
  { t: "Kit Crema + Splash + Perfume Yara", v: "Lattafa", c: "sets-regalo", g: "dama", p: "set", price: 170000, f: "floral" },
  { t: "Kit Crema + Splash + Perfume Yara Candy", v: "Lattafa", c: "sets-regalo", g: "dama", p: "set", price: 170000, f: "gourmand" },
];

const EXTRA: CatalogItem[] = EXTRA_RAW.map(build);

/** Catálogo completo: destacados (con notas reales) + resto, sin duplicar handles. */
export const CATALOG: CatalogItem[] = (() => {
  const seen = new Set<string>();
  const out: CatalogItem[] = [];
  for (const item of [...FEATURED, ...EXTRA]) {
    if (seen.has(item.handle)) continue;
    seen.add(item.handle);
    out.push(item);
  }
  return out;
})();

/* ───────────── Índices y helpers ───────────── */

export const SCENT_BY_HANDLE: Record<string, CatalogItem> = Object.fromEntries(
  CATALOG.map((item) => [item.handle, item]),
);

export const COLLECTIONS: {
  handle: CatalogItem["category"];
  title: string;
  description: string;
}[] = [
  {
    handle: "arabes",
    title: "Árabes & Orientales",
    description: "Fragancias que cuentan historias milenarias.",
  },
  {
    handle: "masculinos",
    title: "Masculinos",
    description: "Aromas que definen al hombre moderno.",
  },
  {
    handle: "femeninos",
    title: "Femeninos",
    description: "Fragancias que celebran tu esencia.",
  },
  {
    handle: "body-sprays",
    title: "Body Sprays",
    description: "Frescura todo el día, precio que enamora.",
  },
  {
    handle: "sets-regalo",
    title: "Sets & Kits Regalo",
    description: "El regalo perfecto ya está listo.",
  },
];

export const FAMILY_LABELS: Record<ScentFamily, string> = {
  floral: "Floral",
  oriental: "Oriental",
  amaderado: "Amaderado",
  fresco: "Fresco",
  acuatico: "Acuático",
  gourmand: "Gourmand",
  especiado: "Especiado",
};
