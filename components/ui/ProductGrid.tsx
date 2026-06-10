import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <EmptyState />;
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
