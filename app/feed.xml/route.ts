import { getProducts } from "@/lib/shopify/queries";
import type { Product } from "@/lib/shopify/types";

/**
 * Feed de productos para Google Merchant Center (RSS 2.0 con namespace g:).
 * Pega esta URL en Merchant Center: https://www.nexkogroup.com/feed.xml
 * Los enlaces apuntan a las fichas reales del sitio (/tienda/<handle>).
 */

export const revalidate = 3600; // se regenera cada hora

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexkogroup.com"
).replace(/\/+$/, "");

/** Escapa caracteres XML en texto plano. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Quita HTML y normaliza espacios para la descripción del feed. */
function plain(s: string, max = 5000): string {
  const t = (s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max) : t;
}

function itemXml(p: Product): string {
  const link = `${SITE_URL}/tienda/${p.handle}`;
  const price = `${Number(p.priceRange.minVariantPrice.amount).toFixed(2)} ${p.priceRange.minVariantPrice.currencyCode}`;
  const availability = p.availableForSale ? "in_stock" : "out_of_stock";
  const image = p.featuredImage?.url ?? "";
  const desc = plain(p.description) || `${p.title} de ${p.vendor}, 100% original.`;

  return [
    "    <item>",
    `      <g:id>${esc(p.handle)}</g:id>`,
    `      <g:title><![CDATA[${p.title.replace(/\]\]>/g, "")}]]></g:title>`,
    `      <g:description><![CDATA[${desc.replace(/\]\]>/g, "")}]]></g:description>`,
    `      <g:link>${esc(link)}</g:link>`,
    image ? `      <g:image_link>${esc(image)}</g:image_link>` : "",
    `      <g:availability>${availability}</g:availability>`,
    `      <g:price>${esc(price)}</g:price>`,
    p.vendor ? `      <g:brand>${esc(p.vendor)}</g:brand>` : "",
    `      <g:condition>new</g:condition>`,
    `      <g:identifier_exists>no</g:identifier_exists>`,
    `      <g:product_type>Perfumería</g:product_type>`,
    "    </item>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET() {
  let products: Product[] = [];
  try {
    products = await getProducts({ first: 5000 });
  } catch (e) {
    console.error("feed.xml:", e);
  }

  const items = products
    .filter((p) => p.featuredImage?.url) // Google exige imagen
    .map(itemXml)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>NEXKO PARFUM — Catálogo</title>
    <link>${SITE_URL}</link>
    <description>Perfumería 100% original en Colombia. Envío nacional y pago contra entrega.</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
