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
  compareAtPrice,
  stock,
  size = "lg",
  tone = "gold",
  className = "",
}: PriceDisplayProps) {
  const priceNum = typeof price === "string" ? parseFloat(price) : price;
  const compareNum =
    compareAtPrice != null
      ? typeof compareAtPrice === "string"
        ? parseFloat(compareAtPrice)
        : compareAtPrice
      : null;
  const hasDiscount = compareNum != null && compareNum > priceNum;
  const discountPct = hasDiscount
    ? Math.round(((compareNum! - priceNum) / compareNum!) * 100)
    : 0;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span
          className={`font-semibold ${tone === "ink" ? "text-cream-ink" : "text-gold"} ${size === "lg" ? "text-3xl sm:text-4xl" : "text-lg"}`}
        >
          {formatCOP(priceNum)}
        </span>
        {hasDiscount && (
          <>
            <span
              className={`text-ink-secondary line-through ${size === "lg" ? "text-lg" : "text-sm"}`}
            >
              {formatCOP(compareNum!)}
            </span>
            <span className="rounded-full bg-rose-scent/20 px-2 py-0.5 text-xs font-bold text-rose-scent">
              -{discountPct}%
            </span>
          </>
        )}
      </div>
      {typeof stock === "number" && stock > 0 && stock < 5 && (
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-rose-scent animate-pulse-gold">
          ⚡ ¡Solo quedan {stock} unidades!
        </p>
      )}
    </div>
  );
}
