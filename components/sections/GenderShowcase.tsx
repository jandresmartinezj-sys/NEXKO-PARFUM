import Link from "next/link";
import { ImageOrGradient } from "@/components/ui/ImageOrGradient";

/**
 * Banners por categoría (estilo Perfumarte): foto editorial + degradado +
 * título abajo-izquierda con subrayado dorado.
 *
 * Cada banner busca su foto en /public/banners/<slug>.webp. Mientras no exista,
 * usa un degradado premium. Sube tus fotos con estos nombres:
 *   /public/banners/masculinos.webp, femeninos.webp, arabes.webp
 */
interface Banner {
  label: string;
  href: string;
  slug: string;
  gradient: string;
}

const BANNERS: Banner[] = [
  {
    label: "Perfumes Masculinos",
    href: "/tienda?cat=masculinos",
    slug: "masculinos",
    gradient: "from-[#0f1620] via-[#243447] to-[#4a637d]",
  },
  {
    label: "Perfumes Femeninos",
    href: "/tienda?cat=femeninos",
    slug: "femeninos",
    gradient: "from-[#2a1220] via-[#5a2340] to-[#a8557d]",
  },
  {
    label: "Árabes & Orientales",
    href: "/tienda?cat=arabes",
    slug: "arabes",
    gradient: "from-[#231607] via-[#4a3012] to-[#8a6a2e]",
  },
];

export function GenderShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {BANNERS.map((b) => (
        <Link
          key={b.href}
          href={b.href}
          className="group relative flex aspect-[3/4] overflow-hidden rounded-2xl shadow-card"
        >
          <ImageOrGradient base={`/banners/${b.slug}`} alt={b.label} gradient={b.gradient} />

          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          {/* Título abajo-izquierda + subrayado dorado */}
          <div className="relative mt-auto p-6">
            <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-white sm:text-3xl">
              {b.label}
            </h3>
            <span className="mt-3 block h-0.5 w-12 bg-gold transition-all duration-300 group-hover:w-20" />
          </div>
        </Link>
      ))}
    </div>
  );
}
