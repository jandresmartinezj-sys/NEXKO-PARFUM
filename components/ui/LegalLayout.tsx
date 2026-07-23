import Link from "next/link";

const LINKS = [
  { href: "/politicas/envios", label: "Envíos" },
  { href: "/politicas/devoluciones", label: "Devoluciones" },
  { href: "/politicas/terminos", label: "Términos" },
  { href: "/politicas/aviso-legal", label: "Aviso legal" },
  { href: "/contacto", label: "Contacto" },
];

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">NEXKO PARFUM</p>
      <h1 className="mt-2 font-display text-4xl text-ink-primary">{title}</h1>
      <p className="mt-2 text-sm text-ink-secondary">Última actualización: {updated}</p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full border border-subtle px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:border-gold hover:text-gold"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="legal-prose mt-10">{children}</div>
    </div>
  );
}
