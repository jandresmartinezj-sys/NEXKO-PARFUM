import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";

/** Carrusel horizontal de productos (estilo Perfumarte). */
export function ProductScroller({ products }: { products: Product[] }) {
  if (!products.length) return <EmptyState />;
  return (
    <div className="flex snap-x gap-4 overflow-x-auto pb-3 no-scrollbar sm:gap-6">
      {products.map((p) => (
        <div key={p.id} className="w-[calc(50%-0.5rem)] shrink-0 snap-start sm:w-64">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
