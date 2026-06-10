import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/shopify/queries";
import { getRelated } from "@/lib/shopify/getRelated";
import { SCENT_BY_HANDLE } from "@/lib/data/catalog";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { ScentPyramidSection } from "@/components/sections/ScentPyramidSection";
import { RelatedCarousel } from "@/components/ui/RelatedCarousel";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { formatCOP } from "@/lib/utils/formatPrice";

export const revalidate = 60;

interface Props {
  params: { handle: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.handle).catch(() => null);
  if (!product) return { title: "Producto no encontrado" };

  const price = formatCOP(product.priceRange.minVariantPrice.amount);
  const image = product.featuredImage?.url;

  return {
    title: `${product.title} — ${price}`,
    description: product.description?.slice(0, 160) || `${product.title} de ${product.vendor}.`,
    openGraph: {
      title: `${product.title} | NEXKO PARFUM`,
      description: `${product.vendor} · ${price}`,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.handle).catch(() => null);
  if (!product) notFound();

  const scent = SCENT_BY_HANDLE[params.handle];
  const related = await getRelated(product).catch(() => []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: product.vendor },
    image: product.featuredImage?.url,
    offers: {
      "@type": "Offer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
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
