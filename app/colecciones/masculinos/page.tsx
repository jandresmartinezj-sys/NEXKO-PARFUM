import type { Metadata } from "next";
import { CollectionView } from "@/components/sections/CollectionView";
import { COLLECTION_THEMES } from "@/lib/data/collections";
import { getCollectionOrTag } from "@/lib/shopify/getCollection";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Perfumes Masculinos",
  description: "Jean Paul Gaultier, Dior, Paco Rabanne y más. Aromas que definen al hombre moderno.",
};

export default async function Page() {
  const products = await getCollectionOrTag("masculinos");
  return <CollectionView theme={COLLECTION_THEMES.masculinos} products={products} />;
}
