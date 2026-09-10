import Link from "next/link";
import { ImageOrGradient } from "@/components/ui/ImageOrGradient";

/**
 * Rejilla de banners de categoría (estilo Perfumarte): foto de fondo +
 * degradado de respaldo + título abajo-izquierda.
 *
 * Cada tarjeta busca su foto en /public/categorias/<slug>.<ext> (prueba
 * .webp, .jpg, .jpeg y .png). Mientras no exista, muestra el degradado.
 * Sube tus fotos con estos nombres exactos:
 *   /public/categorias/sets.jpg        -> Sets & Kits
 *   /public/categorias/disenador.jpg   -> Perfumes de diseñador
 *   /public/categorias/tester.jpg      -> Perfumes tester
 *   /public/categorias/nicho.jpg       -> Perfumes de nicho
 *   /public/categorias/arabe.jpg       -> Perfumería árabe
 */
const TILES = [
  { label: "Sets & Kits", href: "/colecciones/sets-regalo", slug: "sets", gradient: "from-[#14211d] to-[#2a3f36]" },
  { label: "Perfumes de diseñador", href: "/tienda", slug: "disenador", gradient: "from-[#151a24] to-[#2a3550]" },
  { label: "Perfumes tester", href: "/tienda?q=tester", slug: "tester", gradient: "from-[#241a24] to-[#402a40]" },
  { label: "Perfumes de nicho", href: "/tienda", slug: "nicho", gradient: "from-[#0e1a17] to-[#1d3029]" },
  { label: "Perfumería árabe", href: "/colecciones/arabes", slug: "arabe", gradient: "from-[#2a230c] to-[#4a3d12]" },
];

export function CategoryBannerGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {TILES.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl p-5 shadow-card transition-transform duration-300 hover:scale-[1.01]"
        >
          {/* Foto de fondo (o degradado si aún no se ha subido) */}
          <ImageOrGradient base={`/categorias/${t.slug}`} alt={t.label} gradient={t.gradient} />

          {/* Capa oscura para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

          <div className="relative">
            <h3 className="font-display text-xl text-white">{t.label}</h3>
            <span className="mt-1 block text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
              Ver colección →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
