"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CATALOG,
  FAMILY_LABELS,
  type CatalogItem,
} from "@/lib/data/catalog";
import { formatCOP } from "@/lib/utils/formatPrice";

const PLACEHOLDER = "https://placehold.co/400x400/0A0A12/C9A84C/png?text=NEXKO";
const MAX = 3;

const GENDER_LABEL: Record<string, string> = {
  dama: "Dama",
  caballero: "Caballero",
  unisex: "Unisex",
};
const INTENSITY_LABEL: Record<string, string> = {
  light: "Suave",
  moderate: "Moderado",
  intense: "Intenso",
  extreme: "Extremo",
};

export default function CompararPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [picker, setPicker] = useState(false);
  const [query, setQuery] = useState("");

  const items = selected
    .map((h) => CATALOG.find((c) => c.handle === h))
    .filter((x): x is CatalogItem => Boolean(x));

  const candidates = useMemo(
    () =>
      CATALOG.filter(
        (c) =>
          !selected.includes(c.handle) &&
          `${c.title} ${c.vendor}`.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 30),
    [selected, query],
  );

  const add = (handle: string) => {
    if (selected.length >= MAX) return;
    setSelected((s) => [...s, handle]);
    setPicker(false);
    setQuery("");
  };
  const remove = (handle: string) => setSelected((s) => s.filter((h) => h !== handle));

  const rows: { label: string; render: (c: CatalogItem) => React.ReactNode }[] = [
    { label: "Precio ref.", render: (c) => formatCOP(c.priceVenta) },
    { label: "Familia", render: (c) => FAMILY_LABELS[c.family] },
    { label: "Género", render: (c) => GENDER_LABEL[c.gender] },
    { label: "Intensidad", render: (c) => INTENSITY_LABEL[c.intensity] },
    { label: "Notas de salida", render: (c) => c.accords.top.join(", ") },
    { label: "Notas de corazón", render: (c) => c.accords.heart.join(", ") },
    { label: "Notas de fondo", render: (c) => c.accords.base.join(", ") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Herramienta</p>
        <h1 className="font-display text-4xl text-ink-primary">Comparador de aromas</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-secondary">
          Selecciona hasta {MAX} fragancias y compara sus acordes lado a lado para
          encontrar tu match perfecto.
        </p>
      </div>

      {/* Encabezado de columnas */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `minmax(110px, 0.7fr) repeat(${MAX}, 1fr)` }}
      >
        <div />
        {Array.from({ length: MAX }).map((_, i) => {
          const item = items[i];
          if (item) {
            return (
              <div
                key={item.handle}
                className="relative rounded-2xl border border-subtle bg-surface/60 p-3 text-center"
              >
                <button
                  onClick={() => remove(item.handle)}
                  aria-label="Quitar"
                  className="absolute right-2 top-2 text-ink-secondary hover:text-rose-scent"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" strokeWidth="1.6">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
                <div className="relative mx-auto mb-2 h-24 w-24 overflow-hidden rounded-xl bg-void-radial">
                  <Image
                    src={PLACEHOLDER}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-contain p-3"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-wider text-ink-secondary">
                  {item.vendor}
                </p>
                <Link
                  href={`/tienda/${item.handle}`}
                  className="font-serif text-sm leading-tight text-ink-primary hover:text-gold"
                >
                  {item.title}
                </Link>
              </div>
            );
          }
          return (
            <button
              key={`empty-${i}`}
              onClick={() => setPicker(true)}
              className="flex h-[164px] flex-col items-center justify-center rounded-2xl border border-dashed border-subtle text-ink-secondary transition-colors hover:border-gold hover:text-gold"
            >
              <span className="text-3xl">+</span>
              <span className="mt-1 text-xs">Añadir fragancia</span>
            </button>
          );
        })}
      </div>

      {/* Filas de comparación */}
      {items.length > 0 && (
        <div className="mt-3 space-y-px overflow-hidden rounded-2xl border border-subtle">
          {rows.map((row, ri) => (
            <div
              key={row.label}
              className={`grid gap-3 px-3 py-3 ${ri % 2 ? "bg-surface/30" : "bg-surface/60"}`}
              style={{ gridTemplateColumns: `minmax(110px, 0.7fr) repeat(${MAX}, 1fr)` }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                {row.label}
              </div>
              {Array.from({ length: MAX }).map((_, i) =>
                items[i] ? (
                  <div key={i} className="text-sm text-ink-primary">
                    {row.render(items[i])}
                  </div>
                ) : (
                  <div key={i} className="text-sm text-ink-secondary/40">
                    —
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-secondary">
          Añade una fragancia para comenzar a comparar.
        </p>
      )}

      {/* Selector modal */}
      <AnimatePresence>
        {picker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPicker(false)}
            className="fixed inset-0 z-[90] flex items-start justify-center bg-void/90 p-4 pt-24 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-subtle bg-dark p-5"
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar fragancia…"
                className="mb-4 w-full rounded-full border border-subtle bg-surface/60 px-4 py-2.5 text-sm text-ink-primary outline-none placeholder:text-ink-secondary focus:border-gold"
              />
              <ul className="max-h-[50vh] space-y-1 overflow-y-auto">
                {candidates.map((c) => (
                  <li key={c.handle}>
                    <button
                      onClick={() => add(c.handle)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-surface"
                    >
                      <span>
                        <span className="block text-sm text-ink-primary">{c.title}</span>
                        <span className="block text-xs text-ink-secondary">
                          {c.vendor} · {FAMILY_LABELS[c.family]}
                        </span>
                      </span>
                      <span className="text-gold">+</span>
                    </button>
                  </li>
                ))}
                {candidates.length === 0 && (
                  <li className="px-3 py-4 text-center text-sm text-ink-secondary">
                    Sin resultados.
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
