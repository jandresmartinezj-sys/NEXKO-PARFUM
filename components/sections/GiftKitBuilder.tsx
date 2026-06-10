"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/lib/store/cart";
import { formatCOP } from "@/lib/utils/formatPrice";

const PLACEHOLDER = "https://placehold.co/300x300/0A0A12/C9A84C/png?text=NEXKO";

function priceOf(p?: Product) {
  if (!p) return 0;
  return parseFloat(p.variants[0]?.price.amount ?? p.priceRange.minVariantPrice.amount);
}

function Slot({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Product[];
  value: string;
  onChange: (handle: string) => void;
}) {
  const chosen = options.find((p) => p.handle === value);
  return (
    <div className="rounded-2xl border border-subtle bg-surface/40 p-5">
      <h3 className="mb-3 font-serif text-lg text-gold">{label}</h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mb-4 w-full rounded-full border border-subtle bg-surface/60 px-4 py-2.5 text-sm text-ink-primary outline-none focus:border-gold"
      >
        <option value="">— Elige una opción —</option>
        {options.map((p) => (
          <option key={p.id} value={p.handle}>
            {p.title} · {formatCOP(priceOf(p))}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-void-radial">
          <Image
            src={chosen?.featuredImage?.url ?? PLACEHOLDER}
            alt={chosen?.title ?? label}
            fill
            sizes="96px"
            className="object-contain p-3"
          />
        </div>
        <div className="min-w-0">
          {chosen ? (
            <>
              <p className="text-[11px] uppercase tracking-wider text-ink-secondary">
                {chosen.vendor}
              </p>
              <p className="truncate font-serif text-ink-primary">{chosen.title}</p>
              <p className="text-sm font-semibold text-gold">{formatCOP(priceOf(chosen))}</p>
            </>
          ) : (
            <p className="text-sm text-ink-secondary">Aún no has elegido tu {label.toLowerCase()}.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function GiftKitBuilder({
  perfumes,
  sprays,
}: {
  perfumes: Product[];
  sprays: Product[];
}) {
  const [perfume, setPerfume] = useState("");
  const [spray, setSpray] = useState("");
  const addItem = useCart((s) => s.addItem);
  const loading = useCart((s) => s.loading);

  const chosenPerfume = perfumes.find((p) => p.handle === perfume);
  const chosenSpray = sprays.find((p) => p.handle === spray);
  const total = priceOf(chosenPerfume) + priceOf(chosenSpray);
  const ready = Boolean(chosenPerfume || chosenSpray);

  const addKit = async () => {
    for (const p of [chosenPerfume, chosenSpray]) {
      const variant = p?.variants[0];
      if (variant) await addItem(variant.id, 1);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <Slot label="Fragancia" options={perfumes} value={perfume} onChange={setPerfume} />
        <Slot label="Body Spray" options={sprays} value={spray} onChange={setSpray} />
      </div>

      <aside className="h-fit rounded-2xl border border-subtle bg-surface/40 p-6">
        <h3 className="font-serif text-xl text-ink-primary">Tu kit</h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex justify-between gap-2">
            <span className="truncate text-ink-secondary">
              {chosenPerfume?.title ?? "Fragancia"}
            </span>
            <span className="shrink-0 text-ink-primary">
              {chosenPerfume ? formatCOP(priceOf(chosenPerfume)) : "—"}
            </span>
          </li>
          <li className="flex justify-between gap-2">
            <span className="truncate text-ink-secondary">
              {chosenSpray?.title ?? "Body Spray"}
            </span>
            <span className="shrink-0 text-ink-primary">
              {chosenSpray ? formatCOP(priceOf(chosenSpray)) : "—"}
            </span>
          </li>
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-subtle pt-4">
          <span className="text-ink-secondary">Total</span>
          <span className="font-serif text-2xl text-gold">{formatCOP(total)}</span>
        </div>
        <button
          onClick={addKit}
          disabled={!ready || loading}
          className="btn-gold mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Agregando…" : "Agregar kit al carrito"}
        </button>
        <p className="mt-3 text-center text-xs text-ink-secondary">
          🎁 Presentación de regalo · 🚚 Envío a toda Colombia
        </p>
      </aside>
    </div>
  );
}
