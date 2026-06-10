import type { Metadata } from "next";
import { CollectionView } from "@/components/sections/CollectionView";
import { COLLECTION_THEMES } from "@/lib/data/collections";
import { getCollectionOrTag } from "@/lib/shopify/getCollection";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Sets & Kits de Regalo",
  description: "El regalo perfecto ya está listo: minis, cremas y frascos full size en sets de lujo.",
};

export default async function Page() {
  const products = await getCollectionOrTag("sets-regalo");
  return <CollectionView theme={COLLECTION_THEMES["sets-regalo"]} products={products} />;
}
