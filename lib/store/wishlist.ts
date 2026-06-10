"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  handle: string;
  title: string;
  vendor: string;
  image: string;
  price: string;
}

interface WishlistState {
  items: WishlistItem[];
  has: (handle: string) => boolean;
  toggle: (item: WishlistItem) => void;
  remove: (handle: string) => void;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      has: (handle) => get().items.some((i) => i.handle === handle),
      toggle: (item) =>
        set((s) =>
          s.items.some((i) => i.handle === item.handle)
            ? { items: s.items.filter((i) => i.handle !== item.handle) }
            : { items: [...s.items, item] },
        ),
      remove: (handle) => set((s) => ({ items: s.items.filter((i) => i.handle !== handle) })),
      clear: () => set({ items: [] }),
    }),
    { name: "nexko-wishlist" },
  ),
);
