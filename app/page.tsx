import { HeroSlider } from "@/components/sections/HeroSlider";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { ScentFamilies } from "@/components/sections/ScentFamilies";
import { CategoryBannerGrid } from "@/components/sections/CategoryBannerGrid";
import { GenderShowcase } from "@/components/sections/GenderShowcase";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProductScroller } from "@/components/ui/ProductScroller";
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
  const [bestsellers, newArrivals] = await Promise.all([
    safeProducts({ query: "tag:bestseller", first: 10 }),
    safeProducts({ first: 10, sortKey: "CREATED_AT", reverse: true }),
  ]);

  const topRow = bestsellers.length ? bestsellers : newArrivals;

  return (
    <>
      <HeroSlider />

      <BrandsMarquee />

      {/* Familias olfativas */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading eyebrow="Descubre por aroma" title="Familias olfativas" />
        <div className="mt-8">
          <ScentFamilies />
        </div>
      </section>

      {/* Más vendidos */}
      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Los más deseados"
            title="Nuestros más vendidos"
            subtitle="Las fragancias que están enamorando a toda Colombia."
          />
          <div className="mt-8">
            <ProductScroller products={topRow} />
          </div>
        </div>
      </section>

      {/* Banners por género */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <GenderShowcase />
      </section>

      {/* Novedades */}
      {newArrivals.length > 0 && (
        <section className="bg-cream py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Recién llegados"
              title="Novedades"
              subtitle="Las últimas incorporaciones a nuestro catálogo."
            />
            <div className="mt-8">
              <ProductScroller products={newArrivals} />
            </div>
          </div>
        </section>
      )}

      {/* Rejilla de categorías */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading eyebrow="Explora" title="Nuestras categorías" />
        <div className="mt-8">
          <CategoryBannerGrid />
        </div>
      </section>

      {/* Confianza */}
      <section className="border-y border-subtle bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <TrustBadges />
        </div>
      </section>

      {/* Instagram */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Comunidad" title="Síguenos en Instagram" />
        <div className="mt-8">
          <InstagramFeed />
        </div>
      </section>
    </>
  );
}
