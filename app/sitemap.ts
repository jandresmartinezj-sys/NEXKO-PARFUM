import type { MetadataRoute } from "next";
import { CATALOG, COLLECTIONS } from "@/lib/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticRoutes = ["", "/tienda", "/comparar", "/armar-kit", "/lista", "/cart"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const collectionRoutes = COLLECTIONS.map((c) => ({
    url: `${base}/colecciones/${c.handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = CATALOG.map((p) => ({
    url: `${base}/tienda/${p.handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
