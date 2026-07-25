"use client";

import { fbTrack } from "./pixel";

export type TrackItem = { handle: string; title: string; vendor?: string; price: number };
export type CheckoutLine = TrackItem & { quantity: number };

function gaTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, params);
}

/** Ficha de producto vista → Meta ViewContent + GA4 view_item. */
export function trackViewItem(p: TrackItem): void {
  fbTrack("ViewContent", {
    content_type: "product",
    content_ids: [p.handle],
    content_name: p.title,
    currency: "COP",
    value: p.price,
  });
  gaTrack("view_item", {
    currency: "COP",
    value: p.price,
    items: [{ item_id: p.handle, item_name: p.title, item_brand: p.vendor, price: p.price, quantity: 1 }],
  });
}

/** Agregar al carrito → Meta AddToCart + GA4 add_to_cart. */
export function trackAddToCart(p: TrackItem, qty = 1): void {
  const value = p.price * qty;
  fbTrack("AddToCart", {
    content_type: "product",
    content_ids: [p.handle],
    content_name: p.title,
    currency: "COP",
    value,
    contents: [{ id: p.handle, quantity: qty }],
  });
  gaTrack("add_to_cart", {
    currency: "COP",
    value,
    items: [{ item_id: p.handle, item_name: p.title, item_brand: p.vendor, price: p.price, quantity: qty }],
  });
}

/** Ir a checkout → Meta InitiateCheckout + GA4 begin_checkout. */
export function trackBeginCheckout(lines: CheckoutLine[], value: number, numItems: number): void {
  fbTrack("InitiateCheckout", {
    currency: "COP",
    value,
    num_items: numItems,
    content_ids: lines.map((l) => l.handle),
  });
  gaTrack("begin_checkout", {
    currency: "COP",
    value,
    items: lines.map((l) => ({ item_id: l.handle, item_name: l.title, price: l.price, quantity: l.quantity })),
  });
}
