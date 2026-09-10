"use client";

import { useState } from "react";

/**
 * Muestra el logo oficial de un método de pago desde /public/pagos/<slug>.<ext>
 * (prueba .svg, .png, .webp, .jpg). Si el archivo aún no se ha subido, cae con
 * elegancia al nombre de la marca con su color, para no dejar imágenes rotas.
 */
export function PaymentLogo({
  name,
  slug,
  color,
  exts = ["png", "webp", "svg", "jpg"],
}: {
  name: string;
  slug: string;
  color: string;
  exts?: string[];
}) {
  const [idx, setIdx] = useState(0);
  const exhausted = idx >= exts.length;

  return (
    <span className="flex items-center justify-center">
      {!exhausted ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/pagos/${slug}.${exts[idx]}`}
          alt={name}
          // Monocromo blanco para verse uniforme sobre el footer oscuro, sin caja.
          className="h-6 w-auto object-contain opacity-85 brightness-0 invert transition-opacity duration-200 hover:opacity-100 sm:h-7"
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <span className="text-base font-bold tracking-tight text-white/80">{name}</span>
      )}
    </span>
  );
}
