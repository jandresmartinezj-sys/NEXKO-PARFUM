import type { Product } from "@/lib/shopify/types";
import { SCENT_BY_HANDLE } from "@/lib/data/catalog";

/**
 * Ficha "Descripción olfativa" (estilo Perfumarte): lista de atributos con
 * iconos. Usa los metadatos de aroma (SCENT_BY_HANDLE) cuando existen y, si no,
 * muestra lo que se pueda derivar del producto. Cada fila se omite si no hay dato.
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

function genderFromTags(tags: string[]): string | undefined {
  const t = tags.map((x) => x.toLowerCase());
  if (t.includes("unisex")) return "Unisex";
  if (t.includes("masculino")) return "Masculino";
  if (t.includes("femenino")) return "Femenino";
  return undefined;
}

function concentration(tags: string[], presentation?: string): string {
  const t = tags.map((x) => x.toLowerCase()).join(" ");
  if (presentation === "spray" || t.includes("body spray") || t.includes("body mist"))
    return "Body Spray";
  if (t.includes("eau de toilette") || t.includes("edt")) return "Eau de Toilette";
  if (t.includes("extrait") || t.includes("parfum intense")) return "Extrait de Parfum";
  return "Eau de Parfum";
}

/* Iconos (círculo dorado + trazo) */
function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
      {children}
    </span>
  );
}
const stroke = { className: "h-4 w-4 fill-none stroke-current", strokeWidth: 1.8 } as const;

const ICONS: Record<string, React.ReactNode> = {
  genero: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14v7M9 18h6" />
    </svg>
  ),
  marca: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
    </svg>
  ),
  familia: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M10 3h4v3a3 3 0 013 3v9a3 3 0 01-3 3H10a3 3 0 01-3-3V9a3 3 0 013-3z" />
      <path d="M9 12h6" />
    </svg>
  ),
  concentracion: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3v4M9 7h6l-1 4a4 4 0 01-8 0z" />
      <path d="M8 21h8" />
    </svg>
  ),
  intensidad: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3s5 4 5 9a5 5 0 01-10 0c0-2 1-3 2-4" />
    </svg>
  ),
  notas: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 4l8 15H4z" />
    </svg>
  ),
  garantia: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex gap-3">
      <IconWrap>{icon}</IconWrap>
      <p className="text-sm leading-relaxed text-ink-secondary">
        <span className="font-semibold text-ink-primary">{label}:</span> {value}
      </p>
    </li>
  );
}

export function ProductSpecs({ product }: { product: Product }) {
  const scent = SCENT_BY_HANDLE[product.handle];

  const genero = scent ? GENDER_LABEL[scent.gender] : genderFromTags(product.tags);
  const familia = scent ? FAMILY_LABEL[scent.family] : undefined;
  const intensidad = scent ? INTENSITY_LABEL[scent.intensity] : undefined;
  const conc = concentration(product.tags, scent?.presentation);

  return (
    <div className="mt-10 border-t border-subtle pt-8">
      <h2 className="font-display text-lg uppercase tracking-wide text-ink-primary">
        Descripción olfativa
      </h2>

      <ul className="mt-5 space-y-4">
        {genero && <Row icon={ICONS.genero} label="Género" value={genero} />}
        <Row icon={ICONS.marca} label="Marca" value={product.vendor || "—"} />
        {familia && <Row icon={ICONS.familia} label="Familia olfativa" value={familia} />}
        <Row icon={ICONS.concentracion} label="Concentración" value={conc} />
        {intensidad && <Row icon={ICONS.intensidad} label="Intensidad" value={intensidad} />}

        {scent?.accords.top?.length ? (
          <Row icon={ICONS.notas} label="Notas de salida" value={scent.accords.top.join(", ")} />
        ) : null}
        {scent?.accords.heart?.length ? (
          <Row icon={ICONS.notas} label="Notas de corazón" value={scent.accords.heart.join(", ")} />
        ) : null}
        {scent?.accords.base?.length ? (
          <Row icon={ICONS.notas} label="Notas de fondo" value={scent.accords.base.join(", ")} />
        ) : null}

        <Row
          icon={ICONS.garantia}
          label="Garantía"
          value="Producto garantizado contra defectos de fábrica."
        />
      </ul>
    </div>
  );
}
