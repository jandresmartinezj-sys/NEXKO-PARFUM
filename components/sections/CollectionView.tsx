"use client";

import { motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import type { CollectionTheme } from "@/lib/data/collections";
import { ProductGrid } from "@/components/ui/ProductGrid";

export function CollectionView({
  theme,
  products,
}: {
  theme: CollectionTheme;
  products: Product[];
}) {
  return (
    <div>
      {/* Hero */}
      <section
        className={`relative overflow-hidden bg-gradient-to-b ${theme.accent} pt-32 pb-16`}
      >
        <div className="pointer-events-none absolute -right-10 top-10 text-[180px] opacity-10">
          {theme.emoji}
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Colección</p>
            <h1 className="font-display text-4xl text-ink-primary sm:text-5xl">{theme.title}</h1>
            <p className="mt-3 max-w-xl font-serif text-xl text-ink-secondary">{theme.copy}</p>
            <p className="mt-4 text-xs text-ink-secondary">{theme.brands}</p>
          </motion.div>
        </div>
      </section>

      {/* Productos */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="mb-6 text-sm text-ink-secondary">
          {products.length} {products.length === 1 ? "producto" : "productos"}
        </p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
