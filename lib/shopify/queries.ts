import { shopifyFetch } from "./client";
import type { Product, Collection } from "./types";

/* ─────────────── Fragments ─────────────── */

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    featuredImage { url altText width height }
    images(first: 8) {
      edges { node { url altText width height } }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
  }
`;

/* ─────────────── Reshape helpers ─────────────── */

type Edges<T> = { edges: { node: T }[] };
const flatten = <T>(c?: Edges<T>): T[] => (c ? c.edges.map((e) => e.node) : []);

interface RawProduct extends Omit<Product, "images" | "variants"> {
  images: Edges<Product["images"][number]>;
  variants: Edges<Product["variants"][number]>;
}

function reshapeProduct(p: RawProduct | null): Product | null {
  if (!p) return null;
  return {
    ...p,
    images: flatten(p.images),
    variants: flatten(p.variants),
  };
}

/* ─────────────── Queries ─────────────── */

export async function getProducts(opts?: {
  first?: number;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const data = await shopifyFetch<{ products: Edges<RawProduct> }>({
    query: /* GraphQL */ `
      query Products($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
        products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
          edges { node { ...ProductFields } }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: {
      first: opts?.first ?? 100,
      query: opts?.query,
      sortKey: opts?.sortKey ?? "BEST_SELLING",
      reverse: opts?.reverse ?? false,
    },
  });
  return flatten(data.products)
    .map(reshapeProduct)
    .filter((p): p is Product => p !== null);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: /* GraphQL */ `
      query Product($handle: String!) {
        product(handle: $handle) { ...ProductFields }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle },
  });
  return reshapeProduct(data.product);
}

export async function getCollectionProducts(
  handle: string,
  first = 100,
): Promise<{ collection: Collection | null; products: Product[] }> {
  const data = await shopifyFetch<{
    collection: {
      id: string;
      handle: string;
      title: string;
      description: string;
      image: Collection["image"];
      products: Edges<RawProduct>;
    } | null;
  }>({
    query: /* GraphQL */ `
      query Collection($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          id
          handle
          title
          description
          image { url altText width height }
          products(first: $first) {
            edges { node { ...ProductFields } }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle, first },
  });

  if (!data.collection) return { collection: null, products: [] };

  const products = flatten(data.collection.products)
    .map(reshapeProduct)
    .filter((p): p is Product => p !== null);

  return {
    collection: { ...data.collection, products },
    products,
  };
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const data = await shopifyFetch<{ productRecommendations: RawProduct[] }>({
    query: /* GraphQL */ `
      query Recommendations($productId: ID!) {
        productRecommendations(productId: $productId) { ...ProductFields }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { productId },
  });
  return (data.productRecommendations ?? [])
    .map(reshapeProduct)
    .filter((p): p is Product => p !== null);
}
