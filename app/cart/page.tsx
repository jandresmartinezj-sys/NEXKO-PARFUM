"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store/cart";
import { formatCOP } from "@/lib/utils/formatPrice";

const PLACEHOLDER = "https://placehold.co/200x200/0A0A12/C9A84C/png?text=NEXKO";

export default function CartPage() {
  const { cart, loading, updateLine, removeLine } = useCart();
  const lines = cart?.lines ?? [];
  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-28 sm:px-6">
      <h1 className="mb-8 font-display text-4xl text-ink-primary">Tu carrito</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-subtle bg-surface/40 py-20 text-center">
          <span className="text-5xl">🛍️</span>
          <p className="mt-4 font-serif text-xl text-ink-primary">Tu carrito está vacío</p>
          <Link href="/tienda" className="btn-gold mt-6">
            Explorar la tienda
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {lines.map((line) => (
              <li
                key={line.id}
                className="flex gap-4 rounded-2xl border border-subtle bg-surface/40 p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface">
                  <Image
                    src={line.merchandise.product.featuredImage?.url ?? PLACEHOLDER}
                    alt={line.merchandise.product.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/tienda/${line.merchandise.product.handle}`}
                    className="font-serif text-lg text-ink-primary hover:text-gold"
                  >
                    {line.merchandise.product.title}
                  </Link>
                  <p className="text-sm text-ink-secondary">
                    {formatCOP(line.merchandise.price.amount)}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-subtle">
                      <button
                        onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                        disabled={loading}
                        className="px-3 py-1 text-ink-secondary hover:text-gold"
                      >
                        −
                      </button>
                      <span className="min-w-5 text-center text-sm">{line.quantity}</span>
                      <button
                        onClick={() => updateLine(line.id, line.quantity + 1)}
                        disabled={loading}
                        className="px-3 py-1 text-ink-secondary hover:text-gold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeLine(line.id)}
                      disabled={loading}
                      className="text-sm text-ink-secondary hover:text-rose-scent"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-subtle bg-surface/40 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-ink-secondary">Subtotal</span>
              <span className="font-serif text-2xl text-gold">{formatCOP(subtotal)}</span>
            </div>
            <a href={cart?.checkoutUrl ?? "#"} className="btn-gold w-full">
              Finalizar compra
            </a>
            <p className="mt-3 text-center text-xs text-ink-secondary">
              🔒 Pago seguro · 🚚 Envío a toda Colombia
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
