import type { Metadata } from "next";
import { CollectionView } from "@/components/sections/CollectionView";
import { COLLECTION_THEMES } from "@/lib/data/collections";
import { getCollectionOrTag } from "@/lib/shopify/getCollection";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Perfumes Femeninos",
  description: "Carolina Herrera, Victoria's Secret, Tous y más. Fragancias que celebran tu esencia.",
};

export default async function Page() {
  const products = await getCollectionOrTag("femeninos");
  return <CollectionView theme={COLLECTION_THEMES.femeninos} products={products} />;
}
