import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl gradient-gold">404</p>
      <h1 className="mt-4 font-serif text-2xl text-ink-primary">
        Esta fragancia se evaporó
      </h1>
      <p className="mt-2 max-w-md text-ink-secondary">
        La página que buscas no existe o fue movida. Pero tenemos cientos de aromas
        esperándote.
      </p>
      <Link href="/tienda" className="btn-gold mt-8">
        Ir a la tienda
      </Link>
    </div>
  );
}
