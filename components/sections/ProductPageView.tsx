import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/shopify/queries";
import { getRelated } from "@/lib/shopify/getRelated";
import { SCENT_BY_HANDLE } from "@/lib/data/catalog";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { ScentPyramidSection } from "@/components/sections/ScentPyramidSection";
import { RelatedCarousel } from "@/components/ui/RelatedCarousel";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { formatCOP } from "@/lib/utils/formatPrice";

/**
 * Vista de ficha de producto compartida por las rutas /tienda/[handle] y
 * /producto/[handle]. La segunda existe para que la URL siga el patrón
 * /producto/... (estilo WooCommerce) que reconocen validadores externos
 * como el de Addi.
 */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexkogroup.com"
).replace(/\/+$/, "");

/** Recorta un texto a máx. `max` caracteres sin cortar palabras. */
function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", max)).trim() + "…";
}

/** Metadata reutilizable para ambas rutas de producto. */
export async function buildProductMetadata(handle: string): Promise<Metadata> {
  const product = await getProduct(handle).catch(() => null);
  if (!product) return { title: "Producto no encontrado" };

  const priceLabel = formatCOP(product.priceRange.minVariantPrice.amount);
  const amount = product.priceRange.minVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const image = product.featuredImage?.url;
  const availability = product.availableForSale ? "instock" : "outofstock";

  // Título y descripción con palabras que busca el comprador (original, precio,
  // Colombia, envío/contraentrega) — sin exceder lo que Google muestra.
  const title = `${product.title} — Original | NEXKO PARFUM`;
  const extra = product.description ? " " + product.description : "";
  const description = clip(
    `Compra ${product.title} 100% original al mejor precio en Colombia. ` +
      `Envío a todo el país y pago contra entrega.${extra}`,
    160,
  );

  return {
    title,
    description,
    // Canonical a /tienda/<handle> para que Google consolide el duplicado
    // (misma ficha servida también en /producto/<handle>).
    alternates: { canonical: `/tienda/${handle}` },
    openGraph: {
      type: "website",
      title: `${product.title} | NEXKO PARFUM`,
      description: `${product.vendor} · ${priceLabel} · Original, envío nacional y contra entrega`,
      url: `${SITE_URL}/tienda/${handle}`,
      images: image ? [{ url: image }] : undefined,
    },
    // Meta etiquetas de producto (estilo WooCommerce/Shopify) para que
    // rastreadores externos —p. ej. el validador de Addi— detecten precio
    // y disponibilidad sin ejecutar JavaScript.
    other: {
      "og:type": "product",
      "product:price:amount": amount,
      "product:price:currency": currency,
      "og:price:amount": amount,
      "og:price:currency": currency,
      "og:availability": availability,
      "product:availability": availability,
    },
  };
}

export async function ProductPageView({ handle }: { handle: string }) {
  const product = await getProduct(handle).catch(() => null);
  if (!product) notFound();

  const scent = SCENT_BY_HANDLE[handle];
  const related = await getRelated(product).catch(() => []);

  const productUrl = `${SITE_URL}/tienda/${handle}`;
  const priceValidUntil = new Date(Date.now() + 365 * 864e5)
    .toISOString()
    .slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `${product.title} de ${product.vendor}, 100% original.`,
    brand: { "@type": "Brand", name: product.vendor },
    image: product.featuredImage?.url ? [product.featuredImage.url] : undefined,
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      priceValidUntil,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "NEXKO PARFUM" },
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductDetail product={product} />

      {scent && (
        <section className="mt-24">
          <ScentPyramidSection accords={scent.accords} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-24">
          <SectionHeading
            eyebrow="Te puede gustar"
            title="Completa tu colección"
            align="left"
          />
          <div className="mt-8">
            <RelatedCarousel products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
