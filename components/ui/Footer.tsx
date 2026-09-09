import Link from "next/link";
import Image from "next/image";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";
const IG_USER = process.env.NEXT_PUBLIC_INSTAGRAM_USER ?? "nexko_parfum";

const INFO_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/politicas/devoluciones", label: "Cambios y Devoluciones" },
  { href: "/politicas/privacidad", label: "Políticas de Privacidad" },
  { href: "/politicas/terminos", label: "Términos y Condiciones" },
];

const SHOP_LINKS = [
  { href: "/colecciones/arabes", label: "Árabes & Orientales" },
  { href: "/colecciones/masculinos", label: "Masculinos" },
  { href: "/colecciones/femeninos", label: "Femeninos" },
  { href: "/colecciones/body-sprays", label: "Body Sprays" },
  { href: "/colecciones/sets-regalo", label: "Sets & Kits" },
  { href: "/armar-kit", label: "Arma tu kit" },
];

// Métodos de pago. `color` = color de marca para el wordmark.
// Para logos oficiales: sube /public/pagos/<slug>.png y añade `logo` aquí.
const PAYMENTS: { name: string; color: string; logo?: string }[] = [
  { name: "Bancolombia", color: "#2b2b2b" },
  { name: "Nequi", color: "#20003b" },
  { name: "Daviplata", color: "#ED1C27" },
  { name: "Addi", color: "#1b1b4b" },
  { name: "Wompi", color: "#3c1a78" },
  { name: "Sistecrédito", color: "#E30613" },
];

export function Footer() {
  return (
    <footer className="mt-8 bg-dark text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca + bio */}
          <div>
            <Image
              src="/logo-nexko.png"
              alt="NEXKO PARFUM"
              width={463}
              height={516}
              className="h-24 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Perfumería premium y alternativas de autor. Fragancias originales y
              garantizadas, con envío a toda Colombia.
            </p>
          </div>

          {/* Información */}
          <div>
            <h4 className="mb-4 font-serif text-lg text-gold">Información</h4>
            <ul className="space-y-2">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="mb-4 font-serif text-lg text-gold">Tienda</h4>
            <ul className="space-y-2">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-4 font-serif text-lg text-gold">Contáctanos</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Colombia · Envíos a todo el país</li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp: +{WHATSAPP}
                </a>
              </li>
              <li>
                <Link href="/contacto" className="transition-colors hover:text-white">
                  Formulario de contacto
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href={`https://instagram.com/${IG_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.85a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 00-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.2 1.7.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-white/50">
            Métodos de pago
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PAYMENTS.map((p) => (
              <span
                key={p.name}
                className="flex h-10 min-w-[104px] items-center justify-center rounded-md bg-white px-4 shadow-sm"
              >
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo} alt={p.name} className="h-6 w-auto object-contain" />
                ) : (
                  <span
                    className="text-sm font-bold tracking-tight"
                    style={{ color: p.color }}
                  >
                    {p.name}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Legal + copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <nav className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              { href: "/politicas/envios", label: "Envíos" },
              { href: "/politicas/devoluciones", label: "Devoluciones" },
              { href: "/politicas/terminos", label: "Términos" },
              { href: "/politicas/privacidad", label: "Privacidad" },
              { href: "/politicas/aviso-legal", label: "Aviso legal" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-gold">
                {l.label}
              </Link>
            ))}
          </nav>
          <p>
            Productos de inspiración. NEXKO PARFUM no es distribuidor oficial de las marcas
            mencionadas; las marcas son propiedad de sus respectivos dueños.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} NEXKO PARFUM. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
