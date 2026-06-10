"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    href: "/colecciones/arabes",
    title: "Árabes & Orientales",
    copy: "Historias milenarias",
    gradient: "from-gold/30 to-spice-amber/20",
    emoji: "🕌",
  },
  {
    href: "/colecciones/masculinos",
    title: "Masculinos",
    copy: "El hombre moderno",
    gradient: "from-blue-600/30 to-slate-500/20",
    emoji: "🖤",
  },
  {
    href: "/colecciones/femeninos",
    title: "Femeninos",
    copy: "Tu esencia",
    gradient: "from-rose-scent/30 to-gold/20",
    emoji: "🌹",
  },
  {
    href: "/colecciones/body-sprays",
    title: "Body Sprays",
    copy: "Frescura todo el día",
    gradient: "from-fresh-aqua/30 to-blue-400/20",
    emoji: "🌊",
  },
  {
    href: "/colecciones/sets-regalo",
    title: "Sets & Kits",
    copy: "El regalo perfecto",
    gradient: "from-emerald-500/30 to-gold/20",
    emoji: "🎁",
  },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.href}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className={i === 0 ? "col-span-2 md:col-span-1" : ""}
        >
          <Link
            href={cat.href}
            className={`group relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl border border-subtle bg-gradient-to-br ${cat.gradient} p-5 transition-transform hover:scale-[1.02]`}
          >
            <span className="absolute right-4 top-4 text-3xl opacity-80 transition-transform group-hover:scale-125">
              {cat.emoji}
            </span>
            <h3 className="font-serif text-xl text-ink-primary">{cat.title}</h3>
            <p className="text-sm text-ink-secondary">{cat.copy}</p>
            <span className="mt-2 text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
              Ver colección →
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
