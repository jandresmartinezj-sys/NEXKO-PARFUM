import type { Product } from "@/lib/shopify/types";
import { SCENT_BY_HANDLE } from "@/lib/data/catalog";

/**
 * Ficha "Descripción olfativa" (estilo Perfumarte): atributos con iconos.
 * Toma los datos de dos fuentes, en orden:
 *   1) metadatos internos (SCENT_BY_HANDLE) para el catálogo semilla NEXKO;
 *   2) la propia descripción del producto (catálogo importado), parseando
 *      los campos "Género:", "Marca:", "Notas de salida:", etc.
 * Cada fila se omite si no hay dato.
 */

const FAMILY_LABEL: Record<string, string> = {
  floral: "Floral",
  oriental: "Oriental",
  amaderado: "Amaderado",
  fresco: "Fresco",
  acuatico: "Acuático",
  gourmand: "Gourmand / Dulce",
  especiado: "Especiado",
};
const GENDER_LABEL: Record<string, string> = {
  dama: "Femenino",
  caballero: "Masculino",
  unisex: "Unisex",
};
const INTENSITY_LABEL: Record<string, string> = {
  light: "Ligera",
  moderate: "Moderada",
  intense: "Intensa",
  extreme: "Extrema",
};

// Etiquetas que aparecen en la descripción de los productos importados.
const TEXT_LABELS = [
  "Género",
  "Marca",
  "Categoría olfativa",
  "Concentración",
  "Clima",
  "Notas de salida",
  "Notas de corazón",
  "Notas de fondo",
] as const;
const NEXT =
  "(?:Género|Marca|Categoría olfativa|Concentración|Clima|Notas de salida|Notas de corazón|Notas de fondo|Garantía|Producto original|Producto garantizado|$)";

/** Extrae los campos de la ficha desde el texto de la descripción. */
function parseFromText(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!text) return out;
  const clean = text.replace(/\s+/g, " ").trim();
  for (const label of TEXT_LABELS) {
    const re = new RegExp(
      label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*:?\\s*(.+?)\\s*" + NEXT,
      "i",
    );
    const m = clean.match(re);
    if (m && m[1]) out[label] = m[1].trim().replace(/[.;]+$/, "").slice(0, 400);
  }
  return out;
}

/** Devuelve las filas {label, value} de la ficha para un producto. */
export function specRows(product: Product): { label: string; value: string; icon: string }[] {
  const local = SCENT_BY_HANDLE[product.handle];
  let f: Record<string, string> = {};

  if (local) {
    f = {
      Género: GENDER_LABEL[local.gender],
      Marca: product.vendor || local.vendor,
      "Categoría olfativa": FAMILY_LABEL[local.family],
      Intensidad: INTENSITY_LABEL[local.intensity],
      "Notas de salida": local.accords.top?.join(", "),
      "Notas de corazón": local.accords.heart?.join(", "),
      "Notas de fondo": local.accords.base?.join(", "),
    };
  } else {
    f = parseFromText(product.description || "");
    if (!f["Marca"] && product.vendor) f["Marca"] = product.vendor;
  }

  const order: [string, string][] = [
    ["Género", "genero"],
    ["Marca", "marca"],
    ["Categoría olfativa", "familia"],
    ["Concentración", "concentracion"],
    ["Intensidad", "intensidad"],
    ["Clima", "clima"],
    ["Notas de salida", "notas"],
    ["Notas de corazón", "notas"],
    ["Notas de fondo", "notas"],
  ];

  return order
    .filter(([k]) => f[k])
    .map(([k, icon]) => ({ label: k, value: f[k], icon }));
}

/* Iconos dorados, nítidos y reconocibles (sin círculo de fondo). */
const S = { className: "h-7 w-7", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ICONS: Record<string, React.ReactNode> = {
  // Símbolo de género (Venus + Marte entrelazados)
  genero: (
    <svg viewBox="0 0 24 24" {...S}><circle cx="11" cy="13" r="5" /><path d="M14.5 9.5L20 4m0 0h-4m4 0v4" /></svg>
  ),
  // Estrella (marca)
  marca: (
    <svg viewBox="0 0 24 24" {...S}><path d="M12 3.2l2.5 5.3 5.8.8-4.2 4 1 5.7L12 16.9 6.9 19l1-5.7-4.2-4 5.8-.8z" /></svg>
  ),
  // Frasco de perfume (categoría olfativa)
  familia: (
    <svg viewBox="0 0 24 24" {...S}><path d="M10 2h4v3h-4z" /><path d="M9 5h6a1 1 0 011 1v1H8V6a1 1 0 011-1z" /><path d="M8 7h8v12a2 2 0 01-2 2h-4a2 2 0 01-2-2z" /><path d="M9 12h6" /></svg>
  ),
  // Gotero (concentración)
  concentracion: (
    <svg viewBox="0 0 24 24" {...S}><path d="M12 3s5 5.5 5 9a5 5 0 01-10 0c0-3.5 5-9 5-9z" /></svg>
  ),
  intensidad: (
    <svg viewBox="0 0 24 24" {...S}><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
  ),
  // Sol tras nube (clima)
  clima: (
    <svg viewBox="0 0 24 24" {...S}><circle cx="8" cy="8" r="3" /><path d="M8 1v2M2.5 8H1M3.8 3.8l-1 -1M13 4.5l1-1" /><path d="M17.5 13a3.5 3.5 0 00-6.9-.8A3 3 0 106 18h10.5a2.5 2.5 0 001-4.8z" /></svg>
  ),
  // Pirámide olfativa (notas)
  notas: (
    <svg viewBox="0 0 24 24" {...S}><path d="M12 3l9 16H3z" /><path d="M8.5 12h7M6.5 15.5h11" /></svg>
  ),
  // Medalla / garantía
  garantia: (
    <svg viewBox="0 0 24 24" {...S}><circle cx="12" cy="9" r="6" /><path d="M9 14l-1.5 7L12 19l4.5 2L15 14" /><path d="M9.5 9l1.7 1.7L14.5 7.5" /></svg>
  ),
};

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3.5">
      <span className="mt-0.5 shrink-0 text-gold">{ICONS[icon]}</span>
      <p className="text-[15px] leading-relaxed text-ink-secondary">
        <span className="font-semibold text-ink-primary">{label}:</span> {value}
      </p>
    </li>
  );
}

export function ProductSpecs({ product }: { product: Product }) {
  const rows = specRows(product);
  if (!rows.length) return null;

  return (
    <div className="mt-10 rounded-2xl border border-subtle bg-cream/60 p-6 sm:p-7">
      <h2 className="font-display text-lg uppercase tracking-wide text-ink-primary">
        Descripción olfativa
      </h2>
      <div className="mb-5 mt-3 h-px w-full bg-subtle" />
      <ul className="space-y-4">
        {rows.map((r) => (
          <Row key={r.label} icon={r.icon} label={r.label} value={r.value} />
        ))}
        <Row
          icon="garantia"
          label="Garantía"
          value="Producto original garantizado contra defectos de fábrica."
        />
      </ul>
    </div>
  );
}
