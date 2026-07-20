/**
 * Genera el CSV para CREAR en Shopify los productos que aún no existen en la
 * tienda (compara contra los handles reales vía Storefront API).
 *
 * Formato: plantilla actual de Shopify (product_template.csv).
 * Salida: nexko-nuevos.csv
 */
import fs from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../lib/data/catalog";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DOM = "e3tj0y-uf.myshopify.com";
const SF = "102899d1fa43da7b7e65436158bf46d9";

const PRODUCT_TYPE: Record<string, string> = {
  arabes: "Perfume Árabe",
  masculinos: "Perfume Masculino",
  femeninos: "Perfume Femenino",
  "body-sprays": "Body Spray",
  "sets-regalo": "Set de Regalo",
};

/** Fotos con coincidencia EXACTA de nombre en el catálogo del proveedor. */
function fotosExactas(): Map<string, string> {
  const p = resolve(__dirname, "../match.json");
  if (!fs.existsSync(p)) return new Map();
  const m = JSON.parse(fs.readFileSync(p, "utf8")) as {
    exact: { handle: string; img: string }[];
  };
  return new Map(m.exact.filter((r) => r.img).map((r) => [r.handle, r.img]));
}

async function main() {
  const fotos = fotosExactas();

  // handles que ya existen en la tienda
  const res = await fetch(`https://${DOM}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: { "X-Shopify-Storefront-Access-Token": SF, "Content-Type": "application/json" },
    body: JSON.stringify({ query: "{ products(first:250){edges{node{handle}}} }" }),
  });
  const json = (await res.json()) as {
    data: { products: { edges: { node: { handle: string } }[] } };
  };
  const live = new Set(json.data.products.edges.map((e) => e.node.handle));

  const pendientes = CATALOG.filter((c) => !live.has(c.handle));

  const HEADERS = [
    "Title",
    "URL handle",
    "Description",
    "Vendor",
    "Type",
    "Tags",
    "Published on online store",
    "Status",
    "Option1 name",
    "Option1 value",
    "Price",
    "Inventory tracker",
    "Inventory quantity",
    "Continue selling when out of stock",
    "Requires shipping",
    "Fulfillment service",
    "Product image URL",
    "Image position",
    "Image alt text",
  ];
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = [HEADERS.map(esc).join(",")];

  let conFoto = 0;
  for (const item of pendientes) {
    const stock = 3 + Math.floor(Math.random() * 13);
    const img = fotos.get(item.handle) ?? "";
    if (img) conFoto++;
    rows.push(
      [
        item.title,
        item.handle,
        `<p>${item.description}</p>`,
        item.vendor,
        PRODUCT_TYPE[item.category] ?? "Perfume",
        item.tags.join(", "),
        "TRUE",
        "Active",
        "Title",
        "Default Title",
        item.priceVenta.toFixed(2),
        "shopify",
        String(stock),
        "DENY",
        "TRUE",
        "manual",
        img,
        img ? "1" : "",
        img ? item.title : "",
      ]
        .map(esc)
        .join(","),
    );
  }

  const dest = resolve(__dirname, "../nexko-nuevos.csv");
  fs.writeFileSync(dest, rows.join("\r\n"), "utf8");

  console.log(`✅ ${dest}`);
  console.log(`   en la tienda: ${live.size}`);
  console.log(`   en el catálogo local: ${CATALOG.length}`);
  console.log(`   A CREAR: ${pendientes.length}`);
  console.log(`   con foto del proveedor: ${conFoto}`);
  console.log(`   con placeholder: ${pendientes.length - conFoto}`);
}

main();
