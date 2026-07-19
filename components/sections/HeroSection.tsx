"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useUI } from "@/lib/store/ui";

const headline = "El lujo que hueles.";
const headline2 = "El precio que mereces.";

export function HeroSection() {
  const openScentFinder = useUI((s) => s.openScentFinder);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Fondo elegante (sin 3D): degradado + resplandores dorados suaves */}
      <div className="absolute inset-0 bg-void-radial">
        <div className="absolute left-1/2 top-[38%] h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-[130px]" />
        <div className="absolute right-[18%] top-[26%] h-64 w-64 rounded-full bg-rose-scent/10 blur-[110px]" />
        <div className="absolute bottom-[20%] left-[16%] h-56 w-56 rounded-full bg-spice-amber/10 blur-[110px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-subtle bg-surface/40 px-4 py-1.5 text-xs text-ink-secondary backdrop-blur"
        >
          ⭐ Más de 2.000 clientes felices
        </motion.div>

        <h1 className="font-display text-4xl leading-tight sm:text-6xl">
          <RevealLine text={headline} delay={0.1} />
          <span className="block gradient-gold">
            <RevealLine text={headline2} delay={0.5} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-base text-ink-secondary sm:text-lg"
        >
          Más de 500 fragancias premium · Envío a toda Colombia
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/tienda" className="btn-gold w-full sm:w-auto">
            Explorar la tienda
          </Link>
          <button onClick={openScentFinder} className="btn-outline-gold w-full sm:w-auto">
            Descubre tu aroma
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-subtle p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}

function RevealLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block">
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: delay + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
