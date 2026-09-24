"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Widget promocional de Addi ("Paga a cuotas con Addi").
 *
 * Usa el script oficial que Addi generó para esta tienda
 * (shopify-co-widget-wrapper.bundle.min.js). El bundle busca en el DOM los
 * elementos que coinciden con `data-element-reference`, lee el precio de cada
 * uno y muestra el mensaje de cuotas justo al lado. Por eso cada precio sobre el
 * que queremos el mensaje (ficha de producto, subtotal del carrito) se envuelve
 * con la clase `ADDI_PRICE_ANCHOR_CLASS`.
 *
 * El ally-slug y el id NO son secretos (viajan en el HTML del navegador), así
 * que se dejan como valores por defecto y se pueden sobreescribir con variables
 * de entorno si algún día cambian:
 *   NEXT_PUBLIC_ADDI_ALLY_SLUG   -> identificador de aliado
 *   NEXT_PUBLIC_ADDI_ID          -> id de comercio
 *   NEXT_PUBLIC_ADDI_WIDGET_SRC  -> URL del script (opcional)
 */

const ALLY_SLUG =
  process.env.NEXT_PUBLIC_ADDI_ALLY_SLUG ?? "nexkoparfumstore-ecommerce";
const ADDI_ID = process.env.NEXT_PUBLIC_ADDI_ID ?? "nexkoparfumstore";
const WIDGET_SRC =
  process.env.NEXT_PUBLIC_ADDI_WIDGET_SRC ??
  "https://statics.addi.com/shopify/js/shopify-co-widget-wrapper.bundle.min.js";

/** Clase que marca un precio para que Addi inyecte el mensaje de cuotas al lado. */
export const ADDI_PRICE_ANCHOR_CLASS = "addi-price-anchor";

/** Pide a Addi que vuelva a leer el DOM tras cambiar de precio/página (SPA). */
function rescanAddi(): void {
  const w = window as unknown as { AddiWidget?: { render?: () => void } };
  try {
    w.AddiWidget?.render?.();
  } catch {
    /* el bundle procesa por su cuenta al cargar; ignoramos si no expone API */
  }
}

export function AddiWidget({ price }: { price: number | string }) {
  const amount = Math.round(Number(price));

  useEffect(() => {
    if (!ALLY_SLUG || !amount) return;
    // En navegación cliente (SPA) el bundle ya está cargado: pídele que
    // vuelva a leer los precios actuales.
    rescanAddi();
    const t = setTimeout(rescanAddi, 800);
    return () => clearTimeout(t);
  }, [amount]);

  if (!ALLY_SLUG || !amount) return null;

  return (
    <Script
      id="addi-widget-script"
      src={WIDGET_SRC}
      strategy="afterInteractive"
      data-name="shopifyAddiWidget"
      data-id={ADDI_ID}
      data-ally-slug={ALLY_SLUG}
      data-element-reference={`.${ADDI_PRICE_ANCHOR_CLASS}`}
      onLoad={rescanAddi}
    />
  );
}
