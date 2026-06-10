import { NextResponse } from "next/server";
import { getProduct } from "@/lib/shopify/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Diagnóstico temporal: ¿qué ve el SERVIDOR (token de Vercel) respecto al inventario?
export async function GET() {
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";
  try {
    const p = await getProduct("asad-lattafa");
    return NextResponse.json({
      ok: true,
      tokenTail: token.slice(-6),
      tokenLen: token.length,
      handle: p?.handle,
      totalInventory: p?.totalInventory ?? null,
      variantQty: p?.variants?.[0]?.quantityAvailable ?? null,
      variantAvailable: p?.variants?.[0]?.availableForSale ?? null,
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      tokenTail: token.slice(-6),
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
