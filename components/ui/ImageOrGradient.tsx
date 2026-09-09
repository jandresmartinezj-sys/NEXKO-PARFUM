"use client";

import { useState } from "react";

/**
 * Muestra una foto de fondo si el archivo existe; prueba varias extensiones
 * (.webp, .jpg, .png) y, si ninguna carga, cae con elegancia a un degradado.
 * Así se pueden subir las fotos reales sin dejar imágenes rotas mientras tanto.
 */
export function ImageOrGradient({
  base,
  alt,
  gradient,
  exts = ["webp", "jpg", "jpeg", "png"],
}: {
  base: string; // p. ej. "/familias/citricos" (sin extensión)
  alt: string;
  gradient: string;
  exts?: string[];
}) {
  const [idx, setIdx] = useState(0);
  const exhausted = idx >= exts.length;
  const src = exhausted ? "" : `${base}.${exts[idx]}`;

  return (
    <>
      {!exhausted && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setIdx((i) => i + 1)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      {exhausted && (
        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`}
        />
      )}
    </>
  );
}
