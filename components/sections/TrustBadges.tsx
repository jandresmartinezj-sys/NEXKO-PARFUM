"use client";

import { motion } from "framer-motion";

/* Iconos dorados de línea, nítidos y premium (sin emojis). */
const S = {
  className: "h-8 w-8",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const BADGES = [
  {
    title: "Ofertas exclusivas",
    text: "Siempre tenemos promociones activas en perfumería.",
    icon: (
      // Etiqueta de precio
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M20.6 12.6 12.6 20.6a1.5 1.5 0 0 1-2.1 0L3 13V3h10l7.6 7.5a1.5 1.5 0 0 1 0 2.1Z" />
        <circle cx="7.5" cy="7.5" r="1.3" />
      </svg>
    ),
  },
  {
    title: "Compras 100% seguras",
    text: "Tus datos y tus pagos siempre protegidos.",
    icon: (
      // Escudo con check
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Envíos a toda Colombia",
    text: "Recibe tu pedido estés donde estés.",
    icon: (
      // Camión de envío
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.7" />
        <circle cx="17.5" cy="18" r="1.7" />
      </svg>
    ),
  },
  {
    title: "Métodos de pago",
    text: "Transferencia, contraentrega y más opciones.",
    icon: (
      // Tarjeta
      <svg viewBox="0 0 24 24" {...S}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
        <path d="M2.5 9.5h19M6 14.5h4" />
      </svg>
    ),
  },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
      {BADGES.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="flex flex-col items-center gap-1.5 text-center"
        >
          <span className="text-gold">{b.icon}</span>
          <h4 className="mt-0.5 font-serif text-base text-ink-primary">{b.title}</h4>
          <p className="text-xs leading-snug text-ink-secondary">{b.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
