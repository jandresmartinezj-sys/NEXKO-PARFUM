export function EmptyState({
  title = "Catálogo en camino",
  message = "Estamos cargando nuestras fragancias. Vuelve muy pronto para descubrir tu próximo aroma favorito.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-subtle bg-surface/40 px-6 py-20 text-center">
      <span className="text-5xl">🪻</span>
      <h3 className="mt-4 font-serif text-2xl text-ink-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-ink-secondary">{message}</p>
    </div>
  );
}
