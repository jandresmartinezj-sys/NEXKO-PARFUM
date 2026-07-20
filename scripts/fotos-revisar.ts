/**
 * PASO 1 — Genera nexko-revisar-fotos.csv para que el usuario apruebe las fotos
 * sugeridas del proveedor.
 *
 * Columnas: Usar | Producto | Foto sugerida (proveedor) | URL | Handle
 *   - Las coincidencias exactas vienen con "SI".
 *   - Las dudosas vienen vacías: escribe SI o NO.
 *
 * Uso: npx tsx scripts/fotos-revisar.ts
 */
import fs from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const m = JSON.parse(fs.readFileSync(resolve(__dirname, "../match.json"), "utf8"));

const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
const rows = [
  ["Usar (SI/NO)", "Producto", "Foto sugerida (proveedor)", "URL de la foto", "Handle"]
    .map(esc)
    .join(","),
];

for (const r of m.exact) {
  rows.push(["SI", r.mine, r.their, r.img, r.handle].map(esc).join(","));
}
for (const r of m.review.sort((a: any, b: any) => b.score - a.score)) {
  rows.push(["", r.mine, r.their, r.img, r.handle].map(esc).join(","));
}

const out = resolve(__dirname, "../nexko-revisar-fotos.csv");
fs.writeFileSync(out, rows.join("\r\n"), "utf8");

console.log(`✅ ${out}`);
console.log(`   ${m.exact.length} ya marcadas SI (coincidencia exacta)`);
console.log(`   ${m.review.length} para que revises (columna Usar vacía)`);
console.log(`   ${m.none.length} productos sin foto disponible en el proveedor`);
