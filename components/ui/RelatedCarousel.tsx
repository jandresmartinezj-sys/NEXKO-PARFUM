"use client";

import { useRef } from "react";
import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./ProductCard";

export function RelatedCarousel({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  if (!products.length) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Anterior"
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-subtle bg-dark/80 text-ink-primary backdrop-blur transition-colors hover:border-gold hover:text-gold sm:flex"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 pb-2 sm:gap-6"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[60%] shrink-0 snap-start sm:w-[42%] lg:w-[28%] xl:w-[23%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollBy(1)}
        aria-label="Siguiente"
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-subtle bg-dark/80 text-ink-primary backdrop-blur transition-colors hover:border-gold hover:text-gold sm:flex"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
