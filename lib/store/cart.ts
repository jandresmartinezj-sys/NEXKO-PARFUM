"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "@/lib/shopify/types";

type CartAction =
  | { action: "add"; cartId: string | null; merchandiseId: string; quantity: number }
  | { action: "update"; cartId: string; lineId: string; quantity: number }
  | { action: "remove"; cartId: string; lineId: string }
  | { action: "get"; cartId: string };

async function callCartApi(payload: CartAction): Promise<Cart | null> {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Error en el carrito");
  }
  const data = await res.json();
  return data.cart as Cart | null;
}

interface CartState {
  cartId: string | null;
  cart: Cart | null;
  isOpen: boolean;
  loading: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      isOpen: false,
      loading: false,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: async (merchandiseId, quantity = 1) => {
        set({ loading: true });
        try {
          const cart = await callCartApi({
            action: "add",
            cartId: get().cartId,
            merchandiseId,
            quantity,
          });
          if (cart) set({ cart, cartId: cart.id, isOpen: true });
        } finally {
          set({ loading: false });
        }
      },

      updateLine: async (lineId, quantity) => {
        const cartId = get().cartId;
        if (!cartId) return;
        set({ loading: true });
        try {
          const cart = await callCartApi({ action: "update", cartId, lineId, quantity });
          if (cart) set({ cart });
        } finally {
          set({ loading: false });
        }
      },

      removeLine: async (lineId) => {
        const cartId = get().cartId;
        if (!cartId) return;
        set({ loading: true });
        try {
          const cart = await callCartApi({ action: "remove", cartId, lineId });
          if (cart) set({ cart });
        } finally {
          set({ loading: false });
        }
      },

      refresh: async () => {
        const cartId = get().cartId;
        if (!cartId) return;
        try {
          const cart = await callCartApi({ action: "get", cartId });
          // Si Shopify ya no reconoce el carrito (expiró / checkout completado), lo limpiamos.
          set(cart ? { cart } : { cart: null, cartId: null });
        } catch {
          /* silencioso */
        }
      },
    }),
    {
      name: "nexko-cart",
      partialize: (s) => ({ cartId: s.cartId, cart: s.cart }),
    },
  ),
);
