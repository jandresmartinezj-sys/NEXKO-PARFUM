"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/store/cart";
import { formatCOP } from "@/lib/utils/formatPrice";

const FREE_SHIPPING_THRESHOLD = 250000;
const PLACEHOLDER = "https://placehold.co/200x200/0A0A12/C9A84C/png?text=NEXKO";

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
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-dark shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-subtle px-5 py-4">
              <h2 className="font-serif text-2xl text-ink-primary">
                Tu carrito{" "}
                <span className="text-gold">({cart?.totalQuantity ?? 0})</span>
              </h2>
              <button
                onClick={close}
                aria-label="Cerrar carrito"
                className="rounded-full p-2 text-ink-secondary transition-colors hover:text-ink-primary"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Free shipping bar */}
            {lines.length > 0 && (
              <div className="border-b border-subtle px-5 py-4">
                {remaining > 0 ? (
                  <p className="mb-2 text-sm text-ink-secondary">
                    Agrega{" "}
                    <span className="font-semibold text-gold">{formatCOP(remaining)}</span>{" "}
                    más para <span className="text-ink-primary">envío gratis</span> 🚚
                  </p>
                ) : (
                  <p className="mb-2 text-sm font-medium text-fresh-aqua">
                    🎉 ¡Tienes envío gratis!
                  </p>
                )}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
                  <motion.div
                    className="h-full rounded-full bg-gold-gradient"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="text-5xl">🛍️</span>
                  <p className="mt-4 font-serif text-xl text-ink-primary">
                    Tu carrito está vacío
                  </p>
                  <p className="mt-1 text-sm text-ink-secondary">
                    Descubre fragancias que enamoran.
                  </p>
                  <button onClick={close} className="btn-outline-gold mt-6">
                    Seguir explorando
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
                        <Image
                          src={line.merchandise.product.featuredImage?.url ?? PLACEHOLDER}
                          alt={line.merchandise.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium leading-tight text-ink-primary">
                          {line.merchandise.product.title}
                        </p>
                        <p className="text-xs text-ink-secondary">
                          {formatCOP(line.merchandise.price.amount)}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-subtle">
                            <button
                              onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                              disabled={loading}
                              className="px-2 py-1 text-ink-secondary hover:text-gold"
                              aria-label="Disminuir"
                            >
                              −
                            </button>
                            <span className="min-w-4 text-center text-sm">{line.quantity}</span>
                            <button
                              onClick={() => updateLine(line.id, line.quantity + 1)}
                              disabled={loading}
                              className="px-2 py-1 text-ink-secondary hover:text-gold"
                              aria-label="Aumentar"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeLine(line.id)}
                            disabled={loading}
                            className="text-xs text-ink-secondary underline-offset-2 hover:text-rose-scent hover:underline"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-subtle px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-ink-secondary">Subtotal</span>
                  <span className="font-serif text-2xl text-gold">
                    {formatCOP(subtotal)}
                  </span>
                </div>
                <a
                  href={cart?.checkoutUrl ?? "#"}
                  className="btn-gold w-full"
                  aria-disabled={loading}
                >
                  {loading ? "Actualizando…" : "Finalizar compra"}
                </a>
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-ink-secondary">
                  <span>🔒 Pago seguro</span>
                  <span>🚚 Envío rápido</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
