/**
 * Convierte el catálogo de Perfumarte (JSON de la WooCommerce Store API)
 * en un CSV de importación de productos de Shopify.
 *
 * USO:
 *   1) Sube los archivos JSON a  data/perfumarte/  (cada página de la API).
 *   2) node scripts/perfumarte-to-shopify.mjs
 *   3) Se genera  data/perfumarte-shopify-import.csv  (impórtalo en Shopify:
 *      Productos → Importar).
 *
 * Precio: se usa TAL CUAL el de Perfumarte (según lo pedido). Para aplicar un
 * margen, cambia MARKUP (p. ej. 1.30 = +30%).
 *
 * Filtro: por defecto EXCLUYE productos cuya categoría contenga "alternativa"
 * (para centrarse en perfumería original). Ajusta EXCLUDE_CATEGORIES si quieres.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const SRC_DIR = path.join(process.cwd(), "data", "perfumarte");
const OUT_FILE = path.join(process.cwd(), "data", "perfumarte-shopify-import.csv");
const MARKUP = 1.0; // 1.0 = mismo precio; 1.30 = +30%
const EXCLUDE_CATEGORIES = ["alternativa"]; // en minúsculas; substring match

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function csvCell(v) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Etiquetas de la ficha olfativa de Perfumarte, en orden.
const SPEC_LABELS = [
  "Género", "Marca", "Categoría olfativa", "Concentración", "Clima",
  "Notas de salida", "Notas de corazón", "Notas de fondo",
];
const NEXT = "(?:Género|Marca|Categoría olfativa|Concentración|Clima|Notas de salida|Notas de corazón|Notas de fondo|Garantía|$)";

/** Extrae los campos de la ficha desde el texto plano de la descripción. */
function parseSpec(p) {
  const txt = stripHtml(p.short_description || p.description || "");
  const out = {};
  for (const label of SPEC_LABELS) {
    const re = new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*:?\\s*(.+?)\\s*" + NEXT, "i");
    const m = txt.match(re);
    if (m && m[1]) out[label] = m[1].trim().replace(/\s+/g, " ").slice(0, 300);
  }
  return out;
}

/** Marca para el campo Vendor. */
function vendorOf(spec) {
  return (spec["Marca"] || "").slice(0, 60);
}

/** Reconstruye una descripción HTML limpia (sin imágenes ni refs a Perfumarte). */
function buildBody(spec) {
  const items = SPEC_LABELS
    .filter((l) => spec[l])
    .map((l) => `<li><strong>${l}:</strong> ${spec[l]}</li>`)
    .join("");
  if (!items) return "";
  return `<p><strong>Descripción olfativa</strong></p><ul>${items}</ul><p>Producto original garantizado contra defectos de fábrica.</p>`;
}

/** Precio de la Store API: prices.price en unidades menores. */
function priceOf(p) {
  const pr = p.prices || {};
  const minor = Number(pr.currency_minor_unit ?? 0);
  const raw = Number(pr.price ?? pr.regular_price ?? 0);
  if (!raw) return "";
  const value = raw / Math.pow(10, minor);
  return (value * MARKUP).toFixed(0);
}
function compareAtOf(p) {
  const pr = p.prices || {};
  const minor = Number(pr.currency_minor_unit ?? 0);
  const reg = Number(pr.regular_price ?? 0);
  const sale = Number(pr.sale_price ?? 0);
  if (reg && sale && reg > sale) return ((reg / Math.pow(10, minor)) * MARKUP).toFixed(0);
  return "";
}

function loadAll() {
  if (!existsSync(SRC_DIR)) {
    console.error(`No existe la carpeta ${SRC_DIR}. Crea data/perfumarte/ y sube ahí los JSON.`);
    process.exit(1);
  }
  const files = readdirSync(SRC_DIR).filter((f) => /\.(json|txt)$/i.test(f));
  if (!files.length) {
    console.error(`No hay archivos .json en ${SRC_DIR}.`);
    process.exit(1);
  }
  const all = [];
  for (const f of files) {
    const txt = readFileSync(path.join(SRC_DIR, f), "utf8").trim();
    if (!txt) continue;
    let data;
    try {
      data = JSON.parse(txt);
    } catch {
      console.warn(`Aviso: ${f} no es JSON válido, se omite.`);
      continue;
    }
    const arr = Array.isArray(data) ? data : Array.isArray(data.products) ? data.products : [data];
    all.push(...arr);
  }
  // dedupe por id
  const byId = new Map();
  for (const p of all) byId.set(p.id ?? p.slug ?? Math.random(), p);
  return [...byId.values()];
}

const HEADERS = [
  "Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published",
  "Option1 Name", "Option1 Value", "Variant SKU", "Variant Inventory Qty",
  "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price",
  "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable",
  "Image Src", "Image Position", "Status",
];

function run() {
  const products = loadAll();
  const rows = [HEADERS];
  let kept = 0;
  let skipped = 0;

  for (const p of products) {
    const cats = (p.categories || []).map((c) => (c.name || "").toLowerCase());
    if (EXCLUDE_CATEGORIES.some((ex) => cats.some((c) => c.includes(ex)))) {
      skipped++;
      continue;
    }
    const price = priceOf(p);
    if (!price) {
      skipped++;
      continue;
    }
    kept++;

    const handle = slugify(p.slug || p.name || p.id);
    const title = p.name || "";
    const spec = parseSpec(p);
    const body = buildBody(spec);
    const vendor = vendorOf(spec);
    const tags = (p.categories || []).map((c) => c.name).filter(Boolean).join(", ");
    const sku = p.sku || "";
    const images = (p.images || []).map((im) => im.src).filter(Boolean);
    const firstImg = images[0] || "";

    rows.push([
      handle, title, body, vendor, "Perfume", tags, "TRUE",
      "Title", "Default Title", sku, "0",
      "continue", "manual", price,
      compareAtOf(p), "TRUE", "TRUE",
      firstImg, firstImg ? "1" : "", "active",
    ]);

    // filas adicionales para imágenes extra (solo Handle + Image Src + posición)
    for (let i = 1; i < images.length && i < 8; i++) {
      const extra = new Array(HEADERS.length).fill("");
      extra[0] = handle;
      extra[17] = images[i];
      extra[18] = String(i + 1);
      rows.push(extra);
    }
  }

  if (!existsSync(path.dirname(OUT_FILE))) mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  const csv = rows.map((r) => r.map(csvCell).join(",")).join("\n");
  writeFileSync(OUT_FILE, "﻿" + csv, "utf8"); // BOM para acentos en Excel
  console.log(`✔ ${kept} productos exportados a ${OUT_FILE}`);
  console.log(`  (${skipped} omitidos por filtro/sin precio)`);
}

run();
