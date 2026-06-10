"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { formatCOP } from "@/lib/utils/formatPrice";

export default function WishlistPage() {
  const items = useWishlist((s) => s.items);
  const remove = useWishlist((s) => s.remove);
  const clear = useWishlist((s) => s.clear);
  const hydrated = useHydrated();

  return (
    <div className="mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Tus favoritos</p>
          <h1 className="font-display text-4xl text-ink-primary">Mi lista de deseos</h1>
        </div>
        {hydrated && items.length > 0 && (
          <button onClick={clear} className="text-sm text-ink-secondary hover:text-rose-scent">
            Vaciar lista
          </button>
        )}
      </div>

      {!hydrated ? null : items.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-subtle bg-surface/40 py-20 text-center">
          <span className="text-5xl">🤍</span>
          <p className="mt-4 font-serif text-xl text-ink-primary">Aún no tienes favoritos</p>
          <p className="mt-1 text-sm text-ink-secondary">
            Toca el corazón en cualquier producto para guardarlo aquí.
          </p>
          <Link href="/tienda" className="btn-gold mt-6">
            Explorar la tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.handle}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-subtle bg-surface/60"
              >
                <button
                  onClick={() => remove(item.handle)}
                  aria-label="Quitar de favoritos"
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-void/50 backdrop-blur transition-colors hover:bg-void/70"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-rose-scent stroke-rose-scent" strokeWidth="1.8">
                    <path d="M12 21s-7.5-4.6-10-9.2C.5 8.6 2 5 5.3 5c2 0 3.3 1.1 4.2 2.3.4.5.9.5 1.3 0C11.7 6.1 13 5 15 5c3.3 0 4.8 3.6 3.3 6.8C19.5 16.4 12 21 12 21z" />
                  </svg>
                </button>
                <Link href={`/tienda/${item.handle}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-void-radial">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] uppercase tracking-wider text-ink-secondary">
                      {item.vendor}
                    </p>
                    <h3 className="line-clamp-2 font-serif text-lg leading-tight text-ink-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-semibold text-gold">{formatCOP(item.price)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
