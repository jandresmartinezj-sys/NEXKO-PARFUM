"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { SearchOverlay } from "./SearchOverlay";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const NAV: NavItem[] = [
  {
    href: "/tienda",
    label: "Perfumería",
    children: [
      { href: "/tienda?cat=femeninos", label: "Perfumes para ellas" },
      { href: "/tienda?cat=masculinos", label: "Perfumes para ellos" },
      { href: "/tienda?cat=unisex", label: "Perfumes unisex" },
      { href: "/tienda?cat=sets-regalo", label: "Set de perfumes" },
    ],
  },
  { href: "/tienda?cat=arabes", label: "Perfumería árabe" },
  { href: "/tienda?cat=promociones", label: "Promociones" },
  { href: "/tienda?cat=tester", label: "Perfumes tester" },
  { href: "/armar-kit", label: "Arma tu kit" },
  { href: "/contacto", label: "Contacto" },
];

function WishlistButton({ light = false }: { light?: boolean }) {
  const count = useWishlist((s) => s.items.length);
  const hydrated = useHydrated();
  return (
    <Link
      href="/lista"
      className={`relative rounded-full p-2 transition-colors hover:text-gold ${light ? "text-white" : "text-ink-primary"}`}
      aria-label="Lista de favoritos"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.6">
        <path d="M12 21s-7.5-4.6-10-9.2C.5 8.6 2 5 5.3 5c2 0 3.3 1.1 4.2 2.3.4.5.9.5 1.3 0C11.7 6.1 13 5 15 5c3.3 0 4.8 3.6 3.3 6.8C19.5 16.4 12 21 12 21z" />
      </svg>
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-scent px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

function CartButton({ light = false }: { light?: boolean }) {
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.cart?.totalQuantity ?? 0);
  const hydrated = useHydrated();
  return (
    <button
      onClick={open}
      className={`relative rounded-full p-2 transition-colors hover:text-gold ${light ? "text-white" : "text-ink-primary"}`}
      aria-label="Abrir carrito"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.6">
        <path d="M6 7h12l-1 13H7L6 7z" />
        <path d="M9 7a3 3 0 016 0" />
      </svg>
      <AnimatePresence>
        {hydrated && count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-gradient px-1 text-[11px] font-bold text-void"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Barra de anuncio */}
      <div className="bg-gold-gradient text-center text-[11px] font-medium uppercase tracking-[0.18em] text-void sm:text-xs">
        <p className="py-1.5">Envío a toda Colombia · Envío gratis desde $250.000</p>
      </div>

      {/* Barra del logo (centrado) */}
      <div className="border-b border-subtle bg-cream">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Menú móvil (izq) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-ink-primary lg:hidden"
            aria-label="Abrir menú"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" strokeWidth="1.6">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          {/* Espaciador izq (desktop) para centrar el logo */}
          <div className="hidden flex-1 lg:block" />

          {/* Logo centrado */}
          <Link href="/" className="flex items-center justify-center" aria-label="NEXKO PARFUM inicio">
            <Image
              src="/logo-nexko.png"
              alt="NEXKO PARFUM"
              width={463}
              height={516}
              priority
              className="h-14 w-auto sm:h-16"
            />
          </Link>

          {/* Acciones (der) */}
          <div className="flex flex-1 items-center justify-end gap-1">
            <SearchOverlay />
            <div className="hidden sm:block">
              <WishlistButton />
            </div>
            <Link
              href="/mi-cuenta"
              className="hidden rounded-full p-2 text-ink-primary transition-colors hover:text-gold sm:block"
              aria-label="Mi cuenta"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </Link>
            <CartButton />
          </div>
        </div>
      </div>

      {/* Barra de navegación (oscura, centrada) — solo desktop */}
      <nav className="hidden bg-dark lg:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6">
          {NAV.map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/90 transition-colors hover:text-gold"
              >
                {item.label}
                {item.children && (
                  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current opacity-70">
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <ul className="invisible absolute left-1/2 top-full z-50 min-w-56 -translate-x-1/2 rounded-b-xl border border-subtle bg-cream py-2 opacity-0 shadow-card transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="block px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-primary transition-colors hover:bg-surface hover:text-gold"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-dark lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <span className="font-display text-lg tracking-[0.2em] text-white">NEXKO</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2 text-white"
                aria-label="Cerrar menú"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-current" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-1">
                {[{ href: "/", label: "Inicio" }, ...NAV].map((item) => (
                  <li key={item.label} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3.5 text-base font-medium uppercase tracking-wide text-white/90 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="pb-3 pl-4">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setMenuOpen(false)}
                              className="block py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/60 hover:text-gold"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
