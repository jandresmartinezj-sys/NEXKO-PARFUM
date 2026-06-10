import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Revalidación on-demand. Configura un webhook de Shopify (p. ej. products/update)
 * apuntando a /api/revalidate?secret=XXX para refrescar el catálogo al instante.
 *
 * Requiere REVALIDATE_SECRET en el entorno.
 */
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Refresca las rutas que dependen del catálogo de Shopify.
  for (const path of [
    "/",
    "/tienda",
    "/colecciones/arabes",
    "/colecciones/masculinos",
    "/colecciones/femeninos",
    "/colecciones/body-sprays",
    "/colecciones/sets-regalo",
  ]) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
