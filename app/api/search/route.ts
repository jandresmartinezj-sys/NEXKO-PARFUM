import { NextResponse } from "next/server";
import { searchProductsLite } from "@/lib/shopify/queries";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ hits: [] });
  try {
    const hits = await searchProductsLite(q, 7);
    return NextResponse.json({ hits });
  } catch {
    return NextResponse.json({ hits: [] }, { status: 200 });
  }
}
