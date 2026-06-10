/**
 * Genera una plantilla CSV para CARGAR/ACTUALIZAR imágenes de productos en
 * Shopify de forma masiva (Productos → Importar, marcando "sobrescribir").
 *
 * Rellena la columna "Image Src" con la URL pública de cada foto y reimporta.
 * Para varias imágenes por producto: duplica la fila con el mismo Handle y
 * cambia "Image Position" (2, 3, ...).
 *
 * Uso:  npx tsx scripts/export-images-template.ts
 * Salida: nexko-images.csv
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../lib/data/catalog";

const __dirname = dirname(fileURLToPath(import.meta.url));

const HEADERS = ["Handle", "Title", "Image Src", "Image Position", "Image Alt Text"];
const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

const rows = [HEADERS.map(esc).join(",")];
for (const item of CATALOG) {
  rows.push(
    [
      item.handle,
      item.title, // solo referencia visual; el match es por Handle
      "", // ← pega aquí la URL pública de la foto
      "1",
      item.title,
    ]
      .map(esc)
      .join(","),
  );
}

const out = resolve(__dirname, "../nexko-images.csv");
writeFileSync(out, rows.join("\r\n"), "utf8");
console.log(`✅ Plantilla de imágenes: ${out}`);
console.log(`   ${CATALOG.length} filas. Rellena "Image Src" y reimporta en Shopify.`);
