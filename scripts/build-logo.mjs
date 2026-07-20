/**
 * Genera los assets del logo NEXKO a partir de /logo-src.png.
 *
 *   public/logo-nexko.png       lockup completo (monograma + NEXKO + PARFUM)  → footer
 *   public/logo-nexko-mark.png  solo el monograma recortado                   → header
 *   app/icon.png                favicon (monograma, 512px)
 *
 * Quita el fondo blanco por relleno de inundación desde los bordes, PRESERVANDO
 * el color dorado original (a diferencia de normalize-logos.mjs, que pinta blanco).
 *
 * Uso: npm run logo
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "logo-src.png");
const PUB = path.join(process.cwd(), "public");
const APP = path.join(process.cwd(), "app");
const TOL = 40; // tolerancia del fondo (blanco)
const FEATHER = 1.9; // suaviza el borde del recorte

if (!fs.existsSync(SRC)) {
  console.error("Falta logo-src.png en la raíz del proyecto.");
  process.exit(1);
}

/** Quita el fondo conectado a los bordes, conservando los colores. */
async function cutout(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const { width, height, channels } = info;
  const N = width * height;

  // Color de fondo = promedio del marco exterior.
  let br = 0,
    bg = 0,
    bb = 0,
    n = 0;
  const s = (x, y) => {
    const i = (y * width + x) * channels;
    br += data[i];
    bg += data[i + 1];
    bb += data[i + 2];
    n++;
  };
  for (let x = 0; x < width; x++) {
    s(x, 0);
    s(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    s(0, y);
    s(width - 1, y);
  }
  br /= n;
  bg /= n;
  bb /= n;

  const dist = (i) =>
    Math.max(
      Math.abs(data[i] - br),
      Math.abs(data[i + 1] - bg),
      Math.abs(data[i + 2] - bb),
    );

  // Inundación desde los bordes.
  const isBg = new Uint8Array(N);
  const stack = [];
  const push = (x, y) => {
    const p = y * width + x;
    if (!isBg[p] && dist(p * channels) <= TOL) {
      isBg[p] = 1;
      stack.push(p);
    }
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p / width) | 0;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }

  const out = Buffer.alloc(N * 4);
  for (let p = 0; p < N; p++) {
    const i = p * channels;
    const o = p * 4;
    out[o] = data[i];
    out[o + 1] = data[i + 1];
    out[o + 2] = data[i + 2];
    if (isBg[p]) {
      out[o + 3] = 0;
    } else {
      // Borde suave: casi-fondo => semitransparente
      const d = dist(i);
      out[o + 3] = Math.min(255, Math.round(d * FEATHER));
    }
  }
  return { out, width, height };
}

const { out, width, height } = await cutout(SRC);

// Imagen completa con fondo ya recortado (una sola pasada).
const fullBuf = await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toBuffer();

// 1) Lockup completo, recortado a su contenido
await sharp(fullBuf).trim({ threshold: 1 }).png().toFile(path.join(PUB, "logo-nexko.png"));

// 2) Monograma: parte superior del lienzo (el emblema); extract y trim en pasadas separadas
const markBuf = await sharp(fullBuf)
  .extract({ left: 0, top: 0, width, height: Math.round(height * 0.68) })
  .png()
  .toBuffer();
await sharp(markBuf)
  .trim({ threshold: 1 })
  .png()
  .toFile(path.join(PUB, "logo-nexko-mark.png"));

// 3) Favicon cuadrado desde el monograma
await sharp(path.join(PUB, "logo-nexko-mark.png"))
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(APP, "icon.png"));

for (const f of ["logo-nexko.png", "logo-nexko-mark.png"]) {
  const m = await sharp(path.join(PUB, f)).metadata();
  console.log(`✓ public/${f.padEnd(22)} ${m.width}x${m.height}`);
}
const mi = await sharp(path.join(APP, "icon.png")).metadata();
console.log(`✓ app/icon.png             ${mi.width}x${mi.height}  (favicon)`);
