"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/lib/store/cart";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { pricePerMl } from "@/lib/utils/formatPrice";

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

  const handleAdd = async () => {
    if (!variant) return;
    await addItem(variant.id, qty);
  };

  const handleBuyNow = async () => {
    if (!variant) return;
    await addItem(variant.id, qty);
    const url = useCart.getState().cart?.checkoutUrl;
    if (url) window.location.href = url;
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Galería */}
      <div>
        <div
          ref={imgWrap}
          onMouseMove={onZoomMove}
          onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          className="relative aspect-square overflow-hidden rounded-3xl border border-subtle bg-void-radial"
        >
          <div className="absolute left-1/2 top-[64%] h-12 w-2/3 -translate-x-1/2 rounded-[100%] bg-gold/10 blur-2xl" />
          <Image
            src={mainImage}
            alt={product.title}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-contain p-10 transition-transform duration-200"
            style={
              zoom.on
                ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : undefined
            }
          />
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <button
                key={img.url + i}
                onClick={() => setActive(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-surface ${
                  active === i ? "border-gold" : "border-subtle"
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
        </div>

        {product.description && (
          <p className="mt-6 leading-relaxed text-ink-secondary">{product.description}</p>
        )}

        {/* Cantidad */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm text-ink-secondary">Cantidad</span>
          <div className="flex items-center gap-3 rounded-full border border-subtle px-2">
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

        {/* Garantías */}
        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-subtle pt-6 text-center text-xs text-ink-secondary">
          <div>🚚<br />Envío Colombia</div>
          <div>✅<br />Calidad garantizada</div>
          <div>💰<br />Mejor precio</div>
        </div>
      </div>
    </div>
  );
}
