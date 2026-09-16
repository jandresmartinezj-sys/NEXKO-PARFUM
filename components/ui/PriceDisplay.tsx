import { formatCOP } from "@/lib/utils/formatPrice";

interface PriceDisplayProps {
  price: string | number;
  compareAtPrice?: string | number | null;
  stock?: number | null;
  size?: "sm" | "lg";
  tone?: "gold" | "ink";
  className?: string;
}

export function PriceDisplay({
  price,
  stock,
  size = "lg",
  tone = "gold",
  className = "",
}: PriceDisplayProps) {
  // Nota: no mostramos precios de comparación ni descuentos por decisión de
  // negocio. Se conserva la prop `compareAtPrice` por compatibilidad, pero se
  // ignora a propósito.
  const priceNum = typeof price === "string" ? parseFloat(price) : price;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span
          className={`font-semibold ${tone === "ink" ? "text-cream-ink" : "text-gold"} ${size === "lg" ? "text-3xl sm:text-4xl" : "text-lg"}`}
        >
          {formatCOP(priceNum)}
        </span>
      </div>
      {typeof stock === "number" && stock > 0 && stock < 5 && (
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-rose-scent animate-pulse-gold">
          ⚡ ¡Solo quedan {stock} unidades!
        </p>
      )}
    </div>
  );
}
