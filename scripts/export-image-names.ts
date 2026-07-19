/**
 * Genera una guía de nombres de archivo para las fotos: por cada producto indica
 * con qué nombre debe guardarse su foto (handle.jpg) para poder armar el CSV de
 * imágenes automáticamente.
 *
 * Uso: npx tsx scripts/export-image-names.ts
 * Salida: nexko-nombres-fotos.csv
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../lib/data/catalog";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CAT_LABEL: Record<string, string> = {
  arabes: "1-Arabes",
  masculinos: "2-Masculinos",
  femeninos: "3-Femeninos",
  "body-sprays": "4-BodySprays",
  "sets-regalo": "5-Sets",
};

const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;

const rows = [["Categoria", "Producto", "Marca", "Nombre del archivo de la foto"].map(esc).join(",")];

const sorted = [...CATALOG].sort((a, b) =>
  (CAT_LABEL[a.category] + a.title).localeCompare(CAT_LABEL[b.category] + b.title),
);

for (const item of sorted) {
  rows.push(
    [CAT_LABEL[item.category], item.title, item.vendor, `${item.handle}.jpg`]
      .map(esc)
      .join(","),
  );
}

const out = resolve(__dirname, "../nexko-nombres-fotos.csv");
writeFileSync(out, rows.join("\r\n"), "utf8");
console.log(`✅ Guía de nombres: ${out}  (${CATALOG.length} productos)`);
