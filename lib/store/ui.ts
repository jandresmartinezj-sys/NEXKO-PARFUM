"use client";

import { create } from "zustand";

interface UIState {
  scentFinderOpen: boolean;
  openScentFinder: () => void;
  closeScentFinder: () => void;
}

export const useUI = create<UIState>((set) => ({
  scentFinderOpen: false,
  openScentFinder: () => set({ scentFinderOpen: true }),
  closeScentFinder: () => set({ scentFinderOpen: false }),
}));
