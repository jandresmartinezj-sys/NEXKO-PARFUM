/**
 * Formatea un valor en pesos colombianos (COP).
 *
 * Importante: la Storefront API de Shopify devuelve el monto en la unidad
 * mayor de la moneda (COP no usa decimales), p. ej. "124000.0" = $124.000.
 * NO se divide por 100.
 */
export const formatCOP = (price: string | number): string => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (Number.isNaN(num)) return "$0";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

/** Versión corta sin símbolo: 124000 -> "124.000" */
export const formatNumberCO = (price: string | number): string => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (Number.isNaN(num)) return "0";
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(
    num,
  );
};

/** Extrae el volumen en ml de un título (ej. "Yara 100 ML" -> 100). */
export const parseVolumeMl = (title: string): number | null => {
  const m = title.match(/(\d+)\s*ml/i);
  return m ? parseInt(m[1], 10) : null;
};

/** Precio por ml formateado a partir de un precio y un título con volumen. */
export const pricePerMl = (
  price: string | number,
  title: string,
): string | null => {
  const ml = parseVolumeMl(title);
  if (!ml) return null;
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (Number.isNaN(num) || num <= 0) return null;
  return formatCOP(Math.round(num / ml));
};
