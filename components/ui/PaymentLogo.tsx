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
  exts = ["svg", "png", "webp", "jpg"],
}: {
  name: string;
  slug: string;
  color: string;
  exts?: string[];
}) {
  const [idx, setIdx] = useState(0);
  const exhausted = idx >= exts.length;

  return (
    <span className="flex h-10 min-w-[104px] items-center justify-center rounded-md bg-white px-4 shadow-sm">
      {!exhausted ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/pagos/${slug}.${exts[idx]}`}
          alt={name}
          className="h-6 w-auto object-contain"
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <span className="text-sm font-bold tracking-tight" style={{ color }}>
          {name}
        </span>
      )}
    </span>
  );
}
