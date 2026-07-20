import Link from "next/link";
import Image from "next/image";

const BENEFITS = [
  { icon: "✓", text: "Alternativas premium a precios justos" },
  { icon: "✓", text: "Inspiradas en las mejores marcas del mundo" },
  { icon: "✓", text: "Envío a toda Colombia" },
  { icon: "✓", text: "+500 referencias disponibles" },
];

const COLLECTIONS = [
  { href: "/colecciones/arabes", label: "Árabes & Orientales" },
  { href: "/colecciones/masculinos", label: "Masculinos" },
  { href: "/colecciones/femeninos", label: "Femeninos" },
  { href: "/colecciones/body-sprays", label: "Body Sprays" },
  { href: "/colecciones/sets-regalo", label: "Sets & Kits" },
];

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo-nexko.png"
            alt="NEXKO PARFUM"
            width={463}
            height={516}
            className="h-32 w-auto sm:h-36"
          />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <h4 className="mb-4 font-serif text-lg text-gold">¿Por qué NEXKO PARFUM?</h4>
            <ul className="space-y-2">
              {BENEFITS.map((b) => (
                <li key={b.text} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <span className="text-gold">{b.icon}</span>
                  {b.text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-lg text-gold">Colecciones</h4>
            <ul className="space-y-2">
              {COLLECTIONS.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-lg text-gold">Herramientas</h4>
            <ul className="mb-6 space-y-2">
              <li>
                <Link
                  href="/comparar"
                  className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
                >
                  Comparar aromas
                </Link>
              </li>
              <li>
                <Link
                  href="/armar-kit"
                  className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
                >
                  Arma tu kit de regalo
                </Link>
              </li>
              <li>
                <Link
                  href="/lista"
                  className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
                >
                  Mi lista de deseos
                </Link>
              </li>
            </ul>
            <h4 className="mb-4 font-serif text-lg text-gold">Síguenos</h4>
            <a
              href="https://instagram.com/nexko_parfum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-ink-primary"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.85a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" />
              </svg>
              @nexko_parfum
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-subtle pt-6 text-center text-xs text-ink-secondary">
          <p>NEXKO PARFUM — Fragancias de inspiración premium.</p>
          <p className="mt-1">
            Productos de inspiración. No somos distribuidores oficiales de las marcas
            mencionadas. Las marcas son propiedad de sus respectivos dueños.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} NEXKO PARFUM. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
