"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COLLECTION_THEMES } from "@/lib/data/collections";

const SHOWCASE = [
  { slug: "masculinos", href: "/colecciones/masculinos" },
  { slug: "femeninos", href: "/colecciones/femeninos" },
] as const;

export function GenderShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SHOWCASE.map(({ slug, href }, i) => {
        const theme = COLLECTION_THEMES[slug];
        return (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              href={href}
              className={`group relative flex h-72 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-subtle bg-gradient-to-br p-8 text-center transition-transform hover:scale-[1.01] sm:h-96 ${theme.accent}`}
            >
              <span className="emoji-gold text-5xl opacity-90 transition-transform duration-300 group-hover:scale-110 sm:text-6xl">
                {theme.emoji}
              </span>
              <h3 className="font-display text-3xl text-ink-primary sm:text-4xl">
                {theme.title}
              </h3>
              <p className="max-w-xs text-sm text-ink-secondary">{theme.copy}</p>
              <span className="mt-2 text-sm text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Ver colección →
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
