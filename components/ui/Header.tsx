"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/hooks/useHydrated";

const NAV = [
  { href: "/tienda", label: "Tienda" },
  { href: "/colecciones/arabes", label: "Árabes" },
  { href: "/colecciones/masculinos", label: "Masculinos" },
  { href: "/colecciones/femeninos", label: "Femeninos" },
  { href: "/colecciones/body-sprays", label: "Body Sprays" },
  { href: "/colecciones/sets-regalo", label: "Sets" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="NEXKO PARFUM inicio">
      <Image
        src="/logo-nexko-mark.png"
        alt=""
        width={132}
        height={160}
        priority
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-10"
      />
      <span className="font-display text-xl tracking-[0.25em] gradient-gold">NEXKO</span>
    </Link>
  );
}

function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/tienda?q=${encodeURIComponent(q.trim())}` : "/tienda");
      }}
      className="relative hidden xl:block"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="Buscar fragancia…"
        className="w-48 rounded-full border border-subtle bg-surface/50 py-1.5 pl-9 pr-3 text-sm text-ink-primary outline-none placeholder:text-ink-secondary focus:w-56 focus:border-gold"
      />
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-ink-secondary"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4-4" />
      </svg>
    </form>
  );
}

function WishlistButton() {
  const count = useWishlist((s) => s.items.length);
  const hydrated = useHydrated();
  return (
    <Link
      href="/lista"
      className="relative rounded-full p-2 text-ink-primary transition-colors hover:text-gold"
      aria-label="Lista de favoritos"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.6">
        <path d="M12 21s-7.5-4.6-10-9.2C.5 8.6 2 5 5.3 5c2 0 3.3 1.1 4.2 2.3.4.5.9.5 1.3 0C11.7 6.1 13 5 15 5c3.3 0 4.8 3.6 3.3 6.8C19.5 16.4 12 21 12 21z" />
      </svg>
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-scent px-1 text-[11px] font-bold text-void">
          {count}
        </span>
      )}
    </Link>
  );
}

function CartButton() {
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.cart?.totalQuantity ?? 0);
  const hydrated = useHydrated();
  return (
    <button
      onClick={open}
      className="relative rounded-full p-2 text-ink-primary transition-colors hover:text-gold"
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-gold" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm tracking-wide text-ink-secondary transition-colors hover:text-ink-primary"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <SearchBox />
          <WishlistButton />
          <CartButton />
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-ink-primary lg:hidden"
            aria-label="Abrir menú"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" strokeWidth="1.6">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Logo />
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2 text-ink-primary"
                aria-label="Cerrar menú"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-current" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-6">
              {[{ href: "/", label: "Inicio" }, ...NAV].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl text-ink-primary transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
