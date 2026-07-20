import fs from "node:fs";
import path from "node:path";

/**
 * Cinta de marcas en movimiento continuo (marquee infinito).
 * Si existe el logo en /public/brands/<slug>.(svg|png|webp|jpg) lo muestra;
 * si no, cae al nombre en texto. CSS puro, se pausa al hover y respeta
 * prefers-reduced-motion.
 */

const BRANDS = [
  "Lattafa",
  "Xerjoff",
  "Armaf",
  "Orientica",
  "Paris Corner",
  "Al Haramain",
  "Carolina Herrera",
  "Jean Paul Gaultier",
  "Dior",
  "Paco Rabanne",
  "Valentino",
  "Yves Saint Laurent",
  "Victoria's Secret",
  "Tous",
  "Ariana Grande",
  "Amouage",
  "Creed",
  "Chanel",
  "Moschino",
  "Maison Alhambra",
];

export const brandSlug = (name: string): string =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const EXT_PRIORITY = ["svg", "png", "webp", "jpg", "jpeg"];

/** Busca el archivo de logo disponible para cada marca (en build/render). */
function resolveLogos(): Record<string, string | null> {
  const dir = path.join(process.cwd(), "public", "brands");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = []; // carpeta aún sin logos
  }
  const out: Record<string, string | null> = {};
  for (const brand of BRANDS) {
    const slug = brandSlug(brand);
    const hit = EXT_PRIORITY.map((ext) => `${slug}.${ext}`).find((f) =>
      files.includes(f),
    );
    out[brand] = hit ? `/brands/${hit}` : null;
  }
  return out;
}

function Row({ logos }: { logos: Record<string, string | null> }) {
  return (
    <ul className="flex shrink-0 items-center gap-x-14 pr-14">
      {BRANDS.map((b) => (
        <li key={b} className="flex items-center">
          {logos[b] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logos[b] as string}
              alt={b}
              className="h-8 w-auto max-w-[160px] object-contain opacity-75 invert mix-blend-screen transition-opacity duration-300 hover:opacity-100 sm:h-10"
              loading="lazy"
            />
          ) : (
            <span className="whitespace-nowrap font-display text-xl uppercase tracking-[0.18em] text-ink-secondary/75 transition-colors hover:text-gold sm:text-2xl">
              {b}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function BrandsMarquee() {
  const logos = resolveLogos();

  return (
    <section className="border-y border-subtle bg-dark/40 py-10">
      <p className="mb-7 text-center text-xs uppercase tracking-[0.3em] text-gold">
        Inspirado en las mejores casas del mundo
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee">
          <Row logos={logos} />
          <Row logos={logos} />
        </div>
      </div>
    </section>
  );
}
