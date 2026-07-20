import { getCollectionProducts, getProducts } from "./queries";
import type { Product } from "./types";

const TAG_FOR: Record<string, string> = {
  arabes: "arabe",
  masculinos: "masculino",
  femeninos: "femenino",
  "body-sprays": "body-spray",
  "sets-regalo": "set",
};

/**
 * Devuelve los productos de una colección. Si la colección aún no existe en
 * Shopify (tienda sin sembrar), hace fallback a una búsqueda por tag.
 */
export async function getCollectionOrTag(handle: string): Promise<Product[]> {
  try {
    const { products } = await getCollectionProducts(handle);
    if (products.length) return products;
  } catch (e) {
    console.error(`Colección ${handle}:`, e);
  }
  const tag = TAG_FOR[handle];
  if (!tag) return [];
  try {
    return await getProducts({ query: `tag:${tag}`, first: 500 });
  } catch (e) {
    console.error(`Fallback tag ${tag}:`, e);
    return [];
  }
}
