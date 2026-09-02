import type { Metadata } from "next";
import { ProductPageView, buildProductMetadata } from "@/components/sections/ProductPageView";

// Alias de /tienda/[handle] con el patrón de URL /producto/... (estilo
// WooCommerce). Existe para pasarelas/validadores externos (p. ej. Addi) que
// esperan ese patrón. Contenido idéntico a la ficha de /tienda.
export const revalidate = 60;

interface Props {
  params: { handle: string };
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildProductMetadata(params.handle);
}

export default function ProductAliasPage({ params }: Props) {
  return <ProductPageView handle={params.handle} />;
}
