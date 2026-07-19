/**
 * Siluetas de frascos de perfume en tono dorado (como el logotipo NEXKO),
 * sutiles y elegantes, de fondo en el hero. Formas inspiradas en frascos reales
 * (atomizador tipo Yara, redondo tipo Fakhar, tapón acampanado tipo Amouage,
 * tapón hexagonal tipo Al Qiam, cubo tipo Miss Dior/Sauvage).
 * SVG + CSS puro (sin WebGL), con flotación apenas perceptible. Decorativo.
 */

type Variant = "atomizer" | "round" | "flared" | "hex" | "cube";

type Anim = "bottle-drift" | "bottle-sway" | "bottle-breathe";

interface BottleCfg {
  className: string;
  w: number;
  rot: number;
  op: number;
  blur?: number;
  delay: string;
  dur: string;
  anim: Anim;
  glint: string;
  variant: Variant;
}

const BOTTLES: BottleCfg[] = [
  { className: "left-[5%] top-[26%]", w: 150, rot: -10, op: 0.13, blur: 1, delay: "0s", dur: "5.5s", anim: "bottle-drift", glint: "3.5s", variant: "atomizer" },
  { className: "right-[6%] top-[16%]", w: 118, rot: 9, op: 0.11, delay: "0.6s", dur: "4.5s", anim: "bottle-sway", glint: "4s", variant: "flared" },
  { className: "right-[14%] bottom-[12%]", w: 104, rot: -7, op: 0.10, delay: "0.3s", dur: "5s", anim: "bottle-breathe", glint: "3s", variant: "round" },
  { className: "left-[16%] bottom-[10%]", w: 82, rot: 7, op: 0.09, delay: "1s", dur: "6s", anim: "bottle-drift", glint: "4.5s", variant: "hex" },
  { className: "left-[40%] bottom-[4%]", w: 66, rot: -5, op: 0.07, blur: 1, delay: "0.4s", dur: "4s", anim: "bottle-sway", glint: "3.5s", variant: "cube" },
];

function Shape({ variant }: { variant: Variant }) {
  switch (variant) {
    case "round":
      return (
        <g fill="url(#nexkoBottleGold)">
          <circle cx="40" cy="30" r="12" />
          <rect x="34" y="40" width="12" height="8" />
          <circle cx="40" cy="106" r="38" />
        </g>
      );
    case "flared":
      return (
        <g fill="url(#nexkoBottleGold)">
          {/* tapón acampanado (más ancho arriba) */}
          <rect x="26" y="18" width="28" height="6" rx="1" />
          <path d="M31 24 L26 24 L32 42 H48 L54 24 L49 24 Z" />
          <rect x="35" y="42" width="10" height="6" />
          {/* cuerpo alto */}
          <path d="M24 48 H56 V140 Q56 150 46 150 H34 Q24 150 24 140 Z" />
        </g>
      );
    case "hex":
      return (
        <g fill="url(#nexkoBottleGold)">
          {/* tapón hexagonal plano */}
          <path d="M32 18 H48 L54 28 L48 38 H32 L26 28 Z" />
          <rect x="35" y="38" width="10" height="6" />
          {/* cuerpo cuadrado redondeado */}
          <rect x="20" y="44" width="40" height="102" rx="16" />
        </g>
      );
    case "cube":
      return (
        <g fill="url(#nexkoBottleGold)">
          {/* tapón cubo */}
          <rect x="31" y="16" width="18" height="18" rx="2" />
          <rect x="35" y="34" width="10" height="6" />
          {/* cuerpo faceteado */}
          <path d="M22 40 H58 L54 142 Q53 148 46 148 H34 Q27 148 26 142 Z" />
        </g>
      );
    case "atomizer":
    default:
      return (
        <g fill="url(#nexkoBottleGold)">
          {/* boquilla + bomba spray */}
          <rect x="34" y="16" width="12" height="8" rx="2" />
          <rect x="31" y="24" width="18" height="12" rx="2" />
          {/* collar */}
          <rect x="27" y="36" width="26" height="6" />
          {/* cuerpo cilíndrico */}
          <rect x="22" y="42" width="36" height="106" rx="15" />
        </g>
      );
  }
}

export function BottleSilhouettes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Gradiente dorado compartido (tono NEXKO) */}
      <svg className="absolute h-0 w-0">
        <defs>
          <linearGradient id="nexkoBottleGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="55%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8A6F2E" />
          </linearGradient>
        </defs>
      </svg>

      {BOTTLES.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.className}`}
          style={{
            transform: `rotate(${b.rot}deg)`,
            opacity: b.op,
            filter: b.blur ? `blur(${b.blur}px)` : undefined,
          }}
        >
          <svg
            width={b.w}
            viewBox="0 0 80 160"
            className="bottle-anim"
            style={{
              animation: `${b.anim} ${b.dur} ease-in-out ${b.delay} infinite, bottle-glint ${b.glint} ease-in-out ${b.delay} infinite`,
            }}
          >
            <Shape variant={b.variant} />
          </svg>
        </div>
      ))}
    </div>
  );
}
