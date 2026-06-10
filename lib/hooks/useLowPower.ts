"use client";

import { useEffect, useState } from "react";

/**
 * Detecta dispositivos de bajos recursos o con "reduce motion" para
 * degradar gracefully los componentes 3D.
 */
export function useLowPower(): boolean {
  const [low, setLow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency ?? 8;
    if (reduce || (mem !== undefined && mem <= 3) || cores <= 4) {
      setLow(true);
    }
  }, []);

  return low;
}
