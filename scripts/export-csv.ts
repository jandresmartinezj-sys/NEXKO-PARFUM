/**
 * Genera un CSV compatible con la importación de productos de Shopify
 * (Productos → Importar) a partir del catálogo semilla.
 *
 * Uso:  npx tsx scripts/export-csv.ts
 * Salida: nexko-products.csv (en la raíz del proyecto)
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../lib/data/catalog";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PRODUCT_TYPE: Record<string, string> = {
  arabes: "Perfume Árabe",
  masculinos: "Perfume Masculino",
  femeninos: "Perfume Femenino",
  "body-sprays": "Body Spray",
  "sets-regalo": "Set de Regalo",
};

const placeholder = (label: string) =>
  `https://placehold.co/900x900/0A0A12/C9A84C/png?text=${encodeURIComponent(label)}`;

const HEADERS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Status",
];

const esc = (v: string | number) => {
  const s = String(v);
  return `"${s.replace(/"/g, '""')}"`;
};

const rows: string[] = [HEADERS.map(esc).join(",")];

for (const item of CATALOG) {
  const stock = 3 + Math.floor(Math.random() * 13);
  const showDiscount = item.bestseller || Math.random() < 0.4;
  const compareAt = showDiscount
    ? Math.round((item.priceVenta * 1.25) / 1000) * 1000
    : "";
  const tags = Array.from(
    new Set([...item.tags, item.gender, item.presentation, item.family]),
  ).join(", ");

  const row = [
    item.handle,
    item.title,
    `<p>${item.description}</p>`,
    item.vendor,
    PRODUCT_TYPE[item.category],
    tags,
    "TRUE",
    "Title",
    "Default Title",
    "shopify",
    stock,
    "deny",
    "manual",
    item.priceVenta.toFixed(2),
    compareAt === "" ? "" : Number(compareAt).toFixed(2),
    "TRUE",
    "TRUE",
    placeholder(item.vendor),
    "1",
    item.title,
    "active",
  ];
  rows.push(row.map(esc).join(","));
}

const out = resolve(__dirname, "../nexko-products.csv");
writeFileSync(out, rows.join("\r\n"), "utf8");
console.log(`✅ CSV generado: ${out}`);
console.log(`   ${CATALOG.length} productos listos para importar en Shopify.`);
