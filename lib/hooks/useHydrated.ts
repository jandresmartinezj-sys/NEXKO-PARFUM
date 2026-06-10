"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve false en el primer render (servidor + primera pintura del cliente) y
 * true tras montar. Útil para mostrar estado persistido (Zustand persist) sin
 * provocar errores de hidratación.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
