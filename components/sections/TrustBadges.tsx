"use client";

import { motion } from "framer-motion";

const BADGES = [
  {
    icon: "🔥",
    title: "Ofertas exclusivas",
    text: "Siempre tenemos promociones activas en perfumería.",
  },
  {
    icon: "🔒",
    title: "Compras 100% seguras",
    text: "Tus datos y tus pagos siempre protegidos.",
  },
  {
    icon: "🚚",
    title: "Envíos a toda Colombia",
    text: "Recibe tu pedido estés donde estés.",
  },
  {
    icon: "💳",
    title: "Métodos de pago",
    text: "Transferencia, contraentrega y más opciones.",
  },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
      {BADGES.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <span className="emoji-gold text-4xl">{b.icon}</span>
          <h4 className="font-serif text-base text-ink-primary">{b.title}</h4>
          <p className="text-xs text-ink-secondary">{b.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
