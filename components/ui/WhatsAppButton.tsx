"use client";

import { motion } from "framer-motion";

const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";
const MESSAGE = encodeURIComponent(
  "¡Hola! Vi su catálogo en NEXKO PARFUM y quiero información 🌟",
);

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      {/* Logo oficial de WhatsApp (glifo del teléfono dentro del bocadillo) */}
      <svg viewBox="0 0 32 32" className="relative h-8 w-8 fill-white" aria-hidden="true">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.048 9.38L1.052 31.32l6.144-1.964A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.312 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.386-.394.836-.574 1.24-.574.13 0 .248.006.354.012.386.016.58.038.834.646.316.762 1.086 2.658 1.178 2.852.094.194.188.456.056.766-.124.32-.232.462-.426.688-.194.226-.378.4-.572.642-.178.21-.378.436-.154.826.224.382.996 1.64 2.132 2.652 1.466 1.306 2.654 1.722 3.084 1.902.32.132.702.1.936-.148.298-.32.664-.85 1.036-1.372.264-.374.598-.42.95-.288.358.124 2.246 1.058 2.636 1.252.39.194.648.288.742.45.092.164.092.936-.294 2.026Z" />
      </svg>
    </motion.a>
  );
}
