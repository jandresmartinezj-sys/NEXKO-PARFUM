/**
 * Seed de Shopify para NEXKO PARFUM.
 *
 * Crea (de forma idempotente) las 5 colecciones y los productos del catálogo
 * semilla usando la Admin REST API. Vuelve a ejecutarse sin duplicar: si un
 * handle ya existe, lo reutiliza.
 *
 * Uso:  npx tsx scripts/seed.ts
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG, COLLECTIONS } from "../lib/data/catalog";

/* ── Cargar .env.local manualmente ── */
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";
const BASE = `https://${DOMAIN}/admin/api/${API_VERSION}`;

if (!DOMAIN || !ADMIN_TOKEN) {
  console.error("❌ Faltan SHOPIFY_STORE_DOMAIN o SHOPIFY_ADMIN_TOKEN en .env.local");
  process.exit(1);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function admin<T>(
  path: string,
  method: "GET" | "POST" = "GET",
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "X-Shopify-Access-Token": ADMIN_TOKEN,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  await sleep(380); // respetar rate limit (~2 req/s)
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(`[Admin ${res.status}] ${path} → ${text}`);
  }
  return json as T;
}

const placeholder = (label: string) =>
  `https://placehold.co/900x900/0A0A12/C9A84C/png?text=${encodeURIComponent(
    label,
  )}`;

const PRODUCT_TYPE: Record<string, string> = {
  arabes: "Perfume Árabe",
  masculinos: "Perfume Masculino",
  femeninos: "Perfume Femenino",
  "body-sprays": "Body Spray",
  "sets-regalo": "Set de Regalo",
};

async function ensureCollections(): Promise<Record<string, number>> {
  const existing = await admin<{ custom_collections: { id: number; handle: string }[] }>(
    `/custom_collections.json?limit=250`,
  );
  const byHandle = new Map(existing.custom_collections.map((c) => [c.handle, c.id]));
  const ids: Record<string, number> = {};

  for (const col of COLLECTIONS) {
    if (byHandle.has(col.handle)) {
      ids[col.handle] = byHandle.get(col.handle)!;
      console.log(`• Colección ya existe: ${col.title}`);
      continue;
    }
    const created = await admin<{ custom_collection: { id: number } }>(
      `/custom_collections.json`,
      "POST",
      {
        custom_collection: {
          title: col.title,
          handle: col.handle,
          body_html: `<p>${col.description}</p>`,
          published: true,
        },
      },
    );
    ids[col.handle] = created.custom_collection.id;
    console.log(`✓ Colección creada: ${col.title}`);
  }
  return ids;
}

async function getExistingProductHandles(): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  let pageInfo: string | null = null;
  do {
    const url: string = pageInfo
      ? `/products.json?limit=250&page_info=${pageInfo}`
      : `/products.json?limit=250&fields=id,handle`;
    // page_info pagination via Link header is complex; for a small store a single page suffices.
    const res = await fetch(`${BASE}${url}`, {
      headers: { "X-Shopify-Access-Token": ADMIN_TOKEN },
    });
    await sleep(380);
    const json = (await res.json()) as { products: { id: number; handle: string }[] };
    for (const p of json.products) map.set(p.handle, p.id);
    pageInfo = null; // single page (catálogo semilla es pequeño)
  } while (pageInfo);
  return map;
}

async function main() {
  console.log("🌱 Sembrando NEXKO PARFUM en", DOMAIN, "\n");

  const collectionIds = await ensureCollections();
  console.log("");

  const existingProducts = await getExistingProductHandles();
  let created = 0;
  let skipped = 0;

  for (const item of CATALOG) {
    if (existingProducts.has(item.handle)) {
      console.log(`• Producto ya existe: ${item.title}`);
      // asegurar vínculo a colección igualmente
      const pid = existingProducts.get(item.handle)!;
      await linkToCollection(pid, collectionIds[item.category]);
      skipped++;
      continue;
    }

    const stock = 3 + Math.floor(Math.random() * 13); // 3–15
    const showDiscount = item.bestseller || Math.random() < 0.4;
    const compareAt = showDiscount
      ? Math.round((item.priceVenta * 1.25) / 1000) * 1000
      : undefined;

    const payload = {
      product: {
        title: item.title,
        handle: item.handle,
        body_html: `<p>${item.description}</p>`,
        vendor: item.vendor,
        product_type: PRODUCT_TYPE[item.category],
        status: "active",
        published: true,
        tags: Array.from(
          new Set([...item.tags, item.gender, item.presentation, item.family]),
        ).join(", "),
        images: [{ src: placeholder(item.vendor) }],
        variants: [
          {
            price: item.priceVenta.toFixed(2),
            ...(compareAt ? { compare_at_price: compareAt.toFixed(2) } : {}),
            inventory_management: "shopify",
            inventory_policy: "deny",
            inventory_quantity: stock,
            requires_shipping: true,
            taxable: true,
          },
        ],
      },
    };

    const res = await admin<{ product: { id: number } }>(
      `/products.json`,
      "POST",
      payload,
    );
    await linkToCollection(res.product.id, collectionIds[item.category]);
    created++;
    console.log(
      `✓ ${item.title}  —  $${item.priceVenta.toLocaleString("es-CO")}  (stock ${stock})`,
    );
  }

  console.log(
    `\n✅ Listo. ${created} creados, ${skipped} ya existían. ${CATALOG.length} en catálogo.`,
  );
}

async function linkToCollection(productId: number, collectionId?: number) {
  if (!collectionId) return;
  try {
    await admin(`/collects.json`, "POST", {
      collect: { product_id: productId, collection_id: collectionId },
    });
  } catch (e) {
    // Si ya está vinculado, Shopify devuelve error 422; lo ignoramos.
    if (!(e instanceof Error && e.message.includes("422"))) throw e;
  }
}

main().catch((e) => {
  console.error("\n❌ Error en el seed:", e);
  process.exit(1);
});
