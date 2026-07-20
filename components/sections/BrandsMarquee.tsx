/**
 * Cinta de marcas en movimiento continuo (marquee infinito), enmarcada como
 * "inspirado en las mejores casas". CSS puro, se pausa al pasar el mouse y
 * respeta prefers-reduced-motion.
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

function Row() {
  return (
    <ul className="flex shrink-0 items-center gap-x-14 pr-14">
      {BRANDS.map((b) => (
        <li key={b}>
          <span className="whitespace-nowrap font-display text-xl uppercase tracking-[0.18em] text-ink-secondary/75 transition-colors hover:text-gold sm:text-2xl">
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function BrandsMarquee() {
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
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
