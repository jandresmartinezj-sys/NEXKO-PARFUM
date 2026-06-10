import type { Metadata } from "next";
import { GiftKitBuilder } from "@/components/sections/GiftKitBuilder";
import { getProducts } from "@/lib/shopify/queries";
import type { Product } from "@/lib/shopify/types";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Arma tu kit de regalo",
  description:
    "Combina tu fragancia favorita con un body spray y crea el regalo perfecto. Envío a toda Colombia.",
};

async function safe(query: string): Promise<Product[]> {
  try {
    return await getProducts({ query, first: 100 });
  } catch (e) {
    console.error("armar-kit:", e);
    return [];
  }
}

export default async function ArmarKitPage() {
  const [perfumes, sprays] = await Promise.all([
    safe("tag:arabe OR tag:masculino OR tag:femenino"),
    safe("tag:body-spray"),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Personalízalo</p>
        <h1 className="font-display text-4xl text-ink-primary">Arma tu kit de regalo</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-secondary">
          Elige una fragancia y un body spray para crear un set único. Perfecto para
          regalar… o para consentirte.
        </p>
      </div>
      <GiftKitBuilder perfumes={perfumes} sprays={sprays} />
    </div>
  );
}
