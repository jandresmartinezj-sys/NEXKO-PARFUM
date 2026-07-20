/**
 * Descarga el catálogo público del proveedor (Shopify /products.json) y lo
 * guarda en supplier.json para el emparejamiento de fotos.
 *
 * Uso: npx tsx scripts/fotos-proveedor.ts
 */
import fs from "node:fs";

const BASE = "https://www.aromadeprimera.com.co/products.json";

async function main() {
  const all: { title: string; handle: string; images: string[] }[] = [];

  for (let page = 1; page <= 40; page++) {
    const res = await fetch(`${BASE}?limit=250&page=${page}`);
    if (!res.ok) break;
    const json = (await res.json()) as {
      products: { title: string; handle: string; images: { src: string }[] }[];
    };
    const items = json.products ?? [];
    if (!items.length) break;
    all.push(
      ...items.map((p) => ({
        title: p.title,
        handle: p.handle,
        images: (p.images ?? []).map((i) => i.src),
      })),
    );
    console.log(`  página ${page}: ${items.length}`);
    if (items.length < 250) break;
  }

  fs.writeFileSync("supplier.json", JSON.stringify(all, null, 2), "utf8");
  console.log(`\nTOTAL proveedor: ${all.length} productos`);
  console.log(`con imagen:      ${all.filter((p) => p.images.length).length}`);
}

main();
