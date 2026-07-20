/**
 * PASO 1 — Genera nexko-revisar-fotos.csv para aprobar las fotos sugeridas del
 * proveedor.
 *
 * Solo incluye productos que AÚN NO tienen foto real en la tienda (los que
 * están con placeholder), para no repetir trabajo ya hecho.
 *
 * Columnas: Usar | Producto | Foto sugerida (proveedor) | URL | Handle
 *   - Coincidencias exactas: vienen con "SI".
 *   - Dudosas: vacías, escribe SI o NO.
 *
 * Uso: npx tsx scripts/fotos-revisar.ts
 */
import fs from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOM = "e3tj0y-uf.myshopify.com";
const SF = "102899d1fa43da7b7e65436158bf46d9";

interface Row {
  handle: string;
  mine: string;
  their: string;
  img: string;
  score?: number;
}

/** Handles que ya tienen una foto real (no placeholder) en Shopify. */
async function conFotoReal(): Promise<Set<string>> {
  const out = new Set<string>();
  let cursor: string | null = null;
  for (let i = 0; i < 8; i++) {
    const after: string = cursor ? `, after: "${cursor}"` : "";
    const res = await fetch(`https://${DOM}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: { "X-Shopify-Storefront-Access-Token": SF, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ products(first:250${after}) { pageInfo{hasNextPage endCursor}
          edges{node{ handle featuredImage{url} }} } }`,
      }),
    });
    const d = (await res.json()).data.products;
    for (const e of d.edges) {
      const url: string | undefined = e.node.featuredImage?.url;
      if (url && !/png_[a-f0-9-]{8}|placehold/i.test(url)) out.add(e.node.handle);
    }
    if (!d.pageInfo.hasNextPage) break;
    cursor = d.pageInfo.endCursor;
  }
  return out;
}

async function main() {
  const m = JSON.parse(fs.readFileSync(resolve(__dirname, "../match.json"), "utf8")) as {
    exact: Row[];
    review: Row[];
    none: string[];
  };

  const yaTienen = await conFotoReal();
  const exact = m.exact.filter((r) => !yaTienen.has(r.handle));
  const review = m.review
    .filter((r) => !yaTienen.has(r.handle))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = [
    ["Usar (SI/NO)", "Producto", "Foto sugerida (proveedor)", "URL de la foto", "Handle"]
      .map(esc)
      .join(","),
  ];
  for (const r of exact) rows.push(["SI", r.mine, r.their, r.img, r.handle].map(esc).join(","));
  for (const r of review) rows.push(["", r.mine, r.their, r.img, r.handle].map(esc).join(","));

  const out = resolve(__dirname, "../nexko-revisar-fotos.csv");
  fs.writeFileSync(out, rows.join("\r\n"), "utf8");

  console.log(`✅ ${out}`);
  console.log(`   ya tienen foto real (omitidos): ${yaTienen.size}`);
  console.log(`   ${exact.length} exactas pendientes (marcadas SI)`);
  console.log(`   ${review.length} para revisar (vacías)`);
  console.log(`   ${m.none.length} sin candidato en el proveedor`);
}

main();
