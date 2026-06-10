"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SCENT_BY_HANDLE, FAMILY_LABELS, type ScentFamily } from "@/lib/data/catalog";

type SortKey = "bestseller" | "precio-asc" | "precio-desc" | "nombre";

interface Meta {
  category: string;
  gender: string;
  family: ScentFamily | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  arabes: "Árabes",
  masculinos: "Masculinos",
  femeninos: "Femeninos",
  "body-sprays": "Body Sprays",
  "sets-regalo": "Sets & Kits",
};

function metaFor(p: Product): Meta {
  const local = SCENT_BY_HANDLE[p.handle];
  if (local) return { category: local.category, gender: local.gender, family: local.family };
  const tags = p.tags.map((t) => t.toLowerCase());
  let category = "arabes";
  if (tags.includes("set")) category = "sets-regalo";
  else if (tags.includes("body-spray")) category = "body-sprays";
  else if (tags.includes("masculino")) category = "masculinos";
  else if (tags.includes("femenino")) category = "femeninos";
  const gender = tags.includes("caballero")
    ? "caballero"
    : tags.includes("dama")
      ? "dama"
      : "unisex";
  return { category, gender, family: null };
}

const priceOf = (p: Product) =>
  parseFloat(p.variants[0]?.price.amount ?? p.priceRange.minVariantPrice.amount);

export function CatalogClient({
  products,
  initialSearch = "",
}: {
  products: Product[];
  initialSearch?: string;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<string>("todas");
  const [gender, setGender] = useState<string>("todos");
  const [brands, setBrands] = useState<string[]>([]);
  const [families, setFamilies] = useState<ScentFamily[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sort, setSort] = useState<SortKey>("bestseller");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const allBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.vendor).filter(Boolean))).sort(),
    [products],
  );
  const priceBounds = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    const prices = products.map(priceOf);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const effectiveMax = maxPrice || priceBounds.max;

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const meta = metaFor(p);
      if (category !== "todas" && meta.category !== category) return false;
      if (gender !== "todos" && meta.gender !== gender && meta.gender !== "unisex") return false;
      if (brands.length && !brands.includes(p.vendor)) return false;
      if (families.length && (!meta.family || !families.includes(meta.family))) return false;
      if (priceOf(p) > effectiveMax) return false;
      if (search && !`${p.title} ${p.vendor}`.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });

    switch (sort) {
      case "precio-asc":
        result.sort((a, b) => priceOf(a) - priceOf(b));
        break;
      case "precio-desc":
        result.sort((a, b) => priceOf(b) - priceOf(a));
        break;
      case "nombre":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort(
          (a, b) =>
            Number(b.tags.includes("bestseller")) - Number(a.tags.includes("bestseller")),
        );
    }
    return result;
  }, [products, category, gender, brands, families, effectiveMax, search, sort]);

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => {
    setCategory("todas");
    setGender("todos");
    setBrands([]);
    setFamilies([]);
    setMaxPrice(0);
    setSearch("");
  };

  const Panel = (
    <div className="space-y-7">
      <FilterGroup label="Categoría">
        <div className="flex flex-wrap gap-2">
          {["todas", ...Object.keys(CATEGORY_LABELS)].map((c) => (
            <Pill key={c} active={category === c} onClick={() => setCategory(c)}>
              {c === "todas" ? "Todas" : CATEGORY_LABELS[c]}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Género">
        <div className="flex flex-wrap gap-2">
          {[
            ["todos", "Todos"],
            ["dama", "Dama"],
            ["caballero", "Caballero"],
            ["unisex", "Unisex"],
          ].map(([v, l]) => (
            <Pill key={v} active={gender === v} onClick={() => setGender(v)}>
              {l}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      {allBrands.length > 0 && (
        <FilterGroup label="Marca">
          <div className="flex flex-wrap gap-2">
            {allBrands.map((b) => (
              <Pill key={b} active={brands.includes(b)} onClick={() => toggle(brands, b, setBrands)}>
                {b}
              </Pill>
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup label="Familia olfativa">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FAMILY_LABELS) as ScentFamily[]).map((f) => (
            <Pill
              key={f}
              active={families.includes(f)}
              onClick={() => toggle(families, f, setFamilies)}
            >
              {FAMILY_LABELS[f]}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      {priceBounds.max > priceBounds.min && (
        <FilterGroup label={`Precio máx: $${effectiveMax.toLocaleString("es-CO")}`}>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={1000}
            value={effectiveMax}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[--gold-primary]"
          />
        </FilterGroup>
      )}

      <button onClick={clearAll} className="text-sm text-ink-secondary hover:text-gold">
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Catálogo</p>
        <h1 className="font-display text-4xl text-ink-primary">Nuestra Tienda</h1>
      </div>

      {/* Barra superior */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Buscar por nombre o marca…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-full border border-subtle bg-surface/60 px-5 py-3 text-sm text-ink-primary outline-none placeholder:text-ink-secondary focus:border-gold"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-full border border-subtle bg-surface/60 px-4 py-3 text-sm text-ink-primary outline-none focus:border-gold"
        >
          <option value="bestseller">Más vendidos</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="nombre">Nombre A-Z</option>
        </select>
        <button
          onClick={() => setDrawerOpen(true)}
          className="btn-outline-gold py-3 lg:hidden"
        >
          Filtros
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filtros desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-subtle bg-surface/40 p-6">
            {Panel}
          </div>
        </aside>

        {/* Resultados */}
        <div className="flex-1">
          <p className="mb-4 text-sm text-ink-secondary">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </p>
          <ProductGrid products={filtered} />
        </div>
      </div>

      {/* Drawer filtros mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[70] bg-black/60 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed left-0 top-0 z-[80] h-full w-80 max-w-[85vw] overflow-y-auto bg-dark p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-ink-primary">Filtros</h2>
                <button onClick={() => setDrawerOpen(false)} aria-label="Cerrar">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" strokeWidth="1.6">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              {Panel}
              <button onClick={() => setDrawerOpen(false)} className="btn-gold mt-8 w-full">
                Ver {filtered.length} productos
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-secondary">
        {label}
      </h4>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-subtle text-ink-secondary hover:border-gold/60 hover:text-ink-primary"
      }`}
    >
      {children}
    </button>
  );
}
