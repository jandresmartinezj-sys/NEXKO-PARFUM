import Link from "next/link";

/**
 * Rejilla de banners de categoría (estilo Perfumarte).
 * Placeholders con degradado; enlazan a colecciones reales.
 * Para banners reales: añade `image` y renderiza <img> de fondo.
 */
const TILES = [
  { label: "Alternativas de autor", href: "/colecciones/arabes", gradient: "from-[#2a1a0c] to-[#4a2d12]", emoji: "🕌" },
  { label: "Perfumes de diseñador", href: "/tienda", gradient: "from-[#151a24] to-[#2a3550]", emoji: "💎" },
  { label: "Perfumes tester", href: "/tienda?q=tester", gradient: "from-[#241a24] to-[#402a40]", emoji: "🧪" },
  { label: "Perfumes de nicho", href: "/tienda", gradient: "from-[#0e1a17] to-[#1d3029]", emoji: "🌿" },
  { label: "Perfumería árabe", href: "/colecciones/arabes", gradient: "from-[#2a230c] to-[#4a3d12]", emoji: "🪔" },
  { label: "Body sprays", href: "/colecciones/body-sprays", gradient: "from-[#0e1a24] to-[#1d3040]", emoji: "🌀" },
];

export function CategoryBannerGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {TILES.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          className={`group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} p-5 shadow-card transition-transform duration-300 hover:scale-[1.01]`}
        >
          <span className="absolute right-4 top-4 text-3xl opacity-80 transition-transform group-hover:scale-110">
            {t.emoji}
          </span>
          <h3 className="font-display text-xl text-white">{t.label}</h3>
          <span className="mt-1 text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
            Ver colección →
          </span>
        </Link>
      ))}
    </div>
  );
}
