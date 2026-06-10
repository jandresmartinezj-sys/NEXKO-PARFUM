import type { Metadata } from "next";
import { CollectionView } from "@/components/sections/CollectionView";
import { COLLECTION_THEMES } from "@/lib/data/collections";
import { getCollectionOrTag } from "@/lib/shopify/getCollection";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Body Sprays 200ml",
  description: "Frescura todo el día a precio que enamora. Orientica, Lattafa, Armaf y más.",
};

export default async function Page() {
  const products = await getCollectionOrTag("body-sprays");
  return <CollectionView theme={COLLECTION_THEMES["body-sprays"]} products={products} />;
}
