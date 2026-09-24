import { NextResponse } from "next/server";
import {
  createCart,
  getCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from "@/lib/shopify/mutations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    switch (action) {
      case "add": {
        const { cartId, merchandiseId, quantity } = body;
        if (!merchandiseId) {
          return NextResponse.json({ error: "Falta merchandiseId" }, { status: 400 });
        }
        const cart = cartId
          ? await addCartLines(cartId, [{ merchandiseId, quantity: quantity ?? 1 }])
          : await createCart([{ merchandiseId, quantity: quantity ?? 1 }]);
        return NextResponse.json({ cart });
      }
      case "update": {
        const { cartId, lineId, quantity } = body;
        const cart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
        return NextResponse.json({ cart });
      }
      case "remove": {
        const { cartId, lineId } = body;
        const cart = await removeCartLines(cartId, [lineId]);
        return NextResponse.json({ cart });
      }
      case "get": {
        const { cartId } = body;
        const cart = await getCart(cartId);
        return NextResponse.json({ cart });
      }
      default:
        return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
