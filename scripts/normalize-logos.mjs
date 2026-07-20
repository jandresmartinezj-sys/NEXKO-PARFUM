/**
 * Normaliza los logos de marca.
 *
 *   ENTRADA : /brand-logos-src/<slug>.(png|jpg|webp|svg)   ← originales, no se tocan
 *   SALIDA  : /public/brands/<slug>.png                    ← blanco + transparente
 *
 * Es idempotente: siempre lee de la carpeta fuente, nunca de su propia salida.
 *
 *  1. Detecta el color de fondo (esquinas) y lo vuelve transparente.
 *  2. Convierte el resto a BLANCO puro conservando el antialiasing en el alfa,
 *     de modo que los logos de color (rosa, rojo, amarillo) queden como los negros.
 *  3. Recorta el margen sobrante para que todos alineen.
 *
 * Uso: npm run logos
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "brand-logos-src");
const OUT = path.join(process.cwd(), "public", "brands");
const EXTS = [".png", ".jpg", ".jpeg", ".webp", ".svg"];
const GAIN = 1.7; // realza bordes suavizados
const NOISE = 12; // ignora ruido de compresión
const TOL = 62; // tolerancia del relleno por inundación (fondos texturados)

fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readdirSync(SRC)
  .filter((f) => EXTS.includes(path.extname(f).toLowerCase()));

console.log(`Normalizando ${files.length} logos…\n`);

for (const file of files) {
  const slug = path.basename(file, path.extname(file));
  try {
    const { data, info } = await sharp(path.join(SRC, file), { density: 300 })
      .resize({ height: 200, fit: "inside", withoutEnlargement: false })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    const N = width * height;

    // ── Color de fondo: promedio del marco exterior (píxeles opacos) ──
    let br = 0,
      bg = 0,
      bb = 0,
      n = 0;
    const sampleBorder = (x, y) => {
      const i = (y * width + x) * channels;
      if (data[i + 3] > 128) {
        br += data[i];
        bg += data[i + 1];
        bb += data[i + 2];
        n++;
      }
    };
    for (let x = 0; x < width; x++) {
      sampleBorder(x, 0);
      sampleBorder(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      sampleBorder(0, y);
      sampleBorder(width - 1, y);
    }

    const alreadyTransparent = n === 0;
    if (!alreadyTransparent) {
      br /= n;
      bg /= n;
      bb /= n;
    }

    const dist = (i) =>
      Math.max(
        Math.abs(data[i] - br),
        Math.abs(data[i + 1] - bg),
        Math.abs(data[i + 2] - bb),
      );

    // ── Relleno por inundación desde los bordes: marca el fondo conectado ──
    const isBg = new Uint8Array(N);
    if (!alreadyTransparent) {
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
    }

    const out = Buffer.alloc(N * 4);
    let opaque = 0;
    for (let p = 0; p < N; p++) {
      const i = p * channels;
      const srcA = data[i + 3];
      let a;
      if (alreadyTransparent) {
        a = srcA; // el archivo ya traía transparencia
      } else if (isBg[p]) {
        a = 0; // fondo conectado al borde
      } else {
        // Antialiasing: los píxeles casi iguales al fondo quedan semitransparentes
        let d = dist(i);
        if (d < NOISE) d = 0;
        a = Math.min(255, Math.round(d * GAIN));
        a = Math.round((a * srcA) / 255);
      }
      const o = p * 4;
      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
      out[o + 3] = a;
      if (a > 20) opaque++;
    }

    const pct = (opaque / (width * height)) * 100;
    await sharp(out, { raw: { width, height, channels: 4 } })
      .trim({ threshold: 1 })
      .png()
      .toFile(path.join(OUT, `${slug}.png`));

    const flag = pct < 1 ? "  ⚠ casi vacío" : pct > 85 ? "  ⚠ casi todo opaco" : "";
    console.log(
      `✓ ${slug.padEnd(22)} fondo rgb(${br < 0 ? "alfa" : `${br | 0},${bg | 0},${bb | 0}`})  logo ${pct.toFixed(1)}%${flag}`,
    );
  } catch (e) {
    console.log(`✗ ${slug.padEnd(22)} ERROR: ${e.message}`);
  }
}

console.log("\nListo → public/brands/*.png (blanco, fondo transparente)");
