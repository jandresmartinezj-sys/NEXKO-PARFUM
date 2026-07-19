/**
 * Siluetas de frascos de perfume en tono dorado (como el logotipo NEXKO),
 * sutiles y elegantes, de fondo en el hero. SVG + CSS puro (sin WebGL) con una
 * flotación apenas perceptible. Decorativo (aria-hidden).
 */

interface BottleCfg {
  className: string;
  w: number;
  rot: number;
  op: number;
  blur?: number;
  delay: string;
  dur: string;
  variant?: "flacon" | "round";
}

const BOTTLES: BottleCfg[] = [
  { className: "left-[5%] top-[30%]", w: 165, rot: -12, op: 0.11, blur: 1, delay: "0s", dur: "12s" },
  { className: "right-[7%] top-[20%]", w: 120, rot: 11, op: 0.09, delay: "1.6s", dur: "14s", variant: "round" },
  { className: "right-[15%] bottom-[13%]", w: 95, rot: -7, op: 0.08, delay: "0.8s", dur: "13s" },
  { className: "left-[17%] bottom-[11%]", w: 78, rot: 8, op: 0.07, delay: "2.3s", dur: "15s", variant: "round" },
  { className: "left-[39%] bottom-[5%]", w: 62, rot: -5, op: 0.05, blur: 1, delay: "1.1s", dur: "16s" },
];

function BottleShape({ variant = "flacon" }: { variant?: "flacon" | "round" }) {
  if (variant === "round") {
    return (
      <g fill="url(#nexkoBottleGold)">
        <rect x="26" y="4" width="12" height="16" rx="3" />
        <rect x="29" y="19" width="6" height="7" />
        <path d="M30 26 H34 L40 34 H24 Z" />
        <ellipse cx="32" cy="92" rx="24" ry="38" />
      </g>
    );
  }
  return (
    <g fill="url(#nexkoBottleGold)">
      <rect x="25" y="4" width="14" height="18" rx="3" />
      <rect x="28.5" y="21" width="7" height="8" />
      <path d="M28 30 H36 L50 46 H14 Z" />
      <rect x="14" y="44" width="36" height="88" rx="12" />
    </g>
  );
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
            viewBox="0 0 64 140"
            style={{ animation: `bottle-float ${b.dur} ease-in-out ${b.delay} infinite` }}
          >
            <BottleShape variant={b.variant} />
          </svg>
        </div>
      ))}
    </div>
  );
}
