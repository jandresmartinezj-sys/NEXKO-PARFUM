/**
 * Genera un CSV que asigna el placeholder dorado de NEXKO a los productos que
 * quedaron sin imagen en Shopify, para que el admin se vea uniforme.
 *
 * Uso: npx tsx scripts/placeholders-csv.ts
 * Salida: nexko-placeholders.csv
 */
import fs from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOM = "e3tj0y-uf.myshopify.com";
const SF = "102899d1fa43da7b7e65436158bf46d9";

const placeholder = (label: string) =>
  `https://placehold.co/900x900/0A0A12/C9A84C/png?text=${encodeURIComponent(label)}`;

async function main() {
  const all: { handle: string; title: string; vendor: string; img: string | null }[] = [];
  let cursor: string | null = null;

  for (let i = 0; i < 8; i++) {
    const after: string = cursor ? `, after: "${cursor}"` : "";
    const res = await fetch(`https://${DOM}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: { "X-Shopify-Storefront-Access-Token": SF, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ products(first:250${after}) { pageInfo{hasNextPage endCursor}
          edges{node{ handle title vendor featuredImage{url} }} } }`,
      }),
    });
    const data = (await res.json()).data.products;
    all.push(
      ...data.edges.map((e: any) => ({
        handle: e.node.handle,
        title: e.node.title,
        vendor: e.node.vendor,
        img: e.node.featuredImage?.url ?? null,
      })),
    );
    if (!data.pageInfo.hasNextPage) break;
    cursor = data.pageInfo.endCursor;
  }

  const sinImagen = all.filter((p) => !p.img);

  const HEADERS = [
    "Title",
    "URL handle",
    "Option1 name",
    "Option1 value",
    "Product image URL",
    "Image position",
    "Image alt text",
  ];
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = [HEADERS.map(esc).join(",")];

  for (const p of sinImagen) {
    rows.push(
      [p.title, p.handle, "Title", "Default Title", placeholder(p.vendor), "1", p.title]
        .map(esc)
        .join(","),
    );
  }

  const dest = resolve(__dirname, "../nexko-placeholders.csv");
  fs.writeFileSync(dest, rows.join("\r\n"), "utf8");

  console.log(`✅ ${dest}`);
  console.log(`   productos en tienda: ${all.length}`);
  console.log(`   sin imagen (a rellenar): ${sinImagen.length}`);
  console.log(`   ejemplo: ${placeholder(sinImagen[0]?.vendor ?? "NEXKO")}`);
}

main();
