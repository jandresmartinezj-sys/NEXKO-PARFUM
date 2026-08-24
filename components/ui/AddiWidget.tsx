"use client";

import { useEffect, useRef } from "react";

/**
 * Widget promocional de Addi ("Paga con Addi en cuotas").
 *
 * Addi entrega a cada comercio un script propio (por correo, o pidiéndolo a
 * activacion.aliados@addi.com). Este componente carga ese script y renderiza
 * el contenedor que Addi rellena con el mensaje de cuotas según el precio.
 *
 * Configúralo con variables de entorno (ver .env.example):
 *   NEXT_PUBLIC_ADDI_ALLY_SLUG   -> tu identificador de aliado (obligatorio)
 *   NEXT_PUBLIC_ADDI_WIDGET_SRC  -> URL del script (opcional; usa el bundle
 *                                   estándar de Addi si no se define)
 *
 * Si no hay ally slug configurado, el componente no renderiza nada, así que es
 * seguro desplegarlo antes de tener las credenciales.
 */

const ALLY_SLUG = process.env.NEXT_PUBLIC_ADDI_ALLY_SLUG;
const WIDGET_SRC =
  process.env.NEXT_PUBLIC_ADDI_WIDGET_SRC ??
  "https://s3.amazonaws.com/statics.addi.com/shopify/js/shopify-co-widget-wrapper.bundle.min.js";
const SCRIPT_ID = "addi-widget-script";

/** Carga el script de Addi una sola vez para toda la app. */
function ensureAddiScript(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = WIDGET_SRC;
  s.async = true;
  document.body.appendChild(s);
}

/** Pide a Addi que vuelva a escanear el DOM (tras cambiar de precio/página). */
function refreshAddi(): void {
  const w = window as unknown as { AddiWidget?: { render?: () => void } };
  try {
    w.AddiWidget?.render?.();
  } catch {
    /* el bundle procesa por su cuenta al cargar; ignoramos si no expone API */
  }
}

export function AddiWidget({
  price,
  className,
}: {
  price: number | string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const amount = Math.round(Number(price));

  useEffect(() => {
    if (!ALLY_SLUG || !amount) return;
    ensureAddiScript();
    // Reintenta el render un momento después por si el script aún cargaba.
    refreshAddi();
    const t = setTimeout(refreshAddi, 800);
    return () => clearTimeout(t);
  }, [amount]);

  // Sin credenciales o sin precio válido no mostramos nada.
  if (!ALLY_SLUG || !amount) return null;

  return (
    <div className={className}>
      {/* Contenedor que el bundle de Addi rellena con el mensaje de cuotas. */}
      <div
        key={amount}
        ref={ref}
        data-name="shopifyAddiWidget"
        data-ally-slug={ALLY_SLUG}
        data-price={amount}
      />
    </div>
  );
}
