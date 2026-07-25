"use client";

export type PixelParams = Record<string, unknown>;

/**
 * Dispara un evento estándar de Meta Pixel si el pixel ya cargó.
 * Seguro en SSR y si el usuario bloquea el pixel (no-op).
 */
export function fbTrack(event: string, params?: PixelParams): void {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== "function") return;
  fbq("track", event, params);
}
