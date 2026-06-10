import "server-only";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";

const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /** Segundos de revalidación ISR. Por defecto 900 (15 min). */
  revalidate?: number;
  /** Tags para revalidación on-demand. */
  tags?: string[];
  /** Forzar sin caché (p. ej. carrito). */
  noStore?: boolean;
}

export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 900,
  tags,
  noStore = false,
}: ShopifyFetchOptions): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "Faltan variables de entorno Shopify (SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_TOKEN).",
    );
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    ...(noStore
      ? { cache: "no-store" }
      : { next: { revalidate, ...(tags ? { tags } : {}) } }),
  });

  const json = await res.json();

  if (!res.ok || json.errors) {
    const message =
      json?.errors?.[0]?.message ?? `Shopify request failed (${res.status})`;
    throw new Error(`[Shopify] ${message}`);
  }

  return json.data as T;
}
