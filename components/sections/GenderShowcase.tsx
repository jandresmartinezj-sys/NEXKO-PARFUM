import Link from "next/link";
import Image from "next/image";

/**
 * Banners por categoría (estilo Perfumarte): imagen editorial + degradado +
 * título abajo-izquierda con subrayado dorado.
 *
 * Para usar tus fotos reales: súbelas a /public/banners/<archivo>.webp y pon la
 * ruta en `image`. Sin imagen se usa un degradado premium (no genérico).
 */
interface Banner {
  label: string;
  href: string;
  gradient: string;
  image?: string; // p. ej. "/banners/masculinos.webp"
}

const BANNERS: Banner[] = [
  {
    label: "Perfumes Masculinos",
    href: "/colecciones/masculinos",
    gradient: "from-[#0f1620] via-[#243447] to-[#4a637d]",
  },
  {
    label: "Perfumes Femeninos",
    href: "/colecciones/femeninos",
    gradient: "from-[#2a1220] via-[#5a2340] to-[#a8557d]",
  },
  {
    label: "Árabes & Orientales",
    href: "/colecciones/arabes",
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
          {b.image ? (
            <Image
              src={b.image}
              alt={b.label}
              fill
              sizes="(max-width:640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} transition-transform duration-500 group-hover:scale-105`} />
          )}

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
