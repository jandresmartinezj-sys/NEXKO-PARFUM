"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Slider de banners de la home (estilo Perfumarte).
 *
 * Los slides son placeholders con degradados de marca. Para usar tus banners
 * reales: sube las imágenes a /public/banners/ y añade `image: "/banners/x.webp"`
 * a cada slide; el componente la usará de fondo automáticamente.
 */

interface Slide {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  gradient: string;
  image?: string;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Perfumería premium",
    title: "El lujo que hueles",
    subtitle: "Perfumería 100% original y garantizada. Envío a toda Colombia.",
    cta: "Explorar la tienda",
    href: "/tienda",
    gradient: "from-[#1a1712] via-[#2a2117] to-[#0e0b07]",
  },
  {
    eyebrow: "Árabes & Orientales",
    title: "Historias milenarias",
    subtitle: "Lattafa, Armaf, Orientica y más. Estelas que perduran.",
    cta: "Ver árabes",
    href: "/colecciones/arabes",
    gradient: "from-[#2a1a0c] via-[#3a2410] to-[#160d05]",
  },
  {
    eyebrow: "Sets & Kits",
    title: "El regalo perfecto",
    subtitle: "Presentaciones de lujo listas para sorprender.",
    cta: "Ver sets",
    href: "/colecciones/sets-regalo",
    gradient: "from-[#14211d] via-[#1d3029] to-[#0a120f]",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const n = SLIDES.length;
  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);

  const s = SLIDES[i];

  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[420px] max-h-[720px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`}
            style={
              s.image
                ? { backgroundImage: `url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                : undefined
            }
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 sm:px-10">
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="max-w-xl"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">{s.eyebrow}</p>
                <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
                  {s.title}
                </h1>
                <p className="mt-4 text-base text-white/80 sm:text-lg">{s.subtitle}</p>
                <Link href={s.href} className="btn-gold mt-8">
                  {s.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Flechas */}
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
        >
          ›
        </button>

        {/* Puntos */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Ir al banner ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gold" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
