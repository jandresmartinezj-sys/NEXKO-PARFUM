import type { Metadata } from "next";
import { CollectionView } from "@/components/sections/CollectionView";
import { COLLECTION_THEMES } from "@/lib/data/collections";
import { getCollectionOrTag } from "@/lib/shopify/getCollection";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Perfumes Árabes & Orientales",
  description: "Lattafa, Xerjoff, Paris Corner y más. Fragancias que cuentan historias milenarias.",
};

export default async function Page() {
  const products = await getCollectionOrTag("arabes");
  return <CollectionView theme={COLLECTION_THEMES.arabes} products={products} />;
}
