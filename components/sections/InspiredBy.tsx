"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** Fragancias icónicas que existen como alternativa en el catálogo. */
const ICONS = [
  { label: "Sauvage", q: "sauvage" },
  { label: "Le Male Elixir", q: "le male elixir" },
  { label: "One Million", q: "one million" },
  { label: "Invictus", q: "invictus" },
  { label: "Good Girl", q: "good girl" },
  { label: "212", q: "212" },
  { label: "Bombshell", q: "bombshell" },
  { label: "Cloud", q: "cloud" },
  { label: "Khamrah", q: "khamrah" },
  { label: "Yara", q: "yara" },
  { label: "Oud For Glory", q: "oud for glory" },
  { label: "Erba Pura", q: "erba pura" },
];

export function InspiredBy() {
  return (
    <div className="rounded-3xl border border-subtle bg-surface/40 p-8 text-center sm:p-12">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Inspirado en</p>
      <h2 className="font-display text-3xl text-ink-primary sm:text-4xl">
        ¿Amas un perfume de marca?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-ink-secondary">
        Tenemos su versión a un precio que te va a encantar. Toca tu favorito y
        descúbrela.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {ICONS.map((icon, i) => (
          <motion.div
            key={icon.q}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              href={`/tienda?q=${encodeURIComponent(icon.q)}`}
              className="inline-flex items-center gap-1 rounded-full border border-subtle bg-void/40 px-4 py-2 text-sm text-ink-primary transition-colors hover:border-gold hover:text-gold"
            >
              {icon.label}
              <span className="text-gold">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
