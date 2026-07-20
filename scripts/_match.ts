import fs from "node:fs";
import { CATALOG } from "../lib/data/catalog";

interface Sup {
  title: string;
  handle: string;
  images: string[];
}
const supplier: Sup[] = JSON.parse(fs.readFileSync("supplier.json", "utf8"));

// Ruido: unidades y palabras vacías. Los números de marca (212) SÍ cuentan.
const STOP = new Set([
  "ml","original","de","la","el","los","las","y","the","edp","edt","eau",
  "perfume","para","por","con","100","80","90","120","60","30","50","200",
]);

const norm = (s: string): string[] =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/lataffa|latffa|lattaffa/g, "lattafa")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));

const key = (s: string) => [...new Set(norm(s))].sort().join(" ");

// Tipo de envase: debe coincidir o no hay match.
const kind = (s: string): string => {
  const t = s.toLowerCase();
  if (/body\s*spray/.test(t)) return "spray";
  if (/^set|^kit|bolso|splash|crema|mini/.test(t)) return "set";
  return "perfume";
};

/**
 * El proveedor sube 2 versiones por producto: el archivo terminado en "1" es
 * frasco + caja + logo de marca (la que queremos) y el "2" es frasco suelto.
 * El orden del array no es fiable, así que elegimos por nombre de archivo.
 */
const preferBoxed = (urls: string[]): string => {
  // "ARCHIVO1.jpg" o "ARCHIVO1_1.jpg" -> base "ARCHIVO1". Se quita el sufijo
  // "_n" que Shopify añade a nombres repetidos ANTES de mirar el dígito final,
  // para no confundirse con marcas que llevan números (p. ej. 212VIPROSE2_1).
  const baseOf = (u: string) =>
    (u.split("/").pop() ?? "")
      .split("?")[0]
      .replace(/\.(jpg|jpeg|png|webp)$/i, "")
      .replace(/_\d+$/, "");
  return urls.find((u) => baseOf(u).endsWith("1")) ?? urls[0];
};

const supIdx = supplier.map((s) => ({
  ...s,
  k: key(s.title),
  kind: kind(s.title),
  img: s.images.length ? preferBoxed(s.images) : "",
}));

const exact: { handle: string; mine: string; their: string; img: string }[] = [];
const review: { handle: string; mine: string; their: string; img: string; score: number }[] = [];
const none: string[] = [];

const dice = (a: string[], b: string[]) => {
  const A = new Set(a), B = new Set(b);
  let i = 0;
  for (const t of A) if (B.has(t)) i++;
  return (2 * i) / (A.size + B.size);
};

for (const item of CATALOG) {
  const mk = key(item.title);
  const mkind = kind(item.title);
  const mt = norm(item.title);

  const hit = supIdx.find((s) => s.k === mk && s.kind === mkind);
  if (hit && hit.images.length) {
    exact.push({ handle: item.handle, mine: item.title, their: hit.title, img: hit.img });
    continue;
  }

  let best = { score: 0, s: null as (typeof supIdx)[number] | null };
  for (const s of supIdx) {
    if (s.kind !== mkind) continue;
    const sc = dice(mt, norm(s.title));
    if (sc > best.score) best = { score: sc, s };
  }
  if (best.s && best.score >= 0.55 && best.s.images.length) {
    review.push({
      handle: item.handle,
      mine: item.title,
      their: best.s.title,
      img: best.s.img,
      score: best.score,
    });
  } else {
    none.push(item.title);
  }
}

console.log(`\n===== COINCIDENCIA EXACTA (${exact.length}) — seguras =====`);
exact.forEach((r) => console.log(`  ${r.mine.slice(0, 40).padEnd(40)} <= ${r.their}`));

console.log(`\n===== PARA REVISAR (${review.length}) — mismo tipo, nombre parecido =====`);
review
  .sort((a, b) => b.score - a.score)
  .forEach((r) => console.log(`  ${r.score.toFixed(2)} ${r.mine.slice(0, 38).padEnd(38)} <= ${r.their}`));

console.log(`\n===== SIN FOTO (${none.length}) =====`);

fs.writeFileSync("match.json", JSON.stringify({ exact, review, none }, null, 2), "utf8");
