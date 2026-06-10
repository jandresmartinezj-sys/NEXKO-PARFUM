"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {eyebrow && (
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl text-ink-primary">{title}</h2>
      {subtitle && (
        <p
          className={`mt-3 text-ink-secondary ${align === "center" ? "mx-auto max-w-2xl" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
