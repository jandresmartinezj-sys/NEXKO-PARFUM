/**
 * Genera nexko-images.csv con las URLs de las fotos ya rellenadas, a partir de
 * la ruta base de Shopify Files.
 *
 * Uso:
 *   npx tsx scripts/build-images-csv.ts <URL_BASE_O_EJEMPLO> [extension]
 *
 * Ejemplos:
 *   npx tsx scripts/build-images-csv.ts "https://cdn.shopify.com/s/files/1/0999/6052/1075/files/algo.jpg?v=123"
 *   npx tsx scripts/build-images-csv.ts "https://cdn.shopify.com/s/files/1/0999/6052/1075/files/" png
 *
 * Salida: nexko-images.csv  (Handle, Title, Image Src, Image Position, Image Alt Text)
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../lib/data/catalog";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawArg = process.argv[2];
const ext = (process.argv[3] ?? "jpg").replace(/^\./, "").toLowerCase();

if (!rawArg) {
  console.error("Falta la URL. Ej: npx tsx scripts/build-images-csv.ts \"https://cdn.shopify.com/s/files/1/XXXX/YYYY/files/foo.jpg?v=1\"");
  process.exit(1);
}

// Deriva la carpeta base: quita query y el nombre de archivo final.
const noQuery = rawArg.split("?")[0];
const base = noQuery.endsWith("/")
  ? noQuery
  : noQuery.slice(0, noQuery.lastIndexOf("/") + 1);

if (!/^https:\/\/cdn\.shopify\.com\/s\/files\/.+\/files\/$/.test(base)) {
  console.error(`Ruta base no reconocida: ${base}`);
  console.error('Debe verse como https://cdn.shopify.com/s/files/1/XXXX/YYYY/files/');
  process.exit(1);
}

const HEADERS = ["Handle", "Title", "Image Src", "Image Position", "Image Alt Text"];
const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

const rows = [HEADERS.map(esc).join(",")];
for (const item of CATALOG) {
  rows.push(
    [item.handle, item.title, `${base}${item.handle}.${ext}`, "1", item.title]
      .map(esc)
      .join(","),
  );
}

const out = resolve(__dirname, "../nexko-images.csv");
writeFileSync(out, rows.join("\r\n"), "utf8");

console.log(`✅ ${out}`);
console.log(`   ${CATALOG.length} productos · extensión .${ext}`);
console.log(`   Base: ${base}`);
console.log(`   Ejemplo: ${base}${CATALOG[0].handle}.${ext}`);
