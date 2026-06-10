"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "@/lib/store/ui";
import {
  CATALOG,
  FAMILY_LABELS,
  type CatalogItem,
  type ScentFamily,
  type Gender,
  type Intensity,
} from "@/lib/data/catalog";

interface Answers {
  occasion?: string;
  family?: ScentFamily;
  price?: [number, number];
  gender?: Gender;
  intensity?: Intensity;
}

const QUESTIONS = [
  {
    id: "occasion",
    q: "¿Para qué ocasión buscas tu aroma?",
    options: [
      { label: "Trabajo / Oficina", icon: "💼", value: "fresco" },
      { label: "Salidas nocturnas", icon: "🌙", value: "intenso" },
      { label: "Uso diario", icon: "☀️", value: "versatil" },
      { label: "Ocasión especial", icon: "✨", value: "lujoso" },
    ],
  },
  {
    id: "family",
    q: "¿Qué familia de aromas te atrae más?",
    options: [
      { label: "Florales y suaves", icon: "🌹", value: "floral" },
      { label: "Árabes y orientales", icon: "🕌", value: "oriental" },
      { label: "Frescos y acuáticos", icon: "🌊", value: "acuatico" },
      { label: "Amaderados e intensos", icon: "🪵", value: "amaderado" },
    ],
  },
  {
    id: "price",
    q: "¿Cuánto quieres invertir?",
    options: [
      { label: "$116.000 - $130.000", icon: "💰", value: [116000, 130000] },
      { label: "$130.000 - $170.000", icon: "💰", value: [130000, 170000] },
      { label: "$170.000 - $200.000", icon: "💎", value: [170000, 200000] },
      { label: "$200.000 o más", icon: "👑", value: [200000, 999000] },
    ],
  },
  {
    id: "gender",
    q: "¿Para quién es el perfume?",
    options: [
      { label: "Para mí — Mujer", icon: "👩", value: "dama" },
      { label: "Para mí — Hombre", icon: "👨", value: "caballero" },
      { label: "Para regalar", icon: "🎁", value: "unisex" },
      { label: "Algo unisex", icon: "⚧", value: "unisex" },
    ],
  },
  {
    id: "intensity",
    q: "¿Qué tan intenso lo prefieres?",
    options: [
      { label: "Suave y sutil", icon: "🍃", value: "light" },
      { label: "Moderado", icon: "🌤", value: "moderate" },
      { label: "Intenso y duradero", icon: "🔥", value: "intense" },
      { label: "Extremo, que impacte", icon: "💥", value: "extreme" },
    ],
  },
] as const;

function score(item: CatalogItem, a: Answers): number {
  let s = 0;
  if (a.family && item.family === a.family) s += 5;
  if (a.gender && (item.gender === a.gender || item.gender === "unisex")) s += 3;
  if (a.intensity && item.intensity === a.intensity) s += 3;
  if (a.price && item.priceVenta >= a.price[0] && item.priceVenta <= a.price[1]) s += 2;
  if (a.occasion === "intenso" && (item.intensity === "intense" || item.intensity === "extreme")) s += 2;
  if (a.occasion === "fresco" && (item.family === "fresco" || item.family === "acuatico")) s += 2;
  if (a.occasion === "lujoso" && item.presentation === "cofre") s += 2;
  if (item.bestseller) s += 1;
  return s;
}

export function ScentFinder() {
  const open = useUI((s) => s.scentFinderOpen);
  const close = useUI((s) => s.closeScentFinder);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const handleClose = () => {
    close();
    setTimeout(reset, 300);
  };

  const choose = (id: string, value: unknown) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const results = [...CATALOG]
    .map((item) => ({ item, s: score(item, answers) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 5)
    .map((r) => r.item);

  const progress = done ? 100 : (step / QUESTIONS.length) * 100;
  const current = QUESTIONS[step];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-void/90 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 24, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-subtle bg-dark p-6 sm:p-10"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-2 text-ink-secondary hover:text-ink-primary"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Progreso */}
            <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full bg-gold-gradient"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
                    Paso {step + 1} de {QUESTIONS.length}
                  </p>
                  <h3 className="mb-6 font-display text-2xl text-ink-primary sm:text-3xl">
                    {current.q}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {current.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => choose(current.id, opt.value)}
                        className="flex items-center gap-3 rounded-2xl border border-subtle bg-surface/60 px-4 py-4 text-left transition-all hover:border-gold hover:bg-surface"
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="text-ink-primary">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="mt-6 text-sm text-ink-secondary hover:text-ink-primary"
                    >
                      ← Atrás
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
                    Tu match olfativo
                  </p>
                  <h3 className="mb-6 font-display text-2xl text-ink-primary sm:text-3xl">
                    Estas fragancias son para ti ✨
                  </h3>
                  <ul className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
                    {results.map((item, i) => (
                      <motion.li
                        key={item.handle}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <Link
                          href={`/tienda/${item.handle}`}
                          onClick={handleClose}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-subtle bg-surface/60 px-4 py-3 transition-colors hover:border-gold"
                        >
                          <div>
                            <p className="font-serif text-lg text-ink-primary">{item.title}</p>
                            <p className="text-xs text-ink-secondary">
                              {item.vendor} · {FAMILY_LABELS[item.family]}
                            </p>
                          </div>
                          <span className="text-gold">→</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <button onClick={reset} className="btn-outline-gold mt-6 w-full">
                    Repetir test
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
