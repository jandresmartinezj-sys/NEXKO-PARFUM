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
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.042-.001-.001a9.866 9.866 0 003.001 1.336zm5.776-7.726c-.135-.225-.495-.36-1.035-.63-.54-.27-3.195-1.575-3.69-1.755-.495-.18-.855-.27-1.215.27-.36.54-1.394 1.755-1.71 2.115-.315.36-.63.405-1.17.135-.54-.27-2.28-.84-4.342-2.68-1.605-1.43-2.688-3.197-3.003-3.737-.315-.54-.034-.832.237-1.101.243-.242.54-.63.81-.945.27-.315.36-.54.54-.9.18-.36.09-.675-.045-.945-.135-.27-1.215-2.925-1.665-4.005-.435-1.051-.881-.909-1.215-.925l-1.035-.018c-.36 0-.945.135-1.439.675-.495.54-1.889 1.845-1.889 4.5s1.934 5.22 2.204 5.58c.27.36 3.806 5.814 9.224 8.151 1.288.556 2.294.888 3.077 1.137 1.292.41 2.469.352 3.4.214.519-.077 1.585-.648 1.809-1.273.225-.624.225-1.16.158-1.272z" />
      </svg>
    </motion.a>
  );
}
