"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function GiftSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-subtle bg-gradient-to-br from-emerald-900/30 via-surface to-gold/10 px-6 py-14 text-center sm:px-12"
    >
      <div className="absolute -right-10 -top-10 text-[160px] opacity-10">🎁</div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Para regalar</p>
      <h2 className="font-display text-3xl text-ink-primary sm:text-4xl">
        El regalo perfecto ya está listo
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-ink-secondary">
        Sets y kits cuidadosamente curados: minis, cremas y frascos full size en
        presentaciones de lujo. Impresiona sin esfuerzo.
      </p>
      <Link href="/colecciones/sets-regalo" className="btn-gold mt-8">
        Ver sets & kits
      </Link>
    </motion.div>
  );
}
