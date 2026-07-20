import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { InspiredBy } from "@/components/sections/InspiredBy";
import { GiftSection } from "@/components/sections/GiftSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { getProducts } from "@/lib/shopify/queries";
import type { Product } from "@/lib/shopify/types";

export const revalidate = 900;

async function safeProducts(opts?: Parameters<typeof getProducts>[0]): Promise<Product[]> {
  try {
    return await getProducts(opts);
  } catch (e) {
    console.error("Error cargando productos:", e);
    return [];
  }
}

export default async function HomePage() {
  const [bestsellers, featured] = await Promise.all([
    safeProducts({ query: "tag:bestseller", first: 8 }),
    safeProducts({ first: 8, sortKey: "CREATED_AT", reverse: true }),
  ]);

  const topRow = bestsellers.length ? bestsellers : featured;

  return (
    <>
      <HeroSection />

      <BrandsMarquee />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Explora"
          title="Encuentra tu universo olfativo"
          subtitle="Cinco mundos, una sola obsesión por el aroma perfecto."
        />
        <div className="mt-10">
          <CategoryGrid />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading
          eyebrow="Los más deseados"
          title="Best Sellers"
          subtitle="Las fragancias que están enamorando a toda Colombia."
        />
        <div className="mt-10">
          <ProductGrid products={topRow} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <InspiredBy />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <GiftSection />
      </section>
    </>
  );
}
