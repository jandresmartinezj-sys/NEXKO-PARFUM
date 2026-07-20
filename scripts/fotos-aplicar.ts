/**
 * PASO 2 — Lee nexko-revisar-fotos.csv (ya con SI/NO) y genera el CSV final para
 * importar en Shopify, solo con las filas aprobadas.
 *
 * Uso: npx tsx scripts/fotos-aplicar.ts
 * Salida: nexko-images.csv
 */
import fs from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../nexko-revisar-fotos.csv");

/** Parser CSV mínimo con soporte de comillas. */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else q = false;
      } else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur);
      cur = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else if (c !== "\r") cur += c;
  }
  row.push(cur);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

const parsed = parseCSV(fs.readFileSync(src, "utf8"));
const body = parsed.slice(1); // quita cabecera

const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
const out = [
  ["Handle", "Title", "Image Src", "Image Position", "Image Alt Text"].map(esc).join(","),
];

let ok = 0;
let no = 0;
let blank = 0;

for (const r of body) {
  const [usar, producto, , url, handle] = r;
  const v = (usar ?? "").trim().toUpperCase();
  if (v === "SI" || v === "SÍ" || v === "S" || v === "YES" || v === "X") {
    if (!url || !handle) continue;
    out.push([handle, producto, url, "1", producto].map(esc).join(","));
    ok++;
  } else if (v === "NO" || v === "N") no++;
  else blank++;
}

const dest = resolve(__dirname, "../nexko-images.csv");
fs.writeFileSync(dest, out.join("\r\n"), "utf8");

console.log(`✅ ${dest}`);
console.log(`   ${ok} fotos aprobadas → listas para importar`);
console.log(`   ${no} rechazadas · ${blank} sin marcar (se omiten)`);
