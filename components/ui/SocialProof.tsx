"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CITIES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Pereira",
  "Manizales",
];

const PRODUCTS = [
  "Khamrah Lattafa",
  "Yara Lattafa",
  "Sauvage Dior",
  "Good Girl",
  "Le Male Elixir",
  "Oud For Glory",
  "Cloud Ariana Grande",
  "One Million",
];

interface Toast {
  id: number;
  city: string;
  product: string;
  minsAgo: number;
}

export function SocialProof() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let counter = 0;
    const show = () => {
      counter += 1;
      setToast({
        id: counter,
        city: CITIES[Math.floor(Math.random() * CITIES.length)],
        product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
        minsAgo: 2 + Math.floor(Math.random() * 25),
      });
      // ocultar tras 6s
      setTimeout(() => setToast(null), 6000);
    };

    const first = setTimeout(show, 4500);
    const interval = setInterval(show, 11000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-4 z-50 max-w-[88vw]">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-gold"
          >
            <span className="text-xl">🛍️</span>
            <div className="text-sm leading-tight">
              <p className="text-ink-primary">
                Alguien en <span className="font-semibold">{toast.city}</span> compró
              </p>
              <p className="text-gold">{toast.product}</p>
              <p className="text-xs text-ink-secondary">hace {toast.minsAgo} min</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
