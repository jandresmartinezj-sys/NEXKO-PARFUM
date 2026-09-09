import Link from "next/link";

/**
 * Carrusel de familias olfativas (estilo Perfumarte).
 * Tarjetas con degradado + emoji; enlazan a la búsqueda de la tienda.
 * Para usar imágenes reales: añade `image` y renderiza <img> de fondo.
 */
const FAMILIES = [
  { label: "Cítricos", emoji: "🍋", q: "citrico", gradient: "from-lime-200 to-yellow-100" },
  { label: "Dulces", emoji: "🍯", q: "dulce", gradient: "from-amber-200 to-orange-100" },
  { label: "Florales", emoji: "🌸", q: "floral", gradient: "from-rose-200 to-pink-100" },
  { label: "Amaderados", emoji: "🌳", q: "amaderado", gradient: "from-amber-300 to-stone-200" },
  { label: "Frutales", emoji: "🍑", q: "frutal", gradient: "from-red-200 to-rose-100" },
  { label: "Frescos", emoji: "🌊", q: "fresco", gradient: "from-sky-200 to-cyan-100" },
];

export function ScentFamilies() {
  return (
    <div className="flex snap-x gap-4 overflow-x-auto pb-2 no-scrollbar">
      {FAMILIES.map((f) => (
        <Link
          key={f.q}
          href={`/tienda?q=${encodeURIComponent(f.q)}`}
          className="group flex shrink-0 snap-start basis-40 flex-col items-center sm:basis-48"
        >
          <div
            className={`flex aspect-square w-full items-center justify-center rounded-2xl border border-subtle bg-gradient-to-br ${f.gradient} shadow-card transition-transform duration-300 group-hover:scale-[1.03]`}
          >
            <span className="text-5xl">{f.emoji}</span>
          </div>
          <span className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink-primary group-hover:text-gold">
            {f.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
