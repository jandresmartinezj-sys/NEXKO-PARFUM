/**
 * Convierte nuevos.json (extraído de los PDF del proveedor) en entradas de
 * catálogo listas para la app: infiere marca, género, presentación y familia
 * olfativa, y aplica la fórmula de precio (costo x 2 + 20.000).
 *
 * Salida: lib/data/productos-2026.json
 */
import fs from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Nuevo { categoria: string; nombre: string; costo: number }
const nuevos: Nuevo[] = JSON.parse(
  fs.readFileSync(resolve(__dirname, "../nuevos.json"), "utf8"),
);

/* ── Marca por palabras clave ── */
const VENDORS: [RegExp, string][] = [
  [/lattafa|lataffa|latffa|khamrah|yara|asad|fakhar|shaheen|ajwad|mayar|eclaire|haya|emaan|sakina|teriaq|musaman|amethyst|sublime|honor|noble blush|oud for glory|badee|bade/i, "Lattafa"],
  [/armaf|odyssey|club de nuit|club the nuit|mandarin sky|ventana|tres nuit/i, "Armaf"],
  [/orientica/i, "Orientica"],
  [/xerjoff|erba pura|alexandria|naxos|casamorati/i, "Xerjoff"],
  [/al haramain|amber oud|l aventure/i, "Al Haramain"],
  [/paris corner|marshmallow|pleasures/i, "Paris Corner"],
  [/maison alhambra|vulcan|arte del universo|alhambra/i, "Maison Alhambra"],
  [/dior|sauvage|fahrenheit|jadore|j adore|miss dior|homme intense/i, "Dior"],
  [/paco rabanne|one million|1 million|invictus|phantom|lady million|olympea/i, "Paco Rabanne"],
  [/jean paul|le male|scandal|ultramale|le beau|la belle|divine|gaultier/i, "Jean Paul Gaultier"],
  [/carolina herrera|212|good girl|bad boy|\bch\b|very good girl/i, "Carolina Herrera"],
  [/victoria|bombshell|very sexy|tease/i, "Victoria's Secret"],
  [/\btous\b|love me/i, "Tous"],
  [/ariana|cloud|thank u|god is a woman|sweet like candy/i, "Ariana Grande"],
  [/valentino|born in roma|uomo|donna|voce viva/i, "Valentino"],
  [/yves saint laurent|\bysl\b|libre|myslf|opium|mon paris/i, "Yves Saint Laurent"],
  [/armani|stronger|acqua di gio|di gioia|emporio/i, "Emporio Armani"],
  [/versace|eros|dylan|bright crystal|crystal noir/i, "Versace"],
  [/hugo boss|\bboss\b/i, "Hugo Boss"],
  [/lacoste/i, "Lacoste"],
  [/montblanc|mont blanc|legend|explorer/i, "Montblanc"],
  [/creed|aventus|silver mountain/i, "Creed"],
  [/chanel|bleu de|coco|chance|allure/i, "Chanel"],
  [/bharara/i, "Bharara"],
  [/louis vuitton|imagination|ombre nomade|california dream/i, "Louis Vuitton"],
  [/de marly|delina|layton|herod|pegasus|kalan/i, "Parfums de Marly"],
  [/le labo|santal/i, "Le Labo"],
  [/moschino|toy/i, "Moschino"],
  [/narciso/i, "Narciso Rodriguez"],
  [/jimmy choo/i, "Jimmy Choo"],
  [/marc jacobs|daisy|perfect/i, "Marc Jacobs"],
  [/dumont|nitro/i, "Dumont"],
  [/al wataniah|berry on top/i, "Al Wataniah"],
  [/ilmin/i, "Ilmin"],
  [/nautica|voyage/i, "Nautica"],
  [/burberry/i, "Burberry"],
  [/givenchy|gentleman|irresistible/i, "Givenchy"],
  [/prada|paradoxe|luna rossa/i, "Prada"],
  [/tom ford|lost cherry|tobacco vanille|oud wood/i, "Tom Ford"],
  [/rabdan|lattura/i, "Rabdan"],
  [/afnan|9pm|supremacy/i, "Afnan"],
  [/swiss arabian|shaghaf/i, "Swiss Arabian"],
  [/ard al zaafaran|turathi/i, "Ard Al Zaafaran"],
  [/franck olivier|oud touch/i, "Franck Olivier"],
  [/antonio banderas|the icon|king of seduction/i, "Antonio Banderas"],
  [/adidas/i, "Adidas"],
  [/calvin klein|\bck\b|eternity|euphoria/i, "Calvin Klein"],
  [/bvlgari|bulgari|omnia/i, "Bvlgari"],
  [/dolce|gabbana|light blue|the one\b|\bk dolce\b|devotion/i, "Dolce & Gabbana"],
  [/ralph lauren|polo (red|blue|black|sport)/i, "Ralph Lauren"],
  [/tommy (men|girl|hilfiger)/i, "Tommy Hilfiger"],
  [/perry ellis|360/i, "Perry Ellis"],
  [/diesel|only the brave|tatto/i, "Diesel"],
  [/paris hilton|can can|heiress|dazzle/i, "Paris Hilton"],
  [/katy perry|meow|purr/i, "Katy Perry"],
  [/lancome|tresor|idole|la vida es bella|la vie est belle/i, "Lancôme"],
  [/britney|fantasy/i, "Britney Spears"],
  [/issey miyake/i, "Issey Miyake"],
  [/clinique|happy men/i, "Clinique"],
  [/victorinox|swiss army/i, "Victorinox"],
  [/kenzo|flower by/i, "Kenzo"],
  [/\bdkny\b|delicius|delicious/i, "DKNY"],
  [/halloween/i, "Jesús Del Pozo"],
  [/yellow diamond/i, "Versace"],
  [/pure xs|black xs|\bfame\b/i, "Paco Rabanne"],
  [/hugo (red|just|dark|energise)/i, "Hugo Boss"],
  [/starwalker/i, "Montblanc"],
  [/blue seduction/i, "Antonio Banderas"],
  [/miami blossom|escada/i, "Escada"],
  [/angel .?(&|y|and).? demon|ange ou demon/i, "Givenchy"],
  [/jean pascal/i, "Jean Pascal"],
  [/lapidus/i, "Ted Lapidus"],
  [/giles cantuel|gilles cantuel|arsenal/i, "Gilles Cantuel"],
  [/le belle/i, "Jean Paul Gaultier"],
  [/yvest saint laurent/i, "Yves Saint Laurent"],
  [/\bsi\b/i, "Emporio Armani"],
];

const vendorOf = (n: string, cat: string): string => {
  // sin acentos para que "Sí" o "Lancôme" coincidan con los patrones
  const plain = n.normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (const [re, v] of VENDORS) if (re.test(plain)) return v;
  return cat === "arabes" ? "Lattafa" : "Alternativa Premium";
};

/* ── Género ── */
const genderOf = (n: string, cat: string): "dama" | "caballero" | "unisex" => {
  if (/\b(woman|women|dama|her|femme|femenino|mujer|lady|girl|she)\b/i.test(n)) return "dama";
  if (/\b(men|man|homme|hombre|caballero|male|masculino|pour homme|him)\b/i.test(n)) return "caballero";
  if (cat === "masculinos") return "caballero";
  if (cat === "femeninos") return "dama";
  return "unisex";
};

/* ── Presentación ── */
const presentationOf = (n: string): "cofre" | "caja" | "spray" | "set" => {
  if (/body\s*spray/i.test(n)) return "spray";
  if (/\b(set|kit)\b|bolso|splash|mini/i.test(n)) return "set";
  if (/cofre/i.test(n)) return "cofre";
  return "caja";
};

/* ── Familia olfativa ── */
type Fam = "floral" | "oriental" | "amaderado" | "fresco" | "acuatico" | "gourmand" | "especiado";
const familyOf = (n: string, cat: string): Fam => {
  if (/vainilla|vanilla|chocolate|candy|sweet|caramel|cake|dulce|cookie|yum|honey|miel|praline|pistach|banana|berry|cherry|coco|creme|milk|sugar|delicia/i.test(n)) return "gourmand";
  if (/oud|amber|ambar|incienso|oriental|arabian|saffron|azafran|musk|almizcle|dukhan|attar/i.test(n)) return "oriental";
  if (/aqua|acqua|marine|marino|blue|bleu|ocean|water|fresh|breeze|sky|citrus|limon|lemon|bergamot|mint/i.test(n)) return "fresco";
  if (/rose|rosa|floral|jasmin|jazmin|flower|flor|peony|lily|iris|violet|blossom|orquidea|orchid/i.test(n)) return "floral";
  if (/wood|madera|sandal|sandalo|cedro|cedar|vetiver|patchouli|pachuli|leather|cuero/i.test(n)) return "amaderado";
  if (/spice|especia|pepper|pimienta|cinnamon|canela|cardamom|ginger|tobacco|tabaco/i.test(n)) return "especiado";
  return cat === "arabes" ? "oriental" : cat === "femeninos" ? "floral" : "amaderado";
};

/* ── Título en formato normal ── */
const KEEP_UPPER = new Set(["ML","CH","YSL","EDP","EDT","VIP","XL","CD","JPG","UAE"]);
const titleCase = (s: string): string =>
  s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => {
      const up = w.toUpperCase();
      if (KEEP_UPPER.has(up)) return up;
      if (/^\d+$/.test(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ")
    .trim();

const out = nuevos.map((p) => ({
  t: titleCase(p.nombre),
  v: vendorOf(p.nombre, p.categoria),
  c: p.categoria,
  g: genderOf(p.nombre, p.categoria),
  p: presentationOf(p.nombre),
  price: p.costo * 2 + 20000,
  f: familyOf(p.nombre, p.categoria),
}));

const dest = resolve(__dirname, "../lib/data/productos-2026.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2), "utf8");

const by = (k: keyof (typeof out)[number]) => {
  const m: Record<string, number> = {};
  out.forEach((o) => (m[String(o[k])] = (m[String(o[k])] ?? 0) + 1));
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
};

console.log(`✅ ${dest}`);
console.log(`   ${out.length} productos nuevos\n`);
console.log("Marcas:", by("v").slice(0, 12).map(([k, n]) => `${k}(${n})`).join(" "));
console.log("Género:", by("g").map(([k, n]) => `${k}(${n})`).join(" "));
console.log("Presentación:", by("p").map(([k, n]) => `${k}(${n})`).join(" "));
console.log("Familia:", by("f").map(([k, n]) => `${k}(${n})`).join(" "));
console.log("\n--- muestra ---");
out.slice(0, 10).forEach((o) =>
  console.log(`  ${o.t.padEnd(36)} ${o.v.padEnd(20)} ${o.g.padEnd(10)} $${o.price.toLocaleString("es-CO")}`),
);
