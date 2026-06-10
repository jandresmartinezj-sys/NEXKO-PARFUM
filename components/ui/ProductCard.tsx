"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { PriceDisplay } from "./PriceDisplay";
import { SCENT_BY_HANDLE } from "@/lib/data/catalog";

const PLACEHOLDER = "https://placehold.co/800x800/0A0A12/C9A84C/png?text=NEXKO";

function badgeFor(product: Product): { label: string; className: string } {
  const tags = product.tags.map((t) => t.toLowerCase());
  if (tags.includes("set"))
    return { label: "Set", className: "bg-emerald-500/20 text-emerald-300" };
  if (tags.includes("body-spray"))
    return { label: "Body Spray", className: "bg-fresh-aqua/20 text-fresh-aqua" };
  if (tags.includes("arabe"))
    return { label: "Árabe", className: "bg-gold/20 text-gold-light" };
  if (tags.includes("masculino"))
    return { label: "Masculino", className: "bg-blue-500/20 text-blue-300" };
  if (tags.includes("femenino"))
    return { label: "Femenino", className: "bg-rose-scent/20 text-rose-scent" };
  return { label: "Unisex", className: "bg-violet-500/20 text-violet-300" };
}

export function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [burst, setBurst] = useState(0);
  const addItem = useCart((s) => s.addItem);
  const loading = useCart((s) => s.loading);

  const wishToggle = useWishlist((s) => s.toggle);
  const wishHas = useWishlist((s) => s.has);
  const hydrated = useHydrated();

  const variant = product.variants[0];
  const badge = badgeFor(product);
  const scent = SCENT_BY_HANDLE[product.handle];
  const stock = variant?.quantityAvailable ?? product.totalInventory ?? null;
  const image = product.featuredImage?.url ?? product.images[0]?.url ?? PLACEHOLDER;
  const saved = hydrated && wishHas(product.handle);

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    wishToggle({
      handle: product.handle,
      title: product.title,
      vendor: product.vendor,
      image,
      price: variant?.price.amount ?? product.priceRange.minVariantPrice.amount,
    });
  };

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 10 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    setBurst((b) => b + 1);
    await addItem(variant.id, 1);
  };

  return (
    <div className="perspective">
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="preserve-3d group relative flex flex-col overflow-hidden rounded-2xl border border-subtle bg-surface/60"
      >
        <Link href={`/tienda/${product.handle}`} className="block">
          {/* Imagen sobre pedestal */}
          <div className="relative aspect-square overflow-hidden bg-void-radial">
            <div className="absolute left-1/2 top-[62%] h-10 w-3/4 -translate-x-1/2 rounded-[100%] bg-gold/10 blur-xl" />
            <Image
              src={image}
              alt={product.featuredImage?.altText ?? product.title}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            />
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge.className}`}
            >
              {badge.label}
            </span>

            <button
              onClick={handleWish}
              data-cursor="pointer"
              aria-label={saved ? "Quitar de favoritos" : "Agregar a favoritos"}
              aria-pressed={saved}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-void/50 backdrop-blur transition-colors hover:bg-void/70"
            >
              <motion.svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 ${saved ? "fill-rose-scent stroke-rose-scent" : "fill-none stroke-ink-secondary"}`}
                strokeWidth="1.8"
                animate={saved ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M12 21s-7.5-4.6-10-9.2C.5 8.6 2 5 5.3 5c2 0 3.3 1.1 4.2 2.3.4.5.9.5 1.3 0C11.7 6.1 13 5 15 5c3.3 0 4.8 3.6 3.3 6.8C19.5 16.4 12 21 12 21z" />
              </motion.svg>
            </button>

            {/* Overlay de acordes en hover */}
            {scent && (
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-void to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="mb-1 text-[10px] uppercase tracking-widest text-gold">
                  Acordes principales
                </p>
                <p className="text-xs text-ink-primary">
                  {[...scent.accords.top, ...scent.accords.heart].slice(0, 4).join(" · ")}
                </p>
              </div>
            )}
          </div>

          <div className="px-4 pt-3">
            <p className="text-[11px] uppercase tracking-wider text-ink-secondary">
              {product.vendor}
            </p>
            <h3 className="line-clamp-2 min-h-[2.6rem] font-serif text-lg leading-tight text-ink-primary">
              {product.title}
            </h3>
          </div>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2 px-4 pb-4 pt-2">
          <PriceDisplay
            price={variant?.price.amount ?? product.priceRange.minVariantPrice.amount}
            compareAtPrice={variant?.compareAtPrice?.amount}
            stock={stock}
            size="sm"
          />
          <div className="relative">
            <button
              onClick={handleAdd}
              disabled={loading || !variant?.availableForSale}
              data-cursor="pointer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-void shadow-gold transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Agregar al carrito"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <ParticleBurst trigger={burst} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ParticleBurst({ trigger }: { trigger: number }) {
  return (
    <AnimatePresence>
      {trigger > 0 && (
        <div key={trigger} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(angle) * 30,
                  y: Math.sin(angle) * 30,
                  scale: 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute h-1.5 w-1.5 rounded-full bg-gold-glow"
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
