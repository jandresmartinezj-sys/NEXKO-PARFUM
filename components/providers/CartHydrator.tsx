"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/store/cart";

/** Sincroniza el carrito persistido con Shopify al cargar la app. */
export function CartHydrator() {
  const refresh = useCart((s) => s.refresh);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return null;
}
