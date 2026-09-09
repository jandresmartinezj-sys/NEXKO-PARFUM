"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/lib/store/cart";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { AddiWidget } from "@/components/ui/AddiWidget";
import { ProductSpecs } from "@/components/sections/ProductSpecs";
import { pricePerMl } from "@/lib/utils/formatPrice";
import { trackViewItem, trackAddToCart, trackBeginCheckout } from "@/lib/analytics/events";

const PLACEHOLDER = "https://placehold.co/800x800/0A0A12/C9A84C/png?text=NEXKO";

export function ProductDetail({ product }: { product: Product }) {
  const variant = product.variants[0];
  const images = product.images.length
    ? product.images
    : product.featuredImage
      ? [product.featuredImage]
      : [];
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const imgWrap = useRef<HTMLDivElement>(null);

  const addItem = useCart((s) => s.addItem);
  const loading = useCart((s) => s.loading);

  const stock = variant?.quantityAvailable ?? product.totalInventory ?? null;
  const available = variant?.availableForSale ?? product.availableForSale;
  const mainImage = images[active]?.url ?? PLACEHOLDER;
  const unitPrice = pricePerMl(
    variant?.price.amount ?? product.priceRange.minVariantPrice.amount,
    product.title,
  );

  const onZoomMove = (e: React.MouseEvent) => {
    const el = imgWrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setZoom({
      on: true,
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const price = Number(variant?.price.amount ?? product.priceRange.minVariantPrice.amount);
  const compareAt = Number(variant?.compareAtPrice?.amount ?? 0);
  const onSale = compareAt > price;
  const asItem = () => ({
    handle: product.handle,
    title: product.title,
    vendor: product.vendor,
    price,
  });

  useEffect(() => {
    trackViewItem(asItem());
    // solo al cambiar de producto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.handle]);

  const handleAdd = async () => {
    if (!variant) return;
    trackAddToCart(asItem(), qty);
    await addItem(variant.id, qty);
  };

  const handleBuyNow = async () => {
    if (!variant) return;
    trackAddToCart(asItem(), qty);
    await addItem(variant.id, qty);
    const url = useCart.getState().cart?.checkoutUrl;
    if (url) {
      trackBeginCheckout([{ ...asItem(), quantity: qty }], price * qty, qty);
      window.location.href = url;
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Galería */}
      <div>
        <div className="rounded-3xl border border-gold/25 bg-cream p-3 shadow-card">
          <div
            ref={imgWrap}
            onMouseMove={onZoomMove}
            onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
            className="relative aspect-square overflow-hidden rounded-2xl bg-cream-tile"
          >
            {onSale && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-rose-scent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                ¡Oferta!
              </span>
            )}
            <span className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink-secondary shadow-sm backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
              </svg>
            </span>
            <Image
              src={mainImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain p-8 transition-transform duration-200"
              style={
                zoom.on
                  ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
          </div>
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <button
                key={img.url + i}
                onClick={() => setActive(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-cream-tile transition-colors ${
                  active === i ? "border-gold ring-1 ring-gold" : "border-gold/20 hover:border-gold/50"
                }`}
              >
                <Image src={img.url} alt="" fill sizes="80px" className="object-contain p-2" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <p className="text-sm uppercase tracking-wider text-ink-secondary">{product.vendor}</p>
        <h1 className="mt-1 font-display text-3xl text-ink-primary sm:text-4xl">{product.title}</h1>

        <div className="mt-4">
          <PriceDisplay
            price={variant?.price.amount ?? product.priceRange.minVariantPrice.amount}
            compareAtPrice={variant?.compareAtPrice?.amount}
            stock={stock}
          />
          {unitPrice && (
            <p className="mt-1 text-xs text-ink-secondary">
              {unitPrice} por ml · excelente relación precio/cantidad
            </p>
          )}
          <AddiWidget price={price} className="mt-3" />
        </div>

        {onSale && (
          <p className="mt-4 flex items-center gap-2 rounded-lg bg-rose-scent/10 px-4 py-3 text-sm font-medium text-rose-scent">
            <span className="text-lg">🏷️</span>
            ¡Aprovecha! Este perfume está en promoción por tiempo limitado.
          </p>
        )}

        {product.description && (
          <p className="mt-6 leading-relaxed text-ink-secondary">{product.description}</p>
        )}

        {/* Cantidad */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm text-ink-secondary">Cantidad</span>
          <div className="flex items-center gap-3 rounded-full border border-gold/30 bg-surface/40 px-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-ink-secondary hover:text-gold"
              aria-label="Disminuir"
            >
              −
            </button>
            <span className="min-w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-2 text-ink-secondary hover:text-gold"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            disabled={loading || !available}
            className="btn-gold flex-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {available ? (loading ? "Agregando…" : "Agregar al carrito") : "Agotado"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleBuyNow}
            disabled={loading || !available}
            className="btn-outline-gold flex-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Comprar ahora
          </motion.button>
        </div>

        {/* Ficha olfativa profesional */}
        <ProductSpecs product={product} />

        {/* Garantías */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { icon: "🚚", label: "Envío a toda Colombia" },
            { icon: "✅", label: "Calidad garantizada" },
            { icon: "💰", label: "Mejor precio" },
          ].map((g) => (
            <div
              key={g.label}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-gold/15 bg-surface/50 px-2 py-4 text-center"
            >
              <span className="text-2xl">{g.icon}</span>
              <p className="text-[11px] leading-tight text-ink-secondary">{g.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
