"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/store/cart";
import { formatCOP } from "@/lib/utils/formatPrice";
import { AddiWidget } from "@/components/ui/AddiWidget";
import { trackBeginCheckout } from "@/lib/analytics/events";

const FREE_SHIPPING_THRESHOLD = 250000;
const PLACEHOLDER = "https://placehold.co/200x200/f6f3ee/C9A84C/png?text=NEXKO";

/* Iconos de línea, dorados y sobrios. */
const ICON = {
  className: "h-[18px] w-[18px]",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CartDrawer() {
  const { isOpen, close, cart, loading, updateLine, removeLine } = useCart();

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const lines = cart?.lines ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-paper text-ink-primary shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-subtle px-6 py-5">
              <div className="flex items-baseline gap-2.5">
                <h2 className="font-display text-lg uppercase tracking-[0.14em] text-ink-primary">
                  Tu carrito
                </h2>
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                  {cart?.totalQuantity ?? 0}
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Cerrar carrito"
                className="rounded-full p-2 text-ink-secondary transition-colors hover:bg-cream hover:text-ink-primary"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Free shipping bar */}
            {lines.length > 0 && (
              <div className="border-b border-subtle bg-cream/60 px-6 py-4">
                {remaining > 0 ? (
                  <p className="mb-2.5 flex items-center gap-2 text-sm text-ink-secondary">
                    <span className="text-gold">
                      <svg viewBox="0 0 24 24" {...ICON}>
                        <path d="M3 7h11v9H3z" />
                        <path d="M14 10h4l3 3v3h-7z" />
                        <circle cx="7" cy="18" r="1.6" />
                        <circle cx="17.5" cy="18" r="1.6" />
                      </svg>
                    </span>
                    Te faltan{" "}
                    <span className="font-semibold text-ink-primary">{formatCOP(remaining)}</span>{" "}
                    para el <span className="font-medium text-gold">envío gratis</span>
                  </p>
                ) : (
                  <p className="mb-2.5 flex items-center gap-2 text-sm font-medium text-ink-primary">
                    <span className="text-gold">
                      <svg viewBox="0 0 24 24" {...ICON}>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    ¡Felicidades! Tienes <span className="text-gold">envío gratis</span>
                  </p>
                )}
                <div className="h-2 w-full overflow-hidden rounded-full bg-subtle/60">
                  <motion.div
                    className="h-full rounded-full bg-gold-gradient"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
            )}

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-gold">
                    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 7h12l-1 13H7L6 7z" />
                      <path d="M9 7a3 3 0 016 0" />
                    </svg>
                  </span>
                  <p className="mt-5 font-display text-xl text-ink-primary">
                    Tu carrito está vacío
                  </p>
                  <p className="mt-1 text-sm text-ink-secondary">
                    Descubre fragancias que enamoran.
                  </p>
                  <button onClick={close} className="btn-outline-gold mt-6">
                    Explorar la tienda
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {lines.map((line) => {
                    const unit = Number(line.merchandise.price.amount);
                    return (
                      <li
                        key={line.id}
                        className="flex gap-4 rounded-2xl border border-subtle bg-cream/40 p-3"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-gold/15 bg-cream-tile">
                          <Image
                            src={line.merchandise.product.featuredImage?.url ?? PLACEHOLDER}
                            alt={line.merchandise.product.title}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <p className="text-sm font-medium leading-snug text-ink-primary line-clamp-2">
                            {line.merchandise.product.title}
                          </p>
                          <p className="mt-0.5 text-xs text-ink-secondary">
                            {formatCOP(unit)} c/u
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-subtle bg-paper">
                              <button
                                onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                                disabled={loading}
                                className="px-2.5 py-1 text-ink-secondary transition-colors hover:text-gold disabled:opacity-40"
                                aria-label="Disminuir"
                              >
                                −
                              </button>
                              <span className="min-w-5 text-center text-sm font-medium">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() => updateLine(line.id, line.quantity + 1)}
                                disabled={loading}
                                className="px-2.5 py-1 text-ink-secondary transition-colors hover:text-gold disabled:opacity-40"
                                aria-label="Aumentar"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-ink-primary">
                              {formatCOP(unit * line.quantity)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeLine(line.id)}
                          disabled={loading}
                          aria-label="Quitar"
                          className="self-start rounded-full p-1.5 text-ink-secondary transition-colors hover:bg-rose-scent/10 hover:text-rose-scent disabled:opacity-40"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13h10l1-13" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-subtle bg-cream/60 px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm uppercase tracking-[0.1em] text-ink-secondary">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-ink-primary">
                    {formatCOP(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-secondary">
                  Impuestos y envío calculados en el pago.
                </p>
                <AddiWidget price={subtotal} className="mt-3" />
                <a
                  href={cart?.checkoutUrl ?? "#"}
                  onClick={() => {
                    if (!cart) return;
                    trackBeginCheckout(
                      lines.map((l) => ({
                        handle: l.merchandise.product.handle,
                        title: l.merchandise.product.title,
                        price: Number(l.merchandise.price.amount),
                        quantity: l.quantity,
                      })),
                      subtotal,
                      cart.totalQuantity,
                    );
                  }}
                  className="btn-gold mt-4 flex w-full items-center justify-center gap-2"
                  aria-disabled={loading}
                >
                  {loading ? "Actualizando…" : "Finalizar compra"}
                  {!loading && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
                </a>
                <button
                  onClick={close}
                  className="mt-2 w-full text-center text-xs text-ink-secondary underline-offset-2 hover:text-gold hover:underline"
                >
                  Seguir comprando
                </button>
                <div className="mt-4 flex items-center justify-center gap-5 text-[11px] text-ink-secondary">
                  <span className="flex items-center gap-1.5">
                    <span className="text-gold">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </span>
                    Pago seguro
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-gold">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7h11v9H3z" />
                        <path d="M14 10h4l3 3v3h-7z" />
                        <circle cx="7" cy="18" r="1.6" />
                        <circle cx="17.5" cy="18" r="1.6" />
                      </svg>
                    </span>
                    Envío a toda Colombia
                  </span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
