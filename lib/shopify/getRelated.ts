import { getProductRecommendations, getProducts } from "./queries";
import type { Product } from "./types";

const CATEGORY_TAGS = ["arabe", "masculino", "femenino", "body-spray", "set"];

function primaryTag(product: Product): string | null {
  const tags = product.tags.map((t) => t.toLowerCase());
  return CATEGORY_TAGS.find((t) => tags.includes(t)) ?? null;
}

/**
 * Productos relacionados. Usa las recomendaciones de Shopify y, si la tienda es
 * nueva (recomendaciones vacías), completa con productos de la misma categoría.
 */
export async function getRelated(product: Product, limit = 10): Promise<Product[]> {
  const out: Product[] = [];
  const seen = new Set<string>([product.id]);

  try {
    for (const r of await getProductRecommendations(product.id)) {
      if (!seen.has(r.id)) {
        seen.add(r.id);
        out.push(r);
      }
    }
  } catch {
    /* ignora */
  }

  if (out.length < limit) {
    const tag = primaryTag(product);
    if (tag) {
      try {
        const sameCat = await getProducts({ query: `tag:${tag}`, first: limit + 5 });
        for (const p of sameCat) {
          if (out.length >= limit) break;
          if (!seen.has(p.id)) {
            seen.add(p.id);
            out.push(p);
          }
        }
      } catch {
        /* ignora */
      }
    }
  }

  return out.slice(0, limit);
}
