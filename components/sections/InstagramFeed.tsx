import Script from "next/script";
import { ImageOrGradient } from "@/components/ui/ImageOrGradient";

/**
 * Sección "Síguenos en Instagram" (estilo Perfumarte).
 *
 * Dos modos:
 *  1) Feed automático con LightWidget — si defines NEXT_PUBLIC_LIGHTWIDGET_ID
 *     (el hash del iframe que da LightWidget), muestra tus últimas publicaciones
 *     y se actualiza solo. Se puede fijar aquí en LIGHTWIDGET_ID_FALLBACK.
 *  2) Respaldo manual — 4 recuadros con foto en /public/instagram/post-<n>
 *     (o degradado) que enlazan a tu perfil.
 *
 * Usuario de Instagram: NEXT_PUBLIC_INSTAGRAM_USER (por defecto nexko_parfum).
 */
const IG_USER = process.env.NEXT_PUBLIC_INSTAGRAM_USER ?? "nexko_parfum";
const PROFILE = `https://instagram.com/${IG_USER}`;

// Pega aquí el ID del widget de LightWidget (o configúralo en Vercel como
// NEXT_PUBLIC_LIGHTWIDGET_ID). Ejemplo de ID: "abcdef1234567890abcdef1234567890".
const LIGHTWIDGET_ID_FALLBACK = "";
const LIGHTWIDGET_ID = process.env.NEXT_PUBLIC_LIGHTWIDGET_ID ?? LIGHTWIDGET_ID_FALLBACK;

const TILES = [
  { slug: "post-1", gradient: "from-[#2a1a0c] to-[#4a2d12]" },
  { slug: "post-2", gradient: "from-[#151a24] to-[#2a3550]" },
  { slug: "post-3", gradient: "from-[#241a24] to-[#402a40]" },
  { slug: "post-4", gradient: "from-[#0e1a17] to-[#1d3029]" },
];

export function InstagramFeed() {
  // Modo 1: feed automático de LightWidget
  if (LIGHTWIDGET_ID) {
    return (
      <div>
        <iframe
          title={`Instagram de @${IG_USER}`}
          src={`https://lightwidget.com/widgets/${LIGHTWIDGET_ID}.html`}
          scrolling="no"
          className="lightwidget-widget"
          style={{ width: "100%", border: 0, overflow: "hidden" }}
        />
        <Script
          src="https://cdn.lightwidget.com/widgets/lightwidget.js"
          strategy="afterInteractive"
        />
        <div className="mt-6 text-center">
          <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
            Ver en Instagram
          </a>
        </div>
      </div>
    );
  }

  // Modo 2: respaldo manual (fotos o degradado)
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TILES.map((t) => (
          <a
            key={t.slug}
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver a @${IG_USER} en Instagram`}
            className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl"
          >
            <ImageOrGradient base={`/instagram/${t.slug}`} alt="" gradient={t.gradient} />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/35" />
            <svg
              viewBox="0 0 24 24"
              className="relative h-8 w-8 fill-white opacity-70 drop-shadow transition-all group-hover:scale-110 group-hover:opacity-100"
            >
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.85a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" />
            </svg>
          </a>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
          Ver en Instagram
        </a>
      </div>
    </div>
  );
}
