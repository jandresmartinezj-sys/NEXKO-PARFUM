"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatCOP } from "@/lib/utils/formatPrice";

type Hit = { handle: string; title: string; vendor: string; image: string | null; price: string };

const POPULAR = ["Khamrah", "Yara", "Good Girl", "Odyssey", "Bharara", "Bad Boy"];

export function SearchOverlay() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Bloquea scroll y enfoca al abrir
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Búsqueda con debounce
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setHits([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ctrl.signal });
        const data = await res.json();
        setHits(data.hits ?? []);
      } catch {
        /* abortado o error */
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [q]);

  const close = () => {
    setOpen(false);
    setQ("");
    setHits([]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/tienda?q=${encodeURIComponent(term)}` : "/tienda");
    close();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buscar"
        className="rounded-full p-2 text-ink-primary transition-colors hover:text-gold"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.7">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-void/80 backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-20 w-full max-w-2xl px-4"
            >
              <form onSubmit={submit} className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-ink-secondary"
                  strokeWidth="1.7"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4-4" />
                </svg>
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  type="search"
                  placeholder="Busca por nombre o marca… (ej. Khamrah, Good Girl)"
                  className="w-full rounded-full border border-gold/40 bg-dark py-4 pl-14 pr-14 text-ink-primary shadow-gold outline-none placeholder:text-ink-secondary focus:border-gold"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Cerrar"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-secondary hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" strokeWidth="1.7">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </form>

              <div className="mt-3 overflow-hidden rounded-2xl border border-subtle bg-dark shadow-2xl">
                {q.trim().length < 2 ? (
                  <div className="p-5">
                    <p className="mb-3 text-xs uppercase tracking-widest text-ink-secondary">
                      Búsquedas populares
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR.map((p) => (
                        <button
                          key={p}
                          onClick={() => setQ(p)}
                          className="rounded-full border border-subtle px-3 py-1.5 text-sm text-ink-secondary transition-colors hover:border-gold hover:text-gold"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : loading && hits.length === 0 ? (
                  <div className="p-6 text-center text-sm text-ink-secondary">Buscando…</div>
                ) : hits.length === 0 ? (
                  <div className="p-6 text-center text-sm text-ink-secondary">
                    Sin resultados para “{q.trim()}”. Prueba otro nombre o marca.
                  </div>
                ) : (
                  <>
                    <ul className="max-h-[60vh] divide-y divide-subtle overflow-y-auto">
                      {hits.map((h) => (
                        <li key={h.handle}>
                          <Link
                            href={`/tienda/${h.handle}`}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/60"
                          >
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-tile">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              {h.image && (
                                <img
                                  src={h.image}
                                  alt=""
                                  className="h-full w-full object-contain p-1"
                                  loading="lazy"
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm text-ink-primary">{h.title}</p>
                              <p className="text-xs text-ink-secondary">{h.vendor}</p>
                            </div>
                            <span className="shrink-0 text-sm font-semibold text-gold">
                              {formatCOP(h.price)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={submit}
                      className="block w-full border-t border-subtle px-4 py-3 text-center text-sm font-medium text-gold transition-colors hover:bg-surface/60"
                    >
                      Ver todos los resultados para “{q.trim()}”
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
