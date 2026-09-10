import type { Metadata } from "next";
import { CatalogClient } from "@/components/sections/CatalogClient";
import { getProducts } from "@/lib/shopify/queries";
import type { Product } from "@/lib/shopify/types";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Tienda — Todas las fragancias",
  description:
    "Explora nuestra perfumería original: árabes, masculinos, femeninos, testers y sets. Filtra por marca, género, familia olfativa y precio.",
};

export default async function TiendaPage({
  searchParams,
}: {
  searchParams?: { q?: string; cat?: string };
}) {
  let products: Product[] = [];
  try {
    products = await getProducts({ first: 2500 });
  } catch (e) {
    console.error("Error cargando catálogo:", e);
  }

  return (
    <CatalogClient
      key={`${searchParams?.cat ?? ""}-${searchParams?.q ?? ""}`}
      products={products}
      initialSearch={searchParams?.q ?? ""}
      initialCategory={searchParams?.cat ?? "todas"}
    />
  );
}
