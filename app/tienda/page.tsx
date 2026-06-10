import type { Metadata } from "next";
import { CatalogClient } from "@/components/sections/CatalogClient";
import { getProducts } from "@/lib/shopify/queries";
import type { Product } from "@/lib/shopify/types";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Tienda — Todas las fragancias",
  description:
    "Explora más de 500 fragancias premium: árabes, masculinos, femeninos, body sprays y sets. Filtra por marca, género, familia olfativa y precio.",
};

export default async function TiendaPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  let products: Product[] = [];
  try {
    products = await getProducts({ first: 250 });
  } catch (e) {
    console.error("Error cargando catálogo:", e);
  }

  return <CatalogClient products={products} initialSearch={searchParams?.q ?? ""} />;
}
