import Link from "next/link";
import { ImageOrGradient } from "@/components/ui/ImageOrGradient";

/**
 * Familias olfativas — tarjetas editoriales (estilo Perfumarte):
 * foto de fondo + degradado + título abajo-izquierda con subrayado dorado.
 *
 * Cada tarjeta busca su foto en /public/familias/<slug>.webp. Mientras el
 * archivo no exista, muestra un degradado premium. Sube tus fotos con esos
 * nombres exactos y aparecerán automáticamente:
 *   /public/familias/citricos.webp, dulces.webp, florales.webp,
 *   amaderados.webp, frutales.webp, frescos.webp
 */
interface Family {
  label: string;
  q: string;
  slug: string;
  gradient: string;
}

const FAMILIES: Family[] = [
  { label: "Cítricos", q: "citrico", slug: "citricos", gradient: "from-[#3a4a12] via-[#6b7a1f] to-[#c9b447]" },
  { label: "Dulces", q: "dulce", slug: "dulces", gradient: "from-[#3a1f0c] via-[#7a4a1f] to-[#d9a45c]" },
  { label: "Florales", q: "floral", slug: "florales", gradient: "from-[#3a1226] via-[#7a2f52] to-[#d98cae]" },
  { label: "Amaderados", q: "amaderado", slug: "amaderados", gradient: "from-[#2a1c0c] via-[#4a3418] to-[#8a6f3e]" },
  { label: "Frutales", q: "frutal", slug: "frutales", gradient: "from-[#3a0c14] via-[#7a1f2f] to-[#d95c6e]" },
  { label: "Frescos", q: "fresco", slug: "frescos", gradient: "from-[#0c2a3a] via-[#1f5a7a] to-[#5cbcd9]" },
];

export function ScentFamilies() {
  return (
    <div className="flex snap-x gap-4 overflow-x-auto pb-2 no-scrollbar">
      {FAMILIES.map((f) => (
        <Link
          key={f.q}
          href={`/tienda?q=${encodeURIComponent(f.q)}`}
          className="group relative flex aspect-[3/4] shrink-0 basis-52 snap-start overflow-hidden rounded-2xl shadow-card sm:basis-56"
        >
          <ImageOrGradient base={`/familias/${f.slug}`} alt={f.label} gradient={f.gradient} />

          {/* Scrim para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Título abajo-izquierda + subrayado dorado */}
          <div className="relative mt-auto p-5">
            <h3 className="font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
              {f.label}
            </h3>
            <span className="mt-2 block h-0.5 w-10 bg-gold transition-all duration-300 group-hover:w-16" />
          </div>
        </Link>
      ))}
    </div>
  );
}
